/**
 * Web Accessibility Topic Interactive Features
 * Handles accessibility testing, ARIA demos, and educational content
 */

class AccessibilityTopic {
    constructor() {
        this.initializeEventListeners();
        this.initializeARIADemos();
        this.initializeQuiz();
        this.setupAccessibilityTests();
        this.progressValue = 65;
        this.announcementCount = 0;
    }

    initializeEventListeners() {
        // Demo form validation
        const demoForm = document.getElementById('demo-form');
        if (demoForm) {
            demoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.validateDemoForm();
            });
        }

        // ARIA tab demo
        this.setupTabDemo();

        // Dropdown demo
        this.setupDropdownDemo();

        // Make functions globally available
        window.testColorContrast = () => this.testColorContrast();
        window.testKeyboardNav = () => this.testKeyboardNav();
        window.testScreenReader = () => this.testScreenReader();
        window.testFormLabels = () => this.testFormLabels();
        window.testHeadingStructure = () => this.testHeadingStructure();
        window.updateProgress = () => this.updateProgress();
        window.announceMessage = () => this.announceMessage();
    }

    initializeARIADemos() {
        // Tab navigation with ARIA
        this.setupTabDemo();
        // Custom dropdown with ARIA
        this.setupDropdownDemo();
        // Progress bar updates
        this.setupProgressDemo();
    }

    setupTabDemo() {
        const tabs = document.querySelectorAll('[role="tab"]');
        const panels = document.querySelectorAll('[role="tabpanel"]');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Update all tabs
                tabs.forEach(t => {
                    t.setAttribute('aria-selected', 'false');
                    t.classList.remove('active');
                });

                // Update all panels
                panels.forEach(p => {
                    p.hidden = true;
                });

                // Activate selected tab and panel
                tab.setAttribute('aria-selected', 'true');
                tab.classList.add('active');

                const targetPanel = document.getElementById(tab.getAttribute('aria-controls'));
                if (targetPanel) {
                    targetPanel.hidden = false;
                }
            });

            // Keyboard navigation for tabs
            tab.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const direction = e.key === 'ArrowRight' ? 1 : -1;
                    const currentIndex = Array.from(tabs).indexOf(tab);
                    const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
                    tabs[nextIndex].focus();
                    tabs[nextIndex].click();
                }
            });
        });
    }

    setupDropdownDemo() {
        const dropdown = document.getElementById('dropdown-demo');
        if (!dropdown) return;

        const button = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');
        const options = dropdown.querySelectorAll('[role="option"]');

        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);
            menu.hidden = isExpanded;

            if (!isExpanded) {
                options[0]?.focus();
            }
        });

        // Handle option selection
        options.forEach((option, index) => {
            option.addEventListener('click', () => {
                button.textContent = option.textContent;
                button.setAttribute('aria-expanded', 'false');
                menu.hidden = true;
                button.focus();
            });

            option.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        option.click();
                        break;
                    case 'Escape':
                        button.setAttribute('aria-expanded', 'false');
                        menu.hidden = true;
                        button.focus();
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        const nextOption = options[index + 1] || options[0];
                        nextOption.focus();
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        const prevOption = options[index - 1] || options[options.length - 1];
                        prevOption.focus();
                        break;
                }
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                button.setAttribute('aria-expanded', 'false');
                menu.hidden = true;
            }
        });
    }

    setupProgressDemo() {
        // Progress bar is already set up, just need update function
    }

    validateDemoForm() {
        const emailInput = document.getElementById('email-demo');
        const errorMessage = document.getElementById('email-error');

        if (!emailInput || !errorMessage) return;

        const email = emailInput.value.trim();

        if (!email) {
            this.showFormError(errorMessage, 'Email address is required.');
            emailInput.setAttribute('aria-invalid', 'true');
        } else if (!this.isValidEmail(email)) {
            this.showFormError(errorMessage, 'Please enter a valid email address.');
            emailInput.setAttribute('aria-invalid', 'true');
        } else {
            this.clearFormError(errorMessage);
            emailInput.setAttribute('aria-invalid', 'false');
            this.showSuccessMessage('Form submitted successfully!');
        }
    }

    showFormError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.setAttribute('aria-live', 'assertive');
    }

    clearFormError(errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        errorElement.removeAttribute('aria-live');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Accessibility Testing Functions
    setupAccessibilityTests() {
        this.testResults = {
            colorContrast: null,
            keyboardNav: null,
            screenReader: null,
            formLabels: null,
            headingStructure: null
        };
    }

    testColorContrast() {
        const testContent = `
            <h4>Color Contrast Test</h4>
            <div class="contrast-test-samples">
                <div class="sample good-contrast">
                    <div class="text-sample" style="background: #ffffff; color: #2d3748; padding: 1rem; margin: 0.5rem 0; border-radius: 8px;">
                        Good contrast: White background with dark text (4.5:1 ratio)
                    </div>
                    <div class="contrast-info">✅ WCAG AA Compliant</div>
                </div>
                <div class="sample poor-contrast">
                    <div class="text-sample" style="background: #f7fafc; color: #a0aec0; padding: 1rem; margin: 0.5rem 0; border-radius: 8px;">
                        Poor contrast: Light background with light text (1.8:1 ratio)
                    </div>
                    <div class="contrast-info">❌ WCAG Non-compliant</div>
                </div>
                <div class="sample adequate-contrast">
                    <div class="text-sample" style="background: #667eea; color: #ffffff; padding: 1rem; margin: 0.5rem 0; border-radius: 8px;">
                        Adequate contrast: Blue background with white text (7.2:1 ratio)
                    </div>
                    <div class="contrast-info">✅ WCAG AAA Compliant</div>
                </div>
            </div>
        `;

        const results = `
            <h5>Test Results: Color Contrast</h5>
            <div class="result-summary">
                <div class="result-item pass">
                    <i class="fas fa-check-circle"></i>
                    <span>2 samples passed WCAG guidelines</span>
                </div>
                <div class="result-item fail">
                    <i class="fas fa-times-circle"></i>
                    <span>1 sample failed contrast requirements</span>
                </div>
            </div>
            <div class="recommendations">
                <h6>Recommendations:</h6>
                <ul>
                    <li>Minimum 4.5:1 ratio for normal text (WCAG AA)</li>
                    <li>Minimum 7:1 ratio for enhanced accessibility (WCAG AAA)</li>
                    <li>Test with tools like WebAIM Contrast Checker</li>
                </ul>
            </div>
        `;

        this.displayTestResults(testContent, results);
    }

    testKeyboardNav() {
        const testContent = `
            <h4>Keyboard Navigation Test</h4>
            <div class="keyboard-test-area">
                <p>Try navigating through these elements using only your keyboard (Tab, Shift+Tab, Enter, Space, Arrow keys):</p>
                <div class="nav-test-elements">
                    <button class="test-element" tabindex="0">Button 1</button>
                    <a href="#" class="test-element" tabindex="0">Link Element</a>
                    <input type="text" class="test-element" placeholder="Text Input" tabindex="0">
                    <select class="test-element" tabindex="0">
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </select>
                    <button class="test-element" tabindex="0">Button 2</button>
                </div>
                <div class="focus-indicator">
                    Current focus: <span id="focus-indicator">None</span>
                </div>
            </div>
        `;

        const results = `
            <h5>Test Results: Keyboard Navigation</h5>
            <div class="result-summary">
                <div class="result-item pass">
                    <i class="fas fa-check-circle"></i>
                    <span>All elements are keyboard accessible</span>
                </div>
                <div class="result-item pass">
                    <i class="fas fa-check-circle"></i>
                    <span>Proper tab order maintained</span>
                </div>
                <div class="result-item pass">
                    <i class="fas fa-check-circle"></i>
                    <span>Visible focus indicators present</span>
                </div>
            </div>
            <div class="recommendations">
                <h6>Keyboard Navigation Best Practices:</h6>
                <ul>
                    <li>Ensure all interactive elements are focusable</li>
                    <li>Provide clear focus indicators</li>
                    <li>Implement logical tab order</li>
                    <li>Support standard keyboard shortcuts</li>
                </ul>
            </div>
        `;

        this.displayTestResults(testContent, results);
        this.setupFocusTracking();
    }

    testScreenReader() {
        const testContent = `
            <h4>Screen Reader Test</h4>
            <div class="screen-reader-test">
                <p>The following content demonstrates screen reader accessibility:</p>
                
                <div class="sr-demo-section">
                    <h5>Good Example:</h5>
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzY2N2VlYSIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlPC90ZXh0Pjwvc3ZnPg==" 
                         alt="Decorative blue square with the word 'Image' in white text" 
                         width="100" height="100">
                    <p><strong>Alt text:</strong> "Decorative blue square with the word 'Image' in white text"</p>
                </div>

                <div class="sr-demo-section">
                    <h5>Poor Example:</h5>
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y1NjU2NSIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlPC90ZXh0Pjwvc3ZnPg==" 
                         width="100" height="100">
                    <p><strong>Missing alt text</strong> - Screen reader will announce filename or "image"</p>
                </div>

                <div class="sr-demo-section">
                    <h5>Semantic Structure:</h5>
                    <nav aria-label="Demo navigation">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        `;

        const results = `
            <h5>Test Results: Screen Reader Accessibility</h5>
            <div class="result-summary">
                <div class="result-item pass">
                    <i class="fas fa-check-circle"></i>
                    <span>Descriptive alt text provided</span>
                </div>
                <div class="result-item fail">
                    <i class="fas fa-times-circle"></i>
                    <span>One image missing alt text</span>
                </div>
                <div class="result-item pass">
                    <i class="fas fa-check-circle"></i>
                    <span>Semantic HTML structure used</span>
                </div>
            </div>
            <div class="recommendations">
                <h6>Screen Reader Best Practices:</h6>
                <ul>
                    <li>Provide meaningful alt text for all images</li>
                    <li>Use semantic HTML elements</li>
                    <li>Include skip navigation links</li>
                    <li>Test with actual screen readers</li>
                </ul>
            </div>
        `;

        this.displayTestResults(testContent, results);
    }

    testFormLabels() {
        const testContent = `
            <h4>Form Labels Test</h4>
            <div class="form-test-area">
                <form class="accessibility-test-form">
                    <div class="form-group good">
                        <label for="test-name">Full Name (Good Example)</label>
                        <input type="text" id="test-name" required>
                        <span class="validity-indicator">✅ Properly labeled</span>
                    </div>

                    <div class="form-group poor">
                        <span>Email Address (Poor Example)</span>
                        <input type="email" placeholder="Enter email">
                        <span class="validity-indicator">❌ No label association</span>
                    </div>

                    <div class="form-group good">
                        <label for="test-phone">Phone Number (Good Example)</label>
                        <input type="tel" id="test-phone" aria-describedby="phone-help">
                        <div id="phone-help" class="help-text">Format: (123) 456-7890</div>
                        <span class="validity-indicator">✅ Label + help text</span>
                    </div>

                    <fieldset class="form-group good">
                        <legend>Preferred Contact Method (Good Example)</legend>
                        <label><input type="radio" name="contact" value="email"> Email</label>
                        <label><input type="radio" name="contact" value="phone"> Phone</label>
                        <span class="validity-indicator">✅ Fieldset with legend</span>
                    </fieldset>
                </form>
            </div>
        `;

        const results = `
            <h5>Test Results: Form Labels</h5>
            <div class="result-summary">
                <div class="result-item pass">
                    <i class="fas fa-check-circle"></i>
                    <span>3 form elements properly labeled</span>
                </div>
                <div class="result-item fail">
                    <i class="fas fa-times-circle"></i>
                    <span>1 form element missing label</span>
                </div>
                <div class="result-item pass">
                    <i class="fas fa-check-circle"></i>
                    <span>Help text properly associated</span>
                </div>
            </div>
            <div class="recommendations">
                <h6>Form Accessibility Best Practices:</h6>
                <ul>
                    <li>Associate labels with form controls using 'for' attribute</li>
                    <li>Use fieldset/legend for grouped form controls</li>
                    <li>Provide clear error messages</li>
                    <li>Use aria-describedby for help text</li>
                </ul>
            </div>
        `;

        this.displayTestResults(testContent, results);
    }

    testHeadingStructure() {
        const testContent = `
            <h4>Heading Structure Test</h4>
            <div class="heading-test-area">
                <div class="heading-example good">
                    <h5>Good Example:</h5>
                    <div class="content-structure">
                        <h1>Main Page Title (h1)</h1>
                        <h2>Section Heading (h2)</h2>
                        <h3>Subsection (h3)</h3>
                        <h3>Another Subsection (h3)</h3>
                        <h4>Sub-subsection (h4)</h4>
                        <h2>Another Section (h2)</h2>
                    </div>
                    <span class="validity-indicator">✅ Logical hierarchy</span>
                </div>

                <div class="heading-example poor">
                    <h5>Poor Example:</h5>
                    <div class="content-structure">
                        <h1>Main Title (h1)</h1>
                        <h4>Skipped to h4</h4>
                        <h2>Back to h2</h2>
                        <h6>Jumped to h6</h6>
                        <h1>Another h1</h1>
                    </div>
                    <span class="validity-indicator">❌ Broken hierarchy</span>
                </div>
            </div>
        `;

        const results = `
            <h5>Test Results: Heading Structure</h5>
            <div class="result-summary">
                <div class="result-item pass">
                    <i class="fas fa-check-circle"></i>
                    <span>Good example follows logical hierarchy</span>
                </div>
                <div class="result-item fail">
                    <i class="fas fa-times-circle"></i>
                    <span>Poor example skips heading levels</span>
                </div>
                <div class="result-item info">
                    <i class="fas fa-info-circle"></i>
                    <span>Multiple h1 elements detected</span>
                </div>
            </div>
            <div class="recommendations">
                <h6>Heading Structure Best Practices:</h6>
                <ul>
                    <li>Use only one h1 per page</li>
                    <li>Don't skip heading levels</li>
                    <li>Create logical content hierarchy</li>
                    <li>Use headings for structure, not styling</li>
                </ul>
            </div>
        `;

        this.displayTestResults(testContent, results);
    }

    displayTestResults(testContent, results) {
        const testArea = document.getElementById('test-content');
        const resultsArea = document.getElementById('results-content');

        if (testArea) {
            testArea.innerHTML = testContent;
        }

        if (resultsArea) {
            resultsArea.innerHTML = results;
        }
    }

    setupFocusTracking() {
        const focusIndicator = document.getElementById('focus-indicator');
        const testElements = document.querySelectorAll('.test-element');

        testElements.forEach((element, index) => {
            element.addEventListener('focus', () => {
                if (focusIndicator) {
                    focusIndicator.textContent = element.tagName.toLowerCase() + ' ' + (index + 1);
                }
            });

            element.addEventListener('blur', () => {
                if (focusIndicator) {
                    focusIndicator.textContent = 'None';
                }
            });
        });
    }

    updateProgress() {
        const progressBar = document.querySelector('[role="progressbar"]');
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');

        if (!progressBar || !progressFill || !progressText) return;

        // Increment progress
        this.progressValue = Math.min(this.progressValue + 15, 100);

        // Update ARIA attributes
        progressBar.setAttribute('aria-valuenow', this.progressValue);

        // Update visual elements
        progressFill.style.width = `${this.progressValue}%`;
        progressText.textContent = `${this.progressValue}% complete`;

        // Reset if at 100%
        if (this.progressValue >= 100) {
            setTimeout(() => {
                this.progressValue = 0;
                progressBar.setAttribute('aria-valuenow', '0');
                progressFill.style.width = '0%';
                progressText.textContent = '0% complete';
            }, 2000);
        }
    }

    announceMessage() {
        const liveRegion = document.getElementById('live-region');
        if (!liveRegion) return;

        this.announcementCount++;
        const messages = [
            'This is announcement number ' + this.announcementCount,
            'Screen readers will announce this message automatically',
            'Live regions provide real-time updates to assistive technology',
            'This content is announced without moving focus'
        ];

        const message = messages[Math.min(this.announcementCount - 1, messages.length - 1)];

        // Clear previous message first
        liveRegion.textContent = '';

        // Add new message after a brief delay
        setTimeout(() => {
            liveRegion.textContent = message;
        }, 100);

        // Visual feedback
        liveRegion.style.background = '#e6fffa';
        liveRegion.style.border = '2px solid #4fd1c7';

        setTimeout(() => {
            liveRegion.style.background = '';
            liveRegion.style.border = '';
        }, 3000);
    }

    showSuccessMessage(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            liveRegion.style.background = '#f0fff4';
            liveRegion.style.border = '2px solid #68d391';

            setTimeout(() => {
                liveRegion.textContent = '';
                liveRegion.style.background = '';
                liveRegion.style.border = '';
            }, 3000);
        }
    }

    // Quiz functionality
    initializeQuiz() {
        const quizQuestions = [
            {
                question: "What does WCAG stand for?",
                options: [
                    "Web Content Accessibility Guidelines",
                    "World Wide Web Consortium Accessibility Guide",
                    "Web Component Accessibility Guidelines",
                    "Website Content Access Guide"
                ],
                correct: 0,
                explanation: "WCAG stands for Web Content Accessibility Guidelines, developed by the W3C."
            },
            {
                question: "What is the minimum color contrast ratio for normal text under WCAG AA?",
                options: [
                    "3:1",
                    "4.5:1",
                    "7:1",
                    "21:1"
                ],
                correct: 1,
                explanation: "WCAG AA requires a minimum contrast ratio of 4.5:1 for normal text."
            },
            {
                question: "Which ARIA attribute is used to provide accessible names for elements?",
                options: [
                    "aria-describedby",
                    "aria-label",
                    "aria-hidden",
                    "aria-expanded"
                ],
                correct: 1,
                explanation: "aria-label provides an accessible name when a visible label is not present."
            },
            {
                question: "What should you include for images that are purely decorative?",
                options: [
                    "Detailed alt text",
                    "Empty alt attribute (alt=\"\")",
                    "aria-hidden=\"true\"",
                    "Both empty alt and aria-hidden"
                ],
                correct: 1,
                explanation: "Decorative images should have empty alt attributes (alt=\"\") so screen readers skip them."
            },
            {
                question: "Which heading structure is correct?",
                options: [
                    "h1, h3, h2, h4",
                    "h1, h1, h2, h3",
                    "h1, h2, h3, h4",
                    "h2, h1, h3, h4"
                ],
                correct: 2,
                explanation: "Headings should follow a logical hierarchy without skipping levels: h1, h2, h3, h4."
            }
        ];

        this.renderQuiz(quizQuestions, 'accessibility-quiz');

        // Make quiz functions globally available
        window.submitAccessibilityQuiz = () => this.submitQuiz('accessibility-quiz', quizQuestions);
        window.resetAccessibilityQuiz = () => this.resetQuiz('accessibility-quiz', quizQuestions);
    }

    renderQuiz(questions, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = questions.map((q, index) => `
            <div class="quiz-question">
                <h4>Question ${index + 1}</h4>
                <p>${q.question}</p>
                <div class="quiz-options">
                    ${q.options.map((option, optIndex) => `
                        <label class="quiz-option">
                            <input type="radio" name="question-${index}" value="${optIndex}">
                            <span class="option-text">${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    submitQuiz(containerId, questions) {
        const container = document.getElementById(containerId);
        const resultsContainer = document.getElementById(containerId + '-results');
        let score = 0;
        const results = [];

        questions.forEach((q, index) => {
            const selectedOption = container.querySelector(`input[name="question-${index}"]:checked`);
            const isCorrect = selectedOption && parseInt(selectedOption.value) === q.correct;

            if (isCorrect) score++;

            results.push({
                question: q.question,
                selected: selectedOption ? parseInt(selectedOption.value) : -1,
                correct: q.correct,
                explanation: q.explanation,
                isCorrect
            });
        });

        this.showQuizResults(resultsContainer, results, score, questions.length);
    }

    showQuizResults(container, results, score, total) {
        const percentage = Math.round((score / total) * 100);

        container.innerHTML = `
            <div class="quiz-score">
                <h3>Quiz Results</h3>
                <div class="score-display">
                    <span class="score">${score}/${total}</span>
                    <span class="percentage">(${percentage}%)</span>
                </div>
            </div>
            <div class="quiz-breakdown">
                ${results.map((result, index) => `
                    <div class="result-item ${result.isCorrect ? 'correct' : 'incorrect'}">
                        <div class="result-header">
                            <span class="result-icon">
                                ${result.isCorrect ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-times-circle"></i>'}
                            </span>
                            <span class="result-text">Question ${index + 1}</span>
                        </div>
                        <p class="result-explanation">${result.explanation}</p>
                    </div>
                `).join('')}
            </div>
        `;

        container.style.display = 'block';

        // Announce results to screen readers
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = `Quiz completed. You scored ${score} out of ${total} questions correct.`;
        }
    }

    resetQuiz(containerId, questions) {
        const container = document.getElementById(containerId);
        const resultsContainer = document.getElementById(containerId + '-results');

        // Clear all radio button selections
        const radioButtons = container.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => radio.checked = false);

        // Hide results
        resultsContainer.style.display = 'none';

        // Remove any visual feedback
        const options = container.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.classList.remove('correct', 'incorrect');
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.accessibilityTopic = new AccessibilityTopic();
});
