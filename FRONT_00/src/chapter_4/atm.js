// Напишите функцию банкомат которая принимает на вход число и возвращает объект в формате  {номинал_купюры : количество_купюр}.
// Если банкомат не может выдать данную сумму, то выводится ошибка 'Incorrect value'.
// Купюры должны выдаться оптимальным образом (вместо 5 купюр номиналом 1000 выдается одна 5000).
// За раз банкомат может выдавать не более 20 купюр, если купюр для выдачи не хватает то выводится ошибка 'Limit exceeded'

function atm(sum) {
  const banknots = [5000, 2000, 1000, 500, 200, 100, 50];
  const result = {};
  let modified_sum = sum;
  let banknoteCounter = 0;

  if (modified_sum >= 100000) {
    return "limit exceeded";
  } else if (modified_sum % 50 > 0 || modified_sum === 0) {
    return "Incorrect value";
  } else {
    for (let banknote of banknots) {
      if (Math.trunc(modified_sum / banknote) > 0) {
        result[banknote] = Math.trunc(modified_sum / banknote);
        modified_sum %= banknote;
      }
    }

    for (let banknote in result) {
      banknoteCounter += result[banknote];
    }

    return banknoteCounter > 20 ? "limit exceeded" : result;
  }
}

atm(8350); // {5000 : 1, 2000 : 1, 1000 : 1, 200 : 1, 100 : 1, 50 : 1 }
atm(2570); // Incorrect value
atm(100050); // limit exceeded

// console.log(atm(8350)); // {5000 : 1, 2000 : 1, 1000 : 1, 200 : 1, 100 : 1, 50 : 1 }
// console.log(atm(2570)); // Incorrect value
// console.log(atm(100050)); // limit exceeded