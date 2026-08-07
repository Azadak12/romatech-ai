from fastapi import FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.core.config import settings
from app.core.limiter import limiter
from app.routers import admin_router, auth_router, leads_router, users_router

app = FastAPI(title='RomaTech.Ai API')

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    detail = exc.detail
    if isinstance(detail, dict) and 'error' in detail:
        content = detail
    else:
        content = {'error': {'code': 'error', 'message': detail}}
    return JSONResponse(status_code=exc.status_code, content=content, headers=exc.headers)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            'error': {
                'code': 'validation_error',
                'message': 'One or more fields are invalid',
                'fields': exc.errors(),
            }
        },
    )


app.include_router(auth_router)
app.include_router(users_router)
app.include_router(leads_router)
app.include_router(admin_router)


@app.get('/api/health')
def health_check():
    return {'status': 'ok'}
