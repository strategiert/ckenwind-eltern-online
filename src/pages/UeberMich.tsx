import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import { Link } from 'react-router-dom';
import { Book, Briefcase, GraduationCap, Heart, Users } from 'lucide-react';
const UeberMich = () => {
  return <>
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
                  <img alt="Janike Arent" className="w-full h-auto" src="/lovable-uploads/bee7f053-fb8f-409e-b5b9-96776ee1cb95.jpg" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-rueckenwind-light-purple opacity-60 z-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Journey - Storytelling Format */}
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8 text-center">Meine Geschichte</h2>
              
              <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="bg-rueckenwind-light-purple p-3 rounded-full mr-4">
                      <Heart className="h-6 w-6 text-rueckenwind-purple" />
                    </div>
                    <h3 className="text-2xl font-display font-medium text-rueckenwind-purple">Der Beginn meiner Reise</h3>
                  </div>
                  <p className="mb-4">
                    Meine Leidenschaft für die Arbeit mit Kindern begann früh. Als Kindergärtnerin erlebte ich die wundervolle Welt der kindlichen Entwicklung – und entdeckte dabei auch meine eigene Berufung. Ich spürte, dass ich mehr tun wollte, tiefer verstehen, wirkungsvoller helfen. Diese Neugier und der Wunsch zu verstehen führten mich auf einen Bildungsweg, der nie wirklich endete.
                  </p>
                  <p>
                    Was mich antreibt? Die tiefe Überzeugung, dass jedes Kind und jede Familie es verdient, verstanden und unterstützt zu werden. Als Mutter von drei wundervollen Kindern – darunter ein Kind mit ADHS – und als jemand, der selbst mit ADHS lebt, kenne ich die Herausforderungen aus erster Hand. Diese persönliche Erfahrung gibt mir eine Perspektive, die über das Theoretische hinausgeht – sie ist gelebt, gefühlt und durchgestanden.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="bg-rueckenwind-light-purple p-3 rounded-full mr-4">
                      <Users className="h-6 w-6 text-rueckenwind-purple" />
                    </div>
                    <h3 className="text-2xl font-display font-medium text-rueckenwind-purple">In den stürmischen Jahren</h3>
                  </div>
                  <p className="mb-4">
                    Als Schulsozialpädagogin an der Fridtjof-Nansen-Schule lernte ich, dass das Klassenzimmer oft nur ein kleiner Teil der Geschichte eines Kindes ist. Ich sah, wie familiäre Strukturen, gesellschaftliche Umstände und persönliche Krisen das Leben und Lernen beeinflussen können.
                  </p>
                  <p className="mb-4">
                    Dann kam 2014 – eine Zeit, die mich tief prägte. Als die Flüchtlingskrise Deutschland erreichte, wurde ich ins kalte Wasser geworfen. Beim DRK Soziale Dienste Hannover baute ich Flüchtlingsheime auf und koordinierte Hilfsangebote für unzählige Familien, die alles verloren hatten. Ich sah Verzweiflung und Hoffnung, Trauma und unglaubliche Resilienz – oft in denselben Augen.
                  </p>
                  <p>
                    Die Arbeit war intensiv, fordernd, manchmal überwältigend – und doch unendlich erfüllend. Mit jeder Familie, der wir helfen konnten, mit jedem Kind, das in der neuen Umgebung langsam wieder lächeln konnte, wuchs meine Überzeugung: In der größten Not liegt oft auch die größte Kraft zur Veränderung.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="bg-rueckenwind-light-purple p-3 rounded-full mr-4">
                      <Briefcase className="h-6 w-6 text-rueckenwind-purple" />
                    </div>
                    <h3 className="text-2xl font-display font-medium text-rueckenwind-purple">Wachsen durch Verantwortung</h3>
                  </div>
                  <p className="mb-4">
                    Meine Leidenschaft und mein Einsatz führten dazu, dass mir immer mehr Verantwortung übertragen wurde. Als Bereichsleiterin beim DRK und später als Teamleiterin bei der Stadt Hannover im Bereich Jugendhilfe durfte ich ein Team von Fachkräften führen, die täglich für Familien in Krisen kämpften.
                  </p>
                  <p className="mb-4">
                    Diese Jahre lehrten mich, dass echte Hilfe Zeit braucht, Geduld erfordert und manchmal auch bedeutet, schwierige Entscheidungen zu treffen. Ich lernte, dass Systeme und Strukturen wichtig sind – aber dass es letztendlich die menschlichen Verbindungen sind, die den Unterschied machen.
                  </p>
                  <p>
                    In jeder Familie, mit der ich arbeitete, sah ich nicht nur Probleme, sondern auch Potenzial; nicht nur Krisen, sondern auch Chancen für Wachstum. Diese Perspektive prägt bis heute meine Arbeit und meine Philosophie.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="bg-rueckenwind-light-purple p-3 rounded-full mr-4">
                      <GraduationCap className="h-6 w-6 text-rueckenwind-purple" />
                    </div>
                    <h3 className="text-2xl font-display font-medium text-rueckenwind-purple">Der Weg zur Therapeutin</h3>
                  </div>
                  <p className="mb-4">
                    Parallel zu meiner beruflichen Entwicklung habe ich nie aufgehört zu lernen. Mit einem Bachelor und einem Master in Sozialer Arbeit von der HAWK Hochschule legte ich akademische Grundlagen für meine Praxis. Doch ich spürte, dass ich noch tiefer gehen wollte, noch gezielter helfen.
                  </p>
                  <p className="mb-4">
                    So begann ich 2021 meine Ausbildung zur Kinder- und Jugendlichenpsychotherapeutin am DGVT Hannover – ein Schritt, der mich mit neuen Perspektiven und Werkzeugen ausstattet. Als Psychotherapeutin in Ausbildung am Kinderkrankenhaus Auf Der Bult arbeite ich heute mit Kindern und Jugendlichen, die mit psychischen Herausforderungen kämpfen.
                  </p>
                  <p>
                    Diese therapeutische Ausbildung erlaubt mir, die emotionalen und psychologischen Dimensionen der Familienarbeit noch tiefer zu verstehen – und sie mit meiner langjährigen praktischen Erfahrung zu verbinden.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="bg-rueckenwind-light-purple p-3 rounded-full mr-4">
                      <Book className="h-6 w-6 text-rueckenwind-purple" />
                    </div>
                    <h3 className="text-2xl font-display font-medium text-rueckenwind-purple">Mein Wissen teilen</h3>
                  </div>
                  <p className="mb-4">
                    Die Erfahrungen und Erkenntnisse meines beruflichen Weges finden auch in meinen Publikationen Ausdruck. In "Wenn ein Kind stirbt" (2014) setzte ich mich mit einem der schwersten Themen auseinander, das eine Familie treffen kann. "Die multikulturelle Gesellschaft" (2013) reflektiert meine Erfahrungen mit Menschen aus verschiedenen kulturellen Hintergründen.
                  </p>
                  <p className="mb-4">
                    Mein aktuelles Projekt "Wege aus dem elterlichen Burnout" (2025) ist eine Herzensangelegenheit – es verbindet meine berufliche Expertise mit persönlichen Erfahrungen als Mutter. Darin teile ich Erkenntnisse und praktische Strategien für Eltern, die sich ausgebrannt fühlen und einen Weg zurück zu mehr Lebensfreude suchen.
                  </p>
                  <p>
                    Als Trauer- und Sterbebegleiterin beim Hospizdienst Hannover und durch mein soziales Engagement bei Intiwawa habe ich gelernt, dass in den dunkelsten Stunden manchmal das hellste Licht zu finden ist – eine Erkenntnis, die ich in all meiner Arbeit weitergebe.
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
                <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">Mutter mit Leidenschaft</h2>
                <p className="text-gray-700 mb-4">
                  Mein größtes und wichtigstes Projekt ist meine eigene Familie. Als Ehefrau und Mutter von drei wundervollen Kindern lebe ich täglich die Herausforderungen und Freuden, über die ich in meiner beruflichen Arbeit spreche.
                </p>
                <p className="text-gray-700 mb-4">
                  Mit ADHS – sowohl bei mir selbst als auch bei einem meiner Kinder – kenne ich die täglichen Höhen und Tiefen einer neurodivers geprägten Familienrealität. Ich weiß, wie es sich anfühlt, wenn der Tag zu wenige Stunden hat, wenn die Erschöpfung überhandnimmt und wenn gut gemeinte Ratschläge von außen mehr frustrieren als helfen.
                </p>
                <p className="text-gray-700">
                  Diese persönliche Verbindung zum Thema macht Rückenwind Eltern zu mehr als einem beruflichen Projekt – es ist meine Mission, mein Beitrag für all die Eltern da draußen, die sich manchmal fragen, ob sie genug tun, ob sie gut genug sind. Meine Antwort: Ja, das seid ihr. Und gemeinsam können wir Wege finden, damit ihr das auch spüren könnt.
                </p>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="grid grid-cols-2 gap-4">
                  <img alt="Familienleben" className="rounded-lg shadow-md w-full h-auto" src="/lovable-uploads/0d5fdd37-eb0e-45a5-893b-e3a3e8a7a4fd.jpg" />
                  <img alt="Familienleben" className="rounded-lg shadow-md w-full h-auto mt-8" src="/lovable-uploads/f79ff23e-87e0-459d-be17-b69a522993d0.jpg" />
                  <img alt="Familienleben" className="rounded-lg shadow-md w-full h-auto" src="/lovable-uploads/90bfde2f-8f49-40ce-8dc1-ed9b7724d311.jpg" />
                  <img alt="Familienleben" className="rounded-lg shadow-md w-full h-auto mt-8" src="/lovable-uploads/5e9c2c69-3b6c-4ccc-8989-a23b9cc671b2.jpg" />
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
        <CTASection title="Lassen Sie uns gemeinsam starten" description="Entdecken Sie, wie Rückenwind Eltern Ihnen und Ihrer Familie helfen kann – beginnen Sie mit meinem kostenlosen E-Book." buttonText="Gratis E-Book sichern" buttonLink="/gratis-buch" bgColor="bg-rueckenwind-light-purple" />
      </main>
      <Footer />
    </>;
};
export default UeberMich;