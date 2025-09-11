// Interactive Error Handling Demo & Quiz Logic

document.addEventListener('DOMContentLoaded', function () {
    // Tab functionality
    initTabs();

    // Interactive demos
    initErrorDemo();
    initCustomErrorDemo();
    initErrorInspection();
    initAsyncErrorDemo();

    // Quiz functionality
    initQuiz();
});

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetTab = this.dataset.tab;

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(`${targetTab}-panel`).classList.add('active');
        });
    });
}

function initErrorDemo() {
    const errorTypeSelect = document.getElementById('errorType');
    const runButton = document.getElementById('runErrorDemo');
    const codeDisplay = document.getElementById('demoCode');
    const resultDisplay = document.getElementById('demoResult');

    const errorScenarios = {
        success: {
            code: `try {
  let result = "Operation successful!";
  console.log(result);
  return result;
} catch (error) {
  console.error('Error:', error.message);
} finally {
  console.log('Demo completed');
}`,
            result: 'Operation successful!\nDemo completed'
        },
        reference: {
            code: `try {
  console.log(undefinedVariable);
} catch (error) {
  console.error('Caught ReferenceError:', error.message);
} finally {
  console.log('Demo completed');
}`,
            result: 'Caught ReferenceError: undefinedVariable is not defined\nDemo completed'
        },
        type: {
            code: `try {
  let obj = null;
  obj.someMethod();
} catch (error) {
  console.error('Caught TypeError:', error.message);
} finally {
  console.log('Demo completed');
}`,
            result: 'Caught TypeError: Cannot read properties of null\nDemo completed'
        },
        syntax: {
            code: `try {
  eval('const x = ;'); // Invalid syntax
} catch (error) {
  console.error('Caught SyntaxError:', error.message);
} finally {
  console.log('Demo completed');
}`,
            result: 'Caught SyntaxError: Unexpected token \';\'\nDemo completed'
        },
        custom: {
            code: `try {
  throw new Error('Custom error message');
} catch (error) {
  console.error('Caught custom error:', error.message);
} finally {
  console.log('Demo completed');
}`,
            result: 'Caught custom error: Custom error message\nDemo completed'
        }
    };

    runButton.addEventListener('click', function () {
        const selectedType = errorTypeSelect.value;
        const scenario = errorScenarios[selectedType];

        codeDisplay.innerHTML = `<pre><code class="language-javascript">${scenario.code}</code></pre>`;
        resultDisplay.innerHTML = `<pre class="result-output">${scenario.result}</pre>`;

        // Re-highlight code
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    });

    // Initialize with first scenario
    runButton.click();
}

function initCustomErrorDemo() {
    const messageInput = document.getElementById('customErrorMessage');
    const throwButton = document.getElementById('throwCustomError');
    const resultDiv = document.getElementById('customErrorResult');

    if (!throwButton) return;

    throwButton.addEventListener('click', function () {
        const message = messageInput.value.trim() || 'Default error message';

        try {
            // Create custom error class
            class ValidationError extends Error {
                constructor(message) {
                    super(message);
                    this.name = 'ValidationError';
                    this.timestamp = new Date().toISOString();
                }
            }

            // Throw the custom error
            throw new ValidationError(message);

        } catch (error) {
            const result = `
        <div class="error-details">
          <h6>Caught Custom Error:</h6>
          <p><strong>Name:</strong> ${error.name}</p>
          <p><strong>Message:</strong> ${error.message}</p>
          <p><strong>Timestamp:</strong> ${error.timestamp}</p>
        </div>
      `;
            resultDiv.innerHTML = result;
        }
    });
}

function initErrorInspection() {
    const inspectButton = document.getElementById('inspectError');
    const resultDiv = document.getElementById('errorInspectionResult');

    if (!inspectButton) return;

    inspectButton.addEventListener('click', function () {
        try {
            // Create a sample error
            throw new TypeError('Sample error for inspection');
        } catch (error) {
            const result = `
        <div class="error-inspection">
          <h6>Error Properties:</h6>
          <div class="property-list">
            <div class="property-item">
              <strong>name:</strong> ${error.name}
            </div>
            <div class="property-item">
              <strong>message:</strong> ${error.message}
            </div>
            <div class="property-item">
              <strong>stack:</strong> 
              <pre class="stack-trace">${error.stack}</pre>
            </div>
          </div>
        </div>
      `;
            resultDiv.innerHTML = result;
        }
    });
}

function initAsyncErrorDemo() {
    const urlInput = document.getElementById('asyncUrl');
    const fetchButton = document.getElementById('fetchWithErrorHandling');
    const errorButton = document.getElementById('simulateNetworkError');
    const resultDiv = document.getElementById('asyncErrorResult');

    if (!fetchButton) return;

    fetchButton.addEventListener('click', async function () {
        const url = urlInput.value.trim();
        resultDiv.innerHTML = '<div class="loading">Fetching data...</div>';

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            resultDiv.innerHTML = `
        <div class="success-result">
          <h6>✅ Success!</h6>
          <pre><code class="language-json">${JSON.stringify(data, null, 2)}</code></pre>
        </div>
      `;

            if (typeof Prism !== 'undefined') {
                Prism.highlightAll();
            }

        } catch (error) {
            let errorType = 'Unknown Error';
            let errorMessage = error.message;

            if (error instanceof TypeError) {
                errorType = 'Network Error';
                errorMessage = 'Unable to connect to the server. Check your internet connection.';
            } else if (error.message.includes('HTTP')) {
                errorType = 'HTTP Error';
            }

            resultDiv.innerHTML = `
        <div class="error-result">
          <h6>❌ ${errorType}</h6>
          <p><strong>Message:</strong> ${errorMessage}</p>
          <p><strong>Technical Details:</strong> ${error.message}</p>
        </div>
      `;
        }
    });

    if (errorButton) {
        errorButton.addEventListener('click', async function () {
            resultDiv.innerHTML = '<div class="loading">Simulating network error...</div>';

            try {
                // Simulate network error by using invalid URL
                await fetch('https://invalid-url-that-does-not-exist.com/api');
            } catch (error) {
                resultDiv.innerHTML = `
          <div class="error-result">
            <h6>❌ Simulated Network Error</h6>
            <p><strong>Error Type:</strong> ${error.name}</p>
            <p><strong>Message:</strong> ${error.message}</p>
            <p><strong>User-Friendly Message:</strong> Unable to connect to the server. Please check your internet connection and try again.</p>
          </div>
        `;
            }
        });
    }
}

function initQuiz() {
    const quizSubmit = document.querySelector('.quiz-submit');
    const quizRetry = document.querySelector('.quiz-retry');
    const quizResults = document.querySelector('.quiz-results');
    const scoreSpan = document.getElementById('score');
    const percentageSpan = document.getElementById('percentage');

    if (!quizSubmit) return;

    const correctAnswers = {
        q1: 'b', // The program crashes
        q2: 'c', // finally
        q3: 'a', // Using try-catch blocks  
        q4: 'b'  // To provide a stack trace for debugging
    };

    quizSubmit.addEventListener('click', function () {
        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length;

        // Check each answer
        Object.keys(correctAnswers).forEach(questionName => {
            const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
            if (selectedAnswer && selectedAnswer.value === correctAnswers[questionName]) {
                score++;
            }
        });

        // Display results
        scoreSpan.textContent = score;
        percentageSpan.textContent = Math.round((score / totalQuestions) * 100);
        quizResults.style.display = 'block';
        quizSubmit.style.display = 'none';
        quizRetry.style.display = 'inline-block';

        // Scroll to results
        quizResults.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    if (quizRetry) {
        quizRetry.addEventListener('click', function () {
            // Reset all radio buttons
            document.querySelectorAll('.quiz-options input[type="radio"]').forEach(input => {
                input.checked = false;
            });

            // Reset UI
            quizResults.style.display = 'none';
            quizSubmit.style.display = 'inline-block';
            quizRetry.style.display = 'none';
            scoreSpan.textContent = '0';
            percentageSpan.textContent = '0';
        });
    }
}

// Helper function to simulate different types of errors
function simulateError(type) {
    switch (type) {
        case 'reference':
            return undefinedVariable;
        case 'type':
            let obj = null;
            return obj.someMethod();
        case 'range':
            return new Array(-1);
        case 'custom':
            throw new Error('Custom error for demonstration');
        default:
            return 'No error';
    }
}
