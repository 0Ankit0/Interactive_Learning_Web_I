// DNS Hierarchy Topic JavaScript
document.addEventListener('DOMContentLoaded', function () {
    initializeDnsTopic();
});

function initializeDnsTopic() {
    initializeDnsTree();
    initializeDnsRecords();
    setupDnsSimulator();
}

// DNS Tree Interactive Elements
function initializeDnsTree() {
    const dnsNodes = document.querySelectorAll('.dns-node');

    dnsNodes.forEach(node => {
        node.addEventListener('mouseenter', function () {
            highlightDnsPath(this);
            showNodeDetails(this);
        });

        node.addEventListener('mouseleave', function () {
            clearDnsHighlights();
            hideNodeDetails();
        });
    });
}

function highlightDnsPath(targetNode) {
    // Clear previous highlights
    clearDnsHighlights();

    // Highlight the target node
    targetNode.classList.add('highlighted');

    // Highlight parent path based on node type and data attributes
    if (targetNode.classList.contains('subdomain-node')) {
        const parentName = targetNode.dataset.parent;
        const parentNode = document.querySelector(`.sld-node[data-parent] span`);
        if (parentNode && parentNode.textContent === parentName) {
            parentNode.parentElement.classList.add('highlighted');
        }
    }

    if (targetNode.classList.contains('sld-node')) {
        const parentTld = targetNode.dataset.parent;
        const tldNode = document.querySelector(`.tld-node[data-tld="${parentTld}"]`);
        if (tldNode) {
            tldNode.classList.add('highlighted');
        }
    }

    // Always highlight root for any selection
    const rootNode = document.querySelector('.root-node');
    if (rootNode) {
        rootNode.classList.add('highlighted');
    }
}

function clearDnsHighlights() {
    const highlightedNodes = document.querySelectorAll('.dns-node.highlighted');
    highlightedNodes.forEach(node => {
        node.classList.remove('highlighted');
    });
}

function showNodeDetails(node) {
    const nodeDetails = {
        'root': {
            title: 'Root Level (.)',
            description: 'The root of the DNS hierarchy. Managed by IANA (Internet Assigned Numbers Authority). There are 13 root server clusters worldwide.',
            examples: 'All DNS queries ultimately trace back to the root servers.',
            managed: 'IANA'
        },
        'com': {
            title: '.com TLD',
            description: 'Commercial top-level domain. Originally intended for commercial organizations but now available to anyone.',
            examples: 'google.com, amazon.com, facebook.com',
            managed: 'Verisign'
        },
        'org': {
            title: '.org TLD',
            description: 'Organization top-level domain. Originally for non-profit organizations.',
            examples: 'wikipedia.org, mozilla.org, apache.org',
            managed: 'Public Interest Registry'
        },
        'edu': {
            title: '.edu TLD',
            description: 'Education top-level domain. Restricted to accredited educational institutions.',
            examples: 'mit.edu, stanford.edu, harvard.edu',
            managed: 'Educause'
        },
        'gov': {
            title: '.gov TLD',
            description: 'Government top-level domain. Restricted to US government entities.',
            examples: 'usa.gov, nasa.gov, fbi.gov',
            managed: 'General Services Administration'
        }
    };

    let nodeType = 'root';
    if (node.classList.contains('tld-node')) {
        nodeType = node.dataset.tld;
    }

    const details = nodeDetails[nodeType];
    if (details) {
        // Create or update tooltip
        let tooltip = document.getElementById('dns-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'dns-tooltip';
            tooltip.className = 'dns-tooltip';
            document.body.appendChild(tooltip);
        }

        tooltip.innerHTML = `
            <h4>${details.title}</h4>
            <p>${details.description}</p>
            <div class="tooltip-examples">
                <strong>Examples:</strong> ${details.examples}
            </div>
            <div class="tooltip-managed">
                <strong>Managed by:</strong> ${details.managed}
            </div>
        `;
        tooltip.style.display = 'block';

        // Position tooltip
        const rect = node.getBoundingClientRect();
        tooltip.style.left = (rect.right + 10) + 'px';
        tooltip.style.top = rect.top + 'px';
    }
}

function hideNodeDetails() {
    const tooltip = document.getElementById('dns-tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// DNS Records Interactive Elements
function initializeDnsRecords() {
    const recordCards = document.querySelectorAll('.record-card');

    recordCards.forEach(card => {
        card.addEventListener('click', function () {
            const recordType = this.dataset.type;
            showRecordDetails(recordType);
        });
    });
}

function showRecordDetails(recordType) {
    const recordDetails = {
        'A': {
            fullName: 'Address Record',
            purpose: 'Maps a domain name to an IPv4 address (32-bit)',
            syntax: 'domain TTL class A ip-address',
            example: 'example.com. 3600 IN A 192.0.2.1',
            useCase: 'Most common DNS record type. Used to point domain names to web servers.',
            limitations: 'Only supports IPv4 addresses. Use AAAA for IPv6.'
        },
        'AAAA': {
            fullName: 'IPv6 Address Record',
            purpose: 'Maps a domain name to an IPv6 address (128-bit)',
            syntax: 'domain TTL class AAAA ipv6-address',
            example: 'example.com. 3600 IN AAAA 2001:db8:85a3::8a2e:370:7334',
            useCase: 'Used for IPv6 connectivity. Essential for modern internet infrastructure.',
            limitations: 'Not supported by all DNS resolvers and older systems.'
        },
        'CNAME': {
            fullName: 'Canonical Name Record',
            purpose: 'Creates an alias that points to another domain name',
            syntax: 'alias TTL class CNAME canonical-name',
            example: 'www.example.com. 3600 IN CNAME example.com.',
            useCase: 'Useful for pointing multiple names to the same resource.',
            limitations: 'Cannot coexist with other record types for the same name.'
        },
        'MX': {
            fullName: 'Mail Exchange Record',
            purpose: 'Specifies the mail server responsible for email delivery',
            syntax: 'domain TTL class MX priority mail-server',
            example: 'example.com. 3600 IN MX 10 mail.example.com.',
            useCase: 'Essential for email delivery. Lower priority numbers are preferred.',
            limitations: 'Requires corresponding A or AAAA record for the mail server.'
        },
        'NS': {
            fullName: 'Name Server Record',
            purpose: 'Delegates a subdomain to a set of name servers',
            syntax: 'domain TTL class NS name-server',
            example: 'example.com. 3600 IN NS ns1.example.com.',
            useCase: 'Used to delegate authority for subdomains to other name servers.',
            limitations: 'Requires multiple NS records for redundancy.'
        },
        'TXT': {
            fullName: 'Text Record',
            purpose: 'Contains arbitrary human-readable text',
            syntax: 'domain TTL class TXT "text-string"',
            example: 'example.com. 3600 IN TXT "v=spf1 include:_spf.google.com ~all"',
            useCase: 'Used for SPF, DKIM, domain verification, and other text-based configurations.',
            limitations: 'Limited to 255 characters per string (can have multiple strings).'
        }
    };

    const details = recordDetails[recordType];
    if (details) {
        const message = `${recordType} Record - ${details.fullName}\n\n${details.purpose}\n\nSyntax: ${details.syntax}\n\nExample: ${details.example}\n\nUse Case: ${details.useCase}\n\nLimitations: ${details.limitations}`;
        alert(message);
    }
}

// DNS Simulator
function setupDnsSimulator() {
    // Initialize simulator state
    window.dnsLookupInProgress = false;
}

function startDnsLookup() {
    if (window.dnsLookupInProgress) return;

    const domain = document.getElementById('domainInput').value.trim();
    if (!domain) {
        alert('Please enter a domain name to lookup.');
        return;
    }

    window.dnsLookupInProgress = true;
    const lookupBtn = document.getElementById('lookupBtn');
    const visualization = document.getElementById('lookupVisualization');
    const result = document.getElementById('lookupResult');

    // Reset visualization
    result.style.display = 'none';
    visualization.style.display = 'block';
    lookupBtn.disabled = true;
    lookupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Looking up...';

    // Reset all steps
    for (let i = 1; i <= 6; i++) {
        const step = document.getElementById(`step${i}`);
        step.classList.remove('active', 'complete');
        step.querySelector('.step-status').textContent = 'Waiting...';
    }

    // Simulate DNS lookup process
    simulateDnsStep(1, domain);
}

function simulateDnsStep(stepNumber, domain) {
    const step = document.getElementById(`step${stepNumber}`);
    const statusElement = step.querySelector('.step-status');

    // Activate current step
    step.classList.add('active');

    const stepActions = {
        1: {
            status: 'Checking browser cache...',
            delay: 800,
            result: 'Not found in cache'
        },
        2: {
            status: 'Checking OS cache...',
            delay: 600,
            result: 'Not found in OS cache'
        },
        3: {
            status: 'Contacting ISP DNS...',
            delay: 1000,
            result: 'Cache miss, forwarding query'
        },
        4: {
            status: 'Querying root servers...',
            delay: 900,
            result: 'Redirected to TLD server'
        },
        5: {
            status: 'Querying TLD server...',
            delay: 700,
            result: 'Redirected to authoritative server'
        },
        6: {
            status: 'Querying authoritative server...',
            delay: 500,
            result: 'IP address found!'
        }
    };

    const action = stepActions[stepNumber];
    statusElement.textContent = action.status;

    setTimeout(() => {
        // Mark step as complete
        step.classList.remove('active');
        step.classList.add('complete');
        statusElement.textContent = action.result;

        if (stepNumber < 6) {
            // Continue to next step
            simulateDnsStep(stepNumber + 1, domain);
        } else {
            // Show final result
            showDnsResult(domain);
        }
    }, action.delay);
}

function showDnsResult(domain) {
    const result = document.getElementById('lookupResult');
    const lookupBtn = document.getElementById('lookupBtn');

    // Generate mock IP based on domain
    const mockIPs = {
        'google.com': '142.250.184.14',
        'github.com': '140.82.113.4',
        'stackoverflow.com': '151.101.1.69',
        'mozilla.org': '44.236.48.78',
        'example.com': '93.184.216.34'
    };

    const ip = mockIPs[domain.toLowerCase()] || generateMockIP();
    const ttl = Math.floor(Math.random() * 3600) + 300; // 5min to 1hour

    // Update result display
    document.getElementById('resultDomain').textContent = domain;
    document.getElementById('resultIP').textContent = ip;
    document.getElementById('resultType').textContent = 'A';
    document.getElementById('resultTTL').textContent = `${ttl} seconds`;

    // Show result
    result.style.display = 'block';

    // Reset button
    lookupBtn.disabled = false;
    lookupBtn.innerHTML = '<i class="fas fa-search"></i> Lookup Another';
    window.dnsLookupInProgress = false;
}

function generateMockIP() {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

// Add custom styles for DNS interactions
function addDnsStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .dns-tooltip {
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-size: 14px;
            max-width: 350px;
            z-index: 1000;
            display: none;
            pointer-events: none;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        .dns-tooltip h4 {
            margin: 0 0 10px 0;
            color: #4facfe;
            font-size: 16px;
        }
        
        .dns-tooltip p {
            margin: 0 0 10px 0;
            line-height: 1.4;
        }
        
        .tooltip-examples,
        .tooltip-managed {
            margin: 8px 0;
            font-size: 13px;
        }
        
        .tooltip-examples strong,
        .tooltip-managed strong {
            color: #00f2fe;
        }
        
        .dns-node {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .dns-node:hover {
            transform: translateY(-3px);
        }
        
        .dns-node.highlighted {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            transform: scale(1.1);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
        
        .record-card {
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .record-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .lookup-step {
            transition: all 0.3s ease;
            opacity: 0.6;
        }
        
        .lookup-step.active {
            opacity: 1;
            transform: scale(1.05);
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
        }
        
        .lookup-step.complete {
            opacity: 1;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
        }
        
        .lookup-step.complete .step-icon i {
            color: #00ff88;
        }
        
        .query-input {
            display: flex;
            gap: 15px;
            margin-bottom: 30px;
            align-items: center;
        }
        
        .query-input input {
            flex: 1;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
        }
        
        .query-input input:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .lookup-steps {
            display: grid;
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .lookup-step {
            display: flex;
            align-items: center;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            background: white;
        }
        
        .step-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
        }
        
        .step-icon i {
            font-size: 20px;
            color: #667eea;
        }
        
        .step-info h4 {
            margin: 0 0 5px 0;
            font-size: 16px;
        }
        
        .step-status {
            font-size: 14px;
            color: #666;
        }
        
        .result-details {
            background: white;
            padding: 20px;
            border-radius: 8px;
            border: 2px solid #4facfe;
        }
        
        .result-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        
        .result-row:last-child {
            border-bottom: none;
        }
        
        .result-row .label {
            font-weight: 600;
        }
        
        .result-row .value {
            font-family: 'JetBrains Mono', monospace;
            color: #667eea;
        }
    `;
    document.head.appendChild(style);
}

// Initialize styles when page loads
document.addEventListener('DOMContentLoaded', addDnsStyles);
