/**
 * Enhanced Export System for ISTE Assessment Reports
 * Provides multiple export formats with stunning visuals and proper formatting
 */

class EnhancedExportManager {
    constructor() {
        this.isExporting = false;
        this.supportedFormats = ['pdf', 'docx', 'pptx', 'html', 'json'];
        this.initializeEventListeners();
    }

    /**
     * Initialize event listeners for export buttons
     */
    initializeEventListeners() {
        // Enhanced PDF export with loading states
        document.addEventListener('click', (e) => {
            if (e.target.matches('#export-pdf, .export-pdf-btn')) {
                e.preventDefault();
                this.handlePDFExport(e.target);
            }
            
            if (e.target.matches('#export-doc, .export-doc-btn')) {
                e.preventDefault();
                this.handleDocExport(e.target);
            }
            
            if (e.target.matches('#export-ppt, .export-ppt-btn')) {
                e.preventDefault();
                this.handlePPTExport(e.target);
            }
            
            if (e.target.matches('.export-html-btn')) {
                e.preventDefault();
                this.handleHTMLExport(e.target);
            }
            
            if (e.target.matches('.export-json-btn')) {
                e.preventDefault();
                this.handleJSONExport(e.target);
            }
        });
    }

    /**
     * Enhanced PDF export with professional formatting
     */
    async handlePDFExport(button) {
        if (this.isExporting) return;
        
        this.setLoadingState(button, true);
        
        try {
            const reportContent = this.getReportContent();
            if (!reportContent) {
                throw new Error('No report content found');
            }

            // Enhanced PDF options for professional output
            const pdfOptions = {
                margin: [0.75, 0.75, 0.75, 0.75],
                filename: this.generateFilename('ISTE-Assessment-Report', 'pdf'),
                image: { 
                    type: 'jpeg', 
                    quality: 0.98,
                    crossOrigin: 'anonymous'
                },
                html2canvas: { 
                    scale: 2.5,
                    useCORS: true,
                    logging: false,
                    allowTaint: true,
                    scrollX: 0,
                    scrollY: 0,
                    windowWidth: 1600,
                    windowHeight: 1200,
                    letterRendering: true,
                    onclone: (clonedDoc) => {
                        // Apply professional PDF styling
                        this.applyPDFStyling(clonedDoc);
                    }
                },
                jsPDF: { 
                    unit: 'in', 
                    format: 'a4', 
                    orientation: 'portrait',
                    compress: true,
                    precision: 16
                },
                pagebreak: { 
                    mode: ['avoid-all', 'css', 'legacy'],
                    before: '.page-break-before, .section-break',
                    after: '.page-break-after',
                    avoid: '.keep-together, .no-break'
                }
            };

            await window.exportElementToPDF(reportContent, pdfOptions.filename, pdfOptions);
            this.showSuccessMessage('PDF exported successfully!');
            
        } catch (error) {
            console.error('PDF export error:', error);
            this.showErrorMessage('Failed to export PDF. Please try again.');
        } finally {
            this.setLoadingState(button, false);
        }
    }

    /**
     * Enhanced Google Docs export
     */
    async handleDocExport(button) {
        if (this.isExporting) return;
        
        this.setLoadingState(button, true);
        
        try {
            const reportContent = this.getReportContent();
            if (!reportContent) {
                throw new Error('No report content found');
            }

            await window.exportToGoogleDoc(reportContent, this.generateFilename('ISTE-Assessment-Report', 'doc'));
            this.showSuccessMessage('Opening Google Docs for import...');
            
        } catch (error) {
            console.error('Google Docs export error:', error);
            this.showErrorMessage('Failed to export to Google Docs. Please try again.');
        } finally {
            this.setLoadingState(button, false);
        }
    }

    /**
     * PowerPoint export functionality
     */
    async handlePPTExport(button) {
        if (this.isExporting) return;
        
        this.setLoadingState(button, true);
        
        try {
            const reportContent = this.getReportContent();
            if (!reportContent) {
                throw new Error('No report content found');
            }

            // Create PowerPoint-formatted content
            const pptContent = this.convertToPowerPointFormat(reportContent);
            this.downloadPPTFile(pptContent);
            this.showSuccessMessage('PowerPoint file prepared for download!');
            
        } catch (error) {
            console.error('PowerPoint export error:', error);
            this.showErrorMessage('Failed to export PowerPoint. Please try again.');
        } finally {
            this.setLoadingState(button, false);
        }
    }

    /**
     * HTML export with embedded styles
     */
    async handleHTMLExport(button) {
        if (this.isExporting) return;
        
        this.setLoadingState(button, true);
        
        try {
            const reportContent = this.getReportContent();
            if (!reportContent) {
                throw new Error('No report content found');
            }

            const htmlContent = this.createStandaloneHTML(reportContent);
            this.downloadHTMLFile(htmlContent);
            this.showSuccessMessage('HTML file downloaded successfully!');
            
        } catch (error) {
            console.error('HTML export error:', error);
            this.showErrorMessage('Failed to export HTML. Please try again.');
        } finally {
            this.setLoadingState(button, false);
        }
    }

    /**
     * JSON export for data analysis
     */
    async handleJSONExport(button) {
        if (this.isExporting) return;
        
        this.setLoadingState(button, true);
        
        try {
            const reportData = this.extractReportData();
            if (!reportData) {
                throw new Error('No report data found');
            }

            this.downloadJSONFile(reportData);
            this.showSuccessMessage('JSON data downloaded successfully!');
            
        } catch (error) {
            console.error('JSON export error:', error);
            this.showErrorMessage('Failed to export JSON. Please try again.');
        } finally {
            this.setLoadingState(button, false);
        }
    }

    /**
     * Apply professional PDF styling to cloned document
     */
    applyPDFStyling(clonedDoc) {
        const style = clonedDoc.createElement('style');
        style.textContent = `
            /* PDF-specific styling for professional output */
            body {
                font-family: 'Georgia', 'Times New Roman', serif !important;
                line-height: 1.6 !important;
                color: #2c3e50 !important;
                background: white !important;
                margin: 0 !important;
                padding: 2rem !important;
            }
            
            .pdf-export-content {
                width: 100% !important;
                max-width: none !important;
                overflow: visible !important;
                page-break-inside: avoid !important;
            }
            
            h1, h2, h3, h4, h5, h6 {
                color: #2e5eaa !important;
                font-weight: 600 !important;
                page-break-after: avoid !important;
                margin-top: 2rem !important;
                margin-bottom: 1rem !important;
            }
            
            h1 {
                font-size: 2rem !important;
                border-bottom: 3px solid #2e5eaa !important;
                padding-bottom: 0.5rem !important;
            }
            
            h2 {
                font-size: 1.5rem !important;
                border-bottom: 1px solid #e0e0e0 !important;
                padding-bottom: 0.3rem !important;
            }
            
            p {
                margin: 1rem 0 !important;
                text-align: justify !important;
                orphans: 3 !important;
                widows: 3 !important;
            }
            
            ul, ol {
                margin: 1rem 0 !important;
                padding-left: 2rem !important;
                page-break-inside: avoid !important;
            }
            
            li {
                margin: 0.5rem 0 !important;
                line-height: 1.5 !important;
            }
            
            table {
                width: 100% !important;
                border-collapse: collapse !important;
                margin: 1rem 0 !important;
                page-break-inside: avoid !important;
            }
            
            th, td {
                border: 1px solid #dee2e6 !important;
                padding: 0.75rem !important;
                text-align: left !important;
            }
            
            th {
                background-color: #f8f9fa !important;
                font-weight: 600 !important;
                color: #2e5eaa !important;
            }
            
            .no-print, .export-options, .export-buttons, button {
                display: none !important;
            }
            
            .section-break {
                page-break-before: always !important;
                margin-top: 0 !important;
            }
            
            .keep-together {
                page-break-inside: avoid !important;
            }
        `;
        clonedDoc.head.appendChild(style);
    }

    /**
     * Get the current report content
     */
    getReportContent() {
        // Try different selectors for report content
        const selectors = [
            '#iste-result .result-content',
            '#cbam-result .result-content',
            '#enhanced-samr-results .result-content',
            '.result-content',
            '.assessment-results'
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element && element.textContent.trim()) {
                return element;
            }
        }
        
        return null;
    }

    /**
     * Generate filename with timestamp
     */
    generateFilename(base, extension) {
        const timestamp = new Date().toISOString().split('T')[0];
        return `${base}-${timestamp}.${extension}`;
    }

    /**
     * Set loading state for export buttons
     */
    setLoadingState(button, isLoading) {
        this.isExporting = isLoading;
        
        if (isLoading) {
            button.disabled = true;
            button.classList.add('loading');
            const originalText = button.textContent || button.innerHTML;
            button.dataset.originalText = originalText;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
        } else {
            button.disabled = false;
            button.classList.remove('loading');
            if (button.dataset.originalText) {
                button.innerHTML = button.dataset.originalText;
                delete button.dataset.originalText;
            }
        }
    }

    /**
     * Convert content to PowerPoint-friendly format
     */
    convertToPowerPointFormat(element) {
        const title = document.querySelector('h1')?.textContent || 'ISTE Assessment Report';
        const sections = element.querySelectorAll('h2, h3, .section');
        
        let pptContent = `# ${title}\n\n`;
        pptContent += `Generated on ${new Date().toLocaleDateString()}\n\n`;
        
        sections.forEach((section, index) => {
            const heading = section.textContent.trim();
            const content = this.getContentAfterHeading(section);
            
            pptContent += `---\n\n## Slide ${index + 2}: ${heading}\n\n`;
            pptContent += content.substring(0, 500) + '...\n\n';
        });
        
        return pptContent;
    }

    /**
     * Create standalone HTML with embedded styles
     */
    createStandaloneHTML(element) {
        const clone = element.cloneNode(true);
        
        // Remove export buttons and other UI elements
        const unwantedElements = clone.querySelectorAll('.export-options, .export-buttons, button, .no-print');
        unwantedElements.forEach(el => el.remove());
        
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ISTE Assessment Report</title>
    <style>
        body {
            font-family: 'Georgia', 'Times New Roman', serif;
            line-height: 1.6;
            color: #2c3e50;
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
            background: white;
        }
        h1, h2, h3, h4, h5, h6 {
            color: #2e5eaa;
            font-weight: 600;
        }
        h1 {
            border-bottom: 3px solid #2e5eaa;
            padding-bottom: 0.5rem;
        }
        h2 {
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 0.3rem;
        }
        p {
            margin: 1rem 0;
            text-align: justify;
        }
        ul, ol {
            margin: 1rem 0;
            padding-left: 2rem;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }
        th, td {
            border: 1px solid #dee2e6;
            padding: 0.75rem;
            text-align: left;
        }
        th {
            background-color: #f8f9fa;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <header>
        <h1>ISTE Assessment Report</h1>
        <p><em>Generated on ${new Date().toLocaleDateString()}</em></p>
    </header>
    <main>
        ${clone.innerHTML}
    </main>
    <footer>
        <p><small>Generated by Don't Just Do IT! Assessment Tool</small></p>
    </footer>
</body>
</html>`;
    }

    /**
     * Extract structured data for JSON export
     */
    extractReportData() {
        const data = {
            title: 'ISTE Assessment Report',
            generatedAt: new Date().toISOString(),
            sections: []
        };

        const reportContent = this.getReportContent();
        if (!reportContent) return null;

        const headings = reportContent.querySelectorAll('h1, h2, h3, h4');
        headings.forEach(heading => {
            const section = {
                level: parseInt(heading.tagName.charAt(1)),
                title: heading.textContent.trim(),
                content: this.getContentAfterHeading(heading)
            };
            data.sections.push(section);
        });

        return data;
    }

    /**
     * Get content that follows a heading
     */
    getContentAfterHeading(heading) {
        let content = '';
        let nextElement = heading.nextElementSibling;
        
        while (nextElement && !nextElement.matches('h1, h2, h3, h4, h5, h6')) {
            content += nextElement.textContent + '\n';
            nextElement = nextElement.nextElementSibling;
        }
        
        return content.trim();
    }

    /**
     * Download PowerPoint file
     */
    downloadPPTFile(content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.generateFilename('ISTE-Assessment-Report-Slides', 'txt');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Download HTML file
     */
    downloadHTMLFile(content) {
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.generateFilename('ISTE-Assessment-Report', 'html');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Download JSON file
     */
    downloadJSONFile(data) {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.generateFilename('ISTE-Assessment-Data', 'json');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Show success message
     */
    showSuccessMessage(message) {
        if (window.showNotification) {
            window.showNotification(message, 'success');
        } else {
            console.log('✅ ' + message);
        }
    }

    /**
     * Show error message
     */
    showErrorMessage(message) {
        if (window.showNotification) {
            window.showNotification(message, 'error');
        } else {
            console.error('❌ ' + message);
        }
    }
}

// Initialize the enhanced export manager
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedExportManager = new EnhancedExportManager();
});

// Export for use in other modules
window.EnhancedExportManager = EnhancedExportManager;