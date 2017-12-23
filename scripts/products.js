function Product(product, shoppingCart) {
    this.name = product.name;
    this.imgUrl = product.imgUrl;
    this.description = product.description;
    this.price = product.price;
    this.rating = product.rating;
    var inventory = 50;

    this.addToCart = function (btn) {
        btn.innerHTML = "Remove From Cart";
        btn.className = "ui secondary button right floated";
        shoppingCart.add(this);
    };

    this.removeFromCart = function (btn) {
        shoppingCart.remove(this);
        btn.innerHTML = 'Add To Cart';
        btn.className = "ui primary button right floated"
    };

    this.buy = function (quantity) {
        inventory -= quantity;
    }
}
