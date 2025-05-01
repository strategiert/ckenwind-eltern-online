
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPreview from '@/components/BlogPreview';
import { Input } from "@/components/ui/input";
import { Helmet } from 'react-helmet-async';
import { blogPostsListing } from '@/data/blogPosts';

const Blog = () => {
  // State for search and category filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filter blog posts based on search term and category
  const filteredPosts = blogPostsListing.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories with labels
  const categories = [
    { value: '', label: 'Alle Kategorien' },
    { value: 'burnout', label: 'Eltern-Burnout' },
    { value: 'adhs', label: 'ADHS' },
    { value: 'essstoerungen', label: 'Essstörungen' },
    { value: 'familie', label: 'Familienalltag' }
  ];

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

        {/* Search and Filter */}
        <section className="py-8 bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="w-full md:w-1/3">
                <Input
                  type="text"
                  placeholder="Suche nach Beiträgen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="w-full md:w-1/3">
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
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-12 md:py-16">
          <div className="container-custom">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                  <BlogPreview key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">Keine Beiträge gefunden</h3>
                <p className="text-gray-600">Bitte versuchen Sie es mit anderen Suchbegriffen oder Kategorien.</p>
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
