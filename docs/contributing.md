# Contributing to JARVIS

Thank you for your interest in contributing to JARVIS! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and constructive. We're building together!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/JARVIS.git`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Commit: `git commit -m "Add feature description"`
6. Push: `git push origin feature/your-feature`
7. Open a Pull Request

## Development Workflow

### Setup Development Environment
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend
cd ../desktop/web
npm install
```

### Code Style

**Python:**
- Follow PEP 8
- Use Black for formatting: `black src/`
- Use flake8 for linting: `flake8 src/`

**JavaScript/TypeScript:**
- Use ESLint: `npm run lint`
- Use Prettier: `npm run format`
- Follow Airbnb style guide

### Testing

**Backend:**
```bash
# Run tests
pytest

# With coverage
pytest --cov=src
```

**Frontend:**
```bash
# Run tests
npm test

# With coverage
npm test -- --coverage
```

## Commit Guidelines

Use conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Test addition/modification
- `chore`: Build process, dependencies

**Example:**
```
feat(voice): Add speech recognition support

Implement Google Cloud Speech-to-Text API integration.
Adds ability to process voice commands from mobile apps.

Closes #123
```

## Pull Request Process

1. **Update** main branch: `git pull origin main`
2. **Rebase** your branch: `git rebase origin/main`
3. **Squash** commits if needed: `git rebase -i HEAD~N`
4. **Push** your branch: `git push -f origin feature/your-feature`
5. **Create PR** with:
   - Clear title and description
   - Link to related issues
   - Screenshots/videos if UI changes
   - Testing instructions

### PR Checklist
- [ ] Code follows style guidelines
- [ ] Tests are added/updated
- [ ] Documentation is updated
- [ ] All tests pass
- [ ] No new warnings introduced
- [ ] Commits are squashed

## Issues

### Reporting Bugs
1. Check existing issues to avoid duplicates
2. Use bug report template
3. Include:
   - Clear description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment info
   - Screenshots/logs

### Feature Requests
1. Use feature request template
2. Include:
   - Clear description
   - Use case
   - Proposed solution
   - Alternative solutions

## Documentation

- Update README.md for user-facing changes
- Update API docs for API changes
- Add docstrings to all functions
- Include examples for new features

## Areas to Contribute

### High Priority
- [ ] Core NLP engine improvements
- [ ] Voice processing optimization
- [ ] Mobile app features
- [ ] Bug fixes

### Medium Priority
- [ ] Documentation
- [ ] Tests
- [ ] Performance optimization
- [ ] UI/UX improvements

### Good First Issues
- [ ] Documentation updates
- [ ] Minor bug fixes
- [ ] Adding tests
- [ ] Code comments

## Questions?

- 📖 Read [Architecture](architecture.md)
- 📚 Check [API Docs](api-specification.md)
- 💬 Ask in [Discussions](https://github.com/satishmahaseth305-dot/JARVIS/discussions)
- 🐛 Search [Issues](https://github.com/satishmahaseth305-dot/JARVIS/issues)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🚀
