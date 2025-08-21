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

# ADD to GITHUB PAGES

1) Set the correct base path (Vite)

If your site will be served at
https://devpetruskeller.github.io/postoo-spa/
you must set base to '/postoo-spa/'.

Create or edit vite.config.js:

// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/postoo-spa/', // ← critical for GitHub Pages under a repo path
})


Vite’s docs explicitly call this out for GitHub Pages. 
vitejs

If you later switch to a custom domain (root), set base: '/'.

2) Add a GitHub Actions workflow

Create .github/workflows/pages.yml:

name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Use Node LTS
        uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'
          cache: 'npm'

      - name: Install deps
        run: npm ci

      - name: Build
        run: npm run build

      # SPA fallback: make 404.html = index.html so deep links work
      - name: Create SPA fallback
        run: cp dist/index.html dist/404.html

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4


This follows the official Vite static deploy guidance (Actions + dist artifact). 
vitejs

3) Enable Pages

In your repo:

Settings → Pages → “Build and deployment: Source” → GitHub Actions.
That tells Pages to use the workflow above. (Same flow as the Vite guide.) 
vitejs