// 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
let x = 2;
nextPrime:
while (x < 100) {
    let y = 2;
    while (y < x) {
        if (x % y == 0) {
            x++;
            continue nextPrime;
        }
        y++;
    }
    console.log(x);
    x++;
}

// 2. С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.
// 3. Товары в корзине хранятся в массиве. Задачи:
// a) Организовать такой массив для хранения товаров в корзине;
// b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.

let basket = [
    ['яблоки', 2, 40],
    ['груши', 1, 30],
    ['огурцы', 3, 10]
]
// как вы и говорили, 0 - название, 1 - количество, 2 - стоимость

// function countBasketPrice(arr) {
//     let productsCosts = arr.map(item => item[1] * item[2]);
//     productsCosts = productsCosts.reduce((sum, current) => sum + current, 0);
//     return productsCosts;
// }
// alert(`Общая стоимость корзины: ${countBasketPrice(basket)}`);

function countBasketPrice(arr) {
    let productsCosts = arr.reduce((sum, current) => current[1] * current[2] + sum, 0);
    return productsCosts;
}
alert(`Общая стоимость корзины: ${countBasketPrice(basket)}`);

// 4.*Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла.
for (var i = 0; i < 10; console.log(i++)) {
}

// 5. *Нарисовать пирамиду с помощью console.log, как показано на рисунке
let arr = '';
for (let i = 0; i < 20; i++) {
    arr += 'x';
    console.log(arr)
}