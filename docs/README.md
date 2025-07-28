# 🛠️ Component Generator Platform

An AI-powered developer tool to **generate, preview, and manage frontend components** (JSX + CSS) with live editing, sessions, and AI chat prompts.

---

## 🔍 Features

- ✨ AI Chat Prompt → JSX + CSS output
- 🎨 Live Preview of generated components
- 🗂️ Session management and history
- 🔐 Authentication with token-based login/signup
- ⚡ Redis caching for session state
- 🧠 LLM support: Gemini, GPT-4o, LLaMA, etc.
- 🌈 Beautiful Tailwind CSS UI

---

## 🧱 Tech Stack

| Layer     | Tech                                |
|-----------|-------------------------------------|
| Frontend  | React + Next.js + Tailwind CSS      |
| Backend   | Node.js + Express.js                |
| Database  | MongoDB (Mongoose ODM)              |
| Auth      | JWT + LocalStorage                  |
| Cache     | Redis                               |
| AI        | OpenRouter GPT-4o                   |

---

## 📁 Folder Structure

component-generator-platform/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── server.js
│ └── .env
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── styles/
│ └── tailwind.config.js
├── .gitignore
├── README.md
└── package.json (optional mono-repo root)



---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repo


git clone https://github.com/your-username/component-generator-platform.git
cd component-generator-platform
2️⃣ Setup Backend

cd backend
npm install
Create .env:

.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/componentdb
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
GEMINI_API_KEY=your_gemini_api_key
Run backend:

node server.js
3️⃣ Setup Frontend

cd ../frontend
npm install
npm run dev
Visit: http://localhost:3000

🧠 AI Model Integration
You can plug in:

✅ Google Gemini API (via @google/generative-ai)

✅ GPT-4o / GPT-3.5 via OpenRouter

✅ HuggingFace models like LLaMA/Gemma

Set your preferred model in:

backend/controllers/chatController.js
✅ Sample Prompts
Design a responsive login form with icon and gradient background.
Create a sidebar with collapsible sections.
Generate a card component with Tailwind and hover effects.

🔐 Authentication
POST /api/auth/signup

POST /api/auth/login

Bearer token stored in localStorage

🧪 Testing
You can test endpoints using Postman or the frontend UI:

GET /api/session

POST /api/session/create

POST /api/chat/prompt

📦 Deployment
MongoDB Atlas:
Use MongoDB Cloud

Redis (Free Tier):
Redis Cloud

Frontend Hosting:
Vercel (ideal for Next.js)

Backend Hosting:
Render

---

🙋‍♂️ Contributors
Jaivanth Koppula — Full Stack Developer & AI Integrator