# JARVIS Desktop Applications

Web and desktop client applications for JARVIS.

## 📁 Structure

```
desktop/
├── web/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
├── electron/
│   ├── main/
│   ├── preload/
│   ├── src/
│   └── package.json
└── README.md
```

## Web Dashboard

### Features
- Command history
- Task management
- Device management
- Settings and preferences
- System monitoring
- Real-time notifications

### Tech Stack
- Framework: React 18
- Language: TypeScript
- State Management: Redux
- Styling: Tailwind CSS
- Build Tool: Vite

### Getting Started
```bash
cd desktop/web
npm install
npm run dev
```

Access at: `http://localhost:5173`

## Electron Desktop App

### Features
- System tray integration
- Keyboard shortcuts
- Offline mode
- System notifications
- Auto-update

### Tech Stack
- Framework: Electron 25
- Renderer: React + TypeScript
- Process Communication: IPC
- Build: Electron Builder

### Getting Started
```bash
cd desktop/electron
npm install
npm run dev
```

## Building

### Web (Production)
```bash
cd desktop/web
npm run build
# Output: dist/
```

### Electron (Production)
```bash
cd desktop/electron
npm run build
# Output: dist/
```

## Testing

```bash
npm test
npm run test:cov
```

## Resources

- [React Documentation](https://react.dev/)
- [Electron Documentation](https://www.electronjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [API Specification](../docs/api-specification.md)

## 🤝 Contributing

See [CONTRIBUTING.md](../docs/contributing.md) for guidelines.
