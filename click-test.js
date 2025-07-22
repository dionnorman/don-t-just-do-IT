// This script will be injected to test clicking overlays and capture results
(function() {
    console.log('Starting overlay test...');
    
    // Test function that simulates clicking a button and checking results
    function testClickOverlay(buttonSelector, overlayId) {
        return new Promise((resolve) => {
            console.log(`Testing button: ${buttonSelector} -> overlay: ${overlayId}`);
            
            const button = document.querySelector(buttonSelector);
            if (!button) {
                resolve({ success: false, error: 'Button not found', buttonSelector, overlayId });
                return;
            }
            
            // Click the button
            button.click();
            
            // Wait for overlay to appear
            setTimeout(() => {
                const overlay = document.getElementById(overlayId);
                if (!overlay) {
                    resolve({ success: false, error: 'Overlay not found', buttonSelector, overlayId });
                    return;
                }
                
                const isActive = overlay.classList.contains('active');
                if (!isActive) {
                    resolve({ success: false, error: 'Overlay not active', buttonSelector, overlayId });
                    return;
                }
                
                // Check positioning
                const overlayRect = overlay.getBoundingClientRect();
                const content = overlay.querySelector('.modal-content');
                const contentRect = content ? content.getBoundingClientRect() : null;
                
                const result = {
                    success: true,
                    buttonSelector,
                    overlayId,
                    overlayRect: {
                        width: overlayRect.width,
                        height: overlayRect.height,
                        top: overlayRect.top,
                        left: overlayRect.left
                    },
                    contentRect: contentRect ? {
                        width: contentRect.width,
                        height: contentRect.height,
                        top: contentRect.top,
                        left: contentRect.left,
                        right: contentRect.right,
                        bottom: contentRect.bottom
                    } : null,
                    withinViewport: contentRect ? {
                        top: contentRect.top >= 0,
                        bottom: contentRect.bottom <= window.innerHeight,
                        left: contentRect.left >= 0,
                        right: contentRect.right <= window.innerWidth,
                        fullyCovered: contentRect.top >= 0 && contentRect.bottom <= window.innerHeight && 
                                     contentRect.left >= 0 && contentRect.right <= window.innerWidth
                    } : null,
                    viewport: {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }
                };
                
                // Close the overlay before resolving
                const closeBtn = overlay.querySelector('.modal-close');
                if (closeBtn) {
                    closeBtn.click();
                }
                
                setTimeout(() => resolve(result), 200);
            }, 300);
        });
    }
    
    // Test all overlays
    async function runAllTests() {
        const tests = [
            { button: '[data-target="ai-evolution-details"]', overlay: 'ai-evolution-details' },
            { button: '[data-target="immersive-devices-details"]', overlay: 'immersive-devices-details' },
            { button: '[data-target="creative-democratization-details"]', overlay: 'creative-democratization-details' },
            { button: '[data-target="physical-digital-details"]', overlay: 'physical-digital-details' },
            { button: '[data-target="quantum-era-details"]', overlay: 'quantum-era-details' },
            { button: '[data-target="digital-ownership-details"]', overlay: 'digital-ownership-details' },
            { button: '[data-target="societal-transformation-details"]', overlay: 'societal-transformation-details' },
            { button: '[data-target="skills-revolution-details"]', overlay: 'skills-revolution-details' }
        ];
        
        const results = [];
        
        for (const test of tests) {
            const result = await testClickOverlay(test.button, test.overlay);
            results.push(result);
            console.log('Test result:', result);
            
            // Wait between tests
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Summary
        console.log('\n=== TEST SUMMARY ===');
        results.forEach(result => {
            if (result.success) {
                const issues = [];
                if (result.withinViewport) {
                    if (!result.withinViewport.top) issues.push('top cut off');
                    if (!result.withinViewport.bottom) issues.push('bottom cut off');
                    if (!result.withinViewport.left) issues.push('left cut off');
                    if (!result.withinViewport.right) issues.push('right cut off');
                }
                
                console.log(`${result.overlayId}: ${result.withinViewport?.fullyCovered ? '✅ OK' : '❌ ISSUES'} ${issues.join(', ')}`);
                if (result.contentRect) {
                    console.log(`  Content: ${Math.round(result.contentRect.width)}x${Math.round(result.contentRect.height)} at (${Math.round(result.contentRect.left)}, ${Math.round(result.contentRect.top)})`);
                }
            } else {
                console.log(`${result.overlayId}: ❌ FAILED - ${result.error}`);
            }
        });
        
        return results;
    }
    
    // Auto-run when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(runAllTests, 1000);
        });
    } else {
        setTimeout(runAllTests, 1000);
    }
    
    // Expose globally for manual testing
    window.testOverlays = runAllTests;
    window.testSingleOverlay = testClickOverlay;
})();