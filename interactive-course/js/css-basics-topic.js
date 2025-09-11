// CSS Basics Topic JavaScript
// This file handles all interactive functionality for the CSS Basics topic

document.addEventListener('DOMContentLoaded', function () {
    // Initialize interactive elements
    initializeColorPreview();
    initializeSelectorPractice();
    initializeHoverDemos();

    // Add Enter key support for selector game
    const selectorInput = document.getElementById('selector-input');
    if (selectorInput) {
        selectorInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                checkSelector();
            }
        });
    }

    console.log('CSS Basics topic JavaScript initialized');
});

// Color preview functionality
function initializeColorPreview() {
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const previewArea = document.getElementById('color-preview');

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function () {
            const bgColor = window.getComputedStyle(this).backgroundColor;
            if (previewArea) {
                previewArea.style.background = bgColor;
                previewArea.textContent = `Background: ${bgColor}`;
            }
        });
    });

    // Initialize color input handlers if they exist
    initializeColorInputs();

    // Initialize specific color picker functionality
    initializeColorPicker();
}

function initializeColorPicker() {
    const bgColor = document.getElementById('bg-color');
    const bgColorInput = document.getElementById('bg-color-input');
    const textColor = document.getElementById('text-color');
    const textColorInput = document.getElementById('text-color-input');
    const preview = document.getElementById('color-preview');

    if (!bgColor || !bgColorInput || !textColor || !textColorInput || !preview) {
        return; // Elements not found
    }

    function updatePreview() {
        preview.style.background = bgColorInput.value;
        preview.style.color = textColorInput.value;
    }

    bgColor.addEventListener('change', function () {
        bgColorInput.value = this.value;
        updatePreview();
    });

    bgColorInput.addEventListener('input', function () {
        bgColor.value = this.value;
        updatePreview();
    });

    textColor.addEventListener('change', function () {
        textColorInput.value = this.value;
        updatePreview();
    });

    textColorInput.addEventListener('input', function () {
        textColor.value = this.value;
        updatePreview();
    });
}

function initializeColorInputs() {
    const colorInputs = document.querySelectorAll('input[type="color"]');
    colorInputs.forEach(input => {
        input.addEventListener('change', function () {
            updateColorPreview(this.value);
        });
    });
}

function updateColorPreview(color) {
    const previewArea = document.getElementById('color-preview');
    if (previewArea) {
        previewArea.style.background = color;
        previewArea.textContent = `Background: ${color}`;
    }
}

// Selector practice functionality
function initializeSelectorPractice() {
    const checkButton = document.querySelector('[onclick*="checkSelector"]');
    if (checkButton) {
        checkButton.onclick = checkSelector;
    }
}

function checkSelector() {
    const input = document.getElementById('selector-input');
    const feedback = document.getElementById('selector-feedback');

    if (!input || !feedback) return;

    const inputValue = input.value.trim();
    const correctAnswers = ['.red', '#target-box', '.box.red', 'div.red', 'div#target-box'];

    if (correctAnswers.includes(inputValue)) {
        feedback.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <strong>Correct!</strong> "${inputValue}" successfully targets the red box.
                <div class="explanation">
                    ${inputValue.startsWith('.') ? 'Class selectors use a dot (.) prefix.' : 'ID selectors use a hash (#) prefix.'}
                </div>
            </div>
        `;
        feedback.className = 'feedback-area success';
    } else if (inputValue === '') {
        feedback.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                Please enter a CSS selector.
            </div>
        `;
        feedback.className = 'feedback-area error';
    } else {
        feedback.innerHTML = `
            <div class="error-message">
                <i class="fas fa-times-circle"></i>
                <strong>Try again!</strong> "${inputValue}" doesn't target the red box.
                <div class="hint">
                    <strong>Hint:</strong> The red box has class="red" and id="target-box"
                </div>
            </div>
        `;
        feedback.className = 'feedback-area error';
    }

    feedback.style.display = 'block';
}

function showSelectorFeedback(message, type) {
    let feedback = document.getElementById('selector-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'selector-feedback';
        feedback.className = 'feedback-message';

        const container = document.querySelector('.selector-practice');
        if (container) {
            container.appendChild(feedback);
        }
    }

    feedback.textContent = message;
    feedback.className = `feedback-message ${type}`;

    // Auto-hide after 4 seconds
    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 4000);
}

// Hover demo initialization
function initializeHoverDemos() {
    // Add proper event listeners for hover demo button
    const hoverButton = document.querySelector('.hover-demo-button');
    if (hoverButton) {
        // Remove inline event handlers and add proper listeners
        hoverButton.onmouseover = null;
        hoverButton.onmouseout = null;

        hoverButton.addEventListener('mouseenter', function () {
            this.style.background = '#7c3aed';
        });

        hoverButton.addEventListener('mouseleave', function () {
            this.style.background = '#8b5cf6';
        });
    }
}

// CSS property demonstration
function demonstrateCSSProperty(property, value, targetElement) {
    const target = document.getElementById(targetElement);
    if (target) {
        target.style[property] = value;

        // Show what was changed
        showPropertyChange(property, value);
    }
}

function showPropertyChange(property, value) {
    const notification = document.createElement('div');
    notification.className = 'property-notification';
    notification.textContent = `Changed ${property}: ${value}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #3b82f6;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Reset demo function
function resetDemo() {
    // Reset all demo elements to their original state
    const demoElements = document.querySelectorAll('.demo-container .selector-box');
    demoElements.forEach(element => {
        element.style.outline = 'none';
        element.style.transform = 'none';
        element.style.boxShadow = 'none';
    });

    // Clear feedback
    const feedback = document.getElementById('selector-feedback');
    if (feedback) {
        feedback.remove();
    }

    // Clear input
    const selectorInput = document.getElementById('selector-input');
    if (selectorInput) {
        selectorInput.value = '';
    }
}

// Navigation functions
function navigateToUnit() {
    window.location.href = '../units/unit3.html';
}

function navigateToNext() {
    window.location.href = 'css-box-model.html';
}

// Export functions that might be called from HTML
window.checkSelector = checkSelector;
window.updateColorPreview = updateColorPreview;
window.demonstrateCSSProperty = demonstrateCSSProperty;
window.resetDemo = resetDemo;
window.navigateToUnit = navigateToUnit;
window.navigateToNext = navigateToNext;
