import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import {
  Send,
  Heart,
  Plus,
  Loader2,
  Sparkles,
  ArrowDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { JanikeMessage } from './JanikeMessage';
import { JanikeWelcome } from './JanikeWelcome';
import { JanikeToolResult } from './JanikeToolResult';
import { JanikeTypingIndicator } from './JanikeTypingIndicator';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
  metadata?: {
    toolResults?: Array<{
      tool: string;
      result: any;
    }>;
  };
}

interface JanikeChatProps {
  className?: string;
  embedded?: boolean;
}

export const JanikeChat: React.FC<JanikeChatProps> = ({ className, embedded = false }) => {
  const [message, setMessage] = useState('');
  const [sessionId, setSessionId] = useState<string>('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
    }
  }, []);

  // Session management
  const getOrCreateSession = async () => {
    const storedSessionId = localStorage.getItem('janike-session-id');

    if (storedSessionId) {
      return storedSessionId;
    }

    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        title: 'Janike Beratung',
        user_id: null
      })
      .select()
      .single();

    if (data && !error) {
      localStorage.setItem('janike-session-id', data.id);
      return data.id;
    }
    throw new Error('Sitzung konnte nicht erstellt werden');
  };

  useEffect(() => {
    const initSession = async () => {
      try {
        const newSessionId = await getOrCreateSession();
        setSessionId(newSessionId);
      } catch (error) {
        console.error('Session init error:', error);
        toast({
          title: "Verbindungsfehler",
          description: "Bitte laden Sie die Seite neu.",
          variant: "destructive",
        });
      }
    };
    initSession();
  }, [toast]);

  // Fetch messages
  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ['janike-messages', sessionId],
    queryFn: async () => {
      if (!sessionId) return [];

      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as Message[];
    },
    enabled: !!sessionId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (userMessage: string) => {
      const { data, error } = await supabase.functions.invoke('janike-chat', {
        body: {
          message: userMessage,
          sessionId: sessionId,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['janike-messages', sessionId] });
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    },
    onError: (error) => {
      console.error('Send error:', error);
      toast({
        title: "Nachricht konnte nicht gesendet werden",
        description: "Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    },
  });

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sendMessageMutation.isPending]);

  // Scroll detection
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const isNearBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 100;
    setShowScrollButton(!isNearBottom);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle send
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sendMessageMutation.isPending) return;
    sendMessageMutation.mutate(message);
  };

  // Handle keyboard
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  // Start new conversation
  const startNewConversation = async () => {
    localStorage.removeItem('janike-session-id');
    const newSessionId = await getOrCreateSession();
    setSessionId(newSessionId);
    queryClient.invalidateQueries({ queryKey: ['janike-messages'] });
    toast({
      title: "Neue Unterhaltung",
      description: "Sie können jetzt ein neues Gespräch beginnen.",
    });
  };

  if (!sessionId) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-rueckenwind-purple" />
      </div>
    );
  }

  return (
    <Card className={cn(
      "flex flex-col bg-gradient-to-b from-white to-rueckenwind-light-purple/20 border-0 shadow-lg",
      embedded ? "h-full" : "h-[600px]",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rueckenwind-purple to-pink-500 flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Janike</h3>
            <p className="text-xs text-gray-500">Therapeutin & Beraterin</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={startNewConversation}
          className="text-gray-500 hover:text-gray-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Neu
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea
        className="flex-1 px-4"
        ref={scrollAreaRef}
        onScroll={handleScroll}
      >
        <div className="py-4 space-y-4">
          {messages.length === 0 && !messagesLoading ? (
            <JanikeWelcome />
          ) : (
            messages.map((msg) => (
              <div key={msg.id}>
                <JanikeMessage
                  role={msg.role}
                  content={msg.content}
                  timestamp={msg.created_at}
                />
                {msg.metadata?.toolResults?.map((toolResult, index) => (
                  <JanikeToolResult
                    key={`${msg.id}-tool-${index}`}
                    tool={toolResult.tool}
                    result={toolResult.result}
                  />
                ))}
              </div>
            ))
          )}

          {sendMessageMutation.isPending && (
            <JanikeTypingIndicator />
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-24 right-6 rounded-full shadow-lg"
          onClick={scrollToBottom}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}

      {/* Input */}
      <CardContent className="p-4 border-t bg-white/80 backdrop-blur-sm">
        <form onSubmit={handleSend} className="flex gap-2">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                adjustTextareaHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Schreiben Sie Janike..."
              disabled={sendMessageMutation.isPending}
              className="min-h-[44px] max-h-[150px] resize-none pr-12 rounded-xl border-gray-200 focus:border-rueckenwind-purple focus:ring-rueckenwind-purple/20"
              rows={1}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!message.trim() || sendMessageMutation.isPending}
              className="absolute right-2 bottom-2 h-8 w-8 rounded-lg bg-rueckenwind-purple hover:bg-rueckenwind-dark-purple disabled:opacity-50"
            >
              {sendMessageMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400">
          <Sparkles className="h-3 w-3" />
          <span>Powered by Rückenwind Eltern</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default JanikeChat;
