/**
 * Implementation Bridge Interactive Features
 */

document.addEventListener('DOMContentLoaded', function() {
  // Set up legend item interactions
  const legendItems = document.querySelectorAll('.legend-item');
  const bridgeSvg = document.querySelector('.bridge-svg');
  
  legendItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const target = item.getAttribute('data-target');
      if (target) {
        // Add highlight class to the bridge SVG container
        bridgeSvg.classList.add(`${target}-highlight`);
        
        // Add highlighting to specific elements
        highlightBridgeElements(target);
      }
    });
    
    item.addEventListener('mouseleave', () => {
      const target = item.getAttribute('data-target');
      if (target) {
        bridgeSvg.classList.remove(`${target}-highlight`);
        
        // Remove highlighting from specific elements
        removeBridgeHighlights(target);
      }
    });
  });
  
  // Set up bridge element interactions
  const bridgeElements = document.querySelectorAll('.bridge-element');
  
  bridgeElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      // Add active class to the element point
      const point = element.querySelector('.element-point');
      point.classList.add('active');
      
      // Get data-info attribute and display it
      const info = element.getAttribute('data-info');
      if (info) {
        showInfoTooltip(element, info);
      }
    });
    
    element.addEventListener('mouseleave', () => {
      // Remove active class from the element point
      const point = element.querySelector('.element-point');
      point.classList.remove('active');
      
      // Hide the tooltip
      hideInfoTooltip();
    });
    
    element.addEventListener('click', () => {
      // Highlight the related section on the page when clicked
      const type = element.classList[1];
      highlightRelatedSection(type);
    });
  });
  
  // Enhanced SVG Pillar interactions for hover effects
  const isteConditionsPillar = document.querySelector('.iste-conditions-pillar');
  const cbamPillar = document.querySelector('.cbam-pillar');
  const sharedVisionPillar = document.querySelector('.shared-vision-pillar');
  const samrPillar = document.querySelector('.samr-pillar');
  
  // Add pulse animation to pillars on hover
  if (isteConditionsPillar) {
    isteConditionsPillar.addEventListener('mouseenter', () => {
      const rect = isteConditionsPillar.querySelector('rect:first-of-type');
      rect.setAttribute('filter', 'url(#glow)');
    });
    
    isteConditionsPillar.addEventListener('mouseleave', () => {
      const rect = isteConditionsPillar.querySelector('rect:first-of-type');
      rect.setAttribute('filter', 'url(#pillarGlow)');
    });
  }
  
  if (cbamPillar) {
    cbamPillar.addEventListener('mouseenter', () => {
      const rect = cbamPillar.querySelector('rect:first-of-type');
      rect.setAttribute('filter', 'url(#glow)');
    });
    
    cbamPillar.addEventListener('mouseleave', () => {
      const rect = cbamPillar.querySelector('rect:first-of-type');
      rect.setAttribute('filter', 'url(#pillarGlow)');
    });
  }
  
  if (sharedVisionPillar) {
    sharedVisionPillar.addEventListener('mouseenter', () => {
      const rect = sharedVisionPillar.querySelector('rect:first-of-type');
      rect.setAttribute('filter', 'url(#glow)');
    });
    
    sharedVisionPillar.addEventListener('mouseleave', () => {
      const rect = sharedVisionPillar.querySelector('rect:first-of-type');
      rect.setAttribute('filter', 'url(#pillarGlow)');
    });
  }
  
  if (samrPillar) {
    samrPillar.addEventListener('mouseenter', () => {
      const rect = samrPillar.querySelector('rect:first-of-type');
      rect.setAttribute('filter', 'url(#glow)');
    });
    
    samrPillar.addEventListener('mouseleave', () => {
      const rect = samrPillar.querySelector('rect:first-of-type');
      rect.setAttribute('filter', 'url(#pillarGlow)');
    });
  }
  
  // Bridge pillar interactions
  const bridgePillars = document.querySelectorAll('.bridge-pillar');
  
  bridgePillars.forEach(pillar => {
    pillar.addEventListener('click', () => {
      // Toggle active class for pulse animation
      pillar.classList.toggle('active');
    });
  });
  
  /**
   * Show a floating tooltip with information
   */
  function showInfoTooltip(element, info) {
    // Implementation for custom tooltip if needed
    // Default behavior now uses the built-in tooltips
  }
  
  /**
   * Hide the floating tooltip
   */
  function hideInfoTooltip() {
    // Implementation for custom tooltip if needed
    // Default behavior now uses the built-in tooltips
  }
  
  /**
   * Highlight a related section on the page based on bridge element type
   */
  function highlightRelatedSection(type) {
    // Map of element types to page sections
    const sectionMap = {
      'iste-pillar': '#tools',
      'cbam-pillar': '#tools',
      'vision-pillar': '#foundation',
      'samr-pillar': '#tools',
      'ethics-pillar': '#imperatives',
      'current-state': '#introduction',
      'future-state': '#imperatives'
    };
    
    // Find the target section if it exists in the map
    const targetSection = sectionMap[type];
    if (targetSection) {
      // Scroll to the section
      document.querySelector(targetSection).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Flash highlight effect on the section
      const section = document.querySelector(targetSection);
      section.classList.add('section-highlight');
      
      // Remove the highlight class after animation completes
      setTimeout(() => {
        section.classList.remove('section-highlight');
      }, 1500);
    }
  }
  
  // Add a subtle animation effect to the bridge image
  const bridgeImage = document.querySelector('.bridge-image');
  if (bridgeImage) {
    setInterval(() => {
      bridgeImage.style.transform = 'scale(1.01)';
      setTimeout(() => {
        bridgeImage.style.transform = 'scale(1)';
      }, 1500);
    }, 5000);
  }
  
  /**
   * Highlight specific bridge elements based on legend hover
   */
  function highlightBridgeElements(target) {
    switch(target) {
      case 'foundational-pillars':
        // Highlight all pillars
        document.querySelectorAll('.foundational-pillars rect:first-of-type').forEach(rect => {
          rect.style.filter = 'url(#glow)';
          rect.style.opacity = '1';
        });
        break;
        
      case 'strategic-pathway':
        // Highlight the implementation pathway
        document.querySelectorAll('.implementation-pathway path').forEach(path => {
          path.style.strokeWidth = '18';
          path.style.filter = 'url(#glow)';
        });
        break;
        
      case 'innovation-traffic':
        // Highlight the transformation traffic
        document.querySelectorAll('.transformation-traffic circle').forEach(circle => {
          circle.setAttribute('r', '12');
          circle.style.filter = 'url(#glow)';
        });
        break;
        
      case 'structural-beams':
        // Highlight the structural beams
        document.querySelectorAll('.structural-beams line').forEach(line => {
          line.style.strokeWidth = '4';
          line.style.stroke = '#2980B9';
          line.style.opacity = '1';
        });
        break;
        
      case 'bridge-foundations':
        // Highlight both foundations
        document.querySelectorAll('.current-state-foundation rect, .future-state-foundation rect').forEach(rect => {
          rect.style.filter = 'url(#glow)';
          rect.style.stroke = '#fff';
          rect.style.strokeWidth = '2';
        });
        break;
        
      case 'gap-indicators':
        // Highlight the gap indicators
        document.querySelectorAll('.transformation-gap path, .transformation-gap circle').forEach(element => {
          if (element.tagName === 'path') {
            element.style.strokeWidth = '6';
          } else {
            element.setAttribute('r', '12');
          }
          element.style.filter = 'url(#glow)';
        });
        break;
    }
  }
  
  /**
   * Remove highlighting from bridge elements
   */
  function removeBridgeHighlights(target) {
    switch(target) {
      case 'foundational-pillars':
        document.querySelectorAll('.foundational-pillars rect:first-of-type').forEach(rect => {
          rect.style.filter = 'url(#pillarGlow)';
          rect.style.opacity = '';
        });
        break;
        
      case 'strategic-pathway':
        document.querySelectorAll('.implementation-pathway path').forEach(path => {
          path.style.strokeWidth = '';
          path.style.filter = '';
        });
        break;
        
      case 'innovation-traffic':
        document.querySelectorAll('.transformation-traffic circle').forEach(circle => {
          circle.setAttribute('r', circle.getAttribute('r') < '10' ? '6' : '10');
          circle.style.filter = '';
        });
        break;
        
      case 'structural-beams':
        document.querySelectorAll('.structural-beams line').forEach(line => {
          line.style.strokeWidth = '';
          line.style.stroke = '';
          line.style.opacity = '';
        });
        break;
        
      case 'bridge-foundations':
        document.querySelectorAll('.current-state-foundation rect, .future-state-foundation rect').forEach(rect => {
          rect.style.filter = '';
          rect.style.stroke = '';
          rect.style.strokeWidth = '';
        });
        break;
        
      case 'gap-indicators':
        document.querySelectorAll('.transformation-gap path, .transformation-gap circle').forEach(element => {
          if (element.tagName === 'path') {
            element.style.strokeWidth = '';
          } else {
            element.setAttribute('r', '8');
          }
          element.style.filter = '';
        });
        break;
    }
  }
  
  // Add section highlight style
  const style = document.createElement('style');
  style.textContent = `
    .section-highlight {
      animation: sectionPulse 1.5s ease;
    }
    
    @keyframes sectionPulse {
      0%, 100% { box-shadow: none; }
      50% { box-shadow: 0 0 30px rgba(46, 94, 170, 0.3); }
    }
  `;
  document.head.appendChild(style);
});