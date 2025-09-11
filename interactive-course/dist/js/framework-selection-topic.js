// Framework Selection Topic Interactive Functionality

class FrameworkSelectionManager {
    constructor() {
        this.currentCriteria = 'all';
        this.selectedAnswers = {};

        this.initializeEventListeners();
        this.initializeMatrix();
        this.initializeQuiz();
        this.animateScoreBars();
    }

    initializeEventListeners() {
        // Form reset functionality
        const form = document.getElementById('framework-selector-form');
        if (form) {
            form.addEventListener('reset', () => {
                this.resetRecommendation();
            });
        }

        // Matrix button active states
        const matrixButtons = document.querySelectorAll('.matrix-btn');
        matrixButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                matrixButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Set default active state
        if (matrixButtons.length > 0) {
            matrixButtons[0].classList.add('active');
        }
    }

    // Framework Recommendation Logic
    getFrameworkRecommendation() {
        const formData = new FormData(document.getElementById('framework-selector-form'));
        const answers = {};

        for (let [key, value] of formData.entries()) {
            answers[key] = value;
        }

        if (Object.keys(answers).length < 4) {
            this.showNotification('Please answer all questions to get a recommendation.', 'warning');
            return;
        }

        this.selectedAnswers = answers;
        const recommendation = this.calculateRecommendation(answers);
        this.displayRecommendation(recommendation);
    }

    calculateRecommendation(answers) {
        let scores = {
            'React': 0,
            'Angular': 0,
            'Vue': 0
        };

        // Project size scoring
        switch (answers.projectSize) {
            case 'small':
                scores.Vue += 3;
                scores.React += 2;
                scores.Angular += 1;
                break;
            case 'medium':
                scores.React += 3;
                scores.Vue += 2;
                scores.Angular += 2;
                break;
            case 'large':
                scores.Angular += 3;
                scores.React += 2;
                scores.Vue += 1;
                break;
        }

        // Team size scoring
        switch (answers.teamSize) {
            case 'solo':
                scores.Vue += 3;
                scores.React += 2;
                scores.Angular += 1;
                break;
            case 'small':
                scores.Vue += 2;
                scores.React += 2;
                scores.Angular += 1;
                break;
            case 'large':
                scores.Angular += 3;
                scores.React += 2;
                scores.Vue += 1;
                break;
        }

        // Timeline scoring
        switch (answers.timeline) {
            case 'short':
                scores.Vue += 3;
                scores.React += 2;
                scores.Angular += 1;
                break;
            case 'medium':
                scores.React += 2;
                scores.Vue += 2;
                scores.Angular += 2;
                break;
            case 'long':
                scores.Angular += 2;
                scores.React += 2;
                scores.Vue += 1;
                break;
        }

        // Complexity scoring
        switch (answers.complexity) {
            case 'low':
                scores.Vue += 3;
                scores.React += 2;
                scores.Angular += 1;
                break;
            case 'medium':
                scores.React += 3;
                scores.Vue += 2;
                scores.Angular += 2;
                break;
            case 'high':
                scores.Angular += 3;
                scores.React += 2;
                scores.Vue += 1;
                break;
        }

        // Find the highest scoring framework
        const sortedFrameworks = Object.entries(scores)
            .sort(([, a], [, b]) => b - a)
            .map(([framework, score]) => ({ framework, score }));

        return {
            recommended: sortedFrameworks[0],
            alternatives: sortedFrameworks.slice(1),
            scores: scores
        };
    }

    displayRecommendation(recommendation) {
        const container = document.getElementById('recommendation-result');
        const { recommended, alternatives, scores } = recommendation;

        const frameworkDetails = {
            'React': {
                icon: 'fab fa-react',
                color: '#61dafb',
                description: 'A flexible library perfect for building dynamic user interfaces.',
                strengths: ['Large ecosystem', 'Virtual DOM', 'Strong community', 'Job market'],
                considerations: ['Requires additional libraries', 'Learning JSX', 'Rapid updates']
            },
            'Angular': {
                icon: 'fab fa-angular',
                color: '#dd0031',
                description: 'A complete framework ideal for large-scale applications.',
                strengths: ['Complete solution', 'TypeScript built-in', 'Enterprise ready', 'Powerful CLI'],
                considerations: ['Steep learning curve', 'Complex for small projects', 'Large bundle size']
            },
            'Vue': {
                icon: 'fab fa-vuejs',
                color: '#4fc08d',
                description: 'A progressive framework that\'s easy to learn and adopt.',
                strengths: ['Gentle learning curve', 'Great documentation', 'Small size', 'Progressive adoption'],
                considerations: ['Smaller ecosystem', 'Less job demand', 'Fewer enterprise features']
            }
        };

        const details = frameworkDetails[recommended.framework];

        container.innerHTML = `
            <div class="recommendation-card">
                <div class="recommendation-header">
                    <div class="framework-icon" style="color: ${details.color}">
                        <i class="${details.icon}"></i>
                    </div>
                    <div class="recommendation-text">
                        <h3>We recommend: ${recommended.framework}</h3>
                        <p class="confidence">Confidence: ${Math.round((recommended.score / 12) * 100)}%</p>
                    </div>
                </div>
                
                <div class="recommendation-details">
                    <p class="framework-description">${details.description}</p>
                    
                    <div class="pros-cons">
                        <div class="pros">
                            <h4><i class="fas fa-thumbs-up"></i> Strengths</h4>
                            <ul>
                                ${details.strengths.map(strength => `<li>${strength}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="cons">
                            <h4><i class="fas fa-exclamation-triangle"></i> Considerations</h4>
                            <ul>
                                ${details.considerations.map(consideration => `<li>${consideration}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="score-breakdown">
                        <h4>Score Breakdown</h4>
                        <div class="score-bars">
                            ${Object.entries(scores).map(([framework, score]) => `
                                <div class="score-item">
                                    <span class="framework-name">${framework}</span>
                                    <div class="score-bar-container">
                                        <div class="score-bar" style="width: ${(score / 12) * 100}%"></div>
                                    </div>
                                    <span class="score-value">${score}/12</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="alternatives">
                        <h4>Alternative Options</h4>
                        <div class="alternative-frameworks">
                            ${alternatives.map(alt => {
            const altDetails = frameworkDetails[alt.framework];
            return `
                                    <div class="alternative-item">
                                        <i class="${altDetails.icon}" style="color: ${altDetails.color}"></i>
                                        <span>${alt.framework}</span>
                                        <small>(Score: ${alt.score}/12)</small>
                                    </div>
                                `;
        }).join('')}
                        </div>
                    </div>
                    
                    <div class="next-steps">
                        <h4>Next Steps</h4>
                        <ol>
                            <li>Try building a small prototype with ${recommended.framework}</li>
                            <li>Explore the official documentation and tutorials</li>
                            <li>Consider team training needs and timeline</li>
                            <li>Evaluate against your specific technical requirements</li>
                        </ol>
                    </div>
                </div>
            </div>
        `;

        container.style.display = 'block';
        container.scrollIntoView({ behavior: 'smooth' });

        this.showNotification(`Based on your answers, we recommend ${recommended.framework}!`, 'success');
    }

    resetRecommendation() {
        const container = document.getElementById('recommendation-result');
        container.style.display = 'none';
        this.selectedAnswers = {};
    }

    // Matrix functionality
    initializeMatrix() {
        this.animateScoreBars();
    }

    animateScoreBars() {
        const scoreFills = document.querySelectorAll('.score-fill');

        scoreFills.forEach((fill, index) => {
            setTimeout(() => {
                const score = parseInt(fill.dataset.score);
                const percentage = (score / 10) * 100;
                fill.style.width = percentage + '%';
            }, index * 100);
        });
    }

    showCriteria(criteria) {
        this.currentCriteria = criteria;
        const rows = document.querySelectorAll('.matrix-table tbody tr');

        rows.forEach(row => {
            if (criteria === 'all') {
                row.style.display = '';
            } else {
                if (row.classList.contains(criteria)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
    }

    // Checklist functionality
    generateChecklistSummary() {
        const checkedItems = document.querySelectorAll('.checklist-item input:checked');
        const totalItems = document.querySelectorAll('.checklist-item input').length;
        const percentage = Math.round((checkedItems.length / totalItems) * 100);

        const categories = {
            'Technical Considerations': 0,
            'Team & Development': 0,
            'Business Factors': 0
        };

        const categoryTotals = {
            'Technical Considerations': 4,
            'Team & Development': 4,
            'Business Factors': 4
        };

        // Count checked items by category
        document.querySelectorAll('.checklist-category').forEach(category => {
            const categoryTitle = category.querySelector('h3').textContent.trim();
            const checkedInCategory = category.querySelectorAll('input:checked').length;

            if (categories.hasOwnProperty(categoryTitle)) {
                categories[categoryTitle] = checkedInCategory;
            }
        });

        const resultsContainer = document.getElementById('checklist-results');

        let readinessLevel, readinessIcon, readinessColor;
        if (percentage >= 80) {
            readinessLevel = 'Ready to Choose';
            readinessIcon = 'fas fa-check-circle';
            readinessColor = '#4CAF50';
        } else if (percentage >= 60) {
            readinessLevel = 'Nearly Ready';
            readinessIcon = 'fas fa-clock';
            readinessColor = '#FF9800';
        } else {
            readinessLevel = 'More Research Needed';
            readinessIcon = 'fas fa-exclamation-triangle';
            readinessColor = '#f44336';
        }

        resultsContainer.innerHTML = `
            <div class="summary-card">
                <div class="readiness-indicator" style="color: ${readinessColor}">
                    <i class="${readinessIcon}"></i>
                    <h3>${readinessLevel}</h3>
                    <p>You've considered ${checkedItems.length} of ${totalItems} factors (${percentage}%)</p>
                </div>
                
                <div class="category-breakdown">
                    <h4>Category Breakdown</h4>
                    ${Object.entries(categories).map(([category, count]) => {
            const total = categoryTotals[category];
            const categoryPercentage = Math.round((count / total) * 100);
            return `
                            <div class="category-score">
                                <span class="category-name">${category}</span>
                                <div class="category-bar">
                                    <div class="category-fill" style="width: ${categoryPercentage}%"></div>
                                </div>
                                <span class="category-percentage">${count}/${total}</span>
                            </div>
                        `;
        }).join('')}
                </div>
                
                <div class="recommendations">
                    <h4>Recommendations</h4>
                    ${percentage < 60 ? `
                        <p><i class="fas fa-lightbulb"></i> Consider spending more time on evaluation before making a final decision.</p>
                    ` : percentage < 80 ? `
                        <p><i class="fas fa-info-circle"></i> You're on the right track! Address the remaining considerations for a more confident choice.</p>
                    ` : `
                        <p><i class="fas fa-trophy"></i> Excellent! You've thoroughly evaluated the key factors for framework selection.</p>
                    `}
                </div>
            </div>
        `;

        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // Quiz Implementation
    initializeQuiz() {
        const quizData = [
            {
                question: "What should be your first step when choosing a framework?",
                options: [
                    "Pick the most popular one",
                    "Define your project requirements",
                    "Choose what your team already knows",
                    "Select the newest framework"
                ],
                correct: 1
            },
            {
                question: "Which factor is most important for a small startup's MVP?",
                options: [
                    "Enterprise features",
                    "Learning curve and development speed",
                    "Maximum performance optimization",
                    "Large team collaboration tools"
                ],
                correct: 1
            },
            {
                question: "What makes Angular particularly suitable for enterprise applications?",
                options: [
                    "Smallest bundle size",
                    "Easiest to learn",
                    "Built-in TypeScript and opinionated architecture",
                    "Best performance"
                ],
                correct: 2
            },
            {
                question: "When should you consider Vue.js over React or Angular?",
                options: [
                    "For maximum job market opportunities",
                    "When you need the largest ecosystem",
                    "For quick prototyping and gradual adoption",
                    "For the most complex applications"
                ],
                correct: 2
            },
            {
                question: "What's the best approach to evaluating frameworks?",
                options: [
                    "Read online comparisons only",
                    "Build prototypes and test with your use case",
                    "Choose based on popularity alone",
                    "Ask on social media for opinions"
                ],
                correct: 1
            }
        ];

        this.renderQuiz(quizData, 'selection-quiz');
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
                                <input type="radio" name="selection-question-${index}" value="${optionIndex}">
                                <span>${option}</span>
                            </label>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        container.innerHTML = quizHTML;
    }

    submitSelectionQuiz() {
        const questions = document.querySelectorAll('#selection-quiz .quiz-question');
        const correctAnswers = [1, 1, 2, 2, 1];
        let score = 0;
        let total = questions.length;

        questions.forEach((question, index) => {
            const selectedOption = question.querySelector(`input[name="selection-question-${index}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value) === correctAnswers[index]) {
                score++;
                question.classList.add('correct');
            } else {
                question.classList.add('incorrect');
            }
        });

        this.displayQuizResults(score, total, 'selection-quiz-results');
    }

    resetSelectionQuiz() {
        // Reset all radio buttons
        const radios = document.querySelectorAll('#selection-quiz input[type="radio"]');
        radios.forEach(radio => radio.checked = false);

        // Remove result classes
        const questions = document.querySelectorAll('#selection-quiz .quiz-question');
        questions.forEach(question => {
            question.classList.remove('correct', 'incorrect');
        });

        // Hide results
        const resultsContainer = document.getElementById('selection-quiz-results');
        resultsContainer.style.display = 'none';
    }

    displayQuizResults(score, total, containerId) {
        const resultsContainer = document.getElementById(containerId);
        const percentage = Math.round((score / total) * 100);

        let message, icon;
        if (percentage >= 80) {
            message = "Excellent! You understand the key principles of framework selection.";
            icon = "fas fa-trophy";
        } else if (percentage >= 60) {
            message = "Good job! Review the concepts you missed to improve your decision-making skills.";
            icon = "fas fa-thumbs-up";
        } else {
            message = "Keep learning! Understanding framework selection criteria is crucial for project success.";
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

        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }
}

// Global functions for HTML onclick events
function getRecommendation() {
    if (window.frameworkSelectionManager) {
        window.frameworkSelectionManager.getFrameworkRecommendation();
    }
}

function showCriteria(criteria) {
    if (window.frameworkSelectionManager) {
        window.frameworkSelectionManager.showCriteria(criteria);
    }
}

function generateChecklistSummary() {
    if (window.frameworkSelectionManager) {
        window.frameworkSelectionManager.generateChecklistSummary();
    }
}

function submitSelectionQuiz() {
    if (window.frameworkSelectionManager) {
        window.frameworkSelectionManager.submitSelectionQuiz();
    }
}

function resetSelectionQuiz() {
    if (window.frameworkSelectionManager) {
        window.frameworkSelectionManager.resetSelectionQuiz();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.frameworkSelectionManager = new FrameworkSelectionManager();
});

// Export framework selection data for external use
window.frameworkSelectionData = {
    criteria: {
        technical: [
            'Performance Requirements',
            'Bundle Size',
            'Browser Compatibility',
            'Mobile Responsiveness'
        ],
        team: [
            'Learning Curve',
            'Development Tools',
            'Testing Support',
            'Code Architecture'
        ],
        business: [
            'Long-term Viability',
            'Talent Availability',
            'Cost Considerations',
            'Scalability'
        ]
    },

    scenarios: {
        ecommerce: {
            name: 'E-commerce Platform',
            requirements: ['Fast loading', 'SEO optimization', 'Payment integration'],
            recommended: 'React',
            reason: 'Server-side rendering capabilities and rich ecosystem'
        },
        enterprise: {
            name: 'Enterprise Dashboard',
            requirements: ['Complex data', 'TypeScript', 'Team collaboration'],
            recommended: 'Angular',
            reason: 'Built-in TypeScript and enterprise-ready architecture'
        },
        mvp: {
            name: 'Startup MVP',
            requirements: ['Rapid development', 'Small team', 'Quick iterations'],
            recommended: 'Vue',
            reason: 'Easy learning curve and quick setup'
        },
        mobile: {
            name: 'Cross-Platform Mobile',
            requirements: ['iOS/Android support', 'Code reusability', 'Native performance'],
            recommended: 'React',
            reason: 'React Native ecosystem and shared codebase'
        }
    }
};
