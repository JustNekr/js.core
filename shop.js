//3. Сделать генерацию корзины динамической: 
//верстка корзины не должна находиться в HTML-структуре. 
//Там должен быть только div, в который будет вставляться корзина, 
//сгенерированная на базе JS:
//3.1. Пустая корзина должна выводить строку «Корзина пуста»;
// 3.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
// 4*. Сделать так, чтобы товары в каталоге выводились при помощи JS:
// 4.1. Создать массив товаров (сущность Product);
// 4.2. При загрузке страницы на базе данного массива генерировать вывод из него. 
//HTML-код должен содержать только div id=”catalog” без вложенного кода. 
//Весь вид каталога генерируется JS.

const product1 = {
    name: 'товар1',
    coast: 10,
    quantity: 6,
};

const product2 = {
    name: 'товар2',
    coast: 20,
    quantity: 5,
};
const product3 = {
    name: 'товар3',
    coast: 30,
    quantity: 4,
};

const basket = {
    infoElement: null,
    containerElement: null,
    basket: [
        product1,
        product2,
        product3
    ],
    totalCoast() {
        return this.basket.reduce((sum, current) => current.coast * current.quantity + sum, 0);

    },

    init() {
        this.infoElement = document.querySelector('#basket');
        this.infoElement.innerHTML = this.basketInfo();
        this.initCatalog();

    },

    basketInfo() {
        if (this.basket.length > 0) {
            return `В корзине: ${this.basket.length} товаров на сумму ${this.totalCoast()} рублей`;
        } else return 'Корзина пуста.'
    },

    initCatalog() {
        this.containerElement = document.querySelector('#catalog');
        this.basket.forEach((element) => {
            const basElem = document.createElement('div');
            basElem.innerHTML = `${element.name}, цена: ${element.coast} руб/шт, \
            в кол-ве ${element.quantity}, на сумму ${element.coast * element.quantity}`;
            this.containerElement.appendChild(basElem);
        })
    }
};

basket.init();

// пардон за неказистый вид, надеюсь верно понял суть задания.