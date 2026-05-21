let productHTML = ``;

products.forEach((product) => {
    productHTML += `<div class="single-product-container">
                        <div class="single-product-image-container">
                            <img src="${product.image}" class="product-image">
                        </div>

                        <div class="product-name">
                            ${product.name}
                        </div>

                        <div class="product-rating-container">
                            <img src="/images/ratings/rating-${product.rating.stars * 10}.png" class="rating-image">
                            <div class="product-rating-count">
                                ${product.rating.count}
                            </div>
                        </div>

                        <div class="product-price">
                            ₹${product.price}
                        </div>


                        <div class="quantity-selector">
                            <select class="js-quantity-selector-${product.id}">
                                <option selected value="1">1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </select>
                        </div>

                        <div class="js-confirmation-message-${product.id}">   
                        </div>

                        <div class="add-to-cart">
                            <button class="add-to-cart-button js-add-to-cart-button" data-product-id="${product.id}">Add to cart</button>
                        </div>
                    </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productHTML;



document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        
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
        
        let cartQuantity = 0;
        cart.forEach((item) => {
            cartQuantity += item.quantity;
        });

        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
        
        
      

    });

});

