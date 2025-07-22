/**
 * Strategic Imperatives Modal Fix - Completely New Implementation
 * This script implements clean, reliable handling for Strategic Imperatives overlays
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Strategic Imperatives Fix: Script loaded');
  
  // Find all Strategic Imperatives "Learn more" buttons
  const imperativeButtons = document.querySelectorAll('.imperative-learn-more');
  console.log(`Strategic Imperatives Fix: Found ${imperativeButtons.length} buttons`);
  
  // Set up event listeners for each button
  imperativeButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Get the target overlay ID
      const targetId = this.getAttribute('data-target');
      if (!targetId) {
        console.error('Strategic Imperatives Fix: Button missing data-target attribute');
        return;
      }
      
      // Find the corresponding overlay
      const overlay = document.getElementById(targetId);
      if (!overlay) {
        console.error(`Strategic Imperatives Fix: Overlay not found with ID: ${targetId}`);
        return;
      }
      
      // Close any open overlays first
      document.querySelectorAll('.imperative-details.active').forEach(function(modal) {
        modal.classList.remove('active');
      });
      
      // Prevent page scrolling
      document.body.style.overflow = 'hidden';
      
      // Show the overlay
      overlay.classList.add('active');
      
      console.log(`Strategic Imperatives Fix: Opened overlay ${targetId}`);
    });
  });
  
  // Set up event delegation for closing modals (more efficient)
  document.addEventListener('click', function(e) {
    // Close via close button
    if (e.target.closest('.modal-close')) {
      const overlay = e.target.closest('.imperative-details');
      if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        console.log('Strategic Imperatives Fix: Closed overlay via button');
      }
      return;
    }
    
    // Close via backdrop click (clicking directly on the overlay, not its content)
    if (e.target.classList.contains('imperative-details')) {
      e.target.classList.remove('active');
      document.body.style.overflow = '';
      console.log('Strategic Imperatives Fix: Closed overlay via backdrop click');
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const activeOverlays = document.querySelectorAll('.imperative-details.active');
      if (activeOverlays.length > 0) {
        activeOverlays.forEach(function(overlay) {
          overlay.classList.remove('active');
        });
        document.body.style.overflow = '';
        console.log('Strategic Imperatives Fix: Closed overlay via ESC key');
      }
    }
  });
  
  console.log('Strategic Imperatives Fix: Initialization complete');
});