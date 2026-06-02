# JARVIS Backend

Core backend server for the JARVIS AI assistant system. Handles voice processing, NLP, task automation, and API services.

## 🚀 Getting Started

### Prerequisites
- Python 3.9 or higher
- pip or conda
- PostgreSQL 12+
- Redis 6+

### Installation

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Initialize database:
   ```bash
   python scripts/init_db.py
   ```

5. Run the server:
   ```bash
   python run.py
   ```

The server will start at `http://localhost:5000`

## 📁 Directory Structure

```
backend/
├── src/
│   ├── ai/              # NLP and AI models
│   │   ├── intent.py
│   │   ├── entities.py
│   │   └── models/
│   ├── voice/           # Voice processing
│   │   ├── speech_to_text.py
│   │   ├── text_to_speech.py
│   │   └── audio_processor.py
│   ├── tasks/           # Task automation
│   │   ├── scheduler.py
│   │   ├── executor.py
│   │   └── handlers/
│   ├── api/             # REST API
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── websocket.py
│   ├── models/          # Database models
│   ├── utils/           # Utilities
│   └── config.py        # Configuration
├── scripts/             # Setup and utility scripts
├── tests/               # Unit and integration tests
├── requirements.txt     # Python dependencies
├── .env.example         # Environment template
└── run.py              # Application entry point
```

## 📚 Key Modules

### AI Module (`src/ai/`)
- **Intent Recognition**: Determines user intent from commands
- **Entity Extraction**: Identifies relevant entities in commands
- **Response Generation**: Creates appropriate responses

### Voice Module (`src/voice/`)
- **Speech-to-Text**: Converts audio to text
- **Text-to-Speech**: Converts text to audio
- **Audio Processing**: Handles audio recording and playback

### Tasks Module (`src/tasks/`)
- **Task Scheduling**: Schedule tasks for execution
- **Task Execution**: Execute scheduled tasks
- **Task Handlers**: Specific handlers for different task types

### API Module (`src/api/`)
- **Routes**: REST API endpoints
- **Middleware**: Authentication, logging, error handling
- **WebSocket**: Real-time communication

## 🔧 Configuration

Edit `.env` file to configure:

```env
# Server
FLASK_ENV=development
FLASK_DEBUG=True

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/jarvis
REDIS_URL=redis://localhost:6379/0

# API Keys
GOOGLE_API_KEY=your_api_key
OPENAI_API_KEY=your_api_key

# JWT
JWT_SECRET=your_secret_key
JWT_ALGORITHM=HS256

# Voice
DEFAULT_LANGUAGE=en-US
```

## 🧪 Testing

Run tests:
```bash
pytest
```

Run with coverage:
```bash
pytest --cov=src
```

## 📝 API Documentation

Interactive API docs available at:
- Swagger UI: `http://localhost:5000/docs`
- ReDoc: `http://localhost:5000/redoc`

See [API Specification](../docs/api-specification.md) for detailed endpoint documentation.

## 🚀 Deployment

### Docker
```bash
docker build -t jarvis-backend .
docker run -p 5000:5000 jarvis-backend
```

### Production
1. Set `FLASK_ENV=production`
2. Use Gunicorn:
   ```bash
   gunicorn -w 4 -b 0.0.0.0:5000 run:app
   ```

## 🐛 Troubleshooting

**Issue**: Database connection failed
- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `.env`

**Issue**: Voice processing not working
- Verify microphone permissions
- Check API keys for speech service

**Issue**: Import errors
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt` again

## 📚 Resources

- [Architecture Guide](../docs/architecture.md)
- [API Specification](../docs/api-specification.md)
- [spaCy Documentation](https://spacy.io/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

## 🤝 Contributing

See [CONTRIBUTING.md](../docs/contributing.md) for guidelines.

## 📧 Support

For issues or questions, please open a GitHub issue.
