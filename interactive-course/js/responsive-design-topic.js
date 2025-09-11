// Responsive Design Topic JavaScript
(function () {
    'use strict';

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function () {
        initializeInteractiveElements();
        initializeResponsiveDemo();
        initializeLayoutTechniques();
        initializeQuiz();
        initializeResponsiveUnitsDemo();
        initializeDeviceMockups();
    });

    // Initialize all interactive elements
    function initializeInteractiveElements() {
        // Animate hero visual on load
        animateHeroVisual();

        // Initialize smooth scrolling for internal links
        initializeSmoothScrolling();

        // Initialize intersection observer for animations
        initializeScrollAnimations();
    }

    // Animate hero device mockups
    function animateHeroVisual() {
        const devices = document.querySelectorAll('.device');

        devices.forEach((device, index) => {
            setTimeout(() => {
                device.style.opacity = '0';
                device.style.transform = 'translateY(20px)';

                // Trigger animation
                setTimeout(() => {
                    device.style.transition = 'all 0.6s ease-out';
                    device.style.opacity = '1';
                    device.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }

    // Responsive demo with interactive screen size control
    function initializeResponsiveDemo() {
        const screenWidthSlider = document.getElementById('screenWidth');
        const widthDisplay = document.getElementById('widthDisplay');
        const demoViewport = document.getElementById('demoViewport');
        const currentBreakpoint = document.getElementById('currentBreakpoint');
        const presetButtons = document.querySelectorAll('.preset-btn');

        if (!screenWidthSlider || !demoViewport) return;

        // Update demo based on screen width
        function updateDemo(width) {
            widthDisplay.textContent = width;
            demoViewport.style.width = width + 'px';

            // Update breakpoint display and styling
            let breakpoint = '';
            let breakpointClass = '';

            if (width <= 767) {
                breakpoint = 'Mobile';
                breakpointClass = 'mobile';
            } else if (width <= 1023) {
                breakpoint = 'Tablet';
                breakpointClass = 'tablet';
            } else if (width <= 1439) {
                breakpoint = 'Laptop';
                breakpointClass = 'laptop';
            } else {
                breakpoint = 'Desktop';
                breakpointClass = 'desktop';
            }

            currentBreakpoint.textContent = `Current: ${breakpoint} (${width}px)`;
            currentBreakpoint.className = `current-breakpoint ${breakpointClass}`;

            // Update demo website layout
            const demoWebsite = demoViewport.querySelector('.demo-website');
            demoWebsite.className = `demo-website ${breakpointClass}`;
        }

        // Slider event listener
        screenWidthSlider.addEventListener('input', function () {
            updateDemo(parseInt(this.value));
        });

        // Preset button event listeners
        presetButtons.forEach(button => {
            button.addEventListener('click', function () {
                const width = parseInt(this.dataset.width);
                screenWidthSlider.value = width;
                updateDemo(width);

                // Visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });

        // Initialize with current value
        updateDemo(parseInt(screenWidthSlider.value));
    }

    // Layout techniques tabs
    function initializeLayoutTechniques() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', function () {
                const targetTab = this.dataset.tab;

                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));

                // Add active class to clicked button and corresponding panel
                this.classList.add('active');
                const targetPanel = document.getElementById(targetTab + '-panel');
                if (targetPanel) {
                    targetPanel.classList.add('active');

                    // Animate panel entrance
                    targetPanel.style.opacity = '0';
                    targetPanel.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        targetPanel.style.transition = 'all 0.3s ease-out';
                        targetPanel.style.opacity = '1';
                        targetPanel.style.transform = 'translateY(0)';
                    }, 50);
                }
            });
        });

        // Initialize demos for each tab
        initializeFlexboxDemo();
        initializeGridDemo();
        initializeFluidDemo();
    }

    // Flexbox demo
    function initializeFlexboxDemo() {
        const flexboxContainer = document.querySelector('.flexbox-demo-container');
        if (!flexboxContainer) return;

        // Add interactive controls
        const controls = document.createElement('div');
        controls.className = 'demo-controls';
        controls.innerHTML = `
            <div class="control-group">
                <label>Flex Direction:</label>
                <select id="flexDirection">
                    <option value="row">row</option>
                    <option value="column">column</option>
                    <option value="row-reverse">row-reverse</option>
                    <option value="column-reverse">column-reverse</option>
                </select>
            </div>
            <div class="control-group">
                <label>Justify Content:</label>
                <select id="justifyContent">
                    <option value="flex-start">flex-start</option>
                    <option value="center">center</option>
                    <option value="flex-end">flex-end</option>
                    <option value="space-between">space-between</option>
                    <option value="space-around">space-around</option>
                    <option value="space-evenly">space-evenly</option>
                </select>
            </div>
            <div class="control-group">
                <label>Align Items:</label>
                <select id="alignItems">
                    <option value="stretch">stretch</option>
                    <option value="flex-start">flex-start</option>
                    <option value="center">center</option>
                    <option value="flex-end">flex-end</option>
                    <option value="baseline">baseline</option>
                </select>
            </div>
        `;

        flexboxContainer.parentNode.insertBefore(controls, flexboxContainer);

        // Add event listeners
        ['flexDirection', 'justifyContent', 'alignItems'].forEach(property => {
            const control = document.getElementById(property);
            if (control) {
                control.addEventListener('change', function () {
                    const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
                    flexboxContainer.style[property] = this.value;
                });
            }
        });
    }

    // CSS Grid demo
    function initializeGridDemo() {
        const gridContainer = document.querySelector('.grid-demo-container');
        if (!gridContainer) return;

        // Add interactive controls
        const controls = document.createElement('div');
        controls.className = 'demo-controls';
        controls.innerHTML = `
            <div class="control-group">
                <label>Grid Template Columns:</label>
                <select id="gridColumns">
                    <option value="repeat(3, 1fr)">repeat(3, 1fr)</option>
                    <option value="repeat(2, 1fr)">repeat(2, 1fr)</option>
                    <option value="repeat(4, 1fr)">repeat(4, 1fr)</option>
                    <option value="repeat(auto-fit, minmax(150px, 1fr))">auto-fit minmax(150px, 1fr)</option>
                    <option value="1fr 2fr 1fr">1fr 2fr 1fr</option>
                </select>
            </div>
            <div class="control-group">
                <label>Gap:</label>
                <select id="gridGap">
                    <option value="1rem">1rem</option>
                    <option value="0.5rem">0.5rem</option>
                    <option value="1.5rem">1.5rem</option>
                    <option value="2rem">2rem</option>
                    <option value="0">0</option>
                </select>
            </div>
        `;

        gridContainer.parentNode.insertBefore(controls, gridContainer);

        // Add event listeners
        document.getElementById('gridColumns').addEventListener('change', function () {
            gridContainer.style.gridTemplateColumns = this.value;
        });

        document.getElementById('gridGap').addEventListener('change', function () {
            gridContainer.style.gap = this.value;
        });
    }

    // Fluid demo
    function initializeFluidDemo() {
        const fluidContainer = document.querySelector('.fluid-demo-container');
        if (!fluidContainer) return;

        // Add resize observer to show responsive behavior
        if (window.ResizeObserver) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const width = entry.contentRect.width;
                    const columns = fluidContainer.querySelectorAll('.fluid-column');

                    columns.forEach((column, index) => {
                        if (width < 600) {
                            column.style.width = '100%';
                            column.textContent = '100%';
                        } else {
                            const widths = ['25%', '50%', '25%'];
                            column.style.width = widths[index];
                            column.textContent = widths[index];
                        }
                    });
                }
            });

            resizeObserver.observe(fluidContainer);
        }
    }

    // Responsive units demo
    function initializeResponsiveUnitsDemo() {
        const unitsContainer = document.querySelector('.units-demo-container');
        if (!unitsContainer) return;

        // Create interactive viewport size display
        function updateViewportInfo() {
            const vw = window.innerWidth;
            const vh = window.innerHeight;

            const vwElement = unitsContainer.querySelector('.vw');
            const vhElement = unitsContainer.querySelector('.vh');

            if (vwElement) {
                vwElement.textContent = `10vw = ${(vw * 0.1).toFixed(1)}px`;
            }

            if (vhElement) {
                vhElement.textContent = `20vh = ${(vh * 0.2).toFixed(1)}px`;
            }
        }

        // Update on resize
        window.addEventListener('resize', updateViewportInfo);
        updateViewportInfo();
    }

    // Device mockups animation
    function initializeDeviceMockups() {
        const mockups = document.querySelector('.device-mockups');
        if (!mockups) return;

        // Rotate through different content states
        setInterval(() => {
            const devices = mockups.querySelectorAll('.device');
            devices.forEach(device => {
                const screen = device.querySelector('.device-screen');
                screen.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    screen.style.transform = 'scale(1)';
                }, 200);
            });
        }, 3000);
    }

    // Quiz functionality
    function initializeQuiz() {
        const quizContainer = document.querySelector('.quiz-container');
        const submitButton = document.querySelector('.quiz-submit');
        const retryButton = document.querySelector('.quiz-retry');
        const resultsDiv = document.querySelector('.quiz-results');

        if (!quizContainer || !submitButton) return;

        const correctAnswers = {
            'q1': 'b', // Mobile-first design
            'q2': 'b', // width=device-width, initial-scale=1.0
            'q3': 'b', // max-width: 100%; height: auto;
            'q4': 'b'  // @media (min-width: 768px)
        };

        submitButton.addEventListener('click', function () {
            const formData = new FormData();
            const radioButtons = quizContainer.querySelectorAll('input[type="radio"]:checked');

            let score = 0;
            const totalQuestions = Object.keys(correctAnswers).length;

            // Collect answers
            const userAnswers = {};
            radioButtons.forEach(radio => {
                userAnswers[radio.name] = radio.value;
            });

            // Calculate score
            Object.keys(correctAnswers).forEach(question => {
                if (userAnswers[question] === correctAnswers[question]) {
                    score++;
                }
            });

            // Show results
            const percentage = Math.round((score / totalQuestions) * 100);
            document.getElementById('score').textContent = score;
            document.getElementById('percentage').textContent = percentage;

            resultsDiv.style.display = 'block';
            submitButton.style.display = 'none';
            retryButton.style.display = 'inline-block';

            // Highlight correct/incorrect answers
            Object.keys(correctAnswers).forEach(question => {
                const questionDiv = document.querySelector(`input[name="${question}"]`).closest('.quiz-question');
                const options = questionDiv.querySelectorAll('.quiz-options li');

                options.forEach(option => {
                    const radio = option.querySelector('input[type="radio"]');
                    const label = option.querySelector('label');

                    if (radio.value === correctAnswers[question]) {
                        option.classList.add('correct');
                    } else if (radio.checked && radio.value !== correctAnswers[question]) {
                        option.classList.add('incorrect');
                    }
                });
            });

            // Scroll to results
            resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        retryButton.addEventListener('click', function () {
            // Reset quiz
            const radioButtons = quizContainer.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radio => radio.checked = false);

            const options = quizContainer.querySelectorAll('.quiz-options li');
            options.forEach(option => {
                option.classList.remove('correct', 'incorrect');
            });

            resultsDiv.style.display = 'none';
            submitButton.style.display = 'inline-block';
            retryButton.style.display = 'none';

            // Scroll back to quiz
            quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Smooth scrolling for internal links
    function initializeSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Scroll animations
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.principle-card, .stat-card, .tip-card, .tool-category, .resource-card, .step-card'
        );

        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Responsive table functionality
    function initializeResponsiveTables() {
        const tables = document.querySelectorAll('.breakpoints-table');

        tables.forEach(table => {
            // Add scroll indicator for mobile
            const scrollIndicator = document.createElement('div');
            scrollIndicator.className = 'scroll-indicator';
            scrollIndicator.innerHTML = '<i class="fas fa-arrows-alt-h"></i> Scroll horizontally';

            table.parentNode.insertBefore(scrollIndicator, table);

            // Hide indicator when table fits
            function checkTableFit() {
                const tableWidth = table.scrollWidth;
                const containerWidth = table.parentNode.clientWidth;

                if (tableWidth > containerWidth) {
                    scrollIndicator.style.display = 'block';
                } else {
                    scrollIndicator.style.display = 'none';
                }
            }

            window.addEventListener('resize', checkTableFit);
            checkTableFit();
        });
    }

    // Initialize responsive tables
    document.addEventListener('DOMContentLoaded', function () {
        initializeResponsiveTables();
    });

    // Checklist functionality
    function initializeChecklist() {
        const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                const listItem = this.closest('li');

                if (this.checked) {
                    listItem.style.opacity = '0.7';
                    listItem.style.textDecoration = 'line-through';
                } else {
                    listItem.style.opacity = '1';
                    listItem.style.textDecoration = 'none';
                }
            });
        });
    }

    // Initialize checklist
    document.addEventListener('DOMContentLoaded', function () {
        initializeChecklist();
    });

    // Performance tips animation
    function initializePerformanceTips() {
        const tipCards = document.querySelectorAll('.tip-card');

        tipCards.forEach((card, index) => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            });
        });
    }

    // Initialize performance tips
    document.addEventListener('DOMContentLoaded', function () {
        initializePerformanceTips();
    });

})();
