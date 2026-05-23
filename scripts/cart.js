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
            quantity: quantity
        });

    }

    saveToStorage();
}