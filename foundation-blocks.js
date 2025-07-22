/**
 * Foundation Blocks Interaction
 * This script specifically handles the foundation blocks interaction
 * with a very simple approach to ensure it works reliably.
 */

// Run on initial script load for immediate effect
console.log('Foundation blocks script loading');
setTimeout(function() {
    setupFoundationBlocks();
    createFoundationModals();
    console.log('Initial foundation blocks setup complete');
}, 100);

// Also set up when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Foundation blocks script: DOM loaded');
    setupFoundationBlocks();
    createFoundationModals();
    
    // Fix any existing blocks that might have been set up incorrectly
    fixExistingFoundationBlocks();
});

// Also run on window load to be absolutely sure
window.addEventListener('load', function() {
    console.log('Foundation blocks script: Window loaded');
    setupFoundationBlocks();
    createFoundationModals();
    
    // As a last resort, try again after a short delay
    setTimeout(function() {
        setupFoundationBlocks();
        createFoundationModals();
    }, 500);
    
    setTimeout(function() {
        setupFoundationBlocks();
        createFoundationModals();
    }, 1500);
});

// Fix existing blocks by directly manipulating the DOM
function fixExistingFoundationBlocks() {
    // Get all foundation blocks
    const blocks = document.querySelectorAll('.foundation-block');
    console.log('Fixing existing foundation blocks:', blocks.length);
    
    // For each block, ensure the detail panel is properly positioned and styled
    blocks.forEach(function(block) {
        // Make sure the block itself is set up correctly
        block.style.position = 'relative';
        block.style.cursor = 'pointer';
        block.style.zIndex = '1';
        
        // Make sure the detail container is set up correctly
        const detailContainer = block.querySelector('.foundation-detail');
        if (detailContainer) {
            detailContainer.style.position = 'absolute';
            detailContainer.style.zIndex = '1000';
            detailContainer.style.backgroundColor = 'white';
            detailContainer.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
            detailContainer.style.borderRadius = '8px';
            detailContainer.style.padding = '20px';
            detailContainer.style.width = '400px';
            detailContainer.style.maxHeight = '500px';
            detailContainer.style.overflowY = 'auto';
        }
    });
}

function setupFoundationBlocks() {
    console.log('Setting up foundation blocks');
    
    // Get all foundation blocks
    const blocks = document.querySelectorAll('.foundation-block');
    console.log('Found foundation blocks:', blocks.length);
    
    if (blocks.length === 0) {
        console.error('No foundation blocks found!');
        return;
    }
    
    // Add direct inline onclick handlers to each block for maximum reliability
    blocks.forEach(function(block, index) {
        const blockTitle = block.querySelector('h3')?.textContent || 'Block ' + (index + 1);
        console.log('Setting up block:', blockTitle);
        
        // Set onclick directly for maximum compatibility
        block.onclick = function(e) {
            console.log('Block clicked via direct onclick:', blockTitle);
            toggleBlockDetail(block);
        };
        
        // Also set up the close button with direct onclick
        const closeButton = block.querySelector('.detail-close');
        if (closeButton) {
            closeButton.onclick = function(e) {
                console.log('Close button clicked via direct onclick');
                e.stopPropagation(); // Prevent the block click handler from firing
                hideBlockDetail(block);
            };
        }
    });
}

// Create modals for all foundation blocks
function createFoundationModals() {
    console.log('Creating foundation modals');
    
    // Get all foundation blocks
    const blocks = document.querySelectorAll('.foundation-block');
    
    // Create a backdrop for the modals if it doesn't exist
    let modalBackdrop = document.querySelector('.foundation-modal-backdrop');
    if (!modalBackdrop) {
        modalBackdrop = document.createElement('div');
        modalBackdrop.className = 'foundation-modal-backdrop';
        modalBackdrop.style.position = 'fixed';
        modalBackdrop.style.top = '0';
        modalBackdrop.style.left = '0';
        modalBackdrop.style.width = '100%';
        modalBackdrop.style.height = '100%';
        modalBackdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        modalBackdrop.style.zIndex = '999';
        modalBackdrop.style.display = 'none';
        document.body.appendChild(modalBackdrop);
        
        // Add click handler to close modals when clicking backdrop
        modalBackdrop.addEventListener('click', function() {
            closeAllFoundationModals();
        });
    }
    
    // Process each block to create its modal
    blocks.forEach(function(block, index) {
        const blockTitle = block.querySelector('h3')?.textContent || 'Foundation Block';
        const blockIcon = block.querySelector('.block-icon i')?.cloneNode(true) || document.createElement('i');
        const detailContent = block.querySelector('.foundation-detail');
        
        // Skip if there's no detail content
        if (!detailContent) {
            console.warn('No detail content for block:', blockTitle);
            return;
        }
        
        // Check if a modal already exists for this block
        let modalId = `foundation-modal-${index}`;
        let modal = document.getElementById(modalId);
        
        // Create the modal if it doesn't exist
        if (!modal) {
            modal = document.createElement('div');
            modal.id = modalId;
            modal.className = 'foundation-modal';
            modal.innerHTML = `
                <div class="foundation-modal-content">
                    <div class="foundation-modal-header">
                        <div class="foundation-modal-header-background"></div>
                        <div class="foundation-modal-header-overlay"></div>
                        <div class="foundation-modal-header-content">
                            <div>
                                <h3>${blockIcon.outerHTML} ${blockTitle}</h3>
                                <p class="foundation-modal-header-subtitle">Exploring the essential building block for effective educational technology integration</p>
                            </div>
                        </div>
                        <button class="foundation-modal-close"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="foundation-modal-body">
                        <!-- Content will be inserted here -->
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Add click handler to close button
            const closeButton = modal.querySelector('.foundation-modal-close');
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    closeFoundationModal(modal);
                });
            }
        }
        
        // Store the modal ID on the block for reference
        block.setAttribute('data-modal-id', modalId);
        
        // Extract and format the content from the original detail container
        const contentDiv = detailContent.querySelector('.detail-content');
        const comparisonDiv = detailContent.querySelector('.detail-comparison');
        
        // Get the block icon to use in visual elements
        const blockIconClass = blockIcon.className || 'fas fa-question';
        
        // Determine which foundation image to use based on the block title
        let backgroundImageUrl = '';
        if (blockTitle.includes('Vision')) {
            backgroundImageUrl = 'https://public.youware.com/users-website-assets/prod/c0429c9d-fa1a-4ac7-8fd5-8fa86cf97e2c/g10c46faa8efa01c8d8c414fbaa40dd549f5093a8914afa3bbac52fc31ec85ffca3932198a46875ac4a76a89e52f56f0226a5e8ce1f69cab6f1cd885b27cb5735_1280.jpg';
        } else if (blockTitle.includes('Implementation')) {
            backgroundImageUrl = 'https://public.youware.com/users-website-assets/prod/c0429c9d-fa1a-4ac7-8fd5-8fa86cf97e2c/g134f099664a1ddfee0dd2232c6690287ec46bd1002e2cafd42f69b2428b26f80e39739b0fa39dcf3d4a71054b6d3c4bd87cd6ff86024febd595bcc77e68e5f36_1280.jpg';
        } else if (blockTitle.includes('Standards')) {
            backgroundImageUrl = 'https://public.youware.com/users-website-assets/prod/c0429c9d-fa1a-4ac7-8fd5-8fa86cf97e2c/g7bd31c75c64a58d3ee20e6b8559a4c0bf91971b613dbf44aec4cd409b83a4b2594fc2bb23ce13c4ba2bc0a5abaec4a0747ea50d39b07b1d9f97f36f72a53c080_1280.jpg';
        } else if (blockTitle.includes('Culture')) {
            backgroundImageUrl = 'https://public.youware.com/users-website-assets/prod/c0429c9d-fa1a-4ac7-8fd5-8fa86cf97e2c/g08266aabb07f8d5ddedafacd45876d1321021b12462731a8a7b80568f4b5078cc39c7f69f8667fdabdf35bf9d342e33ece9ba08e6b65f5128104fe17dfab8bb3_1280.jpg';
        } else if (blockTitle.includes('Leadership')) {
            backgroundImageUrl = 'https://public.youware.com/users-website-assets/prod/c0429c9d-fa1a-4ac7-8fd5-8fa86cf97e2c/g9efe5d3ad72d1249b874f8b4768dca0664d09ea860c89866692c96b8227bc7e11c2f956df340e0944b642aa2a051754e3319577da1260e454d3932fc77e7ee9d_1280.jpg';
        }
        
        let formattedContent = '';
        
        // Set the background image for the header
        if (backgroundImageUrl) {
            const headerBackground = modal.querySelector('.foundation-modal-header-background');
            if (headerBackground) {
                headerBackground.style.backgroundImage = `url('${backgroundImageUrl}')`;
            }
        }
        
        // Update the subtitle based on the foundation type
        const headerSubtitle = modal.querySelector('.foundation-modal-header-subtitle');
        if (headerSubtitle) {
            if (blockTitle.includes('Vision')) {
                headerSubtitle.textContent = 'Creating a clear, shared understanding of how technology serves your educational mission';
            } else if (blockTitle.includes('Implementation')) {
                headerSubtitle.textContent = 'Assessing and developing your school\'s capacity for emerging technology adoption';
            } else if (blockTitle.includes('Standards')) {
                headerSubtitle.textContent = 'Establishing research-backed frameworks for effective and ethical technology integration';
            } else if (blockTitle.includes('Culture')) {
                headerSubtitle.textContent = 'Fostering an environment that embraces innovation, experimentation, and continuous learning';
            } else if (blockTitle.includes('Leadership')) {
                headerSubtitle.textContent = 'Developing visionary leaders who can guide strategic technology implementation';
            }
        }
        
        // Add the content section with enhanced styling
        if (contentDiv) {
            // Add more detailed content based on the foundation type
            let additionalContent = '';
            
            if (blockTitle.includes('Vision')) {
                additionalContent = `
                    <div class="key-elements">
                        <h5>Key Elements of a Shared Vision</h5>
                        <ul>
                            <li><strong>Collaborative Creation</strong>: Involving all stakeholders in vision development</li>
                            <li><strong>Pedagogical Primacy</strong>: Ensuring learning goals drive technology decisions</li>
                            <li><strong>Ethical Framework</strong>: Establishing clear principles for AI and data use</li>
                            <li><strong>Accessibility Focus</strong>: Ensuring technology serves all learners equitably</li>
                            <li><strong>Continuous Refinement</strong>: Regularly revisiting the vision as technologies evolve</li>
                        </ul>
                    </div>
                `;
            } else if (blockTitle.includes('Implementation')) {
                additionalContent = `
                    <div class="key-elements">
                        <h5>Implementation Readiness Dimensions</h5>
                        <ul>
                            <li><strong>Technical Infrastructure</strong>: Networks, devices, cloud resources, specialized computing</li>
                            <li><strong>Human Capacity</strong>: Staff skills, professional development needs, leadership expertise</li>
                            <li><strong>Data Systems</strong>: Storage, analysis, protection, governance frameworks</li>
                            <li><strong>Ethical Readiness</strong>: Policies, review processes, impact assessment procedures</li>
                            <li><strong>Resource Alignment</strong>: Budgeting, staffing, time allocation, sustainability planning</li>
                        </ul>
                    </div>
                `;
            } else if (blockTitle.includes('Standards')) {
                additionalContent = `
                    <div class="key-elements">
                        <h5>Essential Standards Frameworks</h5>
                        <ul>
                            <li><strong>ISTE Standards</strong>: Comprehensive educational technology guidelines for students, educators, and leaders</li>
                            <li><strong>UNESCO AI Guidelines</strong>: Ethical frameworks for responsible AI implementation in education</li>
                            <li><strong>Digital Citizenship Standards</strong>: Safe, ethical, and responsible technology use frameworks</li>
                            <li><strong>Data Privacy Standards</strong>: Guidelines for protecting student information and ensuring compliance</li>
                            <li><strong>Accessibility Standards</strong>: WCAG and other frameworks ensuring equitable technology access</li>
                        </ul>
                    </div>
                `;
            } else if (blockTitle.includes('Culture')) {
                additionalContent = `
                    <div class="key-elements">
                        <h5>Cultivating an Innovative Culture</h5>
                        <ul>
                            <li><strong>Psychological Safety</strong>: Creating environments where risk-taking is encouraged</li>
                            <li><strong>Collaborative Experimentation</strong>: Supporting teacher-led innovation communities</li>
                            <li><strong>Celebrating Learning</strong>: Reframing "failures" as valuable learning opportunities</li>
                            <li><strong>Student Agency</strong>: Empowering students as technology co-creators and evaluators</li>
                            <li><strong>Cross-Disciplinary Approaches</strong>: Breaking down subject silos for integrated innovation</li>
                        </ul>
                    </div>
                `;
            } else if (blockTitle.includes('Leadership')) {
                additionalContent = `
                    <div class="key-elements">
                        <h5>Technology Leadership Dimensions</h5>
                        <ul>
                            <li><strong>Strategic Vision</strong>: Connecting technology initiatives to institutional mission</li>
                            <li><strong>Distributed Leadership</strong>: Empowering technology champions across the organization</li>
                            <li><strong>Ethical Guidance</strong>: Modeling responsible technology decision-making</li>
                            <li><strong>Resource Stewardship</strong>: Allocating budget and staff to support innovation</li>
                            <li><strong>Community Engagement</strong>: Building stakeholder understanding and support</li>
                        </ul>
                    </div>
                `;
            }
            
            formattedContent += `
                <div class="foundation-section">
                    <div class="foundation-section-icon"><i class="fas fa-info-circle"></i></div>
                    <h4>Overview</h4>
                    ${contentDiv.innerHTML}
                    ${additionalContent}
                </div>
            `;
        }
        
        // Add the comparison section with enhanced styling
        if (comparisonDiv) {
            const originalColumn = comparisonDiv.querySelector('.original-manual');
            const trendsColumn = comparisonDiv.querySelector('.current-trends');
            
            formattedContent += `
                <div class="foundation-section">
                    <div class="foundation-section-icon"><i class="fas fa-history"></i></div>
                    <h4>Evolution</h4>
                    <div class="foundation-comparison">
                        <div class="comparison-column original-manual">
                            <h4>${originalColumn.querySelector('h4')?.textContent || 'In the 2015 Manual'}</h4>
                            <p>${originalColumn.querySelector('p')?.textContent || ''}</p>
                        </div>
                        <div class="comparison-column current-trends">
                            <h4>${trendsColumn.querySelector('h4')?.textContent || 'For 2025 and Beyond'}</h4>
                            <p>${trendsColumn.querySelector('p')?.textContent || ''}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Add implementation steps section based on the foundation type
        let implementationSteps = '';
        
        if (blockTitle.includes('Vision')) {
            implementationSteps = `
                <div class="foundation-section implementation-steps">
                    <div class="foundation-section-icon"><i class="fas fa-tasks"></i></div>
                    <h4>Implementation Steps</h4>
                    <ol class="steps-list">
                        <li>Convene a representative committee including teachers, administrators, students, and community members</li>
                        <li>Review existing vision statements and identify gaps related to emerging technologies</li>
                        <li>Conduct focus groups to gather diverse perspectives on technology's role in learning</li>
                        <li>Draft vision statement with clear principles for responsible innovation</li>
                        <li>Gather feedback and refine until the vision resonates with all stakeholders</li>
                        <li>Develop communication materials to share the vision throughout the community</li>
                        <li>Create alignment between vision and technology decision-making processes</li>
                    </ol>
                </div>
            `;
        } else if (blockTitle.includes('Implementation')) {
            implementationSteps = `
                <div class="foundation-section implementation-steps">
                    <div class="foundation-section-icon"><i class="fas fa-tasks"></i></div>
                    <h4>Implementation Steps</h4>
                    <ol class="steps-list">
                        <li>Develop comprehensive assessment tools for each readiness dimension</li>
                        <li>Gather data through surveys, interviews, and technical assessments</li>
                        <li>Analyze results to identify strengths and gaps in implementation readiness</li>
                        <li>Calculate your school's "Innovation Quotient" across all dimensions</li>
                        <li>Prioritize areas for improvement based on strategic importance</li>
                        <li>Develop action plans to address identified gaps</li>
                        <li>Establish regular reassessment cycles to track progress</li>
                    </ol>
                </div>
            `;
        } else if (blockTitle.includes('Standards')) {
            implementationSteps = `
                <div class="foundation-section implementation-steps">
                    <div class="foundation-section-icon"><i class="fas fa-tasks"></i></div>
                    <h4>Implementation Steps</h4>
                    <ol class="steps-list">
                        <li>Review and select relevant standards frameworks (ISTE, UNESCO, etc.)</li>
                        <li>Customize standards to align with your institution's context and needs</li>
                        <li>Develop clear success criteria for each standard</li>
                        <li>Create implementation rubrics for assessing progress</li>
                        <li>Integrate standards into professional development programs</li>
                        <li>Align technology procurement and evaluation with standards</li>
                        <li>Use standards to guide curriculum development and assessment design</li>
                    </ol>
                </div>
            `;
        } else if (blockTitle.includes('Culture')) {
            implementationSteps = `
                <div class="foundation-section implementation-steps">
                    <div class="foundation-section-icon"><i class="fas fa-tasks"></i></div>
                    <h4>Implementation Steps</h4>
                    <ol class="steps-list">
                        <li>Assess current organizational culture around innovation and risk-taking</li>
                        <li>Identify formal and informal barriers to experimentation</li>
                        <li>Create "innovation zones" where new approaches can be safely tested</li>
                        <li>Develop recognition systems that celebrate learning through experimentation</li>
                        <li>Establish teacher-led communities of practice for emerging technologies</li>
                        <li>Design student technology leadership opportunities</li>
                        <li>Model risk-taking and continuous learning at leadership levels</li>
                    </ol>
                </div>
            `;
        } else if (blockTitle.includes('Leadership')) {
            implementationSteps = `
                <div class="foundation-section implementation-steps">
                    <div class="foundation-section-icon"><i class="fas fa-tasks"></i></div>
                    <h4>Implementation Steps</h4>
                    <ol class="steps-list">
                        <li>Identify current leadership styles and their impact on technology adoption</li>
                        <li>Develop leadership capacity through targeted professional development</li>
                        <li>Create technology leadership teams with diverse representation</li>
                        <li>Establish clear decision-making processes for technology initiatives</li>
                        <li>Develop communication strategies to build understanding and support</li>
                        <li>Implement ethical frameworks for technology decision-making</li>
                        <li>Establish mentoring relationships between experienced and emerging leaders</li>
                    </ol>
                </div>
            `;
        }
        }
        
        // Add implementation steps to the formatted content if it exists
        if (implementationSteps) {
            formattedContent += implementationSteps;
        }
        
        // Add a resources section
        formattedContent += `
            <div class="foundation-section resources-section">
                <div class="foundation-section-icon"><i class="fas fa-book"></i></div>
                <h4>Resources & Tools</h4>
                <div class="resources-grid">
                    <div class="resource-item">
                        <div class="resource-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="resource-content">
                            <h5>Implementation Guide</h5>
                            <p>Detailed step-by-step instructions for building this foundation</p>
                        </div>
                    </div>
                    <div class="resource-item">
                        <div class="resource-icon"><i class="fas fa-clipboard-check"></i></div>
                        <div class="resource-content">
                            <h5>Self-Assessment Tool</h5>
                            <p>Evaluate your school's current status and identify growth areas</p>
                        </div>
                    </div>
                    <div class="resource-item">
                        <div class="resource-icon"><i class="fas fa-video"></i></div>
                        <div class="resource-content">
                            <h5>Expert Interviews</h5>
                            <p>Video insights from educational leaders and technology experts</p>
                        </div>
                    </div>
                    <div class="resource-item">
                        <div class="resource-icon"><i class="fas fa-book"></i></div>
                        <div class="resource-content">
                            <h5>Case Studies</h5>
                            <p>Real-world examples of successful implementation approaches</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Set the formatted content in the modal body
        const modalBody = modal.querySelector('.foundation-modal-body');
        if (modalBody) {
            modalBody.innerHTML = formattedContent;
        }
        
        // Add custom visual context based on the foundation type
        const headerSubtitle = modal.querySelector('.foundation-modal-header-subtitle');
        if (headerSubtitle) {
            if (blockTitle.includes('Vision')) {
                headerSubtitle.innerHTML = 'A compelling vision aligns your educational community, <strong>defines your technological purpose</strong>, and creates a foundation for meaningful implementation.';
            } else if (blockTitle.includes('Implementation')) {
                headerSubtitle.innerHTML = 'Assessing and developing your school\'s readiness across multiple dimensions ensures <strong>sustainable and effective technology integration</strong>.';
            } else if (blockTitle.includes('Standards')) {
                headerSubtitle.innerHTML = 'Research-backed frameworks provide essential guidelines for <strong>ethical, effective, and pedagogically sound</strong> technology implementation.';
            } else if (blockTitle.includes('Culture')) {
                headerSubtitle.innerHTML = 'An innovative culture creates an environment where <strong>experimentation thrives</strong> and technology becomes a natural extension of learning.';
            } else if (blockTitle.includes('Leadership')) {
                headerSubtitle.innerHTML = 'Visionary leadership empowers change agents throughout your organization to <strong>guide transformation</strong> with purpose and ethical clarity.';
            }
        }
    });
    
    console.log('Foundation modals created with enhanced visual context');
}

// Function to toggle a block's modal
function toggleBlockDetail(block) {
    console.log('Toggling block detail');
    
    // Get the modal ID
    const modalId = block.getAttribute('data-modal-id');
    if (!modalId) {
        console.error('No modal ID found for block');
        return;
    }
    
    // Get the modal
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Modal not found:', modalId);
        return;
    }
    
    // Show the modal
    showFoundationModal(modal);
}

// Function to show a foundation modal
function showFoundationModal(modal) {
    console.log('Showing foundation modal');
    
    // Close any other open modals first
    closeAllFoundationModals();
    
    // Show the backdrop
    const backdrop = document.querySelector('.foundation-modal-backdrop');
    if (backdrop) {
        backdrop.style.display = 'block';
    }
    
    // Add active class to the modal
    modal.classList.add('active');
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

// Function to close a specific foundation modal
function closeFoundationModal(modal) {
    console.log('Closing foundation modal');
    
    // Add the closing class for animation
    modal.classList.add('closing');
    
    // After the animation completes, remove the classes and hide the modal
    setTimeout(() => {
        modal.classList.remove('active');
        modal.classList.remove('closing');
        
        // Hide the backdrop if no other modals are open
        const openModals = document.querySelectorAll('.foundation-modal.active');
        if (openModals.length === 0) {
            const backdrop = document.querySelector('.foundation-modal-backdrop');
            if (backdrop) {
                backdrop.style.display = 'none';
            }
            
            // Restore body scrolling
            document.body.style.overflow = '';
        }
    }, 500); // This should match the animation duration in CSS
}

// Function to close all foundation modals
function closeAllFoundationModals() {
    console.log('Closing all foundation modals');
    
    // Add closing class to all active modals
    const activeModals = document.querySelectorAll('.foundation-modal.active');
    if (activeModals.length > 0) {
        activeModals.forEach(function(modal) {
            modal.classList.add('closing');
        });
        
        // After animation completes, fully remove the modals
        setTimeout(() => {
            // Close all modals
            const modals = document.querySelectorAll('.foundation-modal');
            modals.forEach(function(modal) {
                modal.classList.remove('active');
                modal.classList.remove('closing');
            });
            
            // Hide the backdrop
            const backdrop = document.querySelector('.foundation-modal-backdrop');
            if (backdrop) {
                backdrop.style.display = 'none';
            }
            
            // Restore body scrolling
            document.body.style.overflow = '';
        }, 500); // Match animation duration
    } else {
        // If no active modals, just clean up
        const backdrop = document.querySelector('.foundation-modal-backdrop');
        if (backdrop) {
            backdrop.style.display = 'none';
        }
        
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

// Legacy functions for backward compatibility
function showBlockDetail(block) {
    console.log('Showing block detail (legacy)');
    toggleBlockDetail(block);
}

function hideBlockDetail(block) {
    console.log('Hiding block detail (legacy)');
    closeAllFoundationModals();
}

// Try to set up blocks right away
setupFoundationBlocks();