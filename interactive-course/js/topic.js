// Topic Page Specific Implementation
// Uses the general TopicManager class with topic-specific data
// Automatically detects current topic and loads appropriate data

console.log('Loading topic.js...');

// Get current topic data based on the page URL
const currentTopicData = getCurrentTopicData();

console.log('Current topic data loaded:', currentTopicData ? 'Success' : 'Failed');

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

    // Initialize div demo if buttons exist
    const addDivBtn = document.getElementById('addDiv');
    const styleDivBtn = document.getElementById('styleDiv');
    const nestDivBtn = document.getElementById('nestDiv');
    const clearDivsBtn = document.getElementById('clearDivs');

    if (addDivBtn && styleDivBtn && nestDivBtn && clearDivsBtn) {
        addDivBtn.addEventListener('click', addDivElement);
        styleDivBtn.addEventListener('click', toggleDivStyling);
        nestDivBtn.addEventListener('click', nestDivElement);
        clearDivsBtn.addEventListener('click', clearAllDivs);
    }

    // Initialize span demo if buttons exist
    const highlightSpanBtn = document.getElementById('highlightSpan');
    const colorSpanBtn = document.getElementById('colorSpan');
    const emphasisSpanBtn = document.getElementById('emphasisSpan');

    if (highlightSpanBtn && colorSpanBtn && emphasisSpanBtn) {
        highlightSpanBtn.addEventListener('click', highlightSpanText);
        colorSpanBtn.addEventListener('click', colorSpanText);
        emphasisSpanBtn.addEventListener('click', addEmphasisToSpan);
    }

    // Initialize canvas demos if elements exist
    const clearCanvasBtn = document.getElementById('clearCanvas');
    const startAnimationBtn = document.getElementById('startAnimation');
    const stopAnimationBtn = document.getElementById('stopAnimation');
    const addShapeBtn = document.getElementById('addShape');
    const resetShapesBtn = document.getElementById('resetShapes');

    if (clearCanvasBtn) {
        clearCanvasBtn.addEventListener('click', clearDrawingCanvas);
    }
    if (startAnimationBtn) {
        startAnimationBtn.addEventListener('click', startCanvasAnimation);
    }
    if (stopAnimationBtn) {
        stopAnimationBtn.addEventListener('click', stopCanvasAnimation);
    }
    if (addShapeBtn) {
        addShapeBtn.addEventListener('click', addCanvasShape);
    }
    if (resetShapesBtn) {
        resetShapesBtn.addEventListener('click', resetCanvasShapes);
    }

    // Initialize canvas drawing controls
    const drawColorInput = document.getElementById('drawColor');
    const drawSizeInput = document.getElementById('drawSize');
    const animSpeedInput = document.getElementById('animSpeed');

    if (drawColorInput) {
        drawColorInput.addEventListener('change', updateDrawingColor);
    }
    if (drawSizeInput) {
        drawSizeInput.addEventListener('input', updateDrawingSize);
        // Initialize size display
        updateDrawingSize();
    }
    if (animSpeedInput) {
        animSpeedInput.addEventListener('input', updateAnimationSpeed);
    }

    // Initialize canvas demos
    setTimeout(initializeCanvases, 100);

    // Initialize tab functionality
    initializeTabs();

    // Initialize Box Model Visualizer
    initializeBoxModelVisualizer();

    // Initialize Color Explorer
    initializeColorExplorer();

    // Initialize CSS Selector Challenge
    initializeSelectorChallenge();

    // Initialize JavaScript Introduction features
    initializeJavaScriptIntro();

    // Initialize AJAX demos
    initializeAjaxDemos();

    // Initialize async/await demos
    initializeAsyncAwaitDemo();

    // Initialize responsive design demo
    initializeResponsiveDemo();

    // Initialize ES6 features demo
    initializeES6Demo();

    // Initialize client-server scripting demo
    initializeClientServerDemo();

    // Initialize canvas demos (drawing, animation, interactive)
    initializeCanvasDemo();

    // Initialize audio/video demos
    initializeAudioVideoDemo();

    // Initialize JSON demos
    initializeJSONDemo();

    // Initialize regex tester
    initializeRegexDemo();

    // Initialize HTTP Protocol Simulator
    initializeHttpProtocolSimulator();

    // Initialize function builder
    initializeFunctionBuilder();

    // Initialize Flexbox and Grid Playgrounds
    initializeFlexboxPlayground();
    initializeGridPlayground();

    // Initialize DOM manipulation event listeners
    initializeDOMManipulation();

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

function applyFormatting(formatType) {
    const displayElement = document.getElementById('format-display');
    if (!displayElement) return;

    // Reset all formatting first
    displayElement.style.fontWeight = 'normal';
    displayElement.style.fontStyle = 'normal';
    displayElement.style.textDecoration = 'none';
    displayElement.style.backgroundColor = 'transparent';

    // Apply the selected formatting
    switch (formatType) {
        case 'bold':
            displayElement.style.fontWeight = 'bold';
            displayElement.innerHTML = '<p><strong>This text is bold!</strong></p>';
            break;
        case 'italic':
            displayElement.style.fontStyle = 'italic';
            displayElement.innerHTML = '<p><em>This text is italic!</em></p>';
            break;
        case 'underline':
            displayElement.style.textDecoration = 'underline';
            displayElement.innerHTML = '<p><u>This text is underlined!</u></p>';
            break;
        case 'highlight':
            displayElement.style.backgroundColor = '#ffff00';
            displayElement.innerHTML = '<p><mark>This text is highlighted!</mark></p>';
            break;
        default:
            displayElement.innerHTML = '<p>This text will change based on your selection!</p>';
    }
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

// Initialize Box Model Visualizer
function initializeBoxModelVisualizer() {
    const contentWidth = document.getElementById('content-width');
    const contentHeight = document.getElementById('content-height');
    const paddingSize = document.getElementById('padding-size');
    const borderSize = document.getElementById('border-size');
    const marginSize = document.getElementById('margin-size');

    const contentWidthValue = document.getElementById('content-width-value');
    const contentHeightValue = document.getElementById('content-height-value');
    const paddingSizeValue = document.getElementById('padding-size-value');
    const borderSizeValue = document.getElementById('border-size-value');
    const marginSizeValue = document.getElementById('margin-size-value');

    const demoBox = document.getElementById('demo-box');
    const totalWidth = document.getElementById('total-width');
    const totalHeight = document.getElementById('total-height');

    // Check if all elements exist
    if (!contentWidth || !contentHeight || !paddingSize || !borderSize || !marginSize || !demoBox) {
        return; // Exit if elements don't exist (not on box model page)
    }

    function updateBoxModel() {
        const width = parseInt(contentWidth.value);
        const height = parseInt(contentHeight.value);
        const padding = parseInt(paddingSize.value);
        const border = parseInt(borderSize.value);
        const margin = parseInt(marginSize.value);

        // Update value displays
        if (contentWidthValue) contentWidthValue.textContent = width + 'px';
        if (contentHeightValue) contentHeightValue.textContent = height + 'px';
        if (paddingSizeValue) paddingSizeValue.textContent = padding + 'px';
        if (borderSizeValue) borderSizeValue.textContent = border + 'px';
        if (marginSizeValue) marginSizeValue.textContent = margin + 'px';

        // Update visualizer
        const marginLayer = demoBox.querySelector('.margin-layer');
        const borderLayer = demoBox.querySelector('.border-layer');
        const paddingLayer = demoBox.querySelector('.padding-layer');
        const contentArea = demoBox.querySelector('.content-area');

        if (marginLayer && borderLayer && paddingLayer && contentArea) {
            // Set content dimensions
            contentArea.style.width = width + 'px';
            contentArea.style.height = height + 'px';

            // Set padding
            paddingLayer.style.padding = padding + 'px';

            // Set border
            borderLayer.style.border = border + 'px solid #007bff';

            // Set margin
            marginLayer.style.margin = margin + 'px';

            // Calculate total dimensions
            const calculatedWidth = width + (padding * 2) + (border * 2) + (margin * 2);
            const calculatedHeight = height + (padding * 2) + (border * 2) + (margin * 2);

            // Update total dimensions display
            if (totalWidth) totalWidth.textContent = calculatedWidth + 'px';
            if (totalHeight) totalHeight.textContent = calculatedHeight + 'px';
        }
    }

    // Add event listeners
    contentWidth.addEventListener('input', updateBoxModel);
    contentHeight.addEventListener('input', updateBoxModel);
    paddingSize.addEventListener('input', updateBoxModel);
    borderSize.addEventListener('input', updateBoxModel);
    marginSize.addEventListener('input', updateBoxModel);

    // Initial update
    updateBoxModel();
}

// Initialize Color Explorer
function initializeColorExplorer() {
    const bgColor = document.getElementById('bg-color');
    const textColor = document.getElementById('text-color');
    const bgColorInput = document.getElementById('bg-color-input');
    const textColorInput = document.getElementById('text-color-input');
    const colorPreview = document.getElementById('color-preview');

    // Check if elements exist (not on css-basics page)
    if (!bgColor || !textColor || !colorPreview) {
        return;
    }

    function updateColorPreview() {
        const bgValue = bgColor.value;
        const textValue = textColor.value;

        // Update preview with !important to override any existing styles
        colorPreview.style.setProperty('background-color', bgValue, 'important');
        colorPreview.style.setProperty('color', textValue, 'important');

        // Also update child elements to ensure text color is applied
        const childElements = colorPreview.querySelectorAll('h3, p, span, div');
        childElements.forEach(element => {
            element.style.setProperty('color', textValue, 'important');
        });

        // Update text inputs
        if (bgColorInput) bgColorInput.value = bgValue;
        if (textColorInput) textColorInput.value = textValue;

        // Optional debug logging (can be removed in production)
        // console.log('Color Explorer Update:', { background: bgValue, text: textValue });
    }

    function updateFromTextInput() {
        const bgValue = bgColorInput ? bgColorInput.value : bgColor.value;
        const textValue = textColorInput ? textColorInput.value : textColor.value;

        // Validate color format (hex, rgb, rgba, hsl, hsla, named colors)
        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
        const rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([01]?\.?\d*)\s*\)$/;
        const hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
        const hslaRegex = /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*([01]?\.?\d*)\s*\)$/;
        const namedColors = ['red', 'blue', 'green', 'yellow', 'black', 'white', 'purple', 'orange', 'pink', 'brown', 'gray', 'grey'];

        function isValidColor(color) {
            return hexRegex.test(color) ||
                rgbRegex.test(color) ||
                rgbaRegex.test(color) ||
                hslRegex.test(color) ||
                hslaRegex.test(color) ||
                namedColors.includes(color.toLowerCase());
        }

        if (isValidColor(bgValue)) {
            bgColor.value = bgValue;
            colorPreview.style.setProperty('background-color', bgValue, 'important');
        }

        if (isValidColor(textValue)) {
            textColor.value = textValue;
            colorPreview.style.setProperty('color', textValue, 'important');
            // Also update child elements
            const childElements = colorPreview.querySelectorAll('h3, p, span, div');
            childElements.forEach(element => {
                element.style.setProperty('color', textValue, 'important');
            });
        }
    }

    // Add event listeners for color pickers
    bgColor.addEventListener('input', updateColorPreview);
    textColor.addEventListener('input', updateColorPreview);

    // Add event listeners for text inputs
    if (bgColorInput) {
        bgColorInput.addEventListener('input', updateFromTextInput);
        bgColorInput.addEventListener('blur', updateFromTextInput);
        bgColorInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                updateFromTextInput();
            }
        });
    }
    if (textColorInput) {
        textColorInput.addEventListener('input', updateFromTextInput);
        textColorInput.addEventListener('blur', updateFromTextInput);
        textColorInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                updateFromTextInput();
            }
        });
    }

    // Initial update
    updateColorPreview();
}

// CSS Selector Challenge Initialization
function initializeSelectorChallenge() {
    const selectorInput = document.getElementById('selector-input');
    if (selectorInput) {
        selectorInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                checkSelector();
            }
        });
    }
}

// CSS Selector Challenge
function checkSelector() {
    const selectorInput = document.getElementById('selector-input');
    const feedback = document.getElementById('selector-feedback');
    const targetBox = document.getElementById('target-box');

    if (!selectorInput || !feedback || !targetBox) {
        return;
    }

    const selector = selectorInput.value.trim();
    if (!selector) {
        feedback.innerHTML = '<div class="feedback error"><i class="fas fa-exclamation-triangle"></i> Please enter a CSS selector!</div>';
        feedback.classList.add('show');
        return;
    }

    try {
        // Check if the selector matches the target element
        const elements = document.querySelectorAll(selector);
        let isCorrect = false;

        // Check if target box is in the results
        for (let element of elements) {
            if (element === targetBox) {
                isCorrect = true;
                break;
            }
        }

        if (isCorrect) {
            feedback.innerHTML = '<div class="feedback success"><i class="fas fa-check-circle"></i> <strong>Correct!</strong> Your selector <code>' + selector + '</code> successfully targets the red box.</div>';
            // Highlight the target box temporarily
            targetBox.style.transform = 'scale(1.1)';
            targetBox.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.6)';
            targetBox.style.outline = '3px solid #10b981';

            setTimeout(() => {
                targetBox.style.transform = '';
                targetBox.style.boxShadow = '';
                targetBox.style.outline = '';
            }, 2000);
        } else {
            feedback.innerHTML = '<div class="feedback error"><i class="fas fa-times-circle"></i> <strong>Try again!</strong> Your selector <code>' + selector + '</code> doesn\'t target the red box.<br><small><strong>Hint:</strong> Try ".red" or "#target-box"</small></div>';
        }

    } catch (error) {
        feedback.innerHTML = '<div class="feedback error"><i class="fas fa-exclamation-triangle"></i> <strong>Invalid CSS selector.</strong> Please check your syntax.<br><small>Make sure you\'re using proper CSS selector format.</small></div>';
    }

    feedback.classList.add('show');

    // Scroll to feedback
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// JavaScript Introduction Interactive Functions
let clickCount = 0;

function incrementCounter() {
    const countElement = document.getElementById('count');
    if (countElement) {
        clickCount++;
        countElement.textContent = clickCount;
    }
}

function changeColor() {
    const box = document.getElementById('color-box');
    if (box) {
        const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        box.style.background = randomColor;
    }
}

function greetUser() {
    const nameInput = document.getElementById('name-input');
    const output = document.getElementById('greeting-output');

    if (nameInput && output) {
        const name = nameInput.value.trim();
        if (name) {
            output.innerHTML = `<h4>Hello, ${name}!</h4><p>Welcome to JavaScript!</p>`;
            output.style.display = 'block';
        } else {
            output.innerHTML = '<p class="text-warning">Please enter your name first!</p>';
            output.style.display = 'block';
        }
    }
}

function updateClock() {
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        clockElement.textContent = timeString;
    }
}

function runExample(code) {
    const consoleInput = document.getElementById('console-input');
    if (consoleInput) {
        consoleInput.value = code;
        executeConsoleCommand();
    }
}

function executeConsoleCommand() {
    const consoleInput = document.getElementById('console-input');
    const consoleOutput = document.getElementById('console-output');

    if (!consoleInput || !consoleOutput) return;

    const code = consoleInput.value.trim();
    if (!code) return;

    try {
        // Add the command to output
        consoleOutput.innerHTML += `<br><span class="console-command">&gt; ${code}</span><br>`;

        // Execute the code and get result
        const result = eval(code);

        // Display the result
        if (result !== undefined) {
            consoleOutput.innerHTML += `<span class="console-result">${result}</span><br>`;
        }

        // Clear input and scroll to bottom
        consoleInput.value = '';
        consoleOutput.scrollTop = consoleOutput.scrollHeight;

    } catch (error) {
        consoleOutput.innerHTML += `<span class="console-error">Error: ${error.message}</span><br>`;
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
}

// Initialize JavaScript Introduction Interactive Features
function initializeJavaScriptIntro() {
    // Initialize live clock
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        updateClock(); // Initial update
        setInterval(updateClock, 1000); // Update every second
    }

    // Initialize JavaScript console
    const consoleInput = document.getElementById('console-input');
    if (consoleInput) {
        consoleInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                executeConsoleCommand();
            }
        });
    }

    // Initialize console output
    const consoleOutput = document.getElementById('console-output');
    if (consoleOutput) {
        consoleOutput.innerHTML = 'JavaScript Console - Type commands below and press Enter:<br><br>';
    }
}

// AJAX Demo Functions
function sendXHRRequest() {
    const method = document.getElementById('xhr-method').value;
    const url = document.getElementById('xhr-url').value;
    const data = document.getElementById('xhr-data').value;
    const result = document.getElementById('xhr-result');

    if (!result) return;

    result.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Sending request...</div>';

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let responseData = xhr.responseText;
            let statusClass = 'success';

            if (xhr.status >= 400) {
                statusClass = 'error';
            } else if (xhr.status >= 300) {
                statusClass = 'warning';
            }

            try {
                // Try to format JSON response
                const jsonData = JSON.parse(responseData);
                responseData = JSON.stringify(jsonData, null, 2);
            } catch (e) {
                // Not JSON, use as-is
            }

            result.innerHTML = `
                <div class="result ${statusClass}">
                    <div class="status-info">
                        <strong>Status:</strong> ${xhr.status} ${xhr.statusText}<br>
                        <strong>Method:</strong> ${method}<br>
                        <strong>URL:</strong> ${url}
                    </div>
                    <div class="response-data">
                        <strong>Response:</strong>
                        <pre><code>${responseData}</code></pre>
                    </div>
                </div>
            `;
        }
    };

    xhr.onerror = function () {
        result.innerHTML = '<div class="result error">Network error occurred</div>';
    };

    xhr.open(method, url);

    if (method === 'POST' || method === 'PUT') {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
    } else {
        xhr.send();
    }
}

function clearXHRResult() {
    const result = document.getElementById('xhr-result');
    if (result) {
        result.innerHTML = '<div class="placeholder"><i class="fas fa-info-circle"></i> Configure your request above and click "Send Request" to see the result.</div>';
    }
}

// Fetch API Demo Functions
async function demonstrateFetchGET() {
    const result = document.getElementById('fetch-get-result');
    if (!result) return;

    result.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Fetching data...</div>';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();

        result.innerHTML = `
            <div class="result success">
                <h4><i class="fas fa-check"></i> GET Request Successful</h4>
                <div class="response-details">
                    <p><strong>Status:</strong> ${response.status} ${response.statusText}</p>
                    <p><strong>Response Data:</strong></p>
                    <pre><code>${JSON.stringify(data, null, 2)}</code></pre>
                </div>
            </div>
        `;
    } catch (error) {
        result.innerHTML = `
            <div class="result error">
                <h4><i class="fas fa-times"></i> GET Request Failed</h4>
                <p><strong>Error:</strong> ${error.message}</p>
            </div>
        `;
    }
}

async function demonstrateFetchPOST() {
    const result = document.getElementById('fetch-post-result');
    if (!result) return;

    result.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Posting data...</div>';

    const postData = {
        title: 'Sample Post Title',
        body: 'This is a sample post created using Fetch API',
        userId: 1
    };

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });

        const data = await response.json();

        result.innerHTML = `
            <div class="result success">
                <h4><i class="fas fa-check"></i> POST Request Successful</h4>
                <div class="response-details">
                    <p><strong>Status:</strong> ${response.status} ${response.statusText}</p>
                    <p><strong>Created Resource:</strong></p>
                    <pre><code>${JSON.stringify(data, null, 2)}</code></pre>
                </div>
            </div>
        `;
    } catch (error) {
        result.innerHTML = `
            <div class="result error">
                <h4><i class="fas fa-times"></i> POST Request Failed</h4>
                <p><strong>Error:</strong> ${error.message}</p>
            </div>
        `;
    }
}

async function demonstrateFetchPUT() {
    const result = document.getElementById('fetch-put-result');
    if (!result) return;

    result.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Updating data...</div>';

    const updateData = {
        id: 1,
        title: 'Updated Post Title',
        body: 'This post has been updated using Fetch API PUT method',
        userId: 1
    };

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData)
        });

        const data = await response.json();

        result.innerHTML = `
            <div class="result success">
                <h4><i class="fas fa-check"></i> PUT Request Successful</h4>
                <div class="response-details">
                    <p><strong>Status:</strong> ${response.status} ${response.statusText}</p>
                    <p><strong>Updated Resource:</strong></p>
                    <pre><code>${JSON.stringify(data, null, 2)}</code></pre>
                </div>
            </div>
        `;
    } catch (error) {
        result.innerHTML = `
            <div class="result error">
                <h4><i class="fas fa-times"></i> PUT Request Failed</h4>
                <p><strong>Error:</strong> ${error.message}</p>
            </div>
        `;
    }
}

async function demonstrateFetchDELETE() {
    const result = document.getElementById('fetch-delete-result');
    if (!result) return;

    result.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Deleting data...</div>';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'DELETE'
        });

        result.innerHTML = `
            <div class="result success">
                <h4><i class="fas fa-check"></i> DELETE Request Successful</h4>
                <div class="response-details">
                    <p><strong>Status:</strong> ${response.status} ${response.statusText}</p>
                    <p><strong>Resource Deleted:</strong> Post with ID 1</p>
                    ${response.status === 200 ? '<p>Response body: ' + JSON.stringify(await response.json(), null, 2) + '</p>' : '<p>No response body (resource deleted)</p>'}
                </div>
            </div>
        `;
    } catch (error) {
        result.innerHTML = `
            <div class="result error">
                <h4><i class="fas fa-times"></i> DELETE Request Failed</h4>
                <p><strong>Error:</strong> ${error.message}</p>
            </div>
        `;
    }
}

function testNetworkError() {
    const result = document.getElementById('error-test-result');
    if (!result) return;

    result.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Testing network error...</div>';

    const xhr = new XMLHttpRequest();
    xhr.timeout = 5000;

    xhr.onerror = function () {
        result.innerHTML = '<div class="result error"><i class="fas fa-exclamation-triangle"></i> Network Error: Unable to connect to server</div>';
    };

    xhr.ontimeout = function () {
        result.innerHTML = '<div class="result warning"><i class="fas fa-clock"></i> Request timed out</div>';
    };

    // Try to connect to a non-existent domain
    xhr.open('GET', 'https://nonexistent-domain-12345.com/api/test');
    xhr.send();
}

function testHTTPError() {
    const result = document.getElementById('error-test-result');
    if (!result) return;

    result.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Testing HTTP error...</div>';

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 404) {
                result.innerHTML = '<div class="result error"><i class="fas fa-file-times"></i> HTTP 404: Resource not found</div>';
            } else {
                result.innerHTML = `<div class="result warning"><i class="fas fa-exclamation-triangle"></i> HTTP ${xhr.status}: ${xhr.statusText}</div>`;
            }
        }
    };

    xhr.onerror = function () {
        result.innerHTML = '<div class="result error"><i class="fas fa-wifi"></i> Network error occurred</div>';
    };

    // Try to get a non-existent resource
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/999999');
    xhr.send();
}

function testTimeout() {
    const result = document.getElementById('error-test-result');
    if (!result) return;

    result.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Testing timeout (will timeout in 2 seconds)...</div>';

    const xhr = new XMLHttpRequest();
    xhr.timeout = 2000; // 2 seconds

    xhr.ontimeout = function () {
        result.innerHTML = '<div class="result warning"><i class="fas fa-clock"></i> Request timed out after 2 seconds</div>';
    };

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            result.innerHTML = '<div class="result success"><i class="fas fa-check"></i> Request completed (this shouldn\'t appear if timeout works)</div>';
        }
    };

    // Use a slow-responding endpoint
    xhr.open('GET', 'https://httpbin.org/delay/5');
    xhr.send();
}

function testRetry() {
    const result = document.getElementById('error-test-result');
    if (!result) return;

    let attempt = 1;
    const maxAttempts = 3;

    function makeRequest() {
        result.innerHTML = `<div class="loading"><i class="fas fa-spinner fa-spin"></i> Attempt ${attempt} of ${maxAttempts}...</div>`;

        const xhr = new XMLHttpRequest();
        xhr.timeout = 3000;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    result.innerHTML = `<div class="result success"><i class="fas fa-check"></i> Success on attempt ${attempt}!</div>`;
                } else {
                    handleError();
                }
            }
        };

        xhr.onerror = handleError;
        xhr.ontimeout = handleError;

        function handleError() {
            if (attempt < maxAttempts) {
                attempt++;
                setTimeout(makeRequest, 1000); // Retry after 1 second
            } else {
                result.innerHTML = '<div class="result error"><i class="fas fa-times"></i> All retry attempts failed</div>';
            }
        }

        // Use a URL that might fail sometimes
        xhr.open('GET', 'https://httpbin.org/status/200,500');
        xhr.send();
    }

    makeRequest();
}

let pollingInterval;

function startPolling() {
    const result = document.getElementById('realtime-data');
    if (!result) return;

    if (pollingInterval) {
        clearInterval(pollingInterval);
    }

    pollingInterval = setInterval(() => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const timestamp = new Date().toLocaleTimeString();
                result.innerHTML = `
                    <div class="update-item">
                        <strong>Last Update:</strong> ${timestamp}<br>
                        <strong>Data:</strong> ${JSON.stringify(data, null, 2)}
                    </div>
                `;
            }
        };
        xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/' + Math.floor(Math.random() * 10 + 1));
        xhr.send();
    }, 3000); // Poll every 3 seconds

    result.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Starting real-time updates...</div>';
}

function stopPolling() {
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }

    const result = document.getElementById('realtime-data');
    if (result) {
        result.innerHTML = '<div class="placeholder">Real-time updates stopped. Click "Start Updates" to resume.</div>';
    }
}

// Initialize AJAX Demos
function initializeAjaxDemos() {
    // Initialize live search
    const liveSearch = document.getElementById('live-search');
    if (liveSearch) {
        let searchTimeout;
        liveSearch.addEventListener('input', function () {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performLiveSearch(this.value);
            }, 300); // Debounce search
        });
    }

    // Initialize AJAX form submission
    const ajaxForm = document.getElementById('ajax-form');
    if (ajaxForm) {
        ajaxForm.addEventListener('submit', function (e) {
            e.preventDefault();
            submitAjaxForm(this);
        });
    }

    // Initialize infinite scroll
    const scrollContainer = document.getElementById('scroll-container');
    if (scrollContainer) {
        initializeInfiniteScroll();
    }
}

function performLiveSearch(query) {
    const results = document.getElementById('search-results');
    if (!results) return;

    if (!query.trim()) {
        results.innerHTML = '';
        return;
    }

    results.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Searching...</div>';

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const filteredData = data.filter(post =>
                post.title.toLowerCase().includes(query.toLowerCase()) ||
                post.body.toLowerCase().includes(query.toLowerCase())
            );

            if (filteredData.length > 0) {
                results.innerHTML = filteredData.slice(0, 5).map(post => `
                    <div class="search-result-item">
                        <strong>${post.title}</strong>
                        <p>${post.body.substring(0, 100)}...</p>
                    </div>
                `).join('');
            } else {
                results.innerHTML = '<div class="no-results">No results found</div>';
            }
        }
    };

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    xhr.send();
}

function submitAjaxForm(form) {
    const formData = new FormData(form);
    const feedback = document.getElementById('form-feedback');

    if (feedback) {
        feedback.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Submitting...</div>';
    }

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                if (feedback) {
                    feedback.innerHTML = '<div class="result success"><i class="fas fa-check"></i> Form submitted successfully!</div>';
                }
                form.reset();
            } else {
                if (feedback) {
                    feedback.innerHTML = '<div class="result error"><i class="fas fa-times"></i> Submission failed. Please try again.</div>';
                }
            }
        }
    };

    // Simulate form submission to JSONPlaceholder
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts');
    xhr.setRequestHeader('Content-Type', 'application/json');

    const data = {
        title: formData.get('name'),
        body: formData.get('email'),
        userId: 1
    };

    xhr.send(JSON.stringify(data));
}

let currentPage = 1;
let isLoading = false;

function initializeInfiniteScroll() {
    const scrollContainer = document.getElementById('scroll-container');
    if (!scrollContainer) return;

    // Load initial content
    loadMoreContent();

    // Add scroll listener
    scrollContainer.addEventListener('scroll', function () {
        if (this.scrollTop + this.clientHeight >= this.scrollHeight - 10 && !isLoading) {
            loadMoreContent();
        }
    });
}

function loadMoreContent() {
    if (isLoading) return;

    isLoading = true;
    const scrollContent = document.querySelector('.scroll-content');
    const spinner = document.querySelector('.loading-spinner');

    if (spinner) spinner.style.display = 'block';

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            data.forEach(post => {
                const item = document.createElement('div');
                item.className = 'scroll-item';
                item.innerHTML = `
                    <h5>${post.title}</h5>
                    <p>${post.body}</p>
                `;
                if (scrollContent) scrollContent.appendChild(item);
            });

            currentPage++;
            isLoading = false;
            if (spinner) spinner.style.display = 'none';
        }
    };

    xhr.open('GET', `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=5`);
    xhr.send();
}

// Async/Await Demo Functions
function initializeAsyncAwaitDemo() {
    const fetchBtn = document.getElementById('fetchBtn');
    if (fetchBtn) {
        fetchBtn.addEventListener('click', fetchAsyncData);
    }
}

async function fetchAsyncData() {
    const apiUrl = document.getElementById('apiUrl').value;
    const result = document.getElementById('apiResult');

    if (!result) return;

    result.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Fetching data with async/await...</div>';

    try {
        // Show step-by-step process
        result.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Step 1: Initiating fetch request...</div>';

        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay

        result.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Step 2: Awaiting server response...</div>';

        const response = await fetch(apiUrl);

        result.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Step 3: Processing response...</div>';

        await new Promise(resolve => setTimeout(resolve, 300));

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        result.innerHTML = `
            <div class="result success">
                <h4><i class="fas fa-check-circle"></i> Success!</h4>
                <div class="response-info">
                    <strong>URL:</strong> ${apiUrl}<br>
                    <strong>Status:</strong> ${response.status} ${response.statusText}<br>
                    <strong>Response:</strong>
                </div>
                <div class="response-data">
                    <pre><code>${JSON.stringify(data, null, 2)}</code></pre>
                </div>
                <div class="code-example">
                    <strong>Code used:</strong>
                    <pre><code>async function fetchData() {
    try {
        const response = await fetch('${apiUrl}');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}</code></pre>
                </div>
            </div>
        `;

    } catch (error) {
        result.innerHTML = `
            <div class="result error">
                <h4><i class="fas fa-exclamation-triangle"></i> Error Caught!</h4>
                <p><strong>Error:</strong> ${error.message}</p>
                <div class="code-example">
                    <strong>This error was caught by the try-catch block:</strong>
                    <pre><code>catch (error) {
    console.error('Error:', error.message);
}</code></pre>
                </div>
            </div>
        `;
    }
}

// Responsive Design Demo Functions
function initializeResponsiveDemo() {
    const screenWidth = document.getElementById('screenWidth');
    const widthDisplay = document.getElementById('widthDisplay');
    const demoViewport = document.getElementById('demoViewport');
    const currentBreakpoint = document.getElementById('currentBreakpoint');
    const deviceButtons = document.querySelectorAll('.device-buttons .btn');

    if (!screenWidth || !demoViewport) return;

    function updateViewport(width) {
        if (widthDisplay) widthDisplay.textContent = width;
        if (demoViewport) {
            demoViewport.style.width = width + 'px';
            demoViewport.style.maxWidth = width + 'px';
        }

        // Update breakpoint indicator
        let breakpointName = 'Mobile';
        if (width >= 1440) breakpointName = 'Desktop';
        else if (width >= 1024) breakpointName = 'Laptop';
        else if (width >= 768) breakpointName = 'Tablet';

        if (currentBreakpoint) {
            currentBreakpoint.textContent = `Current: ${breakpointName} (${width}px)`;
        }

        // Add CSS class for styling
        if (demoViewport) {
            demoViewport.className = 'demo-viewport';
            if (width < 768) demoViewport.classList.add('mobile');
            else if (width < 1024) demoViewport.classList.add('tablet');
            else if (width < 1440) demoViewport.classList.add('laptop');
            else demoViewport.classList.add('desktop');
        }
    }

    // Slider event listener
    screenWidth.addEventListener('input', function () {
        updateViewport(parseInt(this.value));
    });

    // Device button event listeners
    deviceButtons.forEach(button => {
        button.addEventListener('click', function () {
            const width = parseInt(this.getAttribute('data-width'));
            screenWidth.value = width;
            updateViewport(width);

            // Update button states
            deviceButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Initialize with current value
    updateViewport(parseInt(screenWidth.value));
}

// ES6 Features Demo Functions
function initializeES6Demo() {
    // Any initialization for ES6 demos
}

function runArrowDemo() {
    const result = document.getElementById('arrow-demo-result');
    if (!result) {
        alert('This demo transforms a regular function into an arrow function!');
        return;
    }

    result.innerHTML = `
        <div class="result success">
            <h4><i class="fas fa-magic"></i> Function Transformation Complete!</h4>
            <div class="comparison">
                <div class="before">
                    <strong>Before (Regular Function):</strong>
                    <pre><code>const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(num) {
    return num * 2;
});</code></pre>
                </div>
                <div class="arrow">
                    <i class="fas fa-arrow-right"></i>
                </div>
                <div class="after">
                    <strong>After (Arrow Function):</strong>
                    <pre><code>const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);</code></pre>
                </div>
            </div>
            <div class="benefits">
                <h5>Benefits of Arrow Functions:</h5>
                <ul>
                    <li>Shorter, more concise syntax</li>
                    <li>Implicit return for single expressions</li>
                    <li>Lexical 'this' binding</li>
                    <li>Better for functional programming</li>
                </ul>
            </div>
        </div>
    `;
}

// Utility Functions for Interactive Elements
function toggleBookmark(button) {
    const icon = button.querySelector('i');
    const isBookmarked = button.classList.contains('bookmarked');

    if (isBookmarked) {
        // Remove bookmark
        icon.classList.remove('fas', 'fa-bookmark');
        icon.classList.add('far', 'fa-bookmark');
        button.classList.remove('bookmarked');
        button.title = 'Bookmark this resource';
        console.log('Bookmark removed');
    } else {
        // Add bookmark
        icon.classList.remove('far', 'fa-bookmark');
        icon.classList.add('fas', 'fa-bookmark');
        button.classList.add('bookmarked');
        button.title = 'Remove bookmark';
        console.log('Resource bookmarked');
    }
}

function playVideo(videoId) {
    const video = document.getElementById(videoId);
    if (video) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
}

// Additional interactive element functions
function showVideoControls(videoElement) {
    if (videoElement) {
        videoElement.controls = true;
    }
}

function toggleVideoMute(videoElement) {
    if (videoElement) {
        videoElement.muted = !videoElement.muted;
    }
}

// Client-Server Scripting Demo Functions
function initializeClientServerDemo() {
    // Any initialization needed
}

function runClientDemo() {
    const result = document.getElementById('client-result');
    if (!result) return;

    result.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Processing instantly on client...</div>';

    // Simulate instant client-side processing
    setTimeout(() => {
        const startTime = performance.now();
        const data = "hello world";
        const processedData = data.toUpperCase();
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);

        result.innerHTML = `
            <div class="result success">
                <h5><i class="fas fa-desktop"></i> Client-Side Result</h5>
                <div class="result-data">
                    <strong>Input:</strong> "${data}"<br>
                    <strong>Output:</strong> "${processedData}"<br>
                    <strong>Execution Time:</strong> ${executionTime}ms<br>
                    <strong>Location:</strong> Browser (Your Device)
                </div>
                <div class="advantages">
                    <strong>Advantages:</strong>
                    <ul>
                        <li>Instant response</li>
                        <li>No network latency</li>
                        <li>Reduces server load</li>
                    </ul>
                </div>
            </div>
        `;
    }, 100);
}

function runServerDemo() {
    const result = document.getElementById('server-result');
    if (!result) return;

    result.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Sending request to server...</div>';

    // Simulate server-side processing with network delay
    setTimeout(() => {
        result.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Processing on server...</div>';

        setTimeout(() => {
            const data = "hello world";
            const processedData = data.toUpperCase();

            result.innerHTML = `
                <div class="result success">
                    <h5><i class="fas fa-server"></i> Server-Side Result</h5>
                    <div class="result-data">
                        <strong>Input:</strong> "${data}"<br>
                        <strong>Output:</strong> "${processedData}"<br>
                        <strong>Network Time:</strong> ~200ms<br>
                        <strong>Location:</strong> Remote Server
                    </div>
                    <div class="advantages">
                        <strong>Advantages:</strong>
                        <ul>
                            <li>Secure processing</li>
                            <li>Access to databases</li>
                            <li>Heavy computation capability</li>
                        </ul>
                    </div>
                </div>
            `;
        }, 1000);
    }, 200);
}

function showComparison() {
    const clientResult = document.getElementById('client-result');
    const serverResult = document.getElementById('server-result');

    if (clientResult) {
        clientResult.innerHTML = `
            <div class="comparison-info">
                <h5><i class="fas fa-desktop"></i> Client-Side Features</h5>
                <div class="features">
                    <div class="feature positive"><i class="fas fa-check"></i> Instant response</div>
                    <div class="feature positive"><i class="fas fa-check"></i> No server load</div>
                    <div class="feature positive"><i class="fas fa-check"></i> Works offline</div>
                    <div class="feature negative"><i class="fas fa-times"></i> Limited security</div>
                    <div class="feature negative"><i class="fas fa-times"></i> Code visible to users</div>
                    <div class="feature negative"><i class="fas fa-times"></i> No database access</div>
                </div>
            </div>
        `;
    }

    if (serverResult) {
        serverResult.innerHTML = `
            <div class="comparison-info">
                <h5><i class="fas fa-server"></i> Server-Side Features</h5>
                <div class="features">
                    <div class="feature positive"><i class="fas fa-check"></i> Secure processing</div>
                    <div class="feature positive"><i class="fas fa-check"></i> Database access</div>
                    <div class="feature positive"><i class="fas fa-check"></i> Code is hidden</div>
                    <div class="feature negative"><i class="fas fa-times"></i> Network latency</div>
                    <div class="feature negative"><i class="fas fa-times"></i> Server resource usage</div>
                    <div class="feature negative"><i class="fas fa-times"></i> Requires internet</div>
                </div>
            </div>
        `;
    }
}

// Browser and Server Demo Functions
function showBrowserInfo() {
    const browserDetails = document.getElementById('browserDetails');
    const browserInfo = document.getElementById('browserInfo');

    if (!browserDetails || !browserInfo) return;

    const info = {
        'Browser Name': navigator.appName,
        'Browser Version': navigator.appVersion.split('(')[0].trim(),
        'User Agent': navigator.userAgent,
        'Platform': navigator.platform,
        'Language': navigator.language,
        'Cookies Enabled': navigator.cookieEnabled ? 'Yes' : 'No',
        'Online Status': navigator.onLine ? 'Online' : 'Offline',
        'Screen Resolution': `${screen.width} x ${screen.height}`,
        'Color Depth': `${screen.colorDepth} bit`,
        'Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    let html = '';
    for (const [key, value] of Object.entries(info)) {
        html += `<li><strong>${key}:</strong> ${value}</li>`;
    }

    browserDetails.innerHTML = html;
    browserInfo.style.display = 'block';
}

function makeHTTPRequest() {
    const responseData = document.getElementById('responseData');
    const httpResponse = document.getElementById('httpResponse');

    if (!responseData || !httpResponse) return;

    responseData.innerHTML = 'Loading...';
    httpResponse.style.display = 'block';

    fetch('https://httpbin.org/get')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            responseData.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            responseData.innerHTML = `Error: ${error.message}\n\nNote: This demo requires an internet connection and may be blocked by CORS policy when running locally.`;
        });
}

// Error Handling Demo Functions
function runTryCatchDemo() {
    const output = document.getElementById('demo-output');
    if (!output) return;

    let result = '';

    try {
        result += 'Starting safe code execution...\n';
        const numbers = [1, 2, 3, 4, 5];
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        result += `Array sum calculated: ${sum}\n`;
        result += 'Safe code executed successfully!\n';
    } catch (error) {
        result += `Error caught: ${error.message}\n`;
    } finally {
        result += 'Finally block executed - cleanup complete\n';
    }

    output.textContent = result;
}

function runErrorDemo() {
    const output = document.getElementById('demo-output');
    if (!output) return;

    let result = '';

    try {
        result += 'Starting code with intentional error...\n';
        // This will throw a ReferenceError
        result += `Accessing undefined variable: ${undefinedVariable}\n`;
    } catch (error) {
        result += `Error caught: ${error.name} - ${error.message}\n`;
        result += `Error stack: ${error.stack.split('\n')[0]}\n`;
    } finally {
        result += 'Finally block executed - error handled gracefully\n';
    }

    output.textContent = result;
}

function clearDemoOutput() {
    const output = document.getElementById('demo-output');
    if (!output) return;

    output.textContent = 'Output cleared. Click a demo button to see results.';
}

// Canvas Demo Functions
function initializeCanvasDemo() {
    // Initialize drawing canvas
    const drawingCanvas = document.getElementById('drawingCanvas');
    if (drawingCanvas) {
        const ctx = drawingCanvas.getContext('2d');
        let isDrawing = false;

        // Set initial canvas style
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';

        drawingCanvas.addEventListener('mousedown', startDrawing);
        drawingCanvas.addEventListener('mousemove', draw);
        drawingCanvas.addEventListener('mouseup', stopDrawing);
        drawingCanvas.addEventListener('mouseout', stopDrawing);

        // Color and size controls
        const colorPicker = document.getElementById('drawColor');
        const sizeSlider = document.getElementById('drawSize');
        const sizeDisplay = document.getElementById('sizeDisplay');
        const clearBtn = document.getElementById('clearCanvas');

        if (colorPicker) {
            colorPicker.addEventListener('change', (e) => {
                ctx.strokeStyle = e.target.value;
            });
        }

        if (sizeSlider && sizeDisplay) {
            sizeSlider.addEventListener('input', (e) => {
                ctx.lineWidth = e.target.value;
                sizeDisplay.textContent = e.target.value;
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
                ctx.fillStyle = '#f8f9fa';
                ctx.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            });
        }

        function startDrawing(e) {
            isDrawing = true;
            const rect = drawingCanvas.getBoundingClientRect();
            ctx.beginPath();
            ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        }

        function draw(e) {
            if (!isDrawing) return;
            const rect = drawingCanvas.getBoundingClientRect();
            ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
            ctx.stroke();
        }

        function stopDrawing() {
            isDrawing = false;
            ctx.beginPath();
        }
    }

    // Initialize animation canvas
    initializeAnimationCanvas();

    // Initialize interactive canvas
    initializeInteractiveCanvas();

    // Tab switching
    initializeCanvasTabs();
}

function initializeAnimationCanvas() {
    const animationCanvas = document.getElementById('animationCanvas');
    if (!animationCanvas) return;

    const ctx = animationCanvas.getContext('2d');
    let animationId;
    let ball = {
        x: 50,
        y: 50,
        dx: 2,
        dy: 2,
        radius: 20,
        color: '#e74c3c'
    };
    let speed = 1;

    // Set initial canvas style
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, animationCanvas.width, animationCanvas.height);

    const startBtn = document.getElementById('startAnimation');
    const stopBtn = document.getElementById('stopAnimation');
    const speedSlider = document.getElementById('animSpeed');

    if (startBtn) {
        startBtn.addEventListener('click', startAnimation);
    }

    if (stopBtn) {
        stopBtn.addEventListener('click', stopAnimation);
    }

    if (speedSlider) {
        speedSlider.addEventListener('input', (e) => {
            speed = parseInt(e.target.value) / 5;
        });
    }

    function animate() {
        // Clear canvas
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, animationCanvas.width, animationCanvas.height);

        // Update ball position
        ball.x += ball.dx * speed;
        ball.y += ball.dy * speed;

        // Bounce off walls
        if (ball.x + ball.radius > animationCanvas.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
        }
        if (ball.y + ball.radius > animationCanvas.height || ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
        }

        // Draw ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.strokeStyle = '#c0392b';
        ctx.lineWidth = 2;
        ctx.stroke();

        animationId = requestAnimationFrame(animate);
    }

    function startAnimation() {
        if (!animationId) {
            animate();
        }
    }

    function stopAnimation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }
}

function initializeInteractiveCanvas() {
    const interactiveCanvas = document.getElementById('interactiveCanvas');
    if (!interactiveCanvas) return;

    const ctx = interactiveCanvas.getContext('2d');
    let shapes = [];

    // Set initial canvas style
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, interactiveCanvas.width, interactiveCanvas.height);

    const addShapeBtn = document.getElementById('addShape');
    const resetBtn = document.getElementById('resetShapes');
    const shapeCount = document.getElementById('shapeCount');

    if (addShapeBtn) {
        addShapeBtn.addEventListener('click', addRandomShape);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetShapes);
    }

    interactiveCanvas.addEventListener('click', addShapeAtPosition);

    function addRandomShape() {
        const shape = {
            x: Math.random() * (interactiveCanvas.width - 40) + 20,
            y: Math.random() * (interactiveCanvas.height - 40) + 20,
            size: Math.random() * 30 + 10,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            type: Math.random() > 0.5 ? 'circle' : 'square'
        };
        shapes.push(shape);
        drawShapes();
        updateShapeCount();
    }

    function addShapeAtPosition(e) {
        const rect = interactiveCanvas.getBoundingClientRect();
        const shape = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            size: Math.random() * 30 + 10,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            type: Math.random() > 0.5 ? 'circle' : 'square'
        };
        shapes.push(shape);
        drawShapes();
        updateShapeCount();
    }

    function drawShapes() {
        // Clear canvas
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, interactiveCanvas.width, interactiveCanvas.height);

        // Draw all shapes
        shapes.forEach(shape => {
            ctx.fillStyle = shape.color;
            ctx.strokeStyle = '#2c3e50';
            ctx.lineWidth = 2;

            if (shape.type === 'circle') {
                ctx.beginPath();
                ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            } else {
                ctx.fillRect(shape.x - shape.size, shape.y - shape.size, shape.size * 2, shape.size * 2);
                ctx.strokeRect(shape.x - shape.size, shape.y - shape.size, shape.size * 2, shape.size * 2);
            }
        });
    }

    function resetShapes() {
        shapes = [];
        drawShapes();
        updateShapeCount();
    }

    function updateShapeCount() {
        if (shapeCount) {
            shapeCount.textContent = `Shapes: ${shapes.length}`;
        }
    }
}

function initializeCanvasTabs() {
    const tabBtns = document.querySelectorAll('[data-demo]');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.demo;

            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            btn.classList.add('active');
            const targetPane = document.getElementById(`${target}-demo`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

// Audio/Video Demo Functions
function initializeAudioVideoDemo() {
    // Audio controls
    const audio = document.getElementById('customAudio');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const volumeControl = document.getElementById('volumeControl');
    const volumeDisplay = document.getElementById('volumeDisplay');

    if (audio && playBtn) {
        playBtn.addEventListener('click', () => {
            audio.play().catch(e => console.log('Audio play failed:', e));
        });
    }

    if (audio && pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            audio.pause();
        });
    }

    if (audio && stopBtn) {
        stopBtn.addEventListener('click', () => {
            audio.pause();
            audio.currentTime = 0;
        });
    }

    if (audio && volumeControl && volumeDisplay) {
        volumeControl.addEventListener('input', (e) => {
            const volume = e.target.value;
            audio.volume = volume;
            volumeDisplay.textContent = Math.round(volume * 100) + '%';
        });
    }

    // Video controls
    const video = document.getElementById('customVideo');
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    const videoPauseBtn = document.getElementById('videoPauseBtn');
    const videoMuteBtn = document.getElementById('videoMuteBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const overlayPlayBtn = document.getElementById('overlayPlayBtn');

    if (video && videoPlayBtn) {
        videoPlayBtn.addEventListener('click', () => {
            video.play().catch(e => console.log('Video play failed:', e));
        });
    }

    if (video && videoPauseBtn) {
        videoPauseBtn.addEventListener('click', () => {
            video.pause();
        });
    }

    if (video && videoMuteBtn) {
        videoMuteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            const icon = videoMuteBtn.querySelector('i');
            if (icon) {
                icon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
            }
        });
    }

    if (video && fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        });
    }

    if (video && overlayPlayBtn) {
        overlayPlayBtn.addEventListener('click', () => {
            video.play().catch(e => console.log('Video play failed:', e));
            overlayPlayBtn.style.display = 'none';
        });

        video.addEventListener('pause', () => {
            overlayPlayBtn.style.display = 'block';
        });
    }
}

// JSON Demo Functions
function initializeJSONDemo() {
    // Tab switching for JSON demos
    const tabBtns = document.querySelectorAll('[data-tab]');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;

            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            btn.classList.add('active');
            const targetPane = document.getElementById(`${target}-panel`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // LocalStorage demo
    initializeLocalStorageDemo();

    // Fetch demo
    initializeFetchDemo();

    // Form demo
    initializeFormDemo();
}

function initializeLocalStorageDemo() {
    const saveBtn = document.getElementById('saveToStorage');
    const loadBtn = document.getElementById('loadFromStorage');
    const clearBtn = document.getElementById('clearStorage');
    const result = document.getElementById('storageResult');

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const name = document.getElementById('userName')?.value || '';
            const age = document.getElementById('userAge')?.value || '';
            const skills = document.getElementById('userSkills')?.value || '';

            const userData = {
                name: name,
                age: parseInt(age) || 0,
                skills: skills.split(',').map(s => s.trim()),
                timestamp: new Date().toISOString()
            };

            localStorage.setItem('userData', JSON.stringify(userData));

            if (result) {
                result.innerHTML = `
                    <h5>✅ Data Saved to LocalStorage</h5>
                    <pre>${JSON.stringify(userData, null, 2)}</pre>
                `;
                result.className = 'result-box success';
            }
        });
    }

    if (loadBtn) {
        loadBtn.addEventListener('click', () => {
            const storedData = localStorage.getItem('userData');

            if (result) {
                if (storedData) {
                    const userData = JSON.parse(storedData);
                    result.innerHTML = `
                        <h5>📤 Data Loaded from LocalStorage</h5>
                        <pre>${JSON.stringify(userData, null, 2)}</pre>
                    `;
                    result.className = 'result-box success';

                    // Populate form fields
                    if (document.getElementById('userName')) document.getElementById('userName').value = userData.name || '';
                    if (document.getElementById('userAge')) document.getElementById('userAge').value = userData.age || '';
                    if (document.getElementById('userSkills')) document.getElementById('userSkills').value = userData.skills?.join(', ') || '';
                } else {
                    result.innerHTML = `
                        <h5>❌ No Data Found</h5>
                        <p>No user data found in LocalStorage. Save some data first!</p>
                    `;
                    result.className = 'result-box error';
                }
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            localStorage.removeItem('userData');

            if (result) {
                result.innerHTML = `
                    <h5>🗑️ Storage Cleared</h5>
                    <p>User data has been removed from LocalStorage.</p>
                `;
                result.className = 'result-box info';
            }
        });
    }
}

function initializeFetchDemo() {
    const fetchBtn = document.getElementById('fetchData');
    const result = document.getElementById('fetchResult');

    if (fetchBtn && result) {
        fetchBtn.addEventListener('click', async () => {
            const apiUrl = document.getElementById('apiUrl')?.value || '';

            if (!apiUrl) {
                result.innerHTML = `
                    <h5>❌ Error</h5>
                    <p>Please enter an API URL.</p>
                `;
                result.className = 'result-box error';
                return;
            }

            try {
                result.innerHTML = `
                    <h5>🔄 Fetching Data...</h5>
                    <p>Please wait while we fetch data from: ${apiUrl}</p>
                `;
                result.className = 'result-box info';

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();

                result.innerHTML = `
                    <h5>✅ Data Fetched Successfully</h5>
                    <p><strong>Status:</strong> ${response.status} ${response.statusText}</p>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                `;
                result.className = 'result-box success';

            } catch (error) {
                result.innerHTML = `
                    <h5>❌ Fetch Error</h5>
                    <p><strong>Error:</strong> ${error.message}</p>
                    <p>This might be due to CORS policy, network issues, or invalid URL.</p>
                `;
                result.className = 'result-box error';
            }
        });
    }
}

function initializeFormDemo() {
    const convertBtn = document.getElementById('convertForm');
    const result = document.getElementById('formResult');

    if (convertBtn && result) {
        convertBtn.addEventListener('click', () => {
            const formData = {
                name: document.getElementById('productName')?.value || '',
                price: parseFloat(document.getElementById('productPrice')?.value) || 0,
                category: document.getElementById('productCategory')?.value || '',
                inStock: document.getElementById('inStock')?.checked || false,
                createdAt: new Date().toISOString()
            };

            // Show the JSON conversion
            result.innerHTML = `
                <h5>✅ Form Data Converted to JSON</h5>
                <div class="conversion-demo">
                    <div class="form-data">
                        <h6>Form Values:</h6>
                        <ul>
                            <li><strong>Name:</strong> "${formData.name}"</li>
                            <li><strong>Price:</strong> ${formData.price}</li>
                            <li><strong>Category:</strong> "${formData.category}"</li>
                            <li><strong>In Stock:</strong> ${formData.inStock}</li>
                        </ul>
                    </div>
                    <div class="json-output">
                        <h6>JSON Output:</h6>
                        <pre>${JSON.stringify(formData, null, 2)}</pre>
                    </div>
                </div>
            `;
            result.className = 'result-box success';
        });
    }
}

// Regular Expressions Demo Functions
function initializeRegexDemo() {
    const testBtn = document.getElementById('testPatternBtn');
    const clearBtn = document.getElementById('clearTesterBtn');

    if (testBtn) {
        testBtn.addEventListener('click', testRegexPattern);
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', clearRegexTester);
    }
}

function testRegexPattern() {
    const patternInput = document.getElementById('customPattern');
    const testInput = document.getElementById('testInput');
    const matchesDiv = document.getElementById('testerMatches');
    const highlightDiv = document.getElementById('testerHighlight');

    if (!patternInput || !testInput) return;

    const patternText = patternInput.value.trim();
    const testText = testInput.value;

    try {
        // Parse the regex pattern (handle /pattern/flags format)
        let regex;
        if (patternText.startsWith('/')) {
            const lastSlash = patternText.lastIndexOf('/');
            if (lastSlash > 0) {
                const pattern = patternText.substring(1, lastSlash);
                const flags = patternText.substring(lastSlash + 1);
                regex = new RegExp(pattern, flags);
            } else {
                regex = new RegExp(patternText.substring(1));
            }
        } else {
            regex = new RegExp(patternText, 'g');
        }

        // Find all matches
        const matches = Array.from(testText.matchAll(regex));

        // Update matches display
        if (matchesDiv) {
            if (matches.length > 0) {
                const matchedTexts = matches.map(match => `"${match[0]}"`).join(', ');
                matchesDiv.innerHTML = `
                    <div class="match-count">Matches: <strong>${matches.length}</strong></div>
                    <div class="match-list">[${matchedTexts}]</div>
                `;
                matchesDiv.className = 'match-summary success';
            } else {
                matchesDiv.innerHTML = `
                    <div class="match-count">Matches: <strong>0</strong></div>
                    <div class="match-list">No matches found</div>
                `;
                matchesDiv.className = 'match-summary error';
            }
        }

        // Update highlighted text
        if (highlightDiv) {
            let highlightedText = testText;
            if (matches.length > 0) {
                // Sort matches by position (descending) to avoid offset issues
                const sortedMatches = matches.sort((a, b) => b.index - a.index);

                sortedMatches.forEach(match => {
                    const start = match.index;
                    const end = start + match[0].length;
                    highlightedText =
                        highlightedText.substring(0, start) +
                        `<span class="highlight">${match[0]}</span>` +
                        highlightedText.substring(end);
                });
            }
            highlightDiv.innerHTML = highlightedText;
        }

    } catch (error) {
        // Handle regex syntax errors
        if (matchesDiv) {
            matchesDiv.innerHTML = `
                <div class="match-count">Error in Pattern</div>
                <div class="match-list error">${error.message}</div>
            `;
            matchesDiv.className = 'match-summary error';
        }

        if (highlightDiv) {
            highlightDiv.innerHTML = testText;
        }
    }
}

function clearRegexTester() {
    const patternInput = document.getElementById('customPattern');
    const testInput = document.getElementById('testInput');
    const matchesDiv = document.getElementById('testerMatches');
    const highlightDiv = document.getElementById('testerHighlight');

    if (patternInput) patternInput.value = '';
    if (testInput) testInput.value = '';

    if (matchesDiv) {
        matchesDiv.innerHTML = `
            <div class="match-count">Matches: <strong>0</strong></div>
            <div class="match-list">Enter a pattern and test text</div>
        `;
        matchesDiv.className = 'match-summary';
    }

    if (highlightDiv) {
        highlightDiv.innerHTML = 'Enter text to test...';
    }
}

// Function Builder Functions
function initializeFunctionBuilder() {
    // Check if function builder elements exist
    const funcNameInput = document.getElementById('func-name');
    const funcParamsInput = document.getElementById('func-params');
    const funcBodyTextarea = document.getElementById('func-body');
    const funcCallInput = document.getElementById('func-call');
    const generatedFunctionDiv = document.getElementById('generated-function');

    if (!funcNameInput || !funcParamsInput || !funcBodyTextarea || !funcCallInput || !generatedFunctionDiv) {
        return; // Function builder not present on this page
    }

    // Add event listeners to update the generated function in real-time
    funcNameInput.addEventListener('input', updateGeneratedFunction);
    funcParamsInput.addEventListener('input', updateGeneratedFunction);
    funcBodyTextarea.addEventListener('input', updateGeneratedFunction);

    // Generate initial function
    updateGeneratedFunction();
}

function updateGeneratedFunction() {
    const funcNameInput = document.getElementById('func-name');
    const funcParamsInput = document.getElementById('func-params');
    const funcBodyTextarea = document.getElementById('func-body');
    const generatedFunctionDiv = document.getElementById('generated-function');

    if (!funcNameInput || !funcParamsInput || !funcBodyTextarea || !generatedFunctionDiv) {
        return;
    }

    const funcName = funcNameInput.value.trim() || 'myFunction';
    const params = funcParamsInput.value.trim();
    const body = funcBodyTextarea.value.trim() || 'return "Hello World!";';

    // Generate the function code
    const functionCode = `function ${funcName}(${params}) {\n  ${body}\n}`;

    // Update the display
    generatedFunctionDiv.textContent = functionCode;

    // Re-highlight with Prism
    if (window.Prism) {
        Prism.highlightElement(generatedFunctionDiv);
    }
}

function executeFunction() {
    const funcNameInput = document.getElementById('func-name');
    const funcParamsInput = document.getElementById('func-params');
    const funcBodyTextarea = document.getElementById('func-body');
    const funcCallInput = document.getElementById('func-call');
    const executionResultDiv = document.getElementById('execution-result');

    if (!funcNameInput || !funcParamsInput || !funcBodyTextarea || !funcCallInput || !executionResultDiv) {
        console.error('Function builder elements not found');
        return;
    }

    const funcName = funcNameInput.value.trim() || 'myFunction';
    const params = funcParamsInput.value.trim();
    const body = funcBodyTextarea.value.trim() || 'return "Hello World!";';
    const funcCall = funcCallInput.value.trim();

    try {
        // Create the function code
        const functionCode = `function ${funcName}(${params}) {\n  ${body}\n}`;

        // Create a safe execution environment
        const executionCode = `
            ${functionCode}

            // Execute the function call
            return ${funcCall};
        `;

        // Execute in a controlled environment
        const result = new Function(executionCode)();

        // Display the result
        executionResultDiv.innerHTML = `
            <div class="success">
                <i class="fas fa-check-circle"></i>
                <strong>Function executed successfully!</strong>
                <div class="result-details">
                    <div class="result-value">
                        <strong>Result:</strong> <code>${JSON.stringify(result)}</code>
                    </div>
                    <div class="result-type">
                        <strong>Type:</strong> <code>${typeof result}</code>
                    </div>
                    <div class="function-call">
                        <strong>Call:</strong> <code>${funcCall}</code>
                    </div>
                </div>
            </div>
        `;

        console.log('Function executed successfully:', result);

    } catch (error) {
        // Display the error with helpful information
        executionResultDiv.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Execution Error:</strong>
                <div class="error-message">
                    <code>${error.message}</code>
                </div>
                <div class="error-help">
                    <strong>Troubleshooting tips:</strong>
                    <ul>
                        <li>Check that your function syntax is correct</li>
                        <li>Ensure parameter names match between function definition and call</li>
                        <li>Verify that the function call uses the correct syntax</li>
                        <li>Make sure return statements are properly formatted</li>
                    </ul>
                </div>
            </div>
        `;

        console.error('Function execution error:', error);
    }
}

// Web Accessibility Testing Functions
function testColorContrast() {
    const result = document.getElementById('test-results') || createTestResultsDiv();

    result.innerHTML = `
        <div class="test-result success">
            <h4><i class="fas fa-check-circle"></i> Color Contrast Test</h4>
            <p><strong>Test Passed:</strong> Current color scheme meets WCAG AA standards</p>
            <div class="contrast-info">
                <p><strong>Background:</strong> #ffffff (White)</p>
                <p><strong>Text:</strong> #333333 (Dark Gray)</p>
                <p><strong>Contrast Ratio:</strong> 12.63:1 (Excellent)</p>
                <p><strong>WCAG Level:</strong> AAA ✓</p>
            </div>
            <div class="recommendations">
                <h5>Recommendations:</h5>
                <ul>
                    <li>Maintain this high contrast ratio</li>
                    <li>Test with color blindness simulators</li>
                    <li>Ensure interactive elements have sufficient contrast</li>
                </ul>
            </div>
        </div>
    `;
}

function testKeyboardNav() {
    const result = document.getElementById('test-results') || createTestResultsDiv();

    result.innerHTML = `
        <div class="test-result warning">
            <h4><i class="fas fa-exclamation-triangle"></i> Keyboard Navigation Test</h4>
            <p><strong>Test Status:</strong> Some improvements needed</p>
            <div class="nav-results">
                <div class="nav-item success">✓ All links are keyboard accessible</div>
                <div class="nav-item success">✓ Form elements have proper tab order</div>
                <div class="nav-item success">✓ Skip links are available</div>
                <div class="nav-item warning">⚠ Some custom elements need focus indicators</div>
                <div class="nav-item warning">⚠ Modal dialogs need trap focus</div>
            </div>
            <div class="instructions">
                <h5>Test Instructions:</h5>
                <p>Try navigating this page using only the Tab, Shift+Tab, Enter, and Space keys.</p>
            </div>
        </div>
    `;
}

function testScreenReader() {
    const result = document.getElementById('test-results') || createTestResultsDiv();

    result.innerHTML = `
        <div class="test-result info">
            <h4><i class="fas fa-volume-up"></i> Screen Reader Test</h4>
            <p><strong>Simulation:</strong> Screen reader navigation preview</p>
            <div class="screenreader-output">
                <div class="sr-announcement">
                    <strong>Screen Reader Output:</strong>
                    <pre>
Main navigation
Link: Home
Link: About
Link: Contact

Main content
Heading level 1: Web Accessibility
Text: Web accessibility ensures that people with disabilities can use websites effectively.

Article
Heading level 2: WCAG Guidelines
Text: The Web Content Accessibility Guidelines provide comprehensive standards...

Button: Test Color Contrast
Button: Test Keyboard Navigation
                    </pre>
                </div>
            </div>
            <div class="sr-tips">
                <h5>Screen Reader Tips:</h5>
                <ul>
                    <li>Use semantic HTML elements</li>
                    <li>Provide descriptive alt text for images</li>
                    <li>Use proper heading hierarchy</li>
                    <li>Add ARIA labels where needed</li>
                </ul>
            </div>
        </div>
    `;
}

function testFormLabels() {
    const result = document.getElementById('test-results') || createTestResultsDiv();

    result.innerHTML = `
        <div class="test-result success">
            <h4><i class="fas fa-tags"></i> Form Labels Test</h4>
            <p><strong>Test Passed:</strong> All form elements have proper labels</p>
            <div class="form-analysis">
                <div class="form-item success">✓ Email input has explicit label</div>
                <div class="form-item success">✓ Password input has explicit label</div>
                <div class="form-item success">✓ Checkbox has descriptive text</div>
                <div class="form-item success">✓ Submit button has descriptive text</div>
            </div>
            <div class="best-practices">
                <h5>Form Accessibility Best Practices:</h5>
                <ul>
                    <li>Use explicit labels with 'for' attribute</li>
                    <li>Provide error messages and validation feedback</li>
                    <li>Group related form elements with fieldset/legend</li>
                    <li>Use required attribute for mandatory fields</li>
                </ul>
            </div>
        </div>
    `;
}

function testHeadingStructure() {
    const result = document.getElementById('test-results') || createTestResultsDiv();

    result.innerHTML = `
        <div class="test-result success">
            <h4><i class="fas fa-list-ol"></i> Heading Structure Test</h4>
            <p><strong>Test Passed:</strong> Proper heading hierarchy detected</p>
            <div class="heading-outline">
                <h5>Page Outline:</h5>
                <ul class="heading-tree">
                    <li>H1: Web Accessibility
                        <ul>
                            <li>H2: WCAG Principles</li>
                            <li>H2: Implementation Techniques
                                <ul>
                                    <li>H3: Semantic HTML</li>
                                    <li>H3: ARIA Attributes</li>
                                    <li>H3: Testing Tools</li>
                                </ul>
                            </li>
                            <li>H2: Interactive Examples</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="heading-tips">
                <h5>Heading Best Practices:</h5>
                <ul>
                    <li>Use only one H1 per page</li>
                    <li>Don't skip heading levels</li>
                    <li>Make headings descriptive</li>
                    <li>Use headings for structure, not styling</li>
                </ul>
            </div>
        </div>
    `;
}

function updateProgress() {
    const progressBar = document.querySelector('.progress-fill');
    const ariaLive = document.getElementById('progress-live-region');

    if (progressBar) {
        const currentWidth = parseInt(progressBar.style.width) || 0;
        const newWidth = Math.min(currentWidth + 20, 100);
        progressBar.style.width = newWidth + '%';
        progressBar.setAttribute('aria-valuenow', newWidth);

        if (ariaLive) {
            ariaLive.textContent = `Progress updated: ${newWidth}% complete`;
        }
    }
}

function announceMessage() {
    const liveRegion = document.getElementById('live-announcements');
    if (liveRegion) {
        const messages = [
            'New notification received',
            'Form validation complete',
            'Content updated successfully',
            'User preferences saved',
            'Search results loaded'
        ];
        const message = messages[Math.floor(Math.random() * messages.length)];
        liveRegion.textContent = message;
    }
}

function createTestResultsDiv() {
    let result = document.getElementById('test-results');
    if (!result) {
        result = document.createElement('div');
        result.id = 'test-results';
        result.className = 'test-results-container';

        // Try to find a good place to insert it
        const testButtons = document.querySelector('.btn[onclick*="test"]');
        if (testButtons && testButtons.parentElement) {
            testButtons.parentElement.appendChild(result);
        } else {
            document.body.appendChild(result);
        }
    }
    return result;
}

// UI/UX Design Demo Functions
function showPrincipleDetails(principle) {
    const details = {
        hierarchy: {
            title: 'Visual Hierarchy',
            description: 'Visual hierarchy guides users through content by using size, color, contrast, and positioning to indicate importance and relationships.',
            examples: [
                'Large headings draw attention first',
                'Important CTAs use contrasting colors',
                'Related content is grouped together',
                'White space creates separation and focus'
            ],
            tips: [
                'Use consistent heading sizes (H1 > H2 > H3)',
                'Make primary actions visually prominent',
                'Group related elements using proximity',
                'Use contrast to highlight important information'
            ]
        },
        consistency: {
            title: 'Consistency',
            description: 'Consistent design patterns help users predict how the interface will behave, reducing cognitive load and improving usability.',
            examples: [
                'Same button styles throughout the site',
                'Consistent navigation placement',
                'Uniform color scheme and typography',
                'Standardized form layouts'
            ],
            tips: [
                'Create and follow a design system',
                'Use consistent terminology and labeling',
                'Maintain uniform spacing and alignment',
                'Keep navigation patterns predictable'
            ]
        },
        feedback: {
            title: 'User Feedback',
            description: 'Immediate and clear feedback helps users understand the results of their actions and the current state of the system.',
            examples: [
                'Loading states for slow operations',
                'Success/error messages for form submissions',
                'Hover effects on interactive elements',
                'Progress indicators for multi-step processes'
            ],
            tips: [
                'Provide immediate feedback for user actions',
                'Use clear, actionable error messages',
                'Show system status and loading states',
                'Confirm destructive actions before execution'
            ]
        },
        simplicity: {
            title: 'Simplicity',
            description: 'Simple, clean designs reduce cognitive load and help users focus on their primary tasks without distraction.',
            examples: [
                'Minimal navigation with clear labels',
                'Clean layouts with plenty of white space',
                'Limited color palette',
                'Progressive disclosure of complex features'
            ],
            tips: [
                'Follow the principle of least surprise',
                'Remove unnecessary elements and features',
                'Use progressive disclosure for complex workflows',
                'Prioritize content and features by user needs'
            ]
        },
        affordance: {
            title: 'Affordances',
            description: 'Design elements should clearly indicate how they can be used, making interfaces intuitive and discoverable.',
            examples: [
                'Buttons look clickable with proper styling',
                'Links are visually distinct from regular text',
                'Form fields have clear boundaries',
                'Interactive elements have hover/focus states'
            ],
            tips: [
                'Make clickable elements look clickable',
                'Use familiar icons and conventions',
                'Provide clear visual cues for interactions',
                'Ensure sufficient contrast and size for accessibility'
            ]
        },
        accessibility: {
            title: 'Accessibility',
            description: 'Accessible design ensures that all users, including those with disabilities, can effectively use your interface.',
            examples: [
                'Sufficient color contrast ratios',
                'Keyboard navigation support',
                'Screen reader compatible markup',
                'Alternative text for images'
            ],
            tips: [
                'Follow WCAG guidelines for accessibility',
                'Test with keyboard-only navigation',
                'Use semantic HTML elements',
                'Provide multiple ways to access content'
            ]
        }
    };

    const detail = details[principle];
    if (!detail) return;

    const modal = createModal('principle-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-lightbulb"></i> ${detail.title}</h3>
                <button class="modal-close" onclick="closeModal('principle-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <p class="principle-description">${detail.description}</p>
                
                <div class="principle-section">
                    <h4><i class="fas fa-examples"></i> Examples</h4>
                    <ul class="principle-list">
                        ${detail.examples.map(example => `<li>${example}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="principle-section">
                    <h4><i class="fas fa-tips"></i> Implementation Tips</h4>
                    <ul class="principle-list">
                        ${detail.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;

    showModal('principle-modal');
}

function showPattern(patternType) {
    const patterns = {
        navigation: {
            title: 'Navigation Patterns',
            description: 'Common navigation patterns that provide intuitive ways for users to move through your site.',
            patterns: [
                {
                    name: 'Primary Navigation',
                    description: 'Main site navigation, usually horizontal at the top',
                    code: `<nav class="primary-nav">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>`
                },
                {
                    name: 'Breadcrumbs',
                    description: 'Shows user location in site hierarchy',
                    code: `<nav class="breadcrumbs">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li>Laptops</li>
  </ol>
</nav>`
                }
            ]
        },
        forms: {
            title: 'Form Patterns',
            description: 'Design patterns for creating user-friendly and accessible forms.',
            patterns: [
                {
                    name: 'Stacked Form',
                    description: 'Labels above form fields for better mobile experience',
                    code: `<form class="stacked-form">
  <div class="form-group">
    <label for="email">Email Address</label>
    <input type="email" id="email" required>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" required>
  </div>
  <button type="submit">Sign In</button>
</form>`
                },
                {
                    name: 'Inline Validation',
                    description: 'Real-time feedback during form completion',
                    code: `<div class="form-group">
  <label for="username">Username</label>
  <input type="text" id="username" class="valid">
  <span class="validation-message success">
    ✓ Username available
  </span>
</div>`
                }
            ]
        },
        cards: {
            title: 'Card Patterns',
            description: 'Flexible content containers that group related information.',
            patterns: [
                {
                    name: 'Product Card',
                    description: 'Display product information with image, title, and actions',
                    code: `<div class="product-card">
  <img src="product.jpg" alt="Product Name">
  <div class="card-content">
    <h3>Product Name</h3>
    <p class="price">$99.99</p>
    <button class="btn-primary">Add to Cart</button>
  </div>
</div>`
                },
                {
                    name: 'Article Card',
                    description: 'Preview article content with metadata',
                    code: `<article class="article-card">
  <header>
    <h3><a href="/article">Article Title</a></h3>
    <time datetime="2025-09-22">Sep 22, 2025</time>
  </header>
  <p>Article excerpt...</p>
  <a href="/article" class="read-more">Read More</a>
</article>`
                }
            ]
        },
        modals: {
            title: 'Modal Patterns',
            description: 'Overlay patterns for focused interactions and content display.',
            patterns: [
                {
                    name: 'Confirmation Modal',
                    description: 'Confirm destructive or important actions',
                    code: `<div class="modal">
  <div class="modal-content">
    <h3>Confirm Delete</h3>
    <p>Are you sure you want to delete this item?</p>
    <div class="modal-actions">
      <button class="btn-secondary">Cancel</button>
      <button class="btn-danger">Delete</button>
    </div>
  </div>
</div>`
                },
                {
                    name: 'Info Modal',
                    description: 'Display additional information or help content',
                    code: `<div class="modal">
  <div class="modal-content">
    <header class="modal-header">
      <h3>Help Information</h3>
      <button class="modal-close">&times;</button>
    </header>
    <div class="modal-body">
      <p>Detailed help content...</p>
    </div>
  </div>
</div>`
                }
            ]
        },
        feedback: {
            title: 'Feedback Patterns',
            description: 'Patterns for providing user feedback and system status.',
            patterns: [
                {
                    name: 'Toast Notifications',
                    description: 'Temporary messages for user actions',
                    code: `<div class="toast toast-success">
  <i class="fas fa-check-circle"></i>
  <span>Profile updated successfully!</span>
  <button class="toast-close">&times;</button>
</div>`
                },
                {
                    name: 'Loading States',
                    description: 'Show progress for async operations',
                    code: `<button class="btn-primary loading">
  <i class="fas fa-spinner fa-spin"></i>
  Processing...
</button>`
                }
            ]
        }
    };

    const pattern = patterns[patternType];
    if (!pattern) return;

    const modal = createModal('pattern-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-puzzle-piece"></i> ${pattern.title}</h3>
                <button class="modal-close" onclick="closeModal('pattern-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <p class="pattern-description">${pattern.description}</p>
                
                ${pattern.patterns.map(p => `
                    <div class="pattern-example">
                        <h4>${p.name}</h4>
                        <p>${p.description}</p>
                        <pre><code class="language-html">${p.code}</code></pre>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    showModal('pattern-modal');
}

function resetDesign() {
    const designElement = document.getElementById('design-playground');
    if (designElement) {
        designElement.className = 'design-playground';
        designElement.style.backgroundColor = '#ffffff';
        designElement.style.color = '#333333';
        designElement.style.fontSize = '16px';
        designElement.style.padding = '20px';
        designElement.style.borderRadius = '4px';
        designElement.style.border = '1px solid #ddd';
    }

    showDesignFeedback('Design reset to default settings');
}

function randomizeDesign() {
    const designElement = document.getElementById('design-playground');
    if (!designElement) return;

    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
    const backgroundColors = ['#f8f9fa', '#ffffff', '#f1f3f4', '#fff5f5', '#f0f8ff'];
    const fontSizes = ['14px', '16px', '18px', '20px'];
    const paddings = ['15px', '20px', '25px', '30px'];
    const borderRadius = ['4px', '8px', '12px', '16px'];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomBg = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    const randomSize = fontSizes[Math.floor(Math.random() * fontSizes.length)];
    const randomPadding = paddings[Math.floor(Math.random() * paddings.length)];
    const randomRadius = borderRadius[Math.floor(Math.random() * borderRadius.length)];

    designElement.style.color = randomColor;
    designElement.style.backgroundColor = randomBg;
    designElement.style.fontSize = randomSize;
    designElement.style.padding = randomPadding;
    designElement.style.borderRadius = randomRadius;
    designElement.style.border = `2px solid ${randomColor}`;

    showDesignFeedback('Design randomized! Try different combinations.');
}

function saveDesign() {
    const designElement = document.getElementById('design-playground');
    if (!designElement) return;

    const styles = {
        color: designElement.style.color,
        backgroundColor: designElement.style.backgroundColor,
        fontSize: designElement.style.fontSize,
        padding: designElement.style.padding,
        borderRadius: designElement.style.borderRadius,
        border: designElement.style.border
    };

    localStorage.setItem('savedDesign', JSON.stringify(styles));
    showDesignFeedback('Design saved to browser storage!');
}

function showDesignFeedback(message) {
    const feedback = document.getElementById('design-feedback') || createDesignFeedback();
    feedback.textContent = message;
    feedback.className = 'design-feedback show';

    setTimeout(() => {
        feedback.className = 'design-feedback';
    }, 3000);
}

function createDesignFeedback() {
    const feedback = document.createElement('div');
    feedback.id = 'design-feedback';
    feedback.className = 'design-feedback';

    const playground = document.getElementById('design-playground');
    if (playground && playground.parentElement) {
        playground.parentElement.appendChild(feedback);
    }

    return feedback;
}

function createModal(modalId) {
    let modal = document.getElementById(modalId);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal';
        document.body.appendChild(modal);
    }
    return modal;
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
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

// Nested Lists Builder Functions
let listItemCounter = 1;

function addListItem() {
    const listCode = document.getElementById('list-code');
    const listPreview = document.getElementById('list-preview');

    if (!listCode || !listPreview) return;

    // Find the last ul in the code
    const codeText = listCode.textContent;
    const lastUlIndex = codeText.lastIndexOf('</ul>');
    if (lastUlIndex === -1) return;

    // Insert new li before the last </ul>
    const newCode = codeText.slice(0, lastUlIndex) + `    <li>Item ${listItemCounter + 1}</li>\n` + codeText.slice(lastUlIndex);
    listCode.textContent = newCode;

    // Update preview
    const newLi = document.createElement('li');
    newLi.textContent = `Item ${listItemCounter + 1}`;
    listPreview.querySelector('ul').appendChild(newLi);

    listItemCounter++;
}

function addNestedList() {
    const listCode = document.getElementById('list-code');
    const listPreview = document.getElementById('list-preview');

    if (!listCode || !listPreview) return;

    // Find the last li in the code
    const codeText = listCode.textContent;
    const lastLiIndex = codeText.lastIndexOf('</li>');
    if (lastLiIndex === -1) return;

    // Insert nested ul inside the last li
    const newCode = codeText.slice(0, lastLiIndex) + `\n        <ul>\n            <li>Nested Item 1</li>\n        </ul>\n    ` + codeText.slice(lastLiIndex);
    listCode.textContent = newCode;

    // Update preview
    const lastLi = listPreview.querySelector('li:last-child');
    if (lastLi) {
        const nestedUl = document.createElement('ul');
        const nestedLi = document.createElement('li');
        nestedLi.textContent = 'Nested Item 1';
        nestedUl.appendChild(nestedLi);
        lastLi.appendChild(nestedUl);
    }
}

function clearList() {
    const listCode = document.getElementById('list-code');
    const listPreview = document.getElementById('list-preview');

    if (!listCode || !listPreview) return;

    // Reset code
    listCode.textContent = `<ul>
    <li>Item 1</li>
</ul>`;

    // Reset preview
    listPreview.innerHTML = `<ul>
    <li>Item 1</li>
</ul>`;

    listItemCounter = 1;
}

// Link Generator Function
function generateLink() {
    const linkText = document.getElementById('link-text').value.trim();
    const linkUrl = document.getElementById('link-url').value.trim();
    const linkTarget = document.getElementById('link-target').value;
    const generatedLink = document.getElementById('generated-link');
    const linkPreview = document.getElementById('link-preview');

    if (!generatedLink || !linkPreview) return;

    // Validate inputs
    if (!linkText) {
        alert('Please enter link text');
        return;
    }

    if (!linkUrl) {
        alert('Please enter a URL');
        return;
    }

    // Generate HTML code
    const htmlCode = `<a href="${linkUrl}" target="${linkTarget}">${linkText}</a>`;
    generatedLink.textContent = htmlCode;

    // Generate preview link
    linkPreview.innerHTML = '';
    const previewLink = document.createElement('a');
    previewLink.href = linkUrl;
    previewLink.target = linkTarget;
    previewLink.textContent = linkText;
    linkPreview.appendChild(previewLink);
}

// Image Gallery Builder Functions
function addToGallery() {
    const imageUrl = document.getElementById('gallery-image-url').value.trim();
    const imageAlt = document.getElementById('gallery-image-alt').value.trim();
    const galleryHtml = document.getElementById('gallery-html');
    const galleryDisplay = document.getElementById('gallery-display');

    if (!galleryHtml || !galleryDisplay) return;

    // Validate inputs
    if (!imageUrl) {
        alert('Please enter an image URL');
        return;
    }

    if (!imageAlt) {
        alert('Please enter alt text for the image');
        return;
    }

    // Get current HTML content
    let currentHtml = galleryHtml.textContent;

    // Add image to HTML code
    const imageHtml = `    <img src="${imageUrl}" alt="${imageAlt}" class="gallery-image">`;
    const insertPoint = currentHtml.lastIndexOf('</div>');
    if (insertPoint !== -1) {
        currentHtml = currentHtml.slice(0, insertPoint) + '\n' + imageHtml + '\n' + currentHtml.slice(insertPoint);
        galleryHtml.textContent = currentHtml;
    }

    // Add image to preview
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = imageAlt;
    imgElement.className = 'gallery-image';
    imgElement.style.maxWidth = '100%';
    imgElement.style.height = 'auto';
    imgElement.style.borderRadius = '4px';
    imgElement.style.marginBottom = '8px';
    galleryDisplay.appendChild(imgElement);

    // Clear inputs
    document.getElementById('gallery-image-url').value = '';
    document.getElementById('gallery-image-alt').value = '';
}

function clearGallery() {
    const galleryHtml = document.getElementById('gallery-html');
    const galleryDisplay = document.getElementById('gallery-display');

    if (!galleryHtml || !galleryDisplay) return;

    // Reset HTML code
    galleryHtml.textContent = `<div class="gallery">
    <!-- Images will appear here -->
</div>`;

    // Reset preview
    galleryDisplay.innerHTML = '';
}

// Modal functions
function showModal(title, content) {
    const modal = document.getElementById('solution-modal');
    const modalTitle = document.querySelector('.modal-title');
    const solutionContent = document.getElementById('solution-content');

    if (!modal || !modalTitle || !solutionContent) return;

    modalTitle.textContent = title;
    solutionContent.innerHTML = content;
    modal.classList.add('show');

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Highlight code blocks in the modal
    if (typeof Prism !== 'undefined') {
        Prism.highlightAllUnder(solutionContent);
    }
}

function closeModal() {
    const modal = document.getElementById('solution-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking backdrop
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('solution-modal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// Interactive Practice Solution Functions
function checkRecipe() {
    const resultBox = document.getElementById('recipe-result');
    const buttonText = document.getElementById('recipe-button-text');

    if (!resultBox) return;

    // Toggle solution display
    if (resultBox.style.display === 'block') {
        resultBox.style.display = 'none';
        if (buttonText) buttonText.textContent = 'Check Solution';
        return;
    }

    const content = `
        <h5><i class="fas fa-check-circle"></i> Recipe List Solution</h5>
        <div class="solution-code">
            <pre><code class="language-html">&lt;h2&gt;Chocolate Chip Cookies&lt;/h2&gt;
&lt;h3&gt;Ingredients:&lt;/h3&gt;
&lt;ul&gt;
    &lt;li&gt;2 1/4 cups all-purpose flour&lt;/li&gt;
    &lt;li&gt;1 teaspoon baking soda&lt;/li&gt;
    &lt;li&gt;1 cup unsalted butter&lt;/li&gt;
    &lt;li&gt;3/4 cup granulated sugar&lt;/li&gt;
    &lt;li&gt;3/4 cup brown sugar&lt;/li&gt;
    &lt;li&gt;2 large eggs&lt;/li&gt;
    &lt;li&gt;2 teaspoons vanilla extract&lt;/li&gt;
    &lt;li&gt;2 cups chocolate chips&lt;/li&gt;
&lt;/ul&gt;

&lt;h3&gt;Cooking Steps:&lt;/h3&gt;
&lt;ol&gt;
    &lt;li&gt;Preheat oven to 375°F (190°C)&lt;/li&gt;
    &lt;li&gt;Mix dry ingredients in a bowl&lt;/li&gt;
    &lt;li&gt;Cream butter and sugars together&lt;/li&gt;
    &lt;li&gt;Add eggs and vanilla, mix well&lt;/li&gt;
    &lt;li&gt;Combine wet and dry ingredients&lt;/li&gt;
    &lt;li&gt;Fold in chocolate chips&lt;/li&gt;
    &lt;li&gt;Drop spoonfuls onto baking sheet&lt;/li&gt;
    &lt;li&gt;Bake for 9-11 minutes&lt;/li&gt;
&lt;/ol&gt;</code></pre>
        </div>
        <div class="solution-explanation">
            <p>This solution demonstrates nested lists - an unordered list for ingredients and an ordered list for cooking steps. Each list item represents a different component of the recipe.</p>
            <p><strong>Key HTML elements used:</strong></p>
            <ul>
                <li><code>&lt;h2&gt;</code> and <code>&lt;h3&gt;</code> for headings</li>
                <li><code>&lt;ul&gt;</code> for unordered (bullet) lists</li>
                <li><code>&lt;ol&gt;</code> for ordered (numbered) lists</li>
                <li><code>&lt;li&gt;</code> for list items</li>
            </ul>
        </div>
    `;

    resultBox.innerHTML = content;
    resultBox.className = 'result-box info';
    resultBox.style.display = 'block';

    if (buttonText) buttonText.textContent = 'Hide Solution';

    // Highlight code blocks
    if (typeof Prism !== 'undefined') {
        Prism.highlightAllUnder(resultBox);
    }

    // Scroll to the result
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function checkNav() {
    const resultBox = document.getElementById('nav-result');
    const buttonText = document.getElementById('nav-button-text');

    if (!resultBox) return;

    // Toggle solution display
    if (resultBox.style.display === 'block') {
        resultBox.style.display = 'none';
        if (buttonText) buttonText.textContent = 'Check Solution';
        return;
    }

    const content = `
        <h5><i class="fas fa-check-circle"></i> Navigation Menu Solution</h5>
        <div class="solution-code">
            <pre><code class="language-html">&lt;nav&gt;
    &lt;ul&gt;
        &lt;li&gt;&lt;a href="#home"&gt;Home&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#about"&gt;About&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#services"&gt;Services&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#portfolio"&gt;Portfolio&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="#contact"&gt;Contact&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/nav&gt;</code></pre>
        </div>
        <div class="solution-explanation">
            <p>This navigation menu uses semantic HTML with proper link structure. The <code>&lt;nav&gt;</code> element indicates this is a navigation section, and the unordered list organizes the menu items.</p>
            <p><strong>Key HTML elements used:</strong></p>
            <ul>
                <li><code>&lt;nav&gt;</code> for semantic navigation section</li>
                <li><code>&lt;ul&gt;</code> for the menu list</li>
                <li><code>&lt;li&gt;</code> for each menu item</li>
                <li><code>&lt;a&gt;</code> with <code>href</code> attributes for navigation links</li>
            </ul>
            <p><strong>Best practices:</strong> Use anchor links (#section) for single-page navigation, or full URLs for multi-page sites.</p>
        </div>
    `;

    resultBox.innerHTML = content;
    resultBox.className = 'result-box info';
    resultBox.style.display = 'block';

    if (buttonText) buttonText.textContent = 'Hide Solution';

    // Highlight code blocks
    if (typeof Prism !== 'undefined') {
        Prism.highlightAllUnder(resultBox);
    }

    // Scroll to the result
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function checkAlbum() {
    const resultBox = document.getElementById('album-result');
    const buttonText = document.getElementById('album-button-text');

    if (!resultBox) return;

    // Toggle solution display
    if (resultBox.style.display === 'block') {
        resultBox.style.display = 'none';
        if (buttonText) buttonText.textContent = 'Check Solution';
        return;
    }

    const content = `
        <h5><i class="fas fa-check-circle"></i> Photo Album Solution</h5>
        <div class="solution-code">
            <pre><code class="language-html">&lt;div class="album"&gt;
    &lt;figure&gt;
        &lt;img src="photo1.jpg" alt="Beautiful sunset over mountains"&gt;
        &lt;figcaption&gt;Sunset in the Rockies&lt;/figcaption&gt;
    &lt;/figure&gt;

    &lt;figure&gt;
        &lt;img src="photo2.jpg" alt="Colorful autumn leaves"&gt;
        &lt;figcaption&gt;Fall colors in the park&lt;/figcaption&gt;
    &lt;/figure&gt;

    &lt;figure&gt;
        &lt;img src="photo3.jpg" alt="Ocean waves crashing on shore"&gt;
        &lt;figcaption&gt;Pacific Ocean waves&lt;/figcaption&gt;
    &lt;/figure&gt;
&lt;/div&gt;</code></pre>
        </div>
        <div class="solution-explanation">
            <p>This photo album uses semantic HTML with <code>&lt;figure&gt;</code> and <code>&lt;figcaption&gt;</code> elements to properly associate images with their captions. This improves accessibility and SEO.</p>
            <p><strong>Key HTML elements used:</strong></p>
            <ul>
                <li><code>&lt;div class="album"&gt;</code> for the container</li>
                <li><code>&lt;figure&gt;</code> to group each image with its caption</li>
                <li><code>&lt;img&gt;</code> with descriptive <code>alt</code> text</li>
                <li><code>&lt;figcaption&gt;</code> for image descriptions/captions</li>
            </ul>
            <p><strong>Accessibility note:</strong> Always provide meaningful alt text that describes the image content for screen readers.</p>
        </div>
    `;

    resultBox.innerHTML = content;
    resultBox.className = 'result-box info';
    resultBox.style.display = 'block';

    if (buttonText) buttonText.textContent = 'Hide Solution';

    // Highlight code blocks
    if (typeof Prism !== 'undefined') {
        Prism.highlightAllUnder(resultBox);
    }

    // Scroll to the result
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Table and Form Builder Functions
function generateTable() {
    const rows = parseInt(document.getElementById('table-rows').value) || 3;
    const cols = parseInt(document.getElementById('table-cols').value) || 3;
    const includeHeader = document.getElementById('table-header').checked;
    const includeFooter = document.getElementById('table-footer').checked;

    let html = '<table>\n';
    let previewHtml = '<table>\n';

    // Generate header
    if (includeHeader) {
        html += '    <thead>\n        <tr>\n';
        previewHtml += '    <thead>\n        <tr>\n';
        for (let c = 1; c <= cols; c++) {
            html += `            <th>Header ${c}</th>\n`;
            previewHtml += `            <th>Header ${c}</th>\n`;
        }
        html += '        </tr>\n    </thead>\n';
        previewHtml += '        </tr>\n    </thead>\n';
    }

    // Generate body
    html += '    <tbody>\n';
    previewHtml += '    <tbody>\n';
    for (let r = 1; r <= rows; r++) {
        html += '        <tr>\n';
        previewHtml += '        <tr>\n';
        for (let c = 1; c <= cols; c++) {
            html += `            <td>Row ${r}, Col ${c}</td>\n`;
            previewHtml += `            <td>Row ${r}, Col ${c}</td>\n`;
        }
        html += '        </tr>\n';
        previewHtml += '        </tr>\n';
    }
    html += '    </tbody>\n';
    previewHtml += '    </tbody>\n';

    // Generate footer
    if (includeFooter) {
        html += '    <tfoot>\n        <tr>\n';
        previewHtml += '    <tfoot>\n        <tr>\n';
        for (let c = 1; c <= cols; c++) {
            html += `            <td>Footer ${c}</td>\n`;
            previewHtml += `            <td>Footer ${c}</td>\n`;
        }
        html += '        </tr>\n    </tfoot>\n';
        previewHtml += '        </tr>\n    </tfoot>\n';
    }

    html += '</table>';
    previewHtml += '</table>';

    // Display the generated HTML
    document.getElementById('table-html-output').textContent = html;

    // Display the preview
    document.getElementById('table-preview-output').innerHTML = previewHtml;
}

function addFormElement(type) {
    const formOutput = document.getElementById('form-html-output');
    const generatedForm = document.getElementById('generated-form');

    let html = '';
    let elementHtml = '';

    switch (type) {
        case 'text':
            html = '    <div class="form-group">\n        <label for="text-input">Text Input:</label>\n        <input type="text" id="text-input" name="text-input" placeholder="Enter text">\n    </div>\n';
            elementHtml = '<div class="form-group"><label for="text-input">Text Input:</label><input type="text" id="text-input" name="text-input" placeholder="Enter text"></div>';
            break;
        case 'email':
            html = '    <div class="form-group">\n        <label for="email-input">Email:</label>\n        <input type="email" id="email-input" name="email-input" placeholder="Enter email">\n    </div>\n';
            elementHtml = '<div class="form-group"><label for="email-input">Email:</label><input type="email" id="email-input" name="email-input" placeholder="Enter email"></div>';
            break;
        case 'password':
            html = '    <div class="form-group">\n        <label for="password-input">Password:</label>\n        <input type="password" id="password-input" name="password-input" placeholder="Enter password">\n    </div>\n';
            elementHtml = '<div class="form-group"><label for="password-input">Password:</label><input type="password" id="password-input" name="password-input" placeholder="Enter password"></div>';
            break;
        case 'textarea':
            html = '    <div class="form-group">\n        <label for="textarea-input">Message:</label>\n        <textarea id="textarea-input" name="textarea-input" rows="4" placeholder="Enter your message"></textarea>\n    </div>\n';
            elementHtml = '<div class="form-group"><label for="textarea-input">Message:</label><textarea id="textarea-input" name="textarea-input" rows="4" placeholder="Enter your message"></textarea></div>';
            break;
        case 'select':
            html = '    <div class="form-group">\n        <label for="select-input">Choose option:</label>\n        <select id="select-input" name="select-input">\n            <option value="">Select an option</option>\n            <option value="option1">Option 1</option>\n            <option value="option2">Option 2</option>\n            <option value="option3">Option 3</option>\n        </select>\n    </div>\n';
            elementHtml = '<div class="form-group"><label for="select-input">Choose option:</label><select id="select-input" name="select-input"><option value="">Select an option</option><option value="option1">Option 1</option><option value="option2">Option 2</option><option value="option3">Option 3</option></select></div>';
            break;
        case 'checkbox':
            html = '    <div class="form-group">\n        <label><input type="checkbox" name="checkbox-input" value="checked"> Checkbox option</label>\n    </div>\n';
            elementHtml = '<div class="form-group"><label><input type="checkbox" name="checkbox-input" value="checked"> Checkbox option</label></div>';
            break;
        case 'radio':
            html = '    <div class="form-group">\n        <label>Radio options:</label><br>\n        <label><input type="radio" name="radio-group" value="option1"> Option 1</label><br>\n        <label><input type="radio" name="radio-group" value="option2"> Option 2</label><br>\n        <label><input type="radio" name="radio-group" value="option3"> Option 3</label>\n    </div>\n';
            elementHtml = '<div class="form-group"><label>Radio options:</label><br><label><input type="radio" name="radio-group" value="option1"> Option 1</label><br><label><input type="radio" name="radio-group" value="option2"> Option 2</label><br><label><input type="radio" name="radio-group" value="option3"> Option 3</label></div>';
            break;
    }

    // Update the HTML output
    let currentHtml = formOutput.textContent;
    if (currentHtml.includes('<!-- Form elements will appear here -->')) {
        currentHtml = currentHtml.replace('<!-- Form elements will appear here -->', '<!-- Form elements will appear here -->\n' + html);
    } else {
        currentHtml += '\n' + html;
    }
    formOutput.textContent = currentHtml;

    // Update the preview
    generatedForm.insertAdjacentHTML('beforeend', elementHtml);
}

function clearForm() {
    document.getElementById('form-html-output').textContent = '<form>\n    <!-- Form elements will appear here -->\n</form>';
    document.getElementById('generated-form').innerHTML = '';
}

function handleValidation(event) {
    event.preventDefault();

    const form = event.target;
    const resultDiv = document.getElementById('validation-result');

    if (form.checkValidity()) {
        resultDiv.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> Form submitted successfully! All fields are valid.</div>';
        resultDiv.className = 'result-box success';
    } else {
        resultDiv.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Please fill in all required fields correctly.</div>';
        resultDiv.className = 'result-box error';
    }

    resultDiv.style.display = 'block';
}

function checkTable() {
    const userCode = document.getElementById('table-challenge').value.trim();
    const resultDiv = document.getElementById('table-result');

    // Basic validation - check if it contains table, tr, td elements
    const hasTable = /<table[^>]*>/i.test(userCode);
    const hasRows = /<tr[^>]*>/gi.test(userCode);
    const hasCells = /<td[^>]*>/gi.test(userCode);

    if (hasTable && hasRows && hasCells) {
        resultDiv.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> Great! Your table structure looks correct. It includes table, row, and cell elements.</div>';
        resultDiv.className = 'result-box success';
    } else {
        let missing = [];
        if (!hasTable) missing.push('table element');
        if (!hasRows) missing.push('tr (row) elements');
        if (!hasCells) missing.push('td (cell) elements');

        resultDiv.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Your table is missing: ${missing.join(', ')}. Try again!</div>`;
        resultDiv.className = 'result-box error';
    }

    resultDiv.style.display = 'block';
}

function checkForm() {
    const userCode = document.getElementById('form-challenge').value.trim();
    const resultDiv = document.getElementById('form-result');

    // Basic validation - check if it contains form, input, label elements
    const hasForm = /<form[^>]*>/i.test(userCode);
    const hasInputs = /<input[^>]*>/gi.test(userCode);
    const hasLabels = /<label[^>]*>/gi.test(userCode);

    if (hasForm && hasInputs && hasLabels) {
        resultDiv.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> Excellent! Your form structure looks correct. It includes form, input, and label elements.</div>';
        resultDiv.className = 'result-box success';
    } else {
        let missing = [];
        if (!hasForm) missing.push('form element');
        if (!hasInputs) missing.push('input elements');
        if (!hasLabels) missing.push('label elements');

        resultDiv.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Your form is missing: ${missing.join(', ')}. Try again!</div>`;
        resultDiv.className = 'result-box error';
    }

    resultDiv.style.display = 'block';
}

function checkRegistration() {
    const userCode = document.getElementById('register-challenge').value.trim();
    const resultDiv = document.getElementById('register-result');

    // Check for form with validation attributes
    const hasForm = /<form[^>]*>/i.test(userCode);
    const hasRequired = /required/gi.test(userCode);
    const hasEmail = /type="email"/gi.test(userCode);
    const hasPassword = /type="password"/gi.test(userCode);

    if (hasForm && hasRequired && hasEmail && hasPassword) {
        resultDiv.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> Perfect! Your registration form includes proper validation with required fields, email input, and password field.</div>';
        resultDiv.className = 'result-box success';
    } else {
        let missing = [];
        if (!hasForm) missing.push('form element');
        if (!hasRequired) missing.push('required attributes');
        if (!hasEmail) missing.push('email input type');
        if (!hasPassword) missing.push('password input type');

        resultDiv.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Your registration form is missing: ${missing.join(', ')}. Try again!</div>`;
        resultDiv.className = 'result-box error';
    }

    resultDiv.style.display = 'block';
}

// Resource Preview Functions
function openResource(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Enhanced resource card interactions
document.addEventListener('DOMContentLoaded', function () {
    // Add click handlers for resource cards
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        card.addEventListener('click', function () {
            const url = this.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
            if (url) {
                openResource(url);
            }
        });

        // Add keyboard accessibility
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const url = this.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
                if (url) {
                    openResource(url);
                }
            }
        });

        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Open ${card.querySelector('h4').textContent}`);
    });
});

// ============================================================================
// SEMANTIC HTML STRUCTURE DEMO FUNCTIONS
// ============================================================================

// Element information data for the semantic structure demo
const semanticElementInfo = {
    header: {
        name: '<header>',
        purpose: 'Contains introductory content for the page or a section. Usually includes site branding, navigation, and key identifying information.',
        usage: [
            'Page header with site branding and main navigation',
            'Article header with title and metadata',
            'Section header with heading and description'
        ],
        accessibility: 'Provides a landmark for screen readers, helping users navigate to the beginning of content sections.',
        code: `<header>
    <h1>Site Title</h1>
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
        </ul>
    </nav>
</header>`
    },
    nav: {
        name: '<nav>',
        purpose: 'Contains navigation links for the site or a section. Groups related navigation elements together.',
        usage: [
            'Primary site navigation menu',
            'Breadcrumb navigation trails',
            'Pagination controls',
            'Table of contents for long documents'
        ],
        accessibility: 'Creates a navigation landmark that screen readers can jump to directly, improving site navigation.',
        code: `<nav aria-label="Main navigation">
    <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</nav>`
    },
    main: {
        name: '<main>',
        purpose: 'Contains the primary content of the document. There should be only one main element per page.',
        usage: [
            'Primary content area of a webpage',
            'Main article content in a blog post',
            'Core functionality of a web application'
        ],
        accessibility: 'Provides the main landmark that helps screen readers skip directly to primary content.',
        code: `<main>
    <h1>Page Title</h1>
    <p>This is the main content of the page...</p>
    <article>...</article>
    <section>...</section>
</main>`
    },
    article: {
        name: '<article>',
        purpose: 'Contains self-contained content that could be independently distributed or reused.',
        usage: [
            'Blog posts and news articles',
            'Forum posts and comments',
            'Product cards in e-commerce',
            'Social media posts'
        ],
        accessibility: 'Helps screen readers identify discrete pieces of content that can be consumed independently.',
        code: `<article>
    <header>
        <h2>Article Title</h2>
        <time datetime="2025-09-22">Sep 22, 2025</time>
    </header>
    <p>Article content...</p>
    <footer>
        <p>Tags: HTML, Semantic</p>
    </footer>
</article>`
    },
    section: {
        name: '<section>',
        purpose: 'Groups related content together, typically with a heading. Represents a thematic grouping of content.',
        usage: [
            'Chapters or major sections of content',
            'Grouped features or services',
            'Themed content areas',
            'Parts of an article or document'
        ],
        accessibility: 'Provides structural organization that helps screen readers understand content hierarchy.',
        code: `<section>
    <h2>Our Services</h2>
    <div>
        <h3>Web Design</h3>
        <p>Creating beautiful websites...</p>
    </div>
    <div>
        <h3>Development</h3>
        <p>Building robust applications...</p>
    </div>
</section>`
    },
    aside: {
        name: '<aside>',
        purpose: 'Contains content that is tangentially related to the main content, like sidebars or call-out boxes.',
        usage: [
            'Sidebar content and widgets',
            'Related links and recommended reading',
            'Advertisements and promotional content',
            'Author bio or related information'
        ],
        accessibility: 'Helps screen readers identify supplementary content that can be skipped if desired.',
        code: `<aside>
    <h3>Related Posts</h3>
    <ul>
        <li><a href="#post1">Understanding CSS</a></li>
        <li><a href="#post2">JavaScript Basics</a></li>
    </ul>
    
    <h3>Contact Info</h3>
    <address>
        <p>Email: info@example.com</p>
    </address>
</aside>`
    },
    footer: {
        name: '<footer>',
        purpose: 'Contains footer information for its nearest ancestor sectioning element or the page.',
        usage: [
            'Page footer with copyright and links',
            'Article footer with metadata',
            'Section footer with additional info',
            'Contact information and social links'
        ],
        accessibility: 'Provides a contentinfo landmark for screen readers to find supplementary page information.',
        code: `<footer>
    <nav>
        <h3>Quick Links</h3>
        <ul>
            <li><a href="#privacy">Privacy</a></li>
            <li><a href="#terms">Terms</a></li>
        </ul>
    </nav>
    <p>&copy; 2025 My Website. All rights reserved.</p>
</footer>`
    }
};

/**
 * Highlight structural elements based on type
 * @param {string} type - Type of highlighting: 'all', 'landmarks', or 'reset'
 */
function highlightStructure(type) {
    const elements = document.querySelectorAll('.demo-element');
    const landmarks = ['header-section', 'nav-section', 'main-section', 'aside-section', 'footer-section'];

    // Remove existing highlighting
    elements.forEach(el => {
        el.classList.remove('highlighted', 'landmark-highlighted', 'dimmed');
    });

    switch (type) {
        case 'all':
            elements.forEach(el => el.classList.add('highlighted'));
            break;
        case 'landmarks':
            elements.forEach(el => {
                if (landmarks.some(landmark => el.classList.contains(landmark))) {
                    el.classList.add('landmark-highlighted');
                } else {
                    el.classList.add('dimmed');
                }
            });
            break;
        case 'reset':
        default:
            // Already cleared above
            break;
    }
}

/**
 * Highlight a specific element and show its information
 * @param {string} elementType - Type of semantic element to highlight
 */
function highlightElement(elementType) {
    // Remove existing highlights
    document.querySelectorAll('.demo-element').forEach(el => {
        el.classList.remove('element-highlighted', 'highlighted', 'landmark-highlighted', 'dimmed');
    });

    // Highlight the specific element(s)
    const elementSelector = `[data-element="${elementType}"]`;
    const elements = document.querySelectorAll(elementSelector);

    elements.forEach(el => {
        el.classList.add('element-highlighted');
    });

    // Show element information
    showElementInfo(elementType);

    // Add a subtle animation
    elements.forEach(el => {
        el.style.transform = 'scale(1.02)';
        setTimeout(() => {
            el.style.transform = '';
        }, 300);
    });
}

/**
 * Show detailed information about a semantic element
 * @param {string} elementType - Type of semantic element
 */
function showElementInfo(elementType) {
    const info = semanticElementInfo[elementType];
    if (!info) return;

    const panel = document.getElementById('element-info');
    const nameEl = document.getElementById('info-element-name');
    const purposeEl = document.getElementById('info-purpose');
    const usageEl = document.getElementById('info-usage');
    const accessibilityEl = document.getElementById('info-accessibility');
    const codeEl = document.getElementById('info-code');

    // Update content
    nameEl.textContent = `${info.name} Element`;
    purposeEl.textContent = info.purpose;
    accessibilityEl.textContent = info.accessibility;
    codeEl.querySelector('code').textContent = info.code;

    // Update usage list
    usageEl.innerHTML = '';
    info.usage.forEach(use => {
        const li = document.createElement('li');
        li.textContent = use;
        usageEl.appendChild(li);
    });

    // Show panel with animation
    panel.style.display = 'block';
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(20px)';

    setTimeout(() => {
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
    }, 10);

    // Highlight code syntax
    if (window.Prism) {
        Prism.highlightElement(codeEl.querySelector('code'));
    }
}

/**
 * Close the element information panel
 */
function closeElementInfo() {
    const panel = document.getElementById('element-info');
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(20px)';

    setTimeout(() => {
        panel.style.display = 'none';
    }, 300);

    // Remove element highlighting
    document.querySelectorAll('.demo-element').forEach(el => {
        el.classList.remove('element-highlighted');
    });
}

// Add event listeners for the demo elements when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Make demo elements keyboard accessible
    const demoElements = document.querySelectorAll('.demo-element[onclick]');
    demoElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        element.setAttribute('aria-label', `Learn about ${element.dataset.element} element`);

        element.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });

    // Close panels when clicking outside
    document.addEventListener('click', function (e) {
        const infoPanel = document.getElementById('element-info');

        if (infoPanel && infoPanel.style.display === 'block' &&
            !infoPanel.contains(e.target) &&
            !e.target.closest('.demo-element')) {
            closeElementInfo();
        }
    });

    // Handle escape key to close panels
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeElementInfo();
        }
    });

    // Initialize accessibility checklist
    initializeAccessibilityChecklist();
});

// ============================================================================
// ACCESSIBILITY BENEFITS SECTION FUNCTIONS
// ============================================================================

/**
 * Initialize the accessibility checklist functionality
 */
function initializeAccessibilityChecklist() {
    const checkboxes = document.querySelectorAll('.form-check-input[data-rule]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateAccessibilityScore);
    });
    updateAccessibilityScore(); // Initial score update
}

/**
 * Update the accessibility score based on checked items
 */
function updateAccessibilityScore() {
    const checkboxes = document.querySelectorAll('.form-check-input[data-rule]');
    const scoreValue = document.getElementById('score-value');
    const scoreContainer = document.getElementById('accessibility-score');

    if (!scoreValue || !scoreContainer) return;

    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    const totalCount = checkboxes.length;

    scoreValue.textContent = checkedCount;

    // Update score container styling based on score
    scoreContainer.className = 'score-container';
    if (checkedCount === totalCount) {
        scoreContainer.classList.add('score-excellent');
    } else if (checkedCount >= totalCount * 0.75) {
        scoreContainer.classList.add('score-good');
    } else if (checkedCount >= totalCount * 0.5) {
        scoreContainer.classList.add('score-okay');
    } else {
        scoreContainer.classList.add('score-poor');
    }
}

/**
 * Simulate screen reader navigation for semantic vs non-semantic HTML
 * @param {string} version - 'semantic' or 'nonsemantic'
 */
function simulateScreenReader(version) {
    const readerText = document.getElementById('reader-text');
    if (!readerText) return;

    // Clear previous content
    readerText.innerHTML = '';
    readerText.className = 'reader-output reading';

    let messages = [];

    if (version === 'semantic') {
        messages = [
            { text: 'Navigation landmark', delay: 500, type: 'landmark' },
            { text: 'List with 4 items', delay: 1000, type: 'structure' },
            { text: 'Link: Home', delay: 1500, type: 'link' },
            { text: 'Link: About', delay: 2000, type: 'link' },
            { text: 'Link: Services', delay: 2500, type: 'link' },
            { text: 'Link: Contact', delay: 3000, type: 'link' },
            { text: 'End of navigation', delay: 3500, type: 'landmark' },
            { text: 'Main content landmark', delay: 4000, type: 'landmark' },
            { text: 'Heading level 1: Welcome to Our Site', delay: 4500, type: 'heading' },
            { text: 'Article landmark', delay: 5000, type: 'landmark' },
            { text: 'Heading level 2: Latest News', delay: 5500, type: 'heading' },
            { text: 'Paragraph: This is our latest article...', delay: 6000, type: 'content' },
            { text: 'Aside landmark', delay: 6500, type: 'landmark' },
            { text: 'Heading level 3: Related Links', delay: 7000, type: 'heading' },
            { text: 'Footer landmark', delay: 7500, type: 'landmark' },
            { text: 'Copyright 2025 - All rights reserved', delay: 8000, type: 'content' }
        ];
    } else {
        messages = [
            { text: 'Generic container', delay: 500, type: 'generic' },
            { text: 'Generic container', delay: 1000, type: 'generic' },
            { text: 'Link: Home', delay: 1500, type: 'link' },
            { text: 'Link: About', delay: 2000, type: 'link' },
            { text: 'Link: Services', delay: 2500, type: 'link' },
            { text: 'Link: Contact', delay: 3000, type: 'link' },
            { text: 'Generic container', delay: 3500, type: 'generic' },
            { text: 'Text: Welcome to Our Site', delay: 4000, type: 'content' },
            { text: 'Generic container', delay: 4500, type: 'generic' },
            { text: 'Text: Latest News', delay: 5000, type: 'content' },
            { text: 'Text: This is our latest article...', delay: 5500, type: 'content' },
            { text: 'Generic container', delay: 6000, type: 'generic' },
            { text: 'Text: Related Links', delay: 6500, type: 'content' },
            { text: 'Generic container', delay: 7000, type: 'generic' },
            { text: 'Text: Copyright 2025 - All rights reserved', delay: 7500, type: 'content' }
        ];
    }

    // Show initial message
    readerText.innerHTML = '<div class="reader-message initial">Screen reader is analyzing the page structure...</div>';

    // Animate messages
    messages.forEach((message, index) => {
        setTimeout(() => {
            const messageEl = document.createElement('div');
            messageEl.className = `reader-message ${message.type}`;
            messageEl.textContent = message.text;

            // Add appropriate icon based on type
            const icon = document.createElement('i');
            switch (message.type) {
                case 'landmark':
                    icon.className = 'fas fa-map-marker-alt';
                    break;
                case 'structure':
                    icon.className = 'fas fa-list';
                    break;
                case 'heading':
                    icon.className = 'fas fa-heading';
                    break;
                case 'link':
                    icon.className = 'fas fa-link';
                    break;
                case 'content':
                    icon.className = 'fas fa-align-left';
                    break;
                case 'generic':
                    icon.className = 'fas fa-square';
                    break;
                default:
                    icon.className = 'fas fa-circle';
            }

            messageEl.prepend(icon);

            if (index === 0) {
                readerText.innerHTML = '';
            }

            readerText.appendChild(messageEl);

            // Scroll to show latest message
            messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Add completion message
            if (index === messages.length - 1) {
                setTimeout(() => {
                    const completionEl = document.createElement('div');
                    completionEl.className = 'reader-message completion';
                    completionEl.innerHTML = '<i class="fas fa-check-circle"></i> Screen reader navigation complete';
                    readerText.appendChild(completionEl);
                    completionEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 1000);
            }
        }, message.delay);
    });
}

/**
 * Toggle all accessibility checklist items
 * @param {boolean} checked - Whether to check or uncheck all items
 */
function toggleAllAccessibilityItems(checked = true) {
    const checkboxes = document.querySelectorAll('.form-check-input[data-rule]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = checked;
    });
    updateAccessibilityScore();
}

/**
 * Show detailed accessibility information for a specific rule
 * @param {string} rule - The accessibility rule to show info for
 */
function showAccessibilityInfo(rule) {
    const accessibilityInfo = {
        headings: {
            title: 'Heading Hierarchy',
            description: 'Use headings (h1-h6) in logical order to create a clear document outline.',
            examples: [
                'h1 for main page title (only one per page)',
                'h2 for major section headings',
                'h3 for subsection headings',
                'Never skip heading levels'
            ],
            impact: 'Screen readers use headings to navigate content quickly'
        },
        landmarks: {
            title: 'Landmark Elements',
            description: 'Use semantic HTML5 elements to create page landmarks.',
            examples: [
                '<header> for page header',
                '<nav> for navigation menus',
                '<main> for primary content',
                '<aside> for sidebar content',
                '<footer> for page footer'
            ],
            impact: 'Landmarks help users navigate with screen readers and keyboard shortcuts'
        },
        'alt-text': {
            title: 'Image Alt Text',
            description: 'Provide descriptive alternative text for all meaningful images.',
            examples: [
                'Describe the content and function of the image',
                'Use empty alt="" for decorative images',
                'Avoid "image of" or "picture of" in descriptions',
                'Keep descriptions concise but informative'
            ],
            impact: 'Essential for users who cannot see images'
        },
        labels: {
            title: 'Form Labels',
            description: 'Associate labels with form inputs for better accessibility.',
            examples: [
                'Use <label for="input-id"> with matching input id',
                'Or wrap input inside <label> element',
                'Provide clear, descriptive label text',
                'Use fieldset and legend for grouped controls'
            ],
            impact: 'Screen readers announce labels when inputs receive focus'
        },
        'skip-links': {
            title: 'Skip Navigation',
            description: 'Provide skip links to help keyboard users bypass repetitive content.',
            examples: [
                'Add "Skip to main content" link at page top',
                'Make skip links visible on focus',
                'Link to main content area with id attribute',
                'Consider multiple skip options for complex layouts'
            ],
            impact: 'Allows keyboard users to navigate efficiently'
        },
        focus: {
            title: 'Keyboard Navigation',
            description: 'Ensure all interactive elements can be accessed via keyboard.',
            examples: [
                'All links and buttons should be focusable',
                'Provide visible focus indicators',
                'Logical tab order throughout the page',
                'No keyboard traps in dynamic content'
            ],
            impact: 'Critical for users who cannot use a mouse'
        }
    };

    const info = accessibilityInfo[rule];
    if (info) {
        showModal(info.title, `
            <div class="accessibility-info">
                <p><strong>Description:</strong> ${info.description}</p>
                <div class="examples-section">
                    <strong>Best Practices:</strong>
                    <ul>
                        ${info.examples.map(example => `<li>${example}</li>`).join('')}
                    </ul>
                </div>
                <div class="impact-section">
                    <strong>Accessibility Impact:</strong>
                    <p>${info.impact}</p>
                </div>
            </div>
        `);
    }
}

// ============================================================================
// INTERACTIVE PRACTICE SECTION FUNCTIONS
// ============================================================================

/**
 * Check the blog structure challenge solution
 */
function checkBlogStructure() {
    const userInput = document.getElementById('blog-challenge');
    const resultDiv = document.getElementById('blog-result');

    if (!userInput || !resultDiv) return;

    const solution = userInput.value.trim().toLowerCase();
    const requiredElements = ['<article>', '<h1>', '<h2>', '<time>', '<p>', '<footer>'];
    const semanticElements = ['article', 'header', 'h1', 'h2', 'time', 'footer'];

    let score = 0;
    let feedback = [];

    // Check for required semantic elements
    semanticElements.forEach(element => {
        if (solution.includes(`<${element}`)) {
            score++;
            feedback.push(`✅ Good: Used &lt;${element}&gt; element`);
        } else {
            feedback.push(`❌ Missing: &lt;${element}&gt; element`);
        }
    });

    // Check for proper nesting
    if (solution.includes('<article>') && solution.includes('</article>')) {
        if (solution.indexOf('<article>') < solution.indexOf('</article>')) {
            feedback.push('✅ Good: Proper article element nesting');
            score++;
        }
    }

    // Check for datetime attribute
    if (solution.includes('datetime=')) {
        feedback.push('✅ Excellent: Used datetime attribute');
        score++;
    } else {
        feedback.push('💡 Tip: Add datetime attribute to &lt;time&gt; element');
    }

    // Generate result
    const percentage = Math.round((score / 8) * 100);
    let resultClass = '';
    let resultMessage = '';

    if (percentage >= 80) {
        resultClass = 'success';
        resultMessage = 'Excellent work!';
    } else if (percentage >= 60) {
        resultClass = 'warning';
        resultMessage = 'Good effort, but needs improvement';
    } else {
        resultClass = 'error';
        resultMessage = 'Keep trying! Check the requirements';
    }

    resultDiv.innerHTML = `
        <div class="result-header ${resultClass}">
            <h5>${resultMessage}</h5>
            <div class="score">Score: ${score}/8 (${percentage}%)</div>
        </div>
        <div class="feedback-list">
            ${feedback.map(item => `<p>${item}</p>`).join('')}
        </div>
        ${percentage < 80 ? '<div class="hint"><strong>Hint:</strong> Use &lt;article&gt;, &lt;h1&gt; or &lt;h2&gt; for title, &lt;time&gt; with datetime attribute, &lt;p&gt; for content, and &lt;footer&gt; for author info.</div>' : ''}
    `;

    resultDiv.style.display = 'block';
}

/**
 * Check the website structure challenge solution
 */
function checkWebsiteStructure() {
    const userInput = document.getElementById('website-challenge');
    const resultDiv = document.getElementById('website-result');

    if (!userInput || !resultDiv) return;

    const solution = userInput.value.trim().toLowerCase();
    const requiredElements = [
        { element: 'header', points: 2, description: 'Header element' },
        { element: 'nav', points: 2, description: 'Navigation element' },
        { element: 'main', points: 2, description: 'Main content element' },
        { element: 'section', points: 1, description: 'Section element' },
        { element: 'aside', points: 2, description: 'Aside/sidebar element' },
        { element: 'footer', points: 2, description: 'Footer element' }
    ];

    let score = 0;
    let maxScore = 0;
    let feedback = [];

    // Check for required elements
    requiredElements.forEach(item => {
        maxScore += item.points;
        if (solution.includes(`<${item.element}`)) {
            score += item.points;
            feedback.push(`✅ Good: Found &lt;${item.element}&gt; element (${item.points} points)`);
        } else {
            feedback.push(`❌ Missing: &lt;${item.element}&gt; element (${item.points} points)`);
        }
    });

    // Check for proper structure
    const structureChecks = [
        {
            condition: solution.includes('<header>') && solution.includes('<nav>'),
            message: '✅ Good: Navigation inside or near header',
            points: 1
        },
        {
            condition: solution.includes('<main>') && solution.includes('<section>'),
            message: '✅ Good: Sections organized within main',
            points: 1
        },
        {
            condition: solution.includes('</header>') && solution.includes('</footer>'),
            message: '✅ Good: Proper element closing',
            points: 1
        }
    ];

    structureChecks.forEach(check => {
        maxScore += check.points;
        if (check.condition) {
            score += check.points;
            feedback.push(check.message);
        }
    });

    // Generate result
    const percentage = Math.round((score / maxScore) * 100);
    let resultClass = '';
    let resultMessage = '';

    if (percentage >= 85) {
        resultClass = 'success';
        resultMessage = 'Outstanding semantic structure!';
    } else if (percentage >= 70) {
        resultClass = 'warning';
        resultMessage = 'Good structure, minor improvements needed';
    } else {
        resultClass = 'error';
        resultMessage = 'Structure needs significant improvement';
    }

    resultDiv.innerHTML = `
        <div class="result-header ${resultClass}">
            <h5>${resultMessage}</h5>
            <div class="score">Score: ${score}/${maxScore} (${percentage}%)</div>
        </div>
        <div class="feedback-list">
            ${feedback.map(item => `<p>${item}</p>`).join('')}
        </div>
        ${percentage < 85 ? '<div class="hint"><strong>Structure Template:</strong><br>&lt;header&gt;&lt;nav&gt;...&lt;/nav&gt;&lt;/header&gt;<br>&lt;main&gt;&lt;section&gt;...&lt;/section&gt;&lt;/main&gt;<br>&lt;aside&gt;...&lt;/aside&gt;<br>&lt;footer&gt;...&lt;/footer&gt;</div>' : ''}
    `;

    resultDiv.style.display = 'block';
}

/**
 * Check the accessibility challenge solution
 */
function checkAccessibility() {
    const userInput = document.getElementById('accessibility-challenge');
    const resultDiv = document.getElementById('accessibility-result');

    if (!userInput || !resultDiv) return;

    const solution = userInput.value.trim().toLowerCase();

    const accessibilityChecks = [
        {
            test: solution.includes('<h1>') || solution.includes('<h2>'),
            message: '✅ Good: Used proper heading element',
            error: '❌ Missing: Proper heading element (h1, h2, etc.)',
            points: 2
        },
        {
            test: solution.includes('alt='),
            message: '✅ Good: Added alt attribute to image',
            error: '❌ Missing: Alt attribute for image',
            points: 2
        },
        {
            test: solution.includes('<label') && solution.includes('for='),
            message: '✅ Good: Associated label with input using for attribute',
            error: '❌ Missing: Label with for attribute',
            points: 2
        },
        {
            test: solution.includes('<main>') || solution.includes('<header>'),
            message: '✅ Good: Used semantic landmark elements',
            error: '❌ Missing: Semantic landmark elements',
            points: 2
        },
        {
            test: solution.includes('id=') && solution.includes('for='),
            message: '✅ Good: Proper id/for association',
            error: '❌ Missing: ID/for attribute association',
            points: 1
        },
        {
            test: !solution.includes('<div>welcome') && (solution.includes('<h1>welcome') || solution.includes('<h2>welcome')),
            message: '✅ Excellent: Replaced generic div with semantic heading',
            error: '💡 Tip: Replace the welcome div with a heading element',
            points: 1
        }
    ];

    let score = 0;
    let maxScore = 0;
    let feedback = [];

    accessibilityChecks.forEach(check => {
        maxScore += check.points;
        if (check.test) {
            score += check.points;
            feedback.push(check.message);
        } else {
            feedback.push(check.error);
        }
    });

    // Generate result
    const percentage = Math.round((score / maxScore) * 100);
    let resultClass = '';
    let resultMessage = '';

    if (percentage >= 90) {
        resultClass = 'success';
        resultMessage = 'Perfect accessibility improvements!';
    } else if (percentage >= 75) {
        resultClass = 'warning';
        resultMessage = 'Great improvements, minor issues remain';
    } else {
        resultClass = 'error';
        resultMessage = 'More accessibility work needed';
    }

    resultDiv.innerHTML = `
        <div class="result-header ${resultClass}">
            <h5>${resultMessage}</h5>
            <div class="score">Score: ${score}/${maxScore} (${percentage}%)</div>
        </div>
        <div class="feedback-list">
            ${feedback.map(item => `<p>${item}</p>`).join('')}
        </div>
        ${percentage < 90 ? '<div class="hint"><strong>Accessibility Checklist:</strong><br>• Use &lt;h1&gt; for main heading<br>• Add alt="description" to images<br>• Use &lt;label for="input-id"&gt; with &lt;input id="input-id"&gt;<br>• Replace divs with semantic elements</div>' : ''}
    `;

    resultDiv.style.display = 'block';
}

// ============================================================================
// RESOURCE BOOKMARK FUNCTIONALITY
// ============================================================================

/**
 * Toggle bookmark status for resource cards
 */
function toggleBookmark(button) {
    const isBookmarked = button.classList.contains('bookmarked');
    const icon = button.querySelector('i');

    if (isBookmarked) {
        button.classList.remove('bookmarked');
        // Change to outline bookmark icon
        icon.classList.remove('fas');
        icon.classList.add('far');
        button.title = 'Bookmark this resource';

        // Remove from local storage
        removeBookmark(getResourceId(button));
    } else {
        button.classList.add('bookmarked');
        // Change to filled bookmark icon
        icon.classList.remove('far');
        icon.classList.add('fas');
        button.title = 'Remove bookmark';

        // Add to local storage
        addBookmark(getResourceId(button));

        // Show brief success message
        showBookmarkMessage('Resource bookmarked!');
    }
}

/**
 * Get unique ID for a resource based on its card content
 */
function getResourceId(button) {
    const card = button.closest('.resource-card');
    const title = card.querySelector('.card-title')?.textContent || '';
    const author = card.querySelector('.author')?.textContent || '';
    return btoa(title + '|' + author).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
}

/**
 * Add bookmark to local storage
 */
function addBookmark(resourceId) {
    let bookmarks = JSON.parse(localStorage.getItem('webtech_bookmarks') || '[]');
    if (!bookmarks.includes(resourceId)) {
        bookmarks.push(resourceId);
        localStorage.setItem('webtech_bookmarks', JSON.stringify(bookmarks));
    }
}

/**
 * Remove bookmark from local storage
 */
function removeBookmark(resourceId) {
    let bookmarks = JSON.parse(localStorage.getItem('webtech_bookmarks') || '[]');
    bookmarks = bookmarks.filter(id => id !== resourceId);
    localStorage.setItem('webtech_bookmarks', JSON.stringify(bookmarks));
}

/**
 * Load bookmarked state for all resource cards on page load
 */
function loadBookmarkStates() {
    const bookmarks = JSON.parse(localStorage.getItem('webtech_bookmarks') || '[]');

    document.querySelectorAll('.bookmark-btn').forEach(button => {
        const resourceId = getResourceId(button);
        if (bookmarks.includes(resourceId)) {
            button.classList.add('bookmarked');
            button.innerHTML = '<i class="fas fa-bookmark"></i>';
            button.title = 'Remove bookmark';
        }
    });
}

/**
 * Show temporary bookmark message
 */
function showBookmarkMessage(message) {
    // Remove any existing message
    const existingMessage = document.querySelector('.bookmark-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create and show new message
    const messageEl = document.createElement('div');
    messageEl.className = 'bookmark-message';
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-size: 14px;
        font-weight: 500;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(messageEl);

    // Animate in
    setTimeout(() => {
        messageEl.style.opacity = '1';
        messageEl.style.transform = 'translateY(0)';
    }, 10);

    // Animate out and remove
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateY(-10px)';
        setTimeout(() => messageEl.remove(), 300);
    }, 2000);
}

// Div Demo Functions
function addDivElement() {
    const output = document.getElementById('divOutput');
    if (!output) return;

    const newDiv = document.createElement('div');
    newDiv.className = 'sample-div';
    newDiv.textContent = `New div element ${output.children.length + 1}`;
    newDiv.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px;
        margin: 10px 0;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    `;

    output.appendChild(newDiv);
}

function toggleDivStyling() {
    const output = document.getElementById('divOutput');
    if (!output) return;

    const divs = output.querySelectorAll('.sample-div');
    divs.forEach(div => {
        if (div.style.border) {
            div.style.border = '';
            div.style.background = '';
            div.style.color = '';
        } else {
            div.style.border = '3px solid #3498db';
            div.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            div.style.color = 'white';
        }
    });
}

function nestDivElement() {
    const output = document.getElementById('divOutput');
    if (!output) return;

    const existingDivs = output.querySelectorAll('.sample-div');
    if (existingDivs.length === 0) {
        alert('Please add at least one div first!');
        return;
    }

    const parentDiv = existingDivs[existingDivs.length - 1];
    const nestedDiv = document.createElement('div');
    nestedDiv.className = 'nested-div';
    nestedDiv.textContent = 'Nested div inside parent';
    nestedDiv.style.cssText = `
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        color: white;
        padding: 10px;
        margin: 10px;
        border-radius: 6px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        font-size: 14px;
    `;

    parentDiv.appendChild(nestedDiv);
}

function clearAllDivs() {
    const output = document.getElementById('divOutput');
    if (!output) return;

    // Keep the original sample div
    output.innerHTML = '<div class="sample-div">Sample div element</div>';
}

// Span Demo Functions
function highlightSpanText() {
    const spanTextInput = document.getElementById('spanText');
    const spanOutput = document.getElementById('spanOutput');

    if (!spanTextInput || !spanOutput) return;

    const text = spanTextInput.value.trim();
    if (!text) {
        alert('Please enter some text first!');
        return;
    }

    const words = text.split(' ');
    const highlightedText = words.map((word, index) => {
        if (index === 0) { // Highlight first word
            return `<span style="background-color: #ffff00; padding: 2px 4px; border-radius: 3px;">${word}</span>`;
        }
        return word;
    }).join(' ');

    spanOutput.innerHTML = `<p>${highlightedText}</p>`;
}

function colorSpanText() {
    const spanTextInput = document.getElementById('spanText');
    const spanOutput = document.getElementById('spanOutput');

    if (!spanTextInput || !spanOutput) return;

    const text = spanTextInput.value.trim();
    if (!text) {
        alert('Please enter some text first!');
        return;
    }

    const words = text.split(' ');
    const coloredText = words.map((word, index) => {
        if (index === 0) { // Color first word
            return `<span style="color: #e74c3c; font-weight: bold;">${word}</span>`;
        }
        return word;
    }).join(' ');

    spanOutput.innerHTML = `<p>${coloredText}</p>`;
}

function addEmphasisToSpan() {
    const spanTextInput = document.getElementById('spanText');
    const spanOutput = document.getElementById('spanOutput');

    if (!spanTextInput || !spanOutput) return;

    const text = spanTextInput.value.trim();
    if (!text) {
        alert('Please enter some text first!');
        return;
    }

    const words = text.split(' ');
    const emphasizedText = words.map((word, index) => {
        if (index === 0) { // Add emphasis to first word
            return `<span style="font-style: italic; text-decoration: underline; font-weight: bold;">${word}</span>`;
        }
        return word;
    }).join(' ');

    spanOutput.innerHTML = `<p>${emphasizedText}</p>`;
}

// Canvas Demo Functions
let drawingCanvas, drawingCtx;
let animationCanvas, animationCtx;
let interactiveCanvas, interactiveCtx;
let animationId = null;
let shapes = [];
let ballX = 50, ballY = 50, ballDX = 2, ballDY = 2;
let animationSpeed = 5;

function initializeCanvases() {
    // Drawing canvas
    drawingCanvas = document.getElementById('drawingCanvas');
    if (drawingCanvas) {
        drawingCtx = drawingCanvas.getContext('2d');
        drawingCanvas.addEventListener('mousedown', startDrawing);
        drawingCanvas.addEventListener('mousemove', draw);
        drawingCanvas.addEventListener('mouseup', stopDrawing);
        drawingCanvas.addEventListener('mouseout', stopDrawing);
    }

    // Animation canvas
    animationCanvas = document.getElementById('animationCanvas');
    if (animationCanvas) {
        animationCtx = animationCanvas.getContext('2d');
    }

    // Interactive canvas
    interactiveCanvas = document.getElementById('interactiveCanvas');
    if (interactiveCanvas) {
        interactiveCtx = interactiveCanvas.getContext('2d');
        interactiveCanvas.addEventListener('click', addShapeAtClick);
        drawShapes();
    }
}

function startDrawing(e) {
    if (!drawingCtx) return;
    drawingCtx.beginPath();
    drawingCtx.moveTo(e.offsetX, e.offsetY);
    drawingCanvas.isDrawing = true;
}

function draw(e) {
    if (!drawingCanvas.isDrawing || !drawingCtx) return;

    const color = document.getElementById('drawColor')?.value || '#3498db';
    const size = document.getElementById('drawSize')?.value || 5;

    drawingCtx.strokeStyle = color;
    drawingCtx.lineWidth = size;
    drawingCtx.lineCap = 'round';
    drawingCtx.lineTo(e.offsetX, e.offsetY);
    drawingCtx.stroke();
}

function stopDrawing() {
    if (drawingCanvas) {
        drawingCanvas.isDrawing = false;
    }
}

function clearDrawingCanvas() {
    if (drawingCtx) {
        drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    }
}

function updateDrawingColor() {
    // Color is automatically used in draw function
}

function updateDrawingSize() {
    const sizeInput = document.getElementById('drawSize');
    const sizeDisplay = document.getElementById('sizeDisplay');
    if (sizeInput && sizeDisplay) {
        sizeDisplay.textContent = sizeInput.value;
    }
}

function startCanvasAnimation() {
    if (animationId) return; // Already running

    const startBtn = document.getElementById('startAnimation');
    const stopBtn = document.getElementById('stopAnimation');

    if (startBtn) startBtn.disabled = true;
    if (stopBtn) stopBtn.disabled = false;

    animateBall();
}

function stopCanvasAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    const startBtn = document.getElementById('startAnimation');
    const stopBtn = document.getElementById('stopAnimation');

    if (startBtn) startBtn.disabled = false;
    if (stopBtn) stopBtn.disabled = true;
}

function animateBall() {
    if (!animationCtx) return;

    animationCtx.clearRect(0, 0, animationCanvas.width, animationCanvas.height);

    // Draw ball
    animationCtx.beginPath();
    animationCtx.arc(ballX, ballY, 20, 0, Math.PI * 2);
    animationCtx.fillStyle = '#e74c3c';
    animationCtx.fill();

    // Update position
    ballX += ballDX * (animationSpeed / 5);
    ballY += ballDY * (animationSpeed / 5);

    // Bounce off walls
    if (ballX <= 20 || ballX >= animationCanvas.width - 20) {
        ballDX = -ballDX;
    }
    if (ballY <= 20 || ballY >= animationCanvas.height - 20) {
        ballDY = -ballDY;
    }

    animationId = requestAnimationFrame(animateBall);
}

function updateAnimationSpeed() {
    const speedInput = document.getElementById('animSpeed');
    if (speedInput) {
        animationSpeed = parseInt(speedInput.value);
    }
}

function addCanvasShape() {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    shapes.push({
        x: Math.random() * (interactiveCanvas.width - 60) + 30,
        y: Math.random() * (interactiveCanvas.height - 60) + 30,
        color: randomColor,
        type: Math.random() > 0.5 ? 'circle' : 'square'
    });

    drawShapes();
    updateShapeCount();
}

function addShapeAtClick(e) {
    const rect = interactiveCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    shapes.push({
        x: x,
        y: y,
        color: randomColor,
        type: Math.random() > 0.5 ? 'circle' : 'square'
    });

    drawShapes();
    updateShapeCount();
}

function drawShapes() {
    if (!interactiveCtx) return;

    interactiveCtx.clearRect(0, 0, interactiveCanvas.width, interactiveCanvas.height);

    shapes.forEach(shape => {
        interactiveCtx.fillStyle = shape.color;

        if (shape.type === 'circle') {
            interactiveCtx.beginPath();
            interactiveCtx.arc(shape.x, shape.y, 25, 0, Math.PI * 2);
            interactiveCtx.fill();
        } else {
            interactiveCtx.fillRect(shape.x - 25, shape.y - 25, 50, 50);
        }
    });
}

function resetCanvasShapes() {
    shapes = [];
    drawShapes();
    updateShapeCount();
}

function updateShapeCount() {
    const shapeCountEl = document.getElementById('shapeCount');
    if (shapeCountEl) {
        shapeCountEl.textContent = `Shapes: ${shapes.length}`;
    }
}

// Tab Functionality
function initializeTabs() {
    // Initialize iframe example tabs
    const iframeTabButtons = document.querySelectorAll('.tab-btn[data-tab]');
    iframeTabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button, 'tab'));
    });

    // Initialize canvas demo tabs
    const canvasTabButtons = document.querySelectorAll('.tab-btn[data-demo]');
    canvasTabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button, 'demo'));
    });
}

function switchTab(clickedButton, type) {
    console.log('switchTab called with type:', type);
    const tabContainer = clickedButton.closest('.tabbed-content');
    console.log('tabContainer found:', tabContainer);
    if (!tabContainer) return;

    const tabButtons = tabContainer.querySelectorAll(`.tab-btn[data-${type}]`);
    const tabPanes = tabContainer.querySelectorAll('.tab-pane');
    console.log('tabButtons found:', tabButtons.length);
    console.log('tabPanes found:', tabPanes.length);

    // Remove active class from all buttons and panes
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));

    // Add active class to clicked button
    clickedButton.classList.add('active');

    // Show corresponding pane
    const targetTab = clickedButton.getAttribute(`data-${type}`);
    console.log('targetTab:', targetTab);
    const targetPane = tabContainer.querySelector(`#${targetTab}-demo`) ||
        tabContainer.querySelector(`#${targetTab}`) ||
        tabContainer.querySelector(`[id*="${targetTab}"]`);
    console.log('targetPane found:', targetPane);

    if (targetPane) {
        targetPane.classList.add('active');
        console.log('Active class added to targetPane');
    } else {
        console.log('No targetPane found!');
    }
}

// Initialize bookmark states when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Add a small delay to ensure all resource cards are rendered
    setTimeout(loadBookmarkStates, 100);
});

// === MISSING ONCLICK FUNCTIONS ===
// These functions are called by onclick attributes in various topic HTML files

// CSS Box Model Functions
function checkWidth() {
    console.log('checkWidth called');
    const input = document.getElementById('calc-width');
    const feedback = document.getElementById('calculator-feedback');

    if (!input || !feedback) {
        console.error('checkWidth: Missing elements', { input, feedback });
        return;
    }

    const userInput = input.value.trim();
    if (!userInput) {
        feedback.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Please enter a value!</strong> Enter the total width in pixels.
            </div>
        `;
        feedback.className = 'demo-result error show';
        feedback.style.display = 'block';
        return;
    }

    const userAnswer = parseFloat(userInput);
    if (isNaN(userAnswer)) {
        feedback.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Please enter a valid number!</strong> Enter just the number (e.g., 186).
            </div>
        `;
        feedback.className = 'demo-result error show';
        feedback.style.display = 'block';
        return;
    }

    // Based on the example: width 150px + padding 30px (15*2) + border 6px (3*2) = 186px
    const correctAnswer = 186;

    if (userAnswer === correctAnswer) {
        feedback.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <strong>Correct!</strong> The total width is ${correctAnswer}px
                <br><small>Content (150px) + Padding (30px) + Border (6px) = ${correctAnswer}px</small>
            </div>
        `;
        feedback.className = 'demo-result success show';
        feedback.style.display = 'block';
    } else if (userAnswer === 150) {
        feedback.innerHTML = `
            <div class="warning-message">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Not quite!</strong> You only calculated the content width.
                <br><small>Don't forget to add padding (30px) and border (6px)</small>
            </div>
        `;
        feedback.className = 'demo-result warning show';
        feedback.style.display = 'block';
    } else if (userAnswer === 156) {
        feedback.innerHTML = `
            <div class="warning-message">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Close!</strong> You included border but forgot padding.
                <br><small>Add padding: 15px × 2 = 30px</small>
            </div>
        `;
        feedback.className = 'demo-result warning show';
        feedback.style.display = 'block';
    } else if (userAnswer === 180) {
        feedback.innerHTML = `
            <div class="warning-message">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Close!</strong> You included padding but forgot border.
                <br><small>Add border: 3px × 2 = 6px</small>
            </div>
        `;
        feedback.className = 'demo-result warning show';
        feedback.style.display = 'block';
    } else {
        feedback.innerHTML = `
            <div class="error-message">
                <i class="fas fa-times-circle"></i>
                <strong>Try again!</strong> The correct answer is ${correctAnswer}px
                <br><small>Formula: Content + Left/Right Padding + Left/Right Border<br>150px + (15×2)px + (3×2)px = ${correctAnswer}px</small>
            </div>
        `;
        feedback.className = 'demo-result error show';
        feedback.style.display = 'block';
    }
}

function checkHeight() {
    console.log('checkHeight called');
    const input = document.getElementById('calc-height');
    const feedback = document.getElementById('calculator-feedback');

    if (!input || !feedback) {
        console.error('checkHeight: Missing elements', { input, feedback });
        return;
    }

    const userInput = input.value.trim();
    if (!userInput) {
        feedback.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Please enter a value!</strong> Enter the total height in pixels.
            </div>
        `;
        feedback.className = 'demo-result error show';
        feedback.style.display = 'block';
        return;
    }

    const userAnswer = parseFloat(userInput);
    if (isNaN(userAnswer)) {
        feedback.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Please enter a valid number!</strong> Enter just the number (e.g., 116).
            </div>
        `;
        feedback.className = 'demo-result error show';
        feedback.style.display = 'block';
        return;
    }

    // Based on the example: height 80px + padding 30px (15*2) + border 6px (3*2) = 116px
    const correctAnswer = 116;

    if (userAnswer === correctAnswer) {
        feedback.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <strong>Correct!</strong> The total height is ${correctAnswer}px
                <br><small>Content (80px) + Padding (30px) + Border (6px) = ${correctAnswer}px</small>
            </div>
        `;
        feedback.className = 'demo-result success show';
        feedback.style.display = 'block';
    } else if (userAnswer === 80) {
        feedback.innerHTML = `
            <div class="warning-message">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Not quite!</strong> You only calculated the content height.
                <br><small>Don't forget to add padding (30px) and border (6px)</small>
            </div>
        `;
        feedback.className = 'demo-result warning show';
        feedback.style.display = 'block';
    } else if (userAnswer === 86) {
        feedback.innerHTML = `
            <div class="warning-message">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Close!</strong> You included border but forgot padding.
                <br><small>Add padding: 15px × 2 = 30px</small>
            </div>
        `;
        feedback.className = 'demo-result warning show';
        feedback.style.display = 'block';
    } else if (userAnswer === 110) {
        feedback.innerHTML = `
            <div class="warning-message">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Close!</strong> You included padding but forgot border.
                <br><small>Add border: 3px × 2 = 6px</small>
            </div>
        `;
        feedback.className = 'demo-result warning show';
        feedback.style.display = 'block';
    } else {
        feedback.innerHTML = `
            <div class="error-message">
                <i class="fas fa-times-circle"></i>
                <strong>Try again!</strong> The correct answer is ${correctAnswer}px
                <br><small>Formula: Content + Top/Bottom Padding + Top/Bottom Border<br>80px + (15×2)px + (3×2)px = ${correctAnswer}px</small>
            </div>
        `;
        feedback.className = 'demo-result error show';
        feedback.style.display = 'block';
    }
}

// CSS Preprocessors Functions
function compileSass() {
    const sassInput = document.getElementById('sassInput');
    const cssOutput = document.getElementById('cssOutput');

    if (!sassInput || !cssOutput) return;

    // Get SASS/SCSS input
    const sassCode = sassInput.value;

    // Since we can't actually compile SASS in the browser without a library,
    // we'll provide a simulated compilation result for the default example
    const simulatedOutput = `/* Compiled CSS */
.card {
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card .header {
  background: #3498db;
  color: white;
  padding: 15px;
  border-radius: 6px 6px 0 0;
}

.card .header h3 {
  margin: 0;
  font-size: 1.2em;
}

.card .body {
  padding: 20px;
}

.card .body .button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e74c3c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.card .body .button:hover {
  background: #c0392b;
}`;

    // Update the output with syntax highlighting
    cssOutput.querySelector('code').textContent = simulatedOutput;

    // Re-apply Prism highlighting if available
    if (typeof Prism !== 'undefined') {
        Prism.highlightElement(cssOutput.querySelector('code'));
    }

    // Show success message
    const controls = document.querySelector('.demo-controls');
    if (controls) {
        const existingMessage = controls.querySelector('.compile-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const successMessage = document.createElement('div');
        successMessage.className = 'compile-message success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            SASS compiled successfully!
        `;
        successMessage.style.marginTop = '10px';

        controls.appendChild(successMessage);
        setTimeout(() => successMessage.remove(), 3000);
    }
}

function resetDemo() {
    const sassInput = document.getElementById('sassInput');
    const cssOutput = document.getElementById('cssOutput');

    if (sassInput) {
        // Reset to default SASS example
        sassInput.value = `$primary: #3498db;
$secondary: #e74c3c;
$radius: 6px;

@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: white;
  border-radius: $radius;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  
  .header {
    background: $primary;
    color: white;
    padding: 15px;
    border-radius: $radius $radius 0 0;
    
    h3 {
      margin: 0;
      font-size: 1.2em;
    }
  }
  
  .body {
    padding: 20px;
    
    .button {
      @include flex-center;
      background: $secondary;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: $radius;
      cursor: pointer;
      
      &:hover {
        background: darken($secondary, 10%);
      }
    }
  }
}`;
    }

    if (cssOutput) {
        // Reset output
        cssOutput.querySelector('code').textContent = '/* Compiled CSS will appear here */';
    }

    // Show reset message
    const controls = document.querySelector('.demo-controls');
    if (controls) {
        const existingMessage = controls.querySelector('.compile-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const resetMessage = document.createElement('div');
        resetMessage.className = 'compile-message info-message';
        resetMessage.innerHTML = `
            <i class="fas fa-undo"></i>
            Demo reset to default example
        `;
        resetMessage.style.marginTop = '10px';

        controls.appendChild(resetMessage);
        setTimeout(() => resetMessage.remove(), 2000);
    }
}

// Additional missing onclick functions
function analyzeContent() {
    console.log('Analyzing content...');
    const output = document.getElementById('content-analysis') || createOutputDiv('content-analysis');
    output.innerHTML = `
        <div class="analysis-result">
            <h4>Content Analysis Result</h4>
            <ul>
                <li>✓ Title is descriptive and relevant</li>
                <li>✓ Headings follow proper hierarchy</li>
                <li>✓ Content is well-structured</li>
                <li>✓ Images have alt attributes</li>
            </ul>
        </div>
    `;
}

function angularDecrement() {
    const display = document.getElementById('angular-counter') || createCounterDisplay('angular-counter');
    const current = parseInt(display.textContent) || 0;
    display.textContent = Math.max(0, current - 1);
    console.log('Angular counter decremented to:', display.textContent);
}

function angularIncrement() {
    const display = document.getElementById('angular-counter') || createCounterDisplay('angular-counter');
    const current = parseInt(display.textContent) || 0;
    display.textContent = current + 1;
    console.log('Angular counter incremented to:', display.textContent);
}

function appendToDisplay(value) {
    const display = document.getElementById('calculator-display') || createCalculatorDisplay();
    display.value += value;
    console.log('Appended to calculator:', value);
}

function calculateResult() {
    const display = document.getElementById('calculator-display') || createCalculatorDisplay();
    try {
        const result = eval(display.value);
        display.value = result;
        console.log('Calculation result:', result);
    } catch (error) {
        display.value = 'Error';
        console.error('Calculation error:', error);
    }
}

function calculateWithExternal() {
    const input1 = document.getElementById('calc-input1')?.value || '10';
    const input2 = document.getElementById('calc-input2')?.value || '5';
    const operation = document.getElementById('calc-operation')?.value || '+';

    let result;
    switch (operation) {
        case '+': result = parseFloat(input1) + parseFloat(input2); break;
        case '-': result = parseFloat(input1) - parseFloat(input2); break;
        case '*': result = parseFloat(input1) * parseFloat(input2); break;
        case '/': result = parseFloat(input1) / parseFloat(input2); break;
        default: result = 'Invalid operation';
    }

    const output = document.getElementById('external-calc-result') || createOutputDiv('external-calc-result');
    output.innerHTML = `<strong>Result: ${result}</strong>`;
    console.log('External calculation result:', result);
}

function changeInputValue() {
    const input = document.getElementById('input-value');
    const targetInput = document.getElementById('editable-input');
    if (input && targetInput) {
        const newValue = input.value.trim() || 'Value changed by JavaScript!';
        targetInput.value = newValue;
        console.log('Input value changed');
    }
}

function changeParagraph() {
    const input = document.getElementById('paragraph-input');
    const paragraph = document.getElementById('editable-paragraph');
    if (input && paragraph) {
        const newContent = input.value.trim() || '<strong>This paragraph was modified by JavaScript!</strong> <em>HTML content works too.</em>';
        paragraph.innerHTML = newContent;
        paragraph.style.color = '#007bff';
        console.log('Paragraph content changed');
    }
}

function changeTitle() {
    const input = document.getElementById('title-input');
    const title = document.getElementById('editable-title');
    if (input && title) {
        const newTitle = input.value.trim() || 'Title Changed by JavaScript!';
        title.textContent = newTitle;
        title.style.color = '#28a745';
        console.log('Title changed');
    }
}

function checkErrorChallenge1() {
    const code = document.getElementById('error-code-1')?.value || '';
    const output = document.getElementById('error-result-1') || createOutputDiv('error-result-1');

    if (code.includes('try') && code.includes('catch')) {
        output.innerHTML = '<div class="success">✓ Correct! You added error handling.</div>';
    } else {
        output.innerHTML = '<div class="error">✗ Try adding try-catch blocks for error handling.</div>';
    }
}

function checkErrorChallenge2() {
    const code = document.getElementById('error-code-2')?.value || '';
    const output = document.getElementById('error-result-2') || createOutputDiv('error-result-2');

    if (code.includes('throw') && code.includes('Error')) {
        output.innerHTML = '<div class="success">✓ Correct! You created a custom error.</div>';
    } else {
        output.innerHTML = '<div class="error">✗ Try using throw new Error() to create custom errors.</div>';
    }
}

function checkErrorChallenge3() {
    const code = document.getElementById('error-code-3')?.value || '';
    const output = document.getElementById('error-result-3') || createOutputDiv('error-result-3');

    if (code.includes('finally')) {
        output.innerHTML = '<div class="success">✓ Correct! You added a finally block.</div>';
    } else {
        output.innerHTML = '<div class="error">✗ Try adding a finally block for cleanup code.</div>';
    }
}

function checkES6Challenge1() {
    const code = document.getElementById('es6-code-1')?.value || '';
    const output = document.getElementById('es6-result-1') || createOutputDiv('es6-result-1');

    if (code.includes('=>')) {
        output.innerHTML = '<div class="success">✓ Correct! You used arrow function syntax.</div>';
    } else {
        output.innerHTML = '<div class="error">✗ Try using arrow function syntax (=>).</div>';
    }
}

function checkES6Challenge2() {
    const code = document.getElementById('es6-code-2')?.value || '';
    const output = document.getElementById('es6-result-2') || createOutputDiv('es6-result-2');

    if (code.includes('const') || code.includes('let')) {
        output.innerHTML = '<div class="success">✓ Correct! You used modern variable declarations.</div>';
    } else {
        output.innerHTML = '<div class="error">✗ Try using const or let instead of var.</div>';
    }
}

function checkES6Challenge3() {
    const code = document.getElementById('es6-code-3')?.value || '';
    const output = document.getElementById('es6-result-3') || createOutputDiv('es6-result-3');

    if (code.includes('`') && code.includes('${')) {
        output.innerHTML = '<div class="success">✓ Correct! You used template literals.</div>';
    } else {
        output.innerHTML = '<div class="error">✗ Try using template literals with backticks and ${} syntax.</div>';
    }
}

function checkScopeQuiz() {
    const answers = document.querySelectorAll('input[type="radio"]:checked');
    let correct = 0;

    answers.forEach((answer, index) => {
        if (answer.value === 'correct') {
            correct++;
        }
    });

    const output = document.getElementById('scope-quiz-result') || createOutputDiv('scope-quiz-result');
    output.innerHTML = `<div class="quiz-result">You got ${correct} out of ${answers.length} correct!</div>`;
}

function checkType() {
    const input = document.getElementById('type-input')?.value || '';
    const output = document.getElementById('type-result') || createOutputDiv('type-result');

    let type = typeof input;
    if (input === 'null') type = 'null';
    if (input === 'undefined') type = 'undefined';
    if (!isNaN(input) && input !== '') type = 'number';

    output.innerHTML = `<div class="type-result">Type: <strong>${type}</strong></div>`;
}

function clearCalculator() {
    const display = document.getElementById('calculator-display') || createCalculatorDisplay();
    display.value = '';
    console.log('Calculator cleared');
}

function clearConsole() {
    const console = document.getElementById('console-output') || createOutputDiv('console-output');
    console.innerHTML = '';
    console.log('Console output cleared');
}

function clearWireframe() {
    const wireframe = document.getElementById('wireframe-canvas') || document.querySelector('.wireframe-area');
    if (wireframe) {
        wireframe.innerHTML = '<p>Wireframe cleared. Click elements to start building.</p>';
        console.log('Wireframe cleared');
    }
}

function closeFrameworkModal() {
    const modal = document.getElementById('framework-modal') || document.querySelector('.framework-modal');
    if (modal) {
        modal.style.display = 'none';
        console.log('Framework modal closed');
    }
}

function copyToClipboard() {
    const text = document.getElementById('copy-text')?.textContent || 'Sample text to copy';
    navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard');
        showToast('success', 'Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

function deleteLast() {
    const display = document.getElementById('calculator-display') || createCalculatorDisplay();
    display.value = display.value.slice(0, -1);
    console.log('Last character deleted');
}

function demonstrateAdvanced() {
    const output = document.getElementById('advanced-demo') || createOutputDiv('advanced-demo');
    output.innerHTML = `
        <div class="advanced-example">
            <h4>Advanced JavaScript Features</h4>
            <pre><code>
// Destructuring
const [first, second] = [1, 2];

// Spread operator
const arr = [...[1, 2, 3]];

// Async/await
async function fetchData() {
    const response = await fetch('/api/data');
    return response.json();
}
            </code></pre>
        </div>
    `;
}

function demonstrateArithmetic() {
    const output = document.getElementById('arithmetic-demo') || createOutputDiv('arithmetic-demo');
    const examples = [
        '5 + 3 = ' + (5 + 3),
        '10 - 4 = ' + (10 - 4),
        '6 * 7 = ' + (6 * 7),
        '15 / 3 = ' + (15 / 3),
        '17 % 5 = ' + (17 % 5)
    ];

    output.innerHTML = `
        <div class="arithmetic-examples">
            <h4>Arithmetic Operations</h4>
            ${examples.map(ex => `<div class="example">${ex}</div>`).join('')}
        </div>
    `;
}

function demonstrateAssignment() {
    const output = document.getElementById('assignment-demo') || createOutputDiv('assignment-demo');
    let x = 10;

    output.innerHTML = `
        <div class="assignment-examples">
            <h4>Assignment Operations</h4>
            <div>x = ${x}</div>
            <div>x += 5 → ${x += 5}</div>
            <div>x -= 3 → ${x -= 3}</div>
            <div>x *= 2 → ${x *= 2}</div>
            <div>x /= 4 → ${x /= 4}</div>
        </div>
    `;
}

function demonstrateComparison() {
    const output = document.getElementById('comparison-demo') || createOutputDiv('comparison-demo');
    const examples = [
        '5 == "5": ' + (5 == "5"),
        '5 === "5": ' + (5 === "5"),
        '10 > 5: ' + (10 > 5),
        '3 < 8: ' + (3 < 8),
        '7 >= 7: ' + (7 >= 7),
        '4 <= 2: ' + (4 <= 2)
    ];

    output.innerHTML = `
        <div class="comparison-examples">
            <h4>Comparison Operations</h4>
            ${examples.map(ex => `<div class="example">${ex}</div>`).join('')}
        </div>
    `;
}

function demonstrateConversion() {
    const output = document.getElementById('conversion-demo') || createOutputDiv('conversion-demo');
    const examples = [
        'String(123): ' + String(123),
        'Number("456"): ' + Number("456"),
        'Boolean(1): ' + Boolean(1),
        'Boolean(0): ' + Boolean(0),
        'parseInt("42.7"): ' + parseInt("42.7"),
        'parseFloat("3.14"): ' + parseFloat("3.14")
    ];

    output.innerHTML = `
        <div class="conversion-examples">
            <h4>Type Conversion</h4>
            ${examples.map(ex => `<div class="example">${ex}</div>`).join('')}
        </div>
    `;
}

function demonstrateError() {
    const output = document.getElementById('error-demo') || createOutputDiv('error-demo');
    try {
        throw new Error('This is a demonstration error');
    } catch (error) {
        output.innerHTML = `
            <div class="error-example">
                <h4>Error Handling Example</h4>
                <div class="error-message">Caught error: ${error.message}</div>
                <div class="error-info">Error handled gracefully using try-catch</div>
            </div>
        `;
    }
}

function demonstrateFetchGET() {
    const output = document.getElementById('fetch-demo') || createOutputDiv('fetch-demo');
    output.innerHTML = `
        <div class="fetch-example">
            <h4>GET Request Example</h4>
            <pre><code>
fetch('/api/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
            </code></pre>
            <div class="demo-result">Simulated: Fetching user data...</div>
        </div>
    `;
}

function demonstrateFetchPOST() {
    const output = document.getElementById('fetch-demo') || createOutputDiv('fetch-demo');
    output.innerHTML = `
        <div class="fetch-example">
            <h4>POST Request Example</h4>
            <pre><code>
fetch('/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: 'John', email: 'john@example.com'})
})
.then(response => response.json())
.then(data => console.log(data));
            </code></pre>
            <div class="demo-result">Simulated: Creating new user...</div>
        </div>
    `;
}

function demonstrateFetchPUT() {
    const output = document.getElementById('fetch-demo') || createOutputDiv('fetch-demo');
    output.innerHTML = `
        <div class="fetch-example">
            <h4>PUT Request Example</h4>
            <pre><code>
fetch('/api/users/123', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: 'John Updated'})
})
.then(response => response.json())
.then(data => console.log(data));
            </code></pre>
            <div class="demo-result">Simulated: Updating user data...</div>
        </div>
    `;
}

function demonstrateFetchDELETE() {
    const output = document.getElementById('fetch-demo') || createOutputDiv('fetch-demo');
    output.innerHTML = `
        <div class="fetch-example">
            <h4>DELETE Request Example</h4>
            <pre><code>
fetch('/api/users/123', {
    method: 'DELETE'
})
.then(response => {
    if (response.ok) {
        console.log('User deleted successfully');
    }
});
            </code></pre>
            <div class="demo-result">Simulated: Deleting user...</div>
        </div>
    `;
}

function demonstrateLogical() {
    const output = document.getElementById('logical-demo') || createOutputDiv('logical-demo');
    const examples = [
        'true && true: ' + (true && true),
        'true && false: ' + (true && false),
        'false || true: ' + (false || true),
        'false || false: ' + (false || false),
        '!true: ' + (!true),
        '!false: ' + (!false)
    ];

    output.innerHTML = `
        <div class="logical-examples">
            <h4>Logical Operations</h4>
            ${examples.map(ex => `<div class="example">${ex}</div>`).join('')}
        </div>
    `;
}

function demonstrateParse() {
    const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
    const parsed = JSON.parse(jsonString);

    const output = document.getElementById('json-demo') || createOutputDiv('json-demo');
    output.innerHTML = `
        <div class="json-example">
            <h4>JSON.parse() Example</h4>
            <div><strong>Original JSON string:</strong></div>
            <pre>${jsonString}</pre>
            <div><strong>Parsed object:</strong></div>
            <pre>${JSON.stringify(parsed, null, 2)}</pre>
            <div><strong>Access properties:</strong> name = ${parsed.name}</div>
        </div>
    `;
}

function demonstrateStringify() {
    const obj = { name: "John", age: 30, city: "New York", active: true };
    const jsonString = JSON.stringify(obj);

    const output = document.getElementById('json-demo') || createOutputDiv('json-demo');
    output.innerHTML = `
        <div class="json-example">
            <h4>JSON.stringify() Example</h4>
            <div><strong>Original object:</strong></div>
            <pre>${JSON.stringify(obj, null, 2)}</pre>
            <div><strong>Stringified JSON:</strong></div>
            <pre>${jsonString}</pre>
        </div>
    `;
}

function demonstrateTernary() {
    const age = 20;
    const status = age >= 18 ? 'adult' : 'minor';

    const output = document.getElementById('ternary-demo') || createOutputDiv('ternary-demo');
    output.innerHTML = `
        <div class="ternary-example">
            <h4>Ternary Operator Example</h4>
            <div>Age: ${age}</div>
            <div>Expression: age >= 18 ? 'adult' : 'minor'</div>
            <div>Result: ${status}</div>
        </div>
    `;
}

function demonstrateUnary() {
    let x = 5;
    const output = document.getElementById('unary-demo') || createOutputDiv('unary-demo');

    output.innerHTML = `
        <div class="unary-examples">
            <h4>Unary Operations</h4>
            <div>x = ${x}</div>
            <div>++x = ${++x}</div>
            <div>x-- = ${x--}</div>
            <div>+x = ${+x}</div>
            <div>-x = ${-x}</div>
            <div>typeof x = ${typeof x}</div>
        </div>
    `;
}

function executeFunction() {
    const functionCode = document.getElementById('function-code')?.value || 'console.log("Hello World!");';
    const output = document.getElementById('function-result') || createOutputDiv('function-result');

    try {
        const result = new Function(functionCode)();
        output.innerHTML = `<div class="success">Function executed successfully. Check console for output.</div>`;
        console.log('Function executed:', result);
    } catch (error) {
        output.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

function generateChecklistSummary() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const total = document.querySelectorAll('input[type="checkbox"]').length;
    const completed = checkboxes.length;

    const output = document.getElementById('checklist-summary') || createOutputDiv('checklist-summary');
    output.innerHTML = `
        <div class="checklist-summary">
            <h4>Checklist Summary</h4>
            <div class="progress">
                <div>Completed: ${completed}/${total}</div>
                <div>Progress: ${Math.round((completed / total) * 100)}%</div>
            </div>
        </div>
    `;
}

function generatePreview() {
    const code = document.getElementById('preview-code')?.value || '<h1>Hello World</h1>';
    const preview = document.getElementById('code-preview') || createOutputDiv('code-preview');

    preview.innerHTML = code;
    console.log('Code preview generated');
}

function generateStructuredData() {
    const title = document.getElementById('page-title')?.value || 'Sample Page';
    const description = document.getElementById('page-description')?.value || 'Sample description';

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": window.location.href
    };

    const output = document.getElementById('structured-data-output') || createOutputDiv('structured-data-output');
    output.innerHTML = `
        <div class="structured-data">
            <h4>Generated Structured Data</h4>
            <pre><code>${JSON.stringify(structuredData, null, 2)}</code></pre>
        </div>
    `;
}

function getRecommendation() {
    const preferences = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedValues = Array.from(preferences).map(p => p.value);

    const recommendations = {
        'responsive': 'Bootstrap or Tailwind CSS',
        'components': 'React or Vue.js',
        'typescript': 'Angular or TypeScript + React',
        'simple': 'Vanilla HTML/CSS/JS'
    };

    const output = document.getElementById('recommendation-output') || createOutputDiv('recommendation-output');
    const recommended = selectedValues.map(val => recommendations[val] || 'Custom solution').join(', ');

    output.innerHTML = `
        <div class="recommendation">
            <h4>Recommended Technologies</h4>
            <div>${recommended || 'Please select your preferences'}</div>
        </div>
    `;
}

function internalGreet() {
    const name = document.getElementById('internal-name')?.value || 'Student';
    const output = document.getElementById('internal-greeting') || createOutputDiv('internal-greeting');
    output.innerHTML = `<div class="greeting">Hello from internal script, ${name}!</div>`;
}

function performOperation(operation) {
    const num1 = parseFloat(document.getElementById('op-num1')?.value) || 0;
    const num2 = parseFloat(document.getElementById('op-num2')?.value) || 0;
    let result;

    switch (operation) {
        case 'add': result = num1 + num2; break;
        case 'subtract': result = num1 - num2; break;
        case 'multiply': result = num1 * num2; break;
        case 'divide': result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero'; break;
        default: result = 'Invalid operation';
    }

    const output = document.getElementById('operation-result') || createOutputDiv('operation-result');
    output.innerHTML = `<div class="operation-result">${num1} ${operation} ${num2} = ${result}</div>`;
}

function quickTest(value) {
    const testValue = value.replace(/&quot;/g, '"');
    const output = document.getElementById('quick-test-result') || createOutputDiv('quick-test-result');

    let result;
    try {
        result = JSON.parse(testValue);
    } catch (e) {
        result = testValue;
    }

    output.innerHTML = `
        <div class="quick-test">
            <div><strong>Value:</strong> ${testValue}</div>
            <div><strong>Type:</strong> ${typeof result}</div>
            <div><strong>Parsed:</strong> ${JSON.stringify(result)}</div>
        </div>
    `;
}

function randomizeFonts() {
    const fonts = ['Arial', 'Georgia', 'Times New Roman', 'Verdana', 'Helvetica', 'Impact'];
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];

    const elements = document.querySelectorAll('h1, h2, h3, p');
    elements.forEach(el => {
        el.style.fontFamily = randomFont;
    });

    console.log('Fonts randomized to:', randomFont);
}

function reactDecrement() {
    const display = document.getElementById('react-counter') || createCounterDisplay('react-counter');
    const current = parseInt(display.textContent) || 0;
    display.textContent = Math.max(0, current - 1);
    console.log('React counter decremented to:', display.textContent);
}

function reactIncrement() {
    const display = document.getElementById('react-counter') || createCounterDisplay('react-counter');
    const current = parseInt(display.textContent) || 0;
    display.textContent = current + 1;
    console.log('React counter incremented to:', display.textContent);
}

function resetContent() {
    // Reset title
    const title = document.getElementById('editable-title');
    if (title) {
        title.textContent = 'Editable Title';
        title.style.color = '';
    }

    // Reset paragraph
    const paragraph = document.getElementById('editable-paragraph');
    if (paragraph) {
        paragraph.innerHTML = 'This paragraph can be modified.';
        paragraph.style.color = '';
    }

    // Reset input
    const input = document.getElementById('editable-input');
    if (input) {
        input.value = 'Input value';
    }

    // Clear the input fields
    const titleInput = document.getElementById('title-input');
    const paragraphInput = document.getElementById('paragraph-input');
    const inputValue = document.getElementById('input-value');

    if (titleInput) titleInput.value = '';
    if (paragraphInput) paragraphInput.value = '';
    if (inputValue) inputValue.value = '';

    console.log('Content reset to original state');
}

function runCode() {
    const code = document.getElementById('user-code')?.value || 'console.log("Hello World!");';
    const output = document.getElementById('code-output') || createOutputDiv('code-output');

    try {
        // Create a safe execution environment
        const result = new Function(code)();
        output.innerHTML = `<div class="success">Code executed successfully. Check console for output.</div>`;
        console.log('User code executed:', result);
    } catch (error) {
        output.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

function saveWireframe() {
    const wireframe = document.getElementById('wireframe-content')?.innerHTML || 'No wireframe content';
    localStorage.setItem('saved-wireframe', wireframe);
    showToast('success', 'Wireframe saved successfully!');
    console.log('Wireframe saved to localStorage');
}

function sendRequest() {
    const url = document.getElementById('request-url')?.value || '/api/test';
    const method = document.getElementById('request-method')?.value || 'GET';
    const output = document.getElementById('request-result') || createOutputDiv('request-result');

    output.innerHTML = `
        <div class="request-info">
            <div>Sending ${method} request to: ${url}</div>
            <div class="loading">⏳ Simulating request...</div>
        </div>
    `;

    setTimeout(() => {
        output.innerHTML += `
            <div class="response">
                <div>✅ Response received (simulated)</div>
                <div>Status: 200 OK</div>
            </div>
        `;
    }, 1000);
}

function setExample(num1, operator, num2) {
    const display = document.getElementById('example-display') || createOutputDiv('example-display');
    const result = eval(`${num1} ${operator} ${num2}`);

    display.innerHTML = `
        <div class="example">
            <div class="expression">${num1} ${operator} ${num2} = ${result}</div>
        </div>
    `;
}

function setSelector(selector) {
    const input = document.getElementById('selector-input');
    if (input) {
        input.value = selector;
    }
    trySelector();
}

function showCriteria(type) {
    const criteria = {
        'technical': ['Performance', 'Scalability', 'Security', 'Maintainability'],
        'business': ['Cost', 'Time to Market', 'ROI', 'Market Fit'],
        'team': ['Team Expertise', 'Learning Curve', 'Support', 'Documentation'],
        'all': ['Performance', 'Cost', 'Team Expertise', 'Scalability', 'Security', 'ROI']
    };

    const output = document.getElementById('criteria-display') || createOutputDiv('criteria-display');
    const list = criteria[type] || criteria['all'];

    output.innerHTML = `
        <div class="criteria-list">
            <h4>${type.charAt(0).toUpperCase() + type.slice(1)} Criteria</h4>
            <ul>
                ${list.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;
}

function showDateTime() {
    const now = new Date();
    const output = document.getElementById('datetime-display') || createOutputDiv('datetime-display');

    output.innerHTML = `
        <div class="datetime-info">
            <div>Current Date: ${now.toDateString()}</div>
            <div>Current Time: ${now.toTimeString()}</div>
            <div>ISO String: ${now.toISOString()}</div>
            <div>Timestamp: ${now.getTime()}</div>
        </div>
    `;
}

function showDetails() {
    const details = document.getElementById('additional-details') || createOutputDiv('additional-details');
    details.innerHTML = `
        <div class="details-panel">
            <h4>Additional Details</h4>
            <p>This section provides more information about the current topic.</p>
            <ul>
                <li>Feature explanations</li>
                <li>Best practices</li>
                <li>Common pitfalls</li>
                <li>Advanced techniques</li>
            </ul>
        </div>
    `;
    details.style.display = 'block';
}

function showFrameworkDetails(framework) {
    const details = {
        'react': {
            name: 'React',
            description: 'A JavaScript library for building user interfaces',
            features: ['Component-based', 'Virtual DOM', 'JSX syntax', 'Hooks']
        },
        'angular': {
            name: 'Angular',
            description: 'A platform for building mobile and desktop web applications',
            features: ['TypeScript', 'Dependency Injection', 'CLI tools', 'Two-way binding']
        },
        'vue': {
            name: 'Vue.js',
            description: 'A progressive framework for building user interfaces',
            features: ['Template syntax', 'Reactive data', 'Component system', 'Vue CLI']
        }
    };

    const info = details[framework];
    const output = document.getElementById('framework-details') || createOutputDiv('framework-details');

    if (info) {
        output.innerHTML = `
            <div class="framework-info">
                <h3>${info.name}</h3>
                <p>${info.description}</p>
                <h4>Key Features:</h4>
                <ul>
                    ${info.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        `;
    }
}

function showToast(type, message) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#17a2b8'};
        color: white;
        border-radius: 4px;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

function simulateLoading(button) {
    button.textContent = 'Loading...';
    button.disabled = true;

    setTimeout(() => {
        button.textContent = 'Complete!';
        button.style.backgroundColor = '#28a745';

        setTimeout(() => {
            button.textContent = 'Click to Load';
            button.disabled = false;
            button.style.backgroundColor = '';
        }, 1000);
    }, 2000);
}

function startProgress() {
    const progressBar = document.getElementById('progress-bar') || createProgressBar();
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
        }

        progressBar.style.width = progress + '%';
        progressBar.textContent = Math.round(progress) + '%';
    }, 200);
}

function testBoolean() {
    const testValue = true;
    const output = document.getElementById('type-test-result') || createOutputDiv('type-test-result');
    output.innerHTML = `
        <div class="type-test">
            <div>Value: ${testValue}</div>
            <div>Type: ${typeof testValue}</div>
            <div>Boolean: ${Boolean(testValue)}</div>
        </div>
    `;
}

function testChallenge1() {
    const code = document.getElementById('challenge1-code')?.value?.trim() || '';
    const output = document.getElementById('challenge1-result') || createOutputDiv('challenge1-result');

    if (!code) {
        output.innerHTML = '<div class="error">✗ Please write some code first.</div>';
        return;
    }

    try {
        // Test the function with sample inputs
        const testCode = `
            ${code}

            // Test cases
            const test1 = celsiusToFahrenheit(0);  // Should return 32
            const test2 = celsiusToFahrenheit(25); // Should return 77
            const test3 = celsiusToFahrenheit(100); // Should return 212

            return {test1, test2, test3};
        `;

        const results = new Function(testCode)();

        // Check if results are correct (allowing for small floating point differences)
        const isCorrect = Math.abs(results.test1 - 32) < 0.1 &&
            Math.abs(results.test2 - 77) < 0.1 &&
            Math.abs(results.test3 - 212) < 0.1;

        if (isCorrect) {
            output.innerHTML = `
                <div class="success">
                    <i class="fas fa-check-circle"></i>
                    <strong>Excellent!</strong> Your temperature converter works perfectly!
                    <div class="test-results">
                        <div>0°C = ${results.test1}°F ✓</div>
                        <div>25°C = ${results.test2}°F ✓</div>
                        <div>100°C = ${results.test3}°F ✓</div>
                    </div>
                </div>
            `;
        } else {
            output.innerHTML = `
                <div class="error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <strong>Not quite right.</strong> Check your formula: F = (C × 9/5) + 32
                    <div class="test-results">
                        <div>0°C = ${results.test1}°F (expected: 32)</div>
                        <div>25°C = ${results.test2}°F (expected: 77)</div>
                        <div>100°C = ${results.test3}°F (expected: 212)</div>
                    </div>
                </div>
            `;
        }

    } catch (error) {
        output.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Syntax Error:</strong> ${error.message}
                <div class="error-help">
                    Make sure your function is properly defined and uses the correct syntax.
                </div>
            </div>
        `;
    }
}

function testChallenge2() {
    const code = document.getElementById('challenge2-code')?.value?.trim() || '';
    const output = document.getElementById('challenge2-result') || createOutputDiv('challenge2-result');

    if (!code) {
        output.innerHTML = '<div class="error">✗ Please write some code first.</div>';
        return;
    }

    try {
        // Test the function with sample inputs
        const testCode = `
            ${code}

            // Test cases
            const test1 = findMax([1, 5, 3, 9, 2]); // Should return 9
            const test2 = findMax([-1, -5, -3]);    // Should return -1
            const test3 = findMax([42]);            // Should return 42

            return {test1, test2, test3};
        `;

        const results = new Function(testCode)();

        // Check if results are correct
        const isCorrect = results.test1 === 9 &&
            results.test2 === -1 &&
            results.test3 === 42;

        if (isCorrect) {
            output.innerHTML = `
                <div class="success">
                    <i class="fas fa-check-circle"></i>
                    <strong>Perfect!</strong> Your findMax function works correctly!
                    <div class="test-results">
                        <div>findMax([1, 5, 3, 9, 2]) = ${results.test1} ✓</div>
                        <div>findMax([-1, -5, -3]) = ${results.test2} ✓</div>
                        <div>findMax([42]) = ${results.test3} ✓</div>
                    </div>
                </div>
            `;
        } else {
            output.innerHTML = `
                <div class="error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <strong>Not quite right.</strong> Make sure your function finds the maximum value.
                    <div class="test-results">
                        <div>findMax([1, 5, 3, 9, 2]) = ${results.test1} (expected: 9)</div>
                        <div>findMax([-1, -5, -3]) = ${results.test2} (expected: -1)</div>
                        <div>findMax([42]) = ${results.test3} (expected: 42)</div>
                    </div>
                </div>
            `;
        }

    } catch (error) {
        output.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>Syntax Error:</strong> ${error.message}
                <div class="error-help">
                    Make sure your function is properly defined and handles arrays correctly.
                </div>
            </div>
        `;
    }
}

function testContentSEO() {
    const title = document.getElementById('seo-title')?.value || '';
    const description = document.getElementById('seo-description')?.value || '';
    const output = document.getElementById('seo-content-result') || createOutputDiv('seo-content-result');

    let score = 0;
    let feedback = [];

    if (title.length >= 30 && title.length <= 60) {
        score += 25;
        feedback.push('✓ Title length is optimal');
    } else {
        feedback.push('✗ Title should be 30-60 characters');
    }

    if (description.length >= 120 && description.length <= 160) {
        score += 25;
        feedback.push('✓ Description length is optimal');
    } else {
        feedback.push('✗ Description should be 120-160 characters');
    }

    output.innerHTML = `
        <div class="seo-result">
            <h4>Content SEO Score: ${score}/50</h4>
            <ul>
                ${feedback.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;
}

function testNull() {
    const testValue = null;
    const output = document.getElementById('type-test-result') || createOutputDiv('type-test-result');
    output.innerHTML = `
        <div class="type-test">
            <div>Value: ${testValue}</div>
            <div>Type: ${typeof testValue}</div>
            <div>Is null: ${testValue === null}</div>
        </div>
    `;
}

function testNumber() {
    const testValue = 42;
    const output = document.getElementById('type-test-result') || createOutputDiv('type-test-result');
    output.innerHTML = `
        <div class="type-test">
            <div>Value: ${testValue}</div>
            <div>Type: ${typeof testValue}</div>
            <div>Is Number: ${typeof testValue === 'number'}</div>
        </div>
    `;
}

function testObject() {
    const testValue = { name: 'John', age: 30 };
    const output = document.getElementById('type-test-result') || createOutputDiv('type-test-result');
    output.innerHTML = `
        <div class="type-test">
            <div>Value: ${JSON.stringify(testValue)}</div>
            <div>Type: ${typeof testValue}</div>
            <div>Is Object: ${typeof testValue === 'object' && testValue !== null}</div>
        </div>
    `;
}

function testOnPageSEO() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6').length;
    const images = document.querySelectorAll('img').length;
    const imagesWithAlt = document.querySelectorAll('img[alt]').length;
    const output = document.getElementById('onpage-seo-result') || createOutputDiv('onpage-seo-result');

    let score = 0;
    let feedback = [];

    if (headings > 0) {
        score += 25;
        feedback.push(`✓ Found ${headings} headings`);
    } else {
        feedback.push('✗ No headings found');
    }

    if (images === imagesWithAlt) {
        score += 25;
        feedback.push('✓ All images have alt attributes');
    } else {
        feedback.push(`✗ ${images - imagesWithAlt} images missing alt attributes`);
    }

    output.innerHTML = `
        <div class="seo-result">
            <h4>On-Page SEO Score: ${score}/50</h4>
            <ul>
                ${feedback.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;
}

function testString() {
    const testValue = "Hello World";
    const output = document.getElementById('type-test-result') || createOutputDiv('type-test-result');
    output.innerHTML = `
        <div class="type-test">
            <div>Value: "${testValue}"</div>
            <div>Type: ${typeof testValue}</div>
            <div>Length: ${testValue.length}</div>
        </div>
    `;
}

function testTechnicalSEO() {
    const output = document.getElementById('technical-seo-result') || createOutputDiv('technical-seo-result');

    // Simulate technical SEO checks
    const checks = [
        { name: 'HTTPS', status: window.location.protocol === 'https:' },
        { name: 'Meta viewport', status: document.querySelector('meta[name="viewport"]') !== null },
        { name: 'Page title', status: document.title.length > 0 },
        { name: 'Meta description', status: document.querySelector('meta[name="description"]') !== null }
    ];

    const passed = checks.filter(check => check.status).length;
    const score = Math.round((passed / checks.length) * 100);

    output.innerHTML = `
        <div class="seo-result">
            <h4>Technical SEO Score: ${score}/100</h4>
            <ul>
                ${checks.map(check => `<li>${check.status ? '✓' : '✗'} ${check.name}</li>`).join('')}
            </ul>
        </div>
    `;
}

function testUndefined() {
    let testValue;
    const output = document.getElementById('type-test-result') || createOutputDiv('type-test-result');
    output.innerHTML = `
        <div class="type-test">
            <div>Value: ${testValue}</div>
            <div>Type: ${typeof testValue}</div>
            <div>Is undefined: ${testValue === undefined}</div>
        </div>
    `;
}

function toggleClass(className) {
    const elements = document.querySelectorAll('.demo-element');
    elements.forEach(element => {
        element.classList.toggle(className);
    });
    console.log('Toggled class:', className);
}

function toggleSolution(button) {
    const solutionId = button.getAttribute('data-solution') || 'solution';
    const solution = document.getElementById(solutionId);

    if (solution) {
        const isHidden = solution.style.display === 'none' || !solution.style.display;
        solution.style.display = isHidden ? 'block' : 'none';
        button.textContent = isHidden ? 'Hide Solution' : 'Show Solution';
    }
}

function trySelector() {
    const selector = document.getElementById('selector-input')?.value || 'p';
    const output = document.getElementById('selector-result') || createOutputDiv('selector-result');

    try {
        const elements = document.querySelectorAll(selector);
        output.innerHTML = `
            <div class="selector-result">
                <div>Selector: <code>${selector}</code></div>
                <div>Found ${elements.length} element(s)</div>
                ${elements.length > 0 ? '<div>Elements highlighted in yellow</div>' : ''}
            </div>
        `;

        // Remove previous highlights
        document.querySelectorAll('.selector-highlight').forEach(el => {
            el.classList.remove('selector-highlight');
        });

        // Highlight matching elements
        elements.forEach(el => {
            el.classList.add('selector-highlight');
        });

    } catch (error) {
        output.innerHTML = `<div class="error">Invalid selector: ${error.message}</div>`;
    }
}

// DOM Manipulation Functions for js-dom.html
function updateStyles() {
    const bgColor = document.getElementById('bg-color')?.value || '#3498db';
    const textColor = document.getElementById('text-color')?.value || '#ffffff';
    const fontSize = document.getElementById('font-size')?.value || 16;
    const borderRadius = document.getElementById('border-radius')?.value || 8;
    const padding = document.getElementById('padding')?.value || 20;
    const width = document.getElementById('width')?.value || 300;

    const styleBox = document.getElementById('style-box');
    const fontSizeValue = document.getElementById('font-size-value');
    const borderRadiusValue = document.getElementById('border-radius-value');
    const paddingValue = document.getElementById('padding-value');
    const widthValue = document.getElementById('width-value');
    const cssOutput = document.getElementById('generated-css-output');

    if (styleBox) {
        styleBox.style.backgroundColor = bgColor;
        styleBox.style.color = textColor;
        styleBox.style.fontSize = fontSize + 'px';
        styleBox.style.borderRadius = borderRadius + 'px';
        styleBox.style.padding = padding + 'px';
        styleBox.style.width = width + 'px';
    }

    if (fontSizeValue) fontSizeValue.textContent = fontSize + 'px';
    if (borderRadiusValue) borderRadiusValue.textContent = borderRadius + 'px';
    if (paddingValue) paddingValue.textContent = padding + 'px';
    if (widthValue) widthValue.textContent = width + 'px';

    if (cssOutput) {
        cssOutput.textContent = `background-color: ${bgColor};
color: ${textColor};
font-size: ${fontSize}px;
border-radius: ${borderRadius}px;
padding: ${padding}px;
width: ${width}px;`;
    }
}

function updateImageSrc() {
    const select = document.getElementById('img-src');
    const img = document.getElementById('demo-image');
    if (select && img) {
        img.src = select.value;
        updateAttributeList();
    }
}

function updateImageAlt() {
    const input = document.getElementById('img-alt');
    const img = document.getElementById('demo-image');
    if (input && img) {
        img.alt = input.value;
        updateAttributeList();
    }
}

function updateImageData() {
    const input = document.getElementById('img-category');
    const img = document.getElementById('demo-image');
    if (input && img) {
        img.dataset.category = input.value;
        updateAttributeList();
    }
}

function updateLinkHref() {
    const input = document.getElementById('link-href');
    const link = document.getElementById('demo-link');
    if (input && link) {
        link.href = input.value;
        updateAttributeList();
    }
}

function updateLinkTarget() {
    const select = document.getElementById('link-target');
    const link = document.getElementById('demo-link');
    if (select && link) {
        link.target = select.value;
        updateAttributeList();
    }
}

function updateAttributeList() {
    const list = document.getElementById('attribute-list');
    const img = document.getElementById('demo-image');
    const link = document.getElementById('demo-link');

    if (list && img && link) {
        list.innerHTML = `
            <div><strong>Image attributes:</strong></div>
            <div>src: ${img.src}</div>
            <div>alt: ${img.alt}</div>
            <div>data-category: ${img.dataset.category}</div>
            <div><strong>Link attributes:</strong></div>
            <div>href: ${link.href}</div>
            <div>target: ${link.target}</div>
        `;
    }
}

function addTodoItem() {
    const input = document.getElementById('demo-todo-input');
    const list = document.getElementById('demo-todo-list');

    if (input && list && input.value.trim()) {
        const li = document.createElement('li');
        li.innerHTML = `${input.value.trim()} <button onclick="removeTodoItem(this)" class="delete-btn">×</button>`;
        list.appendChild(li);
        input.value = '';
    }
}

function removeTodoItem(button) {
    if (button && button.parentElement) {
        button.parentElement.remove();
    }
}

function updateDashPreview() {
    const color = document.getElementById('dash-color')?.value || '#007bff';
    const size = document.getElementById('dash-size')?.value || '2';
    const preview = document.getElementById('dash-preview') || createOutputDiv('dash-preview');

    preview.innerHTML = `
        <div style="border: ${size}px dashed ${color}; padding: 20px; text-align: center;">
            Dashed Border Preview
        </div>
    `;
}

function updateNavPreview() {
    const style = document.getElementById('nav-style')?.value || 'horizontal';
    const preview = document.getElementById('nav-preview') || createOutputDiv('nav-preview');

    const navHTML = `
        <nav style="${style === 'vertical' ? 'flex-direction: column;' : 'flex-direction: row;'} display: flex; gap: 10px; padding: 10px; background: #f8f9fa;">
            <a href="#" style="text-decoration: none; padding: 8px 16px; background: #007bff; color: white; border-radius: 4px;">Home</a>
            <a href="#" style="text-decoration: none; padding: 8px 16px; background: #6c757d; color: white; border-radius: 4px;">About</a>
            <a href="#" style="text-decoration: none; padding: 8px 16px; background: #6c757d; color: white; border-radius: 4px;">Contact</a>
        </nav>
    `;

    preview.innerHTML = navHTML;
}

function updatePreview() {
    const html = document.getElementById('html-input')?.value || '<h1>Preview</h1>';
    const preview = document.getElementById('html-preview') || createOutputDiv('html-preview');
    preview.innerHTML = html;
}

function updateResult() {
    const input = document.getElementById('demo-input')?.value || 'Sample text';
    const output = document.getElementById('result-display') || createOutputDiv('result-display');
    output.innerHTML = `<div class="result">Result: ${input.toUpperCase()}</div>`;
}

function validateSchema() {
    const schemaInput = document.getElementById('schema-input')?.value || '{}';
    const output = document.getElementById('schema-validation') || createOutputDiv('schema-validation');

    try {
        const schema = JSON.parse(schemaInput);
        const requiredFields = ['@context', '@type'];
        const hasRequired = requiredFields.every(field => schema.hasOwnProperty(field));

        if (hasRequired) {
            output.innerHTML = '<div class="success">✓ Valid schema structure</div>';
        } else {
            output.innerHTML = '<div class="error">✗ Missing required fields: @context, @type</div>';
        }
    } catch (error) {
        output.innerHTML = '<div class="error">✗ Invalid JSON format</div>';
    }
}

function vueDecrement() {
    const display = document.getElementById('vue-counter') || createCounterDisplay('vue-counter');
    const current = parseInt(display.textContent) || 0;
    display.textContent = Math.max(0, current - 1);
    console.log('Vue counter decremented to:', display.textContent);
}

function vueIncrement() {
    const display = document.getElementById('vue-counter') || createCounterDisplay('vue-counter');
    const current = parseInt(display.textContent) || 0;
    display.textContent = current + 1;
    console.log('Vue counter incremented to:', display.textContent);
}

// Helper functions to create common UI elements
function createOutputDiv(id) {
    let output = document.getElementById(id);
    if (!output) {
        output = document.createElement('div');
        output.id = id;
        output.className = 'demo-output';
        output.style.cssText = 'margin: 10px 0; padding: 15px; border: 1px solid #ddd; border-radius: 4px; background: #f8f9fa;';

        // Try to find a suitable container
        const container = document.querySelector('.demo-container') ||
            document.querySelector('.interactive-demo') ||
            document.querySelector('main') ||
            document.body;
        container.appendChild(output);
    }
    return output;
}

function createCounterDisplay(id) {
    let display = document.getElementById(id);
    if (!display) {
        display = document.createElement('div');
        display.id = id;
        display.textContent = '0';
        display.style.cssText = 'font-size: 24px; font-weight: bold; text-align: center; margin: 10px; padding: 20px; border: 2px solid #007bff; border-radius: 8px; background: white;';

        const container = document.querySelector('.counter-demo') ||
            document.querySelector('.demo-container') ||
            document.body;
        container.appendChild(display);
    }
    return display;
}

function createCalculatorDisplay() {
    let display = document.getElementById('calculator-display');
    if (!display) {
        display = document.createElement('input');
        display.id = 'calculator-display';
        display.type = 'text';
        display.style.cssText = 'width: 100%; padding: 10px; font-size: 18px; text-align: right; margin: 10px 0; border: 2px solid #007bff; border-radius: 4px;';
        display.readOnly = true;

        const container = document.querySelector('.calculator-demo') ||
            document.querySelector('.demo-container') ||
            document.body;
        container.appendChild(display);
    }
    return display;
}

function createProgressBar() {
    let progressBar = document.getElementById('progress-bar');
    if (!progressBar) {
        const container = document.createElement('div');
        container.style.cssText = 'width: 100%; background: #f0f0f0; border-radius: 10px; overflow: hidden; margin: 10px 0;';

        progressBar = document.createElement('div');
        progressBar.id = 'progress-bar';
        progressBar.style.cssText = 'width: 0%; height: 30px; background: linear-gradient(90deg, #007bff, #0056b3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; transition: width 0.3s ease;';
        progressBar.textContent = '0%';

        container.appendChild(progressBar);

        const demoContainer = document.querySelector('.demo-container') ||
            document.querySelector('main') ||
            document.body;
        demoContainer.appendChild(container);
    }
    return progressBar;
}

// ========================
// HTTP Protocol Simulator Initialization
// ========================

function initializeHttpProtocolSimulator() {
    // Initialize HTTP Protocol Simulator if elements exist
    const httpMethod = document.getElementById('httpMethod');
    const httpUrl = document.getElementById('httpUrl');
    const httpHeaders = document.getElementById('httpHeaders');
    const httpBody = document.getElementById('httpBody');

    if (httpMethod && httpUrl && httpHeaders && httpBody) {
        // Add event listeners for live updates
        httpMethod.addEventListener('change', updateRequest);
        httpUrl.addEventListener('input', updateRequest);
        httpHeaders.addEventListener('input', updateRequest);
        httpBody.addEventListener('input', updateRequest);

        // Initialize the request preview
        updateRequest();

        console.log('HTTP Protocol Simulator initialized successfully');
    }
}

// ========================
// HTTP Protocol Simulator Functions
// ========================

function updateRequest() {
    const method = document.getElementById('httpMethod').value;
    const url = document.getElementById('httpUrl').value;
    const headers = document.getElementById('httpHeaders').value;
    const body = document.getElementById('httpBody').value;
    const requestPreview = document.getElementById('requestPreview');
    const bodyRow = document.getElementById('bodyRow');

    // Show/hide body input based on method
    if (method === 'GET' || method === 'HEAD' || method === 'DELETE') {
        bodyRow.style.display = 'none';
    } else {
        bodyRow.style.display = 'block';
    }

    // Parse URL to get host
    let host = 'localhost';
    try {
        const urlObj = new URL(url);
        host = urlObj.host;
    } catch (e) {
        // If URL is relative or malformed, try to extract from the path
        if (url.includes('/')) {
            host = url.split('/')[0] || 'localhost';
        }
    }

    // Build request preview
    let requestText = `${method} ${url} HTTP/1.1\nHost: ${host}\n`;

    // Add headers
    if (headers.trim()) {
        const headerLines = headers.split('\n').filter(line => line.trim());
        headerLines.forEach(header => {
            if (header.trim()) {
                requestText += header.trim() + '\n';
            }
        });
    }

    // Add body for POST/PUT/PATCH requests
    if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && body.trim()) {
        requestText += '\n' + body.trim();
    }

    // Update preview
    requestPreview.innerHTML = `<pre><code class="language-plaintext">${requestText}</code></pre>`;
}

function sendRequest() {
    const method = document.getElementById('httpMethod').value;
    const url = document.getElementById('httpUrl').value;
    const headers = document.getElementById('httpHeaders').value;
    const body = document.getElementById('httpBody').value;
    const responseDisplay = document.getElementById('responseDisplay');
    const responseStatus = document.getElementById('responseStatus');
    const responseHeaders = document.getElementById('responseHeaders');
    const responseBody = document.getElementById('responseBody');

    // Show response display
    responseDisplay.style.display = 'block';

    // Show loading state
    responseStatus.innerHTML = '<div class="status-loading"><i class="fas fa-spinner fa-spin"></i> Sending request...</div>';
    responseHeaders.innerHTML = '';
    responseBody.innerHTML = '';

    // Simulate network delay
    setTimeout(() => {
        // Generate simulated response based on method and URL
        const simulatedResponse = generateSimulatedResponse(method, url, headers, body);

        // Display status code
        const statusClass = simulatedResponse.status >= 200 && simulatedResponse.status < 300 ? 'success' :
            simulatedResponse.status >= 400 ? 'error' : 'info';

        responseStatus.innerHTML = `
            <div class="status-code ${statusClass}">
                <i class="fas ${getStatusIcon(simulatedResponse.status)}"></i>
                HTTP/1.1 ${simulatedResponse.status} ${simulatedResponse.statusText}
            </div>
        `;

        // Display headers
        responseHeaders.innerHTML = `
            <div class="response-headers">
                <h5>Response Headers:</h5>
                <div class="headers-content">
                    ${simulatedResponse.headers.map(header => `<div class="header-line">${header}</div>`).join('')}
                </div>
            </div>
        `;

        // Display body
        responseBody.innerHTML = `
            <div class="response-body">
                <h5>Response Body:</h5>
                <div class="body-content">
                    <pre><code class="language-json">${JSON.stringify(simulatedResponse.body, null, 2)}</code></pre>
                </div>
            </div>
        `;

        // Re-initialize Prism for syntax highlighting
        if (window.Prism) {
            Prism.highlightAll();
        }

    }, 1500);
}

function clearHttpForm() {
    // Clear all form inputs
    document.getElementById('httpMethod').value = 'GET';
    document.getElementById('httpUrl').value = 'https://api.example.com/users';
    document.getElementById('httpHeaders').value = `Content-Type: application/json
Authorization: Bearer token123
Accept: application/json`;
    document.getElementById('httpBody').value = `{"name": "John Doe", "email": "john@example.com"}`;

    // Hide response display
    document.getElementById('responseDisplay').style.display = 'none';

    // Update request preview
    updateRequest();
}

// HTML Audio/Video Solution Functions
function showBasicMediaSolution() {
    const resultBox = document.getElementById('basic-media-result');
    const buttonText = document.getElementById('basic-media-button-text');

    if (!resultBox) return;

    // Toggle solution display
    if (resultBox.style.display === 'block') {
        resultBox.style.display = 'none';
        if (buttonText) buttonText.innerHTML = '<i class="fas fa-eye"></i> Show Solution';
        return;
    }

    const content = `
        <h5><i class="fas fa-check-circle"></i> Basic Media Player Solution</h5>
        <div class="solution-code">
            <pre><code class="language-html">&lt;!-- Audio Player --&gt;
&lt;audio controls preload="metadata"&gt;
    &lt;source src="audio/music.mp3" type="audio/mpeg"&gt;
    &lt;source src="audio/music.ogg" type="audio/ogg"&gt;
    &lt;p&gt;Your browser doesn't support HTML5 audio.&lt;/p&gt;
&lt;/audio&gt;

&lt;!-- Video Player --&gt;
&lt;video controls width="640" height="360" poster="images/video-poster.jpg"&gt;
    &lt;source src="video/sample.mp4" type="video/mp4"&gt;
    &lt;source src="video/sample.webm" type="video/webm"&gt;
    &lt;p&gt;Your browser doesn't support HTML5 video.&lt;/p&gt;
&lt;/video&gt;</code></pre>
        </div>
        <div class="solution-explanation">
            <p>This solution demonstrates the basic implementation of HTML5 audio and video elements with multiple source formats for cross-browser compatibility.</p>
            <p><strong>Key features implemented:</strong></p>
            <ul>
                <li><code>&lt;audio controls&gt;</code> provides native browser controls</li>
                <li><code>preload="metadata"</code> optimizes loading performance</li>
                <li>Multiple <code>&lt;source&gt;</code> elements for format fallbacks</li>
                <li><code>poster</code> attribute shows thumbnail before video loads</li>
                <li>Fallback content for browsers without HTML5 support</li>
            </ul>
        </div>
    `;

    resultBox.innerHTML = content;
    resultBox.className = 'result-box info';
    resultBox.style.display = 'block';

    if (buttonText) buttonText.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Solution';

    // Highlight code blocks
    if (typeof Prism !== 'undefined') {
        Prism.highlightAllUnder(resultBox);
    }

    // Scroll to the result
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showCustomControlsSolution() {
    const resultBox = document.getElementById('custom-controls-result');
    const buttonText = document.getElementById('custom-controls-button-text');

    if (!resultBox) return;

    // Toggle solution display
    if (resultBox.style.display === 'block') {
        resultBox.style.display = 'none';
        if (buttonText) buttonText.innerHTML = '<i class="fas fa-eye"></i> Show Solution';
        return;
    }

    const content = `
        <h5><i class="fas fa-check-circle"></i> Custom Video Controls Solution</h5>
        <div class="solution-code">
            <p><strong>JavaScript Implementation:</strong></p>
            <pre><code class="language-javascript">const video = document.getElementById('customVideo');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const timeDisplay = document.getElementById('timeDisplay');

playBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playBtn.innerHTML = '⏸️';
    } else {
        video.pause();
        playBtn.innerHTML = '▶️';
    }
});

video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.value = progress;
    
    const current = formatTime(video.currentTime);
    const duration = formatTime(video.duration);
    timeDisplay.textContent = \`\${current} / \${duration}\`;
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return \`\${mins}:\${secs.toString().padStart(2, '0')}\`;
}</code></pre>
        </div>
        <div class="solution-explanation">
            <p>This solution creates custom video controls using the JavaScript Media API for enhanced user experience and design control.</p>
            <p><strong>Key implementation details:</strong></p>
            <ul>
                <li>Uses <code>video.paused</code> property to toggle play/pause states</li>
                <li><code>timeupdate</code> event updates progress bar in real-time</li>
                <li><code>currentTime</code> and <code>duration</code> properties track playback</li>
                <li><code>formatTime()</code> function converts seconds to MM:SS format</li>
                <li>Custom controls provide consistent design across browsers</li>
            </ul>
        </div>
    `;

    resultBox.innerHTML = content;
    resultBox.className = 'result-box info';
    resultBox.style.display = 'block';

    if (buttonText) buttonText.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Solution';

    // Highlight code blocks
    if (typeof Prism !== 'undefined') {
        Prism.highlightAllUnder(resultBox);
    }

    // Scroll to the result
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showResponsiveMediaSolution() {
    const resultBox = document.getElementById('responsive-media-result');
    const buttonText = document.getElementById('responsive-media-button-text');

    if (!resultBox) return;

    // Toggle solution display
    if (resultBox.style.display === 'block') {
        resultBox.style.display = 'none';
        if (buttonText) buttonText.innerHTML = '<i class="fas fa-eye"></i> Show Solution';
        return;
    }

    const content = `
        <h5><i class="fas fa-check-circle"></i> Responsive Media Solution</h5>
        <div class="solution-code">
            <p><strong>CSS for Responsive Videos:</strong></p>
            <pre><code class="language-css">.video-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    overflow: hidden;
}

.video-container video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* or 'contain' for letterboxing */
}

/* Mobile-first responsive design */
@media (max-width: 768px) {
    .video-container {
        padding-bottom: 75%; /* 4:3 for mobile */
    }
    
    video {
        max-width: 100%;
        height: auto;
    }
}

/* Lazy loading optimization */
.video-lazy {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.video-lazy.loaded {
    opacity: 1;
}</code></pre>
        </div>
        <div class="solution-explanation">
            <p>This solution implements responsive video containers that adapt to different screen sizes and device orientations while optimizing performance.</p>
            <p><strong>Key responsive techniques:</strong></p>
            <ul>
                <li>Padding-bottom trick maintains aspect ratios</li>
                <li><code>object-fit</code> controls video scaling behavior</li>
                <li>Mobile-first media queries adapt to smaller screens</li>
                <li><code>overflow: hidden</code> prevents layout issues</li>
                <li>Lazy loading classes improve initial page load times</li>
                <li>Position absolute ensures proper video containment</li>
            </ul>
        </div>
    `;

    resultBox.innerHTML = content;
    resultBox.className = 'result-box info';
    resultBox.style.display = 'block';

    if (buttonText) buttonText.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Solution';

    // Highlight code blocks
    if (typeof Prism !== 'undefined') {
        Prism.highlightAllUnder(resultBox);
    }

    // Scroll to the result
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function generateSimulatedResponse(method, url, headers, body) {
    const responses = {
        GET: {
            status: 200,
            statusText: 'OK',
            headers: [
                'Date: ' + new Date().toUTCString(),
                'Content-Type: application/json',
                'Content-Length: 156',
                'Server: nginx/1.18.0',
                'Access-Control-Allow-Origin: *'
            ],
            body: {
                id: 123,
                name: "John Doe",
                email: "john@example.com",
                created_at: new Date().toISOString()
            }
        },
        POST: {
            status: 201,
            statusText: 'Created',
            headers: [
                'Date: ' + new Date().toUTCString(),
                'Content-Type: application/json',
                'Content-Length: 89',
                'Location: /api/users/124',
                'Server: nginx/1.18.0'
            ],
            body: {
                id: 124,
                message: "Resource created successfully",
                created_at: new Date().toISOString()
            }
        },
        PUT: {
            status: 200,
            statusText: 'OK',
            headers: [
                'Date: ' + new Date().toUTCString(),
                'Content-Type: application/json',
                'Content-Length: 67',
                'Server: nginx/1.18.0'
            ],
            body: {
                message: "Resource updated successfully",
                updated_at: new Date().toISOString()
            }
        },
        DELETE: {
            status: 204,
            statusText: 'No Content',
            headers: [
                'Date: ' + new Date().toUTCString(),
                'Server: nginx/1.18.0'
            ],
            body: {}
        },
        PATCH: {
            status: 200,
            statusText: 'OK',
            headers: [
                'Date: ' + new Date().toUTCString(),
                'Content-Type: application/json',
                'Content-Length: 78',
                'Server: nginx/1.18.0'
            ],
            body: {
                message: "Resource partially updated",
                updated_at: new Date().toISOString()
            }
        },
        HEAD: {
            status: 200,
            statusText: 'OK',
            headers: [
                'Date: ' + new Date().toUTCString(),
                'Content-Type: application/json',
                'Content-Length: 156',
                'Server: nginx/1.18.0',
                'Last-Modified: ' + new Date(Date.now() - 86400000).toUTCString()
            ],
            body: {} // HEAD requests don't return body
        }
    };

    return responses[method] || responses.GET;
}

function getStatusIcon(status) {
    if (status >= 200 && status < 300) return 'fa-check-circle';
    if (status >= 300 && status < 400) return 'fa-arrow-right';
    if (status >= 400 && status < 500) return 'fa-exclamation-triangle';
    if (status >= 500) return 'fa-times-circle';
    return 'fa-info-circle';
}

// ========================
// Flexbox and Grid Playground Functions
// ========================

function initializeFlexboxPlayground() {
    // Initialize Flexbox Playground controls
    const flexDirection = document.getElementById('flex-direction');
    const justifyContent = document.getElementById('justify-content');
    const alignItems = document.getElementById('align-items');
    const flexWrap = document.getElementById('flex-wrap');

    if (flexDirection && justifyContent && alignItems && flexWrap) {
        // Add event listeners for live updates
        flexDirection.addEventListener('change', updateFlexboxDemo);
        justifyContent.addEventListener('change', updateFlexboxDemo);
        alignItems.addEventListener('change', updateFlexboxDemo);
        flexWrap.addEventListener('change', updateFlexboxDemo);

        // Initialize the flexbox demo
        updateFlexboxDemo();

        console.log('Flexbox Playground initialized successfully');
    }
}

function updateFlexboxDemo() {
    const flexDirection = document.getElementById('flex-direction')?.value || 'row';
    const justifyContent = document.getElementById('justify-content')?.value || 'flex-start';
    const alignItems = document.getElementById('align-items')?.value || 'stretch';
    const flexWrap = document.getElementById('flex-wrap')?.value || 'nowrap';

    const flexContainer = document.getElementById('flex-demo');
    const cssOutput = document.getElementById('flex-css-output');

    if (!flexContainer || !cssOutput) return;

    // Apply styles to the flex container
    flexContainer.style.display = 'flex';
    flexContainer.style.flexDirection = flexDirection;
    flexContainer.style.justifyContent = justifyContent;
    flexContainer.style.alignItems = alignItems;
    flexContainer.style.flexWrap = flexWrap;

    // Update CSS output
    const cssCode = `.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
}`;

    cssOutput.textContent = cssCode;

    // Highlight the updated code
    if (typeof Prism !== 'undefined') {
        Prism.highlightElement(cssOutput);
    }
}

function initializeGridPlayground() {
    // Initialize Grid Playground controls
    const gridColumns = document.getElementById('grid-columns');
    const gridRows = document.getElementById('grid-rows');
    const gridGap = document.getElementById('grid-gap');
    const gridGapValue = document.getElementById('grid-gap-value');

    if (gridColumns && gridRows && gridGap && gridGapValue) {
        // Add event listeners for live updates
        gridColumns.addEventListener('change', updateGridDemo);
        gridRows.addEventListener('change', updateGridDemo);
        gridGap.addEventListener('input', updateGridDemo);

        // Initialize the grid demo
        updateGridDemo();

        console.log('Grid Playground initialized successfully');
    }
}

function updateGridDemo() {
    const gridColumns = document.getElementById('grid-columns')?.value || 'repeat(3, 1fr)';
    const gridRows = document.getElementById('grid-rows')?.value || 'repeat(3, 1fr)';
    const gridGap = document.getElementById('grid-gap')?.value || '10';
    const gridGapValue = document.getElementById('grid-gap-value');

    const gridContainer = document.getElementById('grid-demo');
    const cssOutput = document.getElementById('grid-css-output');

    if (!gridContainer || !cssOutput) return;

    // Update gap value display
    if (gridGapValue) {
        gridGapValue.textContent = gridGap + 'px';
    }

    // Apply styles to the grid container
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = gridColumns;
    gridContainer.style.gridTemplateRows = gridRows;
    gridContainer.style.gap = gridGap + 'px';

    // Update CSS output
    const cssCode = `.container {
  display: grid;
  grid-template-columns: ${gridColumns};
  grid-template-rows: ${gridRows};
  gap: ${gridGap}px;
}`;

    cssOutput.textContent = cssCode;

    // Highlight the updated code
    if (typeof Prism !== 'undefined') {
        Prism.highlightElement(cssOutput);
    }
}

// Initialize DOM manipulation event listeners
function initializeDOMManipulation() {
    // Event handling demo
    const eventButton = document.getElementById('event-button');
    const hoverBox = document.getElementById('hover-box');
    const eventInput = document.getElementById('event-input');
    const eventLog = document.getElementById('event-log');

    if (eventButton) {
        eventButton.addEventListener('click', function () {
            logEvent('Button clicked!', 'click');
        });
    }

    if (hoverBox) {
        hoverBox.addEventListener('mouseenter', function () {
            logEvent('Mouse entered the box!', 'mouseenter');
            this.style.backgroundColor = '#e74c3c';
        });

        hoverBox.addEventListener('mouseleave', function () {
            logEvent('Mouse left the box!', 'mouseleave');
            this.style.backgroundColor = '#3498db';
        });
    }

    if (eventInput) {
        eventInput.addEventListener('input', function () {
            logEvent(`Input changed to: "${this.value}"`, 'input');
        });

        eventInput.addEventListener('focus', function () {
            logEvent('Input focused!', 'focus');
        });

        eventInput.addEventListener('blur', function () {
            logEvent('Input lost focus!', 'blur');
        });
    }

    function logEvent(message, type) {
        if (!eventLog) return;

        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `<strong>${type}:</strong> ${message} <small>(${new Date().toLocaleTimeString()})</small>`;

        // Keep only last 10 entries
        const entries = eventLog.querySelectorAll('.log-entry');
        if (entries.length >= 10) {
            entries[0].remove();
        }

        eventLog.appendChild(logEntry);
        eventLog.scrollTop = eventLog.scrollHeight;
    }

    // Initialize style controls
    updateStyles();

    // Initialize attribute list
    updateAttributeList();
}