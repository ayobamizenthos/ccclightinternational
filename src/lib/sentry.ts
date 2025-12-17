import * as Sentry from '@sentry/react';

export const initializeSentry = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (dsn && import.meta.env.PROD) {
    Sentry.init({
      dsn,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0,
      // Session Replay
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      environment: import.meta.env.VITE_NODE_ENV || 'development',
      beforeSend(event) {
        if (import.meta.env.DEV && event.exception) {
          return null;
        }
        return event;
      },
    });
  }
};

export const captureException = (error: Error, context?: Record<string, unknown>) => {
  if (import.meta.env.PROD) {
    Sentry.captureException(error, {
      tags: {
        component: 'church-website',
      },
      extra: context,
    });
  } else {
    console.error('Error captured:', error, context);
  }
};

export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info', context?: Record<string, unknown>) => {
  if (import.meta.env.PROD) {
    Sentry.withScope((scope) => {
      scope.setTags({
        component: 'church-website',
      });
      if (context) {
        scope.setExtras(context);
      }
      Sentry.captureMessage(message, level);
    });
  } else {
    console.log(`[${level.toUpperCase()}] ${message}`, context);
  }
};
