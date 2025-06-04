
import React from 'react';

const ElternCloudGuarantees = () => {
  return (
    <section className="py-16 md:py-24 bg-rueckenwind-soft-gray">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
            🔒 Deine Sicherheit
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Teste die Eltern-Cloud völlig risikofrei
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-lg font-semibold mb-2">7 Tage kostenlos</h3>
            <p className="text-gray-600 text-sm">
              Teste alle Funktionen ohne Risiko und ohne Verpflichtung
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-lg font-semibold mb-2">30 Tage Geld-zurück</h3>
            <p className="text-gray-600 text-sm">
              Nicht zufrieden? Geld zurück, ohne Fragen, ohne Wenn und Aber
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🚪</div>
            <h3 className="text-lg font-semibold mb-2">Jederzeit kündbar</h3>
            <p className="text-gray-600 text-sm">
              Keine Mindestlaufzeit, keine versteckten Kosten, faire Bedingungen
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold mb-2">DSGVO-konform</h3>
            <p className="text-gray-600 text-sm">
              Höchste Datensicherheit und Vertraulichkeit garantiert
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4 text-rueckenwind-purple">
              Warum können wir das anbieten?
            </h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Weil wir von der Qualität unserer Inhalte und dem Wert für dich als Eltern überzeugt sind. 
              Über 95% unserer Mitglieder bleiben länger als 6 Monate dabei - das zeigt uns, dass unsere 
              Eltern-Cloud wirklich hilft.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElternCloudGuarantees;

