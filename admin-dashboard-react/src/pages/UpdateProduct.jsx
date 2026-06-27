import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import '../styles/updateProduct.css';


export function UpdateProduct() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [fileName, setFileName] = useState("");
    const [productRatingStars, setProductRatingStars] = useState("");
    const [productRatingCount, setProductRatingCount] = useState("");

    

    let params = useParams();

    const basePath = "/frontend/images/product_images/";
    const filePath = basePath + fileName;

    const token = localStorage.getItem('adminToken');

    async function handleUpdate(e) {
        e.preventDefault();

        try {
            const response = await fetch(`http://127.0.0.1:8000/admin/update_product/${params.productId}`, {
                method: "PUT",
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    image: filePath,
                    name: productName,
                    price: Number(productPrice),
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

            alert("Product Update Successful");

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const loadProductData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/admin/get_product/${params.productId}`, {
                    method: "GET",
                    headers: {
                        'Authorization' : `Bearer ${token}`,
                        'Content-Type' : 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error("failed to fetch product");
                }

                const product = await response.json();

                const productFileName = product.image.replace("/frontend/images/product_images/", "")

                setProductName(product.name);
                setProductPrice(product.price);
                setFileName(productFileName);
                setProductRatingStars(product.rating_stars);
                setProductRatingCount(product.rating_count);




            } catch (error) {
                console.log("Failed to load json", error);
            }
        
        }

        loadProductData();
    }, [])




    return (
        <>
            <div className="update-product-form">
                <form onSubmit={handleUpdate}>
                    <h1 className="update-product-heading">UPDATE PRODUCT</h1>

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
                        <button type="submit" className="update-button">UPDATE PRODUCT</button>
                    </div>
                </form>
            </div>

            
        </>
    )
}

