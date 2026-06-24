import {useState, useEffect} from 'react';
import ProductImage from '../assets/home-appliances-card.jpg';
import People from '../assets/people.jpg';
import Orders from '../assets/order.avif';
import Revenue from '../assets/revenue-card.jpg';
import '../styles/adminDashboardHome.css';

export function AdminDashboardHome() {
    const [cardData, setCardData] = useState(null)
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        async function loadCardData () {
            try {
                const response = await fetch("http://127.0.0.1:8000/admin/stats", {
                    method: "GET",
                    headers: {
                        'Authorization' : `Bearer ${token}`,
                        'Content-Type' : 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error("failed to fetch user");
                }

                const data = await response.json();

                setCardData(data);
            } catch (error) {
                console.log("Failed to load json", error);
            }
        }
        loadCardData();
    }, [])



    return (
        <>  
            <div className="card-grid">
                <div className="card">
                    <img src={ProductImage} alt="Products-image" />
                    <p>Total Products: {cardData?.total_products}</p>
                </div>

                <div className="card">
                    <img src={People} alt="People-image" />
                    <p>Total users: {cardData?.total_users}</p>
                </div>

                <div className="card">
                    <img src={Orders} alt="order-image" />
                    <p>Total orders: {cardData?.total_orders}</p>
                </div>

                <div className="card">
                    <img src={Revenue} alt="money-image" />
                    <p>Total revenue: ₹{cardData?.total_revenue}</p>
                </div>
            </div>
        </>
    )
}
