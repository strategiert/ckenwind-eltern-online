
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

type GlossaryCategory = 'allgemein' | 'eltern-burnout' | 'adhs' | 'esstoerungen' | 'psychologie' | 'therapie';

interface GlossaryTermFormProps {
  term?: any;
  onClose: () => void;
}

const GlossaryTermForm: React.FC<GlossaryTermFormProps> = ({ term, onClose }) => {
  const [formData, setFormData] = useState({
    term: '',
    slug: '',
    definition: '',
    tags: [] as string[],
    alias: '',
    teaser: '',
    category: 'allgemein' as GlossaryCategory,
    is_published: true
  });
  
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const categories: Array<{ value: GlossaryCategory; label: string }> = [
    { value: 'eltern-burnout', label: 'Eltern-Burnout' },
    { value: 'adhs', label: 'ADHS' },
    { value: 'esstoerungen', label: 'Essstörungen' },
    { value: 'psychologie', label: 'Psychologie' },
    { value: 'therapie', label: 'Therapie' },
    { value: 'allgemein', label: 'Allgemein' }
  ];

  useEffect(() => {
    if (term) {
      setFormData({
        term: term.term || '',
        slug: term.slug || '',
        definition: term.definition || '',
        tags: term.tags || [],
        alias: term.alias || '',
        teaser: term.content?.teaser || '',
        category: (term.category as GlossaryCategory) || 'allgemein',
        is_published: term.is_published !== false
      });
    }
  }, [term]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTermChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      term: value,
      slug: prev.slug || generateSlug(value)
    }));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const termData = {
        term: formData.term,
        slug: formData.slug,
        definition: formData.definition,
        tags: formData.tags,
        alias: formData.alias || null,
        teaser: formData.teaser || null,
        category: formData.category,
        is_published: formData.is_published
      };

      if (term) {
        // Update existing term
        const { error } = await supabase
          .from('glossary_terms')
          .update(termData)
          .eq('id', term.id);

        if (error) throw error;

        toast({
          title: "Erfolg",
          description: "Glossar-Eintrag wurde aktualisiert!",
        });
      } else {
        // Create new term
        const { error } = await supabase
          .from('glossary_terms')
          .insert([termData]);

        if (error) throw error;

        toast({
          title: "Erfolg",
          description: "Glossar-Eintrag wurde erstellt!",
        });
      }

      onClose();
    } catch (error) {
      console.error('Error saving term:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Speichern des Eintrags.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
          <h1 className="text-3xl font-display font-semibold">
            {term ? 'Glossar-Eintrag bearbeiten' : 'Neuer Glossar-Eintrag'}
          </h1>
        </div>

        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle>
              {term ? `"${term.term}" bearbeiten` : 'Neuen Begriff hinzufügen'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="term">Begriff *</Label>
                  <Input
                    id="term"
                    value={formData.term}
                    onChange={(e) => handleTermChange(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="alias">Alias</Label>
                  <Input
                    id="alias"
                    value={formData.alias}
                    onChange={(e) => setFormData(prev => ({ ...prev, alias: e.target.value }))}
                    placeholder="Alternative Bezeichnung"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Kategorie *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: GlossaryCategory) => setFormData(prev => ({ ...prev, category: value }))}
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
              </div>

              <div>
                <Label htmlFor="definition">Definition *</Label>
                <Textarea
                  id="definition"
                  value={formData.definition}
                  onChange={(e) => setFormData(prev => ({ ...prev, definition: e.target.value }))}
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="teaser">Teaser</Label>
                <Textarea
                  id="teaser"
                  value={formData.teaser}
                  onChange={(e) => setFormData(prev => ({ ...prev, teaser: e.target.value }))}
                  rows={3}
                  placeholder="Kurzer Einleitungstext für die Übersicht"
                />
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Tag hinzufügen..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Hinzufügen
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-rueckenwind-light-purple px-3 py-1 rounded-full text-sm text-rueckenwind-purple cursor-pointer hover:bg-red-100 hover:text-red-600"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                />
                <Label htmlFor="is_published">Veröffentlicht</Label>
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Speichere...' : 'Speichern'}
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  Abbrechen
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlossaryTermForm;
