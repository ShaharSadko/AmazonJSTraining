function QuantifiableProduct(product, shoppingCart) {
    Product.call(this, product, shoppingCart);
    this.inventory = product.inventory;

    this.buy = function (quantity) {
        this.inventory -= quantity;
        this.removeFromCart();
        if (!this.inventory) {
            notifyElementOutOfStock();
        }
    };

    function notifyElementOutOfStock() {
        var card = this.findProductElement(this);
        card.querySelector('.out-of-stock').style.opacity = '1';
        card.querySelector('button ').className = 'ui button disabled';
    }
}

QuantifiableProduct.prototype = Object.create(Product.prototype);