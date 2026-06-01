from fastapi import APIRouter, status, Depends, HTTPException, Response
from app.models import models_cart
from app.schemas.cart import CartCreate, CartCreateResponse, CartsResponse, CartOut, UpdateCart
from uuid import UUID
from sqlalchemy.orm import Session
from app.database import get_db
from app import oauth2
from app.crud import crud_cart







router = APIRouter(
    prefix = "/cart",
    tags = ["Cart"]
)

@router.post("/", response_model=CartCreateResponse, status_code=status.HTTP_201_CREATED)
def create_cart(cart: CartCreate, db: Session = Depends(get_db), logged_in_user_id = Depends(oauth2.get_current_user)):
    
    cart_data = crud_cart.create_cart(cart, db, logged_in_user_id)

    return {
        "message" : "cart successfully created",
        "cart" : cart_data
    }



@router.get("/", response_model=CartsResponse)
def get_user_cart(db: Session = Depends(get_db), logged_in_user_id =  Depends(oauth2.get_current_user)):

    user_cart_data = crud_cart.get_user_cart(db, logged_in_user_id)

    return {
        "user_cart" : user_cart_data
    }


@router.put("/{cart_id}", response_model=CartOut)
def update_cart_items(cart_id: UUID,update_cart_data: UpdateCart, db: Session = Depends(get_db), logged_in_user_id = Depends(oauth2.get_current_user)):
    
    updated_cart_item = crud_cart.update_cart_item(cart_id, update_cart_data, db, logged_in_user_id)

    return updated_cart_item


@router.delete("/{cart_id}")
def delete_cart_item(cart_id: UUID, db: Session = Depends(get_db), logged_in_user_id = Depends(oauth2.get_current_user)):

    response = crud_cart.delete_cart_item(cart_id, db, logged_in_user_id)

    return response