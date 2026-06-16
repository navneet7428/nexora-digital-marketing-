# NEXORA — AI Marketing Agency

## QUICK START (No database required)

### 1. Create server/.env
Duplicate `server/.env.example` → rename to `server/.env`. No changes needed to run locally.

### 2. Run the project

Open **two terminals** in VS Code:

**Terminal 1 — Backend:**
```bash
cd server
npm install
npm run dev
```
You should see:
```
🚀 NEXORA server running on port 5000
⚡ Running with in-memory data store (no MongoDB)
```

**Terminal 2 — Frontend:**
```bash
cd client
npm install
npm run dev
```

Open browser → **http://localhost:5173**

---

## Admin Dashboard
→ http://localhost:5173/admin/login
- Username: `admin`
- Password: `nexora2035`

> Note: Contact form submissions are stored in memory and reset when the server restarts. To persist data permanently, reconnect MongoDB later.

---

## Stack
- **Frontend:** React 18 + Vite + GSAP + Three.js
- **Backend:** Express.js (in-memory data, no database)
- **Auth:** JWT tokens
