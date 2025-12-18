import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeAnalytics } from "./lib/analytics";
import { initializeSentry } from "./lib/sentry";
import { initializePerformanceMonitoring } from "./lib/performance";
import { initializeWebVitals } from "./lib/webVitals";
import { registerSW } from 'virtual:pwa-register';

// Initialize Sentry first
try {
  initializeSentry();
} catch (e) {
  console.error('Sentry init error:', e);
}

// Initialize performance monitoring
try {
  initializePerformanceMonitoring();
} catch (e) {
  console.error('Performance monitoring error:', e);
}

// Initialize analytics
try {
  initializeAnalytics();
} catch (e) {
  console.error('Analytics init error:', e);
}

// Initialize Web Vitals tracking
try {
  initializeWebVitals();
} catch (e) {
  console.error('Web Vitals init error:', e);
}

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
