// JavaScript Introduction Topic JavaScript
// This file handles all interactive functionality for the JavaScript Introduction topic

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all interactive elements
    initializeClickCounter();
    initializeColorChanger();
    initializeGreeting();
    initializeLiveClock();
    initializeConsoleSimulator();

    // Add Enter key support for name input
    const nameInput = document.getElementById('name-input');
    if (nameInput) {
        nameInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                greetUser();
            }
        });
    }

    console.log('JavaScript Introduction topic JavaScript initialized');
});

// Click counter functionality
let clickCount = 0;

function initializeClickCounter() {
    const counterButton = document.getElementById('click-counter');
    if (counterButton) {
        counterButton.onclick = incrementCounter;
    }
}

function incrementCounter() {
    const countElement = document.getElementById('count');
    let currentCount = parseInt(countElement.textContent);
    countElement.textContent = currentCount + 1;
}

// Color changer functionality
const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
let currentColorIndex = 0;

function initializeColorChanger() {
    const colorButton = document.querySelector('[onclick*="changeColor"]');
    if (colorButton) {
        colorButton.onclick = changeColor;
    }
}

function changeColor() {
    const box = document.getElementById('color-box');
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    box.style.background = randomColor;
}

// Greeting functionality
function initializeGreeting() {
    const greetButton = document.querySelector('[onclick*="greetUser"]');
    if (greetButton) {
        greetButton.onclick = greetUser;
    }
}

function greetUser() {
    const name = document.getElementById('name-input').value;
    const output = document.getElementById('greeting-output');
    if (name.trim()) {
        output.innerHTML = `<h4>Hello, ${name}!</h4><p>Welcome to JavaScript!</p>`;
    } else {
        output.innerHTML = `<p style="color: #ef4444;">Please enter your name!</p>`;
    }
}

// Live clock functionality
function initializeLiveClock() {
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        updateClock();
        setInterval(updateClock, 1000);
    }
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

// Console simulator functionality
function initializeConsoleSimulator() {
    const consoleInput = document.getElementById('console-input');
    const exampleButtons = document.querySelectorAll('[onclick*="runExample"]');

    if (consoleInput) {
        consoleInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                executeConsoleCommand();
            }
        });
    }

    // Initialize example buttons
    exampleButtons.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        const match = onclickAttr.match(/runExample\('([^']+)'\)/);
        if (match) {
            const command = match[1];
            button.onclick = () => runExample(command);
        }
    });
}

function runExample(command) {
    document.getElementById('console-input').value = command;
    executeConsoleCommand();
}

function runConsoleCommand(command) {
    const output = document.getElementById('console-output');
    if (!output) return;

    // Add command to output with prompt styling
    output.innerHTML += `<span class="output-command">&gt; ${command}</span><br>`;

    try {
        // Evaluate the JavaScript command
        const result = eval(command);
        const resultStr = result !== undefined ? String(result) : 'undefined';
        output.innerHTML += `<span class="output-result">${resultStr}</span><br><br>`;
    } catch (error) {
        output.innerHTML += `<span class="output-error">Error: ${error.message}</span><br><br>`;
    }

    // Scroll to bottom
    output.scrollTop = output.scrollHeight;
}

function executeConsoleCommand() {
    const input = document.getElementById('console-input');
    const output = document.getElementById('console-output');
    const command = input.value.trim();

    if (command) {
        output.innerHTML += `<span style="color: #00ff00;">&gt; ${command}</span><br>`;

        try {
            const result = eval(command);
            const resultStr = result === undefined ? 'undefined' :
                typeof result === 'string' ? `"${result}"` :
                    String(result);
            output.innerHTML += `<span style="color: #87ceeb;">${resultStr}</span><br><br>`;
        } catch (error) {
            output.innerHTML += `<span style="color: #ff6b6b;">Error: ${error.message}</span><br><br>`;
        }

        input.value = '';

        // Scroll to bottom
        const console = document.getElementById('js-console');
        if (console) {
            console.scrollTop = console.scrollHeight;
        }
    }
}

// Interactive examples
function demonstrateVariables() {
    const examples = [
        "let message = 'Hello World';",
        "let number = 42;",
        "let isTrue = true;",
        "console.log('Variables created!');"
    ];

    examples.forEach((example, index) => {
        setTimeout(() => {
            runConsoleCommand(example);
        }, index * 1000);
    });
}

function demonstrateFunctions() {
    const examples = [
        "function greet(name) { return 'Hello ' + name; }",
        "greet('JavaScript');"
    ];

    examples.forEach((example, index) => {
        setTimeout(() => {
            runConsoleCommand(example);
        }, index * 1000);
    });
}

// Utility functions
function clearConsole() {
    const output = document.getElementById('console-output');
    if (output) {
        output.innerHTML = '';
    }
}

function resetDemos() {
    // Reset click counter
    clickCount = 0;
    const counterButton = document.getElementById('click-counter');
    if (counterButton) {
        counterButton.textContent = 'Click me!';
    }

    // Reset color box
    const colorBox = document.getElementById('color-box');
    if (colorBox) {
        colorBox.style.background = '#3b82f6';
        currentColorIndex = 0;
    }

    // Clear greeting
    const greetingOutput = document.getElementById('greeting-output');
    if (greetingOutput) {
        greetingOutput.innerHTML = '';
    }

    // Clear console
    clearConsole();
}

// Navigation functions
function navigateToUnit() {
    window.location.href = '../units/unit4.html';
}

function navigateToNext() {
    window.location.href = 'js-embedding.html';
}

// Export functions that might be called from HTML
window.incrementCounter = incrementCounter;
window.changeColor = changeColor;
window.greetUser = greetUser;
window.runExample = runExample;
window.runConsoleCommand = runConsoleCommand;
window.executeConsoleCommand = executeConsoleCommand;
window.demonstrateVariables = demonstrateVariables;
window.demonstrateFunctions = demonstrateFunctions;
window.clearConsole = clearConsole;
window.resetDemos = resetDemos;
window.navigateToUnit = navigateToUnit;
window.navigateToNext = navigateToNext;
