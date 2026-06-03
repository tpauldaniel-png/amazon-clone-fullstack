from app.models import models_orders, models_cart, models_products, models_delivery_options
from fastapi import HTTPException, status
from collections import deque


def create_order(db, logged_in_user_id):

    try: 

        cart = db.query(models_cart.Cart).filter(models_cart.Cart.user_id == logged_in_user_id).all()

        if not cart:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="cart is empty")

        sub_total = 0

        for cart_item in cart:
            product = db.query(models_products.Product).filter(models_products.Product.id == cart_item.product_id).first()

            if product is None:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="product not found")
            
            delivery_option = db.query(models_delivery_options.DeliveryOption).filter(models_delivery_options.DeliveryOption.delivery_option_id == cart_item.delivery_option_id).first()
            sub_total += (product.price * cart_item.quantity + delivery_option.shipping_price)
            
            
        tax = sub_total * 0.1
        total_price = sub_total + tax

        new_order = models_orders.Order(
            total_price = total_price,
            user_id = logged_in_user_id
        )


        db.add(new_order)
        db.flush()

        

        for cart_item in cart:

            product = db.query(models_products.Product).filter(models_products.Product.id == cart_item.product_id).first()
            if product is None:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="product not found")

            new_order_item = models_orders.OrderItem(
                price_at_purchase = product.price,
                quantity = cart_item.quantity,
                delivery_option_id = cart_item.delivery_option_id,
                order_id = new_order.order_id,
                product_id = cart_item.product_id
            )

            db.add(new_order_item)

        
        for cart_item in cart:
            db.delete(cart_item)


        db.commit()

        order_items = db.query(models_orders.OrderItem).filter(models_orders.OrderItem.order_id == new_order.order_id).all()

        return {
            "message" : "order successfully created",
            "order" : new_order,
            "order_item" : order_items
        }

    except Exception:
        db.rollback()
        raise




def get_orders(db, logged_in_user_id):

    orders = db.query(models_orders.Order).filter(models_orders.Order.user_id == logged_in_user_id).order_by(models_orders.Order.created_at.desc()).all()

    response_orders = []


    for order in orders:

        order_items = db.query(models_orders.OrderItem).filter(models_orders.OrderItem.order_id == order.order_id).all()

        response_orders.append({
            "order" : order,
            "order_items" : order_items
        })
    
    

    return response_orders