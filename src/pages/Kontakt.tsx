
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import KontaktHero from '@/components/kontakt/KontaktHero';
import KontaktFormular from '@/components/kontakt/KontaktFormular';
import KontaktInfos from '@/components/kontakt/KontaktInfos';
import KontaktFAQ from '@/components/kontakt/KontaktFAQ';

const BASE_URL = 'https://rueckenwind-eltern.de';

// FAQ-Daten für Schema.org
const faqData = {
  questions: [
    {
      question: 'Wie funktioniert die Plattform "Therapie in der Cloud"?',
      answer: 'Unsere digitale Plattform bietet Ihnen Zugang zu umfangreichen Ressourcen, darunter Videos, Kurse und praktische Tools für den Familienalltag. Nach der Anmeldung können Sie alle Inhalte einfach und bequem nutzen.'
    },
    {
      question: 'Gibt es eine kostenlose Testphase?',
      answer: 'Ja, Sie können unsere Plattform 7 Tage kostenlos testen, um einen Einblick in alle Funktionen und Inhalte zu erhalten.'
    },
    {
      question: 'Ist die App im Mitgliedschaftspreis enthalten?',
      answer: 'Ja, alle Mitgliedschaften beinhalten vollen Zugriff auf unsere App, die Ihnen zusätzliche Tools und Übungen für den Alltag bietet.'
    }
  ]
};

const Kontakt = () => {
  const pageUrl = `${BASE_URL}/kontakt`;
  const pageTitle = 'Kontakt | Rückenwind Eltern';
  const pageDescription = 'Kontaktieren Sie Rückenwind Eltern für Fragen zu Eltern-Burnout, ADHS und Essstörungen. Wir helfen Ihnen gerne weiter.';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Rückenwind Eltern" />
        <meta property="og:locale" content="de_DE" />
      </Helmet>

      {/* FAQ Schema.org */}
      <SchemaMarkup type="faq" data={faqData} />

      {/* Breadcrumb Schema */}
      <SchemaMarkup
        type="breadcrumb"
        data={{
          items: [
            { name: 'Startseite', url: BASE_URL },
            { name: 'Kontakt', url: pageUrl }
          ]
        }}
      />

      <Navbar />
      <main>
        <KontaktHero />
        
        {/* Contact Form and Information */}
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="order-2 lg:order-1">
                <KontaktInfos />
                <KontaktFAQ />
              </div>
              
              {/* Contact Form */}
              <div className="order-1 lg:order-2">
                <KontaktFormular />
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
