
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPreview from '@/components/BlogPreview';
import BlogBreadcrumb from '@/components/BlogBreadcrumb';
import BlogNewsletter from '@/components/BlogNewsletter';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPostsByCategory } from '@/hooks/useBlogPosts';
import { Folder, ArrowLeft } from 'lucide-react';

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

const BlogCategory = () => {
  const { category } = useParams<{ category: string }>();
  const { data: posts, isLoading, error } = useBlogPostsByCategory(category || '');

  const transformedPosts = posts ? posts.map(transformPost) : [];
  const categoryLabel = transformedPosts.length > 0 ? transformedPosts[0].categoryLabel : category;

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading... | Rückenwind Eltern</title>
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

  if (error) {
    return (
      <>
        <Helmet>
          <title>Fehler | Rückenwind Eltern</title>
        </Helmet>
        <Navbar />
        <main>
          <section className="py-16">
            <div className="container-custom text-center">
              <h1 className="text-2xl font-semibold mb-4">Fehler beim Laden</h1>
              <p className="text-gray-600 mb-4">
                Es gab ein Problem beim Laden der Artikel. Bitte versuchen Sie es später erneut.
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

  return (
    <>
      <Helmet>
        <title>{categoryLabel} | Blog | Rückenwind Eltern</title>
        <meta name="description" content={`Alle Artikel aus der Kategorie ${categoryLabel} - hilfreiche Tipps und Informationen für Eltern.`} />
      </Helmet>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-b from-rueckenwind-light-purple to-white py-16">
          <div className="container-custom">
            <BlogBreadcrumb />
            <div className="max-w-3xl mx-auto text-center">
              <Folder className="w-12 h-12 mx-auto mb-4 text-rueckenwind-purple" />
              <h1 className="text-4xl md:text-5xl font-display font-semibold mb-6">
                {categoryLabel}
              </h1>
              <p className="text-xl text-gray-700">
                Alle Artikel aus dieser Kategorie
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="mb-6">
              <Button variant="outline" asChild>
                <Link to="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück zum Blog
                </Link>
              </Button>
            </div>

            {transformedPosts.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    {transformedPosts.length} Artikel gefunden
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {transformedPosts.map(post => (
                    <BlogPreview key={post.id} post={post} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <Folder className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-medium mb-2">Keine Artikel gefunden</h3>
                <p className="text-gray-600 mb-4">
                  In dieser Kategorie sind derzeit keine Artikel verfügbar.
                </p>
                <Button asChild>
                  <Link to="/blog">
                    Alle Artikel anzeigen
                  </Link>
                </Button>
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

export default BlogCategory;
