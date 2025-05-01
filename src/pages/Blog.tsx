
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPreview from '@/components/BlogPreview';
import { Input } from "@/components/ui/input";

const Blog = () => {
  // Mock blog posts data
  const allBlogPosts = [
    {
      id: 1,
      title: "7 Anzeichen für elterliches Burnout und was Sie dagegen tun können",
      excerpt: "Erfahren Sie, wie Sie die ersten Warnzeichen erkennen und gezielt gegensteuern können.",
      date: "15. April 2023",
      imageUrl: "https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?q=80&w=1964",
      slug: "anzeichen-elterliches-burnout",
      category: "burnout"
    },
    {
      id: 2,
      title: "Wie Sie ADHS bei Kindern positiv begleiten können",
      excerpt: "Praktische Strategien für den Alltag mit ADHS-Kindern, die wirklich funktionieren.",
      date: "02. März 2023",
      imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1972",
      slug: "adhs-bei-kindern-begleiten",
      category: "adhs"
    },
    {
      id: 3,
      title: "Essstörungen frühzeitig erkennen: Ein Leitfaden für Eltern",
      excerpt: "Was Sie als Eltern über die Anzeichen und Prävention von Essstörungen wissen sollten.",
      date: "18. Februar 2023",
      imageUrl: "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=2070",
      slug: "essstoerungen-fruehzeitig-erkennen",
      category: "essstoerungen"
    },
    {
      id: 4,
      title: "Selbstfürsorge für erschöpfte Eltern: 5 einfache Praktiken",
      excerpt: "Wie Sie als Eltern auch in stressigen Zeiten gut für sich selbst sorgen können.",
      date: "05. Januar 2023",
      imageUrl: "https://images.unsplash.com/photo-1545388115-2a8f8b9faec8?q=80&w=1974",
      slug: "selbstfuersorge-erschoepfte-eltern",
      category: "burnout"
    },
    {
      id: 5,
      title: "Konflikte in der Familie konstruktiv lösen",
      excerpt: "So sorgen Sie für ein harmonischeres Miteinander und weniger Streit im Familienalltag.",
      date: "20. Dezember 2022",
      imageUrl: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?q=80&w=2070",
      slug: "konflikte-familie-konstruktiv-loesen",
      category: "familie"
    },
    {
      id: 6,
      title: "ADHS und Schule: So unterstützen Sie Ihr Kind optimal",
      excerpt: "Praktische Tipps für Eltern, um Kindern mit ADHS einen erfolgreichen Schulalltag zu ermöglichen.",
      date: "10. November 2022",
      imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1932",
      slug: "adhs-und-schule",
      category: "adhs"
    },
    {
      id: 7,
      title: "Gesunde Essgewohnheiten in der Familie etablieren",
      excerpt: "Wie Sie eine positive Esskultur in Ihrer Familie fördern können.",
      date: "28. Oktober 2022",
      imageUrl: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1964",
      slug: "gesunde-essgewohnheiten-familie",
      category: "essstoerungen"
    },
    {
      id: 8,
      title: "Medienkonsum bei Kindern: Findung der richtigen Balance",
      excerpt: "Sinnvolle Regeln für die Mediennutzung und warum sie wichtig sind.",
      date: "15. September 2022",
      imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1969",
      slug: "medienkonsum-kinder-balance",
      category: "familie"
    },
    {
      id: 9,
      title: "Wenn Eltern an ihre Grenzen kommen: Hilfe annehmen lernen",
      excerpt: "Warum es kein Zeichen von Schwäche ist, Unterstützung zu suchen – und wo Sie sie finden.",
      date: "02. August 2022",
      imageUrl: "https://images.unsplash.com/photo-1569437061241-a848be43cc82?q=80&w=1974",
      slug: "eltern-grenzen-hilfe-annehmen",
      category: "burnout"
    }
  ];

  // State for search and category filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filter blog posts based on search term and category
  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories
  const categories = ['', ...new Set(allBlogPosts.map(post => post.category))];
  const categoryLabels = {
    '': 'Alle Kategorien',
    'burnout': 'Eltern-Burnout',
    'adhs': 'ADHS',
    'essstoerungen': 'Essstörungen',
    'familie': 'Familienalltag'
  };

  return (
    <>
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
                    <option key={category} value={category}>
                      {categoryLabels[category as keyof typeof categoryLabels] || category}
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
