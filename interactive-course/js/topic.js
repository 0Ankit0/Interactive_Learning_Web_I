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

    // Check if quiz elements exist before initializing
    const quizContainer = document.querySelector('.quiz-container');

    if (quizContainer && currentTopicData.quiz && currentTopicData.quiz.questions) {
        topicManager.initializeQuiz(currentTopicData.quiz.questions);
    }    // Initialize timeline if timeline data exists
    if (currentTopicData.timeline && currentTopicData.timeline.events) {
        loadTimeline(currentTopicData.timeline.events);
    }

    // Initialize browser info demo if button exists
    const browserInfoBtn = document.getElementById('browserInfoBtn');
    if (browserInfoBtn) {
        browserInfoBtn.addEventListener('click', showBrowserInfo);
    }

    // Initialize HTTP request demo if button exists
    const httpRequestBtn = document.getElementById('httpRequestBtn');
    if (httpRequestBtn) {
        httpRequestBtn.addEventListener('click', makeHttpRequest);
    }

    // Add scroll listener to update active section as user scrolls
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
            // Only update if user hasn't manually interacted recently
            if (!window.tocUserInteracted) {
                topicManager.updateTOCHighlighting();
            }
        }, 100); // Debounce scroll events
    });
});

// Global functions for HTML onclick handlers
function scrollToSection(sectionId) {
    topicManager.scrollToSection(sectionId);
}

function toggleTocSection(button) {
    topicManager.toggleTocSection(button);
}

function runHTMLExample() {
    topicManager.runHTMLExample();
}

function buildURL() {
    topicManager.buildURL();
}

function showTooltip(text) {
    topicManager.showTooltip(text);
}

function selectAnswer(button, isCorrect) {
    const gameData = currentTopicData.webEvolutionGame;
    if (gameData) {
        topicManager.selectAnswer(button, isCorrect, gameData);
    }
}

function showDemo(type) {
    topicManager.showDemo(type);
}

function startLiveUpdates() {
    const messages = currentTopicData.liveUpdates?.messages;
    if (messages) {
        topicManager.startLiveUpdates(messages);
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
    }
}

// Quiz functions
function selectQuizAnswer(button, isCorrect) {
    topicManager.selectQuizAnswer(button, isCorrect);
}

function nextQuizQuestion() {
    topicManager.nextQuestion();
}

function retakeQuiz() {
    topicManager.retakeQuiz();
}

function simulateSearch() {
    const results = currentTopicData.search?.results;
    if (results) {
        topicManager.simulateSearch(results);
    }
}

function simulateBrowsing() {
    topicManager.simulateBrowsing();
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

function startDnsLookup() {
    const domainInput = document.getElementById('domainInput');
    const lookupVisualization = document.getElementById('lookupVisualization');
    const lookupResult = document.getElementById('lookupResult');
    const resultDomain = document.getElementById('resultDomain');
    const resultIP = document.getElementById('resultIP');
    const resultType = document.getElementById('resultType');
    const resultTTL = document.getElementById('resultTTL');

    if (!domainInput || !lookupVisualization || !lookupResult) {
        return;
    }

    const domain = domainInput.value.trim();
    if (!domain) {
        alert('Please enter a domain name');
        return;
    }

    // Only hide the previous result when starting a NEW search
    // Don't clear it immediately - let it persist until new search completes
    if (lookupResult.style.display !== 'none') {
        lookupResult.style.display = 'none';
    }

    // Show visualization
    lookupVisualization.style.display = 'block';

    // Reset all steps - remove active class and reset status
    const steps = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6'];
    steps.forEach(stepId => {
        const step = document.getElementById(stepId);
        if (step) {
            step.classList.remove('active');
            const status = step.querySelector('.status');
            if (status) status.textContent = 'Waiting...';
        }
    });

    // Simulate DNS resolution steps
    let currentStep = 0;
    const stepMessages = [
        'Checking browser cache...',
        'Checking OS DNS cache...',
        'Contacting recursive resolver...',
        'Querying root nameserver...',
        'Querying TLD nameserver (.com)...',
        'Querying authoritative nameserver...'
    ];

    const simulateStep = () => {
        if (currentStep < steps.length) {
            const stepElement = document.getElementById(steps[currentStep]);
            const statusElement = stepElement.querySelector('.status');

            stepElement.classList.add('active');
            statusElement.textContent = stepMessages[currentStep];

            currentStep++;
            setTimeout(simulateStep, 1000);
        } else {
            // Show results
            setTimeout(() => {
                lookupVisualization.style.display = 'none';
                lookupResult.style.display = 'block';

                // Mock DNS result
                const mockResults = {
                    'google.com': { ip: '142.250.184.14', type: 'A', ttl: '300' },
                    'github.com': { ip: '140.82.121.4', type: 'A', ttl: '60' },
                    'example.com': { ip: '93.184.216.34', type: 'A', ttl: '86400' }
                };

                const result = mockResults[domain] || { ip: '192.0.2.1', type: 'A', ttl: '3600' };

                if (resultDomain) resultDomain.textContent = domain;
                if (resultIP) resultIP.textContent = result.ip;
                if (resultType) resultType.textContent = result.type;
                if (resultTTL) resultTTL.textContent = result.ttl + ' seconds';
            }, 500);
        }
    };

    simulateStep();
}

// Client-Server Communication Demo Functions
function startCommunicationDemo() {
    const demoData = currentTopicData.communicationDemo;
    if (!demoData) {
        return;
    }

    const demo = document.getElementById('communication-demo');
    const clientBox = document.getElementById('client-box');
    const serverBox = document.getElementById('server-box');
    const requestMessage = document.getElementById('request-message');
    const responseMessage = document.getElementById('response-message');
    const processingMessage = document.getElementById('processing-message');
    const readyMessage = document.getElementById('ready-message');
    const packet1 = document.getElementById('packet1');
    const packet2 = document.getElementById('packet2');

    // Reset demo state
    resetCommunicationDemo();

    // Start the animation sequence
    let stepIndex = 0;

    function animateStep() {
        if (stepIndex >= demoData.steps.length) return;

        const step = demoData.steps[stepIndex];

        // Update messages based on step
        if (step.clientMessage) {
            if (step.step === 1) {
                requestMessage.style.display = 'block';
            } else if (step.step === 4) {
                responseMessage.style.display = 'block';
            }
        }

        if (step.serverMessage) {
            if (step.step === 2) {
                processingMessage.style.display = 'block';
            } else if (step.step === 3) {
                readyMessage.style.display = 'block';
            } else if (step.step === 4) {
                processingMessage.style.display = 'none';
                readyMessage.style.display = 'none';
            }
        }

        // Animate packets
        if (step.step === 1) {
            packet1.style.display = 'block';
            packet1.style.animation = 'moveRight 1s ease-in-out';
        } else if (step.step === 4) {
            packet2.style.display = 'block';
            packet2.style.animation = 'moveLeft 1s ease-in-out';
        }

        stepIndex++;
        setTimeout(animateStep, step.delay);
    }

    animateStep();
}

function resetCommunicationDemo() {
    const elements = [
        'request-message', 'response-message', 'processing-message', 'ready-message',
        'packet1', 'packet2'
    ];

    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
            if (element.style.animation) {
                element.style.animation = '';
            }
        }
    });
}

// Function to load timeline from topic data
function loadTimeline(events) {
    const timelineContainer = document.getElementById('timeline-container');
    if (!timelineContainer) return;

    // Clear existing content
    timelineContainer.innerHTML = '';

    // Generate timeline HTML from data
    events.forEach(event => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';

        timelineItem.innerHTML = `
            <div class="timeline-year">${event.year}</div>
            <div class="timeline-content">
                <div class="timeline-card">
                    <div class="timeline-card-header">
                        <h4>${event.title}</h4>
                    </div>
                    <div class="timeline-card-body">
                        <p>${event.description}</p>
                    </div>
                </div>
            </div>
        `;

        timelineContainer.appendChild(timelineItem);
    });
}

// Browser Info Demo Function
function showBrowserInfo() {
    const browserInfoDiv = document.getElementById('browserInfo');
    const browserDetailsList = document.getElementById('browserDetails');

    if (!browserInfoDiv || !browserDetailsList) {
        console.error('Browser info demo elements not found');
        return;
    }

    // Clear existing content
    browserDetailsList.innerHTML = '';

    // Get browser information
    const browserInfo = {
        'Browser Name': navigator.appName,
        'Browser Version': navigator.appVersion,
        'User Agent': navigator.userAgent,
        'Platform': navigator.platform,
        'Language': navigator.language,
        'Cookies Enabled': navigator.cookieEnabled ? 'Yes' : 'No',
        'Online Status': navigator.onLine ? 'Online' : 'Offline',
        'Screen Resolution': `${screen.width} x ${screen.height}`,
        'Viewport Size': `${window.innerWidth} x ${window.innerHeight}`,
        'Color Depth': `${screen.colorDepth} bits`,
        'Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    // Create list items for each piece of information
    Object.entries(browserInfo).forEach(([key, value]) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${key}:</strong> ${value}`;
        browserDetailsList.appendChild(listItem);
    });

    // Show the browser info div
    browserInfoDiv.style.display = 'block';

    // Scroll to the browser info section
    browserInfoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// HTTP Request Demo Function
function makeHttpRequest() {
    const httpResponseDiv = document.getElementById('httpResponse');
    const responseDataPre = document.getElementById('responseData');
    const httpRequestBtn = document.getElementById('httpRequestBtn');

    if (!httpResponseDiv || !responseDataPre || !httpRequestBtn) {
        console.error('HTTP request demo elements not found');
        return;
    }

    // Show loading state
    httpRequestBtn.disabled = true;
    httpRequestBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Making Request...';
    responseDataPre.textContent = 'Loading...';

    // Show the response div
    httpResponseDiv.style.display = 'block';

    // Make HTTP request to a public API
    fetch('https://httpbin.org/get')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Format the response data for display
            const formattedData = {
                url: data.url,
                origin: data.origin,
                headers: data.headers,
                timestamp: new Date().toLocaleString()
            };

            responseDataPre.textContent = JSON.stringify(formattedData, null, 2);
        })
        .catch(error => {
            responseDataPre.textContent = `Error: ${error.message}\n\nThis could be due to:\n- Network connectivity issues\n- CORS restrictions\n- API being unavailable\n\nTry refreshing the page and trying again.`;
            console.error('HTTP Request Error:', error);
        })
        .finally(() => {
            // Reset button state
            httpRequestBtn.disabled = false;
            httpRequestBtn.innerHTML = '<i class="fas fa-play"></i> Make HTTP Request';
        });

    // Scroll to the HTTP response section
    httpResponseDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}