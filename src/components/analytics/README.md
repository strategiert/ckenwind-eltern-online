
# Analytics & Performance Setup

## Environment Variables

Add these variables to your `.env` file:

```env
# Google Analytics 4
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Analytics Settings
VITE_ANALYTICS_ENABLED=true
VITE_TRACK_WEB_VITALS=true
VITE_AB_TESTING_ENABLED=true
```

## Features Implemented

### 1. Google Analytics 4 Integration
- Automatic page view tracking
- Custom event tracking
- Conversion tracking for E-book downloads and newsletter signups

### 2. Performance Monitoring
- Core Web Vitals tracking (LCP, FID, CLS)
- Page load time monitoring
- Lazy loading for images
- Performance metrics dashboard (development only)

### 3. Conversion Tracking
- E-book download tracking with assigned values
- Newsletter signup tracking
- Custom conversion events

### 4. A/B Testing
- CTA button variations
- Traffic split configuration
- Automatic variant assignment and persistence
- A/B test result tracking

## Usage

### Track Custom Events
```typescript
const { trackEvent } = useAnalytics();

trackEvent({
  action: 'button_click',
  category: 'engagement',
  label: 'hero_cta',
  value: 1
});
```

### A/B Testing
```typescript
const { variant } = useABTest({
  testName: 'hero_cta',
  variants: ['control', 'variant_a'],
  trafficSplit: [0.5, 0.5]
});
```

### Lazy Loading Images
```jsx
<LazyImage 
  src="/path/to/image.jpg" 
  alt="Description" 
  className="w-full h-auto"
/>
```

## Setup Instructions

1. Create a Google Analytics 4 property
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add environment variables to your `.env` file
4. Deploy and verify tracking in GA4 Real-time reports
