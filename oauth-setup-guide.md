# OAuth Provider Setup Guide for Schools

This guide provides step-by-step instructions for setting up OAuth authentication for your school's instance of the Educational Technology Assessment platform.

## Prerequisites

- Supabase project with authentication enabled
- School domain verification capabilities
- Administrator access to Google Workspace or Microsoft 365

## Google Workspace Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Name it: `[School Name] EdTech Platform`

### 2. Enable Google OAuth API

1. Navigate to **APIs & Services** > **Library**
2. Search for "Google+ API" and enable it
3. Search for "People API" and enable it

### 3. Configure OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Choose **Internal** (for Google Workspace organizations)
3. Fill in application information:
   - **Application name**: `[School Name] Educational Technology Platform`
   - **User support email**: Your IT support email
   - **Logo**: Upload your school logo (120x120px)
   - **Application homepage**: `https://your-school-domain.com`
   - **Authorized domains**: Add your school domain

### 4. Create OAuth Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client ID**
3. Choose **Web application**
4. Configure:
   - **Name**: `School EdTech Platform`
   - **Authorized JavaScript origins**: 
     - `https://your-supabase-project.supabase.co`
     - `https://your-school-domain.com` (if custom domain)
   - **Authorized redirect URIs**:
     - `https://your-supabase-project.supabase.co/auth/v1/callback`

### 5. Configure Supabase

1. In Supabase Dashboard, go to **Authentication** > **Providers**
2. Enable **Google** provider
3. Add your **Client ID** and **Client Secret**
4. Set **Redirect URL**: `https://your-supabase-project.supabase.co/auth/v1/callback`

## Microsoft Azure AD Setup

### 1. Register Application in Azure AD

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Configure:
   - **Name**: `[School Name] EdTech Platform`
   - **Supported account types**: Accounts in this organizational directory only
   - **Redirect URI**: Web - `https://your-supabase-project.supabase.co/auth/v1/callback`

### 2. Configure Authentication

1. In your app registration, go to **Authentication**
2. Add additional redirect URIs if needed
3. Enable **ID tokens** under **Implicit grant and hybrid flows**

### 3. Create Client Secret

1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Add description: `Supabase Integration`
4. Set expiration (recommend 24 months)
5. **Save the secret value immediately** (you won't see it again)

### 4. Set API Permissions

1. Go to **API permissions**
2. Add permissions:
   - **Microsoft Graph** > **Delegated permissions**
   - Add: `openid`, `profile`, `email`, `User.Read`
3. Grant admin consent for your organization

### 5. Configure Supabase

1. In Supabase Dashboard, go to **Authentication** > **Providers**
2. Enable **Azure** provider
3. Add your **Client ID** and **Client Secret**
4. Set **Azure Tenant ID**: Your Azure AD tenant ID

## Domain-Based Auto-Assignment Configuration

### Update School Settings

```sql
-- Configure your school's OAuth settings and domain restrictions
UPDATE schools 
SET settings = jsonb_set(
    settings, 
    '{oauth_config}', 
    '{
        "providers": ["google", "microsoft"],
        "domain_restrictions": {
            "allowed_domains": ["springfieldschools.edu", "staff.springfieldschools.edu"],
            "default_role": "teacher",
            "role_mapping": {
                "admin@springfieldschools.edu": "super_admin",
                "principal@springfieldschools.edu": "super_admin",
                "analytics@springfieldschools.edu": "analytics_viewer"
            }
        },
        "auto_create_profiles": true,
        "require_domain_verification": true
    }'::jsonb
)
WHERE id = 'your-school-id';
```

## Security Considerations

### Production Checklist

- [ ] Enable domain restrictions
- [ ] Set up proper role mappings
- [ ] Configure session timeouts
- [ ] Enable email verification
- [ ] Set up audit logging
- [ ] Implement IP whitelisting (if required)
- [ ] Configure backup authentication method

### Environment Variables

For production deployment, set these environment variables:

```bash
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
AZURE_CLIENT_ID=your-azure-client-id
AZURE_CLIENT_SECRET=your-azure-client-secret
AZURE_TENANT_ID=your-azure-tenant-id

# School Configuration
SCHOOL_DOMAIN=your-school-domain.edu
SCHOOL_NAME=Your School Name
```

## Testing OAuth Integration

### Test Users for Different Scenarios

1. **Super Admin**: `admin@your-school-domain.edu`
2. **Analytics Viewer**: `analytics@your-school-domain.edu`
3. **Teacher**: `teacher@your-school-domain.edu`
4. **Staff**: `staff@your-school-domain.edu`
5. **External User**: `external@other-domain.com` (should be rejected)

### Verification Steps

1. Test login with each user type
2. Verify role assignment is correct
3. Check dashboard access permissions
4. Test assessment creation and viewing
5. Verify data isolation between schools

## Troubleshooting

### Common Issues

**OAuth Login Fails**
- Verify redirect URIs match exactly
- Check client ID and secret are correct
- Ensure APIs are enabled in Google Cloud/Azure

**Role Assignment Issues**
- Check domain mapping configuration
- Verify email domain matches allowed domains
- Review RLS policies in Supabase

**Permission Denied Errors**
- Check user role in database
- Verify RLS policies are configured correctly
- Ensure school_id is set properly

### Support Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Microsoft Azure AD Documentation](https://docs.microsoft.com/en-us/azure/active-directory/)

## Demo Configuration

For the current demo setup:

**School**: Demo School District  
**Domain**: springfieldschools.edu  
**Available Test Accounts**:
- `analytics@springfieldschools.edu` (Analytics Viewer)
- `emily.rodriguez@springfieldschools.edu` (Math Teacher)
- `david.thompson@springfieldschools.edu` (Science Teacher)
- `lisa.park@springfieldschools.edu` (English Teacher)
- `robert.williams@springfieldschools.edu` (Media Specialist)
- `jennifer.davis@springfieldschools.edu` (School Counselor)
- `student.demo@springfieldschools.edu` (Student)

These accounts are pre-configured with appropriate roles and can be used for testing the system functionality.