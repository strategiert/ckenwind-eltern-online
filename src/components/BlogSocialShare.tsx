
import React from 'react';
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Link2, Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface BlogSocialShareProps {
  title: string;
  slug: string;
  excerpt?: string;
}

const BlogSocialShare: React.FC<BlogSocialShareProps> = ({ title, slug, excerpt }) => {
  const { toast } = useToast();
  const shareUrl = `${window.location.origin}/blog/${slug}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedExcerpt = encodeURIComponent(excerpt || '');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link kopiert!",
        description: "Der Link wurde in die Zwischenablage kopiert.",
      });
    } catch (err) {
      toast({
        title: "Fehler",
        description: "Der Link konnte nicht kopiert werden.",
        variant: "destructive",
      });
    }
  };

  const shareButtons = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-600',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-sky-500',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-blue-700',
    },
    {
      name: 'E-Mail',
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedExcerpt}%0A%0A${encodedUrl}`,
      color: 'hover:bg-gray-600',
    },
  ];

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-lg font-display font-medium">Artikel teilen</h3>
      <div className="flex flex-wrap gap-2">
        {shareButtons.map((button) => (
          <Button
            key={button.name}
            variant="outline"
            size="sm"
            asChild
            className={`transition-colors ${button.color} hover:text-white`}
          >
            <a
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <button.icon className="w-4 h-4" />
              {button.name}
            </a>
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="flex items-center gap-2 hover:bg-gray-100"
        >
          <Link2 className="w-4 h-4" />
          Link kopieren
        </Button>
      </div>
    </div>
  );
};

export default BlogSocialShare;
