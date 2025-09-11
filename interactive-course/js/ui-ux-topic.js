/**
 * UI/UX Design Topic Interactive Features
 * Handles wireframing tool, user stories, and quiz functionality
 */

class UIUXTopic {
    constructor() {
        this.initializeEventListeners();
        this.initializeWireframeCanvas();
        this.initializeUserStories();
        this.initializeQuiz();
        this.userStories = [];
        this.currentElementCounter = 0;
    }

    initializeEventListeners() {
        // Initialize drag and drop for wireframing
        this.initializeDragAndDrop();

        // User story form submission
        const userStoryForm = document.getElementById('user-story-form');
        if (userStoryForm) {
            userStoryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addUserStory();
            });
        }

        // Feedback demo button
        window.showFeedback = () => this.showFeedbackDemo();
    }

    initializeDragAndDrop() {
        const elementItems = document.querySelectorAll('.element-item');
        const canvas = document.getElementById('wireframe-canvas');

        if (!canvas) return;

        // Make elements draggable
        elementItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.element);
                e.target.classList.add('dragging');
            });

            item.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });

        // Canvas drop handling
        canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
            canvas.classList.add('drag-over');
        });

        canvas.addEventListener('dragleave', (e) => {
            if (!canvas.contains(e.relatedTarget)) {
                canvas.classList.remove('drag-over');
            }
        });

        canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            canvas.classList.remove('drag-over');

            const elementType = e.dataTransfer.getData('text/plain');
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.addWireframeElement(elementType, x, y);
        });
    }

    initializeWireframeCanvas() {
        // Remove placeholder when first element is added
        window.clearWireframe = () => this.clearWireframe();
        window.saveWireframe = () => this.saveWireframe();
    }

    addWireframeElement(type, x, y) {
        const canvas = document.getElementById('wireframe-canvas');
        const placeholder = canvas.querySelector('.canvas-placeholder');

        if (placeholder) {
            placeholder.remove();
        }

        const element = document.createElement('div');
        element.className = `wireframe-element ${type}-element`;
        element.style.left = `${Math.max(0, x - 50)}px`;
        element.style.top = `${Math.max(0, y - 25)}px`;
        element.dataset.elementType = type;
        element.dataset.elementId = `element-${++this.currentElementCounter}`;

        // Add content based on element type
        const content = this.getWireframeElementContent(type);
        element.innerHTML = content;

        // Make element draggable within canvas
        this.makeElementDraggable(element);

        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-element';
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
        deleteBtn.onclick = () => element.remove();
        element.appendChild(deleteBtn);

        canvas.appendChild(element);

        // Animate appearance
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, 10);
    }

    getWireframeElementContent(type) {
        const contents = {
            header: '<div class="wireframe-content"><i class="fas fa-window-maximize"></i><span>Header Section</span></div>',
            text: '<div class="wireframe-content"><i class="fas fa-align-left"></i><span>Text Content</span></div>',
            button: '<div class="wireframe-content"><i class="fas fa-mouse-pointer"></i><span>Button</span></div>',
            image: '<div class="wireframe-content"><i class="fas fa-image"></i><span>Image Placeholder</span></div>',
            form: '<div class="wireframe-content"><i class="fas fa-wpforms"></i><span>Form Fields</span></div>'
        };
        return contents[type] || '<div class="wireframe-content">Element</div>';
    }

    makeElementDraggable(element) {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        element.addEventListener('mousedown', (e) => {
            if (e.target.closest('.delete-element')) return;

            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = parseInt(element.style.left) || 0;
            initialY = parseInt(element.style.top) || 0;

            element.style.zIndex = '1000';
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        });

        const handleMouseMove = (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            element.style.left = `${initialX + deltaX}px`;
            element.style.top = `${initialY + deltaY}px`;
        };

        const handleMouseUp = () => {
            isDragging = false;
            element.style.zIndex = '';
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }

    clearWireframe() {
        const canvas = document.getElementById('wireframe-canvas');
        const elements = canvas.querySelectorAll('.wireframe-element');

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'scale(0.8)';
            setTimeout(() => element.remove(), 200);
        });

        setTimeout(() => {
            if (canvas.children.length === 0) {
                const placeholder = document.createElement('div');
                placeholder.className = 'canvas-placeholder';
                placeholder.textContent = 'Drag elements here to create your wireframe';
                canvas.appendChild(placeholder);
            }
        }, 300);
    }

    saveWireframe() {
        const canvas = document.getElementById('wireframe-canvas');
        const elements = canvas.querySelectorAll('.wireframe-element');

        const wireframeData = Array.from(elements).map(element => ({
            type: element.dataset.elementType,
            id: element.dataset.elementId,
            x: parseInt(element.style.left),
            y: parseInt(element.style.top)
        }));

        // Store in localStorage
        localStorage.setItem('wireframe-design', JSON.stringify(wireframeData));

        // Show success message
        this.showNotification('Wireframe saved successfully!', 'success');
    }

    // User Stories functionality
    initializeUserStories() {
        this.userStories = JSON.parse(localStorage.getItem('user-stories') || '[]');
        this.renderUserStories();
    }

    addUserStory() {
        const userType = document.getElementById('user-type').value;
        const userWant = document.getElementById('user-want').value.trim();
        const userBenefit = document.getElementById('user-benefit').value.trim();

        if (!userWant || !userBenefit) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        const story = {
            id: Date.now(),
            userType,
            want: userWant,
            benefit: userBenefit,
            priority: 'medium',
            status: 'backlog'
        };

        this.userStories.push(story);
        this.saveUserStories();
        this.renderUserStories();

        // Clear form
        document.getElementById('user-want').value = '';
        document.getElementById('user-benefit').value = '';

        this.showNotification('User story added successfully!', 'success');
    }

    renderUserStories() {
        const container = document.getElementById('stories-container');
        if (!container) return;

        if (this.userStories.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list"></i>
                    <p>Create your first user story using the form</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.userStories.map(story => `
            <div class="user-story-card" data-story-id="${story.id}">
                <div class="story-header">
                    <span class="story-priority ${story.priority}">${story.priority}</span>
                    <span class="story-status ${story.status}">${story.status}</span>
                    <button class="delete-story" onclick="uiuxTopic.deleteUserStory(${story.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="story-content">
                    <p><strong>As a</strong> ${story.userType}</p>
                    <p><strong>I want to</strong> ${story.want}</p>
                    <p><strong>So that</strong> ${story.benefit}</p>
                </div>
                <div class="story-actions">
                    <select onchange="uiuxTopic.updateStoryPriority(${story.id}, this.value)">
                        <option value="low" ${story.priority === 'low' ? 'selected' : ''}>Low Priority</option>
                        <option value="medium" ${story.priority === 'medium' ? 'selected' : ''}>Medium Priority</option>
                        <option value="high" ${story.priority === 'high' ? 'selected' : ''}>High Priority</option>
                    </select>
                    <select onchange="uiuxTopic.updateStoryStatus(${story.id}, this.value)">
                        <option value="backlog" ${story.status === 'backlog' ? 'selected' : ''}>Backlog</option>
                        <option value="in-progress" ${story.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                        <option value="done" ${story.status === 'done' ? 'selected' : ''}>Done</option>
                    </select>
                </div>
            </div>
        `).join('');
    }

    deleteUserStory(id) {
        this.userStories = this.userStories.filter(story => story.id !== id);
        this.saveUserStories();
        this.renderUserStories();
        this.showNotification('User story deleted', 'info');
    }

    updateStoryPriority(id, priority) {
        const story = this.userStories.find(s => s.id === id);
        if (story) {
            story.priority = priority;
            this.saveUserStories();
            this.renderUserStories();
        }
    }

    updateStoryStatus(id, status) {
        const story = this.userStories.find(s => s.id === id);
        if (story) {
            story.status = status;
            this.saveUserStories();
            this.renderUserStories();
        }
    }

    saveUserStories() {
        localStorage.setItem('user-stories', JSON.stringify(this.userStories));
    }

    // Feedback demo
    showFeedbackDemo() {
        const button = document.querySelector('.feedback-btn');
        const result = document.getElementById('feedback-result');

        button.style.transform = 'scale(0.95)';
        button.textContent = 'Processing...';

        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.textContent = 'Click for Feedback';
            result.innerHTML = `
                <div class="feedback-message success">
                    <i class="fas fa-check-circle"></i>
                    Action completed successfully!
                </div>
            `;

            setTimeout(() => {
                result.innerHTML = '';
            }, 3000);
        }, 1000);
    }

    // Quiz functionality
    initializeQuiz() {
        const quizQuestions = [
            {
                question: "What is the primary purpose of a wireframe?",
                options: [
                    "To add visual design and colors",
                    "To show the basic structure and layout",
                    "To implement the final functionality",
                    "To test the website performance"
                ],
                correct: 1,
                explanation: "Wireframes focus on structure and layout, not visual design or functionality."
            },
            {
                question: "Which principle helps users understand what's most important on a page?",
                options: [
                    "Consistency",
                    "Visual Hierarchy",
                    "Feedback",
                    "Accessibility"
                ],
                correct: 1,
                explanation: "Visual hierarchy uses size, color, and positioning to guide attention to important elements."
            },
            {
                question: "What format should a user story follow?",
                options: [
                    "As a [user], I need [feature] because [reason]",
                    "As a [user], I want [goal] so that [benefit]",
                    "The user should be able to [action] when [condition]",
                    "Feature: [name], Description: [details]"
                ],
                correct: 1,
                explanation: "User stories follow the format: As a [user], I want [goal] so that [benefit]."
            },
            {
                question: "Which is NOT a key principle of good UI design?",
                options: [
                    "Consistency in design patterns",
                    "Clear visual hierarchy",
                    "Complex navigation menus",
                    "Immediate user feedback"
                ],
                correct: 2,
                explanation: "Complex navigation menus make interfaces harder to use, not better."
            }
        ];

        this.renderQuiz(quizQuestions, 'uiux-quiz');

        // Make quiz functions globally available
        window.submitUIUXQuiz = () => this.submitQuiz('uiux-quiz', quizQuestions);
        window.resetUIUXQuiz = () => this.resetQuiz('uiux-quiz', quizQuestions);
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

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.uiuxTopic = new UIUXTopic();
});
