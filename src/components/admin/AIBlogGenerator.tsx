import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Sparkles, ArrowLeft, Save, Loader2, Wand2, Image, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useCreateBlogPost } from '@/hooks/useBlogPosts';

type BlogCategory = 'eltern-tipps' | 'burnout-praevention' | 'adhs-hilfe' | 'esstoerungen' | 'familienalltag' | 'selbstfuersorge';

interface GeneratedBlogContent {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: BlogCategory;
  category_label: string;
  tags: string[];
  reading_time: number;
  meta_title: string;
  meta_description: string;
  featured: boolean;
}

interface AIBlogGeneratorProps {
  onClose: () => void;
}

const AIBlogGenerator: React.FC<AIBlogGeneratorProps> = ({ onClose }) => {
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [contentType, setContentType] = useState<'ratgeber' | 'erfahrungsbericht' | 'wissenschaftlich' | 'praktische-tipps'>('ratgeber');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedBlogContent | null>(null);
  const { toast } = useToast();
  const createMutation = useCreateBlogPost();

  const categories: Array<{ value: BlogCategory; label: string }> = [
    { value: 'eltern-tipps', label: 'Eltern-Tipps' },
    { value: 'burnout-praevention', label: 'Burnout-Prävention' },
    { value: 'adhs-hilfe', label: 'ADHS-Hilfe' },
    { value: 'esstoerungen', label: 'Essstörungen' },
    { value: 'familienalltag', label: 'Familienalltag' },
    { value: 'selbstfuersorge', label: 'Selbstfürsorge' }
  ];

  const contentTypes = [
    { value: 'ratgeber', label: 'Ratgeber-Artikel' },
    { value: 'erfahrungsbericht', label: 'Erfahrungsbericht' },
    { value: 'wissenschaftlich', label: 'Wissenschaftlicher Artikel' },
    { value: 'praktische-tipps', label: 'Praktische Tipps' }
  ];

  const generateContent = async () => {
    if (!topic.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie ein Thema ein.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-content', {
        body: { 
          topic: topic.trim(),
          targetAudience: targetAudience.trim(),
          contentType 
        }
      });

      if (error) throw error;

      setGeneratedContent(data.content);
      toast({
        title: "Erfolg",
        description: "Blog-Artikel wurde erfolgreich generiert!",
      });
    } catch (error) {
      console.error('Error generating blog content:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Generieren des Artikels. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateTitleImage = async () => {
    if (!generatedContent?.title) {
      toast({
        title: "Fehler",
        description: "Zuerst muss ein Artikel generiert werden.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingImage(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-image', {
        body: { 
          title: generatedContent.title,
          topic: topic.trim(),
          category: generatedContent.category_label
        }
      });

      if (error) throw error;

      setGeneratedContent(prev => prev ? {
        ...prev,
        image_url: data.imageUrl
      } : null);

      toast({
        title: "Erfolg",
        description: "Titelbild wurde erfolgreich generiert!",
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Generieren des Titelbilds. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const saveAsDraft = () => {
    if (!generatedContent) return;
    saveBlogPost(false);
  };

  const publishBlogPost = () => {
    if (!generatedContent) return;
    saveBlogPost(true);
  };

  const saveBlogPost = (publish: boolean) => {
    if (!generatedContent) return;

    const blogData = {
      ...generatedContent,
      author: 'Janike Arent',
      published: publish,
      featured: generatedContent.featured || false
    };

    createMutation.mutate(blogData, {
      onSuccess: () => {
        toast({
          title: "Erfolg",
          description: `Blog-Artikel wurde erfolgreich ${publish ? 'veröffentlicht' : 'als Entwurf gespeichert'}!`,
        });
        onClose();
      }
    });
  };

  const updateGeneratedContent = (field: keyof GeneratedBlogContent, value: any) => {
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
            <Wand2 className="w-8 h-8 text-purple-600" />
            AI Blog Generator
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Blog-Artikel erstellen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="topic">Thema oder Fragestellung</Label>
                <Textarea
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="z.B. Wie erkenne ich Burnout-Symptome bei Eltern? Oder: ADHS im Familienalltag meistern"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="audience">Zielgruppe (optional)</Label>
                <Input
                  id="audience"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="z.B. Alleinerziehende Mütter, Väter mit ADHS-Kindern..."
                />
              </div>

              <div>
                <Label htmlFor="content-type">Artikel-Typ</Label>
                <Select value={contentType} onValueChange={(value: any) => setContentType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={generateContent} 
                disabled={isGenerating || !topic.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generiere Artikel...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Artikel generieren
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
                  Generierter Artikel
                  <div className="flex gap-2">
                    <Button 
                      onClick={saveAsDraft}
                      disabled={createMutation.isPending}
                      variant="outline"
                    >
                      {createMutation.isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Als Entwurf
                    </Button>
                    <Button 
                      onClick={publishBlogPost}
                      disabled={createMutation.isPending}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {createMutation.isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4 mr-2" />
                      )}
                      Veröffentlichen
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="generated-title">Titel</Label>
                  <Input
                    id="generated-title"
                    value={generatedContent.title}
                    onChange={(e) => updateGeneratedContent('title', e.target.value)}
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
                    onValueChange={(value: BlogCategory) => updateGeneratedContent('category', value)}
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
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="generated-image">Titelbild</Label>
                    <Button
                      onClick={generateTitleImage}
                      disabled={isGeneratingImage}
                      variant="outline"
                      size="sm"
                    >
                      {isGeneratingImage ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generiere...
                        </>
                      ) : (
                        <>
                          {generatedContent.image_url ? <RefreshCw className="w-4 h-4 mr-2" /> : <Image className="w-4 h-4 mr-2" />}
                          {generatedContent.image_url ? 'Neu generieren' : 'Bild generieren'}
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {generatedContent.image_url && (
                    <div className="mb-2">
                      <img 
                        src={generatedContent.image_url} 
                        alt="Generated title image" 
                        className="w-full h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                  
                  <Input
                    id="generated-image"
                    value={generatedContent.image_url}
                    onChange={(e) => updateGeneratedContent('image_url', e.target.value)}
                    placeholder="Oder manuelle URL eingeben..."
                  />
                </div>

                <div>
                  <Label htmlFor="generated-excerpt">Excerpt</Label>
                  <Textarea
                    id="generated-excerpt"
                    value={generatedContent.excerpt}
                    onChange={(e) => updateGeneratedContent('excerpt', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="generated-content">Inhalt</Label>
                  <Textarea
                    id="generated-content"
                    value={generatedContent.content}
                    onChange={(e) => updateGeneratedContent('content', e.target.value)}
                    rows={12}
                    className="font-mono text-sm"
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reading-time">Lesezeit (Min.)</Label>
                    <Input
                      id="reading-time"
                      type="number"
                      value={generatedContent.reading_time}
                      onChange={(e) => updateGeneratedContent('reading_time', parseInt(e.target.value) || 5)}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <Switch
                      id="featured"
                      checked={generatedContent.featured}
                      onCheckedChange={(checked) => updateGeneratedContent('featured', checked)}
                    />
                    <Label htmlFor="featured">Als Empfohlen markieren</Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="meta-description">Meta-Description</Label>
                  <Textarea
                    id="meta-description"
                    value={generatedContent.meta_description}
                    onChange={(e) => updateGeneratedContent('meta_description', e.target.value)}
                    rows={2}
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {generatedContent.meta_description.length}/160 Zeichen
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIBlogGenerator;
