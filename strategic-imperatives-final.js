/**
 * Strategic Imperatives - Final Working Implementation
 * This script provides clean, reliable handling for Strategic Imperatives overlays
 * Based on the same approach as the working step-details overlays
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Strategic Imperatives Final: Script loaded');
    
    // Function to ensure body overflow is properly reset
    function resetBodyScroll() {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.documentElement.style.overflow = '';
        document.documentElement.style.paddingRight = '';
        
        // Force refresh to clear any lingering visual artifacts
        setTimeout(function() {
            window.dispatchEvent(new Event('resize'));
        }, 10);
    }
    
    // Function to safely close all modals
    function closeAllModals() {
        document.querySelectorAll('.imperative-details.active').forEach(modal => {
            modal.classList.remove('active');
        });
        resetBodyScroll();
    }
    
    // Handle overlay opening with proper event handling
    document.querySelectorAll('.imperative-learn-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('data-target');
            const overlay = document.getElementById(targetId);
            
            if (overlay) {
                // Close any open overlays
                closeAllModals();
                
                // Prevent scrolling with multiple safeguards
                document.body.style.overflow = 'hidden';
                
                // Show overlay
                overlay.classList.add('active');
                
                // Add smooth scrolling for long content
                const modalContent = overlay.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.scrollTop = 0;
                }
                
                console.log(`Strategic Imperatives Final: Opened overlay ${targetId}`);
            } else {
                console.error(`Strategic Imperatives Final: Overlay not found: ${targetId}`);
            }
        });
    });

    // Handle modal button clicks - use a separate event handler that doesn't conflict
    document.querySelectorAll('.imperative-details .modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const overlay = this.closest('.imperative-details');
            if (overlay) {
                overlay.classList.remove('active');
                resetBodyScroll();
                console.log('Strategic Imperatives Final: Closed overlay via close button');
            }
        });
    });
    
    // Handle backdrop clicks
    document.querySelectorAll('.imperative-details').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            // Only close if the click is directly on the backdrop (not on content)
            if (e.target === this) {
                e.preventDefault();
                e.stopPropagation();
                
                this.classList.remove('active');
                resetBodyScroll();
                console.log('Strategic Imperatives Final: Closed overlay via backdrop click');
            }
        });
    });

    // Close with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeOverlays = document.querySelectorAll('.imperative-details.active');
            if (activeOverlays.length > 0) {
                closeAllModals();
                console.log('Strategic Imperatives Final: Closed overlay via ESC key');
            }
        }
    });
    
    // Prevent event bubbling for modal content
    document.querySelectorAll('.imperative-details .modal-content').forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Add smooth scrolling behavior for modal content
    document.querySelectorAll('.imperative-details .modal-content').forEach(content => {
        content.style.scrollBehavior = 'smooth';
    });
    
    // Additional safety check: Ensure body scroll is reset if someone navigates away while modal is open
    window.addEventListener('beforeunload', resetBodyScroll);
    
    // Also reset on page resize, which might happen when device orientation changes
    window.addEventListener('resize', function() {
        if (!document.querySelector('.imperative-details.active')) {
            resetBodyScroll();
        }
    });
    
    // Add styling for keywords on hover
    document.querySelectorAll('.modal-keyword').forEach(keyword => {
        keyword.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        keyword.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    console.log('Strategic Imperatives Final: Initialization complete with enhanced event handling');
});