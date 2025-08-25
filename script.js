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

const digitButtons = Array.from(document.querySelectorAll(".digitButton"));
const opButtons = Array.from(document.querySelectorAll(".opButton"));
const display = document.querySelector(".display");
const clearButton = document.querySelector(".clearButton");
const equalButton = document.querySelector(".equalButton");

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

function equals() {
    if (num1 !== null && (operator !== '' || operatorSelected()) ) {

        if (num2 !== null) {
            num1 = operate(operator, num1, num2);
        } else {
            num2 = +display.textContent;
            num1 = operate(operator, num1, num2);
        }

        clearBackgroundColor();
        if (num1 === Infinity || num1 === -Infinity || Number.isNaN(num1)) {
            num1 = "The world blew up...";
            display.textContent = num1;
        } else if (Number.isInteger(num1)) {
            display.textContent = num1;
        } else {
            num1 = num1.toFixed(2);
            display.textContent = num1;
        }

    }
}

clearButton.addEventListener("click", function(e) {
    display.textContent = "0";
    num1 = null;
    num2 = null;
    operator = '';
    clearBackgroundColor();
});

digitButtons.forEach(button => {
    button.addEventListener("click", function(e) {

        if (display.textContent == num1 && num2 !== null && operator !== '') {
            display.textContent = "0";
        }

        opButtons.forEach(button => {
            if (button.style.backgroundColor) {
                display.textContent = "0";
                operator = button.id;
                button.style.backgroundColor = "";
            }
        });

        (display.textContent !== "0") ? display.textContent += button.textContent : display.textContent = button.textContent;

        if (num1 === null || operator === '') {
            num1 = +display.textContent;
        }

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
        
    });
});

equalButton.addEventListener("click", function(e) {
    equals();
});