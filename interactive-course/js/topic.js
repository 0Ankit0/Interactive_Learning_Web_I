// Topic Page Specific Implementation
// Uses the general TopicManager class with topic-specific data
// Automatically detects current topic and loads appropriate data

// Get current topic data based on the page URL
const currentTopicData = getCurrentTopicData();

// Create topic manager instance with current topic's data
const topicManager = new TopicManager(currentTopicData.config, currentTopicData);

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function () {
    // Update global TOPIC_DATA for backward compatibility
    TOPIC_DATA = currentTopicData;

    topicManager.initialize();
    topicManager.initializeQuiz(currentTopicData.quiz.questions);

    // Initialize Table of Contents functionality
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
        button.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTocSection(button);
            }
        });
    });

    // Set the active section based on current page position
    setTimeout(() => {
        const currentSection = getCurrentVisibleSection();
        const activeTocSection = getActiveTocSection(currentSection);

        if (activeTocSection) {
            setActiveTocSection(activeTocSection);
        } else {
            // If no section detected (top of page), show the first section by default
            setActiveTocSection('Web Fundamentals');
        }
    }, 100); // Small delay to ensure content is fully loaded

    // Add scroll listener to update active section as user scrolls
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
            // Only update if user hasn't manually interacted recently
            if (!window.tocUserInteracted) {
                const currentSection = getCurrentVisibleSection();
                const activeTocSection = getActiveTocSection(currentSection);
                if (activeTocSection) {
                    setActiveTocSection(activeTocSection);
                }
            }
        }, 100); // Debounce scroll events
    });
});

// Global functions for HTML onclick handlers
function scrollToSection(sectionId) {
    topicManager.scrollToSection(sectionId);

    // Update table of contents to show the appropriate section
    setTimeout(() => {
        const activeTocSection = getActiveTocSection(sectionId);
        if (activeTocSection) {
            setActiveTocSection(activeTocSection);
        }
    }, 100); // Small delay to allow scroll to complete
}

function toggleTocSection(button) {
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

// Function to find which ToC section should be active based on content section
function getActiveTocSection(contentSectionId) {
    // Map content sections to their corresponding ToC sections
    const sectionMapping = {
        'introduction': 'Web Fundamentals',
        'history': 'Web Fundamentals',
        'www': 'Web Fundamentals',
        'url': 'Web Fundamentals',
        'versions': 'Web Evolution',
        'search-engines': 'Web Evolution',
        'websites-vs-apps': 'Web Evolution',
        'search-demo': 'Interactive Demos',
        'browser-simulation': 'Interactive Demos',
        'live-updates-demo': 'Interactive Demos',
        'quiz': 'Assessment & Resources',
        'external-resources': 'Assessment & Resources'
    };

    return sectionMapping[contentSectionId] || null;
}

// Function to expand the appropriate ToC section and highlight active link
function setActiveTocSection(targetSectionName) {
    const toggleButtons = document.querySelectorAll('.toc-dropdown-toggle');

    // Remove active class from all links first
    const allLinks = document.querySelectorAll('.toc-dropdown-content a');
    allLinks.forEach(link => link.classList.remove('active'));

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

            // Also highlight the current content section link
            const currentSection = getCurrentVisibleSection();
            const activeLink = content.querySelector(`a[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        } else {
            // Collapse other sections
            content.classList.remove('expanded');
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');
            button.setAttribute('aria-expanded', 'false');
        }
    });
}

// Function to detect which content section is currently in view
function getCurrentVisibleSection() {
    const sections = document.querySelectorAll('.content-section');
    const scrollPosition = window.scrollY + 100; // Add offset for fixed headers

    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollPosition) {
            return section.id;
        }
    }

    // Default to first section if none found
    return sections.length > 0 ? sections[0].id : 'introduction';
}

function runHTMLExample() {
    topicManager.runHTMLExample();
}

function buildURL() {
    topicManager.buildURL();
}

function simulateBrowsing() {
    const messages = currentTopicData.browserSimulation?.messages;
    if (messages) {
        topicManager.simulateBrowsing(messages);
    } else {
        console.log('Browser simulation not available for this topic');
    }
}

function showTooltip(text) {
    topicManager.showTooltip(text);
}

function selectAnswer(button, isCorrect) {
    const gameData = currentTopicData.webEvolutionGame;
    if (gameData) {
        topicManager.selectAnswer(button, isCorrect, gameData);
    } else {
        console.log('Web evolution game not available for this topic');
    }
}

function showDemo(type) {
    topicManager.showDemo(type);
}

function startLiveUpdates() {
    const messages = currentTopicData.liveUpdates?.messages;
    if (messages) {
        topicManager.startLiveUpdates(messages);
    } else {
        console.log('Live updates not available for this topic');
    }
}

function stopLiveUpdates() {
    topicManager.stopLiveUpdates();
}

function addUpdate(message) {
    topicManager.addUpdate(message);
}

function toggleLiveUpdates() {
    const messages = currentTopicData.liveUpdates?.messages;
    if (messages) {
        topicManager.toggleLiveUpdates(messages);
    } else {
        console.log('Live updates not available for this topic');
    }
}

function simulateSearch() {
    const results = currentTopicData.search?.results;
    if (results) {
        topicManager.simulateSearch(results);
    } else {
        console.log('Search feature not available for this topic');
    }
}

function selectQuizAnswer(button, isCorrect) {
    topicManager.selectQuizAnswer(button, isCorrect);
}

function nextQuestion() {
    topicManager.nextQuestion();
}

function showQuizResults() {
    topicManager.showQuizResults();
}

function retakeQuiz() {
    topicManager.retakeQuiz();
}

function completeLesson() {
    topicManager.completeLesson();
}