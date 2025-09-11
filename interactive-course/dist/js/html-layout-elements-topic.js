// HTML Layout Elements Topic JavaScript
document.addEventListener('DOMContentLoaded', function () {
    initializeLayoutElementsTopic();
});

function initializeLayoutElementsTopic() {
    initializeDivDemo();
    initializeSpanDemo();
    initializeIframeDemo();
    initializeCanvasDemo();
    initializeQuiz();
    addEventListeners();
}

// Div Demo Functions
function initializeDivDemo() {
    const addDivBtn = document.getElementById('addDiv');
    const styleDivBtn = document.getElementById('styleDiv');
    const nestDivBtn = document.getElementById('nestDiv');
    const clearDivsBtn = document.getElementById('clearDivs');
    const divOutput = document.getElementById('divOutput');

    if (!divOutput) return;

    let divCounter = 1;
    let isStyled = false;

    // Add div functionality
    if (addDivBtn) {
        addDivBtn.addEventListener('click', function () {
            const newDiv = document.createElement('div');
            newDiv.className = 'sample-div';
            newDiv.textContent = `New div element #${divCounter}`;
            newDiv.style.marginBottom = '10px';
            newDiv.style.padding = '15px';
            newDiv.style.backgroundColor = getRandomColor();
            newDiv.style.border = '2px solid #ddd';
            newDiv.style.borderRadius = '8px';

            divOutput.appendChild(newDiv);
            divCounter++;

            showMessage(`✓ Added div element #${divCounter - 1}`, 'success');
        });
    }

    // Style toggle functionality
    if (styleDivBtn) {
        styleDivBtn.addEventListener('click', function () {
            const allDivs = divOutput.querySelectorAll('.sample-div');
            isStyled = !isStyled;

            allDivs.forEach(div => {
                if (isStyled) {
                    div.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    div.style.transform = 'translateY(-2px)';
                    div.style.fontWeight = 'bold';
                    div.style.color = 'white';
                } else {
                    div.style.boxShadow = 'none';
                    div.style.transform = 'none';
                    div.style.fontWeight = 'normal';
                    div.style.color = 'black';
                }
            });

            this.textContent = isStyled ? 'Remove Styling' : 'Toggle Styling';
            showMessage(isStyled ? '✓ Applied enhanced styling' : '✓ Removed styling', 'success');
        });
    }

    // Nest div functionality
    if (nestDivBtn) {
        nestDivBtn.addEventListener('click', function () {
            const lastDiv = divOutput.querySelector('.sample-div:last-child');
            if (lastDiv) {
                const nestedDiv = document.createElement('div');
                nestedDiv.className = 'nested-div';
                nestedDiv.textContent = 'Nested div inside';
                nestedDiv.style.margin = '10px 0';
                nestedDiv.style.padding = '10px';
                nestedDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                nestedDiv.style.border = '2px dashed #666';
                nestedDiv.style.borderRadius = '4px';

                lastDiv.appendChild(nestedDiv);
                showMessage('✓ Added nested div', 'success');
            } else {
                showMessage('⚠ Add a div first before nesting', 'warning');
            }
        });
    }

    // Clear all functionality
    if (clearDivsBtn) {
        clearDivsBtn.addEventListener('click', function () {
            divOutput.innerHTML = '<div class="sample-div">Sample div element</div>';
            divCounter = 1;
            isStyled = false;
            if (styleDivBtn) styleDivBtn.textContent = 'Toggle Styling';
            showMessage('✓ Cleared all divs', 'success');
        });
    }
}

// Span Demo Functions
function initializeSpanDemo() {
    const spanTextInput = document.getElementById('spanText');
    const highlightBtn = document.getElementById('highlightSpan');
    const colorBtn = document.getElementById('colorSpan');
    const emphasisBtn = document.getElementById('emphasisSpan');
    const spanOutput = document.getElementById('spanOutput');

    if (!spanOutput) return;

    // Highlight functionality
    if (highlightBtn) {
        highlightBtn.addEventListener('click', function () {
            const text = spanTextInput ? spanTextInput.value : 'sample';
            applySpanStyle(spanOutput, text, 'highlight');
        });
    }

    // Color functionality
    if (colorBtn) {
        colorBtn.addEventListener('click', function () {
            const text = spanTextInput ? spanTextInput.value : 'sample';
            applySpanStyle(spanOutput, text, 'color');
        });
    }

    // Emphasis functionality
    if (emphasisBtn) {
        emphasisBtn.addEventListener('click', function () {
            const text = spanTextInput ? spanTextInput.value : 'sample';
            applySpanStyle(spanOutput, text, 'emphasis');
        });
    }

    // Update text on input change
    if (spanTextInput) {
        spanTextInput.addEventListener('input', function () {
            updateSpanText(spanOutput, this.value);
        });
    }
}

function applySpanStyle(container, targetText, styleType) {
    if (!container) return;

    const paragraph = container.querySelector('p');
    if (!paragraph) return;

    let text = paragraph.textContent || paragraph.innerText;
    const words = text.split(' ');
    let targetWord = targetText.split(' ')[0] || 'sample';

    // Find and wrap the target word
    const wordIndex = words.findIndex(word =>
        word.toLowerCase().includes(targetWord.toLowerCase())
    );

    if (wordIndex !== -1) {
        const beforeWords = words.slice(0, wordIndex);
        const targetWordElement = words[wordIndex];
        const afterWords = words.slice(wordIndex + 1);

        let spanClass = '';
        let spanStyle = '';

        switch (styleType) {
            case 'highlight':
                spanClass = 'highlight-span';
                spanStyle = 'background: linear-gradient(135deg, #ffd700, #ffed4e); color: #333; padding: 2px 6px; border-radius: 4px; font-weight: bold;';
                break;
            case 'color':
                spanClass = 'color-span';
                spanStyle = 'color: #e74c3c; font-weight: bold; font-size: 1.1em;';
                break;
            case 'emphasis':
                spanClass = 'emphasis-span';
                spanStyle = 'background: #3498db; color: white; padding: 3px 8px; border-radius: 20px; font-size: 0.9em; text-transform: uppercase; letter-spacing: 1px;';
                break;
        }

        paragraph.innerHTML =
            beforeWords.join(' ') +
            (beforeWords.length ? ' ' : '') +
            `<span class="${spanClass}" style="${spanStyle}">${targetWordElement}</span>` +
            (afterWords.length ? ' ' : '') +
            afterWords.join(' ');

        showMessage(`✓ Applied ${styleType} styling to "${targetWordElement}"`, 'success');
    } else {
        showMessage(`⚠ Word "${targetWord}" not found in text`, 'warning');
    }
}

function updateSpanText(container, newText) {
    if (!container || !newText.trim()) return;

    const paragraph = container.querySelector('p');
    if (paragraph) {
        paragraph.textContent = newText + ' for span demonstration.';
    }
}

// Iframe Demo Functions
function initializeIframeDemo() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const iframePanels = document.querySelectorAll('.iframe-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetTab = this.dataset.tab;

            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update active panel
            iframePanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    panel.classList.add('active');
                }
            });

            showMessage(`✓ Switched to ${targetTab.replace('example', 'Example ')}`, 'success');
        });
    });
}

// Canvas Demo Functions
function initializeCanvasDemo() {
    const demoTabs = document.querySelectorAll('.demo-tab');
    const canvasContainers = document.querySelectorAll('.canvas-demo');

    // Tab switching
    demoTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const demoType = this.dataset.demo;

            // Update active tab
            demoTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update active demo
            canvasContainers.forEach(container => {
                container.classList.remove('active');
                if (container.id === demoType + '-demo') {
                    container.classList.add('active');
                }
            });
        });
    });

    // Initialize individual canvas demos
    initializeDrawingCanvas();
    initializeAnimationCanvas();
    initializeInteractiveCanvas();
}

function initializeDrawingCanvas() {
    const canvas = document.getElementById('drawingCanvas');
    const colorPicker = document.getElementById('drawColor');
    const sizePicker = document.getElementById('drawSize');
    const sizeDisplay = document.getElementById('sizeDisplay');
    const clearBtn = document.getElementById('clearCanvas');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let currentColor = '#3498db';
    let currentSize = 5;

    // Set up canvas
    canvas.style.border = '2px solid #ddd';
    canvas.style.borderRadius = '8px';
    canvas.style.backgroundColor = '#ffffff';
    canvas.style.cursor = 'crosshair';

    // Event listeners
    if (colorPicker) {
        colorPicker.addEventListener('change', function () {
            currentColor = this.value;
        });
    }

    if (sizePicker) {
        sizePicker.addEventListener('input', function () {
            currentSize = this.value;
            if (sizeDisplay) {
                sizeDisplay.textContent = this.value;
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            showMessage('✓ Canvas cleared', 'success');
        });
    }

    // Drawing functions
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function draw(e) {
        if (!isDrawing) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentSize;
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    function stopDrawing() {
        isDrawing = false;
    }

    // Touch support for mobile
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);

    function handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }
}

function initializeAnimationCanvas() {
    const canvas = document.getElementById('animationCanvas');
    const startBtn = document.getElementById('startAnimation');
    const stopBtn = document.getElementById('stopAnimation');
    const speedSlider = document.getElementById('animSpeed');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let ball = {
        x: 50,
        y: 50,
        radius: 20,
        dx: 3,
        dy: 2,
        color: '#3498db'
    };
    let speed = 1;

    // Set up canvas
    canvas.style.border = '2px solid #ddd';
    canvas.style.borderRadius = '8px';
    canvas.style.backgroundColor = '#f8f9fa';

    if (speedSlider) {
        speedSlider.addEventListener('input', function () {
            speed = parseFloat(this.value) / 5;
        });
    }

    if (startBtn) {
        startBtn.addEventListener('click', function () {
            startAnimation();
            this.disabled = true;
            if (stopBtn) stopBtn.disabled = false;
            showMessage('✓ Animation started', 'success');
        });
    }

    if (stopBtn) {
        stopBtn.addEventListener('click', function () {
            stopAnimation();
            this.disabled = true;
            if (startBtn) startBtn.disabled = false;
            showMessage('✓ Animation stopped', 'success');
        });
    }

    function startAnimation() {
        function animate() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update ball position
            ball.x += ball.dx * speed;
            ball.y += ball.dy * speed;

            // Bounce off walls
            if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
                ball.dx = -ball.dx;
                ball.color = getRandomColor();
            }
            if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
                ball.dy = -ball.dy;
                ball.color = getRandomColor();
            }

            // Draw ball
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
            ctx.fillStyle = ball.color;
            ctx.fill();
            ctx.strokeStyle = '#2c3e50';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Add trail effect
            ctx.beginPath();
            ctx.arc(ball.x - ball.dx * 3, ball.y - ball.dy * 3, ball.radius * 0.5, 0, 2 * Math.PI);
            ctx.fillStyle = ball.color + '40';
            ctx.fill();

            animationId = requestAnimationFrame(animate);
        }
        animate();
    }

    function stopAnimation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    // Initial draw
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function initializeInteractiveCanvas() {
    const canvas = document.getElementById('interactiveCanvas');
    const addShapeBtn = document.getElementById('addShape');
    const resetBtn = document.getElementById('resetShapes');
    const shapeCounter = document.getElementById('shapeCount');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let shapes = [];
    let draggedShape = null;
    let mousePos = { x: 0, y: 0 };

    // Set up canvas
    canvas.style.border = '2px solid #ddd';
    canvas.style.borderRadius = '8px';
    canvas.style.backgroundColor = '#ffffff';
    canvas.style.cursor = 'pointer';

    if (addShapeBtn) {
        addShapeBtn.addEventListener('click', addRandomShape);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            shapes = [];
            redrawCanvas();
            updateShapeCount();
            showMessage('✓ All shapes cleared', 'success');
        });
    }

    // Mouse events
    canvas.addEventListener('click', function (e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        addShapeAt(x, y);
    });

    canvas.addEventListener('mousedown', function (e) {
        const rect = canvas.getBoundingClientRect();
        mousePos.x = e.clientX - rect.left;
        mousePos.y = e.clientY - rect.top;

        // Find shape under mouse
        draggedShape = shapes.find(shape =>
            Math.sqrt(Math.pow(mousePos.x - shape.x, 2) + Math.pow(mousePos.y - shape.y, 2)) < shape.radius
        );
    });

    canvas.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect();
        const newMousePos = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

        if (draggedShape) {
            draggedShape.x += newMousePos.x - mousePos.x;
            draggedShape.y += newMousePos.y - mousePos.y;
            redrawCanvas();
        }

        mousePos = newMousePos;
    });

    canvas.addEventListener('mouseup', function () {
        draggedShape = null;
    });

    function addShapeAt(x, y) {
        const shape = {
            x: x,
            y: y,
            radius: 15 + Math.random() * 25,
            color: getRandomColor(),
            type: Math.random() > 0.5 ? 'circle' : 'square'
        };

        shapes.push(shape);
        redrawCanvas();
        updateShapeCount();
        showMessage('✓ Shape added!', 'success');
    }

    function addRandomShape() {
        const x = 50 + Math.random() * (canvas.width - 100);
        const y = 50 + Math.random() * (canvas.height - 100);
        addShapeAt(x, y);
    }

    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        shapes.forEach(shape => {
            ctx.beginPath();

            if (shape.type === 'circle') {
                ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
            } else {
                const size = shape.radius * 1.5;
                ctx.rect(shape.x - size / 2, shape.y - size / 2, size, size);
            }

            ctx.fillStyle = shape.color;
            ctx.fill();
            ctx.strokeStyle = '#2c3e50';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }

    function updateShapeCount() {
        if (shapeCounter) {
            shapeCounter.textContent = `Shapes: ${shapes.length}`;
        }
    }

    updateShapeCount();
}

// Quiz Functions
function initializeQuiz() {
    const quizSubmit = document.querySelector('.quiz-submit');
    const quizRetry = document.querySelector('.quiz-retry');

    if (quizSubmit) {
        quizSubmit.addEventListener('click', checkQuizAnswers);
    }

    if (quizRetry) {
        quizRetry.addEventListener('click', resetQuiz);
    }
}

function checkQuizAnswers() {
    const answers = {
        q1: 'b', // div
        q2: 'b', // Styling inline content
        q3: 'c', // canvas
        q4: 'a'  // Validating iframe sources
    };

    let score = 0;
    const totalQuestions = Object.keys(answers).length;

    // Check each answer
    Object.keys(answers).forEach(questionId => {
        const selectedAnswer = document.querySelector(`input[name="${questionId}"]:checked`);
        const questionElement = selectedAnswer ? selectedAnswer.closest('.quiz-question') : null;

        if (selectedAnswer && selectedAnswer.value === answers[questionId]) {
            score++;
            if (questionElement) {
                questionElement.classList.add('correct');
                questionElement.classList.remove('incorrect');
            }
        } else {
            if (questionElement) {
                questionElement.classList.add('incorrect');
                questionElement.classList.remove('correct');
            }
        }

        // Highlight correct answer
        const correctOption = document.querySelector(`input[name="${questionId}"][value="${answers[questionId]}"]`);
        if (correctOption) {
            correctOption.closest('li').classList.add('correct');
        }

        // Show incorrect selections
        if (selectedAnswer && selectedAnswer.value !== answers[questionId]) {
            selectedAnswer.closest('li').classList.add('incorrect');
        }
    });

    // Display results
    const percentage = Math.round((score / totalQuestions) * 100);
    document.getElementById('score').textContent = score;
    document.getElementById('percentage').textContent = percentage;

    document.querySelector('.quiz-results').style.display = 'block';
    document.querySelector('.quiz-submit').style.display = 'none';

    // Disable all inputs
    document.querySelectorAll('.quiz-question input').forEach(input => {
        input.disabled = true;
    });

    // Show feedback message
    let message = '';
    if (percentage >= 80) {
        message = '🎉 Excellent! You understand HTML layout elements very well.';
    } else if (percentage >= 60) {
        message = '👍 Good job! Review the missed concepts and try again.';
    } else {
        message = '📚 Keep practicing! Study the material more and retake the quiz.';
    }

    showMessage(message, percentage >= 80 ? 'success' : percentage >= 60 ? 'warning' : 'info');
}

function resetQuiz() {
    // Clear all selections and classes
    document.querySelectorAll('.quiz-question input').forEach(input => {
        input.checked = false;
        input.disabled = false;
    });

    document.querySelectorAll('.quiz-question').forEach(question => {
        question.classList.remove('correct', 'incorrect');
    });

    document.querySelectorAll('.quiz-options li').forEach(li => {
        li.classList.remove('correct', 'incorrect');
    });

    // Hide results and show submit button
    document.querySelector('.quiz-results').style.display = 'none';
    document.querySelector('.quiz-submit').style.display = 'block';
}

// Additional Event Listeners
function addEventListeners() {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Copy functionality for code examples
    document.querySelectorAll('.code-example pre').forEach(pre => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.title = 'Copy code';

        copyBtn.addEventListener('click', function () {
            const code = pre.textContent;
            navigator.clipboard.writeText(code).then(() => {
                this.innerHTML = '<i class="fas fa-check"></i>';
                showMessage('Code copied to clipboard!', 'success');
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                showMessage('Failed to copy code', 'error');
            });
        });

        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
    });

    // Element card hover effects
    document.querySelectorAll('.overview-card, .practice-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Resource card interactions
    document.querySelectorAll('.resource-card').forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.tagName !== 'A') {
                const link = this.querySelector('.resource-link');
                if (link) {
                    link.click();
                }
            }
        });
    });

    // Video card interactions
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.tagName !== 'A') {
                const link = this.querySelector('.video-link');
                if (link) {
                    link.click();
                }
            }
        });
    });
}

// Utility Functions
function getRandomColor() {
    const colors = [
        '#3498db', '#e74c3c', '#2ecc71', '#f39c12',
        '#9b59b6', '#1abc9c', '#34495e', '#e67e22',
        '#95a5a6', '#27ae60', '#2980b9', '#8e44ad'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function showMessage(message, type = 'info') {
    // Create or update message display
    let messageDiv = document.getElementById('globalMessage');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'globalMessage';
        messageDiv.className = 'global-message';
        document.body.appendChild(messageDiv);
    }

    messageDiv.textContent = message;
    messageDiv.className = `global-message ${type}`;
    messageDiv.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Add custom styles for interactive elements
function addLayoutElementsStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .element-showcase {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 2rem;
        }
        
        .showcase-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            transition: all 0.3s ease;
        }
        
        .showcase-item:hover {
            transform: scale(1.1);
            background: rgba(255, 255, 255, 0.2);
        }
        
        .showcase-item i {
            font-size: 2rem;
            color: white;
        }
        
        .showcase-item span {
            color: white;
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .interactive-demo {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 2rem;
            margin: 2rem 0;
        }
        
        .demo-controls {
            display: flex;
            gap: 1rem;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
        }
        
        .demo-controls input[type="text"] {
            padding: 0.5rem 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 6px;
            font-size: 1rem;
            min-width: 200px;
        }
        
        .demo-controls input[type="color"] {
            width: 50px;
            height: 35px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }
        
        .demo-controls input[type="range"] {
            width: 100px;
        }
        
        .demo-output {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 1.5rem;
            min-height: 100px;
        }
        
        .sample-div {
            padding: 15px;
            margin-bottom: 10px;
            background-color: #e3f2fd;
            border: 2px solid #2196f3;
            border-radius: 8px;
            transition: all 0.3s ease;
        }
        
        .nested-div {
            margin: 10px 0;
            padding: 10px;
            background-color: rgba(255, 255, 255, 0.3);
            border: 2px dashed #666;
            border-radius: 4px;
        }
        
        .layout-demo {
            margin: 2rem 0;
        }
        
        .demo-layout {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2rem;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .main-demo {
            padding: 2rem;
            background: #f8f9fa;
        }
        
        .aside-demo {
            padding: 2rem;
            background: #e9ecef;
            border-left: 3px solid #6c757d;
        }
        
        .aside-demo ul {
            list-style: none;
            padding: 0;
        }
        
        .aside-demo li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #dee2e6;
        }
        
        .iframe-demo {
            margin: 2rem 0;
        }
        
        .iframe-tabs {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .tab-btn {
            padding: 0.75rem 1.5rem;
            border: 2px solid #e5e7eb;
            background: white;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .tab-btn:hover {
            border-color: #3b82f6;
            background: #f8fafc;
        }
        
        .tab-btn.active {
            border-color: #3b82f6;
            background: #3b82f6;
            color: white;
        }
        
        .iframe-content {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .iframe-panel {
            display: none;
            padding: 1rem;
        }
        
        .iframe-panel.active {
            display: block;
        }
        
        .iframe-panel iframe {
            width: 100%;
            border-radius: 8px;
        }
        
        .external-notice {
            padding: 2rem;
            background: #fff3cd;
            color: #856404;
            text-align: center;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
        }
        
        .security-notice {
            background: #fef2f2;
            border: 2px solid #fecaca;
            border-radius: 12px;
            padding: 1.5rem;
            margin: 2rem 0;
        }
        
        .security-notice h4 {
            color: #dc2626;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .security-list {
            list-style: none;
            padding: 0;
        }
        
        .security-list li {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
            color: #7f1d1d;
        }
        
        .security-list i {
            color: #dc2626;
            margin-top: 0.2rem;
        }
        
        .canvas-demos {
            margin: 2rem 0;
        }
        
        .demo-tabs {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .demo-tab {
            padding: 0.75rem 1.5rem;
            border: 2px solid #e5e7eb;
            background: white;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .demo-tab:hover {
            border-color: #3b82f6;
            background: #f8fafc;
        }
        
        .demo-tab.active {
            border-color: #3b82f6;
            background: #3b82f6;
            color: white;
        }
        
        .canvas-container {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .canvas-demo {
            display: none;
        }
        
        .canvas-demo.active {
            display: block;
        }
        
        .canvas-demo canvas {
            display: block;
            margin: 1rem auto;
        }
        
        .demo-instruction {
            text-align: center;
            color: #6b7280;
            font-style: italic;
            margin-top: 1rem;
        }
        
        .practices-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin: 2rem 0;
        }
        
        .practice-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }
        
        .practice-card:hover {
            transform: translateY(-5px);
        }
        
        .practice-card .card-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #f3f4f6;
        }
        
        .practice-card .card-header i {
            font-size: 1.5rem;
            color: #3b82f6;
        }
        
        .practice-card .card-header h3 {
            margin: 0;
            color: #1f2937;
        }
        
        .practice-list {
            list-style: none;
            padding: 0;
        }
        
        .practice-list li {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
            padding: 0.5rem;
            border-radius: 6px;
            transition: background-color 0.2s ease;
        }
        
        .practice-list li:hover {
            background-color: #f8fafc;
        }
        
        .practice-list i {
            color: #10b981;
            margin-top: 0.2rem;
            flex-shrink: 0;
        }
        
        .practice-list li i.fa-exclamation-triangle {
            color: #f59e0b;
        }
        
        .global-message {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 20px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 1000;
            display: none;
            max-width: 400px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .global-message.success {
            background: #dcfce7;
            color: #166534;
            border-left: 4px solid #22c55e;
        }
        
        .global-message.error {
            background: #fef2f2;
            color: #991b1b;
            border-left: 4px solid #ef4444;
        }
        
        .global-message.warning {
            background: #fef3c7;
            color: #92400e;
            border-left: 4px solid #f59e0b;
        }
        
        .global-message.info {
            background: #dbeafe;
            color: #1e40af;
            border-left: 4px solid #3b82f6;
        }
        
        .copy-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            padding: 8px;
            border-radius: 4px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s ease;
        }
        
        .code-example pre:hover .copy-btn {
            opacity: 1;
        }
        
        .copy-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        @media (max-width: 768px) {
            .element-showcase {
                flex-wrap: wrap;
                gap: 1rem;
            }
            
            .demo-layout {
                grid-template-columns: 1fr;
            }
            
            .demo-controls {
                flex-direction: column;
                align-items: stretch;
            }
            
            .demo-controls input[type="text"] {
                min-width: auto;
            }
            
            .iframe-tabs,
            .demo-tabs {
                flex-direction: column;
            }
            
            .practices-grid {
                grid-template-columns: 1fr;
            }
            
            .global-message {
                position: relative;
                top: auto;
                right: auto;
                margin: 20px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize styles when page loads
document.addEventListener('DOMContentLoaded', addLayoutElementsStyles);
