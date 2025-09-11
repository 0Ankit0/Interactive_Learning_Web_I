// JavaScript Variables Topic JavaScript
// This file handles all interactive functionality for the JavaScript Variables topic

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all interactive elements
    initializeVariableTests();
    initializeTypeChecker();
    initializeCodePlayground();
    initializeConversionDemo();

    console.log('JavaScript Variables topic JavaScript initialized');
});

// Variable type testing functions
function initializeVariableTests() {
    const testButtons = document.querySelectorAll('[onclick*="test"]');
    testButtons.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        const functionName = onclickAttr.match(/(\w+)\(/)?.[1];

        if (functionName && window[functionName]) {
            button.onclick = window[functionName];
        }
    });
}

function testNumber() {
    const examples = [
        `let age = 25; // ${typeof 25}`,
        `let price = 19.99; // ${typeof 19.99}`,
        `let infinity = Infinity; // ${typeof Infinity}`,
        `let notNumber = NaN; // ${typeof NaN}`,
        `Number.isInteger(25): ${Number.isInteger(25)}`,
        `Number.isNaN(NaN): ${Number.isNaN(NaN)}`
    ];
    alert(examples.join('\n'));
}

function testString() {
    const name = "Alice";
    const greeting = `Hello, ${name}!`;
    const examples = [
        `"Alice".length: ${name.length}`,
        `"Alice".toUpperCase(): ${name.toUpperCase()}`,
        `Template literal: ${greeting}`,
        `typeof "Hello": ${typeof "Hello"}`,
        `"Hello"[0]: ${"Hello"[0]}`,
        `"Hello".charAt(1): ${"Hello".charAt(1)}`
    ];
    alert(examples.join('\n'));
}

function testBoolean() {
    const examples = [
        `true && false: ${true && false}`,
        `true || false: ${true || false}`,
        `!true: ${!true}`,
        `Boolean(1): ${Boolean(1)}`,
        `Boolean(0): ${Boolean(0)}`,
        `Boolean(""): ${Boolean("")}`,
        `Boolean("hello"): ${Boolean("hello")}`
    ];
    alert(examples.join('\n'));
}

function testUndefined() {
    let x;
    const examples = [
        `let x; // x is ${typeof x}`,
        `x === undefined: ${x === undefined}`,
        `typeof undefined: ${typeof undefined}`,
        `undefined == null: ${undefined == null}`,
        `undefined === null: ${undefined === null}`
    ];
    alert(examples.join('\n'));
}

function testNull() {
    const examples = [
        `typeof null: ${typeof null} (JavaScript quirk!)`,
        `null === null: ${null === null}`,
        `null == undefined: ${null == undefined}`,
        `null === undefined: ${null === undefined}`,
        `Boolean(null): ${Boolean(null)}`
    ];
    alert(examples.join('\n'));
}

function testObject() {
    const person = { name: "Alice", age: 30 };
    const arr = [1, 2, 3];
    const examples = [
        `typeof {}: ${typeof {}}`,
        `typeof []: ${typeof []}`,
        `Array.isArray([]): ${Array.isArray([])}`,
        `Object.keys({name: "Alice"}): ${Object.keys({ name: "Alice" })}`,
        `person.name: ${person.name}`,
        `arr.length: ${arr.length}`
    ];
    alert(examples.join('\n'));
}

// Type checker functionality
function initializeTypeChecker() {
    const checkButton = document.querySelector('[onclick*="checkType"]');
    const quickTestButtons = document.querySelectorAll('[onclick*="quickTest"]');

    if (checkButton) {
        checkButton.onclick = checkType;
    }

    quickTestButtons.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        const match = onclickAttr.match(/quickTest\('([^']+)'\)/);
        if (match) {
            const value = match[1].replace(/&quot;/g, '"');
            button.onclick = () => quickTest(value);
        }
    });
}

function checkType() {
    const input = document.getElementById('type-input').value.trim();
    const result = document.getElementById('type-result');

    if (!input) {
        alert('Please enter a value to test!');
        return;
    }

    try {
        const value = eval(input);
        const type = typeof value;
        const isArray = Array.isArray(value);
        const constructor = value && value.constructor ? value.constructor.name : 'N/A';

        let analysis = `<strong>Value:</strong> ${input}<br>`;
        analysis += `<strong>Result:</strong> ${JSON.stringify(value)}<br>`;
        analysis += `<strong>Type:</strong> ${type}<br>`;

        if (isArray) {
            analysis += `<strong>Array:</strong> Yes (length: ${value.length})<br>`;
        }

        if (type === 'object' && value !== null) {
            analysis += `<strong>Constructor:</strong> ${constructor}<br>`;
            if (!isArray) {
                analysis += `<strong>Keys:</strong> ${Object.keys(value).join(', ')}<br>`;
            }
        }

        if (type === 'number') {
            analysis += `<strong>Integer:</strong> ${Number.isInteger(value)}<br>`;
            analysis += `<strong>Finite:</strong> ${Number.isFinite(value)}<br>`;
        }

        if (type === 'string') {
            analysis += `<strong>Length:</strong> ${value.length}<br>`;
            analysis += `<strong>Empty:</strong> ${value === ''}<br>`;
        }

        result.innerHTML = analysis;
        result.style.display = 'block';
    } catch (error) {
        result.innerHTML = `<strong>Error:</strong> ${error.message}`;
        result.style.display = 'block';
    }
}

function quickTest(value) {
    document.getElementById('type-input').value = value;
    checkType();
}

function getTypeDescription(type, value) {
    const descriptions = {
        'number': 'Numbers can be integers or floating-point values.',
        'string': 'Strings are sequences of characters.',
        'boolean': 'Booleans have only two values: true or false.',
        'undefined': 'Undefined means the variable has been declared but not assigned.',
        'object': value === null ? 'Null is a special object value.' : 'Objects can contain multiple properties.',
        'function': 'Functions are reusable blocks of code.'
    };

    return `<p><em>${descriptions[type] || 'Unknown type'}</em></p>`;
}

// Code playground functionality
function initializeCodePlayground() {
    const runButton = document.querySelector('[onclick*="runCode"]');
    const clearButton = document.querySelector('[onclick*="clearConsole"]');

    if (runButton) {
        runButton.onclick = runCode;
    }

    if (clearButton) {
        clearButton.onclick = clearConsole;
    }
}

function runCode() {
    const code = document.getElementById('js-input').value;
    const output = document.getElementById('console-output');

    // Clear previous output
    output.innerHTML = '';

    // Redirect console.log to our output
    const originalLog = console.log;
    console.log = function (...args) {
        const message = args.map(arg =>
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        output.innerHTML += message + '<br>';
    };

    try {
        eval(code);
    } catch (error) {
        output.innerHTML += `<span style="color: #ef4444;">Error: ${error.message}</span><br>`;
    }

    // Restore original console.log
    console.log = originalLog;
}

function clearConsole() {
    document.getElementById('console-output').innerHTML = '';
}

// Type conversion demonstration
function initializeConversionDemo() {
    const demoButton = document.querySelector('[onclick*="demonstrateConversion"]');

    if (demoButton) {
        demoButton.onclick = demonstrateConversion;
    }
}

function demonstrateConversion() {
    const output = document.getElementById('conversion-output');
    if (!output) return;

    const examples = [
        { desc: 'String to Number', code: 'Number("42")', result: Number("42") },
        { desc: 'Number to String', code: 'String(42)', result: String(42) },
        { desc: 'Boolean to String', code: 'String(true)', result: String(true) },
        { desc: 'Implicit conversion', code: '"5" + 3', result: "5" + 3 },
        { desc: 'Implicit conversion', code: '"5" * 2', result: "5" * 2 }
    ];

    let outputHTML = '<h4>Type Conversion Examples:</h4>';

    examples.forEach(example => {
        outputHTML += `
            <div class="conversion-example">
                <strong>${example.desc}:</strong><br>
                <code>${example.code}</code> → ${JSON.stringify(example.result)} (${typeof example.result})
            </div>
        `;
    });

    output.innerHTML = outputHTML;
    output.classList.add('show');
}

// Utility functions
function resetAllTests() {
    // Hide all results
    const results = document.querySelectorAll('.type-test-result, #type-result');
    results.forEach(result => {
        result.classList.remove('show');
        result.innerHTML = '';
    });

    // Clear inputs
    const inputs = document.querySelectorAll('#type-input, #js-input');
    inputs.forEach(input => {
        input.value = '';
    });

    // Clear console
    clearConsole();
}

// Navigation functions
function navigateToUnit() {
    window.location.href = 'js-embedding.html';
}

function navigateToNext() {
    window.location.href = 'js-operators.html';
}

// Export functions that might be called from HTML
window.testNumber = testNumber;
window.testString = testString;
window.testBoolean = testBoolean;
window.testUndefined = testUndefined;
window.testNull = testNull;
window.testObject = testObject;
window.checkType = checkType;
window.quickTest = quickTest;
window.runCode = runCode;
window.clearConsole = clearConsole;
window.demonstrateConversion = demonstrateConversion;
window.resetAllTests = resetAllTests;
window.navigateToUnit = navigateToUnit;
window.navigateToNext = navigateToNext;
