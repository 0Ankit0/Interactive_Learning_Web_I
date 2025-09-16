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

    // Basic Protocols Topic Data
    "basic-protocols": {
        // Quiz data
        quiz: {
            questions: [
                {
                    question: "What does HTTP stand for?",
                    options: ["HyperText Transfer Protocol", "High Tech Transfer Process", "Home Text Transfer Protocol", "Hyperlink Text Transfer Process"],
                    correct: 0,
                    explanation: "HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the World Wide Web."
                },
                {
                    question: "Which HTTP status code indicates a successful request?",
                    options: ["404 Not Found", "200 OK", "301 Moved Permanently", "500 Internal Server Error"],
                    correct: 1,
                    explanation: "200 OK indicates that the HTTP request was successful and the server has returned the requested resource."
                },
                {
                    question: "What is the main difference between HTTP and HTTPS?",
                    options: ["HTTP is faster", "HTTPS uses encryption", "HTTP supports more methods", "HTTPS is only for images"],
                    correct: 1,
                    explanation: "HTTPS (HTTP Secure) uses TLS/SSL encryption to protect data in transit between browsers and servers."
                },
                {
                    question: "Which HTTP method is used to retrieve data from a server?",
                    options: ["POST", "PUT", "GET", "DELETE"],
                    correct: 2,
                    explanation: "The GET method is used to retrieve data from a server. It should not modify server state."
                },
                {
                    question: "What does the HTTP status code 404 mean?",
                    options: ["Server Error", "Unauthorized", "Not Found", "Bad Request"],
                    correct: 2,
                    explanation: "404 Not Found indicates that the server cannot find the requested resource."
                },
                {
                    question: "Which HTTP method is considered 'unsafe' and can modify server data?",
                    options: ["GET", "HEAD", "POST", "OPTIONS"],
                    correct: 2,
                    explanation: "POST is an unsafe method that sends data to create or process resources on the server."
                },
                {
                    question: "What is the purpose of the SSL/TLS handshake?",
                    options: ["To exchange greetings", "To establish secure encryption keys", "To check server availability", "To transfer files"],
                    correct: 1,
                    explanation: "The SSL/TLS handshake establishes shared encryption keys between client and server for secure communication."
                },
                {
                    question: "Which HTTP status code range indicates client errors?",
                    options: ["1xx", "2xx", "3xx", "4xx"],
                    correct: 3,
                    explanation: "4xx status codes indicate client errors, such as bad syntax or unauthorized requests."
                },
                {
                    question: "What does HTTPS use to encrypt data?",
                    options: ["HTTP", "SSL/TLS", "HTML", "JavaScript"],
                    correct: 1,
                    explanation: "HTTPS uses SSL (Secure Sockets Layer) or TLS (Transport Layer Security) to encrypt data transmission."
                },
                {
                    question: "Which HTTP method is used to update an existing resource?",
                    options: ["POST", "PUT", "PATCH", "DELETE"],
                    correct: 1,
                    explanation: "PUT is used to update or create a resource at a specific location on the server."
                }
            ]
        },

        // Protocol simulation data
        protocolSimulation: {
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
            statusCodes: {
                "1xx": ["100 Continue", "101 Switching Protocols"],
                "2xx": ["200 OK", "201 Created", "204 No Content"],
                "3xx": ["301 Moved Permanently", "302 Found", "304 Not Modified"],
                "4xx": ["400 Bad Request", "401 Unauthorized", "404 Not Found"],
                "5xx": ["500 Internal Server Error", "502 Bad Gateway", "503 Service Unavailable"]
            },
            sampleRequests: [
                {
                    method: "GET",
                    url: "https://api.example.com/users/123",
                    headers: "Accept: application/json\nAuthorization: Bearer token123",
                    description: "Retrieve user data"
                },
                {
                    method: "POST",
                    url: "https://api.example.com/users",
                    headers: "Content-Type: application/json",
                    body: '{"name": "John Doe", "email": "john@example.com"}',
                    description: "Create new user"
                },
                {
                    method: "PUT",
                    url: "https://api.example.com/users/123",
                    headers: "Content-Type: application/json",
                    body: '{"name": "Jane Doe", "email": "jane@example.com"}',
                    description: "Update user data"
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'basic-protocols',
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
    },

    // DNS and Its Hierarchy Topic Data
    "dns-hierarchy": {
        // Quiz data
        quiz: {
            questions: [
                {
                    question: "What does DNS stand for?",
                    options: ["Domain Name System", "Digital Network Service", "Data Network Server", "Domain Network Security"],
                    correct: 0,
                    explanation: "DNS stands for Domain Name System, which translates human-readable domain names into IP addresses."
                },
                {
                    question: "What is the top level of the DNS hierarchy?",
                    options: ["Root Level", "Top-Level Domains", "Second-Level Domains", "Subdomains"],
                    correct: 0,
                    explanation: "The root level is the top of the DNS hierarchy, represented by a single dot (.) and managed by IANA."
                },
                {
                    question: "Which DNS record type maps a domain name to an IPv4 address?",
                    options: ["AAAA", "CNAME", "A", "MX"],
                    correct: 2,
                    explanation: "The A (Address) record maps a domain name to an IPv4 address, like example.com to 192.0.2.1."
                },
                {
                    question: "What is the first step in DNS resolution when you type a domain name?",
                    options: ["Contact root nameserver", "Check browser cache", "Contact TLD nameserver", "Contact authoritative server"],
                    correct: 1,
                    explanation: "DNS resolution starts by checking the browser cache for the domain's IP address."
                },
                {
                    question: "Which DNS record type is used for email server configuration?",
                    options: ["A", "AAAA", "MX", "TXT"],
                    correct: 2,
                    explanation: "MX (Mail Exchange) records specify which mail servers are responsible for accepting email for a domain."
                },
                {
                    question: "What does a CNAME record do?",
                    options: ["Maps to IPv6 address", "Creates an alias", "Specifies mail server", "Contains verification text"],
                    correct: 1,
                    explanation: "A CNAME (Canonical Name) record creates an alias pointing to another domain name."
                },
                {
                    question: "Which server type provides the final IP address in DNS resolution?",
                    options: ["Root nameserver", "TLD nameserver", "Recursive resolver", "Authoritative nameserver"],
                    correct: 3,
                    explanation: "The authoritative nameserver provides the final IP address for a domain during DNS resolution."
                },
                {
                    question: "What is the purpose of DNS?",
                    options: ["Encrypt web traffic", "Translate domain names to IP addresses", "Host websites", "Store web content"],
                    correct: 1,
                    explanation: "DNS translates human-readable domain names like google.com into machine-readable IP addresses."
                },
                {
                    question: "Which TLD category includes .com, .org, and .net?",
                    options: ["Country Code TLDs", "Generic TLDs", "Sponsored TLDs", "Infrastructure TLDs"],
                    correct: 1,
                    explanation: "Generic TLDs include .com, .org, .net, and are not tied to any specific country."
                },
                {
                    question: "What happens if DNS resolution fails?",
                    options: ["Website loads slowly", "Browser shows error page", "Computer crashes", "Internet disconnects"],
                    correct: 1,
                    explanation: "If DNS resolution fails, the browser typically shows an error page indicating the domain cannot be found."
                }
            ]
        },

        // DNS lookup simulation data
        dnsLookup: {
            sampleDomains: [
                { domain: "google.com", ip: "142.250.184.14", type: "A", ttl: 300 },
                { domain: "github.com", ip: "140.82.121.4", type: "A", ttl: 60 },
                { domain: "stackoverflow.com", ip: "151.101.1.69", type: "A", ttl: 180 }
            ],
            resolutionSteps: [
                "Checking browser cache...",
                "Checking OS DNS cache...",
                "Contacting recursive resolver...",
                "Querying root nameserver...",
                "Querying TLD nameserver (.com)...",
                "Querying authoritative nameserver...",
                "IP address resolved!"
            ]
        },

        // DNS hierarchy visualization data
        hierarchyData: {
            levels: [
                { name: "Root", icon: "fas fa-globe", description: "Top level, managed by IANA" },
                { name: "TLD", icon: "fas fa-server", description: "Top-level domains like .com, .org" },
                { name: "SLD", icon: "fas fa-building", description: "Second-level domains like google.com" },
                { name: "Subdomain", icon: "fas fa-laptop-code", description: "Subdomains like mail.google.com" }
            ]
        },

        // Configuration
        config: {
            topicId: 'dns-hierarchy',
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