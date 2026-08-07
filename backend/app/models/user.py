import uuid
import enum
from datetime import datetime

from sqlalchemy import String, Boolean, DateTime, Enum, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class UserRole(str, enum.Enum):
    client = 'client'
    admin = 'admin'


class UserPlan(str, enum.Enum):
    none = 'none'
    starter = 'starter'
    growth = 'growth'
    premium = 'premium'


class User(Base):
    __tablename__ = 'users'

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    company_name: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str] = mapped_column(String(32), nullable=False)
    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole, name='user_role'), nullable=False, default=UserRole.client
    )
    plan: Mapped[UserPlan] = mapped_column(
        Enum(UserPlan, name='user_plan'), nullable=False, default=UserPlan.none
    )
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    refresh_tokens: Mapped[list['RefreshToken']] = relationship(
        back_populates='user', cascade='all, delete-orphan'
    )
