//  В этой задаче нужно будет написать алгоритм поиска, который скажет,
//  можно ли найти входное слово в головоломке поиска слов, которая тоже подается функции на вход.

// Данная задача имеет два уровня сложности :
// - Первый уровень включает в себя исключительно поиск по вертикали и по горизонтали
// - Второй уровень дополнительно включает в себя поиск по диагонали
// - Слова могут быть записаны слева направо и наоборот.

function searchSubString(puzzle, word) {
  let puzzleLength = puzzle.length;
  let puzzleStringLength = puzzle[0].length;
  let isFounded = 0;
  let temp_string = "";

  horizontalSearch();
  verticalSearch();
  diagonalSearch();
  puzzle.reverse();
  diagonalSearch();
  puzzle.reverse();

  // Горизонтальный поиск прямого и обратного вхожждения
  function horizontalSearch() {
    for (let i = 0; i < puzzleLength && !isFounded; i++) {
      let search_result = puzzle[i].join('').search(word) !== -1;
      let reverse_search_result = puzzle[i].reverse().join('').search(word) !== -1;
      puzzle[i].reverse();

      if (search_result || reverse_search_result) {
        isFounded = 1;
      }
    }
  }

  // Вертикальный поиск прямого и обратного вхождения
  function verticalSearch() {
    temp_string = "";

    for (let i = 0; i < puzzleStringLength && !isFounded; i++) {
      for (let j = 0; j < puzzleLength && !isFounded; j++) {
        temp_string += puzzle[j][i];
      }

      let search_result = temp_string.search(word) !== -1;
      let reverse_search_result = temp_string.search(word.split("").reverse().join('')) !== -1;

      if (search_result || reverse_search_result) {
        isFounded = 1;
      }

      temp_string = "";
    }
  }

  // Диагональный поиск прямого и обратного вхождения
  function diagonalSearch() {
    temp_string = "";

    for (let i = 0; i < puzzleStringLength && !isFounded; i++) {
      for (let j = 0; j < i + 1 && j < puzzleLength && !isFounded; j++) {
        temp_string += puzzle[j][i - j];
      }

      let search_result = temp_string.search(word) !== -1;
      let reverse_search_result = temp_string.search(word.split("").reverse().join('')) !== -1;

      if (search_result || reverse_search_result) {
        isFounded = 1;
      }

      temp_string = "";
    }

    for (let i = 0; i < puzzleLength - 1 && !isFounded; i++) {
      for (let j = 0; j < i + 1 && j < puzzleLength && !isFounded; j++) {
        temp_string += puzzle[puzzleLength - 1 - i + j][puzzleStringLength - 1 - j];
      }

      let search_result = temp_string.search(word) !== -1;
      let reverse_search_result = temp_string.search(word.split("").reverse().join('')) !== -1;

      if (search_result || reverse_search_result) {
        isFounded = 1;
      }

      temp_string = "";
    }
  }

  return !!isFounded;
}

const examplePuzzle = [
  ["b", "l", "g", "o", "l", "d", "s"],
  ["x", "k", "q", "w", "i", "j", "p"],
  ["a", "n", "w", "k", "k", "p", "n"],
  ["h", "e", "e", "e", "k", "i", "l"],
  ["q", "e", "k", "a", "y", "q", "a"],
  ["h", "u", "h", "a", "e", "a", "u"],
  ["k", "q", "j", "c", "c", "m", "r"],
];

// Level 1
searchSubString(examplePuzzle, "like"); // true
searchSubString(examplePuzzle, "gold"); // true
searchSubString(examplePuzzle, "queen"); // true

// Level 2
searchSubString(examplePuzzle, "cake"); // true

// Level 1
// console.log(searchSubString(examplePuzzle, "like")); // true
// console.log(searchSubString(examplePuzzle, "gold")); // true
// console.log(searchSubString(examplePuzzle, "queen")); // true

// Level 2
// console.log(searchSubString(examplePuzzle, "cake")); // true
