function Product(product, shoppingCart) {
    this.shoppingCart = shoppingCart;
    this.name = product.name;
    this.imgUrl = product.imgUrl;
    this.description = product.description;
    this.price = product.price;
    this.rating = product.rating;
}

Product.prototype.removeFromCart = function () {
    var productBtn = this.findProductElement(this).querySelector('button ');
    this.shoppingCart.remove(this);
    productBtn.innerHTML = 'Add To Cart';
    productBtn.className = "ui primary button right floated";
};

Product.prototype.addToCart = function (btn) {
    btn.innerHTML = 'Remove From Cart';
    btn.className = 'ui secondary button right floated';
    this.shoppingCart.add(this);
};


Product.prototype.buy = function (quantity) {
    this.inventory - quantity < 0 ? this.inventory = 0 : this.inventory -= quantity;
    this.removeFromCart();
};

Product.prototype.findProductElement = function (Product) {
    var elementHeader = Array.from(document.querySelectorAll('.card .content .header')).filter(function (el) {
        return el.innerText === Product.name;
    })[0];

    return elementHeader.parentElement.parentElement;
};