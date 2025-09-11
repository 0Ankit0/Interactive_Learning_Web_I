// CSS Preprocessors Topic JavaScript
document.addEventListener('DOMContentLoaded', function () {
    initializePreprocessorsTopic();
});

function initializePreprocessorsTopic() {
    initializeComparisonTool();
    setupBuildToolTabs();
    setupPlayground();
    initializeQuiz();
    addEventListeners();
}

// Comparison Tool
function initializeComparisonTool() {
    const styleSelector = document.getElementById('styleExample');
    if (!styleSelector) return;

    styleSelector.addEventListener('change', function () {
        updateComparisonCode(this.value);
    });

    // Initialize with first example
    updateComparisonCode('variables');
}

function updateComparisonCode(example) {
    const examples = {
        variables: {
            sass: `// SASS Variables
$primary-color: #3498db;
$secondary-color: #2ecc71;
$font-size: 16px;
$margin: 1rem;

.header {
  background: $primary-color;
  color: white;
  font-size: $font-size;
  margin: $margin;
}`,
            less: `// LESS Variables
@primary-color: #3498db;
@secondary-color: #2ecc71;
@font-size: 16px;
@margin: 1rem;

.header {
  background: @primary-color;
  color: white;
  font-size: @font-size;
  margin: @margin;
}`,
            css: `/* Compiled CSS */
.header {
  background: #3498db;
  color: white;
  font-size: 16px;
  margin: 1rem;
}`
        },
        nesting: {
            sass: `// SASS Nesting
.navigation {
  background: $primary-color;
  
  ul {
    list-style: none;
    
    li {
      display: inline-block;
      
      a {
        color: white;
        text-decoration: none;
        
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}`,
            less: `// LESS Nesting
.navigation {
  background: @primary-color;
  
  ul {
    list-style: none;
    
    li {
      display: inline-block;
      
      a {
        color: white;
        text-decoration: none;
        
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}`,
            css: `/* Compiled CSS */
.navigation {
  background: #3498db;
}

.navigation ul {
  list-style: none;
}

.navigation ul li {
  display: inline-block;
}

.navigation ul li a {
  color: white;
  text-decoration: none;
}

.navigation ul li a:hover {
  opacity: 0.8;
}`
        },
        mixins: {
            sass: `// SASS Mixins
@mixin button-style($bg, $color: white) {
  background: $bg;
  color: $color;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  
  &:hover {
    background: darken($bg, 10%);
  }
}

.btn-primary {
  @include button-style($primary-color);
}

.btn-secondary {
  @include button-style($secondary-color);
}`,
            less: `// LESS Mixins
.button-style(@bg, @color: white) {
  background: @bg;
  color: @color;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  
  &:hover {
    background: darken(@bg, 10%);
  }
}

.btn-primary {
  .button-style(@primary-color);
}

.btn-secondary {
  .button-style(@secondary-color);
}`,
            css: `/* Compiled CSS */
.btn-primary {
  background: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.btn-primary:hover {
  background: #2980b9;
}

.btn-secondary {
  background: #2ecc71;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.btn-secondary:hover {
  background: #27ae60;
}`
        },
        functions: {
            sass: `// SASS Functions
@function rem($pixels) {
  @return #{$pixels / 16}rem;
}

@function lighten-color($color, $amount) {
  @return lighten($color, $amount);
}

.container {
  width: rem(1200);
  font-size: rem(16);
  background: lighten-color($primary-color, 20%);
}`,
            less: `// LESS Functions
.rem(@pixels) {
  @return: (@pixels / 16) * 1rem;
}

.container {
  width: .rem(1200)[@return];
  font-size: .rem(16)[@return];
  background: lighten(@primary-color, 20%);
}`,
            css: `/* Compiled CSS */
.container {
  width: 75rem;
  font-size: 1rem;
  background: #85c1e6;
}`
        },
        loops: {
            sass: `// SASS Loops
@for $i from 1 through 4 {
  .col-#{$i} {
    width: #{$i * 25}%;
  }
}

$sizes: (small: 12px, medium: 16px, large: 20px);

@each $name, $size in $sizes {
  .text-#{$name} {
    font-size: $size;
  }
}`,
            less: `// LESS Loops (using mixins)
.generate-columns(@n, @i: 1) when (@i <= @n) {
  .col-@{i} {
    width: (@i * 25%);
  }
  .generate-columns(@n, (@i + 1));
}

.generate-columns(4);

.text-small { font-size: 12px; }
.text-medium { font-size: 16px; }
.text-large { font-size: 20px; }`,
            css: `/* Compiled CSS */
.col-1 { width: 25%; }
.col-2 { width: 50%; }
.col-3 { width: 75%; }
.col-4 { width: 100%; }

.text-small { font-size: 12px; }
.text-medium { font-size: 16px; }
.text-large { font-size: 20px; }`
        }
    };

    const example = examples[example] || examples.variables;

    updateCodeBlock('sassCode', example.sass);
    updateCodeBlock('lessCode', example.less);
    updateCodeBlock('cssCode', example.css);
}

function updateCodeBlock(elementId, code) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = code;
        // Re-highlight syntax
        if (window.Prism) {
            window.Prism.highlightElement(element);
        }
    }
}

// Build Tool Tabs
function setupBuildToolTabs() {
    const toolTabs = document.querySelectorAll('.tool-tab');
    const toolPanels = document.querySelectorAll('.tool-panel');

    toolTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const toolName = this.dataset.tool;

            // Update active tab
            toolTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update active panel
            toolPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === toolName) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

// Playground Setup
function setupPlayground() {
    const sassEditor = document.getElementById('sassEditor');
    const cssOutput = document.getElementById('cssOutput');
    const previewContainer = document.getElementById('previewContainer');
    const compileBtn = document.getElementById('compileBtn');
    const clearBtn = document.getElementById('clearBtn');
    const exampleBtn = document.getElementById('exampleBtn');
    const copyOutputBtn = document.getElementById('copyOutputBtn');

    if (!sassEditor || !cssOutput) return;

    // Compile button
    if (compileBtn) {
        compileBtn.addEventListener('click', function () {
            compileSass();
        });
    }

    // Clear button
    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            sassEditor.value = '';
            cssOutput.textContent = '/* Compiled CSS will appear here */';
            updatePreview('');
        });
    }

    // Example button
    if (exampleBtn) {
        exampleBtn.addEventListener('click', function () {
            loadExample();
        });
    }

    // Copy output button
    if (copyOutputBtn) {
        copyOutputBtn.addEventListener('click', function () {
            copyToClipboard(cssOutput.textContent);
        });
    }

    // Auto-compile on input (with debounce)
    let compileTimeout;
    sassEditor.addEventListener('input', function () {
        clearTimeout(compileTimeout);
        compileTimeout = setTimeout(compileSass, 1000);
    });

    // Initial compilation
    compileSass();
}

function compileSass() {
    const sassEditor = document.getElementById('sassEditor');
    const cssOutput = document.getElementById('cssOutput');

    if (!sassEditor || !cssOutput) return;

    const sassCode = sassEditor.value.trim();

    if (!sassCode) {
        cssOutput.textContent = '/* Write some SASS code to see the compiled output */';
        updatePreview('');
        return;
    }

    try {
        // Simple SASS-like compilation (basic transformation)
        let compiledCSS = compileSassBasic(sassCode);
        cssOutput.textContent = compiledCSS;
        updatePreview(compiledCSS);

        if (window.Prism) {
            window.Prism.highlightElement(cssOutput);
        }

        showMessage('✓ SASS compiled successfully!', 'success');
    } catch (error) {
        cssOutput.textContent = `/* Compilation Error: ${error.message} */`;
        showMessage('✗ Compilation error: ' + error.message, 'error');
    }
}

function compileSassBasic(sassCode) {
    // This is a simplified SASS compiler for demo purposes
    // In a real application, you'd use the actual SASS compiler

    let css = sassCode;

    // Handle variables (simple replacement)
    const variables = {};
    const variableRegex = /\$([a-zA-Z-]+):\s*([^;]+);/g;
    let match;

    while ((match = variableRegex.exec(css)) !== null) {
        variables[match[1]] = match[2].trim();
    }

    // Replace variable usage
    Object.keys(variables).forEach(varName => {
        const regex = new RegExp(`\\$${varName}\\b`, 'g');
        css = css.replace(regex, variables[varName]);
    });

    // Remove variable declarations
    css = css.replace(/\$[a-zA-Z-]+:\s*[^;]+;\s*/g, '');

    // Simple nesting compilation (basic)
    css = compileNesting(css);

    // Handle mixins (basic)
    css = compileMixins(css);

    // Clean up extra whitespace
    css = css.replace(/\s+/g, ' ').replace(/;\s*}/g, ';}').trim();

    return formatCSS(css);
}

function compileNesting(css) {
    // Very basic nesting compilation
    // This is a simplified version for demo purposes

    const lines = css.split('\n');
    let compiled = '';
    let currentSelectors = [];
    let indentLevel = 0;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        const currentIndent = (line.match(/^\s*/)[0].length / 2);

        if (trimmed.endsWith('{')) {
            const selector = trimmed.slice(0, -1).trim();

            if (currentIndent > indentLevel) {
                currentSelectors.push(selector);
            } else if (currentIndent === indentLevel) {
                currentSelectors[currentSelectors.length - 1] = selector;
            } else {
                currentSelectors = currentSelectors.slice(0, currentIndent + 1);
                currentSelectors[currentIndent] = selector;
            }

            indentLevel = currentIndent;
        } else if (trimmed === '}') {
            indentLevel = Math.max(0, indentLevel - 1);
            if (currentSelectors.length > indentLevel + 1) {
                currentSelectors.pop();
            }
        } else if (trimmed.includes(':') && !trimmed.includes('{')) {
            const fullSelector = currentSelectors.join(' ').replace(/&/g, '');
            compiled += `${fullSelector} { ${trimmed} }\n`;
        }
    });

    return compiled;
}

function compileMixins(css) {
    // Basic mixin compilation
    const mixins = {};

    // Extract mixin definitions
    const mixinDefRegex = /@mixin\s+([a-zA-Z-]+)(\([^)]*\))?\s*\{([^}]+)\}/g;
    let match;

    while ((match = mixinDefRegex.exec(css)) !== null) {
        mixins[match[1]] = {
            params: match[2] || '',
            body: match[3]
        };
    }

    // Remove mixin definitions
    css = css.replace(mixinDefRegex, '');

    // Replace mixin includes
    Object.keys(mixins).forEach(mixinName => {
        const includeRegex = new RegExp(`@include\\s+${mixinName}\\s*\\([^)]*\\);?`, 'g');
        css = css.replace(includeRegex, mixins[mixinName].body);
    });

    return css;
}

function formatCSS(css) {
    // Basic CSS formatting
    return css
        .replace(/\{/g, ' {\n  ')
        .replace(/;/g, ';\n  ')
        .replace(/\}/g, '\n}\n')
        .replace(/\n\s*\n/g, '\n')
        .trim();
}

function updatePreview(css) {
    const previewContainer = document.getElementById('previewContainer');
    if (!previewContainer) return;

    // Remove existing style element
    const existingStyle = document.getElementById('playgroundStyle');
    if (existingStyle) {
        existingStyle.remove();
    }

    // Add new style element
    if (css.trim()) {
        const style = document.createElement('style');
        style.id = 'playgroundStyle';
        style.textContent = css;
        document.head.appendChild(style);
    }
}

function loadExample() {
    const sassEditor = document.getElementById('sassEditor');
    if (!sassEditor) return;

    const examples = [
        `// Color Palette
$primary: #3498db;
$secondary: #2ecc71;
$danger: #e74c3c;

// Button Mixin
@mixin btn($bg-color) {
  background: $bg-color;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: darken($bg-color, 10%);
    transform: translateY(-2px);
  }
}

// Button Styles
.btn-primary {
  @include btn($primary);
}

.btn-secondary {
  @include btn($secondary);
}

.btn-danger {
  @include btn($danger);
}`,

        `// Responsive Grid System
$grid-columns: 12;
$breakpoint-md: 768px;

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

@for $i from 1 through $grid-columns {
  .col-#{$i} {
    flex: 0 0 #{($i / $grid-columns) * 100%};
    max-width: #{($i / $grid-columns) * 100%};
    padding: 0 15px;
    
    @media (max-width: $breakpoint-md) {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
}`,

        `// Card Component with Variants
$card-bg: #fff;
$card-shadow: 0 2px 10px rgba(0,0,0,0.1);
$card-radius: 8px;

%card-base {
  background: $card-bg;
  border-radius: $card-radius;
  box-shadow: $card-shadow;
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
}

.card {
  @extend %card-base;
  
  &-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    
    h3 {
      margin: 0;
      color: #333;
    }
  }
  
  &-body {
    padding: 20px;
    
    p {
      color: #666;
      line-height: 1.6;
    }
  }
  
  &-footer {
    padding: 15px 20px;
    background: #f8f9fa;
    text-align: right;
  }
}`
    ];

    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    sassEditor.value = randomExample;
    compileSass();
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showMessage('✓ CSS copied to clipboard!', 'success');
    }).catch(() => {
        showMessage('✗ Failed to copy CSS', 'error');
    });
}

// Quiz functionality
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
        q1: 'b', // $
        q2: 'a', // @mixin
        q3: 'b'  // 3-4 levels
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
        message = '🎉 Excellent! You have a strong understanding of CSS preprocessors.';
    } else if (percentage >= 60) {
        message = '👍 Good work! Review the concepts you missed and try again.';
    } else {
        message = '📚 Keep learning! Study the material more and retake the quiz.';
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

// Additional event listeners
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

    // Preprocessor card interactions
    document.querySelectorAll('.preprocessor-card').forEach(card => {
        card.addEventListener('click', function () {
            const preprocessor = this.classList.contains('sass') ? 'SASS' :
                this.classList.contains('less') ? 'LESS' : 'Stylus';
            showPreprocessorInfo(preprocessor);
        });
    });

    // Feature card hover effects
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Show preprocessor information
function showPreprocessorInfo(preprocessor) {
    const info = {
        'SASS': 'SASS (Syntactically Awesome StyleSheets) is the most mature and feature-rich CSS preprocessor. It offers two syntaxes: the indented SASS syntax and the CSS-like SCSS syntax.',
        'LESS': 'LESS (Leaner Style Sheets) is a JavaScript-based CSS preprocessor that extends CSS with dynamic behavior. It\'s simpler to learn and integrates well with JavaScript toolchains.',
        'Stylus': 'Stylus is a revolutionary CSS preprocessor with flexible syntax options. It can be written with or without braces, semicolons, and colons, making it highly customizable.'
    };

    showMessage(`${preprocessor}: ${info[preprocessor]}`, 'info');
}

// Utility function to show messages
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
function addPreprocessorStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .preprocessor-comparison {
            margin: 2rem 0;
        }
        
        .comparison-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .preprocessor-card {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            overflow: hidden;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .preprocessor-card:hover {
            border-color: #3b82f6;
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
        }
        
        .preprocessor-card.sass {
            border-left: 4px solid #cf649a;
        }
        
        .preprocessor-card.less {
            border-left: 4px solid #1d365d;
        }
        
        .preprocessor-card.stylus {
            border-left: 4px solid #ff6347;
        }
        
        .card-header {
            padding: 1.5rem;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .card-header i {
            font-size: 2rem;
        }
        
        .preprocessor-card.sass .card-header i {
            color: #cf649a;
        }
        
        .preprocessor-card.less .card-header i {
            color: #1d365d;
        }
        
        .preprocessor-card.stylus .card-header i {
            color: #ff6347;
        }
        
        .card-header h3 {
            margin: 0;
            color: #1f2937;
            flex: 1;
        }
        
        .popularity {
            padding: 0.25rem 0.75rem;
            background: rgba(59, 130, 246, 0.1);
            color: #1e40af;
            border-radius: 1rem;
            font-size: 0.75rem;
            font-weight: 600;
        }
        
        .card-content {
            padding: 1.5rem;
        }
        
        .features h4 {
            color: #374151;
            margin-bottom: 0.75rem;
        }
        
        .features ul {
            list-style: none;
            padding: 0;
        }
        
        .features li {
            position: relative;
            padding-left: 1.5rem;
            margin-bottom: 0.5rem;
            color: #6b7280;
            line-height: 1.4;
        }
        
        .features li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }
        
        .syntax-example {
            margin-top: 1rem;
            padding: 0.75rem;
            background: rgba(0, 0, 0, 0.05);
            border-radius: 6px;
            font-size: 0.9rem;
        }
        
        .syntax-example strong {
            color: #374151;
        }
        
        .syntax-example code {
            display: block;
            margin-top: 0.5rem;
            font-family: 'Courier New', monospace;
            color: #1f2937;
        }
        
        .comparison-tool {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            overflow: hidden;
        }
        
        .style-selector {
            padding: 1rem;
            background: #f8fafc;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .style-selector label {
            font-weight: 600;
            color: #374151;
            margin-right: 1rem;
        }
        
        .style-selector select {
            padding: 0.5rem 1rem;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            background: white;
            font-size: 1rem;
        }
        
        .comparison-panels {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            
            @media (max-width: 1024px) {
                grid-template-columns: 1fr;
            }
        }
        
        .panel {
            border-right: 1px solid #e5e7eb;
        }
        
        .panel:last-child {
            border-right: none;
        }
        
        .panel h5 {
            padding: 1rem;
            margin: 0;
            background: #f1f5f9;
            border-bottom: 1px solid #e5e7eb;
            color: #475569;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .panel pre {
            margin: 0;
            padding: 1rem;
            background: #1e293b;
            color: #e2e8f0;
            overflow-x: auto;
            min-height: 200px;
        }
        
        .build-tools {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            overflow: hidden;
            margin: 2rem 0;
        }
        
        .tool-tabs {
            display: flex;
            background: #f8fafc;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .tool-tab {
            flex: 1;
            padding: 1rem;
            border: none;
            background: transparent;
            cursor: pointer;
            font-weight: 500;
            color: #6b7280;
            transition: all 0.2s ease;
            border-bottom: 2px solid transparent;
        }
        
        .tool-tab:hover {
            background: rgba(59, 130, 246, 0.05);
            color: #3b82f6;
        }
        
        .tool-tab.active {
            color: #3b82f6;
            background: white;
            border-bottom-color: #3b82f6;
        }
        
        .tool-content {
            position: relative;
        }
        
        .tool-panel {
            display: none;
            padding: 2rem;
        }
        
        .tool-panel.active {
            display: block;
        }
        
        .tool-panel h4 {
            color: #1f2937;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .setup-steps .step {
            margin-bottom: 2rem;
            
            h5 {
                color: #374151;
                margin-bottom: 0.75rem;
                padding: 0.5rem 0;
                border-bottom: 1px solid #e5e7eb;
            }
            
            pre {
                background: #1e293b;
                color: #e2e8f0;
                padding: 1rem;
                border-radius: 6px;
                overflow-x: auto;
            }
        }
        
        .extension-list .extension {
            padding: 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            margin-bottom: 1rem;
            
            h5 {
                color: #1f2937;
                margin-bottom: 0.5rem;
            }
            
            p {
                color: #6b7280;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
            }
            
            code {
                background: rgba(59, 130, 246, 0.1);
                color: #1e40af;
                padding: 0.2rem 0.5rem;
                border-radius: 4px;
                font-size: 0.85rem;
            }
        }
        
        .playground-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin: 2rem 0;
            
            @media (max-width: 1024px) {
                grid-template-columns: 1fr;
            }
        }
        
        .playground-editor,
        .playground-output {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            overflow: hidden;
        }
        
        .editor-header,
        .output-header {
            padding: 1rem;
            background: #f8fafc;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .editor-header h4,
        .output-header h4 {
            margin: 0;
            color: #374151;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .editor-controls,
        .output-controls {
            display: flex;
            gap: 0.5rem;
        }
        
        .editor-controls .btn,
        .output-controls .btn {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
        }
        
        #sassEditor {
            width: 100%;
            height: 400px;
            padding: 1rem;
            border: none;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.5;
            resize: vertical;
            background: #1e293b;
            color: #e2e8f0;
        }
        
        #sassEditor:focus {
            outline: none;
        }
        
        #cssOutput {
            display: block;
            width: 100%;
            height: 400px;
            padding: 1rem;
            margin: 0;
            background: #1e293b;
            color: #e2e8f0;
            overflow: auto;
        }
        
        .playground-preview {
            margin-top: 2rem;
            padding: 1.5rem;
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
        }
        
        .playground-preview h4 {
            color: #1f2937;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        #previewContainer {
            padding: 2rem;
            background: #f8fafc;
            border-radius: 8px;
            text-align: center;
        }
        
        #previewContainer .btn-primary,
        #previewContainer .btn-secondary {
            margin: 0 0.5rem;
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
            .comparison-cards {
                grid-template-columns: 1fr;
            }
            
            .comparison-panels {
                grid-template-columns: 1fr;
            }
            
            .tool-tabs {
                flex-direction: column;
            }
            
            .playground-container {
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
document.addEventListener('DOMContentLoaded', addPreprocessorStyles);
