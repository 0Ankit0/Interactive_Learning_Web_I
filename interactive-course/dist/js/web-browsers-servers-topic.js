// Web Browsers and Servers Topic JavaScript
document.addEventListener('DOMContentLoaded', function () {
    initializeBrowserServerTopic();
});

function initializeBrowserServerTopic() {
    initializeBrowserArchitecture();
    initializeBrowsersGrid();
    initializeServerComparison();
    setupCommunicationDemo();
    setupQuiz();
}

// Browser Architecture Interactive Elements
function initializeBrowserArchitecture() {
    const components = document.querySelectorAll('.browser-component');

    components.forEach(component => {
        component.addEventListener('mouseenter', function () {
            const componentType = this.dataset.component;
            showComponentDetails(componentType);
        });

        component.addEventListener('mouseleave', function () {
            hideComponentDetails();
        });
    });
}

function showComponentDetails(componentType) {
    const details = {
        ui: 'The User Interface includes everything users interact with: address bar, bookmarks, back/forward buttons, and the browser chrome.',
        engine: 'The Rendering Engine parses HTML and CSS to create the DOM and CSSOM, then renders the visual representation of the web page.',
        js: 'The JavaScript Engine (like V8 in Chrome) compiles and executes JavaScript code, enabling dynamic web interactions.',
        network: 'The Networking layer handles all network communication, including HTTP requests, DNS lookups, and managing connections.'
    };

    // Create or update tooltip
    let tooltip = document.getElementById('component-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'component-tooltip';
        tooltip.className = 'component-tooltip';
        document.body.appendChild(tooltip);
    }

    tooltip.textContent = details[componentType];
    tooltip.style.display = 'block';

    // Position tooltip near cursor
    document.addEventListener('mousemove', positionTooltip);
}

function positionTooltip(e) {
    const tooltip = document.getElementById('component-tooltip');
    if (tooltip) {
        tooltip.style.left = (e.pageX + 10) + 'px';
        tooltip.style.top = (e.pageY + 10) + 'px';
    }
}

function hideComponentDetails() {
    const tooltip = document.getElementById('component-tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
    document.removeEventListener('mousemove', positionTooltip);
}

// Browser Cards Interactive Effects
function initializeBrowsersGrid() {
    const browserCards = document.querySelectorAll('.browser-card');

    browserCards.forEach(card => {
        card.addEventListener('click', function () {
            const browserName = this.querySelector('h3').textContent;
            showBrowserInfo(browserName);
        });
    });
}

function showBrowserInfo(browserName) {
    const browserInfo = {
        'Google Chrome': {
            developer: 'Google',
            firstRelease: '2008',
            engine: 'Blink (V8 for JavaScript)',
            features: ['Developer Tools', 'Extensions', 'Sync', 'Security'],
            description: 'Chrome is known for its speed, security, and developer-friendly tools. It introduced many web standards and has excellent performance.'
        },
        'Safari': {
            developer: 'Apple',
            firstRelease: '2003',
            engine: 'WebKit',
            features: ['Privacy Focus', 'Energy Efficient', 'Handoff', 'Reader Mode'],
            description: 'Safari is optimized for Apple devices and focuses on privacy and energy efficiency, especially on mobile devices.'
        },
        'Microsoft Edge': {
            developer: 'Microsoft',
            firstRelease: '2015',
            engine: 'Blink (since 2020)',
            features: ['Collections', 'Tracking Prevention', 'Immersive Reader', 'Shopping Assistant'],
            description: 'The modern Edge browser replaced Internet Explorer and now uses the same engine as Chrome while adding unique Microsoft integrations.'
        },
        'Mozilla Firefox': {
            developer: 'Mozilla Foundation',
            firstRelease: '2002',
            engine: 'Gecko',
            features: ['Privacy Controls', 'Open Source', 'Customization', 'Developer Tools'],
            description: 'Firefox is an open-source browser with a strong focus on privacy, customization, and user control over their browsing experience.'
        }
    };

    const info = browserInfo[browserName];
    if (info) {
        alert(`${browserName}\n\nDeveloper: ${info.developer}\nFirst Release: ${info.firstRelease}\nEngine: ${info.engine}\n\n${info.description}`);
    }
}

// Server Comparison Interactive Elements
function initializeServerComparison() {
    const serverItems = document.querySelectorAll('.server-item');

    serverItems.forEach(item => {
        item.addEventListener('click', function () {
            const serverName = this.querySelector('h3').textContent;
            showServerDetails(serverName);
        });
    });
}

function showServerDetails(serverName) {
    const serverDetails = {
        'Apache HTTP Server': {
            company: 'Apache Software Foundation',
            license: 'Open Source (Apache License)',
            platforms: 'Cross-platform (Unix, Linux, Windows, macOS)',
            strengths: 'Highly configurable, extensive module ecosystem, .htaccess support',
            weaknesses: 'Can be resource-intensive with many modules',
            useCase: 'Great for shared hosting, traditional web applications'
        },
        'Nginx': {
            company: 'F5 Networks (originally Igor Sysoev)',
            license: 'Open Source (BSD-like license)',
            platforms: 'Unix-like systems (Linux, FreeBSD, etc.)',
            strengths: 'High performance, low memory usage, excellent as reverse proxy',
            weaknesses: 'Less flexible configuration than Apache',
            useCase: 'High-traffic sites, microservices, load balancing'
        },
        'Microsoft IIS': {
            company: 'Microsoft',
            license: 'Proprietary (included with Windows Server)',
            platforms: 'Windows Server only',
            strengths: 'Deep Windows integration, excellent .NET support, GUI management',
            weaknesses: 'Platform-specific, licensing costs',
            useCase: 'Enterprise Windows environments, .NET applications'
        },
        'LiteSpeed': {
            company: 'LiteSpeed Technologies',
            license: 'Commercial (with open source edition available)',
            platforms: 'Linux, Unix, Windows, macOS',
            strengths: 'High performance, Apache compatibility, built-in caching',
            weaknesses: 'Commercial license required for full features',
            useCase: 'High-performance hosting, Apache replacement'
        }
    };

    const details = serverDetails[serverName];
    if (details) {
        const message = `${serverName} Details:\n\nCompany: ${details.company}\nLicense: ${details.license}\nPlatforms: ${details.platforms}\n\nStrengths: ${details.strengths}\nWeaknesses: ${details.weaknesses}\n\nBest Use Case: ${details.useCase}`;
        alert(message);
    }
}

// Communication Demo
function setupCommunicationDemo() {
    // Initialize demo state
    window.demoState = 'ready';
}

function simulateRequest() {
    if (window.demoState === 'running') return;

    window.demoState = 'running';
    const requestBox = document.getElementById('requestBox');
    const responseBox = document.getElementById('responseBox');
    const requestArrow = document.getElementById('requestArrow');
    const responseArrow = document.getElementById('responseArrow');
    const simulateBtn = document.getElementById('simulateBtn');

    // Disable button during simulation
    simulateBtn.disabled = true;
    simulateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Step 1: Show request
    setTimeout(() => {
        requestBox.innerHTML = `
            <div class="message active">
                <strong>GET /index.html HTTP/1.1</strong><br>
                Host: example.com<br>
                User-Agent: Chrome/96.0<br>
                Accept: text/html,*/*
            </div>
        `;
        requestArrow.classList.add('active');
    }, 500);

    // Step 2: Server processes
    setTimeout(() => {
        responseBox.innerHTML = `
            <div class="message processing">
                <i class="fas fa-cog fa-spin"></i> Processing request...<br>
                Locating file: /index.html<br>
                Preparing response...
            </div>
        `;
    }, 1500);

    // Step 3: Show response
    setTimeout(() => {
        requestArrow.classList.remove('active');
        responseArrow.classList.add('active');
        responseBox.innerHTML = `
            <div class="message active">
                <strong>HTTP/1.1 200 OK</strong><br>
                Content-Type: text/html<br>
                Content-Length: 1234<br>
                Server: Apache/2.4.41
            </div>
        `;
    }, 2500);

    // Step 4: Complete
    setTimeout(() => {
        responseArrow.classList.remove('active');
        requestBox.innerHTML = `
            <div class="message success">
                <i class="fas fa-check-circle"></i> Page loaded successfully!<br>
                Rendering HTML content...
            </div>
        `;

        // Re-enable button
        simulateBtn.disabled = false;
        simulateBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Another Request';
        window.demoState = 'complete';
    }, 3500);
}

function resetDemo() {
    window.demoState = 'ready';

    const requestBox = document.getElementById('requestBox');
    const responseBox = document.getElementById('responseBox');
    const requestArrow = document.getElementById('requestArrow');
    const responseArrow = document.getElementById('responseArrow');
    const simulateBtn = document.getElementById('simulateBtn');

    // Reset UI
    requestBox.innerHTML = '<div class="message">Ready to send request...</div>';
    responseBox.innerHTML = '<div class="message">Waiting for request...</div>';
    requestArrow.classList.remove('active');
    responseArrow.classList.remove('active');

    simulateBtn.disabled = false;
    simulateBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Request';
}

// Quiz functionality
function setupQuiz() {
    window.quizAnswered = false;
}

function selectAnswer(element, isCorrect) {
    if (window.quizAnswered) return;

    window.quizAnswered = true;
    const options = document.querySelectorAll('.quiz-option');
    const explanation = document.querySelector('.quiz-explanation');

    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
        if (option === element) {
            option.classList.add(isCorrect ? 'correct' : 'incorrect');
        } else if (option.textContent.trim() === 'Blink') {
            option.classList.add('correct');
        } else {
            option.classList.add('incorrect');
        }
    });

    // Show explanation
    if (explanation) {
        explanation.style.display = 'block';
        explanation.innerHTML = isCorrect
            ? '<p><strong>Correct!</strong> Google Chrome uses the Blink rendering engine, which is a fork of WebKit that Google developed.</p>'
            : '<p><strong>Incorrect.</strong> The correct answer is Blink. Google Chrome uses the Blink rendering engine, which is a fork of WebKit.</p>';
    }
}

// Utility function to create CSS for animations
function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .component-tooltip {
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 10px;
            border-radius: 4px;
            font-size: 14px;
            max-width: 300px;
            z-index: 1000;
            display: none;
            pointer-events: none;
        }
        
        .browser-component {
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        
        .browser-component:hover {
            transform: translateY(-5px);
        }
        
        .communication-arrows .request-arrow,
        .communication-arrows .response-arrow {
            opacity: 0.3;
            transition: opacity 0.3s ease;
        }
        
        .communication-arrows .request-arrow.active,
        .communication-arrows .response-arrow.active {
            opacity: 1;
            animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .message.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 8px;
            padding: 10px;
        }
        
        .message.processing {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            border-radius: 8px;
            padding: 10px;
        }
        
        .message.success {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            border-radius: 8px;
            padding: 10px;
        }
    `;
    document.head.appendChild(style);
}

// Initialize custom styles when the page loads
document.addEventListener('DOMContentLoaded', addCustomStyles);
