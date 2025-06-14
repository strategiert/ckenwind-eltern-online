import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';
import BlogPreview from '@/components/BlogPreview';
import GlossarPreview from '@/components/GlossarPreview';
import CTASection from '@/components/CTASection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/seo/SEOHead';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import RichSnippets from '@/components/seo/RichSnippets';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { blogPostsListing } from '@/data/blogPosts';

const Index = () => {
  // Get the first 3 blog posts for the homepage
  const recentBlogPosts = blogPostsListing.slice(0, 3);

  // Schema.org data for the website
  const websiteSchema = {
    name: "Rückenwind Eltern",
    url: "https://rueckenwind-eltern.de",
    description: "Wissenschaftlich fundierte und empathische Unterstützung für Eltern bei Burnout, ADHS und Essstörungen. Entdecken Sie Strategien für mehr Leichtigkeit im Familienalltag."
  };

  // Organization schema
  const organizationSchema = {
    name: "Rückenwind Eltern",
    description: "Digitale Plattform für Eltern-Unterstützung bei Burnout, ADHS und Essstörungen",
    url: "https://rueckenwind-eltern.de",
    logo: "https://rueckenwind-eltern.de/lovable-uploads/5a353323-d780-4159-976a-7e93624fb784.png",
    email: "kontakt@rueckenwind-eltern.de"
  };

  // Service schema for rich snippets
  const serviceSchema = {
    name: "Eltern-Unterstützung Services",
    description: "Umfassende Unterstützung für Familien bei verschiedenen Herausforderungen",
    services: [
      {
        name: "Eltern-Burnout Beratung",
        description: "Gezielte Unterstützung für erschöpfte Eltern mit praktischen Strategien"
      },
      {
        name: "ADHS-Beratung für Familien",
        description: "Verstehen und Umgang mit ADHS bei Kindern - Strategien für den Alltag"
      },
      {
        name: "Essstörungen Prävention",
        description: "Früherkennung und präventive Maßnahmen bei Essstörungen"
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Rückenwind Eltern | Unterstützung für Ihren Familienalltag"
        description="Wissenschaftlich fundierte und empathische Unterstützung für Eltern bei Burnout, ADHS und Essstörungen. Entdecken Sie Strategien für mehr Leichtigkeit im Familienalltag."
        keywords="Eltern-Burnout, ADHS, Essstörungen, Familienunterstützung, Erziehung, Janike Arent, Therapie, Elternberatung"
        url="https://rueckenwind-eltern.de"
        image="https://rueckenwind-eltern.de/lovable-uploads/5a353323-d780-4159-976a-7e93624fb784.png"
      />
      
      <SchemaMarkup type="website" data={websiteSchema} />
      <SchemaMarkup type="organization" data={organizationSchema} />
      <RichSnippets type="service" data={serviceSchema} />
      
      <Navbar />
      <main>
        <HeroSection />
        
        {/* About Rückenwind Eltern */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <h2 className="section-title">Das ist Rückenwind Eltern</h2>
            <p className="section-subtitle">Ihre digitale Unterstützung für mehr Leichtigkeit im Familienalltag</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <FeatureCard title="Eltern-Burnout" description="Gezielte Unterstützung für erschöpfte Eltern: Entdecken Sie Wege aus dem Burnout und zurück zu mehr Energie und Lebensfreude." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>} />
              <FeatureCard title="ADHS bei Kindern" description="Verstehen Sie ADHS besser und lernen Sie praktische Strategien, die Ihrem Kind helfen, sein volles Potenzial zu entfalten." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>} />
              <FeatureCard title="Essstörungen" description="Früherkennung, Prävention und Begleitung: Erfahren Sie, wie Sie als Eltern bei Essstörungen richtig handeln können." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>} />
            </div>
          </div>
        </section>
        
        {/* Expert Section */}
        <section className="py-16 md:py-24 bg-rueckenwind-soft-gray">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-rueckenwind-light-purple opacity-70 z-0"></div>
                  <img alt="Janike Arent" className="relative z-10 rounded-lg shadow-lg max-w-md mx-auto" src="/lovable-uploads/5a353323-d780-4159-976a-7e93624fb784.png" />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-rueckenwind-soft-blue opacity-60 z-0"></div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">Ihre Expertin: Janike Arent</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Mit über 20 Jahren Erfahrung und fundiertem Fachwissen unterstütze ich Sie als ausgebildete Therapeutin und dreifache Mutter dabei, die Herausforderungen des Familienalltags zu meistern.
                </p>
                <p className="text-lg text-gray-700 mb-8">
                  Ich verbinde wissenschaftliche Expertise mit praktischen Lösungen, die wirklich im Alltag funktionieren – weil ich selbst weiß, wie es ist, wenn Theorie auf Familienrealität trifft.
                </p>
                <Button asChild variant="outline" className="border-rueckenwind-purple text-rueckenwind-purple hover:bg-rueckenwind-light-purple">
                  <Link to="/ueber-mich">Mehr über mich erfahren</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Platform Features */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <h2 className="section-title">So unterstützen wir Sie</h2>
            <p className="section-subtitle">Unsere digitale Plattform bietet Ihnen alles, was Sie brauchen</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="h-14 w-14 bg-rueckenwind-light-purple rounded-full flex items-center justify-center text-rueckenwind-purple mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-medium mb-3">Mediathek</h3>
                <p className="text-gray-700">
                  Hunderte Videos und Artikel zu allen relevanten Themen, jederzeit verfügbar.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="h-14 w-14 bg-rueckenwind-light-purple rounded-full flex items-center justify-center text-rueckenwind-purple mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-medium mb-3">Online-Kurse</h3>
                <p className="text-gray-700">
                  Strukturierte Programme für nachhaltige Veränderungen in Ihrem Familienalltag.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="h-14 w-14 bg-rueckenwind-light-purple rounded-full flex items-center justify-center text-rueckenwind-purple mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-medium mb-3">Community</h3>
                <p className="text-gray-700">
                  Live Q&A Sessions mit Janike und Austausch mit anderen Eltern in ähnlichen Situationen.
                </p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="h-14 w-14 bg-rueckenwind-light-purple rounded-full flex items-center justify-center text-rueckenwind-purple mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-medium mb-3">App</h3>
                <p className="text-gray-700">
                  Ihr täglicher Begleiter mit Übungen und Tools für den Familienalltag.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* E-Book CTA */}
        <CTASection 
          title="Ihr erster Schritt: Gratis E-Book" 
          description="Holen Sie sich jetzt mein E-Book 'Wege aus dem elterlichen Burnout' und entdecken Sie sofort anwendbare Strategien für mehr Energie und Gelassenheit." 
          buttonText="Gratis E-Book sichern" 
          buttonLink="/gratis-buch" 
          imageUrl="/lovable-uploads/7d2ad28c-b24a-4328-9709-ff66596391f2.png"
          bgColor="bg-rueckenwind-light-purple" 
        />
        
        {/* Glossar Preview */}
        <GlossarPreview />
        
        {/* Testimonials */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <h2 className="section-title">Stimmen von Eltern</h2>
            <p className="section-subtitle">Was andere über Rückenwind Eltern sagen</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <TestimonialCard quote="Die Materialien und die Unterstützung von Janike haben mir geholfen, meinen Alltag mit einem ADHS-Kind komplett neu zu strukturieren. Endlich haben wir weniger Konflikte und mehr Freude miteinander." author="Maria S." role="Mutter eines 9-jährigen Sohnes" />
              <TestimonialCard quote="Ich stand kurz vor dem kompletten Burnout – Janikes Ansatz hat mir nicht nur geholfen, mich selbst wieder zu spüren, sondern auch praktische Wege gezeigt, wie ich meinen Alltag mit drei Kindern besser bewältigen kann." author="Thomas K." role="Vater von drei Kindern" />
              <TestimonialCard quote="Als wir die ersten Anzeichen einer Essstörung bei unserer Tochter bemerkten, wussten wir nicht, wohin. Die Ressourcen von Rückenwind Eltern waren ein Rettungsanker und haben uns durch diese herausfordernde Zeit geleitet." author="Sabine M." role="Mutter einer Teenagerin" />
            </div>
          </div>
        </section>
        
        {/* Blog Preview */}
        <section className="py-16 md:py-24 bg-rueckenwind-soft-gray">
          <div className="container-custom">
            <h2 className="section-title">Aktuelle Beiträge</h2>
            <p className="section-subtitle">Tipps und Erkenntnisse für Ihren Familienalltag</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {recentBlogPosts.map(post => <BlogPreview key={post.id} post={post} />)}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline" className="border-rueckenwind-purple text-rueckenwind-purple hover:bg-rueckenwind-light-purple">
                <Link to="/blog">Alle Beiträge ansehen</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* App CTA */}
        <CTASection title="Immer dabei: Die Rückenwind App" description="Laden Sie sich unsere App herunter und haben Sie praktische Tools, Übungen und Ihre persönlichen Ressourcen immer griffbereit." buttonText="App entdecken" buttonLink="#" bgColor="bg-white" />
      </main>
      <Footer />
    </>
  );
};

export default Index;
