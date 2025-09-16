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
                    title: "Web Proposal",
                    description: "Berners-Lee submits \"Information Management: A Proposal\" at CERN, proposing a \"web\" of hypertext documents."
                },
                {
                    year: "1991",
                    title: "First Website",
                    description: "The first website goes online at <code>info.cern.ch</code>, explaining the World Wide Web project."
                },
                {
                    year: "1993",
                    title: "Mosaic Browser",
                    description: "Marc Andreessen develops Mosaic, the first popular graphical web browser that makes the web accessible to the general public."
                },
                {
                    year: "1995",
                    title: "JavaScript & SSL",
                    description: "Netscape introduces JavaScript programming language and SSL encryption, revolutionizing web interactivity and security."
                },
                {
                    year: "1998",
                    title: "Google Founded",
                    description: "Larry Page and Sergey Brin found Google, introducing the PageRank algorithm that revolutionizes web search."
                },
                {
                    year: "2004",
                    title: "Web 2.0 Era Begins",
                    description: "Facebook launches, marking the beginning of social media and user-generated content. The web becomes more interactive and social."
                },
                {
                    year: "2009",
                    title: "HTML5 Standard",
                    description: "HTML5 introduces semantic elements, multimedia support, and APIs for building rich web applications without plugins."
                },
                {
                    year: "2015",
                    title: "Progressive Web Apps",
                    description: "PWAs combine the best of web and mobile apps, offering offline functionality, push notifications, and app-like experiences."
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
    },

    // Client-Server Architecture Topic Data
    "client-server-architecture": {
        // Quiz data
        quiz: {
            questions: [
                {
                    question: "What is the primary role of a server in client-server architecture?",
                    options: ["To initiate requests for data", "To provide resources and services to clients", "To display web pages to users", "To store temporary user data"],
                    correct: 1,
                    explanation: "Servers provide resources and services to clients upon request in the client-server model."
                },
                {
                    question: "Which protocol is commonly used for client-server communication on the web?",
                    options: ["FTP", "HTTP", "SMTP", "SSH"],
                    correct: 1,
                    explanation: "HTTP (Hypertext Transfer Protocol) is the foundation of data communication on the World Wide Web."
                },
                {
                    question: "What type of server handles HTTP requests and serves web pages?",
                    options: ["Database Server", "Web Server", "Email Server", "File Server"],
                    correct: 1,
                    explanation: "Web servers handle HTTP requests and serve web pages, images, and other web resources to clients."
                },
                {
                    question: "In the client-server model, who initiates the communication?",
                    options: ["The server", "The client", "Both simultaneously", "Neither, it's automatic"],
                    correct: 1,
                    explanation: "The client initiates communication by sending requests to the server for resources or services."
                },
                {
                    question: "Which of the following is an example of a client in client-server architecture?",
                    options: ["Apache Web Server", "MySQL Database", "Web Browser", "Nginx Server"],
                    correct: 2,
                    explanation: "A web browser acts as a client by requesting web pages and resources from servers."
                }
            ]
        },

        // Communication demo data
        communicationDemo: {
            steps: [
                {
                    step: 1,
                    clientMessage: "Sending HTTP Request...",
                    serverMessage: "",
                    delay: 1000
                },
                {
                    step: 2,
                    clientMessage: "Request sent!",
                    serverMessage: "Processing Request...",
                    delay: 1500
                },
                {
                    step: 3,
                    clientMessage: "Waiting for response...",
                    serverMessage: "Preparing Response...",
                    delay: 2000
                },
                {
                    step: 4,
                    clientMessage: "Received Response!",
                    serverMessage: "Response sent successfully!",
                    delay: 1000
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'client-server-architecture',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    },

    // Web Browsers and Servers Topic Data
    "web-browsers-servers": {
        // Quiz data
        quiz: {
            questions: [
                {
                    question: "What is the primary function of a web browser?",
                    options: ["Store data", "Render web pages", "Host websites", "Send emails"],
                    correct: 1,
                    explanation: "Web browsers render HTML, CSS, and JavaScript to display web pages to users."
                },
                {
                    question: "Which browser engine does Google Chrome use?",
                    options: ["Gecko", "WebKit", "Blink", "Trident"],
                    correct: 2,
                    explanation: "Google Chrome uses the Blink rendering engine, forked from WebKit."
                },
                {
                    question: "What does a web server primarily do?",
                    options: ["Display web pages", "Store and serve web content", "Create websites", "Browse the internet"],
                    correct: 1,
                    explanation: "Web servers store website files and serve them to clients upon request."
                },
                {
                    question: "What is cross-browser compatibility?",
                    options: ["Browsers working together", "Websites working in different browsers", "Servers communicating", "Internet speed"],
                    correct: 1,
                    explanation: "Cross-browser compatibility ensures websites function correctly across different web browsers."
                },
                {
                    question: "Which protocol do web servers use to communicate with browsers?",
                    options: ["FTP", "HTTP", "SMTP", "POP3"],
                    correct: 1,
                    explanation: "HTTP (Hypertext Transfer Protocol) is the standard protocol for web communication."
                }
            ]
        },

        // Search simulation data
        search: {
            results: [
                {
                    title: "Web Browser History",
                    description: "Evolution of web browsers from text-based to modern graphical interfaces...",
                    url: "en.wikipedia.org/wiki/Web_browser"
                },
                {
                    title: "How Web Servers Work",
                    description: "Understanding the role of web servers in serving content...",
                    url: "developer.mozilla.org/en-US/docs/Web/HTTP/Overview"
                },
                {
                    title: "Cross-Browser Testing",
                    description: "Best practices for ensuring websites work across different browsers...",
                    url: "web.dev/cross-browser-testing"
                },
                {
                    title: "Popular Web Servers",
                    description: "Apache, Nginx, IIS, and other web server technologies...",
                    url: "en.wikipedia.org/wiki/Web_server"
                }
            ]
        },



        // Browser simulation data
        browserSimulation: {
            browsers: [
                { name: "Chrome", engine: "Blink", marketShare: "65%" },
                { name: "Firefox", engine: "Gecko", marketShare: "10%" },
                { name: "Safari", engine: "WebKit", marketShare: "15%" },
                { name: "Edge", engine: "Blink", marketShare: "5%" }
            ]
        },

        // Live updates demo data
        liveUpdates: {
            endpoints: [
                "https://httpbin.org/get",
                "https://jsonplaceholder.typicode.com/posts/1"
            ]
        },

        // Configuration
        config: {
            topicId: 'web-browsers-servers',
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
    console.log('Current pathname:', path);

    // Handle both file:// and http:// URLs
    const topicMatch = path.match(/\/([^\/]+)\.html$/) || path.match(/([^\\\/]+)\.html$/);

    if (topicMatch) {
        const topicId = topicMatch[1];
        console.log('Extracted topic ID:', topicId);
        console.log('Available topic data:', Object.keys(TOPICS_DATA));
        return TOPICS_DATA[topicId] || TOPICS_DATA['evolution-of-web']; // fallback
    }

    // Default fallback
    console.log('No topic match found, using fallback');
    return TOPICS_DATA['evolution-of-web'];
}

// Global variable for current topic data (for backward compatibility)
let TOPIC_DATA = getCurrentTopicData();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TOPICS_DATA, getCurrentTopicData, TOPIC_DATA };
}