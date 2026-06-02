from app.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer


class DeliveryOption(Base):
    __tablename__ = "delivery_options"

    delivery_option_id: Mapped[int] = mapped_column(Integer, nullable=False, primary_key=True)
    delivery_days: Mapped[int] = mapped_column(Integer, nullable=False)
    shipping_price: Mapped[int] = mapped_column(Integer, nullable=False)

