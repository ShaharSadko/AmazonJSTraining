function Product(product, shoppingCart) {
    this.shoppingCart = shoppingCart;
    this.name = product.name;
    this.imgUrl = product.imgUrl;
    this.description = product.description;
    this.price = product.price;
    this.rating = product.rating;
}

Product.prototype.addToCart = function (btn) {
    btn.innerHTML = 'Remove From Cart';
    btn.className = 'ui secondary button right floated';
    this.shoppingCart.add(this);
};


Product.prototype.buy = function (quantity) {
    this.inventory - quantity < 0 ? this.inventory = 0 : this.inventory -= quantity;
    this.removeFromCart();
};