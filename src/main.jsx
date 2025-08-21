import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.jsx'
import './styles.css'


// Register PWA (service worker)
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })


createRoot(document.getElementById('root')).render(
<React.StrictMode>
<App />
</React.StrictMode>
)