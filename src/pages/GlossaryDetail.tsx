import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { useGlossaryTerm, useGlossaryTerms } from '@/hooks/useGlossary';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Loader2 } from 'lucide-react';

const BASE_URL = 'https://rueckenwind-eltern.de';

const GlossaryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: term, isLoading, error } = useGlossaryTerm(slug || '');
  const { data: allTerms } = useGlossaryTerms();

  // Debug logging
  console.log('GlossaryDetail render:', { slug, term, isLoading, error });

  // Loading state
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container-custom py-20 min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-rueckenwind-purple" />
          <span className="ml-3 text-gray-600">Begriff wird geladen...</span>
        </div>
        <Footer />
      </>
    );
  }

  // If term not found (null returned from service, or error occurred)
  if (term === null || error) {
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

  // Replace glossary term links in text
  const createTermLinks = (text: string) => {
    let processedText = text;
    if (allTerms) {
      allTerms.forEach(item => {
        const regex = new RegExp(`\\b${item.term}\\b`, 'gi');
        processedText = processedText.replace(regex, `<a href="/glossar/${item.slug}" class="text-rueckenwind-purple hover:underline">${item.term}</a>`);
        if (item.alias) {
          const aliasRegex = new RegExp(`\\b${item.alias}\\b`, 'gi');
          processedText = processedText.replace(aliasRegex, `<a href="/glossar/${item.slug}" class="text-rueckenwind-purple hover:underline">${item.alias}</a>`);
        }
      });
    }
    return processedText;
  };

  // Separate sections by type
  const contentSections = term.sections?.filter(s => s.section_type === 'content' || !s.section_type) || [];
  const literaryDevices = term.sections?.filter(s => s.section_type === 'literary_device') || [];

  const pageUrl = `${BASE_URL}/glossar/${slug}`;
  const pageTitle = term.meta_title || `${term.term} | Glossar | Rückenwind Eltern`;
  const pageDescription = term.meta_description || term.definition;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Rückenwind Eltern" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>

      {/* Schema.org: Glossar-Begriff (DefinedTerm) */}
      <SchemaMarkup
        type="glossary"
        data={{
          url: pageUrl,
          baseUrl: BASE_URL,
          term: term.term,
          definition: term.definition,
          alias: term.alias,
          tags: term.tags,
          datePublished: term.created_at,
          dateModified: term.updated_at,
          relatedTerms: term.relatedTerms
        }}
      />

      {/* Schema.org: Breadcrumb */}
      <SchemaMarkup
        type="breadcrumb"
        data={{
          items: [
            { name: 'Startseite', url: BASE_URL },
            { name: 'Glossar', url: `${BASE_URL}/glossar` },
            { name: term.term, url: pageUrl }
          ]
        }}
      />

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
              {term.tags?.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-rueckenwind-light-purple text-rueckenwind-purple border-none">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-xl text-gray-700 max-w-3xl">
              {term.teaser || term.definition}
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
                {contentSections.length > 0 && (
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-8">
                    <h2 className="text-lg font-medium mb-4">Inhaltsverzeichnis</h2>
                    <ul className="space-y-2">
                      {contentSections.map((section, index) => (
                        <li key={section.id || index}>
                          <a
                            href={`#section-${index}`}
                            className="text-rueckenwind-purple hover:underline"
                          >
                            {section.title}
                          </a>
                        </li>
                      ))}
                      {literaryDevices.length > 0 && (
                        <li>
                          <a
                            href="#literary-devices"
                            className="text-rueckenwind-purple hover:underline"
                          >
                            Bildhafte Erklärungen
                          </a>
                        </li>
                      )}
                      {term.references && term.references.length > 0 && (
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
                {contentSections.map((section, index) => (
                  <div key={section.id || index} id={`section-${index}`} className="scroll-mt-20">
                    <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: createTermLinks(section.content) }}
                    />
                  </div>
                ))}

                {/* Literary devices section */}
                {literaryDevices.length > 0 && (
                  <div id="literary-devices" className="scroll-mt-20 bg-rueckenwind-soft-gray p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Bildhafte Erklärungen</h2>
                    <div className="space-y-6">
                      {literaryDevices.map((device, index) => (
                        <div key={device.id || index} className="border-l-4 border-rueckenwind-light-purple pl-4">
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
                {term.references && term.references.length > 0 && (
                  <div id="references" className="scroll-mt-20">
                    <h2 className="text-2xl font-semibold mb-4">Einzelnachweise</h2>
                    <ol className="list-decimal pl-5 space-y-2">
                      {term.references.map((reference, index) => (
                        <li key={reference.id || index} className="text-gray-700">
                          {reference.url ? (
                            <a href={reference.url} target="_blank" rel="noopener noreferrer" className="text-rueckenwind-purple hover:underline">
                              {reference.reference_text}
                            </a>
                          ) : (
                            reference.reference_text
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Related terms */}
                {term.relatedTerms && term.relatedTerms.length > 0 && (
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
                    <h3 className="text-lg font-medium mb-4">Verwandte Begriffe</h3>
                    <div className="space-y-3">
                      {term.relatedTerms.map((relatedTerm, index) => (
                        <Link
                          key={relatedTerm.id || index}
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

                {/* Tags cloud */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-medium mb-4">Kategorien & Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {term.tags?.map((tag, index) => (
                      <Link key={index} to={`/glossar?tag=${tag}`}>
                        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
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
