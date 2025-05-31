
import React, { useEffect, useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface PerformanceMetrics {
  loadTime: number;
  firstPaint: number;
  firstContentfulPaint: number;
  domContentLoaded: number;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const measurePerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');
        
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        
        const firstPaint = paint.find(entry => entry.name === 'first-paint')?.startTime || 0;
        const firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;

        const performanceMetrics = {
          loadTime,
          firstPaint,
          firstContentfulPaint,
          domContentLoaded,
        };

        setMetrics(performanceMetrics);

        // Track performance metrics
        trackEvent({
          action: 'page_load_time',
          category: 'Performance',
          label: window.location.pathname,
          value: Math.round(loadTime),
        });

        trackEvent({
          action: 'first_contentful_paint',
          category: 'Performance',
          label: window.location.pathname,
          value: Math.round(firstContentfulPaint),
        });

        console.log('Performance metrics:', performanceMetrics);
      }
    };

    // Wait for page to fully load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, [trackEvent]);

  // Only show in development
  if (process.env.NODE_ENV !== 'development' || !metrics) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs z-50 max-w-xs">
      <div>Load: {Math.round(metrics.loadTime)}ms</div>
      <div>FCP: {Math.round(metrics.firstContentfulPaint)}ms</div>
      <div>DOMContentLoaded: {Math.round(metrics.domContentLoaded)}ms</div>
    </div>
  );
};

export default PerformanceMonitor;
