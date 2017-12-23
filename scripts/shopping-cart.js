function ShoppingCart() {
    var numberOfItemsElement = document.querySelector('#cart-num-of-items');
    var productList = [];
    var productsListElement = document.createElement('div');
    var shoppingCartModal = createCartElementContainer();
    document.body.appendChild(shoppingCartModal);

    this.showCart = function () {
        $(shoppingCartModal).modal('show');
    };

    this.add = function (product) {
        productList.push(product);
        numberOfItemsElement.innerText = productList.length;
        productsListElement.appendChild(createProductItem.call(this, product));
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
        while (productList.length > 0) {
            productList[0].buy(1);
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

        var removeIcon = document.createElement('i');
        removeIcon.className = 'ui large red remove icon right floated remove-product';
        removeIcon.addEventListener('click', product.removeFromCart.bind(product));

        var imgContainer = document.createElement('div');
        imgContainer.className = 'ui medium image';

        var productImg = document.createElement('img');
        productImg.src = product.imgUrl;

        var dropdown = createQuantityDropdown(product.inventory);
        $(dropdown).dropdown();

        imgContainer.appendChild(productImg);
        productContainer.appendChild(removeIcon);
        productContainer.appendChild(imgContainer);
        productContainer.appendChild(createProductDescriptionElement(product));
        productContainer.appendChild(dropdown);

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

    function createQuantityDropdown(quantity) {
        var dropdown = document.createElement('select');
        dropdown.className = 'ui search dropdown';

        for (var i = 1; i <= quantity; i++) {
            var option = document.createElement('option');
            option.value = i.toString();
            option.innerText = i.toString();
            dropdown.appendChild(option);
        }

        return dropdown;
    }
}
