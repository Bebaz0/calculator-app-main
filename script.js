class CalculatorApp {
    constructor() {
        this.display = document.getElementById('display');
        this.buttons = document.querySelectorAll('.button');
        this.currentInput = '';
        this.previousInput = '';
        this.operation = null;
        this.justCalculated = false; // Track if we just performed a calculation
        this.slider = document.getElementById('themeRange');

        this.initEventListeners();
        this.themelistener();
    }

    themelistener() {
        this.slider.addEventListener('input', (event) => {
            document.body.setAttribute('data-theme', event.target.value);
            console.log(`Theme changed to: ${event.target.value}`);
        });
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
        } else if (['+', '-', 'x', '/'].includes(value)) {
            this.setOperation(value);
        } else if (value === 'DEL') {
            this.currentInput = this.currentInput.slice(0, -1);
            this.display.textContent = this.currentInput || '0';
            this.justCalculated = false;
        } else {
            this.appendToInput(value);
        }
    }

    appendToInput(value) {
        // If we just calculated and user starts entering a new number,
        // clear everything and start fresh
        if (this.justCalculated) {
            this.clear();
            this.justCalculated = false;
        }

        this.currentInput += value;
        this.display.textContent = this.currentInput;
    }

    setOperation(op) {
        // If we just calculated, use the result as the starting point
        if (this.justCalculated) {
            this.currentInput = this.previousInput;
            this.justCalculated = false;
        }

        if (this.currentInput === '') return;

        // If there's already an operation pending, calculate first
        if (this.previousInput !== '' && this.operation && !this.justCalculated) {
            this.calculate();
        }

        this.operation = op;
        this.previousInput = this.currentInput;
        this.currentInput = '';
        console.log(this.operation);
    }

    calculate() {
        if (this.previousInput === '' || this.currentInput === '' || !this.operation) return;

        let result;
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);

        if (this.operation === '+') {
            result = prev + current;
        }
        else if (this.operation === '-') {
            result = prev - current;
        }
        else if (this.operation === 'x') {
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
        this.operation = null;
        this.justCalculated = true; // Mark that we just performed a calculation
    }

    clear() {
        this.currentInput = '';
        this.previousInput = '';
        this.operation = null;
        this.justCalculated = false;
        this.display.textContent = '0';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CalculatorApp();
    console.log("Calculator App Initialized");
});