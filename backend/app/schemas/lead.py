from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, ConfigDict


class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company_name: str | None = None
    plan_interest: str | None = None
    message: str | None = None
    source: str = 'website'


class LeadRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    email: EmailStr
    phone: str
    company_name: str | None
    plan_interest: str | None
    message: str | None
    source: str
    created_at: datetime
