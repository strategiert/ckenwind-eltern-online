
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";

const GratisBuch = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    dataConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, dataConsent: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.email || !formData.dataConsent) {
      toast({
        title: "Bitte alle Felder ausfüllen",
        description: "Bitte füllen Sie alle Pflichtfelder aus und stimmen Sie der Datenschutzerklärung zu.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "E-Book erfolgreich angefordert!",
        description: "Ihr E-Book wurde an Ihre E-Mail-Adresse gesendet.",
      });
      setIsSubmitting(false);
      setFormData({
        firstName: '',
        email: '',
        dataConsent: false
      });
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-rueckenwind-light-purple to-white py-16 md:py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-6 leading-tight">
                  Wege aus dem elterlichen Burnout
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  Ihr kostenloser Ratgeber für mehr Energie und Gelassenheit im Familienalltag
                </p>
                <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rueckenwind-purple" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Ursachen des elterlichen Burnouts verstehen</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rueckenwind-purple" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Praktische Selbstfürsorge-Übungen für Eltern</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rueckenwind-purple" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Sofort anwendbare Strategien für mehr Energie</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rueckenwind-purple" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Alltagstaugliche Tools für weniger Stress</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rueckenwind-purple" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Wege zu einem harmonischeren Familienleben</span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative max-w-md mx-auto">
                <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-rueckenwind-soft-blue opacity-60 z-0"></div>
                <div className="relative z-10 shadow-xl">
                  <img 
                    src="/lovable-uploads/7d2ad28c-b24a-4328-9709-ff66596391f2.png" 
                    alt="E-Book Cover: Wege aus dem elterlichen Burnout" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-rueckenwind-light-purple opacity-60 z-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl md:text-3xl font-display font-semibold mb-6 text-center">
                Jetzt gratis E-Book anfordern
              </h2>
              <p className="text-gray-700 mb-8 text-center">
                Geben Sie Ihre E-Mail-Adresse ein, um Ihr kostenloses Exemplar zu erhalten:
              </p>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="firstName">Vorname</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Ihr Vorname"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">E-Mail-Adresse</Label>
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
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="dataConsent" 
                      checked={formData.dataConsent} 
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="dataConsent" className="text-sm text-gray-600 cursor-pointer">
                      Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu. 
                      Sie können sich jederzeit wieder abmelden.
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Wird gesendet..." : "Gratis E-Book anfordern"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Testimonial */}
            <div className="max-w-2xl mx-auto mt-16 bg-rueckenwind-soft-gray p-8 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070" 
                    alt="Sarah M." 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-700 italic mb-4">
                    "Das E-Book hat mir die Augen geöffnet. Es war, als würde Janike genau verstehen, was ich durchmache. Die Übungen sind einfach in den Alltag zu integrieren und haben mir wirklich geholfen, wieder mehr Energie zu finden."
                  </p>
                  <p className="font-medium">Sarah M., Mutter von zwei Kindern</p>
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

export default GratisBuch;
