
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  slug: string;
  category: string;
  categoryLabel: string;
  tags?: string[];
  readingTime?: number;
  author?: string;
  featured?: boolean;
}

interface BlogFeaturedPostProps {
  post: BlogPost;
}

const BlogFeaturedPost: React.FC<BlogFeaturedPostProps> = ({ post }) => {
  const getImageUrl = () => {
    if (post.imageUrl && post.imageUrl.trim() !== '') {
      return post.imageUrl;
    }
    return "https://images.unsplash.com/photo-1541199249251-f713e6145474?q=80&w=1974&auto=format&fit=crop";
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
          <Badge variant="outline" className="text-rueckenwind-purple">
            {post.categoryLabel}
          </Badge>
          {post.readingTime && (
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {post.readingTime} Min. Lesezeit
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
            {post.author || 'Janike Arent'} • {post.date}
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
