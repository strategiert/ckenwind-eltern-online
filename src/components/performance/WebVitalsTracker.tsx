
import { useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface WebVital {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

const WebVitalsTracker: React.FC = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const trackWebVital = (vital: WebVital) => {
      trackEvent({
        action: 'web_vital',
        category: 'Performance',
        label: vital.name,
        value: Math.round(vital.value),
      });
      
      console.log(`Web Vital ${vital.name}:`, vital.value, vital.rating);
    };

    // Track Core Web Vitals using web-vitals library approach
    const trackCLS = () => {
      let clsValue = 0;
      let clsEntries: PerformanceEntry[] = [];

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            clsEntries.push(entry);
          }
        }
      });

      if ('PerformanceObserver' in window) {
        observer.observe({ type: 'layout-shift', buffered: true });
      }

      // Track CLS on page unload
      const trackCLSValue = () => {
        const rating = clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor';
        trackWebVital({ name: 'CLS', value: clsValue, rating });
      };

      window.addEventListener('beforeunload', trackCLSValue);
      return () => window.removeEventListener('beforeunload', trackCLSValue);
    };

    const trackLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const value = lastEntry.startTime;
        const rating = value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
        
        trackWebVital({ name: 'LCP', value, rating });
      });

      if ('PerformanceObserver' in window) {
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
      }
    };

    const trackFID = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const value = (entry as any).processingStart - entry.startTime;
          const rating = value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
          
          trackWebVital({ name: 'FID', value, rating });
        }
      });

      if ('PerformanceObserver' in window) {
        observer.observe({ type: 'first-input', buffered: true });
      }
    };

    // Initialize tracking
    const cleanupCLS = trackCLS();
    trackLCP();
    trackFID();

    return () => {
      cleanupCLS();
    };
  }, [trackEvent]);

  return null;
};

export default WebVitalsTracker;
