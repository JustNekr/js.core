'use strict';

const product1 = {
    name: 'товар1',
    coast: 10,
    srcMin: "images/min/1.jpg",
    srcMax: "images/max/1.jpg"
};

const product2 = {
    name: 'товар2',
    coast: 20,
    srcMin: "images/min/2.jpg",
    srcMax: "images/max/2.jpg"
};
const product3 = {
    name: 'товар3',
    coast: 30,
    srcMin: "images/min/3.jpg",
    srcMax: "images/max/3.jpg"
};

const catalog = {
    containerElement: null,
    products: [
        product1,
        product2,
        product3
    ],
    settings: {
        buyButtonSrc: 'images/gallery/buy.png'
    },


    init() {
        this.containerElement = document.querySelector('#catalog');
        this.products.forEach((element, idx) => {
            const basElem = this.createCart(element, idx)
            this.containerElement.appendChild(basElem);
        });
    },

    createCart(element, idx) {
        const cart = document.createElement('div');
        cart.innerHTML = `${element.name}  ${element.coast} за шт.`;

        const image = new Image();
        image.src = element.srcMin;
        image.dataset.full_image_url = element.srcMax;
        image.className = "imgMin";
        cart.appendChild(image);

        const buyButton = new Image();
        buyButton.src = this.settings.buyButtonSrc;
        buyButton.className = "buyButton";
        buyButton.dataset.productIdx = idx;
        cart.appendChild(buyButton);

        return cart;
    }
};

const basket = {
    infoElement: null,
    basket: [],

    totalCoast() {
        return this.basket.reduce((sum, current) => current.coast * current.quantity + sum, 0);
    },

    init() {
        this.infoElement = document.querySelector('#basket');
        this.infoElement.innerHTML = this.basketInfo();
        document.querySelector('#catalog')
            .addEventListener('click', event => {
                this.addProduct(event);
            });
    },

    basketInfo() {
        if (this.basket.length > 0) {
            return `В корзине: ${this.basket.length} товаров на сумму ${this.totalCoast()} рублей`;
        } else return 'Корзина пуста.'
    },

    addProduct(event) {
        if (event.target.className !== 'buyButton') return;
        const requiredQuantity = parseInt(prompt('сколько штук?'));
        if (!Number.isInteger(requiredQuantity)) return;
        const buyableProduct = Object.assign({}, catalog.products[event.target.dataset.productIdx], { quantity: requiredQuantity });
        // if (this.basket.length > 0) {
        //     for (let i = 0; i > this.basket.length; i++) {
        //         if (buyableProduct.name == this.basket[i].name) {
        //             this.basket[i].quantity += buyableProduct.quantity;
        //             return;
        //         };
        //     };
        // }
        // Пытался сделать проверку на наличие данного товара в корзине,
        //чтобы просто количество увеличивалось, но почему-то все равно добавляется новый объект
        this.basket.push(buyableProduct);
        this.infoElement.innerHTML = this.basketInfo();

    }
};

const gallery = {
    settings: {
        previewSelector: '.mySuperGallery',
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageCloseBtnSrc: 'images/gallery/close.png',
        openedImageRightBtnClass: 'galleryWrapper__right',
        openedImageRightBtnSrc: 'images/gallery/right.png',
        openedImageLeftBtnClass: 'galleryWrapper__left',
        openedImageLeftBtnSrc: 'images/gallery/left.png',
    },

    init(userSettings = {}) { // init({previewSelector: '.mySelector'})
        Object.assign(this.settings, userSettings);

        document.querySelector(this.settings.previewSelector)
            .addEventListener('click', event => {
                this.containerClickHandler(event);
            });
    },

    containerClickHandler(event) {
        if (event.target.className !== 'imgMin') return;
        console.log(event);
        this.openImage(event.target.dataset.full_image_url);
    },

    openImage(src) {
        this.getScreenContainer()
            .querySelector(`.${this.settings.openedImageClass}`).src = src;
    },

    getScreenContainer() {
        const galleryWrapperElement = document
            .querySelector(`.${this.settings.openedImageWrapperClass}`);

        if (galleryWrapperElement) return galleryWrapperElement;

        return this.createScreenContainer();
    },

    createScreenContainer() {
        const galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close()); // this.close.bind(this);
        galleryWrapperElement.appendChild(closeImageElement);

        const rightImageElement = new Image();
        rightImageElement.classList.add(this.settings.openedImageRightBtnClass);
        rightImageElement.src = this.settings.openedImageRightBtnSrc;
        rightImageElement.addEventListener('click', () => this.right()); // this.close.bind(this);
        galleryWrapperElement.appendChild(rightImageElement);

        const leftImageElement = new Image();
        leftImageElement.classList.add(this.settings.openedImageLeftBtnClass);
        leftImageElement.src = this.settings.openedImageLeftBtnSrc;
        leftImageElement.addEventListener('click', () => this.left()); // this.close.bind(this);
        galleryWrapperElement.appendChild(leftImageElement);

        const image = new Image();
        image.classList.add(this.settings.openedImageClass);
        galleryWrapperElement.appendChild(image);

        document.body.appendChild(galleryWrapperElement);

        return galleryWrapperElement;
    },

    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    },

    right() {
        console.log('right');
    },

    left() {
        console.log('left');
    }
    // с листалйкой застопопрился на том как к следующему элементу перейти.
};


basket.init();
catalog.init();
gallery.init({ previewSelector: '#catalog' });

