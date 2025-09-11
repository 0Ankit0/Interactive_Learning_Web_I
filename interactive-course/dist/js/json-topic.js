// Interactive JSON Demo & Quiz Logic

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initValidator();
    initMethodDemos();
    initInteractiveDemo();
    initQuiz();
});

// JSON Validator functionality
function initValidator() {
    const validateBtn = document.getElementById('validateJson');
    const formatBtn = document.getElementById('formatJson');
    const minifyBtn = document.getElementById('minifyJson');
    const jsonInput = document.getElementById('jsonInput');
    const resultDiv = document.getElementById('validationResult');

    if (!validateBtn) return;

    validateBtn.addEventListener('click', function () {
        const jsonText = jsonInput.value.trim();

        try {
            const parsed = JSON.parse(jsonText);
            resultDiv.innerHTML = `
        <div class="validation-success">
          <h6>✅ Valid JSON!</h6>
          <p>Your JSON is properly formatted and can be parsed successfully.</p>
        </div>
      `;
        } catch (error) {
            resultDiv.innerHTML = `
        <div class="validation-error">
          <h6>❌ Invalid JSON!</h6>
          <p><strong>Error:</strong> ${error.message}</p>
          <p><strong>Tip:</strong> Check for missing quotes, commas, or brackets.</p>
        </div>
      `;
        }
    });

    formatBtn.addEventListener('click', function () {
        const jsonText = jsonInput.value.trim();

        try {
            const parsed = JSON.parse(jsonText);
            const formatted = JSON.stringify(parsed, null, 2);
            jsonInput.value = formatted;
            resultDiv.innerHTML = `
        <div class="validation-success">
          <h6>✅ JSON Formatted!</h6>
          <p>Your JSON has been formatted with proper indentation.</p>
        </div>
      `;
        } catch (error) {
            resultDiv.innerHTML = `
        <div class="validation-error">
          <h6>❌ Cannot Format!</h6>
          <p><strong>Error:</strong> ${error.message}</p>
        </div>
      `;
        }
    });

    minifyBtn.addEventListener('click', function () {
        const jsonText = jsonInput.value.trim();

        try {
            const parsed = JSON.parse(jsonText);
            const minified = JSON.stringify(parsed);
            jsonInput.value = minified;
            resultDiv.innerHTML = `
        <div class="validation-success">
          <h6>✅ JSON Minified!</h6>
          <p>Your JSON has been compressed to save space.</p>
        </div>
      `;
        } catch (error) {
            resultDiv.innerHTML = `
        <div class="validation-error">
          <h6>❌ Cannot Minify!</h6>
          <p><strong>Error:</strong> ${error.message}</p>
        </div>
      `;
        }
    });
}

// Method demonstration functions
function demonstrateParse() {
    const input = document.getElementById('parseInput').value;
    const result = document.getElementById('parseResult');

    try {
        const parsed = JSON.parse(input);
        result.innerHTML = `
      <div class="demo-success">
        <strong>Parsed Object:</strong><br>
        Name: ${parsed.name}<br>
        Age: ${parsed.age}<br>
        Type: ${typeof parsed}
      </div>
    `;
    } catch (error) {
        result.innerHTML = `
      <div class="demo-error">
        <strong>Parse Error:</strong> ${error.message}
      </div>
    `;
    }
}

function demonstrateStringify() {
    const input = document.getElementById('stringifyInput').value;
    const result = document.getElementById('stringifyResult');

    try {
        // Use eval to convert string to object (for demo purposes only)
        const obj = eval(`(${input})`);
        const jsonString = JSON.stringify(obj);
        const formatted = JSON.stringify(obj, null, 2);

        result.innerHTML = `
      <div class="demo-success">
        <strong>JSON String:</strong><br>
        <code>${jsonString}</code><br><br>
        <strong>Formatted:</strong><br>
        <pre>${formatted}</pre>
      </div>
    `;
    } catch (error) {
        result.innerHTML = `
      <div class="demo-error">
        <strong>Stringify Error:</strong> ${error.message}
      </div>
    `;
    }
}

function demonstrateError() {
    const input = document.getElementById('errorInput').value;
    const result = document.getElementById('errorResult');

    try {
        const parsed = JSON.parse(input);
        result.innerHTML = `
      <div class="demo-success">
        <strong>Success:</strong> JSON parsed successfully!<br>
        Result: ${JSON.stringify(parsed)}
      </div>
    `;
    } catch (error) {
        result.innerHTML = `
      <div class="demo-error">
        <strong>Caught Error:</strong> ${error.message}<br>
        <strong>Error Type:</strong> ${error.name}<br>
        <strong>Tip:</strong> Use try-catch blocks to handle JSON parsing errors gracefully.
      </div>
    `;
    }
}

function demonstrateAdvanced() {
    const result = document.getElementById('advancedResult');

    const obj = {
        name: "John",
        age: 30,
        password: "secret123",
        email: "john@example.com",
        dateCreated: new Date().toISOString()
    };

    // Replacer function - exclude sensitive data
    const safeJson = JSON.stringify(obj, ['name', 'age', 'email']);

    // Reviver function - convert date strings back to Date objects
    const jsonWithDate = '{"name":"Alice","date":"2024-01-01T00:00:00.000Z"}';
    const parsedWithReviver = JSON.parse(jsonWithDate, (key, value) => {
        if (key === 'date') return new Date(value);
        return value;
    });

    result.innerHTML = `
    <div class="demo-success">
      <strong>Original Object:</strong><br>
      <pre>${JSON.stringify(obj, null, 2)}</pre>
      
      <strong>With Replacer (safe data only):</strong><br>
      <pre>${safeJson}</pre>
      
      <strong>With Reviver (date conversion):</strong><br>
      Name: ${parsedWithReviver.name}<br>
      Date: ${parsedWithReviver.date} (${typeof parsedWithReviver.date})
    </div>
  `;
}

// Method demos initialization
function initMethodDemos() {
    // Make functions available globally
    window.demonstrateParse = demonstrateParse;
    window.demonstrateStringify = demonstrateStringify;
    window.demonstrateError = demonstrateError;
    window.demonstrateAdvanced = demonstrateAdvanced;
}

// Interactive demo functionality
function initInteractiveDemo() {
    // Tab functionality
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

    // LocalStorage demo
    initLocalStorageDemo();

    // Fetch demo
    initFetchDemo();

    // Form demo
    initFormDemo();
}

function initLocalStorageDemo() {
    const saveBtn = document.getElementById('saveToStorage');
    const loadBtn = document.getElementById('loadFromStorage');
    const clearBtn = document.getElementById('clearStorage');
    const resultDiv = document.getElementById('storageResult');

    if (!saveBtn) return;

    saveBtn.addEventListener('click', function () {
        const userData = {
            name: document.getElementById('userName').value,
            age: parseInt(document.getElementById('userAge').value),
            skills: document.getElementById('userSkills').value.split(',').map(s => s.trim())
        };

        try {
            localStorage.setItem('jsonDemoUser', JSON.stringify(userData));
            resultDiv.innerHTML = `
        <div class="demo-success">
          <h6>✅ Saved to LocalStorage!</h6>
          <pre>${JSON.stringify(userData, null, 2)}</pre>
        </div>
      `;
        } catch (error) {
            resultDiv.innerHTML = `
        <div class="demo-error">
          <h6>❌ Save Failed!</h6>
          <p>Error: ${error.message}</p>
        </div>
      `;
        }
    });

    loadBtn.addEventListener('click', function () {
        try {
            const stored = localStorage.getItem('jsonDemoUser');
            if (stored) {
                const userData = JSON.parse(stored);
                document.getElementById('userName').value = userData.name;
                document.getElementById('userAge').value = userData.age;
                document.getElementById('userSkills').value = userData.skills.join(', ');

                resultDiv.innerHTML = `
          <div class="demo-success">
            <h6>✅ Loaded from LocalStorage!</h6>
            <pre>${JSON.stringify(userData, null, 2)}</pre>
          </div>
        `;
            } else {
                resultDiv.innerHTML = `
          <div class="demo-info">
            <h6>ℹ️ No Data Found</h6>
            <p>No user data found in localStorage. Save some data first.</p>
          </div>
        `;
            }
        } catch (error) {
            resultDiv.innerHTML = `
        <div class="demo-error">
          <h6>❌ Load Failed!</h6>
          <p>Error: ${error.message}</p>
        </div>
      `;
        }
    });

    clearBtn.addEventListener('click', function () {
        localStorage.removeItem('jsonDemoUser');
        resultDiv.innerHTML = `
      <div class="demo-info">
        <h6>🗑️ Storage Cleared!</h6>
        <p>User data has been removed from localStorage.</p>
      </div>
    `;
    });
}

function initFetchDemo() {
    const fetchBtn = document.getElementById('fetchData');
    const urlInput = document.getElementById('apiUrl');
    const resultDiv = document.getElementById('fetchResult');

    if (!fetchBtn) return;

    fetchBtn.addEventListener('click', async function () {
        const url = urlInput.value.trim();
        resultDiv.innerHTML = '<div class="loading">Fetching data...</div>';

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            resultDiv.innerHTML = `
        <div class="demo-success">
          <h6>✅ Data Fetched Successfully!</h6>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
        } catch (error) {
            resultDiv.innerHTML = `
        <div class="demo-error">
          <h6>❌ Fetch Failed!</h6>
          <p><strong>Error:</strong> ${error.message}</p>
          <p><strong>Tip:</strong> Check the URL and ensure CORS is properly configured.</p>
        </div>
      `;
        }
    });
}

function initFormDemo() {
    const convertBtn = document.getElementById('convertForm');
    const resultDiv = document.getElementById('formResult');

    if (!convertBtn) return;

    convertBtn.addEventListener('click', function () {
        const formData = {
            name: document.getElementById('productName').value,
            price: parseFloat(document.getElementById('productPrice').value),
            category: document.getElementById('productCategory').value,
            inStock: document.getElementById('inStock').checked,
            dateAdded: new Date().toISOString(),
            metadata: {
                source: 'web-form',
                version: '1.0'
            }
        };

        try {
            const jsonString = JSON.stringify(formData, null, 2);

            resultDiv.innerHTML = `
        <div class="demo-success">
          <h6>✅ Form Data Converted to JSON!</h6>
          <pre>${jsonString}</pre>
          
          <h6>Minified Version:</h6>
          <code>${JSON.stringify(formData)}</code>
        </div>
      `;
        } catch (error) {
            resultDiv.innerHTML = `
        <div class="demo-error">
          <h6>❌ Conversion Failed!</h6>
          <p>Error: ${error.message}</p>
        </div>
      `;
        }
    });
}

// Quiz functionality
function initQuiz() {
    const quizSubmit = document.querySelector('.quiz-submit');
    const quizRetry = document.querySelector('.quiz-retry');
    const quizResults = document.querySelector('.quiz-results');
    const scoreSpan = document.getElementById('score');
    const percentageSpan = document.getElementById('percentage');

    if (!quizSubmit) return;

    const correctAnswers = {
        q1: 'b', // JSON.parse()
        q2: 'b', // {"name": "John", "age": 30}
        q3: 'c', // Throws a SyntaxError
        q4: 'c'  // Function and undefined
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
