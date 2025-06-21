# Docker Setup Guide

This project is fully containerized with Docker and Docker Compose.

## Services

- **PostgreSQL** (Database) - Port 5433 (external), 5432 (internal)
- **Nebula** (Backend API) - Port 3000
- **Orbiter** (Frontend) - Port 5173

## Quick Start

### Production Build
```bash
# Build and start all services
npm run docker:build

# Or manually:
docker-compose up --build
```

### Development Build
```bash
# Start development environment with hot reloading
npm run docker:dev

# Or manually:
docker-compose -f docker-compose.dev.yml up --build
```

## Available Scripts

```bash
# Production
npm run docker:build    # Build and start production services
npm run docker:down     # Stop all services
npm run docker:logs     # View logs
npm run docker:clean    # Stop and remove volumes

# Development
npm run docker:dev      # Start development environment

# Database
npm run docker:db:migrate  # Run Prisma migrations
npm run docker:db:generate # Generate Prisma client
```

## Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Database**: localhost:5433 (PostgreSQL - production only)

## Environment Variables

### Backend (Nebula)
Create a `.env` file in the `nebula/` directory:

```env
# Database URL - Configure based on your environment
DATABASE_URL="postgresql://username:password@host:port/database_name"

# Examples:
# Local development (your existing database):
# DATABASE_URL="postgresql://luunar_admin:luunar_password@localhost:5432/luunar"

# Docker development (connecting to host database):
# DATABASE_URL="postgresql://luunar_admin:luunar_password@host.docker.internal:5432/luunar"

# Docker production (connecting to containerized database):
# DATABASE_URL="postgresql://luunar_admin:luunar_password@postgres:5432/luunar"
```

### Frontend (Orbiter)
Create a `.env` file in the `orbiter/` directory:

```env
# API URL for frontend to connect to backend
VITE_API_URL=http://localhost:3000
```

## Database Setup

After starting the services, run migrations:

```bash
npm run docker:db:migrate
```

## Environment-Specific Configuration

### Development with External Database
If you have an existing PostgreSQL database running on your host machine:

1. Update the `DATABASE_URL` in `nebula/.env`:
   ```env
   DATABASE_URL="postgresql://your_user:your_password@host.docker.internal:5432/your_database"
   ```

2. Run the development environment:
   ```bash
   npm run docker:dev
   ```

### Production with Containerized Database
The production setup includes a PostgreSQL container, so use:
```env
DATABASE_URL="postgresql://luunar_admin:luunar_password@postgres:5432/luunar"
```

**Note**: Inside Docker containers, PostgreSQL runs on port 5432. The external port 5433 is only for accessing the database from your host machine.

## Troubleshooting

### View Logs
```bash
# All services
npm run docker:logs

# Specific service
docker-compose logs nebula
docker-compose logs orbiter
docker-compose logs postgres
```

### Rebuild Services
```bash
# Rebuild specific service
docker-compose build nebula
docker-compose build orbiter

# Rebuild all
docker-compose build --no-cache
```

### Clean Up
```bash
# Stop and remove everything
npm run docker:clean

# Remove specific volumes
docker volume rm luunar_postgres_data
```

## Deployment Notes

This setup provides the core services (database, backend, frontend) without a reverse proxy. For production deployment, you'll need to configure your own reverse proxy/load balancer to handle:

- SSL termination
- Domain routing
- Load balancing
- Static file serving 