
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPreview from '@/components/BlogPreview';
import BlogFeaturedPost from '@/components/BlogFeaturedPost';
import BlogTagFilter from '@/components/BlogTagFilter';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Helmet } from 'react-helmet-async';
import { blogPostsListing } from '@/data/blogPosts';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'popular'>('newest');

  // Extract featured post (first post or one marked as featured)
  const featuredPost = blogPostsListing.find(post => post.featured) || blogPostsListing[0];
  const regularPosts = blogPostsListing.filter(post => post.id !== featuredPost?.id);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(
      blogPostsListing
        .flatMap(post => post.tags || [])
        .filter(Boolean)
    )
  ).sort();

  // Filter posts
  const filteredPosts = regularPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => post.tags?.includes(tag));
    return matchesSearch && matchesCategory && matchesTags;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortOrder) {
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'popular':
        // For now, sort by featured status then by date
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      default: // newest
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const categories = [
    { value: '', label: 'Alle Kategorien' },
    { value: 'burnout', label: 'Eltern-Burnout' },
    { value: 'adhs', label: 'ADHS' },
    { value: 'essstoerungen', label: 'Essstörungen' },
    { value: 'familie', label: 'Familienalltag' },
    { value: 'entwicklung', label: 'Kindesentwicklung' },
    { value: 'beziehung', label: 'Familienbeziehungen' }
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedTags([]);
    setSortOrder('newest');
  };

  return (
    <>
      <Helmet>
        <title>Blog | Rückenwind Eltern</title>
        <meta name="description" content="Informative Artikel und praktische Tipps für Eltern zu Themen wie Eltern-Burnout, ADHS bei Kindern und Essstörungen." />
        <meta property="og:title" content="Blog | Rückenwind Eltern" />
        <meta property="og:description" content="Informative Artikel und praktische Tipps für Eltern zu Themen wie Eltern-Burnout, ADHS bei Kindern und Essstörungen." />
      </Helmet>
      <Navbar />
      <main>
        {/* Blog Header */}
        <section className="bg-gradient-to-b from-rueckenwind-light-purple to-white py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-semibold mb-6">Blog</h1>
              <p className="text-xl text-gray-700">
                Tipps, Erkenntnisse und praktische Hilfe für Ihren Familienalltag
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12 bg-white">
            <div className="container-custom">
              <h2 className="text-2xl font-display font-semibold mb-6">Empfohlener Artikel</h2>
              <BlogFeaturedPost post={featuredPost} />
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <section className="py-8 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Search */}
              <div className="lg:col-span-2">
                <Input
                  type="text"
                  placeholder="Suche nach Beiträgen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rueckenwind-purple"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest' | 'popular')}
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rueckenwind-purple"
                >
                  <option value="newest">Neueste zuerst</option>
                  <option value="oldest">Älteste zuerst</option>
                  <option value="popular">Beliebteste</option>
                </select>
              </div>
            </div>

            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className="mt-6">
                <BlogTagFilter 
                  tags={allTags}
                  selectedTags={selectedTags}
                  onTagToggle={handleTagToggle}
                />
              </div>
            )}

            {/* Clear Filters */}
            {(searchTerm || selectedCategory || selectedTags.length > 0 || sortOrder !== 'newest') && (
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  onClick={clearAllFilters}
                  className="text-rueckenwind-purple border-rueckenwind-purple hover:bg-rueckenwind-light-purple"
                >
                  Alle Filter zurücksetzen
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-12 md:py-16">
          <div className="container-custom">
            {/* Results Info */}
            <div className="mb-8">
              <p className="text-gray-600">
                {sortedPosts.length} Artikel gefunden
                {(searchTerm || selectedCategory || selectedTags.length > 0) && 
                  ` für Ihre Filterkriterien`
                }
              </p>
            </div>

            {sortedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedPosts.map(post => (
                  <BlogPreview key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">Keine Beiträge gefunden</h3>
                <p className="text-gray-600 mb-4">
                  Bitte versuchen Sie es mit anderen Suchbegriffen oder Kategorien.
                </p>
                <Button 
                  variant="outline" 
                  onClick={clearAllFilters}
                  className="text-rueckenwind-purple border-rueckenwind-purple hover:bg-rueckenwind-light-purple"
                >
                  Filter zurücksetzen
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

export default Blog;
