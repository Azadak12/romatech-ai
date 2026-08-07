from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')

    DATABASE_URL: str = 'postgresql+psycopg://romatech:romatech@localhost:5432/romatech'

    JWT_SECRET_KEY: str = 'change-me'
    JWT_ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    CORS_ORIGINS: list[str] = ['http://localhost:5173']

    ENV: str = 'development'


settings = Settings()
