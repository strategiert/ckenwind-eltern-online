
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Facebook, Twitter, Clock, User } from 'lucide-react';

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
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ post }) => {
  const getImageUrl = () => {
    if (post.imageUrl && post.imageUrl.trim() !== '') {
      return post.imageUrl;
    }
    return "https://images.unsplash.com/photo-1541199249251-f713e6145474?q=80&w=1974&auto=format&fit=crop";
  };

  const shareUrl = `${window.location.origin}/blog/${post.slug}`;

  return (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden relative">
        {post.featured && (
          <Badge className="absolute top-2 left-2 bg-rueckenwind-purple z-10">
            Featured
          </Badge>
        )}
        <img 
          src={getImageUrl()} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?q=80&w=1974&auto=format&fit=crop";
          }}
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-rueckenwind-purple text-xs">
            {post.categoryLabel}
          </Badge>
          {post.readingTime && (
            <div className="flex items-center text-gray-500 text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {post.readingTime} Min.
            </div>
          )}
        </div>
        <CardTitle className="text-xl font-display">
          <Link to={`/blog/${post.slug}`} className="hover:text-rueckenwind-purple transition-colors">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-gray-700 mb-3">
          {post.excerpt}
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
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
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <User className="w-3 h-3 mr-1" />
          {post.author || 'Janike Arent'} • {post.date}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Link to={`/blog/${post.slug}`} className="text-rueckenwind-purple font-medium hover:text-rueckenwind-dark-purple transition-colors flex items-center">
          Weiterlesen
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        <div className="flex space-x-2">
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rueckenwind-purple hover:text-rueckenwind-dark-purple transition-colors"
            aria-label="Auf Facebook teilen"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a 
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rueckenwind-purple hover:text-rueckenwind-dark-purple transition-colors"
            aria-label="Auf Twitter teilen"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogPreview;
