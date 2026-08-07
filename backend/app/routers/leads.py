from fastapi import APIRouter, Depends, status
from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import require_admin
from app.models.lead import Lead
from app.models.user import User
from app.schemas.lead import LeadCreate, LeadRead

router = APIRouter(prefix='/api/leads', tags=['leads'])


@router.post('', response_model=LeadRead, status_code=status.HTTP_201_CREATED)
def create_lead(payload: LeadCreate, db: Session = Depends(get_db)):
    lead = Lead(**payload.model_dump())
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead


@router.get('', response_model=list[LeadRead])
def list_leads(
    db: Session = Depends(get_db),
    _admin: User = Depends(require_admin),
):
    return db.query(Lead).order_by(desc(Lead.created_at)).all()
