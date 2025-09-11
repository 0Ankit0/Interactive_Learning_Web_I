// Basic Protocols Topic JavaScript
document.addEventListener('DOMContentLoaded', function () {
    initializeProtocolsTopic();
});

function initializeProtocolsTopic() {
    initializeProtocolStack();
    initializeHttpMethods();
    initializeStatusCodes();
    setupProtocolSimulator();
    setupProtocolQuiz();
    updateRequest(); // Initialize request preview
}

// Protocol Stack Interactive Elements
function initializeProtocolStack() {
    const layers = document.querySelectorAll('.protocol-layer');

    layers.forEach(layer => {
        layer.addEventListener('mouseenter', function () {
            const layerType = this.dataset.layer;
            showLayerDetails(layerType, this);
        });

        layer.addEventListener('mouseleave', function () {
            hideLayerDetails();
        });
    });
}

function showLayerDetails(layerType, element) {
    const details = {
        application: 'Application Layer protocols handle high-level communication between applications. HTTP/HTTPS are used for web browsing, FTP for file transfer, SMTP for email.',
        transport: 'Transport Layer ensures reliable data delivery. TCP provides connection-oriented, reliable transmission while UDP offers faster, connectionless communication.',
        network: 'Network Layer handles routing and addressing. IP (Internet Protocol) manages packet routing across networks, while ICMP handles error reporting.',
        physical: 'Physical Layer manages the actual transmission of data over physical media like Ethernet cables or WiFi radio signals.'
    };

    // Create tooltip
    let tooltip = document.getElementById('layer-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'layer-tooltip';
        tooltip.className = 'layer-tooltip';
        document.body.appendChild(tooltip);
    }

    tooltip.textContent = details[layerType];
    tooltip.style.display = 'block';

    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = (rect.right + 10) + 'px';
    tooltip.style.top = rect.top + 'px';
}

function hideLayerDetails() {
    const tooltip = document.getElementById('layer-tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// HTTP Methods Interactive Effects
function initializeHttpMethods() {
    const methodCards = document.querySelectorAll('.method-card');

    methodCards.forEach(card => {
        card.addEventListener('click', function () {
            const method = this.dataset.method;
            showMethodDetails(method);
        });
    });
}

function showMethodDetails(method) {
    const methodDetails = {
        GET: {
            description: 'The GET method requests a representation of the specified resource. It should only retrieve data and should have no other effect.',
            properties: ['Safe', 'Idempotent', 'Cacheable'],
            example: 'GET /api/users/123 HTTP/1.1\nHost: api.example.com\nAccept: application/json',
            useCase: 'Retrieving web pages, API data, images, or any resource without side effects'
        },
        POST: {
            description: 'The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server.',
            properties: ['Not Safe', 'Not Idempotent', 'Not Cacheable by default'],
            example: 'POST /api/users HTTP/1.1\nHost: api.example.com\nContent-Type: application/json\n\n{"name": "John", "email": "john@example.com"}',
            useCase: 'Creating new resources, submitting forms, uploading files'
        },
        PUT: {
            description: 'The PUT method replaces all current representations of the target resource with the request payload.',
            properties: ['Not Safe', 'Idempotent', 'Not Cacheable'],
            example: 'PUT /api/users/123 HTTP/1.1\nHost: api.example.com\nContent-Type: application/json\n\n{"name": "John Updated", "email": "john.new@example.com"}',
            useCase: 'Updating entire resources, creating resources at specific URLs'
        },
        DELETE: {
            description: 'The DELETE method deletes the specified resource.',
            properties: ['Not Safe', 'Idempotent', 'Not Cacheable'],
            example: 'DELETE /api/users/123 HTTP/1.1\nHost: api.example.com',
            useCase: 'Removing resources, deleting user accounts, removing database entries'
        },
        PATCH: {
            description: 'The PATCH method is used to apply partial modifications to a resource.',
            properties: ['Not Safe', 'Not Idempotent', 'Not Cacheable'],
            example: 'PATCH /api/users/123 HTTP/1.1\nHost: api.example.com\nContent-Type: application/json\n\n{"email": "newemail@example.com"}',
            useCase: 'Partial updates, modifying specific fields of resources'
        },
        HEAD: {
            description: 'The HEAD method asks for a response identical to that of a GET request, but without the response body.',
            properties: ['Safe', 'Idempotent', 'Cacheable'],
            example: 'HEAD /api/users/123 HTTP/1.1\nHost: api.example.com',
            useCase: 'Checking if resource exists, getting metadata, verifying resource modification dates'
        }
    };

    const details = methodDetails[method];
    if (details) {
        const message = `${method} Method\n\n${details.description}\n\nProperties: ${details.properties.join(', ')}\n\nExample:\n${details.example}\n\nUse Case: ${details.useCase}`;
        alert(message);
    }
}

// Status Codes Interactive Effects
function initializeStatusCodes() {
    const statusCodes = document.querySelectorAll('.status-code');

    statusCodes.forEach(code => {
        code.addEventListener('click', function () {
            const codeNumber = this.querySelector('.code').textContent;
            const message = this.querySelector('.message').textContent;
            showStatusCodeDetails(codeNumber, message);
        });

        code.style.cursor = 'pointer';
    });
}

function showStatusCodeDetails(code, message) {
    const statusDetails = {
        '100': 'The server has received the request headers and the client should proceed to send the request body.',
        '101': 'The server is switching protocols as requested by the client.',
        '200': 'The request has succeeded. The meaning of success depends on the HTTP method used.',
        '201': 'The request has been fulfilled and resulted in one or more new resources being created.',
        '204': 'The server successfully processed the request but is not returning any content.',
        '301': 'The requested resource has been permanently moved to a new URL.',
        '302': 'The requested resource temporarily resides under a different URL.',
        '304': 'The resource has not been modified since the version specified by request headers.',
        '400': 'The server cannot process the request due to invalid syntax.',
        '401': 'The request requires user authentication.',
        '404': 'The server cannot find the requested resource.',
        '500': 'The server encountered an unexpected condition that prevented it from fulfilling the request.',
        '502': 'The server acting as a gateway received an invalid response from the upstream server.',
        '503': 'The server is temporarily unable to handle the request due to maintenance or overload.'
    };

    const detail = statusDetails[code];
    if (detail) {
        alert(`${code} ${message}\n\n${detail}`);
    }
}

// Protocol Simulator
function setupProtocolSimulator() {
    // Initialize with GET method (no body needed)
    updateRequest();
}

function updateRequest() {
    const method = document.getElementById('httpMethod').value;
    const url = document.getElementById('httpUrl').value;
    const headers = document.getElementById('httpHeaders').value;
    const body = document.getElementById('httpBody').value;
    const bodyRow = document.getElementById('bodyRow');

    // Show/hide body field based on method
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        bodyRow.style.display = 'block';
    } else {
        bodyRow.style.display = 'none';
    }

    // Parse URL to extract host and path
    let parsedUrl;
    try {
        parsedUrl = new URL(url);
    } catch (e) {
        parsedUrl = { hostname: 'example.com', pathname: '/path' };
    }

    // Build request preview
    let requestPreview = `${method} ${parsedUrl.pathname} HTTP/1.1\n`;
    requestPreview += `Host: ${parsedUrl.hostname}\n`;

    // Add headers
    if (headers.trim()) {
        requestPreview += headers.trim() + '\n';
    }

    // Add body for applicable methods
    if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && body.trim()) {
        requestPreview += '\n' + body.trim();
    }

    document.getElementById('requestPreview').textContent = requestPreview;
}

function sendRequest() {
    const method = document.getElementById('httpMethod').value;
    const url = document.getElementById('httpUrl').value;

    // Simulate sending request
    const responseDisplay = document.getElementById('responseDisplay');
    const responseStatus = document.getElementById('responseStatus');
    const responseHeaders = document.getElementById('responseHeaders');
    const responseBody = document.getElementById('responseBody');

    // Show loading state
    responseDisplay.style.display = 'block';
    responseStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending request...';
    responseHeaders.innerHTML = '';
    responseBody.innerHTML = '';

    // Simulate network delay and response
    setTimeout(() => {
        // Generate mock response based on method
        const responses = {
            GET: {
                status: '200 OK',
                headers: 'Content-Type: application/json\nContent-Length: 156\nCache-Control: max-age=3600',
                body: '{"id": 123, "name": "John Doe", "email": "john@example.com", "created_at": "2025-09-11T10:30:00Z"}'
            },
            POST: {
                status: '201 Created',
                headers: 'Content-Type: application/json\nLocation: /api/users/456\nContent-Length: 98',
                body: '{"id": 456, "name": "John Doe", "email": "john@example.com", "message": "User created successfully"}'
            },
            PUT: {
                status: '200 OK',
                headers: 'Content-Type: application/json\nContent-Length: 102',
                body: '{"id": 123, "name": "John Updated", "email": "john.new@example.com", "message": "User updated"}'
            },
            DELETE: {
                status: '204 No Content',
                headers: 'Content-Length: 0',
                body: ''
            },
            PATCH: {
                status: '200 OK',
                headers: 'Content-Type: application/json\nContent-Length: 89',
                body: '{"id": 123, "email": "newemail@example.com", "message": "User partially updated"}'
            },
            HEAD: {
                status: '200 OK',
                headers: 'Content-Type: application/json\nContent-Length: 156\nLast-Modified: Mon, 11 Sep 2025 09:30:00 GMT',
                body: ''
            }
        };

        const response = responses[method];
        responseStatus.innerHTML = `<strong>HTTP/1.1 ${response.status}</strong>`;
        responseHeaders.innerHTML = `<pre>${response.headers}</pre>`;

        if (response.body) {
            responseBody.innerHTML = `<pre><code class="language-json">${response.body}</code></pre>`;
            // Re-run Prism highlighting
            if (typeof Prism !== 'undefined') {
                Prism.highlightAll();
            }
        } else {
            responseBody.innerHTML = '<em>No response body</em>';
        }
    }, 1000);
}

function clearForm() {
    document.getElementById('httpMethod').value = 'GET';
    document.getElementById('httpUrl').value = 'https://api.example.com/users';
    document.getElementById('httpHeaders').value = 'Content-Type: application/json\nAuthorization: Bearer token123\nAccept: application/json';
    document.getElementById('httpBody').value = '{"name": "John Doe", "email": "john@example.com"}';
    document.getElementById('responseDisplay').style.display = 'none';
    updateRequest();
}

// Quiz functionality
function setupProtocolQuiz() {
    window.protocolQuizAnswered = false;
}

function selectProtocolAnswer(element, isCorrect) {
    if (window.protocolQuizAnswered) return;

    window.protocolQuizAnswered = true;
    const options = document.querySelectorAll('#protocolQuiz .quiz-option');
    const explanation = document.querySelector('#protocolQuiz .quiz-explanation');

    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
        if (option === element) {
            option.classList.add(isCorrect ? 'correct' : 'incorrect');
        } else if (option.textContent.trim() === '200 OK') {
            option.classList.add('correct');
        } else {
            option.classList.add('incorrect');
        }
    });

    // Show explanation
    if (explanation) {
        explanation.style.display = 'block';
        explanation.innerHTML = isCorrect
            ? '<p><strong>Correct!</strong> 200 OK indicates that the HTTP request was successful and the server has returned the requested resource.</p>'
            : '<p><strong>Incorrect.</strong> The correct answer is 200 OK. This status code indicates a successful HTTP request.</p>';
    }
}

// Add custom styles for interactive elements
function addProtocolStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .layer-tooltip {
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 12px;
            border-radius: 6px;
            font-size: 14px;
            max-width: 350px;
            z-index: 1000;
            display: none;
            pointer-events: none;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        .protocol-layer {
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        
        .protocol-layer:hover {
            transform: translateX(10px);
        }
        
        .method-card {
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .method-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .status-code {
            transition: all 0.2s ease;
            padding: 8px;
            border-radius: 4px;
        }
        
        .status-code:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: scale(1.05);
        }
        
        .request-form .form-row {
            margin-bottom: 15px;
        }
        
        .request-form label {
            display: block;
            font-weight: 600;
            margin-bottom: 5px;
            color: #333;
        }
        
        .request-form input,
        .request-form select,
        .request-form textarea {
            width: 100%;
            padding: 10px;
            border: 2px solid #e0e0e0;
            border-radius: 4px;
            font-family: 'JetBrains Mono', monospace;
        }
        
        .request-form input:focus,
        .request-form select:focus,
        .request-form textarea:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .code-block {
            background: #2d3748;
            color: #e2e8f0;
            padding: 20px;
            border-radius: 8px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            overflow-x: auto;
            line-height: 1.5;
        }
        
        .response-display {
            margin-top: 20px;
            padding: 20px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            background: #f8f9fa;
        }
        
        .response-status {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .response-headers,
        .response-body {
            margin-bottom: 15px;
        }
        
        .response-headers pre,
        .response-body pre {
            background: white;
            padding: 15px;
            border-radius: 4px;
            border-left: 4px solid #667eea;
            margin: 0;
        }
    `;
    document.head.appendChild(style);
}

// Initialize styles when page loads
document.addEventListener('DOMContentLoaded', addProtocolStyles);
