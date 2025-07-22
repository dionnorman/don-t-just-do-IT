// Test script to simulate clicking and checking overlays
async function testAllOverlays() {
    const overlays = [
        'ai-evolution-details',
        'immersive-devices-details', 
        'creative-democratization-details',
        'physical-digital-details',
        'quantum-era-details',
        'digital-ownership-details',
        'societal-transformation-details',
        'skills-revolution-details'
    ];
    
    for (let overlayId of overlays) {
        console.log(`Testing overlay: ${overlayId}`);
        
        // Simulate clicking the button
        const button = document.querySelector(`[data-target="${overlayId}"]`);
        if (button) {
            button.click();
            
            // Wait a bit
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Check if overlay is visible and positioned correctly
            const overlay = document.getElementById(overlayId);
            if (overlay && overlay.classList.contains('active')) {
                const rect = overlay.getBoundingClientRect();
                const content = overlay.querySelector('.modal-content');
                const contentRect = content.getBoundingClientRect();
                
                console.log(`${overlayId}:`, {
                    visible: overlay.classList.contains('active'),
                    overlayPosition: {
                        top: rect.top,
                        left: rect.left,
                        width: rect.width,
                        height: rect.height
                    },
                    contentPosition: {
                        top: contentRect.top,
                        left: contentRect.left,
                        width: contentRect.width,
                        height: contentRect.height
                    },
                    withinViewport: {
                        top: contentRect.top >= 0,
                        bottom: contentRect.bottom <= window.innerHeight,
                        left: contentRect.left >= 0,
                        right: contentRect.right <= window.innerWidth
                    }
                });
                
                // Close the overlay
                const closeBtn = overlay.querySelector('.modal-close');
                if (closeBtn) {
                    closeBtn.click();
                    await new Promise(resolve => setTimeout(resolve, 300));
                }
            } else {
                console.log(`${overlayId}: NOT VISIBLE`);
            }
        } else {
            console.log(`${overlayId}: BUTTON NOT FOUND`);
        }
    }
}

// Run test automatically when script is loaded
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        setTimeout(testAllOverlays, 1000);
    });
}