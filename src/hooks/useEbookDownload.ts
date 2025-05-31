
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EbookDownloadData {
  firstName: string;
  email: string;
  dataConsent: boolean;
}

export const useEbookDownload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const downloadEbook = async (data: EbookDownloadData): Promise<boolean> => {
    if (!data.firstName || !data.email || !data.dataConsent) {
      toast({
        title: "Fehlende Angaben",
        description: "Bitte füllen Sie alle Felder aus und stimmen Sie der Datenschutzerklärung zu.",
        variant: "destructive",
      });
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast({
        title: "Ungültige E-Mail",
        description: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    
    try {
      const { data: response, error } = await supabase.functions.invoke('ebook-download', {
        body: data
      });

      if (error) {
        console.error('E-Book download error:', error);
        throw error;
      }

      if (response?.success) {
        toast({
          title: "E-Book erfolgreich angefordert!",
          description: response.message || "Ihr E-Book wurde an Ihre E-Mail-Adresse gesendet.",
        });
        return true;
      } else {
        throw new Error(response?.error || 'Unbekannter Fehler');
      }
    } catch (error: any) {
      console.error('E-Book download failed:', error);
      toast({
        title: "Anfrage fehlgeschlagen",
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
