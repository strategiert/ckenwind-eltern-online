import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { href: '/', label: 'Start' },
    { href: '/ueber-mich', label: 'Über mich' },
    { href: '/blog', label: 'Blog' },
    { href: '/glossar', label: 'Glossar' },
    { href: '/gratis-buch', label: 'Gratis Buch' },
    { href: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-rueckenwind-purple">Rückenwind Eltern</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-rueckenwind-purple bg-rueckenwind-light-purple'
                    : 'text-gray-700 hover:text-rueckenwind-purple hover:bg-rueckenwind-light-purple'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Admin Links for authenticated admin users */}
            {user && (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l">
                <Link
                  to="/admin/blog"
                  className="text-sm text-gray-500 hover:text-rueckenwind-purple"
                  title="Blog Admin"
                >
                  Blog Admin
                </Link>
                <Link
                  to="/admin/glossary"
                  className="text-sm text-gray-500 hover:text-rueckenwind-purple"
                  title="Glossary Admin"
                >
                  Glossar Admin
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-rueckenwind-purple bg-rueckenwind-light-purple'
                          : 'text-gray-700 hover:text-rueckenwind-purple hover:bg-rueckenwind-light-purple'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {/* Admin Links in Mobile Navigation */}
                  {user && (
                    <>
                      <Link
                        to="/admin/blog"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rueckenwind-purple hover:bg-rueckenwind-light-purple"
                        title="Blog Admin"
                      >
                        Blog Admin
                      </Link>
                      <Link
                        to="/admin/glossary"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-rueckenwind-purple hover:bg-rueckenwind-light-purple"
                        title="Glossar Admin"
                      >
                        Glossar Admin
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
