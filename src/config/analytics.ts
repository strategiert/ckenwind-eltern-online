
export const analyticsConfig = {
  googleAnalytics: {
    measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
    enabled: import.meta.env.VITE_ANALYTICS_ENABLED === 'true' || import.meta.env.NODE_ENV === 'production',
  },
  performance: {
    trackWebVitals: import.meta.env.VITE_TRACK_WEB_VITALS === 'true' || import.meta.env.NODE_ENV === 'production',
    showPerformanceMonitor: import.meta.env.NODE_ENV === 'development',
  },
  abTesting: {
    enabled: import.meta.env.VITE_AB_TESTING_ENABLED === 'true' || false,
  },
};
