/**
 * Teacher Portal - Enhanced functionality for teacher-specific features
 * Including SAMR survey integration, lesson planning, and professional development
 */

class TeacherPortal {
    constructor() {
        this.authManager = window.authManager;
        this.assessmentDataManager = window.assessmentDataManager;
        this.currentLessonPlan = null;
        this.samrAssessmentData = null;
        
        this.initialize();
    }

    initialize() {
        console.log('🧑‍🏫 Initializing Teacher Portal...');
        
        // Wait for auth manager to be ready
        if (this.authManager) {
            this.authManager.onAuthStateChange((isAuthenticated, user, role) => {
                if (isAuthenticated && (role === 'teacher' || role === 'super_admin')) {
                    this.loadTeacherDashboard();
                }
            });
        }

        // Initialize SAMR integration
        this.initializeSAMRIntegration();
        
        console.log('✅ Teacher Portal initialized');
    }

    // Initialize SAMR survey integration with lesson planning
    initializeSAMRIntegration() {
        // Hook into existing SAMR survey completion
        document.addEventListener('samrAssessmentCompleted', (event) => {
            this.handleSAMRCompletion(event.detail);
        });

        // Add lesson planning button to SAMR results
        this.enhanceSAMRResults();
    }

    // Handle SAMR assessment completion
    handleSAMRCompletion(samrData) {
        console.log('SAMR Assessment completed:', samrData);
        this.samrAssessmentData = samrData;
        
        // Save to teacher development tracking
        this.saveTeacherDevelopment('SAMR', samrData);
        
        // Show lesson planning integration
        this.showLessonPlanningIntegration(samrData);
    }

    // Save teacher development data
    async saveTeacherDevelopment(assessmentType, data) {
        if (!this.authManager?.isTeacher()) return;

        try {
            const developmentData = {
                assessment_type: assessmentType,
                assessment_date: new Date().toISOString().split('T')[0],
                scores: data.scores || {},
                growth_areas: this.identifyGrowthAreas(data),
                strengths: this.identifyStrengths(data),
                recommendations: this.generateRecommendations(data),
                goals: this.suggestGoals(data)
            };

            const client = window.getSupabaseClient();
            if (client) {
                const { data: result, error } = await client
                    .from('teacher_development')
                    .insert([{
                        ...developmentData,
                        teacher_id: this.authManager.user.id,
                        school_id: this.authManager.schoolId
                    }])
                    .select()
                    .single();

                if (error) {
                    console.error('Error saving teacher development:', error);
                } else {
                    console.log('✅ Teacher development data saved');
                }
            }
            
        } catch (error) {
            console.error('Error in saveTeacherDevelopment:', error);
        }
    }

    // Identify growth areas from SAMR data
    identifyGrowthAreas(data) {
        const growthAreas = [];
        
        if (data.scores) {
            Object.entries(data.scores).forEach(([category, score]) => {
                if (score < 3) { // Assuming 1-5 scale
                    switch(category.toLowerCase()) {
                        case 'substitution':
                            growthAreas.push('Basic technology integration for direct task substitution');
                            break;
                        case 'augmentation':
                            growthAreas.push('Enhancing learning through functional technology improvements');
                            break;
                        case 'modification':
                            growthAreas.push('Significantly redesigning tasks with technology');
                            break;
                        case 'redefinition':
                            growthAreas.push('Creating previously impossible learning experiences');
                            break;
                    }
                }
            });
        }
        
        return growthAreas;
    }

    // Identify strengths from SAMR data
    identifyStrengths(data) {
        const strengths = [];
        
        if (data.scores) {
            Object.entries(data.scores).forEach(([category, score]) => {
                if (score >= 4) {
                    switch(category.toLowerCase()) {
                        case 'substitution':
                            strengths.push('Strong foundation in basic technology integration');
                            break;
                        case 'augmentation':
                            strengths.push('Effective use of technology to enhance learning');
                            break;
                        case 'modification':
                            strengths.push('Innovative task redesign with technology');
                            break;
                        case 'redefinition':
                            strengths.push('Advanced ability to transform learning through technology');
                            break;
                    }
                }
            });
        }
        
        return strengths;
    }

    // Generate personalized recommendations
    generateRecommendations(data) {
        const recommendations = [];
        
        // Analyze patterns and suggest next steps
        const avgScore = Object.values(data.scores || {}).reduce((a, b) => a + b, 0) / Object.keys(data.scores || {}).length;
        
        if (avgScore < 2.5) {
            recommendations.push('Start with substitution-level activities to build confidence');
            recommendations.push('Focus on one technology tool at a time');
            recommendations.push('Attend basic technology integration workshops');
        } else if (avgScore < 3.5) {
            recommendations.push('Practice augmentation activities that enhance existing lessons');
            recommendations.push('Collaborate with tech-savvy colleagues');
            recommendations.push('Explore subject-specific educational technology tools');
        } else {
            recommendations.push('Challenge yourself with modification and redefinition activities');
            recommendations.push('Mentor other teachers in technology integration');
            recommendations.push('Experiment with emerging technologies like AI and VR');
        }
        
        return recommendations;
    }

    // Suggest SMART goals based on assessment
    suggestGoals(data) {
        const goals = [];
        const currentLevel = this.determineSAMRLevel(data);
        
        switch(currentLevel) {
            case 'substitution':
                goals.push('Complete 3 augmentation-level lessons this quarter');
                goals.push('Increase student engagement scores by 15%');
                break;
            case 'augmentation':
                goals.push('Design 2 modification-level projects this semester');
                goals.push('Integrate collaborative technology tools in 50% of lessons');
                break;
            case 'modification':
                goals.push('Create 1 redefinition-level learning experience this year');
                goals.push('Share best practices with 5 colleagues');
                break;
            case 'redefinition':
                goals.push('Lead technology integration professional development');
                goals.push('Pilot innovative emerging technologies');
                break;
        }
        
        return goals;
    }

    // Determine current SAMR level
    determineSAMRLevel(data) {
        if (!data.scores) return 'substitution';
        
        const scores = Object.values(data.scores);
        const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        
        if (avgScore >= 4) return 'redefinition';
        if (avgScore >= 3) return 'modification';
        if (avgScore >= 2) return 'augmentation';
        return 'substitution';
    }

    // Show lesson planning integration after SAMR completion
    showLessonPlanningIntegration(samrData) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content teacher-integration-modal">
                <div class="modal-header">
                    <h3>🎯 Create SAMR-Aligned Lesson Plan</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Based on your SAMR assessment results, let's create a lesson plan that helps you progress to the next level:</p>
                    
                    <div class="samr-progress">
                        <div class="current-level">
                            <strong>Current Level:</strong> ${this.determineSAMRLevel(samrData).toUpperCase()}
                        </div>
                        <div class="next-level">
                            <strong>Target Level:</strong> ${this.getNextSAMRLevel(samrData).toUpperCase()}
                        </div>
                    </div>
                    
                    <div class="lesson-plan-form">
                        <div class="form-group">
                            <label for="lesson-title">Lesson Title:</label>
                            <input type="text" id="lesson-title" placeholder="Enter lesson title...">
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="lesson-subject">Subject:</label>
                                <select id="lesson-subject">
                                    <option value="">Select subject...</option>
                                    <option value="mathematics">Mathematics</option>
                                    <option value="science">Science</option>
                                    <option value="language-arts">Language Arts</option>
                                    <option value="social-studies">Social Studies</option>
                                    <option value="art">Art</option>
                                    <option value="music">Music</option>
                                    <option value="physical-education">Physical Education</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="lesson-grade">Grade Level:</label>
                                <select id="lesson-grade">
                                    <option value="">Select grade...</option>
                                    <option value="K">Kindergarten</option>
                                    <option value="1">1st Grade</option>
                                    <option value="2">2nd Grade</option>
                                    <option value="3">3rd Grade</option>
                                    <option value="4">4th Grade</option>
                                    <option value="5">5th Grade</option>
                                    <option value="6">6th Grade</option>
                                    <option value="7">7th Grade</option>
                                    <option value="8">8th Grade</option>
                                    <option value="9-12">High School</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="recommended-tools">
                            <h4>Recommended Technology Tools for ${this.getNextSAMRLevel(samrData).toUpperCase()}:</h4>
                            <div class="tool-suggestions">
                                ${this.generateToolSuggestions(samrData).map(tool => 
                                    `<span class="tool-tag">${tool}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary modal-close">Maybe Later</button>
                    <button class="btn-primary" onclick="teacherPortal.createLessonPlan()">Create Lesson Plan</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        modal.querySelectorAll('.modal-close').forEach(btn => {
            btn.onclick = () => modal.remove();
        });

        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }

    // Get next SAMR level
    getNextSAMRLevel(samrData) {
        const currentLevel = this.determineSAMRLevel(samrData);
        const levels = ['substitution', 'augmentation', 'modification', 'redefinition'];
        const currentIndex = levels.indexOf(currentLevel);
        return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : 'redefinition';
    }

    // Generate technology tool suggestions based on SAMR level
    generateToolSuggestions(samrData) {
        const targetLevel = this.getNextSAMRLevel(samrData);
        
        const toolsByLevel = {
            'augmentation': [
                'Google Docs collaboration', 'Kahoot! quizzes', 'Flipgrid video responses',
                'Padlet digital walls', 'Nearpod interactive lessons'
            ],
            'modification': [
                'Scratch programming', 'Adobe Creative tools', 'Minecraft Education',
                'VR field trips', 'Digital storytelling apps'
            ],
            'redefinition': [
                'Global collaboration projects', 'AI-powered learning assistants',
                'Augmented reality experiences', 'Student-created podcasts/videos',
                'Real-world problem solving platforms'
            ]
        };
        
        return toolsByLevel[targetLevel] || toolsByLevel['augmentation'];
    }

    // Create lesson plan
    async createLessonPlan() {
        const title = document.getElementById('lesson-title').value;
        const subject = document.getElementById('lesson-subject').value;
        const gradeLevel = document.getElementById('lesson-grade').value;
        
        if (!title || !subject || !gradeLevel) {
            alert('Please fill in all required fields.');
            return;
        }

        const lessonPlanData = {
            title: title,
            subject: subject,
            grade_level: gradeLevel,
            samr_level: this.getNextSAMRLevel(this.samrAssessmentData),
            iste_standards: this.suggestISTEStandards(subject),
            learning_objectives: this.generateLearningObjectives(subject, gradeLevel),
            technology_tools: this.generateToolSuggestions(this.samrAssessmentData),
            status: 'draft'
        };

        try {
            const result = await this.assessmentDataManager.saveLessonPlan(lessonPlanData);
            
            if (result) {
                this.showNotification('Lesson plan created successfully! 🎉', 'success');
                document.querySelector('.modal-overlay').remove();
                this.loadTeacherDashboard();
            } else {
                this.showNotification('Failed to save lesson plan. Please try again.', 'error');
            }
            
        } catch (error) {
            console.error('Error creating lesson plan:', error);
            this.showNotification('Error creating lesson plan.', 'error');
        }
    }

    // Suggest ISTE standards based on subject
    suggestISTEStandards(subject) {
        const isteStandards = {
            'mathematics': ['Computational Thinker', 'Digital Citizen'],
            'science': ['Innovative Designer', 'Computational Thinker'],
            'language-arts': ['Creative Communicator', 'Global Collaborator'],
            'social-studies': ['Global Collaborator', 'Digital Citizen'],
            'art': ['Creative Communicator', 'Innovative Designer'],
            'music': ['Creative Communicator', 'Innovative Designer'],
            'physical-education': ['Global Collaborator', 'Digital Citizen']
        };
        
        return isteStandards[subject] || ['Empowered Learner', 'Digital Citizen'];
    }

    // Generate learning objectives
    generateLearningObjectives(subject, gradeLevel) {
        // This would be more sophisticated in a real implementation
        return [
            `Students will demonstrate understanding of ${subject} concepts`,
            `Students will effectively use technology tools for learning`,
            `Students will collaborate and communicate their findings`
        ];
    }

    // Load teacher dashboard
    async loadTeacherDashboard() {
        if (!this.authManager?.isTeacher()) return;

        // This would be called when teacher dashboard is requested
        // For now, we'll just prepare the data
        try {
            const lessonPlans = await this.assessmentDataManager.getTeacherLessonPlans();
            const assessments = await this.assessmentDataManager.getUserAssessments();
            
            this.displayTeacherDashboard(lessonPlans, assessments);
            
        } catch (error) {
            console.error('Error loading teacher dashboard:', error);
        }
    }

    // Display teacher dashboard
    displayTeacherDashboard(lessonPlans, assessments) {
        // This would render the teacher dashboard UI
        console.log('Teacher Dashboard Data:', { lessonPlans, assessments });
    }

    // Enhance SAMR results with lesson planning integration
    enhanceSAMRResults() {
        // Look for existing SAMR result displays and enhance them
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const samrResults = document.querySelectorAll('.samr-results, .assessment-results');
                    samrResults.forEach(result => {
                        if (!result.querySelector('.lesson-plan-integration')) {
                            this.addLessonPlanButton(result);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Add lesson plan button to SAMR results
    addLessonPlanButton(resultElement) {
        const button = document.createElement('button');
        button.className = 'btn-primary lesson-plan-integration';
        button.innerHTML = '📚 Create Lesson Plan';
        button.onclick = () => {
            if (this.samrAssessmentData) {
                this.showLessonPlanningIntegration(this.samrAssessmentData);
            } else {
                this.showNotification('Please complete a SAMR assessment first.', 'info');
            }
        };

        resultElement.appendChild(button);
    }

    // Show notification
    showNotification(message, type = 'info') {
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }
}

// Initialize teacher portal
window.teacherPortal = new TeacherPortal();

console.log('🧑‍🏫 Teacher Portal system loaded');