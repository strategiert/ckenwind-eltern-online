
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KontaktHero from '@/components/kontakt/KontaktHero';
import KontaktFormular from '@/components/kontakt/KontaktFormular';
import KontaktInfos from '@/components/kontakt/KontaktInfos';
import KontaktFAQ from '@/components/kontakt/KontaktFAQ';

const Kontakt = () => {
  return (
    <>
      <Navbar />
      <main>
        <KontaktHero />
        
        {/* Contact Form and Information */}
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="order-2 lg:order-1">
                <KontaktInfos />
                <KontaktFAQ />
              </div>
              
              {/* Contact Form */}
              <div className="order-1 lg:order-2">
                <KontaktFormular />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Kontakt;
