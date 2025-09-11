// AJAX Topic Interactive Functionality

class AjaxTopicManager {
    constructor() {
        this.currentPage = 1;
        this.isLoading = false;
        this.pollingInterval = null;
        this.searchTimeout = null;

        this.initializeEventListeners();
        this.initializeQuiz();
        this.initializeLiveSearch();
        this.initializeInfiniteScroll();
        this.initializeFormSubmission();
    }

    initializeEventListeners() {
        // Form submission
        const ajaxForm = document.getElementById('ajax-form');
        if (ajaxForm) {
            ajaxForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Live search
        const liveSearchInput = document.getElementById('live-search');
        if (liveSearchInput) {
            liveSearchInput.addEventListener('input', (e) => this.handleLiveSearch(e.target.value));
        }

        // Scroll event for infinite scroll
        const scrollContainer = document.getElementById('scroll-container');
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', () => this.handleScroll());
            this.loadInitialScrollContent();
        }
    }

    // XMLHttpRequest Demo
    async sendXHRRequest() {
        const method = document.getElementById('xhr-method').value;
        const url = document.getElementById('xhr-url').value;
        const data = document.getElementById('xhr-data').value;
        const resultDiv = document.getElementById('xhr-result');

        if (!url.trim()) {
            this.showResult(resultDiv, 'error', 'Please enter a URL');
            return;
        }

        this.showResult(resultDiv, 'loading', 'Sending request...');

        try {
            const response = await this.makeXHRRequest(method, url, data);
            this.showResult(resultDiv, 'success', 'Request successful!', response);
        } catch (error) {
            this.showResult(resultDiv, 'error', 'Request failed', error.message);
        }
    }

    makeXHRRequest(method, url, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            resolve({
                                status: xhr.status,
                                statusText: xhr.statusText,
                                data: response
                            });
                        } catch (e) {
                            resolve({
                                status: xhr.status,
                                statusText: xhr.statusText,
                                data: xhr.responseText
                            });
                        }
                    } else {
                        reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
                    }
                }
            };

            xhr.onerror = () => reject(new Error('Network error'));
            xhr.ontimeout = () => reject(new Error('Request timeout'));

            xhr.open(method, url, true);
            xhr.timeout = 10000; // 10 seconds

            if (method !== 'GET' && data.trim()) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                try {
                    JSON.parse(data); // Validate JSON
                    xhr.send(data);
                } catch (e) {
                    reject(new Error('Invalid JSON data'));
                    return;
                }
            } else {
                xhr.send();
            }
        });
    }

    clearXHRResult() {
        const resultDiv = document.getElementById('xhr-result');
        resultDiv.innerHTML = `
            <div class="result-placeholder">
                <i class="fas fa-info-circle"></i>
                Configure your request above and click "Send Request" to see the result.
            </div>
        `;
    }

    // Fetch API Demos
    async demonstrateFetchGET() {
        const resultDiv = document.getElementById('get-demo-result');
        this.showResult(resultDiv, 'loading', 'Fetching data...');

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            this.showResult(resultDiv, 'success', 'GET request successful!', {
                url: response.url,
                status: response.status,
                data: data
            });
        } catch (error) {
            this.showResult(resultDiv, 'error', 'GET request failed', error.message);
        }
    }

    async demonstrateFetchPOST() {
        const title = document.getElementById('post-title').value || 'Sample Post';
        const resultDiv = document.getElementById('post-demo-result');

        this.showResult(resultDiv, 'loading', 'Creating post...');

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    body: 'This is a sample post created via AJAX',
                    userId: 1
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            this.showResult(resultDiv, 'success', 'POST request successful!', {
                message: 'New post created',
                id: data.id,
                data: data
            });
        } catch (error) {
            this.showResult(resultDiv, 'error', 'POST request failed', error.message);
        }
    }

    async demonstrateFetchPUT() {
        const postId = document.getElementById('put-id').value || '1';
        const resultDiv = document.getElementById('put-demo-result');

        this.showResult(resultDiv, 'loading', 'Updating post...');

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: parseInt(postId),
                    title: 'Updated Post Title',
                    body: 'This post has been updated via AJAX PUT request',
                    userId: 1
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            this.showResult(resultDiv, 'success', 'PUT request successful!', {
                message: `Post ${postId} updated`,
                data: data
            });
        } catch (error) {
            this.showResult(resultDiv, 'error', 'PUT request failed', error.message);
        }
    }

    async demonstrateFetchDELETE() {
        const postId = document.getElementById('delete-id').value || '1';
        const resultDiv = document.getElementById('delete-demo-result');

        this.showResult(resultDiv, 'loading', 'Deleting post...');

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            this.showResult(resultDiv, 'success', 'DELETE request successful!', {
                message: `Post ${postId} deleted`,
                status: response.status
            });
        } catch (error) {
            this.showResult(resultDiv, 'error', 'DELETE request failed', error.message);
        }
    }

    // Error Handling Tests
    async testNetworkError() {
        const resultDiv = document.getElementById('error-test-result');
        this.showResult(resultDiv, 'loading', 'Testing network error...');

        try {
            await fetch('https://nonexistent-domain-12345.com/api/data');
        } catch (error) {
            this.showResult(resultDiv, 'info', 'Network error caught successfully!', {
                errorType: 'Network Error',
                message: error.message,
                explanation: 'This error occurs when the server is unreachable or the domain doesn\'t exist.'
            });
        }
    }

    async testHTTPError() {
        const resultDiv = document.getElementById('error-test-result');
        this.showResult(resultDiv, 'loading', 'Testing HTTP error...');

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/99999');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            this.showResult(resultDiv, 'info', 'HTTP error handled successfully!', {
                errorType: 'HTTP Error',
                message: error.message,
                explanation: 'This error occurs when the server returns an error status code (4xx or 5xx).'
            });
        }
    }

    async testTimeout() {
        const resultDiv = document.getElementById('error-test-result');
        this.showResult(resultDiv, 'loading', 'Testing timeout (this will take 6 seconds)...');

        try {
            await this.fetchWithTimeout('https://httpbin.org/delay/5', 3000);
        } catch (error) {
            this.showResult(resultDiv, 'info', 'Timeout handled successfully!', {
                errorType: 'Timeout Error',
                message: error.message,
                explanation: 'This error occurs when a request takes longer than the specified timeout duration.'
            });
        }
    }

    async testRetry() {
        const resultDiv = document.getElementById('error-test-result');
        this.showResult(resultDiv, 'loading', 'Testing retry logic...');

        let attemptCount = 0;
        const maxRetries = 3;

        try {
            await this.fetchWithRetry('https://httpbin.org/status/500', maxRetries, () => {
                attemptCount++;
                const currentResult = document.getElementById('error-test-result');
                if (currentResult) {
                    currentResult.innerHTML = `
                        <div class="demo-info">
                            <h6><i class="fas fa-info-circle"></i> Testing retry logic...</h6>
                            <p>Attempt ${attemptCount} of ${maxRetries + 1} failed. ${attemptCount <= maxRetries ? 'Retrying...' : 'All attempts exhausted.'}</p>
                        </div>
                    `;
                }
            });
        } catch (error) {
            this.showResult(resultDiv, 'info', 'Retry logic completed!', {
                errorType: 'Retry Exhausted',
                message: `Failed after ${attemptCount} attempts`,
                explanation: 'The retry mechanism attempted the request multiple times before giving up.',
                attempts: attemptCount
            });
        }
    }

    fetchWithTimeout(url, timeout = 5000) {
        return Promise.race([
            fetch(url),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timeout')), timeout)
            )
        ]);
    }

    async fetchWithRetry(url, retries = 3, onRetry = null) {
        for (let i = 0; i <= retries; i++) {
            try {
                const response = await fetch(url);
                if (response.ok) return response;
                throw new Error(`HTTP ${response.status}`);
            } catch (error) {
                if (i === retries) throw error;
                if (onRetry) onRetry(i + 1);
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            }
        }
    }

    // Live Search
    handleLiveSearch(query) {
        clearTimeout(this.searchTimeout);
        const resultsDiv = document.getElementById('search-results');

        if (!query.trim()) {
            resultsDiv.innerHTML = '';
            return;
        }

        resultsDiv.innerHTML = '<div class="search-loading"><i class="fas fa-spinner fa-spin"></i> Searching...</div>';

        this.searchTimeout = setTimeout(async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const posts = await response.json();

                const filteredPosts = posts.filter(post =>
                    post.title.toLowerCase().includes(query.toLowerCase()) ||
                    post.body.toLowerCase().includes(query.toLowerCase())
                ).slice(0, 5);

                this.displaySearchResults(filteredPosts, query);
            } catch (error) {
                resultsDiv.innerHTML = `<div class="search-error">Search failed: ${error.message}</div>`;
            }
        }, 300);
    }

    displaySearchResults(posts, query) {
        const resultsDiv = document.getElementById('search-results');

        if (posts.length === 0) {
            resultsDiv.innerHTML = `<div class="no-results">No posts found for "${query}"</div>`;
            return;
        }

        const resultsHTML = posts.map(post => `
            <div class="search-result-item">
                <h5>${this.highlightText(post.title, query)}</h5>
                <p>${this.highlightText(post.body.substring(0, 100) + '...', query)}</p>
                <small>Post ID: ${post.id}</small>
            </div>
        `).join('');

        resultsDiv.innerHTML = resultsHTML;
    }

    highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    initializeLiveSearch() {
        // Initialize search results container
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
            searchResults.innerHTML = '<div class="search-placeholder">Start typing to search posts...</div>';
        }
    }

    // Infinite Scroll
    initializeInfiniteScroll() {
        this.currentPage = 1;
        this.isLoading = false;
    }

    async loadInitialScrollContent() {
        const container = document.querySelector('#scroll-container .scroll-content');
        if (!container) return;

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5`);
            const posts = await response.json();

            container.innerHTML = posts.map(post => this.createPostElement(post)).join('');
            this.currentPage = 2;
        } catch (error) {
            container.innerHTML = `<div class="scroll-error">Failed to load content: ${error.message}</div>`;
        }
    }

    async handleScroll() {
        const container = document.getElementById('scroll-container');
        const loadingIndicator = container.querySelector('.loading-indicator');

        if (this.isLoading) return;

        const scrollPosition = container.scrollTop + container.clientHeight;
        const scrollThreshold = container.scrollHeight - 50;

        if (scrollPosition >= scrollThreshold) {
            this.isLoading = true;
            loadingIndicator.style.display = 'block';

            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${this.currentPage}&_limit=5`);
                const posts = await response.json();

                if (posts.length > 0) {
                    const contentContainer = container.querySelector('.scroll-content');
                    posts.forEach(post => {
                        contentContainer.insertAdjacentHTML('beforeend', this.createPostElement(post));
                    });
                    this.currentPage++;
                }

                setTimeout(() => {
                    loadingIndicator.style.display = 'none';
                    this.isLoading = false;
                }, 500);

            } catch (error) {
                loadingIndicator.innerHTML = `<div class="scroll-error">Failed to load more content: ${error.message}</div>`;
                setTimeout(() => {
                    loadingIndicator.style.display = 'none';
                    this.isLoading = false;
                }, 2000);
            }
        }
    }

    createPostElement(post) {
        return `
            <div class="scroll-post">
                <h4>${post.title}</h4>
                <p>${post.body}</p>
                <small>Post ID: ${post.id} | User ID: ${post.userId}</small>
            </div>
        `;
    }

    // Form Submission
    async handleFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const feedbackDiv = document.getElementById('form-feedback');

        // Show loading state
        this.showFormFeedback(feedbackDiv, 'loading', 'Submitting form...');

        // Simulate form submission
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    timestamp: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();

            // Show success message
            this.showFormFeedback(feedbackDiv, 'success', 'Form submitted successfully!', {
                name: data.name,
                email: data.email,
                id: result.id
            });

            // Reset form
            form.reset();

        } catch (error) {
            this.showFormFeedback(feedbackDiv, 'error', 'Form submission failed', error.message);
        }
    }

    showFormFeedback(container, type, message, data = null) {
        const icons = {
            loading: 'fas fa-spinner fa-spin',
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle'
        };

        let content = `
            <div class="feedback-${type}">
                <h6><i class="${icons[type]}"></i> ${message}</h6>
        `;

        if (data) {
            if (type === 'success') {
                content += `
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>ID:</strong> ${data.id || 'N/A'}</p>
                `;
            } else {
                content += `<p>${data}</p>`;
            }
        }

        content += '</div>';
        container.innerHTML = content;

        // Auto-hide after success
        if (type === 'success') {
            setTimeout(() => {
                container.innerHTML = '';
            }, 5000);
        }
    }

    initializeFormSubmission() {
        // Form is already handled by event listener
    }

    // Real-time Updates (Polling)
    startPolling() {
        const displayDiv = document.getElementById('realtime-display');
        let updateCount = 0;

        displayDiv.innerHTML = '<div class="update-info"><i class="fas fa-sync fa-spin"></i> Starting real-time updates...</div>';

        this.pollingInterval = setInterval(async () => {
            try {
                updateCount++;
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${Math.floor(Math.random() * 100) + 1}`);
                const post = await response.json();

                const timestamp = new Date().toLocaleTimeString();

                displayDiv.innerHTML = `
                    <div class="realtime-update">
                        <div class="update-header">
                            <h6><i class="fas fa-clock"></i> Update #${updateCount} - ${timestamp}</h6>
                        </div>
                        <div class="update-content">
                            <h5>${post.title}</h5>
                            <p>${post.body.substring(0, 100)}...</p>
                            <small>Post ID: ${post.id} | User ID: ${post.userId}</small>
                        </div>
                    </div>
                `;

            } catch (error) {
                displayDiv.innerHTML = `
                    <div class="update-error">
                        <i class="fas fa-exclamation-triangle"></i>
                        Update failed: ${error.message}
                    </div>
                `;
            }
        }, 3000); // Update every 3 seconds
    }

    stopPolling() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;

            const displayDiv = document.getElementById('realtime-display');
            displayDiv.innerHTML = '<div class="update-info">Real-time updates stopped. Click "Start Updates" to resume.</div>';
        }
    }

    // Quiz Implementation
    initializeQuiz() {
        const quizData = [
            {
                question: "What does AJAX stand for?",
                options: [
                    "Asynchronous JavaScript and XML",
                    "Advanced JavaScript and XML",
                    "Automatic JavaScript and XML",
                    "Asynchronous Java and XML"
                ],
                correct: 0
            },
            {
                question: "Which method is used to create a new XMLHttpRequest object?",
                options: [
                    "new XHR()",
                    "XMLHttpRequest.create()",
                    "new XMLHttpRequest()",
                    "createXMLHttpRequest()"
                ],
                correct: 2
            },
            {
                question: "What is the main advantage of the Fetch API over XMLHttpRequest?",
                options: [
                    "Better browser support",
                    "Promise-based interface",
                    "Faster execution",
                    "Smaller file size"
                ],
                correct: 1
            },
            {
                question: "Which HTTP status code indicates a successful request?",
                options: [
                    "404",
                    "500",
                    "200",
                    "301"
                ],
                correct: 2
            },
            {
                question: "How do you handle errors in a Fetch request?",
                options: [
                    "Using try-catch only",
                    "Using .catch() method",
                    "Checking response.ok property",
                    "Both B and C"
                ],
                correct: 3
            }
        ];

        this.renderQuiz(quizData);
    }

    renderQuiz(questions) {
        const container = document.getElementById('ajax-quiz');
        if (!container) return;

        const quizHTML = questions.map((q, index) => `
            <div class="quiz-question">
                <h4>
                    <span class="question-number">${index + 1}</span>
                    ${q.question}
                </h4>
                <ul class="quiz-options">
                    ${q.options.map((option, optionIndex) => `
                        <li>
                            <label>
                                <input type="radio" name="question-${index}" value="${optionIndex}">
                                <span>${option}</span>
                            </label>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        container.innerHTML = quizHTML;
    }

    submitAjaxQuiz() {
        const questions = document.querySelectorAll('.quiz-question');
        const correctAnswers = [0, 2, 1, 2, 3]; // Correct answer indices
        let score = 0;
        let total = questions.length;

        questions.forEach((question, index) => {
            const selectedOption = question.querySelector(`input[name="question-${index}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value) === correctAnswers[index]) {
                score++;
                question.classList.add('correct');
            } else {
                question.classList.add('incorrect');
            }
        });

        this.displayQuizResults(score, total);
    }

    displayQuizResults(score, total) {
        const resultsContainer = document.getElementById('ajax-quiz-results');
        const percentage = Math.round((score / total) * 100);

        let message, icon;
        if (percentage >= 80) {
            message = "Excellent! You have a strong understanding of AJAX concepts.";
            icon = "fas fa-trophy";
        } else if (percentage >= 60) {
            message = "Good job! Review the topics you missed to improve further.";
            icon = "fas fa-thumbs-up";
        } else {
            message = "Keep studying! Review the AJAX concepts and try again.";
            icon = "fas fa-book";
        }

        resultsContainer.innerHTML = `
            <h3><i class="${icon}"></i> Quiz Results</h3>
            <p>You scored <span>${score}</span> out of <span>${total}</span> (${percentage}%)</p>
            <p>${message}</p>
        `;
        resultsContainer.style.display = 'block';

        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    resetAjaxQuiz() {
        // Reset all radio buttons
        const radios = document.querySelectorAll('#ajax-quiz input[type="radio"]');
        radios.forEach(radio => radio.checked = false);

        // Remove result classes
        const questions = document.querySelectorAll('.quiz-question');
        questions.forEach(question => {
            question.classList.remove('correct', 'incorrect');
        });

        // Hide results
        const resultsContainer = document.getElementById('ajax-quiz-results');
        resultsContainer.style.display = 'none';
    }

    // Utility method for showing results
    showResult(container, type, message, data = null) {
        const icons = {
            loading: 'fas fa-spinner fa-spin',
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };

        let content = `
            <div class="demo-${type}">
                <h6><i class="${icons[type]}"></i> ${message}</h6>
        `;

        if (data) {
            if (typeof data === 'object') {
                content += '<pre><code>' + JSON.stringify(data, null, 2) + '</code></pre>';
            } else {
                content += `<p>${data}</p>`;
            }
        }

        content += '</div>';
        container.innerHTML = content;
    }
}

// Global functions for HTML onclick events
function sendXHRRequest() {
    if (window.ajaxManager) {
        window.ajaxManager.sendXHRRequest();
    }
}

function clearXHRResult() {
    if (window.ajaxManager) {
        window.ajaxManager.clearXHRResult();
    }
}

function demonstrateFetchGET() {
    if (window.ajaxManager) {
        window.ajaxManager.demonstrateFetchGET();
    }
}

function demonstrateFetchPOST() {
    if (window.ajaxManager) {
        window.ajaxManager.demonstrateFetchPOST();
    }
}

function demonstrateFetchPUT() {
    if (window.ajaxManager) {
        window.ajaxManager.demonstrateFetchPUT();
    }
}

function demonstrateFetchDELETE() {
    if (window.ajaxManager) {
        window.ajaxManager.demonstrateFetchDELETE();
    }
}

function testNetworkError() {
    if (window.ajaxManager) {
        window.ajaxManager.testNetworkError();
    }
}

function testHTTPError() {
    if (window.ajaxManager) {
        window.ajaxManager.testHTTPError();
    }
}

function testTimeout() {
    if (window.ajaxManager) {
        window.ajaxManager.testTimeout();
    }
}

function testRetry() {
    if (window.ajaxManager) {
        window.ajaxManager.testRetry();
    }
}

function startPolling() {
    if (window.ajaxManager) {
        window.ajaxManager.startPolling();
    }
}

function stopPolling() {
    if (window.ajaxManager) {
        window.ajaxManager.stopPolling();
    }
}

function submitAjaxQuiz() {
    if (window.ajaxManager) {
        window.ajaxManager.submitAjaxQuiz();
    }
}

function resetAjaxQuiz() {
    if (window.ajaxManager) {
        window.ajaxManager.resetAjaxQuiz();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ajaxManager = new AjaxTopicManager();
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (window.ajaxManager && window.ajaxManager.pollingInterval) {
        clearInterval(window.ajaxManager.pollingInterval);
    }
});
