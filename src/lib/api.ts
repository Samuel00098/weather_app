import { WeatherData, WeatherError } from './types';

const API_KEY = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getWeatherData = async (location: string): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('WeatherAPI key is not configured');
  }

  const response = await fetch(
    `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}`,
    { next: { revalidate: 300 } } // Cache for 5 minutes
  );

  const data = await response.json();

  if ('error' in data) {
    const errorData = data as WeatherError;
    throw new Error(errorData.error.message);
  }

  return data as WeatherData;
};
