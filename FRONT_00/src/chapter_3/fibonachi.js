// Напишите функицю, которая принимает индекс числа из ряда Фибоначчи и возвращает его значение
// Предположим, что ряд Фибоначчи начинается с 0 индекса

function fibo(index) {
    if (index === 0 || index === 1) {
        return 1;
    }

    return fibo(index - 1) + fibo(index - 2);
}

fibo(5); // 8
fibo(1); // 1
fibo(8); // 34
fibo(21); // 17711

// console.log(fibo(5)); // 8
// console.log(fibo(1)); // 1
// console.log(fibo(8)); // 34
// console.log(fibo(21)); // 17711