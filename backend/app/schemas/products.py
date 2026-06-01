from pydantic import BaseModel
from uuid import UUID
from decimal import Decimal


class ProductCreate(BaseModel):
    image: str
    name: str
    rating_stars: Decimal
    rating_count: int
    price: int

class ProductOut(BaseModel):
    id: UUID
    image: str
    name: str
    rating_stars: Decimal
    rating_count: int
    price: int

    class Config:
        from_attributes = True

class ProductCreateResponse(BaseModel):
    message: str
    product: ProductOut


class ProductsResponse(BaseModel):
    products: list[ProductOut]

    