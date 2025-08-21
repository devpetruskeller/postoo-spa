# postoo-spa


1) Quick Start
# 1. Create project
mkdir tma-boilerplate-js && cd tma-boilerplate-js


# 2. Init & install
npm init -y
npm i react react-dom @twa-dev/sdk
npm i -D vite @vitejs/plugin-react
# Optional (smaller bundles)
npm i preact


# 3. Add the files from this document


# 4. Dev
npm run dev


# 5. Build
npm run build && npm run preview

2) File Tree

.
├─ index.html
├─ vite.config.js
├─ package.json
├─ src/
│ ├─ main.jsx
│ ├─ App.jsx
│ ├─ telegram.js
│ ├─ hooks/
│ │ └─ useTelegram.js
│ ├─ components/
│ │ └─ Card.jsx
│ └─ styles.css
└─ public/
└─ favicon.svg

Quick one-off (Windows shell specifics)

cmd.exe:
set "USE_PREACT=1" && vite build

PowerShell:
$env:USE_PREACT=1; vite build

Also ensure Preact is installed:

npm i preact

---


You’re on Windows—inline env vars like USE_PREACT=1 vite build only work on Unix shells. Here are clean fixes:

Option A (recommended): use cross-env (cross-platform)

Install:

npm i -D cross-env


Update package.json:

"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "build:preact": "cross-env USE_PREACT=1 vite build"
}