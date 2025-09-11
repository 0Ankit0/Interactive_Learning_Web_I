// Flexbox and Grid Topic JavaScript
// This file handles all interactive functionality for the Flexbox and Grid topic

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all interactive elements
    initializeFlexboxControls();
    initializeGridControls();
    initializeResponsiveDemo();

    console.log('Flexbox and Grid topic JavaScript initialized');
});

// Flexbox demonstration controls
function initializeFlexboxControls() {
    const flexContainer = document.querySelector('.flex-container');
    if (!flexContainer) return;

    // Create control panel for flexbox
    createFlexboxControls();
}

function createFlexboxControls() {
    const controlsContainer = document.getElementById('flexbox-controls');
    if (!controlsContainer) return;

    const controls = [
        { label: 'Flex Direction', property: 'flex-direction', values: ['row', 'column', 'row-reverse', 'column-reverse'] },
        { label: 'Justify Content', property: 'justify-content', values: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] },
        { label: 'Align Items', property: 'align-items', values: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'] },
        { label: 'Flex Wrap', property: 'flex-wrap', values: ['nowrap', 'wrap', 'wrap-reverse'] }
    ];

    controls.forEach(control => {
        const controlGroup = createControlGroup(control.label, control.property, control.values, 'flex');
        controlsContainer.appendChild(controlGroup);
    });
}

// Grid demonstration controls
function initializeGridControls() {
    const gridContainer = document.querySelector('.grid-container');
    if (!gridContainer) return;

    createGridControls();
}

function createGridControls() {
    const controlsContainer = document.getElementById('grid-controls');
    if (!controlsContainer) return;

    const controls = [
        { label: 'Grid Template Columns', property: 'grid-template-columns', values: ['1fr', '1fr 1fr', '1fr 1fr 1fr', 'repeat(4, 1fr)', '200px 1fr 200px'] },
        { label: 'Grid Gap', property: 'gap', values: ['10px', '20px', '30px', '1rem 2rem'] },
        { label: 'Grid Auto Rows', property: 'grid-auto-rows', values: ['auto', '100px', 'minmax(100px, auto)'] },
        { label: 'Align Items', property: 'align-items', values: ['stretch', 'start', 'center', 'end'] }
    ];

    controls.forEach(control => {
        const controlGroup = createControlGroup(control.label, control.property, control.values, 'grid');
        controlsContainer.appendChild(controlGroup);
    });
}

function createControlGroup(label, property, values, type) {
    const group = document.createElement('div');
    group.className = 'control-group';

    const labelElement = document.createElement('label');
    labelElement.textContent = label;

    const select = document.createElement('select');
    select.addEventListener('change', function () {
        updateLayout(type, property, this.value);
    });

    values.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });

    group.appendChild(labelElement);
    group.appendChild(select);

    return group;
}

function updateLayout(type, property, value) {
    const container = document.querySelector(`.${type}-container`);
    if (container) {
        container.style[property] = value;

        // Show current property value
        showPropertyUpdate(type, property, value);
    }
}

function showPropertyUpdate(type, property, value) {
    const notification = document.createElement('div');
    notification.className = 'property-update';
    notification.innerHTML = `
        <strong>${type.toUpperCase()}:</strong> ${property} = ${value}
    `;

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
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Responsive design demonstration
function initializeResponsiveDemo() {
    createDevicePreview();
}

function createDevicePreview() {
    const previewContainer = document.getElementById('device-preview');
    if (!previewContainer) return;

    const devices = [
        { name: 'Desktop', width: '100%', class: 'desktop' },
        { name: 'Tablet', width: '768px', class: 'tablet' },
        { name: 'Mobile', width: '375px', class: 'mobile' }
    ];

    devices.forEach(device => {
        const button = document.createElement('button');
        button.className = 'device-button btn-secondary';
        button.textContent = device.name;
        button.onclick = () => changeDeviceView(device.width, device.class);

        previewContainer.appendChild(button);
    });
}

function changeDeviceView(width, deviceClass) {
    const flexDemo = document.querySelector('.flexbox-demo');
    const gridDemo = document.querySelector('.grid-demo');

    [flexDemo, gridDemo].forEach(demo => {
        if (demo) {
            demo.style.maxWidth = width;
            demo.className = `${demo.className.split(' ')[0]} ${deviceClass}`;
        }
    });

    showDeviceChange(deviceClass, width);
}

function showDeviceChange(device, width) {
    const notification = document.createElement('div');
    notification.className = 'device-notification';
    notification.textContent = `Viewing in ${device} mode (${width})`;

    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #10b981;
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 2000);
}

// Interactive layout builder
function createLayoutBuilder() {
    const builderContainer = document.getElementById('layout-builder');
    if (!builderContainer) return;

    builderContainer.innerHTML = `
        <h4>Interactive Layout Builder</h4>
        <div class="builder-controls">
            <button onclick="addFlexItem()" class="btn-primary">Add Flex Item</button>
            <button onclick="addGridItem()" class="btn-primary">Add Grid Item</button>
            <button onclick="clearLayout()" class="btn-secondary">Clear Layout</button>
        </div>
        <div class="builder-preview" id="builder-preview">
            <div class="flex-demo-area" id="flex-demo-area">
                <h5>Flexbox Area</h5>
                <div class="demo-flex-container"></div>
            </div>
            <div class="grid-demo-area" id="grid-demo-area">
                <h5>Grid Area</h5>
                <div class="demo-grid-container"></div>
            </div>
        </div>
    `;
}

function addFlexItem() {
    const container = document.querySelector('.demo-flex-container');
    if (container) {
        const item = document.createElement('div');
        item.className = 'demo-flex-item';
        item.textContent = container.children.length + 1;
        item.style.cssText = `
            background: ${getRandomColor()};
            padding: 20px;
            color: white;
            text-align: center;
            font-weight: bold;
            border-radius: 4px;
            margin: 4px;
        `;
        container.appendChild(item);
    }
}

function addGridItem() {
    const container = document.querySelector('.demo-grid-container');
    if (container) {
        const item = document.createElement('div');
        item.className = 'demo-grid-item';
        item.textContent = container.children.length + 1;
        item.style.cssText = `
            background: ${getRandomColor()};
            padding: 20px;
            color: white;
            text-align: center;
            font-weight: bold;
            border-radius: 4px;
        `;
        container.appendChild(item);
    }
}

function clearLayout() {
    const flexContainer = document.querySelector('.demo-flex-container');
    const gridContainer = document.querySelector('.demo-grid-container');

    if (flexContainer) flexContainer.innerHTML = '';
    if (gridContainer) gridContainer.innerHTML = '';
}

function getRandomColor() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f', '#bb8fce'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Code examples
function showFlexboxCode() {
    const modal = createCodeModal('Flexbox CSS', `
/* Flexbox Container */
.flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

/* Flex Items */
.flex-item {
    flex: 1; /* Grow to fill available space */
    padding: 1rem;
    background: #3b82f6;
    color: white;
    text-align: center;
}

/* Responsive Flexbox */
@media (max-width: 768px) {
    .flex-container {
        flex-direction: column;
    }
}
    `);

    document.body.appendChild(modal);
}

function showGridCode() {
    const modal = createCodeModal('CSS Grid', `
/* Grid Container */
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    padding: 1rem;
}

/* Grid Items */
.grid-item {
    padding: 1rem;
    background: #10b981;
    color: white;
    text-align: center;
}

/* Responsive Grid */
@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
    }
}
    `);

    document.body.appendChild(modal);
}

function createCodeModal(title, code) {
    const modal = document.createElement('div');
    modal.className = 'code-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <pre><code>${code}</code></pre>
                </div>
            </div>
        </div>
    `;

    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.onclick = () => document.body.removeChild(modal);

    modal.onclick = (e) => {
        if (e.target === modal.querySelector('.modal-overlay')) {
            document.body.removeChild(modal);
        }
    };

    return modal;
}

// Utility functions
function resetAllLayouts() {
    // Reset flex container
    const flexContainer = document.querySelector('.flex-container');
    if (flexContainer) {
        flexContainer.style.cssText = 'display: flex;';
    }

    // Reset grid container
    const gridContainer = document.querySelector('.grid-container');
    if (gridContainer) {
        gridContainer.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;';
    }

    // Reset device view
    changeDeviceView('100%', 'desktop');

    // Clear builder
    clearLayout();
}

// Export functions that might be called from HTML
window.updateLayout = updateLayout;
window.changeDeviceView = changeDeviceView;
window.addFlexItem = addFlexItem;
window.addGridItem = addGridItem;
window.clearLayout = clearLayout;
window.showFlexboxCode = showFlexboxCode;
window.showGridCode = showGridCode;
window.resetAllLayouts = resetAllLayouts;
