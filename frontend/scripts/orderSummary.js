import {getCart, removeFromCart, updateQuantity, updateDeliveryOption} from './cart.js';
import {getProducts} from './products.js';
import {deliveryOptions} from './deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';










export function renderOrderSummary (cart, products) {




    let cartItemHTML = ``;

    cart.forEach((cartItem) => {
        const productId = cartItem.product_id;

        let matchingProduct;

        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
        });




        const deliveryOptionId = String(cartItem.delivery_option_id);

        let deliveryOption;

        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
                deliveryOption = option;
            }
        });

        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
        );
        const dateString = deliveryDate.format('dddd, MMMM D');

        



        

        cartItemHTML += `<div class="item-container js-item-container-${matchingProduct.id}">
                            <div class="delivery-date">
                                Delivery date: ${dateString}
                            </div>
                            
                            <div class="cart-item-details-grid">
                                <img src="${matchingProduct.image}" class="product-image">
                                <div class="cart-item-details">
                                    <div class="product-name">${matchingProduct.name}</div>
                                    <div class="product-price">₹${matchingProduct.price}</div>
                                    <div class="product-quantity">
                                        Quantity: <span class="quantity-nos js-quantity-nos-${matchingProduct.id}">${cartItem.quantity}</span>
                                        <span class="link-update js-link-update" data-product-id="${matchingProduct.id}">Update</span>
                                        <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                                        <span class="link-save js-link-save" data-product-id="${matchingProduct.id}">Save</span>
                                        <span class="link-delete js-link-delete" data-product-id="${matchingProduct.id}">Delete</span>
                                    </div>
                                </div>
                                
                                <div class="delivery-options-1">
                                    <div class="delivery-header-text">Choose a delivery option:</div>
                                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                                    

                            </div>

                            

                            </div>
                            
                        </div>`;





    });



    function deliveryOptionsHTML (matchingProduct, cartItem) {
        let optionsHTML = '';

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,
                'days'
            );
            const dateString = deliveryDate.format('dddd, MMMM D');

            const priceString = deliveryOption.shippingPrice === 0 ? 'Free' : `₹${deliveryOption.shippingPrice} -`;

            
            const isChecked = deliveryOption.id === String(cartItem.delivery_option_id);


            optionsHTML += `
                <div class="delivery-option-selection js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                    <div> 
                        <div class="delivery-option-date">${dateString}</div>
                        <div class="delivery-option-price">${priceString} Shipping</div>
                    </div>
                </div>
            
            `
        })

        return optionsHTML;
    }





    document.querySelector('.js-order-summary').innerHTML = cartItemHTML;


    document.querySelectorAll('.js-link-delete').forEach((link) => {
        link.addEventListener('click', async () => {
            const productId = link.dataset.productId;
            
            const token = localStorage.getItem('jwtAccessToken');

            await removeFromCart(productId, token);

            const container = document.querySelector(`.js-item-container-${productId}`);

            container.remove();

            await updateCheckOutQuantity(token);

            const updatedCart = await getCart(token);
            
            renderOrderSummary(updatedCart, products);
            renderPaymentSummary(updatedCart, products);

        });
    });




    async function updateCheckOutQuantity(token) {

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






    const token = localStorage.getItem('jwtAccessToken');


    updateCheckOutQuantity(token);



    document.querySelectorAll('.js-link-update').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;

        

            const container = document.querySelector(`.js-item-container-${productId}`);

            container.classList.add('editing-cart-quantity');


            
        });
    });


    document.querySelectorAll('.js-link-save').forEach((link) => {
        link.addEventListener('click', async () => {
            const productId = link.dataset.productId;

            const container = document.querySelector(`.js-item-container-${productId}`);
            container.classList.remove('editing-cart-quantity');

            const inputQuantity = document.querySelector(`.js-quantity-input-${productId}`);
            const newQuantity = Number(inputQuantity.value);

            const token = localStorage.getItem('jwtAccessToken');


            await updateQuantity(productId, newQuantity, token);

            document.querySelector(`.js-quantity-nos-${productId}`).innerHTML = newQuantity;

            await updateCheckOutQuantity(token);

            const updatedCart = await getCart(token); 

            renderOrderSummary(updatedCart, products);
            renderPaymentSummary(updatedCart, products);
            

        });
    });


    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', async () => {

            const {productId,deliveryOptionId} = element.dataset
            const token = localStorage.getItem('jwtAccessToken');

            await updateDeliveryOption(productId, deliveryOptionId, token);

            const updatedCart = await getCart(token);

            renderOrderSummary(updatedCart, products);
            renderPaymentSummary(updatedCart, products);
        });
    });

}






