# Render Deployment Guide for Medusa Backend

## Prerequisites
- GitHub repository with your code pushed
- Render account (free tier available)

## Files Created for Deployment

1. **render.yaml** - Blueprint for one-click deployment
2. **Dockerfile** - Docker configuration for containerized deployment
3. **backend/.env.production** - Production environment template
4. **backend/.dockerignore** - Files to exclude from Docker build
5. **backend/src/api/health/route.ts** - Health check endpoint

## Deployment Options

### Option 1: One-Click Deployment with render.yaml (Recommended)

1. **Push your code to GitHub** (you need to do this step):
   ```bash
   git push origin main
   ```

2. **Go to Render Dashboard**: https://dashboard.render.com/

3. **Create New Blueprint**:
   - Click "New +" button
   - Select "Blueprint"
   - Connect your GitHub repository: `m17gupta/new_good_year`
   - Render will automatically detect the `render.yaml` file
   - **Note**: Blueprint deployment may require payment details even for free tier services

4. **Review and Deploy**:
   - Render will create:
     - PostgreSQL database
     - Web service for your backend
   - Click "Apply" to deploy

### Alternative: Free Tier Manual Setup (No Payment Required)

If Render asks for payment details with Blueprint, use this manual approach:

1. **Skip Blueprint, use manual setup instead**
2. **Create PostgreSQL Database** (Free tier available):
   - Click "New +" → "PostgreSQL"
   - Name: `medusa-postgres`
   - Database Name: `medusa`
   - User: `medusa`
   - Region: Choose closest to you
   - Plan: **Free** (no payment required)
   - Click "Create Database"

3. **Create Web Service** (Free tier available):
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `m17gupta/new_good_year`
   - Configure:
     - **Name**: `medusa-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `yarn install && yarn build`
     - **Start Command**: `yarn start`
     - **Plan**: **Free** (no payment required)
   - Click "Create Web Service"

### Option 2: Manual Web Service Creation (Free Tier - No Payment Required)

1. **Create PostgreSQL Database**:
   - Go to Render Dashboard
   - Click "New +" → "PostgreSQL"
   - Name: `medusa-postgres`
   - Plan: **Free** (no payment details required)
   - Note the connection details

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `medusa-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `yarn install && yarn build`
     - **Start Command**: `yarn start`
     - **Plan**: **Free** (no payment details required)

3. **Set Environment Variables** (in Web Service settings):
   ```
   NODE_ENV=production
   DATABASE_URL=[Copy from your PostgreSQL database dashboard]
   STORE_CORS=*
   ADMIN_CORS=*
   AUTH_CORS=*
   JWT_SECRET=[Generate using command below]
   COOKIE_SECRET=[Generate using command below]
   ```

## Alternative Free Deployment Platforms

If Render requires payment details you don't have, here are completely free alternatives:

### Railway (Free Tier)
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js and deploy
6. Add PostgreSQL database from Railway dashboard
7. Set environment variables in Railway dashboard

### Vercel (Free for hobby projects)
1. Go to [Vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure build settings:
   - Build Command: `cd backend && yarn build`
   - Output Directory: `backend/dist`
4. Add Supabase or PlanetScale for free PostgreSQL

### Heroku (Free tier discontinued, but has low-cost options)
- $5/month for basic dyno
- Includes PostgreSQL addon

## Environment Variables Setup

### Required Variables:
- `NODE_ENV`: Set to `production`
- `DATABASE_URL`: PostgreSQL connection string from Render
- `STORE_CORS`: Allowed origins for store API (use `*` for development)
- `ADMIN_CORS`: Allowed origins for admin API (use `*` for development)
- `AUTH_CORS`: Allowed origins for auth API (use `*` for development)
- `JWT_SECRET`: Secure random string for JWT tokens
- `COOKIE_SECRET`: Secure random string for cookie encryption

### To generate secure secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Post-Deployment Steps

1. **Access your deployed service**:
   - Backend API: `https://your-service-name.onrender.com`
   - Health check: `https://your-service-name.onrender.com/health`

2. **Run database migrations** (if needed):
   - Go to your web service in Render
   - Open the "Shell" tab
   - Run: `yarn db:migrate` or equivalent migration command

3. **Seed initial data** (if needed):
   - In the shell: `yarn seed`

## Important Notes

- **Free Tier Limitations**: Services spin down after 15 minutes of inactivity
- **Database**: Use at least the Starter plan for PostgreSQL in production
- **CORS**: Update CORS settings with your actual frontend domains in production
- **Secrets**: Use Render's environment variable encryption for sensitive data
- **Monitoring**: Enable logging and monitoring in Render dashboard

## Troubleshooting

- **Build fails**: Check Node.js version (requires >=20)
- **Database connection**: Verify DATABASE_URL format
- **CORS errors**: Update CORS environment variables
- **Health check fails**: Service might still be starting (allow 2-3 minutes)

## Next Steps

1. Push your code to GitHub
2. Follow Option 1 (render.yaml) for easiest deployment
3. Configure your frontend to point to the new backend URL
4. Update CORS settings with your frontend domain
5. Consider upgrading to paid plans for production use
