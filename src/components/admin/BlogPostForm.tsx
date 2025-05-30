
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateBlogPost, useUpdateBlogPost } from '@/hooks/useBlogPosts';
import type { BlogPost } from '@/services/blogService';

interface BlogPostFormProps {
  post?: BlogPost | null;
  onClose: () => void;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ post, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: '',
    category_label: '',
    tags: [] as string[],
    reading_time: 5,
    author: 'Janike Arent',
    published: false,
    featured: false,
    meta_title: '',
    meta_description: ''
  });

  const [tagsInput, setTagsInput] = useState('');

  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        image_url: post.image_url || '',
        category: post.category || '',
        category_label: post.category_label || '',
        tags: post.tags || [],
        reading_time: post.reading_time || 5,
        author: post.author || 'Janike Arent',
        published: post.published || false,
        featured: post.featured || false,
        meta_title: post.meta_title || '',
        meta_description: post.meta_description || ''
      });
      setTagsInput((post.tags || []).join(', '));
    }
  }, [post]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[äöü]/g, (match) => ({ ä: 'ae', ö: 'oe', ü: 'ue' }[match] || match))
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: post ? prev.slug : generateSlug(title),
      meta_title: title
    }));
  };

  const handleTagsChange = (input: string) => {
    setTagsInput(input);
    const tags = input.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (post) {
      updateMutation.mutate({
        id: post.id,
        updates: formData
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  useEffect(() => {
    if (createMutation.isSuccess || updateMutation.isSuccess) {
      onClose();
    }
  }, [createMutation.isSuccess, updateMutation.isSuccess, onClose]);

  return (
    <>
      <Helmet>
        <title>{post ? 'Edit Post' : 'New Post'} | Blog Admin</title>
      </Helmet>
      <Navbar />
      <main>
        <section className="py-8">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" onClick={onClose}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Admin
                </Button>
                <h1 className="text-2xl font-display font-semibold">
                  {post ? 'Edit Post' : 'Create New Post'}
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
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
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        rows={15}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="image_url">Featured Image URL</Label>
                      <Input
                        id="image_url"
                        type="url"
                        value={formData.image_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Categorization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category Key *</Label>
                        <Input
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                          placeholder="e.g., eltern-tipps"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category_label">Category Label *</Label>
                        <Input
                          id="category_label"
                          value={formData.category_label}
                          onChange={(e) => setFormData(prev => ({ ...prev, category_label: e.target.value }))}
                          placeholder="e.g., Eltern-Tipps"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={tagsInput}
                        onChange={(e) => handleTagsChange(e.target.value)}
                        placeholder="Tag1, Tag2, Tag3"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="reading_time">Reading Time (minutes)</Label>
                        <Input
                          id="reading_time"
                          type="number"
                          value={formData.reading_time}
                          onChange={(e) => setFormData(prev => ({ ...prev, reading_time: parseInt(e.target.value) || 5 }))}
                          min="1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="author">Author</Label>
                        <Input
                          id="author"
                          value={formData.author}
                          onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>SEO & Publishing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="meta_title">Meta Title</Label>
                      <Input
                        id="meta_title"
                        value={formData.meta_title}
                        onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="meta_description">Meta Description</Label>
                      <Textarea
                        id="meta_description"
                        value={formData.meta_description}
                        onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="published"
                          checked={formData.published}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                        />
                        <Label htmlFor="published">Published</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={formData.featured}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                        />
                        <Label htmlFor="featured">Featured</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {post ? 'Update Post' : 'Create Post'}
                  </Button>
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPostForm;
