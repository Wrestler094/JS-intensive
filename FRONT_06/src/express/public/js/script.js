import {
    computerMove, fillComputerArray, fillField,
    playerCellHandler, removeComputerCellHandlers
} from "./helpers.js";

let isGameStarted = 0;
let isPlayerShipsPlaced = 0;
let isGameOver = 0;
let isPlayerTurn = 0;

const playerField = document.querySelector(".player-field");
const computerField = document.querySelector(".computer-field");
const playerFieldArray = Array(100).fill(0);
const computerFieldArray = Array(100).fill(0);

fillField(playerField, computerField);
fillComputerArray(computerFieldArray);

const playerFieldCells = playerField.querySelectorAll('div');
const computerFieldCells = computerField.querySelectorAll('div');
const startButton = document.querySelector('.start-button');
const messageBox = document.querySelector('.message-box');

// Выводит на печать корабли компьютера
// for (let i = 0; i < 100; i++) {
//     if (computerFieldArray[i] === 1) {
//         computerFieldCells[i].className = 'cell cell--computer-ship';
//     }
// }

const playerCellListener = playerCellHandler;
startButton.addEventListener('click', startButtonHandler);
const wrappedComputerCellHandlers = [];

function startButtonHandler() {
    if (!isGameStarted) {
        messageBox.textContent = "Place your ships on your ocean grid"
        startButton.textContent = "Start battle!"

        for (let cell of playerFieldCells) {
            cell.addEventListener('click', playerCellListener);
        }

        isGameStarted = 1;
    } else if (!isPlayerShipsPlaced) {
        let res = validatePlayerShips()

        if (res === 0) {
            messageBox.textContent = "Fire!";
            startButton.textContent = "Сдаться";

            for (let cell of playerFieldCells) {
                cell.removeEventListener('click', playerCellListener);
            }

            for (let cell of computerFieldCells) {
                const wrappedComputerCellHandler = computerCellHandler.bind(null, cell);
                wrappedComputerCellHandlers.push(wrappedComputerCellHandler);
                cell.addEventListener('click', wrappedComputerCellHandler);
            }

            isPlayerShipsPlaced = 1;
            isPlayerTurn = Math.trunc(Math.random() * 2);

            while (!isPlayerTurn) {
                isPlayerTurn = computerMove(playerFieldCells, playerFieldArray);
            }
        } else if (res === 1) {
            alert("Ships has wrong placement!");
        } else if (res === 2) {
            alert("Wrong number of ships!");
        }
    } else if (!isGameOver) {
        removeComputerCellHandlers(computerFieldCells, wrappedComputerCellHandlers);
        messageBox.textContent = "Computer WIN!";
        startButton.textContent = "New game";
        isGameOver = 1;
        performPutHttpRequest(0);
    } else {
        location.reload();
    }
}

function computerCellHandler(cell, evt) {
    let cellIndex = -1;

    for (let i = 0; i < 100 && cellIndex === -1; i++) {
        if (evt.target === computerFieldCells[i]) {
            cellIndex = i;
        }
    }

    if (computerFieldArray[cellIndex]) {
        computerFieldArray[cellIndex] = 2;
        cell.className = 'cell cell--computer-ship cell--hit';
    } else {
        cell.className = 'cell cell--miss';
        isPlayerTurn = 0;
    }

    isComputerLost();

    while (!isPlayerTurn) {
        isPlayerTurn = computerMove(playerFieldCells, playerFieldArray);
        isPlayerLost();
    }
}

function validatePlayerShips() {
    let result = 0;
    let counter = 0;

    for (let cell of playerFieldCells) {
        if (cell.classList.contains('cell--player-ship')) {
            playerFieldArray[counter] = 1;
        } else {
            playerFieldArray[counter] = 0;
        }

        counter++;
    }

    let oneDeck = 0;
    let twoDeck = 0;
    let threeDeck = 0;
    let fourDeck = 0;

    for (let i = 0; i < 100; i++) {

        if (playerFieldArray[i]) {
            let upCell = playerFieldArray[i - 10];
            let downCell = playerFieldArray[i + 10];
            let leftCell = playerFieldArray[i - 1];
            let rightCell = playerFieldArray[i + 1];
            let itsLeftSide = i % 10 !== 0;
            let itsRightSide = (i - 9) % 10 !== 0;


            if (!itsRightSide) {
                if (playerFieldArray[i + 9] || playerFieldArray[i - 11]) {
                    result = 1;
                }
            } else if (!itsLeftSide) {
                if (playerFieldArray[i - 9] || playerFieldArray[i + 11]) {
                    result = 1;
                }
            } else if (
                (playerFieldArray[i + 11]) ||
                (playerFieldArray[i - 11]) ||
                (playerFieldArray[i + 9]) ||
                (playerFieldArray[i - 9])
            ) {
                result = 1;
            }

            // Если соседей нет
            if (!downCell && !upCell && (!leftCell || !itsLeftSide) && (!rightCell || !itsRightSide)) {
                oneDeck++
            } else if ((upCell || downCell) && ((leftCell && itsLeftSide) || (rightCell && itsRightSide))) {
                result = 1;
            } else if (downCell && !upCell) {
                let size = 2;
                if (playerFieldArray[i + 20]) {
                    size++;
                    if (playerFieldArray[i + 30]) {
                        size++;
                        playerFieldArray[i + 40] ? size++ : null;
                    }
                }

                countShip(size);
            } else if (rightCell && itsRightSide && !leftCell) {
                let size = 2;

                if (playerFieldArray[i + 2] && (i + 1) % 9 !== 0) {
                    size++;
                    if (playerFieldArray[i + 3] && (i + 2) % 9 !== 0) {
                        size++;
                        if (playerFieldArray[i + 4] && (i + 3) % 9 !== 0) {
                            size++;
                        }
                    }
                }

                countShip(size);
            }

            function countShip(size) {
                if (size === 2) {
                    twoDeck++;
                } else if (size === 3) {
                    threeDeck++;
                } else if (size === 4) {
                    fourDeck++;
                } else {
                    result = 1;
                }
            }
        }
    }

    if ((fourDeck !== 1 || threeDeck !== 2 || twoDeck !== 3 || oneDeck !== 4) && result === 0) {
        result = 2;
    }

    return result;
}

function isComputerLost() {
    if (!computerFieldArray.filter(item => item === 1).length) {
        removeComputerCellHandlers(computerFieldCells, wrappedComputerCellHandlers);
        isGameOver = 1;

        messageBox.textContent = "You WIN!";
        startButton.textContent = "New game"

        performPutHttpRequest(1);
    }
}

function isPlayerLost() {
    if (playerFieldArray.findIndex(i => i === 1) === -1) {
        removeComputerCellHandlers(computerFieldCells, wrappedComputerCellHandlers);
        isGameOver = 1;

        messageBox.textContent = "Computer WIN!";
        startButton.textContent = "New game"

        performPutHttpRequest(0);
    }
}


async function performPutHttpRequest(num) {
    const rawResponse = await fetch('/user', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            win: num
        })
    })
}