import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, FileText } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAllBlogPosts, useDeleteBlogPost, useUpdateBlogPost } from '@/hooks/useBlogPosts';
import BlogPostForm from '@/components/admin/BlogPostForm';

const BlogAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const { data: posts, isLoading, error } = useAllBlogPosts();
  const deleteMutation = useDeleteBlogPost();
  const updateMutation = useUpdateBlogPost();

  const handleDelete = (id: string) => {
    if (window.confirm('Sicher, dass du diesen Artikel löschen möchtest?')) {
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

  if (showForm) {
    return (
      <BlogPostForm
        post={editingPost}
        onClose={handleCloseForm}
      />
    );
  }

  return (
    <AdminLayout title="Blog">
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-semibold flex items-center gap-2">
              <FileText className="w-8 h-8 text-blue-500" />
              Blog Administration
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              {posts?.length || 0} Artikel insgesamt
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Neuer Artikel
          </Button>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-12">
            <p>Blog-Artikel werden geladen...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">Fehler beim Laden der Artikel: {error.message}</p>
          </div>
        )}

        {/* Empty state */}
        {posts && posts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Noch keine Blog-Artikel vorhanden.</p>
            <Button onClick={() => setShowForm(true)} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Ersten Artikel erstellen
            </Button>
          </div>
        )}

        {/* Posts list */}
        {posts && posts.length > 0 && (
          <div className="grid gap-4">
            {posts.map((post) => (
              <Card key={post.id} className={!post.published ? 'opacity-60' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
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
                          <> | Veröffentlicht: {new Date(post.published_at).toLocaleDateString('de-DE')}</>
                        )}
                      </p>
                    </div>
                    <div className="flex gap-1">
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
                  <p className="text-gray-700 line-clamp-2">{post.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default BlogAdmin;
