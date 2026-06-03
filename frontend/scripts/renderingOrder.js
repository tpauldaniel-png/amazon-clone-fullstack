import {deliveryOptions} from './deliveryOptions.js';

export function renderOrderPage (orders, products, userData) {
    let orderHTML = ``;

    orders.forEach((orderData) => {
        const orderHeader = orderData.order

        const orderItems = orderData.order_items

        orderHTML += `<div class="order-container">
                            <div class="total-order-details">
                                <div class="order-id">Order id : ${orderHeader.order_id}</div>
                                <div class="order-date">Order date : ${orderHeader.created_at}</div>
                                <div class="total-price">Order Total (Including tax of 10%) : ₹${orderHeader.total_price}</div>
                            </div>

                            <div class="order-item-container">
                                ${renderOrderItemHTML(orderItems, products)}
                            </div>

                        </div>`;





    });

    function renderOrderItemHTML (orderItems, products) {
        let orderItemHTML = ``;

        orderItems.forEach((orderItem) => {

            const productId = orderItem.product_id;

            let matchingProduct;

            products.forEach((product) => {
                if (product.id === productId) {
                    matchingProduct = product;
                }
            });

            const deliveryOptionId = String(orderItem.delivery_option_id)

            let deliveryOptionRequired;

            deliveryOptions.forEach((deliveryOptions) => {
                if (deliveryOptions.id === deliveryOptionId) {
                    deliveryOptionRequired = deliveryOptions;
                }
            });

            const today = dayjs();
            const deliveryDate = today.add(deliveryOptionRequired.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');


            orderItemHTML += `<img src="${matchingProduct.image}" class="product-image">
                                <div class="order-item-details">
                                    <div class="product-name">${matchingProduct.name}</div>
                                    <div class="product-quantity">Quantity : ${orderItem.quantity}</div>
                                    <div class="product-price">Product price: ₹${matchingProduct.price}</div>
                                    <div class="product-shipping-price">Shipping-charge: ₹${deliveryOptionRequired.shippingPrice}</div>
                                    <div class="product-delivery-date">Arriving By ${dateString}</div>
                                </div>`;

        

        });

        return orderItemHTML;
    }


    document.querySelector('.js-order-summary').innerHTML = orderHTML;


    document.querySelector('.js-intro-name').innerHTML = userData.first_name + ' ' + userData.last_name;

    


    
        
}