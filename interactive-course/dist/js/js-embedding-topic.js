// JavaScript Embedding Topic JavaScript
// This file handles all interactive functionality for the JavaScript Embedding topic

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all interactive elements
    initializeInlineExamples();
    initializeInternalExamples();
    initializeExternalExamples();
    initializeLiveEditor();

    // Initialize the preview when page loads
    updatePreview();

    console.log('JavaScript Embedding topic JavaScript initialized');
});

// Inline JavaScript examples
function initializeInlineExamples() {
    // Add event listeners for inline demo buttons
    const inlineButtons = document.querySelectorAll('.inline-examples button');
    inlineButtons.forEach(button => {
        if (button.textContent.includes('Alert Example')) {
            button.onclick = () => alert('Hello from inline JavaScript!');
        } else if (button.textContent.includes('Change Background')) {
            button.onclick = () => {
                const demo = document.getElementById('inline-demo');
                if (demo) {
                    demo.style.background = 'lightblue';
                }
            };
        }
    });
}

// Internal JavaScript examples
function initializeInternalExamples() {
    const internalButton = document.querySelector('[onclick*="internalGreet"]');
    const datetimeButton = document.querySelector('[onclick*="showDateTime"]');

    if (internalButton) {
        internalButton.onclick = internalGreet;
    }

    if (datetimeButton) {
        datetimeButton.onclick = showDateTime;
    }
}

function internalGreet() {
    alert('Hello from internal JavaScript!');
}

function showDateTime() {
    const now = new Date();
    const display = document.getElementById('datetime-display');
    display.innerHTML = `<strong>Current Date & Time:</strong><br>${now.toLocaleString()}`;
    display.style.display = 'block';
}

// External JavaScript examples
function initializeExternalExamples() {
    const calculateButton = document.querySelector('[onclick*="calculateWithExternal"]');

    if (calculateButton) {
        calculateButton.onclick = calculateWithExternal;
    }
}

function calculateWithExternal() {
    const price = parseFloat(document.getElementById('price-input').value);
    if (isNaN(price) || price <= 0) {
        alert('Please enter a valid price!');
        return;
    }

    const tax = 0.08; // 8% tax
    const total = price + (price * tax);
    const result = document.getElementById('calculation-result');
    result.innerHTML = `
        <strong>Calculation Result:</strong><br>
        Price: $${price.toFixed(2)}<br>
        Tax (8%): $${(price * tax).toFixed(2)}<br>
        <strong>Total: $${total.toFixed(2)}</strong>
    `;
    result.style.display = 'block';
}

// Live HTML/JavaScript editor
function initializeLiveEditor() {
    const updateButton = document.querySelector('[onclick*="updatePreview"]');

    if (updateButton) {
        updateButton.onclick = updatePreview;
    }

    // Auto-update on editor changes (debounced)
    const editor = document.getElementById('html-editor');
    if (editor) {
        let updateTimeout;
        editor.addEventListener('input', function () {
            clearTimeout(updateTimeout);
            updateTimeout = setTimeout(updatePreview, 1000); // Auto-update after 1 second of no typing
        });
    }
}

function updatePreview() {
    const htmlCode = document.getElementById('html-editor').value;
    const preview = document.getElementById('preview-frame');
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    preview.src = url;
}

// Best practices demonstrations
function demonstrateBestPractice(practiceType) {
    const examples = {
        'separation': {
            title: 'Separation of Concerns',
            description: 'Keep HTML, CSS, and JavaScript in separate files for better maintainability.',
            code: `// Good: External JavaScript
function handleClick() {
    console.log('Button clicked!');
}

// Bad: Inline JavaScript
// <button onclick="console.log('Clicked')">Click</button>`
        },
        'performance': {
            title: 'Performance Optimization',
            description: 'Load scripts at the bottom of the page or use async/defer attributes.',
            code: `<!-- Good: Scripts at bottom -->
<script src="script.js"></script>
</body>

<!-- Or use defer -->
<script src="script.js" defer></script>`
        },
        'accessibility': {
            title: 'Accessibility',
            description: 'Ensure JavaScript interactions are keyboard accessible and screen reader friendly.',
            code: `// Good: Accessible button
button.addEventListener('click', handleClick);
button.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        handleClick();
    }
});`
        }
    };

    const example = examples[practiceType];
    if (example) {
        showBestPracticeModal(example);
    }
}

function showBestPracticeModal(example) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'best-practice-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${example.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${example.description}</p>
                    <pre><code>${example.code}</code></pre>
                </div>
            </div>
        </div>
    `;

    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    closeBtn.onclick = () => document.body.removeChild(modal);
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            document.body.removeChild(modal);
        }
    };
}

// Code example runners
function runEmbeddingExample(exampleType) {
    const examples = {
        'inline': () => {
            alert('This is an inline JavaScript example!');
        },
        'internal': () => {
            internalGreet();
        },
        'external': () => {
            calculateWithExternal();
        }
    };

    if (examples[exampleType]) {
        examples[exampleType]();
    }
}

// Utility functions
function resetEmbeddingExamples() {
    // Reset inline demo
    const inlineDemo = document.getElementById('inline-demo');
    if (inlineDemo) {
        inlineDemo.style.background = '#f3f4f6';
        inlineDemo.innerHTML = '<p>Click the buttons above to see inline JavaScript in action!</p>';
    }

    // Hide datetime display
    const datetimeDisplay = document.getElementById('datetime-display');
    if (datetimeDisplay) {
        datetimeDisplay.classList.remove('show');
        datetimeDisplay.innerHTML = '';
    }

    // Hide calculation result
    const calculationResult = document.getElementById('calculation-result');
    if (calculationResult) {
        calculationResult.classList.remove('show');
        calculationResult.innerHTML = '';
    }

    // Clear price input
    const priceInput = document.getElementById('price-input');
    if (priceInput) {
        priceInput.value = '';
    }
}

// Navigation functions
function navigateToUnit() {
    window.location.href = 'js-introduction.html';
}

function navigateToNext() {
    window.location.href = 'js-variables.html';
}

// Export functions that might be called from HTML
window.internalGreet = internalGreet;
window.showDateTime = showDateTime;
window.calculateWithExternal = calculateWithExternal;
window.updatePreview = updatePreview;
window.demonstrateBestPractice = demonstrateBestPractice;
window.runEmbeddingExample = runEmbeddingExample;
window.resetEmbeddingExamples = resetEmbeddingExamples;
window.navigateToUnit = navigateToUnit;
window.navigateToNext = navigateToNext;
