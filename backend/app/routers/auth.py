from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session

from database import get_db
from email_service import send_password_reset_email
from models import User
from schemas import LoginIn, PasswordResetIn, PasswordResetRequestIn, RegisterIn, TokenOut, UserRead
from security import create_access_token, create_reset_token, hash_password, verify_password, verify_reset_token


router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=UserRead, status_code=201)
def register(payload: RegisterIn, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(
        or_(User.email == payload.email, User.username == payload.username)
    ).first()

    if existing_user:
        raise HTTPException(status_code=409, detail="Email or username already exists")

    new_user = User(
        email=payload.email,
        username=payload.username,
        password_hash=hash_password(payload.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.post("/login", response_model=TokenOut)
def login(payload: LoginIn, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(subject=str(user.id))
    return TokenOut(access_token=token)


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
    
    user.password_hash = hash_password(payload.new_password)
    db.commit()
    
    return {"message": "Password successfully reset"}
