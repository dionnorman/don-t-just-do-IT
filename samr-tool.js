document.addEventListener('DOMContentLoaded', function() {
    console.log('SAMR Tool initialization started');
    
    // Initialize both old and new SAMR tools
    initSamrTool();
    initEnhancedSamrTool();
    
    // Initialize the clean SAMR modal system
    initSamrLevelDetails();
    
    // Direct event listener for the old button in case form submission isn't triggering
    const submitButton = document.querySelector('.samr-submit-btn');
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            generateSamrResults();
        });
    }
    
    console.log('SAMR Tool initialization completed');
});

// Clean SAMR Modal System - Simple and Reliable
function initSamrLevelDetails() {
    console.log('Initializing clean SAMR modal system...');
    
    // Clean up any existing handlers first
    document.querySelectorAll('.ladder-level').forEach(level => {
        // Clone to remove all existing event listeners
        const newLevel = level.cloneNode(true);
        level.parentNode.replaceChild(newLevel, level);
    });
    
    // Add simple click handlers to ladder levels
    document.querySelectorAll('.ladder-level').forEach(level => {
        level.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Determine which level was clicked
            let samrLevel = '';
            if (this.classList.contains('level-redefinition')) {
                samrLevel = 'redefinition';
            } else if (this.classList.contains('level-modification')) {
                samrLevel = 'modification';
            } else if (this.classList.contains('level-augmentation')) {
                samrLevel = 'augmentation';
            } else if (this.classList.contains('level-substitution')) {
                samrLevel = 'substitution';
            }
            
            if (samrLevel) {
                showCleanSamrOverlay(samrLevel);
            }
        });
    });
    
    console.log('Clean SAMR modal system initialized successfully');
}

// Simple, clean overlay system that avoids all conflicts - Made global
window.showCleanSamrOverlay = function(level) {
    console.log('Showing clean overlay for:', level);
    
    // Close any existing overlays first
    closeCleanSamrOverlay();
    
    // Create overlay content based on level
    const overlayContent = createSamrLevelContent(level);
    
    // Create the overlay
    const overlay = document.createElement('div');
    overlay.id = 'clean-samr-overlay';
    overlay.innerHTML = `
        <div class="clean-modal-backdrop">
            <div class="clean-modal-content">
                <button class="clean-modal-close" aria-label="Close">&times;</button>
                ${overlayContent}
            </div>
        </div>
    `;
    
    // Add styles directly to avoid CSS conflicts
    overlay.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 999999 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: rgba(0, 0, 0, 0.5) !important;
        opacity: 1 !important;
        visibility: visible !important;
        overflow-y: auto !important;
        padding: 20px !important;
        box-sizing: border-box !important;
    `;
    
    // Style the modal content
    const modalContent = overlay.querySelector('.clean-modal-content');
    modalContent.style.cssText = `
        background: white !important;
        border-radius: 12px !important;
        max-width: 800px !important;
        width: 100% !important;
        max-height: 90vh !important;
        overflow-y: auto !important;
        position: relative !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
        border: 1px solid #e5e7eb !important;
        padding: 30px !important;
        margin: 0 auto !important;
    `;
    
    // Style the close button
    const closeButton = overlay.querySelector('.clean-modal-close');
    closeButton.style.cssText = `
        position: absolute !important;
        top: 15px !important;
        right: 20px !important;
        background: none !important;
        border: none !important;
        font-size: 24px !important;
        cursor: pointer !important;
        color: #666 !important;
        width: 30px !important;
        height: 30px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 50% !important;
        transition: background-color 0.2s ease !important;
    `;
    
    // Add the overlay to the page
    document.body.appendChild(overlay);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add event listeners for closing
    closeButton.addEventListener('click', window.closeCleanSamrOverlay);
    
    // Close on backdrop click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay || e.target.classList.contains('clean-modal-backdrop')) {
            window.closeCleanSamrOverlay();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', window.handleEscapeKey);
    
    // Hover effect for close button
    closeButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#f3f4f6';
    });
    closeButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
    });
}

window.closeCleanSamrOverlay = function() {
    const overlay = document.getElementById('clean-samr-overlay');
    if (overlay) {
        overlay.remove();
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Remove escape key listener
    document.removeEventListener('keydown', window.handleEscapeKey);
}

window.handleEscapeKey = function(e) {
    if (e.key === 'Escape') {
        window.closeCleanSamrOverlay();
    }
}

function createSamrLevelContent(level) {
    const levelData = {
        redefinition: {
            title: 'Redefinition',
            subtitle: 'Technology allows for the creation of new tasks, previously inconceivable',
            icon: '🚀',
            color: '#10b981',
            description: 'At the Redefinition level, technology enables completely new learning experiences that were previously impossible. Students create, collaborate, and contribute in ways that transcend traditional classroom boundaries.',
            characteristics: [
                'Creates entirely new learning tasks and opportunities',
                'Enables global collaboration and authentic audiences',
                'Transforms the role of students from consumers to creators',
                'Facilitates real-world problem solving and impact'
            ],
            examples: [
                {
                    title: 'Global Collaborative Research',
                    description: 'Students partner with peers worldwide to conduct original research on climate change, sharing data and findings in real-time through cloud platforms and presenting to actual environmental organizations.'
                },
                {
                    title: 'Virtual Reality Historical Experiences',
                    description: 'Students create immersive VR experiences that allow others to "walk through" historical events, combining research, storytelling, and technology in ways impossible without digital tools.'
                },
                {
                    title: 'AI-Assisted Creative Writing',
                    description: 'Students collaborate with AI to explore new forms of storytelling, creating interactive narratives that respond to reader choices while maintaining human creativity and critical thinking.'
                },
                {
                    title: 'Community Problem-Solving Projects',
                    description: 'Students use data analysis, 3D modeling, and community engagement platforms to develop and present actual solutions to local problems to city councils and community organizations.'
                }
            ],
            guidance: [
                'Focus on authentic audiences and real-world impact',
                'Encourage student voice and choice in learning design',
                'Facilitate connections beyond the classroom walls',
                'Support innovation and creative risk-taking',
                'Emphasize creation over consumption'
            ],
            impact: 'Students develop 21st-century skills, global awareness, and the confidence to use technology as a tool for positive change. Learning becomes personally meaningful and socially relevant.'
        },
        modification: {
            title: 'Modification',
            subtitle: 'Technology allows for significant task redesign',
            icon: '🔧',
            color: '#f59e0b',
            description: 'At the Modification level, technology enables significant redesign of learning tasks. Traditional activities are transformed in meaningful ways that enhance learning outcomes and student engagement.',
            characteristics: [
                'Redesigns traditional tasks using technology capabilities',
                'Enhances learning through multimedia and interactivity',
                'Enables new forms of collaboration and communication',
                'Provides opportunities for creative expression'
            ],
            examples: [
                {
                    title: 'Interactive Multimedia Presentations',
                    description: 'Instead of traditional book reports, students create interactive digital stories with embedded videos, audio narrations, hyperlinks, and visual elements that engage their audience.'
                },
                {
                    title: 'Collaborative Digital Magazines',
                    description: 'Students work together to research, write, design, and publish a digital magazine on current events, incorporating multimedia elements and sharing with authentic audiences.'
                },
                {
                    title: 'Virtual Science Experiments',
                    description: 'Students conduct complex experiments in virtual labs, manipulating variables impossible in physical labs and collecting data for analysis and peer review.'
                },
                {
                    title: 'Cross-Cultural Video Exchanges',
                    description: 'Students create and share video documentaries about their local communities with students in other countries, fostering global understanding and communication skills.'
                }
            ],
            guidance: [
                'Redesign existing activities to leverage technology strengths',
                'Encourage multimedia creation and presentation',
                'Facilitate meaningful collaboration between students',
                'Provide opportunities for peer feedback and revision',
                'Focus on process as much as product'
            ],
            impact: 'Students develop deeper understanding through creation and collaboration. Technology becomes a tool for expressing learning in more engaging and meaningful ways.'
        },
        augmentation: {
            title: 'Augmentation',
            subtitle: 'Technology acts as a direct tool substitute with functional improvement',
            icon: '📈',
            color: '#3b82f6',
            description: 'At the Augmentation level, technology directly substitutes traditional tools but with significant functional improvements. Students benefit from enhanced capabilities that improve their learning experience.',
            characteristics: [
                'Provides immediate feedback and assessment',
                'Enhances traditional tasks with digital capabilities',
                'Improves efficiency and accessibility of learning',
                'Offers personalized learning experiences'
            ],
            examples: [
                {
                    title: 'Interactive Math Practice',
                    description: 'Students use adaptive math platforms that provide immediate feedback, hints, and personalized problem sets based on their individual progress and understanding.'
                },
                {
                    title: 'Collaborative Document Writing',
                    description: 'Students write essays using collaborative platforms where they can provide real-time peer feedback, track changes, and work together more effectively than with paper.'
                },
                {
                    title: 'Digital Language Learning',
                    description: 'Students practice language skills with apps that provide pronunciation feedback, adaptive vocabulary practice, and conversation simulation with immediate correction.'
                },
                {
                    title: 'Enhanced Research Tools',
                    description: 'Students use advanced search tools and digital libraries that provide better access to information, citation help, and collaborative research capabilities.'
                }
            ],
            guidance: [
                'Leverage immediate feedback capabilities of digital tools',
                'Use technology to personalize learning experiences',
                'Encourage collaboration through shared digital spaces',
                'Focus on tools that genuinely improve learning efficiency',
                'Maintain focus on learning objectives, not tool features'
            ],
            impact: 'Students experience more efficient and effective learning. Technology provides support that helps them achieve better outcomes than traditional methods alone.'
        },
        substitution: {
            title: 'Substitution',
            subtitle: 'Technology acts as a direct tool substitute with no functional change',
            icon: '↔️',
            color: '#64748b',
            description: 'At the Substitution level, technology directly replaces traditional tools without changing the fundamental learning experience. While this is the entry point for technology integration, it\'s important to recognize opportunities to move beyond simple substitution.',
            characteristics: [
                'Direct replacement of traditional tools',
                'No change in learning task or outcomes',
                'Familiar workflows in digital format',
                'Often focuses on convenience or efficiency'
            ],
            examples: [
                {
                    title: 'Digital Worksheets',
                    description: 'Students complete the same types of worksheets they would on paper, but using tablets or computers. The content and process remain identical to traditional worksheets.'
                },
                {
                    title: 'Typing Instead of Writing',
                    description: 'Students type essays and reports using word processors instead of writing by hand, but the assignment structure and expectations remain the same.'
                },
                {
                    title: 'E-books Instead of Textbooks',
                    description: 'Students read digital versions of textbooks on devices instead of physical books, with no change in how they interact with or use the content.'
                },
                {
                    title: 'Online Quizzes',
                    description: 'Students take the same multiple-choice or short-answer quizzes they would on paper, but using online quiz platforms instead.'
                }
            ],
            guidance: [
                'Recognize substitution as a starting point, not an end goal',
                'Look for opportunities to enhance activities with technology features',
                'Consider how digital tools might improve the learning experience',
                'Plan progression toward higher SAMR levels',
                'Focus on building comfort with basic technology use'
            ],
            impact: 'Students become familiar with technology tools and may experience some convenience benefits. However, learning outcomes remain largely unchanged from traditional methods.'
        }
    };
    
    const data = levelData[level];
    if (!data) return '<p>Level data not found.</p>';
    
    return `
        <div class="samr-level-detail-content">
            <div class="level-header">
                <div class="level-icon" style="background: ${data.color}; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 20px;">${data.icon}</div>
                <h2 style="color: ${data.color}; margin: 0 0 8px 0; font-size: 2rem; font-weight: 700;">${data.title}</h2>
                <p style="color: #6b7280; font-size: 1.1rem; margin: 0 0 24px 0; font-style: italic;">${data.subtitle}</p>
            </div>
            
            <div class="level-description" style="margin-bottom: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; border-left: 4px solid ${data.color};">
                <p style="font-size: 1.05rem; line-height: 1.6; margin: 0; color: #374151;">${data.description}</p>
            </div>
            
            <div class="level-characteristics" style="margin-bottom: 30px;">
                <h3 style="color: #1f2937; font-size: 1.3rem; margin: 0 0 16px 0;">Key Characteristics</h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${data.characteristics.map(char => `
                        <li style="padding: 8px 0; display: flex; align-items: flex-start;">
                            <span style="color: ${data.color}; margin-right: 8px; font-weight: bold;">•</span>
                            <span style="line-height: 1.5; color: #4b5563;">${char}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="level-examples" style="margin-bottom: 30px;">
                <h3 style="color: #1f2937; font-size: 1.3rem; margin: 0 0 20px 0;">Practical Examples</h3>
                <div class="examples-grid" style="display: grid; gap: 20px;">
                    ${data.examples.map(example => `
                        <div style="padding: 20px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                            <h4 style="color: ${data.color}; font-size: 1.1rem; margin: 0 0 12px 0; font-weight: 600;">${example.title}</h4>
                            <p style="color: #4b5563; line-height: 1.6; margin: 0; font-size: 0.95rem;">${example.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="implementation-guidance" style="margin-bottom: 30px;">
                <h3 style="color: #1f2937; font-size: 1.3rem; margin: 0 0 16px 0;">Implementation Guidance</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
                    ${data.guidance.map(guide => `
                        <div style="padding: 16px; background: #fef3c7; border-radius: 6px; border-left: 3px solid #f59e0b;">
                            <p style="margin: 0; color: #92400e; font-size: 0.95rem; line-height: 1.5;">${guide}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="expected-impact" style="padding: 24px; background: linear-gradient(135deg, ${data.color}15, ${data.color}08); border-radius: 8px; border: 1px solid ${data.color}30;">
                <h3 style="color: #1f2937; font-size: 1.3rem; margin: 0 0 16px 0; display: flex; align-items: center;">
                    <span style="margin-right: 8px;">🎯</span>
                    Expected Impact
                </h3>
                <p style="color: #374151; font-size: 1.05rem; line-height: 1.6; margin: 0; font-weight: 500;">${data.impact}</p>
            </div>
        </div>
    `;
}

// Enhanced SAMR Tool Implementation
function initEnhancedSamrTool() {
    const form = document.getElementById('samr-enhanced-form');
    if (!form) return;

    let currentStep = 1;
    const totalSteps = 5;

    // Navigation elements
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    // Progress indicators
    const progressSteps = document.querySelectorAll('.progress-step');
    const formSteps = document.querySelectorAll('.form-step');

    // Initialize first step
    showStep(1);

    // Navigation event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (validateCurrentStep()) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    showStep(currentStep);
                }
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (validateCurrentStep()) {
                generateEnhancedSamrResults();
            }
        });
    }

    // Show/hide curriculum details based on selection
    const curriculumSelect = document.getElementById('curriculum-framework');
    if (curriculumSelect) {
        curriculumSelect.addEventListener('change', function() {
            const detailsDiv = document.getElementById('curriculum-details');
            if (this.value && this.value !== '') {
                detailsDiv.style.display = 'block';
            } else {
                detailsDiv.style.display = 'none';
            }
        });
    }

    function showStep(step) {
        // Update progress indicators
        progressSteps.forEach((progressStep, index) => {
            const stepNumber = index + 1;
            if (stepNumber < step) {
                progressStep.classList.add('completed');
                progressStep.classList.remove('active');
            } else if (stepNumber === step) {
                progressStep.classList.add('active');
                progressStep.classList.remove('completed');
            } else {
                progressStep.classList.remove('active', 'completed');
            }
        });

        // Show/hide form steps
        formSteps.forEach((formStep, index) => {
            const stepNumber = index + 1;
            if (stepNumber === step) {
                formStep.classList.add('active');
            } else {
                formStep.classList.remove('active');
            }
        });

        // Update navigation buttons
        if (prevBtn) {
            prevBtn.style.display = step > 1 ? 'inline-flex' : 'none';
        }
        
        if (step < totalSteps) {
            if (nextBtn) {
                nextBtn.style.display = 'inline-flex';
            }
            if (submitBtn) {
                submitBtn.style.display = 'none';
            }
        } else {
            if (nextBtn) {
                nextBtn.style.display = 'none';
            }
            if (submitBtn) {
                submitBtn.style.display = 'inline-flex';
            }
        }
    }

    function validateCurrentStep() {
        const currentStepElement = document.getElementById(`step-${currentStep}`);
        if (!currentStepElement) return false;

        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });

        // Special validation for checkboxes in step 3
        if (currentStep === 3) {
            const deviceAccess = currentStepElement.querySelectorAll('input[name="device-access"]:checked');
            const platforms = currentStepElement.querySelectorAll('input[name="platforms"]:checked');
            
            if (deviceAccess.length === 0) {
                alert('Please select at least one option for student device access.');
                return false;
            }
            if (platforms.length === 0) {
                alert('Please select at least one platform or software option.');
                return false;
            }
        }

        if (!isValid) {
            alert('Please fill in all required fields before proceeding.');
        }

        return isValid;
    }
}

function generateEnhancedSamrResults() {
    // Collect all form data
    const formData = collectEnhancedFormData();
    
    // Show loading state
    const form = document.getElementById('samr-enhanced-form');
    const results = document.getElementById('samr-enhanced-results');
    
    if (form) form.style.display = 'none';
    if (results) {
        results.style.display = 'block';
        
        // Save original content
        const originalContent = results.innerHTML;
        
        // Show loading spinner
        results.innerHTML = '<div class="loading-state"><div class="spinner"></div><p>Generating your personalized SAMR roadmap...</p></div>';
    
        // Simulate processing time (use actual generation in production)
        setTimeout(() => {
            try {
                const report = generatePersonalizedReport(formData);
                displayEnhancedResults(report, formData);
            } catch (error) {
                console.error("Error generating report:", error);
                // Restore original content and show error message
                results.innerHTML = originalContent;
                showErrorMessage("We encountered an issue generating your report. Please try again.");
            }
        }, 2000);
    }
}

function showErrorMessage(message) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-message';
    errorContainer.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
            <button class="close-message">Try Again</button>
        </div>
    `;
    
    // Add styles
    errorContainer.style.position = 'fixed';
    errorContainer.style.top = '50%';
    errorContainer.style.left = '50%';
    errorContainer.style.transform = 'translate(-50%, -50%)';
    errorContainer.style.backgroundColor = '#fff';
    errorContainer.style.color = '#e11d48';
    errorContainer.style.padding = '25px 30px';
    errorContainer.style.borderRadius = '8px';
    errorContainer.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    errorContainer.style.zIndex = '9999';
    errorContainer.style.border = '2px solid #e11d48';
    errorContainer.style.maxWidth = '400px';
    errorContainer.style.textAlign = 'center';
    
    // Style the icon
    const icon = errorContainer.querySelector('i');
    icon.style.fontSize = '48px';
    icon.style.marginBottom = '15px';
    
    // Style the button
    const button = errorContainer.querySelector('button');
    button.style.marginTop = '15px';
    button.style.padding = '8px 16px';
    button.style.backgroundColor = '#2563eb';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
    
    // Add to document
    document.body.appendChild(errorContainer);
    
    // Darken the background
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.zIndex = '9998';
    document.body.appendChild(overlay);
    
    // Close button functionality
    button.addEventListener('click', function() {
        document.body.removeChild(errorContainer);
        document.body.removeChild(overlay);
        
        // Reset form to visible and results to hidden
        const form = document.getElementById('samr-enhanced-form');
        const results = document.getElementById('samr-enhanced-results');
        
        if (form) form.style.display = 'block';
        if (results) results.style.display = 'none';
    });
}

function collectEnhancedFormData() {
    const formData = {};
    
    // Step 1: Teaching Context
    formData.gradeLevel = document.getElementById('grade-level-enhanced')?.value || '';
    formData.subjectArea = document.getElementById('subject-area')?.value || '';
    formData.currentUnit = document.getElementById('current-unit')?.value || '';
    formData.learningGoals = document.getElementById('learning-goals')?.value || '';
    
    // Step 2: Curriculum Framework
    formData.curriculumFramework = document.getElementById('curriculum-framework')?.value || '';
    formData.curriculumSpecifics = document.getElementById('curriculum-specifics')?.value || '';
    
    // Step 3: Technology Access
    formData.deviceAccess = Array.from(document.querySelectorAll('input[name="device-access"]:checked')).map(cb => cb.value);
    formData.platforms = Array.from(document.querySelectorAll('input[name="platforms"]:checked')).map(cb => cb.value);
    formData.aiTools = Array.from(document.querySelectorAll('input[name="ai-tools"]:checked')).map(cb => cb.value);
    formData.classroomTech = Array.from(document.querySelectorAll('input[name="classroom-tech"]:checked')).map(cb => cb.value);
    
    // Step 4: Current Practice
    formData.currentSamrLevel = document.getElementById('current-samr-level')?.value || '';
    formData.challenges = Array.from(document.querySelectorAll('input[name="challenges"]:checked')).map(cb => cb.value);
    formData.integrationGoals = document.getElementById('integration-goals')?.value || '';
    
    // Step 5: School Context
    formData.isteLevel = document.getElementById('iste-level')?.value || '';
    formData.cbamConcerns = document.getElementById('cbam-concerns')?.value || '';
    formData.additionalContext = document.getElementById('additional-context')?.value || '';
    
    return formData;
}

function generatePersonalizedReport(formData) {
    const report = {
        currentState: generateCurrentStateAnalysis(formData),
        personalizedLadder: generatePersonalizedLadder(formData),
        curriculumRecommendations: generateCurriculumRecommendations(formData),
        technologySuggestions: generateTechnologySuggestions(formData),
        implementationTimeline: generateImplementationTimeline(formData),
        frameworkConnections: generateFrameworkConnections(formData)
    };
    
    return report;
}

function generateCurrentStateAnalysis(formData) {
    let analysis = `<div class="current-state-analysis">`;
    
    analysis += `<h5>Your Teaching Profile</h5>`;
    analysis += `<p>You are teaching <strong>${formData.subjectArea}</strong> to <strong>${formData.gradeLevel}</strong> students within the <strong>${formData.curriculumFramework}</strong> framework.</p>`;
    
    if (formData.currentUnit) {
        analysis += `<p><strong>Current Focus:</strong> ${formData.currentUnit}</p>`;
    }
    
    if (formData.learningGoals) {
        analysis += `<p><strong>Learning Goals:</strong> ${formData.learningGoals}</p>`;
    }
    
    analysis += `<h5>Technology Readiness Assessment</h5>`;
    
    // Device access analysis
    if (formData.deviceAccess.includes('1:1 iPads') || formData.deviceAccess.includes('1:1 Chromebooks') || formData.deviceAccess.includes('1:1 Laptops')) {
        analysis += `<p><strong>Device Access:</strong> ✅ Excellent - You have 1:1 device access, which provides a strong foundation for technology integration at all SAMR levels.</p>`;
    } else if (formData.deviceAccess.includes('Shared Device Cart')) {
        analysis += `<p><strong>Device Access:</strong> ⚠️ Good - Shared devices can support most SAMR levels with proper planning and scheduling.</p>`;
    } else {
        analysis += `<p><strong>Device Access:</strong> ⚠️ Limited - Consider strategies that work with limited device access, focusing on teacher-led demonstrations and collaborative activities.</p>`;
    }
    
    // Current SAMR level analysis
    const samrLevelDescriptions = {
        'Substitution': 'You\'re at the foundational level where technology replaces traditional tools. This is a great starting point, and there are clear pathways to move up the ladder.',
        'Augmentation': 'You\'re using technology to enhance traditional activities. You\'re ready to explore how to redesign learning tasks for greater impact.',
        'Modification': 'You\'re at the transformation threshold, redesigning learning activities. You\'re positioned to explore new possibilities that were impossible without technology.',
        'Redefinition': 'You\'re creating transformative learning experiences. Focus on refining these practices and sharing your expertise with colleagues.',
        'Mixed': 'You\'re using different SAMR levels for different activities, which shows flexibility. We\'ll help you identify opportunities to move more activities up the ladder.',
        'Unsure': 'Understanding where you are is the first step to growth. This assessment will help clarify your current practices and next steps.'
    };
    
    analysis += `<p><strong>Current SAMR Level:</strong> ${samrLevelDescriptions[formData.currentSamrLevel] || 'Assessment will help determine your level.'}</p>`;
    
    // Challenges analysis
    if (formData.challenges.length > 0) {
        analysis += `<h5>Identified Challenges</h5>`;
        analysis += `<p>Your main challenges are: ${formData.challenges.join(', ')}. Our recommendations will specifically address these areas.</p>`;
    }
    
    analysis += `</div>`;
    return analysis;
}

function generatePersonalizedLadder(formData) {
    let ladder = `<div class="personalized-ladder">`;
    
    // Create a visual ladder with specific examples for their context
    const levels = ['Redefinition', 'Modification', 'Augmentation', 'Substitution'];
    const examples = generateContextualExamples(formData);
    
    levels.forEach((level, index) => {
        const isCurrentLevel = formData.currentSamrLevel === level;
        const levelClass = level.toLowerCase();
        
        ladder += `<div class="ladder-level-personalized ${levelClass} ${isCurrentLevel ? 'current-level' : ''}">`;
        ladder += `<div class="level-header">`;
        ladder += `<h5>${level}</h5>`;
        if (isCurrentLevel) {
            ladder += `<span class="current-badge">You are here</span>`;
        }
        ladder += `</div>`;
        ladder += `<div class="level-examples">`;
        ladder += `<h6>For ${formData.subjectArea} - ${formData.gradeLevel}:</h6>`;
        ladder += `<ul>`;
        examples[levelClass].forEach(example => {
            ladder += `<li>${example}</li>`;
        });
        ladder += `</ul>`;
        ladder += `</div>`;
        ladder += `</div>`;
    });
    
    ladder += `</div>`;
    return ladder;
}

function generateContextualExamples(formData) {
    // Generate specific examples based on subject area and grade level
    const subject = formData.subjectArea;
    const grade = formData.gradeLevel;
    const hasAI = formData.aiTools.includes('ChatGPT/Claude') || formData.aiTools.includes('SchoolAI');
    const hasVR = formData.aiTools.includes('VR/AR');
    const hasCollaboration = formData.platforms.includes('Google Workspace') || formData.platforms.includes('Microsoft 365');
    
    const examples = {
        substitution: [],
        augmentation: [],
        modification: [],
        redefinition: []
    };
    
    // Subject-specific examples
    if (subject.includes('Mathematics')) {
        examples.substitution.push('Using digital worksheets instead of paper', 'Typing math problems in Google Docs');
        examples.augmentation.push('Interactive math apps with immediate feedback', 'Graphing calculators with real-time visualization');
        examples.modification.push('Creating multimedia math tutorials for other students', 'Collaborative problem-solving with shared digital workspaces');
        examples.redefinition.push('Students design and code their own math learning games', 'Virtual math modeling of real-world engineering projects');
        
        if (hasAI) {
            examples.modification.push('Using AI to explore "what if" scenarios in mathematical modeling');
            examples.redefinition.push('Students create AI-powered math tutoring systems for younger students');
        }
    } else if (subject.includes('Science')) {
        examples.substitution.push('Reading digital textbooks instead of printed ones', 'Taking notes on tablets');
        examples.augmentation.push('Virtual lab simulations with immediate data analysis', 'Real-time data collection with sensor apps');
        examples.modification.push('Creating interactive science explanations with multimedia', 'Collaborative research projects with global classrooms');
        examples.redefinition.push('Contributing data to real scientific research projects', 'Designing virtual experiments impossible in physical labs');
        
        if (hasVR) {
            examples.modification.push('Exploring molecular structures in VR environments');
            examples.redefinition.push('Creating immersive experiences of microscopic or cosmic phenomena');
        }
    } else if (subject.includes('Language Arts')) {
        examples.substitution.push('Writing essays in word processors', 'Reading e-books instead of physical books');
        examples.augmentation.push('Collaborative writing with real-time editing and comments', 'Voice recording for pronunciation practice');
        examples.modification.push('Creating multimedia storytelling projects', 'Connecting with authors or experts via video conferencing');
        examples.redefinition.push('Publishing student work for authentic global audiences', 'Creating interactive choose-your-own-adventure stories');
        
        if (hasAI) {
            examples.modification.push('Using AI as a writing coach for brainstorming and feedback');
            examples.redefinition.push('Creating AI-assisted poetry that explores human-machine collaboration');
        }
    }
    
    // Add generic examples if subject-specific ones are insufficient
    if (examples.redefinition.length < 2) {
        examples.redefinition.push('Global collaboration on real-world problems', 'Creating authentic products for real audiences');
    }
    
    return examples;
}

function generateCurriculumRecommendations(formData) {
    let recommendations = `<div class="curriculum-recommendations">`;
    
    const framework = formData.curriculumFramework;
    
    if (framework.includes('International Baccalaureate')) {
        recommendations += `<h5>IB-Specific Integration Strategies</h5>`;
        recommendations += `<div class="ib-connections">`;
        recommendations += `<p><strong>Inquiry-Based Learning:</strong> Use technology to support student-driven investigations. Digital tools can help students formulate questions, gather evidence, and present findings in innovative ways.</p>`;
        recommendations += `<p><strong>ATL Skills Development:</strong> Technology integration naturally develops Approaches to Learning skills:</p>`;
        recommendations += `<ul>`;
        recommendations += `<li><strong>Communication:</strong> Digital storytelling, multimedia presentations, global collaborations</li>`;
        recommendations += `<li><strong>Critical Thinking:</strong> Data analysis tools, AI-assisted research validation, digital debate platforms</li>`;
        recommendations += `<li><strong>Research:</strong> Advanced search strategies, digital source evaluation, collaborative research projects</li>`;
        recommendations += `<li><strong>Self-Management:</strong> Digital planning tools, learning analytics dashboards, reflection blogs</li>`;
        recommendations += `</ul>`;
        recommendations += `<p><strong>Conceptual Understanding:</strong> Use technology to explore big ideas across subjects - interactive models, simulations, and global perspectives.</p>`;
        recommendations += `</div>`;
    } else if (framework.includes('Cambridge')) {
        recommendations += `<h5>Cambridge International Integration</h5>`;
        recommendations += `<p>Focus on developing 21st-century skills through technology while maintaining rigorous academic standards. Use digital tools to support critical thinking, problem-solving, and global awareness.</p>`;
    } else if (framework.includes('Common Core')) {
        recommendations += `<h5>Common Core Alignment</h5>`;
        recommendations += `<p>Technology integration should support the shift toward deeper learning, critical thinking, and authentic problem-solving emphasized in Common Core standards.</p>`;
    }
    
    // Add specific recommendations based on current unit
    if (formData.currentUnit) {
        recommendations += `<h5>Specific Recommendations for: "${formData.currentUnit}"</h5>`;
        recommendations += generateUnitSpecificRecommendations(formData);
    }
    
    recommendations += `</div>`;
    return recommendations;
}

function generateUnitSpecificRecommendations(formData) {
    const unit = formData.currentUnit.toLowerCase();
    let recommendations = '<div class="unit-specific">';
    
    // Look for keywords in the unit description
    if (unit.includes('fraction') || unit.includes('math')) {
        recommendations += '<p><strong>Visual Fraction Tools:</strong> Use apps like Fraction Bars or Virtual Manipulatives to help students visualize fraction concepts.</p>';
        recommendations += '<p><strong>Real-World Applications:</strong> Have students use fractions in cooking videos or construction projects they document and share.</p>';
    } else if (unit.includes('civil war') || unit.includes('history')) {
        recommendations += '<p><strong>Primary Source Analysis:</strong> Use digital archives to analyze historical documents and create multimedia timelines.</p>';
        recommendations += '<p><strong>Virtual Field Trips:</strong> Connect with historical sites or museums virtually to bring history to life.</p>';
    } else if (unit.includes('scientific method') || unit.includes('experiment')) {
        recommendations += '<p><strong>Digital Lab Notebooks:</strong> Use collaborative platforms for documenting experiments and sharing results.</p>';
        recommendations += '<p><strong>Data Analysis Tools:</strong> Introduce students to real scientific data analysis software appropriate for their level.</p>';
    }
    
    recommendations += '</div>';
    return recommendations;
}

function generateTechnologySuggestions(formData) {
    let suggestions = `<div class="technology-suggestions">`;
    
    // Immediate Implementation (What they can do this week)
    suggestions += `<h5>🚀 Immediate Implementation (This Week)</h5>`;
    suggestions += `<div class="immediate-suggestions">`;
    
    if (formData.platforms.includes('Google Workspace')) {
        suggestions += `<div class="suggestion-item">`;
        suggestions += `<h6>Google Workspace Enhancement</h6>`;
        suggestions += `<p>Enable collaborative editing in Google Docs for peer feedback on writing assignments. Add voice comments for more personal feedback.</p>`;
        suggestions += `<p><strong>SAMR Level:</strong> Augmentation → Modification</p>`;
        suggestions += `</div>`;
    }
    
    if (formData.deviceAccess.some(device => device.includes('iPad') || device.includes('tablet'))) {
        suggestions += `<div class="suggestion-item">`;
        suggestions += `<h6>Interactive Content Creation</h6>`;
        suggestions += `<p>Use built-in camera/video tools to have students create explanation videos of key concepts rather than written summaries.</p>`;
        suggestions += `<p><strong>SAMR Level:</strong> Substitution → Augmentation</p>`;
        suggestions += `</div>`;
    }
    
    suggestions += `</div>`;
    
    // Short-term Goals (Next month)
    suggestions += `<h5>📈 Short-term Goals (Next Month)</h5>`;
    suggestions += `<div class="short-term-suggestions">`;
    
    if (formData.aiTools.includes('ChatGPT/Claude')) {
        suggestions += `<div class="suggestion-item">`;
        suggestions += `<h6>AI as Learning Partner</h6>`;
        suggestions += `<p>Introduce students to using AI for brainstorming and research validation, teaching them to think critically about AI responses.</p>`;
        suggestions += `<p><strong>SAMR Level:</strong> Modification → Redefinition</p>`;
        suggestions += `</div>`;
    }
    
    suggestions += `<div class="suggestion-item">`;
    suggestions += `<h6>Global Connections</h6>`;
    suggestions += `<p>Set up video exchanges with classrooms in other countries related to your current unit of study.</p>`;
    suggestions += `<p><strong>SAMR Level:</strong> Modification → Redefinition</p>`;
    suggestions += `</div>`;
    
    suggestions += `</div>`;
    
    // Long-term Vision (This semester)
    suggestions += `<h5>🎯 Long-term Vision (This Semester)</h5>`;
    suggestions += `<div class="long-term-suggestions">`;
    
    suggestions += `<div class="suggestion-item">`;
    suggestions += `<h6>Authentic Audience Projects</h6>`;
    suggestions += `<p>Design a project where student work addresses real community needs and reaches genuine audiences beyond the classroom.</p>`;
    suggestions += `<p><strong>SAMR Level:</strong> Redefinition</p>`;
    suggestions += `</div>`;
    
    suggestions += `</div>`;
    
    suggestions += `</div>`;
    return suggestions;
}

function generateImplementationTimeline(formData) {
    let timeline = `<div class="implementation-timeline">`;
    
    const weeks = [
        {
            title: "Week 1-2: Foundation Building",
            activities: [
                "Assess current technology use and identify one tool to enhance",
                "Enable collaborative features in existing platforms",
                "Introduce students to digital citizenship expectations"
            ]
        },
        {
            title: "Week 3-4: Enhancement Focus",
            activities: [
                "Add multimedia elements to one traditional assignment",
                "Implement peer feedback systems using digital tools",
                "Begin using immediate feedback features in learning platforms"
            ]
        },
        {
            title: "Week 5-8: Transformation Exploration",
            activities: [
                "Design one collaborative project with authentic audiences",
                "Experiment with student choice in demonstration of learning",
                "Connect with experts or other classrooms virtually"
            ]
        },
        {
            title: "Week 9-12: Innovation and Reflection",
            activities: [
                "Implement one completely new learning experience enabled by technology",
                "Document and share successes with colleagues",
                "Plan next semester's technology integration goals"
            ]
        }
    ];
    
    weeks.forEach(week => {
        timeline += `<div class="timeline-item">`;
        timeline += `<h6>${week.title}</h6>`;
        timeline += `<ul>`;
        week.activities.forEach(activity => {
            timeline += `<li>${activity}</li>`;
        });
        timeline += `</ul>`;
        timeline += `</div>`;
    });
    
    timeline += `</div>`;
    return timeline;
}

function generateFrameworkConnections(formData) {
    let connections = `<div class="framework-connections">`;
    
    connections += `<h5>ISTE Essential Conditions Alignment</h5>`;
    
    // Provide specific recommendations based on their ISTE level
    const isteLevel = formData.isteLevel;
    if (isteLevel === 'Strong Foundation') {
        connections += `<p>With strong ISTE foundations, you're well-positioned to pursue Modification and Redefinition level activities. Focus on:</p>`;
        connections += `<ul><li>Leveraging your robust infrastructure for innovative projects</li><li>Sharing your expertise with other educators</li><li>Pushing the boundaries of what's possible in your context</li></ul>`;
    } else if (isteLevel === 'Developing') {
        connections += `<p>Your developing ISTE conditions suggest focusing on strengthening foundations while gradually moving up SAMR levels:</p>`;
        connections += `<ul><li>Advocate for professional development in areas where you need support</li><li>Start with Augmentation-level activities that don't require extensive infrastructure</li><li>Document successes to build support for further investment</li></ul>`;
    } else {
        connections += `<p>Building stronger ISTE conditions will support your SAMR progression:</p>`;
        connections += `<ul><li>Focus on Substitution and Augmentation activities while building infrastructure</li><li>Connect with colleagues and administrators about technology integration vision</li><li>Seek professional development opportunities</li></ul>`;
    }
    
    connections += `<h5>CBAM Concerns & Support</h5>`;
    
    // Provide support based on their CBAM profile
    const cbamProfile = formData.cbamConcerns;
    if (cbamProfile === 'Innovator') {
        connections += `<p>As an innovator, you're ready to explore Redefinition-level activities. Consider:</p>`;
        connections += `<ul><li>Documenting your experiments to help more cautious colleagues</li><li>Seeking leadership roles in technology integration</li><li>Connecting with other innovators for inspiration and collaboration</li></ul>`;
    } else if (cbamProfile === 'Pragmatic') {
        connections += `<p>Your pragmatic approach is perfect for systematic SAMR progression:</p>`;
        connections += `<ul><li>Start with Augmentation activities with clear learning benefits</li><li>Build confidence through small successes before bigger changes</li><li>Seek evidence-based resources and peer examples</li></ul>`;
    } else if (cbamProfile === 'Skeptical') {
        connections += `<p>Your concerns are valid and can guide thoughtful technology integration:</p>`;
        connections += `<ul><li>Begin with technology that clearly enhances existing successful practices</li><li>Focus on tools that save time or improve student outcomes</li><li>Connect with colleagues who share similar teaching philosophies</li></ul>`;
    }
    
    connections += `</div>`;
    return connections;
}

function displayEnhancedResults(report, formData) {
    const resultsContainer = document.getElementById('samr-enhanced-results');
    if (!resultsContainer) return;
    
    // Update summary
    document.getElementById('summary-context').textContent = `${formData.gradeLevel} ${formData.subjectArea}`;
    document.getElementById('summary-curriculum').textContent = formData.curriculumFramework;
    document.getElementById('summary-samr-level').textContent = formData.currentSamrLevel;
    
    // Display content sections
    document.getElementById('current-state-content').innerHTML = report.currentState;
    document.getElementById('personalized-samr-ladder').innerHTML = report.personalizedLadder;
    document.getElementById('curriculum-recommendations').innerHTML = report.curriculumRecommendations;
    document.getElementById('technology-suggestions').innerHTML = report.technologySuggestions;
    document.getElementById('implementation-timeline').innerHTML = report.implementationTimeline;
    document.getElementById('framework-connections').innerHTML = report.frameworkConnections;
    
    // Setup export functionality
    setupEnhancedExportFunctionality(formData, report);
    
    // Setup reset functionality
    const resetBtn = document.getElementById('reset-enhanced-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetEnhancedAssessment();
        });
    }
}

function setupEnhancedExportFunctionality(formData, report) {
    const exportButtons = {
        'export-enhanced-pdf': 'pdf',
        'export-enhanced-doc': 'doc',
        'export-enhanced-ppt': 'ppt',
        'export-enhanced-gdoc': 'gdoc'
    };
    
    Object.entries(exportButtons).forEach(([buttonId, format]) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', function() {
                exportEnhancedReport(formData, report, format);
            });
        }
    });
}

function exportEnhancedReport(formData, report, format) {
    // Generate comprehensive report content
    const reportContent = generateExportContent(formData, report);
    
    // Handle different export formats
    switch (format) {
        case 'pdf':
            exportAsPDF(reportContent, 'Enhanced-SAMR-Assessment-Report.pdf');
            break;
        case 'doc':
            exportAsWord(reportContent, 'Enhanced-SAMR-Assessment-Report.docx');
            break;
        case 'ppt':
            exportAsPresentation(formData, report);
            break;
        case 'gdoc':
            exportToGoogleDocs(reportContent);
            break;
    }
}

function generateExportContent(formData, report) {
    let content = `# Personalized SAMR Integration Roadmap\n\n`;
    content += `**Generated on:** ${new Date().toLocaleDateString()}\n\n`;
    
    content += `## Your Teaching Profile\n`;
    content += `- **Grade Level:** ${formData.gradeLevel}\n`;
    content += `- **Subject Area:** ${formData.subjectArea}\n`;
    content += `- **Curriculum Framework:** ${formData.curriculumFramework}\n`;
    content += `- **Current Focus:** ${formData.currentUnit}\n`;
    content += `- **Current SAMR Level:** ${formData.currentSamrLevel}\n\n`;
    
    content += `## Assessment Results\n`;
    content += `${report.currentState}\n\n`;
    
    content += `## Personalized Recommendations\n`;
    content += `${report.curriculumRecommendations}\n\n`;
    
    content += `## Technology Integration Strategies\n`;
    content += `${report.technologySuggestions}\n\n`;
    
    content += `## Implementation Timeline\n`;
    content += `${report.implementationTimeline}\n\n`;
    
    content += `## Framework Connections\n`;
    content += `${report.frameworkConnections}\n\n`;
    
    return content;
}

function resetEnhancedAssessment() {
    // Hide results and show form
    const form = document.getElementById('samr-enhanced-form');
    const results = document.getElementById('samr-enhanced-results');
    
    if (form) form.style.display = 'block';
    if (results) results.style.display = 'none';
    
    // Reset form
    const formElement = document.querySelector('#samr-enhanced-form form') || document.getElementById('samr-enhanced-form');
    if (formElement) {
        formElement.reset();
    }
    
    // Reset to first step
    // This would need to be implemented based on the specific form structure
}

// Export helper functions (improved versions)
function exportAsPDF(content, filename) {
    // Use the main PDF export function if available
    if (window.exportElementToPDF) {
        // Create a temporary element with the content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = convertContentToHTML(content);
        tempDiv.style.cssText = `
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 20px;
            background: white;
        `;
        
        // Temporarily add to document for proper rendering
        document.body.appendChild(tempDiv);
        
        // Use the improved PDF export function
        window.exportElementToPDF(tempDiv, filename).then(() => {
            // Clean up
            if (tempDiv.parentNode) {
                tempDiv.parentNode.removeChild(tempDiv);
            }
            showExportSuccessMessage('PDF');
        }).catch(() => {
            // Clean up on error
            if (tempDiv.parentNode) {
                tempDiv.parentNode.removeChild(tempDiv);
            }
            showExportSuccessMessage('PDF export failed. Please try again.');
        });
    } else {
        // Fallback method
        const reportHtml = convertContentToHTML(content);
        const blob = new Blob([reportHtml], {type: 'text/html'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename.replace('.pdf', '.html');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showExportSuccessMessage('HTML file downloaded (PDF library not available)');
    }
}

function exportAsWord(content, filename) {
    // Create a blob with Word compatible HTML
    const reportHtml = convertContentToHTML(content);
    const blob = new Blob([reportHtml], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
    
    // Create download link and trigger it
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    showExportSuccessMessage('Word');
}

function exportAsPresentation(formData, report) {
    // Create a PowerPoint compatible HTML content
    const presentationHtml = convertToPresentationHTML(formData, report);
    const blob = new Blob([presentationHtml], {type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'});
    
    // Create download link and trigger it
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Enhanced-SAMR-Assessment-Presentation.pptx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    showExportSuccessMessage('PowerPoint');
}

function exportToGoogleDocs(content) {
    // Create exportable content
    const reportHtml = convertContentToHTML(content);
    const docTitle = `SAMR-Assessment-Report-${new Date().toISOString().split('T')[0]}`;
    
    // Try to copy content to clipboard first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        // Create plain text version for clipboard
        const plainText = convertHTMLToPlainText(reportHtml);
        
        navigator.clipboard.writeText(plainText).then(() => {
            // Open Google Docs with title parameter
            const googleDocsUrl = `https://docs.google.com/document/create?title=${encodeURIComponent(docTitle)}`;
            const newWindow = window.open(googleDocsUrl, '_blank');
            
            if (newWindow) {
                showExportSuccessMessage('Google Docs opened! Content copied to clipboard - paste it (Ctrl+V) into the new document.');
            } else {
                showExportSuccessMessage('Content copied to clipboard! Please open Google Docs and paste (Ctrl+V) to create your document.');
            }
        }).catch(() => {
            // Fallback to file download
            exportGoogleDocsFallback(reportHtml, docTitle);
        });
    } else {
        // Fallback to file download
        exportGoogleDocsFallback(reportHtml, docTitle);
    }
}

function exportGoogleDocsFallback(reportHtml, docTitle) {
    // Create a blob and download it as an HTML file that Google Docs can import
    const blob = new Blob([reportHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `${docTitle}.html`;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
    
    showExportSuccessMessage('HTML file downloaded! To create a Google Doc: 1) Go to Google Drive, 2) Upload this file, 3) Right-click and "Open with Google Docs"');
    
    // Open Google Drive for convenience
    setTimeout(() => {
        window.open('https://drive.google.com/drive/my-drive', '_blank');
    }, 1500);
}

function convertHTMLToPlainText(html) {
    // Create a temporary div to convert HTML to plain text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Process headers and structure
    const headers = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headers.forEach(header => {
        const level = header.tagName.charAt(1);
        const prefix = '#'.repeat(parseInt(level));
        header.innerHTML = `${prefix} ${header.textContent}\n\n`;
    });
    
    // Process lists
    const lists = tempDiv.querySelectorAll('ul, ol');
    lists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            const bullet = list.tagName === 'UL' ? '• ' : `${index + 1}. `;
            item.innerHTML = `${bullet}${item.textContent}\n`;
        });
    });
    
    // Get text content and clean it up
    return tempDiv.textContent
        .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove excessive line breaks
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim();
}

function convertContentToHTML(content) {
    // Convert markdown-like content to HTML
    let html = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>SAMR Assessment Report</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            h1 { color: #2563eb; }
            h2 { color: #1e40af; margin-top: 1.5em; }
            h3 { color: #1e3a8a; }
            .section { margin-bottom: 2em; }
            .recommendations li { margin-bottom: 0.5em; }
            .timeline { display: flex; flex-direction: column; }
            .timeline-item { margin-bottom: 1em; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f7ff; }
        </style>
    </head>
    <body>
        <div class="report-container">`;
    
    // Parse and convert the content (simplified)
    const contentLines = content.split('\n');
    contentLines.forEach(line => {
        if (line.startsWith('# ')) {
            html += `<h1>${line.substring(2)}</h1>`;
        } else if (line.startsWith('## ')) {
            html += `<h2>${line.substring(3)}</h2>`;
        } else if (line.startsWith('- **')) {
            // Handle list items with bold text
            const boldEnd = line.indexOf(':**');
            if (boldEnd > 0) {
                const boldText = line.substring(3, boldEnd);
                const restText = line.substring(boldEnd + 3);
                html += `<p><strong>${boldText}:</strong>${restText}</p>`;
            } else {
                html += `<p>${line.substring(2)}</p>`;
            }
        } else if (line.startsWith('- ')) {
            html += `<ul><li>${line.substring(2)}</li></ul>`;
        } else if (line.trim() === '') {
            html += '<br>';
        } else {
            html += `<p>${line}</p>`;
        }
    });
    
    html += `
        </div>
    </body>
    </html>`;
    
    return html;
}

function convertToPresentationHTML(formData, report) {
    // Create a simple HTML structure that could be converted to PPT
    // In a real implementation, you would use a library to create actual PPTX
    let html = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>SAMR Assessment Presentation</title>
        <style>
            body { font-family: Arial, sans-serif; }
            .slide { page-break-after: always; height: 7.5in; padding: 0.5in; position: relative; }
            .slide-title { font-size: 28pt; color: #2563eb; margin-bottom: 0.5in; }
            .slide-content { font-size: 18pt; }
        </style>
    </head>
    <body>
        <!-- Title Slide -->
        <div class="slide">
            <h1 class="slide-title">Personalized SAMR Integration Roadmap</h1>
            <div class="slide-content">
                <p>For: ${formData.gradeLevel} ${formData.subjectArea}</p>
                <p>Using: ${formData.curriculumFramework}</p>
                <p>Generated: ${new Date().toLocaleDateString()}</p>
            </div>
        </div>
        
        <!-- Current State Slide -->
        <div class="slide">
            <h1 class="slide-title">Your Current Technology Integration</h1>
            <div class="slide-content">
                <p>Current SAMR Level: ${formData.currentSamrLevel}</p>
                <p>Focus Area: ${formData.currentUnit}</p>
            </div>
        </div>
        
        <!-- Recommendations Slide -->
        <div class="slide">
            <h1 class="slide-title">Personalized Recommendations</h1>
            <div class="slide-content">
                <ul>
                    <li>Start with ${formData.currentSamrLevel} activities and progress upward</li>
                    <li>Leverage existing technology: ${formData.platforms.join(', ')}</li>
                    <li>Focus on your specific curriculum needs</li>
                </ul>
            </div>
        </div>
        
        <!-- Implementation Timeline Slide -->
        <div class="slide">
            <h1 class="slide-title">Implementation Timeline</h1>
            <div class="slide-content">
                <p>Weeks 1-2: Foundation Building</p>
                <p>Weeks 3-4: Enhancement Focus</p>
                <p>Weeks 5-8: Transformation Exploration</p>
                <p>Weeks 9-12: Innovation and Reflection</p>
            </div>
        </div>
        
        <!-- Next Steps Slide -->
        <div class="slide">
            <h1 class="slide-title">Next Steps</h1>
            <div class="slide-content">
                <ol>
                    <li>Review your comprehensive report</li>
                    <li>Select one immediate implementation strategy</li>
                    <li>Schedule follow-up assessment in 6-8 weeks</li>
                </ol>
            </div>
        </div>
    </body>
    </html>`;
    
    return html;
}

function showExportSuccessMessage(format) {
    // Create and show a success message
    const messageContainer = document.createElement('div');
    messageContainer.className = 'export-success-message';
    messageContainer.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <p>Your report has been successfully exported as ${format}!</p>
            <button class="close-message">Close</button>
        </div>
    `;
    
    // Add styles
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '20px';
    messageContainer.style.right = '20px';
    messageContainer.style.backgroundColor = '#4ade80';
    messageContainer.style.color = 'white';
    messageContainer.style.padding = '15px 20px';
    messageContainer.style.borderRadius = '8px';
    messageContainer.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    messageContainer.style.zIndex = '9999';
    messageContainer.style.transition = 'all 0.3s ease';
    
    // Add to document
    document.body.appendChild(messageContainer);
    
    // Close button functionality
    const closeButton = messageContainer.querySelector('.close-message');
    closeButton.addEventListener('click', function() {
        document.body.removeChild(messageContainer);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(messageContainer)) {
            document.body.removeChild(messageContainer);
        }
    }, 5000);
}

// Original SAMR functionality (keeping for backward compatibility)
function initSamrTool() {
    const form = document.getElementById('samr-assessment-form');
    const customToolSelect = document.getElementById('technology-tool');
    const customToolContainer = document.getElementById('custom-tool-container');
    
    if (customToolSelect) {
        customToolSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customToolContainer.style.display = 'block';
            } else {
                customToolContainer.style.display = 'none';
            }
        });
    }
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            generateSamrResults();
        });
    }
}

function generateSamrResults() {
    // Original SAMR results generation
    const tool = document.getElementById('technology-tool')?.value;
    if (!tool) {
        alert('Please select a technology tool first.');
        return;
    }
    
    // Show results section
    const resultsSection = document.getElementById('samr-results');
    if (resultsSection) {
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // This would contain the original SAMR results logic
    console.log('Generating original SAMR results for:', tool);
}

window.resetSamrForm = function() {
    const form = document.getElementById('samr-assessment-form');
    const results = document.getElementById('samr-results');
    
    if (form) {
        form.reset();
    }
    if (results) {
        results.style.display = 'none';
    }
};