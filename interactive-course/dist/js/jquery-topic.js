// jQuery Basics Topic Interactive Features
$(document).ready(function () {
    // Initialize all interactive components
    initializeTabs();
    initializeSelectorDemo();
    initializeEventDemo();
    initializeAnimationDemo();
    initializeAjaxDemo();
    initializeQuiz();
    addDemoStyles();
});

// Tab functionality
function initializeTabs() {
    $('.tab-btn').click(function () {
        const tabId = $(this).data('tab');
        const parentContainer = $(this).closest('.method-tabs, .example-tabs');
        const contentContainer = parentContainer.siblings('.tab-content');

        // Update active tab button
        parentContainer.find('.tab-btn').removeClass('active');
        $(this).addClass('active');

        // Update active tab panel
        contentContainer.find('.tab-panel').removeClass('active');
        contentContainer.find('#' + tabId + '-panel').addClass('active');
    });
}

// Selector demo functionality
function initializeSelectorDemo() {
    $('#testSelector').click(function () {
        const selector = $('#selectorInput').val().trim();
        const resultSpan = $('#selectorResult');

        if (!selector) {
            resultSpan.text('Please enter a selector');
            return;
        }

        try {
            // Reset all demo items
            $('.demo-item').removeClass('selected-demo');

            // Try to select elements
            const elements = $(selector);

            if (elements.length > 0) {
                elements.addClass('selected-demo');
                resultSpan.html(`Selected <strong>${elements.length}</strong> element(s): ${elements.map(function () {
                    return this.tagName.toLowerCase() + (this.id ? '#' + this.id : '') +
                        (this.className ? '.' + this.className.split(' ').join('.') : '');
                }).get().join(', ')}`);
            } else {
                resultSpan.text('No elements found with this selector');
            }
        } catch (error) {
            resultSpan.text('Invalid selector syntax');
        }
    });

    $('#resetDemo').click(function () {
        $('.demo-item').removeClass('selected-demo');
        $('#selectorInput').val('.demo-item');
        $('#selectorResult').text('Enter a selector to see results');
    });

    // Allow Enter key to test selector
    $('#selectorInput').keypress(function (e) {
        if (e.which === 13) {
            $('#testSelector').click();
        }
    });
}

// Event demo functionality
function initializeEventDemo() {
    let eventCounter = 0;

    function logEvent(eventType, element, details = '') {
        eventCounter++;
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `<li><span class="event-number">${eventCounter}</span> 
                         <span class="event-time">[${timestamp}]</span> 
                         <strong>${eventType}</strong> on ${element} ${details}</li>`;

        $('#logList').prepend(logEntry);

        // Keep only last 10 events
        if ($('#logList li').length > 10) {
            $('#logList li').last().remove();
        }
    }

    // Click event demo
    $('#clickBtn').click(function () {
        $(this).animate({ backgroundColor: '#007bff' }, 200).animate({ backgroundColor: '#6c757d' }, 200);
        logEvent('Click', 'Button', '- Background color animated');
    });

    // Hover event demo
    $('#hoverBtn').hover(
        function () {
            $(this).addClass('hovered');
            logEvent('Mouse Enter', 'Hover Button', '- Added hover class');
        },
        function () {
            $(this).removeClass('hovered');
            logEvent('Mouse Leave', 'Hover Button', '- Removed hover class');
        }
    );

    // Input event demo
    $('#typeInput').on('input', function () {
        const value = $(this).val();
        logEvent('Input', 'Text Input', `- Current value: "${value}"`);
    });

    // Clear log functionality
    $('#clearLog').click(function () {
        $('#logList').html('<li>Events will appear here...</li>');
        eventCounter = 0;
        logEvent('Clear', 'Log', '- Event log cleared');
    });

    // Dynamic button functionality
    $('#addDynamicBtn').click(function () {
        const buttonCount = $('.dynamic-btn').length + 1;
        const newButton = `<button class="demo-btn dynamic-btn">Dynamic Button ${buttonCount}</button>`;
        $('.event-playground').append(newButton);
        logEvent('Add', 'Dynamic Button', `- Button ${buttonCount} added`);
    });

    // Event delegation for dynamic buttons
    $(document).on('click', '.dynamic-btn', function () {
        const buttonText = $(this).text();
        $(this).fadeOut(300, function () {
            $(this).remove();
            logEvent('Click & Remove', 'Dynamic Button', `- ${buttonText} removed`);
        });
    });
}

// Animation demo functionality
function initializeAnimationDemo() {
    // Animation sequence function
    window.animateSequence = function () {
        $('#animBox')
            .animate({ left: '100px' }, 500)
            .animate({ opacity: 0.5 }, 300)
            .animate({ width: '200px', height: '100px' }, 400)
            .animate({ left: '0px' }, 500)
            .animate({ opacity: 1 }, 300)
            .animate({ width: '150px', height: '150px' }, 400);
    };

    // Add some visual feedback for animation controls
    $('.animation-controls .btn').click(function () {
        $(this).addClass('btn-pressed');
        setTimeout(() => {
            $(this).removeClass('btn-pressed');
        }, 150);
    });
}

// AJAX demo functionality
function initializeAjaxDemo() {
    const $results = $('#ajaxResults .ajax-content');
    const $loading = $('#ajaxResults .loading');

    function showLoading() {
        $loading.show();
        $results.hide();
    }

    function hideLoading() {
        $loading.hide();
        $results.show();
    }

    function displayError(message) {
        $results.html(`
            <div class="ajax-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h4>Error</h4>
                <p>${message}</p>
            </div>
        `);
    }

    // Load users demo
    $('#loadUsers').click(function () {
        showLoading();

        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET',
            timeout: 10000
        })
            .done(function (users) {
                let html = '<div class="ajax-success"><h4><i class="fas fa-users"></i> Users Loaded</h4><div class="user-grid">';
                users.slice(0, 6).forEach(user => {
                    html += `
                    <div class="user-card">
                        <div class="user-avatar">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <h5>${user.name}</h5>
                        <p><i class="fas fa-envelope"></i> ${user.email}</p>
                        <p><i class="fas fa-globe"></i> ${user.website}</p>
                    </div>
                `;
                });
                html += '</div></div>';
                $results.html(html);
            })
            .fail(function (xhr, status, error) {
                displayError(`Failed to load users: ${error || status}`);
            })
            .always(function () {
                hideLoading();
            });
    });

    // Load posts demo
    $('#loadPosts').click(function () {
        showLoading();

        $.getJSON('https://jsonplaceholder.typicode.com/posts?_limit=5')
            .done(function (posts) {
                let html = '<div class="ajax-success"><h4><i class="fas fa-file-alt"></i> Posts Loaded</h4><div class="post-list">';
                posts.forEach(post => {
                    html += `
                    <div class="post-item">
                        <h5>${post.title}</h5>
                        <p>${post.body.substring(0, 100)}...</p>
                        <small><i class="fas fa-user"></i> User ID: ${post.userId}</small>
                    </div>
                `;
                });
                html += '</div></div>';
                $results.html(html);
            })
            .fail(function (xhr, status, error) {
                displayError(`Failed to load posts: ${error || status}`);
            })
            .always(function () {
                hideLoading();
            });
    });

    // Load quote demo
    $('#loadQuote').click(function () {
        showLoading();

        // Using a different API for quotes
        $.ajax({
            url: 'https://api.quotable.io/random',
            method: 'GET',
            timeout: 10000
        })
            .done(function (data) {
                const html = `
                <div class="ajax-success">
                    <h4><i class="fas fa-quote-left"></i> Random Quote</h4>
                    <div class="quote-container">
                        <blockquote class="quote-text">"${data.content}"</blockquote>
                        <cite class="quote-author">— ${data.author}</cite>
                        <div class="quote-meta">
                            <span class="quote-length"><i class="fas fa-text-width"></i> ${data.length} characters</span>
                            <span class="quote-tags"><i class="fas fa-tags"></i> ${data.tags.join(', ')}</span>
                        </div>
                    </div>
                </div>
            `;
                $results.html(html);
            })
            .fail(function (xhr, status, error) {
                displayError(`Failed to load quote: ${error || status}`);
            })
            .always(function () {
                hideLoading();
            });
    });

    // Clear results
    $('#clearAjaxData').click(function () {
        $results.html('<p class="ajax-placeholder">Click a button above to load data via AJAX</p>');
        hideLoading();
    });
}

// Quiz functionality
function initializeQuiz() {
    const quizAnswers = {
        q1: 'b', // $
        q2: 'a', // .text()
        q3: 'b', // .on()
        q4: 'b'  // The DOM is fully constructed
    };

    $('.quiz-submit').click(function () {
        let score = 0;
        let totalQuestions = Object.keys(quizAnswers).length;

        // Check answers
        $.each(quizAnswers, function (question, correctAnswer) {
            const selectedAnswer = $(`input[name="${question}"]:checked`).val();
            const questionDiv = $(`input[name="${question}"]`).closest('.quiz-question');

            // Remove previous styling
            questionDiv.removeClass('correct incorrect');

            if (selectedAnswer === correctAnswer) {
                score++;
                questionDiv.addClass('correct');
            } else {
                questionDiv.addClass('incorrect');
                // Show correct answer
                questionDiv.find(`input[value="${correctAnswer}"]`).closest('li').addClass('correct-answer');
            }
        });

        // Calculate percentage
        const percentage = Math.round((score / totalQuestions) * 100);

        // Show results
        $('#score').text(score);
        $('#percentage').text(percentage);
        $('.quiz-results').slideDown();

        // Show retry button, hide submit button
        $('.quiz-submit').hide();
        $('.quiz-retry').show();

        // Scroll to results
        $('.quiz-results')[0].scrollIntoView({ behavior: 'smooth' });

        // Add celebration effect for high scores
        if (percentage >= 80) {
            celebrateScore();
        }
    });

    $('.quiz-retry').click(function () {
        // Reset quiz
        $('.quiz-question').removeClass('correct incorrect');
        $('.quiz-question li').removeClass('correct-answer');
        $('input[type="radio"]').prop('checked', false);
        $('.quiz-results').slideUp();
        $('.quiz-submit').show();
        $('.quiz-retry').hide();

        // Scroll to top of quiz
        $('.quiz-section')[0].scrollIntoView({ behavior: 'smooth' });
    });
}

// Add demo-specific styles
function addDemoStyles() {
    if ($('#jquery-demo-styles').length === 0) {
        $('<style id="jquery-demo-styles">').text(`
            .selected-demo {
                background-color: #fff3cd !important;
                border: 2px solid #856404 !important;
                box-shadow: 0 0 10px rgba(133, 100, 4, 0.5) !important;
                transform: scale(1.05);
                transition: all 0.3s ease;
            }
            
            .demo-element.bordered {
                border: 3px solid #007bff !important;
                border-radius: 8px;
            }
            
            .demo-element.large-text {
                font-size: 24px !important;
                font-weight: bold;
            }
            
            .demo-btn.hovered {
                background-color: #28a745 !important;
                color: white;
                transform: scale(1.1);
            }
            
            .btn-pressed {
                transform: scale(0.95) !important;
                transition: transform 0.1s ease !important;
            }
            
            .event-number {
                background: #007bff;
                color: white;
                padding: 2px 6px;
                border-radius: 3px;
                font-size: 0.8em;
                margin-right: 5px;
            }
            
            .event-time {
                color: #6c757d;
                font-size: 0.9em;
                margin-right: 5px;
            }
            
            .user-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-top: 15px;
            }
            
            .user-card {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                border: 1px solid #dee2e6;
            }
            
            .user-avatar i {
                font-size: 2em;
                color: #007bff;
                margin-bottom: 10px;
            }
            
            .post-list {
                margin-top: 15px;
            }
            
            .post-item {
                background: #f8f9fa;
                padding: 15px;
                margin-bottom: 10px;
                border-radius: 8px;
                border-left: 4px solid #007bff;
            }
            
            .post-item h5 {
                color: #007bff;
                margin-bottom: 8px;
                text-transform: capitalize;
            }
            
            .quote-container {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin-top: 15px;
                border-left: 4px solid #28a745;
            }
            
            .quote-text {
                font-size: 1.2em;
                font-style: italic;
                margin-bottom: 15px;
                line-height: 1.6;
            }
            
            .quote-author {
                font-weight: bold;
                color: #28a745;
                display: block;
                margin-bottom: 10px;
            }
            
            .quote-meta {
                display: flex;
                gap: 20px;
                font-size: 0.9em;
                color: #6c757d;
            }
            
            .ajax-error {
                background: #f8d7da;
                color: #721c24;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
            }
            
            .ajax-success {
                background: #d1edff;
                padding: 20px;
                border-radius: 8px;
            }
            
            .ajax-placeholder {
                text-align: center;
                color: #6c757d;
                font-style: italic;
                padding: 40px;
            }
            
            .quiz-question.correct {
                background: #d4edda;
                border-left: 4px solid #28a745;
                padding-left: 15px;
            }
            
            .quiz-question.incorrect {
                background: #f8d7da;
                border-left: 4px solid #dc3545;
                padding-left: 15px;
            }
            
            .quiz-question .correct-answer {
                background: #d4edda !important;
                border-radius: 4px;
            }
        `).appendTo('head');
    }
}

// Celebration effect for high quiz scores
function celebrateScore() {
    // Create confetti effect
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = $('<div>').css({
                position: 'fixed',
                left: Math.random() * window.innerWidth + 'px',
                top: '-10px',
                width: '10px',
                height: '10px',
                background: colors[Math.floor(Math.random() * colors.length)],
                'z-index': '9999',
                'border-radius': '50%',
                'pointer-events': 'none'
            });

            $('body').append(confetti);

            confetti.animate({
                top: window.innerHeight + 10 + 'px',
                left: '+=' + (Math.random() * 200 - 100) + 'px'
            }, 3000, function () {
                $(this).remove();
            });
        }, i * 50);
    }
}
