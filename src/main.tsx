import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeAnalytics } from "./lib/analytics";
import { initializeSentry } from "./lib/sentry";
import { initializePerformanceMonitoring } from "./lib/performance";
import { initializeWebVitals } from "./lib/webVitals";
import { registerSW } from 'virtual:pwa-register';

// Initialize Sentry first
initializeSentry();

// Initialize performance monitoring
initializePerformanceMonitoring();

// Initialize analytics
initializeAnalytics();

// Initialize Web Vitals tracking
initializeWebVitals();

// HTTPS enforcement
if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
  window.location.replace(`https:${window.location.href.substring(window.location.protocol.length)}`);
}

createRoot(document.getElementById("root")!).render(<App />);

// Register PWA service worker with auto-update
const updateSW = registerSW({
  onNeedRefresh() {
    // New content available, show update prompt
    if (confirm('New content available! Click OK to update.')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
  onRegistered(registration) {
    console.log('Service Worker registered:', registration);
    
    // Check for updates every hour
    if (registration) {
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);
    }
  },
  onRegisterError(error) {
    console.error('Service Worker registration error:', error);
  },
});
