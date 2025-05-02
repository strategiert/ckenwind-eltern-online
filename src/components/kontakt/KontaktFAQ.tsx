
import React from 'react';

const KontaktFAQ = () => {
  return (
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
  );
};

export default KontaktFAQ;
