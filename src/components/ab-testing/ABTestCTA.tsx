
import React from 'react';
import { Button } from '@/components/ui/button';
import { useABTest } from '@/hooks/useABTest';
import { useAnalytics } from '@/hooks/useAnalytics';

interface ABTestCTAProps {
  href: string;
  testName: string;
  className?: string;
}

const ABTestCTA: React.FC<ABTestCTAProps> = ({ href, testName, className }) => {
  const { trackEvent } = useAnalytics();
  
  const { variant, isLoading } = useABTest({
    testName,
    variants: ['control', 'variant_a', 'variant_b'],
    trafficSplit: [0.33, 0.33, 0.34]
  });

  const handleClick = () => {
    trackEvent({
      action: 'cta_click',
      category: 'ab_test',
      label: `${testName}_${variant}`,
    });
  };

  if (isLoading) {
    return (
      <Button className={className} disabled>
        Lädt...
      </Button>
    );
  }

  const getButtonText = () => {
    switch (variant) {
      case 'control':
        return 'Gratis E-Book anfordern';
      case 'variant_a':
        return 'Jetzt kostenloses E-Book sichern';
      case 'variant_b':
        return 'Sofort herunterladen - kostenlos';
      default:
        return 'Gratis E-Book anfordern';
    }
  };

  const getButtonStyle = () => {
    switch (variant) {
      case 'control':
        return 'bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple';
      case 'variant_a':
        return 'bg-green-600 hover:bg-green-700';
      case 'variant_b':
        return 'bg-orange-600 hover:bg-orange-700';
      default:
        return 'bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple';
    }
  };

  return (
    <Button 
      asChild 
      className={`${getButtonStyle()} ${className}`}
      onClick={handleClick}
    >
      <a href={href}>{getButtonText()}</a>
    </Button>
  );
};

export default ABTestCTA;
