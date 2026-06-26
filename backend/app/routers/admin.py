from fastapi import Depends, HTTPException, APIRouter, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import models_users, models_products, models_orders
from app import oauth2
from sqlalchemy import func
from app.schemas.products import ProductCreate, ProductCreateResponse, ProductsResponse
from uuid import UUID

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


@router.post("/add_product", response_model=ProductCreateResponse, status_code=status.HTTP_201_CREATED)
def admin_add_product(data : ProductCreate, db: Session = Depends(get_db), current_admin = Depends(oauth2.get_current_admin)):
    try:
        new_product = models_products.Product(**data.model_dump())

        db.add(new_product)
        db.commit()
        db.refresh(new_product)

        return {
            "message" : "Product Successfully created",
            "product" : new_product
        }
    
    except Exception:
        db.rollback()
        raise



@router.get("/get_products", response_model=ProductsResponse)
def admin_get_products(db: Session = Depends(get_db), current_admin = Depends(oauth2.get_current_admin)):

    
    products_data = db.query(models_products.Product).all()

    return {
        "products" : products_data
    }
    
    
@router.get("/get_orders")
def admin_get_orders(db: Session = Depends(get_db), current_admin = Depends(oauth2.get_current_admin)):

    orders = (db.query(models_orders.Order, models_users.User).join(models_users.User, models_orders.Order.user_id == models_users.User.user_id).all())

    order_list = []

    for order, user in orders:
        order_list.append({
            "order_id" : order.order_id,
            "total_price" : order.total_price,
            "created_at": order.created_at,
            "customer_name": user.first_name + " " + user.last_name,
            "customer_email" : user.email
        })

    return {
        "orders" : order_list
    }

@router.get("/get_order_items/{order_id}")
def admin_get_order_items(order_id : UUID, db: Session = Depends(get_db), current_admin = Depends(oauth2.get_current_admin)):

    order_items = db.query(models_orders.OrderItem, models_products.Product).join(models_products.Product, models_orders.OrderItem.product_id == models_products.Product.id).filter(models_orders.OrderItem.order_id == order_id).all()
        
    item_list = []

    for order_item, product in order_items:
        item_list.append({
            "price_at_purchase" : order_item.price_at_purchase,
            "quantity" : order_item.quantity,
            "product_name" : product.name,
            "image" : product.image
        })

    return {
        "order_items" : item_list
    }

