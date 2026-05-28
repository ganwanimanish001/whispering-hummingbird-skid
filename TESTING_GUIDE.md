# 🧪 Testing Guide - GMB OAuth Integration

This guide shows you exactly how to test the new GMB OAuth integration step by step.

---

## Prerequisites

Before testing, make sure you have:

✅ Google Cloud credentials (Client ID and Secret)
✅ Updated `.env` file with credentials
✅ Installed dependencies: `npm install express axios dotenv cors body-parser`
✅ Your Google account has a GMB profile created

---

## 🚀 Step 1: Start the Backend Server

Open a **new terminal** and run:

```bash
cd /home/ubuntu/project-repo
npm run backend
```

You should see:
```
🚀 GMB API Server running on port 3001
📍 OAuth callback: http://localhost:3001/api/oauth/callback
🔗 Frontend: http://localhost:5173
```

✅ **Backend is ready!**

---

## 🚀 Step 2: Start the Frontend Server

Open **another terminal** and run:

```bash
cd /home/ubuntu/project-repo
npm run dev
```

You should see:
```
  VITE v5.0.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ **Frontend is ready!**

---

## 🧪 Step 3: Test the OAuth Flow

### Test 3a: Navigate to Settings Page

1. Open your browser
2. Go to: **http://localhost:5173/settings**
3. You should see the Settings page with a blue "Sign in with Google" button

✅ **Settings page loads**

### Test 3b: Click Sign In Button

1. Click the **"Sign in with Google"** button
2. You'll be redirected to Google's login page
3. Sign in with your Google account
4. Google will ask for permissions - click **"Allow"**

✅ **OAuth flow works**

### Test 3c: Verify Profile Selection

After authorizing:
1. You should see your business profiles displayed
2. Each profile shows:
   - Business name
   - Address
   - Rating and review count
   - Photo count
3. One profile should be marked as "Selected"

✅ **Profiles are discovered**

### Test 3d: Select a Profile

1. Click on a different profile card
2. It should show "Selected" badge
3. The business information should update below

✅ **Profile switching works**

### Test 3e: Edit Business Information

1. In the "Business Information" section, edit:
   - Business Name
   - Category
   - Address
   - Website
   - Phone Number
   - Description

2. Click **"Save Changes"** button
3. You should see a success message: "Business information updated successfully!"

✅ **Profile updates work**

### Test 3f: Configure AI Preferences

1. In the right sidebar, select different tones:
   - Professional
   - Friendly
   - Casual
   - Excited

2. Toggle "Respond to 5-star reviews" on/off

✅ **AI preferences work**

### Test 3g: Disconnect Account

1. Click the **"Disconnect"** button (red button in connection section)
2. Confirm the disconnection
3. You should be logged out and see the "Sign in with Google" button again

✅ **Disconnect works**

---

## 📊 Testing Checklist

Use this checklist to verify everything works:

### OAuth & Authentication
- [ ] Settings page loads without errors
- [ ] "Sign in with Google" button is visible
- [ ] Clicking button redirects to Google login
- [ ] Google OAuth flow completes successfully
- [ ] User is redirected back to settings page
- [ ] User email is displayed in connection status
- [ ] "Connected to Google Business Profile" message shows

### Profile Discovery
- [ ] Business profiles are displayed
- [ ] Profile cards show business name, address, rating
- [ ] Review count and photo count are visible
- [ ] At least one profile is marked as "Selected"
- [ ] No error messages appear

### Profile Selection
- [ ] Can click on different profiles
- [ ] Selected profile changes
- [ ] Business information updates when profile changes
- [ ] Profile details are accurate

### Business Information
- [ ] Can edit all fields (name, category, address, website, phone, description)
- [ ] "Save Changes" button is clickable
- [ ] Success message appears after saving
- [ ] No error messages appear

### AI Preferences
- [ ] Can select different tones
- [ ] Selected tone is highlighted
- [ ] Can toggle auto-response switch
- [ ] Settings persist (don't reset on page refresh)

### Disconnect
- [ ] "Disconnect" button is visible
- [ ] Confirmation dialog appears
- [ ] After confirming, user is logged out
- [ ] "Sign in with Google" button appears again
- [ ] All user data is cleared

---

## 🔍 Browser Console Testing

Open browser developer tools (F12) and check the Console tab:

### What to Look For

✅ **No red errors** - Check for any JavaScript errors
✅ **Network requests** - Check Network tab for API calls:
   - `GET /api/oauth/auth-url` - Should return 200
   - `GET /api/profiles` - Should return 200 with profile list
   - `PUT /api/profiles/{id}` - Should return 200 after saving

✅ **Local Storage** - Check Application → Local Storage:
   - `gmb_access_token` - Should be set after login
   - `gmb_user_email` - Should contain your email
   - `gmb_token_expiry` - Should have expiration time

---

## 🐛 Common Issues & Solutions

### Issue: "Redirect URI mismatch"

**Problem:** Google shows redirect URI error

**Solution:**
1. Check `.env` file: `GOOGLE_REDIRECT_URI=http://localhost:3001/api/oauth/callback`
2. Go to Google Cloud Console
3. Go to Credentials
4. Edit your OAuth 2.0 credentials
5. Verify Authorized redirect URIs includes: `http://localhost:3001/api/oauth/callback`
6. Save and try again

### Issue: "No profiles found"

**Problem:** After signing in, no profiles appear

**Solution:**
1. Verify your Google account has a GMB profile
2. Go to https://business.google.com/ and check
3. If no profile exists, create one
4. Try signing in again

### Issue: "Failed to fetch profiles"

**Problem:** Error when trying to load profiles

**Solution:**
1. Check backend is running: `npm run backend`
2. Check backend console for errors
3. Verify `VITE_API_BASE_URL=http://localhost:3001/api` in `.env.local`
4. Check Network tab in browser for failed requests

### Issue: "Cannot find module 'express'"

**Problem:** Backend won't start

**Solution:**
```bash
npm install express axios dotenv cors body-parser
npm run backend
```

### Issue: Port 3001 already in use

**Problem:** Backend won't start - port conflict

**Solution:**
```bash
# Find what's using port 3001
lsof -i :3001

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3002 npm run backend
```

### Issue: CORS errors

**Problem:** Frontend can't communicate with backend

**Solution:**
1. Make sure backend is running on port 3001
2. Check `VITE_API_BASE_URL` is correct
3. Verify CORS is enabled in backend (it should be in server.js)

---

## 📱 Testing on Different Devices

### Local Testing (Same Computer)

✅ Works as described above

### Testing from Another Computer

1. Find your computer's IP address:
   ```bash
   # On Mac/Linux
   ifconfig | grep "inet "
   
   # On Windows
   ipconfig
   ```

2. Update `.env.local` on frontend:
   ```
   VITE_API_BASE_URL=http://YOUR_IP:3001/api
   ```

3. Update Google Cloud redirect URI:
   ```
   http://YOUR_IP:3001/api/oauth/callback
   ```

4. Access from other computer:
   ```
   http://YOUR_IP:5173/settings
   ```

### Mobile Testing

1. Same as above - use your computer's IP address
2. Make sure both servers are accessible from mobile network
3. Test on actual phone to verify responsive design

---

## 📊 Performance Testing

### Load Testing

Test with multiple profiles:
1. Create multiple GMB profiles in your account
2. Sign in and verify all profiles load
3. Check page load time (should be < 2 seconds)

### Stress Testing

1. Rapidly switch between profiles
2. Quickly save changes multiple times
3. Check for memory leaks in browser console

---

## ✅ Final Verification

After all tests pass, verify:

- [ ] All OAuth flow works smoothly
- [ ] Profiles load correctly
- [ ] Profile switching works
- [ ] Business info updates save
- [ ] AI preferences work
- [ ] Disconnect works
- [ ] No console errors
- [ ] No network errors
- [ ] Page is responsive on mobile

---

## 🎯 Success Criteria

Your integration is working correctly when:

✅ User can sign in with Google
✅ All GMB profiles are discovered and displayed
✅ User can select and switch profiles
✅ Business information can be edited and saved
✅ AI preferences can be configured
✅ User can disconnect
✅ No errors in console or network
✅ All features work smoothly

---

## 📝 Logging for Debugging

### Frontend Logging

Add this to `src/services/oauthService.ts` for debugging:

```javascript
console.log('OAuth Service:', {
  isConnected: this.isConnected(),
  accessToken: this.getAccessToken()?.substring(0, 20) + '...',
  userEmail: this.getUserEmail()
});
```

### Backend Logging

Check backend console for:
```
🚀 GMB API Server running on port 3001
[OAuth] User authenticated: user@example.com
[Profile] Fetching profiles for user...
[Profile] Found X profiles
```

---

## 🚀 Ready to Deploy?

Once all tests pass:

1. Update redirect URIs for production domain
2. Update environment variables for production
3. Deploy backend to production server
4. Deploy frontend to production server
5. Test on production domain

---

## 📞 Need Help?

If you encounter issues:

1. Check this guide's troubleshooting section
2. Check browser console for error messages
3. Check backend console for server errors
4. Verify all environment variables are set
5. Make sure both servers are running

**Happy testing!** 🎉

