import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the code from URL params
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const queryParams = new URLSearchParams(window.location.search);

        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const code = queryParams.get('code');
        const errorParam = queryParams.get('error');
        const errorDescription = queryParams.get('error_description');

        if (errorParam) {
          setError(errorDescription || errorParam);
          setTimeout(() => navigate('/auth/login'), 3000);
          return;
        }

        // If we have a code (PKCE flow), exchange it for a session
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            console.error('Error exchanging code for session:', exchangeError);
            setError(exchangeError.message);
            setTimeout(() => navigate('/auth/login'), 3000);
            return;
          }
        }

        // If we have tokens directly (implicit flow), the session should be set automatically
        // The onAuthStateChange listener in AuthContext will handle updating the state

        // Check if we have a valid session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Error getting session:', sessionError);
          setError(sessionError.message);
          setTimeout(() => navigate('/auth/login'), 3000);
          return;
        }

        if (session) {
          // Check if user is admin
          const { data: profile } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .single();

          // Redirect based on admin status
          if (profile?.is_admin) {
            navigate('/admin/blog', { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        } else {
          // No session found, redirect to login
          navigate('/auth/login', { replace: true });
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
        setTimeout(() => navigate('/auth/login'), 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rueckenwind-light-purple to-white">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">Anmeldung fehlgeschlagen</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Sie werden zur Anmeldeseite weitergeleitet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rueckenwind-light-purple to-white">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-rueckenwind-purple mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-gray-800 mb-2">Anmeldung wird abgeschlossen...</h1>
        <p className="text-gray-600">Bitte warten Sie einen Moment.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
