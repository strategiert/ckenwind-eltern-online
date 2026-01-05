import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, Shield, BookOpen, Search, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  useAllGlossaryTermsAdmin,
  useDeleteGlossaryTerm,
  useUpdateGlossaryTerm,
  useGlossaryStats,
} from '@/hooks/useGlossary';
import { useAuth } from '@/contexts/AuthContext';
import GlossaryTermForm from '@/components/admin/GlossaryTermForm';

const GlossaryAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTerm, setEditingTerm] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: terms, isLoading, error } = useAllGlossaryTermsAdmin();
  const { data: stats } = useGlossaryStats();
  const { user, signOut } = useAuth();
  const deleteMutation = useDeleteGlossaryTerm();
  const updateMutation = useUpdateGlossaryTerm();

  const handleDelete = (id: string, term: string) => {
    if (window.confirm(`Sicher, dass du "${term}" löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.`)) {
      deleteMutation.mutate(id);
    }
  };

  const togglePublished = (term: any) => {
    updateMutation.mutate({
      id: term.id,
      updates: { is_published: !term.is_published }
    });
  };

  const handleEdit = (term: any) => {
    setEditingTerm(term);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTerm(null);
  };

  // Filter terms by search query
  const filteredTerms = terms?.filter(term =>
    term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.alias?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  if (showForm) {
    return (
      <GlossaryTermForm
        term={editingTerm}
        onClose={handleCloseForm}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>Glossar Admin | Rückenwind Eltern</title>
        <meta name="description" content="Glossar administration interface" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      <main>
        <section className="py-16">
          <div className="container-custom">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-display font-semibold flex items-center gap-2">
                  <BookOpen className="w-8 h-8 text-rueckenwind-purple" />
                  Glossar Administration
                </h1>
                <p className="text-gray-600 mt-2">
                  Angemeldet als: {user?.email}
                </p>
                {stats && (
                  <p className="text-sm text-gray-500 mt-1">
                    {stats.totalTerms} Begriffe | {stats.totalViews.toLocaleString()} Aufrufe
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Neuer Begriff
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/admin/blog">
                    <Shield className="w-4 h-4 mr-2" />
                    Blog Admin
                  </Link>
                </Button>
                <Button variant="outline" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Abmelden
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Begriffe suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Loading state */}
            {isLoading && (
              <div className="text-center py-12">
                <p>Glossar-Begriffe werden geladen...</p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="text-center py-12">
                <p className="text-red-600">Fehler beim Laden der Begriffe: {error.message}</p>
              </div>
            )}

            {/* Empty state */}
            {terms && terms.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Noch keine Glossar-Begriffe vorhanden.</p>
                <Button onClick={() => setShowForm(true)} className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Ersten Begriff erstellen
                </Button>
              </div>
            )}

            {/* Terms list */}
            {filteredTerms.length > 0 && (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  {searchQuery ? `${filteredTerms.length} von ${terms?.length} Begriffen` : `${terms?.length} Begriffe`}
                </p>
                <div className="grid gap-4">
                  {filteredTerms.map((term) => (
                    <Card key={term.id} className={!term.is_published ? 'opacity-60' : ''}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2 flex items-center gap-2">
                              {term.term}
                              {term.alias && (
                                <span className="text-sm font-normal text-gray-500">({term.alias})</span>
                              )}
                            </CardTitle>
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <Badge variant={term.is_published ? "default" : "secondary"}>
                                {term.is_published ? "Veröffentlicht" : "Entwurf"}
                              </Badge>
                              {term.tags?.slice(0, 3).map((tag, i) => (
                                <Badge key={i} variant="outline">{tag}</Badge>
                              ))}
                              {term.tags?.length > 3 && (
                                <Badge variant="outline">+{term.tags.length - 3}</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {term.view_count} Aufrufe | Erstellt: {new Date(term.created_at).toLocaleDateString('de-DE')}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => togglePublished(term)}
                              title={term.is_published ? "Verstecken" : "Veröffentlichen"}
                            >
                              {term.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(term)}
                              title="Bearbeiten"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(term.id, term.term)}
                              className="text-red-600 hover:text-red-700"
                              title="Löschen"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            {term.is_published && (
                              <Button variant="ghost" size="sm" asChild title="Ansehen">
                                <Link to={`/glossar/${term.slug}`} target="_blank">
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 line-clamp-2">{term.definition}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {/* No results */}
            {searchQuery && filteredTerms.length === 0 && terms && terms.length > 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">Keine Begriffe gefunden für "{searchQuery}"</p>
                <Button variant="link" onClick={() => setSearchQuery('')}>
                  Suche zurücksetzen
                </Button>
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
