// Shared JavaScript Utilities for Interactive Course
// This file contains reusable functions used across multiple topic pages

/**
 * DOM Utilities
 */
const DOMUtils = {
    /**
     * Safely get an element by ID with error handling
     * @param {string} id - Element ID
     * @returns {HTMLElement|null} - The element or null if not found
     */
    getElement(id) {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with ID '${id}' not found`);
        }
        return element;
    },

    /**
     * Safely query a single element with error handling
     * @param {string} selector - CSS selector
     * @returns {HTMLElement|null} - The element or null if not found
     */
    queryElement(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Element with selector '${selector}' not found`);
        }
        return element;
    },

    /**
     * Safely query multiple elements
     * @param {string} selector - CSS selector
     * @returns {NodeList} - List of elements
     */
    queryElements(selector) {
        return document.querySelectorAll(selector);
    },

    /**
     * Add event listener with error handling
     * @param {string|HTMLElement} element - Element or selector
     * @param {string} event - Event type
     * @param {Function} handler - Event handler function
     */
    addEvent(element, event, handler) {
        const el = typeof element === 'string' ? this.queryElement(element) : element;
        if (el) {
            el.addEventListener(event, handler);
        }
    }
};

/**
 * UI Utilities
 */
const UIUtils = {
    /**
     * Show success message in result area
     * @param {string} message - Success message
     * @param {string} targetId - ID of target element (default: 'result')
     */
    showSuccess(message, targetId = 'result') {
        const target = DOMUtils.getElement(targetId);
        if (target) {
            target.innerHTML = `<div class="success">${message}</div>`;
        }
    },

    /**
     * Show error message in result area
     * @param {string} message - Error message
     * @param {string} targetId - ID of target element (default: 'result')
     */
    showError(message, targetId = 'result') {
        const target = DOMUtils.getElement(targetId);
        if (target) {
            target.innerHTML = `<div class="error">${message}</div>`;
        }
    },

    /**
     * Clear highlights from elements
     * @param {string} containerId - Container element ID
     * @param {string} property - CSS property to clear (default: 'outline')
     */
    clearHighlights(containerId, property = 'outline') {
        const container = DOMUtils.getElement(containerId);
        if (container) {
            const elements = container.querySelectorAll('*');
            elements.forEach(el => {
                el.style[property] = '';
            });
        }
    },

    /**
     * Highlight elements with a specific style
     * @param {NodeList|Array} elements - Elements to highlight
     * @param {string} style - CSS style to apply
     */
    highlightElements(elements, style = 'outline: 2px solid #e74c3c') {
        elements.forEach(el => {
            el.style.cssText += style;
        });
    }
};

/**
 * Color Utilities
 */
const ColorUtils = {
    /**
     * Update color preview area
     * @param {string} color - Color value
     * @param {string} targetId - Preview element ID (default: 'color-preview')
     * @param {string} text - Display text (optional)
     */
    updateColorPreview(color, targetId = 'color-preview', text = null) {
        const preview = DOMUtils.getElement(targetId);
        if (preview) {
            preview.style.background = color;
            preview.textContent = text || `Background: ${color}`;
        }
    },

    /**
     * Sync color input and picker
     * @param {string} pickerId - Color picker ID
     * @param {string} inputId - Text input ID
     * @param {string} previewId - Preview element ID
     */
    syncColorControls(pickerId, inputId, previewId = 'color-preview') {
        const picker = DOMUtils.getElement(pickerId);
        const input = DOMUtils.getElement(inputId);

        if (!picker || !input) return;

        const updatePreview = () => {
            this.updateColorPreview(input.value, previewId);
        };

        picker.addEventListener('change', function () {
            input.value = this.value;
            updatePreview();
        });

        input.addEventListener('input', function () {
            picker.value = this.value;
            updatePreview();
        });

        // Initial sync
        updatePreview();
    }
};

/**
 * Form Utilities
 */
const FormUtils = {
    /**
     * Initialize form validation
     * @param {string} formId - Form element ID
     * @param {Function} validator - Validation function
     */
    initializeValidation(formId, validator) {
        const form = DOMUtils.getElement(formId);
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                if (validator()) {
                    UIUtils.showSuccess('Form submitted successfully!');
                }
            });
        }
    },

    /**
     * Add Enter key support to input
     * @param {string} inputId - Input element ID
     * @param {Function} callback - Function to call on Enter
     */
    addEnterKeySupport(inputId, callback) {
        const input = DOMUtils.getElement(inputId);
        if (input) {
            input.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    callback();
                }
            });
        }
    }
};

/**
 * Animation Utilities
 */
const AnimationUtils = {
    /**
     * Smooth scroll to element
     * @param {string} elementId - Target element ID
     * @param {string} behavior - Scroll behavior (default: 'smooth')
     */
    scrollToElement(elementId, behavior = 'smooth') {
        const element = DOMUtils.getElement(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: behavior,
                block: 'start'
            });
        }
    },

    /**
     * Add fade in animation to element
     * @param {string} elementId - Element ID
     * @param {number} delay - Delay in milliseconds
     */
    fadeIn(elementId, delay = 0) {
        const element = DOMUtils.getElement(elementId);
        if (element) {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transition = 'opacity 0.5s ease';
                element.style.opacity = '1';
            }, delay);
        }
    }
};

// Export utilities for use in other files
window.DOMUtils = DOMUtils;
window.UIUtils = UIUtils;
window.ColorUtils = ColorUtils;
window.FormUtils = FormUtils;
window.AnimationUtils = AnimationUtils;