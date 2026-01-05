import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Save, Plus, Trash2, GripVertical } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import {
  useCreateGlossaryTerm,
  useUpdateGlossaryTerm,
  useGlossaryTermAdmin,
  useCreateGlossarySection,
  useUpdateGlossarySection,
  useDeleteGlossarySection,
  useCreateGlossaryReference,
  useDeleteGlossaryReference,
} from '@/hooks/useGlossary';
import { glossaryAdminService, GlossaryTerm, GlossarySection, GlossaryReference } from '@/services/glossaryService';

interface GlossaryTermFormProps {
  term?: GlossaryTerm | null;
  onClose: () => void;
}

const SECTION_TYPES = [
  { value: 'content', label: 'Inhalt' },
  { value: 'literary_device', label: 'Bildhafte Erklärung' },
  { value: 'example', label: 'Beispiel' },
  { value: 'warning', label: 'Warnung/Hinweis' },
];

const GlossaryTermForm: React.FC<GlossaryTermFormProps> = ({ term, onClose }) => {
  const { toast } = useToast();
  const isEditing = !!term?.id;

  // Load full term details if editing
  const { data: termDetails } = useGlossaryTermAdmin(term?.id || '');

  // Form state
  const [formData, setFormData] = useState({
    term: '',
    slug: '',
    definition: '',
    teaser: '',
    alias: '',
    tags: [] as string[],
    meta_title: '',
    meta_description: '',
    is_published: false,
  });

  const [newTag, setNewTag] = useState('');
  const [sections, setSections] = useState<Partial<GlossarySection>[]>([]);
  const [references, setReferences] = useState<Partial<GlossaryReference>[]>([]);

  // Mutations
  const createMutation = useCreateGlossaryTerm();
  const updateMutation = useUpdateGlossaryTerm();
  const createSectionMutation = useCreateGlossarySection();
  const updateSectionMutation = useUpdateGlossarySection();
  const deleteSectionMutation = useDeleteGlossarySection();
  const createReferenceMutation = useCreateGlossaryReference();
  const deleteReferenceMutation = useDeleteGlossaryReference();

  // Initialize form data when term/termDetails changes
  useEffect(() => {
    if (term) {
      setFormData({
        term: term.term || '',
        slug: term.slug || '',
        definition: term.definition || '',
        teaser: term.teaser || '',
        alias: term.alias || '',
        tags: term.tags || [],
        meta_title: term.meta_title || '',
        meta_description: term.meta_description || '',
        is_published: term.is_published || false,
      });
    }

    if (termDetails) {
      setSections(termDetails.sections || []);
      setReferences(termDetails.references || []);
    }
  }, [term, termDetails]);

  // Auto-generate slug from term
  const handleTermChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      term: value,
      slug: isEditing ? prev.slug : glossaryAdminService.generateSlug(value),
    }));
  };

  // Tag management
  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  // Section management
  const addSection = () => {
    setSections(prev => [...prev, {
      title: '',
      content: '',
      section_type: 'content' as const,
      sort_order: prev.length,
    }]);
  };

  const updateSection = (index: number, updates: Partial<GlossarySection>) => {
    setSections(prev => prev.map((s, i) => i === index ? { ...s, ...updates } : s));
  };

  const removeSection = async (index: number) => {
    const section = sections[index];
    if (section.id) {
      await deleteSectionMutation.mutateAsync(section.id);
    }
    setSections(prev => prev.filter((_, i) => i !== index));
  };

  // Reference management
  const addReference = () => {
    setReferences(prev => [...prev, {
      reference_text: '',
      url: '',
      sort_order: prev.length,
    }]);
  };

  const updateReference = (index: number, updates: Partial<GlossaryReference>) => {
    setReferences(prev => prev.map((r, i) => i === index ? { ...r, ...updates } : r));
  };

  const removeReference = async (index: number) => {
    const ref = references[index];
    if (ref.id) {
      await deleteReferenceMutation.mutateAsync(ref.id);
    }
    setReferences(prev => prev.filter((_, i) => i !== index));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let termId = term?.id;

      if (isEditing) {
        await updateMutation.mutateAsync({
          id: term!.id,
          updates: formData,
        });
        toast({
          title: "Erfolg",
          description: "Begriff wurde aktualisiert.",
        });
      } else {
        const newTerm = await createMutation.mutateAsync(formData);
        termId = newTerm.id;
        toast({
          title: "Erfolg",
          description: "Begriff wurde erstellt.",
        });
      }

      // Save sections
      for (const section of sections) {
        if (section.id) {
          await updateSectionMutation.mutateAsync({
            id: section.id,
            updates: {
              title: section.title,
              content: section.content,
              section_type: section.section_type,
              sort_order: section.sort_order,
            },
          });
        } else if (section.title && section.content && termId) {
          await createSectionMutation.mutateAsync({
            term_id: termId,
            title: section.title!,
            content: section.content!,
            section_type: section.section_type,
            sort_order: section.sort_order,
          });
        }
      }

      // Save references
      for (const ref of references) {
        if (!ref.id && ref.reference_text && termId) {
          await createReferenceMutation.mutateAsync({
            term_id: termId,
            reference_text: ref.reference_text!,
            url: ref.url,
            sort_order: ref.sort_order,
          });
        }
      }

      onClose();
    } catch (error: any) {
      toast({
        title: "Fehler",
        description: error.message || "Ein Fehler ist aufgetreten.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{isEditing ? 'Begriff bearbeiten' : 'Neuer Begriff'} | Glossar Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      <main>
        <section className="py-8">
          <div className="container-custom max-w-4xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" onClick={onClose}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>
              <h1 className="text-2xl font-semibold">
                {isEditing ? 'Begriff bearbeiten' : 'Neuen Begriff erstellen'}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Grundinformationen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  <div>
                    <Label htmlFor="alias">Alias (alternativer Name)</Label>
                    <Input
                      id="alias"
                      value={formData.alias}
                      onChange={(e) => setFormData(prev => ({ ...prev, alias: e.target.value }))}
                      placeholder="z.B. ADHS für Aufmerksamkeitsdefizit-Hyperaktivitätsstörung"
                    />
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
                    <Label htmlFor="teaser">Teaser (kurze Vorschau)</Label>
                    <Textarea
                      id="teaser"
                      value={formData.teaser}
                      onChange={(e) => setFormData(prev => ({ ...prev, teaser: e.target.value }))}
                      rows={2}
                      placeholder="Wird im Hero-Bereich angezeigt"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <Label>Tags</Label>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {formData.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Neuen Tag eingeben"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" variant="outline" onClick={addTag}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Publish toggle */}
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_published"
                      checked={formData.is_published}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                    />
                    <Label htmlFor="is_published">Veröffentlicht</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Sections */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Inhaltssektionen</CardTitle>
                    <Button type="button" variant="outline" size="sm" onClick={addSection}>
                      <Plus className="w-4 h-4 mr-2" />
                      Sektion hinzufügen
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sections.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      Noch keine Sektionen. Klicke auf "Sektion hinzufügen" um Inhalte zu erstellen.
                    </p>
                  )}
                  {sections.map((section, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">Sektion {index + 1}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSection(index)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label>Titel</Label>
                          <Input
                            value={section.title || ''}
                            onChange={(e) => updateSection(index, { title: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Typ</Label>
                          <Select
                            value={section.section_type || 'content'}
                            onValueChange={(value) => updateSection(index, { section_type: value as any })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {SECTION_TYPES.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Inhalt (HTML erlaubt)</Label>
                        <Textarea
                          value={section.content || ''}
                          onChange={(e) => updateSection(index, { content: e.target.value })}
                          rows={6}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* References */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Einzelnachweise</CardTitle>
                    <Button type="button" variant="outline" size="sm" onClick={addReference}>
                      <Plus className="w-4 h-4 mr-2" />
                      Referenz hinzufügen
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {references.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      Noch keine Referenzen. Klicke auf "Referenz hinzufügen" um Quellen anzugeben.
                    </p>
                  )}
                  {references.map((ref, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <span className="text-sm text-gray-500 mt-2">{index + 1}.</span>
                      <div className="flex-1 space-y-2">
                        <Input
                          value={ref.reference_text || ''}
                          onChange={(e) => updateReference(index, { reference_text: e.target.value })}
                          placeholder="Referenztext"
                        />
                        <Input
                          value={ref.url || ''}
                          onChange={(e) => updateReference(index, { url: e.target.value })}
                          placeholder="URL (optional)"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeReference(index)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* SEO */}
              <Card>
                <CardHeader>
                  <CardTitle>SEO Metadaten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="meta_title">Meta-Titel</Label>
                    <Input
                      id="meta_title"
                      value={formData.meta_title}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                      placeholder={`${formData.term} | Glossar | Rückenwind Eltern`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="meta_description">Meta-Beschreibung</Label>
                    <Textarea
                      id="meta_description"
                      value={formData.meta_description}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                      rows={2}
                      placeholder="Automatisch aus der Definition generiert, wenn leer"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit */}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Abbrechen
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Speichern' : 'Erstellen'}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GlossaryTermForm;
