const field = document.querySelector(".js-field");
const resetButton = document.querySelector(".js-button-reset");
const dotButton = document.querySelector(".js-button-dot");
const buttonsOfNumbers = document.querySelectorAll(".js-button-number");
const buttonsOfOperators = document.querySelectorAll(".js-button-operator");
const equalButton = document.querySelector(".js-button-equal");

const resetAudio = new Audio("sounds/reset.mp3");
const numberAudio = new Audio("sounds/number.mp3");
const finishAudio = new Audio("sounds/finish.mp3");
const operatorAudio = new Audio("sounds/operator.mp3");
resetAudio.load();
numberAudio.load();
finishAudio.load();
operatorAudio.load();

resetButton.addEventListener("click", evt => {
    resetAudio.currentTime = 0;
    resetAudio.play();
    field.value = "";
})

dotButton.addEventListener("click", evt => {
    numberAudio.currentTime = 0;
    numberAudio.play();

    if (field.value === "") {
        field.value = "0.";
    } else if (field.value[field.value.length - 1] !== '.') {
        field.value += dotButton.textContent;
    }
})

buttonsOfNumbers.forEach(button => button.addEventListener("click", evt => {
    numberAudio.currentTime = 0;
    numberAudio.play();
    field.value += button.textContent;
}))

buttonsOfOperators.forEach(button => button.addEventListener("click", evt => {
    operatorAudio.currentTime = 0;
    operatorAudio.play();

    if (field.value[field.value.length - 1] !== '+' &&
        field.value[field.value.length - 1] !== '-' &&
        field.value[field.value.length - 1] !== 'x' &&
        field.value[field.value.length - 1] !== '/' &&
        field.value !== ""
    ) {
        field.value += button.textContent;
    }
}))

equalButton.addEventListener("click", evt => {
    calc();
});

window.addEventListener("keydown", evt => {
    if (evt.key === "Enter") {
        calc();
    }
});

function calc() {
    finishAudio.currentTime = 0;
    finishAudio.play();

    try {
        field.value = math.evaluate(field.value);
    } catch (err) {
        alert("Wrong expression, try again!");
    }
}
