// Client-Server Scripting Topic JavaScript
document.addEventListener('DOMContentLoaded', function () {
    initializeScriptingTopic();
});

function initializeScriptingTopic() {
    initializeTechnologyCards();
    setupValidationDemo();
    initializeFlowVisualization();
    addEventListeners();
}

// Technology Cards Interactive Elements
function initializeTechnologyCards() {
    const techCards = document.querySelectorAll('.tech-card');

    techCards.forEach(card => {
        card.addEventListener('click', function () {
            const tech = this.dataset.tech;
            showTechDetails(tech);
        });

        // Add hover effects
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

function showTechDetails(tech) {
    const techDetails = {
        javascript: {
            name: 'JavaScript',
            description: 'The essential client-side programming language for web browsers.',
            advantages: [
                'Runs directly in browser - no server needed',
                'Instant user feedback and interactions',
                'Rich ecosystem with many libraries/frameworks',
                'Can manipulate DOM and handle events',
                'Supports modern ES6+ features'
            ],
            disadvantages: [
                'Code is visible to users',
                'Browser compatibility issues',
                'Can be disabled by users',
                'Limited file system access',
                'Security limitations'
            ],
            useCases: [
                'Form validation and user input handling',
                'Dynamic content updates without page reload',
                'Interactive UI components and animations',
                'Single Page Applications (SPAs)',
                'Real-time features with WebSockets'
            ]
        },
        frameworks: {
            name: 'JavaScript Frameworks',
            description: 'Modern frameworks that make JavaScript development more efficient and organized.',
            advantages: [
                'Component-based architecture',
                'Virtual DOM for better performance',
                'Strong community and ecosystem',
                'Built-in state management',
                'Developer tools and debugging support'
            ],
            disadvantages: [
                'Learning curve for each framework',
                'Build process complexity',
                'Bundle size considerations',
                'Framework-specific patterns',
                'Rapid ecosystem changes'
            ],
            useCases: [
                'Complex single-page applications',
                'Reusable component libraries',
                'Progressive web applications',
                'Real-time collaborative tools',
                'Mobile app development (React Native, Ionic)'
            ]
        },
        nodejs: {
            name: 'Node.js',
            description: 'JavaScript runtime that enables server-side programming with JavaScript.',
            advantages: [
                'Same language for frontend and backend',
                'Non-blocking, event-driven architecture',
                'Large NPM ecosystem',
                'Fast development and deployment',
                'Great for real-time applications'
            ],
            disadvantages: [
                'Single-threaded (CPU-intensive tasks)',
                'Rapidly changing ecosystem',
                'Callback complexity (though mitigated by async/await)',
                'Not ideal for heavy computational tasks',
                'Memory usage concerns for large applications'
            ],
            useCases: [
                'REST APIs and microservices',
                'Real-time applications (chat, gaming)',
                'IoT applications',
                'Server-side rendering',
                'Development tools and build systems'
            ]
        },
        python: {
            name: 'Python',
            description: 'Versatile, readable language excellent for web development and data processing.',
            advantages: [
                'Simple, readable syntax',
                'Extensive standard library',
                'Strong frameworks (Django, Flask)',
                'Great for data science and AI',
                'Large, supportive community'
            ],
            disadvantages: [
                'Slower execution than compiled languages',
                'Global Interpreter Lock (GIL) limitations',
                'Mobile development limitations',
                'Runtime errors due to dynamic typing',
                'Memory consumption'
            ],
            useCases: [
                'Web applications and APIs',
                'Data analysis and machine learning',
                'Automation and scripting',
                'Scientific computing',
                'Backend services and microservices'
            ]
        },
        php: {
            name: 'PHP',
            description: 'Server-side scripting language designed specifically for web development.',
            advantages: [
                'Easy to learn and deploy',
                'Excellent web-focused features',
                'Large hosting support',
                'Mature ecosystem (WordPress, Laravel)',
                'Good documentation and community'
            ],
            disadvantages: [
                'Inconsistent function naming',
                'Security vulnerabilities if not careful',
                'Not ideal for non-web applications',
                'Performance limitations',
                'Legacy code maintenance issues'
            ],
            useCases: [
                'Content Management Systems',
                'E-commerce platforms',
                'Blog and forum systems',
                'Server-side form processing',
                'Database-driven web applications'
            ]
        }
    };

    const details = techDetails[tech];
    if (!details) return;

    // Create detailed modal or alert with formatted information
    const message = `${details.name}\n\n${details.description}\n\n` +
        `Advantages:\n${details.advantages.map(item => `• ${item}`).join('\n')}\n\n` +
        `Disadvantages:\n${details.disadvantages.map(item => `• ${item}`).join('\n')}\n\n` +
        `Common Use Cases:\n${details.useCases.map(item => `• ${item}`).join('\n')}`;

    alert(message);
}

// Validation Demo Setup
function setupValidationDemo() {
    setupClientSideValidation();
    setupServerSideValidation();
}

function setupClientSideValidation() {
    const emailInput = document.getElementById('clientEmail');
    const passwordInput = document.getElementById('clientPassword');
    const form = document.getElementById('clientForm');

    if (!emailInput || !passwordInput || !form) return;

    // Real-time email validation
    emailInput.addEventListener('input', function () {
        const email = this.value;
        const errorDiv = document.getElementById('clientEmailError');

        if (email.length === 0) {
            errorDiv.textContent = '';
            this.style.borderColor = '';
            return;
        }

        const isValid = validateEmail(email);
        if (isValid) {
            errorDiv.textContent = '✓ Valid email format';
            errorDiv.className = 'validation-message success';
            this.style.borderColor = '#10b981';
        } else {
            errorDiv.textContent = '✗ Please enter a valid email address';
            errorDiv.className = 'validation-message error';
            this.style.borderColor = '#ef4444';
        }
    });

    // Real-time password validation
    passwordInput.addEventListener('input', function () {
        const password = this.value;
        const errorDiv = document.getElementById('clientPasswordError');

        if (password.length === 0) {
            errorDiv.textContent = '';
            this.style.borderColor = '';
            return;
        }

        const strength = getPasswordStrength(password);
        errorDiv.textContent = `Password strength: ${strength.level}`;
        errorDiv.className = `validation-message ${strength.class}`;
        this.style.borderColor = strength.color;

        // Show requirements
        if (password.length < 8) {
            errorDiv.textContent += ' (Minimum 8 characters required)';
        }
    });

    // Form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        if (validateEmail(email) && password.length >= 8) {
            showMessage('✓ Client-side validation passed! Form would be submitted.', 'success');
        } else {
            showMessage('✗ Please fix validation errors before submitting.', 'error');
        }
    });
}

function setupServerSideValidation() {
    const form = document.getElementById('serverForm');
    const submitBtn = document.getElementById('serverSubmit');

    if (!form || !submitBtn) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('serverEmail').value;
        const password = document.getElementById('serverPassword').value;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Validating...';

        // Clear previous errors
        document.getElementById('serverEmailError').textContent = '';
        document.getElementById('serverPasswordError').textContent = '';

        // Simulate server validation with delay
        setTimeout(() => {
            const emailError = document.getElementById('serverEmailError');
            const passwordError = document.getElementById('serverPasswordError');

            let hasErrors = false;

            // Simulate server-side email validation
            if (!email || !validateEmail(email)) {
                emailError.textContent = 'Server: Invalid email format';
                emailError.className = 'validation-message error';
                hasErrors = true;
            } else if (email === 'admin@example.com') {
                emailError.textContent = 'Server: Email already exists in database';
                emailError.className = 'validation-message error';
                hasErrors = true;
            } else {
                emailError.textContent = 'Server: Email is available';
                emailError.className = 'validation-message success';
            }

            // Simulate server-side password validation
            if (!password || password.length < 8) {
                passwordError.textContent = 'Server: Password must be at least 8 characters';
                passwordError.className = 'validation-message error';
                hasErrors = true;
            } else if (password === 'password123') {
                passwordError.textContent = 'Server: Password is too common';
                passwordError.className = 'validation-message error';
                hasErrors = true;
            } else {
                passwordError.textContent = 'Server: Password meets requirements';
                passwordError.className = 'validation-message success';
            }

            // Show final result
            if (hasErrors) {
                showMessage('✗ Server validation failed. Please fix the errors above.', 'error');
            } else {
                showMessage('✓ Server validation passed! User would be created.', 'success');
            }

            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Submit (Server-Side)';
        }, 1500); // Simulate network delay
    });
}

// Utility functions
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function getPasswordStrength(password) {
    if (password.length < 4) {
        return { level: 'Very Weak', class: 'error', color: '#ef4444' };
    } else if (password.length < 6) {
        return { level: 'Weak', class: 'warning', color: '#f59e0b' };
    } else if (password.length < 8) {
        return { level: 'Fair', class: 'warning', color: '#f59e0b' };
    } else if (password.length < 12) {
        return { level: 'Good', class: 'success', color: '#10b981' };
    } else {
        return { level: 'Strong', class: 'success', color: '#059669' };
    }
}

function showMessage(message, type) {
    // Create or update message display
    let messageDiv = document.getElementById('globalMessage');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'globalMessage';
        messageDiv.className = 'global-message';
        document.body.appendChild(messageDiv);
    }

    messageDiv.textContent = message;
    messageDiv.className = `global-message ${type}`;
    messageDiv.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Flow Visualization
function initializeFlowVisualization() {
    const flowSteps = document.querySelectorAll('.flow-step');

    // Add click handlers to demonstrate the flow
    flowSteps.forEach((step, index) => {
        step.addEventListener('click', function () {
            animateFlowStep(index + 1);
        });
    });

    // Auto-animate on page load
    setTimeout(() => {
        animateCompleteFlow();
    }, 2000);
}

function animateFlowStep(stepNumber) {
    // Remove previous highlights
    document.querySelectorAll('.flow-step.active').forEach(step => {
        step.classList.remove('active');
    });

    // Highlight current step
    const step = document.querySelector(`.flow-step[data-step="${stepNumber}"]`);
    if (step) {
        step.classList.add('active');

        // Auto-remove highlight after 2 seconds
        setTimeout(() => {
            step.classList.remove('active');
        }, 2000);
    }
}

function animateCompleteFlow() {
    let currentStep = 1;
    const totalSteps = 6;

    function animateNext() {
        if (currentStep <= totalSteps) {
            animateFlowStep(currentStep);
            currentStep++;
            setTimeout(animateNext, 1000);
        }
    }

    animateNext();
}

// Additional Event Listeners
function addEventListeners() {
    // Add smooth scrolling to internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add copy functionality to code examples
    document.querySelectorAll('.code-example pre').forEach(pre => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.title = 'Copy code';

        copyBtn.addEventListener('click', function () {
            const code = pre.textContent;
            navigator.clipboard.writeText(code).then(() => {
                this.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });

        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
    });
}

// Add custom styles for interactive elements
function addScriptingStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .tech-card {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .tech-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .validation-message {
            margin-top: 8px;
            padding: 8px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
        }
        
        .validation-message.success {
            background: rgba(16, 185, 129, 0.1);
            color: #059669;
            border-left: 3px solid #10b981;
        }
        
        .validation-message.error {
            background: rgba(239, 68, 68, 0.1);
            color: #dc2626;
            border-left: 3px solid #ef4444;
        }
        
        .validation-message.warning {
            background: rgba(245, 158, 11, 0.1);
            color: #d97706;
            border-left: 3px solid #f59e0b;
        }
        
        .demo-form {
            background: white;
            padding: 20px;
            border-radius: 8px;
            border: 2px solid #e5e7eb;
            margin-bottom: 20px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #374151;
        }
        
        .form-group input {
            width: 100%;
            padding: 12px;
            border: 2px solid #d1d5db;
            border-radius: 6px;
            font-size: 16px;
            transition: border-color 0.2s ease;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: #3b82f6;
        }
        
        .demo-form button {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .demo-form button:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }
        
        .demo-form button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        .flow-step {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .flow-step:hover {
            background: rgba(59, 130, 246, 0.05);
        }
        
        .flow-step.active {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.1) 100%);
            border-color: #3b82f6;
            transform: scale(1.02);
        }
        
        .global-message {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 20px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 1000;
            display: none;
            max-width: 400px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .global-message.success {
            background: #dcfce7;
            color: #166534;
            border-left: 4px solid #22c55e;
        }
        
        .global-message.error {
            background: #fef2f2;
            color: #991b1b;
            border-left: 4px solid #ef4444;
        }
        
        .copy-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            padding: 8px;
            border-radius: 4px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s ease;
        }
        
        .code-example pre:hover .copy-btn {
            opacity: 1;
        }
        
        .copy-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        @media (max-width: 768px) {
            .global-message {
                position: relative;
                top: auto;
                right: auto;
                margin: 20px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize styles when page loads
document.addEventListener('DOMContentLoaded', addScriptingStyles);
