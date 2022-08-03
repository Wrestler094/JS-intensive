// Напишите функцию counter, которая при каждом вызове будет возвращать числа на 3 больше, чем в прошлый.
// Нельзя использовать переменные, объявленные через var!

const counter = (() => {
    let counter = -3;

    return function() {
        return counter += 3;
    }
})()

// let a = -3;
//
// function counter() {
//     return a += 3;
// }

counter(); // Функция вернет 0
counter(); // Функция вернет 3
counter(); // Функция вернет 6
counter(); // Функция вернет 9

// console.log(counter()); // Функция вернет 0
// console.log(counter()); // Функция вернет 3
// console.log(counter()); // Функция вернет 6
// console.log(counter()); // Функция вернет 9
