import React from 'react';
import {
  Cloud,
  Sun,
  CloudRain,
  Snowflake,
  Wind,
  BookOpen,
  FileText,
  Heart,
  Calendar,
  Bell,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface ToolResultProps {
  tool: string;
  result: any;
}

// Weather Component
const WeatherCard: React.FC<{ data: any }> = ({ data }) => {
  if (data.error) {
    return (
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4 text-center text-gray-500">
          {data.error}
        </CardContent>
      </Card>
    );
  }

  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes('regen') || lower.includes('schauer')) return CloudRain;
    if (lower.includes('schnee')) return Snowflake;
    if (lower.includes('bewölkt') || lower.includes('nebel')) return Cloud;
    if (lower.includes('wind')) return Wind;
    return Sun;
  };

  const WeatherIcon = getWeatherIcon(data.current?.condition || '');

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-blue-900 flex items-center gap-2">
          <Cloud className="h-4 w-4" />
          Wetter in {data.city}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-blue-900">
              {data.current?.temperature}°C
            </div>
            <div className="text-sm text-blue-700">
              {data.current?.condition}
            </div>
          </div>
          <WeatherIcon className="h-12 w-12 text-blue-400" />
        </div>

        {data.recommendation && (
          <div className="mt-3 p-2 bg-white/60 rounded-lg text-sm text-blue-800">
            💡 {data.recommendation}
          </div>
        )}

        {data.forecast && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {data.forecast.slice(0, 3).map((day: any, i: number) => (
              <div key={i} className="text-center p-2 bg-white/40 rounded-lg">
                <div className="text-xs text-blue-600">
                  {new Date(day.date).toLocaleDateString('de-DE', { weekday: 'short' })}
                </div>
                <div className="text-sm font-medium text-blue-900">
                  {day.tempMax}° / {day.tempMin}°
                </div>
                {day.rainProbability > 30 && (
                  <div className="text-xs text-blue-500">
                    🌧 {day.rainProbability}%
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Resources Component
const ResourcesCard: React.FC<{ data: any[] }> = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-purple-900 flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Passende Ressourcen
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        {data.map((resource, i) => (
          <Link
            key={i}
            to={resource.url}
            className="flex items-start gap-3 p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-colors group"
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
              resource.type === 'blog' ? 'bg-purple-100' : 'bg-pink-100'
            )}>
              {resource.type === 'blog' ? (
                <FileText className="h-4 w-4 text-purple-600" />
              ) : (
                <BookOpen className="h-4 w-4 text-pink-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-900 group-hover:text-purple-700 transition-colors">
                {resource.title}
              </div>
              {resource.excerpt && (
                <div className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                  {resource.excerpt}
                </div>
              )}
              <Badge variant="secondary" className="mt-1 text-[10px]">
                {resource.type === 'blog' ? 'Blog-Artikel' : 'Glossar'}
              </Badge>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-500 flex-shrink-0" />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

// Exercise Component
const ExerciseCard: React.FC<{ data: any }> = ({ data }) => {
  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-green-900 flex items-center gap-2">
            <Heart className="h-4 w-4" />
            {data.name}
          </CardTitle>
          {data.duration && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {data.duration}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-green-800 mb-3">{data.description}</p>

        {data.steps && (
          <div className="space-y-2">
            {data.steps.map((step: string, i: number) => (
              <div
                key={i}
                className="flex items-start gap-2 p-2 bg-white/60 rounded-lg"
              >
                <span className="w-5 h-5 rounded-full bg-green-200 text-green-700 text-xs font-medium flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-green-900">{step}</span>
              </div>
            ))}
          </div>
        )}

        {data.template && (
          <div className="mt-3 p-3 bg-white/60 rounded-lg border border-green-200">
            <div className="text-xs text-green-600 mb-1">Vorlage:</div>
            <div className="text-sm font-medium text-green-900 italic">
              "{data.template}"
            </div>
          </div>
        )}

        {data.tip && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <span className="text-sm text-yellow-800">💡 {data.tip}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Reminder Component
const ReminderCard: React.FC<{ data: any }> = ({ data }) => {
  if (!data.success) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
          <Bell className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <div className="font-medium text-amber-900">Erinnerung gesetzt</div>
          <div className="text-sm text-amber-700">
            {data.reminder?.message}
          </div>
          <div className="text-xs text-amber-500 mt-1">
            {new Date(data.reminder?.scheduledFor).toLocaleString('de-DE')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Appointment Component
const AppointmentCard: React.FC<{ data: any }> = ({ data }) => {
  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-violet-50 border-indigo-100">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <Calendar className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-indigo-900 mb-1">
              Persönliche Beratung
            </div>
            <p className="text-sm text-indigo-700 mb-3">
              {data.recommendation}
            </p>
            <Button
              asChild
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              <Link to={data.bookingUrl || '/kontakt'}>
                Termin vereinbaren
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Component
export const JanikeToolResult: React.FC<ToolResultProps> = ({ tool, result }) => {
  const renderToolResult = () => {
    switch (tool) {
      case 'get_weather':
        return <WeatherCard data={result} />;

      case 'search_resources':
        return <ResourcesCard data={result} />;

      case 'create_exercise':
        return <ExerciseCard data={result} />;

      case 'set_reminder':
        return <ReminderCard data={result} />;

      case 'offer_appointment':
        return <AppointmentCard data={result} />;

      default:
        return null;
    }
  };

  const component = renderToolResult();

  if (!component) return null;

  return (
    <div className="ml-11 mt-2">
      {component}
    </div>
  );
};
