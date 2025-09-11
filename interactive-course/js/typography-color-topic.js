// Typography & Color Theory Topic JavaScript

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    initializeTypographyColorTopic();
});

function initializeTypographyColorTopic() {
    // Initialize all interactive components
    initializeConceptExplorer();
    initializeHierarchyBuilder();
    initializeFontPairing();
    initializeSpacingLab();
    initializeColorWheel();
    initializeColorSchemeBuilder();
    initializeImplementationTabs();
    initializeQuiz();

    console.log('Typography & Color Theory topic initialized');
}

// Concept Explorer
function initializeConceptExplorer() {
    const conceptCards = document.querySelectorAll('.concept-card');
    const detailPanels = document.querySelectorAll('.detail-panel');

    conceptCards.forEach(card => {
        const exploreBtn = card.querySelector('.explore-btn');
        exploreBtn.addEventListener('click', () => {
            const target = exploreBtn.dataset.target;

            // Hide all detail panels
            detailPanels.forEach(panel => {
                panel.style.display = 'none';
            });

            // Show selected panel
            const targetPanel = document.getElementById(`${target}-detail`);
            if (targetPanel) {
                targetPanel.style.display = 'block';
                targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Update card states
            conceptCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });
}

// Typography Hierarchy Builder
function initializeHierarchyBuilder() {
    const controls = {
        h1Size: document.getElementById('h1-size'),
        h2Size: document.getElementById('h2-size'),
        bodySize: document.getElementById('body-size'),
        lineHeight: document.getElementById('line-height')
    };

    const previews = {
        h1: document.getElementById('preview-h1'),
        h2: document.getElementById('preview-h2'),
        body: document.getElementById('preview-body'),
        body2: document.getElementById('preview-body2')
    };

    const values = {
        h1SizeValue: document.getElementById('h1-size-value'),
        h2SizeValue: document.getElementById('h2-size-value'),
        bodySizeValue: document.getElementById('body-size-value'),
        lineHeightValue: document.getElementById('line-height-value')
    };

    // Update hierarchy preview
    function updateHierarchy() {
        const h1Size = controls.h1Size.value;
        const h2Size = controls.h2Size.value;
        const bodySize = controls.bodySize.value;
        const lineHeight = controls.lineHeight.value;

        // Update preview elements
        previews.h1.style.fontSize = `${h1Size}px`;
        previews.h2.style.fontSize = `${h2Size}px`;
        previews.body.style.fontSize = `${bodySize}px`;
        previews.body2.style.fontSize = `${bodySize}px`;

        // Apply line height to all elements
        Object.values(previews).forEach(element => {
            element.style.lineHeight = lineHeight;
        });

        // Update value displays
        values.h1SizeValue.textContent = `${h1Size}px`;
        values.h2SizeValue.textContent = `${h2Size}px`;
        values.bodySizeValue.textContent = `${bodySize}px`;
        values.lineHeightValue.textContent = lineHeight;
    }

    // Add event listeners
    Object.values(controls).forEach(control => {
        control.addEventListener('input', updateHierarchy);
    });

    // Initialize
    updateHierarchy();
}

// Font Pairing Explorer
function initializeFontPairing() {
    const headingFontSelect = document.getElementById('heading-font');
    const bodyFontSelect = document.getElementById('body-font');

    const pairingElements = {
        heading: document.getElementById('pairing-heading'),
        subheading: document.getElementById('pairing-subheading'),
        body: document.getElementById('pairing-body'),
        body2: document.getElementById('pairing-body2')
    };

    const metrics = {
        contrast: document.getElementById('contrast-metric'),
        harmony: document.getElementById('harmony-metric'),
        readability: document.getElementById('readability-metric')
    };

    const feedback = document.getElementById('pairing-feedback');

    // Font pairing analysis data
    const fontAnalysis = {
        'Playfair Display': { type: 'serif', personality: 'elegant', readability: 8 },
        'Montserrat': { type: 'sans-serif', personality: 'modern', readability: 9 },
        'Merriweather': { type: 'serif', personality: 'traditional', readability: 9 },
        'Open Sans': { type: 'sans-serif', personality: 'friendly', readability: 10 },
        'Roboto Slab': { type: 'slab-serif', personality: 'technical', readability: 8 },
        'Oswald': { type: 'sans-serif', personality: 'bold', readability: 7 },
        'Source Sans Pro': { type: 'sans-serif', personality: 'neutral', readability: 9 },
        'Lora': { type: 'serif', personality: 'warm', readability: 8 },
        'Inter': { type: 'sans-serif', personality: 'clean', readability: 10 },
        'Crimson Text': { type: 'serif', personality: 'classic', readability: 8 },
        'Roboto': { type: 'sans-serif', personality: 'geometric', readability: 9 },
        'PT Serif': { type: 'serif', personality: 'scholarly', readability: 8 }
    };

    function updateFontPairing() {
        const headingFont = headingFontSelect.value;
        const bodyFont = bodyFontSelect.value;

        // Update font applications
        pairingElements.heading.style.fontFamily = `'${headingFont}', ${getFontFallback(headingFont)}`;
        pairingElements.subheading.style.fontFamily = `'${headingFont}', ${getFontFallback(headingFont)}`;
        pairingElements.body.style.fontFamily = `'${bodyFont}', ${getFontFallback(bodyFont)}`;
        pairingElements.body2.style.fontFamily = `'${bodyFont}', ${getFontFallback(bodyFont)}`;

        // Analyze pairing
        const analysis = analyzeFontPairing(headingFont, bodyFont);

        // Update metrics
        updateMetric(metrics.contrast, analysis.contrast);
        updateMetric(metrics.harmony, analysis.harmony);
        updateMetric(metrics.readability, analysis.readability);

        // Update feedback
        feedback.textContent = analysis.feedback;
    }

    function getFontFallback(fontName) {
        const headingData = fontAnalysis[fontName];
        if (!headingData) return 'sans-serif';

        switch (headingData.type) {
            case 'serif':
            case 'slab-serif':
                return 'serif';
            case 'sans-serif':
            default:
                return 'sans-serif';
        }
    }

    function analyzeFontPairing(headingFont, bodyFont) {
        const headingData = fontAnalysis[headingFont];
        const bodyData = fontAnalysis[bodyFont];

        if (!headingData || !bodyData) {
            return {
                contrast: 50,
                harmony: 50,
                readability: 50,
                feedback: 'Font analysis not available'
            };
        }

        // Calculate contrast (different types = higher contrast)
        let contrast = headingData.type !== bodyData.type ? 85 : 45;

        // Calculate harmony (similar personalities work well)
        const personalityMatch = headingData.personality === bodyData.personality ? 30 : 80;
        let harmony = Math.min(100, personalityMatch + (headingData.readability + bodyData.readability) / 2);

        // Use body font readability as readability score
        let readability = bodyData.readability * 10;

        // Generate feedback
        let feedback = '';
        if (contrast >= 80 && harmony >= 75) {
            feedback = 'Excellent pairing! Great contrast and harmony.';
        } else if (contrast >= 60 && harmony >= 60) {
            feedback = 'Good pairing with nice balance.';
        } else if (readability >= 80) {
            feedback = 'Readable combination, consider adjusting for better visual hierarchy.';
        } else {
            feedback = 'This pairing could be improved for better readability and contrast.';
        }

        return { contrast, harmony, readability, feedback };
    }

    function updateMetric(element, value) {
        element.style.width = `${value}%`;
        element.style.backgroundColor = getMetricColor(value);
    }

    function getMetricColor(value) {
        if (value >= 80) return '#2ecc71';
        if (value >= 60) return '#f39c12';
        return '#e74c3c';
    }

    // Add event listeners
    headingFontSelect.addEventListener('change', updateFontPairing);
    bodyFontSelect.addEventListener('change', updateFontPairing);

    // Initialize
    updateFontPairing();
}

// Spacing Lab
function initializeSpacingLab() {
    const controls = {
        letterSpacing: document.getElementById('letter-spacing'),
        wordSpacing: document.getElementById('word-spacing'),
        lineHeight: document.getElementById('spacing-line-height'),
        paragraphSpacing: document.getElementById('paragraph-spacing')
    };

    const values = {
        letterSpacingValue: document.getElementById('letter-spacing-value'),
        wordSpacingValue: document.getElementById('word-spacing-value'),
        lineHeightValue: document.getElementById('spacing-line-height-value'),
        paragraphSpacingValue: document.getElementById('paragraph-spacing-value')
    };

    const previewText = document.getElementById('spacing-text');

    function updateSpacing() {
        const letterSpacing = controls.letterSpacing.value;
        const wordSpacing = controls.wordSpacing.value;
        const lineHeight = controls.lineHeight.value;
        const paragraphSpacing = controls.paragraphSpacing.value;

        // Apply spacing to preview
        previewText.style.letterSpacing = `${letterSpacing}px`;
        previewText.style.wordSpacing = `${wordSpacing}px`;
        previewText.style.lineHeight = lineHeight;

        // Apply paragraph spacing
        const paragraphs = previewText.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.style.marginBottom = `${paragraphSpacing}px`;
        });

        // Update value displays
        values.letterSpacingValue.textContent = `${letterSpacing}px`;
        values.wordSpacingValue.textContent = `${wordSpacing}px`;
        values.lineHeightValue.textContent = lineHeight;
        values.paragraphSpacingValue.textContent = `${paragraphSpacing}px`;
    }

    // Add event listeners
    Object.values(controls).forEach(control => {
        control.addEventListener('input', updateSpacing);
    });

    // Initialize
    updateSpacing();
}

// Color Wheel
function initializeColorWheel() {
    const colorWheel = document.querySelector('.color-wheel');
    const harmonyBtns = document.querySelectorAll('.harmony-btn');
    const harmonyTitle = document.getElementById('harmony-title');
    const harmonyDescription = document.getElementById('harmony-description');
    const selectedColors = document.getElementById('selected-colors');

    // Create color wheel segments
    createColorWheel();

    function createColorWheel() {
        const segments = 12;
        const colors = [];

        for (let i = 0; i < segments; i++) {
            const hue = (i * 360) / segments;
            const color = `hsl(${hue}, 70%, 50%)`;
            colors.push({ hue, color });

            const segment = document.createElement('div');
            segment.className = 'color-segment';
            segment.style.backgroundColor = color;
            segment.style.transform = `rotate(${i * 30}deg)`;
            segment.dataset.hue = hue;

            colorWheel.appendChild(segment);
        }

        return colors;
    }

    // Color harmony definitions
    const harmonies = {
        complementary: {
            title: 'Complementary Colors',
            description: 'Colors that are opposite each other on the color wheel. They create high contrast and vibrant designs.',
            calculate: (baseHue) => [baseHue, (baseHue + 180) % 360]
        },
        triadic: {
            title: 'Triadic Colors',
            description: 'Three colors evenly spaced around the color wheel. They create vibrant, balanced designs.',
            calculate: (baseHue) => [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360]
        },
        analogous: {
            title: 'Analogous Colors',
            description: 'Colors that are next to each other on the wheel. They create harmonious, calm designs.',
            calculate: (baseHue) => [baseHue, (baseHue + 30) % 360, (baseHue + 60) % 360]
        },
        monochromatic: {
            title: 'Monochromatic Colors',
            description: 'Different shades, tints, and tones of a single color. Creates cohesive, elegant designs.',
            calculate: (baseHue) => [baseHue, baseHue, baseHue] // Will vary lightness
        }
    };

    function showColorHarmony(harmonyType) {
        const baseHue = 210; // Default blue
        const harmony = harmonies[harmonyType];

        if (!harmony) return;

        // Update title and description
        harmonyTitle.textContent = harmony.title;
        harmonyDescription.textContent = harmony.description;

        // Calculate colors
        const hues = harmony.calculate(baseHue);

        // Clear previous colors
        selectedColors.innerHTML = '';

        // Display colors
        hues.forEach((hue, index) => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'selected-color';

            if (harmonyType === 'monochromatic') {
                const lightness = [30, 50, 70][index];
                const color = `hsl(${hue}, 70%, ${lightness}%)`;
                colorDiv.style.backgroundColor = color;
                colorDiv.innerHTML = `<span>${color}</span>`;
            } else {
                const color = `hsl(${hue}, 70%, 50%)`;
                colorDiv.style.backgroundColor = color;
                colorDiv.innerHTML = `<span>${color}</span>`;
            }

            selectedColors.appendChild(colorDiv);
        });

        // Highlight segments on wheel
        highlightWheelSegments(hues, harmonyType);
    }

    function highlightWheelSegments(hues, harmonyType) {
        const segments = colorWheel.querySelectorAll('.color-segment');

        // Reset all segments
        segments.forEach(segment => {
            segment.classList.remove('highlighted');
        });

        // Highlight relevant segments
        hues.forEach(hue => {
            const closestSegment = findClosestSegment(hue);
            if (closestSegment) {
                closestSegment.classList.add('highlighted');
            }
        });
    }

    function findClosestSegment(targetHue) {
        const segments = colorWheel.querySelectorAll('.color-segment');
        let closest = null;
        let minDiff = Infinity;

        segments.forEach(segment => {
            const segmentHue = parseFloat(segment.dataset.hue);
            const diff = Math.abs(segmentHue - targetHue);
            if (diff < minDiff) {
                minDiff = diff;
                closest = segment;
            }
        });

        return closest;
    }

    // Add event listeners
    harmonyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            harmonyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show harmony
            const harmonyType = btn.dataset.harmony;
            showColorHarmony(harmonyType);
        });
    });
}

// Color Scheme Builder
function initializeColorSchemeBuilder() {
    const colorInputs = {
        primary: document.getElementById('primary-color'),
        secondary: document.getElementById('secondary-color'),
        accent: document.getElementById('accent-color'),
        background: document.getElementById('background-color'),
        text: document.getElementById('text-color')
    };

    const hexInputs = {
        primary: document.getElementById('primary-hex'),
        secondary: document.getElementById('secondary-hex'),
        accent: document.getElementById('accent-hex'),
        background: document.getElementById('background-hex'),
        text: document.getElementById('text-hex')
    };

    const preview = document.getElementById('color-preview');
    const accessibilityReport = document.getElementById('accessibility-report');

    const generateBtn = document.getElementById('generate-scheme');
    const checkBtn = document.getElementById('check-accessibility');
    const saveBtn = document.getElementById('save-scheme');

    function updateColorScheme() {
        const colors = {
            primary: colorInputs.primary.value,
            secondary: colorInputs.secondary.value,
            accent: colorInputs.accent.value,
            background: colorInputs.background.value,
            text: colorInputs.text.value
        };

        // Update CSS custom properties
        preview.style.setProperty('--preview-primary', colors.primary);
        preview.style.setProperty('--preview-secondary', colors.secondary);
        preview.style.setProperty('--preview-accent', colors.accent);
        preview.style.setProperty('--preview-background', colors.background);
        preview.style.setProperty('--preview-text', colors.text);

        // Apply colors to preview elements
        const header = preview.querySelector('.preview-header');
        const ctaButton = preview.querySelector('.cta-button');
        const secondaryButtons = preview.querySelectorAll('.secondary-button');
        const content = preview.querySelector('.preview-content');

        if (header) {
            header.style.backgroundColor = colors.primary;
            header.style.color = colors.background;
        }

        if (ctaButton) {
            ctaButton.style.backgroundColor = colors.accent;
            ctaButton.style.color = colors.background;
        }

        secondaryButtons.forEach(btn => {
            btn.style.backgroundColor = 'transparent';
            btn.style.color = colors.primary;
            btn.style.border = `2px solid ${colors.primary}`;
        });

        if (content) {
            content.style.backgroundColor = colors.background;
            content.style.color = colors.text;
        }

        // Update hex inputs
        Object.keys(colors).forEach(key => {
            hexInputs[key].value = colors[key];
        });
    }

    function generateColorScheme() {
        // Generate a harmonious color scheme
        const baseHue = Math.floor(Math.random() * 360);

        const scheme = {
            primary: `hsl(${baseHue}, 70%, 50%)`,
            secondary: `hsl(${(baseHue + 30) % 360}, 60%, 60%)`,
            accent: `hsl(${(baseHue + 180) % 360}, 80%, 55%)`,
            background: `hsl(${baseHue}, 20%, 95%)`,
            text: `hsl(${baseHue}, 30%, 20%)`
        };

        // Convert HSL to HEX and update inputs
        Object.keys(scheme).forEach(key => {
            const hex = hslToHex(scheme[key]);
            colorInputs[key].value = hex;
        });

        updateColorScheme();
    }

    function checkAccessibility() {
        const colors = {
            primary: colorInputs.primary.value,
            secondary: colorInputs.secondary.value,
            accent: colorInputs.accent.value,
            background: colorInputs.background.value,
            text: colorInputs.text.value
        };

        const contrastChecks = [
            { name: 'Text on Background', color1: colors.text, color2: colors.background },
            { name: 'Primary on Background', color1: colors.primary, color2: colors.background },
            { name: 'Accent on Background', color1: colors.accent, color2: colors.background },
            { name: 'Background on Primary', color1: colors.background, color2: colors.primary }
        ];

        const checksContainer = accessibilityReport.querySelector('.contrast-checks');
        checksContainer.innerHTML = '';

        contrastChecks.forEach(check => {
            const ratio = getContrastRatio(check.color1, check.color2);
            const checkDiv = document.createElement('div');
            checkDiv.className = 'contrast-check';

            const level = getAccessibilityLevel(ratio);
            checkDiv.innerHTML = `
                <div class="check-info">
                    <span class="check-name">${check.name}</span>
                    <span class="check-ratio">${ratio.toFixed(2)}:1</span>
                </div>
                <div class="check-status ${level.class}">
                    <i class="fas ${level.icon}"></i>
                    <span>${level.text}</span>
                </div>
            `;

            checksContainer.appendChild(checkDiv);
        });
    }

    function getContrastRatio(color1, color2) {
        const rgb1 = hexToRgb(color1);
        const rgb2 = hexToRgb(color2);

        const l1 = getRelativeLuminance(rgb1);
        const l2 = getRelativeLuminance(rgb2);

        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);

        return (lighter + 0.05) / (darker + 0.05);
    }

    function getRelativeLuminance(rgb) {
        const { r, g, b } = rgb;
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    function getAccessibilityLevel(ratio) {
        if (ratio >= 7) {
            return { class: 'aaa', icon: 'fa-check-circle', text: 'AAA' };
        } else if (ratio >= 4.5) {
            return { class: 'aa', icon: 'fa-check', text: 'AA' };
        } else if (ratio >= 3) {
            return { class: 'a', icon: 'fa-exclamation-triangle', text: 'A' };
        } else {
            return { class: 'fail', icon: 'fa-times-circle', text: 'Fail' };
        }
    }

    function saveColorScheme() {
        const colors = {
            primary: colorInputs.primary.value,
            secondary: colorInputs.secondary.value,
            accent: colorInputs.accent.value,
            background: colorInputs.background.value,
            text: colorInputs.text.value
        };

        const schemeData = {
            name: `Color Scheme ${new Date().toLocaleString()}`,
            colors: colors,
            css: generateCSS(colors)
        };

        // Save to localStorage
        const savedSchemes = JSON.parse(localStorage.getItem('colorSchemes') || '[]');
        savedSchemes.push(schemeData);
        localStorage.setItem('colorSchemes', JSON.stringify(savedSchemes));

        // Show success message
        showToast('Color scheme saved successfully!', 'success');
    }

    function generateCSS(colors) {
        return `:root {
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};
  --color-background: ${colors.background};
  --color-text: ${colors.text};
}`;
    }

    // Utility functions
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function hslToHex(hsl) {
        // Simple approximation - in real app, use proper conversion
        const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (!match) return '#000000';

        const h = parseInt(match[1]);
        const s = parseInt(match[2]) / 100;
        const l = parseInt(match[3]) / 100;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;

        let r, g, b;
        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
        }

        const toHex = (n) => {
            const hex = Math.round((n + m) * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    // Event listeners
    Object.values(colorInputs).forEach(input => {
        input.addEventListener('change', updateColorScheme);
    });

    Object.keys(hexInputs).forEach(key => {
        hexInputs[key].addEventListener('input', () => {
            const hex = hexInputs[key].value;
            if (hex.match(/^#[0-9A-F]{6}$/i)) {
                colorInputs[key].value = hex;
                updateColorScheme();
            }
        });
    });

    generateBtn.addEventListener('click', generateColorScheme);
    checkBtn.addEventListener('click', checkAccessibility);
    saveBtn.addEventListener('click', saveColorScheme);

    // Initialize
    updateColorScheme();
}

// Implementation Tabs
function initializeImplementationTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update active panel
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

// Quiz System
function initializeQuiz() {
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const checkBtn = document.getElementById('check-answers');
    const resetBtn = document.getElementById('reset-quiz');
    const resultsDiv = document.getElementById('quiz-results');
    const scoreSpan = document.getElementById('score');
    const resultMessage = document.getElementById('result-message');

    // Correct answers
    const correctAnswers = {
        q1: 'b', // 45-75 characters
        q2: 'b', // Black text on white background
        q3: 'b', // 4.5:1
        q4: 'b', // Pair serif with sans-serif
        q5: 'b'  // Hue, Saturation, Lightness
    };

    function checkAnswers() {
        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length;

        // Check each question
        Object.keys(correctAnswers).forEach(questionKey => {
            const selectedOption = document.querySelector(`input[name="${questionKey}"]:checked`);
            const questionDiv = document.querySelector(`[data-question="${questionKey.slice(1)}"]`);

            if (selectedOption) {
                if (selectedOption.value === correctAnswers[questionKey]) {
                    score++;
                    questionDiv.classList.add('correct');
                    questionDiv.classList.remove('incorrect');
                } else {
                    questionDiv.classList.add('incorrect');
                    questionDiv.classList.remove('correct');
                }
            } else {
                questionDiv.classList.add('incorrect');
                questionDiv.classList.remove('correct');
            }
        });

        // Show results
        scoreSpan.textContent = score;
        resultsDiv.style.display = 'block';

        // Generate result message
        let message = '';
        const percentage = (score / totalQuestions) * 100;

        if (percentage >= 90) {
            message = 'Excellent! You have mastered typography and color theory fundamentals.';
        } else if (percentage >= 70) {
            message = 'Great job! You have a solid understanding of the concepts.';
        } else if (percentage >= 50) {
            message = 'Good start! Review the materials and try again to improve your score.';
        } else {
            message = 'Keep studying! Focus on the typography and color theory fundamentals.';
        }

        resultMessage.textContent = message;

        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }

    function resetQuiz() {
        // Clear all selections
        const radioButtons = document.querySelectorAll('.quiz-question input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.checked = false;
        });

        // Remove styling
        quizQuestions.forEach(question => {
            question.classList.remove('correct', 'incorrect');
        });

        // Hide results
        resultsDiv.style.display = 'none';

        // Scroll to top of quiz
        document.querySelector('.quiz-section').scrollIntoView({ behavior: 'smooth' });
    }

    // Event listeners
    checkBtn.addEventListener('click', checkAnswers);
    resetBtn.addEventListener('click', resetQuiz);
}

// Utility Functions
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? 'fa-check-circle' :
        type === 'error' ? 'fa-times-circle' :
            type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';

    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add close functionality
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    });

    // Add to container
    toastContainer.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for potential external use
window.TypographyColorTopic = {
    initialize: initializeTypographyColorTopic,
    showToast
};
