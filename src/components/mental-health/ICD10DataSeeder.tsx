
import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ICD10DataSeeder: React.FC = () => {
  const { toast } = useToast();

  useEffect(() => {
    const seedICD10Data = async () => {
      // Check if data already exists
      const { data: existingData } = await supabase
        .from('icd10_conditions')
        .select('id')
        .limit(1);

      if (existingData && existingData.length > 0) {
        return; // Data already seeded
      }

      const sampleConditions = [
        {
          code: 'F32.9',
          title: 'Major depressive disorder, single episode, unspecified',
          category: 'Mood [affective] disorders',
          symptoms: ['persistent sadness', 'loss of interest', 'fatigue', 'sleep disturbances', 'concentration problems'],
          description: 'A mental disorder characterized by at least two weeks of persistent sadness, loss of interest in activities, and other symptoms.',
          severity: 'moderate' as const
        },
        {
          code: 'F41.9',
          title: 'Anxiety disorder, unspecified',
          category: 'Neurotic, stress-related and somatoform disorders',
          symptoms: ['excessive worry', 'restlessness', 'fatigue', 'difficulty concentrating', 'irritability', 'muscle tension'],
          description: 'Characterized by excessive anxiety and worry about various activities or events.',
          severity: 'mild' as const
        },
        {
          code: 'F43.1',
          title: 'Post-traumatic stress disorder',
          category: 'Neurotic, stress-related and somatoform disorders',
          symptoms: ['intrusive memories', 'nightmares', 'flashbacks', 'avoidance', 'negative mood changes', 'hypervigilance'],
          description: 'A mental health condition triggered by experiencing or witnessing a terrifying event.',
          severity: 'severe' as const
        },
        {
          code: 'F50.9',
          title: 'Eating disorder, unspecified',
          category: 'Behavioral syndromes associated with physiological disturbances',
          symptoms: ['abnormal eating habits', 'weight changes', 'preoccupation with food', 'body image distortion'],
          description: 'Disorders characterized by abnormal eating habits that negatively affect health.',
          severity: 'moderate' as const
        },
        {
          code: 'F60.3',
          title: 'Emotionally unstable personality disorder',
          category: 'Disorders of adult personality and behavior',
          symptoms: ['emotional instability', 'impulsivity', 'relationship difficulties', 'identity disturbance'],
          description: 'A personality disorder characterized by emotional instability and impulsive behavior.',
          severity: 'severe' as const
        }
      ];

      try {
        const { error } = await supabase
          .from('icd10_conditions')
          .insert(sampleConditions);

        if (error) {
          console.error('Error seeding ICD-10 data:', error);
        } else {
          console.log('ICD-10 sample data seeded successfully');
        }
      } catch (error) {
        console.error('Error seeding data:', error);
      }
    };

    seedICD10Data();
  }, []);

  return null; // This component doesn't render anything
};

export default ICD10DataSeeder;
