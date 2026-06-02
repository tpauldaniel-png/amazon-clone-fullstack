from fastapi import APIRouter, status, Depends, HTTPException, Response
from app.models import models_orders, models_cart, models_products, models_delivery_options
from uuid import UUID
from sqlalchemy.orm import Session
from app.database import get_db
from app import oauth2
from app.schemas.orders import OrderCreateResponse, OrdersResponse, OrderOneResponse
from app.crud import crud_orders


router = APIRouter(
    prefix = "/orders",
    tags = ["Orders"]
)


@router.post("/", response_model=OrderCreateResponse, status_code=status.HTTP_201_CREATED)
def create_order( db: Session = Depends(get_db), logged_in_user_id = Depends(oauth2.get_current_user)):
    
    result = crud_orders.create_order(db, logged_in_user_id)

    return {
        "message" : result.get("message"),
        "order" : result.get("order"),
        "order_item" : result.get("order_item")
    }
    


@router.get("/", response_model=OrdersResponse)
def get_orders(db: Session = Depends(get_db), logged_in_user_id = Depends(oauth2.get_current_user)):

    orders = crud_orders.get_orders(db, logged_in_user_id)

    return {
        "orders" : orders
    }


@router.get("/{order_id}", response_model=OrderOneResponse)
def get_order(order_id: UUID, db: Session = Depends(get_db), logged_in_user_id = Depends(oauth2.get_current_user)):

    result = crud_orders.get_one_order(order_id, db, logged_in_user_id)

    return {
        "order" : result.get("order"),
        "order_items" : result.get("order_items")
    }

