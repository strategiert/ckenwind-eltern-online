
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Shield, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CreateResult {
  email: string;
  status: string;
  message: string;
}

interface FunctionResponse {
  success: boolean;
  results?: CreateResult[];
  debug?: {
    timestamp: string;
    totalUsers: number;
    triggerExists: boolean;
  };
  error?: string;
}

const AdminUserCreator: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [results, setResults] = useState<CreateResult[]>([]);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const { toast } = useToast();

  const createAdminUsers = async () => {
    setIsCreating(true);
    setResults([]);
    setDebugInfo(null);

    try {
      console.log('Invoking create-admin-users function...');
      
      const { data, error } = await supabase.functions.invoke('create-admin-users', {
        body: {}
      });

      console.log('Function response:', { data, error });

      if (error) {
        console.error('Function invocation error:', error);
        throw new Error(`Function error: ${error.message}`);
      }

      const response: FunctionResponse = data;
      
      if (!response.success) {
        throw new Error(response.error || 'Unknown function error');
      }

      setResults(response.results || []);
      setDebugInfo(response.debug);

      const successCount = response.results?.filter((r: CreateResult) => 
        r.status === 'success' || r.status === 'updated'
      ).length || 0;
      
      if (successCount > 0) {
        toast({
          title: "Erfolg",
          description: `${successCount} Admin-Benutzer erfolgreich erstellt/aktualisiert.`,
        });
      } else {
        toast({
          title: "Warnung",
          description: "Keine Benutzer wurden erfolgreich erstellt. Siehe Details unten.",
          variant: "destructive",
        });
      }

    } catch (error: any) {
      console.error('Error creating admin users:', error);
      toast({
        title: "Fehler",
        description: `Fehler beim Erstellen der Admin-Benutzer: ${error.message}`,
        variant: "destructive",
      });
      
      // Add error to results for display
      setResults([{
        email: 'Systemfehler',
        status: 'error',
        message: error.message
      }]);
    } finally {
      setIsCreating(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'updated':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
      case 'created_no_admin':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
      case 'updated':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'error':
      case 'created_no_admin':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Admin-Benutzer erstellen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Erstellt die erforderlichen Admin-Benutzer für das System.
          <br />
          <strong>Benutzer:</strong> klaus@strategiert.com, nieke1989@gmail.com
        </p>
        
        <Button 
          onClick={createAdminUsers}
          disabled={isCreating}
          className="w-full"
        >
          {isCreating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Erstelle Admin-Benutzer...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-2" />
              Admin-Benutzer erstellen
            </>
          )}
        </Button>

        {debugInfo && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <h5 className="font-medium text-sm text-blue-800 mb-2">Debug-Informationen:</h5>
            <div className="text-xs text-blue-700 space-y-1">
              <div>Zeitstempel: {debugInfo.timestamp}</div>
              <div>Verarbeitete Benutzer: {debugInfo.totalUsers}</div>
              <div>Trigger existiert: {debugInfo.triggerExists ? 'Ja' : 'Nein'}</div>
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Ergebnisse:</h4>
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-md border ${getStatusColor(result.status)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <span className="font-medium text-sm">{result.email}</span>
                  </div>
                  <span className="text-xs font-medium uppercase">
                    {result.status}
                  </span>
                </div>
                <p className="text-xs mt-1">{result.message}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUserCreator;
