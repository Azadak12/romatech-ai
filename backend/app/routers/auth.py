from datetime import datetime, timezone

from fastapi import APIRouter, Depends, Request, Response, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.core.errors import conflict, unauthorized
from app.core.limiter import limiter
from app.core.security import (
    create_access_token,
    generate_refresh_token,
    hash_password,
    hash_refresh_token,
    refresh_token_expiry,
    verify_password,
)
from app.models.refresh_token import RefreshToken
from app.models.user import User
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse
from app.schemas.user import UserRead

router = APIRouter(prefix='/api/auth', tags=['auth'])

REFRESH_COOKIE_NAME = 'refresh_token'
REFRESH_COOKIE_PATH = '/api/auth'


def _set_refresh_cookie(response: Response, raw_token: str) -> None:
    response.set_cookie(
        key=REFRESH_COOKIE_NAME,
        value=raw_token,
        httponly=True,
        secure=True,
        samesite='none',
        path=REFRESH_COOKIE_PATH,
        max_age=60 * 60 * 24 * 7,
    )


def _issue_refresh_token(db: Session, user_id) -> str:
    raw_token = generate_refresh_token()
    db.add(
        RefreshToken(
            user_id=user_id,
            token_hash=hash_refresh_token(raw_token),
            expires_at=refresh_token_expiry(),
        )
    )
    db.commit()
    return raw_token


@router.post('/register', response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit('5/minute')
def register(request: Request, response: Response, payload: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise conflict('An account with this email already exists')

    user = User(
        email=payload.email,
        hashed_password=hash_password(payload.password),
        full_name=payload.full_name,
        company_name=payload.company_name,
        phone=payload.phone,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    access_token = create_access_token(user.id)
    raw_refresh_token = _issue_refresh_token(db, user.id)
    _set_refresh_cookie(response, raw_refresh_token)

    return TokenResponse(access_token=access_token, user=UserRead.model_validate(user))


@router.post('/login', response_model=TokenResponse)
@limiter.limit('10/minute')
def login(request: Request, response: Response, payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise unauthorized('Incorrect email or password')
    if not user.is_active:
        raise unauthorized('This account has been deactivated')

    access_token = create_access_token(user.id)
    raw_refresh_token = _issue_refresh_token(db, user.id)
    _set_refresh_cookie(response, raw_refresh_token)

    return TokenResponse(access_token=access_token, user=UserRead.model_validate(user))


@router.post('/refresh', response_model=TokenResponse)
def refresh(request: Request, response: Response, db: Session = Depends(get_db)):
    raw_token = request.cookies.get(REFRESH_COOKIE_NAME)
    if not raw_token:
        raise unauthorized('Missing refresh token')

    token_hash = hash_refresh_token(raw_token)
    stored = db.query(RefreshToken).filter(RefreshToken.token_hash == token_hash).first()

    if not stored or stored.revoked or stored.expires_at < datetime.now(timezone.utc):
        raise unauthorized('Refresh token is invalid or expired')

    user = db.get(User, stored.user_id)
    if not user or not user.is_active:
        raise unauthorized('User no longer active')

    stored.revoked = True
    access_token = create_access_token(user.id)
    raw_refresh_token = _issue_refresh_token(db, user.id)
    db.commit()
    _set_refresh_cookie(response, raw_refresh_token)

    return TokenResponse(access_token=access_token, user=UserRead.model_validate(user))


@router.post('/logout', status_code=status.HTTP_204_NO_CONTENT)
def logout(request: Request, response: Response, db: Session = Depends(get_db)):
    raw_token = request.cookies.get(REFRESH_COOKIE_NAME)
    if raw_token:
        token_hash = hash_refresh_token(raw_token)
        stored = db.query(RefreshToken).filter(RefreshToken.token_hash == token_hash).first()
        if stored:
            stored.revoked = True
            db.commit()
    response.delete_cookie(key=REFRESH_COOKIE_NAME, path=REFRESH_COOKIE_PATH)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get('/me', response_model=UserRead)
def me(current_user: User = Depends(get_current_user)):
    return current_user
