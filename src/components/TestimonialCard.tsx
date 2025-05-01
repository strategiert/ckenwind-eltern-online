
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role }) => {
  return (
    <Card className="h-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="pt-6 pb-2">
        <div className="mb-4 text-rueckenwind-purple">
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        <p className="text-gray-700 mb-6">{quote}</p>
      </CardContent>
      <CardFooter className="pt-2 pb-6 border-t">
        <div>
          <p className="font-medium">{author}</p>
          {role && <p className="text-sm text-gray-500">{role}</p>}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;
