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

# Build the application (this will also generate Prisma client)
RUN npm run build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

# Copy the built application and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/src/generated ./src/generated
COPY --from=builder /app/prisma ./prisma

# Remove dev dependencies for production
RUN npm prune --production

# Update packages and create non-root user
RUN apk upgrade --no-cache && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Change ownership to the nodejs user
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

ENV PORT=3000

CMD ["sh", "-c", "echo 'Running Prisma migrations...' && npx prisma migrate deploy && echo 'Starting application...' && exec node dist/index.js"] 