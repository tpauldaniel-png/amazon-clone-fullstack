import {cart, removeFromCart} from './cart.js';
import {products} from './products.js';

let cartItemHTML = ``;

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    

    cartItemHTML += `<div class="item-container js-item-container-${matchingProduct.id}">
                        <div class="delivery-date">
                            Delivery date: Wednesday, May 20
                        </div>
                        
                        <div class="cart-item-details-grid">
                            <img src="${matchingProduct.image}" class="product-image">
                            <div class="cart-item-details">
                                <div class="product-name">${matchingProduct.name}</div>
                                <div class="product-price">₹${matchingProduct.price}</div>
                                <div class="product-quantity">
                                    Quantity: <span class="quantity-nos">${cartItem.quantity}</span>
                                    <span class="link-update">Update</span>
                                    <span class="link-delete js-link-delete" data-product-id="${matchingProduct.id}">Delete</span>
                                </div>
                            </div>
                            
                            <div class="delivery-options-1">
                                <div class="delivery-header-text">Choose a delivery option:</div>

                                <div class="delivery-option-selection">
                                    <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                                    <div> 
                                        <div class="delivery-option-date">Wednesday,May 20</div>
                                        <div class="delivery-option-price">Free Shipping</div>
                                    </div>
                                </div>

                                <div class="delivery-option-selection">
                                    <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                                    <div>
                                        <div class="delivery-option-date">Friday,May 15</div>
                                        <div class="delivery-option-price">₹40 - Shipping</div>
                                    </div>
                                </div>

                                <div class="delivery-option-selection">
                                    <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                                    <div>
                                        <div class="delivery-option-date">Wednesday,May 13</div>
                                        <div class="delivery-option-price">₹50 - Shipping</div>
                                    </div>
                            </div>

                        </div>

                        

                        </div>
                        
                    </div>`;





});

document.querySelector('.js-order-summary').innerHTML = cartItemHTML;


document.querySelectorAll('.js-link-delete').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        
        removeFromCart(productId);

        const container = document.querySelector(`.js-item-container-${productId}`);

        container.remove();

    });
});
