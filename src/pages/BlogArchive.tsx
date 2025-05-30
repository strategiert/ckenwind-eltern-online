
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPreview from '@/components/BlogPreview';
import BlogBreadcrumb from '@/components/BlogBreadcrumb';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from 'react-helmet-async';
import { blogPostsListing } from '@/data/blogPosts';
import { Calendar, ChevronDown, ChevronRight } from 'lucide-react';

const BlogArchive = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedYear = searchParams.get('year');
  const selectedMonth = searchParams.get('month');
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set([selectedYear || new Date().getFullYear().toString()]));

  // Group posts by year and month
  const postsByDate = blogPostsListing.reduce((acc, post) => {
    const date = new Date(post.date);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const monthName = date.toLocaleDateString('de-DE', { month: 'long' });
    
    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = { name: monthName, posts: [] };
    acc[year][month].posts.push(post);
    
    return acc;
  }, {} as Record<string, Record<string, { name: string; posts: any[] }>>);

  const years = Object.keys(postsByDate).sort((a, b) => parseInt(b) - parseInt(a));

  const toggleYear = (year: string) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const handleDateFilter = (year?: string, month?: string) => {
    const params = new URLSearchParams();
    if (year) params.set('year', year);
    if (month) params.set('month', month);
    setSearchParams(params);
  };

  const clearDateFilter = () => {
    setSearchParams({});
  };

  // Filter posts based on selected date
  const filteredPosts = blogPostsListing.filter(post => {
    const date = new Date(post.date);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    
    if (selectedYear && year !== selectedYear) return false;
    if (selectedMonth && month !== selectedMonth) return false;
    return true;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getDateTitle = () => {
    if (selectedYear && selectedMonth) {
      const date = new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1);
      return date.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
    }
    if (selectedYear) {
      return selectedYear;
    }
    return 'Alle Artikel';
  };

  return (
    <>
      <Helmet>
        <title>Blog Archiv | Rückenwind Eltern</title>
        <meta name="description" content="Durchsuchen Sie alle Blog-Artikel chronologisch nach Datum sortiert." />
      </Helmet>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-b from-rueckenwind-light-purple to-white py-16">
          <div className="container-custom">
            <BlogBreadcrumb />
            <div className="max-w-3xl mx-auto text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-rueckenwind-purple" />
              <h1 className="text-4xl md:text-5xl font-display font-semibold mb-6">
                Blog Archiv
              </h1>
              <p className="text-xl text-gray-700">
                Durchsuchen Sie alle Artikel chronologisch
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Archive Navigation */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg">Archiv durchsuchen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button
                        variant={!selectedYear ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={clearDateFilter}
                      >
                        Alle Artikel ({blogPostsListing.length})
                      </Button>
                      
                      {years.map(year => {
                        const yearPosts = Object.values(postsByDate[year]).reduce((sum, month) => sum + month.posts.length, 0);
                        const isExpanded = expandedYears.has(year);
                        
                        return (
                          <div key={year}>
                            <Button
                              variant="ghost"
                              className="w-full justify-between p-2"
                              onClick={() => toggleYear(year)}
                            >
                              <span className="flex items-center">
                                {isExpanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                                {year} ({yearPosts})
                              </span>
                            </Button>
                            
                            {isExpanded && (
                              <div className="ml-4 space-y-1">
                                <Button
                                  variant={selectedYear === year && !selectedMonth ? "default" : "ghost"}
                                  size="sm"
                                  className="w-full justify-start text-sm"
                                  onClick={() => handleDateFilter(year)}
                                >
                                  Ganzes Jahr ({yearPosts})
                                </Button>
                                
                                {Object.entries(postsByDate[year])
                                  .sort(([a], [b]) => parseInt(b) - parseInt(a))
                                  .map(([month, data]) => (
                                    <Button
                                      key={month}
                                      variant={selectedYear === year && selectedMonth === month ? "default" : "ghost"}
                                      size="sm"
                                      className="w-full justify-start text-sm ml-2"
                                      onClick={() => handleDateFilter(year, month)}
                                    >
                                      {data.name} ({data.posts.length})
                                    </Button>
                                  ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Posts */}
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <h2 className="text-2xl font-display font-semibold mb-2">{getDateTitle()}</h2>
                  <p className="text-gray-600">{filteredPosts.length} Artikel gefunden</p>
                  {(selectedYear || selectedMonth) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearDateFilter}
                      className="mt-2"
                    >
                      Filter zurücksetzen
                    </Button>
                  )}
                </div>

                {filteredPosts.length > 0 ? (
                  <div className="space-y-8">
                    {filteredPosts.map(post => (
                      <div key={post.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                        <BlogPreview post={post} layout="horizontal" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-medium mb-2">Keine Artikel gefunden</h3>
                    <p className="text-gray-600 mb-4">
                      Für den ausgewählten Zeitraum sind keine Artikel verfügbar.
                    </p>
                    <Button onClick={clearDateFilter}>
                      Alle Artikel anzeigen
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogArchive;
