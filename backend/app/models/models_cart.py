from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, text, ForeignKey
from app.database import Base
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from uuid import UUID



class Cart(Base):
    __tablename__ = "cart"

    cart_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, nullable=False, server_default=text("gen_random_uuid()"))
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    delivery_option_id: Mapped[int] = mapped_column(Integer, nullable=False)

    user_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("users.user_id"))
    product_id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), ForeignKey("products.id"))

