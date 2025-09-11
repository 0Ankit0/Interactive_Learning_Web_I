// CSS Box Model Topic JavaScript
// This file handles all interactive functionality for the CSS Box Model topic

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all interactive elements
    initializeBoxModelVisualizer();
    initializeTabs();
    initializeCalculator();
    initializeCSSEditor();

    console.log('CSS Box Model topic JavaScript initialized');
});

// Box Model Visualizer
function initializeBoxModelVisualizer() {
    const controls = {
        contentWidth: document.getElementById('content-width'),
        contentHeight: document.getElementById('content-height'),
        paddingSize: document.getElementById('padding-size'),
        borderSize: document.getElementById('border-size'),
        marginSize: document.getElementById('margin-size')
    };

    // Add event listeners to all controls
    Object.values(controls).forEach(control => {
        if (control) {
            control.addEventListener('input', updateBoxModel);
        }
    });

    // Initial update
    updateBoxModel();
}

function updateBoxModel() {
    const contentWidth = document.getElementById('content-width');
    const contentHeight = document.getElementById('content-height');
    const paddingSize = document.getElementById('padding-size');
    const borderSize = document.getElementById('border-size');
    const marginSize = document.getElementById('margin-size');
    const demoBox = document.getElementById('demo-box');

    if (!contentWidth || !contentHeight || !paddingSize || !borderSize || !marginSize || !demoBox) {
        return;
    }

    const width = parseInt(contentWidth.value) || 0;
    const height = parseInt(contentHeight.value) || 0;
    const padding = parseInt(paddingSize.value) || 0;
    const border = parseInt(borderSize.value) || 0;
    const margin = parseInt(marginSize.value) || 0;

    // Update display values
    const displayElements = {
        'content-width-value': width + 'px',
        'content-height-value': height + 'px',
        'padding-size-value': padding + 'px',
        'border-size-value': border + 'px',
        'margin-size-value': margin + 'px'
    };

    Object.entries(displayElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });

    // Update the visual box
    const content = demoBox.querySelector('.box-content');
    const paddingBox = demoBox.querySelector('.box-padding');
    const borderBox = demoBox.querySelector('.box-border');
    const marginBox = demoBox.querySelector('.box-margin');

    if (content) {
        content.style.width = width + 'px';
        content.style.height = height + 'px';
    }

    if (paddingBox) {
        paddingBox.style.padding = padding + 'px';
    }

    if (borderBox) {
        borderBox.style.borderWidth = border + 'px';
    }

    if (marginBox) {
        marginBox.style.margin = margin + 'px';
    }

    // Calculate total dimensions
    const totalWidth = width + (padding * 2) + (border * 2);
    const totalHeight = height + (padding * 2) + (border * 2);

    const totalWidthElement = document.getElementById('total-width');
    const totalHeightElement = document.getElementById('total-height');

    if (totalWidthElement) {
        totalWidthElement.textContent = totalWidth + 'px';
    }

    if (totalHeightElement) {
        totalHeightElement.textContent = totalHeight + 'px';
    }
}

// Calculator Exercise
function initializeCalculator() {
    const checkWidthBtn = document.querySelector('[onclick*="checkWidth"]');
    const checkHeightBtn = document.querySelector('[onclick*="checkHeight"]');

    if (checkWidthBtn) {
        checkWidthBtn.onclick = checkWidth;
    }

    if (checkHeightBtn) {
        checkHeightBtn.onclick = checkHeight;
    }

    // Add Enter key support for calculator inputs
    const calcWidthInput = document.getElementById('calc-width');
    const calcHeightInput = document.getElementById('calc-height');

    if (calcWidthInput) {
        calcWidthInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                checkWidth();
            }
        });
    }

    if (calcHeightInput) {
        calcHeightInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                checkHeight();
            }
        });
    }
}

function checkWidth() {
    const input = document.getElementById('calc-width');
    const feedback = document.getElementById('calculator-feedback');

    if (!input || !feedback) return;

    const userAnswer = parseInt(input.value);
    const correct = 150 + (15 * 2) + (3 * 2); // 186

    if (userAnswer === correct) {
        feedback.innerHTML = '<div class="success">✓ Correct! Total width is 186px</div>';
    } else {
        feedback.innerHTML = '<div class="error">✗ Incorrect. Hint: Content (150) + Padding (15×2) + Border (3×2) = ?</div>';
    }
}

function checkHeight() {
    const input = document.getElementById('calc-height');
    const feedback = document.getElementById('calculator-feedback');

    if (!input || !feedback) return;

    const userAnswer = parseInt(input.value);
    const correct = 80 + (15 * 2) + (3 * 2); // 116

    if (userAnswer === correct) {
        feedback.innerHTML = '<div class="success">✓ Correct! Total height is 116px</div>';
    } else {
        feedback.innerHTML = '<div class="error">✗ Incorrect. Hint: Content (80) + Padding (15×2) + Border (3×2) = ?</div>';
    }
}

// CSS Live Editor
function initializeCSSEditor() {
    const cssTextarea = document.getElementById('card-css');

    if (cssTextarea) {
        cssTextarea.addEventListener('input', updateCardPreview);
        // Initial update
        updateCardPreview();
    }
}

function updateCardPreview() {
    const cssTextarea = document.getElementById('card-css');

    if (!cssTextarea) return;

    const css = cssTextarea.value;

    // Remove existing style tag
    const existingStyle = document.getElementById('card-preview-styles');
    if (existingStyle) {
        existingStyle.remove();
    }

    // Add new styles
    const styleTag = document.createElement('style');
    styleTag.id = 'card-preview-styles';
    styleTag.textContent = css;
    document.head.appendChild(styleTag);
}

// Tab System
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');

            if (!tab) return;

            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            button.classList.add('active');
            const targetPanel = document.querySelector(`[data-tab="${tab}"].tab-panel`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // Activate first tab by default
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
}

// Navigation functions
function previousTopic() {
    window.location.href = 'css-basics.html';
}

function nextTopic() {
    window.location.href = 'flexbox-grid.html';
}

// Utility functions
function resetBoxModelVisualizer() {
    const defaults = {
        'content-width': 100,
        'content-height': 60,
        'padding-size': 10,
        'border-size': 2,
        'margin-size': 15
    };

    Object.entries(defaults).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.value = value;
        }
    });

    updateBoxModel();
}

function resetCalculator() {
    const calcInputs = ['calc-width', 'calc-height'];
    calcInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = '';
        }
    });

    const feedback = document.getElementById('calculator-feedback');
    if (feedback) {
        feedback.innerHTML = '';
    }
}

function resetCSSEditor() {
    const defaultCSS = `.card-preview {
  width: 250px;
  padding: 20px;
  margin: 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}`;

    const cssTextarea = document.getElementById('card-css');
    if (cssTextarea) {
        cssTextarea.value = defaultCSS;
        updateCardPreview();
    }
}

function resetAllDemos() {
    resetBoxModelVisualizer();
    resetCalculator();
    resetCSSEditor();
}

// Export functions that might be called from HTML
window.updateBoxModel = updateBoxModel;
window.checkWidth = checkWidth;
window.checkHeight = checkHeight;
window.updateCardPreview = updateCardPreview;
window.previousTopic = previousTopic;
window.nextTopic = nextTopic;
window.resetBoxModelVisualizer = resetBoxModelVisualizer;
window.resetCalculator = resetCalculator;
window.resetCSSEditor = resetCSSEditor;
window.resetAllDemos = resetAllDemos;
