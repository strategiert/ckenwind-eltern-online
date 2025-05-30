
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, AlertCircle, TrendingUp } from 'lucide-react';

interface SymptomInsightsProps {
  sessionId: string;
}

const SymptomInsights: React.FC<SymptomInsightsProps> = ({ sessionId }) => {
  const { data: assessments } = useQuery({
    queryKey: ['symptom-assessments', sessionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('symptom_assessments')
        .select(`
          *,
          assessment_conditions (
            confidence_score,
            icd10_conditions (
              code,
              title,
              category
            )
          )
        `)
        .eq('session_id', sessionId);

      if (error) throw error;
      return data;
    },
    enabled: !!sessionId,
  });

  if (!assessments || assessments.length === 0) {
    return null;
  }

  const allSymptoms = assessments.flatMap(a => a.identified_symptoms || []);
  const uniqueSymptoms = [...new Set(allSymptoms)];
  
  const relatedConditions = assessments.flatMap(a => 
    a.assessment_conditions?.map(ac => ac.icd10_conditions) || []
  );

  return (
    <div className="space-y-4">
      {uniqueSymptoms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Brain className="h-4 w-4" />
              Identified Concerns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {uniqueSymptoms.map((symptom, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {symptom}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {relatedConditions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4" />
              Related Information (ICD-10)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {relatedConditions.slice(0, 3).map((condition, index) => (
                <div key={index} className="text-xs p-2 bg-blue-50 rounded border border-blue-200">
                  <div className="font-medium">{condition.code}: {condition.title}</div>
                  <div className="text-gray-600">{condition.category}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
              <div className="flex items-center gap-2 text-xs text-yellow-800">
                <AlertCircle className="h-3 w-3" />
                This is for informational purposes only. Please consult a healthcare professional.
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SymptomInsights;
