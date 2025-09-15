// General Topic Utilities
// Reusable functions for interactive topic pages

class TopicManager {
    constructor(config, topicData = {}) {
        this.config = config;
        this.topicData = topicData;
        this.currentQuizQuestion = 0;
        this.quizScore = 0;
        this.liveUpdatesInterval = null;
        this.sectionMappingCache = null; // Cache for section mapping
    }

    // Initialize all page functionality
    initialize() {
        this.initializeScrollProgress();
        this.initializeTableOfContents();
        this.initializeInteractiveElements();
        this.loadTopicProgress();

        // Initialize optional features only if they exist in the topic data
        this.initializeOptionalFeatures();
    }

    // Initialize optional features based on available data
    initializeOptionalFeatures() {
        // Only initialize features that have data and corresponding HTML elements
        if (this.topicData.search && document.querySelector('.search-demo')) {
            console.log('Search feature available for this topic');
        }

        if (this.topicData.liveUpdates && document.querySelector('.live-updates')) {
            console.log('Live updates feature available for this topic');
        }

        if (this.topicData.browserSimulation && document.querySelector('.browser-simulation')) {
            console.log('Browser simulation feature available for this topic');
        }

        if (this.topicData.timeline && document.querySelector('.timeline-container')) {
            console.log('Timeline feature available for this topic');
        }
    }

    // Scroll progress functionality
    initializeScrollProgress() {
        const progressBar = document.getElementById('topic-progress');

        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.scrollY;
            const scrollPercent = (scrollTop / documentHeight) * 100;

            if (progressBar) {
                progressBar.style.width = Math.min(scrollPercent, 100) + '%';
            }

            // Update table of contents highlighting
            this.updateTOCHighlighting();

            // Save progress
            this.saveTopicProgress(scrollPercent);
        });
    }

    // Update table of contents highlighting based on scroll position
    updateTOCHighlighting() {
        const sections = document.querySelectorAll('section[id]');
        const tocLinks = document.querySelectorAll('.table-of-contents a');

        if (!sections.length || !tocLinks.length) return;

        let currentSection = '';
        const scrollPos = window.scrollY + 100; // Offset for better UX

        // Find the current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // If no section is found, use the first visible section
        if (!currentSection) {
            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                const sectionTop = section.offsetTop;

                if (scrollPos < sectionTop) {
                    currentSection = i > 0 ? sections[i - 1].getAttribute('id') : section.getAttribute('id');
                    break;
                }
            }
        }

        // Update TOC active states for links
        tocLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === currentSection) {
                link.classList.add('active');
            }
        });

        // Update dropdown section states
        this.updateTOCDropdownStates(currentSection);
    }

    // Update TOC dropdown section states based on current section
    updateTOCDropdownStates(currentSectionId) {
        // Dynamically build section mapping from the TOC HTML structure
        const sectionMapping = this.buildSectionMappingFromTOC();
        
        const targetSectionName = sectionMapping[currentSectionId];
        if (!targetSectionName) return;

        const toggleButtons = document.querySelectorAll('.toc-dropdown-toggle');

        toggleButtons.forEach(button => {
            const content = button.nextElementSibling;
            const chevron = button.querySelector('.toc-chevron');
            const sectionName = button.querySelector('span').textContent.trim();

            if (sectionName === targetSectionName) {
                // Expand this section
                content.classList.add('expanded');
                chevron.classList.remove('fa-chevron-down');
                chevron.classList.add('fa-chevron-up');
                button.setAttribute('aria-expanded', 'true');
            } else {
                // Collapse other sections
                content.classList.remove('expanded');
                chevron.classList.remove('fa-chevron-up');
                chevron.classList.add('fa-chevron-down');
                button.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Table of contents functionality
    initializeTableOfContents() {
        const tocLinks = document.querySelectorAll('.table-of-contents a');
        const toggleButtons = document.querySelectorAll('.toc-dropdown-toggle');

        // Initialize all sections as collapsed first
        toggleButtons.forEach(button => {
            const content = button.nextElementSibling;
            const chevron = button.querySelector('.toc-chevron');

            // Ensure all sections start collapsed
            content.classList.remove('expanded');
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');
            button.setAttribute('aria-expanded', 'false');

            // Add keyboard accessibility
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTocSection(button);
                }
            });
        });

        // Add click handlers for TOC links
        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all links
                tocLinks.forEach(l => l.classList.remove('active'));

                // Add active class to clicked link
                link.classList.add('active');

                // Scroll to section
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);

                // Small delay to let scroll happen, then update highlighting
                setTimeout(() => {
                    this.updateTOCHighlighting();
                }, 100);
            });
        });

        // Set initial active section after a delay
        setTimeout(() => {
            this.updateTOCHighlighting();
        }, 100);

        // Initialize highlighting on page load
        this.updateTOCHighlighting();
    }

    // Dynamically build section mapping from TOC HTML structure
    buildSectionMappingFromTOC() {
        // Return cached version if available
        if (this.sectionMappingCache) {
            return this.sectionMappingCache;
        }

        const sectionMapping = {};
        const toggleButtons = document.querySelectorAll('.toc-dropdown-toggle');

        toggleButtons.forEach(button => {
            const content = button.nextElementSibling;
            const sectionName = button.querySelector('span').textContent.trim();
            
            // Find all links in this TOC section
            const links = content.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const sectionId = href.substring(1); // Remove the '#'
                    sectionMapping[sectionId] = sectionName;
                }
            });
        });

        // Cache the result
        this.sectionMappingCache = sectionMapping;
        return sectionMapping;
    }

    // Toggle TOC dropdown section
    toggleTocSection(button) {
        const dropdownContent = button.nextElementSibling;
        const chevron = button.querySelector('.toc-chevron');
        const isExpanded = dropdownContent.classList.contains('expanded');

        // First, close all other sections (accordion behavior)
        const allToggleButtons = document.querySelectorAll('.toc-dropdown-toggle');
        allToggleButtons.forEach(otherButton => {
            if (otherButton !== button) {
                const otherContent = otherButton.nextElementSibling;
                const otherChevron = otherButton.querySelector('.toc-chevron');

                // Close other sections
                otherContent.classList.remove('expanded');
                otherChevron.classList.remove('fa-chevron-up');
                otherChevron.classList.add('fa-chevron-down');
                otherButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Now toggle the clicked section
        if (isExpanded) {
            // If already expanded, close it
            dropdownContent.classList.remove('expanded');
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');
            button.setAttribute('aria-expanded', 'false');
        } else {
            // If collapsed, expand it
            dropdownContent.classList.add('expanded');
            chevron.classList.remove('fa-chevron-down');
            chevron.classList.add('fa-chevron-up');
            button.setAttribute('aria-expanded', 'true');
        }

        // Temporarily disable scroll-based updates to prevent interference
        window.tocUserInteracted = true;
        setTimeout(() => {
            window.tocUserInteracted = false;
        }, 2000); // Re-enable after 2 seconds
    }

    // Interactive elements initialization
    initializeInteractiveElements() {
        // Add click handlers for interactive elements
        const interactiveElements = document.querySelectorAll('.interactive-element');
        interactiveElements.forEach(element => {
            element.addEventListener('click', () => {
                element.classList.toggle('active');
            });
        });
    }

    // Progress tracking
    saveTopicProgress(percent) {
        localStorage.setItem(`topic_${this.config.topicId}_progress`, percent);
    }

    loadTopicProgress() {
        const progress = localStorage.getItem(`topic_${this.config.topicId}_progress`);
        if (progress) {
            const progressBar = document.getElementById('topic-progress');
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
        }
    }

    // Navigation methods
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Interactive demos
    runHTMLExample() {
        const htmlCode = document.getElementById('html-code');
        const htmlOutput = document.getElementById('html-output');

        if (htmlCode && htmlOutput) {
            const code = htmlCode.value;
            const blob = new Blob([code], { type: 'text/html' });
            const url = URL.createObjectURL(blob);

            htmlOutput.innerHTML = `<iframe src="${url}" width="100%" height="200"></iframe>`;

            // Clean up the object URL after a short delay
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
    }

    buildURL() {
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

    simulateBrowsing(messages) {
        const demoStatus = document.getElementById('demo-status');
        const browserSimulator = document.getElementById('browser-simulator');
        const browserContent = document.getElementById('browser-content');
        const simulateButton = document.querySelector('[onclick*="simulateBrowsing"]');

        // Check if browser simulation feature is available
        if (!demoStatus || !messages || !browserSimulator) {
            console.log('Browser simulation feature not available on this page');
            return;
        }

        // Reset previous state
        if (browserSimulator) browserSimulator.classList.remove('visible');
        if (browserContent) browserContent.classList.remove('visible');

        // Disable button during simulation
        if (simulateButton) {
            simulateButton.disabled = true;
            simulateButton.textContent = "Loading...";
        }

        let messageIndex = 0;

        const showNextMessage = () => {
            if (messageIndex < messages.length) {
                demoStatus.textContent = messages[messageIndex];
                messageIndex++;
                setTimeout(showNextMessage, 1500);
            } else {
                // Show the browser simulator and content after simulation completes
                setTimeout(() => {
                    if (browserSimulator) browserSimulator.classList.add('visible');
                    if (browserContent) browserContent.classList.add('visible');
                    demoStatus.textContent = "Web page loaded successfully! Try clicking the links above.";
                    demoStatus.style.color = "#28a745"; // Green color for success

                    // Re-enable button
                    if (simulateButton) {
                        simulateButton.disabled = false;
                        simulateButton.textContent = "Simulate Link Navigation";
                    }
                }, 1000);
            }
        };

        showNextMessage();
    }

    showTooltip(text) {
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

    selectAnswer(button, isCorrect, gameData) {
        const buttons = button.parentNode.querySelectorAll('button');
        const feedback = document.getElementById('game-feedback');

        // Update game tracking
        if (gameData) {
            if (isCorrect) {
                gameData.correctAnswers++;
            }
        }

        // Disable all buttons
        buttons.forEach(btn => {
            btn.disabled = true;
            if (btn === button) {
                btn.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
        });

        // Show feedback
        if (feedback && gameData && gameData.responses) {
            const responseArray = isCorrect ? gameData.responses.correct : gameData.responses.incorrect;
            const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];
            feedback.textContent = randomResponse;
            feedback.className = `game-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        }

        // Reset after 3 seconds
        setTimeout(() => {
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.className = '';
            });
            if (feedback) {
                feedback.textContent = '';
                feedback.className = 'game-feedback';
            }
        }, 3000);
    }

    simulateSearch(searchResults) {
        const searchInput = document.getElementById('search-input');
        const searchResultsContainer = document.getElementById('search-results');

        // Check if search feature is available on this page
        if (!searchInput || !searchResultsContainer || !searchResults) {
            console.log('Search feature not available on this page');
            return;
        }

        const query = searchInput.value.toLowerCase();
        const filteredResults = this.getSearchResults(query, searchResults);

        // Clear current results
        searchResultsContainer.innerHTML = '';

        // Add loading state
        searchResultsContainer.innerHTML = '<div class="loading">Searching early web...</div>';

        // Simulate search delay
        setTimeout(() => {
            searchResultsContainer.innerHTML = filteredResults.map(result => `
                <div class="result-item">
                    <h4><a href="#">${result.title}</a></h4>
                    <p>${result.description}</p>
                    <cite>${result.url}</cite>
                </div>
            `).join('');
        }, 1000);
    }

    getSearchResults(query, allResults) {
        if (!query) return allResults.slice(0, 3);

        return allResults.filter(result =>
            result.title.toLowerCase().includes(query) ||
            result.description.toLowerCase().includes(query)
        ).slice(0, 3);
    }

    showDemo(type) {
        const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.demo-content');

        tabs.forEach(tab => tab.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));

        document.querySelector(`[onclick="showDemo('${type}')"]`).classList.add('active');
        document.getElementById(`${type}-demo`).classList.add('active');

        if (type === 'webapp') {
            this.startLiveUpdates(TOPIC_DATA.liveUpdates.messages);
        } else {
            this.stopLiveUpdates();
        }
    }

    startLiveUpdates(updateMessages) {
        // Check if live updates feature is available
        if (!updateMessages || !document.querySelector('.live-updates')) {
            console.log('Live updates feature not available on this page');
            return;
        }

        if (this.liveUpdatesInterval) return;

        let updateIndex = 0;

        this.liveUpdatesInterval = setInterval(() => {
            this.addUpdate(updateMessages[updateIndex % updateMessages.length]);
            updateIndex++;
        }, 2000);
    }

    stopLiveUpdates() {
        if (this.liveUpdatesInterval) {
            clearInterval(this.liveUpdatesInterval);
            this.liveUpdatesInterval = null;
        }
    }

    addUpdate(message = null) {
        const liveUpdates = document.getElementById('live-updates');
        if (!liveUpdates || !message) {
            return;
        }

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
        updateElement.innerHTML = `<strong>${timestamp}:</strong> ${message}`;

        liveUpdates.appendChild(updateElement);

        // Keep only last 5 updates
        while (liveUpdates.children.length > 5) {
            liveUpdates.removeChild(liveUpdates.firstChild);
        }
    }

    toggleLiveUpdates(updateMessages) {
        if (this.liveUpdatesInterval) {
            this.stopLiveUpdates();
        } else {
            this.startLiveUpdates(updateMessages);
        }
    }

    // Quiz functionality
    initializeQuiz(questions) {
        this.quizQuestions = questions;
        this.currentQuizQuestion = 0;
        this.quizScore = 0;
        this.showQuizQuestion();
    }

    showQuizQuestion() {
        if (!this.quizQuestions || this.currentQuizQuestion >= this.quizQuestions.length) {
            this.showQuizResults();
            return;
        }

        const question = this.quizQuestions[this.currentQuizQuestion];
        const questionElement = document.querySelector('#quiz-question h3');
        const optionsContainer = document.querySelector('.quiz-options');
        const progressFill = document.getElementById('quiz-progress');
        const currentQuestionSpan = document.getElementById('current-question');
        const totalQuestionsSpan = document.getElementById('total-questions');

        if (questionElement) questionElement.textContent = question.question;
        if (currentQuestionSpan) currentQuestionSpan.textContent = this.currentQuizQuestion + 1;
        if (totalQuestionsSpan) totalQuestionsSpan.textContent = this.quizQuestions.length;

        if (progressFill) {
            const progress = (this.currentQuizQuestion / this.quizQuestions.length) * 100;
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

    selectQuizAnswer(button, isCorrect) {
        const question = this.quizQuestions[this.currentQuizQuestion];
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
            this.quizScore++;
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

    nextQuestion() {
        this.currentQuizQuestion++;

        if (this.currentQuizQuestion < this.quizQuestions.length) {
            this.showQuizQuestion();
        } else {
            this.showQuizResults();
        }
    }

    showQuizResults() {
        const quizQuestion = document.querySelector('.quiz-question');
        const quizResults = document.getElementById('quiz-results');
        const finalScore = document.getElementById('final-score');
        const progressFill = document.getElementById('quiz-progress');

        // Hide question, show results
        if (quizQuestion) quizQuestion.style.display = 'none';
        if (quizResults) quizResults.style.display = 'block';

        // Update final score
        if (finalScore) finalScore.textContent = `${this.quizScore}/${this.quizQuestions.length}`;

        // Complete progress bar
        if (progressFill) progressFill.style.width = '100%';

        // Save completion
        this.saveTopicCompletion();
    }

    retakeQuiz() {
        const quizQuestion = document.querySelector('.quiz-question');
        const quizResults = document.getElementById('quiz-results');

        // Show question, hide results
        if (quizQuestion) quizQuestion.style.display = 'block';
        if (quizResults) quizResults.style.display = 'none';

        // Reset quiz
        this.initializeQuiz(this.quizQuestions);
    }

    completeLesson() {
        // Mark lesson as complete and navigate to next topic or unit
        this.saveTopicCompletion();

        // Show completion message
        alert('Congratulations! You have completed the lesson. You will now return to the unit page.');

        // Navigate back to unit page
        if (this.config.nextPageUrl) {
            window.location.href = this.config.nextPageUrl;
        }
    }

    saveTopicCompletion() {
        const completion = {
            completed: true,
            score: this.quizScore,
            totalQuestions: this.quizQuestions ? this.quizQuestions.length : 0,
            completedAt: new Date().toISOString()
        };

        localStorage.setItem(`topic-completion-${this.config.topicId}`, JSON.stringify(completion));
    }

    getSectionsRead() {
        // This could be enhanced to track which sections have been viewed
        return [];
    }
}

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

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TopicManager;
}