// JavaScript Operators Topic JavaScript
// This file handles all interactive functionality for the JavaScript Operators topic

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all interactive elements
    initializeCalculator();
    initializeOperatorDemos();

    console.log('JavaScript Operators topic JavaScript initialized');
});

// Calculator functionality
let calcDisplay = '0';
let shouldResetDisplay = false;

function initializeCalculator() {
    updateDisplay();

    // Initialize all calculator buttons with proper event listeners
    const calcButtons = document.querySelectorAll('.calc-btn');
    calcButtons.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        if (!onclickAttr) return;

        if (onclickAttr.includes('clearCalculator')) {
            button.onclick = clearCalculator;
        } else if (onclickAttr.includes('deleteLast')) {
            button.onclick = deleteLast;
        } else if (onclickAttr.includes('calculateResult')) {
            button.onclick = calculateResult;
        } else if (onclickAttr.includes('appendToDisplay')) {
            const match = onclickAttr.match(/appendToDisplay\('([^']+)'\)/);
            if (match) {
                const value = match[1];
                button.onclick = () => appendToDisplay(value);
            }
        }
    });

    // Initialize playground
    if (document.getElementById('operand1')) {
        initializePlayground();
    }
}

function updateDisplay() {
    const display = document.getElementById('calc-display');
    if (display) {
        display.textContent = calcDisplay;
    }
}

function clearCalculator() {
    calcDisplay = '0';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (calcDisplay.length > 1) {
        calcDisplay = calcDisplay.slice(0, -1);
    } else {
        calcDisplay = '0';
    }
    updateDisplay();
}

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        calcDisplay = '';
        shouldResetDisplay = false;
    }

    if (calcDisplay === '0' && value !== '.') {
        calcDisplay = value;
    } else {
        calcDisplay += value;
    }
    updateDisplay();
}

function calculateResult() {
    try {
        // Replace × with * for evaluation
        const expression = calcDisplay.replace(/×/g, '*');
        const result = eval(expression);
        calcDisplay = result.toString();
        shouldResetDisplay = true;
        updateDisplay();
    } catch (error) {
        calcDisplay = 'Error';
        shouldResetDisplay = true;
        updateDisplay();
    }
}

// Operator demonstration functions
function demonstrateArithmetic() {
    const examples = [
        `10 + 3 = ${10 + 3}`,
        `10 - 3 = ${10 - 3}`,
        `10 * 3 = ${10 * 3}`,
        `10 / 3 = ${10 / 3}`,
        `10 % 3 = ${10 % 3}`,
        `10 ** 3 = ${10 ** 3}`,
        `++10 = ${11}`,
        `10-- = ${10} (then becomes 9)`
    ];
    alert('Arithmetic Operators:\n\n' + examples.join('\n'));
}

function demonstrateAssignment() {
    let x = 5;
    const steps = [`x = 5 → x is ${x}`];

    x += 3;
    steps.push(`x += 3 → x is ${x}`);

    x -= 2;
    steps.push(`x -= 2 → x is ${x}`);

    x *= 4;
    steps.push(`x *= 4 → x is ${x}`);

    x /= 3;
    steps.push(`x /= 3 → x is ${x}`);

    alert('Assignment Operators:\n\n' + steps.join('\n'));
}

function demonstrateComparison() {
    const examples = [
        `5 == "5" → ${5 == "5"} (loose equality)`,
        `5 === "5" → ${5 === "5"} (strict equality)`,
        `5 != 3 → ${5 != 3} (not equal)`,
        `5 !== "5" → ${5 !== "5"} (strict not equal)`,
        `5 < 10 → ${5 < 10} (less than)`,
        `5 <= 5 → ${5 <= 5} (less than or equal)`,
        `10 > 5 → ${10 > 5} (greater than)`,
        `10 >= 10 → ${10 >= 10} (greater than or equal)`
    ];
    alert('Comparison Operators:\n\n' + examples.join('\n'));
}

function demonstrateLogical() {
    const examples = [
        `true && true → ${true && true}`,
        `true && false → ${true && false}`,
        `false && true → ${false && true}`,
        `true || false → ${true || false}`,
        `false || false → ${false || false}`,
        `!true → ${!true}`,
        `!false → ${!false}`,
        `!(true && false) → ${!(true && false)}`
    ];
    alert('Logical Operators:\n\n' + examples.join('\n'));
}

function demonstrateUnary() {
    const examples = [
        `typeof 42 → "${typeof 42}"`,
        `typeof "hello" → "${typeof "hello"}"`,
        `typeof true → "${typeof true}"`,
        `+"123" → ${+"123"} (string to number)`,
        `-42 → ${-42} (negation)`,
        `!0 → ${!0} (logical NOT)`,
        `!!1 → ${!!1} (double NOT)`
    ];
    alert('Unary Operators:\n\n' + examples.join('\n'));
}

function demonstrateTernary() {
    const age = 20;
    const score = 85;
    const examples = [
        `age = 20`,
        `age >= 18 ? "adult" : "minor" → "${age >= 18 ? "adult" : "minor"}"`,
        `score = 85`,
        `score >= 90 ? "A" : score >= 80 ? "B" : "C" → "${score >= 90 ? "A" : score >= 80 ? "B" : "C"}"`,
        `true ? "yes" : "no" → "${true ? "yes" : "no"}"`,
        `false ? "yes" : "no" → "${false ? "yes" : "no"}"`
    ];
    alert('Ternary Operator:\n\n' + examples.join('\n'));
}

// Playground functionality
function initializePlayground() {
    // Add event listeners for real-time updates
    const operand1 = document.getElementById('operand1');
    const operand2 = document.getElementById('operand2');

    if (operand1) {
        operand1.addEventListener('input', updateResult);
    }
    if (operand2) {
        operand2.addEventListener('input', updateResult);
    }

    // Initial calculation
    updateResult();
}

function updateResult() {
    const operand1 = document.getElementById('operand1').value;
    const operator = document.getElementById('operator').value;
    const operand2 = document.getElementById('operand2').value;
    const result = document.getElementById('playground-result');

    try {
        // Convert to appropriate types
        let val1 = isNaN(operand1) ? operand1 : Number(operand1);
        let val2 = isNaN(operand2) ? operand2 : Number(operand2);

        // Special handling for boolean strings
        if (operand1 === 'true') val1 = true;
        if (operand1 === 'false') val1 = false;
        if (operand2 === 'true') val2 = true;
        if (operand2 === 'false') val2 = false;

        let evalResult;
        switch (operator) {
            case '+': evalResult = val1 + val2; break;
            case '-': evalResult = val1 - val2; break;
            case '*': evalResult = val1 * val2; break;
            case '/': evalResult = val1 / val2; break;
            case '%': evalResult = val1 % val2; break;
            case '**': evalResult = val1 ** val2; break;
            case '==': evalResult = val1 == val2; break;
            case '===': evalResult = val1 === val2; break;
            case '!=': evalResult = val1 != val2; break;
            case '!==': evalResult = val1 !== val2; break;
            case '<': evalResult = val1 < val2; break;
            case '<=': evalResult = val1 <= val2; break;
            case '>': evalResult = val1 > val2; break;
            case '>=': evalResult = val1 >= val2; break;
            case '&&': evalResult = val1 && val2; break;
            case '||': evalResult = val1 || val2; break;
            default: evalResult = 'Unknown operator';
        }

        const expression = `${operand1} ${operator} ${operand2}`;
        result.innerHTML = `
            Expression: <strong>${expression}</strong><br>
            Result: <strong>${evalResult}</strong><br>
            Type: <strong>${typeof evalResult}</strong>
        `;
    } catch (error) {
        result.innerHTML = `Error: ${error.message}`;
    }
}

function setExample(val1, op, val2) {
    document.getElementById('operand1').value = val1;
    document.getElementById('operator').value = op;
    document.getElementById('operand2').value = val2;
    updateResult();
}

function oldAppendToDisplay(value) {
    if (waitingForNewValue) {
        currentDisplay = value;
        waitingForNewValue = false;
    } else {
        if (currentDisplay === '0' && value !== '.') {
            currentDisplay = value;
        } else {
            currentDisplay += value;
        }
    }

    updateCalculatorDisplay();
}

function clearCalculator() {
    currentDisplay = '0';
    previousValue = null;
    operator = null;
    waitingForNewValue = false;
    updateCalculatorDisplay();
}

function deleteLast() {
    if (currentDisplay.length > 1) {
        currentDisplay = currentDisplay.slice(0, -1);
    } else {
        currentDisplay = '0';
    }
    updateCalculatorDisplay();
}

function calculateResult() {
    if (operator && previousValue !== null && !waitingForNewValue) {
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentDisplay);
        let result;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    result = 'Error';
                } else {
                    result = prev / current;
                }
                break;
            default:
                return;
        }

        currentDisplay = result.toString();
        previousValue = null;
        operator = null;
        waitingForNewValue = true;
        updateCalculatorDisplay();

        // Show calculation in demo area
        showCalculationExample(prev, operator, current, result);
    }
}

function setOperator(op) {
    if (operator && !waitingForNewValue) {
        calculateResult();
    }

    previousValue = currentDisplay;
    operator = op;
    waitingForNewValue = true;
}

// Handle operator buttons
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('calc-operator')) {
        const op = e.target.textContent.trim();
        const operatorMap = { '×': '*', '÷': '/' };
        setOperator(operatorMap[op] || op);
    }
});

function showCalculationExample(a, op, b, result) {
    const exampleArea = document.getElementById('calc-example');
    if (exampleArea) {
        const operatorNames = {
            '+': 'Addition',
            '-': 'Subtraction',
            '*': 'Multiplication',
            '/': 'Division'
        };

        exampleArea.innerHTML = `
            <h4>Last Calculation:</h4>
            <p><strong>Operation:</strong> ${operatorNames[op]}</p>
            <p><strong>Expression:</strong> ${a} ${op} ${b} = ${result}</p>
        `;
    }
}

// Operator demonstration functions
function initializeOperatorDemos() {
    const demoButtons = document.querySelectorAll('[onclick*="demonstrate"]');
    demoButtons.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        const functionName = onclickAttr.match(/(\w+)\(/)?.[1];

        if (functionName && window[functionName]) {
            button.onclick = window[functionName];
        }
    });
}

function demonstrateArithmetic() {
    const output = document.getElementById('arithmetic-output');
    if (!output) {
        createDemoOutput('arithmetic-output');
    }

    const examples = [
        { expression: '10 + 5', result: 10 + 5, description: 'Addition' },
        { expression: '10 - 5', result: 10 - 5, description: 'Subtraction' },
        { expression: '10 * 5', result: 10 * 5, description: 'Multiplication' },
        { expression: '10 / 5', result: 10 / 5, description: 'Division' },
        { expression: '10 % 3', result: 10 % 3, description: 'Modulus (remainder)' },
        { expression: '2 ** 3', result: 2 ** 3, description: 'Exponentiation' }
    ];

    showOperatorExamples('arithmetic-output', 'Arithmetic Operators', examples);
}

function demonstrateAssignment() {
    const output = document.getElementById('assignment-output');
    if (!output) {
        createDemoOutput('assignment-output');
    }

    // Simulate assignment operations
    let x = 10;
    const examples = [
        { expression: 'x = 10', result: x, description: 'Basic assignment' },
        { expression: 'x += 5', result: (x += 5), description: 'Addition assignment' },
        { expression: 'x -= 3', result: (x -= 3), description: 'Subtraction assignment' },
        { expression: 'x *= 2', result: (x *= 2), description: 'Multiplication assignment' },
        { expression: 'x /= 4', result: (x /= 4), description: 'Division assignment' }
    ];

    showOperatorExamples('assignment-output', 'Assignment Operators', examples);
}

function demonstrateComparison() {
    const output = document.getElementById('comparison-output');
    if (!output) {
        createDemoOutput('comparison-output');
    }

    const examples = [
        { expression: '5 == "5"', result: 5 == "5", description: 'Equality (type coercion)' },
        { expression: '5 === "5"', result: 5 === "5", description: 'Strict equality (no coercion)' },
        { expression: '10 > 5', result: 10 > 5, description: 'Greater than' },
        { expression: '5 < 10', result: 5 < 10, description: 'Less than' },
        { expression: '10 >= 10', result: 10 >= 10, description: 'Greater than or equal' },
        { expression: '5 <= 10', result: 5 <= 10, description: 'Less than or equal' },
        { expression: '5 != "6"', result: 5 != "6", description: 'Not equal' }
    ];

    showOperatorExamples('comparison-output', 'Comparison Operators', examples);
}

function demonstrateLogical() {
    const output = document.getElementById('logical-output');
    if (!output) {
        createDemoOutput('logical-output');
    }

    const examples = [
        { expression: 'true && true', result: true && true, description: 'Logical AND' },
        { expression: 'true && false', result: true && false, description: 'Logical AND' },
        { expression: 'true || false', result: true || false, description: 'Logical OR' },
        { expression: 'false || false', result: false || false, description: 'Logical OR' },
        { expression: '!true', result: !true, description: 'Logical NOT' },
        { expression: '!false', result: !false, description: 'Logical NOT' }
    ];

    showOperatorExamples('logical-output', 'Logical Operators', examples);
}

function createDemoOutput(id) {
    const container = document.querySelector('.operator-demo-section');
    if (container) {
        const output = document.createElement('div');
        output.id = id;
        output.className = 'demo-output';
        container.appendChild(output);
    }
}

function showOperatorExamples(outputId, title, examples) {
    const output = document.getElementById(outputId);
    if (!output) return;

    let html = `<h4>${title} Examples:</h4><div class="operator-examples">`;

    examples.forEach(example => {
        html += `
            <div class="example-item">
                <code>${example.expression}</code> → 
                <strong>${JSON.stringify(example.result)}</strong>
                <span class="example-desc">(${example.description})</span>
            </div>
        `;
    });

    html += '</div>';
    output.innerHTML = html;
}

// Interactive operator tester
function testOperator(operator, a = 10, b = 5) {
    let result;
    let description = '';

    try {
        switch (operator) {
            case '+':
                result = a + b;
                description = `Addition: ${a} + ${b} = ${result}`;
                break;
            case '-':
                result = a - b;
                description = `Subtraction: ${a} - ${b} = ${result}`;
                break;
            case '*':
                result = a * b;
                description = `Multiplication: ${a} * ${b} = ${result}`;
                break;
            case '/':
                result = a / b;
                description = `Division: ${a} / ${b} = ${result}`;
                break;
            case '%':
                result = a % b;
                description = `Modulus: ${a} % ${b} = ${result}`;
                break;
            case '**':
                result = a ** b;
                description = `Exponentiation: ${a} ** ${b} = ${result}`;
                break;
            default:
                result = 'Unknown operator';
                description = 'Please use a valid operator (+, -, *, /, %, **)';
        }

        showTestResult(description, result);
    } catch (error) {
        showTestResult(`Error: ${error.message}`, 'Error');
    }
}

function showTestResult(description, result) {
    // Create or update result display
    let resultDiv = document.getElementById('operator-test-result');
    if (!resultDiv) {
        resultDiv = document.createElement('div');
        resultDiv.id = 'operator-test-result';
        resultDiv.className = 'test-result';

        const container = document.querySelector('.operator-test-section') || document.body;
        container.appendChild(resultDiv);
    }

    resultDiv.innerHTML = `
        <h4>Test Result:</h4>
        <p>${description}</p>
        <p><strong>Result:</strong> ${result}</p>
    `;

    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Utility functions
function resetCalculator() {
    clearCalculator();

    // Clear all demo outputs
    const outputs = document.querySelectorAll('.demo-output, .test-result');
    outputs.forEach(output => {
        output.innerHTML = '';
    });
}

function resetOperatorDemos() {
    const demoOutputs = document.querySelectorAll('[id$="-output"]');
    demoOutputs.forEach(output => {
        output.innerHTML = '';
    });

    const testResult = document.getElementById('operator-test-result');
    if (testResult) {
        testResult.remove();
    }
}

// Export functions that might be called from HTML
window.appendToDisplay = appendToDisplay;
window.clearCalculator = clearCalculator;
window.deleteLast = deleteLast;
window.calculateResult = calculateResult;
window.demonstrateArithmetic = demonstrateArithmetic;
window.demonstrateAssignment = demonstrateAssignment;
window.demonstrateComparison = demonstrateComparison;
window.demonstrateLogical = demonstrateLogical;
window.demonstrateUnary = demonstrateUnary;
window.demonstrateTernary = demonstrateTernary;
window.updateResult = updateResult;
window.setExample = setExample;
window.testOperator = testOperator;
window.resetCalculator = resetCalculator;
window.resetOperatorDemos = resetOperatorDemos;
