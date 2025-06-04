
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/seo/SEOHead';
import ElternCloudHero from '@/components/eltern-cloud/ElternCloudHero';
import ElternCloudOverview from '@/components/eltern-cloud/ElternCloudOverview';
import ElternCloudFeatures from '@/components/eltern-cloud/ElternCloudFeatures';
import ElternCloudPricing from '@/components/eltern-cloud/ElternCloudPricing';
import ElternCloudGuarantees from '@/components/eltern-cloud/ElternCloudGuarantees';
import ElternCloudCTA from '@/components/eltern-cloud/ElternCloudCTA';

const ElternCloud = () => {
  return (
    <>
      <SEOHead
        title="Rückenwind Eltern-Cloud | Therapie in der Cloud"
        description="Professionelle Hilfe für Eltern bei Burnout, ADHS und Essstörungen - 24/7 verfügbar. Über 300 Videos, Online-Kurse, Community und persönliche Begleitung."
        keywords="Eltern-Cloud, Online-Therapie, Eltern-Burnout, ADHS-Hilfe, Essstörungen, Online-Kurse, Elternberatung"
        url="https://rueckenwind-eltern.de/eltern-cloud"
        type="website"
      />
      
      <Navbar />
      <main>
        <ElternCloudHero />
        <ElternCloudOverview />
        <ElternCloudFeatures />
        <ElternCloudPricing />
        <ElternCloudGuarantees />
        <ElternCloudCTA />
      </main>
      <Footer />
    </>
  );
};

export default ElternCloud;

