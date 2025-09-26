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

        // Browser simulation data
        browserSimulation: {
            pages: [
                {
                    title: "The WorldWideWeb Project",
                    url: "http://info.cern.ch/hypertext/WWW/TheProject.html",
                    content: `
                        <h4>The WorldWideWeb Project</h4>
                        <p>The WorldWideWeb (W3) is a wide-area <a href="#" onclick="showTooltip('Hypertext is text which contains links to other texts')">hypertext</a> information retrieval initiative aiming to give universal access to a large universe of documents.</p>
                        <p>Everything there is online about W3 is linked directly or indirectly to this document, including an <a href="#" onclick="showTooltip('Executive summary of the WWW project')">executive summary</a> of the project, <a href="#" onclick="showTooltip('Lists available on the first web server')">Mailing lists</a>, <a href="#" onclick="showTooltip('Policy guidelines for web development')">Policy</a>, November's <a href="#" onclick="showTooltip('W3 news and announcements')">W3 news</a>, <a href="#" onclick="showTooltip('Frequently asked questions')">Frequently Asked Questions</a>.</p>
                        <p><strong>Tim Berners-Lee</strong>, <a href="#" onclick="showTooltip('World Wide Web inventor and W3C director')">CERN</a></p>
                    `
                },
                {
                    title: "What is Hypertext?",
                    url: "http://info.cern.ch/hypertext/WWW/WhatIs.html",
                    content: `
                        <h4>What is Hypertext?</h4>
                        <p>Hypertext is text which is not constrained to be linear. Hypertext is text which contains <strong>links</strong> to other texts. The term was coined by <em>Ted Nelson</em> around 1965.</p>
                        <p>HyperMedia is a term used for hypertext which is not constrained to be text: it can include graphics, video and <a href="#" onclick="showTooltip('Computer generated sounds and music')">sound</a>, for example. Apparently Ted Nelson was the first to use this term too.</p>
                        <p>Hypertext and HyperMedia are concepts, not products.</p>
                    `
                },
                {
                    title: "WWW News - November 1992",
                    url: "http://info.cern.ch/hypertext/WWW/News/9211.html",
                    content: `
                        <h4>World Wide Web News - November 1992</h4>
                        <h5>New Servers</h5>
                        <ul>
                            <li><strong>CERN</strong> - The original server, now with improved documentation</li>
                            <li><strong>NCAR</strong> - Scientific data and visualization</li>
                            <li><strong>NCSA</strong> - Home of the Mosaic browser project</li>
                        </ul>
                        <h5>Recent Developments</h5>
                        <p>The number of WWW servers has grown from 1 to over 20 in the past 6 months!</p>
                        <p>New browsers are being developed for different platforms including <a href="#" onclick="showTooltip('Macintosh computer')">Mac</a>, <a href="#" onclick="showTooltip('Microsoft Windows operating system')">Windows</a>, and <a href="#" onclick="showTooltip('Unix operating system')">Unix</a>.</p>
                    `
                },
                {
                    title: "Technical Details",
                    url: "http://info.cern.ch/hypertext/WWW/Technical.html",
                    content: `
                        <h4>Technical Details of the WorldWideWeb</h4>
                        <h5>The HyperText Transfer Protocol (HTTP)</h5>
                        <p>HTTP is an application-level protocol with the lightness and speed necessary for a distributed collaborative hypermedia information system. It is a generic stateless object-oriented protocol which may be used for many similar systems.</p>
                        <h5>Universal Resource Identifiers (URI)</h5>
                        <p>URIs are short strings that identify resources in the web: documents, images, downloadable files, services, electronic mailboxes, and other resources. They make resources available under a variety of naming schemes and access methods such as HTTP, FTP and local file access.</p>
                        <h5>The HyperText Markup Language (HTML)</h5>
                        <p>HTML is a simple data format used to create hypertext documents that are portable from one platform to another. HTML documents are SGML documents with generic semantics that are appropriate for representing information from a wide range of applications.</p>
                    `
                }
            ]
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
    "html-introduction": {
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
                },
                {
                    question: "Which HTML attribute is used to define inline styles?",
                    options: ["class", "style", "id", "font"],
                    correct: 1,
                    explanation: "The 'style' attribute is used to define inline CSS styles for an HTML element."
                },
                {
                    question: "What is the purpose of the alt attribute in an img tag?",
                    options: ["To set image size", "To provide alternative text for accessibility", "To link to another page", "To add a border"],
                    correct: 1,
                    explanation: "The alt attribute provides alternative text that describes the image, which is important for accessibility and screen readers."
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

    // HTML Lists, Links & Images Topic Data
    "lists-links-images": {
        quiz: {
            questions: [
                {
                    question: "Which HTML tag is used to create an unordered list?",
                    options: ["<ol>", "<ul>", "<li>", "<list>"],
                    correct: 1,
                    explanation: "The <ul> tag creates an unordered list, typically displayed with bullet points."
                },
                {
                    question: "What is the correct HTML for creating a hyperlink?",
                    options: ["<a href=\"url\">Link text</a>", "<a url=\"url\">Link text</a>", "<a>url</a>", "<link href=\"url\">Link text</link>"],
                    correct: 0,
                    explanation: "The <a> tag with href attribute creates a hyperlink to the specified URL."
                },
                {
                    question: "Which attribute specifies alternative text for an image?",
                    options: ["title", "alt", "src", "desc"],
                    correct: 1,
                    explanation: "The alt attribute provides alternative text for images, important for accessibility and when images fail to load."
                },
                {
                    question: "What does the target=\"_blank\" attribute do in a link?",
                    options: ["Opens link in same tab", "Opens link in new tab", "Opens link in popup", "Downloads the link"],
                    correct: 1,
                    explanation: "target=\"_blank\" opens the linked document in a new browser tab or window."
                },
                {
                    question: "Which HTML tag is used to create an ordered list?",
                    options: ["<ul>", "<ol>", "<li>", "<dl>"],
                    correct: 1,
                    explanation: "The <ol> tag creates an ordered list, typically displayed with numbers."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'lists-links-images',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    },

    // HTML Audio and Video Topic Data
    "html-audio-video": {
        quiz: {
            questions: [
                {
                    question: "Which attribute is required to show default video controls?",
                    options: ["autoplay", "controls", "preload", "muted"],
                    correct: 1,
                    explanation: "The 'controls' attribute displays the default browser controls for the video element, including play, pause, and volume controls."
                },
                {
                    question: "What is the purpose of the poster attribute in video elements?",
                    options: ["To set video dimensions", "To show an image before video loads", "To add captions to video", "To enable fullscreen mode"],
                    correct: 1,
                    explanation: "The poster attribute specifies an image to display while the video is downloading or until the user hits the play button."
                },
                {
                    question: "Which preload value loads only basic video information?",
                    options: ["none", "metadata", "auto", "buffered"],
                    correct: 1,
                    explanation: "The 'metadata' preload value loads only basic information like duration and dimensions, without downloading the video content."
                },
                {
                    question: "What is the correct way to provide multiple audio formats for better browser support?",
                    options: ["Use multiple <audio> elements", "Use <source> elements inside <audio>", "Use the format attribute", "Use different codecs in one file"],
                    correct: 1,
                    explanation: "Multiple <source> elements inside an <audio> or <video> element allow browsers to choose the best supported format."
                },
                {
                    question: "Which attribute prevents videos from autoplaying?",
                    options: ["controls", "muted", "autoplay", "preload='none'"],
                    correct: 3,
                    explanation: "Setting preload='none' prevents the browser from downloading video content until the user explicitly requests it."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'html-audio-video',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    },

    // HTML Layout Elements Topic Data
    "html-layout-elements": {
        quiz: {
            questions: [
                {
                    question: "Which element is best for grouping block-level content for styling purposes?",
                    options: ["<span>", "<div>", "<aside>", "<iframe>"],
                    correct: 1,
                    explanation: "The <div> element is a generic container for block-level content and is commonly used for grouping elements for styling and layout purposes."
                },
                {
                    question: "What is the primary use case for the <span> element?",
                    options: ["Creating page layouts", "Styling inline content or text portions", "Embedding external content", "Drawing graphics"],
                    correct: 1,
                    explanation: "The <span> element is an inline container used to style portions of text or inline content without affecting the document flow."
                },
                {
                    question: "Which element requires JavaScript to be useful for drawing?",
                    options: ["<aside>", "<iframe>", "<canvas>", "<div>"],
                    correct: 2,
                    explanation: "The <canvas> element provides a drawing surface that requires JavaScript to create graphics, animations, and interactive content."
                },
                {
                    question: "What security consideration is most important when using iframes?",
                    options: ["Validating and trusting iframe sources", "Setting the correct width and height", "Using proper CSS styling", "Adding a title attribute"],
                    correct: 0,
                    explanation: "Security is crucial with iframes - you should only embed content from trusted sources to prevent security vulnerabilities."
                },
                {
                    question: "Which HTML element is used to embed external web pages or content?",
                    options: ["<embed>", "<object>", "<iframe>", "<frame>"],
                    correct: 2,
                    explanation: "The <iframe> element is used to embed another HTML document within the current document."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'html-layout-elements',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    },

    // Semantic HTML Topic Data
    "semantic-html": {
        quiz: {
            questions: [
                {
                    question: "What is the primary benefit of using semantic HTML elements?",
                    options: ["Better visual appearance", "Improved accessibility and SEO", "Smaller file sizes", "Faster loading times"],
                    correct: 1,
                    explanation: "Semantic HTML elements provide meaning to content, improving accessibility for screen readers and search engine optimization."
                },
                {
                    question: "Which element should be used for the main content of a webpage?",
                    options: ["<div>", "<main>", "<section>", "<article>"],
                    correct: 1,
                    explanation: "The <main> element represents the main content of the document, excluding headers, footers, and navigation."
                },
                {
                    question: "What is the purpose of the <nav> element?",
                    options: ["To style navigation links", "To contain navigation links", "To create a navigation menu", "To highlight the current page"],
                    correct: 1,
                    explanation: "The <nav> element is used to contain navigation links, helping screen readers identify navigation areas."
                },
                {
                    question: "Which element is best for marking up a standalone piece of content?",
                    options: ["<section>", "<article>", "<div>", "<span>"],
                    correct: 1,
                    explanation: "The <article> element represents a self-contained composition that could be distributed independently."
                },
                {
                    question: "What does the <aside> element typically contain?",
                    options: ["Main content", "Navigation", "Sidebar content or related information", "Footer information"],
                    correct: 2,
                    explanation: "The <aside> element represents content that is tangentially related to the main content, often used for sidebars."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'semantic-html',
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
    },

    // JSON Topic Data
    "json": {
        quiz: {
            questions: [
                {
                    question: "Which method converts a JSON string to a JavaScript object?",
                    options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.decode()"],
                    correct: 1,
                    explanation: "JSON.parse() converts a JSON string into a JavaScript object."
                },
                {
                    question: "Which of the following is valid JSON?",
                    options: ["{\"name\": 'John', \"age\": 30}", "{\"name\": \"John\", \"age\": 30}", "{name: \"John\", age: 30}", "{\"name\": \"John\"; \"age\": 30}"],
                    correct: 1,
                    explanation: "Valid JSON requires double quotes around both keys and string values."
                },
                {
                    question: "What happens when JSON.parse() encounters invalid JSON?",
                    options: ["Returns null", "Returns an empty object", "Throws a SyntaxError", "Returns undefined"],
                    correct: 2,
                    explanation: "JSON.parse() throws a SyntaxError when it encounters invalid JSON syntax."
                },
                {
                    question: "Which data types are NOT supported in JSON?",
                    options: ["String and Number", "Boolean and Array", "Function and undefined", "Object and null"],
                    correct: 2,
                    explanation: "JSON does not support Functions, undefined, Date objects, or other complex JavaScript types."
                },
                {
                    question: "What does JSON stand for?",
                    options: ["JavaScript Object Notation", "JavaScript Oriented Notation", "JavaScript Object Network", "JavaScript Operational Notation"],
                    correct: 0,
                    explanation: "JSON stands for JavaScript Object Notation, a lightweight data interchange format."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'json',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    },

    // Responsive Design Topic Data
    "responsive-design": {
        quiz: {
            questions: [
                {
                    question: "What is the recommended approach for responsive design?",
                    options: ["Desktop-first design", "Mobile-first design", "Tablet-first design", "No specific approach needed"],
                    correct: 1,
                    explanation: "Mobile-first design is recommended as it ensures the site works on smaller screens first, then progressively enhances for larger screens."
                },
                {
                    question: "Which viewport meta tag is essential for responsive design?",
                    options: ["<meta name=\"viewport\" content=\"width=1024\">", "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">", "<meta name=\"viewport\" content=\"user-scalable=no\">", "<meta name=\"viewport\" content=\"width=100%\">"],
                    correct: 1,
                    explanation: "The viewport meta tag with width=device-width and initial-scale=1.0 is essential for responsive design as it tells the browser how to control the page's dimensions."
                },
                {
                    question: "What CSS property makes images responsive by default?",
                    options: ["width: 100%;", "max-width: 100%; height: auto;", "height: 100%;", "display: block;"],
                    correct: 1,
                    explanation: "Setting max-width: 100% and height: auto makes images responsive by ensuring they never exceed their container width while maintaining aspect ratio."
                },
                {
                    question: "Which media query targets tablets in a mobile-first approach?",
                    options: ["@media (max-width: 768px)", "@media (min-width: 768px)", "@media (width: 768px)", "@media screen and (tablet)"],
                    correct: 1,
                    explanation: "In mobile-first design, @media (min-width: 768px) targets tablets and larger screens, applying styles that enhance the mobile layout."
                },
                {
                    question: "What is the purpose of CSS Grid and Flexbox in responsive design?",
                    options: ["To create fixed layouts", "To create flexible, responsive layouts", "To replace media queries", "To style text only"],
                    correct: 1,
                    explanation: "CSS Grid and Flexbox provide powerful layout tools that automatically adapt to different screen sizes, making responsive design more flexible and maintainable."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'responsive-design',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    },

    // Regular Expressions Topic Data
    "regular-expressions": {
        quiz: {
            questions: [
                {
                    question: "What does the regex pattern \\d+ match?",
                    options: ["One or more digits", "Exactly one digit", "Zero or more digits", "Any character followed by a plus sign"],
                    correct: 0,
                    explanation: "\\d+ matches one or more digits (0-9). The + quantifier means 'one or more'."
                },
                {
                    question: "Which method returns true or false when testing a regex?",
                    options: ["match()", "test()", "exec()", "search()"],
                    correct: 1,
                    explanation: "The test() method returns true if the regex matches the string, false otherwise."
                },
                {
                    question: "What does the ^ symbol represent in regex?",
                    options: ["Start of string", "End of string", "Negation inside character class", "Both A and C depending on context"],
                    correct: 3,
                    explanation: "^ means start of string when used outside character classes, and negation when used inside character classes [^abc]."
                },
                {
                    question: "Which pattern matches a valid email format?",
                    options: ["/.*@.*\\..*/", "/^[\\^\\s@]+@[\\^\\s@]+\\.[\\^\\s@]+$/", "/\\w+@\\w+/", "/email/"],
                    correct: 1,
                    explanation: "/^[\\^\\s@]+@[\\^\\s@]+\\.[\\^\\s@]+$/ matches a proper email format with username, @, domain, and TLD."
                },
                {
                    question: "What does the * quantifier mean in regex?",
                    options: ["Exactly one occurrence", "Zero or one occurrence", "Zero or more occurrences", "One or more occurrences"],
                    correct: 2,
                    explanation: "* matches zero or more occurrences of the preceding element."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'regular-expressions',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    },

    // jQuery Basics Topic Data
    "jquery-basics": {
        quiz: {
            questions: [
                {
                    question: "Which symbol is commonly used as an alias for the jQuery function?",
                    options: ["@", "$", "#", "%"],
                    correct: 1,
                    explanation: "$ is the most commonly used alias for the jQuery function, making code more concise."
                },
                {
                    question: "What is the correct jQuery method to set the text content of an element?",
                    options: [".text()", ".content()", ".setText()", ".innerText()"],
                    correct: 0,
                    explanation: ".text() is the jQuery method used to get or set the text content of an element."
                },
                {
                    question: "Which jQuery method is used to attach event handlers to elements?",
                    options: [".bind()", ".on()", ".attach()", ".listen()"],
                    correct: 1,
                    explanation: ".on() is the preferred method for attaching event handlers in modern jQuery."
                },
                {
                    question: "What does $(document).ready() ensure?",
                    options: ["All images are loaded", "The DOM is fully constructed", "All CSS is loaded", "jQuery is loaded"],
                    correct: 1,
                    explanation: "$(document).ready() ensures the DOM is fully loaded before executing JavaScript code."
                },
                {
                    question: "Which jQuery method is used to hide an element?",
                    options: [".hide()", ".invisible()", ".display()", ".remove()"],
                    correct: 0,
                    explanation: ".hide() is the jQuery method that hides an element by setting display: none."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'jquery-basics',
            unitId: 'unit6',
            totalTopicsInUnit: 3,
            nextPageUrl: '../units/unit6.html'
        }
    },

    // JavaScript DOM Topic Data
    "js-dom": {
        quiz: {
            questions: [
                {
                    question: "What does DOM stand for?",
                    options: ["Document Object Model", "Dynamic Object Management", "Data Object Module", "Document Oriented Markup"],
                    correct: 0,
                    explanation: "DOM stands for Document Object Model, which represents the structure of HTML documents."
                },
                {
                    question: "Which method is used to select an element by its ID?",
                    options: ["getElementByClass()", "getElementById()", "querySelector()", "getElementsByTagName()"],
                    correct: 1,
                    explanation: "getElementById() is the method used to select a single element by its unique ID attribute."
                },
                {
                    question: "What property is used to change the text content of an element?",
                    options: [".innerHTML", ".textContent", ".innerText", ".content"],
                    correct: 1,
                    explanation: ".textContent gets or sets the text content of an element, excluding HTML markup."
                },
                {
                    question: "Which method adds an event listener to an element?",
                    options: [".addEvent()", ".onEvent()", ".addEventListener()", ".listen()"],
                    correct: 2,
                    explanation: "addEventListener() is the standard method to attach event handlers to DOM elements."
                },
                {
                    question: "What does the querySelector() method return?",
                    options: ["An array of elements", "The first matching element", "All matching elements", "A NodeList"],
                    correct: 1,
                    explanation: "querySelector() returns the first element that matches the specified CSS selector."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'js-dom',
            unitId: 'unit4',
            totalTopicsInUnit: 5,
            nextPageUrl: '../units/unit4.html'
        }
    },

    // Error Handling Topic Data
    "error-handling": {
        quiz: {
            questions: [
                {
                    question: "What happens if an error is not caught in a try-catch block?",
                    options: ["The error is silently ignored", "The program crashes", "The error is automatically logged", "The error becomes a warning"],
                    correct: 1,
                    explanation: "If an error is not caught, it propagates up the call stack and can crash the program or cause unexpected behavior."
                },
                {
                    question: "Which block always executes in a try-catch-finally statement?",
                    options: ["try", "catch", "finally", "All blocks always execute"],
                    correct: 2,
                    explanation: "The finally block always executes, regardless of whether an error occurred or was caught."
                },
                {
                    question: "How do you handle errors in async/await functions?",
                    options: ["Using try-catch blocks", "Using .catch() method only", "Errors cannot be handled in async functions", "Using setTimeout"],
                    correct: 0,
                    explanation: "Async/await functions use standard try-catch blocks to handle errors, just like synchronous code."
                },
                {
                    question: "What is the purpose of the Error.stack property?",
                    options: ["To store the error message", "To provide a stack trace for debugging", "To indicate the error type", "To count the number of errors"],
                    correct: 1,
                    explanation: "The stack property contains a stack trace showing the sequence of function calls that led to the error."
                },
                {
                    question: "Which of these is NOT a built-in JavaScript error type?",
                    options: ["TypeError", "ReferenceError", "SyntaxError", "LogicError"],
                    correct: 3,
                    explanation: "LogicError is not a built-in JavaScript error type. The built-in types are Error, TypeError, ReferenceError, SyntaxError, etc."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'error-handling',
            unitId: 'unit4',
            totalTopicsInUnit: 5,
            nextPageUrl: '../units/unit4.html'
        }
    },

    // ES6 Features Topic Data
    "es6-features": {
        quiz: {
            questions: [
                {
                    question: "What is the main difference between `let` and `var`?",
                    options: ["`let` is function-scoped, `var` is block-scoped", "`let` is block-scoped, `var` is function-scoped", "They are identical in behavior", "`let` can be redeclared, `var` cannot"],
                    correct: 1,
                    explanation: "`let` is block-scoped while `var` is function-scoped. This means `let` variables are only accessible within their block."
                },
                {
                    question: "What will `console.log(`2 + 3 = ${2 + 3}`)` output?",
                    options: ["2 + 3 = ${2 + 3}", "2 + 3 = 5", "2 + 3 = 23", "SyntaxError"],
                    correct: 1,
                    explanation: "Template literals (backticks) allow string interpolation with ${} syntax, so it evaluates the expression 2 + 3."
                },
                {
                    question: "Which is the correct arrow function syntax?",
                    options: ["(x) -> x * 2", "x => x * 2", "x -> { return x * 2; }", "function(x) => x * 2"],
                    correct: 1,
                    explanation: "Arrow functions use the => syntax. The correct syntax for a single parameter and expression is: x => x * 2"
                },
                {
                    question: "What does `const [a, , c] = [1, 2, 3]` do?",
                    options: ["Creates an error", "a=1, c=3, skips second element", "a=1, c=2", "a=undefined, c=undefined"],
                    correct: 1,
                    explanation: "This is array destructuring with a comma to skip the second element, so a gets 1 and c gets 3."
                },
                {
                    question: "What is the default parameter syntax in ES6?",
                    options: ["function func(a = 1) {}", "function func(a: 1) {}", "function func(a == 1) {}", "function func(a || 1) {}"],
                    correct: 0,
                    explanation: "ES6 introduced default parameters using the = syntax: function func(a = 1) {} sets a default value of 1 if no argument is provided."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'es6-features',
            unitId: 'unit4',
            totalTopicsInUnit: 5,
            nextPageUrl: '../units/unit4.html'
        }
    },

    // JavaScript Embedding Topic Data
    "js-embedding": {
        quiz: {
            questions: [
                {
                    question: "Where is the best place to put JavaScript code in an HTML document?",
                    options: ["In the <head> section", "At the end of the <body> section", "In the <title> tag", "In a <div> element"],
                    correct: 1,
                    explanation: "Placing JavaScript at the end of the body ensures the DOM is loaded before the script runs."
                },
                {
                    question: "Which HTML tag is used to embed external JavaScript files?",
                    options: ["<js>", "<script>", "<javascript>", "<code>"],
                    correct: 1,
                    explanation: "The <script> tag is used to embed JavaScript code, either inline or from external files."
                },
                {
                    question: "What attribute specifies the path to an external JavaScript file?",
                    options: ["href", "src", "link", "path"],
                    correct: 1,
                    explanation: "The src attribute in the <script> tag specifies the URL of an external JavaScript file."
                },
                {
                    question: "What happens if JavaScript is disabled in the browser?",
                    options: ["The page won't load", "Inline scripts are ignored", "External scripts cause errors", "The browser crashes"],
                    correct: 1,
                    explanation: "When JavaScript is disabled, inline scripts are ignored but the page still loads normally."
                },
                {
                    question: "Which attribute makes a script execute only after the page loads?",
                    options: ["defer", "async", "load", "ready"],
                    correct: 0,
                    explanation: "The defer attribute makes the script execute after the document has been parsed."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'js-embedding',
            unitId: 'unit4',
            totalTopicsInUnit: 5,
            nextPageUrl: '../units/unit4.html'
        }
    },

    // JavaScript Functions & Scope Topic Data
    "js-functions-scope": {
        quiz: {
            questions: [
                {
                    question: "What is the scope of a variable declared with 'let' inside a function?",
                    options: ["Global scope", "Function scope", "Block scope", "File scope"],
                    correct: 1,
                    explanation: "Variables declared with 'let' inside a function have function scope and are accessible throughout the function."
                },
                {
                    question: "Which keyword creates a function that can be called before it's defined?",
                    options: ["function", "const", "let", "var"],
                    correct: 0,
                    explanation: "Function declarations are hoisted, meaning they can be called before they are defined in the code."
                },
                {
                    question: "What will happen if you try to access a 'let' variable before it's declared?",
                    options: ["It will be undefined", "It will throw a ReferenceError", "It will be null", "It will work normally"],
                    correct: 1,
                    explanation: "'let' variables are not hoisted and accessing them before declaration throws a ReferenceError."
                },
                {
                    question: "Which of these creates a function expression?",
                    options: ["function myFunc() {}", "const myFunc = function() {}", "Both A and B", "Neither A nor B"],
                    correct: 2,
                    explanation: "Both function declarations and function expressions create functions, but expressions assign them to variables."
                },
                {
                    question: "What is the scope of variables declared with 'var' in a for loop?",
                    options: ["Block scope", "Function scope", "Global scope", "Loop scope"],
                    correct: 1,
                    explanation: "'var' declarations have function scope, not block scope, so loop variables are accessible outside the loop."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'js-functions-scope',
            unitId: 'unit4',
            totalTopicsInUnit: 5,
            nextPageUrl: '../units/unit4.html'
        }
    },

    // JavaScript Introduction Topic Data
    "js-introduction": {
        quiz: {
            questions: [
                {
                    question: "What is JavaScript primarily used for?",
                    options: ["Styling web pages", "Creating interactive web content", "Defining page structure", "Managing databases"],
                    correct: 1,
                    explanation: "JavaScript is primarily used for creating interactive web content and adding dynamic behavior to websites."
                },
                {
                    question: "Where can JavaScript code be placed in an HTML document?",
                    options: ["Only in the <head> section", "Only in the <body> section", "In both <head> and <body> sections", "Only in external files"],
                    correct: 2,
                    explanation: "JavaScript can be placed in both the <head> and <body> sections, or in external files."
                },
                {
                    question: "Which of these is NOT a JavaScript data type?",
                    options: ["string", "boolean", "integer", "undefined"],
                    correct: 2,
                    explanation: "JavaScript doesn't have a separate 'integer' type - all numbers are of type 'number'."
                },
                {
                    question: "What does the 'console.log()' function do?",
                    options: ["Displays an alert box", "Writes to the browser console", "Creates a log file", "Sends data to a server"],
                    correct: 1,
                    explanation: "console.log() outputs messages to the browser's developer console for debugging purposes."
                },
                {
                    question: "Which symbol is used for single-line comments in JavaScript?",
                    options: ["//", "/*", "#", "--"],
                    correct: 0,
                    explanation: "// is used for single-line comments in JavaScript."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'js-introduction',
            unitId: 'unit4',
            totalTopicsInUnit: 5,
            nextPageUrl: '../units/unit4.html'
        }
    },

    // JavaScript Operators Topic Data
    "js-operators": {
        quiz: {
            questions: [
                {
                    question: "What is the result of 5 + '5' in JavaScript?",
                    options: ["10", "'55'", "Error", "undefined"],
                    correct: 1,
                    explanation: "When adding a number and a string, JavaScript converts the number to a string and concatenates them."
                },
                {
                    question: "Which operator checks both value and type equality?",
                    options: ["==", "===", "!=", "!=="],
                    correct: 1,
                    explanation: "The === operator checks for both value and type equality, while == only checks value."
                },
                {
                    question: "What does the '&&' operator return?",
                    options: ["The first truthy value", "The first falsy value", "Always true", "Always false"],
                    correct: 0,
                    explanation: "The && operator returns the first falsy value, or the last truthy value if all are truthy."
                },
                {
                    question: "Which of these is a ternary operator?",
                    options: ["+", "-", "*", "?"],
                    correct: 3,
                    explanation: "The ? operator is the ternary (conditional) operator: condition ? value1 : value2"
                },
                {
                    question: "What is the modulus operator in JavaScript?",
                    options: ["/", "%", "*", "**"],
                    correct: 1,
                    explanation: "The % operator returns the remainder of a division operation."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'js-operators',
            unitId: 'unit4',
            totalTopicsInUnit: 5,
            nextPageUrl: '../units/unit4.html'
        }
    },

    // JavaScript Variables Topic Data
    "js-variables": {
        quiz: {
            questions: [
                {
                    question: "Which keyword declares a block-scoped variable that can be reassigned?",
                    options: ["const", "let", "var", "static"],
                    correct: 1,
                    explanation: "'let' declares block-scoped variables that can be reassigned, unlike 'const' which cannot."
                },
                {
                    question: "What is the difference between 'null' and 'undefined'?",
                    options: ["They are identical", "'null' is an object, 'undefined' means uninitialized", "Both represent empty values", "'undefined' is an object, 'null' means uninitialized"],
                    correct: 1,
                    explanation: "'null' is an object representing 'no value', while 'undefined' means a variable has been declared but not assigned a value."
                },
                {
                    question: "Which data type is NOT primitive in JavaScript?",
                    options: ["string", "boolean", "object", "number"],
                    correct: 2,
                    explanation: "Object is not a primitive data type. Primitive types are: string, number, boolean, undefined, null, symbol, bigint."
                },
                {
                    question: "What happens when you try to reassign a 'const' variable?",
                    options: ["It works normally", "It throws a TypeError", "It becomes undefined", "It converts to 'let'"],
                    correct: 1,
                    explanation: "Attempting to reassign a 'const' variable throws a TypeError because const variables are read-only."
                },
                {
                    question: "Which variable declaration has function scope?",
                    options: ["let", "const", "var", "Both let and const"],
                    correct: 2,
                    explanation: "'var' has function scope, while 'let' and 'const' have block scope."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'js-variables',
            unitId: 'unit4',
            totalTopicsInUnit: 5,
            nextPageUrl: '../units/unit4.html'
        }
    },

    // AJAX Topic Data
    "ajax": {
        quiz: {
            questions: [
                {
                    question: "What does AJAX stand for?",
                    options: ["Asynchronous JavaScript and XML", "Advanced JavaScript and XHTML", "Asynchronous Java And XML", "All JavaScript And XML"],
                    correct: 0,
                    explanation: "AJAX stands for Asynchronous JavaScript and XML, a technique for creating interactive web applications."
                },
                {
                    question: "Which JavaScript object is used to make AJAX requests?",
                    options: ["XMLHttpRequest", "AjaxRequest", "HttpRequest", "WebRequest"],
                    correct: 0,
                    explanation: "XMLHttpRequest is the core JavaScript object used to make asynchronous HTTP requests."
                },
                {
                    question: "What is the readyState value when the request is complete?",
                    options: ["1", "2", "3", "4"],
                    correct: 3,
                    explanation: "readyState 4 indicates that the request has been completed and the response is ready."
                },
                {
                    question: "Which method sends the AJAX request?",
                    options: ["send()", "request()", "execute()", "run()"],
                    correct: 0,
                    explanation: "The send() method sends the request to the server."
                },
                {
                    question: "What does the status code 200 indicate?",
                    options: ["Server error", "Not found", "OK/Success", "Forbidden"],
                    correct: 2,
                    explanation: "HTTP status code 200 indicates that the request was successful."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'ajax',
            unitId: 'unit5',
            totalTopicsInUnit: 4,
            nextPageUrl: '../units/unit5.html'
        }
    },

    // Async/Await Topic Data
    "async-await": {
        quiz: {
            questions: [
                {
                    question: "What does the 'async' keyword do?",
                    options: ["Makes a function asynchronous", "Declares a variable", "Pauses code execution", "Returns a callback"],
                    correct: 0,
                    explanation: "The 'async' keyword declares a function as asynchronous, allowing the use of 'await' inside it."
                },
                {
                    question: "Which statement is true about 'await'?",
                    options: ["Can be used outside async functions", "Waits for a Promise to resolve", "Declares a new Promise", "Throws an error"],
                    correct: 1,
                    explanation: "'await' pauses execution until a Promise resolves, making asynchronous code look synchronous."
                },
                {
                    question: "How do you handle errors in async/await code?",
                    options: ["Using try/catch blocks", "Using .catch() only", "Ignoring errors", "Using setTimeout"],
                    correct: 0,
                    explanation: "Errors in async/await are handled using try/catch blocks, just like synchronous code."
                },
                {
                    question: "What does 'await fetch(url)' do?",
                    options: ["Fetches data synchronously", "Waits for the fetch Promise to resolve", "Throws an error immediately", "Returns undefined"],
                    correct: 1,
                    explanation: "'await fetch(url)' waits for the fetch Promise to resolve and returns the Response object."
                },
                {
                    question: "What type of value must 'await' be used with?",
                    options: ["Any value", "Promises only", "Strings only", "Numbers only"],
                    correct: 1,
                    explanation: "'await' can only be used with Promises. Non-Promise values are automatically wrapped in resolved Promises."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'async-await',
            unitId: 'unit5',
            totalTopicsInUnit: 4,
            nextPageUrl: '../units/unit5.html'
        }
    },

    // Basic Protocols Topic Data
    "basic-protocols": {
        quiz: {
            questions: [
                {
                    question: "What does HTTP stand for?",
                    options: ["Hypertext Transfer Protocol", "High Tech Transfer Process", "Home Text Transfer Protocol", "Hyperlink Text Transfer Process"],
                    correct: 0,
                    explanation: "HTTP stands for Hypertext Transfer Protocol, the foundation of data communication on the web."
                },
                {
                    question: "Which port does HTTP typically use?",
                    options: ["21", "22", "80", "443"],
                    correct: 2,
                    explanation: "HTTP typically uses port 80 for unencrypted connections."
                },
                {
                    question: "What does HTTPS add to HTTP?",
                    options: ["Speed", "Security", "Compression", "Caching"],
                    correct: 1,
                    explanation: "HTTPS adds encryption and security through SSL/TLS certificates."
                },
                {
                    question: "Which HTTP method is used to retrieve data?",
                    options: ["POST", "PUT", "GET", "DELETE"],
                    correct: 2,
                    explanation: "The GET method is used to retrieve data from a server."
                },
                {
                    question: "What does the HTTP status code 404 indicate?",
                    options: ["Server error", "Not found", "Forbidden", "OK"],
                    correct: 1,
                    explanation: "HTTP status code 404 indicates that the requested resource was not found."
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

    // Client-Server Scripting Topic Data
    "client-server-scripting": {
        quiz: {
            questions: [
                {
                    question: "What is the main difference between client-side and server-side scripting?",
                    options: ["Client-side runs in browser, server-side runs on server", "Client-side is faster, server-side is slower", "Client-side uses JavaScript, server-side uses PHP", "Client-side is visible, server-side is hidden"],
                    correct: 0,
                    explanation: "Client-side scripting runs in the user's browser, while server-side scripting runs on the web server."
                },
                {
                    question: "Which of these is a client-side scripting language?",
                    options: ["PHP", "Python", "JavaScript", "Ruby"],
                    correct: 2,
                    explanation: "JavaScript is the primary client-side scripting language that runs in web browsers."
                },
                {
                    question: "What can server-side scripting access that client-side cannot?",
                    options: ["User's local files", "Database servers", "User's browser history", "User's keyboard input"],
                    correct: 1,
                    explanation: "Server-side scripting can access databases, file systems, and server resources that client-side scripts cannot."
                },
                {
                    question: "Which HTTP method is commonly used for form submissions?",
                    options: ["GET", "POST", "PUT", "DELETE"],
                    correct: 1,
                    explanation: "POST is commonly used for form submissions as it can send larger amounts of data securely."
                },
                {
                    question: "What does CGI stand for?",
                    options: ["Common Gateway Interface", "Computer Graphics Interface", "Client Gateway Interface", "Common Graphics Interface"],
                    correct: 0,
                    explanation: "CGI stands for Common Gateway Interface, a standard for external gateway programs to interface with web servers."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'client-server-scripting',
            unitId: 'unit2',
            totalTopicsInUnit: 5,
            nextPageUrl: '../units/unit2.html'
        }
    },

    // Need of CSS Topic Data
    "need-of-css": {
        quiz: {
            questions: [
                {
                    question: "What was the main problem with styling web pages before CSS?",
                    options: ["HTML was too slow", "Styling had to be repeated for every element", "Browsers didn't support colors", "Images couldn't be displayed"],
                    correct: 1,
                    explanation: "Before CSS, styling information like fonts, colors, and layout had to be specified individually for every HTML element, leading to repetitive and hard-to-maintain code."
                },
                {
                    question: "Which of these is a key benefit of separating content from presentation?",
                    options: ["Faster internet connection", "Better maintainability", "More colors available", "Smaller images"],
                    correct: 1,
                    explanation: "Separating content (HTML) from presentation (CSS) makes websites much easier to maintain because you can change the entire site's appearance by modifying just the CSS files."
                },
                {
                    question: "What does CSS stand for?",
                    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colored Style Sheets"],
                    correct: 1,
                    explanation: "CSS stands for Cascading Style Sheets. The 'cascading' refers to how styles can inherit and override each other based on specificity rules."
                },
                {
                    question: "Which approach results in smaller HTML file sizes?",
                    options: ["Using inline styles with font tags", "Using CSS for styling", "Using only images for design", "Using tables for layout"],
                    correct: 1,
                    explanation: "Using CSS results in smaller HTML files because styling information is moved to separate CSS files, eliminating repetitive inline styling code."
                },
                {
                    question: "What is the main principle behind CSS design?",
                    options: ["Separation of concerns", "Faster loading", "Better graphics", "More animations"],
                    correct: 0,
                    explanation: "The main principle is 'separation of concerns' - separating content structure (HTML) from presentation styling (CSS) for better organization and maintainability."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'need-of-css',
            unitId: 'unit3',
            totalTopicsInUnit: 6,
            nextPageUrl: 'css-basics.html'
        }
    },

    // CSS Basics Topic Data
    "css-basics": {
        quiz: {
            questions: [
                {
                    question: "What does CSS stand for?",
                    options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Cascading Simple Sheets"],
                    correct: 0,
                    explanation: "CSS stands for Cascading Style Sheets, used to describe the presentation of a document written in HTML."
                },
                {
                    question: "Which CSS property is used to change the text color?",
                    options: ["font-color", "text-color", "color", "foreground-color"],
                    correct: 2,
                    explanation: "The 'color' property is used to set the color of text in CSS."
                },
                {
                    question: "What is the correct CSS syntax for making all paragraphs bold?",
                    options: ["p {font-weight: bold;}", "p {text-weight: bold;}", "p {font-style: bold;}", "p {bold: true;}"],
                    correct: 0,
                    explanation: "p {font-weight: bold;} is the correct syntax to make all paragraph elements bold."
                },
                {
                    question: "Which CSS property controls the space between elements?",
                    options: ["margin", "padding", "border", "spacing"],
                    correct: 0,
                    explanation: "The 'margin' property controls the space outside an element's border."
                },
                {
                    question: "What does the CSS 'float' property do?",
                    options: ["Makes elements fly", "Positions elements to the left or right", "Changes element opacity", "Rotates elements"],
                    correct: 1,
                    explanation: "The 'float' property allows elements to be positioned to the left or right of their container."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'css-basics',
            unitId: 'unit3',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit3.html'
        }
    },

    // CSS Box Model Topic Data
    "css-box-model": {
        quiz: {
            questions: [
                {
                    question: "Which of these is NOT part of the CSS Box Model?",
                    options: ["Content", "Padding", "Border", "Outline"],
                    correct: 3,
                    explanation: "Outline is not part of the CSS Box Model. The four components are: Content, Padding, Border, and Margin."
                },
                {
                    question: "What does the CSS 'margin' property control?",
                    options: ["Space inside the element", "Space between elements", "The element's border", "The element's background"],
                    correct: 1,
                    explanation: "Margin controls the space outside the element's border, creating space between elements."
                },
                {
                    question: "Which property affects the space between the content and the border?",
                    options: ["margin", "padding", "border-width", "outline"],
                    correct: 1,
                    explanation: "Padding controls the space between the element's content and its border."
                },
                {
                    question: "What is the default value of the CSS 'box-sizing' property?",
                    options: ["content-box", "border-box", "padding-box", "margin-box"],
                    correct: 0,
                    explanation: "The default value of box-sizing is 'content-box', which means width and height only include the content area."
                },
                {
                    question: "Which CSS property can be used to include padding and border in an element's total width?",
                    options: ["box-sizing: content-box", "box-sizing: border-box", "width: 100%", "max-width: 100%"],
                    correct: 1,
                    explanation: "box-sizing: border-box makes the width and height properties include the padding and border, not just the content."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'css-box-model',
            unitId: 'unit3',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit3.html'
        }
    },

    // Flexbox and Grid Layouts Topic Data
    "flexbox-grid": {
        quiz: {
            questions: [
                {
                    question: "What is the main difference between Flexbox and Grid?",
                    options: ["Flexbox is 1-dimensional, Grid is 2-dimensional", "Grid is newer than Flexbox", "Flexbox only works with images", "Grid requires more code"],
                    correct: 0,
                    explanation: "Flexbox is designed for 1-dimensional layouts (rows or columns), while Grid is designed for 2-dimensional layouts (both rows and columns)."
                },
                {
                    question: "Which CSS property is used to enable Flexbox on a container?",
                    options: ["display: flex", "display: grid", "display: block", "display: inline"],
                    correct: 0,
                    explanation: "display: flex enables Flexbox layout on the container element, making its children flex items."
                },
                {
                    question: "What does the 'justify-content' property control in Flexbox?",
                    options: ["Vertical alignment", "Horizontal alignment", "Item sizing", "Item order"],
                    correct: 1,
                    explanation: "justify-content controls the horizontal alignment of flex items along the main axis."
                },
                {
                    question: "Which CSS property is used to enable Grid layout?",
                    options: ["display: flex", "display: grid", "display: table", "display: block"],
                    correct: 1,
                    explanation: "display: grid enables CSS Grid layout on the container element."
                },
                {
                    question: "What does 'grid-template-columns: 1fr 2fr 1fr' create?",
                    options: ["Three equal columns", "Three columns where middle is twice as wide", "Three rows", "A responsive grid"],
                    correct: 1,
                    explanation: "The fr unit represents a fraction of the available space. 1fr 2fr 1fr creates three columns where the middle column takes up twice as much space as the side columns."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'flexbox-grid',
            unitId: 'unit3',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit3.html'
        }
    },

    // CSS Preprocessors Topic Data
    "css-preprocessors": {
        quiz: {
            questions: [
                {
                    question: "What is the main purpose of CSS preprocessors?",
                    options: ["To replace CSS entirely", "To extend CSS with programming features", "To compress CSS files", "To validate CSS syntax"],
                    correct: 1,
                    explanation: "CSS preprocessors extend CSS with programming features like variables, functions, and nesting to make stylesheets more maintainable."
                },
                {
                    question: "Which symbol is used for variables in SASS/SCSS?",
                    options: ["@", "$", "#", "%"],
                    correct: 1,
                    explanation: "SASS/SCSS uses the dollar sign ($) for variables, while LESS uses the at sign (@)."
                },
                {
                    question: "Which directive is used to create mixins in SASS?",
                    options: ["@mixin", "@function", "@extend", "@import"],
                    correct: 0,
                    explanation: "The @mixin directive is used to define reusable code blocks in SASS that can be included in other selectors."
                },
                {
                    question: "What is the recommended maximum nesting depth in SASS?",
                    options: ["2 levels", "3-4 levels", "5-6 levels", "No limit"],
                    correct: 1,
                    explanation: "A maximum nesting depth of 3-4 levels is recommended to avoid overly specific selectors and bloated CSS."
                },
                {
                    question: "Which of these is NOT a popular CSS preprocessor?",
                    options: ["SASS/SCSS", "LESS", "Stylus", "Bootstrap"],
                    correct: 3,
                    explanation: "Bootstrap is a CSS framework, not a preprocessor. SASS/SCSS, LESS, and Stylus are all CSS preprocessors."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'css-preprocessors',
            unitId: 'unit3',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit3.html'
        }
    },

    // CSS Frameworks Topic Data
    "css-frameworks": {
        quiz: {
            questions: [
                {
                    question: "Which class is used in Bootstrap for a responsive container?",
                    options: [".container-fluid", ".container", "Both .container and .container-fluid", ".responsive-container"],
                    correct: 2,
                    explanation: "Both .container and .container-fluid are used in Bootstrap for responsive containers, with .container being fixed-width and .container-fluid being full-width."
                },
                {
                    question: "How many columns does Bootstrap's default grid system have?",
                    options: ["8 columns", "10 columns", "12 columns", "16 columns"],
                    correct: 2,
                    explanation: "Bootstrap's grid system is based on 12 columns, which provides flexibility for creating various layouts."
                },
                {
                    question: "Which framework is known for semantic HTML and highly customizable grid systems?",
                    options: ["Bootstrap", "Foundation", "Tailwind CSS", "Bulma"],
                    correct: 3,
                    explanation: "Bulma is known for its semantic HTML structure and highly customizable, modern CSS framework approach."
                },
                {
                    question: "What is the best practice when customizing CSS frameworks?",
                    options: ["Override classes with !important", "Use framework variables and customization options", "Create completely new CSS files", "Modify the framework source code directly"],
                    correct: 1,
                    explanation: "Using framework variables and customization options is the best practice as it maintains framework updates and avoids specificity issues."
                },
                {
                    question: "Which CSS framework uses utility-first approach?",
                    options: ["Bootstrap", "Foundation", "Tailwind CSS", "Bulma"],
                    correct: 2,
                    explanation: "Tailwind CSS uses a utility-first approach where you build designs using utility classes rather than predefined components."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'css-frameworks',
            unitId: 'unit3',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit3.html'
        }
    },

    // Framework Overview Topic Data
    "framework-overview": {
        quiz: {
            questions: [
                {
                    question: "What is the primary purpose of JavaScript frameworks?",
                    options: ["To replace HTML and CSS", "To provide structure and tools for building web applications", "To create animations only", "To handle server-side processing"],
                    correct: 1,
                    explanation: "JavaScript frameworks provide structure, tools, and best practices for building scalable and maintainable web applications."
                },
                {
                    question: "Which framework is known for its virtual DOM and component-based architecture?",
                    options: ["Angular", "React", "Vue.js", "jQuery"],
                    correct: 1,
                    explanation: "React is famous for its virtual DOM implementation and component-based architecture that improves performance and reusability."
                },
                {
                    question: "What is the main advantage of using a JavaScript framework?",
                    options: ["Faster initial page load", "Structured development approach and reusable components", "Smaller file sizes", "Better browser compatibility"],
                    correct: 1,
                    explanation: "Frameworks provide structured development approaches, reusable components, and development tools that improve productivity and code quality."
                },
                {
                    question: "Which framework uses TypeScript as its primary language?",
                    options: ["React", "Vue.js", "Angular", "Svelte"],
                    correct: 2,
                    explanation: "Angular is built with TypeScript and encourages its use for better type safety and development experience."
                },
                {
                    question: "What should you consider first when choosing a JavaScript framework?",
                    options: ["Popularity on social media", "Project requirements and team expertise", "Framework age", "Number of GitHub stars"],
                    correct: 1,
                    explanation: "The choice of framework should be based on project requirements, team expertise, and long-term maintainability rather than popularity metrics."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'framework-overview',
            unitId: 'unit5',
            totalTopicsInUnit: 5,
            nextPageUrl: '../units/unit5.html'
        }
    },

    // Framework Selection Topic Data
    "framework-selection": {
        quiz: {
            questions: [
                {
                    question: "What is the most important factor when selecting a JavaScript framework?",
                    options: ["Framework popularity", "Project requirements and team skills", "Framework release date", "Number of npm downloads"],
                    correct: 1,
                    explanation: "Project requirements and team skills are the most important factors, as they determine if the framework will meet your needs and if your team can effectively use it."
                },
                {
                    question: "Which framework would be best for a small, simple project?",
                    options: ["Angular (too heavy)", "React (good balance)", "Vue.js (lightweight)", "All frameworks work equally well"],
                    correct: 2,
                    explanation: "Vue.js is often preferred for smaller projects due to its lightweight nature and gentle learning curve."
                },
                {
                    question: "What should you evaluate when comparing framework performance?",
                    options: ["Only initial bundle size", "Bundle size, runtime performance, and development experience", "Only GitHub stars", "Only the number of contributors"],
                    correct: 1,
                    explanation: "Performance evaluation should include bundle size, runtime performance, memory usage, and development experience metrics."
                },
                {
                    question: "Which factor is LEAST important when choosing a framework?",
                    options: ["Community support", "Documentation quality", "Current popularity trends", "Learning curve"],
                    correct: 2,
                    explanation: "Current popularity trends are less important than long-term viability, community support, and documentation quality."
                },
                {
                    question: "What is the best approach for migrating between frameworks?",
                    options: ["Rewrite the entire application", "Gradual migration with feature flags", "Use multiple frameworks simultaneously", "Avoid migration altogether"],
                    correct: 1,
                    explanation: "Gradual migration using feature flags or incremental replacement allows for safer transitions and maintains application stability."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'framework-selection',
            unitId: 'unit5',
            totalTopicsInUnit: 5,
            nextPageUrl: '../units/unit5.html'
        }
    },

    // Frameworks Overview Topic Data
    "frameworks-overview": {
        quiz: {
            questions: [
                {
                    question: "What is the primary benefit of using JavaScript frameworks?",
                    options: ["Faster initial page load", "Structured development and reusable components", "Smaller JavaScript files", "Better browser compatibility"],
                    correct: 1,
                    explanation: "JavaScript frameworks provide structured development approaches, reusable components, and development tools that improve productivity and code maintainability."
                },
                {
                    question: "Which framework is known for its two-way data binding feature?",
                    options: ["React", "Vue.js", "Angular", "Svelte"],
                    correct: 2,
                    explanation: "Angular is known for its two-way data binding, which automatically synchronizes data between the model and view."
                },
                {
                    question: "What does 'SPA' stand for in the context of JavaScript frameworks?",
                    options: ["Simple Page Application", "Single Page Application", "Static Page Architecture", "Server-side Page Application"],
                    correct: 1,
                    explanation: "SPA stands for Single Page Application, where the entire application runs in the browser and dynamically updates content without full page reloads."
                },
                {
                    question: "Which framework uses a virtual DOM for performance optimization?",
                    options: ["Angular", "Vue.js", "React", "All of the above"],
                    correct: 2,
                    explanation: "React uses a virtual DOM to optimize rendering performance by minimizing direct DOM manipulations."
                },
                {
                    question: "What is a key advantage of component-based frameworks?",
                    options: ["Smaller file sizes", "Reusable and maintainable code", "Faster initial load", "Better SEO"],
                    correct: 1,
                    explanation: "Component-based frameworks allow developers to create reusable UI components, improving code maintainability and development efficiency."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'frameworks-overview',
            unitId: 'unit5',
            totalTopicsInUnit: 5,
            nextPageUrl: '../units/unit5.html'
        }
    },

    // SEO Fundamentals Topic Data
    "seo-fundamentals": {
        quiz: {
            questions: [
                {
                    question: "What does SEO stand for?",
                    options: ["Search Engine Optimization", "Site Enhancement Operations", "Search Engine Operations", "Site Enhancement Optimization"],
                    correct: 0,
                    explanation: "SEO stands for Search Engine Optimization, the practice of improving websites to increase visibility in search engine results."
                },
                {
                    question: "Which HTML element is most important for SEO?",
                    options: ["<div>", "<title>", "<h1>", "<span>"],
                    correct: 1,
                    explanation: "The <title> element is crucial for SEO as it tells search engines what the page is about and appears in search results."
                },
                {
                    question: "What is the recommended length for a page title?",
                    options: ["10-20 characters", "30-60 characters", "100-150 characters", "200+ characters"],
                    correct: 1,
                    explanation: "Page titles should be 30-60 characters long to display properly in search results without being cut off."
                },
                {
                    question: "Which attribute provides alternative text for images?",
                    options: ["title", "alt", "src", "desc"],
                    correct: 1,
                    explanation: "The alt attribute provides alternative text for images, which is important for accessibility and helps search engines understand image content."
                },
                {
                    question: "What is the purpose of meta descriptions?",
                    options: ["To style the page", "To provide a summary in search results", "To link to other pages", "To add keywords"],
                    correct: 1,
                    explanation: "Meta descriptions provide a brief summary of the page content that appears under the title in search engine results."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'seo-fundamentals',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    },

    // Tables & Forms Topic Data
    "tables-forms": {
        quiz: {
            questions: [
                {
                    question: "Which HTML element is used to create a table?",
                    options: ["<table>", "<tab>", "<tbl>", "<grid>"],
                    correct: 0,
                    explanation: "The <table> element is used to create tables in HTML."
                },
                {
                    question: "What is the correct HTML for creating a table row?",
                    options: ["<tr>", "<row>", "<td>", "<th>"],
                    correct: 0,
                    explanation: "The <tr> element defines a table row."
                },
                {
                    question: "Which element is used for table headers?",
                    options: ["<td>", "<th>", "<tr>", "<thead>"],
                    correct: 1,
                    explanation: "The <th> element defines a header cell in a table."
                },
                {
                    question: "What is the purpose of the 'action' attribute in a form?",
                    options: ["To style the form", "To specify where to send form data", "To validate form data", "To add form elements"],
                    correct: 1,
                    explanation: "The action attribute specifies the URL where form data should be sent when submitted."
                },
                {
                    question: "Which input type creates a password field?",
                    options: ["text", "password", "hidden", "email"],
                    correct: 1,
                    explanation: "The password input type creates a field that hides the entered text for security."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'tables-forms',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    },

    // Typography & Color Topic Data
    "typography-color": {
        quiz: {
            questions: [
                {
                    question: "What is the optimal line length for readability?",
                    options: ["40-50 characters", "45-75 characters", "80-100 characters", "100+ characters"],
                    correct: 1,
                    explanation: "The optimal line length for readability is typically 45-75 characters per line, which helps maintain reader focus and reduces eye strain."
                },
                {
                    question: "Which color combination provides the highest contrast?",
                    options: ["Blue text on white background", "Black text on white background", "Gray text on white background", "Red text on green background"],
                    correct: 1,
                    explanation: "Black text on a white background provides the highest contrast ratio, making it the most readable combination."
                },
                {
                    question: "What is the minimum contrast ratio for normal text according to WCAG AA?",
                    options: ["3:1", "4.5:1", "7:1", "10:1"],
                    correct: 1,
                    explanation: "WCAG AA guidelines require a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text."
                },
                {
                    question: "Which font pairing principle creates effective contrast?",
                    options: ["Use fonts from the same family", "Pair serif with sans-serif", "Use similar x-heights", "Match letter spacing exactly"],
                    correct: 1,
                    explanation: "Pairing serif fonts with sans-serif fonts creates effective contrast and visual hierarchy in typography."
                },
                {
                    question: "What does HSL stand for in color theory?",
                    options: ["High Saturation Light", "Hue, Saturation, Lightness", "HTML Style Language", "Hexadecimal Style Layout"],
                    correct: 1,
                    explanation: "HSL stands for Hue, Saturation, and Lightness - a cylindrical-coordinate representation of colors."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'typography-color',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    },

    // Typography Topic Data
    "typography": {
        quiz: {
            questions: [
                {
                    question: "What is the main purpose of typography in web design?",
                    options: ["To make text colorful", "To make text readable and visually appealing", "To hide text from users", "To encrypt text content"],
                    correct: 1,
                    explanation: "Typography's main purpose is to make text readable and visually appealing, enhancing user experience and communication."
                },
                {
                    question: "Which CSS property controls the space between lines of text?",
                    options: ["letter-spacing", "word-spacing", "line-height", "text-indent"],
                    correct: 2,
                    explanation: "The line-height property controls the space between lines of text, affecting readability and visual hierarchy."
                },
                {
                    question: "What does 'leading' refer to in typography?",
                    options: ["Font size", "Space between lines", "Font weight", "Letter spacing"],
                    correct: 1,
                    explanation: "Leading refers to the vertical space between lines of text, traditionally measured in points."
                },
                {
                    question: "Which font category is best for body text on screens?",
                    options: ["Script fonts", "Display fonts", "Sans-serif fonts", "Decorative fonts"],
                    correct: 2,
                    explanation: "Sans-serif fonts are generally more readable on screens due to their clean lines and lack of serifs."
                },
                {
                    question: "What is the recommended font size range for body text on websites?",
                    options: ["8-12px", "14-18px", "20-24px", "26-32px"],
                    correct: 1,
                    explanation: "14-18px is the recommended font size range for body text, providing good readability across devices."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'typography',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    },

    // UI/UX Design Topic Data
    "ui-ux-design": {
        quiz: {
            questions: [
                {
                    question: "What does UX stand for in web design?",
                    options: ["User Experience", "User Extension", "Universal Experience", "User Experiment"],
                    correct: 0,
                    explanation: "UX stands for User Experience, which focuses on how users interact with and experience a product."
                },
                {
                    question: "What does UI stand for in web design?",
                    options: ["User Interface", "User Interaction", "Universal Interface", "User Integration"],
                    correct: 0,
                    explanation: "UI stands for User Interface, which refers to the visual elements users interact with on a website."
                },
                {
                    question: "Which principle focuses on making interfaces easy to understand?",
                    options: ["Consistency", "Visibility", "Learnability", "All of the above"],
                    correct: 3,
                    explanation: "All these principles - consistency, visibility, and learnability - contribute to making interfaces easy to understand."
                },
                {
                    question: "What is the primary goal of UX design?",
                    options: ["Make websites look beautiful", "Ensure user satisfaction and usability", "Use the latest design trends", "Create complex navigation"],
                    correct: 1,
                    explanation: "The primary goal of UX design is to ensure user satisfaction and usability through intuitive, efficient interactions."
                },
                {
                    question: "Which of these is NOT a key component of good UI design?",
                    options: ["Intuitive navigation", "Consistent color scheme", "Complex animations", "Clear typography"],
                    correct: 2,
                    explanation: "While animations can enhance UI, complex animations that distract from usability are not a key component of good UI design."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'ui-ux-design',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    },

    // UIUX Design Topic Data
    "uiux-design": {
        quiz: {
            questions: [
                {
                    question: "What is the difference between UI and UX design?",
                    options: ["UI is about visuals, UX is about experience", "UI is about code, UX is about design", "UI is about mobile, UX is about web", "There is no difference"],
                    correct: 0,
                    explanation: "UI (User Interface) focuses on the visual elements users interact with, while UX (User Experience) focuses on the overall experience and usability."
                },
                {
                    question: "Which of these is a key principle of good UX design?",
                    options: ["Making everything colorful", "Ensuring intuitive navigation", "Using complex animations", "Adding as many features as possible"],
                    correct: 1,
                    explanation: "Intuitive navigation is a key principle of good UX design, helping users find what they need easily."
                },
                {
                    question: "What does 'accessibility' mean in UI/UX design?",
                    options: ["Making designs look professional", "Ensuring designs work for all users including those with disabilities", "Using the latest design trends", "Creating designs that load quickly"],
                    correct: 1,
                    explanation: "Accessibility in UI/UX design means ensuring that designs work for all users, including those with disabilities, following guidelines like WCAG."
                },
                {
                    question: "What is a 'user persona' in UX design?",
                    options: ["A fictional character representing a user type", "A real user who tests the design", "A designer's self-portrait", "A type of user interface element"],
                    correct: 0,
                    explanation: "A user persona is a fictional character created to represent a user type, helping designers understand user needs and behaviors."
                },
                {
                    question: "Which tool is commonly used for creating UI/UX wireframes?",
                    options: ["Microsoft Word", "Figma", "Calculator", "File Explorer"],
                    correct: 1,
                    explanation: "Figma is a popular tool for creating UI/UX wireframes, prototypes, and collaborative design work."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'uiux-design',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    },

    // Web Accessibility Topic Data
    "web-accessibility": {
        quiz: {
            questions: [
                {
                    question: "What does WCAG stand for?",
                    options: ["Web Content Accessibility Guidelines", "World Wide Accessibility Code", "Web Compliance Accessibility Group", "Website Content Access Guide"],
                    correct: 0,
                    explanation: "WCAG stands for Web Content Accessibility Guidelines, the international standard for web accessibility."
                },
                {
                    question: "Which of these is NOT a principle of WCAG?",
                    options: ["Perceivable", "Operable", "Understandable", "Compatible"],
                    correct: 3,
                    explanation: "The four main principles of WCAG are: Perceivable, Operable, Understandable, and Robust (not Compatible)."
                },
                {
                    question: "What is the purpose of alt text on images?",
                    options: ["To make images load faster", "To provide text descriptions for screen readers", "To improve SEO only", "To add captions to images"],
                    correct: 1,
                    explanation: "Alt text provides text descriptions of images for screen readers, helping visually impaired users understand image content."
                },
                {
                    question: "What is the minimum contrast ratio required by WCAG AA for normal text?",
                    options: ["2:1", "3:1", "4.5:1", "7:1"],
                    correct: 2,
                    explanation: "WCAG AA requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text."
                },
                {
                    question: "Which HTML element should be used for page headings?",
                    options: ["<div>", "<span>", "<h1>-<h6>", "<p>"],
                    correct: 2,
                    explanation: "Heading elements (<h1> through <h6>) provide semantic structure and are essential for screen reader navigation."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'web-accessibility',
            unitId: 'unit1',
            totalTopicsInUnit: 6,
            nextPageUrl: '../units/unit1.html'
        }
    },

    // Need of CSS Topic Data
    "need-of-css": {
        // Quiz data
        quiz: {
            questions: [
                {
                    question: "What is the primary purpose of CSS?",
                    options: ["To add content to web pages", "To control the presentation and styling of web pages", "To add functionality to web pages", "To create database connections"],
                    correct: 1,
                    explanation: "CSS (Cascading Style Sheets) is designed to control the presentation and visual styling of web documents, separating content from presentation."
                },
                {
                    question: "What was the main problem with styling web pages before CSS?",
                    options: ["Pages loaded too slowly", "Styling had to be repeated for each element", "Browsers couldn't display colors", "Images couldn't be added to pages"],
                    correct: 1,
                    explanation: "Before CSS, styling information had to be repeated for every element using HTML attributes like <font>, making maintenance difficult and code repetitive."
                },
                {
                    question: "Which principle does CSS follow for better code organization?",
                    options: ["Separation of concerns", "Object-oriented programming", "Database normalization", "Agile methodology"],
                    correct: 0,
                    explanation: "CSS follows the principle of separation of concerns by separating content (HTML) from presentation (CSS), making code more organized and maintainable."
                },
                {
                    question: "What is a key benefit of using CSS for styling?",
                    options: ["Smaller HTML files", "Better browser compatibility", "Faster database queries", "Automatic content generation"],
                    correct: 0,
                    explanation: "CSS reduces HTML file size by removing inline styling attributes and allows for better caching, resulting in improved performance."
                },
                {
                    question: "How does CSS improve website maintainability?",
                    options: ["By automatically backing up files", "By allowing one change to update multiple elements", "By compressing images automatically", "By validating HTML syntax"],
                    correct: 1,
                    explanation: "CSS allows you to change styling rules once in a stylesheet and have those changes apply to all elements using those rules across multiple pages."
                }
            ]
        },

        // Configuration
        config: {
            topicId: 'need-of-css',
            unitId: 'unit3',
            totalTopicsInUnit: 6,
            nextPageUrl: 'css-basics.html'
        }
    }
};

// Function to get current topic data based on page URL or topic ID
function getCurrentTopicData() {
    // Extract topic name from current URL
    const path = window.location.pathname;

    // Handle both file:// and http:// URLs
    const topicMatch = path.match(/\/([^\/]+)\.html$/) || path.match(/([^\\\/]+)\.html$/);

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