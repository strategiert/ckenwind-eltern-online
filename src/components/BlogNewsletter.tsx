
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const BlogNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "E-Mail erforderlich",
        description: "Bitte geben Sie Ihre E-Mail-Adresse ein.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Ungültige E-Mail",
        description: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Call our edge function
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email }
      });

      if (error) {
        console.error('Newsletter subscription error:', error);
        throw error;
      }

      if (data?.success) {
        setIsSubscribed(true);
        toast({
          title: "Erfolgreich angemeldet!",
          description: data.message || "Sie erhalten bald unseren Newsletter mit wertvollen Tipps.",
        });
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
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mr-2" />
            <div>
              <h3 className="font-medium text-green-800">Vielen Dank!</h3>
              <p className="text-sm text-green-700">Sie sind jetzt für unseren Newsletter angemeldet.</p>
              <p className="text-xs text-green-600 mt-1">
                Prüfen Sie auch Ihren Spam-Ordner für die Bestätigungs-E-Mail.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-rueckenwind-light-purple">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Mail className="w-5 h-5 mr-2 text-rueckenwind-purple" />
          Newsletter abonnieren
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 mb-4">
          Erhalten Sie regelmäßig praktische Tipps und neue Artikel direkt in Ihr Postfach.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Ihre E-Mail-Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="w-full bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Wird angemeldet...
              </>
            ) : (
              'Jetzt anmelden'
            )}
          </Button>
        </form>
        <p className="text-xs text-gray-600 mt-2">
          Keine Sorge, wir spammen nicht. Sie können sich jederzeit abmelden.
        </p>
      </CardContent>
    </Card>
  );
};

export default BlogNewsletter;
