// ES6+ Features Topic Interactive Features
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all interactive components
    initializeTabs();
    initializeScopeDemo();
    initializeArrowFunctionPlayground();
    initializeTemplateLiteralBuilder();
    initializeDestructuringPractice();
    initializePromiseSimulator();
    initializeQuiz();
});

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');
            const parentContainer = this.closest('.comparison-tabs, .function-comparison, .type-tabs, .example-tabs');
            const contentContainer = parentContainer.nextElementSibling;

            // Update active tab button
            parentContainer.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update active tab panel
            contentContainer.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
            const activePanel = contentContainer.querySelector(`#${tabId}-panel`);
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });
}

// Variable scope demo
function initializeScopeDemo() {
    const runButton = document.getElementById('runScopeCode');
    const clearButton = document.getElementById('clearScopeOutput');
    const codeTextarea = document.getElementById('scopeCode');
    const outputPre = document.getElementById('scopeOutput');

    if (!runButton || !codeTextarea || !outputPre) return;

    // Capture console.log output
    let originalLog = console.log;
    let logOutput = [];

    function captureConsole() {
        console.log = function (...args) {
            logOutput.push(args.join(' '));
            originalLog.apply(console, args);
        };
    }

    function restoreConsole() {
        console.log = originalLog;
    }

    runButton.addEventListener('click', function () {
        const code = codeTextarea.value;
        logOutput = [];

        try {
            captureConsole();

            // Create a function to execute the code in a controlled environment
            const executeCode = new Function(`
                ${code}
            `);

            executeCode();

            if (logOutput.length > 0) {
                outputPre.textContent = logOutput.join('\n');
                outputPre.className = 'success';
            } else {
                outputPre.textContent = 'Code executed successfully (no console output)';
                outputPre.className = 'success';
            }

        } catch (error) {
            outputPre.textContent = `Error: ${error.message}`;
            outputPre.className = 'error';
        } finally {
            restoreConsole();
        }
    });

    clearButton.addEventListener('click', function () {
        outputPre.textContent = 'Click "Run Code" to see the result';
        outputPre.className = '';
    });
}

// Arrow function playground
function initializeArrowFunctionPlayground() {
    const traditionalTextarea = document.getElementById('traditionalFunction');
    const arrowTextarea = document.getElementById('arrowFunction');
    const checkButton = document.getElementById('checkArrowFunction');
    const feedbackDiv = document.getElementById('arrowFeedback');
    const exampleButtons = document.querySelectorAll('.example-btn');

    if (!traditionalTextarea || !arrowTextarea || !checkButton) return;

    const examples = {
        simple: {
            traditional: 'function greet(name) {\n    return "Hello, " + name;\n}',
            arrow: 'const greet = (name) => "Hello, " + name;'
        },
        array: {
            traditional: 'const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(function(n) {\n    return n * 2;\n});',
            arrow: 'const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);'
        },
        object: {
            traditional: 'const user = {\n    name: "John",\n    greet: function() {\n        return "Hello, " + this.name;\n    }\n};',
            arrow: '// Avoid arrow functions for object methods!\nconst user = {\n    name: "John",\n    greet() {\n        return "Hello, " + this.name;\n    }\n};'
        },
        callback: {
            traditional: 'setTimeout(function() {\n    console.log("Timer finished");\n}, 1000);',
            arrow: 'setTimeout(() => {\n    console.log("Timer finished");\n}, 1000);'
        }
    };

    // Example button handlers
    exampleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const exampleKey = this.getAttribute('data-example');
            const example = examples[exampleKey];

            if (example) {
                traditionalTextarea.value = example.traditional;
                arrowTextarea.value = '';
                feedbackDiv.innerHTML = '';
                feedbackDiv.className = 'feedback';
            }
        });
    });

    checkButton.addEventListener('click', function () {
        const userAnswer = arrowTextarea.value.trim();
        const currentTraditional = traditionalTextarea.value.trim();

        if (!userAnswer) {
            feedbackDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please enter your arrow function conversion.';
            feedbackDiv.className = 'feedback warning';
            return;
        }

        // Find matching example
        let correctAnswer = null;
        let isCorrectPattern = false;

        Object.values(examples).forEach(example => {
            if (example.traditional === currentTraditional) {
                correctAnswer = example.arrow;
            }
        });

        // Basic pattern checking for arrow functions
        if (userAnswer.includes('=>')) {
            if (correctAnswer && userAnswer.replace(/\s+/g, ' ').trim() === correctAnswer.replace(/\s+/g, ' ').trim()) {
                feedbackDiv.innerHTML = '<i class="fas fa-check-circle"></i> Excellent! Your arrow function conversion is correct!';
                feedbackDiv.className = 'feedback success';
            } else if (userAnswer.includes('const') && userAnswer.includes('=>')) {
                feedbackDiv.innerHTML = '<i class="fas fa-check"></i> Good attempt! Your syntax looks correct. Here\'s the optimal solution:<br><code>' + (correctAnswer || 'const func = () => {}') + '</code>';
                feedbackDiv.className = 'feedback partial';
            } else {
                feedbackDiv.innerHTML = '<i class="fas fa-info-circle"></i> Close! Make sure to use proper arrow function syntax. Here\'s the correct version:<br><code>' + (correctAnswer || 'const func = () => {}') + '</code>';
                feedbackDiv.className = 'feedback info';
            }
        } else {
            feedbackDiv.innerHTML = '<i class="fas fa-times-circle"></i> Remember to use arrow function syntax (=&gt;). Try again!';
            feedbackDiv.className = 'feedback error';
        }
    });
}

// Template literal builder
function initializeTemplateLiteralBuilder() {
    const nameInput = document.getElementById('userName');
    const ageInput = document.getElementById('userAge');
    const cityInput = document.getElementById('userCity');
    const skillsInput = document.getElementById('userSkills');
    const templateResult = document.getElementById('templateResult');
    const htmlPreview = document.getElementById('htmlPreview');

    if (!nameInput || !templateResult) return;

    function updateTemplate() {
        const name = nameInput.value || 'John Doe';
        const age = ageInput.value || '25';
        const city = cityInput.value || 'New York';
        const skills = skillsInput.value || 'JavaScript, React, Node.js';
        const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);

        // Generate template literal code
        const templateCode = `const userProfile = \`
    <div class="user-card">
        <h2>\${name}</h2>
        <div class="user-info">
            <p><strong>Age:</strong> \${age} years old</p>
            <p><strong>Location:</strong> \${city}</p>
            <p><strong>Skills:</strong></p>
            <ul class="skills-list">
                \${skills.map(skill => \`<li>\${skill}</li>\`).join('')}
            </ul>
        </div>
        <div class="user-stats">
            <span class="stat">Skills: \${skills.length}</span>
            <span class="stat">Experience: \${age >= 30 ? 'Senior' : 'Junior'}</span>
        </div>
    </div>
\`;

// Variables used:
const name = '${name}';
const age = ${age};
const city = '${city}';
const skills = ['${skillsArray.join("', '")}'];`;

        templateResult.textContent = templateCode;

        // Generate actual HTML preview
        const actualHTML = `
            <div class="user-card">
                <h2>${name}</h2>
                <div class="user-info">
                    <p><strong>Age:</strong> ${age} years old</p>
                    <p><strong>Location:</strong> ${city}</p>
                    <p><strong>Skills:</strong></p>
                    <ul class="skills-list">
                        ${skillsArray.map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                </div>
                <div class="user-stats">
                    <span class="stat">Skills: ${skillsArray.length}</span>
                    <span class="stat">Experience: ${age >= 30 ? 'Senior' : 'Junior'}</span>
                </div>
            </div>
        `;

        htmlPreview.innerHTML = actualHTML;
    }

    // Add event listeners to all inputs
    [nameInput, ageInput, cityInput, skillsInput].forEach(input => {
        if (input) {
            input.addEventListener('input', updateTemplate);
        }
    });

    // Initial template generation
    updateTemplate();
}

// Destructuring practice
function initializeDestructuringPractice() {
    const answerTextarea = document.getElementById('destructuringAnswer');
    const checkButton = document.getElementById('checkDestructuring');
    const feedbackDiv = document.getElementById('destructuringFeedback');

    if (!answerTextarea || !checkButton) return;

    const correctAnswers = [
        'const { company: { name: companyName, employees: [{ name: firstName, salary }], location: { city } } } = data;',
        'const { company: { name, employees: [{ name: employeeName, salary }], location: { city } } } = data;',
        'const { company: { name: companyName, employees: [firstEmployee], location: { city } } } = data;\nconst { name: firstName, salary } = firstEmployee;'
    ];

    checkButton.addEventListener('click', function () {
        const userAnswer = answerTextarea.value.trim();

        if (!userAnswer) {
            feedbackDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please write your destructuring code.';
            feedbackDiv.className = 'feedback warning';
            return;
        }

        // Check for key destructuring patterns
        const hasCompanyDestructure = userAnswer.includes('company') && userAnswer.includes('{');
        const hasNestedDestructure = userAnswer.includes('employees') || userAnswer.includes('location');
        const hasArrayDestructure = userAnswer.includes('[') && userAnswer.includes(']');
        const usesDestructuring = userAnswer.includes('{') && userAnswer.includes('}');

        if (usesDestructuring && hasCompanyDestructure && hasNestedDestructure) {
            if (hasArrayDestructure) {
                feedbackDiv.innerHTML = `
                    <i class="fas fa-check-circle"></i> Excellent! You've successfully used nested destructuring!<br>
                    <strong>Sample solution:</strong><br>
                    <code>const { company: { name: companyName, employees: [{ name: firstName, salary }], location: { city } } } = data;</code>
                `;
                feedbackDiv.className = 'feedback success';
            } else {
                feedbackDiv.innerHTML = `
                    <i class="fas fa-check"></i> Good! Don't forget to destructure the array to get the first employee.<br>
                    <strong>Hint:</strong> Use <code>[{ name: firstName, salary }]</code> for the employees array.
                `;
                feedbackDiv.className = 'feedback partial';
            }
        } else if (usesDestructuring) {
            feedbackDiv.innerHTML = `
                <i class="fas fa-info-circle"></i> You're using destructuring, but you need nested destructuring for this challenge.<br>
                <strong>Hint:</strong> You need to destructure <code>company</code>, then <code>employees</code> and <code>location</code> inside it.
            `;
            feedbackDiv.className = 'feedback info';
        } else {
            feedbackDiv.innerHTML = `
                <i class="fas fa-times-circle"></i> This challenge requires destructuring assignment. Use <code>{ }</code> syntax.<br>
                <strong>Example:</strong> <code>const { property } = object;</code>
            `;
            feedbackDiv.className = 'feedback error';
        }
    });
}

// Promise simulator
function initializePromiseSimulator() {
    const createButton = document.getElementById('createPromise');
    const allButton = document.getElementById('promiseAll');
    const raceButton = document.getElementById('promiseRace');
    const clearButton = document.getElementById('clearPromiseOutput');

    const promiseCountSpan = document.getElementById('promiseCount');
    const resolvedCountSpan = document.getElementById('resolvedCount');
    const rejectedCountSpan = document.getElementById('rejectedCount');
    const resultsDiv = document.getElementById('promiseResults');

    if (!createButton || !resultsDiv) return;

    let promiseCount = 0;
    let resolvedCount = 0;
    let rejectedCount = 0;
    let outputLines = [];

    function updateCounts() {
        if (promiseCountSpan) promiseCountSpan.textContent = promiseCount;
        if (resolvedCountSpan) resolvedCountSpan.textContent = resolvedCount;
        if (rejectedCountSpan) rejectedCountSpan.textContent = rejectedCount;
    }

    function addOutput(message) {
        const timestamp = new Date().toLocaleTimeString();
        outputLines.push(`[${timestamp}] ${message}`);
        resultsDiv.textContent = outputLines.join('\n');
        resultsDiv.scrollTop = resultsDiv.scrollHeight;
    }

    function createRandomPromise(id) {
        return new Promise((resolve, reject) => {
            const delay = Math.random() * 2000 + 500; // 0.5-2.5 seconds
            const willResolve = Math.random() > 0.3; // 70% success rate

            setTimeout(() => {
                if (willResolve) {
                    resolvedCount++;
                    updateCounts();
                    const result = `Promise ${id} resolved after ${Math.round(delay)}ms`;
                    addOutput(result);
                    resolve(result);
                } else {
                    rejectedCount++;
                    updateCounts();
                    const error = `Promise ${id} rejected after ${Math.round(delay)}ms`;
                    addOutput(error);
                    reject(new Error(error));
                }
            }, delay);
        });
    }

    createButton.addEventListener('click', function () {
        promiseCount++;
        updateCounts();
        const id = promiseCount;

        addOutput(`Creating Promise ${id}...`);

        createRandomPromise(id)
            .then(result => {
                addOutput(`✅ ${result}`);
            })
            .catch(error => {
                addOutput(`❌ ${error.message}`);
            });
    });

    allButton.addEventListener('click', function () {
        const promises = [];
        const startId = promiseCount + 1;

        addOutput(`Creating Promise.all() with 3 promises...`);

        for (let i = 0; i < 3; i++) {
            promiseCount++;
            updateCounts();
            promises.push(createRandomPromise(promiseCount));
            addOutput(`  Creating Promise ${promiseCount}...`);
        }

        Promise.all(promises)
            .then(results => {
                addOutput(`🎉 Promise.all() resolved! All ${results.length} promises succeeded.`);
                results.forEach((result, index) => {
                    addOutput(`  Result ${index + 1}: ${result}`);
                });
            })
            .catch(error => {
                addOutput(`💥 Promise.all() rejected! One promise failed: ${error.message}`);
            });
    });

    raceButton.addEventListener('click', function () {
        const promises = [];
        const startId = promiseCount + 1;

        addOutput(`Creating Promise.race() with 3 promises...`);

        for (let i = 0; i < 3; i++) {
            promiseCount++;
            updateCounts();
            promises.push(createRandomPromise(promiseCount));
            addOutput(`  Creating Promise ${promiseCount}...`);
        }

        Promise.race(promises)
            .then(result => {
                addOutput(`🏁 Promise.race() resolved! First to finish: ${result}`);
            })
            .catch(error => {
                addOutput(`🏁 Promise.race() rejected! First to finish failed: ${error.message}`);
            });
    });

    clearButton.addEventListener('click', function () {
        promiseCount = 0;
        resolvedCount = 0;
        rejectedCount = 0;
        outputLines = [];
        updateCounts();
        resultsDiv.textContent = 'Click buttons above to see promise behavior';
    });
}

// Quiz functionality
function initializeQuiz() {
    const quizAnswers = {
        q1: 'b', // let is block-scoped, var is function-scoped
        q2: 'b', // 2 + 3 = 5
        q3: 'b', // x => x * 2
        q4: 'b'  // a=1, c=3, skips second element
    };

    const submitButton = document.querySelector('.quiz-submit');
    const retryButton = document.querySelector('.quiz-retry');
    const resultsDiv = document.querySelector('.quiz-results');
    const scoreSpan = document.getElementById('score');
    const percentageSpan = document.getElementById('percentage');

    if (!submitButton) return;

    submitButton.addEventListener('click', function () {
        let score = 0;
        const totalQuestions = Object.keys(quizAnswers).length;

        // Check answers
        Object.entries(quizAnswers).forEach(([question, correctAnswer]) => {
            const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
            const questionDiv = document.querySelector(`input[name="${question}"]`).closest('.quiz-question');

            // Remove previous styling
            questionDiv.classList.remove('correct', 'incorrect');

            if (selectedAnswer && selectedAnswer.value === correctAnswer) {
                score++;
                questionDiv.classList.add('correct');
            } else {
                questionDiv.classList.add('incorrect');
                // Highlight correct answer
                const correctOption = document.querySelector(`input[name="${question}"][value="${correctAnswer}"]`);
                if (correctOption) {
                    correctOption.closest('li').classList.add('correct-answer');
                }
            }
        });

        // Calculate percentage
        const percentage = Math.round((score / totalQuestions) * 100);

        // Show results
        if (scoreSpan) scoreSpan.textContent = score;
        if (percentageSpan) percentageSpan.textContent = percentage;
        if (resultsDiv) resultsDiv.style.display = 'block';

        // Show retry button, hide submit button
        submitButton.style.display = 'none';
        if (retryButton) retryButton.style.display = 'inline-block';

        // Scroll to results
        if (resultsDiv) {
            resultsDiv.scrollIntoView({ behavior: 'smooth' });
        }

        // Add celebration effect for high scores
        if (percentage >= 80) {
            celebrateScore();
        }
    });

    if (retryButton) {
        retryButton.addEventListener('click', function () {
            // Reset quiz
            document.querySelectorAll('.quiz-question').forEach(q => {
                q.classList.remove('correct', 'incorrect');
                q.querySelectorAll('li').forEach(li => li.classList.remove('correct-answer'));
            });
            document.querySelectorAll('input[type="radio"]').forEach(input => {
                input.checked = false;
            });
            if (resultsDiv) resultsDiv.style.display = 'none';
            submitButton.style.display = 'inline-block';
            retryButton.style.display = 'none';

            // Scroll to top of quiz
            document.querySelector('.quiz-section').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Celebration effect for high quiz scores
function celebrateScore() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: -10px;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                z-index: 9999;
                border-radius: 50%;
                pointer-events: none;
                transition: all 3s ease-out;
            `;

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.style.top = window.innerHeight + 10 + 'px';
                confetti.style.left = (parseInt(confetti.style.left) + (Math.random() * 200 - 100)) + 'px';

                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 3000);
            }, 10);
        }, i * 50);
    }
}
