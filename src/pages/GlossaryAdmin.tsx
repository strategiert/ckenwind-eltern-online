
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, Shield, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGlossaryTerms } from '@/hooks/useGlossary';
import { useAuth } from '@/contexts/AuthContext';
import GlossaryTermForm from '@/components/admin/GlossaryTermForm';
import AIGlossaryGenerator from '@/components/admin/AIGlossaryGenerator';

const GlossaryAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [editingTerm, setEditingTerm] = useState(null);
  
  const { data: terms, isLoading, error } = useGlossaryTerms();
  const { user, signOut } = useAuth();

  const handleEdit = (term: any) => {
    setEditingTerm(term);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTerm(null);
  };

  const handleCloseAIGenerator = () => {
    setShowAIGenerator(false);
  };

  if (showForm) {
    return (
      <GlossaryTermForm 
        term={editingTerm} 
        onClose={handleCloseForm}
      />
    );
  }

  if (showAIGenerator) {
    return (
      <AIGlossaryGenerator onClose={handleCloseAIGenerator} />
    );
  }

  return (
    <>
      <Helmet>
        <title>Glossary Admin | Rückenwind Eltern</title>
        <meta name="description" content="Glossary administration interface" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      <main>
        <section className="py-16">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-display font-semibold flex items-center gap-2">
                  <Shield className="w-8 h-8 text-rueckenwind-purple" />
                  Glossary Administration
                </h1>
                <p className="text-gray-600 mt-2">
                  Angemeldet als: {user?.email}
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setShowAIGenerator(true)} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Generator
                </Button>
                <Button onClick={() => setShowForm(true)} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Manuell hinzufügen
                </Button>
                <Button variant="outline" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Abmelden
                </Button>
              </div>
            </div>

            {isLoading && (
              <div className="text-center py-12">
                <p>Glossar-Einträge werden geladen...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-600">Fehler beim Laden der Einträge: {error.message}</p>
              </div>
            )}

            {terms && terms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">Noch keine Glossar-Einträge vorhanden.</p>
                <div className="flex gap-2 justify-center mt-4">
                  <Button onClick={() => setShowAIGenerator(true)} className="bg-gradient-to-r from-purple-600 to-blue-600">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Mit AI erstellen
                  </Button>
                  <Button onClick={() => setShowForm(true)} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Manuell erstellen
                  </Button>
                </div>
              </div>
            )}

            {terms && terms.length > 0 && (
              <div className="grid gap-6">
                {terms.map((term) => (
                  <Card key={term.slug}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{term.term}</CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{term.tags?.[0] || 'Keine Kategorie'}</Badge>
                            {term.alias && (
                              <Badge variant="secondary">Alias: {term.alias}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {term.content?.teaser || term.definition}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {term.tags?.slice(1).map((tag, index) => (
                              <span key={index} className="bg-rueckenwind-light-purple px-2 py-1 text-xs rounded text-rueckenwind-purple">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(term)}
                            title="Bearbeiten"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" asChild title="Ansehen">
                            <Link to={`/glossar/${term.slug}`} target="_blank">
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default GlossaryAdmin;
