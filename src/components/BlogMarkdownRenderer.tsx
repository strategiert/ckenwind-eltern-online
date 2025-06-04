
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface BlogMarkdownRendererProps {
  content: string;
  className?: string;
}

const BlogMarkdownRenderer: React.FC<BlogMarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-medium mt-5 mb-2 text-gray-700">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 text-gray-600 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-gray-600">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-600">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="mb-1">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-800">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-700">{children}</em>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default BlogMarkdownRenderer;
