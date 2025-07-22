// Complete rewrite of Strategic Imperatives overlay handlers
// Using the same approach as the working step-details implementation

document.addEventListener('DOMContentLoaded', function() {
    console.log('Strategic Imperatives fix script loaded');
    
    // Find all Strategic Imperatives "Learn more" buttons
    const imperativeButtons = document.querySelectorAll('.imperative-learn-more');
    
    // Add reliable click event handler
    imperativeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get the target overlay ID
            const targetId = this.getAttribute('data-target');
            if (!targetId) {
                console.error('Missing data-target attribute on button');
                return;
            }
            
            // Find the target overlay
            const overlay = document.getElementById(targetId);
            if (!overlay) {
                console.error('Target overlay not found: ' + targetId);
                return;
            }
            
            // Close any open overlays first
            document.querySelectorAll('.imperative-details.active').forEach(modal => {
                modal.classList.remove('active');
            });
            
            // Prevent page scrolling when overlay is open
            document.body.style.overflow = 'hidden';
            
            // Show the overlay
            overlay.classList.add('active');
        });
    });
    
    // Set up universal event delegation for closing overlays
    document.addEventListener('click', function(e) {
        // Close when clicking close button
        if (e.target.closest('.modal-close')) {
            const overlay = e.target.closest('.imperative-details');
            if (overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Close when clicking backdrop (outside content)
        if (e.target.classList.contains('imperative-details') && !e.target.closest('.modal-content')) {
            e.target.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeOverlays = document.querySelectorAll('.imperative-details.active');
            if (activeOverlays.length > 0) {
                activeOverlays.forEach(overlay => {
                    overlay.classList.remove('active');
                });
                document.body.style.overflow = '';
            }
        }
    });
    
    console.log('Strategic Imperatives event handlers initialized');
});