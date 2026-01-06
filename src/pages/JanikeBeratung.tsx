import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { JanikeChat } from '@/components/janike-chat';
import { Heart, Shield, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: "Einfühlsam",
    description: "20+ Jahre Erfahrung in Familientherapie"
  },
  {
    icon: Shield,
    title: "Vertraulich",
    description: "Ihre Gespräche bleiben privat"
  },
  {
    icon: Clock,
    title: "Jederzeit",
    description: "24/7 für Sie erreichbar"
  },
  {
    icon: Award,
    title: "Kompetent",
    description: "Basierend auf wissenschaftlichen Methoden"
  }
];

const JanikeBeratung: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Janike - Ihre digitale Familientherapeutin | Rückenwind Eltern</title>
        <meta
          name="description"
          content="Sprechen Sie mit Janike, unserer erfahrenen digitalen Familientherapeutin. Einfühlsame Unterstützung für Eltern - kostenlos und vertraulich."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-rueckenwind-light-purple/30 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-8 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">Janike ist online</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Sprechen Sie mit{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rueckenwind-purple to-pink-500">
                Janike
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Ihre digitale Familientherapeutin mit über 20 Jahren Erfahrung.
              Einfühlsam, kompetent und immer für Sie da.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                >
                  <feature.icon className="h-6 w-6 text-rueckenwind-purple mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chat Section */}
        <section className="pb-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <JanikeChat className="shadow-2xl" />
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-12 px-4 bg-white border-t">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
              Ihre Anliegen sind bei uns gut aufgehoben
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Janike ist Ihre erste Anlaufstelle für Fragen rund um Elternschaft und
              Kindererziehung. Bei komplexeren Themen vermitteln wir Sie gerne an
              unsere persönliche Beratung.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Shield className="h-4 w-4" /> DSGVO-konform
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" /> Nicht-wertend
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> Keine Wartezeit
              </span>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-6 px-4 bg-gray-50 border-t">
          <div className="container mx-auto max-w-4xl">
            <p className="text-xs text-gray-500 text-center">
              <strong>Wichtiger Hinweis:</strong> Janike ist ein KI-gestützter Assistent und ersetzt keine
              professionelle psychologische oder medizinische Beratung. Bei akuten Krisen wenden Sie sich
              bitte an den Notarzt (112) oder die Telefonseelsorge (0800 111 0 111 / 0800 111 0 222).
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default JanikeBeratung;
