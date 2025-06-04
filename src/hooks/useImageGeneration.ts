
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UseImageGenerationProps {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: string) => void;
  onPromptGenerated?: (prompt: string) => void;
}

interface ImageGenerationState {
  isAnalyzing: boolean;
  isGenerating: boolean;
  error: string | null;
  generatedPrompt: string;
  retryCount: number;
}

const MAX_RETRIES = 2;
const RETRY_DELAY = 2000; // 2 seconds

export const useImageGeneration = ({ onSuccess, onError, onPromptGenerated }: UseImageGenerationProps = {}) => {
  const [state, setState] = useState<ImageGenerationState>({
    isAnalyzing: false,
    isGenerating: false,
    error: null,
    generatedPrompt: '',
    retryCount: 0
  });
  const { toast } = useToast();

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Helper function to get auth headers
  const getAuthHeaders = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      return { Authorization: `Bearer ${session.access_token}` };
    }
    return {};
  };

  // Step 1: Analyze content and generate image description
  const analyzeContent = useCallback(async (
    title: string,
    topic: string,
    category: string,
    content: string
  ) => {
    if (!title?.trim()) {
      const error = 'Titel ist erforderlich für die Inhaltsanalyse';
      setState(prev => ({ ...prev, error }));
      onError?.(error);
      toast({
        title: "Fehler",
        description: error,
        variant: "destructive",
      });
      return;
    }

    setState(prev => ({ ...prev, isAnalyzing: true, error: null }));

    try {
      console.log('Starting content analysis for image description...');
      
      // Get auth headers for the request
      const authHeaders = await getAuthHeaders();
      
      const { data, error } = await supabase.functions.invoke('generate-blog-image', {
        body: { 
          mode: 'analyze',
          title: title.trim(),
          topic: topic.trim(),
          category,
          content
        },
        headers: authHeaders
      });

      if (error) {
        console.error('Content analysis error:', error);
        
        // Handle specific error cases
        if (error.message?.includes('Authentifizierung')) {
          throw new Error('Bitte melden Sie sich an, um die Bildgenerierung zu nutzen');
        }
        
        throw new Error(error.message || 'Unbekannter Fehler bei der Inhaltsanalyse');
      }

      if (!data?.imageDescription) {
        throw new Error('Keine Bildbeschreibung in der Antwort erhalten');
      }

      const prompt = data.imageDescription;
      setState(prev => ({ ...prev, isAnalyzing: false, error: null, generatedPrompt: prompt }));
      onPromptGenerated?.(prompt);
      
      toast({
        title: "Erfolg",
        description: "Inhalt erfolgreich analysiert! Bildbeschreibung erstellt.",
        duration: 3000,
      });

    } catch (error) {
      console.error('Error analyzing content:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      
      setState(prev => ({ 
        ...prev, 
        isAnalyzing: false, 
        error: errorMessage
      }));
      
      onError?.(errorMessage);
      toast({
        title: "Fehler",
        description: `Fehler bei der Inhaltsanalyse: ${errorMessage}`,
        variant: "destructive",
      });
    }
  }, [onError, onPromptGenerated, toast]);

  // Step 2: Generate image from analyzed prompt
  const generateFromPrompt = useCallback(async (
    imagePrompt: string,
    isRetry: boolean = false
  ) => {
    if (!imagePrompt?.trim()) {
      const error = 'Bildbeschreibung ist erforderlich für die Bildgenerierung';
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
      console.log('Generating image from analyzed prompt...');
      
      // Get auth headers for the request
      const authHeaders = await getAuthHeaders();
      
      const { data, error } = await supabase.functions.invoke('generate-blog-image', {
        body: { 
          mode: 'generate',
          imagePrompt: imagePrompt.trim()
        },
        headers: authHeaders
      });

      if (error) {
        console.error('Image generation error:', error);
        
        // Handle specific error cases
        if (error.message?.includes('Authentifizierung')) {
          throw new Error('Bitte melden Sie sich an, um die Bildgenerierung zu nutzen');
        }
        
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
        description: "Bild wurde erfolgreich aus der Analyse generiert!",
        duration: 5000,
      });

    } catch (error) {
      console.error('Error generating image from prompt:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      
      // Auto-retry logic
      if (state.retryCount < MAX_RETRIES && !isRetry) {
        console.log(`Retrying image generation (attempt ${state.retryCount + 1}/${MAX_RETRIES})...`);
        setState(prev => ({ ...prev, retryCount: prev.retryCount + 1 }));
        
        await delay(RETRY_DELAY);
        return generateFromPrompt(imagePrompt, true);
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

  // Step 3: Generate image from manual description
  const generateFromManual = useCallback(async (
    manualDescription: string,
    isRetry: boolean = false
  ) => {
    if (!manualDescription?.trim()) {
      const error = 'Manuelle Beschreibung ist erforderlich für die Bildgenerierung';
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
      console.log('Generating image from manual description...');
      
      // Get auth headers for the request
      const authHeaders = await getAuthHeaders();
      
      const { data, error } = await supabase.functions.invoke('generate-blog-image', {
        body: { 
          mode: 'generate',
          imagePrompt: manualDescription.trim()
        },
        headers: authHeaders
      });

      if (error) {
        console.error('Image generation error:', error);
        
        // Handle specific error cases
        if (error.message?.includes('Authentifizierung')) {
          throw new Error('Bitte melden Sie sich an, um die Bildgenerierung zu nutzen');
        }
        
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
        description: "Bild wurde erfolgreich aus der manuellen Beschreibung generiert!",
        duration: 5000,
      });

    } catch (error) {
      console.error('Error generating image from manual description:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
      
      // Auto-retry logic
      if (state.retryCount < MAX_RETRIES && !isRetry) {
        console.log(`Retrying image generation (attempt ${state.retryCount + 1}/${MAX_RETRIES})...`);
        setState(prev => ({ ...prev, retryCount: prev.retryCount + 1 }));
        
        await delay(RETRY_DELAY);
        return generateFromManual(manualDescription, true);
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

  // Legacy method for backward compatibility
  const generateImage = useCallback(async (
    title: string,
    topic: string,
    category: string,
    content: string,
    isRetry: boolean = false
  ) => {
    console.log('Using legacy generateImage method - consider using the new three-step process');
    await analyzeContent(title, topic, category, content);
  }, [analyzeContent]);

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

  const clearPrompt = useCallback(() => {
    setState(prev => ({ ...prev, generatedPrompt: '', error: null }));
  }, []);

  return {
    analyzeContent,
    generateFromPrompt,
    generateFromManual,
    generateImage, // Legacy method
    retry,
    clearError,
    clearPrompt,
    isAnalyzing: state.isAnalyzing,
    isGenerating: state.isGenerating,
    error: state.error,
    generatedPrompt: state.generatedPrompt,
    retryCount: state.retryCount
  };
};
