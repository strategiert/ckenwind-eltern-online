
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";

interface EbookFormData {
  firstName: string;
  email: string;
  dataConsent: boolean;
}

export const useEbookDownload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { trackEbookDownload } = useAnalytics();

  const downloadEbook = async (formData: EbookFormData): Promise<boolean> => {
    if (!formData.email || !formData.firstName || !formData.dataConsent) {
      toast({
        title: "Unvollständige Daten",
        description: "Bitte füllen Sie alle Felder aus und stimmen Sie der Datenverarbeitung zu.",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ebook-download', {
        body: formData
      });

      if (error) {
        console.error('E-Book download error:', error);
        throw error;
      }

      if (data?.success) {
        // Track conversion
        trackEbookDownload(formData.firstName, formData.email);
        
        toast({
          title: "E-Book wird gesendet!",
          description: data.message || "Sie erhalten Ihr E-Book in wenigen Minuten per E-Mail.",
        });
        return true;
      } else {
        throw new Error(data?.error || 'Unbekannter Fehler');
      }
    } catch (error: any) {
      console.error('E-Book download failed:', error);
      toast({
        title: "Download fehlgeschlagen",
        description: error.message || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    downloadEbook,
    isLoading
  };
};
