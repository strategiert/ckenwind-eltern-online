
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, className }) => {
  return (
    <Card className={cn("transition-all duration-300 hover:shadow-lg", className)}>
      <CardHeader>
        <div className="h-12 w-12 bg-rueckenwind-light-purple rounded-lg flex items-center justify-center text-rueckenwind-purple mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl font-display">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-700">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
