
import React from 'react';
import { Button } from "@/components/ui/button";
import { Zap, RefreshCw, Loader2 } from 'lucide-react';

interface ImageGenerationButtonProps {
  onClick: () => void;
  isGenerating: boolean;
  hasImage: boolean;
  disabled: boolean;
  variant?: 'primary' | 'secondary';
}

const ImageGenerationButton: React.FC<ImageGenerationButtonProps> = ({
  onClick,
  isGenerating,
  hasImage,
  disabled,
  variant = 'primary'
}) => {
  const getButtonText = () => {
    if (isGenerating) {
      return 'Generiere...';
    }
    if (hasImage) {
      return 'Neues Bild generieren';
    }
    return 'Smart-Analyse starten';
  };

  const getIcon = () => {
    if (isGenerating) {
      return <Loader2 className="w-4 h-4 mr-2 animate-spin" />;
    }
    if (hasImage) {
      return <RefreshCw className="w-4 h-4 mr-2" />;
    }
    return <Zap className="w-4 h-4 mr-2" />;
  };

  const getVariant = () => {
    if (variant === 'secondary') {
      return 'outline';
    }
    return isGenerating ? 'secondary' : 'default';
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled || isGenerating}
      variant={getVariant()}
      size="sm"
      className={variant === 'primary' ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : ''}
    >
      {getIcon()}
      {getButtonText()}
    </Button>
  );
};

export default ImageGenerationButton;
