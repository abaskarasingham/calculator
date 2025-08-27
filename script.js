function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    let result = 0;

    switch (operator) {
        case '+': result = add(num1, num2);
        break;
        case '-': result = subtract(num1, num2);
        break;
        case '*': result = multiply(num1, num2);
        break;
        case '/': result = divide(num1, num2);
        break;
        default: result = "ERROR! INVALID OPERATOR!!!";
    }

    return result;
}



let num1 = null;
let num2 = null;
let operator = '';
const DEFAULT_FONT_SIZE = 50;

const allButtons = Array.from(document.querySelectorAll(".calcButton"));
const digitButtons = Array.from(document.querySelectorAll(".digitButton"));
const opButtons = Array.from(document.querySelectorAll(".opButton"));

const display = document.querySelector(".display");

const clearButton = document.querySelector(".clearButton");
const equalButton = document.querySelector(".equalButton");
const decimalButton = document.querySelector(".decimalButton");
const backButton = document.querySelector(".backButton");

function clearBackgroundColor() {
    opButtons.forEach(button => {
        button.style.backgroundColor = "";
    });
}

function operatorSelected() {
    let bool = false;

    opButtons.forEach(button => {
        if (button.style.backgroundColor) {
            operator = button.id;
            button.style.backgroundColor = "";
            bool = true;
        }
    });

    return bool;
}

function adjustFontSize() {
    if (display.textContent.length > 20) {
        display.style.fontSize = `${DEFAULT_FONT_SIZE - 17}px`;
    } else if (display.textContent.length > 15) {
        display.style.fontSize = `${DEFAULT_FONT_SIZE - 15}px`;
    } else {
        display.style.fontSize = `${DEFAULT_FONT_SIZE}px`;
    }
}

function equals() {
    if (num1 !== null && (operator !== '' || operatorSelected()) ) {

        backButton.disabled = true;

        if (num2 !== null) {
            num1 = operate(operator, num1, num2);
        } else {
            num2 = +display.textContent;
            num1 = operate(operator, num1, num2);
        }

        clearBackgroundColor();
        if (num1 === Infinity || num1 === -Infinity || Number.isNaN(num1)) {
            num1 = "The world blew up";
        } else if (!Number.isInteger(num1)) {
            num1 = num1.toFixed(2);
        }
        display.textContent = num1;
        adjustFontSize();

        if (display.textContent.includes(".")) {
            decimalButton.disabled = true;
        }
    }
}

backButton.addEventListener("click", function(e) {

    display.textContent = display.textContent.slice(0, -1);

    if (display.textContent === "") {
        display.textContent = "0";
    }

    if (!display.textContent.includes(".")) {
        decimalButton.disabled = false;
    }

    adjustFontSize();

});

clearButton.addEventListener("click", function(e) {
    display.textContent = "0";
    num1 = null;
    num2 = null;
    operator = '';
    clearBackgroundColor();
    decimalButton.disabled = false;
    backButton.disabled = false;
    display.style.fontSize = `${DEFAULT_FONT_SIZE}px`;
});

digitButtons.forEach(button => {
    button.addEventListener("click", function(e) {

        backButton.disabled = false;

        if (display.textContent == num1 && num2 !== null && operator !== '') {
            display.textContent = "0";
            decimalButton.disabled = false;
        }

        opButtons.forEach(button => {
            if (button.style.backgroundColor) {
                display.textContent = "0";
                operator = button.id;
                button.style.backgroundColor = "";
                decimalButton.disabled = false;
            }
        });

        if (display.textContent !== "0" || (display.textContent === "0" && button.id === ".") ) {
            display.textContent += button.id;
        } else {
            display.textContent = button.id;
        }
        
        if (display.textContent.includes(".")) {
            decimalButton.disabled = true;
        }

        if (display.textContent.length > 15) {
            display.textContent = display.textContent.slice(0, -1);
        }

        if (num1 === null || operator === '') {
            num1 = +display.textContent;
        }

        adjustFontSize();

    });
});

opButtons.forEach(button => {
    button.addEventListener("click", function(e) {

        if (num1 !== null && num2 === null && operator !== '') {
            equals();
        }
        num1 = +display.textContent;
        num2 = null;
        operator = '';

        clearBackgroundColor();
        button.style.backgroundColor = "yellow";
        decimalButton.disabled = false;
        backButton.disabled = true;
    });
});

equalButton.addEventListener("click", function(e) {
    equals();
});

document.addEventListener("keydown", function(e) {
    let button = allButtons.find(button => button.id === e.key);
    
    if (button) {
        button.click();
    } else {
        switch (e.key) {
            case "Escape": button = clearButton;
            break;
            case "Enter": button = equalButton;
            break;
            case "Backspace": button = backButton;
            break;
            default: button = "";
        }

        if (button) {
            button.click();
        }
    }
});