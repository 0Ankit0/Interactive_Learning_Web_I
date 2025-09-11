/**
 * Typography Topic Interactive Features
 * Handles font pairing, readability testing, and typography demonstrations
 */

class TypographyTopic {
    constructor() {
        this.initializeEventListeners();
        this.initializeFontPairing();
        this.initializeReadabilityTester();
        this.initializeQuiz();
        this.setupTypographyControls();
    }

    initializeEventListeners() {
        // Font size control
        const baseSizeSlider = document.getElementById('base-size-slider');
        if (baseSizeSlider) {
            baseSizeSlider.addEventListener('input', (e) => {
                this.updateFontSizes(e.target.value);
            });
        }

        // Line height control
        const lineHeightSlider = document.getElementById('line-height-slider');
        if (lineHeightSlider) {
            lineHeightSlider.addEventListener('input', (e) => {
                this.updateLineHeight(e.target.value);
            });
        }

        // Font pairing controls
        const headingFontSelect = document.getElementById('heading-font');
        const bodyFontSelect = document.getElementById('body-font');

        if (headingFontSelect) {
            headingFontSelect.addEventListener('change', () => this.updateFontPairing());
        }

        if (bodyFontSelect) {
            bodyFontSelect.addEventListener('change', () => this.updateFontPairing());
        }

        // Readability tester controls
        this.setupReadabilityControls();

        // Make randomize function global
        window.randomizeFonts = () => this.randomizeFonts();
    }

    setupTypographyControls() {
        // Initialize font size display
        this.updateFontSizes(16);
        this.updateLineHeight(1.5);
    }

    updateFontSizes(baseSize) {
        const baseSizeValue = document.getElementById('base-size-value');
        const hierarchyDemo = document.querySelector('.hierarchy-demo');

        if (baseSizeValue) {
            baseSizeValue.textContent = `${baseSize}px`;
        }

        if (hierarchyDemo) {
            const h1 = hierarchyDemo.querySelector('.demo-h1');
            const h2 = hierarchyDemo.querySelector('.demo-h2');
            const h3 = hierarchyDemo.querySelector('.demo-h3');
            const p = hierarchyDemo.querySelector('.demo-p');
            const small = hierarchyDemo.querySelector('.demo-small');

            if (h1) h1.style.fontSize = `${baseSize * 2.5}px`;
            if (h2) h2.style.fontSize = `${baseSize * 2}px`;
            if (h3) h3.style.fontSize = `${baseSize * 1.5}px`;
            if (p) p.style.fontSize = `${baseSize}px`;
            if (small) small.style.fontSize = `${baseSize * 0.875}px`;
        }
    }

    updateLineHeight(lineHeight) {
        const lineHeightValue = document.getElementById('line-height-value');
        const spacingDemo = document.getElementById('spacing-demo');

        if (lineHeightValue) {
            lineHeightValue.textContent = lineHeight;
        }

        if (spacingDemo) {
            spacingDemo.style.lineHeight = lineHeight;
        }
    }

    // Font Pairing functionality
    initializeFontPairing() {
        this.fontCombinations = [
            { heading: 'Playfair Display', body: 'Inter' },
            { heading: 'Oswald', body: 'Open Sans' },
            { heading: 'Merriweather', body: 'Roboto' },
            { heading: 'Inter', body: 'Georgia' },
            { heading: 'Roboto', body: 'Lora' }
        ];

        this.updateFontPairing();
    }

    updateFontPairing() {
        const headingFont = document.getElementById('heading-font')?.value || 'Playfair Display';
        const bodyFont = document.getElementById('body-font')?.value || 'Inter';
        const preview = document.getElementById('pairing-preview');

        if (preview) {
            const heading = preview.querySelector('.preview-heading');
            const subheading = preview.querySelector('.preview-subheading');
            const bodyText = preview.querySelectorAll('.preview-body');

            if (heading) {
                heading.style.fontFamily = `'${headingFont}', sans-serif`;
            }

            if (subheading) {
                subheading.style.fontFamily = `'${headingFont}', sans-serif`;
            }

            bodyText.forEach(p => {
                p.style.fontFamily = `'${bodyFont}', sans-serif`;
            });
        }

        // Update font display values
        this.displayFontInfo(headingFont, bodyFont);
    }

    displayFontInfo(headingFont, bodyFont) {
        // Could add font information display here
        console.log(`Pairing: ${headingFont} + ${bodyFont}`);
    }

    randomizeFonts() {
        const randomCombination = this.fontCombinations[Math.floor(Math.random() * this.fontCombinations.length)];

        const headingSelect = document.getElementById('heading-font');
        const bodySelect = document.getElementById('body-font');

        if (headingSelect) {
            headingSelect.value = randomCombination.heading;
        }

        if (bodySelect) {
            bodySelect.value = randomCombination.body;
        }

        this.updateFontPairing();

        // Add visual feedback
        const randomizeBtn = document.querySelector('.randomize-btn');
        if (randomizeBtn) {
            randomizeBtn.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                randomizeBtn.style.transform = 'rotate(0deg)';
            }, 300);
        }
    }

    // Readability Tester functionality
    initializeReadabilityTester() {
        this.readabilityFactors = {
            fontSize: 16,
            lineHeight: 1.5,
            lineLength: 65,
            contrast: 'high'
        };

        this.updateReadabilityTest();
    }

    setupReadabilityControls() {
        const testSize = document.getElementById('test-size');
        const testHeight = document.getElementById('test-height');
        const testWidth = document.getElementById('test-width');
        const testContrast = document.getElementById('test-contrast');

        if (testSize) {
            testSize.addEventListener('input', (e) => {
                this.readabilityFactors.fontSize = parseInt(e.target.value);
                this.updateReadabilityTest();
            });
        }

        if (testHeight) {
            testHeight.addEventListener('input', (e) => {
                this.readabilityFactors.lineHeight = parseFloat(e.target.value);
                this.updateReadabilityTest();
            });
        }

        if (testWidth) {
            testWidth.addEventListener('input', (e) => {
                this.readabilityFactors.lineLength = parseInt(e.target.value);
                this.updateReadabilityTest();
            });
        }

        if (testContrast) {
            testContrast.addEventListener('change', (e) => {
                this.readabilityFactors.contrast = e.target.value;
                this.updateReadabilityTest();
            });
        }
    }

    updateReadabilityTest() {
        const testContent = document.getElementById('test-content');
        const testSizeValue = document.getElementById('test-size-value');
        const testHeightValue = document.getElementById('test-height-value');
        const testWidthValue = document.getElementById('test-width-value');

        // Update display values
        if (testSizeValue) testSizeValue.textContent = `${this.readabilityFactors.fontSize}px`;
        if (testHeightValue) testHeightValue.textContent = this.readabilityFactors.lineHeight;
        if (testWidthValue) testWidthValue.textContent = `${this.readabilityFactors.lineLength}ch`;

        // Apply styles to test content
        if (testContent) {
            testContent.style.fontSize = `${this.readabilityFactors.fontSize}px`;
            testContent.style.lineHeight = this.readabilityFactors.lineHeight;
            testContent.style.maxWidth = `${this.readabilityFactors.lineLength}ch`;

            // Apply contrast
            const contrastStyles = {
                high: { color: '#2d3748', backgroundColor: '#ffffff' },
                medium: { color: '#4a5568', backgroundColor: '#f7fafc' },
                low: { color: '#718096', backgroundColor: '#edf2f7' }
            };

            const styles = contrastStyles[this.readabilityFactors.contrast];
            testContent.style.color = styles.color;
            testContent.style.backgroundColor = styles.backgroundColor;
        }

        // Calculate and display readability score
        this.calculateReadabilityScore();
    }

    calculateReadabilityScore() {
        const factors = this.readabilityFactors;
        let score = 0;
        const scores = {};

        // Font size scoring (14-18px is optimal)
        if (factors.fontSize >= 16 && factors.fontSize <= 18) {
            scores.fontSize = 25;
        } else if (factors.fontSize >= 14 && factors.fontSize <= 20) {
            scores.fontSize = 20;
        } else if (factors.fontSize >= 12 && factors.fontSize <= 22) {
            scores.fontSize = 15;
        } else {
            scores.fontSize = 10;
        }

        // Line height scoring (1.4-1.6 is optimal)
        if (factors.lineHeight >= 1.4 && factors.lineHeight <= 1.6) {
            scores.lineHeight = 25;
        } else if (factors.lineHeight >= 1.3 && factors.lineHeight <= 1.8) {
            scores.lineHeight = 20;
        } else if (factors.lineHeight >= 1.2 && factors.lineHeight <= 2.0) {
            scores.lineHeight = 15;
        } else {
            scores.lineHeight = 10;
        }

        // Line length scoring (50-75 characters is optimal)
        if (factors.lineLength >= 50 && factors.lineLength <= 75) {
            scores.lineLength = 25;
        } else if (factors.lineLength >= 45 && factors.lineLength <= 85) {
            scores.lineLength = 20;
        } else {
            scores.lineLength = 15;
        }

        // Contrast scoring
        const contrastScores = { high: 25, medium: 20, low: 10 };
        scores.contrast = contrastScores[factors.contrast];

        // Calculate total score
        score = scores.fontSize + scores.lineHeight + scores.lineLength + scores.contrast;

        this.displayReadabilityScore(score, scores);
    }

    displayReadabilityScore(totalScore, individualScores) {
        const scoreDisplay = document.getElementById('readability-score');
        const sizeScore = document.getElementById('size-score');
        const heightScore = document.getElementById('height-score');
        const widthScore = document.getElementById('width-score');
        const contrastScore = document.getElementById('contrast-score');

        // Update total score
        if (scoreDisplay) {
            const scoreSpan = scoreDisplay.querySelector('.score');
            const labelSpan = scoreDisplay.querySelector('.label');

            if (scoreSpan) scoreSpan.textContent = totalScore;

            if (labelSpan) {
                let label = 'Poor';
                if (totalScore >= 90) label = 'Excellent';
                else if (totalScore >= 80) label = 'Very Good';
                else if (totalScore >= 70) label = 'Good';
                else if (totalScore >= 60) label = 'Fair';

                labelSpan.textContent = label;
                labelSpan.className = `label ${label.toLowerCase().replace(' ', '-')}`;
            }
        }

        // Update individual scores
        const getScoreLabel = (score) => {
            if (score >= 25) return 'Excellent';
            if (score >= 20) return 'Good';
            if (score >= 15) return 'Fair';
            return 'Poor';
        };

        if (sizeScore) sizeScore.textContent = getScoreLabel(individualScores.fontSize);
        if (heightScore) heightScore.textContent = getScoreLabel(individualScores.lineHeight);
        if (widthScore) widthScore.textContent = getScoreLabel(individualScores.lineLength);
        if (contrastScore) contrastScore.textContent = getScoreLabel(individualScores.contrast);
    }

    // Quiz functionality
    initializeQuiz() {
        const quizQuestions = [
            {
                question: "What is the recommended minimum font size for web body text?",
                options: [
                    "12px",
                    "14px",
                    "16px",
                    "18px"
                ],
                correct: 2,
                explanation: "16px is the recommended minimum for web body text to ensure readability across devices."
            },
            {
                question: "Which font category is best for body text on screens?",
                options: [
                    "Serif fonts",
                    "Sans-serif fonts",
                    "Monospace fonts",
                    "Script fonts"
                ],
                correct: 1,
                explanation: "Sans-serif fonts are generally more readable on screens due to their clean, simple design."
            },
            {
                question: "What is the ideal line height for body text?",
                options: [
                    "1.0 - 1.2",
                    "1.4 - 1.6",
                    "1.8 - 2.0",
                    "2.2 - 2.4"
                ],
                correct: 1,
                explanation: "A line height of 1.4-1.6 provides optimal readability by giving enough space between lines."
            },
            {
                question: "How many characters should ideally fit on a line of body text?",
                options: [
                    "30-40 characters",
                    "50-75 characters",
                    "80-100 characters",
                    "100+ characters"
                ],
                correct: 1,
                explanation: "50-75 characters per line is optimal for reading comfort and comprehension."
            },
            {
                question: "When should you use monospace fonts?",
                options: [
                    "For all body text",
                    "For headlines only",
                    "For code and data tables",
                    "Never in web design"
                ],
                correct: 2,
                explanation: "Monospace fonts are ideal for code and data where consistent character spacing is important."
            }
        ];

        this.renderQuiz(quizQuestions, 'typography-quiz');

        // Make quiz functions globally available
        window.submitTypographyQuiz = () => this.submitQuiz('typography-quiz', quizQuestions);
        window.resetTypographyQuiz = () => this.resetQuiz('typography-quiz', quizQuestions);
    }

    renderQuiz(questions, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = questions.map((q, index) => `
            <div class="quiz-question">
                <h4>Question ${index + 1}</h4>
                <p>${q.question}</p>
                <div class="quiz-options">
                    ${q.options.map((option, optIndex) => `
                        <label class="quiz-option">
                            <input type="radio" name="question-${index}" value="${optIndex}">
                            <span class="option-text">${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    submitQuiz(containerId, questions) {
        const container = document.getElementById(containerId);
        const resultsContainer = document.getElementById(containerId + '-results');
        let score = 0;
        const results = [];

        questions.forEach((q, index) => {
            const selectedOption = container.querySelector(`input[name="question-${index}"]:checked`);
            const isCorrect = selectedOption && parseInt(selectedOption.value) === q.correct;

            if (isCorrect) score++;

            results.push({
                question: q.question,
                selected: selectedOption ? parseInt(selectedOption.value) : -1,
                correct: q.correct,
                explanation: q.explanation,
                isCorrect
            });
        });

        this.showQuizResults(resultsContainer, results, score, questions.length);
    }

    showQuizResults(container, results, score, total) {
        const percentage = Math.round((score / total) * 100);

        container.innerHTML = `
            <div class="quiz-score">
                <h3>Quiz Results</h3>
                <div class="score-display">
                    <span class="score">${score}/${total}</span>
                    <span class="percentage">(${percentage}%)</span>
                </div>
            </div>
            <div class="quiz-breakdown">
                ${results.map((result, index) => `
                    <div class="result-item ${result.isCorrect ? 'correct' : 'incorrect'}">
                        <div class="result-header">
                            <span class="result-icon">
                                ${result.isCorrect ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-times-circle"></i>'}
                            </span>
                            <span class="result-text">Question ${index + 1}</span>
                        </div>
                        <p class="result-explanation">${result.explanation}</p>
                    </div>
                `).join('')}
            </div>
        `;

        container.style.display = 'block';
    }

    resetQuiz(containerId, questions) {
        const container = document.getElementById(containerId);
        const resultsContainer = document.getElementById(containerId + '-results');

        // Clear all radio button selections
        const radioButtons = container.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => radio.checked = false);

        // Hide results
        resultsContainer.style.display = 'none';

        // Remove any visual feedback
        const options = container.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.classList.remove('correct', 'incorrect');
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.typographyTopic = new TypographyTopic();
});
