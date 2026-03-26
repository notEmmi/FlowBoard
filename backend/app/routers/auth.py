# Auth router: handles registration, login, and password-reset endpoints.
import os
from operator import or_

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from database import get_db
from services.email_service import send_password_reset_email
from models import User
from schemas import LoginIn, PasswordResetIn, PasswordResetRequestIn, RegisterIn, TokenOut, UserRead
from services.security import ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, create_reset_token, hash_password, verify_password, verify_reset_token, get_current_user_id


router = APIRouter(prefix="/api/auth", tags=["auth"])
COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() == "true"
COOKIE_SAMESITE = os.getenv("COOKIE_SAMESITE", "lax")


@router.post("/register", response_model=UserRead)
def register(payload: RegisterIn, db: Session = Depends(get_db)):
    print(f"DEBUG: Registration attempt for email: {payload.email}, username: {payload.username}")
    
    existing_user = db.query(User).filter(
        or_(User.email == payload.email, User.username == payload.username)
    ).first()

    if existing_user:
        print(f"DEBUG: Registration failed - email or username already exists")
        raise HTTPException(status_code=409, detail="Email or username already exists")

    new_user = User(
        email=payload.email,
        username=payload.username,
        password_hash=hash_password(payload.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    print(f"DEBUG: User registered successfully with id: {new_user.id}")
    return new_user


@router.post("/login", response_model=TokenOut)
def login(payload: LoginIn, response: Response, db: Session = Depends(get_db)):
    print(f"DEBUG: Login attempt for email: {payload.email}")
    
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        print(f"DEBUG: User not found for email: {payload.email}")
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not verify_password(payload.password, user.password_hash):
        print(f"DEBUG: Password verification failed for user: {user.id}")
        raise HTTPException(status_code=401, detail="Invalid credentials")

    print(f"DEBUG: Password verified for user: {user.id}")
    token = create_access_token(subject=str(user.id))
    print(f"DEBUG: Access token created for user: {user.id}")
    
    # response.set_cookie(
    #     key="session",
    #     value=token,
    #     httponly=True,
    #     secure=COOKIE_SECURE,
    #     samesite=COOKIE_SAMESITE,
    #     max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    # )
    return TokenOut(access_token=token)


@router.post("/refresh", response_model=TokenOut)
def refresh_access_token(current_user_id: int = Depends(get_current_user_id)):
    """Issue a new access token with extended expiration for current user."""
    new_token = create_access_token(subject=str(current_user_id))
    if not new_token:
        raise HTTPException(status_code=500, detail="Failed to refresh access token")
    return TokenOut(access_token=new_token)


@router.post("/password-reset/request")
def request_password_reset(payload: PasswordResetRequestIn, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    
    # Always return success (avoid leaking user existence)
    if user:
        reset_token = create_reset_token(user.email)
        send_password_reset_email(user.email, reset_token)
    
    return {"message": "If that email exists, a reset link has been sent"}


@router.post("/password-reset/confirm")
def reset_password(payload: PasswordResetIn, db: Session = Depends(get_db)):
    email = verify_reset_token(payload.token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_password_lower = payload.new_password.lower()
    username_lower = user.username.lower()
    email_lower = user.email.lower()
    email_local_part = email_lower.split("@")[0] if "@" in email_lower else ""

    if (
        (len(username_lower) >= 3 and username_lower in new_password_lower)
        or (email_lower and email_lower in new_password_lower)
        or (len(email_local_part) >= 3 and email_local_part in new_password_lower)
    ):
        raise HTTPException(status_code=422, detail="Password cannot contain your username or email")
    
    user.password_hash = hash_password(payload.new_password)
    db.commit()
    
    return {"message": "Password successfully reset"}
