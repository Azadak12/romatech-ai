from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.core.errors import bad_request
from app.models.user import User, UserPlan
from app.schemas.user import PlanPurchase, UserRead, UserUpdate

router = APIRouter(prefix='/api/users', tags=['users'])


@router.patch('/me', response_model=UserRead)
def update_me(
    payload: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    updates = payload.model_dump(exclude_unset=True)
    for field, value in updates.items():
        setattr(current_user, field, value)

    db.commit()
    db.refresh(current_user)
    return current_user


@router.post('/me/plan', response_model=UserRead)
def purchase_plan(
    payload: PlanPurchase,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if payload.plan == UserPlan.none:
        raise bad_request('Choose a plan to activate it')

    current_user.plan = payload.plan
    db.commit()
    db.refresh(current_user)
    return current_user
