
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Twitter } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  slug: string;
}

interface BlogPreviewProps {
  post: BlogPost;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({
  post
}) => {
  const shareUrl = `${window.location.origin}/blog/${post.slug}`;

  return (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-display">
          <Link to={`/blog/${post.slug}`} className="hover:text-rueckenwind-purple transition-colors">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-gray-700">
          {post.excerpt}
        </p>
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
