
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from 'lucide-react';

interface BlogFeaturedPost {
  id: string | number;
  title: string;
  excerpt?: string;
  date?: string;
  imageUrl?: string;
  slug: string;
  category?: string;
  categoryLabel?: string;
  tags?: string[];
  readingTime?: number;
  author?: string;
  featured?: boolean;
  // Also support Supabase format
  image_url?: string;
  category_label?: string;
  reading_time?: number;
  created_at?: string;
}

interface BlogFeaturedPostProps {
  post: BlogFeaturedPost;
}

const BlogFeaturedPost: React.FC<BlogFeaturedPostProps> = ({ post }) => {
  // Helper functions to get the right property regardless of format
  const getImageUrl = () => {
    const url = post.image_url || post.imageUrl;
    if (url && url.trim() !== '') {
      return url;
    }
    return "https://images.unsplash.com/photo-1541199249251-f713e6145474?q=80&w=1974&auto=format&fit=crop";
  };

  const getCategoryLabel = () => post.category_label || post.categoryLabel || '';
  const getReadingTime = () => post.reading_time || post.readingTime;
  const getDate = () => {
    if (post.created_at) {
      return new Date(post.created_at).toLocaleDateString('de-DE');
    }
    return post.date || '';
  };

  return (
    <Card className="overflow-hidden mb-8 border-2 border-rueckenwind-purple">
      <div className="relative">
        <Badge className="absolute top-4 left-4 bg-rueckenwind-purple z-10">
          Featured
        </Badge>
        <div className="h-64 md:h-80 overflow-hidden">
          <img 
            src={getImageUrl()} 
            alt={post.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?q=80&w=1974&auto=format&fit=crop";
            }}
          />
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          {getCategoryLabel() && (
            <Badge variant="outline" className="text-rueckenwind-purple">
              {getCategoryLabel()}
            </Badge>
          )}
          {getReadingTime() && (
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {getReadingTime()} Min. Lesezeit
            </div>
          )}
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-semibold">
          <Link to={`/blog/${post.slug}`} className="hover:text-rueckenwind-purple transition-colors">
            {post.title}
          </Link>
        </h2>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-lg mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <User className="w-4 h-4 mr-1" />
            {post.author || 'Janike Arent'} • {getDate()}
          </div>
          <Link 
            to={`/blog/${post.slug}`} 
            className="text-rueckenwind-purple font-medium hover:text-rueckenwind-dark-purple transition-colors"
          >
            Artikel lesen →
          </Link>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogFeaturedPost;
