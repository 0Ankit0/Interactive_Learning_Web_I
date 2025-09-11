// CSS Frameworks Topic JavaScript
(function () {
    'use strict';

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function () {
        initializeInteractiveElements();
        initializeInstallationTabs();
        initializeFrameworkPlayground();
        initializeQuiz();
        initializeComponentShowcase();
        initializeComparisonTable();
    });

    // Initialize all interactive elements
    function initializeInteractiveElements() {
        // Animate hero visual on load
        animateHeroVisual();

        // Initialize smooth scrolling for internal links
        initializeSmoothScrolling();

        // Initialize intersection observer for animations
        initializeScrollAnimations();
    }

    // Animate hero frameworks showcase
    function animateHeroVisual() {
        const frameworkCards = document.querySelectorAll('.framework-card');

        frameworkCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px) rotateY(20deg)';

                // Trigger animation
                setTimeout(() => {
                    card.style.transition = 'all 0.8s ease-out';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) rotateY(0deg)';
                }, 100);
            }, index * 300);
        });

        // Animate stats
        setTimeout(() => {
            animateStats();
        }, 800);
    }

    // Animate statistics numbers
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(statNumber => {
            const text = statNumber.textContent;
            if (text.includes('k') || text.includes('M')) {
                const number = parseFloat(text);
                const suffix = text.includes('k') ? 'k' : 'M';

                animateNumber(statNumber, 0, number, suffix, 1000);
            }
        });
    }

    // Number animation helper
    function animateNumber(element, start, end, suffix, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }

            if (suffix === 'M') {
                element.textContent = current.toFixed(1) + 'M+';
            } else if (suffix === 'k') {
                element.textContent = Math.floor(current) + 'k+';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Installation tabs functionality
    function initializeInstallationTabs() {
        const tabButtons = document.querySelectorAll('.installation-tabs .tab-btn');
        const tabPanels = document.querySelectorAll('.bootstrap-installation .tab-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', function () {
                const targetTab = this.dataset.tab;

                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));

                // Add active class to clicked button and corresponding panel
                this.classList.add('active');
                const targetPanel = document.getElementById(targetTab + '-panel');
                if (targetPanel) {
                    targetPanel.classList.add('active');

                    // Animate panel entrance
                    targetPanel.style.opacity = '0';
                    targetPanel.style.transform = 'translateX(20px)';

                    setTimeout(() => {
                        targetPanel.style.transition = 'all 0.3s ease-out';
                        targetPanel.style.opacity = '1';
                        targetPanel.style.transform = 'translateX(0)';
                    }, 50);
                }
            });
        });
    }

    // Framework playground functionality
    function initializeFrameworkPlayground() {
        const frameworkSelect = document.getElementById('frameworkSelect');
        const componentSelect = document.getElementById('componentSelect');
        const generateButton = document.getElementById('generateComponent');
        const previewContainer = document.getElementById('previewContainer');
        const htmlCode = document.getElementById('htmlCode');
        const cssCode = document.getElementById('cssCode');

        if (!frameworkSelect || !componentSelect || !generateButton) return;

        // Component templates
        const componentTemplates = {
            bootstrap: {
                button: {
                    html: `<div class="d-flex gap-2 flex-wrap">
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-outline-primary">Outline Primary</button>
    <button type="button" class="btn btn-lg btn-warning">Large Button</button>
    <button type="button" class="btn btn-sm btn-info">Small Button</button>
</div>`,
                    css: `/* Bootstrap buttons are styled automatically */
.btn {
    /* No additional CSS needed - Bootstrap handles styling */
}`
                },
                card: {
                    html: `<div class="row">
    <div class="col-md-6 mb-3">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Card Header</h5>
            </div>
            <div class="card-body">
                <h5 class="card-title">Card Title</h5>
                <p class="card-text">This is a basic card with header, body, and footer.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            <div class="card-footer text-muted">
                2 days ago
            </div>
        </div>
    </div>
    <div class="col-md-6 mb-3">
        <div class="card border-success">
            <div class="card-body text-success">
                <h5 class="card-title">Success Card</h5>
                <p class="card-text">This card has a success theme.</p>
            </div>
        </div>
    </div>
</div>`,
                    css: `/* Bootstrap cards are styled automatically */
.card {
    /* Additional customizations can be added here */
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}`
                },
                form: {
                    html: `<form class="row g-3">
    <div class="col-md-6">
        <label for="firstName" class="form-label">First name</label>
        <input type="text" class="form-control" id="firstName" required>
        <div class="valid-feedback">Looks good!</div>
    </div>
    <div class="col-md-6">
        <label for="lastName" class="form-label">Last name</label>
        <input type="text" class="form-control" id="lastName" required>
        <div class="valid-feedback">Looks good!</div>
    </div>
    <div class="col-md-12">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" required>
    </div>
    <div class="col-md-6">
        <label for="city" class="form-label">City</label>
        <input type="text" class="form-control" id="city" required>
    </div>
    <div class="col-md-3">
        <label for="state" class="form-label">State</label>
        <select class="form-select" id="state" required>
            <option selected disabled value="">Choose...</option>
            <option>New York</option>
            <option>California</option>
            <option>Texas</option>
        </select>
    </div>
    <div class="col-md-3">
        <label for="zip" class="form-label">Zip</label>
        <input type="text" class="form-control" id="zip" required>
    </div>
    <div class="col-12">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="terms" required>
            <label class="form-check-label" for="terms">
                Agree to terms and conditions
            </label>
        </div>
    </div>
    <div class="col-12">
        <button class="btn btn-primary" type="submit">Submit form</button>
    </div>
</form>`,
                    css: `/* Bootstrap form styling is automatic */
.form-control:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}`
                },
                grid: {
                    html: `<div class="container-fluid">
    <div class="row mb-3">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="p-3 bg-primary text-white text-center">
                Responsive Column 1
            </div>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="p-3 bg-secondary text-white text-center">
                Responsive Column 2
            </div>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="p-3 bg-success text-white text-center">
                Responsive Column 3
            </div>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="p-3 bg-warning text-dark text-center">
                Responsive Column 4
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-8">
            <div class="p-3 bg-info text-white text-center">
                Main Content (8 cols)
            </div>
        </div>
        <div class="col-md-4">
            <div class="p-3 bg-danger text-white text-center">
                Sidebar (4 cols)
            </div>
        </div>
    </div>
</div>`,
                    css: `/* Bootstrap grid system classes */
.row {
    margin-left: -0.75rem;
    margin-right: -0.75rem;
}

.col-md-8, .col-md-4 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
}`
                }
            },
            custom: {
                button: {
                    html: `<div class="custom-buttons">
    <button class="btn-custom btn-primary-custom">Primary</button>
    <button class="btn-custom btn-secondary-custom">Secondary</button>
    <button class="btn-custom btn-success-custom">Success</button>
    <button class="btn-custom btn-outline-custom">Outline</button>
    <button class="btn-custom btn-large-custom">Large Button</button>
    <button class="btn-custom btn-small-custom">Small</button>
</div>`,
                    css: `.btn-custom {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    margin: 0.25rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    border-radius: 0.375rem;
    transition: all 0.15s ease-in-out;
}

.btn-primary-custom {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary-custom:hover {
    background-color: #0056b3;
    border-color: #004085;
}

.btn-secondary-custom {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}

.btn-success-custom {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
}

.btn-outline-custom {
    color: #007bff;
    background-color: transparent;
    border-color: #007bff;
}

.btn-outline-custom:hover {
    color: #fff;
    background-color: #007bff;
}

.btn-large-custom {
    padding: 1rem 2rem;
    font-size: 1.125rem;
    background-color: #ffc107;
    color: #212529;
    border-color: #ffc107;
}

.btn-small-custom {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    background-color: #17a2b8;
    color: #fff;
    border-color: #17a2b8;
}`
                },
                card: {
                    html: `<div class="custom-card-grid">
    <div class="card-custom">
        <div class="card-header-custom">
            Card Header
        </div>
        <div class="card-body-custom">
            <h5 class="card-title-custom">Card Title</h5>
            <p class="card-text-custom">This is a custom styled card component.</p>
            <a href="#" class="btn-custom btn-primary-custom">Action</a>
        </div>
        <div class="card-footer-custom">
            Footer content
        </div>
    </div>
    <div class="card-custom card-success-custom">
        <div class="card-body-custom">
            <h5 class="card-title-custom">Success Card</h5>
            <p class="card-text-custom">This card has a success theme.</p>
        </div>
    </div>
</div>`,
                    css: `.custom-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}

.card-custom {
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: 0.375rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,.075);
    overflow: hidden;
}

.card-header-custom {
    padding: 1rem;
    background-color: rgba(0,0,0,.03);
    border-bottom: 1px solid rgba(0,0,0,.125);
    font-weight: 500;
}

.card-body-custom {
    padding: 1rem;
}

.card-title-custom {
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
    font-weight: 500;
}

.card-text-custom {
    margin-bottom: 1rem;
    color: #6c757d;
}

.card-footer-custom {
    padding: 1rem;
    background-color: rgba(0,0,0,.03);
    border-top: 1px solid rgba(0,0,0,.125);
    color: #6c757d;
}

.card-success-custom {
    border-color: #28a745;
}

.card-success-custom .card-body-custom {
    background-color: #d4edda;
}

.card-success-custom .card-title-custom {
    color: #155724;
}`
                },
                form: {
                    html: `<form class="custom-form">
    <div class="form-row-custom">
        <div class="form-group-custom">
            <label class="form-label-custom" for="customFirstName">First Name</label>
            <input type="text" class="form-input-custom" id="customFirstName" required>
        </div>
        <div class="form-group-custom">
            <label class="form-label-custom" for="customLastName">Last Name</label>
            <input type="text" class="form-input-custom" id="customLastName" required>
        </div>
    </div>
    <div class="form-group-custom">
        <label class="form-label-custom" for="customEmail">Email</label>
        <input type="email" class="form-input-custom" id="customEmail" required>
    </div>
    <div class="form-row-custom">
        <div class="form-group-custom">
            <label class="form-label-custom" for="customCity">City</label>
            <input type="text" class="form-input-custom" id="customCity" required>
        </div>
        <div class="form-group-custom">
            <label class="form-label-custom" for="customState">State</label>
            <select class="form-input-custom" id="customState" required>
                <option value="">Choose...</option>
                <option>New York</option>
                <option>California</option>
            </select>
        </div>
    </div>
    <div class="form-group-custom">
        <label class="checkbox-label-custom">
            <input type="checkbox" class="checkbox-custom" required>
            <span class="checkmark-custom"></span>
            I agree to the terms and conditions
        </label>
    </div>
    <button type="submit" class="btn-custom btn-primary-custom">Submit Form</button>
</form>`,
                    css: `.custom-form {
    max-width: 500px;
    margin: 0 auto;
}

.form-row-custom {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
}

.form-group-custom {
    margin-bottom: 1rem;
}

.form-label-custom {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #212529;
}

.form-input-custom {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ced4da;
    border-radius: 0.375rem;
    transition: border-color 0.15s ease-in-out;
}

.form-input-custom:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.checkbox-label-custom {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
}

.checkbox-custom {
    margin-right: 0.5rem;
}

.checkmark-custom {
    margin-left: 0.5rem;
}`
                },
                grid: {
                    html: `<div class="custom-grid-container">
    <div class="custom-grid">
        <div class="grid-item-custom grid-primary">
            Responsive Item 1
        </div>
        <div class="grid-item-custom grid-secondary">
            Responsive Item 2
        </div>
        <div class="grid-item-custom grid-success">
            Responsive Item 3
        </div>
        <div class="grid-item-custom grid-warning">
            Responsive Item 4
        </div>
    </div>
    <div class="custom-grid layout-grid">
        <div class="grid-main">
            Main Content Area
        </div>
        <div class="grid-sidebar">
            Sidebar Area
        </div>
    </div>
</div>`,
                    css: `.custom-grid-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
}

.custom-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.grid-item-custom {
    padding: 2rem;
    text-align: center;
    color: white;
    font-weight: 500;
    border-radius: 0.375rem;
}

.grid-primary { background-color: #007bff; }
.grid-secondary { background-color: #6c757d; }
.grid-success { background-color: #28a745; }
.grid-warning { background-color: #ffc107; color: #212529; }

.layout-grid {
    grid-template-columns: 2fr 1fr;
}

.grid-main {
    padding: 2rem;
    background-color: #17a2b8;
    color: white;
    text-align: center;
    border-radius: 0.375rem;
}

.grid-sidebar {
    padding: 2rem;
    background-color: #dc3545;
    color: white;
    text-align: center;
    border-radius: 0.375rem;
}

@media (max-width: 768px) {
    .layout-grid {
        grid-template-columns: 1fr;
    }
    
    .custom-grid {
        grid-template-columns: 1fr;
    }
}`
                }
            }
        };

        // Generate component function
        function generateComponent() {
            const framework = frameworkSelect.value;
            const component = componentSelect.value;

            const template = componentTemplates[framework][component];

            if (template) {
                // Update preview
                previewContainer.innerHTML = template.html;

                // Update code displays
                htmlCode.textContent = template.html;
                cssCode.textContent = template.css;

                // Re-highlight syntax
                if (window.Prism) {
                    Prism.highlightAll();
                }

                // Add visual feedback
                generateButton.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    generateButton.style.transform = 'scale(1)';
                }, 150);
            }
        }

        // Event listeners
        generateButton.addEventListener('click', generateComponent);

        // Initialize with default component
        generateComponent();

        // Playground result tabs
        initializePlaygroundTabs();
    }

    // Initialize playground tabs
    function initializePlaygroundTabs() {
        const tabButtons = document.querySelectorAll('.playground-result .tab-btn');
        const tabPanels = document.querySelectorAll('.playground-result .tab-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', function () {
                const targetTab = this.dataset.tab;

                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));

                // Add active class to clicked button and corresponding panel
                this.classList.add('active');
                const targetPanel = document.getElementById(targetTab + '-panel');
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    // Component showcase interactions
    function initializeComponentShowcase() {
        const componentDemos = document.querySelectorAll('.component-demo');

        componentDemos.forEach(demo => {
            const demoContainer = demo.querySelector('.demo-container');
            const codeExample = demo.querySelector('.code-example');

            if (demoContainer && codeExample) {
                // Add toggle functionality
                const header = demo.querySelector('h4');
                if (header) {
                    header.style.cursor = 'pointer';
                    header.addEventListener('click', function () {
                        const isVisible = codeExample.style.display !== 'none';
                        codeExample.style.display = isVisible ? 'none' : 'block';

                        // Add visual indicator
                        const icon = header.querySelector('i');
                        if (icon) {
                            icon.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(90deg)';
                        }
                    });
                }
            }
        });
    }

    // Comparison table interactions
    function initializeComparisonTable() {
        const advantageCells = document.querySelectorAll('.advantage');

        advantageCells.forEach(cell => {
            cell.addEventListener('mouseenter', function () {
                this.style.transform = 'scale(1.05)';
                this.style.backgroundColor = '#d4edda';
            });

            cell.addEventListener('mouseleave', function () {
                this.style.transform = 'scale(1)';
                this.style.backgroundColor = '';
            });
        });
    }

    // Quiz functionality
    function initializeQuiz() {
        const quizContainer = document.querySelector('.quiz-container');
        const submitButton = document.querySelector('.quiz-submit');
        const retryButton = document.querySelector('.quiz-retry');
        const resultsDiv = document.querySelector('.quiz-results');

        if (!quizContainer || !submitButton) return;

        const correctAnswers = {
            'q1': 'c', // Both .container and .container-fluid
            'q2': 'c', // 12 columns
            'q3': 'b', // Foundation
            'q4': 'b'  // Use framework variables and customization options
        };

        submitButton.addEventListener('click', function () {
            const formData = new FormData();
            const radioButtons = quizContainer.querySelectorAll('input[type="radio"]:checked');

            let score = 0;
            const totalQuestions = Object.keys(correctAnswers).length;

            // Collect answers
            const userAnswers = {};
            radioButtons.forEach(radio => {
                userAnswers[radio.name] = radio.value;
            });

            // Calculate score
            Object.keys(correctAnswers).forEach(question => {
                if (userAnswers[question] === correctAnswers[question]) {
                    score++;
                }
            });

            // Show results
            const percentage = Math.round((score / totalQuestions) * 100);
            document.getElementById('score').textContent = score;
            document.getElementById('percentage').textContent = percentage;

            resultsDiv.style.display = 'block';
            submitButton.style.display = 'none';
            retryButton.style.display = 'inline-block';

            // Highlight correct/incorrect answers
            Object.keys(correctAnswers).forEach(question => {
                const questionDiv = document.querySelector(`input[name="${question}"]`).closest('.quiz-question');
                const options = questionDiv.querySelectorAll('.quiz-options li');

                options.forEach(option => {
                    const radio = option.querySelector('input[type="radio"]');
                    const label = option.querySelector('label');

                    if (radio.value === correctAnswers[question]) {
                        option.classList.add('correct');
                    } else if (radio.checked && radio.value !== correctAnswers[question]) {
                        option.classList.add('incorrect');
                    }
                });
            });

            // Scroll to results
            resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        retryButton.addEventListener('click', function () {
            // Reset quiz
            const radioButtons = quizContainer.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radio => radio.checked = false);

            const options = quizContainer.querySelectorAll('.quiz-options li');
            options.forEach(option => {
                option.classList.remove('correct', 'incorrect');
            });

            resultsDiv.style.display = 'none';
            submitButton.style.display = 'inline-block';
            retryButton.style.display = 'none';

            // Scroll back to quiz
            quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Smooth scrolling for internal links
    function initializeSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Scroll animations
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.benefit-card, .overview-item, .component-demo, .guide-card, .alternative-card, .practice-card, .resource-card, .step-card'
        );

        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Framework cards hover effects
    function initializeFrameworkCards() {
        const frameworkCards = document.querySelectorAll('.framework-card');

        frameworkCards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-10px) scale(1.05)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            });
        });
    }

    // Initialize framework cards
    document.addEventListener('DOMContentLoaded', function () {
        initializeFrameworkCards();
    });

    // Copy code functionality
    function initializeCopyCode() {
        const codeBlocks = document.querySelectorAll('.code-example pre');

        codeBlocks.forEach(block => {
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.title = 'Copy code';

            block.style.position = 'relative';
            block.appendChild(copyButton);

            copyButton.addEventListener('click', function () {
                const code = block.querySelector('code').textContent;

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(code).then(() => {
                        copyButton.innerHTML = '<i class="fas fa-check"></i>';
                        setTimeout(() => {
                            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                        }, 2000);
                    });
                }
            });
        });
    }

    // Initialize copy code functionality
    document.addEventListener('DOMContentLoaded', function () {
        initializeCopyCode();
    });

})();
