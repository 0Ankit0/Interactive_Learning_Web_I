// Unit page functionality
document.addEventListener('DOMContentLoaded', function () {
    initializeUnitPage();
    loadTopicProgress();
    initializeTopicAnimations();
    updateProgressBar();
});

// Initialize unit page
function initializeUnitPage() {
    const topicCards = document.querySelectorAll('.topic-card');

    // Add entrance animations with staggered delay
    topicCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Initialize concept map animation
    setTimeout(() => {
        const conceptNodes = document.querySelectorAll('.concept-node');
        conceptNodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.opacity = '1';
                node.style.transform = node.classList.contains('main')
                    ? 'translate(-50%, -50%) scale(1)'
                    : 'scale(1)';
            }, index * 200);
        });
    }, 1000);
}

// Navigation to topic pages
function navigateToTopic(topicNumber, topicSlug) {
    // Save progress
    saveTopicProgress(topicNumber, 'started');

    // Navigate to topic page
    window.location.href = `../topics/${topicSlug}.html`;
}

// Load and display topic progress
function loadTopicProgress() {
    const progress = JSON.parse(localStorage.getItem('webtech_progress') || '{}');
    const topicCards = document.querySelectorAll('.topic-card');

    topicCards.forEach(card => {
        const topicNumber = card.getAttribute('data-topic');
        const progressKey = `topic_${topicNumber}`;

        if (progress[progressKey]) {
            const status = progress[progressKey].value;
            const statusElement = card.querySelector('.topic-status i');

            switch (status) {
                case 'completed':
                    statusElement.className = 'fas fa-check-circle';
                    statusElement.parentElement.classList.add('completed');
                    card.classList.add('completed');
                    break;
                case 'started':
                case 'in-progress':
                    statusElement.className = 'fas fa-play-circle';
                    statusElement.parentElement.classList.add('in-progress');
                    card.classList.add('in-progress');
                    break;
            }
        }
    });
}

// Save topic progress
function saveTopicProgress(topicNumber, status) {
    let progress = JSON.parse(localStorage.getItem('webtech_progress') || '{}');
    progress[`topic_${topicNumber}`] = {
        value: status,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('webtech_progress', JSON.stringify(progress));
}

// Update progress bar
function updateProgressBar() {
    const progress = JSON.parse(localStorage.getItem('webtech_progress') || '{}');
    const totalTopics = document.querySelectorAll('.topic-card').length;
    let completedTopics = 0;

    // Count completed topics
    Object.keys(progress).forEach(key => {
        if (key.startsWith('topic_') && progress[key].value === 'completed') {
            completedTopics++;
        }
    });

    const progressPercentage = (completedTopics / totalTopics) * 100;
    const progressBar = document.getElementById('unit-progress');

    if (progressBar) {
        setTimeout(() => {
            progressBar.style.width = `${progressPercentage}%`;
        }, 500);
    }
}

// Initialize topic animations
function initializeTopicAnimations() {
    const topicCards = document.querySelectorAll('.topic-card');

    topicCards.forEach(card => {
        // Hover effect for topic cards
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Click animation
        card.addEventListener('click', function (e) {
            if (e.target.tagName !== 'BUTTON') {
                this.style.transform = 'translateY(-4px) scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                }, 150);
            }
        });
    });

    // Concept map interactions
    const conceptNodes = document.querySelectorAll('.concept-node');
    conceptNodes.forEach(node => {
        node.addEventListener('click', function () {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Search functionality for topics
function initializeTopicSearch() {
    const searchInput = document.getElementById('topic-search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const topicCards = document.querySelectorAll('.topic-card');

            topicCards.forEach(card => {
                const title = card.querySelector('.topic-title').textContent.toLowerCase();
                const description = card.querySelector('.topic-description').textContent.toLowerCase();
                const subtopics = Array.from(card.querySelectorAll('.subtopic'))
                    .map(span => span.textContent.toLowerCase()).join(' ');

                const isMatch = title.includes(searchTerm) ||
                    description.includes(searchTerm) ||
                    subtopics.includes(searchTerm);

                card.style.display = isMatch ? 'block' : 'none';

                if (isMatch) {
                    card.classList.add('animate-in');
                }
            });
        });
    }
}

// Filter topics by difficulty
function filterTopicsByDifficulty(difficulty) {
    const topicCards = document.querySelectorAll('.topic-card');

    topicCards.forEach(card => {
        const topicDifficulty = card.querySelector('.difficulty').textContent.trim().toLowerCase();

        if (difficulty === 'all' || topicDifficulty.includes(difficulty)) {
            card.style.display = 'block';
            card.classList.add('animate-in');
        } else {
            card.style.display = 'none';
        }
    });
}

// Topic completion tracking
function markTopicAsCompleted(topicNumber) {
    saveTopicProgress(topicNumber, 'completed');

    const topicCard = document.querySelector(`[data-topic="${topicNumber}"]`);
    if (topicCard) {
        const statusIcon = topicCard.querySelector('.topic-status i');
        statusIcon.className = 'fas fa-check-circle';
        statusIcon.parentElement.classList.add('completed');
        topicCard.classList.add('completed');

        // Add completion animation
        topicCard.style.transform = 'scale(1.05)';
        setTimeout(() => {
            topicCard.style.transform = 'scale(1)';
        }, 300);

        // Show success notification
        showTopicCompletionNotification(topicNumber);
    }

    updateProgressBar();
}

function showTopicCompletionNotification(topicNumber) {
    const notification = document.createElement('div');
    notification.className = 'completion-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>Topic ${topicNumber} completed!</span>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Keyboard navigation for topics
document.addEventListener('keydown', function (e) {
    const topicCards = Array.from(document.querySelectorAll('.topic-card:not([style*="display: none"])'));
    const currentFocus = document.querySelector('.topic-card.keyboard-focus');
    let currentIndex = currentFocus ? topicCards.indexOf(currentFocus) : -1;

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();

        // Remove current focus
        if (currentFocus) {
            currentFocus.classList.remove('keyboard-focus');
        }

        // Calculate new index
        if (e.key === 'ArrowDown') {
            currentIndex = (currentIndex + 1) % topicCards.length;
        } else {
            currentIndex = currentIndex <= 0 ? topicCards.length - 1 : currentIndex - 1;
        }

        // Add focus to new card
        const newFocusCard = topicCards[currentIndex];
        newFocusCard.classList.add('keyboard-focus');
        newFocusCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Add visual focus styles
        newFocusCard.style.outline = '3px solid #667eea';
        newFocusCard.style.outlineOffset = '5px';
    }

    if (e.key === 'Enter' && currentFocus) {
        const button = currentFocus.querySelector('.btn-topic');
        if (button) {
            button.click();
        }
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
    
    .topic-card.keyboard-focus {
        transform: translateY(-5px) !important;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15) !important;
    }
`;
document.head.appendChild(style);

// Export functions for external use
window.UnitPage = {
    navigateToTopic,
    markTopicAsCompleted,
    filterTopicsByDifficulty,
    initializeTopicSearch
};
