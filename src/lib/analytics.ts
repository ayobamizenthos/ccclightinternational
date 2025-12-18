// GA4 Measurement ID - Replace with your actual ID when ready
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-XXXXXXXXXX';

export const initializeAnalytics = async () => {
  // Only initialize in production or if tracking ID is set
  if (GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
    // Initialize Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args as unknown);
    }
    window.gtag = gtag as unknown as Window['gtag'];
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

export const logEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (window.gtag) {
    window.gtag('event', eventName, parameters as unknown);
  }
};

export const trackPageView = (pagePath: string) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: document.title,
      page_location: window.location.origin + pagePath,
    });
  }
};

export const trackCustomEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  logEvent(eventName, parameters);
};

// Custom events for church website
export const trackSermonPlay = (sermonId: string, sermonTitle: string) => {
  trackCustomEvent('sermon_play', { sermon_id: sermonId, sermon_title: sermonTitle });
};

export const trackDonation = (amount: number, currency: string = 'USD') => {
  trackCustomEvent('donation', { value: amount, currency });
};

export const trackNewsletterSignup = (email: string) => {
  trackCustomEvent('newsletter_signup', { method: 'website' });
};

export const trackLiveServiceJoin = () => {
  trackCustomEvent('live_service_join');
};

export const trackContactFormSubmit = () => {
  trackCustomEvent('contact_form_submit');
};

export const trackSearchQuery = (query: string, resultsCount: number) => {
  trackCustomEvent('search', { search_term: query, results_count: resultsCount });
};

export const trackBlogPostRead = (postId: string, postTitle: string) => {
  trackCustomEvent('blog_post_read', { post_id: postId, post_title: postTitle });
};

export const trackFeedbackSubmit = (type: string) => {
  trackCustomEvent('feedback_submit', { feedback_type: type });
};

export const trackAdminAction = (action: string, details?: Record<string, unknown>) => {
  trackCustomEvent('admin_action', { action, ...details });
};

// Engagement tracking
export const trackButtonClick = (buttonName: string, location: string) => {
  trackCustomEvent('button_click', { button_name: buttonName, location });
};

export const trackVideoPlay = (videoId: string, videoTitle: string) => {
  trackCustomEvent('video_play', { video_id: videoId, video_title: videoTitle });
};

export const trackScrollDepth = (depth: number) => {
  trackCustomEvent('scroll_depth', { percent: depth });
};

export const trackTimeOnPage = (seconds: number, pagePath: string) => {
  trackCustomEvent('time_on_page', { seconds, page_path: pagePath });
};

// Declare gtag and dataLayer on window
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
