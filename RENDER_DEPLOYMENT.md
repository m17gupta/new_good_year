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

4. **Review and Deploy**:
   - Render will create:
     - PostgreSQL database
     - Web service for your backend
   - Click "Apply" to deploy

### Option 2: Manual Web Service Creation

1. **Create PostgreSQL Database**:
   - Go to Render Dashboard
   - Click "New +" → "PostgreSQL"
   - Name: `medusa-postgres`
   - Plan: Free (or Starter for production)
   - Note the connection details

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `medusa-backend`
     - **Environment**: `Node`
     - **Build Command**: `cd backend && yarn install && yarn build`
     - **Start Command**: `cd backend && yarn start`
     - **Plan**: Free (or Starter for production)

3. **Set Environment Variables**:
   ```
   NODE_ENV=production
   DATABASE_URL=[Your PostgreSQL connection string from step 1]
   STORE_CORS=*
   ADMIN_CORS=*
   AUTH_CORS=*
   JWT_SECRET=[Generate a secure random string]
   COOKIE_SECRET=[Generate a secure random string]
   ```

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
