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

    if (isBookmarked) {
        button.classList.remove('bookmarked');
        button.innerHTML = '<i class="fas fa-bookmark"></i>';
        button.title = 'Bookmark this resource';

        // Remove from local storage
        removeBookmark(getResourceId(button));
    } else {
        button.classList.add('bookmarked');
        button.innerHTML = '<i class="fas fa-bookmark"></i>';
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

// Initialize bookmark states when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Add a small delay to ensure all resource cards are rendered
    setTimeout(loadBookmarkStates, 100);
});