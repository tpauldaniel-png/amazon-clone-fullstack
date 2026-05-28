from sqlalchemy import String, Integer, Numeric
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import text
from uuid import UUID
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from app.database import Base
from decimal import Decimal



class Product(Base):
    
    __tablename__ = "products"

    id: Mapped[UUID] = mapped_column(PG_UUID(as_uuid=True), nullable=False, primary_key=True, server_default=text("gen_random_uuid()"))
    image: Mapped[str] = mapped_column(String(100), nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    rating_stars: Mapped[Decimal] = mapped_column(Numeric(2,1), nullable=False)
    rating_count: Mapped[int] = mapped_column(Integer, nullable=False)
    price: Mapped[int] = mapped_column(Integer, nullable=False)


