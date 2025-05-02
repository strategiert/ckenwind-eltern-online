
import React from 'react';

const KontaktInfos = () => {
  return (
    <div>
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
    </div>
  );
};

export default KontaktInfos;
