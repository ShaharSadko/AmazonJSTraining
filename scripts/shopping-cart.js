function ShoppingCart() {
    var productList = [];
    document.body.appendChild(createCartElementContainer());

    this.showCart = function () {
        $('#shopping-cart-modal').modal('show');
    };

    this.add = function (product) {
        var currentPrice = Number(document.querySelector('#total-price-element .price').innerText);
        document.querySelector('#total-price-element .price').innerText = currentPrice + product.price;
        var ShoppingListElement = document.querySelector('#shopping-cart-items');
        productList.push({product: product, quantity: 1});
        document.querySelector('#cart-num-of-items').innerText = productList.length;
        ShoppingListElement.appendChild(createProductItem.call(this, product));
    };

    this.remove = function (product) {
        var productIndex = productList.findIndex(function (productItem) {
            return productItem.product === product
        });

        document.querySelector('#total-price-element .price').innerText -= product.price * productList[productIndex].quantity;
        var ShoppingListElement = document.querySelector('#shopping-cart-items');

        productList.splice(productIndex, 1);
        document.querySelector('#cart-num-of-items').innerText = productList.length;
        ShoppingListElement.removeChild(ShoppingListElement.childNodes[productIndex]);
    };

    function createCartElementContainer() {
        var modal = document.createElement('div');
        var ShoppingListElement = document.createElement('div');
        ShoppingListElement.id = 'shopping-cart-items';

        modal.className = 'ui modal';
        modal.id = 'shopping-cart-modal';
        modal.appendChild(createShoppingCartHeaderElement());
        modal.appendChild(ShoppingListElement);
        modal.appendChild(createTotalPriceElement());
        modal.appendChild(createActionsElement());

        return modal;
    }

    function createTotalPriceElement() {
        var priceElement = document.createElement('div');
        priceElement.id = 'total-price-element';
        priceElement.innerText = 'Total Cart Price: ';

        var price = document.createElement('span');
        price.className = 'price';
        price.innerText = '0';
        priceElement.appendChild(price);

        return priceElement;
    }

    function checkout() {
        while (productList.length > 0) {
            productList[0].product.buy(productList[0].quantity);
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

        var divider = document.createElement('hr');

        divider.className = 'divider';
        imgContainer.appendChild(productImg);
        productContainer.appendChild(removeIcon);
        productContainer.appendChild(imgContainer);
        productContainer.appendChild(createProductDescriptionElement(product));
        productContainer.appendChild(divider);

        return productContainer;
    }

    function createProductDescriptionElement(product) {
        var productContentElement = document.createElement('div');
        productContentElement.className = 'description';

        var productHeader = createProductHeader(product);
        var dropdown = createQuantityDropdown(product);

        var description = document.createElement('p');
        description.innerText = product.description;

        var price = document.createElement('p');
        price.className = 'price';
        price.innerText = product.price;

        productContentElement.appendChild(productHeader);
        productContentElement.appendChild(description);
        productContentElement.appendChild(price);
        productContentElement.appendChild(dropdown);

        activateDropDown(dropdown, product);

        return productContentElement;
    }

    function createQuantityDropdown(product) {
        var dropdown = document.createElement('select');
        dropdown.className = 'ui dropdown';

        var defaultText = document.createElement('option');
        defaultText.value = '';
        defaultText.innerHTML = "quantity";

        dropdown.appendChild(defaultText);

        for (var i = 1; i <= product.inventory; i++) {
            var option = document.createElement('option');
            option.value = i.toString();
            option.innerText = i.toString();
            dropdown.appendChild(option);
        }

        return dropdown;
    }

    function createProductHeader(product) {
        var productHeader = document.createElement('div');
        productHeader.className = 'ui header';
        productHeader.innerText = product.name;

        return productHeader;
    }

    function activateDropDown(dropdown, product) {
        $(dropdown).dropdown({
            onChange: function (value) {
                var productIndex = productList.findIndex(function (productItem) {
                    return productItem.product === product;
                });

                const priceElement = document.querySelector('#total-price-element .price');
                priceElement.innerText = Number(priceElement.innerText) + (value - productList[productIndex].quantity) * product.price;
                productList[productIndex].quantity = value;
            }
        });
    }

    document.querySelector('#shopping-cart-container').addEventListener('click', this.showCart);
}
