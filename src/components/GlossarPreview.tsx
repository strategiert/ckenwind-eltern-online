
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlossaryTerms } from '@/hooks/useGlossary';
import { BookOpen } from 'lucide-react';

const GlossarPreview: React.FC = () => {
  const { data: glossaryData, isLoading, error } = useGlossaryTerms();

  // Get featured terms once data is loaded
  const featuredTerms = React.useMemo(() => {
    if (!glossaryData || glossaryData.length === 0) return [];
    
    // Find specific terms to feature: ADHS, Belastung, and a random term from B
    const adhs = glossaryData.find(term => term.term === "ADHS");
    const belastung = glossaryData.find(term => term.term === "Belastung");
    const bTerms = glossaryData
      .filter(term => term.term.startsWith("B") && term.term !== "Belastung")
      .sort(() => 0.5 - Math.random())
      .slice(0, 1);
    
    return [adhs, belastung, ...bTerms].filter(Boolean);
  }, [glossaryData]);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-rueckenwind-soft-gray">
        <div className="container-custom">
          <h2 className="section-title">Glossar</h2>
          <p className="section-subtitle">Fachbegriffe aus Psychologie und Therapie verständlich erklärt</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="bg-white h-full flex flex-col">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="grow">
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((tagIndex) => (
                      <Skeleton key={tagIndex} className="h-6 w-16" />
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-4 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Skeleton className="h-10 w-48 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !featuredTerms.length) {
    return (
      <section className="py-16 md:py-24 bg-rueckenwind-soft-gray">
        <div className="container-custom">
          <h2 className="section-title">Glossar</h2>
          <p className="section-subtitle">Fachbegriffe aus Psychologie und Therapie verständlich erklärt</p>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Glossar-Inhalte werden geladen...
            </p>
            <Button asChild variant="outline" className="border-rueckenwind-purple text-rueckenwind-purple hover:bg-rueckenwind-light-purple">
              <Link to="/glossar">Komplettes Glossar entdecken</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-rueckenwind-soft-gray">
      <div className="container-custom">
        <h2 className="section-title">Glossar</h2>
        <p className="section-subtitle">Fachbegriffe aus Psychologie und Therapie verständlich erklärt</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {featuredTerms.map((term, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow h-full flex flex-col">
              <CardHeader className="pb-2">
                <h3 className="text-xl font-medium text-rueckenwind-purple flex items-start gap-2 break-words">
                  <BookOpen className="h-5 w-5 shrink-0 mt-1" />
                  <span className="break-words">
                    {term.term}
                    {term.alias && <div className="text-gray-500 font-normal text-sm mt-1 break-words">{term.alias}</div>}
                  </span>
                </h3>
              </CardHeader>
              <CardContent className="grow">
                <p className="text-gray-700 break-words">
                  {term.content?.teaser || term.definition}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {term.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-rueckenwind-light-purple px-2 py-1 text-xs rounded text-rueckenwind-purple">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link 
                  to={`/glossar/${term.slug}`} 
                  className="text-rueckenwind-purple hover:text-rueckenwind-dark-purple font-medium inline-flex items-center"
                >
                  Weiterlesen 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-rueckenwind-purple text-rueckenwind-purple hover:bg-rueckenwind-light-purple">
            <Link to="/glossar">Komplettes Glossar entdecken</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GlossarPreview;
