
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Brain, Wand2, Edit3, Sparkles } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface ImageGenerationOptionsProps {
  title: string;
  content: string;
  topic: string;
  category: string;
  onAnalyzeContent: () => void;
  onGenerateFromPrompt: (prompt: string) => void;
  onGenerateFromManual: (description: string) => void;
  isAnalyzing: boolean;
  isGenerating: boolean;
  generatedPrompt: string;
  error: string | null;
  disabled: boolean;
}

const ImageGenerationOptions: React.FC<ImageGenerationOptionsProps> = ({
  title,
  content,
  topic,
  category,
  onAnalyzeContent,
  onGenerateFromPrompt,
  onGenerateFromManual,
  isAnalyzing,
  isGenerating,
  generatedPrompt,
  error,
  disabled
}) => {
  const [manualDescription, setManualDescription] = useState('');
  const [activeTab, setActiveTab] = useState('analyze');

  const handleGenerateFromPrompt = () => {
    if (generatedPrompt.trim()) {
      onGenerateFromPrompt(generatedPrompt);
    }
  };

  const handleGenerateFromManual = () => {
    if (manualDescription.trim()) {
      onGenerateFromManual(manualDescription);
      setActiveTab('manual');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          Enhanced Bildgenerierung
          <Badge variant="outline" className="bg-gradient-to-r from-green-100 to-blue-100">
            3 Optionen
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Wähle eine der drei Optionen für die optimierte Bildgenerierung
        </p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analyze" className="text-xs">
              <Brain className="w-4 h-4 mr-1" />
              Analysieren
            </TabsTrigger>
            <TabsTrigger value="generate" className="text-xs" disabled={!generatedPrompt}>
              <Wand2 className="w-4 h-4 mr-1" />
              AI-Bild
            </TabsTrigger>
            <TabsTrigger value="manual" className="text-xs">
              <Edit3 className="w-4 h-4 mr-1" />
              Manuell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="space-y-4 mt-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">1. Inhalt analysieren</h4>
              <p className="text-sm text-blue-700 mb-3">
                GPT-4 mini analysiert den Artikel-Inhalt und erstellt eine optimierte Bildbeschreibung.
              </p>
              <Button
                onClick={onAnalyzeContent}
                disabled={disabled || isAnalyzing || !title?.trim()}
                className="w-full"
                variant="outline"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analysiere Inhalt...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Inhalt analysieren
                  </>
                )}
              </Button>
            </div>
            
            {generatedPrompt && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-medium text-green-900 mb-2">Generierte Bildbeschreibung:</h5>
                <p className="text-sm text-green-700 bg-white p-3 rounded border">
                  {generatedPrompt}
                </p>
                <Button
                  onClick={() => setActiveTab('generate')}
                  variant="outline"
                  size="sm"
                  className="mt-2"
                >
                  Weiter zu Schritt 2 →
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="generate" className="space-y-4 mt-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">2. Bild generieren</h4>
              <p className="text-sm text-purple-700 mb-3">
                DALL-E 3 erstellt ein Bild basierend auf der analysierten Beschreibung.
              </p>
              
              {generatedPrompt && (
                <div className="bg-white p-3 rounded border mb-3">
                  <Label className="text-xs text-gray-600">Verwendete Beschreibung:</Label>
                  <p className="text-sm mt-1">{generatedPrompt}</p>
                </div>
              )}
              
              <Button
                onClick={handleGenerateFromPrompt}
                disabled={disabled || isGenerating || !generatedPrompt}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generiere Bild...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Bild generieren
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4 mt-4">
            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-medium text-amber-900 mb-2">3. Manuelle Beschreibung</h4>
              <p className="text-sm text-amber-700 mb-3">
                Gib eine eigene Bildbeschreibung ein für maximale Kontrolle.
              </p>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="manual-description">Bildbeschreibung</Label>
                  <Textarea
                    id="manual-description"
                    value={manualDescription}
                    onChange={(e) => setManualDescription(e.target.value)}
                    placeholder="z.B. Eine ruhige Familienszene mit Mutter und Kind beim gemeinsamen Kochen in einer warmen Küche, Pastellfarben, professionelle Illustration..."
                    rows={4}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tipp: Beschreibe Szene, Stimmung, Farben und Stil für beste Ergebnisse
                  </p>
                </div>
                
                <Button
                  onClick={handleGenerateFromManual}
                  disabled={disabled || isGenerating || !manualDescription.trim()}
                  className="w-full"
                  variant="outline"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generiere Bild...
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Bild aus Beschreibung generieren
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageGenerationOptions;
