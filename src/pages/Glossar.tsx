
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlossarHero from '@/components/glossar/GlossarHero';
import GlossarContent from '@/components/glossar/GlossarContent';

const Glossar = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <>
      <Helmet>
        <title>Glossar | Rückenwind Eltern</title>
        <meta 
          name="description" 
          content="Umfassendes Glossar zu den Themen Eltern-Burnout, ADHS bei Kindern und Essstörungen. Fachbegriffe und Definitionen für Eltern erklärt." 
        />
      </Helmet>
      <Navbar />
      <main className="min-h-screen">
        <GlossarHero />
        <GlossarContent 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </main>
      <Footer />
    </>
  );
};

export default Glossar;
