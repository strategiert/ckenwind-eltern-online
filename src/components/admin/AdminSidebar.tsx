import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  FileText,
  BookOpen,
  Sparkles,
  LogOut,
  Home,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: Shield,
    },
    {
      label: 'Blog',
      href: '/admin/blog',
      icon: FileText,
    },
    {
      label: 'Glossar',
      href: '/admin/glossary',
      icon: BookOpen,
    },
    {
      label: 'Content Automation',
      href: '/admin/content-automation',
      icon: Sparkles,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <Link to="/admin" className="flex items-center gap-2 text-rueckenwind-purple">
          <Shield className="w-6 h-6" />
          <span className="font-semibold">Admin Panel</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                  isActive(item.href)
                    ? 'bg-rueckenwind-purple text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <div className="text-sm text-gray-500 truncate px-3">
          {user?.email}
        </div>
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Zur Website</span>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={signOut}
        >
          <LogOut className="w-5 h-5" />
          <span>Abmelden</span>
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
