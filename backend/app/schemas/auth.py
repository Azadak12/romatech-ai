from pydantic import BaseModel, EmailStr, field_validator

from app.schemas.user import UserRead


def _validate_password_strength(password: str) -> str:
    if len(password) < 8:
        raise ValueError('Password must be at least 8 characters long')
    if not any(char.isdigit() for char in password):
        raise ValueError('Password must contain at least one number')
    return password


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    company_name: str
    phone: str

    @field_validator('password')
    @classmethod
    def validate_password(cls, value: str) -> str:
        return _validate_password_strength(value)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'
    user: UserRead
