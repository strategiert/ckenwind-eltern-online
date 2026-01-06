import React from 'react';
import { Heart, MessageCircle, BookOpen, Calendar } from 'lucide-react';

const suggestions = [
  {
    text: "Mein Kind hat ständig Wutanfälle",
    icon: MessageCircle
  },
  {
    text: "Ich fühle mich als Elternteil überfordert",
    icon: Heart
  },
  {
    text: "Wie fördere ich die Selbstständigkeit?",
    icon: BookOpen
  },
  {
    text: "Tipps für besseren Schlaf",
    icon: Calendar
  }
];

interface JanikeWelcomeProps {
  onSuggestionClick?: (text: string) => void;
}

export const JanikeWelcome: React.FC<JanikeWelcomeProps> = ({ onSuggestionClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      {/* Avatar */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rueckenwind-purple via-pink-500 to-rueckenwind-light-purple flex items-center justify-center shadow-lg">
          <Heart className="h-10 w-10 text-white" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
          <span className="text-white text-xs">✓</span>
        </div>
      </div>

      {/* Welcome Text */}
      <h2 className="text-xl font-display font-semibold text-gray-900 mb-2">
        Hallo, ich bin Janike
      </h2>
      <p className="text-gray-600 max-w-sm mb-6 leading-relaxed">
        Als erfahrene Familientherapeutin bin ich hier, um Ihnen zuzuhören und
        Sie auf Ihrem Weg als Eltern zu unterstützen.
      </p>

      {/* Qualifications */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <span className="px-3 py-1 bg-rueckenwind-light-purple/50 text-rueckenwind-dark-purple text-xs rounded-full">
          20+ Jahre Erfahrung
        </span>
        <span className="px-3 py-1 bg-rueckenwind-light-purple/50 text-rueckenwind-dark-purple text-xs rounded-full">
          Fachautorin
        </span>
        <span className="px-3 py-1 bg-rueckenwind-light-purple/50 text-rueckenwind-dark-purple text-xs rounded-full">
          Kinderexpertin
        </span>
      </div>

      {/* Suggestions */}
      <div className="w-full max-w-md">
        <p className="text-xs text-gray-500 mb-3">Fragen Sie mich zum Beispiel:</p>
        <div className="grid grid-cols-1 gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick?.(suggestion.text)}
              className="flex items-center gap-3 w-full p-3 text-left text-sm text-gray-700 bg-white rounded-xl border border-gray-100 hover:border-rueckenwind-purple/30 hover:bg-rueckenwind-light-purple/10 transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-lg bg-rueckenwind-light-purple/30 flex items-center justify-center group-hover:bg-rueckenwind-purple/20 transition-colors">
                <suggestion.icon className="h-4 w-4 text-rueckenwind-purple" />
              </div>
              <span>{suggestion.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-gray-400 mt-6 max-w-xs">
        Ich ersetze keine professionelle Therapie. Bei akuten Krisen wenden Sie sich
        bitte an den Notdienst oder die Telefonseelsorge: 0800 111 0 111
      </p>
    </div>
  );
};
