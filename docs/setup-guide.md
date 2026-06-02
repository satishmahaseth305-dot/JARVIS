# JARVIS Setup Guide

Complete setup instructions for the entire JARVIS system.

## Prerequisites

### System Requirements
- OS: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)
- RAM: 8GB minimum (16GB recommended)
- Storage: 10GB free space
- Internet connection

### Required Software
- Git
- Python 3.9+
- Node.js 16+ and npm
- PostgreSQL 12+
- Redis 6+
- Docker (optional)

### Recommended Tools
- VS Code or IntelliJ IDEA
- Postman for API testing
- DBeaver for database management

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/satishmahaseth305-dot/JARVIS.git
cd JARVIS
```

### 2. Backend Setup

#### 2.1 Create Virtual Environment
```bash
cd backend
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

#### 2.2 Install Dependencies
```bash
pip install -r requirements.txt
```

#### 2.3 Configure Environment
```bash
cp .env.example .env
# Edit .env with your settings
```

#### 2.4 Initialize Database
```bash
python scripts/init_db.py
```

#### 2.5 Start Backend Server
```bash
python run.py
```

Backend will be available at: `http://localhost:5000`

### 3. Frontend Setup (Web Dashboard)

```bash
cd desktop/web
npm install
npm run dev
```

Frontend will be available at: `http://localhost:5173`

### 4. Database Setup

#### PostgreSQL
```bash
# Create database
creatdb jarvis

# Run migrations
cd backend
python -m flask db upgrade
```

#### Redis
```bash
# Start Redis (if not running as service)
redis-server
```

### 5. Mobile Setup

#### iOS
```bash
cd mobile/ios
open JARVIS.xcodeproj
# Build and run in Xcode
```

#### Android
```bash
cd mobile/android
# Open in Android Studio
open . -a Android\ Studio
# Build and run
```

## Configuration

### Backend Configuration (.env)

```env
# Server
FLASK_ENV=development
FLASK_DEBUG=True
SERVER_HOST=localhost
SERVER_PORT=5000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/jarvis
REDIS_URL=redis://localhost:6379/0

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# Google Cloud
GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json

# OpenAI (optional)
OPENAI_API_KEY=your_openai_api_key

# Voice Settings
DEFAULT_LANGUAGE=en-US
DEFAULT_VOICE=google
```

## Verification

### 1. Backend Verification
```bash
# Test API
curl http://localhost:5000/health

# Check API docs
# Open browser: http://localhost:5000/docs
```

### 2. Database Verification
```bash
# Connect to PostgreSQL
psql -U postgres -d jarvis

# Check tables
\dt
```

### 3. Redis Verification
```bash
# Connect to Redis
redis-cli

# Test connection
ping
```

## Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'flask'"
**Solution**: 
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt` again

### Issue: "psycopg2 error: could not connect to server"
**Solution**:
- Ensure PostgreSQL is running
- Check connection string in .env
- Verify database exists: `createdb jarvis`

### Issue: "Redis connection refused"
**Solution**:
- Start Redis: `redis-server`
- Check Redis is running: `redis-cli ping`

### Issue: "Port 5000 already in use"
**Solution**:
- Kill process: `lsof -i :5000` then `kill -9 <PID>`
- Or use different port: `FLASK_PORT=5001 python run.py`

### Issue: "npm ERR! 404 Not Found"
**Solution**:
- Clear npm cache: `npm cache clean --force`
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`

## Docker Setup (Optional)

### Using Docker Compose

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Check status
docker-compose ps

# Stop services
docker-compose down
```

### Individual Docker Containers

**Backend:**
```bash
docker build -t jarvis-backend backend/
docker run -p 5000:5000 jarvis-backend
```

**Frontend:**
```bash
docker build -t jarvis-web desktop/web/
docker run -p 5173:5173 jarvis-web
```

## Next Steps

1. **Run Tests**: `pytest` (backend) or `npm test` (frontend)
2. **Read Documentation**: Check `docs/` directory
3. **Explore API**: Visit `http://localhost:5000/docs`
4. **Start Development**: See `CONTRIBUTING.md`

## Getting Help

- 📖 [Architecture Guide](architecture.md)
- 📚 [API Documentation](api-specification.md)
- 🐛 [GitHub Issues](https://github.com/satishmahaseth305-dot/JARVIS/issues)
- 💬 [Discussions](https://github.com/satishmahaseth305-dot/JARVIS/discussions)
