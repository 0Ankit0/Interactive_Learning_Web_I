// Lists Links Images Topic JavaScript
// This file handles all interactive functionality for the Lists Links Images topic

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all interactive elements
    initializeProgressTracking();
    initializeQuizzes();
    initializeImageGallery();
    initializeListDemos();
    initializeLinkDemos();

    console.log('Lists Links Images topic JavaScript initialized');
});

// Progress tracking functionality
function initializeProgressTracking() {
    const progressFill = document.getElementById('topic-progress');
    if (!progressFill) return;

    // Calculate progress based on completed sections
    let progress = 0;
    const totalSections = document.querySelectorAll('.content-section').length;
    const completedSections = document.querySelectorAll('.content-section.completed').length;

    if (totalSections > 0) {
        progress = (completedSections / totalSections) * 100;
    }

    progressFill.style.width = progress + '%';
}

// Quiz functionality
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

    questions.forEach((question, index) => {
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

// Image gallery functionality
function initializeImageGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            img.addEventListener('click', function () {
                openImageModal(this);
            });
        }
    });
}

function openImageModal(img) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${img.src}" alt="${img.alt}">
                <div class="modal-caption">
                    <h4>${img.alt}</h4>
                </div>
            </div>
        </div>
    `;

    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.onclick = () => document.body.removeChild(modal);

    modal.onclick = (e) => {
        if (e.target === modal.querySelector('.modal-overlay')) {
            document.body.removeChild(modal);
        }
    };
}

// List demonstrations
function initializeListDemos() {
    createInteractiveListBuilder();
}

function createInteractiveListBuilder() {
    const builderContainer = document.getElementById('list-builder');
    if (!builderContainer) return;

    builderContainer.innerHTML = `
        <h4>Interactive List Builder</h4>
        <div class="builder-controls">
            <button onclick="addListItem('ul')" class="btn-primary">Add Unordered Item</button>
            <button onclick="addListItem('ol')" class="btn-primary">Add Ordered Item</button>
            <button onclick="clearList()" class="btn-secondary">Clear Lists</button>
        </div>
        <div class="list-preview">
            <div class="list-column">
                <h5>Unordered List</h5>
                <ul id="demo-ul"></ul>
            </div>
            <div class="list-column">
                <h5>Ordered List</h5>
                <ol id="demo-ol"></ol>
            </div>
        </div>
    `;
}

function addListItem(listType) {
    const list = document.getElementById(`demo-${listType}`);
    if (!list) return;

    const itemText = prompt('Enter list item text:');
    if (itemText) {
        const li = document.createElement('li');
        li.textContent = itemText;
        list.appendChild(li);
    }
}

function clearList() {
    const ul = document.getElementById('demo-ul');
    const ol = document.getElementById('demo-ol');

    if (ul) ul.innerHTML = '';
    if (ol) ol.innerHTML = '';
}

// Link demonstrations
function initializeLinkDemos() {
    createLinkTester();
}

function createLinkTester() {
    const testerContainer = document.getElementById('link-tester');
    if (!testerContainer) return;

    testerContainer.innerHTML = `
        <h4>Link Tester</h4>
        <div class="tester-controls">
            <input type="url" id="link-url" placeholder="Enter URL (e.g., https://example.com)">
            <input type="text" id="link-text" placeholder="Enter link text">
            <button onclick="createTestLink()" class="btn-primary">Create Link</button>
        </div>
        <div class="link-preview" id="link-preview">
            <p>Your generated link will appear here:</p>
        </div>
    `;
}

function createTestLink() {
    const urlInput = document.getElementById('link-url');
    const textInput = document.getElementById('link-text');
    const preview = document.getElementById('link-preview');

    if (!urlInput || !textInput || !preview) return;

    const url = urlInput.value.trim();
    const text = textInput.value.trim();

    if (!url || !text) {
        preview.innerHTML = '<p class="error">Please fill in both URL and text fields.</p>';
        return;
    }

    // Basic URL validation
    try {
        new URL(url);
    } catch (e) {
        preview.innerHTML = '<p class="error">Please enter a valid URL (include http:// or https://)</p>';
        return;
    }

    const link = document.createElement('a');
    link.href = url;
    link.textContent = text;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    preview.innerHTML = `
        <p><strong>Generated Link:</strong></p>
        <div class="generated-link">${link.outerHTML}</div>
        <p><strong>HTML Code:</strong></p>
        <code>&lt;a href="${url}" target="_blank" rel="noopener noreferrer"&gt;${text}&lt;/a&gt;</code>
    `;

    // Clear inputs
    urlInput.value = '';
    textInput.value = '';
}

// Navigation and scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Utility functions
function resetTopic() {
    // Clear quiz results
    const quizResults = document.getElementById('quiz-results');
    if (quizResults) {
        quizResults.remove();
    }

    // Clear quiz feedback
    const feedbacks = document.querySelectorAll('.question-feedback');
    feedbacks.forEach(feedback => feedback.remove());

    // Uncheck all radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => radio.checked = false);

    // Clear lists
    clearList();

    // Clear link preview
    const linkPreview = document.getElementById('link-preview');
    if (linkPreview) {
        linkPreview.innerHTML = '<p>Your generated link will appear here:</p>';
    }
}

// Export functions that might be called from HTML
window.submitQuiz = submitQuiz;
window.addListItem = addListItem;
window.clearList = clearList;
window.createTestLink = createTestLink;
window.scrollToSection = scrollToSection;
window.resetTopic = resetTopic;
