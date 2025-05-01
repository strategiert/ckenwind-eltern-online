
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { Link } from 'react-router-dom';

const UeberMich = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-rueckenwind-light-purple to-white py-16 md:py-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-display font-semibold mb-6">Über mich</h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Ich bin Janike Arent – Therapeutin, dreifache Mutter und Gründerin von Rückenwind Eltern. Meine Mission ist es, Eltern wissenschaftlich fundierte Unterstützung zu bieten, die wirklich im Alltag funktioniert.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-rueckenwind-soft-blue opacity-60 z-0"></div>
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787" 
                    alt="Janike Arent" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-rueckenwind-light-purple opacity-60 z-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Background */}
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8 text-center">Mein beruflicher Werdegang</h2>
              
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-display font-medium text-rueckenwind-purple mb-2">Qualifikationen</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Master of Science in Psychologie</li>
                    <li>Bachelor of Arts in Pädagogik</li>
                    <li>Zertifizierte Familientherapeutin</li>
                    <li>Ausbildung in kognitiver Verhaltenstherapie</li>
                    <li>Spezialisierung auf ADHS, Essstörungen und Burnout-Prävention</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-display font-medium text-rueckenwind-purple mb-2">Erfahrung</h3>
                  <p className="text-gray-700 mb-4">
                    Mit über 20 Jahren Erfahrung in der therapeutischen Arbeit mit Familien kenne ich die vielfältigen Herausforderungen, denen Eltern heute gegenüberstehen.
                  </p>
                  <p className="text-gray-700">
                    In meiner langjährigen Praxisarbeit habe ich hunderte Familien bei Themen wie Eltern-Burnout, dem Umgang mit ADHS bei Kindern und der Begleitung von Kindern mit Essstörungen unterstützt.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-display font-medium text-rueckenwind-purple mb-2">Mein Ansatz</h3>
                  <p className="text-gray-700 mb-4">
                    Ich verbinde wissenschaftliche Erkenntnisse mit praktischer Alltagstauglichkeit. Als Mutter von drei Kindern weiß ich: Theoretische Konzepte müssen im hektischen Familienalltag funktionieren, um wirklich zu helfen.
                  </p>
                  <p className="text-gray-700">
                    Meine Arbeit basiert auf einem wertschätzenden, ressourcenorientierten Ansatz. Ich glaube an die Stärken jeder Familie und helfe dabei, diese zu entdecken und zu nutzen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Story */}
        <section className="py-16 md:py-20 bg-rueckenwind-soft-gray">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">Meine persönliche Geschichte</h2>
                <p className="text-gray-700 mb-4">
                  Als Mutter von drei wundervollen Kindern – darunter ein Kind mit ADHS – kenne ich die Höhen und Tiefen des Familienlebens aus erster Hand. Ich habe selbst erlebt, wie es ist, wenn die Erschöpfung überhandnimmt und man das Gefühl hat, nicht mehr weiterzuwissen.
                </p>
                <p className="text-gray-700 mb-4">
                  Diese persönlichen Erfahrungen haben mich dazu inspiriert, Rückenwind Eltern zu gründen – eine Plattform, die Eltern genau die Unterstützung bietet, die ich mir damals gewünscht hätte.
                </p>
                <p className="text-gray-700">
                  Ich bin überzeugt: Wir Eltern brauchen keine perfekten Lösungen, sondern praktikable Wege, um den Alltag mit unseren Kindern liebevoll und gesund zu gestalten, auch wenn es manchmal stürmisch wird.
                </p>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1964" 
                    alt="Familienleben" 
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?q=80&w=2070" 
                    alt="Familienleben" 
                    className="rounded-lg shadow-md w-full h-auto mt-8"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1581952976147-5a2d15560349?q=80&w=1971" 
                    alt="Familienleben" 
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1484665754804-74b091211472?q=80&w=2070" 
                    alt="Familienleben" 
                    className="rounded-lg shadow-md w-full h-auto mt-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <h2 className="section-title">Meine Philosophie</h2>
            <p className="section-subtitle">Was mir in meiner Arbeit wichtig ist</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-16 w-16 mx-auto bg-rueckenwind-light-purple rounded-full flex items-center justify-center text-rueckenwind-purple mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-medium mb-3">Wissenschaftliche Fundierung</h3>
                <p className="text-gray-700">
                  Alle meine Angebote basieren auf aktuellen wissenschaftlichen Erkenntnissen und bewährten therapeutischen Methoden.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-16 w-16 mx-auto bg-rueckenwind-light-purple rounded-full flex items-center justify-center text-rueckenwind-purple mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-medium mb-3">Empathie und Verständnis</h3>
                <p className="text-gray-700">
                  Ich begegne jeder Familie auf Augenhöhe und mit dem tiefen Verständnis, dass jede Familiensituation einzigartig ist.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="h-16 w-16 mx-auto bg-rueckenwind-light-purple rounded-full flex items-center justify-center text-rueckenwind-purple mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-medium mb-3">Praktische Anwendbarkeit</h3>
                <p className="text-gray-700">
                  Ich entwickle Lösungen, die sich realistisch in den Familienalltag integrieren lassen – ohne Perfektionsanspruch.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection
          title="Lassen Sie uns gemeinsam starten"
          description="Entdecken Sie, wie Rückenwind Eltern Ihnen und Ihrer Familie helfen kann – beginnen Sie mit meinem kostenlosen E-Book."
          buttonText="Gratis E-Book sichern"
          buttonLink="/gratis-buch"
          bgColor="bg-rueckenwind-light-purple"
        />
      </main>
      <Footer />
    </>
  );
};

export default UeberMich;
