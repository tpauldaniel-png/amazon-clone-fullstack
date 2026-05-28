
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import models_products
from app.schemas.products import ProductCreate, ProductCreateResponse, ProductsResponse, ProductOut
from app.crud import crud_products
from uuid import UUID





router = APIRouter(
    prefix = "/products",
    tags = ['Products']
)

@router.post("/", response_model=ProductCreateResponse, status_code=status.HTTP_201_CREATED)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):

    new_product = crud_products.create_new_product(product, db)

    return {
        "message" : "Product Successfully created",
        "product" : new_product
    }



@router.get("/", response_model=ProductsResponse)
def get_products(db: Session = Depends(get_db)):

    products_data = crud_products.get_all_products(db)

    return {
        "products" : products_data
    }


@router.get("/{id}", response_model=ProductOut)
def get_product(id: UUID, db: Session = Depends(get_db)):

    product = crud_products.get_one_product(id, db)

    return product

    

    
    


