function ShoppingCart() {
    var numberOfItemsElement = document.querySelector('#cart-num-of-items');
    var productList = [];
    var productsListElement = document.createElement('div');
    var shoppingCartModal = createCartElementContainer();

    this.showCart = function () {
        $(shoppingCartModal).modal('show');
    };


    this.add = function (product) {
        productList.push(product);
        numberOfItemsElement.innerText = productList.length;
        productsListElement.appendChild(createProductItem(product));
    };

    this.remove = function (product) {
        var productIndex = productList.indexOf(product);
        productList.splice(productIndex, 1);
        numberOfItemsElement.innerText = productList.length;
        productsListElement.removeChild(productsListElement.childNodes[productIndex]);
    };

    function createCartElementContainer() {
        var modal = document.createElement('div');
        modal.className = 'ui modal';
        modal.appendChild(createShoppingCartHeaderElement());
        modal.appendChild(productsListElement);
        modal.appendChild(createActionsElement());

        return modal;
    }

    function checkout() {
        productList.forEach(function (product) {
            product.buy(1);
        });

        numberOfItemsElement.innerHTML = '0';
        productList = [];

        while (productsListElement.firstChild) {
            productsListElement.firstChild.remove();
        }
    }

    function createShoppingCartHeaderElement() {
        var header = document.createElement('div');
        header.className = 'header';
        header.innerText = 'Your Shopping Cart';

        return header;
    }

    function createActionsElement() {
        var actionsElement = document.createElement('div');
        actionsElement.className = 'actions';

        var cancelBtn = document.createElement('div');
        cancelBtn.className = 'ui black deny button';
        cancelBtn.innerText = 'continue shopping';

        var okBtn = document.createElement('div');
        okBtn.className = 'ui primary right labeled icon button';
        okBtn.innerText = 'checkout';

        var okBtnIcon = document.createElement('i');
        okBtnIcon.className = 'ui shop icon';
        okBtn.appendChild(okBtnIcon);
        okBtn.addEventListener('click', checkout);
        actionsElement.appendChild(cancelBtn);
        actionsElement.appendChild(okBtn);

        return actionsElement;
    }

    function createProductItem(product) {
        var productContainer = document.createElement('div');
        productContainer.className = 'image content';

        var imgContainer = document.createElement('div');
        imgContainer.className = 'ui medium image';

        var productImg = document.createElement('img');
        productImg.src = product.imgUrl;

        imgContainer.appendChild(productImg);
        productContainer.appendChild(imgContainer);
        productContainer.appendChild(createProductDescriptionElement(product));

        return productContainer;
    }

    function createProductDescriptionElement(product) {
        var productContentElement = document.createElement('div');
        productContentElement.className = 'description';

        var productHeader = document.createElement('div');
        productHeader.className = 'ui header';
        productHeader.innerText = product.name;

        var description = document.createElement('p');
        description.innerText = product.description;

        var price = document.createElement('p');
        price.innerText = product.price + '$';

        productContentElement.appendChild(productHeader);
        productContentElement.appendChild(description);
        productContentElement.appendChild(price);

        return productContentElement;
    }

    document.body.appendChild(shoppingCartModal);
}
