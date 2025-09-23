// Main navigation and interactive functionality
document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    initializeInteractiveElements();
    loadProgressData();
    initializeCustomMediaControls();
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

        // Track largest contentful paint
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    });
}

// Initialize performance tracking
trackPagePerformance();

// Custom Media Controls
function initializeCustomMediaControls() {
    // Audio controls
    const customAudio = document.getElementById('customAudio');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const volumeControl = document.getElementById('volumeControl');
    const volumeDisplay = document.getElementById('volumeDisplay');

    if (customAudio && playBtn && pauseBtn && stopBtn && volumeControl && volumeDisplay) {
        // Update button states based on audio state
        function updateAudioButtonStates() {
            if (customAudio.paused) {
                playBtn.classList.remove('disabled');
                pauseBtn.classList.add('disabled');
            } else {
                playBtn.classList.add('disabled');
                pauseBtn.classList.remove('disabled');
            }
        }

        // Play button
        playBtn.addEventListener('click', () => {
            if (customAudio.paused) {
                customAudio.play().catch(error => {
                    console.error('Error playing audio:', error);
                });
            }
        });

        // Pause button
        pauseBtn.addEventListener('click', () => {
            if (!customAudio.paused) {
                customAudio.pause();
            }
        });

        // Stop button
        stopBtn.addEventListener('click', () => {
            customAudio.pause();
            customAudio.currentTime = 0;
        });

        // Volume control
        volumeControl.addEventListener('input', () => {
            customAudio.volume = volumeControl.value;
            volumeDisplay.textContent = Math.round(volumeControl.value * 100) + '%';
        });

        // Audio event listeners
        customAudio.addEventListener('play', updateAudioButtonStates);
        customAudio.addEventListener('pause', updateAudioButtonStates);
        customAudio.addEventListener('ended', () => {
            updateAudioButtonStates();
            customAudio.currentTime = 0;
        });

        // Update volume display on load
        customAudio.addEventListener('loadedmetadata', () => {
            volumeDisplay.textContent = Math.round(customAudio.volume * 100) + '%';
            updateAudioButtonStates();
        });

        // Initial state
        updateAudioButtonStates();
    }

    // Video controls
    const customVideo = document.getElementById('customVideo');
    const overlayPlayBtn = document.getElementById('overlayPlayBtn');
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    const videoPauseBtn = document.getElementById('videoPauseBtn');
    const videoMuteBtn = document.getElementById('videoMuteBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const progressBar = document.getElementById('progressBar');
    const timeDisplay = document.getElementById('timeDisplay');

    if (customVideo && overlayPlayBtn && videoPlayBtn && videoPauseBtn && videoMuteBtn && fullscreenBtn && progressBar && timeDisplay) {
        // Update button states based on video state
        function updateVideoButtonStates() {
            if (customVideo.paused) {
                videoPlayBtn.classList.remove('disabled');
                videoPauseBtn.classList.add('disabled');
                overlayPlayBtn.style.display = 'flex';
            } else {
                videoPlayBtn.classList.add('disabled');
                videoPauseBtn.classList.remove('disabled');
                overlayPlayBtn.style.display = 'none';
            }
        }

        // Overlay play button
        overlayPlayBtn.addEventListener('click', () => {
            if (customVideo.paused) {
                customVideo.play().catch(error => {
                    console.error('Error playing video:', error);
                });
            }
        });

        // Video play button
        videoPlayBtn.addEventListener('click', () => {
            if (customVideo.paused) {
                customVideo.play().catch(error => {
                    console.error('Error playing video:', error);
                });
            }
        });

        // Video pause button
        videoPauseBtn.addEventListener('click', () => {
            if (!customVideo.paused) {
                customVideo.pause();
            }
        });

        // Video mute button
        videoMuteBtn.addEventListener('click', () => {
            customVideo.muted = !customVideo.muted;
            videoMuteBtn.innerHTML = customVideo.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        });

        // Fullscreen button
        fullscreenBtn.addEventListener('click', () => {
            if (customVideo.requestFullscreen) {
                customVideo.requestFullscreen();
            } else if (customVideo.webkitRequestFullscreen) {
                customVideo.webkitRequestFullscreen();
            } else if (customVideo.msRequestFullscreen) {
                customVideo.msRequestFullscreen();
            }
        });

        // Progress bar
        customVideo.addEventListener('timeupdate', () => {
            const progress = (customVideo.currentTime / customVideo.duration) * 100;
            progressBar.value = progress;
            updateTimeDisplay();
        });

        progressBar.addEventListener('input', () => {
            const time = (progressBar.value / 100) * customVideo.duration;
            customVideo.currentTime = time;
        });

        // Update time display
        function updateTimeDisplay() {
            const current = formatTime(customVideo.currentTime);
            const duration = formatTime(customVideo.duration);
            timeDisplay.textContent = `${current} / ${duration}`;
        }

        function formatTime(seconds) {
            if (isNaN(seconds)) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }

        // Video event listeners
        customVideo.addEventListener('play', updateVideoButtonStates);
        customVideo.addEventListener('pause', updateVideoButtonStates);
        customVideo.addEventListener('ended', () => {
            updateVideoButtonStates();
            customVideo.currentTime = 0;
        });

        // Initialize time display
        customVideo.addEventListener('loadedmetadata', () => {
            updateTimeDisplay();
            updateVideoButtonStates();
        });

        // Initial state
        updateVideoButtonStates();
    }
}

// Initialize custom media controls
initializeCustomMediaControls();

// Export functions for use in other modules
window.WebTechCourse = {
    navigateToUnit,
    saveProgress,
    showNotification,
    initializeSearch,
    initializeThemeToggle
};
