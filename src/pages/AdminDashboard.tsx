import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  BookOpen,
  FileText,
  Sparkles,
  Eye,
  TrendingUp,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { useGlossaryStats } from '@/hooks/useGlossary';
import { useAllBlogPosts } from '@/hooks/useBlogPosts';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { data: glossaryStats } = useGlossaryStats();
  const { data: blogPosts } = useAllBlogPosts();

  const publishedPosts = blogPosts?.filter(p => p.published).length || 0;
  const draftPosts = blogPosts?.filter(p => !p.published).length || 0;

  const adminSections = [
    {
      title: 'Blog',
      description: 'Artikel erstellen, bearbeiten und verwalten',
      icon: FileText,
      href: '/admin/blog',
      color: 'bg-blue-500',
      stats: [
        { label: 'Veröffentlicht', value: publishedPosts },
        { label: 'Entwürfe', value: draftPosts },
      ]
    },
    {
      title: 'Glossar',
      description: 'Begriffe und Definitionen verwalten',
      icon: BookOpen,
      href: '/admin/glossary',
      color: 'bg-purple-500',
      stats: [
        { label: 'Begriffe', value: glossaryStats?.totalTerms || 0 },
        { label: 'Aufrufe', value: glossaryStats?.totalViews?.toLocaleString() || '0' },
      ]
    },
    {
      title: 'Content Automation',
      description: 'KI-generierte Inhalte und Queue verwalten',
      icon: Sparkles,
      href: '/admin/content-automation',
      color: 'bg-amber-500',
      stats: []
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-semibold flex items-center gap-3">
            <Shield className="w-8 h-8 text-rueckenwind-purple" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Willkommen, {user?.user_metadata?.full_name || user?.email}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{blogPosts?.length || 0}</p>
                  <p className="text-sm text-gray-500">Blog-Artikel</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{glossaryStats?.totalTerms || 0}</p>
                  <p className="text-sm text-gray-500">Glossar-Begriffe</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Eye className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{glossaryStats?.totalViews?.toLocaleString() || 0}</p>
                  <p className="text-sm text-gray-500">Glossar-Aufrufe</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{publishedPosts}</p>
                  <p className="text-sm text-gray-500">Veröffentlicht</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Sections */}
        <h2 className="text-xl font-semibold mb-4">Verwaltungsbereiche</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => (
            <Link key={section.href} to={section.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${section.color}`}>
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="mt-4">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                {section.stats.length > 0 && (
                  <CardContent>
                    <div className="flex gap-6">
                      {section.stats.map((stat, i) => (
                        <div key={i}>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Schnellzugriff</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
            <Link to="/admin/blog">
              <FileText className="w-5 h-5" />
              <span>Neuer Artikel</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
            <Link to="/admin/glossary">
              <BookOpen className="w-5 h-5" />
              <span>Neuer Begriff</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
            <Link to="/blog" target="_blank">
              <Eye className="w-5 h-5" />
              <span>Blog ansehen</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" asChild>
            <Link to="/glossar" target="_blank">
              <Eye className="w-5 h-5" />
              <span>Glossar ansehen</span>
            </Link>
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
