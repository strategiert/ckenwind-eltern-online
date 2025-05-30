
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogReadingProgress from '@/components/BlogReadingProgress';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogPreview from '@/components/BlogPreview';
import { Helmet } from 'react-helmet-async';
import { blogPostsData } from '@/data/blogPosts';
import { Clock, User, Calendar } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPostsData.find(post => post.slug === slug);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="container-custom py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-semibold mb-6">Beitrag nicht gefunden</h1>
            <p className="text-xl text-gray-700 mb-8">Der gesuchte Beitrag existiert leider nicht.</p>
            <Button asChild>
              <Link to="/blog">Zurück zur Blog-Übersicht</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const relatedPosts = blogPostsData
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{post.title} | Rückenwind Eltern</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription || post.excerpt} />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedDate} />
        <meta property="article:author" content="Janike Arent" />
        <meta property="article:section" content={post.categoryLabel} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <BlogReadingProgress />
      <Navbar />
      <main>
        {/* Blog Header */}
        <section className="relative">
          <div className="h-96 w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="container-custom">
                <div className="max-w-4xl">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <Badge className="bg-rueckenwind-purple">
                      {post.categoryLabel}
                    </Badge>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author || 'Janike Arent'}
                      </div>
                      {post.readingTime && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readingTime} Min. Lesezeit
                        </div>
                      )}
                    </div>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-display font-semibold mb-4">{post.title}</h1>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-white/20 text-white">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-2xl font-display mb-4">Über die Autorin</h3>
                  <div className="flex items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787" 
                      alt="Janike Arent" 
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-medium">Janike Arent</p>
                      <p className="text-gray-700">Therapeutin und dreifache Mutter mit über 20 Jahren Erfahrung in der Familienberatung.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                {post.tableOfContents && post.tableOfContents.length > 0 && (
                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-display mb-4">Inhaltsverzeichnis</h3>
                    <ul className="space-y-2">
                      {post.tableOfContents.map((item, index) => (
                        <li key={index}>
                          <a href={`#${item.anchor}`} className="text-rueckenwind-purple hover:underline">{item.title}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="sticky top-24">
                  <h3 className="text-xl font-display mb-4">Das könnte Sie auch interessieren</h3>
                  <div className="space-y-6">
                    {relatedPosts.map(relatedPost => (
                      <div key={relatedPost.id} className="flex items-start">
                        <Link to={`/blog/${relatedPost.slug}`} className="w-24 h-16 mr-4 flex-shrink-0">
                          <img 
                            src={relatedPost.imageUrl} 
                            alt={relatedPost.title} 
                            className="w-full h-full object-cover rounded"
                          />
                        </Link>
                        <div>
                          <Link to={`/blog/${relatedPost.slug}`} className="font-medium hover:text-rueckenwind-purple transition-colors">
                            {relatedPost.title}
                          </Link>
                          <p className="text-sm text-gray-500">{relatedPost.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 bg-rueckenwind-light-purple">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display font-semibold mb-4">Mehr Unterstützung für Ihren Familienalltag?</h2>
              <p className="text-lg mb-6">
                Holen Sie sich jetzt mein kostenloses E-Book und entdecken Sie praktische Strategien für mehr Gelassenheit in Ihrem Familienalltag.
              </p>
              <Button asChild className="bg-white text-rueckenwind-purple hover:bg-gray-100">
                <Link to="/gratis-buch">Gratis E-Book sichern</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
