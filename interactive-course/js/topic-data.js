// Topic Data File - Contains all data for interactive elements
// This file can be reused across different topic pages
// Each topic has its own data set while maintaining the same structure

const TOPICS_DATA = {
    // Evolution of Web Topic Data
    "evolution-of-web": {
        // Quiz data
        quiz: {
            questions: [
                {
                    question: "Who invented the World Wide Web?",
                    options: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Mark Zuckerberg"],
                    correct: 1,
                    explanation: "Tim Berners-Lee invented the World Wide Web in 1989 while working at CERN."
                },
                {
                    question: "What year was the first website created?",
                    options: ["1989", "1990", "1991", "1992"],
                    correct: 2,
                    explanation: "The first website went online in 1991 at info.cern.ch, explaining the World Wide Web project."
                },
                {
                    question: "Which web version is known as the 'Read-Write Web'?",
                    options: ["Web 1.0", "Web 2.0", "Web 3.0", "Web 4.0"],
                    correct: 1,
                    explanation: "Web 2.0 introduced user-generated content and interactive platforms like social media."
                },
                {
                    question: "What does HTTP stand for?",
                    options: ["Hypertext Transfer Protocol", "High Tech Transfer Process", "Home Text Transfer Protocol", "Hyperlink Text Transfer Process"],
                    correct: 0,
                    explanation: "HTTP stands for Hypertext Transfer Protocol, the foundation of data communication on the web."
                },
                {
                    question: "What was the first graphical web browser?",
                    options: ["Internet Explorer", "Netscape", "Mosaic", "Chrome"],
                    correct: 2,
                    explanation: "Mosaic, released in 1993, was the first web browser to display images inline with text."
                }
            ]
        },

        // Search simulation data
        search: {
            results: [
                {
                    title: "Tim Berners-Lee's WWW Proposal",
                    description: "The original proposal for the World Wide Web, submitted at CERN in 1989...",
                    url: "info.cern.ch/hypertext/WWW/Proposal.html"
                },
                {
                    title: "What is Hypertext?",
                    description: "Understanding the concept of hypertext and how it enables web navigation...",
                    url: "www.w3.org/WhatIs.html"
                },
                {
                    title: "Web 2.0 Revolution",
                    description: "How the second generation of web brought interactive features...",
                    url: "www.oreilly.com/web2/"
                },
                {
                    title: "Evolution Timeline",
                    description: "Complete timeline of web development from 1989 to present...",
                    url: "webfoundation.org/timeline"
                }
            ]
        },

        // Timeline events data
        timeline: {
            events: [
                {
                    year: "1989",
                    title: "WWW Invented",
                    description: "Tim Berners-Lee creates the World Wide Web at CERN",
                    icon: "fas fa-lightbulb"
                },
                {
                    year: "1991",
                    title: "First Website",
                    description: "The first website goes live at info.cern.ch",
                    icon: "fas fa-globe"
                },
                {
                    year: "1993",
                    title: "Mosaic Browser",
                    description: "First graphical web browser makes the web accessible to everyone",
                    icon: "fas fa-window-maximize"
                },
                {
                    year: "1995",
                    title: "JavaScript Born",
                    description: "Netscape introduces JavaScript, making web pages interactive",
                    icon: "fab fa-js-square"
                },
                {
                    year: "2004",
                    title: "Web 2.0 Era",
                    description: "Social media and user-generated content transform the web",
                    icon: "fas fa-users"
                },
                {
                    year: "2008",
                    title: "HTML5 Standard",
                    description: "Modern web standards enable rich multimedia applications",
                    icon: "fab fa-html5"
                }
            ]
        },

        // Live updates simulation data
        liveUpdates: {
            messages: [
                "Connected to web evolution timeline...",
                "Loading historical data from 1989...",
                "Processing WWW invention details...",
                "Analyzing browser development patterns...",
                "Updating social media impact metrics...",
                "Synchronizing modern web standards...",
                "Timeline update complete!"
            ]
        },

        // Browser simulation data
        browserSimulation: {
            messages: [
                "Initializing browser simulation...",
                "Loading HTML parser...",
                "Rendering CSS styles...",
                "Executing JavaScript...",
                "Page loaded successfully!"
            ]
        },

        // Web evolution game data
        webEvolutionGame: {
            correctAnswers: 0,
            totalQuestions: 5,
            gameCompleted: false,
            responses: {
                correct: [
                    "Excellent! You know your web history!",
                    "Perfect! That's absolutely right!",
                    "Great job! You're a web expert!",
                    "Correct! You understand web evolution!"
                ],
                incorrect: [
                    "Not quite right. Try to think about the timeline!",
                    "Close, but not correct. Consider the key innovations!",
                    "That's not right. Think about who the key players were!",
                    "Incorrect. Remember the chronological order!"
                ]
            }
        },

        // Configuration
        config: {
            topicId: 'evolution-of-web',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    },

    // Example: HTML Basics Topic Data (placeholder for future topics)
    "html-basics": {
        quiz: {
            questions: [
                {
                    question: "What does HTML stand for?",
                    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "High Tech Modern Language"],
                    correct: 0,
                    explanation: "HTML stands for HyperText Markup Language, the standard markup language for web pages."
                },
                {
                    question: "Which HTML tag is used for the largest heading?",
                    options: ["<h6>", "<h1>", "<heading>", "<header>"],
                    correct: 1,
                    explanation: "The <h1> tag represents the largest heading in HTML, with <h6> being the smallest."
                },
                {
                    question: "What is the correct HTML element for inserting a line break?",
                    options: ["<break>", "<lb>", "<br>", "<newline>"],
                    correct: 2,
                    explanation: "The <br> tag is used to create a line break in HTML."
                }
            ]
        },

        // HTML Basics doesn't need search, live updates, or browser simulation
        // Only include timeline for showing HTML evolution
        timeline: {
            events: [
                {
                    year: "1993",
                    title: "HTML 1.0",
                    description: "First version of HTML specification",
                    icon: "fab fa-html5"
                },
                {
                    year: "1995",
                    title: "HTML 2.0",
                    description: "Standardized by IETF, added forms and tables",
                    icon: "fab fa-html5"
                },
                {
                    year: "1997",
                    title: "HTML 3.2",
                    description: "W3C standard, added stylesheets and scripting",
                    icon: "fab fa-html5"
                },
                {
                    year: "2014",
                    title: "HTML 5.0",
                    description: "Modern web standard with multimedia support",
                    icon: "fab fa-html5"
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'html-basics',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    },

    // Example: CSS Basics Topic Data
    "css-basics": {
        quiz: {
            questions: [
                {
                    question: "What does CSS stand for?",
                    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
                    correct: 1,
                    explanation: "CSS stands for Cascading Style Sheets, used for styling HTML documents."
                },
                {
                    question: "Which CSS property is used to change the text color?",
                    options: ["font-color", "text-color", "color", "text-style"],
                    correct: 2,
                    explanation: "The 'color' property is used to set the color of text in CSS."
                }
            ]
        },

        // CSS might have its own specific timeline
        timeline: {
            events: [
                {
                    year: "1996",
                    title: "CSS 1.0",
                    description: "First CSS specification by W3C",
                    icon: "fab fa-css3-alt"
                },
                {
                    year: "1998",
                    title: "CSS 2.0",
                    description: "Added positioning, z-index, and media types",
                    icon: "fab fa-css3-alt"
                }
            ]
        },

        config: {
            topicId: 'css-basics',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    }
};

// Function to get current topic data based on page URL or topic ID
function getCurrentTopicData() {
    // Extract topic name from current URL
    const path = window.location.pathname;
    const topicMatch = path.match(/\/([^\/]+)\.html$/);

    if (topicMatch) {
        const topicId = topicMatch[1];
        return TOPICS_DATA[topicId] || TOPICS_DATA['evolution-of-web']; // fallback
    }

    // Default fallback
    return TOPICS_DATA['evolution-of-web'];
}

// Global variable for current topic data (for backward compatibility)
let TOPIC_DATA = getCurrentTopicData();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TOPICS_DATA, getCurrentTopicData, TOPIC_DATA };
}