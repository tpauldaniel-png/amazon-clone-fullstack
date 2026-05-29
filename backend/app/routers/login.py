from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import models_users
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from app import utils

router = APIRouter(
    prefix = "/login",
    tags = ['Login']
)


@router.post("/")
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    
    user = db.query(models_users.User).filter(models_users.User.email == user_credentials.username).first()

    if user is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")
    

    is_valid = utils.verify_password(user_credentials.password, user.password)

    if is_valid == False:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")
    
    return {"message" : "Login successful"}