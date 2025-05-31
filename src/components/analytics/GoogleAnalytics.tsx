
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface GoogleAnalyticsProps {
  measurementId?: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ 
  measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID 
}) => {
  useEffect(() => {
    if (!measurementId) {
      console.warn('Google Analytics Measurement ID not found');
      return;
    }

    // Initialize gtag
    window.gtag = window.gtag || function(...args: any[]) {
      (window.dataLayer = window.dataLayer || []).push(args);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [measurementId]);

  if (!measurementId) {
    return null;
  }

  return (
    <Helmet>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </script>
    </Helmet>
  );
};

export default GoogleAnalytics;
