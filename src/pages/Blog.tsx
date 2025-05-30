
import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPreview from '@/components/BlogPreview';
import BlogFeaturedPost from '@/components/BlogFeaturedPost';
import BlogTagFilter from '@/components/BlogTagFilter';
import BlogPagination from '@/components/BlogPagination';
import BlogBreadcrumb from '@/components/BlogBreadcrumb';
import BlogNewsletter from '@/components/BlogNewsletter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts, useFeaturedPosts } from '@/hooks/useBlogPosts';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Users, Calendar, TrendingUp, Shield } from 'lucide-react';

const POSTS_PER_PAGE = 6;

// Helper function to transform Supabase post to component format
const transformPost = (post: any) => ({
  id: post.id,
  title: post.title,
  excerpt: post.excerpt || '',
  date: new Date(post.published_at || post.created_at).toLocaleDateString('de-DE'),
  imageUrl: post.image_url || '',
  slug: post.slug,
  category: post.category,
  categoryLabel: post.category_label,
  tags: post.tags || [],
  readingTime: post.reading_time,
  author: post.author,
  featured: post.featured
});

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTag = searchParams.get('tag');
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const { data: blogPosts, isLoading: postsLoading, error: postsError } = useBlogPosts();
  const { data: featuredPosts, isLoading: featuredLoading } = useFeaturedPosts();
  const { user, isAdmin } = useAuth();

  // Transform and filter posts
  const transformedPosts = blogPosts ? blogPosts.map(transformPost) : [];
  const transformedFeaturedPosts = featuredPosts ? featuredPosts.map(transformPost) : [];

  // Get all unique tags
  const allTags = React.useMemo(() => {
    const tagSet = new Set<string>();
    transformedPosts.forEach(post => {
      post.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [transformedPosts]);

  // Filter posts by selected tag
  const filteredPosts = selectedTag 
    ? transformedPosts.filter(post => post.tags?.includes(selectedTag))
    : transformedPosts;

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleTagFilter = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    if (tag && selectedTag !== tag) {
      params.set('tag', tag);
    } else {
      params.delete('tag');
    }
    params.delete('page'); // Reset to first page when filtering
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    setSearchParams(params);
  };

  // Loading skeleton
  if (postsLoading) {
    return (
      <>
        <Helmet>
          <title>Blog | Rückenwind Eltern</title>
          <meta name="description" content="Hilfreiche Artikel und Tipps für Eltern" />
        </Helmet>
        <Navbar />
        <main>
          <section className="bg-gradient-to-b from-rueckenwind-light-purple to-white py-16">
            <div className="container-custom">
              <BlogBreadcrumb />
              <div className="max-w-3xl mx-auto text-center">
                <Skeleton className="w-16 h-16 mx-auto mb-4" />
                <Skeleton className="h-12 w-64 mx-auto mb-6" />
                <Skeleton className="h-6 w-96 mx-auto" />
              </div>
            </div>
          </section>
          <section className="py-12">
            <div className="container-custom">
              <div className="grid gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  // Error state
  if (postsError) {
    return (
      <>
        <Helmet>
          <title>Blog | Rückenwind Eltern</title>
        </Helmet>
        <Navbar />
        <main>
          <section className="py-16">
            <div className="container-custom text-center">
              <h1 className="text-2xl font-semibold mb-4">Fehler beim Laden</h1>
              <p className="text-gray-600 mb-4">
                Es gab ein Problem beim Laden der Blog-Artikel. Bitte versuchen Sie es später erneut.
              </p>
              <Button onClick={() => window.location.reload()}>
                Seite neu laden
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const featuredPost = transformedFeaturedPosts[0];

  return (
    <>
      <Helmet>
        <title>Blog | Rückenwind Eltern</title>
        <meta name="description" content="Hilfreiche Artikel und Tipps für Eltern zu Themen wie Entwicklung, Gesundheit und Erziehung." />
        <meta name="keywords" content="Eltern Blog, Kindererziehung, Entwicklung, Gesundheit, Familie" />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-rueckenwind-light-purple to-white py-16">
          <div className="container-custom">
            <BlogBreadcrumb />
            <div className="max-w-3xl mx-auto text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-rueckenwind-purple" />
              <h1 className="text-4xl md:text-5xl font-display font-semibold mb-6">
                Unser Blog
              </h1>
              <p className="text-xl text-gray-700">
                Hilfreiche Artikel und Tipps für Eltern zu Themen wie Entwicklung, Gesundheit und Erziehung.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && !featuredLoading && (
          <section className="py-12 bg-gray-50">
            <div className="container-custom">
              <h2 className="text-2xl font-display font-semibold mb-8 text-center">
                Empfohlener Artikel
              </h2>
              <BlogFeaturedPost post={featuredPost} />
            </div>
          </section>
        )}

        {/* Stats Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-rueckenwind-purple" />
                  <div className="text-2xl font-bold">{transformedPosts.length}</div>
                  <div className="text-sm text-gray-600">Artikel</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="w-8 h-8 mx-auto mb-2 text-rueckenwind-purple" />
                  <div className="text-2xl font-bold">1K+</div>
                  <div className="text-sm text-gray-600">Leser</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-rueckenwind-purple" />
                  <div className="text-2xl font-bold">Wöchentlich</div>
                  <div className="text-sm text-gray-600">Neue Artikel</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-rueckenwind-purple" />
                  <div className="text-2xl font-bold">{allTags.length}</div>
                  <div className="text-sm text-gray-600">Themen</div>
                </CardContent>
              </Card>
            </div>

            {/* Tag Filter */}
            <BlogTagFilter 
              tags={allTags}
              selectedTags={selectedTag ? [selectedTag] : []}
              onTagToggle={handleTagFilter}
            />

            {/* Admin Link - only show for authenticated admins */}
            {user && isAdmin && (
              <div className="mb-6">
                <Button asChild variant="outline">
                  <Link to="/admin/blog">
                    <Shield className="w-4 h-4 mr-2" />
                    Blog Administration
                  </Link>
                </Button>
              </div>
            )}

            {/* Blog Posts Grid */}
            {paginatedPosts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {paginatedPosts.map(post => (
                    <BlogPreview key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <BlogPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-medium mb-2">Keine Artikel gefunden</h3>
                <p className="text-gray-600 mb-4">
                  {selectedTag 
                    ? `Keine Artikel mit dem Tag "${selectedTag}" gefunden.`
                    : 'Derzeit sind keine Blog-Artikel verfügbar.'
                  }
                </p>
                {selectedTag && (
                  <Button onClick={() => handleTagFilter('')}>
                    Alle Artikel anzeigen
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <BlogNewsletter />
      </main>
      <Footer />
    </>
  );
};

export default Blog;
