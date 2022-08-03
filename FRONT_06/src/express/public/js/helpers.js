/**
 * Отрисовывает поле пустыми дивами в начале игры
 * @param playerField - див для поля игрока
 * @param computerField - див для поля компьютера
 */
export function fillField(playerField, computerField) {
    for (let i = 0; i < 100; i++) {
        let div = document.createElement('div');
        div.className = 'cell cell--empty';
        playerField.append(div);
    }

    for (let i = 0; i < 100; i++) {
        let div = document.createElement('div');
        div.className = 'cell cell--empty';
        computerField.append(div);
    }
}

/**
 * Функция заполняет и удаляет заполнение клетки игрока при расставлении кораблей
 */
export function playerCellHandler() {
    if (this.className === 'cell cell--player-ship') {
        this.className = 'cell cell--empty'
    } else {
        this.className = 'cell cell--player-ship';
    }
}

/**
 * Рандомно заполняет массив игрового поля компьютера кораблями
 * @param computerFieldArray - Массив с (пустыми) клетками поля компьюетра
 */
export function fillComputerArray(computerFieldArray) {
    for (let k = 0; k < 5; k++) {
        for (let j = 0; j < k; j++) {
            while(true) {
                let planeMultiplier = 1;

                // Плоскость, 0 - горизонтальная, 1 - вертикальная
                let plane = Math.trunc(Math.random() * 2);
                let x = Math.trunc(Math.random() * 6 + k);
                let y = Math.trunc(Math.random() * 10);

                if (plane) {
                    planeMultiplier = 10;
                    [x, y] = [y, x];
                }

                if(isPlacePossible()) {
                    for (let i = 0; i < 5 - k; i++) {
                        computerFieldArray[x + y * 10 + planeMultiplier * i] = 1;
                    }

                    break;
                }

                function isPlacePossible() {
                    let res = true;

                    for (let i = 0; i < 5 - k && res; i++) {
                        let currentCellIndex = x + y * 10 + planeMultiplier * i;

                        for (let index of [0, 1, 11, -9, -1, -11, 9, 10, -10]) {
                            if (computerFieldArray[currentCellIndex + index] === 1) {
                                res = false;
                            }
                        }
                    }

                    return res;
                }
            }
        }
    }
}

export function removeComputerCellHandlers(computerFieldCells, wrappedComputerCellHandlers) {
    let counter = 0;

    for (let cell of computerFieldCells) {
        cell.removeEventListener('click', wrappedComputerCellHandlers[counter]);
        counter++;
    }
}

/**
 * Делает ход компьютера
 * @param playerFieldCells - массив дом элементов клеток игрока
 * @param playerFieldArray - массив клеток игрока
 * @return Если не попал - 1, иначе - 0
 */
export function computerMove(playerFieldCells, playerFieldArray) {
    let result = 1;
    let arrayOfIndexes = []
    let isRandom = Math.trunc(Math.random() * 7);

    if (isRandom) {
        let randomNumber = Math.trunc(Math.random() * 100);

        if (playerFieldArray[randomNumber]) {
            playerFieldArray[randomNumber] = 2;
            result = 0;
        } else {
            playerFieldArray[randomNumber] = 3;
        }

        playerFieldCells[randomNumber].className += ' cell--hit';
    } else {
        playerFieldArray.forEach((item, index) => item === 1 ? arrayOfIndexes.push(index) : false);

        if (arrayOfIndexes.length) {
            let index = Math.trunc(Math.random() * arrayOfIndexes.length);

            if (playerFieldArray[arrayOfIndexes[index]]) {
                playerFieldArray[arrayOfIndexes[index]] = 2;
                result = 0;
            } else {
                playerFieldArray[arrayOfIndexes[index]] = 3;
            }

            playerFieldCells[arrayOfIndexes[index]].className += ' cell--hit';
        }
    }

    return result;
}
