from uuid import UUID

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.errors import unauthorized, forbidden
from app.core.security import decode_access_token
from app.models.user import User, UserRole

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='api/auth/login', auto_error=False)


def get_current_user(
    token: str | None = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    if not token:
        raise unauthorized()

    payload = decode_access_token(token)
    if payload is None:
        raise unauthorized('Invalid or expired token')

    try:
        user_id = UUID(payload['sub'])
    except (KeyError, ValueError):
        raise unauthorized('Invalid token payload')

    user = db.get(User, user_id)
    if user is None or not user.is_active:
        raise unauthorized('User no longer active')

    return user


def require_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != UserRole.admin:
        raise forbidden('Admin access required')
    return current_user
