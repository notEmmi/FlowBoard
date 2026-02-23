from pydantic import BaseModel, EmailStr


class ItemCreate(BaseModel):
    name: str
    description: str | None = None


class ItemRead(BaseModel):
    id: int
    name: str
    description: str | None = None

    class Config:
        from_attributes = True

class RegisterIn(BaseModel):
    email: EmailStr
    username: str
    password: str

    class Config:
        from_attributes = False


class LoginIn(BaseModel):
    email: EmailStr
    password: str

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