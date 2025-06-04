
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UseImageGenerationProps {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: string) => void;
}

interface ImageGenerationState {
  isGenerating: boolean;
  error: string | null;
  retryCount: number;
}

const MAX_RETRIES = 2;
const RETRY_DELAY = 2000; // 2 seconds

export const useImageGeneration = ({ onSuccess, onError }: UseImageGenerationProps = {}) => {
  const [state, setState] = useState<ImageGenerationState>({
    isGenerating: false,
    error: null,
    retryCount: 0
  });
  const { toast } = useToast();

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const generateImage = useCallback(async (
    title: string,
    topic: string,
    category: string,
    content: string,
    isRetry: boolean = false
  ) => {
    if (!title?.trim()) {
      const error = 'Titel ist erforderlich für die Bildgenerierung';
      setState(prev => ({ ...prev, error }));
      onError?.(error);
      toast({
        title: "Fehler",
        description: error,
        variant: "destructive",
      });
      return;
    }

    if (!isRetry) {
      setState(prev => ({ ...prev, isGenerating: true, error: null, retryCount: 0 }));
    } else {
      setState(prev => ({ ...prev, isGenerating: true, error: null }));
    }

    try {
      console.log('Starting optimized image generation with enhanced error handling...');
      
      const { data, error } = await supabase.functions.invoke('generate-blog-image', {
        body: { 
          title: title.trim(),
          topic: topic.trim(),
          category,
          content
        }
      });

      if (error) {
        console.error('Image generation error:', error);
        throw new Error(error.message || 'Unbekannter Fehler bei der Bildgenerierung');
      }

      if (!data?.imageUrl) {
        throw new Error('Keine Bild-URL in der Antwort erhalten');
      }

      // Validate image URL
      try {
        new URL(data.imageUrl);
      } catch {
        throw new Error('Ungültige Bild-URL erhalten');
      }

      setState(prev => ({ ...prev, isGenerating: false, error: null, retryCount: 0 }));
      onSuccess?.(data.imageUrl);
      
      toast({
        title: "Erfolg",
        description: "Optimiertes Bild wurde erfolgreich generiert!",
        duration: 5000,
      });

    } catch (error) {
      console.error('Error generating optimized image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      
      // Auto-retry logic
      if (state.retryCount < MAX_RETRIES && !isRetry) {
        console.log(`Retrying image generation (attempt ${state.retryCount + 1}/${MAX_RETRIES})...`);
        setState(prev => ({ ...prev, retryCount: prev.retryCount + 1 }));
        
        await delay(RETRY_DELAY);
        return generateImage(title, topic, category, content, true);
      }

      setState(prev => ({ 
        ...prev, 
        isGenerating: false, 
        error: errorMessage
      }));
      
      onError?.(errorMessage);
      toast({
        title: "Fehler",
        description: `Fehler beim Generieren des Bilds: ${errorMessage}`,
        variant: "destructive",
      });
    }
  }, [state.retryCount, onSuccess, onError, toast]);

  const retry = useCallback((
    title: string,
    topic: string,
    category: string,
    content: string
  ) => {
    setState(prev => ({ ...prev, retryCount: 0 }));
    generateImage(title, topic, category, content);
  }, [generateImage]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    generateImage,
    retry,
    clearError,
    isGenerating: state.isGenerating,
    error: state.error,
    retryCount: state.retryCount
  };
};
