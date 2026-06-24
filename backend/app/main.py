from fastapi import FastAPI
from app.database import Base, engine
from app.models import models_products, models_users, models_cart, models_delivery_options
from app.routers import products, users, login, cart, orders, admin
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(products.router)
app.include_router(users.router)
app.include_router(login.router)
app.include_router(cart.router)
app.include_router(orders.router)
app.include_router(admin.router)



app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)










