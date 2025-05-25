
class CalculatorApp {
    constructor() {
        this.display = document.getElementById('display');
        this.buttons = document.querySelectorAll('.button');
        this.currentInput = '';
        this.previousInput = '';
        this.operation = null;

        this.initEventListeners();
    }
    initEventListeners() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const value = event.target.textContent;
                this.handleButtonClick(value);
            });
        });
    }
    handleButtonClick(value) {
        if (value === 'RESET') {
            this.clear();
        } else if (value === '=') {
            this.calculate();
        } else if (['+', '-', '*', '/'].includes(value)) {
            this.setOperation(value);
        } else if (value === 'DEL') {
            this.currentInput = this.currentInput.slice(0, -1);
            this.display.textContent = this.currentInput || '0';
        }
        else{
            this.appendToInput(value);
        }
    }
    appendToInput(value) {
        this.currentInput += value;
        this.display.textContent = this.currentInput;
    }
    setOperation(op) {
        if (this.currentInput === '') return;
        if (this.previousInput !== '') {
            this.calculate();
        }
        this.operation = op;
        this.previousInput = this.currentInput;
        this.currentInput = '';
    }
    calculate(){
        if (this.previousInput === '' || this.currentInput === '') return;

        let result;
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);

        if (this.operation === '+') {
            result = prev + current;
        }
        else if (this.operation === '-') {
            result = prev - current;
        }
        else if (this.operation === '*') {
            result = prev * current;
        }
        else if (this.operation === '/') {
            if (current === 0) {
                alert("Cannot divide by zero");
                return;
            }
            result = prev / current;
        }

        this.display.textContent = result;
        this.previousInput = result.toString();
        this.currentInput = '';
    }
    clear() {
        this.currentInput = '';
        this.previousInput = '';
        this.operation = null;
        this.display.textContent = '0';
    }

}

document.addEventListener('DOMContentLoaded', () => {
    new CalculatorApp();
    console.log("Calculator App Initialized");
}
);