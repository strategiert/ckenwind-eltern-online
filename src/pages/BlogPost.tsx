
import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, User, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogSocialShare from '@/components/BlogSocialShare';
import BlogNewsletter from '@/components/BlogNewsletter';
import BlogBreadcrumb from '@/components/BlogBreadcrumb';
import BlogReadingProgress from '@/components/BlogReadingProgress';
import BlogMarkdownRenderer from '@/components/BlogMarkdownRenderer';
import { Badge } from "@/components/ui/badge";
import { useBlogPost } from '@/hooks/useBlogPosts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug || '');

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Artikel wird geladen...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Artikel nicht gefunden</h1>
            <p className="text-gray-600">Der angeforderte Artikel konnte nicht gefunden werden.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.meta_title || post.title} | Rückenwind Eltern</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image_url} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <BlogReadingProgress />
      <Navbar />
      
      <main>
        <article className="container-custom py-8">
          <BlogBreadcrumb 
            category={post.category}
            categoryLabel={post.category_label}
            title={post.title}
          />
          
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              {post.image_url && (
                <img 
                  src={post.image_url} 
                  alt={post.title}
                  className="w-full h-96 object-cover rounded-lg mb-6"
                />
              )}
              
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{post.category_label}</Badge>
                {post.featured && <Badge variant="default">Empfohlen</Badge>}
              </div>
              
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(post.created_at).toLocaleDateString('de-DE')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.reading_time} Min. Lesezeit</span>
                </div>
              </div>
              
              {post.excerpt && (
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              )}
            </header>
            
            <BlogMarkdownRenderer 
              content={post.content}
              className="mb-8"
            />
            
            <BlogSocialShare 
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
            />
            
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
        
        <BlogNewsletter />
      </main>
      
      <Footer />
    </>
  );
};

export default BlogPost;
