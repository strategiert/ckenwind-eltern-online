
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ElternCloudPricing = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
            💰 Preise & Mitgliedschaften
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Wähle das Paket, das zu deiner Situation passt
          </p>
        </div>

        {/* Early Bird Banner */}
        <div className="bg-gradient-to-r from-rueckenwind-purple to-rueckenwind-dark-purple text-white p-6 rounded-lg mb-8 text-center">
          <h3 className="text-2xl font-bold mb-2">🎁 EARLY-BIRD-ANGEBOT</h3>
          <p className="text-lg">Spare in den ersten 3 Monaten bis zu 50€!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* BASIS Paket */}
          <Card className="relative">
            <CardHeader>
              <div className="text-center">
                <CardTitle className="text-2xl mb-2">BASIS-PAKET</CardTitle>
                <CardDescription className="text-lg font-medium">"Erste Hilfe"</CardDescription>
              </div>
              <div className="text-center">
                <div className="text-lg text-gray-500 line-through mb-1">29€/Monat</div>
                <div className="text-3xl font-bold text-rueckenwind-purple mb-2">19€/Monat</div>
                <div className="text-sm text-gray-600">Early Bird - erste 3 Monate</div>
                <div className="text-sm text-gray-600 mt-2">Regulär: 290€/Jahr (2 Monate gratis)</div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Vollzugang Mediathek (300+ Videos)
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Grundlagen-Kurse
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Wissensbereich + Glossar
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  App-Zugang
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Monatlicher Newsletter
                </li>
              </ul>
              <Button className="w-full mt-6 bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple">
                Jetzt 7 Tage kostenlos testen
              </Button>
            </CardContent>
          </Card>

          {/* PREMIUM Paket */}
          <Card className="relative border-2 border-rueckenwind-purple">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-rueckenwind-purple text-white px-4 py-1 rounded-full text-sm font-medium">
                ⭐ BELIEBTESTE OPTION
              </span>
            </div>
            <CardHeader className="pt-8">
              <div className="text-center">
                <CardTitle className="text-2xl mb-2">PREMIUM-PAKET</CardTitle>
                <CardDescription className="text-lg font-medium">"Begleitung"</CardDescription>
              </div>
              <div className="text-center">
                <div className="text-lg text-gray-500 line-through mb-1">79€/Monat</div>
                <div className="text-3xl font-bold text-rueckenwind-purple mb-2">59€/Monat</div>
                <div className="text-sm text-gray-600">Early Bird - erste 3 Monate</div>
                <div className="text-sm text-gray-600 mt-2">Regulär: 790€/Jahr (2 Monate gratis)</div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Alles aus BASIS
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Alle Vertiefungs-Kurse
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Live Q&A mit Janike (2x/Monat)
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Community-Zugang
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Persönliche Lernpfade
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Prioritäts-Support
                </li>
              </ul>
              <Button className="w-full mt-6 bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple">
                Jetzt 7 Tage kostenlos testen
              </Button>
            </CardContent>
          </Card>

          {/* VIP Paket */}
          <Card className="relative">
            <CardHeader>
              <div className="text-center">
                <CardTitle className="text-2xl mb-2">VIP-PAKET</CardTitle>
                <CardDescription className="text-lg font-medium">"Intensive Betreuung"</CardDescription>
              </div>
              <div className="text-center">
                <div className="text-lg text-gray-500 line-through mb-1">149€/Monat</div>
                <div className="text-3xl font-bold text-rueckenwind-purple mb-2">99€/Monat</div>
                <div className="text-sm text-gray-600">Early Bird - erste 3 Monate</div>
                <div className="text-sm text-gray-600 mt-2">Regulär: 1.490€/Jahr (2 Monate gratis)</div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Alles aus PREMIUM
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  1 persönliches Coaching/Monat (45 Min.)
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  WhatsApp-Support (24h Antwort)
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  2 Notfall-Gespräche/Jahr
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Exklusive Experten-Webinare
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  Früher Zugang zu neuen Inhalten
                </li>
              </ul>
              <Button className="w-full mt-6 bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple">
                Jetzt 7 Tage kostenlos testen
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-4">
            Alle Preise verstehen sich als monatliche Zahlung. Jahresabos sparen 2 Monate.
          </p>
          <p className="text-sm text-gray-600">
            Du kannst jederzeit zwischen den Paketen wechseln oder kündigen.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ElternCloudPricing;

