
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Calendar } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from '@/services/blogService';
import BlogMarkdownRenderer from './BlogMarkdownRenderer';

interface BlogPreviewProps {
  post: BlogPost;
  showExcerpt?: boolean;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ post, showExcerpt = true }) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        {post.image_url && (
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img 
              src={post.image_url} 
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.created_at).toLocaleDateString('de-DE')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.reading_time} Min.</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary">{post.category_label}</Badge>
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
