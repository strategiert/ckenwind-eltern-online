
import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Send, Heart, Brain, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ChatInterface from './ChatInterface';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [sessionId, setSessionId] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Helper function to get stored session or create new one
  const getOrCreateSession = async () => {
    const storedSessionId = localStorage.getItem('mental-health-session-id');
    
    if (storedSessionId) {
      return storedSessionId;
    } else {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert({
          title: 'Mental Health Support Chat',
          user_id: null
        })
        .select()
        .single();

      if (data && !error) {
        localStorage.setItem('mental-health-session-id', data.id);
        return data.id;
      }
      throw new Error('Failed to create session');
    }
  };

  // Create or get session on mount
  useEffect(() => {
    if (isOpen && !sessionId) {
      const initSession = async () => {
        try {
          const newSessionId = await getOrCreateSession();
          setSessionId(newSessionId);
        } catch (error) {
          console.error('Failed to initialize session:', error);
          toast({
            title: "Fehler",
            description: "Sitzung konnte nicht gestartet werden.",
            variant: "destructive",
          });
        }
      };

      initSession();
    }
  }, [isOpen, sessionId, toast]);

  // Fetch chat messages
  const { data: messages = [] } = useQuery({
    queryKey: ['chat-messages', sessionId],
    queryFn: async () => {
      if (!sessionId) return [];
      
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as ChatMessage[];
    },
    enabled: !!sessionId && isOpen,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (userMessage: string) => {
      const { data, error } = await supabase.functions.invoke('mental-health-chat', {
        body: {
          message: userMessage,
          sessionId: sessionId,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages', sessionId] });
      setMessage('');
      setTimeout(() => inputRef.current?.focus(), 100);
      toast({
        title: "Nachricht gesendet",
        description: "Ich bin hier, um Ihnen zuzuhören und Sie zu unterstützen.",
      });
    },
    onError: (error) => {
      console.error('Error sending message:', error);
      toast({
        title: "Fehler",
        description: "Nachricht konnte nicht gesendet werden.",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sendMessageMutation.isPending) return;
    
    sendMessageMutation.mutate(message);
  };

  const startNewConversation = async () => {
    try {
      localStorage.removeItem('mental-health-session-id');
      const newSessionId = await getOrCreateSession();
      setSessionId(newSessionId);
      toast({
        title: "Neue Unterhaltung gestartet",
        description: "Sie können jetzt ein neues Gespräch beginnen.",
      });
    } catch (error) {
      console.error('Failed to start new conversation:', error);
      toast({
        title: "Fehler",
        description: "Neue Unterhaltung konnte nicht gestartet werden.",
        variant: "destructive",
      });
    }
  };

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && sessionId) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, sessionId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-t-lg">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Mental Health Support
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <span className="text-sm opacity-90">{messages.length} Nachrichten</span>
              )}
              <Button
                onClick={startNewConversation}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Plus className="h-4 w-4 mr-1" />
                Neu
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          {sessionId ? (
            <>
              <div className="flex-1 min-h-0">
                <ChatInterface 
                  messages={messages} 
                  isLoading={sendMessageMutation.isPending} 
                />
              </div>

              <div className="p-4 border-t bg-white">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Teilen Sie mit, was Sie beschäftigt..."
                    disabled={sendMessageMutation.isPending}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={!message.trim() || sendMessageMutation.isPending}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    {sendMessageMutation.isPending ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
                
                <div className="mt-3 text-xs text-gray-500 text-center">
                  <p>🔒 Dieses Gespräch ist vertraulich und anonymous</p>
                  <p>Für akute Krisen wenden Sie sich bitte an den Notdienst oder eine Krisenhotline</p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Brain className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>Ihr Support-Chat wird vorbereitet...</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
