import {addToCart} from './cart.js';
import {products, loadProducts} from './products.js';


loadProducts(renderProductsGrid);

function renderProductsGrid() {

    let productHTML = ``;

    products.forEach((product) => {
        productHTML += `<div class="single-product-container">
                            <div class="single-product-image-container">
                                <img src="${product.image}" class="product-image">
                            </div>

                            <div class="product-name">
                                ${product.name}
                            </div>

                            <div class="product-rating-container">
                                <img src="/frontend/images/ratings/rating-${product.rating_stars * 10}.png" class="rating-image">
                                <div class="product-rating-count">
                                    (${product.rating_count})
                                </div>
                            </div>

                            <div class="product-price">
                                ₹${product.price}
                            </div>


                            <div class="quantity-selector">
                                <select class="js-quantity-selector-${product.id}">
                                    <option selected value="1">1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                </select>
                            </div>

                            <div class="js-confirmation-message-${product.id}">   
                            </div>

                            <div class="add-to-cart">
                                <button class="add-to-cart-button js-add-to-cart-button" data-product-id="${product.id}">Add to cart</button>
                            </div>
                        </div>`;
    });

    document.querySelector('.js-products-grid').innerHTML = productHTML;

 
    

    async function updateCartQuantity(token) {

        try {
            const response = await fetch("http://127.0.0.1:8000/cart", {
                method: "GET",
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type' : 'application/json'
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(`HTTP Error! status-- ${response.status}`)
            }


            let cartQuantity = 0;

            result.user_cart.forEach((item) => {
                cartQuantity += item.quantity;
            });

            document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;



        } catch (error) {
            console.log(error)
        }



    }







    document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
        button.addEventListener('click', async () => {
            const productId = button.dataset.productId;
            
            const token = localStorage.getItem('jwtAccessToken');

           

            await addToCart(productId, token);

            updateCartQuantity(token);
            
            
        });
    });


    
    const token = localStorage.getItem('jwtAccessToken');

    getUserData(token)

    


    async function getUserData(token) {

        try {
            const response = await fetch("http://127.0.0.1:8000/users/me", {
                method: "GET",
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type' : 'application/json'
                }

            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(`HTTP Error! status-- ${response.status}`)
            }

            localStorage.setItem('loggedInUser', result.user_id)
        } catch (error) {
            console.log(error)
        }   
        
    }


    document.querySelector('.js-logout-link').addEventListener('click', () => {
        localStorage.removeItem('jwtAccessToken');
        localStorage.removeItem('loggedInUser');

         window.location.href = '/frontend/login.html';
    });

}






