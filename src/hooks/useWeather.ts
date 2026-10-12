import { useQuery } from '@tanstack/react-query';

interface Weather {
  temperature: number;
  description: string;
}

const fetchWeather = async (): Promise<Weather> => {
  return new Promise<Weather>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );
          if (!response.ok) {
            reject('Failed to fetch weather');
            return;
          }
          const res = await response.json();
          const currentWeather = res.current_weather;
          resolve({
            temperature: currentWeather.temperature,
            description: getWeatherDescription(currentWeather.weathercode),
          });
        } catch (error) {
          reject(error);
        }
      },
      (err) => reject(err),
      { enableHighAccuracy: true }
    );
  });
};

export const useWeather = () => {
  return useQuery<Weather, Error>({
    queryKey: ['weather'],
    queryFn: fetchWeather,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
};

function getWeatherDescription(code: number): string {
  const map: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Drizzle',
    55: 'Heavy drizzle',
    61: 'Light rain',
    63: 'Rain',
    65: 'Heavy rain',
    71: 'Snow fall',
    80: 'Rain showers',
  };
  return map[code] || 'Unknown';
}
