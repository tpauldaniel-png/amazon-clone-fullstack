from app.models import models_cart
from fastapi import HTTPException, status, Response

def create_cart(cart, db, logged_in_user_id):

    try: 
        existing_cart = db.query(models_cart.Cart).filter(models_cart.Cart.product_id == cart.product_id, models_cart.Cart.user_id == logged_in_user_id).first()

        if existing_cart is not None:
            existing_cart.quantity += cart.quantity

            db.commit()
            db.refresh(existing_cart)

            return existing_cart

        if existing_cart is None:
            new_cart = models_cart.Cart(
                user_id = logged_in_user_id,
                product_id = cart.product_id,
                quantity = cart.quantity,
                delivery_option_id = cart.delivery_option_id
            )

            db.add(new_cart)
            db.commit()
            db.refresh(new_cart)

            return new_cart

    except Exception:
        db.rollback()
        raise
    



def get_user_cart(db, logged_in_user_id):

    
    user_cart = db.query(models_cart.Cart).filter(models_cart.Cart.user_id == logged_in_user_id).all()

    
    
    return user_cart




def update_cart_item(cart_id, update_cart_data, db, logged_in_user_id):

    try:
        required_cart = db.query(models_cart.Cart).filter(models_cart.Cart.cart_id == cart_id, models_cart.Cart.user_id == logged_in_user_id).first()


        if required_cart is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= "cart item not found")
        
        required_cart.quantity = update_cart_data.quantity
        required_cart.delivery_option_id = update_cart_data.delivery_option_id

        db.commit()

        db.refresh(required_cart)

        return required_cart
    
    except Exception:
        db.rollback()
        raise



def delete_cart_item(cart_id, db, logged_in_user_id):

    try:

        cart_item = db.query(models_cart.Cart).filter(models_cart.Cart.cart_id == cart_id, models_cart.Cart.user_id == logged_in_user_id).first()

        if cart_item is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="cart item not found for the given id")

        db.delete(cart_item)

        db.commit()

        return Response(status_code=status.HTTP_204_NO_CONTENT)
    
    except Exception:
        db.rollback()
        raise