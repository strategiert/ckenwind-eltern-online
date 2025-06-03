
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { useGlossaryTerm, useGlossaryTerms } from '@/hooks/useGlossary';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, BookOpen, AlertCircle } from 'lucide-react';

const GlossaryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: term, isLoading, error } = useGlossaryTerm(slug || '');
  const { data: allTerms } = useGlossaryTerms();
  
  // Replace glossary term links in text
  const createTermLinks = (text: string) => {
    if (!allTerms) return text;
    
    let processedText = text;
    allTerms.forEach(item => {
      const regex = new RegExp(`\\b${item.term}\\b`, 'gi');
      processedText = processedText.replace(regex, `<a href="/glossar/${item.slug}" class="text-rueckenwind-purple hover:underline">${item.term}</a>`);
      if (item.alias) {
        const aliasRegex = new RegExp(`\\b${item.alias}\\b`, 'gi');
        processedText = processedText.replace(aliasRegex, `<a href="/glossar/${item.slug}" class="text-rueckenwind-purple hover:underline">${item.alias}</a>`);
      }
    });
    return processedText;
  };

  // Get related terms if available
  const relatedTerms = React.useMemo(() => {
    if (!term?.content?.relatedTerms || !allTerms) return [];
    return term.content.relatedTerms
      .map(slug => allTerms.find(t => t.slug === slug))
      .filter((t): t is NonNullable<typeof t> => t !== undefined);
  }, [term, allTerms]);

  // Get matching glossary entries based on shared tags
  const matchingEntries = React.useMemo(() => {
    if (!term?.tags || !allTerms) return [];
    
    return allTerms
      .filter(entry => 
        entry.slug !== term.slug && // Exclude current term
        entry.tags.some(tag => term.tags.includes(tag)) // Has at least one shared tag
      )
      .sort((a, b) => {
        // Sort by number of shared tags (descending)
        const aSharedTags = a.tags.filter(tag => term.tags.includes(tag)).length;
        const bSharedTags = b.tags.filter(tag => term.tags.includes(tag)).length;
        return bSharedTags - aSharedTags;
      })
      .slice(0, 5); // Limit to 5 entries
  }, [term, allTerms]);

  // Loading state
  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen">
          <section className="bg-gradient-to-b from-rueckenwind-light-purple to-white py-16 md:py-20">
            <div className="container-custom">
              <Link to="/glossar" className="inline-flex items-center text-rueckenwind-purple mb-6 hover:underline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück zum Glossar
              </Link>
              <Skeleton className="h-12 w-3/4 mb-4" />
              <div className="flex flex-wrap gap-2 mb-6">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-6 w-20" />)}
              </div>
              <Skeleton className="h-6 w-full max-w-3xl" />
            </div>
          </section>
          
          <section className="py-12 md:py-16">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="h-8 w-1/2" />
                      <Skeleton className="h-32 w-full" />
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-1">
                  <Skeleton className="h-64 w-full" />
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Navbar />
        <div className="container-custom py-20 min-h-screen">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Fehler beim Laden des Glossar-Eintrags. Bitte versuchen Sie es später erneut.
            </AlertDescription>
          </Alert>
          <Link to="/glossar" className="text-rueckenwind-purple hover:underline flex items-center mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zum Glossar
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  if (!term) {
    return (
      <>
        <Navbar />
        <div className="container-custom py-20 min-h-screen">
          <div className="flex flex-col items-center justify-center text-center">
            <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
            <h1 className="text-3xl font-semibold text-gray-700 mb-4">Begriff nicht gefunden</h1>
            <p className="text-gray-600 mb-6">Der gesuchte Begriff wurde leider nicht gefunden.</p>
            <Link to="/glossar" className="text-rueckenwind-purple hover:underline flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zum Glossar
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{term.term} | Glossar | Rückenwind Eltern</title>
        <meta 
          name="description" 
          content={term.definition}
        />
      </Helmet>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero section with term title */}
        <section className="bg-gradient-to-b from-rueckenwind-light-purple to-white py-16 md:py-20">
          <div className="container-custom">
            <Link to="/glossar" className="inline-flex items-center text-rueckenwind-purple mb-6 hover:underline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zum Glossar
            </Link>
            <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">
              {term.term}
              {term.alias && <span className="text-2xl md:text-3xl font-normal text-gray-600 ml-4">({term.alias})</span>}
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {term.tags.map((tag, index) => (
                <Link key={index} to={`/glossar?tag=${tag}`}>
                  <Badge variant="outline" className="bg-rueckenwind-light-purple text-rueckenwind-purple border-none hover:bg-rueckenwind-purple hover:text-white transition-colors cursor-pointer">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
            <p className="text-xl text-gray-700 max-w-3xl">
              {term.content?.teaser || term.definition}
            </p>
          </div>
        </section>

        {/* Content section */}
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Table of contents */}
                {term.content?.sections && term.content.sections.length > 0 && (
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-8">
                    <h2 className="text-lg font-medium mb-4">Inhaltsverzeichnis</h2>
                    <ul className="space-y-2">
                      {term.content.sections.map((section, index) => (
                        <li key={index}>
                          <a 
                            href={`#section-${index}`} 
                            className="text-rueckenwind-purple hover:underline"
                          >
                            {section.title}
                          </a>
                        </li>
                      ))}
                      {term.content.literaryDevices && term.content.literaryDevices.length > 0 && (
                        <li>
                          <a 
                            href="#literary-devices" 
                            className="text-rueckenwind-purple hover:underline"
                          >
                            Bildhafte Erklärungen
                          </a>
                        </li>
                      )}
                      {term.content.references && term.content.references.length > 0 && (
                        <li>
                          <a 
                            href="#references" 
                            className="text-rueckenwind-purple hover:underline"
                          >
                            Einzelnachweise
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Main content sections */}
                {term.content?.sections && term.content.sections.map((section, index) => (
                  <div key={index} id={`section-${index}`} className="scroll-mt-20">
                    <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: createTermLinks(section.content) }}
                    />
                  </div>
                ))}

                {/* Literary devices section */}
                {term.content?.literaryDevices && term.content.literaryDevices.length > 0 && (
                  <div id="literary-devices" className="scroll-mt-20 bg-rueckenwind-soft-gray p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Bildhafte Erklärungen</h2>
                    <div className="space-y-6">
                      {term.content.literaryDevices.map((device, index) => (
                        <div key={index} className="border-l-4 border-rueckenwind-light-purple pl-4">
                          <h3 className="text-lg font-medium mb-2">{device.title}</h3>
                          <div 
                            className="prose max-w-none text-gray-700 italic"
                            dangerouslySetInnerHTML={{ __html: createTermLinks(device.content) }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* References section */}
                {term.content?.references && term.content.references.length > 0 && (
                  <div id="references" className="scroll-mt-20">
                    <h2 className="text-2xl font-semibold mb-4">Einzelnachweise</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                      {term.content.references.map((reference, index) => (
                        <li key={index} className="text-gray-700">
                          {reference}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Related terms */}
                {relatedTerms.length > 0 && (
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Verwandte Begriffe</h3>
                    <div className="space-y-3">
                      {relatedTerms.map((relatedTerm, index) => (
                        <Link 
                          key={index} 
                          to={`/glossar/${relatedTerm.slug}`}
                          className="block p-3 bg-gray-50 hover:bg-rueckenwind-light-purple rounded-md transition-colors"
                        >
                          <div className="font-medium text-rueckenwind-purple">{relatedTerm.term}</div>
                          <div className="text-sm text-gray-600 line-clamp-2">{relatedTerm.definition}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matching glossary entries */}
                {matchingEntries.length > 0 && (
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Passende Beiträge</h3>
                    <div className="space-y-3">
                      {matchingEntries.map((entry, index) => {
                        const sharedTags = entry.tags.filter(tag => term.tags.includes(tag));
                        return (
                          <Link 
                            key={index} 
                            to={`/glossar/${entry.slug}`}
                            className="block p-3 bg-gray-50 hover:bg-rueckenwind-light-purple rounded-md transition-colors"
                          >
                            <div className="font-medium text-rueckenwind-purple mb-1">{entry.term}</div>
                            <div className="text-sm text-gray-600 line-clamp-2 mb-2">{entry.definition}</div>
                            <div className="flex flex-wrap gap-1">
                              {sharedTags.slice(0, 3).map((tag, tagIndex) => (
                                <Badge 
                                  key={tagIndex} 
                                  variant="outline" 
                                  className="text-xs bg-rueckenwind-light-purple text-rueckenwind-purple border-none"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {sharedTags.length > 3 && (
                                <span className="text-xs text-gray-500">+{sharedTags.length - 3}</span>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
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

export default GlossaryDetail;
