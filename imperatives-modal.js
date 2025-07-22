/**
 * Strategic Imperatives Modal System
 * Completely rebuilt for reliability and clean user experience
 */

// Global variables to track state
let isModalOpen = false;
let activeModal = null;
let bodyScrollPosition = 0;

document.addEventListener('DOMContentLoaded', function() {
    initImperativesModals();
});

// Initialize if already loaded
if (document.readyState !== 'loading') {
    initImperativesModals();
}

function initImperativesModals() {
    console.log('Initializing Strategic Imperatives modals with reliability focus');
    
    // Set up learn more buttons
    setupLearnMoreButtons();
    
    // Set up close buttons
    setupCloseButtons();
    
    // Set up keyboard handler
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isModalOpen) {
            closeAllModals();
        }
    });
    
    // Set up backdrop click handler for closing
    document.addEventListener('click', function(e) {
        if (isModalOpen && activeModal && !activeModal.contains(e.target)) {
            closeAllModals();
        }
    });
    
    // Safety interval to ensure site remains interactive
    setInterval(cleanupAnyBlurEffects, 500);
    
    // Add enhancement function for better visuals
    enhanceImperativeCards();
}

function setupLearnMoreButtons() {
    // Find all learn more buttons
    const learnMoreButtons = document.querySelectorAll('.imperative-learn-more');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('data-target');
            if (!targetId) return;
            
            const modal = document.getElementById(targetId);
            if (modal) {
                openModal(modal);
            }
        });
    });
}

function setupCloseButtons() {
    // Set up all close buttons
    const closeButtons = document.querySelectorAll('.modal-close');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeAllModals();
        });
    });
}

function openModal(modal) {
    if (!modal) return;
    
    // Close any existing modals first
    closeAllModals();
    
    // Store scroll position
    bodyScrollPosition = window.scrollY;
    
    // Save modal reference
    activeModal = modal;
    isModalOpen = true;
    
    // Add classes to control scrolling
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    
    // Clear any blur effects completely
    cleanupAnyBlurEffects();
    
    // Show the modal with a small delay to ensure DOM is ready
    setTimeout(() => {
        modal.classList.add('active');
        
        // Add professional styling enhancements to the content
        enhanceModalContent(modal);
    }, 10);
}

function closeAllModals() {
    // Find all active modals
    const modals = document.querySelectorAll('.imperative-details.active');
    
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    
    // Reset state
    activeModal = null;
    isModalOpen = false;
    
    // Remove classes that prevent scrolling
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
    
    // Clean up any blur effects
    cleanupAnyBlurEffects();
    
    // Restore scroll position
    setTimeout(() => {
        window.scrollTo(0, bodyScrollPosition);
    }, 10);
}

// Helper function to clear text selections
function clearSelections() {
    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges();
        }
    } else if (document.selection) {  // IE
        document.selection.empty();
    }
}

// Function to enhance modal content with professional styling
function enhanceModalContent(modal) {
    if (!modal) return;
    
    // Get content elements
    const title = modal.querySelector('.modal-title');
    const paragraphs = modal.querySelectorAll('.modal-body p');
    const headings = modal.querySelectorAll('.modal-body h4');
    const lists = modal.querySelectorAll('.modal-body ul');
    const listItems = modal.querySelectorAll('.modal-body li');
    
    // Add subtle fade-in animations with staggered delays
    if (paragraphs.length) {
        paragraphs.forEach((p, index) => {
            p.style.opacity = '0';
            p.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
                p.style.transition = 'all 0.5s ease';
            }, 100 + (index * 80));
        });
    }
    
    if (headings.length) {
        headings.forEach((h, index) => {
            h.style.opacity = '0';
            h.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                h.style.opacity = '1';
                h.style.transform = 'translateY(0)';
                h.style.transition = 'all 0.4s ease';
            }, 200 + (index * 100));
        });
    }
    
    if (lists.length) {
        lists.forEach((list, index) => {
            list.style.opacity = '0';
            list.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                list.style.opacity = '1';
                list.style.transform = 'translateY(0)';
                list.style.transition = 'all 0.5s ease';
            }, 300 + (index * 100));
        });
    }
    
    // Add any links enhancement
    const links = modal.querySelectorAll('.modal-body a');
    if (links.length) {
        links.forEach(link => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
    }
    
    // Clean up any unwanted text selections
    clearSelections();
}

// Function to enhance the imperative cards
function enhanceImperativeCards() {
    const cards = document.querySelectorAll('.imperative-card');
    const buttons = document.querySelectorAll('.imperative-learn-more');
    
    // Add hover effects to cards
    cards.forEach(card => {
        // Check if we've already processed this card
        if (card.dataset.enhanced) return;
        
        // Add professional hover state
        card.addEventListener('mouseenter', () => {
            const title = card.querySelector('.imperative-card-title, h3');
            if (title) {
                title.style.color = '#3b82f6';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const title = card.querySelector('.imperative-card-title, h3');
            if (title) {
                title.style.color = '';
            }
        });
        
        // Mark as processed
        card.dataset.enhanced = 'true';
    });
    
    // Enhance buttons
    buttons.forEach(button => {
        // Check if we've already processed this button
        if (button.dataset.enhanced) return;
        
        // Add focus states for accessibility
        button.addEventListener('focus', () => {
            button.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.3)';
        });
        
        button.addEventListener('blur', () => {
            button.style.boxShadow = '';
        });
        
        // Mark as processed
        button.dataset.enhanced = 'true';
    });
}

// Function to ensure all blur effects are removed
function cleanupAnyBlurEffects() {
    // Remove from html and body
    document.documentElement.style.filter = 'none';
    document.documentElement.style.backdropFilter = 'none';
    document.documentElement.style.webkitBackdropFilter = 'none';
    
    document.body.style.filter = 'none';
    document.body.style.backdropFilter = 'none';
    document.body.style.webkitBackdropFilter = 'none';
    
    // Ensure body is interactive
    document.body.style.pointerEvents = 'auto';
    
    // If no modals are open, ensure scrolling is enabled
    if (!isModalOpen) {
        document.body.style.overflow = '';
    }
    
    // Clean any possible elements with backdrop filters
    const possibleBlurredElements = document.querySelectorAll('section, div, header, footer, main, aside');
    
    possibleBlurredElements.forEach(el => {
        // Skip the active modal to avoid interfering with it
        if (activeModal && activeModal.contains(el)) {
            return;
        }
        
        // Check if the element has a computed backdrop filter
        const computedStyle = window.getComputedStyle(el);
        if (computedStyle.backdropFilter && computedStyle.backdropFilter !== 'none') {
            el.style.backdropFilter = 'none';
            el.style.webkitBackdropFilter = 'none';
            el.style.filter = 'none';
        }
    });
    
    // Fix for any text highlighting issues
    clearSelections();
}