function Product(product, shoppingCart) {
    this.name = product.name;
    this.imgUrl = product.imgUrl;
    this.description = product.description;
    this.price = product.price;
    this.rating = product.rating;
    this.inventory = product.inventory;
    var productBtn;

    this.addToCart = function (btn) {
        productBtn = btn;
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
        product.inventory - quantity < 0 ? product.inventory = 0 : product.inventory -= quantity;
        this.removeFromCart(productBtn);
    }
}
