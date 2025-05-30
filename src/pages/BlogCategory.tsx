
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPreview from '@/components/BlogPreview';
import BlogPagination from '@/components/BlogPagination';
import BlogBreadcrumb from '@/components/BlogBreadcrumb';
import BlogTagFilter from '@/components/BlogTagFilter';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from 'react-helmet-async';
import { blogPostsListing } from '@/data/blogPosts';

const BlogCategory = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags')?.split(',').filter(Boolean) || []
  );
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'popular'>(
    (searchParams.get('sort') as 'newest' | 'oldest' | 'popular') || 'newest'
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1')
  );
  const postsPerPage = 12;

  // Find category info
  const categoryInfo = {
    'burnout': { label: 'Eltern-Burnout', description: 'Tipps und Strategien zur Burnout-Prävention und -bewältigung für Eltern' },
    'adhs': { label: 'ADHS', description: 'Informationen und praktische Hilfe für Familien mit ADHS-betroffenen Kindern' },
    'essstoerungen': { label: 'Essstörungen', description: 'Aufklärung und Unterstützung bei Essstörungen im Kindes- und Jugendalter' },
    'familie': { label: 'Familienalltag', description: 'Praktische Tipps für einen harmonischen Familienalltag' },
    'entwicklung': { label: 'Kindesentwicklung', description: 'Wissenswertes über die gesunde Entwicklung von Kindern' },
    'beziehung': { label: 'Familienbeziehungen', description: 'Stärkung der Beziehungen innerhalb der Familie' }
  };

  const currentCategory = category ? categoryInfo[category as keyof typeof categoryInfo] : null;

  // Filter posts by category
  const categoryPosts = blogPostsListing.filter(post => post.category === category);

  // Extract tags for this category
  const categoryTags = Array.from(
    new Set(
      categoryPosts
        .flatMap(post => post.tags || [])
        .filter(Boolean)
    )
  ).sort();

  // Apply additional filters
  const filteredPosts = categoryPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => post.tags?.includes(tag));
    return matchesSearch && matchesTags;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortOrder) {
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'popular':
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
    if (sortOrder !== 'newest') params.set('sort', sortOrder);
    if (currentPage > 1) params.set('page', currentPage.toString());
    setSearchParams(params);
  }, [searchTerm, selectedTags, sortOrder, currentPage, setSearchParams]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSortOrder('newest');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!currentCategory) {
    return (
      <>
        <Navbar />
        <main className="container-custom py-16">
          <div className="text-center">
            <h1 className="text-4xl font-display font-semibold mb-4">Kategorie nicht gefunden</h1>
            <p className="text-gray-600 mb-8">Die gesuchte Kategorie existiert nicht.</p>
            <Button asChild>
              <a href="/blog">Zurück zum Blog</a>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{currentCategory.label} | Rückenwind Eltern Blog</title>
        <meta name="description" content={currentCategory.description} />
      </Helmet>
      <Navbar />
      <main>
        {/* Category Header */}
        <section className="bg-gradient-to-b from-rueckenwind-light-purple to-white py-16">
          <div className="container-custom">
            <BlogBreadcrumb category={category} categoryLabel={currentCategory.label} />
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-rueckenwind-purple">{currentCategory.label}</Badge>
              <h1 className="text-4xl md:text-5xl font-display font-semibold mb-6">
                {currentCategory.label}
              </h1>
              <p className="text-xl text-gray-700 mb-4">{currentCategory.description}</p>
              <p className="text-gray-600">
                {categoryPosts.length} Artikel in dieser Kategorie
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <Input
                  type="text"
                  placeholder="Artikel durchsuchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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

            {categoryTags.length > 0 && (
              <div className="mb-4">
                <BlogTagFilter 
                  tags={categoryTags}
                  selectedTags={selectedTags}
                  onTagToggle={handleTagToggle}
                />
              </div>
            )}

            {(searchTerm || selectedTags.length > 0 || sortOrder !== 'newest') && (
              <Button 
                variant="outline" 
                onClick={clearAllFilters}
                className="text-rueckenwind-purple border-rueckenwind-purple hover:bg-rueckenwind-light-purple"
              >
                Filter zurücksetzen
              </Button>
            )}
          </div>
        </section>

        {/* Posts */}
        <section className="py-12">
          <div className="container-custom">
            <div className="mb-6">
              <p className="text-gray-600">
                {sortedPosts.length} Artikel gefunden
                {totalPages > 1 && ` (Seite ${currentPage} von ${totalPages})`}
              </p>
            </div>

            {paginatedPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedPosts.map(post => (
                    <BlogPreview key={post.id} post={post} />
                  ))}
                </div>
                
                <BlogPagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">Keine Artikel gefunden</h3>
                <p className="text-gray-600 mb-4">
                  Versuchen Sie andere Suchbegriffe oder Tags.
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

export default BlogCategory;
