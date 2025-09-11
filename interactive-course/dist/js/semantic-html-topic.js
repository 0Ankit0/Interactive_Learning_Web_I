// Semantic HTML Topic JavaScript
// This file handles all interactive functionality for the Semantic HTML topic

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all interactive elements
    initializeProgressTracking();
    initializeQuizzes();
    initializeSemanticDemo();
    initializeAccessibilityDemo();
    initializeCodeComparison();

    console.log('Semantic HTML topic JavaScript initialized');
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

// Semantic HTML demonstration
function initializeSemanticDemo() {
    createSemanticBuilder();
}

function createSemanticBuilder() {
    const builderContainer = document.getElementById('semantic-builder');
    if (!builderContainer) return;

    builderContainer.innerHTML = `
        <h4>Semantic HTML Builder</h4>
        <div class="builder-controls">
            <select id="element-type">
                <option value="header">Header</option>
                <option value="nav">Navigation</option>
                <option value="main">Main Content</option>
                <option value="article">Article</option>
                <option value="section">Section</option>
                <option value="aside">Aside</option>
                <option value="footer">Footer</option>
            </select>
            <input type="text" id="element-content" placeholder="Element content">
            <button onclick="addSemanticElement()" class="btn-primary">Add Element</button>
            <button onclick="clearSemanticDemo()" class="btn-secondary">Clear</button>
        </div>
        <div class="semantic-preview" id="semantic-preview">
            <div class="semantic-layout" id="semantic-layout">
                <p>Your semantic structure will appear here...</p>
            </div>
        </div>
        <div class="code-output" id="code-output">
            <h5>Generated HTML:</h5>
            <pre><code id="generated-code"></code></pre>
        </div>
    `;
}

function addSemanticElement() {
    const typeSelect = document.getElementById('element-type');
    const contentInput = document.getElementById('element-content');
    const layout = document.getElementById('semantic-layout');
    const codeOutput = document.getElementById('generated-code');

    if (!typeSelect || !contentInput || !layout) return;

    const elementType = typeSelect.value;
    const content = contentInput.value.trim() || `This is a ${elementType} element`;

    // Create the semantic element
    const element = document.createElement(elementType);
    element.textContent = content;
    element.className = `semantic-${elementType}`;

    // Add to preview (replace placeholder if it exists)
    const placeholder = layout.querySelector('p');
    if (placeholder && placeholder.textContent.includes('will appear here')) {
        layout.removeChild(placeholder);
    }

    layout.appendChild(element);

    // Update code output
    updateSemanticCode();

    // Clear input
    contentInput.value = '';
}

function updateSemanticCode() {
    const layout = document.getElementById('semantic-layout');
    const codeOutput = document.getElementById('generated-code');

    if (!layout || !codeOutput) return;

    let html = layout.innerHTML;

    // Format the HTML nicely
    html = html
        .replace(/></g, '>\n<')
        .replace(/^\s+|\s+$/g, '')
        .split('\n')
        .map((line, index) => {
            const indent = '  '.repeat(Math.max(0, (line.match(/</g) || []).length - (line.match(/\//g) || []).length));
            return indent + line.trim();
        })
        .join('\n');

    codeOutput.textContent = html;
}

function clearSemanticDemo() {
    const layout = document.getElementById('semantic-layout');
    const codeOutput = document.getElementById('generated-code');

    if (layout) {
        layout.innerHTML = '<p>Your semantic structure will appear here...</p>';
    }

    if (codeOutput) {
        codeOutput.textContent = '';
    }
}

// Accessibility demonstration
function initializeAccessibilityDemo() {
    createAccessibilityTester();
}

function createAccessibilityTester() {
    const testerContainer = document.getElementById('accessibility-tester');
    if (!testerContainer) return;

    testerContainer.innerHTML = `
        <h4>Accessibility Tester</h4>
        <div class="a11y-demo">
            <button onclick="testScreenReader()" class="btn-primary">Test Screen Reader Text</button>
            <button onclick="testKeyboardNavigation()" class="btn-primary">Test Keyboard Navigation</button>
            <button onclick="testSkipLinks()" class="btn-primary">Test Skip Links</button>
        </div>
        <div class="a11y-results" id="a11y-results">
            <p>Accessibility test results will appear here...</p>
        </div>
    `;
}

function testScreenReader() {
    const results = document.getElementById('a11y-results');
    if (!results) return;

    results.innerHTML = `
        <h5>Screen Reader Test</h5>
        <div class="test-example">
            <h6>Good Example:</h6>
            <code>&lt;img src="chart.png" alt="Sales increased 25% from Q1 to Q2 2024"&gt;</code>
            <p><strong>Screen reader reads:</strong> "Sales increased 25% from Q1 to Q2 2024"</p>
        </div>
        <div class="test-example">
            <h6>Bad Example:</h6>
            <code>&lt;img src="chart.png" alt="chart"&gt;</code>
            <p><strong>Screen reader reads:</strong> "chart" (not helpful!)</p>
        </div>
    `;
}

function testKeyboardNavigation() {
    const results = document.getElementById('a11y-results');
    if (!results) return;

    results.innerHTML = `
        <h5>Keyboard Navigation Test</h5>
        <p>Try navigating this demo with your keyboard:</p>
        <div class="keyboard-demo">
            <button tabindex="1" onfocus="highlightElement(this)">Button 1</button>
            <a href="#" tabindex="2" onfocus="highlightElement(this)">Link 1</a>
            <input type="text" tabindex="3" placeholder="Text input" onfocus="highlightElement(this)">
            <button tabindex="4" onfocus="highlightElement(this)">Button 2</button>
        </div>
        <p><strong>Instructions:</strong> Press Tab to navigate, Enter/Space to activate buttons and links.</p>
    `;
}

function testSkipLinks() {
    const results = document.getElementById('a11y-results');
    if (!results) return;

    results.innerHTML = `
        <h5>Skip Links Test</h5>
        <p>Skip links help keyboard users navigate quickly to main content:</p>
        <div class="skip-link-demo">
            <a href="#main-content" class="skip-link">Skip to main content</a>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <main id="main-content">
                <h6>Main Content</h6>
                <p>This is where the main content begins.</p>
            </main>
        </div>
        <p><strong>Note:</strong> Skip links are usually invisible until focused with Tab key.</p>
    `;
}

function highlightElement(element) {
    // Remove previous highlights
    document.querySelectorAll('.keyboard-focus').forEach(el => {
        el.classList.remove('keyboard-focus');
    });

    // Add highlight to current element
    element.classList.add('keyboard-focus');

    // Show which element is focused
    const info = document.createElement('div');
    info.className = 'focus-info';
    info.textContent = `Focused: ${element.tagName.toLowerCase()} - "${element.textContent || element.placeholder}"`;
    info.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #3b82f6;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 1000;
    `;

    document.body.appendChild(info);

    setTimeout(() => {
        if (info.parentNode) {
            info.parentNode.removeChild(info);
        }
    }, 2000);
}

// Code comparison functionality
function initializeCodeComparison() {
    createCodeComparison();
}

function createCodeComparison() {
    const comparisonContainer = document.getElementById('code-comparison');
    if (!comparisonContainer) return;

    comparisonContainer.innerHTML = `
        <h4>Semantic vs Non-Semantic Code Comparison</h4>
        <div class="comparison-tabs">
            <button onclick="showComparison('structure')" class="tab-btn active">Structure</button>
            <button onclick="showComparison('navigation')" class="tab-btn">Navigation</button>
            <button onclick="showComparison('content')" class="tab-btn">Content Areas</button>
        </div>
        <div class="comparison-content" id="comparison-content">
            <!-- Content will be loaded here -->
        </div>
    `;

    // Show default comparison
    showComparison('structure');
}

function showComparison(type) {
    const content = document.getElementById('comparison-content');
    const tabs = document.querySelectorAll('.tab-btn');

    if (!content) return;

    // Update active tab
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    const comparisons = {
        'structure': {
            nonSemantic: `<div class="header">
  <div class="logo">My Website</div>
</div>
<div class="content">
  <div class="sidebar">...</div>
  <div class="main">...</div>
</div>
<div class="footer">...</div>`,
            semantic: `<header>
  <h1>My Website</h1>
</header>
<main>
  <aside>...</aside>
  <section>...</section>
</main>
<footer>...</footer>`
        },
        'navigation': {
            nonSemantic: `<div class="menu">
  <div class="menu-item">
    <a href="/">Home</a>
  </div>
  <div class="menu-item">
    <a href="/about">About</a>
  </div>
</div>`,
            semantic: `<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>`
        },
        'content': {
            nonSemantic: `<div class="post">
  <div class="post-title">Article Title</div>
  <div class="post-meta">Published: 2024</div>
  <div class="post-content">...</div>
</div>`,
            semantic: `<article>
  <header>
    <h2>Article Title</h2>
    <time datetime="2024-01-01">Published: 2024</time>
  </header>
  <div>...</div>
</article>`
        }
    };

    const comparison = comparisons[type];
    if (comparison) {
        content.innerHTML = `
            <div class="code-comparison">
                <div class="comparison-section">
                    <div class="section-header non-semantic">❌ Non-Semantic HTML</div>
                    <div class="code-example">
                        <pre><code>${escapeHtml(comparison.nonSemantic)}</code></pre>
                    </div>
                </div>
                <div class="comparison-section">
                    <div class="section-header semantic">✅ Semantic HTML</div>
                    <div class="code-example">
                        <pre><code>${escapeHtml(comparison.semantic)}</code></pre>
                    </div>
                </div>
            </div>
        `;
    }
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

    // Clear semantic demo
    clearSemanticDemo();

    // Clear accessibility results
    const a11yResults = document.getElementById('a11y-results');
    if (a11yResults) {
        a11yResults.innerHTML = '<p>Accessibility test results will appear here...</p>';
    }
}

// Export functions that might be called from HTML
window.submitQuiz = submitQuiz;
window.addSemanticElement = addSemanticElement;
window.clearSemanticDemo = clearSemanticDemo;
window.testScreenReader = testScreenReader;
window.testKeyboardNavigation = testKeyboardNavigation;
window.testSkipLinks = testSkipLinks;
window.highlightElement = highlightElement;
window.showComparison = showComparison;
window.resetTopic = resetTopic;
