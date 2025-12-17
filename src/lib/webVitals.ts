import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';
import { trackCustomEvent } from './analytics';

type WebVitalMetric = {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  id: string;
};

const sendToAnalytics = (metric: WebVitalMetric) => {
  trackCustomEvent('web_vitals', {
    metric_name: metric.name,
    metric_value: Math.round(metric.value),
    metric_rating: metric.rating,
    metric_id: metric.id,
  });

  // Log in development for debugging
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}: ${Math.round(metric.value)} (${metric.rating})`);
  }
};

export const initializeWebVitals = () => {
  // Cumulative Layout Shift - measures visual stability
  onCLS((metric) => sendToAnalytics(metric as WebVitalMetric));
  
  // First Contentful Paint - measures initial render time
  onFCP((metric) => sendToAnalytics(metric as WebVitalMetric));
  
  // Largest Contentful Paint - measures loading performance
  onLCP((metric) => sendToAnalytics(metric as WebVitalMetric));
  
  // Time to First Byte - measures server response time
  onTTFB((metric) => sendToAnalytics(metric as WebVitalMetric));
  
  // Interaction to Next Paint - measures responsiveness
  onINP((metric) => sendToAnalytics(metric as WebVitalMetric));
};
