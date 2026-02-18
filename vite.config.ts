import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Met à jour automatiquement le service worker
      includeAssets: ['favicon.ico', 'images/icon-*.png'], // Inclure les icônes
      manifest: {
        name: 'VITA - Boutique en ligne',
        short_name: 'VITA',
        description: 'Boutique en ligne pour vêtements et accessoires',
        theme_color: '#1e3a8a', // Couleur bleu foncé (basée sur Cart.tsx)
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/images/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true, // Active le service worker en mode développement
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg}'], // Cache les fichiers statiques
      },
    }),
  ],
});