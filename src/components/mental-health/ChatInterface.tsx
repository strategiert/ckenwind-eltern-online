
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

interface ChatInterfaceProps {
  messages: Message[];
  isLoading?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change or when loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);
  
  return (
    <Card className="border-0 shadow-none bg-transparent h-full">
      <CardContent className="p-0 h-full">
        <ScrollArea className="h-full p-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gradient-to-br from-pink-100 to-rueckenwind-light-purple p-6 rounded-xl mb-6 inline-block">
                <Heart className="h-16 w-16 mx-auto text-rueckenwind-purple" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-rueckenwind-dark-purple">
                Willkommen in Ihrem sicheren Raum
              </h3>
              <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                Teilen Sie gerne mit, was Sie beschäftigt. Ich bin hier, um Ihnen zuzuhören und Sie zu unterstützen.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-rueckenwind-purple to-rueckenwind-dark-purple rounded-xl flex items-center justify-center shadow-sm">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] p-4 rounded-xl shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-rueckenwind-purple to-rueckenwind-dark-purple text-white rounded-br-md'
                        : 'bg-white text-gray-800 rounded-bl-md border border-rueckenwind-soft-gray'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    <span className={`text-xs mt-3 block ${
                      msg.role === 'user' ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {new Date(msg.created_at).toLocaleTimeString('de-DE', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  {msg.role === 'user' && (
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center shadow-sm">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-rueckenwind-purple to-rueckenwind-dark-purple rounded-xl flex items-center justify-center shadow-sm">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-white p-4 rounded-xl rounded-bl-md border border-rueckenwind-soft-gray shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-rueckenwind-purple rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-rueckenwind-purple rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-rueckenwind-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
