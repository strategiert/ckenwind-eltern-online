
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ElternCloudFeatures = () => {
  return (
    <section className="py-16 md:py-24 bg-rueckenwind-soft-gray">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
            Was dich in der Eltern-Cloud erwartet
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Sechs aufeinander abgestimmte Bereiche für deine individuelle Unterstützung
          </p>
        </div>

        <Tabs defaultValue="mediathek" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
            <TabsTrigger value="mediathek" className="flex flex-col items-center p-4">
              <span className="text-2xl mb-1">📺</span>
              <span className="text-xs">MEDIATHEK</span>
            </TabsTrigger>
            <TabsTrigger value="kurse" className="flex flex-col items-center p-4">
              <span className="text-2xl mb-1">🎓</span>
              <span className="text-xs">KURSE</span>
            </TabsTrigger>
            <TabsTrigger value="wissen" className="flex flex-col items-center p-4">
              <span className="text-2xl mb-1">📚</span>
              <span className="text-xs">WISSEN</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex flex-col items-center p-4">
              <span className="text-2xl mb-1">👥</span>
              <span className="text-xs">COMMUNITY</span>
            </TabsTrigger>
            <TabsTrigger value="app" className="flex flex-col items-center p-4">
              <span className="text-2xl mb-1">📱</span>
              <span className="text-xs">APP</span>
            </TabsTrigger>
            <TabsTrigger value="coaching" className="flex flex-col items-center p-4">
              <span className="text-2xl mb-1">👤</span>
              <span className="text-xs">COACHING</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mediathek" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">📺 Deine Videothek für Eltern-Herausforderungen</CardTitle>
                <CardDescription className="text-lg">
                  Über 300 Videos und Artikel, kategorisiert nach deinen Bedürfnissen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Themenübersicht:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-rueckenwind-purple rounded-full mr-3"></span>
                        Eltern-Burnout überwinden (80+ Videos)
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-rueckenwind-purple rounded-full mr-3"></span>
                        ADHS-Kinder verstehen und begleiten (100+ Videos)
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-rueckenwind-purple rounded-full mr-3"></span>
                        Essstörungen erkennen und behandeln (70+ Videos)
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-rueckenwind-purple rounded-full mr-3"></span>
                        Familienalltag organisieren (50+ Videos)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Funktionen:</h4>
                    <ul className="space-y-2">
                      <li>✓ Intelligente Suche</li>
                      <li>✓ Filter nach Alter/Situation</li>
                      <li>✓ Favoriten-Listen</li>
                      <li>✓ Offline-Download</li>
                    </ul>
                    <div className="mt-6">
                      <Button variant="outline" className="border-rueckenwind-purple text-rueckenwind-purple">
                        3 kostenlose Videos sofort ansehen
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kurse" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">🎓 Strukturierte Lernpfade für nachhaltigen Wandel</CardTitle>
                <CardDescription className="text-lg">
                  Konkrete Veränderungen in 30-60 Tagen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-rueckenwind-light-purple rounded-lg">
                      <h4 className="font-semibold">"Raus aus dem Eltern-Burnout"</h4>
                      <p className="text-sm text-gray-600">8 Module, 6 Wochen</p>
                    </div>
                    <div className="p-4 bg-rueckenwind-light-purple rounded-lg">
                      <h4 className="font-semibold">"ADHS-Kinder stärken"</h4>
                      <p className="text-sm text-gray-600">10 Module, 8 Wochen</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-rueckenwind-light-purple rounded-lg">
                      <h4 className="font-semibold">"Essstörungen bewältigen"</h4>
                      <p className="text-sm text-gray-600">6 Module, 4 Wochen</p>
                    </div>
                    <div className="p-4 bg-rueckenwind-light-purple rounded-lg">
                      <h4 className="font-semibold">"Familienharmonie schaffen"</h4>
                      <p className="text-sm text-gray-600">5 Module, 4 Wochen</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-lg font-medium text-rueckenwind-purple">
                    Für Eltern in akuten Krisen oder mit chronischen Herausforderungen
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Persönliches Fortschritts-Tracking und Zertifikate inklusive
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wissen" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">📚 Verstehen, was in deinem Kind und dir vorgeht</CardTitle>
                <CardDescription className="text-lg">
                  Fundiertes Wissen, verständlich aufbereitet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Aufbau:</h4>
                    <ul className="space-y-2">
                      <li>📖 Grundlagen-Artikel zu allen drei Kernthemen</li>
                      <li>🔍 Symptom-Checker und Selbsttests</li>
                      <li>📝 Glossar mit über 200 Fachbegriffen (laienverständlich)</li>
                      <li>🔬 Aktuelle Forschung, verständlich erklärt</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Navigation:</h4>
                    <ul className="space-y-2">
                      <li>🎯 Nach Themen</li>
                      <li>👶 Alter des Kindes</li>
                      <li>🚨 Dringlichkeit</li>
                    </ul>
                    <div className="mt-6 p-4 bg-rueckenwind-soft-blue rounded-lg">
                      <p className="text-sm font-medium">
                        📅 Monatlich neue wissenschaftliche Erkenntnisse
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">👥 Du bist nicht allein - echte Menschen, echte Unterstützung</CardTitle>
                <CardDescription className="text-lg">
                  Live-Begleitung und Community-Support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">🎥</span>
                      <div>
                        <h4 className="font-semibold">Live Q&A mit Janike</h4>
                        <p className="text-sm text-gray-600">2x monatlich (Premium/VIP)</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">💬</span>
                      <div>
                        <h4 className="font-semibold">Forum</h4>
                        <p className="text-sm text-gray-600">Geschlossene, moderierte Eltern-Gruppen</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">🤝</span>
                      <div>
                        <h4 className="font-semibold">Peer-Support</h4>
                        <p className="text-sm text-gray-600">Matching mit Eltern in ähnlichen Situationen</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">👨‍⚕️</span>
                      <div>
                        <h4 className="font-semibold">Experten-Runden</h4>
                        <p className="text-sm text-gray-600">Monatliche Gastexperten zu Spezialthemen</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">🚨</span>
                      <div>
                        <h4 className="font-semibold">Krisenbegleitung</h4>
                        <p className="text-sm text-gray-600">24h-Hotline für VIP-Mitglieder</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="app" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">📱 Hilfe, wann und wo du sie brauchst</CardTitle>
                <CardDescription className="text-lg">
                  "Deine Therapeutin in der Hosentasche"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-4">Funktionen:</h4>
                    <ul className="space-y-2">
                      <li>📱 Alle Videos offline verfügbar</li>
                      <li>🆘 SOS-Bereich für akute Situationen</li>
                      <li>⏱️ Tägliche Micro-Learning-Einheiten (3-5 Min.)</li>
                      <li>🧘 Achtsamkeits-Übungen und Entspannungstools</li>
                      <li>📢 Push-Benachrichtigungen für Live-Events</li>
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <div className="text-6xl mb-4">📱</div>
                    <p className="text-center text-lg font-medium text-rueckenwind-purple mb-4">
                      Verfügbar für iOS und Android
                    </p>
                    <div className="flex space-x-4">
                      <Button variant="outline" size="sm">
                        📱 App Store
                      </Button>
                      <Button variant="outline" size="sm">
                        🤖 Google Play
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coaching" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">👤 Individuelle Begleitung für komplexe Situationen</CardTitle>
                <CardDescription className="text-lg">
                  Persönliche 1:1 Betreuung durch Janike
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-rueckenwind-light-purple rounded-lg">
                      <h4 className="font-semibold text-rueckenwind-purple">Premium-Coaching</h4>
                      <p className="text-sm">1 Gespräch/Monat (45 Min.)</p>
                    </div>
                    <div className="p-4 bg-rueckenwind-purple text-white rounded-lg">
                      <h4 className="font-semibold">VIP-Intensiv</h4>
                      <p className="text-sm">1 Gespräch/Monat + WhatsApp-Support + 2 Notfall-Termine/Jahr</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Ablauf:</h4>
                    <ul className="space-y-2">
                      <li>💻 Video-Call</li>
                      <li>📞 Telefonisch</li>
                      <li>🏢 Persönlich (Hamburg)</li>
                    </ul>
                    <div className="mt-6 p-4 bg-rueckenwind-soft-gray rounded-lg">
                      <h4 className="font-semibold mb-2">Für wen:</h4>
                      <p className="text-sm">
                        Akute Krisen, komplexe Familienkonstellationen, wenn Standard-Angebote nicht ausreichen
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ElternCloudFeatures;

