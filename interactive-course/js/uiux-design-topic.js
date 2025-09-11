// UI/UX Design Topic Interactive Functionality

class UIUXDesignManager {
    constructor() {
        this.currentDesign = {
            layout: 'card',
            colorScheme: 'default',
            typography: 'modern',
            spacing: 1,
            borderRadius: 8,
            shadowIntensity: 1
        };

        this.savedDesigns = [];
        this.currentPattern = 'navigation';

        this.initializeEventListeners();
        this.initializeQuiz();
        this.updateDesign();
    }

    initializeEventListeners() {
        // Range input updates
        const spacingRange = document.getElementById('spacing');
        const radiusRange = document.getElementById('border-radius');
        const shadowRange = document.getElementById('shadow-intensity');

        if (spacingRange) {
            spacingRange.addEventListener('input', (e) => {
                document.getElementById('spacing-value').textContent = e.target.value + 'x';
                this.currentDesign.spacing = parseFloat(e.target.value);
            });
        }

        if (radiusRange) {
            radiusRange.addEventListener('input', (e) => {
                document.getElementById('radius-value').textContent = e.target.value + 'px';
                this.currentDesign.borderRadius = parseInt(e.target.value);
            });
        }

        if (shadowRange) {
            shadowRange.addEventListener('input', (e) => {
                const intensityLabels = ['None', 'Light', 'Medium', 'Heavy'];
                document.getElementById('shadow-value').textContent = intensityLabels[e.target.value];
                this.currentDesign.shadowIntensity = parseInt(e.target.value);
            });
        }
    }

    // Principle Details Display
    showPrincipleDetails(principle) {
        const container = document.getElementById('principle-details-container');
        const principleData = this.getPrincipleData(principle);

        container.innerHTML = `
            <div class="principle-detail-card">
                <div class="detail-header">
                    <div class="detail-icon">
                        <i class="${principleData.icon}"></i>
                    </div>
                    <h3>${principleData.title}</h3>
                </div>
                
                <div class="detail-content">
                    <p class="principle-description">${principleData.description}</p>
                    
                    <div class="principle-examples">
                        <h4>Examples & Applications</h4>
                        <div class="examples-grid">
                            ${principleData.examples.map(example => `
                                <div class="example-item">
                                    <h5>${example.title}</h5>
                                    <p>${example.description}</p>
                                    <div class="example-demo">
                                        ${example.demo}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="principle-guidelines">
                        <h4>Best Practices</h4>
                        <ul>
                            ${principleData.guidelines.map(guideline => `<li>${guideline}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="principle-mistakes">
                        <h4>Common Mistakes to Avoid</h4>
                        <ul>
                            ${principleData.mistakes.map(mistake => `<li>${mistake}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        container.style.display = 'block';
        container.scrollIntoView({ behavior: 'smooth' });

        // Update active principle card
        document.querySelectorAll('.principle-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`[data-principle="${principle}"]`).classList.add('active');
    }

    getPrincipleData(principle) {
        const principles = {
            hierarchy: {
                title: 'Visual Hierarchy',
                icon: 'fas fa-layer-group',
                description: 'Visual hierarchy guides users through content by establishing clear levels of importance using size, color, contrast, and positioning.',
                examples: [
                    {
                        title: 'Typography Hierarchy',
                        description: 'Use different font sizes and weights to create clear information structure.',
                        demo: '<div class="hierarchy-demo"><h1>Main Heading</h1><h2>Subheading</h2><p>Body text content</p></div>'
                    },
                    {
                        title: 'Color Hierarchy',
                        description: 'Use color to emphasize important elements and create visual flow.',
                        demo: '<div class="color-hierarchy"><button class="primary">Primary Action</button><button class="secondary">Secondary Action</button></div>'
                    },
                    {
                        title: 'Size Hierarchy',
                        description: 'Larger elements naturally attract more attention.',
                        demo: '<div class="size-hierarchy"><div class="large">Important</div><div class="medium">Medium</div><div class="small">Less Important</div></div>'
                    }
                ],
                guidelines: [
                    'Use no more than 3-4 hierarchy levels',
                    'Maintain consistent spacing between elements',
                    'Use contrast to emphasize important content',
                    'Consider reading patterns (F-pattern, Z-pattern)',
                    'Group related elements together'
                ],
                mistakes: [
                    'Making everything look equally important',
                    'Using too many different font sizes',
                    'Inconsistent spacing between elements',
                    'Poor contrast ratios',
                    'Overusing bold or bright colors'
                ]
            },
            consistency: {
                title: 'Consistency',
                icon: 'fas fa-sync',
                description: 'Consistency creates predictability and reduces cognitive load by maintaining uniform patterns throughout the interface.',
                examples: [
                    {
                        title: 'Button Consistency',
                        description: 'Maintain consistent button styles, sizes, and behaviors.',
                        demo: '<div class="consistency-demo"><button class="consistent-btn primary">Primary</button><button class="consistent-btn secondary">Secondary</button><button class="consistent-btn tertiary">Tertiary</button></div>'
                    },
                    {
                        title: 'Color Consistency',
                        description: 'Use colors consistently for similar functions and meanings.',
                        demo: '<div class="color-consistency"><span class="status success">Success</span><span class="status warning">Warning</span><span class="status error">Error</span></div>'
                    },
                    {
                        title: 'Layout Consistency',
                        description: 'Maintain consistent spacing, alignment, and grid structure.',
                        demo: '<div class="layout-consistency"><div class="consistent-card">Card 1</div><div class="consistent-card">Card 2</div><div class="consistent-card">Card 3</div></div>'
                    }
                ],
                guidelines: [
                    'Create and follow a design system',
                    'Use consistent spacing units (4px, 8px, 16px)',
                    'Maintain consistent interaction patterns',
                    'Use the same terminology throughout',
                    'Apply consistent visual styles for similar elements'
                ],
                mistakes: [
                    'Different button styles for similar actions',
                    'Inconsistent spacing and alignment',
                    'Using different terms for the same concept',
                    'Varying interaction behaviors',
                    'Inconsistent color usage'
                ]
            },
            feedback: {
                title: 'Feedback',
                icon: 'fas fa-comments',
                description: 'Feedback informs users about the results of their actions and the current state of the system.',
                examples: [
                    {
                        title: 'Form Validation',
                        description: 'Provide immediate feedback on form input validity.',
                        demo: '<div class="feedback-demo"><input type="email" placeholder="Email" class="invalid"><span class="error-msg">Invalid email format</span></div>'
                    },
                    {
                        title: 'Loading States',
                        description: 'Show progress during loading operations.',
                        demo: '<div class="loading-demo"><button class="loading-btn"><span class="spinner"></span>Loading...</button></div>'
                    },
                    {
                        title: 'Success Messages',
                        description: 'Confirm successful actions with clear messages.',
                        demo: '<div class="success-demo"><div class="success-toast"><i class="fas fa-check"></i> Action completed successfully!</div></div>'
                    }
                ],
                guidelines: [
                    'Provide immediate feedback for user actions',
                    'Use appropriate feedback types (visual, auditory, haptic)',
                    'Make feedback contextual and relevant',
                    'Use progressive disclosure for complex feedback',
                    'Ensure feedback is accessible to all users'
                ],
                mistakes: [
                    'No feedback for user actions',
                    'Delayed or inconsistent feedback',
                    'Unclear or confusing error messages',
                    'Overwhelming users with too much feedback',
                    'Generic error messages without context'
                ]
            },
            simplicity: {
                title: 'Simplicity',
                icon: 'fas fa-feather',
                description: 'Simplicity reduces cognitive load by focusing on essential elements and removing unnecessary complexity.',
                examples: [
                    {
                        title: 'Minimal Navigation',
                        description: 'Show only the most important navigation options.',
                        demo: '<div class="simple-nav"><a href="#">Home</a><a href="#">Products</a><a href="#">Contact</a></div>'
                    },
                    {
                        title: 'Clean Forms',
                        description: 'Remove unnecessary fields and decorations.',
                        demo: '<div class="simple-form"><input type="email" placeholder="Email"><button>Subscribe</button></div>'
                    },
                    {
                        title: 'White Space',
                        description: 'Use white space to create breathing room and focus.',
                        demo: '<div class="whitespace-demo"><h3>Clean Design</h3><p>Effective use of white space creates focus and improves readability.</p></div>'
                    }
                ],
                guidelines: [
                    'Remove unnecessary elements and features',
                    'Use white space effectively',
                    'Prioritize content and functionality',
                    'Keep language clear and concise',
                    'Progressive disclosure for complex features'
                ],
                mistakes: [
                    'Cramming too much content on one screen',
                    'Using decorative elements without purpose',
                    'Complex navigation structures',
                    'Overly detailed forms',
                    'Too many choices or options'
                ]
            },
            affordance: {
                title: 'Affordance',
                icon: 'fas fa-hand-pointer',
                description: 'Affordances are visual cues that suggest how an element can be interacted with.',
                examples: [
                    {
                        title: 'Button Affordances',
                        description: 'Buttons should look clickable with proper styling.',
                        demo: '<div class="affordance-demo"><button class="good-button">Clickable Button</button><div class="bad-button">Not Obviously Clickable</div></div>'
                    },
                    {
                        title: 'Link Styling',
                        description: 'Links should be visually distinct and recognizable.',
                        demo: '<div class="link-demo">Visit our <a href="#">help center</a> for more information.</div>'
                    },
                    {
                        title: 'Form Controls',
                        description: 'Form elements should clearly indicate their function.',
                        demo: '<div class="form-affordance"><input type="text" placeholder="Search..."><button type="submit"><i class="fas fa-search"></i></button></div>'
                    }
                ],
                guidelines: [
                    'Make interactive elements look interactive',
                    'Use familiar icons and symbols',
                    'Provide clear hover and focus states',
                    'Use consistent interaction patterns',
                    'Consider cultural and contextual differences'
                ],
                mistakes: [
                    'Making non-interactive elements look clickable',
                    'Using unclear or unfamiliar icons',
                    'Inconsistent interaction feedback',
                    'Poor hover and focus states',
                    'Text that looks like links but isn\'t'
                ]
            },
            accessibility: {
                title: 'Accessibility',
                icon: 'fas fa-universal-access',
                description: 'Accessibility ensures your design works for users with diverse abilities and needs.',
                examples: [
                    {
                        title: 'Color Contrast',
                        description: 'Ensure sufficient contrast for text readability.',
                        demo: '<div class="contrast-demo"><div class="good-contrast">Good Contrast</div><div class="poor-contrast">Poor Contrast</div></div>'
                    },
                    {
                        title: 'Focus Indicators',
                        description: 'Provide clear focus indicators for keyboard navigation.',
                        demo: '<div class="focus-demo"><button class="focus-visible">Focusable Button</button><a href="#" class="focus-visible">Focusable Link</a></div>'
                    },
                    {
                        title: 'Alt Text',
                        description: 'Provide descriptive alternative text for images.',
                        demo: '<div class="alt-demo"><img src="#" alt="Chart showing 50% increase in sales" style="width:100px;height:60px;background:#ddd;display:block;"></div>'
                    }
                ],
                guidelines: [
                    'Use sufficient color contrast (4.5:1 for normal text)',
                    'Provide keyboard navigation support',
                    'Include proper ARIA labels and roles',
                    'Use semantic HTML elements',
                    'Test with screen readers and other assistive technologies'
                ],
                mistakes: [
                    'Using color as the only way to convey information',
                    'Poor keyboard navigation support',
                    'Missing or inadequate alt text',
                    'Small touch targets (less than 44px)',
                    'Auto-playing media without controls'
                ]
            }
        };

        return principles[principle];
    }

    // Design Builder Functions
    updateDesign() {
        const preview = document.getElementById('design-preview');
        const formData = new FormData(document.getElementById('layout-type')?.form || document.createElement('form'));

        // Get current values
        this.currentDesign.layout = document.getElementById('layout-type')?.value || 'card';
        this.currentDesign.colorScheme = document.getElementById('color-scheme')?.value || 'default';
        this.currentDesign.typography = document.getElementById('typography')?.value || 'modern';

        if (preview) {
            this.applyDesignToPreview(preview);
            this.updateAnalysis();
        }
    }

    applyDesignToPreview(preview) {
        const { layout, colorScheme, typography, spacing, borderRadius, shadowIntensity } = this.currentDesign;

        // Reset classes
        preview.className = 'preview-container';

        // Apply layout
        preview.classList.add(`layout-${layout}`);

        // Apply color scheme
        preview.classList.add(`scheme-${colorScheme}`);

        // Apply typography
        preview.classList.add(`typography-${typography}`);

        // Apply spacing
        preview.style.setProperty('--spacing-multiplier', spacing);

        // Apply border radius
        preview.style.setProperty('--border-radius', `${borderRadius}px`);

        // Apply shadow
        const shadowLevels = ['none', 'light', 'medium', 'heavy'];
        preview.style.setProperty('--shadow-level', shadowLevels[shadowIntensity]);
    }

    updateAnalysis() {
        const analysisContainer = document.getElementById('analysis-feedback');
        const { layout, colorScheme, typography, spacing, borderRadius, shadowIntensity } = this.currentDesign;

        let feedback = [];
        let score = 0;

        // Analyze spacing
        if (spacing >= 0.8 && spacing <= 1.5) {
            feedback.push({ type: 'positive', message: 'Good spacing balance - comfortable and scannable' });
            score += 20;
        } else if (spacing < 0.8) {
            feedback.push({ type: 'warning', message: 'Spacing might be too tight - consider increasing for better readability' });
            score += 10;
        } else {
            feedback.push({ type: 'warning', message: 'Spacing might be too loose - consider reducing for better content density' });
            score += 10;
        }

        // Analyze border radius
        if (borderRadius >= 4 && borderRadius <= 12) {
            feedback.push({ type: 'positive', message: 'Border radius creates a modern, friendly appearance' });
            score += 15;
        } else if (borderRadius === 0) {
            feedback.push({ type: 'neutral', message: 'Sharp corners create a more formal, technical appearance' });
            score += 10;
        } else {
            feedback.push({ type: 'warning', message: 'Very high border radius may look unprofessional' });
            score += 5;
        }

        // Analyze color scheme
        const colorAnalysis = {
            'default': { message: 'Neutral colors provide good readability and professional appearance', score: 15 },
            'vibrant': { message: 'Vibrant colors create energy but use sparingly to avoid fatigue', score: 12 },
            'minimal': { message: 'Minimal palette promotes focus and sophistication', score: 18 },
            'dark': { message: 'Dark mode reduces eye strain in low-light environments', score: 16 }
        };

        const colorFeedback = colorAnalysis[colorScheme];
        feedback.push({ type: 'neutral', message: colorFeedback.message });
        score += colorFeedback.score;

        // Analyze typography
        const typographyAnalysis = {
            'modern': { message: 'Modern typography is clean and highly readable', score: 15 },
            'classic': { message: 'Classic typography conveys trustworthiness and tradition', score: 14 },
            'playful': { message: 'Playful typography adds personality but may reduce professionalism', score: 12 },
            'technical': { message: 'Technical typography is excellent for code and data-heavy interfaces', score: 13 }
        };

        const typeFeedback = typographyAnalysis[typography];
        feedback.push({ type: 'neutral', message: typeFeedback.message });
        score += typeFeedback.score;

        // Overall score assessment
        let overallFeedback = '';
        if (score >= 60) {
            overallFeedback = 'Excellent design choices! This combination works well for most use cases.';
        } else if (score >= 45) {
            overallFeedback = 'Good design with room for minor improvements.';
        } else {
            overallFeedback = 'Consider revising some design choices for better user experience.';
        }

        analysisContainer.innerHTML = `
            <div class="analysis-score">
                <div class="score-circle">
                    <span class="score-number">${score}</span>
                    <span class="score-total">/100</span>
                </div>
                <p class="overall-feedback">${overallFeedback}</p>
            </div>
            <div class="feedback-list">
                ${feedback.map(item => `
                    <div class="feedback-item ${item.type}">
                        <i class="fas fa-${item.type === 'positive' ? 'check' : item.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                        <span>${item.message}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    resetDesign() {
        this.currentDesign = {
            layout: 'card',
            colorScheme: 'default',
            typography: 'modern',
            spacing: 1,
            borderRadius: 8,
            shadowIntensity: 1
        };

        // Reset form controls
        document.getElementById('layout-type').value = 'card';
        document.getElementById('color-scheme').value = 'default';
        document.getElementById('typography').value = 'modern';
        document.getElementById('spacing').value = '1';
        document.getElementById('border-radius').value = '8';
        document.getElementById('shadow-intensity').value = '1';

        // Update displays
        document.getElementById('spacing-value').textContent = '1x';
        document.getElementById('radius-value').textContent = '8px';
        document.getElementById('shadow-value').textContent = 'Medium';

        this.updateDesign();
    }

    randomizeDesign() {
        const layouts = ['card', 'list', 'grid', 'hero'];
        const colorSchemes = ['default', 'vibrant', 'minimal', 'dark'];
        const typographies = ['modern', 'classic', 'playful', 'technical'];

        this.currentDesign = {
            layout: layouts[Math.floor(Math.random() * layouts.length)],
            colorScheme: colorSchemes[Math.floor(Math.random() * colorSchemes.length)],
            typography: typographies[Math.floor(Math.random() * typographies.length)],
            spacing: Math.round((Math.random() * 1.5 + 0.5) * 10) / 10,
            borderRadius: Math.floor(Math.random() * 21),
            shadowIntensity: Math.floor(Math.random() * 4)
        };

        // Update form controls
        document.getElementById('layout-type').value = this.currentDesign.layout;
        document.getElementById('color-scheme').value = this.currentDesign.colorScheme;
        document.getElementById('typography').value = this.currentDesign.typography;
        document.getElementById('spacing').value = this.currentDesign.spacing;
        document.getElementById('border-radius').value = this.currentDesign.borderRadius;
        document.getElementById('shadow-intensity').value = this.currentDesign.shadowIntensity;

        // Update displays
        document.getElementById('spacing-value').textContent = this.currentDesign.spacing + 'x';
        document.getElementById('radius-value').textContent = this.currentDesign.borderRadius + 'px';
        const intensityLabels = ['None', 'Light', 'Medium', 'Heavy'];
        document.getElementById('shadow-value').textContent = intensityLabels[this.currentDesign.shadowIntensity];

        this.updateDesign();
        this.showNotification('Design randomized! Try the new combination.', 'info');
    }

    saveDesign() {
        const designCopy = { ...this.currentDesign };
        designCopy.id = Date.now();
        designCopy.name = `Design ${this.savedDesigns.length + 1}`;

        this.savedDesigns.push(designCopy);
        this.showNotification(`Design saved as "${designCopy.name}"`, 'success');

        // Could implement design gallery here
        console.log('Saved designs:', this.savedDesigns);
    }

    // Pattern Library Functions
    showPattern(patternType) {
        // Update active tab
        document.querySelectorAll('.pattern-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-pattern="${patternType}"]`).classList.add('active');

        // Show corresponding panel
        document.querySelectorAll('.pattern-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(`${patternType}-pattern`).classList.add('active');

        this.currentPattern = patternType;
    }

    // Form Validation Examples
    validateUsername(input) {
        const value = input.value.trim();
        const messageDiv = input.parentNode.querySelector('.validation-message');

        if (value.length === 0) {
            this.showValidationMessage(messageDiv, '', 'neutral');
        } else if (value.length < 3) {
            this.showValidationMessage(messageDiv, 'Username must be at least 3 characters', 'error');
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            this.showValidationMessage(messageDiv, 'Username can only contain letters, numbers, and underscores', 'error');
        } else {
            this.showValidationMessage(messageDiv, 'Username is available', 'success');
        }
    }

    validatePassword(input) {
        const value = input.value;
        const messageDiv = input.parentNode.querySelector('.validation-message');

        if (value.length === 0) {
            this.showValidationMessage(messageDiv, '', 'neutral');
        } else if (value.length < 8) {
            this.showValidationMessage(messageDiv, 'Password must be at least 8 characters', 'error');
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            this.showValidationMessage(messageDiv, 'Password must contain uppercase, lowercase, and numbers', 'warning');
        } else {
            this.showValidationMessage(messageDiv, 'Strong password', 'success');
        }
    }

    validateConfirmPassword(input) {
        const value = input.value;
        const password = document.getElementById('password').value;
        const messageDiv = input.parentNode.querySelector('.validation-message');

        if (value.length === 0) {
            this.showValidationMessage(messageDiv, '', 'neutral');
        } else if (value !== password) {
            this.showValidationMessage(messageDiv, 'Passwords do not match', 'error');
        } else {
            this.showValidationMessage(messageDiv, 'Passwords match', 'success');
        }
    }

    showValidationMessage(messageDiv, message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `validation-message ${type}`;
    }

    // Modal Functions
    showModal(type) {
        const overlay = document.getElementById('modal-overlay');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');

        if (type === 'confirmation') {
            title.textContent = 'Delete Item';
            body.innerHTML = `
                <p>Are you sure you want to delete this item? This action cannot be undone.</p>
                <div class="confirmation-details">
                    <strong>Item:</strong> Sample Product
                </div>
            `;
        } else if (type === 'form') {
            title.textContent = 'Quick Add';
            body.innerHTML = `
                <form class="modal-form">
                    <div class="form-group">
                        <label for="modal-name">Name</label>
                        <input type="text" id="modal-name" placeholder="Enter name">
                    </div>
                    <div class="form-group">
                        <label for="modal-email">Email</label>
                        <input type="email" id="modal-email" placeholder="Enter email">
                    </div>
                </form>
            `;
        }

        overlay.style.display = 'flex';
        setTimeout(() => overlay.classList.add('active'), 10);
    }

    closeModal() {
        const overlay = document.getElementById('modal-overlay');
        overlay.classList.remove('active');
        setTimeout(() => overlay.style.display = 'none', 300);
    }

    // Toast Functions
    showToast(type) {
        const container = document.getElementById('toast-container');
        const toastId = 'toast-' + Date.now();

        const toastMessages = {
            success: 'Operation completed successfully!',
            error: 'An error occurred. Please try again.',
            warning: 'Please check your input and try again.',
            info: 'Here\'s some helpful information for you.'
        };

        const toastIcons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="${toastIcons[type]}"></i>
            <span>${toastMessages[type]}</span>
            <button class="toast-close" onclick="window.uiuxManager.removeToast('${toastId}')">
                <i class="fas fa-times"></i>
            </button>
        `;

        container.appendChild(toast);

        // Auto remove after 4 seconds
        setTimeout(() => this.removeToast(toastId), 4000);
    }

    removeToast(toastId) {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }
    }

    // Loading Simulation
    simulateLoading(button) {
        const btnText = button.querySelector('.btn-text');
        const spinner = button.querySelector('.loading-spinner');

        btnText.style.display = 'none';
        spinner.style.display = 'inline-block';
        button.disabled = true;

        setTimeout(() => {
            btnText.style.display = 'inline';
            spinner.style.display = 'none';
            button.disabled = false;
            this.showToast('success');
        }, 2000);
    }

    startProgress() {
        const progressFill = document.getElementById('progress-fill');
        let progress = 0;

        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) {
                progress = 100;
                clearInterval(interval);
            }
            progressFill.style.width = progress + '%';
        }, 200);
    }

    // Quiz Implementation
    initializeQuiz() {
        const quizData = [
            {
                question: "What is the primary purpose of visual hierarchy in UI design?",
                options: [
                    "To make the design look more colorful",
                    "To guide users' attention through content",
                    "To use as many fonts as possible",
                    "To fill empty space"
                ],
                correct: 1
            },
            {
                question: "Which principle helps reduce cognitive load for users?",
                options: [
                    "Adding more features",
                    "Using bright colors everywhere",
                    "Simplicity and minimalism",
                    "Complex animations"
                ],
                correct: 2
            },
            {
                question: "What is an affordance in UI design?",
                options: [
                    "The cost of implementing a feature",
                    "Visual cues that suggest how to interact with elements",
                    "The time it takes to load a page",
                    "The number of users who can access the site"
                ],
                correct: 1
            },
            {
                question: "Why is consistency important in UI design?",
                options: [
                    "It makes development faster",
                    "It reduces file sizes",
                    "It creates predictability and reduces learning curve",
                    "It makes the design more colorful"
                ],
                correct: 2
            },
            {
                question: "What is the minimum color contrast ratio for normal text according to WCAG?",
                options: [
                    "3:1",
                    "4.5:1",
                    "7:1",
                    "2:1"
                ],
                correct: 1
            }
        ];

        this.renderQuiz(quizData, 'uiux-quiz');
    }

    renderQuiz(questions, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const quizHTML = questions.map((q, index) => `
            <div class="quiz-question">
                <h4>
                    <span class="question-number">${index + 1}</span>
                    ${q.question}
                </h4>
                <ul class="quiz-options">
                    ${q.options.map((option, optionIndex) => `
                        <li>
                            <label>
                                <input type="radio" name="uiux-question-${index}" value="${optionIndex}">
                                <span>${option}</span>
                            </label>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        container.innerHTML = quizHTML;
    }

    submitUIUXQuiz() {
        const questions = document.querySelectorAll('#uiux-quiz .quiz-question');
        const correctAnswers = [1, 2, 1, 2, 1];
        let score = 0;
        let total = questions.length;

        questions.forEach((question, index) => {
            const selectedOption = question.querySelector(`input[name="uiux-question-${index}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value) === correctAnswers[index]) {
                score++;
                question.classList.add('correct');
            } else {
                question.classList.add('incorrect');
            }
        });

        this.displayQuizResults(score, total, 'uiux-quiz-results');
    }

    resetUIUXQuiz() {
        // Reset all radio buttons
        const radios = document.querySelectorAll('#uiux-quiz input[type="radio"]');
        radios.forEach(radio => radio.checked = false);

        // Remove result classes
        const questions = document.querySelectorAll('#uiux-quiz .quiz-question');
        questions.forEach(question => {
            question.classList.remove('correct', 'incorrect');
        });

        // Hide results
        const resultsContainer = document.getElementById('uiux-quiz-results');
        resultsContainer.style.display = 'none';
    }

    displayQuizResults(score, total, containerId) {
        const resultsContainer = document.getElementById(containerId);
        const percentage = Math.round((score / total) * 100);

        let message, icon;
        if (percentage >= 80) {
            message = "Excellent! You have a solid understanding of UI/UX design principles.";
            icon = "fas fa-trophy";
        } else if (percentage >= 60) {
            message = "Good work! Review the principles you missed to strengthen your design skills.";
            icon = "fas fa-thumbs-up";
        } else {
            message = "Keep learning! Understanding these principles is crucial for creating great user experiences.";
            icon = "fas fa-book";
        }

        resultsContainer.innerHTML = `
            <h3><i class="${icon}"></i> Quiz Results</h3>
            <p>You scored <span>${score}</span> out of <span>${total}</span> (${percentage}%)</p>
            <p>${message}</p>
        `;
        resultsContainer.style.display = 'block';

        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // Utility Methods
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Global functions for HTML onclick events
function showPrincipleDetails(principle) {
    if (window.uiuxManager) {
        window.uiuxManager.showPrincipleDetails(principle);
    }
}

function updateDesign() {
    if (window.uiuxManager) {
        window.uiuxManager.updateDesign();
    }
}

function resetDesign() {
    if (window.uiuxManager) {
        window.uiuxManager.resetDesign();
    }
}

function randomizeDesign() {
    if (window.uiuxManager) {
        window.uiuxManager.randomizeDesign();
    }
}

function saveDesign() {
    if (window.uiuxManager) {
        window.uiuxManager.saveDesign();
    }
}

function showPattern(pattern) {
    if (window.uiuxManager) {
        window.uiuxManager.showPattern(pattern);
    }
}

function validateUsername(input) {
    if (window.uiuxManager) {
        window.uiuxManager.validateUsername(input);
    }
}

function validatePassword(input) {
    if (window.uiuxManager) {
        window.uiuxManager.validatePassword(input);
    }
}

function validateConfirmPassword(input) {
    if (window.uiuxManager) {
        window.uiuxManager.validateConfirmPassword(input);
    }
}

function showModal(type) {
    if (window.uiuxManager) {
        window.uiuxManager.showModal(type);
    }
}

function closeModal() {
    if (window.uiuxManager) {
        window.uiuxManager.closeModal();
    }
}

function showToast(type) {
    if (window.uiuxManager) {
        window.uiuxManager.showToast(type);
    }
}

function simulateLoading(button) {
    if (window.uiuxManager) {
        window.uiuxManager.simulateLoading(button);
    }
}

function startProgress() {
    if (window.uiuxManager) {
        window.uiuxManager.startProgress();
    }
}

function submitUIUXQuiz() {
    if (window.uiuxManager) {
        window.uiuxManager.submitUIUXQuiz();
    }
}

function resetUIUXQuiz() {
    if (window.uiuxManager) {
        window.uiuxManager.resetUIUXQuiz();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.uiuxManager = new UIUXDesignManager();
});

// Export design principles data for external use
window.uiuxDesignData = {
    principles: [
        'Visual Hierarchy',
        'Consistency',
        'Feedback',
        'Simplicity',
        'Affordance',
        'Accessibility'
    ],

    researchMethods: [
        'User Interviews',
        'Surveys',
        'Usability Testing',
        'Personas',
        'Card Sorting',
        'A/B Testing'
    ],

    commonPatterns: [
        'Navigation',
        'Forms',
        'Cards',
        'Modals',
        'Feedback Systems'
    ]
};
