// Test script to verify Strategic Imperatives overlays work correctly
document.addEventListener('DOMContentLoaded', function() {
  console.log('Strategic Imperatives test script loaded');
  
  // Test function for a single overlay
  function testOverlay(overlayId, buttonSelector) {
    return new Promise((resolve) => {
      console.log(`Testing overlay: ${overlayId}`);
      
      // Find the button
      const button = document.querySelector(buttonSelector);
      if (!button) {
        console.error(`Button not found: ${buttonSelector}`);
        resolve({success: false, error: 'Button not found'});
        return;
      }
      
      // Click the button
      button.click();
      
      // Wait a bit for the modal to appear
      setTimeout(() => {
        // Check if the modal is visible
        const modal = document.getElementById(overlayId);
        if (!modal) {
          console.error(`Modal not found: ${overlayId}`);
          resolve({success: false, error: 'Modal not found'});
          return;
        }
        
        const isActive = modal.classList.contains('active');
        console.log(`Modal ${overlayId} active: ${isActive}`);
        
        if (!isActive) {
          resolve({success: false, error: 'Modal not active'});
          return;
        }
        
        // Check the content positioning
        const content = modal.querySelector('.modal-content');
        const contentRect = content.getBoundingClientRect();
        const viewport = {
          width: window.innerWidth,
          height: window.innerHeight
        };
        
        console.log(`Content position: (${contentRect.left}, ${contentRect.top}) ${contentRect.width}x${contentRect.height}`);
        console.log(`Viewport: ${viewport.width}x${viewport.height}`);
        
        // Check if content is within viewport
        const withinViewport = 
          contentRect.top >= 0 && 
          contentRect.bottom <= viewport.height &&
          contentRect.left >= 0 && 
          contentRect.right <= viewport.width;
        
        console.log(`Content within viewport: ${withinViewport}`);
        
        if (!withinViewport) {
          let issues = [];
          if (contentRect.top < 0) issues.push(`Top cut off by ${Math.abs(Math.round(contentRect.top))}px`);
          if (contentRect.bottom > viewport.height) issues.push(`Bottom cut off by ${Math.round(contentRect.bottom - viewport.height)}px`);
          if (contentRect.left < 0) issues.push(`Left cut off by ${Math.abs(Math.round(contentRect.left))}px`);
          if (contentRect.right > viewport.width) issues.push(`Right cut off by ${Math.round(contentRect.right - viewport.width)}px`);
          
          console.error(`Positioning issues: ${issues.join(', ')}`);
        }
        
        // Test closing the modal via close button
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
          console.log('Testing close button...');
          closeButton.click();
          
          // Check if modal was closed
          setTimeout(() => {
            const stillActive = modal.classList.contains('active');
            console.log(`Modal still active after close button: ${stillActive}`);
            
            if (stillActive) {
              console.error('Close button did not work');
              modal.classList.remove('active'); // Force close
              document.body.style.overflow = ''; // Reset overflow
            }
            
            resolve({
              success: withinViewport && !stillActive,
              withinViewport,
              closeWorks: !stillActive,
              contentRect: {
                top: contentRect.top,
                left: contentRect.left,
                right: contentRect.right,
                bottom: contentRect.bottom,
                width: contentRect.width,
                height: contentRect.height
              },
              viewport
            });
          }, 500);
        } else {
          console.error('Close button not found');
          modal.classList.remove('active'); // Force close
          document.body.style.overflow = ''; // Reset overflow
          
          resolve({
            success: withinViewport,
            withinViewport,
            closeWorks: false,
            contentRect: {
              top: contentRect.top,
              left: contentRect.left,
              right: contentRect.right,
              bottom: contentRect.bottom,
              width: contentRect.width,
              height: contentRect.height
            },
            viewport
          });
        }
      }, 500);
    });
  }
  
  // Test all overlays
  async function testAllOverlays() {
    console.log('Testing all Strategic Imperatives overlays');
    
    const overlays = [
      {id: 'ai-evolution-details', selector: '[data-target="ai-evolution-details"]'},
      {id: 'immersive-devices-details', selector: '[data-target="immersive-devices-details"]'},
      {id: 'creative-democratization-details', selector: '[data-target="creative-democratization-details"]'},
      {id: 'physical-digital-details', selector: '[data-target="physical-digital-details"]'},
      {id: 'quantum-era-details', selector: '[data-target="quantum-era-details"]'},
      {id: 'digital-ownership-details', selector: '[data-target="digital-ownership-details"]'},
      {id: 'societal-transformation-details', selector: '[data-target="societal-transformation-details"]'},
      {id: 'skills-revolution-details', selector: '[data-target="skills-revolution-details"]'}
    ];
    
    let results = [];
    
    for (const overlay of overlays) {
      const result = await testOverlay(overlay.id, overlay.selector);
      results.push({...result, id: overlay.id});
      
      // Wait a bit between tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Log summary
    console.log('=== TEST SUMMARY ===');
    let passCount = 0;
    
    results.forEach(result => {
      if (result.success) {
        console.log(`✅ ${result.id}: Passed`);
        passCount++;
      } else {
        console.log(`❌ ${result.id}: Failed`);
        if (!result.withinViewport) console.log(`  - Not fully within viewport`);
        if (!result.closeWorks) console.log(`  - Close button did not work`);
      }
    });
    
    console.log(`${passCount}/${results.length} overlays passed`);
    
    return results;
  }
  
  // Add a button to run tests
  const testButton = document.createElement('button');
  testButton.textContent = 'Test Strategic Imperatives';
  testButton.style.position = 'fixed';
  testButton.style.bottom = '20px';
  testButton.style.right = '20px';
  testButton.style.zIndex = '9999';
  testButton.style.padding = '10px';
  testButton.style.background = '#2563eb';
  testButton.style.color = 'white';
  testButton.style.border = 'none';
  testButton.style.borderRadius = '5px';
  testButton.style.cursor = 'pointer';
  
  testButton.addEventListener('click', testAllOverlays);
  
  document.body.appendChild(testButton);
  
  // Run tests automatically after 3 seconds
  setTimeout(testAllOverlays, 3000);
});