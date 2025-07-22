/**
 * Supabase Configuration and Authentication System
 * Educational Technology Assessment Platform
 */

// Supabase configuration
const SUPABASE_CONFIG = {
    url: 'https://hvxfmbzchzouidfbywbu.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2eGZtYnpjaHpvdWlkZmJ5d2J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNTE0MzMsImV4cCI6MjA2ODcyNzQzM30.uwOWUTeCFUuFfcUbq-4MIWxI5tAjnceE1xa6p426pC0'
};

// Initialize Supabase client
let supabaseClient = null;

// Wait for Supabase library to load
function initializeSupabase() {
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        console.log('✅ Supabase client initialized');
        return supabaseClient;
    } else {
        console.warn('⚠️ Supabase library not loaded yet');
        return null;
    }
}

// Get Supabase client (with auto-initialization)
function getSupabaseClient() {
    if (!supabaseClient) {
        supabaseClient = initializeSupabase();
    }
    return supabaseClient;
}

// Authentication Manager Class
class AuthManager {
    constructor() {
        this.user = null;
        this.isAuthenticated = false;
        this.userRole = null; // 'admin', 'teacher', 'staff', 'student'
        this.schoolId = null;
        this.authCallbacks = [];
        
        // Initialize on DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    async initialize() {
        console.log('🔐 Initializing Authentication Manager...');
        
        const client = getSupabaseClient();
        if (!client) {
            console.warn('⚠️ Supabase client not available - authentication disabled');
            return;
        }

        try {
            // Check for existing session
            const { data: { session }, error } = await client.auth.getSession();
            
            if (error) {
                console.error('Error getting session:', error);
                return;
            }

            if (session) {
                await this.handleAuthStateChange(session);
            }

            // Listen for auth state changes
            client.auth.onAuthStateChange(async (event, session) => {
                console.log('Auth state changed:', event);
                await this.handleAuthStateChange(session);
            });

            this.updateUI();
            console.log('✅ Authentication Manager initialized');
            
        } catch (error) {
            console.error('Error initializing auth manager:', error);
        }
    }

    async handleAuthStateChange(session) {
        if (session && session.user) {
            this.user = session.user;
            this.isAuthenticated = true;
            
            // Get user profile and role
            await this.loadUserProfile();
            
        } else {
            this.user = null;
            this.isAuthenticated = false;
            this.userRole = null;
            this.schoolId = null;
        }

        // Notify callbacks
        this.authCallbacks.forEach(callback => {
            try {
                callback(this.isAuthenticated, this.user, this.userRole);
            } catch (error) {
                console.error('Error in auth callback:', error);
            }
        });

        this.updateUI();
    }

    async loadUserProfile() {
        if (!this.user) return;

        const client = getSupabaseClient();
        if (!client) return;

        try {
            const { data: profile, error } = await client
                .from('user_profiles')
                .select('*')
                .eq('user_id', this.user.id)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
                console.error('Error loading user profile:', error);
                return;
            }

            if (profile) {
                this.userRole = profile.role;
                this.schoolId = profile.school_id;
                console.log(`User role: ${this.userRole}, School: ${this.schoolId}`);
            } else {
                // Create default profile for new user
                await this.createUserProfile();
            }
            
        } catch (error) {
            console.error('Error in loadUserProfile:', error);
        }
    }

    async createUserProfile() {
        if (!this.user) return;

        const client = getSupabaseClient();
        if (!client) return;

        try {
            const { data, error } = await client
                .from('user_profiles')
                .insert([{
                    user_id: this.user.id,
                    email: this.user.email,
                    full_name: this.user.user_metadata?.full_name || this.user.email,
                    role: 'teacher', // Default role
                    created_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) {
                console.error('Error creating user profile:', error);
                return;
            }

            this.userRole = data.role;
            this.schoolId = data.school_id;
            console.log('✅ User profile created');
            
        } catch (error) {
            console.error('Error in createUserProfile:', error);
        }
    }

    // Sign in with Google
    async signInWithGoogle() {
        const client = getSupabaseClient();
        if (!client) {
            this.showNotification('Authentication service not available', 'error');
            return;
        }

        try {
            const { data, error } = await client.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    scopes: 'openid email profile',
                    redirectTo: window.location.origin
                }
            });

            if (error) {
                console.error('Google sign in error:', error);
                this.showNotification('Failed to sign in with Google', 'error');
                return;
            }

            console.log('Google sign in initiated');
            
        } catch (error) {
            console.error('Error in signInWithGoogle:', error);
            this.showNotification('Authentication error', 'error');
        }
    }

    // Sign in with Microsoft (Azure AD)
    async signInWithMicrosoft() {
        const client = getSupabaseClient();
        if (!client) {
            this.showNotification('Authentication service not available', 'error');
            return;
        }

        try {
            const { data, error } = await client.auth.signInWithOAuth({
                provider: 'azure',
                options: {
                    scopes: 'openid email profile',
                    redirectTo: window.location.origin
                }
            });

            if (error) {
                console.error('Microsoft sign in error:', error);
                this.showNotification('Failed to sign in with Microsoft', 'error');
                return;
            }

            console.log('Microsoft sign in initiated');
            
        } catch (error) {
            console.error('Error in signInWithMicrosoft:', error);
            this.showNotification('Authentication error', 'error');
        }
    }

    // Sign out
    async signOut() {
        const client = getSupabaseClient();
        if (!client) return;

        try {
            const { error } = await client.auth.signOut();
            
            if (error) {
                console.error('Sign out error:', error);
                this.showNotification('Failed to sign out', 'error');
                return;
            }

            this.showNotification('Signed out successfully', 'success');
            
        } catch (error) {
            console.error('Error in signOut:', error);
        }
    }

    // Check if user has specific role
    hasRole(role) {
        return this.userRole === role;
    }

    // Check if user is super admin
    isSuperAdmin() {
        return this.hasRole('super_admin');
    }

    // Check if user is admin (legacy support + super_admin)
    isAdmin() {
        return this.hasRole('super_admin');
    }

    // Check if user can view analytics
    canViewAnalytics() {
        return this.hasRole('super_admin') || this.hasRole('analytics_viewer');
    }

    // Check if user is teacher
    isTeacher() {
        return this.hasRole('teacher') || this.hasRole('super_admin');
    }

    // Check if user can manage school settings
    canManageSchool() {
        return this.hasRole('super_admin');
    }

    // Get user's permissions
    getUserPermissions() {
        const rolePermissions = {
            'super_admin': ['manage_all', 'view_analytics', 'manage_users', 'manage_school', 'view_reports'],
            'analytics_viewer': ['view_analytics', 'view_reports', 'view_users'],
            'teacher': ['create_lessons', 'view_own_data', 'take_assessments'],
            'staff': ['view_own_data', 'take_assessments'],
            'student': ['view_own_data', 'take_assessments']
        };
        
        return rolePermissions[this.userRole] || [];
    }

    // Add authentication state change callback
    onAuthStateChange(callback) {
        this.authCallbacks.push(callback);
    }

    // Update UI based on authentication state
    updateUI() {
        // Update login/logout buttons
        const loginButtons = document.querySelectorAll('.auth-login-btn, .login-btn');
        const logoutButtons = document.querySelectorAll('.auth-logout-btn, .logout-btn');
        const userInfo = document.querySelectorAll('.user-info, .auth-user-info');
        const adminElements = document.querySelectorAll('.admin-only');

        loginButtons.forEach(btn => {
            btn.style.display = this.isAuthenticated ? 'none' : 'block';
        });

        logoutButtons.forEach(btn => {
            btn.style.display = this.isAuthenticated ? 'block' : 'none';
        });

        userInfo.forEach(element => {
            if (this.isAuthenticated && this.user) {
                element.style.display = 'block';
                element.textContent = this.user.user_metadata?.full_name || this.user.email;
            } else {
                element.style.display = 'none';
            }
        });

        adminElements.forEach(element => {
            element.style.display = this.canViewAnalytics() ? 'block' : 'none';
        });

        // Update navigation
        this.updateNavigation();
    }

    // Update navigation based on role
    updateNavigation() {
        // Add admin dashboard link for admins
        if (this.isAdmin()) {
            this.addAdminNavigation();
        }
    }

    // Add admin navigation elements
    addAdminNavigation() {
        const nav = document.querySelector('nav, .navigation, .nav-menu');
        if (!nav) return;

        // Check if dashboard link already exists
        if (nav.querySelector('.admin-dashboard-link')) return;

        const dashboardLink = document.createElement('a');
        dashboardLink.href = '#admin-dashboard';
        dashboardLink.className = 'admin-dashboard-link admin-only';
        
        // Set appropriate label based on role
        if (this.isSuperAdmin()) {
            dashboardLink.innerHTML = '<i class="fas fa-cog"></i> Admin Dashboard';
        } else if (this.hasRole('analytics_viewer')) {
            dashboardLink.innerHTML = '<i class="fas fa-chart-bar"></i> Analytics Dashboard';
        }
        
        dashboardLink.onclick = (e) => {
            e.preventDefault();
            this.openAdminDashboard();
        };

        nav.appendChild(dashboardLink);
    }

    // Open admin dashboard
    openAdminDashboard() {
        if (!this.canViewAnalytics()) {
            this.showNotification('Access denied - insufficient permissions', 'error');
            return;
        }

        // Initialize and show admin dashboard
        if (window.adminDashboard) {
            window.adminDashboard.show();
        } else {
            console.warn('Admin dashboard not initialized');
        }
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

// Assessment Data Manager
class AssessmentDataManager {
    constructor() {
        this.authManager = null;
    }

    setAuthManager(authManager) {
        this.authManager = authManager;
    }

    // Save assessment result
    async saveAssessment(assessmentType, data) {
        const client = getSupabaseClient();
        if (!client) {
            console.warn('Supabase not available - assessment saved locally only');
            return this.saveToLocalStorage(assessmentType, data);
        }

        try {
            const assessmentData = {
                assessment_type: assessmentType,
                data: data,
                created_at: new Date().toISOString(),
                user_id: this.authManager?.user?.id || null,
                school_id: this.authManager?.schoolId || null
            };

            const { data: result, error } = await client
                .from('assessments')
                .insert([assessmentData])
                .select()
                .single();

            if (error) {
                console.error('Error saving assessment:', error);
                // Fallback to local storage
                return this.saveToLocalStorage(assessmentType, data);
            }

            console.log('✅ Assessment saved to database');
            
            // Also save to localStorage as backup
            this.saveToLocalStorage(assessmentType, data);
            
            return result;
            
        } catch (error) {
            console.error('Error in saveAssessment:', error);
            return this.saveToLocalStorage(assessmentType, data);
        }
    }

    // Save to localStorage as fallback
    saveToLocalStorage(assessmentType, data) {
        try {
            const key = `assessment_${assessmentType}_${Date.now()}`;
            localStorage.setItem(key, JSON.stringify(data));
            console.log('Assessment saved to localStorage');
            return { id: key, local: true };
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return null;
        }
    }

    // Get user's assessments
    async getUserAssessments(userId = null) {
        const client = getSupabaseClient();
        if (!client) return [];

        try {
            const targetUserId = userId || this.authManager?.user?.id;
            if (!targetUserId) return [];

            const { data, error } = await client
                .from('assessments')
                .select('*')
                .eq('user_id', targetUserId)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching user assessments:', error);
                return [];
            }

            return data || [];
            
        } catch (error) {
            console.error('Error in getUserAssessments:', error);
            return [];
        }
    }

    // Get school assessments (for admins and analytics viewers)
    async getSchoolAssessments(schoolId = null) {
        const client = getSupabaseClient();
        if (!client || !this.authManager?.canViewAnalytics()) return [];

        try {
            const targetSchoolId = schoolId || this.authManager?.schoolId;
            if (!targetSchoolId) return [];

            const { data, error } = await client
                .from('assessments')
                .select(`
                    *,
                    user_profiles (
                        full_name,
                        email,
                        role
                    )
                `)
                .eq('school_id', targetSchoolId)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching school assessments:', error);
                return [];
            }

            return data || [];
            
        } catch (error) {
            console.error('Error in getSchoolAssessments:', error);
            return [];
        }
    }

    // Get lesson plans for teacher
    async getTeacherLessonPlans(teacherId = null) {
        const client = getSupabaseClient();
        if (!client) return [];

        try {
            const targetTeacherId = teacherId || this.authManager?.user?.id;
            if (!targetTeacherId) return [];

            const { data, error } = await client
                .from('lesson_plans')
                .select('*')
                .eq('teacher_id', targetTeacherId)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching lesson plans:', error);
                return [];
            }

            return data || [];
            
        } catch (error) {
            console.error('Error in getTeacherLessonPlans:', error);
            return [];
        }
    }

    // Save lesson plan
    async saveLessonPlan(lessonPlanData) {
        const client = getSupabaseClient();
        if (!client || !this.authManager?.isTeacher()) {
            console.warn('Cannot save lesson plan - insufficient permissions');
            return null;
        }

        try {
            const planData = {
                ...lessonPlanData,
                teacher_id: this.authManager.user.id,
                school_id: this.authManager.schoolId,
                created_at: new Date().toISOString()
            };

            const { data, error } = await client
                .from('lesson_plans')
                .insert([planData])
                .select()
                .single();

            if (error) {
                console.error('Error saving lesson plan:', error);
                return null;
            }

            console.log('✅ Lesson plan saved successfully');
            return data;
            
        } catch (error) {
            console.error('Error in saveLessonPlan:', error);
            return null;
        }
    }

    // Get school analytics data
    async getSchoolAnalytics(schoolId = null) {
        const client = getSupabaseClient();
        if (!client || !this.authManager?.canViewAnalytics()) return null;

        try {
            const targetSchoolId = schoolId || this.authManager?.schoolId;
            if (!targetSchoolId) return null;

            const { data, error } = await client
                .from('school_analytics')
                .select('*')
                .eq('school_id', targetSchoolId)
                .single();

            if (error) {
                console.error('Error fetching school analytics:', error);
                return null;
            }

            return data;
            
        } catch (error) {
            console.error('Error in getSchoolAnalytics:', error);
            return null;
        }
    }

    // Get teacher progress data
    async getTeacherProgress(schoolId = null) {
        const client = getSupabaseClient();
        if (!client || !this.authManager?.canViewAnalytics()) return [];

        try {
            const targetSchoolId = schoolId || this.authManager?.schoolId;
            if (!targetSchoolId) return [];

            const { data, error } = await client
                .from('teacher_progress')
                .select('*')
                .eq('school_id', targetSchoolId)
                .order('engagement_level', { ascending: false });

            if (error) {
                console.error('Error fetching teacher progress:', error);
                return [];
            }

            return data || [];
            
        } catch (error) {
            console.error('Error in getTeacherProgress:', error);
            return [];
        }
    }
}

// Initialize global instances
window.authManager = new AuthManager();
window.assessmentDataManager = new AssessmentDataManager();

// Set up the connection between managers
window.assessmentDataManager.setAuthManager(window.authManager);

// Export for use in other modules
window.AuthManager = AuthManager;
window.AssessmentDataManager = AssessmentDataManager;
window.getSupabaseClient = getSupabaseClient;

console.log('🔐 Supabase authentication system loaded');