
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Calendar } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import BlogMarkdownRenderer from './BlogMarkdownRenderer';

interface BlogPreviewPost {
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

interface BlogPreviewProps {
  post: BlogPreviewPost;
  showExcerpt?: boolean;
  layout?: 'vertical' | 'horizontal';
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ post, showExcerpt = true, layout = 'vertical' }) => {
  // Helper functions to get the right property regardless of format
  const getImageUrl = () => post.image_url || post.imageUrl || '';
  const getCategoryLabel = () => post.category_label || post.categoryLabel || '';
  const getReadingTime = () => post.reading_time || post.readingTime;
  const getDate = () => {
    if (post.created_at) {
      return new Date(post.created_at).toLocaleDateString('de-DE');
    }
    return post.date || '';
  };

  if (layout === 'horizontal') {
    return (
      <Card className="group hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {getImageUrl() && (
              <div className="md:col-span-1">
                <div className="aspect-video md:aspect-square overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                  <img 
                    src={getImageUrl()} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            )}
            
            <div className={`p-6 ${getImageUrl() ? 'md:col-span-2' : 'md:col-span-3'}`}>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.author || 'Janike Arent'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{getDate()}</span>
                </div>
                {getReadingTime() && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{getReadingTime()} Min.</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-3">
                {getCategoryLabel() && (
                  <Badge variant="secondary">{getCategoryLabel()}</Badge>
                )}
                {post.featured && <Badge variant="default">Empfohlen</Badge>}
              </div>

              <Link to={`/blog/${post.slug}`} className="group">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>

              {showExcerpt && post.excerpt && (
                <BlogMarkdownRenderer 
                  content={post.excerpt}
                  className="text-gray-600 mb-4 line-clamp-2"
                />
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Vertical layout (default)
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        {getImageUrl() && (
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img 
              src={getImageUrl()} 
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{post.author || 'Janike Arent'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{getDate()}</span>
            </div>
            {getReadingTime() && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{getReadingTime()} Min.</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-3">
            {getCategoryLabel() && (
              <Badge variant="secondary">{getCategoryLabel()}</Badge>
            )}
            {post.featured && <Badge variant="default">Empfohlen</Badge>}
          </div>

          <Link to={`/blog/${post.slug}`} className="group">
            <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>

          {showExcerpt && post.excerpt && (
            <BlogMarkdownRenderer 
              content={post.excerpt}
              className="text-gray-600 mb-4 line-clamp-3"
            />
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogPreview;
