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
        btn.innerHTML = 'Remove From Cart';
        btn.className = 'ui secondary button right floated';
        shoppingCart.add(this);
    };

    this.removeFromCart = function () {
        shoppingCart.remove(this);
        if (!this.inventory) {
            productBtn.className = 'ui disabled button';
            productBtn.innerHTML = "out of stock";
        }
        else {
            productBtn.innerHTML = 'Add To Cart';
            productBtn.className = "ui primary button right floated"
        }
    };

    this.buy = function (quantity) {
        this.inventory - quantity < 0 ? this.inventory = 0 : this.inventory -= quantity;
        this.removeFromCart(productBtn);
    }
}
