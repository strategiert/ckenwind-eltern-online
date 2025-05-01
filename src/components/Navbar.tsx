
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-display font-semibold text-rueckenwind-purple">Rückenwind Eltern</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-rueckenwind-purple transition-colors">Home</Link>
            <Link to="/ueber-mich" className="text-gray-700 hover:text-rueckenwind-purple transition-colors">Über Mich</Link>
            <Link to="/blog" className="text-gray-700 hover:text-rueckenwind-purple transition-colors">Blog</Link>
            <Link to="/kontakt" className="text-gray-700 hover:text-rueckenwind-purple transition-colors">Kontakt</Link>
            <Button asChild className="bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple">
              <Link to="/gratis-buch">Gratis E-Book</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden fixed inset-x-0 bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-60 opacity-100 py-4" : "max-h-0 opacity-0"
        )}>
          <div className="container-custom flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-rueckenwind-purple transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/ueber-mich" 
              className="text-gray-700 hover:text-rueckenwind-purple transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Über Mich
            </Link>
            <Link 
              to="/blog" 
              className="text-gray-700 hover:text-rueckenwind-purple transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/kontakt" 
              className="text-gray-700 hover:text-rueckenwind-purple transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontakt
            </Link>
            <Button asChild className="bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple w-full">
              <Link 
                to="/gratis-buch"
                onClick={() => setIsMenuOpen(false)}
              >
                Gratis E-Book
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
