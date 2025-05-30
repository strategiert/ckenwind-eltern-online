
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

interface BlogPreviewProps {
  post: BlogPost;
  layout?: 'vertical' | 'horizontal';
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ post, layout = 'vertical' }) => {
  const getImageUrl = () => {
    if (post.imageUrl && post.imageUrl.trim() !== '') {
      return post.imageUrl;
    }
    return "https://images.unsplash.com/photo-1541199249251-f713e6145474?q=80&w=1974&auto=format&fit=crop";
  };

  if (layout === 'horizontal') {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div className="md:col-span-1">
            <div className="h-48 md:h-full overflow-hidden">
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
          <div className="md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-rueckenwind-purple">
                  <Link to={`/blog/category/${post.category}`} className="hover:underline">
                    {post.categoryLabel}
                  </Link>
                </Badge>
                {post.readingTime && (
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readingTime} Min.
                  </div>
                )}
              </div>
              <h3 className="text-xl font-display font-semibold">
                <Link to={`/blog/${post.slug}`} className="hover:text-rueckenwind-purple transition-colors">
                  {post.title}
                </Link>
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 line-clamp-3">
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
                  Lesen →
                </Link>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={getImageUrl()} 
          alt={post.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?q=80&w=1974&auto=format&fit=crop";
          }}
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-rueckenwind-purple">
            <Link to={`/blog/category/${post.category}`} className="hover:underline">
              {post.categoryLabel}
            </Link>
          </Badge>
          {post.readingTime && (
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {post.readingTime} Min.
            </div>
          )}
        </div>
        <h3 className="text-xl font-display font-semibold">
          <Link to={`/blog/${post.slug}`} className="hover:text-rueckenwind-purple transition-colors">
            {post.title}
          </Link>
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">
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
            Lesen →
          </Link>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogPreview;
