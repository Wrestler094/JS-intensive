// Функция на вход принимает две строки - сообщение (обычная строка с текстом) и символ который надо удалить из этого сообщения

function removeString(message, symbol) {
    let resString = "";

    for (let i = 0; i < message.length; i++) {
        if (message[i] !== symbol) {
            resString += message[i];
        }
    }

    return resString;
}

// function removeString(message, symbol) {
//     return message.replace(new RegExp(symbol, "g"), "");
// }

// function removeString(message, symbol) {
//     return message.split(symbol).join('');
// }

removeString("Большое и интересное сообщение", "о"); // Бльше и интересне сбщение
removeString("Hello world!", "z"); // Hello world!
removeString("А роза азора", "А"); // роза азора

// console.log(removeString("Большое и интересное сообщение", "о")); // Бльше и интересне сбщение
// console.log(removeString("Hello world!", "z")); // Hello world!
// console.log(removeString("А роза азора", "А")); // роза азора

