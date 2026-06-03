
import {getProduct} from './products.js';
import {deliveryOptions, getDeliveryOption} from './deliveryOptions.js';


export function renderPaymentSummary (cart, products) {

    let productPrices = 0;
    let shippingPrice = 0;
    cart.forEach((cartItem) => {
        
        const product = getProduct(cartItem.product_id, products);
        productPrices += product.price * cartItem.quantity;

        const deliveryOption = getDeliveryOption(String(cartItem.delivery_option_id));
        shippingPrice += deliveryOption.shippingPrice;
    })


    const totalBeforeTax = productPrices + shippingPrice;
    const estimatedTax = totalBeforeTax * 0.1;

    const orderTotal = totalBeforeTax + estimatedTax;

    const numberOfItems = checkoutItems(cart);

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>
    


        <div class="payment-summary-row">
            <div>items(${numberOfItems}):</div>
            <div class="payment-summary-money">₹${productPrices}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping:</div>
            <div class="payment-summary-money">₹${shippingPrice}</div>
        </div>
        
        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${totalBeforeTax}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated Tax (10%):</div>
            <div class="payment-summary-money">₹${estimatedTax}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order Total:</div>
            <div class="payment-summary-money">₹${orderTotal}</div>
        </div>

        <button class="place-order-button js-place-order-button">Place your order</button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;


    function checkoutItems () {
        let cartQuantity = 0;
        cart.forEach((item) => {
            cartQuantity += item.quantity;
        });

        return cartQuantity;
    }

    document.querySelector('.js-place-order-button').addEventListener('click', async () => {

        try {
            const token = localStorage.getItem('jwtAccessToken');

            const response = await fetch("http://127.0.0.1:8000/orders", {
                method : "POST",
                headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
                }
            });

            const result = await response.json();

            if (!response.ok) {
            throw new Error(`HTTP Error! status-- ${response.status}`)
            }

            window.location.href = '/frontend/orders.html';

        } catch (error) {
            console.log(error);
        }

    });

}

