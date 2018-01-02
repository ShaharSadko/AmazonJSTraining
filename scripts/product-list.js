function getProducts() {
    var productList = [];
    var productsFileUrl = '../assets/products.json';
    var productsContainer = document.querySelector('#products-list');
    getRequest(productsFileUrl);

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
}

function getRequest(url)
{
 var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            initializeData(JSON.parse(xhr.responseText));
        }
        if (this.readyState === 4 && this.status === 404) {
            showError();
        }
    };

    xhr.open('GET', url, true);
    xhr.send();

}
