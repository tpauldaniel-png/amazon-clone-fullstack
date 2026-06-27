import {useState, useEffect} from 'react';
import '../styles/addProduct.css';

export function AddProduct() {
    const [productName, setProductName] = useState("");
    const [fileName, setFileName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productRatingStars, setProductRatingStars] = useState("");
    const [productRatingCount, setProductRatingCount] = useState("");


    const basePath = "/frontend/images/product_images/";
    const filePath = basePath + fileName;

    const token = localStorage.getItem('adminToken');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/admin/add_product", {
                method : "POST",
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    image : filePath,
                    name : productName,
                    price : Number(productPrice),
                    rating_stars : Number(productRatingStars),
                    rating_count : Number(productRatingCount)
                })
            });

            if (!response.ok) {
                alert("Invalid credentials");
                return;
            }

            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="add-product-form">
                <form onSubmit={handleSubmit}>
                    <h1 className="addproduct-heading">ADD PRODUCT</h1>

                    <div>
                        <label htmlFor="name">Product Name</label>
                    </div>

                    <div>
                        <input 
                            type="text" name="name" id="name" placeholder="Enter Product Name here" autoFocus required
                            value={productName} onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <br />

                    <div>
                        <label htmlFor="image">Image File Name</label>
                    </div>

                    <div>
                        <input 
                            type="text" name="image" id="image" placeholder="Enter image filename here" required
                            value={fileName} onChange={(e) => setFileName(e.target.value)}
                        />
                    </div>
                    <br />

                    <div>
                        <label htmlFor="price">Product Price</label>
                    </div>

                    <div>
                        <input 
                            type="number" name="price" id="price" placeholder="Enter product price here" required
                            value={productPrice} onChange={(e) => setProductPrice(e.target.value)}
                        />
                    </div>
                    <br />

                    <div>
                        <label htmlFor="rating_stars">Rating stars</label>
                    </div>

                    <div>
                        <input 
                            type="number" name="rating_stars" id="rating_stars" placeholder="Enter rating stars [1-5] here" 
                            min="1" max="5" step="0.5" required value={productRatingStars} 
                            onChange={(e) => setProductRatingStars(e.target.value)}
                        />
                    </div>
                    <br />

                    <div>
                        <label htmlFor="rating_count">Rating count</label>
                    </div>

                    <div>
                        <input 
                            type="number" name="rating_count" id="rating_count" placeholder="Enter rating count here" required
                            value={productRatingCount} onChange={(e) => setProductRatingCount(e.target.value)}
                        />
                    </div>
                    <br />
                    

                    <div>
                        <button type="submit" className="add-button">ADD PRODUCT</button>
                    </div>


                </form>
            </div>
        </>
    )
}