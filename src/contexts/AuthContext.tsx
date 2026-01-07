
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signInWithGoogle: () => Promise<{ error?: any }>;
  signUp: (email: string, password: string, metadata?: { full_name?: string }) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const adminCacheRef = useRef<{ userId: string; isAdmin: boolean } | null>(null);
  const { toast } = useToast();

  // Get admin status - first from JWT claims, then fallback to DB
  const getAdminStatus = async (currentSession: Session | null, userId: string): Promise<boolean> => {
    // Check cache first
    if (adminCacheRef.current?.userId === userId) {
      console.log('Using cached admin status:', adminCacheRef.current.isAdmin);
      return adminCacheRef.current.isAdmin;
    }

    // Try JWT claims first (instant, no network request)
    const jwtAdmin = currentSession?.user?.app_metadata?.is_admin;
    if (typeof jwtAdmin === 'boolean') {
      console.log('Admin status from JWT claims:', jwtAdmin);
      adminCacheRef.current = { userId, isAdmin: jwtAdmin };
      return jwtAdmin;
    }

    // Fallback: Check database with timeout
    console.log('JWT claims not available, checking database...');
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .single()
        .abortSignal(controller.signal);

      clearTimeout(timeoutId);

      if (error) {
        console.error('Error checking admin status from DB:', error);
        return false;
      }

      const adminStatus = data?.is_admin || false;
      console.log('Admin status from DB:', adminStatus);
      adminCacheRef.current = { userId, isAdmin: adminStatus };
      return adminStatus;
    } catch (error) {
      console.error('Admin check failed:', error);
      return false;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      console.log('Initializing auth...');
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        console.log('Session result:', { session: session?.user?.email, error: sessionError });

        if (!isMounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        // Check admin status
        if (session?.user) {
          const adminStatus = await getAdminStatus(session, session.user.id);
          if (isMounted) setIsAdmin(adminStatus);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        console.log('Auth initialization complete');
        if (isMounted) setLoading(false);
      }
    };

    initializeAuth();

    // Auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);

        if (!isMounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const adminStatus = await getAdminStatus(session, session.user.id);
          if (isMounted) setIsAdmin(adminStatus);
        } else {
          setIsAdmin(false);
          adminCacheRef.current = null;
        }

        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Anmeldung fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Erfolgreich angemeldet",
        description: "Willkommen zurück!",
      });

      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        toast({
          title: "Google-Anmeldung fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error('Google sign in error:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, metadata?: { full_name?: string }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast({
          title: "Registrierung fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Registrierung erfolgreich",
        description: "Bitte bestätigen Sie Ihre E-Mail-Adresse.",
      });

      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast({
          title: "Abmeldung fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setUser(null);
        setSession(null);
        setIsAdmin(false);
        adminCacheRef.current = null;
        toast({
          title: "Erfolgreich abgemeldet",
          description: "Auf Wiedersehen!",
        });
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const value = {
    user,
    session,
    loading,
    isAdmin,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
