# 🚀 Deploying to Vercel - Complete Guide

This guide shows you how to deploy your GMB OAuth integration to Vercel so your changes are live on the internet.

---

## Overview

You have two parts to deploy:

1. **Frontend** (React + Vite) → Vercel
2. **Backend** (Node.js + Express) → Vercel or separate server

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All code is tested locally and working
- [ ] `.env` file is NOT committed to Git
- [ ] `.env.local` is NOT committed to Git
- [ ] `.gitignore` includes `.env` and `.env.local`
- [ ] All changes are committed to Git
- [ ] Repository is pushed to GitHub

---

## Part 1: Deploy Frontend to Vercel

### Step 1: Push Code to GitHub

```bash
cd /home/ubuntu/project-repo

# Check git status
git status

# Add all changes
git add .

# Commit
git commit -m "Add GMB OAuth integration"

# Push to GitHub
git push origin main
```

### Step 2: Connect to Vercel

1. Go to **https://vercel.com/**
2. Sign up or log in with GitHub
3. Click **"New Project"**
4. Select your **whispering-hummingbird-skid** repository
5. Click **"Import"**

### Step 3: Configure Frontend Environment Variables

In Vercel dashboard:

1. Go to your project settings
2. Click **"Environment Variables"**
3. Add these variables:

```
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

Replace `your-backend-domain.com` with your actual backend domain (see Part 2)

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for deployment to complete
3. You'll get a URL like: `https://whispering-hummingbird-skid.vercel.app`

✅ **Frontend is deployed!**

---

## Part 2: Deploy Backend to Vercel

### Option A: Deploy Backend to Vercel (Recommended)

#### Step 1: Create `vercel.json`

In your project root, create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "backend/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### Step 2: Update Backend for Vercel

Edit `backend/server.js`:

```javascript
// Change this line:
// res.redirect(`http://localhost:5173/settings?token=${token}`);

// To this:
res.redirect(`https://your-frontend-domain.vercel.app/settings?token=${token}`);
```

Replace `your-frontend-domain` with your actual Vercel frontend URL.

#### Step 3: Push to GitHub

```bash
git add vercel.json backend/server.js
git commit -m "Configure backend for Vercel deployment"
git push origin main
```

#### Step 4: Deploy Backend to Vercel

1. Go to **https://vercel.com/**
2. Click **"New Project"**
3. Select your repository again
4. In **"Root Directory"**, select **"backend"** (or leave default)
5. Add environment variables:

```
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=https://your-backend-vercel-domain.vercel.app/api/oauth/callback
NODE_ENV=production
PORT=3000
```

6. Click **"Deploy"**
7. You'll get a URL like: `https://gmb-backend.vercel.app`

✅ **Backend is deployed!**

---

## Part 3: Update Google Cloud Console

### Step 1: Update Redirect URIs

1. Go to **https://console.cloud.google.com/**
2. Go to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 credentials
4. Update **Authorized redirect URIs**:

```
https://your-backend-domain.vercel.app/api/oauth/callback
```

### Step 2: Update CORS Origins (if needed)

Some APIs require CORS origins:

```
https://your-frontend-domain.vercel.app
https://your-backend-domain.vercel.app
```

---

## Part 4: Update Environment Variables

### Frontend (Vercel Dashboard)

1. Go to your frontend project on Vercel
2. Settings → Environment Variables
3. Update:

```
VITE_API_BASE_URL=https://your-backend-domain.vercel.app/api
```

### Backend (Vercel Dashboard)

1. Go to your backend project on Vercel
2. Settings → Environment Variables
3. Update all variables with production values

---

## Testing After Deployment

### Test Frontend

1. Go to your frontend URL: `https://your-frontend-domain.vercel.app/settings`
2. You should see the Settings page
3. Click "Sign in with Google"
4. Complete the OAuth flow
5. Verify profiles load
6. Test editing and saving

### Test Backend

1. Go to your backend health check:
   ```
   https://your-backend-domain.vercel.app/health
   ```
2. You should see:
   ```json
   {"status":"ok","message":"GMB API server is running"}
   ```

### Check Logs

In Vercel dashboard:
1. Click on your project
2. Go to **"Deployments"**
3. Click the latest deployment
4. Go to **"Logs"** tab
5. Check for any errors

---

## Common Deployment Issues

### Issue: "Redirect URI mismatch"

**Problem:** OAuth fails after deployment

**Solution:**
1. Update Google Cloud Console with production redirect URI
2. Update `.env` in backend with production redirect URI
3. Redeploy backend
4. Wait 5 minutes for changes to propagate

### Issue: "Failed to fetch profiles"

**Problem:** Frontend can't connect to backend

**Solution:**
1. Check `VITE_API_BASE_URL` is correct in frontend
2. Check backend is deployed and running
3. Check backend logs for errors
4. Verify CORS is enabled in backend

### Issue: "Cannot find module"

**Problem:** Backend deployment fails

**Solution:**
1. Make sure `package.json` includes all dependencies
2. Run `npm install` locally to verify
3. Commit `package-lock.json` to Git
4. Redeploy

### Issue: "Build failed"

**Problem:** Frontend deployment fails

**Solution:**
1. Check build logs in Vercel
2. Run `npm run build` locally to test
3. Fix any build errors
4. Commit and push
5. Redeploy

---

## Production Checklist

Before going live:

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Vercel
- [ ] Google Cloud redirect URIs updated
- [ ] Environment variables set in Vercel
- [ ] Frontend can reach backend
- [ ] OAuth flow works end-to-end
- [ ] Profiles load correctly
- [ ] Business info can be saved
- [ ] No console errors
- [ ] No network errors
- [ ] HTTPS is enabled (automatic on Vercel)

---

## Monitoring After Deployment

### Set Up Error Tracking

1. Go to Vercel dashboard
2. Go to **"Integrations"**
3. Add error tracking service (Sentry, LogRocket, etc.)

### Check Logs Regularly

1. Vercel dashboard → Deployments → Logs
2. Check for errors and warnings
3. Monitor API response times

### Monitor Backend

1. Check backend health endpoint regularly
2. Monitor error rates
3. Check token refresh issues

---

## Rollback if Issues Occur

### Rollback Frontend

1. Go to Vercel dashboard
2. Go to **"Deployments"**
3. Find the previous working deployment
4. Click **"Redeploy"**

### Rollback Backend

Same process as frontend

---

## Update Process (After Initial Deployment)

When you make changes locally:

1. Test locally
2. Commit to Git:
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```
3. Vercel automatically redeploys
4. Wait for deployment to complete
5. Test on production URL

---

## Domain Setup (Optional)

To use your own domain instead of vercel.app:

### For Frontend

1. Vercel dashboard → Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for DNS propagation

### For Backend

Same process

---

## Performance Tips

### Frontend

- Vercel automatically optimizes and caches
- Use `npm run build` to test build locally
- Check bundle size: `npm run build -- --analyze`

### Backend

- Monitor API response times
- Check database query times (if using database)
- Use caching for profile data

---

## Security Checklist

- [ ] Never commit `.env` files
- [ ] Use strong Google Client Secret
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Keep dependencies updated
- [ ] Monitor for security vulnerabilities
- [ ] Use environment variables for secrets
- [ ] Validate all user inputs

---

## Troubleshooting Deployment

### Can't see changes after deployment

1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Check Vercel deployment status
4. Check if latest commit was deployed

### Changes work locally but not on Vercel

1. Make sure all files are committed
2. Check environment variables are set
3. Check build logs for errors
4. Verify all dependencies are in package.json

### Backend not responding

1. Check backend deployment status
2. Check backend logs for errors
3. Verify environment variables
4. Check if backend is still running

---

## Summary

### Deployment Steps

1. ✅ Test locally
2. ✅ Commit to Git
3. ✅ Deploy frontend to Vercel
4. ✅ Deploy backend to Vercel
5. ✅ Update Google Cloud Console
6. ✅ Set environment variables
7. ✅ Test on production
8. ✅ Monitor for issues

### Your Production URLs

- **Frontend:** `https://whispering-hummingbird-skid.vercel.app`
- **Backend:** `https://gmb-backend.vercel.app` (or your domain)

### Next Steps

1. Deploy frontend
2. Deploy backend
3. Update Google Cloud
4. Test end-to-end
5. Monitor for issues

---

## 🎉 You're Ready to Deploy!

Follow this guide and your GMB OAuth integration will be live on the internet!

**Questions?** Check the troubleshooting section or review the testing guide.

