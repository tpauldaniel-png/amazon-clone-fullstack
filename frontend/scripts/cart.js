


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