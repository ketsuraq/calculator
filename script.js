const output = document.querySelector("#input");
const memory = document.querySelector('#memory');

let initialValue = "";
output.value = initialValue;
memory.textContent = initialValue;

let lastEntryWasSign = false;
let firstNumber = "";
let secondNumber = "";
let operator;

const numbers = document.querySelectorAll(".action-button");

let firstEvent = false;

numbers.forEach(number => {
    number.addEventListener('click', (event) => {
        firstEvent = true;

        const currentValue = event.target.textContent;
        output.value += currentValue;
        memory.textContent += currentValue;

        if (!operator) {
            firstNumber += currentValue;
        } else {
            secondNumber += currentValue;
        }

        lastEntryWasSign = false;
    })
})

const signs = document.querySelectorAll(".thing-button");

signs.forEach(sign => {
    sign.addEventListener('click', (event) => {
        if (firstEvent) {
            const currentValue = event.target.textContent;

            if (firstNumber && secondNumber) {
                const answer = calculate(parseFloat(firstNumber), parseFloat(secondNumber), operator);
                displayResult(answer);
                firstNumber = answer.toString();
                secondNumber = "";
            }

            if (lastEntryWasSign) {
                const text = memory.textContent.slice(0, -2) + currentValue + " ";
                memory.textContent = text;
            } else {
                memory.textContent += " " + currentValue + " ";
            }
            output.value = "";
            lastEntryWasSign = true;

            operator = currentValue;
        }
    })
})

const deleteButton = document.querySelector("#delete-button");
deleteButton.addEventListener('click', () => {
    output.value = output.value.slice(0, -1);
    memory.textContent = memory.textContent.slice(0, -1);
    lastEntryWasSign = false;

    if (!operator && firstNumber) {
        firstNumber = firstNumber.slice(0, -1);
    } else if (secondNumber) {
        secondNumber = secondNumber.slice(0, -1);
    }
})

const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener('click', () => {
    output.value = "";
    memory.textContent = "";
    lastEntryWasSign = false;
    firstNumber = "";
    secondNumber = "";
    operator = "";
})

const result = document.querySelector("#result");
result.addEventListener('click', () => {
    if (firstNumber && secondNumber && operator) {
        const answer = calculate(parseFloat(firstNumber), parseFloat(secondNumber), operator);
        displayResult(answer);
        firstNumber = answer.toString();
        secondNumber = "";
        operator = "";
    }
})

function calculate(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "÷":
            return a / b;
        case "×":
            return a * b;
        case "^":
            return Math.pow(a, b);
        case "√":
            return a * Math.sqrt(b);
    }
}

function displayResult(answer) {
    if (answer % 1 !== 0 && answer * 10 % 1 !== 0 && answer * 100 % 1 !== 0) {
        const roundedAnswer = answer.toFixed(3);
        output.value = roundedAnswer;
        memory.textContent = roundedAnswer;
    } else {
        output.value = answer;
        memory.textContent = answer;
    }
}
