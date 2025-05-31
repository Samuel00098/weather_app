'use client';

import SearchBox from '@/components/SearchBox';
import WeatherCard from '@/components/WeatherCard';
import DailyForecastCard from '@/components/DailyForecastCard';
import HourlyForecastCard from '@/components/HourlyForecastCard';
import { WeatherData, WeatherError } from '@/lib/types';
import { useState, useEffect } from 'react';

async function getWeatherData(location: string): Promise<WeatherData | WeatherError> {
  const apiKey = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
  if (!apiKey) {
    console.error('Weather API key is not defined.');
    return { error: { code: -1, message: 'API key not configured.' } };
  }
  // Ensure 'days=7' is part of the API call to get forecast data
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      const errorData = await res.json();
      return { error: { code: res.status, message: errorData.error.message || 'Failed to fetch weather data' } };
    }
    const data: WeatherData = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return { error: { code: 0, message: 'An unexpected error occurred.' } };
  }
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState('London'); // Default location

  const handleSearch = async (searchLocation: string) => {
    if (!searchLocation) return;
    setIsLoading(true);
    setError(null);
    const result = await getWeatherData(searchLocation);
    if ('error' in result) {
      setError(result.error.message);
      setWeatherData(null);
    } else {
      setWeatherData(result);
      setLocation(searchLocation);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleSearch(location);
  }, []);

  return (
    <main className="p-6 sm:p-8 md:p-10">
      <div className="mb-8">
        <SearchBox onSearch={handleSearch} isLoading={isLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {isLoading && <p className="text-center text-slate-300 py-10">Loading weather data...</p>}
          {error && <p className="text-center text-red-400 py-10">Error: {error}</p>}
          {weatherData && !isLoading && !error && (
            <>
              <WeatherCard data={weatherData} />
              {weatherData.forecast && weatherData.forecast.forecastday[0] && (
                <HourlyForecastCard hourlyData={weatherData.forecast.forecastday[0].hour} />
              )}
            </>
          )}
          {!weatherData && !isLoading && !error && (
            <p className="text-center text-slate-400 py-10">Search for a city to see the weather.</p>
          )}
        </div>

        <div className="lg:col-span-1">
          {weatherData && weatherData.forecast && !isLoading && !error && (
            <DailyForecastCard forecastDays={weatherData.forecast.forecastday} />
          )}
           {(isLoading || error) && (
            <div className="bg-slate-800 p-6 rounded-lg text-slate-100 w-full h-full flex items-center justify-center">
              <p className="text-slate-400">
                {isLoading ? 'Loading forecast...' : 'Forecast data unavailable.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
