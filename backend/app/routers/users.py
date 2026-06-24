from fastapi import Depends, HTTPException, APIRouter, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import models_users, models_products, models_orders
from app.schemas.users import UserCreate, UserCreateResponse, UsersResponse, UserOut
from app.crud import crud_users
from uuid import UUID
from app import oauth2
from sqlalchemy import func


router = APIRouter(
    prefix = "/users",
    tags = ['Users']
)


@router.post("/", response_model=UserCreateResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):

    new_user = crud_users.create_user(user, db)

    return {
        "message" : "user successfully created",
        "user" : new_user
    }



@router.get("/", response_model=UsersResponse)
def get_users(db: Session = Depends(get_db), user_id = Depends(oauth2.get_current_user)):

    users_data = crud_users.get_all_users(db)

    return {
        "users" : users_data
    }



@router.get("/me", response_model=UserOut)
def get_user_me(db: Session = Depends(get_db), user_id = Depends(oauth2.get_current_user)):

    user_me_data = crud_users.get_me_user(db, user_id)

    return user_me_data



@router.get("/{id}", response_model=UserOut)
def get_user(id: UUID, db: Session = Depends(get_db),user_id = Depends(oauth2.get_current_user)):

    user_data = crud_users.get_one_user(id, db)

    return user_data



    
    