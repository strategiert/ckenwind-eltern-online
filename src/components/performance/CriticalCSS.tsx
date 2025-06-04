
import React from 'react';

const CriticalCSS: React.FC = () => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical CSS for above-the-fold content */
        .container-custom {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        @media (min-width: 768px) {
          .container-custom {
            padding: 0 2rem;
          }
        }
        
        .section-title {
          font-size: 2.25rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1rem;
          color: #1f2937;
        }
        
        @media (min-width: 768px) {
          .section-title {
            font-size: 3rem;
          }
        }
        
        .section-subtitle {
          font-size: 1.125rem;
          text-align: center;
          color: #6b7280;
          max-width: 42rem;
          margin: 0 auto;
        }
        
        .bg-rueckenwind-light-purple {
          background-color: #f3e8ff;
        }
        
        .text-rueckenwind-purple {
          color: #8b5cf6;
        }
        
        .bg-rueckenwind-purple {
          background-color: #8b5cf6;
        }
        
        .hover\\:bg-rueckenwind-dark-purple:hover {
          background-color: #7c3aed;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `
    }} />
  );
};

export default CriticalCSS;
