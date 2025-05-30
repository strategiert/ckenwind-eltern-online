
import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Heart, Brain, Plus, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/mental-health/ChatInterface';
import SymptomInsights from '@/components/mental-health/SymptomInsights';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

const MentalHealthChat = () => {
  const [message, setMessage] = useState('');
  const [sessionId, setSessionId] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Helper function to get stored session or create new one
  const getOrCreateSession = async () => {
    // Try to get existing session from localStorage
    const storedSessionId = localStorage.getItem('mental-health-session-id');
    
    if (storedSessionId) {
      return storedSessionId;
    } else {
      // Create new session
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert({
          title: 'Mental Health Support Chat',
          user_id: null // Anonymous for now
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
    const initSession = async () => {
      try {
        const newSessionId = await getOrCreateSession();
        setSessionId(newSessionId);
      } catch (error) {
        console.error('Failed to initialize session:', error);
        toast({
          title: "Fehler",
          description: "Sitzung konnte nicht gestartet werden. Bitte laden Sie die Seite neu.",
          variant: "destructive",
        });
      }
    };

    initSession();
  }, [toast]);

  // Fetch chat messages
  const { data: messages = [], isLoading: messagesLoading } = useQuery({
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
    enabled: !!sessionId,
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
      queryClient.invalidateQueries({ queryKey: ['symptom-assessments', sessionId] });
      setMessage('');
      // Focus back on input after sending
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
        description: "Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sendMessageMutation.isPending) return;
    
    sendMessageMutation.mutate(message);
  };

  // Start new conversation
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

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (!sessionId) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <Brain className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Ihr Support-Chat wird vorbereitet...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Mental Health Support Chat - Rückenwind Eltern</title>
        <meta name="description" content="Anonymer, vertraulicher Mental Health Support Chat mit KI-Assistent" />
      </Helmet>
      
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-8 w-8 text-pink-500" />
              <h1 className="text-3xl font-bold text-gray-800">Mental Health Support</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dies ist ein sicherer, anonymer Raum für mentale Gesundheitsunterstützung. Ich bin hier, um 
              zuzuhören, zu verstehen und einfühlsame Beratung zu bieten. Denken Sie daran, dass dies kein 
              Ersatz für professionelle psychische Gesundheitsversorgung ist.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="mb-6 border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Support Chat Sitzung
                    </div>
                    <div className="flex items-center gap-2">
                      {messages.length > 0 && (
                        <div className="flex items-center gap-1 text-sm opacity-90">
                          <MessageCircle className="h-4 w-4" />
                          <span>{messages.length} Nachrichten</span>
                        </div>
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
                  </CardTitle>
                </CardHeader>
                <ChatInterface 
                  messages={messages} 
                  isLoading={sendMessageMutation.isPending} 
                />
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-4">
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
                  
                  <div className="mt-4 text-xs text-gray-500 text-center">
                    <p>🔒 Dieses Gespräch ist vertraulich und anonymous</p>
                    <p>Für akute Krisen wenden Sie sich bitte an den Notdienst oder eine Krisenhotline</p>
                    {messages.length > 0 && (
                      <p className="mt-1">💡 Ihre Unterhaltung wird automatisch gespeichert</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Symptom Insights Sidebar */}
            <div className="lg:col-span-1">
              <SymptomInsights sessionId={sessionId} />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default MentalHealthChat;
