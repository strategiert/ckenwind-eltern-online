
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

interface GoogleFormData {
  firstName: string;
  email: string;
}

export const useGoogleFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitToGoogleForm = async (formData: GoogleFormData): Promise<boolean> => {
    setIsSubmitting(true);
    
    try {
      // Google Form submission URL (extracted from the provided form)
      const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdPaWIT69e1oBr3luhiRldq8Hyz_Ydzm8gi5PgTtrY-lUdntg/formResponse';
      
      // Create form data for Google Form
      const googleFormData = new FormData();
      // These field names need to be extracted from the actual Google Form
      // For now, using common field entry IDs - these may need to be updated
      googleFormData.append('entry.2005620554', formData.firstName); // Name field
      googleFormData.append('entry.1045781291', formData.email); // Email field
      
      // Submit to Google Form
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Forms
        body: googleFormData,
      });

      console.log('Google Form submission successful');
      return true;
    } catch (error) {
      console.error('Google Form submission failed:', error);
      // Don't show error to user as Google Forms submission is supplementary
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitToGoogleForm,
    isSubmitting
  };
};
