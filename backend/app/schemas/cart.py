from pydantic import BaseModel
from uuid import UUID


class CartCreate(BaseModel):
    product_id: UUID
    quantity: int
    delivery_option_id: int


class CartOut(BaseModel):
    cart_id: UUID
    user_id: UUID
    product_id: UUID
    quantity: int
    delivery_option_id: int

    class Config:
        from_attributes = True

class CartCreateResponse(BaseModel):
    message: str
    cart: CartOut

class CartsResponse(BaseModel):
    user_cart : list[CartOut]

class UpdateCart(BaseModel):
    quantity: int
    delivery_option_id: int





    
    
