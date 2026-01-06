import React from 'react';
import { Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JanikeMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Simple markdown-like formatting without external dependency
const formatContent = (text: string): React.ReactNode[] => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (listItems.length > 0 && listType) {
      const ListTag = listType;
      elements.push(
        <ListTag key={elements.length} className={cn(
          "mb-2 pl-4",
          listType === 'ul' ? "list-disc" : "list-decimal"
        )}>
          {listItems.map((item, i) => (
            <li key={i} className="mb-1">{formatInline(item)}</li>
          ))}
        </ListTag>
      );
      listItems = [];
      listType = null;
    }
  };

  const formatInline = (line: string): React.ReactNode => {
    // Process bold and italic markers
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

    if (parts.length === 1) {
      return line;
    }

    return parts.map((part, i) => {
      // Bold: **text**
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-rueckenwind-dark-purple">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Italic: *text*
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        return (
          <em key={i} className="text-gray-600">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      flushList();
      return;
    }

    // Headers
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h4 key={elements.length} className="font-semibold text-sm mb-1 mt-2">
          {formatInline(trimmed.slice(4))}
        </h4>
      );
      return;
    }
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h3 key={elements.length} className="font-semibold text-base mb-2 mt-3">
          {formatInline(trimmed.slice(3))}
        </h3>
      );
      return;
    }

    // Unordered list
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      listItems.push(trimmed.slice(2));
      return;
    }

    // Ordered list
    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      listItems.push(orderedMatch[1]);
      return;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote key={elements.length} className="border-l-2 border-rueckenwind-purple pl-3 italic text-gray-600 my-2">
          {formatInline(trimmed.slice(2))}
        </blockquote>
      );
      return;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p key={elements.length} className="mb-2 last:mb-0">
        {formatInline(trimmed)}
      </p>
    );
  });

  flushList();
  return elements;
};

export const JanikeMessage: React.FC<JanikeMessageProps> = ({
  role,
  content,
  timestamp
}) => {
  const isUser = role === 'user';

  return (
    <div className={cn(
      "flex gap-3",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isUser
          ? "bg-gray-200"
          : "bg-gradient-to-br from-rueckenwind-purple to-pink-500"
      )}>
        {isUser ? (
          <User className="h-4 w-4 text-gray-600" />
        ) : (
          <Heart className="h-4 w-4 text-white" />
        )}
      </div>

      {/* Message Bubble */}
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3",
        isUser
          ? "bg-rueckenwind-purple text-white rounded-br-md"
          : "bg-white shadow-sm border border-gray-100 rounded-bl-md"
      )}>
        {/* Content */}
        <div className={cn(
          "text-sm leading-relaxed",
          isUser ? "text-white" : "text-gray-800"
        )}>
          {isUser ? (
            <p className="m-0 whitespace-pre-wrap">{content}</p>
          ) : (
            formatContent(content)
          )}
        </div>

        {/* Timestamp */}
        <span className={cn(
          "text-[10px] mt-2 block",
          isUser ? "text-white/70" : "text-gray-400"
        )}>
          {new Date(timestamp).toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
    </div>
  );
};
