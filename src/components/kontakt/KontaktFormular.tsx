
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const KontaktFormular = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Bitte alle Felder ausfüllen",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        throw new Error(error.message || 'Ein Fehler ist aufgetreten');
      }

      toast({
        title: "Nachricht erfolgreich gesendet!",
        description: "Vielen Dank für Ihre Kontaktaufnahme. Wir werden uns so schnell wie möglich bei Ihnen melden.",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Fehler beim Senden des Formulars:', error);
      toast({
        title: "Fehler beim Senden",
        description: `Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per E-Mail. Details: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-display font-semibold mb-6">Schreiben Sie uns</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ihr Name"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="email">E-Mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ihre-email@beispiel.de"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="subject">Betreff</Label>
          <Select onValueChange={handleSelectChange} value={formData.subject}>
            <SelectTrigger>
              <SelectValue placeholder="Bitte wählen Sie einen Betreff" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="allgemeine-anfrage">Allgemeine Anfrage</SelectItem>
              <SelectItem value="plattform-frage">Frage zur Plattform</SelectItem>
              <SelectItem value="buchung">Coaching-Buchung</SelectItem>
              <SelectItem value="technische-frage">Technische Frage</SelectItem>
              <SelectItem value="sonstiges">Sonstiges</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="message">Nachricht</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Ihre Nachricht an uns"
            rows={5}
            className="mt-1 resize-none"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
        </Button>
      </form>
    </div>
  );
};

export default KontaktFormular;
