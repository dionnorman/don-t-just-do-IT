// Main JavaScript for Don't Just Do IT! website
// Demo account login function
function loginDemoAccount(role) {
    // Show loading state
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
    btn.disabled = true;
    
    // Simulate authentication process
    setTimeout(() => {
        // Show success message
        btn.innerHTML = '<i class="fas fa-check"></i> Login Successful';
        btn.style.background = '#10b981';
        
        setTimeout(() => {
            // Redirect to demo dashboard
            alert(`Demo login successful! You are now logged in as a ${role.charAt(0).toUpperCase() + role.slice(1)}.\n\nThis would redirect you to the appropriate dashboard with role-specific features and data.`);
            
            // Reset button
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.background = '';
        }, 2000);
    }, 1500);
}

// Pilot program form handler
function handlePilotForm() {
    const form = document.getElementById('pilotInterestForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.pilot-submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(form);
        const data = {};
        
        // Regular form fields
        for (let [key, value] of formData.entries()) {
            if (key === 'techInterest') {
                if (!data[key]) data[key] = [];
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }
        
        // Simulate email sending (in a real app, this would be a server endpoint)
        setTimeout(() => {
            // Show success message
            document.getElementById('formSuccess').style.display = 'block';
            form.style.display = 'none';
            
            // Log to console for demo purposes
            console.log('Pilot program interest submitted:', data);
            console.log('This would be sent to: dionnorman@gmail.com');
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                document.getElementById('formSuccess').style.display = 'none';
                form.style.display = 'block';
            }, 5000);
        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize pilot program form handler
    handlePilotForm();
    // Custom cursor
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover class to clickable elements for cursor effect
        const clickables = document.querySelectorAll('a, button, .btn, .tab, .foundation-block, .imperative-learn-more');
        clickables.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.backgroundColor = 'rgba(99, 102, 241, 0.2)';
                cursor.style.borderColor = 'transparent';
            });
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.borderColor = 'var(--primary)';
            });
        });
    }

    // Loading Screen
    const progressBar = document.querySelector('.progress-bar');
    
    if (progressBar) {
        // Simulate progress increment
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            progressBar.style.width = progress + '%';
            
            if (progress === 100) {
                clearInterval(progressInterval);
                
                // Wait a bit after progress reaches 100% before hiding the loading screen
                setTimeout(() => {
                    document.querySelector('.loading-screen').classList.add('loaded');
                }, 500);
            }
        }, 200);
    }
    
    // Foundation blocks interaction
    const foundationBlocks = document.querySelectorAll('.foundation-block');
    const buildingBlocks = document.querySelectorAll('.building-block');
    const tooltip = document.querySelector('.foundation-tooltip');

    // Cross-highlighting between foundation cards and building blocks
    function setupCrossHighlighting() {
        // Foundation block hover/click highlights corresponding building block
        foundationBlocks.forEach(foundationBlock => {
            const foundationType = foundationBlock.classList[1]; // vision-block, strategy-block, etc.
            const foundationKey = foundationType.replace('-block', ''); // vision, strategy, etc.
            
            foundationBlock.addEventListener('mouseenter', () => {
                highlightBuildingBlock(foundationKey);
            });
            
            foundationBlock.addEventListener('mouseleave', () => {
                clearBuildingBlockHighlight(foundationKey);
            });
        });
        
        // Building block hover/click highlights corresponding foundation block
        buildingBlocks.forEach(buildingBlock => {
            const foundationKey = buildingBlock.getAttribute('data-foundation');
            
            buildingBlock.addEventListener('mouseenter', () => {
                highlightFoundationBlock(foundationKey);
            });
            
            buildingBlock.addEventListener('mouseleave', () => {
                clearFoundationBlockHighlight(foundationKey);
            });
            
            buildingBlock.addEventListener('click', () => {
                scrollToFoundationBlock(foundationKey);
            });
        });
    }
    
    function highlightBuildingBlock(foundationKey) {
        const buildingBlock = document.querySelector(`[data-foundation="${foundationKey}"]`);
        if (buildingBlock) {
            buildingBlock.classList.add('highlighted');
        }
    }
    
    function clearBuildingBlockHighlight(foundationKey) {
        const buildingBlock = document.querySelector(`[data-foundation="${foundationKey}"]`);
        if (buildingBlock) {
            buildingBlock.classList.remove('highlighted');
        }
    }
    
    function highlightFoundationBlock(foundationKey) {
        const foundationBlock = document.querySelector(`.${foundationKey}-block`);
        if (foundationBlock) {
            foundationBlock.classList.add('highlighted');
        }
    }
    
    function clearFoundationBlockHighlight(foundationKey) {
        const foundationBlock = document.querySelector(`.${foundationKey}-block`);
        if (foundationBlock) {
            foundationBlock.classList.remove('highlighted');
        }
    }
    
    function scrollToFoundationBlock(foundationKey) {
        const foundationBlock = document.querySelector(`.${foundationKey}-block`);
        if (foundationBlock) {
            foundationBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                foundationBlock.classList.add('pulse-highlight');
                setTimeout(() => {
                    foundationBlock.classList.remove('pulse-highlight');
                }, 2000);
            }, 500);
        }
    }
    
    if (foundationBlocks.length > 0 && buildingBlocks.length > 0) {
        setupCrossHighlighting();
    }

    // Toggle foundation block details
    window.toggleBlockDetail = function(block) {
        // First hide any open details
        document.querySelectorAll('.foundation-block.active').forEach(activeBlock => {
            if (activeBlock !== block) {
                activeBlock.classList.remove('active');
            }
        });
        
        // Toggle the current block
        block.classList.toggle('active');
        
        // Show modal backdrop if any block is active
        const backdrop = document.querySelector('.foundation-modal-backdrop');
        if (backdrop) {
            if (document.querySelectorAll('.foundation-block.active').length > 0) {
                backdrop.style.display = 'block';
            } else {
                backdrop.style.display = 'none';
            }
        }
    };
    
    window.hideBlockDetail = function(block) {
        block.classList.remove('active');
        const backdrop = document.querySelector('.foundation-modal-backdrop');
        if (backdrop) {
            backdrop.style.display = 'none';
        }
    };
    
    // Close foundation details when clicking outside
    document.addEventListener('click', function(event) {
        // Skip if this is inside an imperative-details modal
        if (event.target.closest('.imperative-details')) {
            return;
        }
        
        if (!event.target.closest('.foundation-block') && !event.target.closest('.foundation-detail')) {
            document.querySelectorAll('.foundation-block.active').forEach(block => {
                block.classList.remove('active');
            });
            
            const backdrop = document.querySelector('.foundation-modal-backdrop');
            if (backdrop) {
                backdrop.style.display = 'none';
            }
        }
    });

    // Smooth scrolling navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // SAMR Ladder Interaction
    // OLD SAMR FUNCTIONS - DISABLED TO PREVENT CONFLICTS
    // These are left here for reference but are not active
    
    // Function to scroll to SAMR assessment
    window.scrollToSamrAssessment = function() {
        const assessmentSection = document.getElementById('samr-assessment-section');
        if (assessmentSection) {
            assessmentSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    };
    
    // OLD ESCAPE KEY HANDLER - DISABLED
    
    // Function to reset SAMR form
    window.resetSamrForm = function() {
        const form = document.getElementById('samr-assessment-form');
        const results = document.getElementById('samr-results');
        
        if (form) {
            form.reset();
            // Show custom tool container if "Other" was selected
            const customContainer = document.getElementById('custom-tool-container');
            if (customContainer) {
                customContainer.style.display = 'none';
            }
        }
        
        if (results) {
            results.classList.remove('active');
        }
        
        // Scroll back to the form
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    // Handle custom tool input visibility
    const technologyTool = document.getElementById('technology-tool');
    const customContainer = document.getElementById('custom-tool-container');
    
    if (technologyTool && customContainer) {
        technologyTool.addEventListener('change', function() {
            if (this.value === 'custom') {
                customContainer.style.display = 'block';
            } else {
                customContainer.style.display = 'none';
            }
        });
    }

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            // Save theme preference
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // Tech trend modals
    const trendElements = document.querySelectorAll('.landscape-element');
    const trendModals = document.querySelectorAll('.tech-trend-modal');
    const trendCloseButtons = document.querySelectorAll('.trend-modal-close');
    
    trendElements.forEach(element => {
        element.addEventListener('click', function() {
            const modalId = this.id + '-modal';
            const modal = document.getElementById(modalId);
            if (modal) {
                // Hide all other modals first
                trendModals.forEach(m => m.classList.remove('active'));
                
                // Show this modal
                modal.classList.add('active');
            }
        });
    });
    
    trendCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.tech-trend-modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Close tech trend modals when clicking outside
    document.addEventListener('click', function(event) {
        // Skip if this is inside an imperative-details modal
        if (event.target.closest('.imperative-details')) {
            return;
        }
        
        if (!event.target.closest('.landscape-element') && !event.target.closest('.trend-modal-content') && event.target.closest('.tech-trend-modal')) {
            trendModals.forEach(modal => modal.classList.remove('active'));
        }
    });
    
    // Predictions toggle
    const predictionToggleBtns = document.querySelectorAll('.toggle-button');
    const predictionContents = document.querySelectorAll('.predictions-content');
    
    predictionToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Remove active class from all buttons and contents
            predictionToggleBtns.forEach(b => b.classList.remove('active'));
            predictionContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            document.getElementById(view + '-view').classList.add('active');
        });
    });
    
    // Roadmap tabs
    const roadmapTabs = document.querySelectorAll('.roadmap-tabs .tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    roadmapTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            roadmapTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Strategic imperatives modals - Handled by separate script
    // The Strategic Imperatives functionality is now handled by js/strategic-imperatives-final.js
    
    // ISTE assessment toggling condition info - Enhanced fix
    const infoToggles = document.querySelectorAll('.info-toggle');
    
    infoToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const details = this.nextElementSibling;
            if (details && details.classList.contains('condition-details')) {
                // Remove 'hidden' class and add 'visible' class for proper display
                if (details.classList.contains('visible')) {
                    details.classList.remove('visible');
                    details.classList.add('hidden');
                    this.textContent = 'ℹ️ What does this look like in practice?';
                } else {
                    details.classList.remove('hidden');
                    details.classList.add('visible');
                    this.textContent = '↑ Hide details';
                }
                
                // Force display update
                details.style.display = details.classList.contains('visible') ? 'block' : 'none';
            }
        });
    });
    
    // Enhanced ISTE assessment submission with comprehensive reporting
    const isteAssessmentBtn = document.getElementById('iste-assessment-btn');
    if (isteAssessmentBtn) {
        isteAssessmentBtn.addEventListener('click', function() {
            const assessmentContainer = document.querySelector('#iste-tool .assessment-container');
            const resultElement = document.getElementById('iste-result');
            if (resultElement && assessmentContainer) {
                // Scroll to results section
                resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                resultElement.classList.remove('hidden');
                resultElement.querySelector('.loader').style.display = 'flex';
                
                // Collect form data directly from radio buttons
                const responses = {};
                
                // Get all radio button responses with corrected names
                const radioGroups = ['shared-vision', 'implementation', 'equitable-access', 'prepared-educators', 'technical-support', 'learning-content', 'ongoing-evaluation'];
                radioGroups.forEach(group => {
                    const radioButton = assessmentContainer.querySelector(`input[name="${group}"]:checked`);
                    responses[group] = radioButton ? parseInt(radioButton.value) : 0;
                });
                
                // Calculate scores and insights using global function
                console.log('Calling window.calculateIsteAssessment with responses:', responses);
                const assessment = window.calculateIsteAssessment(responses);
                
                // Simulate realistic loading
                setTimeout(() => {
                    resultElement.querySelector('.loader').style.display = 'none';
                    
                    // Generate comprehensive report using global function
                    console.log('Calling window.generateComprehensiveIsteReport');
                    const resultContent = window.generateComprehensiveIsteReport(assessment, responses);
                    resultElement.querySelector('.result-content').innerHTML = resultContent;
                    
                    // Setup export functionality using global function
                    console.log('Calling window.setupIsteExportHandlers');
                    window.setupIsteExportHandlers(assessment, responses);
                    
                }, 2500);
            }
        });
    }
    
    // Enhanced ISTE Assessment Calculator - Make globally accessible
    window.calculateIsteAssessment = function(responses) {
        const conditions = {
            'shared-vision': { 
                name: 'Shared Vision', 
                score: responses['shared-vision'] || 0,
                weight: 1.2 // Higher weight for foundational elements
            },
            'implementation': { 
                name: 'Implementation Planning', 
                score: responses['implementation'] || 0,
                weight: 1.1 
            },
            'equitable-access': { 
                name: 'Equitable Access', 
                score: responses['equitable-access'] || 0,
                weight: 1.3 // Critical for equity
            },
            'prepared-educators': { 
                name: 'Prepared Educators', 
                score: responses['prepared-educators'] || 0,
                weight: 1.2 
            },
            'technical-support': { 
                name: 'Technical Support', 
                score: responses['technical-support'] || 0,
                weight: 1.0 
            },
            'learning-content': { 
                name: 'High-Quality Learning Activities', 
                score: responses['learning-content'] || 0,
                weight: 1.1 
            },
            'ongoing-evaluation': { 
                name: 'Ongoing Evaluation', 
                score: responses['ongoing-evaluation'] || 0,
                weight: 1.0 
            }
        };
        
        // Calculate weighted scores
        let totalScore = 0;
        let totalWeight = 0;
        const strengthAreas = [];
        const challengeAreas = [];
        const criticalAreas = [];
        
        Object.keys(conditions).forEach(key => {
            const condition = conditions[key];
            const weightedScore = condition.score * condition.weight;
            totalScore += weightedScore;
            totalWeight += condition.weight;
            
            if (condition.score >= 3) {
                strengthAreas.push(condition);
            } else if (condition.score === 2) {
                challengeAreas.push(condition);
            } else {
                criticalAreas.push(condition);
            }
        });
        
        const overallScore = totalScore / totalWeight;
        const readinessLevel = getReadinessLevel(overallScore);
        
        return {
            conditions,
            overallScore,
            readinessLevel,
            strengthAreas,
            challengeAreas,
            criticalAreas,
            recommendations: generateRecommendations(overallScore, criticalAreas, challengeAreas),
            actionPlan: generateActionPlan(criticalAreas, challengeAreas, strengthAreas)
        };
    }
    
    window.getReadinessLevel = function(score) {
        if (score >= 3.5) return { level: 'Transformation Ready', color: '#22c55e', description: 'Your school is well-positioned for innovative technology integration.' };
        if (score >= 2.5) return { level: 'Implementation Ready', color: '#eab308', description: 'Your school has solid foundations with some areas for improvement.' };
        if (score >= 1.5) return { level: 'Foundation Building', color: '#f97316', description: 'Your school needs to strengthen core areas before major technology initiatives.' };
        return { level: 'Critical Assessment Needed', color: '#ef4444', description: 'Significant foundational work is required before technology integration.' };
    }
    
    window.generateRecommendations = function(overallScore, criticalAreas, challengeAreas) {
        const recommendations = [];
        
        if (criticalAreas.length > 0) {
            recommendations.push({
                priority: 'Critical',
                title: 'Address Foundational Gaps',
                description: `Focus immediately on strengthening: ${criticalAreas.map(a => a.name).join(', ')}. These are essential prerequisites for successful technology integration.`,
                timeframe: '1-3 months',
                color: '#ef4444'
            });
        }
        
        if (challengeAreas.length > 0) {
            recommendations.push({
                priority: 'High',
                title: 'Strengthen Core Areas',
                description: `Develop strategic plans for: ${challengeAreas.map(a => a.name).join(', ')}. These areas need attention to support advanced initiatives.`,
                timeframe: '3-6 months',
                color: '#f97316'
            });
        }
        
        if (overallScore >= 2.5) {
            recommendations.push({
                priority: 'Strategic',
                title: 'Plan Innovation Initiatives',
                description: 'With strong foundations in place, begin planning pilot programs for emerging technologies like AI tools, spatial computing, or advanced analytics.',
                timeframe: '6-12 months',
                color: '#22c55e'
            });
        }
        
        return recommendations;
    }
    
    window.generateActionPlan = function(criticalAreas, challengeAreas, strengthAreas) {
        const actions = [];
        
        // Phase 1: Critical Areas (0-3 months)
        if (criticalAreas.length > 0) {
            actions.push({
                phase: 1,
                title: 'Foundation Stabilization',
                timeframe: '0-3 months',
                actions: criticalAreas.map(area => getSpecificActions(area.name, 'critical'))
            });
        }
        
        // Phase 2: Challenge Areas (3-6 months)
        if (challengeAreas.length > 0) {
            actions.push({
                phase: 2,
                title: 'Capacity Building',
                timeframe: '3-6 months',
                actions: challengeAreas.map(area => getSpecificActions(area.name, 'improvement'))
            });
        }
        
        // Phase 3: Innovation (6-12 months)
        if (strengthAreas.length >= 3) {
            actions.push({
                phase: 3,
                title: 'Innovation Implementation',
                timeframe: '6-12 months',
                actions: [
                    'Launch pilot programs with emerging technologies',
                    'Develop advanced professional learning opportunities',
                    'Create innovation showcases and evaluation frameworks',
                    'Build partnerships with educational technology leaders'
                ]
            });
        }
        
        return actions;
    }
    
    window.getSpecificActions = function(conditionName, urgency) {
        const actionMap = {
            'Shared Vision': {
                critical: ['Convene stakeholder visioning sessions', 'Document technology integration philosophy', 'Align vision with school mission'],
                improvement: ['Refine and communicate vision broadly', 'Create vision implementation metrics', 'Establish vision review processes']
            },
            'Implementation Planning': {
                critical: ['Develop basic technology planning framework', 'Identify planning team and processes', 'Create initial resource assessment'],
                improvement: ['Enhance planning with detailed timelines', 'Integrate planning with budget cycles', 'Add stakeholder feedback loops']
            },
            'Equitable Access': {
                critical: ['Conduct comprehensive access audit', 'Address immediate connectivity gaps', 'Establish device equity baseline'],
                improvement: ['Develop sustainable access strategies', 'Create equity monitoring systems', 'Plan for emerging technology access']
            },
            'Prepared Educators': {
                critical: ['Assess current educator technology skills', 'Launch basic digital literacy training', 'Identify professional learning leaders'],
                improvement: ['Implement comprehensive PD program', 'Create peer learning networks', 'Develop specialization tracks']
            },
            'Technical Support': {
                critical: ['Evaluate current support capacity', 'Establish basic help desk operations', 'Create emergency response procedures'],
                improvement: ['Expand support team capabilities', 'Implement proactive maintenance', 'Plan for emerging technology support']
            },
            'High-Quality Learning Activities': {
                critical: ['Audit current digital learning resources', 'Establish content quality standards', 'Create basic activity frameworks'],
                improvement: ['Develop exemplar learning experiences', 'Create content evaluation processes', 'Build teacher creation capacity']
            },
            'Ongoing Evaluation': {
                critical: ['Establish basic data collection systems', 'Define key evaluation metrics', 'Create feedback collection processes'],
                improvement: ['Implement comprehensive evaluation framework', 'Add advanced analytics capabilities', 'Create continuous improvement cycles']
            }
        };
        
        return actionMap[conditionName] ? actionMap[conditionName][urgency] : ['Develop specific action plan for ' + conditionName];
    }
    
    window.generateComprehensiveIsteReport = function(assessment, responses) {
        const { conditions, overallScore, readinessLevel, strengthAreas, challengeAreas, criticalAreas, recommendations, actionPlan } = assessment;
        
        return `
            <div class="comprehensive-iste-report">
                <div class="report-header">
                    <h2>ISTE Essential Conditions Assessment Report</h2>
                    <div class="report-meta">
                        <p>Generated on: ${new Date().toLocaleDateString()}</p>
                        <p>Assessment Framework: ISTE Essential Conditions for 2025+ Technology Integration</p>
                    </div>
                </div>
                
                <div class="executive-summary">
                    <h3>Executive Summary</h3>
                    <div class="overall-score">
                        <div class="score-badge" style="background-color: ${readinessLevel.color};">
                            <span class="score-number">${overallScore.toFixed(1)}/4.0</span>
                            <span class="score-label">${readinessLevel.level}</span>
                        </div>
                        <p class="score-description">${readinessLevel.description}</p>
                    </div>
                    <div class="summary-insights">
                        <div class="insight-box strength-box">
                            <h4><i class="fas fa-check-circle"></i> Strengths (${strengthAreas.length})</h4>
                            <p>${strengthAreas.length > 0 ? strengthAreas.map(s => s.name).join(', ') : 'No areas currently at strength level'}</p>
                        </div>
                        <div class="insight-box challenge-box">
                            <h4><i class="fas fa-exclamation-triangle"></i> Growth Areas (${challengeAreas.length})</h4>
                            <p>${challengeAreas.length > 0 ? challengeAreas.map(c => c.name).join(', ') : 'No areas currently need improvement'}</p>
                        </div>
                        <div class="insight-box critical-box">
                            <h4><i class="fas fa-times-circle"></i> Critical Needs (${criticalAreas.length})</h4>
                            <p>${criticalAreas.length > 0 ? criticalAreas.map(c => c.name).join(', ') : 'No critical areas identified'}</p>
                        </div>
                    </div>
                </div>
                
                <div class="detailed-scores">
                    <h3>Detailed Condition Analysis</h3>
                    <div class="conditions-grid">
                        ${Object.keys(conditions).map(key => {
                            const condition = conditions[key];
                            const scoreColor = condition.score >= 3 ? '#22c55e' : condition.score >= 2 ? '#eab308' : '#ef4444';
                            const scoreText = ['Not Started', 'Initiating', 'Approaching', 'Meeting', 'Exceeding'][condition.score] || 'Not Rated';
                            
                            return `
                                <div class="condition-card">
                                    <h4>${condition.name}</h4>
                                    <div class="condition-score" style="background-color: ${scoreColor};">
                                        <span class="score">${condition.score}/4</span>
                                        <span class="score-text">${scoreText}</span>
                                    </div>
                                    <div class="condition-analysis">
                                        ${getConditionAnalysis(condition.name, condition.score)}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div class="recommendations-section">
                    <h3>Strategic Recommendations</h3>
                    <div class="recommendations-list">
                        ${recommendations.map(rec => `
                            <div class="recommendation-card" style="border-left: 4px solid ${rec.color};">
                                <div class="rec-header">
                                    <span class="rec-priority" style="background-color: ${rec.color};">${rec.priority}</span>
                                    <span class="rec-timeframe">${rec.timeframe}</span>
                                </div>
                                <h4>${rec.title}</h4>
                                <p>${rec.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="action-plan-section">
                    <h3>Phased Implementation Plan</h3>
                    <div class="action-phases">
                        ${actionPlan.map(phase => `
                            <div class="phase-card">
                                <div class="phase-header">
                                    <h4>Phase ${phase.phase}: ${phase.title}</h4>
                                    <span class="phase-timeframe">${phase.timeframe}</span>
                                </div>
                                <div class="phase-actions">
                                    ${phase.actions.map(actionGroup => {
                                        if (Array.isArray(actionGroup)) {
                                            return `<ul>${actionGroup.map(action => `<li>${action}</li>`).join('')}</ul>`;
                                        }
                                        return `<ul><li>${actionGroup}</li></ul>`;
                                    }).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="next-steps-section">
                    <h3>Immediate Next Steps</h3>
                    <div class="next-steps-timeline">
                        <div class="timeline-item urgent">
                            <h4>This Week</h4>
                            <ul>
                                <li>Share this report with leadership team</li>
                                <li>Schedule stakeholder review meeting</li>
                                ${criticalAreas.length > 0 ? '<li>Begin addressing critical areas immediately</li>' : ''}
                            </ul>
                        </div>
                        <div class="timeline-item short-term">
                            <h4>Next 30 Days</h4>
                            <ul>
                                <li>Develop detailed action plan for Phase 1 priorities</li>
                                <li>Assign responsibility for each critical area</li>
                                <li>Establish regular progress review schedule</li>
                            </ul>
                        </div>
                        <div class="timeline-item long-term">
                            <h4>Next 90 Days</h4>
                            <ul>
                                <li>Complete Phase 1 foundation building</li>
                                <li>Begin Phase 2 capacity building initiatives</li>
                                <li>Plan for re-assessment to measure progress</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="resources-section">
                    <h3>Additional Resources & Support</h3>
                    <div class="resources-grid">
                        <div class="resource-card">
                            <h4><i class="fas fa-book"></i> ISTE Standards</h4>
                            <p>Access the complete ISTE Standards for Students, Educators, and Leaders</p>
                            <a href="https://iste.org/standards" target="_blank" class="resource-link">View Standards</a>
                        </div>
                        <div class="resource-card">
                            <h4><i class="fas fa-graduation-cap"></i> Professional Learning</h4>
                            <p>ISTE offers certification programs and professional development opportunities</p>
                            <a href="https://iste.org/professional-development" target="_blank" class="resource-link">Explore PD</a>
                        </div>
                        <div class="resource-card">
                            <h4><i class="fas fa-users"></i> Community Support</h4>
                            <p>Connect with other educators in the ISTE community</p>
                            <a href="https://iste.org/connect" target="_blank" class="resource-link">Join Community</a>
                        </div>
                        <div class="resource-card">
                            <h4><i class="fas fa-file-alt"></i> Implementation Guides</h4>
                            <p>Download detailed implementation guides and planning templates</p>
                            <a href="https://drive.google.com/file/d/1HNiNWIVvKU5OkrLHSFQVQWo68EEBq58M/view?usp=sharing" target="_blank" class="resource-link">Don't Just Do IT! Manual</a>
                        </div>
                    </div>
                </div>
                
                <div class="report-footer">
                    <p><strong>Note:</strong> This assessment is based on the ISTE Essential Conditions framework adapted for emerging technology integration. Regular re-assessment is recommended as your institution evolves.</p>
                    <p class="disclaimer">This report is generated by the Don't Just Do IT! assessment tool and should be used in conjunction with professional educational technology consultation.</p>
                </div>
            </div>
        `;
    }
    
    window.getConditionAnalysis = function(conditionName, score) {
        const analyses = {
            'Shared Vision': {
                0: 'No documented vision for technology integration exists. This is foundational to all other efforts.',
                1: 'Initial conversations about technology vision have begun but lack documentation and stakeholder buy-in.',
                2: 'A technology vision exists but may not be well-communicated or consistently applied across the organization.',
                3: 'Strong, well-communicated vision that guides technology decisions and has broad stakeholder support.',
                4: 'Exemplary vision that serves as a model for other institutions and drives innovation.'
            },
            'Implementation Planning': {
                0: 'No systematic planning process exists for technology initiatives.',
                1: 'Basic planning occurs but lacks systematic approach and stakeholder involvement.',
                2: 'Planning processes exist but need enhancement in areas like resource allocation and timeline management.',
                3: 'Comprehensive planning that includes stakeholders, resources, timelines, and evaluation metrics.',
                4: 'Sophisticated planning process that anticipates challenges and adapts to changing conditions.'
            },
            'Equitable Access': {
                0: 'Significant access barriers exist for students and/or educators.',
                1: 'Some access provided but with notable gaps in devices, connectivity, or support.',
                2: 'Most stakeholders have access but equity gaps remain for some populations.',
                3: 'Strong access with systematic attention to equity across all populations.',
                4: 'Exemplary access that ensures all stakeholders can fully participate in technology-enhanced learning.'
            },
            'Prepared Educators': {
                0: 'Educators lack basic technology skills needed for effective integration.',
                1: 'Some educators have basic skills but most need significant development.',
                2: 'Many educators are competent but need enhancement in pedagogical technology integration.',
                3: 'Most educators are skilled in effective technology integration for learning.',
                4: 'Educators are highly skilled and serve as models for pedagogical technology use.'
            },
            'Technical Support': {
                0: 'Inadequate technical support significantly hinders technology use.',
                1: 'Basic support exists but is insufficient for current needs.',
                2: 'Support is adequate for current systems but needs enhancement for growth.',
                3: 'Strong technical support that enables effective technology use.',
                4: 'Exceptional support that proactively maintains systems and enables innovation.'
            },
            'High-Quality Learning Activities': {
                0: 'Limited availability of quality digital learning activities and content.',
                1: 'Some quality content exists but is not systematically utilized.',
                2: 'Good content is available but could be better aligned to standards and learning goals.',
                3: 'High-quality activities that are well-aligned to learning objectives and standards.',
                4: 'Exemplary learning activities that transform student engagement and achievement.'
            },
            'Ongoing Evaluation': {
                0: 'No systematic evaluation of technology initiatives occurs.',
                1: 'Some informal evaluation happens but lacks systematic data collection.',
                2: 'Evaluation occurs but could be more comprehensive and systematic.',
                3: 'Regular, systematic evaluation that informs decision-making and improvement.',
                4: 'Comprehensive evaluation system that drives continuous improvement and innovation.'
            }
        };
        
        return analyses[conditionName] ? analyses[conditionName][score] : 'Analysis not available for this condition.';
    }
    
    window.handleExportWithLoading = function(button, exportFunction) {
        const originalContent = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
        button.disabled = true;
        
        setTimeout(() => {
            try {
                exportFunction();
            } catch (err) {
                console.error('Export error:', err);
                window.showNotification('An error occurred during export. Please try again.', 'error');
            } finally {
                button.innerHTML = originalContent;
                button.disabled = false;
            }
        }, 100);
    }
    
    window.showNotification = function(message, type = 'info') {
        console.log(`Notification: ${message} (${type})`);
        
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.export-notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `export-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : 
                      type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' : 
                      '<i class="fas fa-info-circle"></i>'}
                </span>
                <span class="notification-message">${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Add event listener for close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.add('hiding');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.add('hiding');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
        
        // Show notification with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
    }
    
    // Enhanced PDF export function with better content capture and formatting
    window.exportElementToPDF = function(element, filename, options = {}) {
        if (!element) {
            console.error('No element provided for PDF export');
            window.showNotification('Could not find content to export to PDF.', 'error');
            return Promise.reject('No element provided');
        }
        
        if (typeof html2pdf === 'undefined') {
            console.error('html2pdf library not loaded');
            window.showNotification('PDF export library is not available.', 'error');
            return Promise.reject('html2pdf library not loaded');
        }
        
        // Enhanced default options for better content capture and formatting
        const defaultOptions = {
            margin: [0.75, 0.75, 0.75, 0.75],
            filename: filename || `Report-${new Date().toISOString().split('T')[0]}.pdf`,
            image: { 
                type: 'jpeg', 
                quality: 0.98,
                crossOrigin: 'anonymous'
            },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: false,
                allowTaint: true,
                scrollX: 0,
                scrollY: 0,
                windowWidth: 1400,
                windowHeight: window.innerHeight,
                // Enhanced cloning for better content capture
                onclone: function(clonedDoc) {
                    // Apply PDF-specific styling to cloned document
                    const style = clonedDoc.createElement('style');
                    style.textContent = `
                        body { 
                            height: auto !important; 
                            overflow: visible !important; 
                            margin: 0 !important;
                            padding: 0 !important;
                        }
                        * { 
                            max-width: none !important; 
                            overflow: visible !important; 
                            height: auto !important;
                            min-height: auto !important;
                        }
                        .no-print, .export-options, .export-buttons, button { 
                            display: none !important; 
                        }
                        .pdf-export-content {
                            width: 100% !important;
                            max-width: none !important;
                            overflow: visible !important;
                        }
                    `;
                    clonedDoc.head.appendChild(style);
                }
            },
            jsPDF: { 
                unit: 'in', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            },
            pagebreak: { 
                mode: ['avoid-all', 'css', 'legacy'],
                before: '.page-break-before, .executive-summary, .detailed-scores, .recommendations-section',
                after: '.page-break-after',
                avoid: '.keep-together'
            }
        };
        
        // Merge options
        const mergedOptions = {...defaultOptions, ...options};
        
        // Create enhanced wrapper with PDF-optimized styling
        const wrapper = document.createElement('div');
        wrapper.className = 'pdf-export-content';
        wrapper.style.cssText = `
            font-family: 'Georgia', 'Times New Roman', serif !important;
            color: #2c3e50 !important;
            line-height: 1.6 !important;
            padding: 2rem !important;
            background: white !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            overflow: visible !important;
            height: auto !important;
            min-height: auto !important;
            position: relative !important;
            display: block !important;
            page-break-inside: avoid !important;
        `;
        
        // Clone and enhance the element
        const clone = element.cloneNode(true);
        
        // Remove problematic elements that cause export issues
        const elementsToRemove = clone.querySelectorAll('.loader, .spinner, .export-options, .export-buttons, button, .no-print, script, style');
        elementsToRemove.forEach(el => el.remove());
        
        // Create PDF header
        const header = document.createElement('div');
        header.className = 'pdf-header';
        header.innerHTML = `
            <h1 style="margin: 0; color: #2e5eaa; font-size: 2rem; border-bottom: 3px solid #2e5eaa; padding-bottom: 0.5rem;">
                ISTE Assessment Report
            </h1>
            <p style="margin: 0.5rem 0 0 0; color: #666; font-size: 0.9rem;">
                Generated on ${new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}
            </p>
        `;
        
        // Ensure all content is visible and properly styled
        clone.style.cssText = `
            width: 100% !important;
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            display: block !important;
            position: relative !important;
        `;
        
        // Apply enhanced styling to headers for better PDF appearance
        const headers = clone.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headers.forEach((header, index) => {
            const level = parseInt(header.tagName.charAt(1));
            const fontSize = Math.max(1.5 - (level - 1) * 0.2, 1) + 'rem';
            header.style.cssText = `
                color: #2e5eaa !important;
                margin-top: 2rem !important;
                margin-bottom: 1rem !important;
                font-weight: 600 !important;
                page-break-after: avoid !important;
                font-size: ${fontSize} !important;
                ${level === 2 ? 'border-bottom: 1px solid #e0e0e0; padding-bottom: 0.3rem;' : ''}
            `;
        });
        
        // Enhanced styling for paragraphs and content
        const paragraphs = clone.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.style.cssText = `
                margin: 1rem 0 !important;
                line-height: 1.6 !important;
                color: #2c3e50 !important;
                text-align: justify !important;
                text-justify: inter-word !important;
                orphans: 3 !important;
                widows: 3 !important;
            `;
        });
        
        // Enhanced list styling
        const lists = clone.querySelectorAll('ul, ol');
        lists.forEach(list => {
            list.style.cssText = `
                margin: 1rem 0 !important;
                padding-left: 2rem !important;
                page-break-inside: avoid !important;
            `;
        });
        
        // Enhanced list item styling
        const listItems = clone.querySelectorAll('li');
        listItems.forEach(li => {
            li.style.cssText = `
                margin: 0.5rem 0 !important;
                line-height: 1.5 !important;
                color: #2c3e50 !important;
            `;
        });
        
        // Add proper page breaks and section styling
        const sections = clone.querySelectorAll('.result-section, .executive-summary, .detailed-scores, .recommendations-section, .action-plan-section');
        sections.forEach((section, index) => {
            section.style.cssText = `
                margin-top: ${index > 0 ? '3rem' : '1rem'} !important;
                margin-bottom: 2rem !important;
                page-break-inside: avoid !important;
                ${index > 0 ? 'page-break-before: auto !important;' : ''}
            `;
        });
        
        // Style tables if present
        const tables = clone.querySelectorAll('table');
        tables.forEach(table => {
            table.style.cssText = `
                width: 100% !important;
                border-collapse: collapse !important;
                margin: 1rem 0 !important;
                page-break-inside: avoid !important;
                font-size: 0.9rem !important;
            `;
        });
        
        const tableHeaders = clone.querySelectorAll('th');
        tableHeaders.forEach(th => {
            th.style.cssText = `
                background-color: #f8f9fa !important;
                border: 1px solid #dee2e6 !important;
                padding: 0.75rem !important;
                font-weight: 600 !important;
                color: #2e5eaa !important;
            `;
        });
        
        const tableCells = clone.querySelectorAll('td');
        tableCells.forEach(td => {
            td.style.cssText = `
                border: 1px solid #dee2e6 !important;
                padding: 0.75rem !important;
                color: #2c3e50 !important;
            `;
        });
        
        // Create PDF footer
        const footer = document.createElement('div');
        footer.className = 'pdf-footer';
        footer.innerHTML = `
            <p style="margin: 0; color: #666; font-size: 0.9rem; text-align: center;">
                Generated by Don't Just Do IT! Assessment Tool • Page 1
            </p>
        `;
        
        // Assemble the complete PDF content
        wrapper.appendChild(header);
        wrapper.appendChild(clone);
        wrapper.appendChild(footer);
        
        // Temporarily add wrapper to document for proper rendering
        wrapper.style.position = 'absolute';
        wrapper.style.left = '-9999px';
        wrapper.style.top = '0';
        document.body.appendChild(wrapper);
        
        // Return promise for better handling
        return new Promise((resolve, reject) => {
            // Generate PDF with enhanced error handling and content capture
            html2pdf()
                .set(mergedOptions)
                .from(wrapper)
                .toPdf()
                .get('pdf')
                .then(function(pdf) {
                    // Add comprehensive metadata
                    const now = new Date();
                    pdf.setProperties({
                        title: filename.replace('.pdf', ''),
                        subject: 'ISTE Educational Technology Assessment Report',
                        author: 'Don\'t Just Do IT! Assessment Tool',
                        creator: 'Educational Technology Assessment Platform',
                        producer: 'html2pdf.js',
                        creationDate: now,
                        modDate: now,
                        keywords: 'ISTE, Educational Technology, Assessment, Digital Transformation'
                    });
                    
                    return pdf;
                })
                .save()
                .then(() => {
                    console.log('PDF generated successfully');
                    window.showNotification('PDF downloaded successfully!', 'success');
                    // Clean up - remove wrapper from document
                    if (wrapper.parentNode) {
                        wrapper.parentNode.removeChild(wrapper);
                    }
                    resolve(true);
                })
                .catch((err) => {
                    console.error('Error saving PDF:', err);
                    window.showNotification('Error saving PDF. Please try again.', 'error');
                    // Clean up - remove wrapper from document
                    if (wrapper.parentNode) {
                        wrapper.parentNode.removeChild(wrapper);
                    }
                    reject(err);
                });
        }).catch((err) => {
            console.error('Error generating PDF:', err);
            window.showNotification('Error generating PDF. Please try again.', 'error');
            // Clean up - remove wrapper from document
            if (wrapper.parentNode) {
                wrapper.parentNode.removeChild(wrapper);
            }
            return Promise.reject(err);
        });
    }
    
    // Function to extract plain text from HTML for Google Docs export
    window.generatePlainTextFromHTML = function(element) {
        if (!element) return '';
        
        // Clone the element to avoid modifying the original
        const clone = element.cloneNode(true);
        
        // Function to convert HTML to formatted text
        function processNode(node, level = 0, listType = null, listIndex = 1) {
            let result = '';
            const indent = '  '.repeat(level);
            
            switch (node.nodeType) {
                case Node.TEXT_NODE:
                    return node.textContent.replace(/\s+/g, ' ');
                    
                case Node.ELEMENT_NODE:
                    switch (node.nodeName.toLowerCase()) {
                        case 'h1':
                            return `\n\n# ${getTextContent(node)}\n\n`;
                        case 'h2':
                            return `\n\n## ${getTextContent(node)}\n\n`;
                        case 'h3':
                            return `\n\n### ${getTextContent(node)}\n\n`;
                        case 'h4':
                            return `\n\n#### ${getTextContent(node)}\n\n`;
                        case 'h5':
                        case 'h6':
                            return `\n\n##### ${getTextContent(node)}\n\n`;
                        case 'p':
                            return `\n${indent}${getTextContent(node)}\n`;
                        case 'br':
                            return '\n';
                        case 'hr':
                            return '\n---\n';
                        case 'strong':
                        case 'b':
                            return `**${getTextContent(node)}**`;
                        case 'em':
                        case 'i':
                            return `*${getTextContent(node)}*`;
                        case 'u':
                            return `_${getTextContent(node)}_`;
                        case 'a':
                            return `[${getTextContent(node)}](${node.getAttribute('href') || '#'})`;
                        case 'ul':
                            return processChildren(node, level, 'ul');
                        case 'ol':
                            return processChildren(node, level, 'ol');
                        case 'li':
                            if (listType === 'ul') {
                                return `\n${indent}• ${getTextContent(node)}`;
                            } else if (listType === 'ol') {
                                return `\n${indent}${listIndex}. ${getTextContent(node)}`;
                            }
                            return `\n${indent}- ${getTextContent(node)}`;
                        case 'div':
                        case 'span':
                        case 'section':
                        case 'article':
                            return processChildren(node, level);
                        case 'table':
                            return `\n\n${processChildren(node, level)}\n\n`;
                        case 'tr':
                            return `\n${processChildren(node, level)}`;
                        case 'th':
                        case 'td':
                            return `${getTextContent(node)}\t`;
                        default:
                            return processChildren(node, level);
                    }
                    
                default:
                    return '';
            }
        }
        
        function processChildren(node, level, listType = null) {
            let result = '';
            let listIndex = 1;
            
            for (let i = 0; i < node.childNodes.length; i++) {
                if (listType && node.childNodes[i].nodeName.toLowerCase() === 'li') {
                    result += processNode(node.childNodes[i], level + 1, listType, listIndex++);
                } else {
                    result += processNode(node.childNodes[i], level);
                }
            }
            
            return result;
        }
        
        function getTextContent(node) {
            let result = '';
            
            for (let i = 0; i < node.childNodes.length; i++) {
                if (node.childNodes[i].nodeType === Node.TEXT_NODE) {
                    result += node.childNodes[i].textContent.replace(/\s+/g, ' ');
                } else if (node.childNodes[i].nodeType === Node.ELEMENT_NODE) {
                    result += processNode(node.childNodes[i]);
                }
            }
            
            return result.trim();
        }
        
        return processNode(clone).trim()
            .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove excessive line breaks
            .replace(/\n\n\n+/g, '\n\n')     // More cleaning of line breaks
            .replace(/\t\n/g, '\n');         // Clean up tab characters followed by newlines
    }
    
    // Enhanced Google Docs export with better formatting
    window.exportToGoogleDoc = function(element, title) {
        if (!element) {
            console.error('No element provided for Google Doc export');
            window.showNotification('Could not find content to export to Google Docs.', 'error');
            return Promise.reject('No element provided');
        }
        
        // Check if the element has actual content
        if (!element.textContent || element.textContent.trim() === '') {
            console.error('Element has no text content for Google Doc export');
            window.showNotification('No content found to export to Google Docs.', 'error');
            return false;
        }
        
        // Use the document title or default to "Report"
        const docTitle = title || `Assessment-Report-${new Date().toISOString().split('T')[0]}`;
        
        // Create rich text content that preserves formatting
        const richTextContent = window.generateRichTextForGoogleDocs(element);
        
        if (!richTextContent || richTextContent.trim() === '') {
            console.error('Failed to generate rich text content for Google Doc export');
            window.showNotification('Failed to process content for export.', 'error');
            return false;
        }
        
        // Always use the reliable method that ensures content is preserved
        return new Promise((resolve, reject) => {
            try {
                window.exportToGoogleDocFallback(element, title, richTextContent, docTitle);
                
                // Log successful export attempt
                console.log(`Google Doc export initiated for "${docTitle}"`);
                
                resolve(true);
            } catch (err) {
                console.error('Error exporting to Google Docs:', err);
                window.showNotification('Error exporting to Google Docs. Please try again.', 'error');
                reject(err);
            }
        });
    }
    
    // Fallback method for Google Docs export
    window.exportToGoogleDocFallback = function(element, title, htmlContent, docTitle) {
        // Create a more complete document structure optimized for Google Docs import
        const fullHtmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>${docTitle}</title>
    <meta charset="UTF-8">
    <style>
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            margin: 40px; 
            max-width: 8.5in;
            background: white;
        }
        h1 { color: #1a73e8; font-size: 24px; margin-top: 1.5em; margin-bottom: 0.5em; }
        h2 { color: #1a73e8; font-size: 20px; margin-top: 1.3em; margin-bottom: 0.5em; }
        h3 { color: #1a73e8; font-size: 16px; margin-top: 1.2em; margin-bottom: 0.5em; }
        h4, h5, h6 { color: #1a73e8; margin-top: 1em; margin-bottom: 0.5em; }
        .report-header { 
            text-align: center; 
            margin-bottom: 2em; 
            border-bottom: 2px solid #1a73e8; 
            padding-bottom: 1em; 
        }
        .executive-summary { 
            background: #f8f9fa; 
            padding: 1em; 
            border-left: 4px solid #1a73e8; 
            margin: 1em 0; 
        }
        .score-badge { 
            display: inline-block; 
            padding: 8px 12px; 
            border-radius: 4px; 
            color: white; 
            font-weight: bold; 
            margin: 4px;
        }
        .condition-card { 
            margin: 1em 0; 
            padding: 1em; 
            border: 1px solid #dadce0; 
            border-radius: 8px; 
        }
        .recommendation-card { 
            margin: 1em 0; 
            padding: 1em; 
            border-left: 4px solid #34a853; 
            background: #f8f9fa;
        }
        ul, ol { padding-left: 2em; margin: 1em 0; }
        li { margin: 0.5em 0; }
        table { 
            border-collapse: collapse; 
            width: 100%; 
            margin: 1em 0; 
            border: 1px solid #dadce0;
        }
        th, td { 
            border: 1px solid #dadce0; 
            padding: 12px 8px; 
            text-align: left; 
        }
        th { 
            background-color: #f8f9fa; 
            font-weight: bold;
        }
        p { margin: 0.75em 0; }
        .page-break { page-break-before: always; }
    </style>
</head>
<body>
${htmlContent}
</body>
</html>`;
        
        // Create a blob and download it as an HTML file that Google Docs can import
        const blob = new Blob([fullHtmlContent], { type: 'text/html;charset=utf-8' });
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
        
        window.showNotification('HTML file downloaded! To create a Google Doc: 1) Go to Google Drive, 2) Upload this file, 3) Right-click and "Open with Google Docs"', 'success');
        
        // Open Google Drive in a new tab for convenience
        setTimeout(() => {
            window.open('https://drive.google.com/drive/my-drive', '_blank');
        }, 1500);
    }
    
    // Generate rich text content that preserves formatting for Google Docs
    window.generateRichTextForGoogleDocs = function(element) {
        if (!element) return '';
        
        // Clone the element to avoid modifying the original
        const clone = element.cloneNode(true);
        
        try {
            // Remove elements that shouldn't be in the export
            const elementsToRemove = clone.querySelectorAll('.loader, .spinner, .export-options, .export-buttons, button, .no-print, script, style, .modal, .overlay, .hidden');
            elementsToRemove.forEach(el => {
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            });
            
            // Ensure there's actual content before proceeding
            if (!clone.textContent || clone.textContent.trim() === '') {
                console.warn('Element has no meaningful content after cleaning');
                
                // Return minimal valid content to prevent blank documents
                return '<h1>Assessment Report</h1><p>This report appears to be empty. Please try regenerating the assessment.</p>';
            }
            
            // Convert all content to proper HTML structure for Google Docs
            const processedContent = window.processContentForGoogleDocs(clone);
            
            // Add fallback content if processed content is empty
            if (!processedContent || processedContent.trim() === '') {
                console.warn('Failed to process content, using fallback method');
                return `<h1>Assessment Report</h1><p>${clone.textContent.trim()}</p>`;
            }
            
            return processedContent;
        } catch (error) {
            console.error('Error generating rich text for Google Docs:', error);
            // Return simple HTML if any error occurs during processing
            return `<h1>Assessment Report</h1><p>An error occurred while processing the report content. ${
                element.textContent ? 'Basic content is included below.' : 'No content could be retrieved.'
            }</p>${element.textContent ? `<div>${element.textContent}</div>` : ''}`;
        }
    }
    
    // Process content to ensure it's optimized for Google Docs import
    window.processContentForGoogleDocs = function(element) {
        if (!element) return '';
        
        try {
            let html = '';
            
            // Process each child element
            if (element.children && element.children.length > 0) {
                for (let child of element.children) {
                    const childHtml = window.convertElementToGoogleDocsHTML(child);
                    if (childHtml && childHtml.trim()) {
                        html += childHtml;
                    }
                }
            }
            
            // If no structured content found, try to extract any meaningful content
            if (!html.trim()) {
                // Try to find specific content containers first
                const contentContainers = element.querySelectorAll('.result-content, .report-content, .assessment-content, .main-content');
                if (contentContainers && contentContainers.length > 0) {
                    for (let container of contentContainers) {
                        if (container.textContent && container.textContent.trim()) {
                            html += `<div class="extracted-content">${container.innerHTML}</div>`;
                            break;  // Use the first non-empty container
                        }
                    }
                }
                
                // If still no content, use the raw text content as a last resort
                if (!html.trim()) {
                    const text = element.textContent || element.innerText || '';
                    if (text.trim()) {
                        // Convert plain text to paragraphs
                        html = text.split('\n')
                            .filter(line => line.trim())
                            .map(line => `<p>${line.trim()}</p>`)
                            .join('');
                    } else {
                        // Absolute last resort - just wrap the element content
                        html = `<div class="emergency-content">${element.innerHTML || 'No content available'}</div>`;
                    }
                }
            }
            
            return html;
        } catch (error) {
            console.error('Error processing content for Google Docs:', error);
            return `<p>Error processing content: ${error.message}</p><p>${element.textContent || 'No content available'}</p>`;
        }
    }
    
    // Convert individual elements to Google Docs compatible HTML
    window.convertElementToGoogleDocsHTML = function(element) {
        if (!element || !element.tagName) return '';
        
        const tagName = element.tagName.toLowerCase();
        const textContent = element.textContent?.trim() || '';
        
        // Skip empty elements
        if (!textContent && !['table', 'ul', 'ol'].includes(tagName)) {
            return '';
        }
        
        switch (tagName) {
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
                return `<${tagName}>${textContent}</${tagName}>`;
                
            case 'p':
                return `<p>${textContent}</p>`;
                
            case 'div':
                // Check if it's a title or important section
                const classList = element.className || '';
                if (classList.includes('title') || classList.includes('header') || classList.includes('section-title')) {
                    return `<h3>${textContent}</h3>`;
                } else if (classList.includes('summary') || classList.includes('intro')) {
                    return `<h4>${textContent}</h4>`;
                } else if (textContent) {
                    return `<p>${textContent}</p>`;
                }
                break;
                
            case 'ul':
            case 'ol':
                let listHTML = `<${tagName}>`;
                const listItems = element.querySelectorAll('li');
                listItems.forEach(li => {
                    const itemText = li.textContent?.trim();
                    if (itemText) {
                        listHTML += `<li>${itemText}</li>`;
                    }
                });
                listHTML += `</${tagName}>`;
                return listHTML;
                
            case 'table':
                let tableHTML = '<table border="1" style="border-collapse: collapse; width: 100%;">';
                const rows = element.querySelectorAll('tr');
                rows.forEach(row => {
                    tableHTML += '<tr>';
                    const cells = row.querySelectorAll('td, th');
                    cells.forEach(cell => {
                        const cellTag = cell.tagName.toLowerCase();
                        const cellText = cell.textContent?.trim() || '';
                        tableHTML += `<${cellTag} style="padding: 8px; border: 1px solid #ddd;">${cellText}</${cellTag}>`;
                    });
                    tableHTML += '</tr>';
                });
                tableHTML += '</table>';
                return tableHTML;
                
            case 'strong':
            case 'b':
                return `<strong>${textContent}</strong>`;
                
            case 'em':
            case 'i':
                return `<em>${textContent}</em>`;
                
            default:
                // Process children for container elements
                let childHTML = '';
                for (let child of element.children) {
                    childHTML += window.convertElementToGoogleDocsHTML(child);
                }
                
                // If no child HTML and we have text content, wrap it in a paragraph
                if (!childHTML && textContent) {
                    return `<p>${textContent}</p>`;
                }
                
                return childHTML;
        }
        
        return '';
    }
    
    // Generate HTML content optimized for Google Docs import (legacy function - maintained for compatibility)
    window.generateHTMLForGoogleDocs = function(element) {
        return window.generateRichTextForGoogleDocs(element);
    }
    
    // Function to extract slides from HTML content with improved content detection
    window.generatePresentationFromHTML = function(element) {
        if (!element) return [];
        
        const slides = [];
        
        // Title slide - try to get actual title from content
        const titleElement = element.querySelector('h1, .report-title, .title, .result-title');
        const reportTitle = titleElement ? titleElement.textContent.trim() : 'Assessment Report';
        slides.push(`Slide 1: ${reportTitle}\nGenerated: ${new Date().toLocaleDateString()}\n• Comprehensive analysis and recommendations\n• Based on current assessment data`);
        
        // Look for content sections more comprehensively
        const contentSections = window.extractContentSections(element);
        
        // Check if we have valid content sections
        if (contentSections && contentSections.length > 0) {
            contentSections.forEach((section, index) => {
                if (section.title && section.content && section.content.length > 0) {
                    let slideContent = `Slide ${slides.length + 1}: ${section.title}\n`;
                    
                    // Add content points, limiting to prevent overcrowded slides
                    const maxPoints = 6;
                    const points = section.content.slice(0, maxPoints);
                    
                    points.forEach(point => {
                        if (point && point.trim()) {
                            slideContent += `• ${point.trim()}\n`;
                        }
                    });
                    
                    // If there are more points, add a note
                    if (section.content.length > maxPoints) {
                        slideContent += `• ... and ${section.content.length - maxPoints} more points\n`;
                    }
                    
                    slides.push(slideContent);
                }
            });
        } else {
            // Fallback: If no content sections found, try extracting content directly
            const fallbackContent = extractFallbackContent(element);
            if (fallbackContent.length > 0) {
                slides.push(`Slide 2: Key Findings\n${fallbackContent.slice(0, 5).map(item => `• ${item}`).join('\n')}`);
            }
        }
        
        // Ensure we have at least a summary slide
        if (slides.length < 3) {
            slides.push(`Slide 2: Executive Summary\n• Assessment completed successfully\n• Key findings identified\n• Recommendations provided\n• Action plan outlined`);
        }
        
        // Add a conclusion slide if we have enough content
        if (slides.length >= 3) {
            slides.push(`Slide ${slides.length + 1}: Next Steps\n• Review all recommendations\n• Prioritize action items\n• Set implementation timeline\n• Schedule follow-up assessment\n• Share results with stakeholders`);
        }
        
        return slides;
    }
    
    // Extract content when structured sections aren't found
    function extractFallbackContent(element) {
        if (!element) return [];
        
        const content = [];
        
        // Try to extract from paragraphs
        const paragraphs = element.querySelectorAll('p');
        if (paragraphs.length > 0) {
            paragraphs.forEach(p => {
                const text = p.textContent.trim();
                if (text && text.length > 15) { // Only add substantial paragraphs
                    content.push(text);
                }
            });
        }
        
        // Try to extract from list items
        if (content.length < 3) {
            const listItems = element.querySelectorAll('li');
            listItems.forEach(li => {
                const text = li.textContent.trim();
                if (text) {
                    content.push(text);
                }
            });
        }
        
        // Try to extract from any text blocks as last resort
        if (content.length < 2) {
            const divs = element.querySelectorAll('div');
            divs.forEach(div => {
                // Only get direct text nodes, not those with children that would be processed elsewhere
                if (div.childNodes.length > 0 && div.children.length === 0) {
                    const text = div.textContent.trim();
                    if (text && text.length > 15) {
                        content.push(text);
                    }
                }
            });
        }
        
        return content;
    }
    
    // Extract content sections for presentation generation
    window.extractContentSections = function(element) {
        const sections = [];
        
        // Method 1: Look for headings and their content
        const headings = element.querySelectorAll('h1, h2, h3, h4, .section-title, .subsection-title');
        
        headings.forEach(heading => {
            const title = heading.textContent.trim();
            if (!title) return;
            
            const content = [];
            let currentNode = heading.nextElementSibling;
            
            // Collect content until next heading
            while (currentNode && !['H1', 'H2', 'H3', 'H4'].includes(currentNode.tagName) && 
                   !currentNode.classList.contains('section-title') && 
                   !currentNode.classList.contains('subsection-title')) {
                
                const nodeContent = window.extractNodeContent(currentNode);
                if (nodeContent.length > 0) {
                    content.push(...nodeContent);
                }
                
                currentNode = currentNode.nextElementSibling;
            }
            
            if (content.length > 0) {
                sections.push({ title, content });
            }
        });
        
        // Method 2: If no clear sections found, look for structured content
        if (sections.length === 0) {
            const lists = element.querySelectorAll('ul, ol');
            lists.forEach(list => {
                const items = Array.from(list.querySelectorAll('li')).map(li => li.textContent.trim()).filter(text => text);
                if (items.length > 0) {
                    sections.push({ title: 'Key Points', content: items });
                }
            });
            
            // Look for paragraphs if no lists
            if (sections.length === 0) {
                const paragraphs = element.querySelectorAll('p');
                const paragraphTexts = Array.from(paragraphs).map(p => p.textContent.trim()).filter(text => text);
                if (paragraphTexts.length > 0) {
                    sections.push({ title: 'Overview', content: paragraphTexts });
                }
            }
        }
        
        return sections;
    }
    
    // Extract content from a DOM node
    window.extractNodeContent = function(node) {
        if (!node) return [];
        
        const content = [];
        
        switch (node.tagName) {
            case 'P':
                const pText = node.textContent.trim();
                if (pText) content.push(pText);
                break;
                
            case 'UL':
            case 'OL':
                const listItems = node.querySelectorAll('li');
                listItems.forEach(li => {
                    const itemText = li.textContent.trim();
                    if (itemText) content.push(itemText);
                });
                break;
                
            case 'DIV':
                // Check if div contains lists or important content
                const divLists = node.querySelectorAll('ul, ol');
                if (divLists.length > 0) {
                    divLists.forEach(list => {
                        const items = list.querySelectorAll('li');
                        items.forEach(item => {
                            const itemText = item.textContent.trim();
                            if (itemText) content.push(itemText);
                        });
                    });
                } else {
                    // Check for text content
                    const divText = node.textContent.trim();
                    if (divText && divText.length > 10) { // Only add substantial text
                        content.push(divText);
                    }
                }
                break;
                
            case 'TABLE':
                // Extract table data as structured content
                const rows = node.querySelectorAll('tr');
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td, th');
                    if (cells.length > 0) {
                        const rowText = Array.from(cells).map(cell => cell.textContent.trim()).join(' - ');
                        if (rowText) content.push(rowText);
                    }
                });
                break;
                
            default:
                // For other elements, try to get meaningful text content
                const textContent = node.textContent.trim();
                if (textContent && textContent.length > 10) {
                    content.push(textContent);
                }
                break;
        }
        
        return content;
    }
    
    // Export to PowerPoint using improved slide generation
    window.exportToPowerPoint = function(element, title) {
        if (!element) {
            console.error('No element provided for PowerPoint export');
            window.showNotification('Could not find content to export to PowerPoint.', 'error');
            return false;
        }
        
        // Check if the element has actual content
        if (!element.textContent || element.textContent.trim() === '') {
            console.error('Element has no text content for PowerPoint export');
            window.showNotification('No content found to export to PowerPoint.', 'error');
            return false;
        }
        
        try {
            // Generate slides from the HTML content
            const slides = window.generatePresentationFromHTML(element);
            
            if (!slides || slides.length === 0) {
                console.error('Failed to generate slides for PowerPoint export');
                window.showNotification('Could not create slides from the content.', 'error');
                
                // Try fallback method - extract text and create basic slides
                const fallbackSlides = generateFallbackSlides(element);
                if (!fallbackSlides || fallbackSlides.length === 0) {
                    return false;
                }
                
                // Use the fallback slides instead
                return continuePowerPointExport(element, fallbackSlides, title);
            }
            
            // Use the document title or default to "Presentation"
            const presentationTitle = title || `Assessment-Presentation-${new Date().toISOString().split('T')[0]}`;
        
            // Log successful slide generation
            console.log(`PowerPoint export: Generated ${slides.length} slides for "${presentationTitle}"`);
            
            return continuePowerPointExport(element, slides, title);
        } catch (error) {
            console.error('Error in PowerPoint export:', error);
            window.showNotification('An error occurred during PowerPoint export.', 'error');
            return false;
        }
    }
    
    // Helper function to generate fallback slides when the main method fails
    function generateFallbackSlides(element) {
        try {
            const slides = [];
            
            // Title slide
            slides.push(`Slide 1: Assessment Report\nGenerated: ${new Date().toLocaleDateString()}\n• Report content\n• Key findings`);
            
            // Extract any headings for slides
            const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
            if (headings && headings.length > 0) {
                headings.forEach((heading, index) => {
                    if (heading.textContent && heading.textContent.trim()) {
                        const slideNumber = slides.length + 1;
                        let slideContent = `Slide ${slideNumber}: ${heading.textContent.trim()}\n`;
                        
                        // Try to find content following this heading
                        let nextElement = heading.nextElementSibling;
                        let points = [];
                        
                        while (nextElement && !['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(nextElement.tagName)) {
                            if (nextElement.textContent && nextElement.textContent.trim()) {
                                points.push(nextElement.textContent.trim());
                            }
                            nextElement = nextElement.nextElementSibling;
                            if (points.length >= 5) break; // Limit points per slide
                        }
                        
                        if (points.length > 0) {
                            points.forEach(point => {
                                slideContent += `• ${point}\n`;
                            });
                        } else {
                            slideContent += "• Content unavailable\n";
                        }
                        
                        slides.push(slideContent);
                    }
                });
            }
            
            // If still no content slides, create a basic content slide
            if (slides.length < 2) {
                const contentText = element.textContent.trim();
                if (contentText) {
                    // Extract first 500 characters and split into bullet points
                    const contentSample = contentText.substring(0, 500);
                    const sentences = contentSample.split(/[.!?]+/).filter(s => s.trim().length > 0);
                    
                    let slideContent = `Slide 2: Key Content\n`;
                    sentences.slice(0, 5).forEach(sentence => {
                        slideContent += `• ${sentence.trim()}\n`;
                    });
                    
                    slides.push(slideContent);
                }
            }
            
            // Add a conclusion slide
            slides.push(`Slide ${slides.length + 1}: Next Steps\n• Review assessment findings\n• Develop action plan\n• Implement recommendations\n• Monitor progress`);
            
            return slides;
        } catch (error) {
            console.error('Error generating fallback slides:', error);
            return [`Slide 1: Assessment Report\nGenerated: ${new Date().toLocaleDateString()}\n• Basic report export\n• Content extraction failed`];
        }
    }
    
    // Helper function to continue PowerPoint export after slides are generated
    function continuePowerPointExport(element, slides, title) {
        // Use the document title or default to "Presentation"
        const presentationTitle = title || `Assessment-Presentation-${new Date().toISOString().split('T')[0]}`;
        
        // Create PowerPoint-compatible HTML
        const pptHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>${presentationTitle}</title>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; background: white; margin: 0; padding: 0; }
        .slide { 
            page-break-after: always; 
            width: 10in; 
            height: 7.5in; 
            padding: 0.5in; 
            margin: 0; 
            border: 1px solid #ccc;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
        }
        .slide-header { 
            background: #2e5eaa; 
            color: white; 
            padding: 20px; 
            text-align: center;
            margin: -0.5in -0.5in 20px -0.5in;
        }
        .slide-content { 
            flex: 1; 
            font-size: 18px; 
            line-height: 1.5; 
        }
        .slide-title { 
            font-size: 32px; 
            font-weight: bold; 
            margin: 0; 
        }
        .slide-number { 
            position: absolute; 
            bottom: 10px; 
            right: 20px; 
            color: #666; 
            font-size: 12px; 
        }
        ul { margin: 1em 0; padding-left: 1.5em; }
        li { margin: 0.75em 0; font-size: 16px; }
        h2 { color: #2e5eaa; margin: 1em 0 0.5em 0; }
        p { margin: 0.75em 0; }
        .title-slide { text-align: center; justify-content: center; }
        .title-slide .slide-content { display: flex; flex-direction: column; justify-content: center; }
        .summary-slide { background: #f8f9fa; }
    </style>
</head>
<body>
`;
        
        // Generate HTML slides
        let slideHtml = '';
        slides.forEach((slide, index) => {
            const lines = slide.split('\n').filter(line => line.trim());
            const slideTitle = lines[0].replace(/^Slide \d+:\s*/, '');
            const content = lines.slice(1).join('\n');
            
            const isTitle = index === 0;
            const slideClass = isTitle ? 'slide title-slide' : 'slide';
            
            slideHtml += `
<div class="${slideClass}">
    <div class="slide-header">
        <h1 class="slide-title">${slideTitle}</h1>
    </div>
    <div class="slide-content">
        ${formatSlideContent(content)}
    </div>
    <div class="slide-number">Slide ${index + 1}</div>
</div>
`;
        });
        
        const fullHtml = pptHtml + slideHtml + '</body></html>';
        
        // Download as HTML file that can be imported into PowerPoint
        const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `${presentationTitle}.html`;
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
        
        window.showNotification('Presentation HTML file downloaded! Open this file in PowerPoint or import it for slides with original design.', 'success');
        return true;
    }
    
    // Helper function to format slide content
    function formatSlideContent(content) {
        if (!content) return '<p>Content overview and key points</p>';
        
        // Convert bullet points to proper HTML lists
        if (content.includes('•')) {
            const items = content.split('\n')
                .filter(line => line.trim().startsWith('•'))
                .map(line => `<li>${line.replace('•', '').trim()}</li>`)
                .join('');
            
            if (items) {
                const otherContent = content.split('\n')
                    .filter(line => line.trim() && !line.trim().startsWith('•'))
                    .map(line => `<p>${line.trim()}</p>`)
                    .join('');
                
                return otherContent + `<ul>${items}</ul>`;
            }
        }
        
        // Convert line breaks to paragraphs
        return content.split('\n')
            .filter(line => line.trim())
            .map(line => `<p>${line.trim()}</p>`)
            .join('');
    }
    
    // CBAM Report Generation Function
    window.generateComprehensiveCbamReport = function() {
        const resultDiv = document.getElementById('comprehensive-cbam-result');
        const resultContent = resultDiv ? resultDiv.querySelector('.result-content') : null;
        
        if (!resultDiv || !resultContent) {
            window.showNotification('Assessment result container not found.', 'error');
            return;
        }

        // Collect form data
        const formData = collectCbamAssessmentData();
        if (!formData) {
            window.showNotification('Please complete all required fields in the assessment.', 'error');
            return;
        }

        // Show loading state
        resultDiv.classList.remove('hidden');
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Simulate processing time
        setTimeout(() => {
            const reportHtml = generateCbamReportContent(formData);
            resultContent.innerHTML = reportHtml;
            
            // Setup export handlers
            setupCbamExportHandlers('comprehensive-cbam', formData);
            
            window.showNotification('Comprehensive CBAM assessment report generated successfully!', 'success');
        }, 2000);
    };

    // Collect CBAM Assessment Data
    function collectCbamAssessmentData() {
        const technologySelect = document.querySelector('#cbam-tool select[name="innovation-focus"]');
        const customTechnology = document.querySelector('#cbam-tool input[name="other-innovation"]');
        const louLevel = document.querySelector('#cbam-tool select[name="lou-level"]');
        const additionalContext = document.querySelector('#cbam-tool textarea[name="additional-context"]');
        
        const technology = technologySelect && technologySelect.value !== 'Other' 
            ? technologySelect.value 
            : (customTechnology ? customTechnology.value : '');
            
        if (!technology || !louLevel || !louLevel.value) {
            return null;
        }

        // Collect slider values
        const sliderData = [];
        const sliders = document.querySelectorAll('#cbam-tool .concern-slider');
        sliders.forEach((slider, index) => {
            const statement = slider.closest('.concern-item').querySelector('.concern-statement').textContent;
            const stage = slider.closest('.concern-item').getAttribute('data-stage');
            const value = parseInt(slider.value);
            
            sliderData.push({
                index: index + 1,
                statement: statement,
                stage: parseInt(stage),
                value: value
            });
        });

        return {
            technology: technology,
            louLevel: louLevel.value,
            additionalContext: additionalContext ? additionalContext.value : '',
            concernData: sliderData,
            timestamp: new Date()
        };
    }

    // Generate CBAM Report Content
    function generateCbamReportContent(data) {
        const analysisResults = analyzeCbamConcerns(data.concernData);
        const recommendations = generateCbamRecommendations(analysisResults, data);
        
        return `
            <div class="assessment-header">
                <div class="assessment-icon">
                    <i class="fas fa-users"></i>
                </div>
                <h2>Comprehensive CBAM Assessment Report</h2>
                <p class="assessment-subtitle">Technology: ${data.technology} | Generated: ${data.timestamp.toLocaleDateString()}</p>
            </div>

            <div class="executive-summary">
                <h3><i class="fas fa-bullseye"></i> Executive Summary</h3>
                <div class="summary-card ${analysisResults.readinessLevel.toLowerCase()}">
                    <div class="summary-header">
                        <span class="readiness-level">${analysisResults.readinessLevel} Readiness</span>
                        <span class="primary-stage">Primary Stage: ${analysisResults.primaryStage.name}</span>
                    </div>
                    <p class="summary-text">${analysisResults.summary}</p>
                </div>
            </div>

            <div class="concern-analysis">
                <h3><i class="fas fa-chart-line"></i> Stages of Concern Analysis</h3>
                <div class="stage-breakdown">
                    ${generateStageBreakdown(analysisResults.stageScores)}
                </div>
                <div class="concern-insights">
                    <h4>Key Insights</h4>
                    <ul>
                        ${analysisResults.insights.map(insight => `<li>${insight}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="recommendations-section">
                <h3><i class="fas fa-lightbulb"></i> Personalized Recommendations</h3>
                <div class="recommendation-cards">
                    ${recommendations.map(rec => `
                        <div class="recommendation-card ${rec.priority}">
                            <div class="rec-header">
                                <i class="fas ${rec.icon}"></i>
                                <h4>${rec.title}</h4>
                                <span class="priority-badge">${rec.priority}</span>
                            </div>
                            <p>${rec.description}</p>
                            <div class="action-items">
                                <strong>Action Items:</strong>
                                <ul>
                                    ${rec.actions.map(action => `<li>${action}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="implementation-plan">
                <h3><i class="fas fa-road"></i> Phased Implementation Plan</h3>
                <div class="phase-timeline">
                    ${generateImplementationPhases(analysisResults, data)}
                </div>
            </div>

            <div class="next-steps">
                <h3><i class="fas fa-flag-checkered"></i> Immediate Next Steps</h3>
                <div class="steps-grid">
                    ${generateNextSteps(analysisResults).map((step, index) => `
                        <div class="step-card">
                            <div class="step-number">${index + 1}</div>
                            <div class="step-content">
                                <h4>${step.title}</h4>
                                <p>${step.description}</p>
                                <span class="timeframe">${step.timeframe}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="cbam-reference">
                <h3><i class="fas fa-book"></i> CBAM Model Reference</h3>
                <div class="reference-content">
                    <p>The Concerns Based Adoption Model (CBAM) identifies seven stages that individuals typically experience when adopting innovations:</p>
                    <div class="stages-reference">
                        ${getCbamStagesReference()}
                    </div>
                    <p class="model-note"><strong>Note:</strong> Understanding these stages helps leaders provide appropriate support and professional development tailored to individual needs.</p>
                </div>
            </div>

            <div class="report-actions">
                <button type="button" class="action-btn secondary" onclick="window.scrollTo({top: document.getElementById('cbam-tool').offsetTop - 100, behavior: 'smooth'}); document.getElementById('comprehensive-cbam-result').classList.add('hidden');">
                    <i class="fas fa-redo"></i> Generate Another Report
                </button>
            </div>
        `;
    }

    window.printElement = function(element) {
        if (!element) {
            console.error('No element provided for printing');
            window.showNotification('Could not find content to print.', 'error');
            return false;
        }
        
        // Clone the element to avoid modifying the original
        const clone = element.cloneNode(true);
        
        // Create a new window for printing
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        
        if (!printWindow) {
            window.showNotification('Popup blocked. Please allow popups to print.', 'error');
            return false;
        }
        
        // Write print-friendly HTML to the new window
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Print Report</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.5;
                        color: #333;
                        padding: 20px;
                    }
                    @page {
                        size: letter;
                        margin: 0.75in;
                    }
                    .page-break {
                        page-break-after: always;
                    }
                    h1, h2, h3, h4, h5, h6 {
                        color: #2e5eaa;
                        margin-top: 1em;
                        margin-bottom: 0.5em;
                    }
                    p {
                        margin: 0.5em 0;
                    }
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        margin: 1em 0;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                    .print-header {
                        text-align: center;
                        border-bottom: 2px solid #2e5eaa;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="print-header">
                    <h1>Assessment Report</h1>
                    <p>Generated on ${new Date().toLocaleDateString()}</p>
                </div>
                ${clone.innerHTML}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        
        // Print the window
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
        
        window.showNotification('Print dialog opened successfully!', 'success');
        return true;
    }

    // CBAM Analysis Functions
    function analyzeCbamConcerns(concernData) {
        // Calculate average score for each stage
        const stageScores = [0, 1, 2, 3, 4, 5, 6].map(stage => {
            const stageItems = concernData.filter(item => item.stage === stage);
            const averageScore = stageItems.length > 0 
                ? stageItems.reduce((sum, item) => sum + item.value, 0) / stageItems.length 
                : 0;
            return { stage, average: averageScore, count: stageItems.length };
        });

        // Find primary stage (highest average score)
        const primaryStage = stageScores.reduce((max, current) => 
            current.average > max.average ? current : max
        );

        // Determine readiness level
        let readinessLevel = 'Low';
        if (primaryStage.stage >= 4) readinessLevel = 'High';
        else if (primaryStage.stage >= 2) readinessLevel = 'Medium';

        // Generate insights
        const insights = generateCbamInsights(stageScores, primaryStage);

        return {
            stageScores,
            primaryStage: {
                number: primaryStage.stage,
                name: getCbamStageName(primaryStage.stage),
                average: primaryStage.average
            },
            readinessLevel,
            summary: generateCbamSummary(primaryStage, readinessLevel),
            insights
        };
    }

    function getCbamStageName(stage) {
        const names = [
            'Unconcerned', 'Informational', 'Personal', 'Management',
            'Consequence', 'Collaboration', 'Refocusing'
        ];
        return names[stage] || 'Unknown';
    }

    function generateCbamSummary(primaryStage, readinessLevel) {
        const summaries = {
            0: "You currently have minimal concern about this innovation, which may indicate either satisfaction with current practices or lack of awareness about the innovation's potential impact.",
            1: "Your primary concerns are informational - you're seeking more details about the innovation and what it involves before making implementation decisions.",
            2: "Your concerns are personal in nature, focusing on how this innovation will specifically affect you, your role, and your daily responsibilities.",
            3: "Your primary concerns center around the practical management aspects of using this innovation, including time, logistics, and resource requirements.",
            4: "You're focused on the consequences and impact of using this innovation, particularly how it affects student outcomes and learning effectiveness.",
            5: "Your concerns emphasize collaboration - you're interested in working with others to maximize the innovation's potential and share best practices.",
            6: "Your concerns focus on refocusing and improving the innovation, suggesting you have experience with it and ideas for enhancement or alternatives."
        };
        
        return summaries[primaryStage.stage] || "Your concern pattern suggests a unique perspective on this innovation that warrants individualized support.";
    }

    function generateCbamInsights(stageScores, primaryStage) {
        const insights = [];
        
        // High scoring stages
        const highStages = stageScores.filter(s => s.average >= 5).map(s => s.stage);
        if (highStages.length > 0) {
            insights.push(`You show strong concerns in Stage(s) ${highStages.join(', ')}, indicating these areas need immediate attention.`);
        }

        // Stage progression insights
        if (primaryStage.stage <= 1) {
            insights.push("Focus on information gathering and awareness building before implementation.");
        } else if (primaryStage.stage === 2) {
            insights.push("Address personal concerns through mentoring and individualized support.");
        } else if (primaryStage.stage === 3) {
            insights.push("Provide practical implementation support, training, and resources management.");
        } else if (primaryStage.stage >= 4) {
            insights.push("Leverage your advanced perspective to support others and refine practices.");
        }

        // Multi-stage concerns
        const activeConcerns = stageScores.filter(s => s.average >= 3);
        if (activeConcerns.length > 3) {
            insights.push("Multiple active concern areas suggest need for comprehensive support strategy.");
        }

        return insights;
    }

    function generateStageBreakdown(stageScores) {
        return stageScores.map(score => `
            <div class="stage-item ${score.average >= 5 ? 'high-concern' : score.average >= 3 ? 'moderate-concern' : 'low-concern'}">
                <div class="stage-header">
                    <span class="stage-name">Stage ${score.stage}: ${getCbamStageName(score.stage)}</span>
                    <span class="stage-score">${score.average.toFixed(1)}/7</span>
                </div>
                <div class="stage-bar">
                    <div class="stage-progress" style="width: ${(score.average / 7) * 100}%"></div>
                </div>
            </div>
        `).join('');
    }

    function generateCbamRecommendations(analysis, data) {
        const recommendations = [];
        const stage = analysis.primaryStage.number;

        // Stage-specific recommendations
        if (stage <= 1) {
            recommendations.push({
                title: "Build Awareness and Information Base",
                priority: "high",
                icon: "fa-info-circle",
                description: "Focus on gathering comprehensive information about the innovation before implementation.",
                actions: [
                    "Research best practices and case studies",
                    "Attend workshops or webinars about the technology",
                    "Connect with early adopters for insights",
                    "Review implementation guides and documentation"
                ]
            });
        }

        if (stage === 2) {
            recommendations.push({
                title: "Address Personal Implementation Concerns",
                priority: "high",
                icon: "fa-user",
                description: "Work through personal concerns about how this innovation will affect your specific role and responsibilities.",
                actions: [
                    "Seek mentoring from experienced users",
                    "Start with small pilot implementations",
                    "Request individualized training and support",
                    "Clarify how your role will evolve with the innovation"
                ]
            });
        }

        if (stage === 3) {
            recommendations.push({
                title: "Develop Management and Implementation Skills",
                priority: "high",
                icon: "fa-cogs",
                description: "Focus on building practical skills for managing and implementing the innovation effectively.",
                actions: [
                    "Create detailed implementation timelines",
                    "Develop resource management strategies",
                    "Practice with the technology in low-stakes environments",
                    "Build support networks with colleagues"
                ]
            });
        }

        if (stage >= 4) {
            recommendations.push({
                title: "Focus on Impact and Collaboration",
                priority: "medium",
                icon: "fa-users",
                description: "Leverage your experience to maximize impact and support others in their adoption journey.",
                actions: [
                    "Document and share successful practices",
                    "Mentor colleagues who are earlier in adoption",
                    "Participate in professional learning communities",
                    "Advocate for innovation improvements based on experience"
                ]
            });
        }

        // Universal recommendations
        recommendations.push({
            title: "Establish Support Systems",
            priority: "medium",
            icon: "fa-hands-helping",
            description: "Build robust support networks to sustain innovation adoption.",
            actions: [
                "Identify key stakeholders and champions",
                "Establish regular check-ins and feedback sessions",
                "Create documentation for common challenges",
                "Build connections with the broader user community"
            ]
        });

        return recommendations;
    }

    function generateImplementationPhases(analysis, data) {
        const phases = [];
        
        phases.push({
            title: "Phase 1: Foundation (Weeks 1-4)",
            activities: [
                "Complete information gathering and research",
                "Address primary personal concerns",
                "Establish support network and mentoring relationships",
                "Begin small-scale experimentation"
            ]
        });

        phases.push({
            title: "Phase 2: Implementation (Weeks 5-12)",
            activities: [
                "Begin systematic implementation with chosen approach",
                "Develop management routines and practices",
                "Regular check-ins with mentors and support network",
                "Document challenges and solutions"
            ]
        });

        phases.push({
            title: "Phase 3: Integration (Weeks 13-24)",
            activities: [
                "Focus on impact measurement and refinement",
                "Begin collaboration with colleagues",
                "Share experiences and best practices",
                "Explore advanced features and applications"
            ]
        });

        return phases.map(phase => `
            <div class="phase-card">
                <h4>${phase.title}</h4>
                <ul>
                    ${phase.activities.map(activity => `<li>${activity}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    function generateNextSteps(analysis) {
        const steps = [];
        const stage = analysis.primaryStage.number;

        if (stage <= 1) {
            steps.push({
                title: "Information Gathering",
                description: "Research the innovation thoroughly through multiple sources",
                timeframe: "This week"
            });
        }

        if (stage === 2) {
            steps.push({
                title: "Find a Mentor",
                description: "Connect with an experienced user who can provide guidance",
                timeframe: "Next 2 weeks"
            });
        }

        steps.push({
            title: "Create Learning Plan",
            description: "Develop a structured approach for skill development",
            timeframe: "This month"
        });

        steps.push({
            title: "Start Small",
            description: "Begin with a low-risk pilot implementation",
            timeframe: "Next month"
        });

        return steps;
    }

    function getCbamStagesReference() {
        const stages = [
            { num: 0, name: "Unconcerned", desc: "Little concern about or involvement with the innovation" },
            { num: 1, name: "Informational", desc: "General awareness and interest in learning more" },
            { num: 2, name: "Personal", desc: "Concerns about personal impact and requirements" },
            { num: 3, name: "Management", desc: "Attention to processes, tasks, and logistics of using innovation" },
            { num: 4, name: "Consequence", desc: "Attention to impact on students and outcomes" },
            { num: 5, name: "Collaboration", desc: "Coordination and cooperation with others using innovation" },
            { num: 6, name: "Refocusing", desc: "Exploring alternatives and major modifications" }
        ];

        return stages.map(stage => `
            <div class="reference-stage">
                <strong>Stage ${stage.num}: ${stage.name}</strong>
                <p>${stage.desc}</p>
            </div>
        `).join('');
    }

    window.printElement = function(element) {
        if (!element) {
            console.error('No element provided for printing');
            window.showNotification('Could not find content to print.', 'error');
            return false;
        }
        
        // Clone the element to avoid modifying the original
        const clone = element.cloneNode(true);
        
        // Create a new window for printing
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        
        if (!printWindow) {
            window.showNotification('Popup blocked. Please allow popups to print.', 'error');
            return false;
        }
        
        // Write print-friendly HTML to the new window
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Print Report</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.5;
                        color: #333;
                        padding: 20px;
                    }
                    @page {
                        size: letter;
                        margin: 0.75in;
                    }
                    .page-break {
                        page-break-after: always;
                    }
                    h1, h2, h3, h4, h5, h6 {
                        color: #2e5eaa;
                        margin-top: 1em;
                        margin-bottom: 0.5em;
                    }
                    p {
                        margin: 0.5em 0;
                    }
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        margin: 1em 0;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                    .print-header {
                        text-align: center;
                        border-bottom: 2px solid #2e5eaa;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }
                    .print-footer {
                        text-align: center;
                        border-top: 1px solid #ddd;
                        padding-top: 10px;
                        margin-top: 20px;
                        font-size: 0.85em;
                        color: #666;
                    }
                    @media print {
                        .no-print {
                            display: none;
                        }
                    }
                    .print-btn {
                        background-color: #2e5eaa;
                        color: white;
                        border: none;
                        padding: 10px 15px;
                        cursor: pointer;
                        font-size: 16px;
                        margin-bottom: 20px;
                        border-radius: 4px;
                    }
                </style>
            </head>
            <body>
                <div class="no-print" style="text-align: center; margin-bottom: 20px;">
                    <button class="print-btn" onclick="window.print();">Print Report</button>
                    <button class="print-btn" onclick="window.close();" style="background-color: #666;">Close</button>
                </div>
                
                <div class="print-header">
                    <h1>Assessment Report</h1>
                    <p>Generated on ${new Date().toLocaleDateString()}</p>
                </div>
                
                <div class="print-content"></div>
                
                <div class="print-footer">
                    <p>Report generated by Don't Just Do IT! Assessment Tool</p>
                </div>
            </body>
            </html>
        `);
        
        // Append the content to the print-content div
        printWindow.document.querySelector('.print-content').appendChild(clone);
        
        // Add automatic print trigger with slight delay to ensure content is loaded
        printWindow.document.close();
        printWindow.focus();
        
        // Give the browser time to load the content
        setTimeout(() => {
            try {
                printWindow.print();
                return true;
            } catch (err) {
                console.error('Error during printing:', err);
                window.showNotification('Error during printing. Please try again.', 'error');
                return false;
            }
        }, 500);
    }
    
    // Add MS Word export functionality
    window.exportToMSWord = function(element, title) {
        if (!element) {
            console.error('No element provided for MS Word export');
            window.showNotification('Could not find content to export to MS Word.', 'error');
            return false;
        }
        
        // Use the document title or default
        const docTitle = title || `Assessment-Report-${new Date().toISOString().split('T')[0]}`;
        
        // Generate Word-compatible HTML
        const wordHtml = window.generateWordCompatibleHTML(element, docTitle);
        
        // Create blob with proper MIME type for Word
        const blob = new Blob([wordHtml], { 
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8' 
        });
        
        // Create download link
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `${docTitle}.doc`;
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
        
        window.showNotification('MS Word document downloaded! Open the .doc file in Microsoft Word or compatible word processor.', 'success');
        return true;
    }
    
    // Generate Word-compatible HTML
    window.generateWordCompatibleHTML = function(element, title) {
        const clone = element.cloneNode(true);
        
        // Remove elements that shouldn't be in the export
        const elementsToRemove = clone.querySelectorAll('.loader, .spinner, .export-options, .export-buttons, button, .no-print, script, style');
        elementsToRemove.forEach(el => el.remove());
        
        // Create Word-compatible document
        return `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
    <meta charset="utf-8">
    <title>${title}</title>
    <!--[if gte mso 9]>
    <xml>
        <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>90</w:Zoom>
            <w:DoNotPromptForConvert/>
            <w:DoNotShowRevisions/>
            <w:DoNotPrintRevisions/>
            <w:DoNotShowMarkup/>
            <w:DoNotShowComments/>
            <w:DoNotShowInsertionsAndDeletions/>
        </w:WordDocument>
    </xml>
    <![endif]-->
    <style>
        @page {
            size: letter;
            margin: 1in;
        }
        body {
            font-family: 'Calibri', 'Arial', sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #000000;
            margin: 0;
            padding: 0;
        }
        h1 {
            font-size: 20pt;
            font-weight: bold;
            color: #2e5eaa;
            margin: 24pt 0 12pt 0;
            page-break-after: avoid;
        }
        h2 {
            font-size: 16pt;
            font-weight: bold;
            color: #2e5eaa;
            margin: 18pt 0 6pt 0;
            page-break-after: avoid;
        }
        h3 {
            font-size: 14pt;
            font-weight: bold;
            color: #2e5eaa;
            margin: 12pt 0 6pt 0;
            page-break-after: avoid;
        }
        h4 {
            font-size: 12pt;
            font-weight: bold;
            color: #2e5eaa;
            margin: 12pt 0 6pt 0;
            page-break-after: avoid;
        }
        p {
            margin: 6pt 0;
            text-align: justify;
        }
        ul, ol {
            margin: 6pt 0;
            padding-left: 36pt;
        }
        li {
            margin: 3pt 0;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 12pt 0;
        }
        th, td {
            border: 1pt solid #666666;
            padding: 6pt;
            text-align: left;
            vertical-align: top;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        .page-break {
            page-break-before: always;
        }
        .executive-summary {
            background-color: #f8f9fa;
            border-left: 4pt solid #2e5eaa;
            padding: 12pt;
            margin: 12pt 0;
        }
        .score-badge {
            background-color: #2e5eaa;
            color: white;
            padding: 6pt 12pt;
            font-weight: bold;
            display: inline-block;
            margin: 6pt 0;
        }
        .condition-card {
            border: 1pt solid #dddddd;
            padding: 12pt;
            margin: 12pt 0;
        }
        .recommendation-card {
            border-left: 4pt solid #2e5eaa;
            padding: 12pt;
            margin: 12pt 0;
        }
    </style>
</head>
<body>
    <div class="document-header">
        <h1 style="text-align: center; border-bottom: 2pt solid #2e5eaa; padding-bottom: 12pt;">${title}</h1>
        <p style="text-align: center; font-style: italic; margin-bottom: 24pt;">Generated on ${new Date().toLocaleDateString()}</p>
    </div>
    ${clone.innerHTML}
    <div class="document-footer" style="margin-top: 36pt; border-top: 1pt solid #cccccc; padding-top: 12pt;">
        <p style="text-align: center; font-size: 9pt; color: #666666;">
            Report generated by Don't Just Do IT! Assessment Tool<br>
            For more information, visit the complete manual and resources.
        </p>
    </div>
</body>
</html>`;
    }

    window.setupIsteExportHandlers = function(assessment, responses) {
        console.log('Setting up ISTE export handlers');
        
        // Setup PDF export
        const pdfBtn = document.getElementById('export-pdf');
        if (pdfBtn) {
            pdfBtn.onclick = (e) => {
                e.preventDefault();
                console.log('PDF export button clicked');
                const reportContent = document.querySelector('#iste-result .result-content');
                if (reportContent) {
                    window.handleExportWithLoading(pdfBtn, async () => {
                        const result = await window.exportElementToPDF(
                            reportContent, 
                            `ISTE-Assessment-Report-${new Date().toISOString().split('T')[0]}.pdf`
                        );
                        
                        // Save assessment data if authenticated
                        if (window.assessmentDataManager && window.authManager?.isAuthenticated) {
                            const assessmentData = {
                                type: 'iste',
                                scores: window.isteScores || {},
                                results: reportContent.innerText.substring(0, 5000),
                                exported_as_pdf: true,
                                timestamp: new Date().toISOString()
                            };
                            await window.assessmentDataManager.saveAssessment('iste', assessmentData);
                        }
                        
                        return result;
                    });
                } else {
                    window.showNotification('Could not find report content to export.', 'error');
                }
            };
        }
        
        // Setup Google Doc export
        const docBtn = document.getElementById('export-doc');
        if (docBtn) {
            docBtn.onclick = (e) => {
                e.preventDefault();
                console.log('Google Doc export button clicked');
                const reportContent = document.querySelector('#iste-result .result-content');
                if (reportContent) {
                    window.handleExportWithLoading(docBtn, () => window.exportToGoogleDoc(
                        reportContent,
                        `ISTE-Assessment-Report-${new Date().toISOString().split('T')[0]}`
                    ));
                } else {
                    window.showNotification('Could not find report content to export.', 'error');
                }
            };
        }
        
        // Setup PowerPoint export
        const pptBtn = document.getElementById('export-ppt');
        if (pptBtn) {
            pptBtn.onclick = (e) => {
                e.preventDefault();
                console.log('PowerPoint export button clicked');
                const reportContent = document.querySelector('#iste-result .result-content');
                if (reportContent) {
                    window.handleExportWithLoading(pptBtn, () => window.exportToPowerPoint(
                        reportContent,
                        `ISTE-Assessment-Presentation-${new Date().toISOString().split('T')[0]}`
                    ));
                } else {
                    window.showNotification('Could not find report content to export.', 'error');
                }
            };
        }
        
        // Setup MS Word export
        const wordBtn = document.getElementById('export-word');
        if (wordBtn) {
            wordBtn.onclick = (e) => {
                e.preventDefault();
                console.log('MS Word export button clicked');
                const reportContent = document.querySelector('#iste-result .result-content');
                if (reportContent) {
                    window.handleExportWithLoading(wordBtn, () => window.exportToMSWord(
                        reportContent,
                        `ISTE-Assessment-Report-${new Date().toISOString().split('T')[0]}`
                    ));
                } else {
                    window.showNotification('Could not find report content to export.', 'error');
                }
            };
        }
        
        // Setup Print export
        const printBtn = document.getElementById('print-iste-report');
        if (printBtn) {
            printBtn.onclick = (e) => {
                e.preventDefault();
                console.log('Print report button clicked');
                const reportContent = document.querySelector('#iste-result .result-content');
                if (reportContent) {
                    window.handleExportWithLoading(printBtn, () => window.printElement(reportContent));
                } else {
                    window.showNotification('Could not find report content to print.', 'error');
                }
            };
        }
    }
    
    function showTextForCopy(text) {
        // Create a temporary textarea with the content
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.width = '100%';
        textarea.style.height = '200px';
        textarea.style.zIndex = '9999';
        textarea.style.backgroundColor = 'white';
        textarea.style.border = '2px solid #2e5eaa';
        document.body.appendChild(textarea);
        textarea.select();
        
        // Add a close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close & Copy';
        closeBtn.style.position = 'fixed';
        closeBtn.style.top = '210px';
        closeBtn.style.left = '0';
        closeBtn.style.zIndex = '9999';
        closeBtn.style.padding = '10px 20px';
        closeBtn.style.backgroundColor = '#2e5eaa';
        closeBtn.style.color = 'white';
        closeBtn.style.border = 'none';
        closeBtn.style.cursor = 'pointer';
        closeBtn.onclick = () => {
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            document.body.removeChild(closeBtn);
            window.showNotification('Content copied! Paste it into your Google Doc.', 'success');
        };
        document.body.appendChild(closeBtn);
    }
    
    // Setup export handlers for CBAM assessment
    window.setupCbamExportHandlers = function(assessment, responses) {
        console.log('Setting up CBAM export handlers');
        
        // Helper function to find the report content safely
        const getCbamReportContent = () => {
            // Try the standard selector first
            let content = document.querySelector('#comprehensive-cbam-result .result-content');
            
            // If not found, try alternative selectors
            if (!content) {
                content = document.querySelector('#cbam-tool .result-content');
            }
            
            // If still not found, try broader selectors
            if (!content) {
                content = document.querySelector('.cbam-enhanced-tool .assessment-result .result-content');
            }
            
            // Last resort - get the entire CBAM tool section
            if (!content) {
                content = document.querySelector('#cbam-tool .tool-body');
            }
            
            // Add debug information if no content is found
            if (!content) {
                console.error('Failed to find CBAM report content for export');
                
                // Create a container with error message
                const errorContent = document.createElement('div');
                errorContent.innerHTML = `
                    <h1>CBAM Assessment Report</h1>
                    <p>Error: Report content could not be located for export.</p>
                    <p>Please try regenerating the assessment report.</p>
                    <p>Generated: ${new Date().toLocaleDateString()}</p>
                `;
                return errorContent;
            }
            
            return content;
        };
        
        // Setup PDF export
        const pdfBtn = document.getElementById('export-cbam-pdf');
        if (pdfBtn) {
            pdfBtn.onclick = (e) => {
                e.preventDefault();
                console.log('CBAM PDF export button clicked');
                const reportContent = getCbamReportContent();
                window.handleExportWithLoading(pdfBtn, () => window.exportElementToPDF(
                    reportContent, 
                    `CBAM-Assessment-Report-${new Date().toISOString().split('T')[0]}.pdf`
                ));
            };
        }
        
        // Setup Word export
        const wordBtn = document.getElementById('export-cbam-doc');
        if (wordBtn) {
            wordBtn.onclick = (e) => {
                e.preventDefault();
                console.log('CBAM Word export button clicked');
                const reportContent = getCbamReportContent();
                window.handleExportWithLoading(wordBtn, () => window.exportToMSWord(
                    reportContent,
                    `CBAM-Assessment-Report-${new Date().toISOString().split('T')[0]}`
                ));
            };
        }
        
        // Setup PowerPoint export
        const pptBtn = document.getElementById('export-cbam-ppt');
        if (pptBtn) {
            pptBtn.onclick = (e) => {
                e.preventDefault();
                console.log('CBAM PowerPoint export button clicked');
                const reportContent = getCbamReportContent();
                window.handleExportWithLoading(pptBtn, () => window.exportToPowerPoint(
                    reportContent,
                    `CBAM-Assessment-Presentation-${new Date().toISOString().split('T')[0]}`
                ));
            };
        }
        
        // Setup Print export
        const printBtn = document.getElementById('print-cbam-report');
        if (printBtn) {
            printBtn.onclick = (e) => {
                e.preventDefault();
                console.log('CBAM Print button clicked');
                const reportContent = getCbamReportContent();
                window.handleExportWithLoading(printBtn, () => window.printElement(reportContent));
            };
        }
        
        // Setup Google Docs export (using new ExportToGoogle functionality)
        const gdocBtn = document.getElementById('export-cbam-gdoc');
        if (gdocBtn) {
            gdocBtn.onclick = (e) => {
                e.preventDefault();
                console.log('CBAM Google Docs export button clicked');
                const reportContent = getCbamReportContent();
                window.handleExportWithLoading(gdocBtn, () => window.exportToGoogleDoc(
                    reportContent,
                    `CBAM-Assessment-Report-${new Date().toISOString().split('T')[0]}`
                ));
            };
        }
    }
    
    // Setup export handlers for SAMR assessment
    window.setupSamrExportHandlers = function(assessment, responses) {
        console.log('Setting up SAMR export handlers');
        
        // Setup PDF export
        const pdfBtn = document.getElementById('export-enhanced-pdf');
        if (pdfBtn) {
            pdfBtn.onclick = (e) => {
                e.preventDefault();
                const reportContent = document.querySelector('#enhanced-samr-results .result-content');
                if (reportContent) {
                    window.handleExportWithLoading(pdfBtn, () => window.exportElementToPDF(
                        reportContent, 
                        `SAMR-Assessment-Report-${new Date().toISOString().split('T')[0]}.pdf`
                    ));
                } else {
                    window.showNotification('Could not find SAMR report content to export.', 'error');
                }
            };
        }
        
        // Setup Word export
        const wordBtn = document.getElementById('export-enhanced-doc');
        if (wordBtn) {
            wordBtn.onclick = (e) => {
                e.preventDefault();
                const reportContent = document.querySelector('#enhanced-samr-results .result-content');
                if (reportContent) {
                    window.handleExportWithLoading(wordBtn, () => window.exportToMSWord(
                        reportContent,
                        `SAMR-Assessment-Report-${new Date().toISOString().split('T')[0]}`
                    ));
                } else {
                    window.showNotification('Could not find SAMR report content to export.', 'error');
                }
            };
        }
        
        // Setup PowerPoint export
        const pptBtn = document.getElementById('export-enhanced-ppt');
        if (pptBtn) {
            pptBtn.onclick = (e) => {
                e.preventDefault();
                const reportContent = document.querySelector('#enhanced-samr-results .result-content');
                if (reportContent) {
                    window.handleExportWithLoading(pptBtn, () => window.exportToPowerPoint(
                        reportContent,
                        `SAMR-Assessment-Presentation-${new Date().toISOString().split('T')[0]}`
                    ));
                } else {
                    window.showNotification('Could not find SAMR report content to export.', 'error');
                }
            };
        }
        
        // Setup Print export  
        const printBtn = document.getElementById('export-enhanced-gdoc');
        if (printBtn) {
            printBtn.onclick = (e) => {
                e.preventDefault();
                const reportContent = document.querySelector('#enhanced-samr-results .result-content');
                if (reportContent) {
                    window.handleExportWithLoading(printBtn, () => window.printElement(reportContent));
                } else {
                    window.showNotification('Could not find SAMR report content to print.', 'error');
                }
            };
        }
    }

    // CBAM assessment mode toggle
    const cbamModeOptions = document.querySelectorAll('input[name="cbam-mode"]');
    if (cbamModeOptions.length > 0) {
        cbamModeOptions.forEach(option => {
            option.addEventListener('change', function() {
                const teamSection = document.getElementById('cbam-team-section');
                const integratedSection = document.getElementById('integrated-section');
                
                if (this.value === 'team' && teamSection) {
                    teamSection.classList.remove('hidden');
                    if (integratedSection) integratedSection.classList.add('hidden');
                } else if (this.value === 'integrated' && integratedSection) {
                    if (teamSection) teamSection.classList.add('hidden');
                    integratedSection.classList.remove('hidden');
                }
            });
        });
    }

    // Initialize CBAM concern sliders with event delegation
    function initializeCbamSliders() {
        console.log('Initializing CBAM sliders...');
        
        // Use event delegation to handle sliders that might be added dynamically
        document.addEventListener('input', function(e) {
            if (e.target.classList.contains('concern-slider')) {
                const valueDisplay = e.target.parentElement.querySelector('.slider-value');
                if (valueDisplay) {
                    valueDisplay.textContent = e.target.value;
                    console.log('Slider value updated:', e.target.value);
                }
            }
        });

        document.addEventListener('change', function(e) {
            if (e.target.classList.contains('concern-slider')) {
                const valueDisplay = e.target.parentElement.querySelector('.slider-value');
                if (valueDisplay) {
                    valueDisplay.textContent = e.target.value;
                    console.log('Slider value changed:', e.target.value);
                }
            }
        });

        // Also initialize existing sliders directly
        const existingSliders = document.querySelectorAll('.concern-slider');
        console.log('Found existing sliders:', existingSliders.length);
        
        existingSliders.forEach((slider, index) => {
            // Set initial value display
            const valueDisplay = slider.parentElement.querySelector('.slider-value');
            if (valueDisplay) {
                valueDisplay.textContent = slider.value;
            }
            console.log(`Initialized slider ${index + 1} with value ${slider.value}`);
        });
    }

    // CBAM Comprehensive Report Generation
    const comprehensiveCbamBtn = document.getElementById('comprehensive-cbam-btn');
    if (comprehensiveCbamBtn) {
        comprehensiveCbamBtn.addEventListener('click', function() {
            generateComprehensiveCbamReport();
        });
    }

    // Initialize sliders after DOM elements are available
    initializeCbamSliders();
    
    // Fix for CBAM textarea input issue
    function fixCbamTextareaInputIssue() {
        // Target the specific textarea in the CBAM form
        const additionalContextTextarea = document.querySelector('#cbam-tool textarea[name="additional-context"]');
        
        if (additionalContextTextarea) {
            console.log('CBAM textarea found, applying fix...');
            
            // Create a clone to remove any problematic event handlers
            const newTextarea = additionalContextTextarea.cloneNode(true);
            
            // Replace the original with the clone
            additionalContextTextarea.parentNode.replaceChild(newTextarea, additionalContextTextarea);
            
            // Make sure pointer events are enabled
            newTextarea.style.pointerEvents = 'auto';
            
            // Add a simple input event listener to confirm functionality
            newTextarea.addEventListener('input', function() {
                console.log('CBAM textarea input working!');
            });
            
            console.log('CBAM textarea fix applied successfully');
        }
    }
    
    // Apply the fix after a short delay to ensure all other scripts have run
    setTimeout(fixCbamTextareaInputIssue, 1000);
});