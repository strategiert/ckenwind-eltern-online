
import { useCallback } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

interface ConversionEvent {
  event_name: string;
  currency?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export const useAnalytics = () => {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
      console.log('Analytics event tracked:', event);
    }
  }, []);

  const trackConversion = useCallback((conversion: ConversionEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', conversion.event_name, {
        currency: conversion.currency || 'EUR',
        value: conversion.value || 0,
        ...conversion.custom_parameters,
      });
      console.log('Conversion tracked:', conversion);
    }
  }, []);

  const trackPageView = useCallback((page_title: string, page_location: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
        page_title,
        page_location,
      });
      console.log('Page view tracked:', { page_title, page_location });
    }
  }, []);

  const trackEbookDownload = useCallback((firstName: string, email: string) => {
    trackConversion({
      event_name: 'ebook_download',
      value: 10, // Assign a value to the lead
      custom_parameters: {
        method: 'email_form',
        content_type: 'ebook',
        item_name: 'Wege aus dem elterlichen Burnout',
      }
    });
    
    trackEvent({
      action: 'download',
      category: 'ebook',
      label: 'burnout_guide',
      value: 1
    });
  }, [trackEvent, trackConversion]);

  const trackNewsletterSignup = useCallback((email: string, source?: string) => {
    trackConversion({
      event_name: 'newsletter_signup',
      value: 5, // Assign a value to the newsletter signup
      custom_parameters: {
        method: 'email_form',
        source: source || 'website',
      }
    });

    trackEvent({
      action: 'signup',
      category: 'newsletter',
      label: source || 'general',
      value: 1
    });
  }, [trackEvent, trackConversion]);

  return {
    trackEvent,
    trackConversion,
    trackPageView,
    trackEbookDownload,
    trackNewsletterSignup,
  };
};
