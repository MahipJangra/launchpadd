# 🚀 Launchpad — Idea to Roadmap SaaS

Launchpad is an AI-powered SaaS platform that transforms startup ideas into structured business execution roadmaps through an interactive multi-step planning workflow.

---

## 📁 Project Structure

```
launchpad/
├── public/
│   └── index.html
├── src/
│   ├── context/
│   │   └── RoadmapContext.jsx    ← Global state
│   ├── pages/
│   │   ├── Home.jsx              ← Landing + idea input
│   │   ├── Analyze.jsx           ← Q&A flow
│   │   └── Roadmap.jsx           ← Full roadmap display
│   ├── styles/
│   │   ├── global.css
│   │   └── roadmap.css
│   ├── utils/
│   │   └── api.js                ← API calls
│   ├── App.jsx
│   └── index.js
├── server/
│   ├── index.js                  ← Express backend
│   ├── package.json
│   └── .env.example              ← Copy to .env
├── package.json
└── README.md
```

---

## ⚡ Setup in 5 Steps

### Step 1 — Clone / Download this folder

### Step 2 — Setup Backend

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

Get your key from: https://console.anthropic.com

### Step 3 — Start Backend

```bash
# Inside /server folder
npm run dev
# Server runs on http://localhost:4000
```

### Step 4 — Setup Frontend

```bash
# Go back to root launchpad folder
cd ..
npm install
```

### Step 5 — Start Frontend

```bash
npm start
# App opens at http://localhost:3000
```

---

## 🔑 Getting Your Anthropic API Key

1. Go to https://console.anthropic.com
2. Sign up / Login
3. Click "API Keys" → "Create Key"
4. Copy and paste into `server/.env`

**Cost:** ~$0.01–0.05 per roadmap generation (Claude claude-opus-4-5)

---

## 🌐 Deploy to Production

### Frontend → Vercel (Free)
```bash
npm run build
# Upload build/ folder to Vercel
# Or connect GitHub repo
```

### Backend → Railway / Render (Free tier)
1. Push server/ folder to GitHub
2. Connect to Railway.app or Render.com
3. Add ANTHROPIC_API_KEY as environment variable
4. Update frontend API base URL in src/utils/api.js

---

## ✨ Features

- 💡 Smart 5-question context gathering
- 📅 Week-by-week timeline with milestones  
- ⚙️ Recommended tech stack with reasoning
- ✨ MVP vs V2 features + USPs + KPIs
- 💰 Build cost, infra cost, 6-month runway
- 👥 ICP, customer segments, pain points
- 📣 Marketing channels with GTM strategy
- 💸 Pricing plans + revenue projections
- 🌍 Market size + competitive landscape
- 💾 Auto-saves last 10 roadmaps locally

---

## 🛠️ Customization

**Change AI model** → `server/index.js` line: `model: "claude-opus-4-5"`

**Add more questions** → Edit SYSTEM_PROMPT in `server/index.js`

**Change colors** → Edit CSS variables in `src/styles/global.css`

**Add PDF export** → Use `jspdf` (already in dependencies)

---

## ❓ Troubleshooting

**"Server error. Is backend running?"**
→ Make sure you ran `npm run dev` in the `/server` folder

**"API key not configured"**  
→ Check that `.env` file exists in `/server` with your key

**CORS errors**
→ Make sure `"proxy": "http://localhost:4000"` is in root `package.json`

**Blank page**
→ Check browser console, make sure both frontend and backend are running
