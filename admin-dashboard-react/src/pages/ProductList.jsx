import {useState, useEffect, useRef} from 'react';
import '../styles/productList.css';


export function ProductList() {
    const [products, setProducts] = useState([]);

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        const productData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/admin/get_products", {
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

                setProducts(data.products);

            } catch (error) {
                console.log("Failed to load json", error);
            }  

        }
        productData();
    }, [])



    return (
        <>
            <div className="product-grid">
                {products.map((product) => {
                    return (
                        <div key={product.id} className="product-container">
                            <img src={product.image.replace("/frontend", "")} alt="product-image" className="product-pic"/>
                            <div className="product-details">
                                <div className="product-name">{product.name}</div>
                                <div className="product-price">₹{product.price}</div>
                                <div className="product-rating-container">
                                    <img src={`/images/ratings/rating-${product.rating_stars * 10}.png`} className="rating-image" />
                                    <div className="product-rating-count">
                                        ({product.rating_count})
                                    </div>
                                </div>
                                <div className="update-container">
                                    <div>Edit</div>
                                    <div>Delete</div>
                                </div>

                            </div>

                        </div>
                    )
                })}
            </div>
        </>
    )
}