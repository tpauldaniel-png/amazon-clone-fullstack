from pydantic import BaseModel
from uuid import UUID


class UserCreate(BaseModel):
    first_name : str
    last_name: str
    phone_no: str
    address: str
    email: str
    password: str
    role: str


class UserOut(BaseModel):
    user_id: UUID
    first_name : str
    last_name: str
    phone_no: str
    address: str
    email: str
    role: str

    class Config:
        from_attributes =  True

class UserCreateResponse(BaseModel):
    message: str
    user: UserOut

class UsersResponse(BaseModel):
    users: list[UserOut]