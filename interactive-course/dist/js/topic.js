// Topic Page Interactive Functionality - Consolidated Version
// This file contains all shared interactive functionality for the course

// Global variables
let currentQuizQuestion = 0;
let quizScore = 0;
let liveUpdatesInterval = null;
let quizQuestions = []; // Will be loaded from JSON
let config = {}; // Will be loaded from JSON
let contentData = {}; // Will be loaded from JSON

// Initialize page functionality
document.addEventListener('DOMContentLoaded', async function () {
    // Load data first
    await loadApplicationData();

    // Then initialize features
    initializeScrollProgress();
    initializeTableOfContents();
    initializeInteractiveElements();
    initializeQuiz();
    initializeGlobalFeatures();
    loadTopicProgress();
});

// Global Features Initialization
function initializeGlobalFeatures() {
    // Initialize tabs (jQuery and vanilla JS)
    initializeTabs();

    // Initialize selector demos
    initializeSelectorDemo();

    // Initialize color functionality
    initializeColorFeatures();

    // Initialize form features
    initializeFormFeatures();

    // Initialize animation features
    initializeAnimationFeatures();

    // Initialize AJAX features
    initializeAjaxFeatures();

    // Initialize DOM manipulation features
    initializeDOMFeatures();

    // Initialize event handling features
    initializeEventFeatures();
}

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
        lastVisited: new Date().toISOString()
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
    }
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

// Tab Functionality (from jquery-topic.js)
function initializeTabs() {
    // jQuery tabs
    $('.tab-button').on('click', function () {
        const tabId = $(this).data('tab');
        $('.tab-button').removeClass('active');
        $('.tab-content').removeClass('active');
        $(this).addClass('active');
        $('#' + tabId).addClass('active');
    });

    // Vanilla JS tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Selector Demo Functionality (from js-dom-topic.js)
function initializeSelectorDemo() {
    const selectorInput = document.getElementById('selector-input');
    const selectorResult = document.getElementById('selector-result');
    const selectorCount = document.getElementById('selector-count');

    if (selectorInput && selectorResult) {
        selectorInput.addEventListener('input', function () {
            const selector = this.value;
            try {
                const elements = document.querySelectorAll(selector);
                selectorCount.textContent = elements.length;

                // Highlight selected elements
                document.querySelectorAll('.selector-highlight').forEach(el => {
                    el.classList.remove('selector-highlight');
                });

                elements.forEach(element => {
                    element.classList.add('selector-highlight');
                });

                selectorResult.textContent = `Found ${elements.length} element(s)`;
            } catch (error) {
                selectorResult.textContent = 'Invalid selector';
                selectorCount.textContent = '0';
            }
        });
    }
}

// Color Features (from css-basics-topic.js)
function initializeColorFeatures() {
    const colorPicker = document.getElementById('color-picker');
    const colorDisplay = document.getElementById('color-display');
    const colorValue = document.getElementById('color-value');

    if (colorPicker && colorDisplay && colorValue) {
        colorPicker.addEventListener('input', function () {
            const color = this.value;
            colorDisplay.style.backgroundColor = color;
            colorValue.textContent = color;

            // Update RGB values
            const rgb = hexToRgb(color);
            if (rgb) {
                document.getElementById('rgb-value').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            }
        });
    }

    // Initialize color converter
    const hexInput = document.getElementById('hex-input');
    const rgbInput = document.getElementById('rgb-input');
    const hslInput = document.getElementById('hsl-input');

    if (hexInput) {
        hexInput.addEventListener('input', function () {
            const hex = this.value;
            const rgb = hexToRgb(hex);
            if (rgb) {
                rgbInput.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
                const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                hslInput.value = `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
            }
        });
    }
}

// Form Features (from tables-forms-topic.js)
function initializeFormFeatures() {
    // Form validation
    const forms = document.querySelectorAll('.demo-form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            validateForm(this);
        });
    });

    // Dynamic form elements
    const addFieldBtn = document.getElementById('add-field-btn');
    if (addFieldBtn) {
        addFieldBtn.addEventListener('click', function () {
            addFormField();
        });
    }
}

// Animation Features (from css-basics-topic.js)
function initializeAnimationFeatures() {
    const animateBtn = document.getElementById('animate-btn');
    const animatedElement = document.getElementById('animated-element');

    if (animateBtn && animatedElement) {
        animateBtn.addEventListener('click', function () {
            animatedElement.classList.add('animate');
            setTimeout(() => {
                animatedElement.classList.remove('animate');
            }, 1000);
        });
    }
}

// AJAX Features (from ajax-topic.js)
function initializeAjaxFeatures() {
    const ajaxBtn = document.getElementById('ajax-btn');
    const ajaxResult = document.getElementById('ajax-result');

    if (ajaxBtn && ajaxResult) {
        ajaxBtn.addEventListener('click', function () {
            // Simulate AJAX request
            ajaxResult.textContent = 'Loading...';
            setTimeout(() => {
                ajaxResult.textContent = 'AJAX request completed successfully!';
            }, 1000);
        });
    }
}

// DOM Manipulation Features (from js-dom-topic.js)
function initializeDOMFeatures() {
    const createElementBtn = document.getElementById('create-element-btn');
    const elementContainer = document.getElementById('element-container');

    if (createElementBtn && elementContainer) {
        createElementBtn.addEventListener('click', function () {
            const newElement = document.createElement('div');
            newElement.className = 'dynamic-element';
            newElement.textContent = 'New Element Created!';
            elementContainer.appendChild(newElement);
        });
    }
}

// Event Handling Features (from js-dom-topic.js)
function initializeEventFeatures() {
    const eventBtn = document.getElementById('event-btn');
    const eventLog = document.getElementById('event-log');

    if (eventBtn && eventLog) {
        eventBtn.addEventListener('click', function () {
            logEvent('Button clicked');
        });

        eventBtn.addEventListener('mouseover', function () {
            logEvent('Mouse over button');
        });
    }
}

// Data Loading Functions
// Show loading state
function showLoadingState() {
    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-state';
        loadingDiv.innerHTML = '<p>Loading quiz questions...</p>';
        quizContainer.appendChild(loadingDiv);
    }
}

// Hide loading state
function hideLoadingState() {
    const loadingState = document.querySelector('.loading-state');
    if (loadingState) {
        loadingState.remove();
    }
}

async function loadApplicationData() {
    try {
        showLoadingState();

        // Load configuration
        config = await dataLoader.loadConfig();

        // Load content data
        contentData = await dataLoader.loadContent();

        // Load quiz questions based on current page
        const topicId = getCurrentTopicId();
        quizQuestions = await dataLoader.loadQuizQuestions(topicId);

        console.log(`Loaded ${quizQuestions.length} quiz questions for topic: ${topicId}`);

        hideLoadingState();
    } catch (error) {
        console.error('Error loading application data:', error);
        hideLoadingState();

        // Show user-friendly error message
        showDataLoadError();

        // Load fallback data
        loadFallbackData();
    }
}

// Show error message to user
function showDataLoadError() {
    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'data-load-error';
        errorDiv.innerHTML = `
            <p>⚠️ Unable to load quiz data. Using default questions.</p>
            <p>Please check your internet connection and refresh the page.</p>
        `;
        quizContainer.appendChild(errorDiv);

        // Auto-hide error after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

function getCurrentTopicId() {
    // Extract topic ID from URL or page content
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');

    // Map filename to topic ID
    const topicMap = {
        'evolution-of-web': 'evolution-of-web',
        'html-introduction': 'html-introduction',
        'css-basics': 'css-basics',
        'js-introduction': 'js-introduction',
        'jquery-basics': 'jquery-basics',
        'ajax': 'ajax',
        'json': 'json',
        'tables-forms': 'tables-forms',
        'typography': 'typography',
        'typography-color': 'typography-color',
        'responsive-design': 'responsive-design',
        'flexbox-grid': 'flexbox-grid',
        'css-frameworks': 'css-frameworks',
        'framework-overview': 'framework-overview',
        'framework-selection': 'framework-selection',
        'frameworks-overview': 'frameworks-overview',
        'html-layout-elements': 'html-layout-elements',
        'html-audio-video': 'html-audio-video',
        'semantic-html': 'semantic-html',
        'lists-links-images': 'lists-links-images',
        'client-server-architecture': 'client-server-architecture',
        'client-server-scripting': 'client-server-scripting',
        'basic-protocols': 'basic-protocols',
        'dns-hierarchy': 'dns-hierarchy',
        'web-browsers-servers': 'web-browsers-servers',
        'css-box-model': 'css-box-model',
        'css-preprocessors': 'css-preprocessors',
        'js-dom': 'js-dom',
        'js-embedding': 'js-embedding',
        'js-functions-scope': 'js-functions-scope',
        'js-operators': 'js-operators',
        'js-variables': 'js-variables',
        'regular-expressions': 'regular-expressions',
        'error-handling': 'error-handling',
        'es6-features': 'es6-features',
        'async-await': 'async-await',
        'seo-fundamentals': 'seo-fundamentals',
        'ui-ux-design': 'ui-ux-design',
        'uiux-design': 'uiux-design',
        'web-accessibility': 'web-accessibility'
    };

    return topicMap[filename] || 'default';
}

function loadFallbackData() {
    // Fallback data in case JSON loading fails
    quizQuestions = [
        {
            question: "Who invented the World Wide Web?",
            options: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Mark Zuckerberg"],
            correct: 1,
            explanation: "Tim Berners-Lee invented the World Wide Web in 1989 while working at CERN."
        }
    ];

    config = {
        intersectionObserver: {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        },
        animations: {
            duration: { normal: 300 }
        }
    };

    contentData = {
        messages: {
            error: {
                networkError: "Network error. Please check your connection."
            }
        }
    };
}

// Utility Functions
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    if (isValid) {
        alert('Form submitted successfully!');
    } else {
        alert('Please fill in all required fields.');
    }

    return isValid;
}

function addFormField() {
    const container = document.getElementById('dynamic-fields');
    if (container) {
        const fieldCount = container.children.length + 1;
        const newField = document.createElement('div');
        newField.className = 'form-field';
        newField.innerHTML = `
            <label for="field-${fieldCount}">Field ${fieldCount}:</label>
            <input type="text" id="field-${fieldCount}" name="field-${fieldCount}">
            <button type="button" class="remove-field-btn" onclick="removeFormField(this)">Remove</button>
        `;
        container.appendChild(newField);
    }
}

function removeFormField(button) {
    button.parentElement.remove();
}

function logEvent(message) {
    const eventLog = document.getElementById('event-log');
    if (eventLog) {
        const timestamp = new Date().toLocaleTimeString();
        eventLog.innerHTML += `<div>${timestamp}: ${message}</div>`;
        eventLog.scrollTop = eventLog.scrollHeight;
    }
}

// Keyboard Navigation
document.addEventListener('keydown', function (e) {
    // ESC to close any open modals or reset states
    if (e.key === 'Escape') {
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
const observerOptions = config.intersectionObserver || {
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

// Observe all content sections for animations
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        observer.observe(section);
    });
});
