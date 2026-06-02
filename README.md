# J.A.R.V.I.S. — Personal AI Assistant

Iron Man HUD-style AI assistant powered by Groq (free), deployed on Vercel (free).

## 🚀 Deploy in 5 Minutes

### 1. Get a Free Groq API Key
- Go to [console.groq.com](https://console.groq.com)
- Sign up / log in
- Click **API Keys** → **Create API Key**
- Copy your key

### 2. Deploy to Vercel

**Option A — Vercel Dashboard (easiest)**
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. In **Environment Variables**, add:
   - Name: `GROQ_KEY`
   - Value: your Groq API key
4. Click **Deploy**

**Option B — Vercel CLI**
```bash
npm i -g vercel
vercel
# When prompted, add environment variable GROQ_KEY
```

### 3. Done!
Open your Vercel URL on any browser — desktop or mobile.

---

## Features

- **Iron Man HUD UI** — animated arc reactor, scan lines, hex grid, glowing panels
- **Groq AI** — free Llama-3 70B model, fast responses
- **Voice Input** — click mic button or say your command
- **Voice Output** — JARVIS reads responses aloud
- **Memory** — stores preferences + conversation context in localStorage
- **Quick Commands** — sidebar shortcuts for common actions
- **Activity Log** — real-time event log panel
- **Mobile Ready** — works on iOS/Android browsers
- **No paid APIs** — 100% free to run

## Built-in Commands

| Command | Action |
|---------|--------|
| `status` | System status report |
| `enable voice` / `disable voice` | Toggle TTS |
| `silent mode` | Mute voice output |
| `clear memory` | Wipe all stored data |
| `clear chat` | Clear chat display |
| `help` | Show all commands |

## File Structure

```
/
├── api/
│   └── chat.js        ← Groq serverless function
├── public/
│   ├── index.html     ← Iron Man HUD UI
│   ├── jarvis.js      ← Core logic & memory
│   └── voice.js       ← Speech I/O module
├── package.json
└── vercel.json
```
