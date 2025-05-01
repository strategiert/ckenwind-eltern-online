
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-rueckenwind-light-purple pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-display font-medium mb-4">Rückenwind Eltern</h3>
            <p className="text-gray-700 mb-4">
              Wissenschaftlich fundierte, empathische Unterstützung und praktische Werkzeuge für mehr Leichtigkeit im Familienalltag.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/rueckenwindeltern/" target="_blank" rel="noopener noreferrer" className="text-rueckenwind-purple hover:text-rueckenwind-dark-purple">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/rueckenwindeltern/" target="_blank" rel="noopener noreferrer" className="text-rueckenwind-purple hover:text-rueckenwind-dark-purple">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.threads.com/@rueckenwindeltern" target="_blank" rel="noopener noreferrer" className="text-rueckenwind-purple hover:text-rueckenwind-dark-purple">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 192 192" aria-hidden="true">
                  <path fillRule="evenodd" d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7353 28.0793C19.4389 44.4864 13.0043 67.3157 13.0043 95.9325V96.0675C13.0043 124.684 19.4389 147.514 32.7353 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/>
                </svg>
              </a>
              <a href="https://x.com/Rueckenwind24" target="_blank" rel="noopener noreferrer" className="text-rueckenwind-purple hover:text-rueckenwind-dark-purple">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@rueckenwindeltern" target="_blank" rel="noopener noreferrer" className="text-rueckenwind-purple hover:text-rueckenwind-dark-purple">
                {/* TikTok icon as SVG since lucide-react doesn't have a TikTok icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="text-xl font-display font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-700 hover:text-rueckenwind-purple transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/ueber-mich" className="text-gray-700 hover:text-rueckenwind-purple transition-colors">Über Mich</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-700 hover:text-rueckenwind-purple transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-gray-700 hover:text-rueckenwind-purple transition-colors">Kontakt</Link>
              </li>
              <li>
                <Link to="/gratis-buch" className="text-gray-700 hover:text-rueckenwind-purple transition-colors">Gratis E-Book</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-display font-medium mb-4">Kontakt</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 text-rueckenwind-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:info@rueckenwind-eltern.de" className="text-gray-700 hover:text-rueckenwind-purple transition-colors">
                  info@rueckenwind-eltern.de
                </a>
              </li>
              <li className="mt-4">
                <p className="text-gray-700 mb-2">Folgen Sie uns:</p>
                <div className="flex space-x-3">
                  <a href="https://www.facebook.com/rueckenwindeltern/" target="_blank" rel="noopener noreferrer" className="text-rueckenwind-purple hover:text-rueckenwind-dark-purple">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/rueckenwindeltern/" target="_blank" rel="noopener noreferrer" className="text-rueckenwind-purple hover:text-rueckenwind-dark-purple">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://www.tiktok.com/@rueckenwindeltern" target="_blank" rel="noopener noreferrer" className="text-rueckenwind-purple hover:text-rueckenwind-dark-purple">
                    {/* TikTok icon as SVG */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright & Legal */}
        <div className="pt-6 border-t border-gray-200 text-center md:flex md:justify-between md:text-left">
          <p className="text-sm text-gray-600">© {currentYear} Rückenwind Eltern. Alle Rechte vorbehalten.</p>
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <Link to="/impressum" className="text-sm text-gray-600 hover:text-rueckenwind-purple transition-colors">Impressum</Link>
            <Link to="/datenschutz" className="text-sm text-gray-600 hover:text-rueckenwind-purple transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
