
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Kontakt = () => {
  const [formData, setFormData] = useState({
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
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-rueckenwind-light-purple to-white py-16 md:py-20">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-semibold mb-6">Kontakt</h1>
              <p className="text-xl text-gray-700">
                Haben Sie Fragen, Anregungen oder möchten Sie mehr erfahren? 
                Wir freuen uns auf Ihre Nachricht!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6">Kontaktinformationen</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 bg-rueckenwind-light-purple rounded-full flex items-center justify-center text-rueckenwind-purple flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">E-Mail</h3>
                      <p className="text-gray-700 mt-1">info@rueckenwind-eltern.de</p>
                      <p className="text-gray-600 text-sm mt-1">
                        Wir bemühen uns, alle Anfragen innerhalb von 48 Stunden zu beantworten.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 bg-rueckenwind-soft-gray p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-display font-medium mb-4">Häufig gestellte Fragen</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-rueckenwind-purple">Wie funktioniert die Plattform "Therapie in der Cloud"?</h4>
                      <p className="text-gray-700 mt-2">
                        Unsere digitale Plattform bietet Ihnen Zugang zu umfangreichen Ressourcen, 
                        darunter Videos, Kurse und praktische Tools für den Familienalltag. 
                        Nach der Anmeldung können Sie alle Inhalte einfach und bequem nutzen.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-rueckenwind-purple">Gibt es eine kostenlose Testphase?</h4>
                      <p className="text-gray-700 mt-2">
                        Ja, Sie können unsere Plattform 7 Tage kostenlos testen, 
                        um einen Einblick in alle Funktionen und Inhalte zu erhalten.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-rueckenwind-purple">Ist die App im Mitgliedschaftspreis enthalten?</h4>
                      <p className="text-gray-700 mt-2">
                        Ja, alle Mitgliedschaften beinhalten vollen Zugriff auf unsere App, 
                        die Ihnen zusätzliche Tools und Übungen für den Alltag bietet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="order-1 lg:order-2">
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
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Kontakt;
