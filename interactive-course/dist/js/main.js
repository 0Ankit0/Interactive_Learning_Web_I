// Main navigation and interactive functionality
document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    initializeInteractiveElements();
    loadProgressData();
});

// Navigation function to unit pages
function navigateToUnit(unitNumber) {
    // Save current progress
    saveProgress('unit_' + unitNumber, 'visited');

    // Navigate to unit page
    window.location.href = `units/unit${unitNumber}.html`;
}

// Initialize entrance animations
function initializeAnimations() {
    const cards = document.querySelectorAll('.unit-card');
    const stats = document.querySelectorAll('.stat-card');

    // Animate unit cards with staggered delay
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Animate stats cards
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateX(-30px)';

        setTimeout(() => {
            stat.style.transition = 'all 0.5s ease';
            stat.style.opacity = '1';
            stat.style.transform = 'translateX(0)';
        }, 1000 + (index * 100));
    });
}

// Initialize interactive elements
function initializeInteractiveElements() {
    // Add hover effects to cards
    const unitCards = document.querySelectorAll('.unit-card');

    unitCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });

        // Add click animation
        card.addEventListener('click', function () {
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }, 150);
        });
    });

    // Add interactive stats counter animation
    animateCounters();
}

// Animate number counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-info h3');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.includes('+') ? target + '+' : target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 50);
    });
}

// Progress tracking system
function saveProgress(key, value) {
    let progress = JSON.parse(localStorage.getItem('webtech_progress') || '{}');
    progress[key] = {
        value: value,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('webtech_progress', JSON.stringify(progress));
}

function loadProgressData() {
    const progress = JSON.parse(localStorage.getItem('webtech_progress') || '{}');

    // Add progress indicators to visited units
    Object.keys(progress).forEach(key => {
        if (key.startsWith('unit_')) {
            const unitNumber = key.split('_')[1];
            const unitCard = document.querySelector(`.unit-card[data-unit="${unitNumber}"]`);
            if (unitCard && progress[key].value === 'visited') {
                addProgressIndicator(unitCard);
            }
        }
    });
}

function addProgressIndicator(unitCard) {
    const indicator = document.createElement('div');
    indicator.className = 'progress-indicator';
    indicator.innerHTML = '<i class="fas fa-check"></i>';
    indicator.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 30px;
        height: 30px;
        background: #10b981;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.8rem;
    `;
    unitCard.appendChild(indicator);
}

// Search and filter functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const unitCards = document.querySelectorAll('.unit-card');

            unitCards.forEach(card => {
                const title = card.querySelector('.unit-title').textContent.toLowerCase();
                const description = card.querySelector('.unit-description p').textContent.toLowerCase();
                const topics = Array.from(card.querySelectorAll('.topics-preview span'))
                    .map(span => span.textContent.toLowerCase()).join(' ');

                const isMatch = title.includes(searchTerm) ||
                    description.includes(searchTerm) ||
                    topics.includes(searchTerm);

                card.style.display = isMatch ? 'block' : 'none';

                if (isMatch) {
                    card.style.animation = 'fadeIn 0.5s ease';
                }
            });
        });
    }
}

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    const activeCard = document.querySelector('.unit-card:hover');

    if (e.key === 'Enter' && activeCard) {
        const unitNumber = activeCard.getAttribute('data-unit');
        navigateToUnit(unitNumber);
    }

    // Arrow key navigation
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        navigateCards(e.key === 'ArrowRight' ? 1 : -1);
    }
});

function navigateCards(direction) {
    const cards = Array.from(document.querySelectorAll('.unit-card'));
    const currentFocus = document.querySelector('.unit-card.keyboard-focus');
    let currentIndex = currentFocus ? cards.indexOf(currentFocus) : -1;

    // Remove current focus
    if (currentFocus) {
        currentFocus.classList.remove('keyboard-focus');
    }

    // Calculate new index
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = cards.length - 1;
    if (currentIndex >= cards.length) currentIndex = 0;

    // Add focus to new card
    const newFocusCard = cards[currentIndex];
    newFocusCard.classList.add('keyboard-focus');
    newFocusCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Add visual focus styles
    newFocusCard.style.outline = '3px solid #667eea';
    newFocusCard.style.outlineOffset = '5px';
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme-preference', isDark ? 'dark' : 'light');

            // Update toggle icon
            const icon = this.querySelector('i');
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        });

        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme-preference');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.querySelector('i').className = 'fas fa-sun';
        }
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Performance monitoring
function trackPagePerformance() {
    window.addEventListener('load', function () {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);

        // Track largest contentful paint
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log(`LCP: ${lastEntry.startTime.toFixed(2)}ms`);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    });
}

// Initialize performance tracking
trackPagePerformance();

// Export functions for use in other modules
window.WebTechCourse = {
    navigateToUnit,
    saveProgress,
    showNotification,
    initializeSearch,
    initializeThemeToggle
};
