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
    const userCode = document.getElementById('recipe-challenge').value.trim();
    const title = 'Recipe List Solution';
    const content = `
        <div class="solution-title">Correct HTML Structure:</div>
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

    showModal(title, content);
}

function checkNav() {
    const userCode = document.getElementById('nav-challenge').value.trim();
    const title = 'Navigation Menu Solution';
    const content = `
        <div class="solution-title">Correct HTML Structure:</div>
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

    showModal(title, content);
}

function checkAlbum() {
    const userCode = document.getElementById('album-challenge').value.trim();
    const title = 'Photo Album Solution';
    const content = `
        <div class="solution-title">Correct HTML Structure:</div>
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

    showModal(title, content);
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