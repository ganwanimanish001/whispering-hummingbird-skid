# ✅ GMB OAuth Integration - Setup Checklist

All files have been copied to your project! Here's what's been done and what you need to do next.

## ✅ Completed

- [x] Frontend services created (oauthService.ts, profileService.ts)
- [x] Frontend components created (GoogleSignIn.tsx, ProfileSelector.tsx)
- [x] Settings page updated with OAuth integration
- [x] Frontend .env.local created
- [x] Backend folder structure created
- [x] Backend routes copied (oauth.js, profiles.js)
- [x] Backend service copied (gmbService.js)
- [x] Backend server.js template created
- [x] Backend .env.backend template created

## 📋 Your Project Structure Now

```
project-repo/
├── src/
│   ├── services/
│   │   ├── oauthService.ts          ✅ Ready
│   │   └── profileService.ts        ✅ Ready
│   ├── components/
│   │   └── auth/
│   │       ├── GoogleSignIn.tsx     ✅ Ready
│   │       └── ProfileSelector.tsx  ✅ Ready
│   └── pages/
│       └── Settings.tsx             ✅ Ready (updated)
├── backend/
│   ├── server.js                    ✅ Ready (template)
│   ├── routes/
│   │   ├── oauth.js                 ✅ Ready
│   │   └── profiles.js              ✅ Ready
│   └── services/
│       └── gmbService.js            ✅ Ready
├── .env.local                       ✅ Ready
├── .env.backend                     ✅ Ready (template)
└── package.json
```

## 🚀 Next Steps (What You Need to Do)

### Step 1: Update Backend .env
1. Open `.env.backend` in your project
2. Replace the placeholder values with your Google Cloud credentials:
   ```
   GOOGLE_CLIENT_ID=your_actual_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_actual_client_secret
   ```
3. Rename `.env.backend` to `.env`
   ```bash
   mv .env.backend .env
   ```

### Step 2: Install Backend Dependencies
```bash
npm install express axios dotenv cors body-parser
```

### Step 3: Update package.json
Add this to your `package.json` scripts section:
```json
"scripts": {
  "backend": "node backend/server.js",
  "backend:dev": "nodemon backend/server.js"
}
```

### Step 4: Start Backend Server
```bash
npm run backend
# or with auto-reload:
npm run backend:dev
```

The backend will run on `http://localhost:3001`

### Step 5: Start Frontend (in another terminal)
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Step 6: Test the Integration
1. Go to `http://localhost:5173/settings`
2. Click "Sign in with Google"
3. Authorize the application
4. Select your business profile
5. Update business information
6. Click "Save Changes"

## 🔑 Getting Google Credentials

If you haven't already:

1. Go to https://console.cloud.google.com/
2. Create a new project or select existing one
3. Enable these APIs:
   - Google My Business API
   - My Business Account Management API
   - My Business Business Information API
4. Go to Credentials → Create OAuth 2.0 credentials
5. Choose "Web application"
6. Add redirect URI: `http://localhost:3001/api/oauth/callback`
7. Copy your Client ID and Client Secret
8. Paste them in `.env` file

## 📁 File Locations

- **Frontend:** `/home/ubuntu/project-repo/`
- **Backend:** `/home/ubuntu/project-repo/backend/`
- **Env files:** 
  - Frontend: `/home/ubuntu/project-repo/.env.local`
  - Backend: `/home/ubuntu/project-repo/.env`

## ⚠️ Important Notes

- ❌ Don't commit `.env` to Git (it's in .gitignore)
- ✅ The `.env.local` is for frontend (Vite reads it)
- ✅ The `.env` is for backend (Node.js reads it)
- ✅ Make sure both servers run on different ports (5173 and 3001)

## 🐛 Troubleshooting

### "Cannot find module 'express'"
```bash
npm install express axios dotenv cors body-parser
```

### "Redirect URI mismatch"
- Check `.env` file has correct `GOOGLE_REDIRECT_URI`
- Make sure it matches Google Cloud Console exactly

### "No profiles found"
- Verify your Google account has a GMB profile
- Check that OAuth scopes include `business.manage`

### "Failed to connect to backend"
- Make sure backend is running on port 3001
- Check `VITE_API_BASE_URL=http://localhost:3001/api` in `.env.local`

## ✅ Verification

Run these commands to verify everything is set up:

```bash
# Check frontend files
ls -la src/services/
ls -la src/components/auth/
ls -la src/pages/Settings.tsx

# Check backend files
ls -la backend/routes/
ls -la backend/services/
ls -la backend/server.js

# Check env files
cat .env.local
cat .env
```

## 🎯 Summary

All files are in place! You just need to:
1. ✏️ Update `.env` with Google credentials
2. 📦 Install dependencies: `npm install express axios dotenv cors body-parser`
3. 🚀 Start backend: `npm run backend`
4. 🚀 Start frontend: `npm run dev`
5. 🧪 Test at `http://localhost:5173/settings`

**You're all set!** 🎉

