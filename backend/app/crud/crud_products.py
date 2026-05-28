from app.models import models_products
from fastapi import HTTPException, status


def create_new_product(product_data, db):
    try:
        new_product = models_products.Product(**product_data.model_dump())
        db.add(new_product)
        db.commit()
        db.refresh(new_product)

        return new_product
    
    except Exception:
        db.rollback()
        raise



def get_all_products(db):
    try:
        products_data = db.query(models_products.Product).all()

        return products_data
    
    except Exception:
        raise



def get_one_product(id, db):

    product_data = db.query(models_products.Product).filter(models_products.Product.id == id).first()

    if product_data is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="product not found")

    return product_data