import { captureMessage } from './sentry';

// Performance monitoring utilities
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  const duration = end - start;

  // Log slow operations
  if (duration > 100) {
    captureMessage(`Slow operation: ${name}`, 'warning', {
      duration,
      threshold: 100
    });
  }

  return duration;
};

export const measureRenderTime = (componentName: string) => {
  const start = performance.now();
  return () => {
    const end = performance.now();
    const duration = end - start;

    if (duration > 16.67) { // More than one frame at 60fps
      captureMessage(`Slow render: ${componentName}`, 'warning', {
        duration,
        threshold: 16.67
      });
    }
  };
};

// Web Vitals tracking
export const trackWebVitals = () => {
  // CLS - Cumulative Layout Shift
  let clsValue = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const e = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
      if (!e.hadRecentInput) {
        clsValue += e.value || 0;
      }
    }
  }).observe({ entryTypes: ['layout-shift'] });

  // FID - First Input Delay
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const e = entry as PerformanceEventTiming;
      captureMessage('First Input Delay', 'info', {
        fid: (e.processingStart || 0) - e.startTime,
        eventType: e.name
      });
    }
  }).observe({ entryTypes: ['first-input'] });

  // LCP - Largest Contentful Paint
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as PerformanceEntry | undefined;
    captureMessage('Largest Contentful Paint', 'info', {
      lcp: lastEntry ? lastEntry.startTime : 0
    });
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // Report CLS on page unload
  window.addEventListener('beforeunload', () => {
    if (clsValue > 0.1) {
      captureMessage('Cumulative Layout Shift', 'warning', {
        cls: clsValue,
        threshold: 0.1
      });
    }
  });
};

// Resource loading performance
export const trackResourceLoading = () => {
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const resourceEntry = entry as PerformanceResourceTiming;

      // Track slow resources
      if (resourceEntry.duration > 2000) {
        captureMessage('Slow resource loading', 'warning', {
          url: resourceEntry.name,
          duration: resourceEntry.duration,
          size: resourceEntry.transferSize,
          type: resourceEntry.initiatorType
        });
      }
    }
  }).observe({ entryTypes: ['resource'] });
};

// Navigation timing
export const trackNavigationTiming = () => {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

      if (navigation) {
        const metrics = {
          dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcpConnect: navigation.connectEnd - navigation.connectStart,
          serverResponse: navigation.responseStart - navigation.requestStart,
          pageLoad: navigation.loadEventEnd - navigation.startTime,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime
        };

        // Track slow page loads
        if (metrics.pageLoad > 3000) {
          captureMessage('Slow page load', 'warning', metrics);
        }

        // Log all navigation metrics
        captureMessage('Navigation timing', 'info', metrics);
      }
    }, 0);
  });
};

// Memory usage monitoring
export const trackMemoryUsage = () => {
  const perfWithMemory = performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } };
  if (perfWithMemory.memory) {
    setInterval(() => {
      const memory = perfWithMemory.memory!;
      const usedPercent = (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100;

      if (usedPercent > 80) {
        captureMessage('High memory usage', 'warning', {
          usedPercent,
          usedMB: Math.round(memory.usedJSHeapSize / 1024 / 1024),
          totalMB: Math.round(memory.totalJSHeapSize / 1024 / 1024),
          limitMB: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
        });
      }
    }, 30000); // Check every 30 seconds
  }
};

// Initialize all performance monitoring
export const initializePerformanceMonitoring = () => {
  if (typeof window !== 'undefined' && import.meta.env.PROD) {
    trackWebVitals();
    trackResourceLoading();
    trackNavigationTiming();
    trackMemoryUsage();
  }
};