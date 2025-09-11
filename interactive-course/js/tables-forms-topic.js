// Tables Forms Topic JavaScript
// This file handles all interactive functionality for the Tables Forms topic

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all interactive elements
    initializeProgressTracking();
    initializeQuizzes();
    initializeTableBuilder();
    initializeFormBuilder();
    initializeFormValidation();

    console.log('Tables Forms topic JavaScript initialized');
});

// Progress tracking functionality (same as other topics)
function initializeProgressTracking() {
    const progressFill = document.getElementById('topic-progress');
    if (!progressFill) return;

    let progress = 0;
    const totalSections = document.querySelectorAll('.content-section').length;
    const completedSections = document.querySelectorAll('.content-section.completed').length;

    if (totalSections > 0) {
        progress = (completedSections / totalSections) * 100;
    }

    progressFill.style.width = progress + '%';
}

// Quiz functionality (same as other topics)
function initializeQuizzes() {
    const submitButton = document.getElementById('submit-btn');
    if (submitButton) {
        submitButton.onclick = submitQuiz;
    }
}

function submitQuiz() {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;

    const questions = quizContainer.querySelectorAll('.quiz-question');
    let score = 0;
    let totalQuestions = questions.length;

    questions.forEach(question => {
        const selectedAnswer = question.querySelector('input[type="radio"]:checked');
        const feedback = question.querySelector('.question-feedback') || createFeedback(question);

        if (selectedAnswer) {
            const isCorrect = selectedAnswer.value === 'correct';

            if (isCorrect) {
                score++;
                feedback.textContent = 'Correct!';
                feedback.className = 'question-feedback correct';
            } else {
                feedback.textContent = 'Incorrect. Try again!';
                feedback.className = 'question-feedback incorrect';
            }
        } else {
            feedback.textContent = 'Please select an answer.';
            feedback.className = 'question-feedback incomplete';
        }
    });

    showQuizResults(score, totalQuestions);
}

function createFeedback(questionElement) {
    const feedback = document.createElement('div');
    feedback.className = 'question-feedback';
    questionElement.appendChild(feedback);
    return feedback;
}

function showQuizResults(score, total) {
    const percentage = Math.round((score / total) * 100);
    let message = '';
    let className = '';

    if (percentage >= 80) {
        message = `Excellent! You scored ${score}/${total} (${percentage}%)`;
        className = 'success';
    } else if (percentage >= 60) {
        message = `Good job! You scored ${score}/${total} (${percentage}%)`;
        className = 'warning';
    } else {
        message = `You scored ${score}/${total} (${percentage}%). Keep practicing!`;
        className = 'error';
    }

    showQuizFeedback(message, className);
}

function showQuizFeedback(message, type) {
    let feedback = document.getElementById('quiz-results');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'quiz-results';
        feedback.className = 'quiz-results';
        document.querySelector('.quiz-container').appendChild(feedback);
    }

    feedback.textContent = message;
    feedback.className = `quiz-results ${type}`;
}

// Interactive table builder
function initializeTableBuilder() {
    const builderContainer = document.getElementById('table-builder');
    if (!builderContainer) return;

    builderContainer.innerHTML = `
        <h4>Interactive Table Builder</h4>
        <div class="builder-controls">
            <label>Rows: <input type="number" id="table-rows" value="3" min="1" max="10"></label>
            <label>Columns: <input type="number" id="table-cols" value="3" min="1" max="10"></label>
            <button onclick="generateTable()" class="btn-primary">Generate Table</button>
            <button onclick="clearTable()" class="btn-secondary">Clear Table</button>
        </div>
        <div class="table-preview" id="table-preview">
            <p>Generated table will appear here...</p>
        </div>
    `;
}

function generateTable() {
    const rowsInput = document.getElementById('table-rows');
    const colsInput = document.getElementById('table-cols');
    const preview = document.getElementById('table-preview');

    if (!rowsInput || !colsInput || !preview) return;

    const rows = parseInt(rowsInput.value);
    const cols = parseInt(colsInput.value);

    if (rows < 1 || cols < 1) {
        preview.innerHTML = '<p class="error">Please enter valid numbers for rows and columns.</p>';
        return;
    }

    let tableHTML = '<table class="demo-table">\n  <thead>\n    <tr>\n';

    // Generate header
    for (let c = 1; c <= cols; c++) {
        tableHTML += `      <th>Header ${c}</th>\n`;
    }
    tableHTML += '    </tr>\n  </thead>\n  <tbody>\n';

    // Generate body rows
    for (let r = 1; r <= rows; r++) {
        tableHTML += '    <tr>\n';
        for (let c = 1; c <= cols; c++) {
            tableHTML += `      <td>Row ${r}, Col ${c}</td>\n`;
        }
        tableHTML += '    </tr>\n';
    }

    tableHTML += '  </tbody>\n</table>';

    preview.innerHTML = `
        <h5>Generated Table:</h5>
        ${tableHTML}
        <h5>HTML Code:</h5>
        <pre><code>${escapeHtml(tableHTML)}</code></pre>
    `;
}

function clearTable() {
    const preview = document.getElementById('table-preview');
    if (preview) {
        preview.innerHTML = '<p>Generated table will appear here...</p>';
    }
}

// Interactive form builder
function initializeFormBuilder() {
    const builderContainer = document.getElementById('form-builder');
    if (!builderContainer) return;

    builderContainer.innerHTML = `
        <h4>Interactive Form Builder</h4>
        <div class="form-controls">
            <select id="field-type">
                <option value="text">Text Input</option>
                <option value="email">Email Input</option>
                <option value="password">Password Input</option>
                <option value="textarea">Textarea</option>
                <option value="select">Select Dropdown</option>
                <option value="radio">Radio Buttons</option>
                <option value="checkbox">Checkbox</option>
            </select>
            <input type="text" id="field-label" placeholder="Field label">
            <button onclick="addFormField()" class="btn-primary">Add Field</button>
            <button onclick="clearForm()" class="btn-secondary">Clear Form</button>
        </div>
        <div class="form-preview" id="form-preview">
            <form id="demo-form" class="demo-form">
                <h5>Your Custom Form</h5>
                <div id="form-fields"></div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Submit</button>
                    <button type="reset" class="btn-secondary">Reset</button>
                </div>
            </form>
        </div>
    `;

    // Add form submit handler
    const demoForm = document.getElementById('demo-form');
    if (demoForm) {
        demoForm.addEventListener('submit', handleFormSubmit);
    }
}

function addFormField() {
    const typeSelect = document.getElementById('field-type');
    const labelInput = document.getElementById('field-label');
    const fieldsContainer = document.getElementById('form-fields');

    if (!typeSelect || !labelInput || !fieldsContainer) return;

    const fieldType = typeSelect.value;
    const label = labelInput.value.trim();

    if (!label) {
        alert('Please enter a field label');
        return;
    }

    const fieldId = `field_${Date.now()}`;
    const fieldHTML = generateFormField(fieldType, label, fieldId);

    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'form-group';
    fieldContainer.innerHTML = fieldHTML;

    fieldsContainer.appendChild(fieldContainer);

    // Clear label input
    labelInput.value = '';
}

function generateFormField(type, label, id) {
    switch (type) {
        case 'text':
            return `<label for="${id}">${label}:</label>
                   <input type="text" id="${id}" name="${id}">`;

        case 'email':
            return `<label for="${id}">${label}:</label>
                   <input type="email" id="${id}" name="${id}">`;

        case 'password':
            return `<label for="${id}">${label}:</label>
                   <input type="password" id="${id}" name="${id}">`;

        case 'textarea':
            return `<label for="${id}">${label}:</label>
                   <textarea id="${id}" name="${id}" rows="3"></textarea>`;

        case 'select':
            return `<label for="${id}">${label}:</label>
                   <select id="${id}" name="${id}">
                       <option value="">Select an option</option>
                       <option value="option1">Option 1</option>
                       <option value="option2">Option 2</option>
                       <option value="option3">Option 3</option>
                   </select>`;

        case 'radio':
            return `<label>${label}:</label>
                   <div class="radio-group">
                       <div class="radio-item">
                           <input type="radio" id="${id}_1" name="${id}" value="option1">
                           <label for="${id}_1">Option 1</label>
                       </div>
                       <div class="radio-item">
                           <input type="radio" id="${id}_2" name="${id}" value="option2">
                           <label for="${id}_2">Option 2</label>
                       </div>
                   </div>`;

        case 'checkbox':
            return `<div class="checkbox-group">
                       <div class="checkbox-item">
                           <input type="checkbox" id="${id}" name="${id}">
                           <label for="${id}">${label}</label>
                       </div>
                   </div>`;

        default:
            return `<label for="${id}">${label}:</label>
                   <input type="text" id="${id}" name="${id}">`;
    }
}

function clearForm() {
    const fieldsContainer = document.getElementById('form-fields');
    if (fieldsContainer) {
        fieldsContainer.innerHTML = '';
    }
}

// Form validation
function initializeFormValidation() {
    // Add real-time validation to form inputs
    document.addEventListener('input', function (e) {
        if (e.target.matches('input[type="email"]')) {
            validateEmail(e.target);
        } else if (e.target.matches('input[type="password"]')) {
            validatePassword(e.target);
        } else if (e.target.matches('input[required]')) {
            validateRequired(e.target);
        }
    });
}

function validateEmail(input) {
    const email = input.value;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    updateValidationState(input, isValid, 'Please enter a valid email address');
}

function validatePassword(input) {
    const password = input.value;
    const isValid = password.length >= 6;

    updateValidationState(input, isValid, 'Password must be at least 6 characters');
}

function validateRequired(input) {
    const isValid = input.value.trim() !== '';

    updateValidationState(input, isValid, 'This field is required');
}

function updateValidationState(input, isValid, errorMessage) {
    let errorElement = input.parentNode.querySelector('.form-error');

    if (!isValid) {
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            input.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = errorMessage;
        input.classList.add('invalid');
    } else {
        if (errorElement) {
            errorElement.remove();
        }
        input.classList.remove('invalid');
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    // Show form data
    const result = document.createElement('div');
    result.className = 'form-result';
    result.innerHTML = `
        <h4>Form Submitted Successfully!</h4>
        <p><strong>Form Data:</strong></p>
        <pre>${JSON.stringify(data, null, 2)}</pre>
    `;

    // Insert result after form
    e.target.parentNode.insertBefore(result, e.target.nextSibling);

    // Remove result after 5 seconds
    setTimeout(() => {
        if (result.parentNode) {
            result.parentNode.removeChild(result);
        }
    }, 5000);
}

// Utility functions
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function resetTopic() {
    // Clear quiz results
    const quizResults = document.getElementById('quiz-results');
    if (quizResults) quizResults.remove();

    // Clear quiz feedback
    const feedbacks = document.querySelectorAll('.question-feedback');
    feedbacks.forEach(feedback => feedback.remove());

    // Uncheck all radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => radio.checked = false);

    // Clear table and form builders
    clearTable();
    clearForm();
}

// Export functions that might be called from HTML
window.submitQuiz = submitQuiz;
window.generateTable = generateTable;
window.clearTable = clearTable;
window.addFormField = addFormField;
window.clearForm = clearForm;
window.resetTopic = resetTopic;
