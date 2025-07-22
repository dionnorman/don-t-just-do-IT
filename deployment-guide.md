# School Instance Deployment Guide

This guide provides step-by-step instructions for deploying the Educational Technology Assessment platform for a new school or district.

## Overview

Each school gets their own dedicated instance with:
- Custom domain configuration
- Isolated data and user management
- School-specific branding and settings
- Independent OAuth provider setup
- Customized analytics and reporting

## Prerequisites

- Supabase account with Pro plan (for production use)
- Domain name for the school (e.g., `edtech.yourschool.edu`)
- SSL certificate
- Access to school's Google Workspace or Microsoft 365 admin
- Basic understanding of web hosting and DNS management

## Step 1: Infrastructure Setup

### 1.1 Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Configure:
   - **Name**: `[School Name] EdTech Platform`
   - **Organization**: Select or create organization
   - **Database Password**: Generate secure password
   - **Region**: Choose closest to school location
   - **Plan**: Pro (for production) or Free (for testing)

### 1.2 Configure Database Schema

Execute the migration scripts in order:

```sql
-- 1. Run the base schema migration
-- (Use the schema from enhanced_multi_tenant_roles_fixed.sql)

-- 2. Create the school record
INSERT INTO schools (name, address, contact_email, settings) VALUES (
    'Your School Name',
    'School Address',
    'admin@yourschool.edu',
    '{
        "oauth_providers": ["google", "microsoft"],
        "domain_whitelist": ["yourschool.edu", "students.yourschool.edu"],
        "auto_assign_role": "teacher",
        "require_domain_verification": true
    }'
);

-- 3. Create initial super admin user
INSERT INTO user_profiles (email, full_name, role, school_id, position, is_active, profile_completed) VALUES (
    'admin@yourschool.edu',
    'School Administrator',
    'super_admin',
    (SELECT id FROM schools WHERE contact_email = 'admin@yourschool.edu'),
    'Principal',
    true,
    true
);
```

### 1.3 Configure Authentication

1. In Supabase Dashboard, go to **Authentication** > **Settings**
2. Configure:
   - **Site URL**: `https://edtech.yourschool.edu`
   - **Additional Redirect URLs**: Add any additional domains
   - **JWT expiry**: 3600 seconds (1 hour)
   - **Enable email confirmations**: true

## Step 2: Domain and Hosting Setup

### 2.1 Frontend Deployment Options

#### Option A: Netlify (Recommended)
1. Fork the repository to school's GitHub organization
2. Connect to Netlify
3. Configure build settings:
   - **Build command**: `npm run build` (if applicable)
   - **Publish directory**: `src`
4. Set custom domain: `edtech.yourschool.edu`

#### Option B: School's Existing Web Infrastructure
1. Download the source code
2. Update configuration files with school-specific settings
3. Deploy to school's web server
4. Configure SSL certificate

### 2.2 Environment Configuration

Create environment-specific configuration:

```javascript
// js/school-config.js
const SCHOOL_CONFIG = {
    name: 'Your School Name',
    domain: 'yourschool.edu',
    logo: 'images/school-logo.png',
    colors: {
        primary: '#003366',   // School colors
        secondary: '#0066CC',
        accent: '#FF6600'
    },
    supabase: {
        url: 'https://your-project.supabase.co',
        anonKey: 'your-anon-key'
    },
    features: {
        enableAnalytics: true,
        enableLessonPlans: true,
        enableRoadmaps: true,
        allowPublicAssessments: false
    }
};
```

## Step 3: OAuth Provider Configuration

### 3.1 Google Workspace Setup

Follow the detailed steps in `oauth-setup-guide.md`:

1. Create Google Cloud Project
2. Enable APIs (Google+ API, People API)
3. Configure OAuth consent screen
4. Create OAuth credentials
5. Update Supabase authentication settings

### 3.2 Microsoft 365 Setup

1. Register application in Azure AD
2. Configure authentication settings
3. Create client secret
4. Set API permissions
5. Update Supabase authentication settings

### 3.3 Domain Verification

Update school settings in database:

```sql
UPDATE schools 
SET settings = jsonb_set(
    settings, 
    '{domain_verification}', 
    '{
        "verified": true,
        "verification_date": "2024-07-22",
        "method": "DNS_TXT",
        "verified_by": "admin@yourschool.edu"
    }'::jsonb
)
WHERE contact_email = 'admin@yourschool.edu';
```

## Step 4: Customization and Branding

### 4.1 Update Branding

1. Replace logo in `images/school-logo.png`
2. Update colors in `css/school-theme.css`:

```css
:root {
    --school-primary: #003366;
    --school-secondary: #0066CC;
    --school-accent: #FF6600;
    --school-text: #333333;
}
```

3. Update site title and meta tags in `index.html`

### 4.2 Configure School-Specific Content

1. Update welcome messages
2. Customize assessment instructions
3. Add school-specific resources
4. Configure reporting templates

## Step 5: Security Configuration

### 5.1 Row Level Security (RLS)

RLS policies are automatically applied to ensure data isolation:

```sql
-- Verify RLS is enabled on all tables
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = false;

-- Should return no results - all tables should have RLS enabled
```

### 5.2 API Security

1. **Supabase Keys**:
   - Use `anon` key for frontend
   - Keep `service_role` key secure (server-side only)
   - Rotate keys annually

2. **Database Policies**:
   - Users can only access their school's data
   - Admins can only manage their school
   - Anonymous users cannot access any data

### 5.3 Environment Variables

For production deployments, use environment variables:

```bash
# Production Environment Variables
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SCHOOL_DOMAIN=yourschool.edu
ENABLE_ANALYTICS=true
LOG_LEVEL=error
```

## Step 6: Testing and Validation

### 6.1 Authentication Testing

Test with different user types:

1. **Super Admin** (`admin@yourschool.edu`)
2. **Analytics Viewer** (`analytics@yourschool.edu`)
3. **Teacher** (`teacher@yourschool.edu`)
4. **Staff** (`staff@yourschool.edu`)
5. **External User** (`external@otherschool.edu` - should be rejected)

### 6.2 Functionality Testing

1. ✅ User registration and login
2. ✅ Role-based access control
3. ✅ Assessment creation and completion
4. ✅ Lesson plan management
5. ✅ Analytics dashboard access
6. ✅ Data export functionality
7. ✅ Strategic roadmap features

### 6.3 Performance Testing

1. Load test with multiple concurrent users
2. Verify database query performance
3. Test file upload limits
4. Validate mobile responsiveness

## Step 7: Training and Onboarding

### 7.1 Administrator Training

Provide training for:
- User management
- Assessment configuration
- Analytics interpretation
- System maintenance

### 7.2 Teacher Onboarding

Create materials for:
- Platform navigation
- Assessment taking
- Lesson plan creation
- Professional development tracking

### 7.3 Support Documentation

Develop school-specific:
- User guides
- FAQ documents
- Video tutorials
- Troubleshooting guides

## Step 8: Go-Live Checklist

### Pre-Launch (1 week before)
- [ ] All testing completed successfully
- [ ] OAuth providers configured and tested
- [ ] SSL certificate installed and verified
- [ ] Backup procedures established
- [ ] Support documentation finalized
- [ ] Training sessions conducted

### Launch Day
- [ ] DNS cutover to production domain
- [ ] Monitor system performance
- [ ] Verify all authentication flows
- [ ] Test critical user journeys
- [ ] Communication to school community

### Post-Launch (1 week after)
- [ ] Gather user feedback
- [ ] Monitor system metrics
- [ ] Address any issues promptly
- [ ] Plan additional training if needed
- [ ] Document lessons learned

## Ongoing Maintenance

### Monthly Tasks
- Review user activity and engagement
- Update assessment content as needed
- Monitor system performance metrics
- Backup verification

### Quarterly Tasks
- Review and update OAuth certificates
- Analyze assessment data trends
- Update strategic roadmaps
- Security audit and updates

### Annual Tasks
- Renew SSL certificates
- Review and update RLS policies
- Major feature updates
- Comprehensive security review

## Troubleshooting Common Issues

### Authentication Problems

**Issue**: Users cannot log in
**Solutions**:
1. Verify OAuth provider configuration
2. Check domain whitelist settings
3. Confirm user email domain matches school domain
4. Review Supabase auth logs

### Performance Issues

**Issue**: Slow loading times
**Solutions**:
1. Enable database connection pooling
2. Optimize database queries
3. Implement CDN for static assets
4. Review and update database indexes

### Data Access Problems

**Issue**: Users see wrong data or no data
**Solutions**:
1. Verify RLS policies are correct
2. Check user role assignments
3. Confirm school_id associations
4. Review authentication state

## Support and Escalation

### Level 1: School IT Support
- User account issues
- Basic navigation problems
- Password resets
- General troubleshooting

### Level 2: Platform Support
- Configuration issues
- OAuth provider problems
- Performance optimization
- Feature requests

### Level 3: Development Team
- Critical system issues
- Security vulnerabilities
- Major customizations
- Infrastructure problems

## Cost Estimation

### Infrastructure Costs (Monthly)
- **Supabase Pro**: $25/month
- **Hosting (Netlify Pro)**: $19/month
- **Domain/SSL**: $1-10/month
- **Total**: ~$45-55/month per school

### Implementation Costs (One-time)
- **Setup and Configuration**: 8-16 hours
- **Customization**: 4-8 hours
- **Testing and Training**: 4-8 hours
- **Total**: 16-32 hours of development time

This deployment guide ensures each school gets a fully functional, secure, and customized educational technology assessment platform that can scale with their needs while maintaining data privacy and security.