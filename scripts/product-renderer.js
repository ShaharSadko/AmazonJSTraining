function ProductRenderer() {
    this.render = function (product, DOMElement) {
        var productContainer = document.createElement('div');
        var img = createImage(product.imgUrl);
        var content = createContent(product.name, product.description);
        var extra = extraContent.call(product);
        productContainer.className = 'ui card';
        productContainer.appendChild(img);
        productContainer.appendChild(content);
        productContainer.appendChild(extra);

        DOMElement.appendChild(productContainer);
    };


    function createContent(name, description) {
        var content = document.createElement('div');
        var header = createHeader(name);
        var descriptionContainer = createDescription(description);
        content.className = 'content';

        content.appendChild(header);
        content.appendChild(descriptionContainer);

        return content;
    }

    function createHeader(name) {
        var productHeader = document.createElement('a');
        productHeader.className = 'header';
        productHeader.innerText = name;

        return productHeader;
    }

    function createImage(imgUrl) {
        var imgContainer = document.createElement('div');
        var img = new Image();

        imgContainer.className = 'image';
        img.src = imgUrl;
        imgContainer.appendChild(img);

        return imgContainer;
    }

    function createDescription(description) {
        var descriptionContainer = document.createElement('div');
        descriptionContainer.className = 'description';
        descriptionContainer.innerText = description;

        return descriptionContainer;
    }

    function extraContent() {
        var extraContent = document.createElement('div');
        var priceContainer = document.createElement('div');
        var row = document.createElement('div');
        var ratingElement = createRating.call(this);
        var btn = createOrderBtn.call(this);

        extraContent.className = 'extra content';
        row.className = 'row';
        priceContainer.className = 'price two wide column';
        priceContainer.innerHTML = this.price;
        row.appendChild(priceContainer);
        row.appendChild(ratingElement);
        row.appendChild(btn);
        extraContent.appendChild(row);

        return extraContent;
    }

    function createRating() {
        var ratingElement = document.createElement('div');
        ratingElement.className = 'ui star rating column';
        ratingElement.setAttribute('data-rating', this.rating);
        ratingElement.setAttribute('data-max-rating', '5');
        $(ratingElement).rating();
        $(ratingElement).rating('disable', true);

        return ratingElement;
    }

    function createOrderBtn() {
        var product = this;
        var btn = document.createElement('button');
        btn.innerText = 'Add To Cart';
        btn.className = 'ui primary button right floated';
        btn.addEventListener('click', function () {
            if (btn.innerText === 'Add To Cart') {
                product.addToCart(this);
            }
            else {
                product.removeFromCart(this);
            }
        });

        return btn;
    }
}
