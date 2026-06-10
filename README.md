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

## 📸 ScreenShots
<img width="60%" height="auto" alt="Screenshot (187)" src="https://github.com/user-attachments/assets/7cea116a-26b0-48b8-a55f-d0f7b36bb991" />
<img width="60%" height="auto" alt="Screenshot (188)" src="https://github.com/user-attachments/assets/7036d333-315a-42b3-8d77-fdca07358855" />
<img width="60%" height="auto" alt="Screenshot (189)" src="https://github.com/user-attachments/assets/ef92553f-c906-4117-93ef-455fb2a23aab" />
<img width="60%" height="auto" alt="Screenshot (190)" src="https://github.com/user-attachments/assets/330fb6c1-10da-496d-9f73-f6abcc33c690" />
<img width="60%" height="auto" alt="Screenshot (191)" src="https://github.com/user-attachments/assets/a727e6bf-a819-4433-b09e-206e5a2fa82e" />
<img width="60%" height="auto" alt="Screenshot (192)" src="https://github.com/user-attachments/assets/5df4e385-a975-4f2d-bc11-845444858d5f" />
<img width="60%" height="auto" alt="Screenshot (193)" src="https://github.com/user-attachments/assets/4078a370-4f30-4238-9035-1111513025d4" />
<img width="60%" height="auto" alt="Screenshot (194)" src="https://github.com/user-attachments/assets/a276bebb-1278-4c75-b170-9310b92e6a2b" />

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
