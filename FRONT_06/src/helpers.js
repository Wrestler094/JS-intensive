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

/**
 * Делает ход компьютера
 * @param playerFieldCells -
 */
export function computerMove(playerFieldCells, playerFieldArray) {
    // Если у игрока нет раненых кораблей
    playerFieldCells[Math.trunc(Math.random() * 100)].className += ' cell--hit';
    // console.log(playerFieldCells[Math.trunc(Math.random() * 100)].className);
    // console.log(playerFieldCells[Math.trunc(Math.random() * 100)]);
}









// const listener = function handlePlayerCellClick(evt) {
//     // for (let i = 0; i < 100; i++) {
//     //     console.log(evt.target === playerFieldCells[i]);
//     // }
//
//     if (this.className === 'cell cell--player-ship') {
//         this.className = 'cell cell--empty'
//     } else {
//         this.className = 'cell cell--player-ship';
//     }
// }