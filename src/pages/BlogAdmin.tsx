
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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

  if (showForm) {
    return (
      <BlogPostForm 
        post={editingPost} 
        onClose={handleCloseForm}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog Admin | Rückenwind Eltern</title>
        <meta name="description" content="Blog administration interface" />
      </Helmet>
      <Navbar />
      <main>
        <section className="py-16">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-display font-semibold">Blog Administration</h1>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>

            {isLoading && (
              <div className="text-center py-12">
                <p>Loading blog posts...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-600">Error loading posts: {error.message}</p>
              </div>
            )}

            {posts && (
              <div className="grid gap-6">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={post.published ? "default" : "secondary"}>
                              {post.published ? "Published" : "Draft"}
                            </Badge>
                            <Badge variant="outline">{post.category_label}</Badge>
                            {post.featured && (
                              <Badge variant="destructive">Featured</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Created: {new Date(post.created_at).toLocaleDateString('de-DE')}
                            {post.published_at && (
                              <> • Published: {new Date(post.published_at).toLocaleDateString('de-DE')}</>
                            )}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePublished(post)}
                          >
                            {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          {post.published && (
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/blog/${post.slug}`} target="_blank">
                                View
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
