from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class OrderOut(BaseModel):
    order_id : UUID
    total_price: int
    created_at : datetime
    user_id: UUID

    class Config:
        from_attributes = True

class OrderItemOut(BaseModel):
    order_item_id: UUID
    price_at_purchase : int
    quantity : int
    delivery_option_id : int
    order_id: UUID
    product_id : UUID

    class Config:
        from_attributes = True


class OrderCreateResponse(BaseModel):
    message: str
    order : OrderOut
    order_item: list[OrderItemOut]





class OrderWithItems(BaseModel):
    order: OrderOut
    order_items:list[OrderItemOut]

    class Config:
        from_attributes = True


class OrderWithItemsResponse(BaseModel):
    orders : list[OrderWithItems]

