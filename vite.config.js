


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({
plugins: [
react(),
VitePWA({
registerType: 'autoUpdate',
includeAssets: ['favicon.svg'],
manifest: {
name: 'PosToo',
short_name: 'PosToo',
start_url: '/',
display: 'standalone',
background_color: '#0f1419',
theme_color: '#0a84ff',
icons: [
{ src: '/icons/pwa-192.png', sizes: '192x192', type: 'image/png' },
{ src: '/icons/pwa-512.png', sizes: '512x512', type: 'image/png' },
{ src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
]
},
workbox: {
globPatterns: ['**/*.{js,css,html,svg,png,webp}']
}
})
]
})