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

                        <div class="add-to-cart">
                            <button class="add-to-cart-button">Add to cart</button>
                        </div>
                    </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productHTML;

