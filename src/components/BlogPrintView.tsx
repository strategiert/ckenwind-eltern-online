
import React from 'react';
import { Button } from "@/components/ui/button";
import { Printer } from 'lucide-react';

interface BlogPost {
  title: string;
  content: string;
  date: string;
  author?: string;
  categoryLabel: string;
  imageUrl: string;
  excerpt: string;
}

interface BlogPrintViewProps {
  post: BlogPost;
}

const BlogPrintView: React.FC<BlogPrintViewProps> = ({ post }) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${post.title} - Rückenwind Eltern</title>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Georgia, serif;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              color: #333;
            }
            .header {
              border-bottom: 2px solid #6366f1;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 18px;
              font-weight: bold;
              color: #6366f1;
              margin-bottom: 10px;
            }
            .title {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 10px;
              line-height: 1.2;
            }
            .meta {
              color: #666;
              font-size: 14px;
              margin-bottom: 20px;
            }
            .excerpt {
              font-style: italic;
              color: #555;
              margin-bottom: 30px;
              padding: 15px;
              background: #f8f9fa;
              border-left: 4px solid #6366f1;
            }
            .content {
              font-size: 16px;
            }
            .content h2 {
              font-size: 22px;
              margin-top: 30px;
              margin-bottom: 15px;
              color: #6366f1;
            }
            .content h3 {
              font-size: 18px;
              margin-top: 25px;
              margin-bottom: 12px;
              color: #6366f1;
            }
            .content p {
              margin-bottom: 15px;
            }
            .content ul, .content ol {
              margin-bottom: 15px;
              padding-left: 30px;
            }
            .content li {
              margin-bottom: 8px;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
            @media print {
              body { margin: 0; padding: 15px; }
              .header { page-break-inside: avoid; }
              .title { page-break-after: avoid; }
              h2, h3 { page-break-after: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Rückenwind Eltern</div>
            <h1 class="title">${post.title}</h1>
            <div class="meta">
              Von ${post.author || 'Janike Arent'} • ${post.date} • Kategorie: ${post.categoryLabel}
            </div>
          </div>
          
          <div class="excerpt">
            ${post.excerpt}
          </div>
          
          <div class="content">
            ${post.content}
          </div>
          
          <div class="footer">
            <p>© Rückenwind Eltern • www.rueckenwind-eltern.de</p>
            <p>Dieser Artikel wurde am ${new Date().toLocaleDateString('de-DE')} gedruckt.</p>
          </div>
          
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePrint}
      className="flex items-center gap-2"
    >
      <Printer className="w-4 h-4" />
      Artikel drucken
    </Button>
  );
};

export default BlogPrintView;
