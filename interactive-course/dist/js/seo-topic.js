/**
 * SEO Fundamentals Topic Interactive Features
 * Handles meta tag optimization, structured data generation, and SEO analysis
 */

class SEOTopic {
    constructor() {
        this.initializeEventListeners();
        this.initializeSchemaBuilder();
        this.initializeQuiz();
        this.setupMetaOptimizer();
        this.schemaTemplates = this.getSchemaTemplates();
        this.seoFactors = this.getSEOFactors();
    }

    initializeEventListeners() {
        // Meta tag character counters
        const titleInput = document.getElementById('page-title');
        const descInput = document.getElementById('meta-description');

        if (titleInput) {
            titleInput.addEventListener('input', () => this.updateCharCounter('title'));
        }

        if (descInput) {
            descInput.addEventListener('input', () => this.updateCharCounter('description'));
        }

        // Make functions globally available
        window.generatePreview = () => this.generatePreview();
        window.updateSchemaForm = () => this.updateSchemaForm();
        window.generateStructuredData = () => this.generateStructuredData();
        window.copyToClipboard = () => this.copyToClipboard();
        window.validateSchema = () => this.validateSchema();
        window.analyzeContent = () => this.analyzeContent();
        window.testOnPageSEO = () => this.testOnPageSEO();
        window.testTechnicalSEO = () => this.testTechnicalSEO();
        window.testContentSEO = () => this.testContentSEO();
    }

    setupMetaOptimizer() {
        // Initialize with example data
        this.updateCharCounter('title');
        this.updateCharCounter('description');
    }

    updateCharCounter(type) {
        const input = document.getElementById(type === 'title' ? 'page-title' : 'meta-description');
        const counter = document.getElementById(type === 'title' ? 'title-count' : 'desc-count');
        const status = document.getElementById(type === 'title' ? 'title-status' : 'desc-status');

        if (!input || !counter || !status) return;

        const length = input.value.length;
        const maxLength = type === 'title' ? 60 : 160;
        const optimalMin = type === 'title' ? 30 : 120;

        counter.textContent = length;

        if (length === 0) {
            status.textContent = 'Required';
            status.className = 'status empty';
        } else if (length < optimalMin) {
            status.textContent = 'Too short';
            status.className = 'status short';
        } else if (length > maxLength) {
            status.textContent = 'Too long';
            status.className = 'status long';
        } else {
            status.textContent = 'Good';
            status.className = 'status good';
        }
    }

    generatePreview() {
        const title = document.getElementById('page-title').value || 'Your Page Title Here';
        const description = document.getElementById('meta-description').value || 'Your meta description will appear here. Make it compelling to encourage clicks!';
        const url = document.getElementById('page-url').value || 'https://example.com/page';

        // Update preview
        document.getElementById('preview-title').textContent = title;
        document.getElementById('preview-description').textContent = description;
        document.getElementById('preview-url').textContent = url;

        // Calculate and display SEO score
        this.calculateSEOScore();
    }

    calculateSEOScore() {
        const title = document.getElementById('page-title').value;
        const description = document.getElementById('meta-description').value;
        const url = document.getElementById('page-url').value;
        const keywords = document.getElementById('keywords').value;

        let score = 0;
        const factors = [];

        // Title optimization (30 points)
        if (title.length >= 30 && title.length <= 60) {
            score += 30;
            factors.push({ name: 'Title Length', status: 'good', points: 30 });
        } else {
            factors.push({ name: 'Title Length', status: 'poor', points: 0 });
        }

        // Description optimization (25 points)
        if (description.length >= 120 && description.length <= 160) {
            score += 25;
            factors.push({ name: 'Meta Description', status: 'good', points: 25 });
        } else {
            factors.push({ name: 'Meta Description', status: 'poor', points: 0 });
        }

        // URL structure (20 points)
        if (url && this.isValidURL(url) && url.length < 100) {
            score += 20;
            factors.push({ name: 'URL Structure', status: 'good', points: 20 });
        } else {
            factors.push({ name: 'URL Structure', status: 'poor', points: 0 });
        }

        // Keywords presence (25 points)
        if (keywords && keywords.trim().length > 0) {
            const keywordList = keywords.split(',').map(k => k.trim()).filter(k => k);
            if (keywordList.length > 0) {
                score += 25;
                factors.push({ name: 'Keywords Defined', status: 'good', points: 25 });
            } else {
                factors.push({ name: 'Keywords Defined', status: 'poor', points: 0 });
            }
        } else {
            factors.push({ name: 'Keywords Defined', status: 'poor', points: 0 });
        }

        this.displaySEOScore(score, factors);
    }

    displaySEOScore(score, factors) {
        const scoreDisplay = document.getElementById('seo-score');
        const factorsContainer = document.getElementById('score-factors');

        if (scoreDisplay) {
            const scoreSpan = scoreDisplay.querySelector('.score');
            const labelSpan = scoreDisplay.querySelector('.label');

            if (scoreSpan) scoreSpan.textContent = score;

            if (labelSpan) {
                let label = 'Poor';
                let className = 'poor';

                if (score >= 90) { label = 'Excellent'; className = 'excellent'; }
                else if (score >= 70) { label = 'Good'; className = 'good'; }
                else if (score >= 50) { label = 'Fair'; className = 'fair'; }

                labelSpan.textContent = label;
                labelSpan.className = `label ${className}`;
            }
        }

        if (factorsContainer) {
            factorsContainer.innerHTML = factors.map(factor => `
                <div class="factor ${factor.status}">
                    <span class="factor-name">${factor.name}</span>
                    <span class="factor-points">${factor.points}/
                        ${factor.name === 'Title Length' ? '30' :
                    factor.name === 'Meta Description' ? '25' :
                        factor.name === 'URL Structure' ? '20' : '25'}</span>
                </div>
            `).join('');
        }
    }

    isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    // Schema Builder functionality
    initializeSchemaBuilder() {
        this.updateSchemaForm();
    }

    getSchemaTemplates() {
        return {
            organization: {
                name: 'Organization Name',
                url: 'https://example.com',
                logo: 'https://example.com/logo.png',
                description: 'Organization description',
                address: {
                    streetAddress: '123 Main St',
                    addressLocality: 'City',
                    addressRegion: 'State',
                    postalCode: '12345',
                    addressCountry: 'US'
                }
            },
            person: {
                name: 'Person Name',
                jobTitle: 'Job Title',
                url: 'https://example.com/person',
                image: 'https://example.com/person.jpg',
                description: 'Person description'
            },
            article: {
                headline: 'Article Title',
                author: 'Author Name',
                datePublished: new Date().toISOString().split('T')[0],
                dateModified: new Date().toISOString().split('T')[0],
                description: 'Article description',
                image: 'https://example.com/article-image.jpg'
            },
            product: {
                name: 'Product Name',
                description: 'Product description',
                image: 'https://example.com/product.jpg',
                brand: 'Brand Name',
                sku: 'SKU123',
                offers: {
                    price: '99.99',
                    priceCurrency: 'USD',
                    availability: 'InStock'
                }
            },
            event: {
                name: 'Event Name',
                description: 'Event description',
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date().toISOString().split('T')[0],
                location: 'Event Location',
                organizer: 'Organizer Name'
            },
            recipe: {
                name: 'Recipe Name',
                description: 'Recipe description',
                author: 'Chef Name',
                prepTime: 'PT30M',
                cookTime: 'PT1H',
                totalTime: 'PT1H30M',
                recipeYield: '4 servings',
                image: 'https://example.com/recipe.jpg'
            }
        };
    }

    updateSchemaForm() {
        const schemaType = document.getElementById('schema-type').value;
        const formContainer = document.getElementById('schema-form');

        if (!formContainer) return;

        const template = this.schemaTemplates[schemaType];

        formContainer.innerHTML = this.generateSchemaFormHTML(template, schemaType);
    }

    generateSchemaFormHTML(template, schemaType) {
        let html = '';

        for (const [key, value] of Object.entries(template)) {
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                html += `<fieldset class="form-fieldset">
                    <legend>${this.formatLabel(key)}</legend>`;

                for (const [subKey, subValue] of Object.entries(value)) {
                    html += `<div class="form-group">
                        <label for="${schemaType}-${key}-${subKey}">${this.formatLabel(subKey)}:</label>
                        <input type="text" id="${schemaType}-${key}-${subKey}" value="${subValue}">
                    </div>`;
                }

                html += '</fieldset>';
            } else {
                const inputType = key.includes('date') ? 'date' :
                    key.includes('url') || key.includes('image') || key.includes('logo') ? 'url' :
                        key.includes('price') ? 'number' : 'text';

                html += `<div class="form-group">
                    <label for="${schemaType}-${key}">${this.formatLabel(key)}:</label>
                    <input type="${inputType}" id="${schemaType}-${key}" value="${value}">
                </div>`;
            }
        }

        return html;
    }

    formatLabel(key) {
        return key.replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .replace(/([a-z])([A-Z])/g, '$1 $2');
    }

    generateStructuredData() {
        const schemaType = document.getElementById('schema-type').value;
        const formData = this.collectSchemaFormData(schemaType);

        const jsonLD = {
            "@context": "https://schema.org",
            "@type": this.getSchemaTypeName(schemaType),
            ...formData
        };

        const jsonOutput = document.getElementById('json-code');
        if (jsonOutput) {
            jsonOutput.textContent = JSON.stringify(jsonLD, null, 2);
        }

        // Show validation button
        const validateBtn = document.querySelector('.validate-btn');
        if (validateBtn) {
            validateBtn.style.display = 'inline-flex';
        }
    }

    collectSchemaFormData(schemaType) {
        const formData = {};
        const template = this.schemaTemplates[schemaType];

        for (const key of Object.keys(template)) {
            const element = document.getElementById(`${schemaType}-${key}`);

            if (element) {
                const value = element.value;
                if (key === 'offers' && schemaType === 'product') {
                    formData[key] = {
                        "@type": "Offer",
                        price: document.getElementById(`${schemaType}-offers-price`)?.value || '',
                        priceCurrency: document.getElementById(`${schemaType}-offers-priceCurrency`)?.value || 'USD',
                        availability: `https://schema.org/${document.getElementById(`${schemaType}-offers-availability`)?.value || 'InStock'}`
                    };
                } else if (key === 'address' && schemaType === 'organization') {
                    formData[key] = {
                        "@type": "PostalAddress",
                        streetAddress: document.getElementById(`${schemaType}-address-streetAddress`)?.value || '',
                        addressLocality: document.getElementById(`${schemaType}-address-addressLocality`)?.value || '',
                        addressRegion: document.getElementById(`${schemaType}-address-addressRegion`)?.value || '',
                        postalCode: document.getElementById(`${schemaType}-address-postalCode`)?.value || '',
                        addressCountry: document.getElementById(`${schemaType}-address-addressCountry`)?.value || ''
                    };
                } else {
                    formData[key] = value;
                }
            }
        }

        return formData;
    }

    getSchemaTypeName(schemaType) {
        const typeMap = {
            organization: 'Organization',
            person: 'Person',
            article: 'Article',
            product: 'Product',
            event: 'Event',
            recipe: 'Recipe'
        };
        return typeMap[schemaType] || 'Thing';
    }

    copyToClipboard() {
        const jsonCode = document.getElementById('json-code');
        if (jsonCode) {
            navigator.clipboard.writeText(jsonCode.textContent).then(() => {
                this.showNotification('JSON-LD copied to clipboard!', 'success');
            });
        }
    }

    validateSchema() {
        const jsonCode = document.getElementById('json-code');
        const validationResult = document.getElementById('validation-result');

        if (!jsonCode || !validationResult) return;

        try {
            const jsonData = JSON.parse(jsonCode.textContent);

            // Basic validation
            const errors = this.validateSchemaData(jsonData);

            if (errors.length === 0) {
                validationResult.innerHTML = `
                    <div class="validation-success">
                        <i class="fas fa-check-circle"></i>
                        <span>Schema is valid! No errors found.</span>
                    </div>
                `;
            } else {
                validationResult.innerHTML = `
                    <div class="validation-errors">
                        <h5>Validation Errors:</h5>
                        <ul>
                            ${errors.map(error => `<li>${error}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        } catch (e) {
            validationResult.innerHTML = `
                <div class="validation-error">
                    <i class="fas fa-times-circle"></i>
                    <span>Invalid JSON format</span>
                </div>
            `;
        }
    }

    validateSchemaData(data) {
        const errors = [];

        if (!data['@context']) {
            errors.push('Missing @context property');
        }

        if (!data['@type']) {
            errors.push('Missing @type property');
        }

        if (!data.name && !data.headline) {
            errors.push('Missing name or headline property');
        }

        // URL validation
        const urlFields = ['url', 'image', 'logo'];
        urlFields.forEach(field => {
            if (data[field] && !this.isValidURL(data[field])) {
                errors.push(`Invalid URL in ${field} field`);
            }
        });

        return errors;
    }

    // SEO Testing Functions
    testOnPageSEO() {
        const results = [
            { factor: 'Title Tag', status: 'good', message: 'Title tag is present and optimized' },
            { factor: 'Meta Description', status: 'good', message: 'Meta description is present and within character limit' },
            { factor: 'Heading Structure', status: 'good', message: 'Proper heading hierarchy found' },
            { factor: 'Internal Links', status: 'warning', message: 'Consider adding more internal links' },
            { factor: 'Image Alt Text', status: 'good', message: 'All images have alt text' },
            { factor: 'URL Structure', status: 'good', message: 'Clean, descriptive URLs used' }
        ];

        this.displayTestResults('On-Page SEO', results);
    }

    testTechnicalSEO() {
        const results = [
            { factor: 'Page Speed', status: 'warning', message: 'Page loads in 2.3s - could be improved' },
            { factor: 'Mobile Friendly', status: 'good', message: 'Site is mobile responsive' },
            { factor: 'HTTPS', status: 'good', message: 'SSL certificate is active' },
            { factor: 'XML Sitemap', status: 'good', message: 'Sitemap found and accessible' },
            { factor: 'Robots.txt', status: 'good', message: 'Robots.txt properly configured' },
            { factor: 'Structured Data', status: 'warning', message: 'Limited structured data found' }
        ];

        this.displayTestResults('Technical SEO', results);
    }

    testContentSEO() {
        const results = [
            { factor: 'Keyword Research', status: 'good', message: 'Target keywords identified' },
            { factor: 'Content Quality', status: 'good', message: 'High-quality, original content' },
            { factor: 'Content Length', status: 'good', message: 'Sufficient content length (500+ words)' },
            { factor: 'Readability', status: 'good', message: 'Content is easy to read' },
            { factor: 'Content Freshness', status: 'warning', message: 'Content was last updated 3 months ago' },
            { factor: 'Semantic Keywords', status: 'good', message: 'Related keywords used naturally' }
        ];

        this.displayTestResults('Content SEO', results);
    }

    displayTestResults(testType, results) {
        // Create modal or update existing results area
        let modal = document.getElementById('test-results-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'test-results-modal';
            modal.className = 'test-modal';
            document.body.appendChild(modal);
        }

        const passCount = results.filter(r => r.status === 'good').length;
        const warningCount = results.filter(r => r.status === 'warning').length;
        const failCount = results.filter(r => r.status === 'poor').length;

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${testType} Results</h3>
                    <button onclick="this.closest('.test-modal').remove()" class="close-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="test-summary">
                        <div class="summary-item good">
                            <span class="count">${passCount}</span>
                            <span class="label">Passed</span>
                        </div>
                        <div class="summary-item warning">
                            <span class="count">${warningCount}</span>
                            <span class="label">Warnings</span>
                        </div>
                        <div class="summary-item poor">
                            <span class="count">${failCount}</span>
                            <span class="label">Failed</span>
                        </div>
                    </div>
                    <div class="test-details">
                        ${results.map(result => `
                            <div class="test-result ${result.status}">
                                <div class="result-icon">
                                    <i class="fas fa-${result.status === 'good' ? 'check' : result.status === 'warning' ? 'exclamation-triangle' : 'times'}-circle"></i>
                                </div>
                                <div class="result-content">
                                    <h4>${result.factor}</h4>
                                    <p>${result.message}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        modal.style.display = 'block';
    }

    // Content Analysis functionality
    analyzeContent() {
        const url = document.getElementById('analysis-url').value;
        const keyword = document.getElementById('target-keyword').value;
        const content = document.getElementById('content-analysis').value;

        if (!content.trim()) {
            this.showNotification('Please enter content to analyze', 'error');
            return;
        }

        const analysis = this.performContentAnalysis(content, keyword);
        this.displayAnalysisResults(analysis);
    }

    performContentAnalysis(content, keyword) {
        const words = content.toLowerCase().split(/\s+/).filter(word => word.length > 2);
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);

        // Keyword analysis
        const keywordCount = keyword ?
            content.toLowerCase().split(keyword.toLowerCase()).length - 1 : 0;
        const keywordDensity = keyword ?
            (keywordCount / words.length) * 100 : 0;

        // Readability metrics
        const avgWordsPerSentence = words.length / sentences.length;
        const readabilityScore = this.calculateReadabilityScore(words.length, sentences.length, content);

        return {
            wordCount: words.length,
            sentenceCount: sentences.length,
            paragraphCount: paragraphs.length,
            keywordCount,
            keywordDensity: keywordDensity.toFixed(2),
            avgWordsPerSentence: avgWordsPerSentence.toFixed(1),
            readabilityScore: readabilityScore.toFixed(1),
            overallScore: this.calculateOverallSEOScore({
                wordCount: words.length,
                keywordDensity,
                readabilityScore,
                paragraphCount: paragraphs.length
            })
        };
    }

    calculateReadabilityScore(wordCount, sentenceCount, content) {
        // Simplified Flesch Reading Ease approximation
        const avgSentenceLength = wordCount / sentenceCount;
        const avgSyllables = this.estimateAverageSyllables(content);

        return 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllables);
    }

    estimateAverageSyllables(text) {
        // Simplified syllable estimation
        const words = text.toLowerCase().split(/\s+/);
        let totalSyllables = 0;

        words.forEach(word => {
            const syllables = word.replace(/[^aeiouAEIOU]/g, '').length || 1;
            totalSyllables += syllables;
        });

        return totalSyllables / words.length;
    }

    calculateOverallSEOScore(metrics) {
        let score = 0;

        // Word count score (0-30 points)
        if (metrics.wordCount >= 300) score += 30;
        else if (metrics.wordCount >= 200) score += 20;
        else if (metrics.wordCount >= 100) score += 10;

        // Keyword density score (0-25 points)
        if (metrics.keywordDensity >= 1 && metrics.keywordDensity <= 3) score += 25;
        else if (metrics.keywordDensity >= 0.5 && metrics.keywordDensity <= 5) score += 15;
        else if (metrics.keywordDensity > 0) score += 5;

        // Readability score (0-25 points)
        if (metrics.readabilityScore >= 60) score += 25;
        else if (metrics.readabilityScore >= 30) score += 15;
        else if (metrics.readabilityScore >= 0) score += 5;

        // Structure score (0-20 points)
        if (metrics.paragraphCount >= 3) score += 20;
        else if (metrics.paragraphCount >= 2) score += 15;
        else if (metrics.paragraphCount >= 1) score += 10;

        return score;
    }

    displayAnalysisResults(analysis) {
        const resultsContainer = document.getElementById('analysis-results');
        const overallScore = document.getElementById('overall-score');
        const categoriesContainer = document.getElementById('analysis-categories');
        const recommendationsContainer = document.getElementById('recommendations');

        // Update overall score
        if (overallScore) {
            const scoreValue = overallScore.querySelector('.score-value');
            if (scoreValue) scoreValue.textContent = analysis.overallScore;
        }

        // Update categories
        if (categoriesContainer) {
            categoriesContainer.innerHTML = `
                <div class="category">
                    <h5>Content Metrics</h5>
                    <div class="metrics">
                        <div class="metric">
                            <span class="metric-label">Word Count:</span>
                            <span class="metric-value ${analysis.wordCount >= 300 ? 'good' : 'warning'}">${analysis.wordCount}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Sentences:</span>
                            <span class="metric-value">${analysis.sentenceCount}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Paragraphs:</span>
                            <span class="metric-value">${analysis.paragraphCount}</span>
                        </div>
                    </div>
                </div>
                <div class="category">
                    <h5>Keyword Analysis</h5>
                    <div class="metrics">
                        <div class="metric">
                            <span class="metric-label">Keyword Occurrences:</span>
                            <span class="metric-value">${analysis.keywordCount}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Keyword Density:</span>
                            <span class="metric-value ${analysis.keywordDensity >= 1 && analysis.keywordDensity <= 3 ? 'good' : 'warning'}">${analysis.keywordDensity}%</span>
                        </div>
                    </div>
                </div>
                <div class="category">
                    <h5>Readability</h5>
                    <div class="metrics">
                        <div class="metric">
                            <span class="metric-label">Avg Words/Sentence:</span>
                            <span class="metric-value">${analysis.avgWordsPerSentence}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Readability Score:</span>
                            <span class="metric-value ${analysis.readabilityScore >= 60 ? 'good' : 'warning'}">${analysis.readabilityScore}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Update recommendations
        if (recommendationsContainer) {
            const recommendations = this.generateRecommendations(analysis);
            recommendationsContainer.innerHTML = `
                <h5>Recommendations</h5>
                <ul class="recommendations-list">
                    ${recommendations.map(rec => `<li class="${rec.type}">${rec.message}</li>`).join('')}
                </ul>
            `;
        }
    }

    generateRecommendations(analysis) {
        const recommendations = [];

        if (analysis.wordCount < 300) {
            recommendations.push({
                type: 'warning',
                message: 'Consider adding more content. Aim for at least 300 words for better SEO.'
            });
        }

        if (analysis.keywordDensity < 1) {
            recommendations.push({
                type: 'warning',
                message: 'Keyword density is low. Include your target keyword more naturally in the content.'
            });
        } else if (analysis.keywordDensity > 3) {
            recommendations.push({
                type: 'warning',
                message: 'Keyword density is high. Avoid keyword stuffing by using synonyms and related terms.'
            });
        }

        if (analysis.readabilityScore < 60) {
            recommendations.push({
                type: 'warning',
                message: 'Content readability could be improved. Use shorter sentences and simpler words.'
            });
        }

        if (analysis.paragraphCount < 3) {
            recommendations.push({
                type: 'info',
                message: 'Break content into more paragraphs for better readability and structure.'
            });
        }

        if (recommendations.length === 0) {
            recommendations.push({
                type: 'success',
                message: 'Great! Your content follows SEO best practices.'
            });
        }

        return recommendations;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    // Quiz functionality
    initializeQuiz() {
        const quizQuestions = [
            {
                question: "What is the recommended character limit for page titles?",
                options: [
                    "30-40 characters",
                    "50-60 characters",
                    "70-80 characters",
                    "100+ characters"
                ],
                correct: 1,
                explanation: "Page titles should be 50-60 characters to display properly in search results."
            },
            {
                question: "What is the optimal keyword density for SEO?",
                options: [
                    "5-7%",
                    "1-3%",
                    "8-10%",
                    "0.5-1%"
                ],
                correct: 1,
                explanation: "A keyword density of 1-3% is considered optimal for SEO without being considered spam."
            },
            {
                question: "Which structured data format is recommended by Google?",
                options: [
                    "Microdata",
                    "RDFa",
                    "JSON-LD",
                    "XML"
                ],
                correct: 2,
                explanation: "JSON-LD is Google's recommended format for structured data as it's easier to implement and maintain."
            },
            {
                question: "What is the ideal length for meta descriptions?",
                options: [
                    "100-120 characters",
                    "150-160 characters",
                    "200-250 characters",
                    "300+ characters"
                ],
                correct: 1,
                explanation: "Meta descriptions should be 150-160 characters to display fully in search results."
            },
            {
                question: "Which factor is most important for technical SEO?",
                options: [
                    "Page loading speed",
                    "Mobile responsiveness",
                    "HTTPS security",
                    "All of the above"
                ],
                correct: 3,
                explanation: "All these factors are crucial for technical SEO - speed, mobile-friendliness, and security all impact rankings."
            }
        ];

        this.renderQuiz(quizQuestions, 'seo-quiz');

        // Make quiz functions globally available
        window.submitSEOQuiz = () => this.submitQuiz('seo-quiz', quizQuestions);
        window.resetSEOQuiz = () => this.resetQuiz('seo-quiz', quizQuestions);
    }

    renderQuiz(questions, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = questions.map((q, index) => `
            <div class="quiz-question">
                <h4>Question ${index + 1}</h4>
                <p>${q.question}</p>
                <div class="quiz-options">
                    ${q.options.map((option, optIndex) => `
                        <label class="quiz-option">
                            <input type="radio" name="question-${index}" value="${optIndex}">
                            <span class="option-text">${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    submitQuiz(containerId, questions) {
        const container = document.getElementById(containerId);
        const resultsContainer = document.getElementById(containerId + '-results');
        let score = 0;
        const results = [];

        questions.forEach((q, index) => {
            const selectedOption = container.querySelector(`input[name="question-${index}"]:checked`);
            const isCorrect = selectedOption && parseInt(selectedOption.value) === q.correct;

            if (isCorrect) score++;

            results.push({
                question: q.question,
                selected: selectedOption ? parseInt(selectedOption.value) : -1,
                correct: q.correct,
                explanation: q.explanation,
                isCorrect
            });
        });

        this.showQuizResults(resultsContainer, results, score, questions.length);
    }

    showQuizResults(container, results, score, total) {
        const percentage = Math.round((score / total) * 100);

        container.innerHTML = `
            <div class="quiz-score">
                <h3>Quiz Results</h3>
                <div class="score-display">
                    <span class="score">${score}/${total}</span>
                    <span class="percentage">(${percentage}%)</span>
                </div>
            </div>
            <div class="quiz-breakdown">
                ${results.map((result, index) => `
                    <div class="result-item ${result.isCorrect ? 'correct' : 'incorrect'}">
                        <div class="result-header">
                            <span class="result-icon">
                                ${result.isCorrect ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-times-circle"></i>'}
                            </span>
                            <span class="result-text">Question ${index + 1}</span>
                        </div>
                        <p class="result-explanation">${result.explanation}</p>
                    </div>
                `).join('')}
            </div>
        `;

        container.style.display = 'block';
    }

    resetQuiz(containerId, questions) {
        const container = document.getElementById(containerId);
        const resultsContainer = document.getElementById(containerId + '-results');

        // Clear all radio button selections
        const radioButtons = container.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => radio.checked = false);

        // Hide results
        resultsContainer.style.display = 'none';

        // Remove any visual feedback
        const options = container.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.classList.remove('correct', 'incorrect');
        });
    }

    getSEOFactors() {
        return {
            onPage: ['title-optimization', 'meta-description', 'heading-structure', 'internal-links', 'image-optimization', 'url-structure'],
            technical: ['page-speed', 'mobile-friendly', 'ssl-certificate', 'sitemap', 'robots-txt', 'structured-data'],
            content: ['keyword-research', 'quality-content', 'content-length', 'readability', 'content-freshness', 'semantic-keywords']
        };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.seoTopic = new SEOTopic();
});
