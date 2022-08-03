// Вам нужно написать функцию которая принимает в кач-ве аргумента массива чисел и удаляет все повторяющиеся значения

function removeReps(array) {
    for (let i = 0; i < array.length; i++) {
        while (array.lastIndexOf(array[i]) !== i) {
            let elem_index = array.lastIndexOf(array[i]);
            array.splice(array.lastIndexOf(elem_index), 1);
        }
    }

    return array;
}

// function removeReps(array) {
//     let newArray = [];
//
//     for (let num of array) {
//         if (!newArray.includes(num)) {
//             newArray.push(num);
//         }
//     }
//
//     return newArray;
// }

// function removeReps(array) {
//     const set = new Set(array);
//     return array = [...set];
// }

removeReps([1, 1, 2, 4, 5, 6, 6, 8, 9, 11]); // Вывод [1,2,4,5,6,8,9,11]
removeReps([1,1,1,1]); // Вывод [1]
removeReps([1,2,3,4,5,6]); // Вывод[1,2,3,4,5,6]

// console.log(removeReps([1, 1, 2, 4, 5, 6, 6, 8, 9, 11])); // Вывод [1,2,4,5,6,8,9,11]
// console.log(removeReps([1,1,1,1])); // Вывод [1]
// console.log(removeReps([1,2,3,4,5,6])); // Вывод[1,2,3,4,5,6]