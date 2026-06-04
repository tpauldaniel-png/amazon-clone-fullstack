import {getProducts} from './products.js';
import {renderOrderPage} from './renderingOrder.js';



const token = localStorage.getItem('jwtAccessToken');




orderPageSummary(token);


async function orderPageSummary(token) {
    const orders = await get_orders(token);

    const products = await getProducts();

    const userData = await getUserName(token)

    renderOrderPage(orders, products, userData);

}









async function get_orders(token) {

    try {
        const response = await fetch("http://127.0.0.1:8000/orders", {
            method : "GET",
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        });
        const result = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP Error! status-- ${response.status}`)
        }

        return result.orders;

    } catch (error) {
        console.log(error);
    }
}



async function getUserName(token) {

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

            return result;
        } catch(error) {
            console.log(error);
        }  
    }









