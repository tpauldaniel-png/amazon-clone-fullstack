from fastapi import Depends, HTTPException, APIRouter, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import models_users, models_products, models_orders
from app import oauth2
from sqlalchemy import func


router = APIRouter(
    prefix = "/admin",
    tags = ['Admin']
)


@router.get("/stats")
def get_admin_stats(db: Session = Depends(get_db), current_admin = Depends(oauth2.get_current_admin)):

    total_products = db.query(models_products.Product).count()
    total_users = db.query(models_users.User).filter(models_users.User.role == 'customer').count()
    total_orders = db.query(models_orders.Order).count()
    total_revenue = (db.query(func.sum(models_orders.Order.total_price)).scalar() or 0)

    return {
        "total_products" : total_products,
        "total_users" : total_users,
        "total_orders" : total_orders,
        "total_revenue" : total_revenue
    }


