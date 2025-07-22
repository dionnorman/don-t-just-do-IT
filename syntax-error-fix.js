/**
 * Syntax Error Fix - Resolves "missing ) after argument list" error
 * This script fixes the specific syntax error in onclick handlers
 */

(function() {
    'use strict';
    
    console.log('Syntax Error Fix: Starting...');
    
    // Wait for DOM to be ready
    function initFix() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', applySyntaxFix);
        } else {
            applySyntaxFix();
        }
    }
    
    // Apply the syntax fix
    function applySyntaxFix() {
        console.log('Syntax Error Fix: Applying fixes...');
        
        // Fix onclick handlers with missing closing parenthesis
        const detailCloseButtons = document.querySelectorAll('.detail-close');
        
        detailCloseButtons.forEach((button, index) => {
            // Remove any existing onclick handler that might have syntax issues
            button.removeAttribute('onclick');
            
            // Add proper event listener
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const foundationBlock = this.closest('.foundation-block');
                if (foundationBlock) {
                    // Call the hideBlockDetail function if it exists
                    if (typeof window.hideBlockDetail === 'function') {
                        window.hideBlockDetail(foundationBlock);
                    } else {
                        // Fallback: remove active class
                        foundationBlock.classList.remove('active');
                    }
                }
            });
            
            console.log(`Syntax Error Fix: Fixed close button ${index + 1}`);
        });
        
        // Fix any other problematic inline handlers
        const elementsWithOnclick = document.querySelectorAll('[onclick]');
        
        elementsWithOnclick.forEach((element) => {
            const onclickValue = element.getAttribute('onclick');
            
            // Skip test buttons with their own onclick handlers
            if (onclickValue && (onclickValue.includes('runTests') || onclickValue.includes('clearLog'))) {
                return;
            }
            
            // Check for common syntax issues
            if (onclickValue && onclickValue.includes('.closest(') && !onclickValue.includes('));')) {
                console.log('Syntax Error Fix: Found problematic onclick handler:', onclickValue);
                
                // Remove the problematic onclick
                element.removeAttribute('onclick');
                
                // Add a proper event listener based on the element type
                if (element.classList.contains('detail-close')) {
                    element.addEventListener('click', function(e) {
                        e.stopPropagation();
                        const foundationBlock = this.closest('.foundation-block');
                        if (foundationBlock && typeof window.hideBlockDetail === 'function') {
                            window.hideBlockDetail(foundationBlock);
                        }
                    });
                } else if (element.classList.contains('foundation-block')) {
                    element.addEventListener('click', function(e) {
                        if (typeof window.toggleBlockDetail === 'function') {
                            window.toggleBlockDetail(this);
                        }
                    });
                }
            }
        });
        
        console.log('Syntax Error Fix: All fixes applied successfully');
    }
    
    // Initialize the fix
    initFix();
    
})();