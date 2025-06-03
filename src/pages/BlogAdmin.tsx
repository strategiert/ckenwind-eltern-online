
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, Shield, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAllBlogPosts, useDeleteBlogPost, useUpdateBlogPost } from '@/hooks/useBlogPosts';
import { useAuth } from '@/contexts/AuthContext';
import BlogPostForm from '@/components/admin/BlogPostForm';
import AIBlogGenerator from '@/components/admin/AIBlogGenerator';

const BlogAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  
  const { data: posts, isLoading, error } = useAllBlogPosts();
  const { user, signOut } = useAuth();
  const deleteMutation = useDeleteBlogPost();
  const updateMutation = useUpdateBlogPost();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteMutation.mutate(id);
    }
  };

  const togglePublished = (post: any) => {
    updateMutation.mutate({
      id: post.id,
      updates: { published: !post.published }
    });
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  const handleCloseAIGenerator = () => {
    setShowAIGenerator(false);
  };

  if (showForm) {
    return (
      <BlogPostForm 
        post={editingPost} 
        onClose={handleCloseForm}
      />
    );
  }

  if (showAIGenerator) {
    return (
      <AIBlogGenerator onClose={handleCloseAIGenerator} />
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog Admin | Rückenwind Eltern</title>
        <meta name="description" content="Blog administration interface" />
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
                  Blog Administration
                </h1>
                <p className="text-gray-600 mt-2">
                  Angemeldet als: {user?.email}
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowAIGenerator(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Artikel Generator
                </Button>
                <Button onClick={() => setShowForm(true)} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Manuell erstellen
                </Button>
                <Button variant="outline" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Abmelden
                </Button>
              </div>
            </div>

            {isLoading && (
              <div className="text-center py-12">
                <p>Blog-Artikel werden geladen...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-600">Fehler beim Laden der Artikel: {error.message}</p>
              </div>
            )}

            {posts && posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">Noch keine Blog-Artikel vorhanden.</p>
                <div className="flex gap-4 justify-center mt-4">
                  <Button 
                    onClick={() => setShowAIGenerator(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
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

            {posts && posts.length > 0 && (
              <div className="grid gap-6">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={post.published ? "default" : "secondary"}>
                              {post.published ? "Veröffentlicht" : "Entwurf"}
                            </Badge>
                            <Badge variant="outline">{post.category_label}</Badge>
                            {post.featured && (
                              <Badge variant="destructive">Empfohlen</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Erstellt: {new Date(post.created_at).toLocaleDateString('de-DE')}
                            {post.published_at && (
                              <> • Veröffentlicht: {new Date(post.published_at).toLocaleDateString('de-DE')}</>
                            )}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePublished(post)}
                            title={post.published ? "Verstecken" : "Veröffentlichen"}
                          >
                            {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(post)}
                            title="Bearbeiten"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Löschen"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          {post.published && (
                            <Button variant="ghost" size="sm" asChild title="Ansehen">
                              <Link to={`/blog/${post.slug}`} target="_blank">
                                Ansehen
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{post.excerpt}</p>
                    </CardContent>
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

export default BlogAdmin;
