function ProductList() {
    var productList = [];
    var productsFileUrl = '../assets/products.json';
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            initializeData(JSON.parse(xhr.responseText));
        }
        if (this.readyState === 4 && this.status === 404) {
            showError();
        }
    };

    xhr.open('GET', productsFileUrl, true);
    xhr.send();
    var productsContainer = document.querySelector('#products-list');

    function initializeData(data) {
        var productsRenderer = new ProductRenderer();
        var shoppingCart = new ShoppingCart();
        productList = data.map(function (value) {
            var product;
            value.inventory ? product = new QuantifiableProduct(value, shoppingCart) : product = new Product(value, shoppingCart);

            return product;
        });

        productList.forEach(function (value) {
            productsRenderer.render(value, productsContainer)
        });
    }

    function showError() {
        var errorContainer = document.createElement('div');
        errorContainer.className = 'ui negative message';

        var errorMessage = document.createElement('div');
        errorMessage.className = 'header';
        errorMessage.innerText = 'Unable to load product. Please contact your nearest Amaromach branch';

        errorContainer.appendChild(errorMessage);
        productsContainer.appendChild(errorContainer)
    }

    QuantifiableProduct.prototype.buy = function (quantity) {
        this.inventory -= quantity;
        this.removeFromCart();
        var product = this;
        if (!this.inventory) {
            var elementHeader = Array.from(document.querySelectorAll('.card .content .header')).filter(function (el) {
                return el.innerText === product.name;
            })[0];

            var card = elementHeader.parentElement.parentElement;
            card.querySelector('.out-of-stock').style.opacity = '1';
            card.querySelector('button ').className = 'ui button disabled';
        }
    };

    Product.prototype.removeFromCart = function () {
        var productBtn = GetProductElement(this).querySelector('button');
        this.shoppingCart.remove(this);
        productBtn.innerHTML = 'Add To Cart';
        productBtn.className = "ui primary button right floated"
    };

    function GetProductElement(product) {
        var productIndex = productList.indexOf(product);
        return productsContainer.querySelector('.card:nth-child(' + (productIndex + 1) + ')');
    }
}