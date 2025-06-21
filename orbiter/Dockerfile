# Use Node.js 20 Alpine for smaller image size
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat && \
    apk upgrade --no-cache
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm install --audit=false

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Update packages and create non-root user
RUN apk upgrade --no-cache && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Copy the built application
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Remove dev dependencies for production
RUN npm prune --production

# Change ownership to the nodejs user
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 5173

ENV PORT=5173

CMD ["npm", "start"]