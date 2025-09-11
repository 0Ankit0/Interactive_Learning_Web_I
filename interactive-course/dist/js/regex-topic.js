/**
 * Regular Expressions Topic JavaScript
 * Handles interactive demonstrations and exercises for regex learning
 */

class RegexTopicHandler {
    constructor() {
        this.initializeComponents();
        this.setupEventListeners();
        this.setupHeroAnimation();
        this.setupPatternBuilder();
        this.setupMethodDemos();
        this.setupQuiz();
        this.setupTabs();
        this.loadCommonPatterns();
    }

    initializeComponents() {
        this.components = {
            heroPattern: document.getElementById('livePattern'),
            matchCount: document.getElementById('matchCount'),
            patternInput: document.getElementById('patternInput'),
            testText: document.getElementById('testText'),
            displayPattern: document.getElementById('displayPattern'),
            highlightedText: document.getElementById('highlightedText'),
            matchList: document.getElementById('matchList'),
            customPattern: document.getElementById('customPattern'),
            testInput: document.getElementById('testInput'),
            testerMatches: document.getElementById('testerMatches'),
            testerHighlight: document.getElementById('testerHighlight')
        };

        // Quiz data
        this.quizData = [
            {
                question: "What does the regex pattern \\d+ match?",
                options: [
                    "One or more digits",
                    "Exactly one digit",
                    "Zero or more digits",
                    "Any character followed by a plus sign"
                ],
                correct: 0,
                explanation: "\\d matches any digit (0-9), and + means one or more occurrences."
            },
            {
                question: "Which method returns true or false when testing a regex?",
                options: [
                    "match()",
                    "test()",
                    "exec()",
                    "search()"
                ],
                correct: 1,
                explanation: "The test() method returns a boolean indicating whether the pattern matches."
            },
            {
                question: "What does the ^ symbol represent in regex?",
                options: [
                    "Start of string",
                    "End of string",
                    "Negation inside character class",
                    "Both A and C depending on context"
                ],
                correct: 3,
                explanation: "^ means start of string when used at beginning, or negation when inside []."
            },
            {
                question: "Which pattern matches a valid email format?",
                options: [
                    "/.*@.*\\..*/",
                    "/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/",
                    "/\\w+@\\w+/",
                    "/email/"
                ],
                correct: 1,
                explanation: "This pattern ensures no spaces, proper @ placement, and domain structure."
            }
        ];

        // Common patterns for testing
        this.commonPatterns = {
            email: {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                testStrings: [
                    "user@example.com",
                    "test.email@domain.org",
                    "invalid.email",
                    "@domain.com",
                    "user@domain"
                ]
            },
            phone: {
                pattern: /^(\+1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
                testStrings: [
                    "(555) 123-4567",
                    "555.123.4567",
                    "+1 555 123 4567",
                    "123-456",
                    "555-1234567"
                ]
            },
            password: {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                testStrings: [
                    "MyPass123!",
                    "Secure$456",
                    "password",
                    "123456",
                    "Password1"
                ]
            },
            url: {
                pattern: /^https?:\/\/(?:[-\w.])+(?:[:\d]+)?(?:\/(?:[\w/_.])*)?(?:\?(?:[\w&=%.])*)?(?:#(?:[\w.])*)?$/,
                testStrings: [
                    "https://example.com",
                    "http://site.com:8080/path",
                    "ftp://example.com",
                    "not-a-url",
                    "https://site.com/path?query=value"
                ]
            },
            date: {
                pattern: /(\d{4})-(\d{2})-(\d{2})/g,
                testStrings: [
                    "The events are on 2023-12-25 and 2024-01-15",
                    "No dates here",
                    "2023/12/25",
                    "25-12-2023"
                ]
            },
            hashtag: {
                pattern: /#\w+/g,
                testStrings: [
                    "Learning #JavaScript and #RegEx is fun! #coding",
                    "No hashtags here",
                    "#single",
                    "Almost #tag but not#here"
                ]
            },
            currency: {
                pattern: /\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?/g,
                testStrings: [
                    "Prices: $29.99, $1,234.56, $10,000",
                    "No prices here",
                    "$5",
                    "$1234567"
                ]
            },
            html: {
                pattern: /<([a-z]+)(\s[^>]*)?>.*?<\/\1>/gi,
                testStrings: [
                    "<div class='test'>Content</div> <p>Paragraph</p>",
                    "No HTML here",
                    "<span>Test</span>",
                    "<div>Unclosed tag"
                ]
            }
        };
    }

    setupEventListeners() {
        // Pattern builder events
        if (this.components.patternInput) {
            this.components.patternInput.addEventListener('input', () => this.updatePatternBuilder());
        }
        if (this.components.testText) {
            this.components.testText.addEventListener('input', () => this.updatePatternBuilder());
        }

        // Flags checkboxes
        const flags = ['flagG', 'flagI', 'flagM'];
        flags.forEach(flagId => {
            const checkbox = document.getElementById(flagId);
            if (checkbox) {
                checkbox.addEventListener('change', () => this.updatePatternBuilder());
            }
        });

        // Method demos
        document.querySelectorAll('.demo-input').forEach(input => {
            input.addEventListener('input', (e) => this.updateMethodDemo(e.target));
        });

        // Pattern tester
        if (this.components.customPattern) {
            this.components.customPattern.addEventListener('input', () => this.updatePatternTester());
        }
        if (this.components.testInput) {
            this.components.testInput.addEventListener('input', () => this.updatePatternTester());
        }

        // Pattern test buttons
        document.querySelectorAll('.test-pattern-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.testCommonPattern(e.target.dataset.pattern));
        });

        // Formatter demos
        document.querySelectorAll('.demo-formatter input').forEach(input => {
            input.addEventListener('input', (e) => this.updateFormatter(e.target));
        });

        // Quiz events
        const submitBtn = document.querySelector('.quiz-submit');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitQuiz());
        }

        const retryBtn = document.querySelector('.quiz-retry');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => this.resetQuiz());
        }

        // Test pattern and clear buttons
        const testPatternBtn = document.getElementById('testPatternBtn');
        if (testPatternBtn) {
            testPatternBtn.addEventListener('click', () => this.updatePatternTester());
        }

        const clearTesterBtn = document.getElementById('clearTesterBtn');
        if (clearTesterBtn) {
            clearTesterBtn.addEventListener('click', () => this.clearPatternTester());
        }
    }

    setupHeroAnimation() {
        // Animate the hero regex pattern
        const patterns = [
            { pattern: '/[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}/g', description: 'Email Address Pattern', matches: 2 },
            { pattern: '/\\b\\d{3}-\\d{3}-\\d{4}\\b/g', description: 'Phone Number Pattern', matches: 1 },
            { pattern: '/\\$\\d+\\.\\d{2}/g', description: 'Currency Pattern', matches: 3 },
            { pattern: '/#\\w+/g', description: 'Hashtag Pattern', matches: 4 }
        ];

        let currentIndex = 0;

        const updatePattern = () => {
            const current = patterns[currentIndex];
            if (this.components.heroPattern) {
                this.components.heroPattern.textContent = current.pattern;
            }

            const descElement = document.querySelector('.pattern-description');
            if (descElement) {
                descElement.textContent = current.description;
            }

            if (this.components.matchCount) {
                this.components.matchCount.textContent = current.matches;
            }

            currentIndex = (currentIndex + 1) % patterns.length;
        };

        // Update pattern every 4 seconds
        setInterval(updatePattern, 4000);
    }

    setupPatternBuilder() {
        this.updatePatternBuilder();
    }

    updatePatternBuilder() {
        const pattern = this.components.patternInput?.value || '';
        const text = this.components.testText?.value || '';

        // Get flags
        const flagG = document.getElementById('flagG')?.checked;
        const flagI = document.getElementById('flagI')?.checked;
        const flagM = document.getElementById('flagM')?.checked;

        let flags = '';
        if (flagG) flags += 'g';
        if (flagI) flags += 'i';
        if (flagM) flags += 'm';

        try {
            const regex = new RegExp(pattern, flags);
            const matches = text.match(regex) || [];

            // Update display pattern
            if (this.components.displayPattern) {
                this.components.displayPattern.textContent = `/${pattern}/${flags}`;
            }

            // Update match count
            if (this.components.matchCount) {
                this.components.matchCount.textContent = matches.length;
            }

            // Update match list
            if (this.components.matchList) {
                this.components.matchList.textContent = JSON.stringify(matches);
            }

            // Highlight matches in text
            if (this.components.highlightedText) {
                let highlightedText = text;
                if (matches.length > 0) {
                    // Sort matches by length (descending) to avoid nested replacements
                    const sortedMatches = [...new Set(matches)].sort((a, b) => b.length - a.length);
                    sortedMatches.forEach(match => {
                        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        const matchRegex = new RegExp(escapeRegex(match), flagI ? 'gi' : 'g');
                        highlightedText = highlightedText.replace(matchRegex, `<span class="regex-match">${match}</span>`);
                    });
                }
                this.components.highlightedText.innerHTML = highlightedText;
            }

        } catch (error) {
            // Handle invalid regex
            if (this.components.displayPattern) {
                this.components.displayPattern.textContent = `/${pattern}/${flags} (Invalid)`;
            }
            if (this.components.matchCount) {
                this.components.matchCount.textContent = '0';
            }
            if (this.components.matchList) {
                this.components.matchList.textContent = 'Invalid pattern';
            }
            if (this.components.highlightedText) {
                this.components.highlightedText.textContent = text;
            }
        }
    }

    setupMethodDemos() {
        document.querySelectorAll('.demo-input').forEach(input => {
            this.updateMethodDemo(input);
        });
    }

    updateMethodDemo(input) {
        const method = input.dataset.method;
        const patternStr = input.dataset.pattern;
        const replacement = input.dataset.replacement;
        const value = input.value;

        const resultElement = input.parentElement.querySelector('.result-value');
        if (!resultElement) return;

        try {
            // Parse pattern string to extract pattern and flags
            const match = patternStr.match(/^\/(.*)\/([gimuy]*)$/);
            if (!match) throw new Error('Invalid pattern format');

            const [, pattern, flags] = match;
            const regex = new RegExp(pattern, flags);

            let result;
            switch (method) {
                case 'test':
                    result = regex.test(value);
                    break;
                case 'match':
                    const matches = value.match(regex);
                    result = matches ? JSON.stringify(matches) : 'null';
                    break;
                case 'replace':
                    result = JSON.stringify(value.replace(regex, replacement || 'JavaScript'));
                    break;
                case 'search':
                    result = value.search(regex);
                    break;
                case 'split':
                    const parts = value.split(regex);
                    result = JSON.stringify(parts);
                    break;
                case 'exec':
                    const execResult = regex.exec(value);
                    result = execResult ? JSON.stringify(execResult) : 'null';
                    break;
                default:
                    result = 'Unknown method';
            }

            resultElement.textContent = result;
            resultElement.className = 'result-value success';
        } catch (error) {
            resultElement.textContent = 'Error: ' + error.message;
            resultElement.className = 'result-value error';
        }
    }

    setupTabs() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                const tabContainer = e.target.closest('.reference-tabs, .pattern-tabs');

                // Remove active class from all buttons in this container
                tabContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');

                // Hide all panels and show the selected one
                const contentContainer = tabContainer.nextElementSibling;
                contentContainer.querySelectorAll('.tab-panel').forEach(panel => {
                    panel.classList.remove('active');
                });

                const targetPanel = document.getElementById(`${tabName}-panel`);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    loadCommonPatterns() {
        // Add interactive functionality to common patterns
        this.updatePatternTester();
    }

    testCommonPattern(patternName) {
        const patternData = this.commonPatterns[patternName];
        if (!patternData) return;

        // Create a modal or alert to show test results
        const results = patternData.testStrings.map(testStr => {
            const isMatch = patternData.pattern.test(testStr);
            return { text: testStr, match: isMatch };
        });

        // Display results in console for now (could be enhanced with UI)
        console.log(`Testing pattern: ${patternData.pattern}`);
        console.log('Results:', results);

        // You could also update a display element here
        alert(`Pattern: ${patternData.pattern}\n\nTest Results:\n` +
            results.map(r => `${r.match ? '✓' : '✗'} ${r.text}`).join('\n'));
    }

    updatePatternTester() {
        const patternInput = this.components.customPattern?.value || '';
        const testInput = this.components.testInput?.value || '';

        try {
            // Parse pattern - handle both /pattern/flags and plain pattern formats
            let regex;
            if (patternInput.startsWith('/') && patternInput.lastIndexOf('/') > 0) {
                const lastSlash = patternInput.lastIndexOf('/');
                const pattern = patternInput.slice(1, lastSlash);
                const flags = patternInput.slice(lastSlash + 1);
                regex = new RegExp(pattern, flags);
            } else {
                regex = new RegExp(patternInput, 'g');
            }

            const matches = testInput.match(regex) || [];

            // Update matches display
            if (this.components.testerMatches) {
                this.components.testerMatches.innerHTML =
                    `Matches: <strong>${matches.length}</strong> - ${JSON.stringify(matches)}`;
            }

            // Highlight matches
            if (this.components.testerHighlight) {
                let highlightedText = testInput;
                if (matches.length > 0) {
                    const uniqueMatches = [...new Set(matches)].sort((a, b) => b.length - a.length);
                    uniqueMatches.forEach(match => {
                        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        const matchRegex = new RegExp(escapeRegex(match), 'g');
                        highlightedText = highlightedText.replace(matchRegex, `<span class="match">${match}</span>`);
                    });
                }
                this.components.testerHighlight.innerHTML = highlightedText;
            }

        } catch (error) {
            if (this.components.testerMatches) {
                this.components.testerMatches.innerHTML = `<span style="color: #e74c3c;">Invalid pattern: ${error.message}</span>`;
            }
            if (this.components.testerHighlight) {
                this.components.testerHighlight.textContent = testInput;
            }
        }
    }

    clearPatternTester() {
        if (this.components.customPattern) {
            this.components.customPattern.value = '';
        }
        if (this.components.testInput) {
            this.components.testInput.value = '';
        }
        this.updatePatternTester();
    }

    updateFormatter(input) {
        const formatterType = input.parentElement.dataset.type;
        const value = input.value;
        const resultElement = input.parentElement.querySelector('.format-result');

        if (!resultElement) return;

        let result;
        try {
            switch (formatterType) {
                case 'titlecase':
                    result = value.replace(/\b\w+/g, (word) =>
                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    );
                    break;
                case 'spaces':
                    result = value.replace(/\s+/g, ' ').trim();
                    break;
                case 'phone':
                    const phoneMatch = value.match(/(\d{3})(\d{3})(\d{4})/);
                    result = phoneMatch ? `(${phoneMatch[1]}) ${phoneMatch[2]}-${phoneMatch[3]}` : value;
                    break;
                case 'mask':
                    const maskMatch = value.match(/(\d{4})\d{4}(\d{4})/);
                    result = maskMatch ? `${maskMatch[1]}****${maskMatch[2]}` : value;
                    break;
                default:
                    result = value;
            }
            resultElement.textContent = result;
        } catch (error) {
            resultElement.textContent = 'Format error';
        }
    }

    setupQuiz() {
        this.quizScore = 0;
        this.quizAnswered = false;
    }

    submitQuiz() {
        if (this.quizAnswered) return;

        const questions = document.querySelectorAll('.quiz-question');
        let score = 0;
        const totalQuestions = this.quizData.length;

        questions.forEach((question, index) => {
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            const correctAnswer = this.quizData[index].correct;

            // Remove previous styling
            question.querySelectorAll('li').forEach(li => {
                li.classList.remove('correct', 'incorrect', 'selected');
            });

            if (selectedOption) {
                const selectedValue = parseInt(selectedOption.value.charCodeAt(0) - 97); // Convert 'a', 'b', 'c', 'd' to 0, 1, 2, 3
                const selectedLi = selectedOption.closest('li');
                selectedLi.classList.add('selected');

                if (selectedValue === correctAnswer) {
                    selectedLi.classList.add('correct');
                    score++;
                } else {
                    selectedLi.classList.add('incorrect');
                }
            }

            // Highlight correct answer
            const correctLi = question.querySelectorAll('li')[correctAnswer];
            if (correctLi && !correctLi.classList.contains('selected')) {
                correctLi.classList.add('correct');
            }

            // Disable all radio buttons
            question.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.disabled = true;
            });
        });

        this.quizScore = score;
        this.quizAnswered = true;

        // Show results
        const percentage = Math.round((score / totalQuestions) * 100);
        document.getElementById('score').textContent = score;
        document.getElementById('percentage').textContent = percentage;

        const resultsSection = document.querySelector('.quiz-results');
        resultsSection.style.display = 'block';

        // Update buttons
        document.querySelector('.quiz-submit').style.display = 'none';
        document.querySelector('.quiz-retry').style.display = 'inline-block';

        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    resetQuiz() {
        this.quizAnswered = false;
        this.quizScore = 0;

        // Reset all questions
        document.querySelectorAll('.quiz-question').forEach(question => {
            question.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.checked = false;
                radio.disabled = false;
            });
            question.querySelectorAll('li').forEach(li => {
                li.classList.remove('correct', 'incorrect', 'selected');
            });
        });

        // Hide results and reset buttons
        document.querySelector('.quiz-results').style.display = 'none';
        document.querySelector('.quiz-submit').style.display = 'inline-block';
        document.querySelector('.quiz-retry').style.display = 'none';

        // Scroll to first question
        document.querySelector('.quiz-question').scrollIntoView({ behavior: 'smooth' });
    }

    // Utility method for escaping regex special characters
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Method to create interactive regex examples
    createInteractiveExample(pattern, testStrings, container) {
        const exampleDiv = document.createElement('div');
        exampleDiv.className = 'interactive-example';

        const patternDisplay = document.createElement('div');
        patternDisplay.className = 'pattern-display';
        patternDisplay.textContent = pattern;

        const testResults = document.createElement('div');
        testResults.className = 'test-results';

        testStrings.forEach(testStr => {
            const regex = new RegExp(pattern);
            const isMatch = regex.test(testStr);

            const resultItem = document.createElement('div');
            resultItem.className = `result-item ${isMatch ? 'match' : 'no-match'}`;
            resultItem.innerHTML = `<span class="result-icon">${isMatch ? '✓' : '✗'}</span> ${testStr}`;

            testResults.appendChild(resultItem);
        });

        exampleDiv.appendChild(patternDisplay);
        exampleDiv.appendChild(testResults);

        if (container) {
            container.appendChild(exampleDiv);
        }

        return exampleDiv;
    }
}

// Initialize the topic handler when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RegexTopicHandler();
});

// Additional utility functions for regex operations
const RegexUtils = {
    // Common validation patterns
    patterns: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^(\+1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
        url: /^https?:\/\/(?:[-\w.])+(?:[:\d]+)?(?:\/(?:[\w/_.])*)?(?:\?(?:[\w&=%.])*)?(?:#(?:[\w.])*)?$/,
        strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        zipCode: /^\d{5}(-\d{4})?$/,
        creditCard: /^\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}$/,
        ipAddress: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    },

    // Validate input using common patterns
    validate(input, patternName) {
        const pattern = this.patterns[patternName];
        return pattern ? pattern.test(input) : false;
    },

    // Extract all matches from text
    extractMatches(text, pattern, flags = 'g') {
        const regex = new RegExp(pattern, flags);
        return text.match(regex) || [];
    },

    // Replace matches with callback function
    replaceMatches(text, pattern, replacer, flags = 'g') {
        const regex = new RegExp(pattern, flags);
        return text.replace(regex, replacer);
    },

    // Highlight matches in HTML
    highlightMatches(text, pattern, flags = 'gi', className = 'highlight') {
        const regex = new RegExp(pattern, flags);
        return text.replace(regex, `<span class="${className}">$&</span>`);
    },

    // Escape special regex characters
    escape(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    // Parse regex string to extract pattern and flags
    parseRegexString(regexStr) {
        const match = regexStr.match(/^\/(.*)\/([gimuy]*)$/);
        if (match) {
            return { pattern: match[1], flags: match[2] };
        }
        return { pattern: regexStr, flags: '' };
    }
};

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RegexTopicHandler, RegexUtils };
}
