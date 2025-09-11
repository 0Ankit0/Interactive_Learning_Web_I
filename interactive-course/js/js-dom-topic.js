// JavaScript DOM Topic JavaScript
// This file handles all interactive functionality for the JavaScript DOM topic

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all interactive elements
    initializeSelectorDemo();
    initializeContentEditor();
    initializeStyleEditor();
    initializeAttributeEditor();

    console.log('JavaScript DOM topic JavaScript initialized');
});

// Element Selector Demo
function initializeSelectorDemo() {
    const tryButton = document.querySelector('[onclick*="trySelector"]');
    const selectorButtons = document.querySelectorAll('[onclick*="setSelector"]');

    if (tryButton) {
        tryButton.onclick = trySelector;
    }

    // Initialize selector example buttons
    selectorButtons.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        const match = onclickAttr.match(/setSelector\('([^']+)'\)/);
        if (match) {
            const selector = match[1];
            button.onclick = () => setSelector(selector);
        }
    });

    // Add Enter key support for selector input
    const selectorInput = document.getElementById('selector-input');
    if (selectorInput) {
        selectorInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                trySelector();
            }
        });
    }

    // Initial demo
    trySelector();
}

function trySelector() {
    const selectorInput = document.getElementById('selector-input');
    const resultDiv = document.getElementById('selector-result');

    if (!selectorInput || !resultDiv) return;

    const selector = selectorInput.value;

    try {
        // Reset previous highlights
        const allElements = document.querySelectorAll('#demo-content *');
        allElements.forEach(el => el.style.outline = '');

        // Try the selector
        const elements = document.querySelectorAll(`#demo-content ${selector}`);

        if (elements.length === 0) {
            resultDiv.innerHTML = '<div class="error">No elements found with that selector.</div>';
            return;
        }

        // Highlight found elements
        elements.forEach(el => {
            el.style.outline = '2px solid #e74c3c';
        });

        // Show results
        let result = `<div class="success">Found ${elements.length} element(s):</div><ul>`;
        elements.forEach((el, index) => {
            const tagName = el.tagName.toLowerCase();
            const id = el.id ? '#' + el.id : '';
            const className = el.className ? '.' + el.className.replace(/ /g, '.') : '';
            const text = el.textContent.substring(0, 30);
            const truncated = el.textContent.length > 30 ? '...' : '';

            result += `<li>${tagName}${id}${className}: "${text}${truncated}"</li>`;
        });
        result += '</ul>';

        resultDiv.innerHTML = result;
    } catch (error) {
        resultDiv.innerHTML = `<div class="error">Invalid selector: ${error.message}</div>`;
    }
}

function setSelector(selector) {
    const selectorInput = document.getElementById('selector-input');
    if (selectorInput) {
        selectorInput.value = selector;
        trySelector();
    }
}

// Content Editor Functions
function initializeContentEditor() {
    // Initialize content editor buttons
    const changeTitleBtn = document.querySelector('[onclick*="changeTitle"]');
    const changeParagraphBtn = document.querySelector('[onclick*="changeParagraph"]');
    const changeInputBtn = document.querySelector('[onclick*="changeInputValue"]');
    const resetBtn = document.querySelector('[onclick*="resetContent"]');

    if (changeTitleBtn) changeTitleBtn.onclick = changeTitle;
    if (changeParagraphBtn) changeParagraphBtn.onclick = changeParagraph;
    if (changeInputBtn) changeInputBtn.onclick = changeInputValue;
    if (resetBtn) resetBtn.onclick = resetContent;

    // Add Enter key support for inputs
    const titleInput = document.getElementById('title-input');
    const paragraphInput = document.getElementById('paragraph-input');
    const inputValue = document.getElementById('input-value');

    if (titleInput) {
        titleInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') changeTitle();
        });
    }

    if (paragraphInput) {
        paragraphInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') changeParagraph();
        });
    }

    if (inputValue) {
        inputValue.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') changeInputValue();
        });
    }
}

function changeTitle() {
    const titleInput = document.getElementById('title-input');
    const editableTitle = document.getElementById('editable-title');

    if (!titleInput || !editableTitle) return;

    const newText = titleInput.value;
    if (newText) {
        editableTitle.textContent = newText;
        titleInput.value = '';
    }
}

function changeParagraph() {
    const paragraphInput = document.getElementById('paragraph-input');
    const editableParagraph = document.getElementById('editable-paragraph');

    if (!paragraphInput || !editableParagraph) return;

    const newHTML = paragraphInput.value;
    if (newHTML) {
        editableParagraph.innerHTML = newHTML;
        paragraphInput.value = '';
    }
}

function changeInputValue() {
    const inputValueField = document.getElementById('input-value');
    const editableInput = document.getElementById('editable-input');

    if (!inputValueField || !editableInput) return;

    const newValue = inputValueField.value;
    if (newValue) {
        editableInput.value = newValue;
        inputValueField.value = '';
    }
}

function resetContent() {
    const editableTitle = document.getElementById('editable-title');
    const editableParagraph = document.getElementById('editable-paragraph');
    const editableInput = document.getElementById('editable-input');

    if (editableTitle) editableTitle.textContent = 'Editable Title';
    if (editableParagraph) editableParagraph.innerHTML = 'This paragraph can be modified.';
    if (editableInput) editableInput.value = 'Input value';
}

// Style Editor Functions
function initializeStyleEditor() {
    // Initialize style controls
    const styleControls = ['bg-color', 'text-color', 'font-size', 'border-radius', 'padding', 'width'];

    styleControls.forEach(controlId => {
        const control = document.getElementById(controlId);
        if (control) {
            control.addEventListener('input', updateStyles);
        }
    });

    // Initialize class toggle buttons
    const toggleButtons = document.querySelectorAll('[onclick*="toggleClass"]');
    toggleButtons.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        const match = onclickAttr.match(/toggleClass\('([^']+)'\)/);
        if (match) {
            const className = match[1];
            button.onclick = () => toggleClass(className);
        }
    });

    // Initial styles update
    updateStyles();
}

function updateStyles() {
    const styleBox = document.getElementById('style-box');

    if (!styleBox) return;

    const bgColor = document.getElementById('bg-color')?.value || '#ffffff';
    const textColor = document.getElementById('text-color')?.value || '#000000';
    const fontSize = document.getElementById('font-size')?.value || '16';
    const borderRadius = document.getElementById('border-radius')?.value || '0';
    const padding = document.getElementById('padding')?.value || '16';
    const width = document.getElementById('width')?.value || '200';

    // Update element styles
    styleBox.style.backgroundColor = bgColor;
    styleBox.style.color = textColor;
    styleBox.style.fontSize = fontSize + 'px';
    styleBox.style.borderRadius = borderRadius + 'px';
    styleBox.style.padding = padding + 'px';
    styleBox.style.width = width + 'px';

    // Update display values
    const fontSizeValue = document.getElementById('font-size-value');
    const borderRadiusValue = document.getElementById('border-radius-value');
    const paddingValue = document.getElementById('padding-value');
    const widthValue = document.getElementById('width-value');

    if (fontSizeValue) fontSizeValue.textContent = fontSize + 'px';
    if (borderRadiusValue) borderRadiusValue.textContent = borderRadius + 'px';
    if (paddingValue) paddingValue.textContent = padding + 'px';
    if (widthValue) widthValue.textContent = width + 'px';

    // Update generated CSS
    const css = `#style-box {
  background-color: ${bgColor};
  color: ${textColor};
  font-size: ${fontSize}px;
  border-radius: ${borderRadius}px;
  padding: ${padding}px;
  width: ${width}px;
}`;

    const cssOutput = document.getElementById('generated-css-output');
    if (cssOutput) {
        cssOutput.textContent = css;

        // Apply syntax highlighting if Prism.js is available
        if (typeof Prism !== 'undefined') {
            Prism.highlightElement(cssOutput);
        }
    }
}

function toggleClass(className) {
    const styleBox = document.getElementById('style-box');
    if (styleBox) {
        styleBox.classList.toggle(className);
    }
}

// Attribute Editor Functions
function initializeAttributeEditor() {
    // Initialize attribute editor buttons
    const updateButtons = [
        { selector: '[onclick*="updateImageSrc"]', func: updateImageSrc },
        { selector: '[onclick*="updateImageAlt"]', func: updateImageAlt },
        { selector: '[onclick*="updateImageData"]', func: updateImageData },
        { selector: '[onclick*="updateLinkHref"]', func: updateLinkHref },
        { selector: '[onclick*="updateLinkTarget"]', func: updateLinkTarget }
    ];

    updateButtons.forEach(({ selector, func }) => {
        const button = document.querySelector(selector);
        if (button) {
            button.onclick = func;
        }
    });

    // Add Enter key support for inputs
    const inputs = ['img-src', 'img-alt', 'img-category', 'link-href', 'link-target'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    switch (inputId) {
                        case 'img-src': updateImageSrc(); break;
                        case 'img-alt': updateImageAlt(); break;
                        case 'img-category': updateImageData(); break;
                        case 'link-href': updateLinkHref(); break;
                        case 'link-target': updateLinkTarget(); break;
                    }
                }
            });
        }
    });

    // Initial attribute display
    updateAttributeDisplay();
}

function updateImageSrc() {
    const input = document.getElementById('img-src');
    const image = document.getElementById('demo-image');

    if (input && image && input.value) {
        image.setAttribute('src', input.value);
        updateAttributeDisplay();
    }
}

function updateImageAlt() {
    const input = document.getElementById('img-alt');
    const image = document.getElementById('demo-image');

    if (input && image && input.value) {
        image.setAttribute('alt', input.value);
        updateAttributeDisplay();
    }
}

function updateImageData() {
    const input = document.getElementById('img-category');
    const image = document.getElementById('demo-image');

    if (input && image && input.value) {
        image.dataset.category = input.value;
        updateAttributeDisplay();
    }
}

function updateLinkHref() {
    const input = document.getElementById('link-href');
    const link = document.getElementById('demo-link');

    if (input && link && input.value) {
        link.setAttribute('href', input.value);
        updateAttributeDisplay();
    }
}

function updateLinkTarget() {
    const input = document.getElementById('link-target');
    const link = document.getElementById('demo-link');

    if (input && link && input.value) {
        link.setAttribute('target', input.value);
        updateAttributeDisplay();
    }
}

function updateAttributeDisplay() {
    const img = document.getElementById('demo-image');
    const link = document.getElementById('demo-link');
    const display = document.getElementById('attribute-list');

    if (!img || !link || !display) return;

    let html = '<div class="attribute-group"><h6>Image Attributes:</h6>';

    // Image attributes
    const imgAttributes = ['src', 'alt', 'title', 'data-category', 'data-size'];
    imgAttributes.forEach(attr => {
        let value;
        if (attr.startsWith('data-')) {
            const dataKey = attr.replace('data-', '');
            value = img.dataset[dataKey];
        } else {
            value = img.getAttribute(attr);
        }

        if (value) {
            html += `<div class="attribute-item"><strong>${attr}:</strong> "${value}"</div>`;
        }
    });
    html += '</div>';

    // Link attributes
    html += '<div class="attribute-group"><h6>Link Attributes:</h6>';
    const linkAttributes = ['href', 'target', 'title'];
    linkAttributes.forEach(attr => {
        const value = link.getAttribute(attr);
        if (value) {
            html += `<div class="attribute-item"><strong>${attr}:</strong> "${value}"</div>`;
        }
    });
    html += '</div>';

    display.innerHTML = html;
}

// Navigation functions
function previousTopic() {
    window.location.href = 'js-dialogs.html';
}

function nextTopic() {
    window.location.href = 'js-events.html';
}

// Utility functions
function resetAllDemos() {
    // Reset selector demo
    const selectorInput = document.getElementById('selector-input');
    const selectorResult = document.getElementById('selector-result');

    if (selectorInput) selectorInput.value = 'p';
    if (selectorResult) selectorResult.innerHTML = '';

    // Reset highlighted elements
    const allElements = document.querySelectorAll('#demo-content *');
    allElements.forEach(el => el.style.outline = '');

    // Reset content editor
    resetContent();

    const contentInputs = ['title-input', 'paragraph-input', 'input-value'];
    contentInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) input.value = '';
    });

    // Reset style editor
    const styleControls = {
        'bg-color': '#ffffff',
        'text-color': '#000000',
        'font-size': '16',
        'border-radius': '0',
        'padding': '16',
        'width': '200'
    };

    Object.entries(styleControls).forEach(([id, value]) => {
        const control = document.getElementById(id);
        if (control) control.value = value;
    });

    // Remove all toggle classes
    const styleBox = document.getElementById('style-box');
    if (styleBox) {
        styleBox.className = '';
    }

    // Reset attribute editor
    const attributeInputs = ['img-src', 'img-alt', 'img-category', 'link-href', 'link-target'];
    attributeInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) input.value = '';
    });

    // Reset demo elements to defaults
    const demoImage = document.getElementById('demo-image');
    const demoLink = document.getElementById('demo-link');

    if (demoImage) {
        demoImage.src = 'https://picsum.photos/200/150?random=1';
        demoImage.alt = 'Demo image';
        demoImage.removeAttribute('data-category');
    }

    if (demoLink) {
        demoLink.href = '#';
        demoLink.removeAttribute('target');
    }

    // Update displays
    updateStyles();
    updateAttributeDisplay();
    trySelector();
}

// Export functions that might be called from HTML
window.trySelector = trySelector;
window.setSelector = setSelector;
window.changeTitle = changeTitle;
window.changeParagraph = changeParagraph;
window.changeInputValue = changeInputValue;
window.resetContent = resetContent;
window.updateStyles = updateStyles;
window.toggleClass = toggleClass;
window.updateImageSrc = updateImageSrc;
window.updateImageAlt = updateImageAlt;
window.updateImageData = updateImageData;
window.updateLinkHref = updateLinkHref;
window.updateLinkTarget = updateLinkTarget;
window.updateAttributeDisplay = updateAttributeDisplay;
window.previousTopic = previousTopic;
window.nextTopic = nextTopic;
window.resetAllDemos = resetAllDemos;
