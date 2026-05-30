from app.models import models_users
from fastapi import HTTPException, status
from app import utils

def create_user(user_data, db):
    try:
        user_dict = user_data.model_dump()
        user_dict["password"] = utils.hash_password(user_data.password)

        new_user = models_users.User(**user_dict)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user

    except Exception: 
        db.rollback()
        raise



def get_all_users(db):
    try:
        users_data = db.query(models_users.User).all()

        return users_data
    
    except Exception:
        db.rollback()
        raise


def get_one_user(id, db):
    
    user_data = db.query(models_users.User).filter(models_users.User.user_id == id).first()

    if user_data is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="user not found")


    return user_data
    
    
def get_me_user(db, user_id):

    user_me_data = db.query(models_users.User).filter(models_users.User.user_id == user_id).first()

    if user_me_data is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="user not found")


    return user_me_data