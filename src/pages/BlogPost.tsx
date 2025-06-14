
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogBreadcrumb from '@/components/BlogBreadcrumb';
import BlogSocialShare from '@/components/BlogSocialShare';
import BlogReadingProgress from '@/components/BlogReadingProgress';
import BlogPrintView from '@/components/BlogPrintView';
import BlogNewsletter from '@/components/BlogNewsletter';
import SEOHead from '@/components/seo/SEOHead';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPost } from '@/hooks/useBlogPosts';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug || '');
  const breadcrumbs = useBreadcrumbs();

  if (isLoading) {
    return (
      <>
        <SEOHead
          title="Loading... | Rückenwind Eltern"
          description="Artikel wird geladen..."
        />
        <Navbar />
        <main>
          <BlogReadingProgress />
          <article className="py-8">
            <div className="container-custom max-w-4xl mx-auto">
              <BlogBreadcrumb />
              <div className="mb-8">
                <Skeleton className="h-8 w-32 mb-4" />
                <Skeleton className="h-12 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-6" />
                <Skeleton className="h-64 w-full mb-8" />
                <div className="space-y-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <SEOHead
          title="Artikel nicht gefunden | Rückenwind Eltern"
          description="Der gewünschte Artikel existiert nicht oder wurde entfernt."
          noindex={true}
        />
        <Navbar />
        <main>
          <section className="py-16">
            <div className="container-custom text-center">
              <h1 className="text-2xl font-semibold mb-4">Artikel nicht gefunden</h1>
              <p className="text-gray-600 mb-6">
                Der gewünschte Artikel existiert nicht oder wurde entfernt.
              </p>
              <Button asChild>
                <Link to="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zum Blog
                </Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const publishedDate = new Date(post.published_at || post.created_at).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getImageUrl = () => {
    if (post.image_url && post.image_url.trim() !== '') {
      return post.image_url;
    }
    return "https://images.unsplash.com/photo-1541199249251-f713e6145474?q=80&w=1974&auto=format&fit=crop";
  };

  const transformedPost = {
    title: post.title,
    content: post.content,
    date: publishedDate,
    author: post.author,
    categoryLabel: post.category_label,
    imageUrl: getImageUrl(),
    excerpt: post.excerpt || ''
  };

  const currentUrl = `https://rueckenwind-eltern.de/blog/${post.slug}`;
  
  // Article schema data
  const articleSchema = {
    title: post.title,
    description: post.excerpt || '',
    image: getImageUrl(),
    author: post.author || 'Janike Arent',
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.published_at || post.created_at,
    url: currentUrl,
    baseUrl: 'https://rueckenwind-eltern.de'
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    items: breadcrumbs
  };

  return (
    <>
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt || ''}
        keywords={post.tags?.join(', ') || ''}
        author={post.author || 'Janike Arent'}
        url={currentUrl}
        image={getImageUrl()}
        type="article"
        publishedTime={post.published_at || post.created_at}
        modifiedTime={post.updated_at || post.published_at || post.created_at}
        section={post.category_label}
        tags={post.tags}
        canonical={currentUrl}
      />
      
      <SchemaMarkup type="article" data={articleSchema} />
      <SchemaMarkup type="breadcrumb" data={breadcrumbSchema} />
      
      <Navbar />
      <main>
        <BlogReadingProgress />
        <article className="py-8">
          <div className="container-custom max-w-4xl mx-auto">
            <BlogBreadcrumb />
            
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="text-rueckenwind-purple">
                  <Link to={`/blog/category/${post.category}`} className="hover:underline">
                    {post.category_label}
                  </Link>
                </Badge>
                {post.reading_time && (
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.reading_time} Min. Lesezeit
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-6 leading-tight">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{post.author || 'Janike Arent'}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{publishedDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <BlogSocialShare 
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                />
                <BlogPrintView post={transformedPost} />
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8">
              <img 
                src={getImageUrl()} 
                alt={post.title} 
                className="w-full h-64 md:h-96 object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?q=80&w=1974&auto=format&fit=crop";
                }}
              />
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-rueckenwind-dark-purple prose-a:text-rueckenwind-purple hover:prose-a:text-rueckenwind-dark-purple prose-strong:text-rueckenwind-dark-purple"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">War dieser Artikel hilfreich?</h3>
                  <p className="text-gray-600">
                    Teilen Sie ihn mit anderen Eltern oder speichern Sie ihn für später.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Teilen
                  </Button>
                  <BlogPrintView post={transformedPost} />
                </div>
              </div>
            </footer>
          </div>
        </article>
        
        {/* Newsletter Section */}
        <BlogNewsletter />
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
