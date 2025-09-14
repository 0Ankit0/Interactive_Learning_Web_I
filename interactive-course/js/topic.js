// Topic Page Interactive Functionality

// Global variables
let currentQuizQuestion = 0;
let quizScore = 0;
let timelineAnimation = null;
let liveUpdatesInterval = null;

// Quiz questions data
const quizQuestions = [
    {
        question: "Who invented the World Wide Web?",
        options: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Mark Zuckerberg"],
        correct: 1,
        explanation: "Tim Berners-Lee invented the World Wide Web in 1989 while working at CERN."
    },
    {
        question: "What year was the first website created?",
        options: ["1989", "1990", "1991", "1992"],
        correct: 2,
        explanation: "The first website went online in 1991 at info.cern.ch, explaining the World Wide Web project."
    },
    {
        question: "Which web version is known as the 'Read-Write Web'?",
        options: ["Web 1.0", "Web 2.0", "Web 3.0", "Web 4.0"],
        correct: 1,
        explanation: "Web 2.0 introduced user-generated content and interactive platforms like social media."
    },
    {
        question: "What does HTTP stand for?",
        options: ["Hypertext Transfer Protocol", "High Tech Transfer Process", "Home Text Transfer Protocol", "Hyperlink Text Transfer Process"],
        correct: 0,
        explanation: "HTTP stands for Hypertext Transfer Protocol, the foundation of data communication on the web."
    },
    {
        question: "What was the first graphical web browser?",
        options: ["Internet Explorer", "Netscape", "Mosaic", "Chrome"],
        correct: 2,
        explanation: "Mosaic, released in 1993, was the first web browser to display images inline with text."
    }
];

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function () {
    initializeScrollProgress();
    initializeTableOfContents();
    initializeInteractiveElements();
    initializeQuiz();
    loadTopicProgress();
});

// Scroll progress functionality
function initializeScrollProgress() {
    const progressBar = document.getElementById('topic-progress');

    window.addEventListener('scroll', function () {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        const scrollPercent = (scrollTop / documentHeight) * 100;

        progressBar.style.width = Math.min(scrollPercent, 100) + '%';

        // Save progress
        saveTopicProgress(scrollPercent);
    });
}

// Table of contents functionality
function initializeTableOfContents() {
    const tocLinks = document.querySelectorAll('.table-of-contents a');

    tocLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links
            tocLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Highlight current section on scroll
    window.addEventListener('scroll', updateActiveSection);
}

function updateActiveSection() {
    const sections = document.querySelectorAll('.content-section');
    const tocLinks = document.querySelectorAll('.table-of-contents a');

    let currentSection = '';

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
            currentSection = section.id;
        }
    });

    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Scroll to section function for onclick handlers
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Interactive Elements
function initializeInteractiveElements() {
    // Auto-run HTML example
    runHTMLExample();

    // Build initial URL
    buildURL();

    // Initialize web evolution game
    initializeWebEvolutionGame();

    // Show initial demo
    showDemo('website');
}

// HTML Code Editor
function runHTMLExample() {
    const htmlCode = document.getElementById('html-code');
    const htmlOutput = document.getElementById('html-output');

    if (htmlCode && htmlOutput) {
        const code = htmlCode.value;
        const blob = new Blob([code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        htmlOutput.src = url;

        // Clean up the blob URL after a delay
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
}

// Tooltip functionality
function showTooltip(text) {
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: fixed;
        background: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(tooltip);

    // Position tooltip near mouse
    const updatePosition = (e) => {
        tooltip.style.left = e.clientX + 10 + 'px';
        tooltip.style.top = e.clientY + 10 + 'px';
    };

    document.addEventListener('mousemove', updatePosition);

    // Show tooltip
    setTimeout(() => tooltip.style.opacity = '1', 10);

    // Hide after 3 seconds
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(tooltip);
            document.removeEventListener('mousemove', updatePosition);
        }, 300);
    }, 3000);
}

// Browser simulation
function simulateBrowsing() {
    const demoStatus = document.getElementById('demo-status');
    const messages = [
        "Loading hypertext document...",
        "Navigating to linked page...",
        "Displaying text-based content...",
        "Early web browsing complete!"
    ];

    let messageIndex = 0;

    const showNextMessage = () => {
        if (messageIndex < messages.length) {
            demoStatus.textContent = messages[messageIndex];
            messageIndex++;
            setTimeout(showNextMessage, 1500);
        } else {
            setTimeout(() => {
                demoStatus.textContent = "Click to experience early web browsing!";
            }, 2000);
        }
    };

    showNextMessage();
}

// URL Builder
function buildURL() {
    const protocol = document.getElementById('protocol')?.value || 'https://';
    const domain = document.getElementById('domain')?.value || 'example.com';
    const path = document.getElementById('path')?.value || '/page';
    const query = document.getElementById('query')?.value || '?id=123';

    const url = protocol + domain + path + query;
    const builtUrl = document.getElementById('built-url');

    if (builtUrl) {
        builtUrl.textContent = url;
    }
}

// Web Evolution Game
function initializeWebEvolutionGame() {
    // Game is already initialized in HTML
}

function selectAnswer(button, isCorrect) {
    const buttons = button.parentNode.querySelectorAll('button');
    const feedback = document.getElementById('game-feedback');

    // Disable all buttons
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn === button) {
            btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
    });

    // Show feedback
    if (isCorrect) {
        feedback.textContent = "Correct! Web 2.0 introduced social media and user-generated content.";
        feedback.className = 'game-feedback correct';
    } else {
        feedback.textContent = "Not quite. Web 2.0 was the era that brought us social media platforms.";
        feedback.className = 'game-feedback incorrect';
    }

    // Reset after 3 seconds
    setTimeout(() => {
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.className = '';
        });
        feedback.textContent = '';
        feedback.className = 'game-feedback';
    }, 3000);
}

// Search Simulation
function simulateSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchResults) return;

    const query = searchInput.value.toLowerCase();
    const results = getSearchResults(query);

    // Clear current results
    searchResults.innerHTML = '';

    // Add loading state
    searchResults.innerHTML = '<div class="loading">Searching early web...</div>';

    // Simulate search delay
    setTimeout(() => {
        searchResults.innerHTML = results.map(result => `
            <div class="result-item">
                <h4><a href="#">${result.title}</a></h4>
                <p>${result.description}</p>
                <cite>${result.url}</cite>
            </div>
        `).join('');
    }, 1000);
}

function getSearchResults(query) {
    const allResults = [
        {
            title: "Tim Berners-Lee's WWW Proposal",
            description: "The original proposal for the World Wide Web, submitted at CERN in 1989...",
            url: "info.cern.ch/hypertext/WWW/Proposal.html"
        },
        {
            title: "What is Hypertext?",
            description: "An introduction to hypertext systems and their role in information management...",
            url: "www.w3.org/hypertext/WWW/WhatIs.html"
        },
        {
            title: "First Web Server Documentation",
            description: "Technical documentation for the world's first web server...",
            url: "info.cern.ch/hypertext/WWW/Daemon/Overview.html"
        },
        {
            title: "HTML: HyperText Markup Language",
            description: "Introduction to the markup language that powers web pages...",
            url: "www.w3.org/MarkUp/html-spec/html-spec_toc.html"
        },
        {
            title: "HTTP Protocol Specification",
            description: "Technical specification for the HyperText Transfer Protocol...",
            url: "www.w3.org/Protocols/HTTP/HTTP2.html"
        }
    ];

    if (!query) return allResults.slice(0, 3);

    return allResults.filter(result =>
        result.title.toLowerCase().includes(query) ||
        result.description.toLowerCase().includes(query)
    ).slice(0, 3);
}

// Demo Tabs
function showDemo(type) {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.demo-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    document.querySelector(`[onclick="showDemo('${type}')"]`).classList.add('active');
    document.getElementById(`${type}-demo`).classList.add('active');

    if (type === 'webapp') {
        startLiveUpdates();
    } else {
        stopLiveUpdates();
    }
}

// Live Updates for Web App Demo
function startLiveUpdates() {
    if (liveUpdatesInterval) return;

    const updates = [
        "📱 John posted a new photo",
        "👍 Sarah liked your post",
        "💬 New comment on your article",
        "🔔 You have 3 new notifications",
        "🎉 Someone shared your content"
    ];

    let updateIndex = 0;

    liveUpdatesInterval = setInterval(() => {
        addUpdate(updates[updateIndex % updates.length]);
        updateIndex++;
    }, 2000);
}

function stopLiveUpdates() {
    if (liveUpdatesInterval) {
        clearInterval(liveUpdatesInterval);
        liveUpdatesInterval = null;
    }
}

function addUpdate(message = null) {
    const liveUpdates = document.getElementById('live-updates');
    if (!liveUpdates) return;

    const updates = [
        "🚀 Just deployed a new feature!",
        "📊 Analytics show 50% increase in engagement",
        "🎯 Reached 1000 active users milestone",
        "💡 New idea for the next update",
        "🔧 Fixed a critical bug in real-time"
    ];

    const updateText = message || updates[Math.floor(Math.random() * updates.length)];
    const timestamp = new Date().toLocaleTimeString();

    const updateElement = document.createElement('div');
    updateElement.style.cssText = `
        padding: 0.5rem;
        background: #e3f2fd;
        margin: 0.5rem 0;
        border-radius: 4px;
        font-size: 0.9rem;
        animation: slideIn 0.3s ease-out;
    `;
    updateElement.innerHTML = `<strong>${timestamp}:</strong> ${updateText}`;

    liveUpdates.appendChild(updateElement);

    // Keep only last 5 updates
    while (liveUpdates.children.length > 5) {
        liveUpdates.removeChild(liveUpdates.firstChild);
    }
}

function toggleLiveUpdates() {
    if (liveUpdatesInterval) {
        stopLiveUpdates();
    } else {
        startLiveUpdates();
    }
}

// Interactive Timeline
function playTimeline() {
    const progressBar = document.getElementById('timeline-progress');
    const events = document.querySelectorAll('.timeline-event');
    const details = document.getElementById('timeline-details');
    const playBtn = document.getElementById('play-btn');

    if (!progressBar || !events.length) return;

    playBtn.innerHTML = '<i class="fas fa-pause"></i> Playing...';
    playBtn.disabled = true;

    let currentEvent = 0;
    const totalEvents = events.length;
    const duration = 5000; // 5 seconds total
    const eventDuration = duration / totalEvents;

    timelineAnimation = setInterval(() => {
        const progress = ((currentEvent + 1) / totalEvents) * 100;
        progressBar.style.width = progress + '%';

        if (currentEvent < totalEvents) {
            const event = events[currentEvent];
            const year = event.dataset.year;
            const title = event.dataset.title;
            const description = event.dataset.description;

            details.innerHTML = `
                <h4>${year}: ${title}</h4>
                <p>${description}</p>
            `;

            // Highlight current event
            events.forEach(e => e.classList.remove('active'));
            event.classList.add('active');

            currentEvent++;
        } else {
            clearInterval(timelineAnimation);
            playBtn.innerHTML = '<i class="fas fa-play"></i> Play Timeline';
            playBtn.disabled = false;

            setTimeout(() => {
                details.innerHTML = `
                    <h4>Web Evolution Timeline</h4>
                    <p>The web has evolved from a simple information sharing system to the complex ecosystem we know today.</p>
                `;
                events.forEach(e => e.classList.remove('active'));
            }, 2000);
        }
    }, eventDuration);
}

function resetTimeline() {
    if (timelineAnimation) {
        clearInterval(timelineAnimation);
    }

    const progressBar = document.getElementById('timeline-progress');
    const events = document.querySelectorAll('.timeline-event');
    const details = document.getElementById('timeline-details');
    const playBtn = document.getElementById('play-btn');

    if (progressBar) progressBar.style.width = '0%';
    if (playBtn) {
        playBtn.innerHTML = '<i class="fas fa-play"></i> Play Timeline';
        playBtn.disabled = false;
    }

    events.forEach(e => e.classList.remove('active'));

    if (details) {
        details.innerHTML = `
            <h4>Web Evolution Timeline</h4>
            <p>Click play to see how the web evolved from a simple information sharing system to the complex ecosystem we know today.</p>
        `;
    }
}

function updateSpeed() {
    // Speed control functionality can be implemented here
    const speed = document.getElementById('speed-control')?.value || 3;
    console.log('Timeline speed updated to:', speed);
}

// Quiz Functionality
function initializeQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    showQuizQuestion();
}

function showQuizQuestion() {
    const question = quizQuestions[currentQuizQuestion];
    if (!question) return;

    const questionElement = document.querySelector('#quiz-question h3');
    const optionsContainer = document.querySelector('.quiz-options');
    const progressFill = document.getElementById('quiz-progress');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');

    if (questionElement) questionElement.textContent = question.question;
    if (currentQuestionSpan) currentQuestionSpan.textContent = currentQuizQuestion + 1;
    if (totalQuestionsSpan) totalQuestionsSpan.textContent = quizQuestions.length;

    if (progressFill) {
        const progress = ((currentQuizQuestion) / quizQuestions.length) * 100;
        progressFill.style.width = progress + '%';
    }

    if (optionsContainer) {
        optionsContainer.innerHTML = question.options.map((option, index) => `
            <button class="quiz-option" onclick="selectQuizAnswer(this, ${index === question.correct})" data-index="${index}">
                ${option}
            </button>
        `).join('');
    }

    // Hide feedback and next button
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('quiz-next');
    if (feedback) feedback.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
}

function selectQuizAnswer(button, isCorrect) {
    const question = quizQuestions[currentQuizQuestion];
    const buttons = button.parentNode.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('quiz-next');

    // Disable all buttons
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (btn === button && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });

    // Update score
    if (isCorrect) {
        quizScore++;
    }

    // Show feedback
    if (feedback) {
        feedback.innerHTML = `
            <div class="${isCorrect ? 'correct' : 'incorrect'}">
                ${isCorrect ? '✓ Correct!' : '✗ Incorrect'}<br>
                ${question.explanation}
            </div>
        `;
        feedback.style.display = 'block';
    }

    // Show next button
    if (nextBtn) {
        nextBtn.style.display = 'block';
    }
}

function nextQuestion() {
    currentQuizQuestion++;

    if (currentQuizQuestion < quizQuestions.length) {
        showQuizQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    const quizContainer = document.getElementById('knowledge-quiz');
    const quizQuestion = document.querySelector('.quiz-question');
    const quizResults = document.getElementById('quiz-results');
    const finalScore = document.getElementById('final-score');
    const progressFill = document.getElementById('quiz-progress');

    // Hide question, show results
    if (quizQuestion) quizQuestion.style.display = 'none';
    if (quizResults) quizResults.style.display = 'block';

    // Update final score
    if (finalScore) finalScore.textContent = `${quizScore}/${quizQuestions.length}`;

    // Complete progress bar
    if (progressFill) progressFill.style.width = '100%';

    // Save completion
    saveTopicCompletion();
}

function retakeQuiz() {
    const quizQuestion = document.querySelector('.quiz-question');
    const quizResults = document.getElementById('quiz-results');

    // Show question, hide results
    if (quizQuestion) quizQuestion.style.display = 'block';
    if (quizResults) quizResults.style.display = 'none';

    // Reset quiz
    initializeQuiz();
}

function completeLesson() {
    // Mark lesson as complete and navigate to next topic or unit
    saveTopicCompletion();

    // Show completion message
    alert('Congratulations! You have completed the "Evolution of the Web" lesson. You will now return to the unit page.');

    // Navigate back to unit page
    window.location.href = '../units/unit1.html';
}

// Progress Management
function saveTopicProgress(scrollPercent) {
    const topicId = 'evolution-of-web';
    const progress = {
        scrollPercent: Math.min(scrollPercent, 100),
        quizScore: quizScore,
        completed: scrollPercent >= 90,
        lastVisited: new Date().toISOString(),
        sectionsRead: getSectionsRead()
    };

    localStorage.setItem(`topic-progress-${topicId}`, JSON.stringify(progress));
}

function loadTopicProgress() {
    const topicId = 'evolution-of-web';
    const saved = localStorage.getItem(`topic-progress-${topicId}`);

    if (saved) {
        const progress = JSON.parse(saved);
        const progressBar = document.getElementById('topic-progress');

        if (progressBar && progress.scrollPercent) {
            progressBar.style.width = progress.scrollPercent + '%';
        }

        // Restore quiz score if available
        if (progress.quizScore) {
            quizScore = progress.quizScore;
        }

        // Mark sections as read if previously completed
        if (progress.sectionsRead) {
            markSectionsAsRead(progress.sectionsRead);
        }
    }
}

function getSectionsRead() {
    const sections = document.querySelectorAll('.content-section');
    const sectionsRead = [];

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Consider a section read if it's been viewed (top is above viewport)
        if (rect.top < window.innerHeight) {
            sectionsRead.push(section.id);
        }
    });

    return sectionsRead;
}

function markSectionsAsRead(sectionsRead) {
    sectionsRead.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            // Add a subtle visual indicator for completed sections
            section.classList.add('section-read');
        }
    });
}

function saveTopicCompletion() {
    const topicId = 'evolution-of-web';
    const progress = {
        scrollPercent: 100,
        quizScore: quizScore,
        completed: true,
        completedAt: new Date().toISOString(),
        lastVisited: new Date().toISOString()
    };

    localStorage.setItem(`topic-progress-${topicId}`, JSON.stringify(progress));

    // Update unit progress
    updateUnitProgress();
}

function updateUnitProgress() {
    const unitId = 'unit1';
    const unitProgress = JSON.parse(localStorage.getItem(`unit-progress-${unitId}`) || '{}');

    if (!unitProgress.completedTopics) {
        unitProgress.completedTopics = [];
    }

    if (!unitProgress.completedTopics.includes('evolution-of-web')) {
        unitProgress.completedTopics.push('evolution-of-web');
    }

    // Calculate overall unit progress
    const totalTopics = 6; // Total topics in unit 1
    unitProgress.progress = (unitProgress.completedTopics.length / totalTopics) * 100;
    unitProgress.lastVisited = new Date().toISOString();

    localStorage.setItem(`unit-progress-${unitId}`, JSON.stringify(unitProgress));
}

// Keyboard Navigation
document.addEventListener('keydown', function (e) {
    // ESC to close any open modals or reset states
    if (e.key === 'Escape') {
        resetTimeline();
        stopLiveUpdates();
    }

    // Arrow keys for quiz navigation
    if (e.key === 'ArrowRight' && document.getElementById('quiz-next').style.display !== 'none') {
        nextQuestion();
    }

    // Number keys for quiz answers (1-4)
    if (e.key >= '1' && e.key <= '4') {
        const optionIndex = parseInt(e.key) - 1;
        const options = document.querySelectorAll('.quiz-option');
        if (options[optionIndex] && !options[optionIndex].disabled) {
            options[optionIndex].click();
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all content sections for animations (skip first section)
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section, index) => {
        // Skip the first section (introduction) to prevent flickering, observe others
        if (index > 0) {
            observer.observe(section);
        }
    });
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scrolling polyfill for older browsers
if (!CSS.supports('scroll-behavior', 'smooth')) {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
