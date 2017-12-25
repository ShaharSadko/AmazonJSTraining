(function () {
    var productsFileUrl = 'assets/products.json';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            initializeData(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.open("GET", productsFileUrl, true);
    xhttp.send();

    function initializeData(data) {
        var productsRenderer = new ProductRenderer();
        var shoppingCart = new ShoppingCart();
        var productList = document.querySelector('#products-list');
        var products = data.map(function (value) {
            return new Product(value, shoppingCart);
        });

        products.forEach(function (value) {
            productsRenderer.render(value, productList)
        });
    }

    $('.dropdown').dropdown({transition: 'drop'}).dropdown({on: 'hover'});
})();