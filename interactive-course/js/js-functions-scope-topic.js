// JavaScript Functions & Scope Topic JavaScript
// This file handles all interactive functionality for the JavaScript Functions & Scope topic

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all interactive elements
    initializeFunctionBuilder();
    initializeReturnDemo();
    initializeChallenges();
    initializeScopeQuiz();

    console.log('JavaScript Functions & Scope topic JavaScript initialized');
});

// Function Builder functionality
function initializeFunctionBuilder() {
    // Add event listeners for function builder inputs
    const builderInputs = ['func-name', 'func-params', 'func-body', 'func-call'];
    builderInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', updateFunctionBuilder);
        }
    });

    // Initialize execute button
    const executeButton = document.querySelector('[onclick*="executeFunction"]');
    if (executeButton) {
        executeButton.onclick = executeFunction;
    }

    // Initial update
    updateFunctionBuilder();
}

function updateFunctionBuilder() {
    const name = document.getElementById('func-name')?.value || 'myFunction';
    const params = document.getElementById('func-params')?.value || 'param1, param2';
    const body = document.getElementById('func-body')?.value || 'return param1 + param2;';
    const call = document.getElementById('func-call')?.value || 'myFunction(5, 10)';

    const functionCode = `function ${name}(${params}) {
  ${body}
}

// Function call:
${call}`;

    const generatedElement = document.getElementById('generated-function');
    if (generatedElement) {
        generatedElement.textContent = functionCode;

        // Apply syntax highlighting if Prism.js is available
        if (typeof Prism !== 'undefined') {
            Prism.highlightElement(generatedElement);
        }
    }
}

function executeFunction() {
    try {
        const name = document.getElementById('func-name')?.value || 'myFunction';
        const params = document.getElementById('func-params')?.value || 'param1, param2';
        const body = document.getElementById('func-body')?.value || 'return param1 + param2;';
        const call = document.getElementById('func-call')?.value || 'myFunction(5, 10)';

        // Create and execute the function
        const functionStr = `function ${name}(${params}) { ${body} }`;
        eval(functionStr);
        const result = eval(call);

        const resultElement = document.getElementById('execution-result');
        if (resultElement) {
            resultElement.innerHTML = `<div class="success">Result: ${result}</div>`;
        }
    } catch (error) {
        const resultElement = document.getElementById('execution-result');
        if (resultElement) {
            resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        }
    }
}

// Return Demo functionality
function initializeReturnDemo() {
    // Initialize operation buttons
    const operationButtons = document.querySelectorAll('[onclick*="performOperation"]');
    operationButtons.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        const match = onclickAttr.match(/performOperation\('([^']+)'\)/);
        if (match) {
            const operation = match[1];
            button.onclick = () => performOperation(operation);
        }
    });
}

function performOperation(operation) {
    const aElement = document.getElementById('return-a');
    const bElement = document.getElementById('return-b');

    if (!aElement || !bElement) return;

    const a = parseFloat(aElement.value) || 0;
    const b = parseFloat(bElement.value) || 0;
    let result;
    let functionUsed;

    switch (operation) {
        case 'add':
            result = add(a, b);
            functionUsed = `add(${a}, ${b})`;
            break;
        case 'subtract':
            result = subtract(a, b);
            functionUsed = `subtract(${a}, ${b})`;
            break;
        case 'multiply':
            result = multiply(a, b);
            functionUsed = `multiply(${a}, ${b})`;
            break;
        case 'divide':
            result = divide(a, b);
            functionUsed = `divide(${a}, ${b})`;
            break;
        default:
            result = 'Unknown operation';
            functionUsed = 'Unknown';
    }

    const resultElement = document.getElementById('return-result');
    if (resultElement) {
        resultElement.innerHTML = `<div class="success">${functionUsed} = ${result}</div>`;
    }
}

// Operation functions
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
    if (b === 0) {
        return "Cannot divide by zero";
    }
    return a / b;
}

// Challenge Tests functionality
function initializeChallenges() {
    // Initialize challenge test buttons
    const testButton1 = document.querySelector('[onclick*="testChallenge1"]');
    const testButton2 = document.querySelector('[onclick*="testChallenge2"]');

    if (testButton1) {
        testButton1.onclick = testChallenge1;
    }

    if (testButton2) {
        testButton2.onclick = testChallenge2;
    }
}

function testChallenge1() {
    try {
        const codeElement = document.getElementById('challenge1-code');
        if (!codeElement) return;

        const code = codeElement.value;
        eval(code);

        // Test the celsiusToFahrenheit function
        const test1 = celsiusToFahrenheit(0);
        const test2 = celsiusToFahrenheit(25);
        const test3 = celsiusToFahrenheit(100);

        let results = '';
        if (test1 === 32) {
            results += '<div class="success">✓ Test 1 passed: 0°C = 32°F</div>';
        } else {
            results += `<div class="error">✗ Test 1 failed: Expected 32, got ${test1}</div>`;
        }

        if (test2 === 77) {
            results += '<div class="success">✓ Test 2 passed: 25°C = 77°F</div>';
        } else {
            results += `<div class="error">✗ Test 2 failed: Expected 77, got ${test2}</div>`;
        }

        if (test3 === 212) {
            results += '<div class="success">✓ Test 3 passed: 100°C = 212°F</div>';
        } else {
            results += `<div class="error">✗ Test 3 failed: Expected 212, got ${test3}</div>`;
        }

        const resultElement = document.getElementById('challenge1-result');
        if (resultElement) {
            resultElement.innerHTML = results;
        }
    } catch (error) {
        const resultElement = document.getElementById('challenge1-result');
        if (resultElement) {
            resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        }
    }
}

function testChallenge2() {
    try {
        const codeElement = document.getElementById('challenge2-code');
        if (!codeElement) return;

        const code = codeElement.value;
        eval(code);

        // Test the findMax function
        const test1 = findMax([1, 5, 3, 9, 2]);
        const test2 = findMax([-1, -5, -3]);
        const test3 = findMax([42]);

        let results = '';
        if (test1 === 9) {
            results += '<div class="success">✓ Test 1 passed: Max of [1, 5, 3, 9, 2] = 9</div>';
        } else {
            results += `<div class="error">✗ Test 1 failed: Expected 9, got ${test1}</div>`;
        }

        if (test2 === -1) {
            results += '<div class="success">✓ Test 2 passed: Max of [-1, -5, -3] = -1</div>';
        } else {
            results += `<div class="error">✗ Test 2 failed: Expected -1, got ${test2}</div>`;
        }

        if (test3 === 42) {
            results += '<div class="success">✓ Test 3 passed: Max of [42] = 42</div>';
        } else {
            results += `<div class="error">✗ Test 3 failed: Expected 42, got ${test3}</div>`;
        }

        const resultElement = document.getElementById('challenge2-result');
        if (resultElement) {
            resultElement.innerHTML = results;
        }
    } catch (error) {
        const resultElement = document.getElementById('challenge2-result');
        if (resultElement) {
            resultElement.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        }
    }
}

// Scope Quiz functionality
function initializeScopeQuiz() {
    const quizButton = document.querySelector('[onclick*="checkScopeQuiz"]');
    if (quizButton) {
        quizButton.onclick = checkScopeQuiz;
    }
}

function checkScopeQuiz() {
    const selected = document.querySelector('input[name="scope-quiz"]:checked');
    const resultElement = document.getElementById('scope-quiz-result');

    if (!resultElement) return;

    if (!selected) {
        resultElement.innerHTML = '<div class="error">Please select an answer!</div>';
        return;
    }

    if (selected.value === 'b') {
        resultElement.innerHTML = '<div class="success">✓ Correct! Each function accesses its own scoped variable.</div>';
    } else {
        resultElement.innerHTML = '<div class="error">✗ Incorrect. Remember: inner functions create their own scope and shadow outer variables.</div>';
    }
}

// Navigation functions
function previousTopic() {
    window.location.href = 'js-constructs.html';
}

function nextTopic() {
    window.location.href = 'js-dialogs.html';
}

// Utility functions
function resetAllDemos() {
    // Reset function builder
    const builderInputs = ['func-name', 'func-params', 'func-body', 'func-call'];
    builderInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = '';
        }
    });

    // Reset return demo inputs
    const returnInputs = ['return-a', 'return-b'];
    returnInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = '';
        }
    });

    // Clear all result displays
    const resultIds = [
        'execution-result',
        'return-result',
        'challenge1-result',
        'challenge2-result',
        'scope-quiz-result'
    ];

    resultIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = '';
        }
    });

    // Clear challenge code areas
    const challengeInputs = ['challenge1-code', 'challenge2-code'];
    challengeInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = '';
        }
    });

    // Reset quiz selection
    const quizInputs = document.querySelectorAll('input[name="scope-quiz"]');
    quizInputs.forEach(input => {
        input.checked = false;
    });

    // Update function builder display
    updateFunctionBuilder();
}

// Export functions that might be called from HTML
window.updateFunctionBuilder = updateFunctionBuilder;
window.executeFunction = executeFunction;
window.performOperation = performOperation;
window.add = add;
window.subtract = subtract;
window.multiply = multiply;
window.divide = divide;
window.testChallenge1 = testChallenge1;
window.testChallenge2 = testChallenge2;
window.checkScopeQuiz = checkScopeQuiz;
window.previousTopic = previousTopic;
window.nextTopic = nextTopic;
window.resetAllDemos = resetAllDemos;
