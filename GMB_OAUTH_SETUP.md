# GMB OAuth 2.0 Integration Setup Guide

This guide will help you integrate the Google Business Profile OAuth 2.0 authentication into your project.

## Files Added

### Services
- `src/services/oauthService.ts` - OAuth authentication service
- `src/services/profileService.ts` - GMB profile management service

### Components
- `src/components/auth/GoogleSignIn.tsx` - Google Sign-In button component
- `src/components/auth/ProfileSelector.tsx` - Profile selection component

### Pages
- `src/pages/SettingsNew.tsx` - Enhanced Settings page with OAuth integration

## Step 1: Update Environment Variables

Create a `.env.local` file in your project root:

```
VITE_API_BASE_URL=http://localhost:3001/api
```

For production:
```
VITE_API_BASE_URL=https://yourdomain.com/api
```

## Step 2: Replace Settings Page

1. Backup your current `src/pages/Settings.tsx`
2. Replace it with the new version:
   ```bash
   mv src/pages/Settings.tsx src/pages/SettingsOld.tsx
   mv src/pages/SettingsNew.tsx src/pages/Settings.tsx
   ```

## Step 3: Install Backend Dependencies

In your backend project, install required packages:

```bash
npm install express axios dotenv cors body-parser
```

## Step 4: Add Backend Routes

Add these routes to your Express server:

```javascript
// server.js or app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const oauthRoutes = require('./backend/routes/oauth');
const profileRoutes = require('./backend/routes/profiles');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/oauth', oauthRoutes);
app.use('/api/profiles', profileRoutes);

// OAuth callback success page
app.get('/oauth-success', (req, res) => {
  const token = req.query.token;
  res.redirect(`/settings?token=${token}`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Step 5: Configure Google Cloud

1. Create a project at https://console.cloud.google.com/
2. Enable these APIs:
   - Google My Business API
   - My Business Account Management API
   - My Business Business Information API
3. Create OAuth 2.0 credentials:
   - Go to Credentials
   - Create OAuth client ID (Web application)
   - Add redirect URI: `http://localhost:3001/api/oauth/callback`
4. Copy your Client ID and Client Secret

## Step 6: Set Backend Environment Variables

Create `.env` in your backend root:

```
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3001/api/oauth/callback
NODE_ENV=development
PORT=3001
```

## Step 7: Copy Backend Files

Copy these files from `/home/ubuntu/gmb-integration/backend/` to your project:

```
your-project/backend/
├── routes/
│   ├── oauth.js
│   └── profiles.js
└── services/
    └── gmbService.js
```

## Step 8: Test the Integration

1. Start your backend:
   ```bash
   npm run dev
   ```

2. In another terminal, start your frontend:
   ```bash
   npm run dev
   ```

3. Navigate to `http://localhost:5173/settings`
4. Click "Sign in with Google"
5. Authorize the application
6. Select your business profile
7. Update business information and save

## Troubleshooting

### "Redirect URI mismatch"
- Verify your redirect URI in Google Cloud Console matches your `.env` file exactly
- Default: `http://localhost:3001/api/oauth/callback`

### "No profiles found"
- Ensure your Google account has a Google Business Profile created
- Check that the `business.manage` scope is enabled

### "Failed to fetch profiles"
- Verify your backend is running on port 3001
- Check browser console for detailed error messages
- Ensure `VITE_API_BASE_URL` is set correctly

### CORS errors
- Make sure CORS is enabled in your Express server:
  ```javascript
  app.use(cors());
  ```

## Production Deployment

1. Update redirect URI in Google Cloud Console:
   ```
   https://yourdomain.com/api/oauth/callback
   ```

2. Update environment variables:
   ```
   VITE_API_BASE_URL=https://yourdomain.com/api
   GOOGLE_REDIRECT_URI=https://yourdomain.com/api/oauth/callback
   ```

3. Deploy backend and frontend

## Features Implemented

✅ Google OAuth 2.0 authentication
✅ Discover all GMB profiles
✅ Switch between profiles
✅ Update business information
✅ Manage AI preferences
✅ Secure token management
✅ Automatic token refresh
✅ Logout functionality

## Next Steps

- Add database for token storage
- Implement review management
- Add post creation and scheduling
- Build analytics dashboard
- Add multi-location support

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Check server logs for backend errors
4. Verify all environment variables are set correctly

---

**Happy coding!** 🚀
