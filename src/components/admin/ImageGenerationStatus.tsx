
import React from 'react';
import { Loader2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ImageGenerationStatusProps {
  isGenerating: boolean;
  hasImage: boolean;
  error: string | null;
  onRetry: () => void;
  onClear: () => void;
}

const ImageGenerationStatus: React.FC<ImageGenerationStatusProps> = ({
  isGenerating,
  hasImage,
  error,
  onRetry,
  onClear
}) => {
  if (isGenerating) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <div>
            <p className="font-medium text-blue-900">Bild wird generiert...</p>
            <p className="text-sm text-blue-700">Dies kann 30-60 Sekunden dauern</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>Fehler bei der Bildgenerierung: {error}</span>
          <Button onClick={onRetry} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-1" />
            Erneut versuchen
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (hasImage) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="font-medium text-green-900">Bild erfolgreich generiert!</p>
          </div>
          <Button onClick={onClear} variant="outline" size="sm">
            Bild entfernen
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default ImageGenerationStatus;
