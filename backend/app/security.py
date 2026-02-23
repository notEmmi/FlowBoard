import os
from datetime import datetime, timedelta, timezone

from jose import jwt
from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt_sha256", "bcrypt"], deprecated="auto")

JWT_SECRET = os.getenv("JWT_SECRET", "dev-only-change-me")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, password_hash: str) -> bool:
    return pwd_context.verify(plain_password, password_hash)


def create_access_token(subject: str, expires_minutes: int | None = None) -> str:
    minutes = expires_minutes or ACCESS_TOKEN_EXPIRE_MINUTES
    expire_at = datetime.now(timezone.utc) + timedelta(minutes=minutes)
    payload = {"sub": subject, "exp": expire_at}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
