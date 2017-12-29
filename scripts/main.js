(function () {
    var productsFileUrl = '../assets/products.json';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            initializeData(JSON.parse(xhttp.responseText));
        }
        if (this.readyState === 4 && this.status === 404) {
            showError();
        }
    };
    xhttp.open("GET", productsFileUrl, true);
    xhttp.send();
    var productList = document.querySelector('#products-list');

    function initializeData(data) {
        var productsRenderer = new ProductRenderer();
        var shoppingCart = new ShoppingCart();
        var products = data.map(function (value) {
            return new Product(value, shoppingCart);
        });

        products.forEach(function (value) {
            productsRenderer.render(value, productList)
        });
    }

    function showError() {
        var errorContainer = document.createElement('div');
        errorContainer.className = 'ui negative message';

        var errorMessage = document.createElement('div');
        errorMessage.className = 'header';
        errorMessage.innerText = 'Unable to load product. Please contact your nearest Amaromach branch';

        errorContainer.appendChild(errorMessage);
        productList.appendChild(errorContainer)
    }

    $('.dropdown').dropdown({transition: 'drop'}).dropdown({on: 'hover'});
})();