


export async function addToCart(productId, token) {
    
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`)

    const quantity = Number(quantitySelector.value);
    
    
    
    const cartItem = {
        product_id : productId,
        quantity : quantity,
        delivery_option_id : 1 
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/cart", {
            method : "POST",
            body: JSON.stringify(cartItem),
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        });
        const result = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP ERROR! status--${response.status}`)
        }

    } catch (error) {
        console.log(error)
    }


}



export async function getCart(token) {

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

    return result.user_cart;

    } catch (error) {
        console.log(error);
        return [];
    }
}



export async function removeFromCart(productId, token) {
    const cart = await getCart(token);

    let matchingItem;
    cart.forEach((item) => {
            if (item.product_id == productId) {
                matchingItem = item
            }
    });

    if (!matchingItem) return;

    try {
    const response = await fetch(`http://127.0.0.1:8000/cart/${matchingItem.cart_id}`, {
            method: "DELETE",
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
    });

    } catch (error) {
        console.log(error);
    }
}





export async function updateQuantity(productId, newQuantity, token) {
    const cart = await getCart(token);

    let matchingItem;
    cart.forEach((item) => {
            if (item.product_id == productId) {
                matchingItem = item
            }
    });

    if (!matchingItem) return;

    const cartItem = {
        quantity: newQuantity,
        delivery_option_id: matchingItem.delivery_option_id
    };

    try {
        const response = await fetch(`http://127.0.0.1:8000/cart/${matchingItem.cart_id}`, {
            method : "PUT",
            body : JSON.stringify(cartItem),
            headers : {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        });

        const result = await response.json();


        if (!response.ok) {
            throw new Error(`HTTP ERROR! status--${response.status}`)
        }
    } catch (error) {
        console.log(error);
    }
}



export async function updateDeliveryOption(productId, deliveryOptionId, token) {
    const cart = await getCart(token);

    let matchingItem;
    cart.forEach((item) => {
            if (item.product_id == productId) {
                matchingItem = item
            }
    });

    if (!matchingItem) return;

    const cartItem = {
        quantity: matchingItem.quantity,
        delivery_option_id: deliveryOptionId
    };

    try {
        const response = await fetch(`http://127.0.0.1:8000/cart/${matchingItem.cart_id}`, {
            method : "PUT",
            body : JSON.stringify(cartItem),
            headers : {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        });

        const result = await response.json();


        if (!response.ok) {
            throw new Error(`HTTP ERROR! status--${response.status}`)
        }
    } catch (error) {
        console.log(error);
    }
}








/*

export let cart = JSON.parse(localStorage.getItem('cart')) || [];



function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}



export function addToCart (productId) {

    let matchingItem;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item
        }
    });


    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`)

    const quantity = Number(quantitySelector.value);


    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionId: '1'
        });

    }

    saveToStorage();
}



export function removeFromCart (productId) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            const indexToDelete = cart.findIndex((cartItem) => {
                return cartItem.productId === productId;
            });
            cart.splice(indexToDelete, 1);
        }
    });

    saveToStorage();
}




export function updateQuantity (productId, newQuantity) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.quantity = newQuantity;
        }
    })

    saveToStorage();
}


export function updateDeliveryOption (productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}   

*/