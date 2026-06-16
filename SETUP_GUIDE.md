# NEXORA — Complete VS Code Setup Guide

---

## WHAT YOU'RE SETTING UP

```
nexora/
├── client/          ← React + Vite (runs on port 5173)
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── pages/        ← Home, Services, Process, Contact, Admin
│       ├── components/   ← Navbar, Footer, Cursor, HeroCanvas...
│       ├── hooks/        ← useFetch
│       ├── context/      ← AuthContext (admin JWT)
│       ├── utils/        ← api.js (axios)
│       └── styles/       ← globals.css
│
└── server/          ← Express + MongoDB (runs on port 5000)
    ├── index.js
    ├── config/       ← db.js (MongoDB connection + seed)
    ├── models/       ← Contact, Service, CaseStudy, Stat, Admin
    ├── routes/       ← contact, services, cases, stats, admin
    └── middleware/   ← auth.js (JWT verify)
```

---

## STEP 1 — PREREQUISITES

Install these before anything else.

### 1A — Node.js
Go to https://nodejs.org → Download **LTS version** (v20 or higher)
Run installer, keep all defaults, click Next through everything.

Verify in terminal:
```bash
node --version
# Should print: v20.x.x or higher

npm --version
# Should print: 10.x.x or higher
```

### 1B — VS Code
Go to https://code.visualstudio.com → Download for your OS → Install.

### 1C — VS Code Extensions (install all of these)
Open VS Code → press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)

Search and install each:
- **ES7+ React/Redux/React-Native snippets** — by dsznajder
- **Prettier - Code formatter** — by Prettier
- **ESLint** — by Microsoft
- **MongoDB for VS Code** — by MongoDB
- **Thunder Client** — by Rangav (for testing API without Postman)
- **Auto Rename Tag** — by Jun Han
- **GitLens** — by GitKraken (optional but useful)

---

## STEP 2 — MONGODB ATLAS SETUP (Free Cloud Database)

### 2A — Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click **Try Free** → Create account (use Google sign-in for speed)

### 2B — Create a Cluster
1. Click **Build a Database**
2. Choose **FREE** (M0 Sandbox) — it's always free
3. Choose a cloud provider (AWS is fine) → choose closest region to you
4. Name it `nexora-cluster`
5. Click **Create**

### 2C — Create Database User
1. In left sidebar → **Database Access**
2. Click **Add New Database User**
3. Set username: `nexora`
4. Set password: click **Autogenerate** → copy the password somewhere safe
5. Role: **Atlas Admin**
6. Click **Add User**

### 2D — Allow Your IP
1. In left sidebar → **Network Access**
2. Click **Add IP Address**
3. Click **Allow Access From Anywhere** (for development)
4. Click **Confirm**

### 2E — Get Your Connection String
1. In left sidebar → **Database** → Click **Connect**
2. Click **Drivers**
3. Copy the connection string. It looks like:
```
mongodb+srv://nexora:<password>@nexora-cluster.xxxxx.mongodb.net/
```
4. Replace `<password>` with your actual password from Step 2C

---

## STEP 3 — CREATE THE PROJECT FOLDER IN VS CODE

### 3A — Create the folder
1. Create a new folder on your Desktop called `nexora`
2. Open VS Code
3. Go to **File → Open Folder** → select your `nexora` folder

### 3B — Open the terminal in VS Code
Press `Ctrl+`` ` (backtick) or go to **Terminal → New Terminal**

You should see a terminal at the bottom of VS Code.

---

## STEP 4 — CREATE THE FILE STRUCTURE

In the VS Code terminal, run these commands one by one:

```bash
# Create all folders
mkdir -p client/src/components
mkdir -p client/src/pages/admin
mkdir -p client/src/hooks
mkdir -p client/src/context
mkdir -p client/src/utils
mkdir -p client/src/styles
mkdir -p server/config
mkdir -p server/models
mkdir -p server/routes
mkdir -p server/middleware
```

---

## STEP 5 — COPY ALL FILES

Take every file Claude gave you and place it in the correct folder.
Here is the exact mapping:

### CLIENT FILES

| File Claude gave you | Where to put it |
|---|---|
| `client/package.json` | `client/package.json` |
| `client/vite.config.js` | `client/vite.config.js` |
| `client/index.html` | `client/index.html` |
| `client/src/main.jsx` | `client/src/main.jsx` |
| `client/src/App.jsx` | `client/src/App.jsx` |
| `client/src/styles/globals.css` | `client/src/styles/globals.css` |
| `client/src/utils/api.js` | `client/src/utils/api.js` |
| `client/src/hooks/useFetch.js` | `client/src/hooks/useFetch.js` |
| `client/src/context/AuthContext.jsx` | `client/src/context/AuthContext.jsx` |
| `client/src/components/Cursor.jsx` | `client/src/components/Cursor.jsx` |
| `client/src/components/Navbar.jsx` | `client/src/components/Navbar.jsx` |
| `client/src/components/Navbar.module.css` | `client/src/components/Navbar.module.css` |
| `client/src/components/Footer.jsx` | `client/src/components/Footer.jsx` |
| `client/src/components/HeroCanvas.jsx` | `client/src/components/HeroCanvas.jsx` |
| `client/src/components/ServiceCard.jsx` | `client/src/components/ServiceCard.jsx` |
| `client/src/components/StatCounter.jsx` | `client/src/components/StatCounter.jsx` |
| `client/src/components/Marquee.jsx` | `client/src/components/Marquee.jsx` |
| `client/src/pages/Home.jsx` | `client/src/pages/Home.jsx` |
| `client/src/pages/Services.jsx` | `client/src/pages/Services.jsx` |
| `client/src/pages/Process.jsx` | `client/src/pages/Process.jsx` |
| `client/src/pages/Contact.jsx` | `client/src/pages/Contact.jsx` |
| `client/src/pages/admin/Login.jsx` | `client/src/pages/admin/Login.jsx` |
| `client/src/pages/admin/Dashboard.jsx` | `client/src/pages/admin/Dashboard.jsx` |

### SERVER FILES

| File Claude gave you | Where to put it |
|---|---|
| `server/package.json` | `server/package.json` |
| `server/index.js` | `server/index.js` |
| `server/config/db.js` | `server/config/db.js` |
| `server/models/Contact.js` | `server/models/Contact.js` |
| `server/models/Service.js` | `server/models/Service.js` |
| `server/models/CaseStudy.js` | `server/models/CaseStudy.js` |
| `server/models/Stat.js` | `server/models/Stat.js` |
| `server/models/Admin.js` | `server/models/Admin.js` |
| `server/routes/contact.js` | `server/routes/contact.js` |
| `server/routes/services.js` | `server/routes/services.js` |
| `server/routes/cases.js` | `server/routes/cases.js` |
| `server/routes/stats.js` | `server/routes/stats.js` |
| `server/routes/admin.js` | `server/routes/admin.js` |
| `server/middleware/auth.js` | `server/middleware/auth.js` |

---

## STEP 6 — CREATE THE .env FILE (CRITICAL)

In the `server` folder, create a new file called `.env` (NOT `.env.example` — the actual `.env`).

Paste this into it:

```env
PORT=5000
MONGO_URI=mongodb+srv://nexora:YOUR_PASSWORD@nexora-cluster.xxxxx.mongodb.net/nexora
JWT_SECRET=nexora_super_secret_change_this_2035
CLIENT_URL=http://localhost:5173
ADMIN_USERNAME=admin
ADMIN_PASSWORD=nexora2035
```

**Replace `MONGO_URI`** with your actual connection string from Step 2E.
Make sure it ends with `/nexora` (that's the database name).

---

## STEP 7 — INSTALL DEPENDENCIES

You need to install packages for both `server` and `client` separately.

### 7A — Install Server packages
In the VS Code terminal:
```bash
cd server
npm install
```
Wait for it to finish. You'll see a `node_modules` folder appear.

### 7B — Install Client packages
```bash
cd ../client
npm install
```
Wait for it to finish. This installs React, Vite, GSAP, Three.js, etc.

---

## STEP 8 — RUN THE PROJECT

You need **two terminals running at the same time** — one for the server, one for the client.

### Terminal 1 — Start the Server
In VS Code press `Ctrl+Shift+`` ` to open a second terminal.
```bash
cd server
npm run dev
```

You should see:
```
🚀 NEXORA server running on port 5000
✅ MongoDB Connected: nexora-cluster.xxxxx.mongodb.net
✅ Services seeded
✅ Case studies seeded
✅ Stats seeded
```

### Terminal 2 — Start the Client
In the first terminal (or open a third):
```bash
cd client
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in 500ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Open the Website
Go to your browser → `http://localhost:5173`

The NEXORA website should load with full animations.

---

## STEP 9 — ADMIN DASHBOARD

Go to: `http://localhost:5173/admin/login`

Login with:
- **Username:** `admin`
- **Password:** `nexora2035`

You'll see the dashboard with:
- Submission count, lead count, services count
- All contact form submissions with status management
- Delete and status update controls

---

## STEP 10 — TEST THE CONTACT FORM

1. Go to `http://localhost:5173/contact`
2. Fill out the form and submit
3. Go to `http://localhost:5173/admin/login`
4. Open **Contacts** tab
5. Your submission will appear as **NEW** status
6. You can change it to **Read → Replied → Archived**

---

## COMMON ERRORS AND FIXES

### "Cannot find module" error on server
```bash
cd server
npm install
```

### "vite: command not found"
```bash
cd client
npm install
```

### MongoDB connection failed
- Check your `.env` file — make sure `MONGO_URI` is correct
- Make sure you replaced `<password>` with your real password
- Go to MongoDB Atlas → Network Access → confirm your IP is allowed

### Port 5000 already in use
Change in `server/.env`:
```
PORT=5001
```
Then in `client/vite.config.js` update the proxy target to match.

### Blank white page in browser
Open browser DevTools (F12) → Console tab → read the red error.
Usually a missing file or import path issue.

### Three.js / GSAP animations not working
These require a real browser. Don't use `file://` — always use `http://localhost:5173`.

---

## STEP 11 — DEPLOY TO PRODUCTION

### Deploy Server → Render (free)
1. Push your code to GitHub
2. Go to https://render.com → New Web Service
3. Connect your GitHub repo
4. Set **Root Directory** to `server`
5. **Build Command:** `npm install`
6. **Start Command:** `npm start`
7. Add Environment Variables (same as your `.env` file)
8. Deploy

### Deploy Client → Vercel (free)
1. Go to https://vercel.com → New Project
2. Connect your GitHub repo
3. Set **Root Directory** to `client`
4. **Framework:** Vite
5. Add environment variable:
   ```
   VITE_API_URL=https://your-render-server-url.onrender.com
   ```
6. In `client/src/utils/api.js` change baseURL to:
   ```js
   baseURL: import.meta.env.VITE_API_URL || '/api'
   ```
7. Deploy

---

## FILE STRUCTURE REFERENCE (final)

```
nexora/
├── client/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles/
│       │   └── globals.css
│       ├── utils/
│       │   └── api.js
│       ├── hooks/
│       │   └── useFetch.js
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── components/
│       │   ├── Cursor.jsx
│       │   ├── Navbar.jsx
│       │   ├── Navbar.module.css
│       │   ├── Footer.jsx
│       │   ├── HeroCanvas.jsx
│       │   ├── ServiceCard.jsx
│       │   ├── StatCounter.jsx
│       │   └── Marquee.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Services.jsx
│           ├── Process.jsx
│           ├── Contact.jsx
│           └── admin/
│               ├── Login.jsx
│               └── Dashboard.jsx
│
└── server/
    ├── index.js
    ├── package.json
    ├── .env              ← CREATE THIS MANUALLY
    ├── config/
    │   └── db.js
    ├── models/
    │   ├── Contact.js
    │   ├── Service.js
    │   ├── CaseStudy.js
    │   ├── Stat.js
    │   └── Admin.js
    ├── routes/
    │   ├── contact.js
    │   ├── services.js
    │   ├── cases.js
    │   ├── stats.js
    │   └── admin.js
    └── middleware/
        └── auth.js
```

---

## QUICK COMMAND REFERENCE

```bash
# Start server (from /server folder)
npm run dev

# Start client (from /client folder)
npm run dev

# Build client for production
npm run build

# Check if MongoDB is connected
# Watch the server terminal — it prints the status on startup
```

---

*Built with React 18 · Express 4 · MongoDB Atlas · Three.js · GSAP 3*
