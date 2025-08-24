# Railway Deployment Instructions

## Quick Deploy to Railway (100% Free)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git push origin main
   ```

2. **Deploy on Railway**:
   - Go to [railway.app](https://railway.app)
   - Click "Login" and sign in with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository: `m17gupta/new_good_year`
   - Railway will automatically detect it's a Node.js app

3. **Add PostgreSQL Database**:
   - In your Railway project dashboard
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will automatically set the `DATABASE_URL` environment variable

4. **Configure Environment Variables**:
   - Go to your service settings
   - Add these variables:
     ```
     NODE_ENV=production
     STORE_CORS=*
     ADMIN_CORS=*
     AUTH_CORS=*
     JWT_SECRET=your-secret-here
     COOKIE_SECRET=your-secret-here
     ```

5. **Deploy**:
   - Railway will automatically build and deploy
   - Your app will be available at: `https://your-app-name.railway.app`

## Generate Secrets
Run this command to generate secure secrets:
```bash
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(32).toString('hex')); console.log('COOKIE_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

## Railway Advantages
- ✅ Completely free tier (no payment details required)
- ✅ Automatic deploys from GitHub
- ✅ Free PostgreSQL database included
- ✅ Custom domains on free tier
- ✅ Simple environment variable management
