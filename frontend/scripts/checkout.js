import {renderOrderSummary} from './orderSummary.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {loadProducts, getProducts} from './products.js';

import {getCart} from './cart.js';

const token = localStorage.getItem('jwtAccessToken');

async function checkOut(token) {
   const cart = await getCart(token);

   const products = await getProducts();

   renderOrderSummary(cart, products);

   renderPaymentSummary(cart, products)

}

checkOut(token);



/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/



