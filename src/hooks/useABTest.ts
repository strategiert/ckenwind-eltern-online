
import { useState, useEffect } from 'react';

interface ABTestConfig {
  testName: string;
  variants: string[];
  trafficSplit?: number[];
}

interface ABTestResult {
  variant: string;
  isLoading: boolean;
}

export const useABTest = (config: ABTestConfig): ABTestResult => {
  const [variant, setVariant] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { testName, variants, trafficSplit } = config;
    
    // Check if user already has a variant stored
    const storageKey = `ab_test_${testName}`;
    const storedVariant = localStorage.getItem(storageKey);
    
    if (storedVariant && variants.includes(storedVariant)) {
      setVariant(storedVariant);
      setIsLoading(false);
      return;
    }

    // Assign new variant
    const splits = trafficSplit || variants.map(() => 1 / variants.length);
    const random = Math.random();
    let cumulativeProbability = 0;
    
    for (let i = 0; i < variants.length; i++) {
      cumulativeProbability += splits[i];
      if (random <= cumulativeProbability) {
        const selectedVariant = variants[i];
        setVariant(selectedVariant);
        localStorage.setItem(storageKey, selectedVariant);
        
        // Track A/B test assignment
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'ab_test_assignment', {
            test_name: testName,
            variant: selectedVariant,
          });
        }
        
        break;
      }
    }
    
    setIsLoading(false);
  }, [config]);

  return { variant, isLoading };
};
