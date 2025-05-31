
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";

export const useNewsletter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { trackNewsletterSignup } = useAnalytics();

  const subscribe = async (email: string, source?: string): Promise<boolean> => {
    if (!email) {
      toast({
        title: "E-Mail erforderlich",
        description: "Bitte geben Sie Ihre E-Mail-Adresse ein.",
        variant: "destructive",
      });
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Ungültige E-Mail",
        description: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email }
      });

      if (error) {
        console.error('Newsletter subscription error:', error);
        throw error;
      }

      if (data?.success) {
        // Track conversion
        trackNewsletterSignup(email, source);
        
        toast({
          title: "Erfolgreich angemeldet!",
          description: data.message || "Sie erhalten bald unseren Newsletter mit wertvollen Tipps.",
        });
        return true;
      } else {
        throw new Error(data?.error || 'Unbekannter Fehler');
      }
    } catch (error: any) {
      console.error('Newsletter subscription failed:', error);
      toast({
        title: "Anmeldung fehlgeschlagen",
        description: error.message || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscribe,
    isLoading
  };
};
