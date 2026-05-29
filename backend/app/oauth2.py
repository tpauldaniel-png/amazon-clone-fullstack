from app.config import settings
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp" : expire})

    encoded_token = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)

    return encoded_token



def verify_access_token(token, credentials_exception):
    try:
        payload = jwt.decode(token,SECRET_KEY, algorithms=[ALGORITHM])

        id = payload.get("user_id")

        if id is None:
            raise credentials_exception
        
    except JWTError:
        raise credentials_exception
    
    return id
    


def get_current_user(token = Depends(oauth2_scheme)):

    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="could not validate credentials", headers={"WWW-Authenticate": "Bearer"})

    return verify_access_token(token, credentials_exception)


