// HTML Introduction Topic JavaScript
// This file handles all interactive functionality for the HTML Introduction topic

document.addEventListener('DOMContentLoaded', function () {
    // Initialize topic progress tracking
    initializeProgressTracking();

    // Initialize all interactive elements
    initializeHTMLPlayground();
    initializeFormattingTools();
    initializeQuizzes();
    initializeTagBuilder();

    // Run initial HTML code in the editor
    runHTML();

    console.log('HTML Introduction topic JavaScript initialized');
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

// HTML Code playground functionality
function initializeHTMLPlayground() {
    // This would be implemented if there's an HTML playground in the topic
}

function runHTML() {
    const code = document.getElementById('html-editor');
    const iframe = document.getElementById('preview-frame');

    if (code && iframe) {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.open();
        doc.write(code.value);
        doc.close();
    }
}

// Text formatting tools
function initializeFormattingTools() {
    // Add event listeners for formatting buttons if they exist
    const formattingButtons = document.querySelectorAll('[onclick*="applyFormatting"]');
    formattingButtons.forEach(button => {
        const match = button.getAttribute('onclick').match(/applyFormatting\('(.+?)'\)/);
        if (match) {
            const formatType = match[1];
            button.onclick = () => applyFormatting(formatType);
        }
    });
}

function applyFormatting(type) {
    const display = document.getElementById('format-display');
    if (!display) return;

    const text = display.querySelector('p');
    if (!text) return;

    // Reset styles
    text.style.cssText = '';

    switch (type) {
        case 'bold':
            text.innerHTML = '<strong>This text is now bold!</strong>';
            break;
        case 'italic':
            text.innerHTML = '<em>This text is now italic!</em>';
            break;
        case 'underline':
            text.innerHTML = '<u>This text is now underlined!</u>';
            break;
        case 'highlight':
            text.innerHTML = '<mark>This text is now highlighted!</mark>';
            break;
    }
}

// Quiz functionality
function initializeQuizzes() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        if (option.hasAttribute('onclick')) {
            const onclickAttr = option.getAttribute('onclick');
            const match = onclickAttr.match(/checkAnswer\(this,\s*(true|false)\)/);
            if (match) {
                const isCorrect = match[1] === 'true';
                option.onclick = () => checkAnswer(option, isCorrect);
            }
        }
    });
}

function checkAnswer(element, isCorrect) {
    // Remove previous states
    const allOptions = element.parentNode.querySelectorAll('.quiz-option');
    allOptions.forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
    });

    // Add appropriate class
    if (isCorrect) {
        element.classList.add('correct');
        showFeedback('Correct! Well done!', 'success');
    } else {
        element.classList.add('incorrect');
        showFeedback('Not quite right. Try again!', 'error');
    }
}

// Tag builder game and matching game
let draggedElement = null;

function initializeTagBuilder() {
    initializeMatchingGame();

    const resetButton = document.querySelector('[onclick*="resetGame"]');
    if (resetButton) {
        resetButton.onclick = resetGame;
    }
}

function initializeMatchingGame() {
    const draggables = document.querySelectorAll('.draggable-tag');
    const dropZones = document.querySelectorAll('.drop-zone');

    draggables.forEach(tag => {
        tag.addEventListener('dragstart', function (e) {
            draggedElement = this;
            this.style.opacity = '0.5';
        });

        tag.addEventListener('dragend', function (e) {
            this.style.opacity = '1';
            draggedElement = null;
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', function (e) {
            e.preventDefault();
            this.style.background = '#e0f2fe';
        });

        zone.addEventListener('dragleave', function (e) {
            this.style.background = '';
        });

        zone.addEventListener('drop', function (e) {
            e.preventDefault();
            this.style.background = '';

            if (draggedElement) {
                const tagType = draggedElement.dataset.tag;
                const correctAnswer = this.dataset.answer;

                if (tagType === correctAnswer) {
                    this.appendChild(draggedElement);
                    this.style.background = '#c6f6d5';
                    draggedElement.style.background = '#10b981';
                    draggedElement.style.color = 'white';
                } else {
                    // Wrong answer animation
                    this.style.background = '#fed7d7';
                    setTimeout(() => {
                        this.style.background = '';
                    }, 1000);
                }
            }
        });
    });
}

function resetGame() {
    // Reset matching game
    const tags = document.querySelectorAll('.draggable-tag');
    const tagsColumn = document.querySelector('.tags-column');
    const dropZones = document.querySelectorAll('.drop-zone');

    if (tags.length > 0 && tagsColumn) {
        tags.forEach(tag => {
            tag.style.background = '';
            tag.style.color = '';
            tagsColumn.appendChild(tag);
        });

        dropZones.forEach(zone => {
            zone.style.background = '';
        });
    }

    // Reset any other game state
    const gameArea = document.getElementById('tag-builder-area');
    if (gameArea) {
        gameArea.innerHTML = '<p>Drag HTML tags here to build your structure!</p>';
    }

    // Reset selected states
    const selectedTags = document.querySelectorAll('.tag-option.selected');
    selectedTags.forEach(tag => tag.classList.remove('selected'));
}

// Utility functions
function showFeedback(message, type) {
    // Create or update feedback element
    let feedback = document.getElementById('quiz-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'quiz-feedback';
        feedback.className = 'feedback-message';
        document.querySelector('.quiz-container').appendChild(feedback);
    }

    feedback.textContent = message;
    feedback.className = `feedback-message ${type}`;

    // Auto-hide after 3 seconds
    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

// Navigation helpers
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Export functions that might be called from HTML
window.runHTML = runHTML;
window.applyFormatting = applyFormatting;
window.checkAnswer = checkAnswer;
window.resetGame = resetGame;
window.scrollToSection = scrollToSection;
