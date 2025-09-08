// Client-Server Architecture Topic Interactive Functionality

// Global variables
let currentQuizQuestion = 0;
let quizScore = 0;
let serverOnline = true;
let demoRequestInProgress = false;
let architectureScore = 0;
let roleGameScore = 0;

// Quiz questions for client-server architecture
const clientServerQuizQuestions = [
    {
        question: "In client-server architecture, which component initiates the communication?",
        options: ["Client", "Server", "Network", "Database"],
        correct: 0,
        explanation: "The client always initiates communication by sending requests to the server."
    },
    {
        question: "What is the most common communication pattern in client-server architecture?",
        options: ["Publish-Subscribe", "Request-Response", "Push-Pull", "Broadcast"],
        correct: 1,
        explanation: "Request-Response is the fundamental communication pattern where clients request services and servers respond."
    },
    {
        question: "Which architecture type is best for small business applications with 10 users?",
        options: ["2-Tier", "3-Tier", "N-Tier", "Peer-to-Peer"],
        correct: 0,
        explanation: "2-Tier architecture is simple and cost-effective for small applications with limited users."
    },
    {
        question: "What is a major disadvantage of client-server architecture?",
        options: ["High security", "Easy maintenance", "Single point of failure", "Resource sharing"],
        correct: 2,
        explanation: "Single point of failure is a major concern - if the server fails, all clients lose access to services."
    },
    {
        question: "Which protocol is commonly used for web client-server communication?",
        options: ["FTP", "SMTP", "HTTP", "SSH"],
        correct: 2,
        explanation: "HTTP (HyperText Transfer Protocol) is the standard protocol for web communication between browsers and web servers."
    }
];

// Demo request templates
const demoRequestTemplates = {
    homepage: {
        method: "GET",
        url: "/",
        headers: "Accept: text/html\nUser-Agent: Mozilla/5.0",
        response: {
            status: "200 OK",
            headers: "Content-Type: text/html\nContent-Length: 2048",
            body: `<!DOCTYPE html>
<html>
<head><title>Welcome</title></head>
<body><h1>Welcome to our website!</h1></body>
</html>`
        },
        processingTime: 2000
    },
    users: {
        method: "GET",
        url: "/api/users",
        headers: "Accept: application/json\nAuthorization: Bearer token123",
        response: {
            status: "200 OK",
            headers: "Content-Type: application/json\nContent-Length: 456",
            body: `{
  "users": [
    {"id": 1, "name": "John Doe", "email": "john@example.com"},
    {"id": 2, "name": "Jane Smith", "email": "jane@example.com"}
  ]
}`
        },
        processingTime: 1500
    },
    login: {
        method: "POST",
        url: "/api/auth/login",
        headers: "Content-Type: application/json\nAccept: application/json",
        response: {
            status: "200 OK",
            headers: "Content-Type: application/json\nSet-Cookie: session=abc123",
            body: `{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {"id": 1, "name": "John Doe"}
}`
        },
        processingTime: 3000
    },
    upload: {
        method: "POST",
        url: "/api/upload",
        headers: "Content-Type: multipart/form-data\nContent-Length: 1048576",
        response: {
            status: "201 Created",
            headers: "Content-Type: application/json\nLocation: /files/abc123",
            body: `{
  "success": true,
  "message": "File uploaded successfully",
  "fileId": "abc123",
  "filename": "document.pdf",
  "size": 1048576
}`
        },
        processingTime: 4000
    }
};

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function () {
    initializeScrollProgress();
    initializeTableOfContents();
    initializeInteractiveElements();
    initializeQuiz();
    initializeDragAndDrop();
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

// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize interactive elements
function initializeInteractiveElements() {
    updateRequest();
    updateDemoRequestDetails();
}

// Understanding check functionality
function checkAnswer(button, isCorrect) {
    const buttons = button.parentNode.querySelectorAll('.check-btn');
    const feedback = document.getElementById('check-feedback');

    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn === button) {
            btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
    });

    if (isCorrect) {
        feedback.innerHTML = '<span class="correct">✓ Correct! When you browse a website, your browser acts as the client.</span>';
    } else {
        feedback.innerHTML = '<span class="incorrect">✗ Not quite. Your browser is the client that requests web pages from servers.</span>';
    }

    // Reset after 3 seconds
    setTimeout(() => {
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.className = 'check-btn';
        });
        feedback.innerHTML = '';
    }, 3000);
}

// Drag and Drop functionality for role game
function initializeDragAndDrop() {
    const draggableItems = document.querySelectorAll('.draggable-item');
    const dropZones = document.querySelectorAll('.drop-area');

    draggableItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
    });
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.type);
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.target.style.opacity = '0.5';
}

function handleDragEnd(e) {
    e.target.style.opacity = '1';
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.target.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');

    const itemType = e.dataTransfer.getData('text/plain');
    const itemHTML = e.dataTransfer.getData('text/html');
    const dropZone = e.target.closest('.drop-zone');
    const acceptedType = dropZone.dataset.accept;

    if (itemType === acceptedType) {
        e.target.innerHTML += itemHTML;
        roleGameScore++;
        updateRoleGameScore();

        // Remove original item
        const originalItem = document.querySelector(`[data-type="${itemType}"]`);
        if (originalItem && originalItem.parentNode.classList.contains('game-items')) {
            originalItem.remove();
        }

        // Show success feedback
        showDropFeedback(e.target, true);
    } else {
        showDropFeedback(e.target, false);
    }
}

function updateRoleGameScore() {
    const scoreElement = document.getElementById('role-game-score');
    if (scoreElement) {
        scoreElement.textContent = `Score: ${roleGameScore}/4`;

        if (roleGameScore === 4) {
            scoreElement.innerHTML += ' <span style="color: #4CAF50;">Perfect!</span>';
        }
    }
}

function showDropFeedback(element, success) {
    const feedback = document.createElement('div');
    feedback.className = `drop-feedback ${success ? 'success' : 'error'}`;
    feedback.textContent = success ? '✓ Correct!' : '✗ Wrong category';

    element.appendChild(feedback);

    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 2000);
}

// HTTP Request Builder
function updateRequest() {
    const method = document.getElementById('http-method')?.value || 'GET';
    const url = document.getElementById('http-url')?.value || '/api/users';
    const headers = document.getElementById('http-headers')?.value || 'Content-Type: application/json';

    const requestOutput = document.getElementById('request-output');
    if (requestOutput) {
        requestOutput.textContent = `${method} ${url} HTTP/1.1\n${headers}`;
    }
}

function simulateRequest() {
    const responseArea = document.getElementById('response-area');
    const responseOutput = document.getElementById('response-output');

    if (responseArea && responseOutput) {
        responseArea.style.display = 'block';
        responseOutput.textContent = 'Processing request...';

        setTimeout(() => {
            const method = document.getElementById('http-method')?.value || 'GET';
            let response = '';

            if (method === 'GET') {
                response = `HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 156

{
  "users": [
    {"id": 1, "name": "John Doe"},
    {"id": 2, "name": "Jane Smith"}
  ]
}`;
            } else if (method === 'POST') {
                response = `HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/users/3

{
  "id": 3,
  "message": "User created successfully"
}`;
            } else {
                response = `HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Request processed successfully"
}`;
            }

            responseOutput.textContent = response;
        }, 1500);
    }
}

// Architecture Selector
function selectArchitecture(button, isCorrect, architecture) {
    const scenario = button.dataset.scenario;
    const buttons = button.parentNode.querySelectorAll('button');

    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn === button) {
            btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        } else if (isCorrect) {
            // Find and highlight the correct answer
            buttons.forEach(b => {
                if (b.textContent.toLowerCase().includes(architecture)) {
                    b.classList.add('correct');
                }
            });
        }
    });

    if (isCorrect) {
        architectureScore++;
        updateArchitectureScore();
    }

    // Show explanation
    const card = button.closest('.scenario-card');
    let explanation = '';

    switch (scenario) {
        case '1':
            explanation = '2-Tier is perfect for small businesses with simple requirements and limited users.';
            break;
        case '2':
            explanation = '3-Tier provides the right balance of security, scalability, and maintainability for e-commerce.';
            break;
        case '3':
            explanation = 'N-Tier architecture can handle the massive scale and complexity of global platforms.';
            break;
    }

    if (!card.querySelector('.explanation')) {
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'explanation';
        explanationDiv.innerHTML = `<p><strong>Explanation:</strong> ${explanation}</p>`;
        card.appendChild(explanationDiv);
    }

    // Reset after delay
    setTimeout(() => {
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.className = '';
        });
        const explanation = card.querySelector('.explanation');
        if (explanation) {
            explanation.remove();
        }
    }, 4000);
}

function updateArchitectureScore() {
    const scoreElement = document.getElementById('architecture-score');
    if (scoreElement) {
        scoreElement.textContent = `Score: ${architectureScore}/3`;

        if (architectureScore === 3) {
            scoreElement.innerHTML += ' <span style="color: #4CAF50;">Excellent!</span>';
        }
    }
}

// Example showcase tabs
function showExample(type) {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.example-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    document.querySelector(`[onclick="showExample('${type}')"]`).classList.add('active');
    document.getElementById(`${type}-example`).classList.add('active');
}

// Interactive Demo functionality
function updateDemoRequestDetails() {
    const requestType = document.getElementById('demo-request-type')?.value || 'homepage';
    const template = demoRequestTemplates[requestType];
    const detailsElement = document.getElementById('demo-request-details');

    if (template && detailsElement) {
        detailsElement.textContent = `Method: ${template.method}\nURL: ${template.url}\nHeaders: ${template.headers}`;
    }
}

function sendDemoRequest() {
    if (demoRequestInProgress) return;

    const requestType = document.getElementById('demo-request-type')?.value || 'homepage';
    const template = demoRequestTemplates[requestType];

    if (!serverOnline) {
        showServerError();
        return;
    }

    demoRequestInProgress = true;

    // Show network activity
    showNetworkActivity();

    // Add server log
    addServerLog(`Incoming ${template.method} request to ${template.url}`);

    // Simulate server load
    simulateServerLoad();

    // Process request
    setTimeout(() => {
        completeRequest(template);
    }, template.processingTime);
}

function showNetworkActivity() {
    const networkActivity = document.getElementById('network-activity');
    const networkProgress = document.getElementById('network-progress');

    if (networkActivity && networkProgress) {
        networkActivity.style.display = 'none';
        networkProgress.style.display = 'block';

        // Animate progress bar
        const progressFill = networkProgress.querySelector('.progress-fill');
        progressFill.style.width = '100%';
    }
}

function addServerLog(message) {
    const logsContainer = document.getElementById('server-logs');
    if (logsContainer) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = `[${timestamp}] ${message}`;
        logsContainer.appendChild(logEntry);

        // Keep only last 5 logs
        while (logsContainer.children.length > 5) {
            logsContainer.removeChild(logsContainer.firstChild);
        }

        // Scroll to bottom
        logsContainer.scrollTop = logsContainer.scrollHeight;
    }
}

function simulateServerLoad() {
    const loadElement = document.getElementById('server-load');
    const loadFill = document.getElementById('load-fill');

    if (loadElement && loadFill) {
        let load = 0;
        const maxLoad = Math.random() * 80 + 20; // 20-100%

        const interval = setInterval(() => {
            load += 5;
            const currentLoad = Math.min(load, maxLoad);
            loadElement.textContent = `${currentLoad}%`;
            loadFill.style.width = `${currentLoad}%`;

            if (load >= maxLoad) {
                clearInterval(interval);

                // Gradually decrease load
                setTimeout(() => {
                    const decreaseInterval = setInterval(() => {
                        load -= 10;
                        const currentLoad = Math.max(load, 0);
                        loadElement.textContent = `${currentLoad}%`;
                        loadFill.style.width = `${currentLoad}%`;

                        if (load <= 0) {
                            clearInterval(decreaseInterval);
                        }
                    }, 200);
                }, 1000);
            }
        }, 100);
    }
}

function completeRequest(template) {
    // Add completion log
    addServerLog(`Response sent: ${template.response.status}`);

    // Hide network progress, show response
    const networkActivity = document.getElementById('network-activity');
    const networkProgress = document.getElementById('network-progress');
    const demoResponse = document.getElementById('demo-response');
    const responseHeaders = document.getElementById('response-headers');
    const responseBody = document.getElementById('response-body');

    if (networkActivity && networkProgress) {
        networkProgress.style.display = 'none';
        networkActivity.style.display = 'block';
        networkActivity.innerHTML = '<i class="fas fa-check-circle"></i><span>Request completed</span>';
    }

    if (demoResponse && responseHeaders && responseBody) {
        demoResponse.style.display = 'block';
        responseHeaders.textContent = `HTTP/1.1 ${template.response.status}\n${template.response.headers}`;
        responseBody.textContent = template.response.body;
    }

    demoRequestInProgress = false;

    // Reset network status after delay
    setTimeout(() => {
        if (networkActivity) {
            networkActivity.innerHTML = '<i class="fas fa-wifi"></i><span>Ready to send request...</span>';
        }
    }, 3000);
}

function showServerError() {
    const networkActivity = document.getElementById('network-activity');
    const demoResponse = document.getElementById('demo-response');
    const responseHeaders = document.getElementById('response-headers');
    const responseBody = document.getElementById('response-body');

    if (networkActivity) {
        networkActivity.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Connection failed</span>';
        networkActivity.style.color = '#f44336';
    }

    if (demoResponse && responseHeaders && responseBody) {
        demoResponse.style.display = 'block';
        responseHeaders.textContent = 'Connection failed - Server unreachable';
        responseBody.textContent = 'Error: Unable to connect to server\nThe server might be down or experiencing issues.';
    }

    addServerLog('Server is offline - cannot process requests');
}

function resetDemo() {
    demoRequestInProgress = false;

    const networkActivity = document.getElementById('network-activity');
    const networkProgress = document.getElementById('network-progress');
    const demoResponse = document.getElementById('demo-response');
    const serverLogs = document.getElementById('server-logs');
    const loadElement = document.getElementById('server-load');
    const loadFill = document.getElementById('load-fill');

    if (networkActivity) {
        networkActivity.style.display = 'block';
        networkActivity.style.color = '';
        networkActivity.innerHTML = '<i class="fas fa-wifi"></i><span>Ready to send request...</span>';
    }

    if (networkProgress) {
        networkProgress.style.display = 'none';
        const progressFill = networkProgress.querySelector('.progress-fill');
        progressFill.style.width = '0%';
    }

    if (demoResponse) {
        demoResponse.style.display = 'none';
    }

    if (serverLogs) {
        serverLogs.innerHTML = '<div class="log-entry">Server started on port 8080</div><div class="log-entry">Waiting for incoming requests...</div>';
    }

    if (loadElement) {
        loadElement.textContent = '0%';
    }

    if (loadFill) {
        loadFill.style.width = '0%';
    }

    updateDemoRequestDetails();
}

function toggleServerStatus() {
    serverOnline = !serverOnline;
    const serverStatus = document.getElementById('server-status');
    const serverToggle = document.getElementById('server-toggle');

    if (serverStatus && serverToggle) {
        if (serverOnline) {
            serverStatus.className = 'status-indicator online';
            serverStatus.innerHTML = '<i class="fas fa-circle"></i><span>Server Online</span>';
            serverToggle.textContent = 'Simulate Server Down';
            addServerLog('Server came back online');
        } else {
            serverStatus.className = 'status-indicator offline';
            serverStatus.innerHTML = '<i class="fas fa-circle"></i><span>Server Offline</span>';
            serverToggle.textContent = 'Bring Server Online';
            addServerLog('Server went offline');
        }
    }
}

// Quiz functionality
function initializeQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    showQuizQuestion();
}

function showQuizQuestion() {
    const question = clientServerQuizQuestions[currentQuizQuestion];
    if (!question) return;

    const questionElement = document.querySelector('#quiz-question h3');
    const optionsContainer = document.querySelector('.quiz-options');
    const progressFill = document.getElementById('quiz-progress');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');

    if (questionElement) questionElement.textContent = question.question;
    if (currentQuestionSpan) currentQuestionSpan.textContent = currentQuizQuestion + 1;
    if (totalQuestionsSpan) totalQuestionsSpan.textContent = clientServerQuizQuestions.length;

    if (progressFill) {
        const progress = (currentQuizQuestion / clientServerQuizQuestions.length) * 100;
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
    const question = clientServerQuizQuestions[currentQuizQuestion];
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

    if (currentQuizQuestion < clientServerQuizQuestions.length) {
        showQuizQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    const quizQuestion = document.querySelector('.quiz-question');
    const quizResults = document.getElementById('quiz-results');
    const finalScore = document.getElementById('final-score');
    const progressFill = document.getElementById('quiz-progress');

    // Hide question, show results
    if (quizQuestion) quizQuestion.style.display = 'none';
    if (quizResults) quizResults.style.display = 'block';

    // Update final score
    if (finalScore) finalScore.textContent = `${quizScore}/${clientServerQuizQuestions.length}`;

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
    alert('Congratulations! You have completed the "Client-Server Architecture" lesson. You will now return to the unit page.');

    // Navigate back to unit page
    window.location.href = '../units/unit1.html';
}

// Progress Management
function saveTopicProgress(scrollPercent) {
    const topicId = 'client-server-architecture';
    const progress = {
        scrollPercent: Math.min(scrollPercent, 100),
        quizScore: quizScore,
        architectureScore: architectureScore,
        roleGameScore: roleGameScore,
        completed: scrollPercent >= 90,
        lastVisited: new Date().toISOString()
    };

    localStorage.setItem(`topic-progress-${topicId}`, JSON.stringify(progress));
}

function loadTopicProgress() {
    const topicId = 'client-server-architecture';
    const saved = localStorage.getItem(`topic-progress-${topicId}`);

    if (saved) {
        const progress = JSON.parse(saved);
        const progressBar = document.getElementById('topic-progress');

        if (progressBar && progress.scrollPercent) {
            progressBar.style.width = progress.scrollPercent + '%';
        }

        // Restore scores if available
        if (progress.quizScore) quizScore = progress.quizScore;
        if (progress.architectureScore) architectureScore = progress.architectureScore;
        if (progress.roleGameScore) roleGameScore = progress.roleGameScore;
    }
}

function saveTopicCompletion() {
    const topicId = 'client-server-architecture';
    const progress = {
        scrollPercent: 100,
        quizScore: quizScore,
        architectureScore: architectureScore,
        roleGameScore: roleGameScore,
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

    if (!unitProgress.completedTopics.includes('client-server-architecture')) {
        unitProgress.completedTopics.push('client-server-architecture');
    }

    // Calculate overall unit progress
    const totalTopics = 6; // Total topics in unit 1
    unitProgress.progress = (unitProgress.completedTopics.length / totalTopics) * 100;
    unitProgress.lastVisited = new Date().toISOString();

    localStorage.setItem(`unit-progress-${unitId}`, JSON.stringify(unitProgress));
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Update demo request details when dropdown changes
    const requestTypeSelect = document.getElementById('demo-request-type');
    if (requestTypeSelect) {
        requestTypeSelect.addEventListener('change', updateDemoRequestDetails);
    }
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    // ESC to reset demo
    if (e.key === 'Escape') {
        resetDemo();
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

// Observe all content sections for animations
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        observer.observe(section);
    });
});
