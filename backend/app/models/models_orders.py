from app.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import text, String, Integer, ForeignKey, DateTime
from uuid import UUID
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from datetime import datetime





class Order(Base):
    __tablename__ = "orders"

    order_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), nullable=False, primary_key=True, server_default=text("gen_random_uuid()"))
    total_price: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP"))

    user_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.user_id"))


class OrderItem(Base):
    __tablename__ = "order_items"

    order_item_id:  Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), nullable=False, primary_key=True, server_default=text("gen_random_uuid()"))
    price_at_purchase: Mapped[int] = mapped_column(Integer, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    delivery_option_id: Mapped[int] = mapped_column(Integer, nullable=False)


    order_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("orders.order_id"))
    product_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("products.id"))
