import {useState, useEffect} from 'react';
import '../styles/orderList.css';
import dayjs from 'dayjs';

export function OrderList() {

    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const token = localStorage.getItem('adminToken');

    useEffect (() => {
        const orderData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/admin/get_orders", {
                    method: "GET",
                    headers: {
                        'Authorization' : `Bearer ${token}`,
                        'Content-Type' : 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error("failed to fetch order");
                }

                const data = await response.json();

                setOrders(data.orders);

            } catch (error) {
                console.log("Failed to load json", error);
            }

        }

        orderData();
    }, [])


    async function handleViewItems(order_id) {

        setSelectedOrderId(order_id);

        try {
            const response = await fetch(`http://127.0.0.1:8000/admin/get_order_items/${order_id}`,{
                method: "GET",
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type' : 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("failed to fetch order items");
            }

            const data = await response.json();

            setOrderItems(data.order_items);

        } catch (error) {
            console.log("Failed to load json", error);
        }
    }




    return (
        <>
            <div className="order-grid">
                {orders.map((order) =>{
                    return (
                        <div key={order.order_id} className="order-container">
                            <div className="order-id"><span className="heading">Order Id: </span>{order.order_id}</div>
                            <div className="customer-name"><span className="heading">Customer Name: </span>{order.customer_name}</div>
                            <div className="order-date"><span className="heading">Order Date: </span>{dayjs(order.created_at).format("DD MMM YYYY, hh:mm A")}</div>
                            <div className="customer-email"><span className="heading">Customer Email: </span>{order.customer_email}</div>
                            
                            <div className="total-price"><span className="heading">Order Total: </span>₹{order.total_price}</div>
                            <div>
                                <button type="submit" className="view-items-button" onClick={() => handleViewItems(order.order_id)}>View Items</button>
                            </div>
                            {selectedOrderId === order.order_id && (
                                <div className="order-item-grid">
                                    {orderItems.map((orderItem) => {
                                        return (
                                            <div className="order-item-container">
                                                <img src={orderItem.image.replace("/frontend", "")} alt="product-image" className="product-pic" />
                                                <div>
                                                    <div className="product-name">{orderItem.product_name}</div>
                                                    <div className="quantity">Quantity: {orderItem.quantity}</div>
                                                    <div className="product-price">Price: ₹{orderItem.price_at_purchase}</div>
                                                </div>
                                            </div>

                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </>
    )
}