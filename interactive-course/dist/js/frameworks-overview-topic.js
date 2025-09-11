// Frameworks Overview Topic Interactive Functionality

class FrameworksTopicManager {
    constructor() {
        this.reactCount = 0;
        this.angularCount = 0;
        this.vueCount = 0;
        this.currentFilter = 'all';

        this.initializeEventListeners();
        this.initializeQuiz();
        this.initializeComparison();
        this.animateCharts();
    }

    initializeEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterChange(e.target.dataset.filter));
        });

        // Tab switching for comparison
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
    }

    // Counter Demo Functions
    reactIncrement() {
        this.reactCount++;
        document.getElementById('react-count').textContent = this.reactCount;
        this.animateCounter('react-count');
    }

    reactDecrement() {
        this.reactCount--;
        document.getElementById('react-count').textContent = this.reactCount;
        this.animateCounter('react-count');
    }

    angularIncrement() {
        this.angularCount++;
        document.getElementById('angular-count').textContent = this.angularCount;
        this.animateCounter('angular-count');
    }

    angularDecrement() {
        this.angularCount--;
        document.getElementById('angular-count').textContent = this.angularCount;
        this.animateCounter('angular-count');
    }

    vueIncrement() {
        this.vueCount++;
        document.getElementById('vue-count').textContent = this.vueCount;
        this.animateCounter('vue-count');
    }

    vueDecrement() {
        this.vueCount--;
        document.getElementById('vue-count').textContent = this.vueCount;
        this.animateCounter('vue-count');
    }

    animateCounter(counterId) {
        const element = document.getElementById(counterId);
        element.style.transform = 'scale(1.2)';
        element.style.color = '#4CAF50';

        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 200);
    }

    // Chart Animation
    animateCharts() {
        const chartBars = document.querySelectorAll('.chart-bar');

        chartBars.forEach((bar, index) => {
            setTimeout(() => {
                const percentage = bar.dataset.percentage;
                bar.style.width = percentage + '%';
            }, index * 300);
        });
    }

    // Filter Functionality
    handleFilterChange(filter) {
        this.currentFilter = filter;

        // Update button states
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });

        // Filter recommendations
        this.filterRecommendations(filter);
    }

    filterRecommendations(filter) {
        const recommendations = document.querySelectorAll('.recommendation-item');

        recommendations.forEach(item => {
            if (filter === 'all') {
                item.style.display = 'block';
            } else {
                const projectType = item.dataset.project;
                item.style.display = projectType === filter ? 'block' : 'none';
            }
        });
    }

    // Comparison Functionality
    initializeComparison() {
        this.createInteractiveComparison();
    }

    createInteractiveComparison() {
        const comparisonData = {
            'learning-curve': {
                'React': { value: 6, description: 'Moderate - JSX and concepts' },
                'Angular': { value: 9, description: 'Steep - TypeScript and architecture' },
                'Vue': { value: 3, description: 'Easy - template-based approach' }
            },
            'performance': {
                'React': { value: 9, description: 'Virtual DOM optimization' },
                'Angular': { value: 7, description: 'Good with proper optimization' },
                'Vue': { value: 9, description: 'Reactive system efficiency' }
            },
            'ecosystem': {
                'React': { value: 10, description: 'Huge library ecosystem' },
                'Angular': { value: 8, description: 'Complete framework solution' },
                'Vue': { value: 6, description: 'Growing ecosystem' }
            },
            'job-market': {
                'React': { value: 10, description: 'Highest demand' },
                'Angular': { value: 7, description: 'Enterprise demand' },
                'Vue': { value: 5, description: 'Growing demand' }
            }
        };

        // Store comparison data for potential future use
        this.comparisonData = comparisonData;
    }

    // Tab Switching
    switchTab(tabId) {
        // Remove active class from all tabs and panels
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

        // Add active class to clicked tab and corresponding panel
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(`${tabId}-panel`).classList.add('active');
    }

    // Quiz Implementation
    initializeQuiz() {
        const quizData = [
            {
                question: "Which framework was created by Facebook?",
                options: [
                    "Angular",
                    "Vue.js",
                    "React",
                    "Svelte"
                ],
                correct: 2
            },
            {
                question: "Which framework is known for its gentle learning curve?",
                options: [
                    "Angular",
                    "React",
                    "Vue.js",
                    "All are equally easy"
                ],
                correct: 2
            },
            {
                question: "What is Angular's default programming language?",
                options: [
                    "JavaScript",
                    "TypeScript",
                    "CoffeeScript",
                    "Dart"
                ],
                correct: 1
            },
            {
                question: "Which framework uses JSX syntax?",
                options: [
                    "Angular",
                    "Vue.js",
                    "React",
                    "Ember.js"
                ],
                correct: 2
            },
            {
                question: "Which is the best framework for large enterprise applications?",
                options: [
                    "Vue.js",
                    "React",
                    "Angular",
                    "It depends on the requirements"
                ],
                correct: 3
            }
        ];

        this.renderQuiz(quizData);
    }

    renderQuiz(questions) {
        const container = document.getElementById('frameworks-quiz');
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
                                <input type="radio" name="question-${index}" value="${optionIndex}">
                                <span>${option}</span>
                            </label>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        container.innerHTML = quizHTML;
    }

    submitFrameworksQuiz() {
        const questions = document.querySelectorAll('.quiz-question');
        const correctAnswers = [2, 2, 1, 2, 3];
        let score = 0;
        let total = questions.length;

        questions.forEach((question, index) => {
            const selectedOption = question.querySelector(`input[name="question-${index}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value) === correctAnswers[index]) {
                score++;
                question.classList.add('correct');
            } else {
                question.classList.add('incorrect');
            }
        });

        this.displayQuizResults(score, total);
    }

    displayQuizResults(score, total) {
        const resultsContainer = document.getElementById('frameworks-quiz-results');
        const percentage = Math.round((score / total) * 100);

        let message, icon;
        if (percentage >= 80) {
            message = "Excellent! You have a great understanding of JavaScript frameworks.";
            icon = "fas fa-trophy";
        } else if (percentage >= 60) {
            message = "Good job! Review the frameworks you missed to improve further.";
            icon = "fas fa-thumbs-up";
        } else {
            message = "Keep learning! Review the framework concepts and try again.";
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

    resetFrameworksQuiz() {
        // Reset all radio buttons
        const radios = document.querySelectorAll('#frameworks-quiz input[type="radio"]');
        radios.forEach(radio => radio.checked = false);

        // Remove result classes
        const questions = document.querySelectorAll('.quiz-question');
        questions.forEach(question => {
            question.classList.remove('correct', 'incorrect');
        });

        // Hide results
        const resultsContainer = document.getElementById('frameworks-quiz-results');
        resultsContainer.style.display = 'none';
    }

    // Framework Selector Logic
    getFrameworkRecommendation(projectSize, teamSize, timeline, complexity) {
        let scores = {
            'React': 0,
            'Angular': 0,
            'Vue': 0
        };

        // Project size scoring
        if (projectSize === 'small') {
            scores.Vue += 3;
            scores.React += 2;
            scores.Angular += 1;
        } else if (projectSize === 'medium') {
            scores.React += 3;
            scores.Vue += 2;
            scores.Angular += 2;
        } else if (projectSize === 'large') {
            scores.Angular += 3;
            scores.React += 2;
            scores.Vue += 1;
        }

        // Team size scoring
        if (teamSize === 'small') {
            scores.Vue += 2;
            scores.React += 1;
        } else if (teamSize === 'large') {
            scores.Angular += 2;
            scores.React += 1;
        }

        // Timeline scoring
        if (timeline === 'short') {
            scores.Vue += 2;
            scores.React += 1;
        } else if (timeline === 'long') {
            scores.Angular += 1;
        }

        // Complexity scoring
        if (complexity === 'low') {
            scores.Vue += 2;
        } else if (complexity === 'high') {
            scores.Angular += 2;
            scores.React += 1;
        }

        // Find the highest scoring framework
        const recommendedFramework = Object.keys(scores).reduce((a, b) =>
            scores[a] > scores[b] ? a : b
        );

        return {
            framework: recommendedFramework,
            score: scores[recommendedFramework],
            scores: scores
        };
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

    // Animation helpers
    animateElement(element, animation) {
        element.style.animation = animation;
        element.addEventListener('animationend', () => {
            element.style.animation = '';
        }, { once: true });
    }
}

// Global functions for HTML onclick events
function reactIncrement() {
    if (window.frameworksManager) {
        window.frameworksManager.reactIncrement();
    }
}

function reactDecrement() {
    if (window.frameworksManager) {
        window.frameworksManager.reactDecrement();
    }
}

function angularIncrement() {
    if (window.frameworksManager) {
        window.frameworksManager.angularIncrement();
    }
}

function angularDecrement() {
    if (window.frameworksManager) {
        window.frameworksManager.angularDecrement();
    }
}

function vueIncrement() {
    if (window.frameworksManager) {
        window.frameworksManager.vueIncrement();
    }
}

function vueDecrement() {
    if (window.frameworksManager) {
        window.frameworksManager.vueDecrement();
    }
}

function submitFrameworksQuiz() {
    if (window.frameworksManager) {
        window.frameworksManager.submitFrameworksQuiz();
    }
}

function resetFrameworksQuiz() {
    if (window.frameworksManager) {
        window.frameworksManager.resetFrameworksQuiz();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.frameworksManager = new FrameworksTopicManager();
});

// Framework comparison data for external use
window.frameworkData = {
    frameworks: {
        'React': {
            name: 'React',
            creator: 'Facebook',
            year: 2013,
            type: 'Library',
            learningCurve: 'Moderate',
            popularity: 45,
            strengths: ['Large ecosystem', 'Virtual DOM', 'Flexibility', 'Job market'],
            weaknesses: ['Requires additional libraries', 'JSX learning curve', 'Rapid updates'],
            bestFor: ['SPAs', 'Mobile apps (React Native)', 'Large applications'],
            website: 'https://react.dev/'
        },
        'Angular': {
            name: 'Angular',
            creator: 'Google',
            year: 2016,
            type: 'Framework',
            learningCurve: 'Steep',
            popularity: 25,
            strengths: ['Complete framework', 'TypeScript', 'Enterprise ready', 'Powerful CLI'],
            weaknesses: ['Complex', 'Large bundle size', 'Steep learning curve'],
            bestFor: ['Enterprise applications', 'Large teams', 'Complex apps'],
            website: 'https://angular.io/'
        },
        'Vue': {
            name: 'Vue.js',
            creator: 'Evan You',
            year: 2014,
            type: 'Progressive Framework',
            learningCurve: 'Easy',
            popularity: 30,
            strengths: ['Easy to learn', 'Great docs', 'Small size', 'Progressive'],
            weaknesses: ['Smaller ecosystem', 'Less job demand', 'Fewer resources'],
            bestFor: ['Prototypes', 'Small to medium apps', 'Gradual adoption'],
            website: 'https://vuejs.org/'
        }
    }
};
