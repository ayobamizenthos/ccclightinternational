import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // PWA Plugin - Full featured with offline support
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'ccc-rainbow-logo.png', 'og-image.jpg', 'robots.txt'],
      manifest: {
        name: 'CCC Light International Parish (Imole)',
        short_name: 'CCC Light',
        description: 'Experience divine worship at CCC Light International Parish (Imole) — Celestial Church of Christ spreading the light of Christ across 6 parishes worldwide.',
        theme_color: '#0A1628',
        background_color: '#0A1628',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        id: 'ccc-light-imole-pwa',
        categories: ['religion', 'lifestyle', 'education'],
        icons: [
          {
            src: '/ccc-rainbow-logo.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/ccc-rainbow-logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: '/og-image.jpg',
            sizes: '1200x630',
            type: 'image/jpeg',
            form_factor: 'wide',
            label: 'CCC Light International Parish Homepage'
          }
        ],
        shortcuts: [
          {
            name: 'Bible',
            short_name: 'Bible',
            description: 'Read the Holy Bible',
            url: '/bible',
            icons: [{ src: '/ccc-rainbow-logo.png', sizes: '192x192' }]
          },
          {
            name: 'Sermons',
            short_name: 'Sermons',
            description: 'Watch sermon videos',
            url: '/sermons',
            icons: [{ src: '/ccc-rainbow-logo.png', sizes: '192x192' }]
          },
          {
            name: 'Choir',
            short_name: 'Choir',
            description: 'Choir performances and media',
            url: '/choir',
            icons: [{ src: '/ccc-rainbow-logo.png', sizes: '192x192' }]
          }
        ],
        related_applications: [],
        prefer_related_applications: false
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/i\.ytimg\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'youtube-thumbnails-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/bible-api\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'bible-api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              },
              networkTimeoutSeconds: 10,
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true
      },
      devOptions: {
        enabled: false
      }
    }),
    // Bundle analyzer for production builds
    mode === "analyze" && visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    // Add security headers plugin for production
    mode === "production" && {
      name: 'add-security-headers',
      transformIndexHtml(html: string) {
        return html.replace(
          '<head>',
          `<head>
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;">
    <meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">`
        );
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-alert-dialog', '@radix-ui/react-avatar'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Secure production build settings
    sourcemap: false, // Disable source maps in production for security
    chunkSizeWarningLimit: 1000,
  },
}));
