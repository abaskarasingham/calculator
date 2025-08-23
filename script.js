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

clearButton.addEventListener("click", function(e) {
    display.textContent = "0";
    num1 = null;
    num2 = null;
    operator = '';
    clearBackgroundColor();
});

digitButtons.forEach(button => {
    button.addEventListener("click", function(e) {
        opButtons.forEach(button => {
            if (button.style.backgroundColor) {
                display.textContent = "0";
                button.style.backgroundColor = "";
            }
        });

        if (display.textContent !== "0") {
            display.textContent += button.textContent;
        } else {
            display.textContent = button.textContent;
        }
    });
});

opButtons.forEach(button => {
    button.addEventListener("click", function(e) {
        if (num1 === null) {
            num1 = +display.textContent;
        } else {
            num2 = +display.textContent;
        }
        operator = button.id;
        clearBackgroundColor();
        button.style.backgroundColor = "yellow";
    });
});

equalButton.addEventListener("click", function(e) {
    if (num1 !== null && operator !== '') {
        num2 = +display.textContent;
        clearBackgroundColor();
        num1 = operate(operator, num1, num2);
        display.textContent = num1;
    }
});