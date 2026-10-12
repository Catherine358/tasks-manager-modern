import { Card, CardContent } from './ui/card.tsx';
import { useWeather } from '../hooks/useWeather.ts';

export default function WeatherWidget() {
  const { data: weather, isLoading, error } = useWeather();

  if (isLoading)
    return (
      <Card className="border-0 relative flex flex-col items-center gap-4 rounded-xl px-6 py-4 shadow-lg bg-white">
        <CardContent>Loading weather...</CardContent>
      </Card>
    );
  if (error)
    return (
      <Card className="border-0 relative flex flex-col items-center gap-4 rounded-xl px-6 py-4 shadow-lg bg-white">
        <CardContent>Weather unavailable</CardContent>
      </Card>
    );
  if (!weather) return null;

  const weatherIconMap: Record<string, string> = {
    'Clear sky': '☀️',
    'Mainly clear': '🌤️',
    'Partly cloudy': '⛅',
    Overcast: '☁️',
    Rain: '🌧️',
    'Heavy rain': '🌧️💦',
    'Snow fall': '❄️',
    Foggy: '🌫️',
  };

  const icon = weatherIconMap[weather.description] || '❓';

  return (
    <Card className="border-0 relative flex flex-col items-center gap-4 rounded-xl px-6 py-4 shadow-lg bg-white">
      <span className="text-3xl" aria-hidden="true">
        {icon}
      </span>
      <CardContent className="flex flex-col">
        <span className="text-2xl font-bold text-blue-800">
          {weather.temperature}°C
        </span>
        <span className="text-gray-400 text-xs leading-none capitalize">
          {weather.description}
        </span>
      </CardContent>
    </Card>
  );
}
