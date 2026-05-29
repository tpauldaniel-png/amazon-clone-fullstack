import {renderOrderSummary} from './orderSummary.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {loadProducts} from './products.js';


loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});




