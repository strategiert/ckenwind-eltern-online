
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

type GlossaryCategory = 'allgemein' | 'eltern-burnout' | 'adhs' | 'esstoerungen' | 'psychologie' | 'therapie';

interface GeneratedContent {
  term: string;
  slug: string;
  definition: string;
  category: GlossaryCategory;
  tags: string[];
  teaser: string;
  sections: Array<{ title: string; content: string; }>;
  literaryDevices: Array<{ title: string; content: string; }>;
  references: string[];
  relatedTerms: string[];
}

interface AIGlossaryGeneratorProps {
  onClose: () => void;
}

const AIGlossaryGenerator: React.FC<AIGlossaryGeneratorProps> = ({ onClose }) => {
  const [keyword, setKeyword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const { toast } = useToast();

  const categories: Array<{ value: GlossaryCategory; label: string }> = [
    { value: 'eltern-burnout', label: 'Eltern-Burnout' },
    { value: 'adhs', label: 'ADHS' },
    { value: 'esstoerungen', label: 'Essstörungen' },
    { value: 'psychologie', label: 'Psychologie' },
    { value: 'therapie', label: 'Therapie' },
    { value: 'allgemein', label: 'Allgemein' }
  ];

  const generateContent = async () => {
    if (!keyword.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie ein Stichwort ein.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-glossary-content', {
        body: { keyword: keyword.trim() }
      });

      if (error) throw error;

      setGeneratedContent(data.content);
      toast({
        title: "Erfolg",
        description: "Inhalt wurde erfolgreich generiert!",
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Generieren des Inhalts. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const saveContent = async () => {
    if (!generatedContent) return;

    setIsSaving(true);
    try {
      // Create the main term with proper typing
      const termData = {
        term: generatedContent.term,
        slug: generatedContent.slug,
        definition: generatedContent.definition,
        tags: generatedContent.tags,
        teaser: generatedContent.teaser,
        category: generatedContent.category,
        is_published: true
      };

      const { data: termDataResult, error: termError } = await supabase
        .from('glossary_terms')
        .insert(termData)
        .select()
        .single();

      if (termError) throw termError;

      const termId = termDataResult.id;

      // Save sections
      if (generatedContent.sections.length > 0) {
        const sectionsData = generatedContent.sections.map((section, index) => ({
          term_id: termId,
          title: section.title,
          content: section.content,
          order_index: index
        }));

        const { error: sectionsError } = await supabase
          .from('glossary_sections')
          .insert(sectionsData);

        if (sectionsError) throw sectionsError;
      }

      // Save literary devices
      if (generatedContent.literaryDevices.length > 0) {
        const literaryDevicesData = generatedContent.literaryDevices.map((device, index) => ({
          term_id: termId,
          title: device.title,
          content: device.content,
          order_index: index
        }));

        const { error: devicesError } = await supabase
          .from('glossary_literary_devices')
          .insert(literaryDevicesData);

        if (devicesError) throw devicesError;
      }

      // Save references
      if (generatedContent.references.length > 0) {
        const referencesData = generatedContent.references.map((reference, index) => ({
          term_id: termId,
          reference_text: reference,
          order_index: index
        }));

        const { error: referencesError } = await supabase
          .from('glossary_references')
          .insert(referencesData);

        if (referencesError) throw referencesError;
      }

      toast({
        title: "Erfolg",
        description: "Glossar-Eintrag wurde erfolgreich gespeichert!",
      });

      onClose();
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Speichern des Eintrags. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateGeneratedContent = (field: keyof GeneratedContent, value: any) => {
    if (generatedContent) {
      setGeneratedContent({
        ...generatedContent,
        [field]: value
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>
          <h1 className="text-3xl font-display font-semibold flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-600" />
            AI Glossar Generator
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Stichwort eingeben</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="keyword">Stichwort oder Begriff</Label>
                <Input
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="z.B. Burnout, ADHS, Angststörung..."
                  onKeyPress={(e) => e.key === 'Enter' && generateContent()}
                />
              </div>
              <Button 
                onClick={generateContent} 
                disabled={isGenerating || !keyword.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generiere Inhalt...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Inhalt generieren
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Content Section */}
          {generatedContent && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Generierter Inhalt
                  <Button 
                    onClick={saveContent}
                    disabled={isSaving}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Speichere...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Speichern
                      </>
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="generated-term">Begriff</Label>
                  <Input
                    id="generated-term"
                    value={generatedContent.term}
                    onChange={(e) => updateGeneratedContent('term', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="generated-slug">Slug</Label>
                  <Input
                    id="generated-slug"
                    value={generatedContent.slug}
                    onChange={(e) => updateGeneratedContent('slug', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="generated-category">Kategorie</Label>
                  <Select
                    value={generatedContent.category}
                    onValueChange={(value: GlossaryCategory) => updateGeneratedContent('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="generated-definition">Definition</Label>
                  <Textarea
                    id="generated-definition"
                    value={generatedContent.definition}
                    onChange={(e) => updateGeneratedContent('definition', e.target.value)}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="generated-teaser">Teaser</Label>
                  <Textarea
                    id="generated-teaser"
                    value={generatedContent.teaser}
                    onChange={(e) => updateGeneratedContent('teaser', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {generatedContent.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {generatedContent.sections.length > 0 && (
                  <div>
                    <Label>Abschnitte ({generatedContent.sections.length})</Label>
                    <div className="space-y-2 mt-2">
                      {generatedContent.sections.map((section, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded">
                          <h4 className="font-medium">{section.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{section.content.substring(0, 100)}...</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {generatedContent.references.length > 0 && (
                  <div>
                    <Label>Referenzen ({generatedContent.references.length})</Label>
                    <div className="space-y-1 mt-2">
                      {generatedContent.references.map((ref, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          {index + 1}. {ref}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIGlossaryGenerator;
