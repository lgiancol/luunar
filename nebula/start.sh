#!/bin/sh

echo "Running Prisma migrations..."
npx prisma migrate deploy
echo "Migrations completed. Starting application..."
exec node dist/index.js 