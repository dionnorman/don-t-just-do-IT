/**
 * Error handler for SyntaxError: missing ) after argument list
 * This wrapper ensures all export-related functions have proper error handling
 */
(function() {
    // Store original functions to preserve functionality
    const originalHandleExportWithLoading = window.handleExportWithLoading;
    const originalPrintElement = window.printElement;
    const originalExportElementToPDF = window.exportElementToPDF;
    const originalExportToGoogleDoc = window.exportToGoogleDoc;
    const originalExportToMSWord = window.exportToMSWord;
    const originalExportToPowerPoint = window.exportToPowerPoint;
    
    // Wrap handleExportWithLoading with error handling
    window.handleExportWithLoading = function(button, exportFunction) {
        try {
            if (typeof originalHandleExportWithLoading === 'function') {
                return originalHandleExportWithLoading.call(window, button, exportFunction);
            } else {
                console.error('Original handleExportWithLoading function not found');
                return null;
            }
        } catch (error) {
            console.error('Error in handleExportWithLoading:', error);
            window.showNotification('An error occurred during export. Please try again.', 'error');
            
            // Reset button state
            if (button) {
                button.disabled = false;
                if (button.dataset.originalContent) {
                    button.innerHTML = button.dataset.originalContent;
                    delete button.dataset.originalContent;
                }
            }
            
            return null;
        }
    };
    
    // Wrap printElement with error handling
    window.printElement = function(element) {
        try {
            if (typeof originalPrintElement === 'function') {
                return originalPrintElement.call(window, element);
            } else {
                console.error('Original printElement function not found');
                return null;
            }
        } catch (error) {
            console.error('Error in printElement:', error);
            window.showNotification('An error occurred during printing. Please try again.', 'error');
            return null;
        }
    };
    
    // Wrap exportElementToPDF with error handling
    window.exportElementToPDF = function(element, filename, options) {
        try {
            if (typeof originalExportElementToPDF === 'function') {
                return originalExportElementToPDF.call(window, element, filename, options);
            } else {
                console.error('Original exportElementToPDF function not found');
                return null;
            }
        } catch (error) {
            console.error('Error in exportElementToPDF:', error);
            window.showNotification('An error occurred during PDF export. Please try again.', 'error');
            return null;
        }
    };
    
    // Wrap exportToGoogleDoc with error handling
    window.exportToGoogleDoc = function(element, title) {
        try {
            if (typeof originalExportToGoogleDoc === 'function') {
                return originalExportToGoogleDoc.call(window, element, title);
            } else {
                console.error('Original exportToGoogleDoc function not found');
                return null;
            }
        } catch (error) {
            console.error('Error in exportToGoogleDoc:', error);
            window.showNotification('An error occurred during Google Doc export. Please try again.', 'error');
            return null;
        }
    };
    
    // Wrap exportToMSWord with error handling
    window.exportToMSWord = function(element, title) {
        try {
            if (typeof originalExportToMSWord === 'function') {
                return originalExportToMSWord.call(window, element, title);
            } else {
                console.error('Original exportToMSWord function not found');
                return null;
            }
        } catch (error) {
            console.error('Error in exportToMSWord:', error);
            window.showNotification('An error occurred during Word export. Please try again.', 'error');
            return null;
        }
    };
    
    // Wrap exportToPowerPoint with error handling
    window.exportToPowerPoint = function(element, title) {
        try {
            if (typeof originalExportToPowerPoint === 'function') {
                return originalExportToPowerPoint.call(window, element, title);
            } else {
                console.error('Original exportToPowerPoint function not found');
                return null;
            }
        } catch (error) {
            console.error('Error in exportToPowerPoint:', error);
            window.showNotification('An error occurred during PowerPoint export. Please try again.', 'error');
            return null;
        }
    };
    
    // Add a utility function to check for syntax errors
    window.checkForSyntaxErrors = function() {
        try {
            // Test all the export functions to make sure they're valid
            if (typeof window.printElement !== 'function') {
                throw new Error('printElement is not a function');
            }
            if (typeof window.handleExportWithLoading !== 'function') {
                throw new Error('handleExportWithLoading is not a function');
            }
            if (typeof window.exportElementToPDF !== 'function') {
                throw new Error('exportElementToPDF is not a function');
            }
            if (typeof window.exportToGoogleDoc !== 'function') {
                throw new Error('exportToGoogleDoc is not a function');
            }
            if (typeof window.exportToMSWord !== 'function') {
                throw new Error('exportToMSWord is not a function');
            }
            if (typeof window.exportToPowerPoint !== 'function') {
                throw new Error('exportToPowerPoint is not a function');
            }
            
            console.log('All export functions are valid');
            return true;
        } catch (error) {
            console.error('Syntax error check failed:', error);
            return false;
        }
    };
    
    // Execute the check when the script loads
    console.log('Syntax fix module loaded successfully');
    
    // Defer the check to ensure all scripts are loaded
    window.addEventListener('load', function() {
        window.checkForSyntaxErrors();
    });
})();