from pydantic import BaseModel, EmailStr, field_validator, model_validator


COMMON_PASSWORDS = {
    "password",
    "password123",
    "12345678",
    "123456789",
    "1234567890",
    "qwerty123",
    "letmein",
    "welcome123",
    "admin123",
    "iloveyou",
}


def validate_password_strength(password: str) -> str:
    if not password:
        raise ValueError("Password is required")
    
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters")

    has_upper = any(ch.isupper() for ch in password)
    has_lower = any(ch.islower() for ch in password)
    has_digit = any(ch.isdigit() for ch in password)

    if not (has_upper and has_lower and has_digit):
        raise ValueError("Password must include uppercase, lowercase, and number")

    if password.lower() in COMMON_PASSWORDS:
        raise ValueError("This password is too common. Choose a stronger one")

    return password


class RegisterIn(BaseModel):
    email: EmailStr
    username: str
    password: str

    @field_validator("email")
    @classmethod
    def validate_email_not_empty(cls, value: str) -> str:
        email = value.strip()
        if not email:
            raise ValueError("Email is required")
        return email

    @field_validator("username")
    @classmethod
    def validate_username(cls, value: str) -> str:
        username = value.strip()
        if not username:
            raise ValueError("Username is required")
        if len(username) < 3:
            raise ValueError("Username must be at least 3 characters")
        if len(username) > 30:
            raise ValueError("Username must be 30 characters or fewer")
        return username

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        return validate_password_strength(value.strip())

    @model_validator(mode="after")
    def validate_password_not_personal(self):
        password_lower = self.password.lower()
        username_lower = self.username.lower()
        email_lower = self.email.lower()
        email_local_part = email_lower.split("@")[0] if "@" in email_lower else ""

        if len(username_lower) >= 3 and username_lower in password_lower:
            raise ValueError("Password cannot contain your username")

        if email_lower and email_lower in password_lower:
            raise ValueError("Password cannot contain your email")

        if len(email_local_part) >= 3 and email_local_part in password_lower:
            raise ValueError("Password cannot contain your email")

        return self

    class Config:
        from_attributes = False


class LoginIn(BaseModel):
    email: EmailStr
    password: str

    @field_validator("email")
    @classmethod
    def validate_email_not_empty(cls, value: str) -> str:
        email = value.strip()
        if not email:
            raise ValueError("Email is required")
        return email

    @field_validator("password")
    @classmethod
    def validate_password_not_empty(cls, value: str) -> str:
        if not value:
            raise ValueError("Password is required")
        return value

    class Config:
        from_attributes = False


class UserRead(BaseModel):
    id: int
    email: EmailStr
    username: str

    class Config:
        from_attributes = True


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"

    class Config:
        from_attributes = False


class PasswordResetRequestIn(BaseModel):
    email: EmailStr

    @field_validator("email")
    @classmethod
    def validate_email_not_empty(cls, value: str) -> str:
        email = value.strip()
        if not email:
            raise ValueError("Email is required")
        return email
    
    class Config:
        from_attributes = False


class PasswordResetIn(BaseModel):
    token: str
    new_password: str

    @field_validator("token")
    @classmethod
    def validate_token(cls, value: str) -> str:
        token = value.strip()
        if not token:
            raise ValueError("Reset token is required")
        return token

    @field_validator("new_password")
    @classmethod
    def validate_new_password(cls, value: str) -> str:
        return validate_password_strength(value)

    class Config:
        from_attributes = False

class ProjectCreate(BaseModel):
    name: str

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        name = value.strip()
        if not name:
            raise ValueError("Project name is required")
        if len(name) > 50:
            raise ValueError("Project name must be 50 characters or fewer")
        return name
    
class ProjectRead(BaseModel):
    id: int
    owner_id: int
    name: str
    description: str | None = None
    created_at: str
    updated_at: str
    class Config:
        from_attributes = True

class ProjectUpdate(BaseModel):
    name: str | None = None
    description: str | None = None