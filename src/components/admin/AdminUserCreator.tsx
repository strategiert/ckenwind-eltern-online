
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Shield, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CreateResult {
  email: string;
  status: string;
  message: string;
}

const AdminUserCreator: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [results, setResults] = useState<CreateResult[]>([]);
  const { toast } = useToast();

  const createAdminUsers = async () => {
    setIsCreating(true);
    setResults([]);

    try {
      const { data, error } = await supabase.functions.invoke('create-admin-users', {
        body: {}
      });

      if (error) {
        throw error;
      }

      setResults(data.results || []);

      const successCount = data.results?.filter((r: CreateResult) => r.status === 'success' || r.status === 'updated').length || 0;
      
      if (successCount > 0) {
        toast({
          title: "Erfolg",
          description: `${successCount} Admin-Benutzer erfolgreich erstellt/aktualisiert.`,
        });
      } else {
        toast({
          title: "Warnung",
          description: "Keine Benutzer wurden erstellt. Siehe Details unten.",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error('Error creating admin users:', error);
      toast({
        title: "Fehler",
        description: "Fehler beim Erstellen der Admin-Benutzer.",
        variant: "destructive",
      });
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
        return <Shield className="w-5 h-5 text-gray-600" />;
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
        return 'text-gray-700 bg-gray-50 border-gray-200';
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
        </p>
        
        <Button 
          onClick={createAdminUsers}
          disabled={isCreating}
          className="w-full"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          {isCreating ? 'Erstelle Admin-Benutzer...' : 'Admin-Benutzer erstellen'}
        </Button>

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
