/**
 * Admin Dashboard for Educational Technology Assessment Platform
 * Provides analytics, user management, and assessment insights for school administrators
 */

class AdminDashboard {
    constructor() {
        this.isVisible = false;
        this.assessmentData = [];
        this.schoolUsers = [];
        this.analytics = {};
        this.authManager = null;
        this.dataManager = null;
        
        // Initialize when auth manager is ready
        this.waitForAuthManager();
    }

    waitForAuthManager() {
        if (window.authManager && window.assessmentDataManager) {
            this.authManager = window.authManager;
            this.dataManager = window.assessmentDataManager;
            this.initialize();
        } else {
            setTimeout(() => this.waitForAuthManager(), 100);
        }
    }

    initialize() {
        this.createDashboardHTML();
        this.setupEventListeners();
        
        // Listen for auth state changes
        this.authManager.onAuthStateChange((isAuthenticated, user, role) => {
            if (isAuthenticated && role === 'admin') {
                this.loadDashboardData();
            }
        });

        console.log('📊 Admin Dashboard initialized');
    }

    createDashboardHTML() {
        // Create dashboard modal
        const dashboardHTML = `
            <div id="admin-dashboard" class="admin-dashboard-modal" style="display: none;">
                <div class="admin-dashboard-overlay" onclick="window.adminDashboard.hide()"></div>
                <div class="admin-dashboard-content">
                    <div class="admin-dashboard-header">
                        <h2><i class="fas fa-chart-bar"></i> School Administration Dashboard</h2>
                        <button class="admin-dashboard-close" onclick="window.adminDashboard.hide()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="admin-dashboard-body">
                        <!-- Navigation Tabs -->
                        <div class="admin-tabs">
                            <button class="admin-tab active" data-tab="overview">
                                <i class="fas fa-chart-pie"></i> Overview
                            </button>
                            <button class="admin-tab" data-tab="assessments">
                                <i class="fas fa-list-alt"></i> Assessments
                            </button>
                            <button class="admin-tab" data-tab="users">
                                <i class="fas fa-users"></i> Users
                            </button>
                            <button class="admin-tab" data-tab="analytics">
                                <i class="fas fa-chart-line"></i> Analytics
                            </button>
                            <button class="admin-tab" data-tab="roadmap">
                                <i class="fas fa-map"></i> Strategic Roadmap
                            </button>
                        </div>

                        <!-- Tab Contents -->
                        <div class="admin-tab-content">
                            <!-- Overview Tab -->
                            <div id="admin-overview" class="admin-tab-panel active">
                                <div class="admin-stats-grid">
                                    <div class="admin-stat-card">
                                        <div class="stat-icon"><i class="fas fa-users"></i></div>
                                        <div class="stat-info">
                                            <h3 id="total-users">0</h3>
                                            <p>Total Users</p>
                                        </div>
                                    </div>
                                    <div class="admin-stat-card">
                                        <div class="stat-icon"><i class="fas fa-clipboard-list"></i></div>
                                        <div class="stat-info">
                                            <h3 id="total-assessments">0</h3>
                                            <p>Assessments Completed</p>
                                        </div>
                                    </div>
                                    <div class="admin-stat-card">
                                        <div class="stat-icon"><i class="fas fa-chart-line"></i></div>
                                        <div class="stat-info">
                                            <h3 id="avg-score">0%</h3>
                                            <p>Average ISTE Score</p>
                                        </div>
                                    </div>
                                    <div class="admin-stat-card">
                                        <div class="stat-icon"><i class="fas fa-calendar-week"></i></div>
                                        <div class="stat-info">
                                            <h3 id="this-week">0</h3>
                                            <p>This Week</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="admin-overview-charts">
                                    <div class="chart-container">
                                        <h4>Assessment Progress Over Time</h4>
                                        <canvas id="progress-chart"></canvas>
                                    </div>
                                    <div class="chart-container">
                                        <h4>ISTE Competency Breakdown</h4>
                                        <canvas id="competency-chart"></canvas>
                                    </div>
                                </div>
                            </div>

                            <!-- Assessments Tab -->
                            <div id="admin-assessments" class="admin-tab-panel">
                                <div class="admin-controls">
                                    <div class="admin-filters">
                                        <select id="assessment-type-filter">
                                            <option value="">All Assessment Types</option>
                                            <option value="iste">ISTE Assessment</option>
                                            <option value="cbam">CBAM Assessment</option>
                                            <option value="samr">SAMR Assessment</option>
                                        </select>
                                        <select id="date-range-filter">
                                            <option value="all">All Time</option>
                                            <option value="week">Last Week</option>
                                            <option value="month">Last Month</option>
                                            <option value="quarter">Last Quarter</option>
                                        </select>
                                        <button id="export-assessments" class="admin-btn">
                                            <i class="fas fa-download"></i> Export Data
                                        </button>
                                    </div>
                                </div>
                                <div class="admin-table-container">
                                    <table id="assessments-table" class="admin-table">
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Assessment Type</th>
                                                <th>Score</th>
                                                <th>Date</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>

                            <!-- Users Tab -->
                            <div id="admin-users" class="admin-tab-panel">
                                <div class="admin-controls">
                                    <button id="invite-users" class="admin-btn primary">
                                        <i class="fas fa-user-plus"></i> Invite Users
                                    </button>
                                    <button id="manage-roles" class="admin-btn">
                                        <i class="fas fa-user-cog"></i> Manage Roles
                                    </button>
                                </div>
                                <div class="admin-table-container">
                                    <table id="users-table" class="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Department</th>
                                                <th>Last Assessment</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>

                            <!-- Analytics Tab -->
                            <div id="admin-analytics" class="admin-tab-panel">
                                <div class="analytics-dashboard">
                                    <div class="analytics-section">
                                        <h4>Technology Readiness Assessment</h4>
                                        <div class="readiness-indicators">
                                            <div class="readiness-item">
                                                <span class="readiness-label">Infrastructure</span>
                                                <div class="readiness-bar">
                                                    <div class="readiness-progress" id="infrastructure-progress"></div>
                                                </div>
                                                <span class="readiness-score" id="infrastructure-score">0%</span>
                                            </div>
                                            <div class="readiness-item">
                                                <span class="readiness-label">Professional Development</span>
                                                <div class="readiness-bar">
                                                    <div class="readiness-progress" id="pd-progress"></div>
                                                </div>
                                                <span class="readiness-score" id="pd-score">0%</span>
                                            </div>
                                            <div class="readiness-item">
                                                <span class="readiness-label">Digital Citizenship</span>
                                                <div class="readiness-bar">
                                                    <div class="readiness-progress" id="citizenship-progress"></div>
                                                </div>
                                                <span class="readiness-score" id="citizenship-score">0%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="analytics-section">
                                        <h4>Gap Analysis</h4>
                                        <div id="gap-analysis"></div>
                                    </div>

                                    <div class="analytics-section">
                                        <h4>Benchmark Comparison</h4>
                                        <canvas id="benchmark-chart"></canvas>
                                    </div>
                                </div>
                            </div>

                            <!-- Strategic Roadmap Tab -->
                            <div id="admin-roadmap" class="admin-tab-panel">
                                <div class="roadmap-container">
                                    <div class="roadmap-header">
                                        <h4>12-Step EdTech Strategic Roadmap</h4>
                                        <p>Based on your school's assessment data and identified gaps</p>
                                    </div>
                                    
                                    <div class="roadmap-timeline" id="strategic-roadmap">
                                        <!-- Roadmap steps will be generated dynamically -->
                                    </div>

                                    <div class="roadmap-actions">
                                        <button id="generate-roadmap" class="admin-btn primary">
                                            <i class="fas fa-magic"></i> Generate Roadmap
                                        </button>
                                        <button id="export-roadmap" class="admin-btn">
                                            <i class="fas fa-download"></i> Export Roadmap
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add to document
        document.body.insertAdjacentHTML('beforeend', dashboardHTML);
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Assessment type filter
        const typeFilter = document.getElementById('assessment-type-filter');
        if (typeFilter) {
            typeFilter.addEventListener('change', () => this.filterAssessments());
        }

        // Date range filter
        const dateFilter = document.getElementById('date-range-filter');
        if (dateFilter) {
            dateFilter.addEventListener('change', () => this.filterAssessments());
        }

        // Export buttons
        const exportBtn = document.getElementById('export-assessments');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportAssessmentData());
        }

        // Generate roadmap
        const generateRoadmapBtn = document.getElementById('generate-roadmap');
        if (generateRoadmapBtn) {
            generateRoadmapBtn.addEventListener('click', () => this.generateStrategicRoadmap());
        }

        // Export roadmap
        const exportRoadmapBtn = document.getElementById('export-roadmap');
        if (exportRoadmapBtn) {
            exportRoadmapBtn.addEventListener('click', () => this.exportRoadmap());
        }
    }

    async show() {
        if (!this.authManager?.isAdmin()) {
            this.authManager?.showNotification('Access denied - Admin privileges required', 'error');
            return;
        }

        const dashboard = document.getElementById('admin-dashboard');
        if (dashboard) {
            dashboard.style.display = 'block';
            this.isVisible = true;
            
            // Load fresh data
            await this.loadDashboardData();
        }
    }

    hide() {
        const dashboard = document.getElementById('admin-dashboard');
        if (dashboard) {
            dashboard.style.display = 'none';
            this.isVisible = false;
        }
    }

    switchTab(tabName) {
        // Update active tab
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update active panel
        document.querySelectorAll('.admin-tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(`admin-${tabName}`).classList.add('active');

        // Load tab-specific data
        this.loadTabData(tabName);
    }

    async loadDashboardData() {
        if (!this.authManager?.isAdmin()) return;

        try {
            // Load school assessments
            this.assessmentData = await this.dataManager.getSchoolAssessments();
            
            // Load school users (you'd need to implement this in AssessmentDataManager)
            // this.schoolUsers = await this.dataManager.getSchoolUsers();
            
            // Calculate analytics
            this.calculateAnalytics();
            
            // Update overview
            this.updateOverview();
            
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    }

    async loadTabData(tabName) {
        switch (tabName) {
            case 'assessments':
                this.updateAssessmentsTable();
                break;
            case 'users':
                this.updateUsersTable();
                break;
            case 'analytics':
                this.updateAnalytics();
                break;
            case 'roadmap':
                this.updateRoadmap();
                break;
        }
    }

    calculateAnalytics() {
        if (!this.assessmentData.length) return;

        const now = Date.now();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;

        this.analytics = {
            totalAssessments: this.assessmentData.length,
            thisWeek: this.assessmentData.filter(a => 
                new Date(a.created_at).getTime() > (now - oneWeek)
            ).length,
            assessmentTypes: {},
            averageScores: {},
            competencyBreakdown: {}
        };

        // Calculate type-specific analytics
        this.assessmentData.forEach(assessment => {
            const type = assessment.assessment_type;
            
            if (!this.analytics.assessmentTypes[type]) {
                this.analytics.assessmentTypes[type] = 0;
            }
            this.analytics.assessmentTypes[type]++;

            // Calculate average scores for ISTE assessments
            if (type === 'iste' && assessment.data?.scores) {
                if (!this.analytics.averageScores.iste) {
                    this.analytics.averageScores.iste = [];
                }
                this.analytics.averageScores.iste.push(assessment.data.scores);
            }
        });

        // Calculate overall ISTE average
        if (this.analytics.averageScores.iste?.length) {
            const totalScore = this.analytics.averageScores.iste.reduce((sum, scores) => {
                const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;
                return sum + avgScore;
            }, 0);
            this.analytics.overallAverage = Math.round(totalScore / this.analytics.averageScores.iste.length);
        }
    }

    updateOverview() {
        // Update stat cards
        document.getElementById('total-users').textContent = this.schoolUsers.length || '0';
        document.getElementById('total-assessments').textContent = this.analytics.totalAssessments || '0';
        document.getElementById('avg-score').textContent = `${this.analytics.overallAverage || 0}%`;
        document.getElementById('this-week').textContent = this.analytics.thisWeek || '0';
    }

    updateAssessmentsTable() {
        const tbody = document.querySelector('#assessments-table tbody');
        if (!tbody) return;

        tbody.innerHTML = '';

        this.assessmentData.forEach(assessment => {
            const row = document.createElement('tr');
            
            const userName = assessment.user_profiles?.full_name || assessment.user_profiles?.email || 'Unknown User';
            const score = this.calculateAssessmentScore(assessment);
            const date = new Date(assessment.created_at).toLocaleDateString();

            row.innerHTML = `
                <td>${userName}</td>
                <td>${assessment.assessment_type.toUpperCase()}</td>
                <td>${score}%</td>
                <td>${date}</td>
                <td>
                    <button class="admin-btn-small" onclick="window.adminDashboard.viewAssessment('${assessment.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    calculateAssessmentScore(assessment) {
        if (assessment.assessment_type === 'iste' && assessment.data?.scores) {
            const scores = Object.values(assessment.data.scores);
            return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        }
        return 'N/A';
    }

    async generateStrategicRoadmap() {
        if (!this.assessmentData.length) {
            this.authManager?.showNotification('No assessment data available for roadmap generation', 'warning');
            return;
        }

        // Analyze assessment data to identify gaps and priorities
        const gaps = this.identifyGaps();
        const roadmap = this.createRoadmapSteps(gaps);
        
        this.displayRoadmap(roadmap);
        this.authManager?.showNotification('Strategic roadmap generated successfully!', 'success');
    }

    identifyGaps() {
        // Analyze assessment data to identify key gaps
        const gaps = {
            infrastructure: 70, // Example scores
            professionalDevelopment: 60,
            digitalCitizenship: 80,
            innovativeDesign: 55,
            computationalThinking: 65
        };

        // TODO: Calculate actual gaps from assessment data
        return gaps;
    }

    createRoadmapSteps(gaps) {
        // 12-step roadmap based on the manual
        return [
            {
                step: 1,
                title: "Establish Vision & Leadership",
                description: "Form technology leadership team and establish shared vision",
                priority: gaps.infrastructure < 70 ? "high" : "medium",
                timeline: "1-2 months",
                responsible: "Administration"
            },
            {
                step: 2,
                title: "Infrastructure Assessment",
                description: "Evaluate current technology infrastructure and identify needs",
                priority: gaps.infrastructure < 60 ? "high" : "medium",
                timeline: "1 month",
                responsible: "IT Department"
            },
            {
                step: 3,
                title: "Professional Development Plan",
                description: "Design comprehensive PD program for staff",
                priority: gaps.professionalDevelopment < 70 ? "high" : "medium",
                timeline: "2-3 months",
                responsible: "PD Coordinator"
            },
            // Add remaining 9 steps...
        ];
    }

    displayRoadmap(roadmap) {
        const container = document.getElementById('strategic-roadmap');
        if (!container) return;

        container.innerHTML = roadmap.map(step => `
            <div class="roadmap-step priority-${step.priority}">
                <div class="step-number">${step.step}</div>
                <div class="step-content">
                    <h5>${step.title}</h5>
                    <p>${step.description}</p>
                    <div class="step-meta">
                        <span class="timeline"><i class="fas fa-clock"></i> ${step.timeline}</span>
                        <span class="responsible"><i class="fas fa-user"></i> ${step.responsible}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    async exportAssessmentData() {
        if (!this.assessmentData.length) {
            this.authManager?.showNotification('No data to export', 'warning');
            return;
        }

        try {
            const csvData = this.convertToCSV(this.assessmentData);
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `school-assessment-data-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.authManager?.showNotification('Assessment data exported successfully!', 'success');
            
        } catch (error) {
            console.error('Error exporting data:', error);
            this.authManager?.showNotification('Error exporting data', 'error');
        }
    }

    convertToCSV(data) {
        const headers = ['User', 'Email', 'Assessment Type', 'Score', 'Date', 'Department'];
        const rows = data.map(assessment => [
            assessment.user_profiles?.full_name || 'Unknown',
            assessment.user_profiles?.email || 'Unknown',
            assessment.assessment_type,
            this.calculateAssessmentScore(assessment),
            new Date(assessment.created_at).toISOString(),
            assessment.user_profiles?.department || 'Unknown'
        ]);

        return [headers, ...rows].map(row => row.map(field => 
            typeof field === 'string' && field.includes(',') ? `"${field}"` : field
        ).join(',')).join('\n');
    }

    filterAssessments() {
        // Implement filtering logic
        this.updateAssessmentsTable();
    }

    updateUsersTable() {
        // Implement user table update
    }

    updateAnalytics() {
        // Implement analytics update
    }

    updateRoadmap() {
        // Implement roadmap update
    }
}

// Initialize admin dashboard
window.adminDashboard = new AdminDashboard();

console.log('📊 Admin Dashboard loaded');