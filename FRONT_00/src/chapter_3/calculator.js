// Вам надо набор функций который будет симулировать калькулятор.
// Для этого вам надо написать 9 функций, которые могут! принимать в кач - ве аргумента другую функцию, если функция передана, то надо вернуть вызов функции с числом n, иначе вернуть число n.
// Например, функция one может принять в кач - ве аргумента функцию sum, тогда в return будет sum(1).Если же в функцию не передали ничего, то она просто вернет 1.
// Также надо написать 4 функции основных арифмитических операторов, которые принимают в кач-ве аргумента первое число, а возвращают функцию, которая принмает в кач-ве аргумента второе число и возвращает их сумму/разность/частое/произведение

function one(callback) {
    if (callback) {
        return callback(1);
    } else {
        return 1;
    }
}

function two(callback) {
    if (callback) {
        return callback(2);
    } else {
        return 2;
    }
}

function three(callback) {
    if (callback) {
        return callback(3);
    } else {
        return 3;
    }
}

function four(callback) {
    if (callback) {
        return callback(4);
    } else {
        return 4;
    }
}

function five(callback) {
    if (callback) {
        return callback(5);
    } else {
        return 5;
    }
}

function siv(callback) {
    if (callback) {
        return callback(6);
    } else {
        return 6;
    }
}
function seven(callback) {
    if (callback) {
        return callback(7);
    } else {
        return 7;
    }
}

function eight(callback) {
    if (callback) {
        return callback(8);
    } else {
        return 8;
    }
}

function nine(callback) {
    if (callback) {
        return callback(9);
    } else {
        return 9;
    }
}

function plus(a) {
    return function (n) {
        return a + n;
    };
}

function minus(a) {
    return function (n) {
        return a - n;
    };
}

function divide(a) {
    return function (n) {
        return a / n;
    };
}

function mult(a) {
    return function (n) {
        return a * n;
    };
}

four(); // 4
five(mult(three())); // 15
one(mult(three(plus(four())))); // 7

// console.log(four()); // 4
// console.log(five(mult(three()))); // 15
// console.log(one(mult(three(plus(four()))))); // 7
