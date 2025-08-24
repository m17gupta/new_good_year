# Use Node.js 20 LTS
FROM node:20-alpine

# Enable Corepack to use the correct Yarn version
RUN corepack enable

# Set working directory
WORKDIR /app/backend

# Install system dependencies
RUN apk add --no-cache \
    postgresql-client \
    python3 \
    make \
    g++

# Copy package files
COPY backend/package.json backend/yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY backend/ .

# Build the application
RUN yarn build

# Expose port
EXPOSE 9000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:9000/health || exit 1

# Start the application
CMD ["yarn", "start"]
