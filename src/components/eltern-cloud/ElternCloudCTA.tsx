
import React from 'react';
import { Button } from '@/components/ui/button';

const ElternCloudCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-rueckenwind-light-purple">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
            Bereit für mehr Leichtigkeit im Familienalltag?
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Starte noch heute deine Reise zu mehr Gelassenheit, Verständnis und Freude mit deinen Kindern. 
            Tausende Eltern haben es bereits geschafft - du kannst es auch!
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <Button asChild className="bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple text-white font-medium px-8 py-4 text-lg rounded-lg shadow-lg">
              <a href="#pricing">Jetzt 7 Tage kostenlos testen</a>
            </Button>
            <Button asChild variant="outline" className="border-rueckenwind-purple text-rueckenwind-purple hover:bg-rueckenwind-light-purple px-8 py-4 text-lg rounded-lg">
              <a href="#pricing">Mein Paket auswählen</a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold mb-1">Sofortiger Zugang</h3>
              <p className="text-sm text-gray-600">Direkt nach der Anmeldung verfügbar</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="font-semibold mb-1">Bewährt wirksam</h3>
              <p className="text-sm text-gray-600">Über 5.000 zufriedene Eltern</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="font-semibold mb-1">Persönlich betreut</h3>
              <p className="text-sm text-gray-600">Durch Janike und ihr Expertenteam</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-rueckenwind-purple">
              🎯 Das sagen andere Eltern:
            </h3>
            <p className="text-gray-700 italic mb-4">
              "Die Eltern-Cloud hat unser Familienleben komplett verändert. Endlich verstehe ich mein ADHS-Kind besser 
              und habe konkrete Tools für schwierige Situationen. Das Beste: Ich bin nicht mehr allein mit meinen Sorgen!"
            </p>
            <p className="text-sm text-gray-600 font-medium">
              - Sarah M., Mutter von zwei Kindern
            </p>
          </div>

          <div className="mt-8 text-sm text-gray-600">
            <p>✓ 7 Tage kostenlos testen • ✓ Jederzeit kündbar • ✓ 30 Tage Geld-zurück-Garantie</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElternCloudCTA;

