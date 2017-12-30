function QuantifiableProduct(product, shoppingCart) {
    Product.call(this, product, shoppingCart);
    this.inventory = product.inventory;
}

QuantifiableProduct.prototype = Object.create(Product.prototype);
