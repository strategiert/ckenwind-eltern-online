
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { useNewsletter } from "@/hooks/useNewsletter";

const BlogNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { subscribe, isLoading } = useNewsletter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await subscribe(email);
    if (success) {
      setIsSubscribed(true);
      setEmail('');
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
              <p className="text-sm text-green-700">
                Wir haben Ihnen eine Bestätigungs-E-Mail gesendet.
              </p>
              <p className="text-xs text-green-600 mt-1">
                Bitte klicken Sie auf den Link in der E-Mail, um Ihre Anmeldung zu bestätigen.
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
          Mit der Anmeldung stimmen Sie unserer Datenschutzerklärung zu. 
          Sie erhalten eine Bestätigungs-E-Mail und können sich jederzeit abmelden.
        </p>
      </CardContent>
    </Card>
  );
};

export default BlogNewsletter;
