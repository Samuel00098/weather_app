import React from 'react';
import { ForecastDay } from '@/lib/types';

interface DailyForecastCardProps {
  forecastDays: ForecastDay[];
}

const DailyForecastCard: React.FC<DailyForecastCardProps> = ({ forecastDays }) => {
  if (!forecastDays || forecastDays.length === 0) {
    return <p className="text-slate-400">No forecast data available.</p>;
  }

  // Helper to get the day name
  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg text-slate-100 w-full">
      <h3 className="text-lg font-semibold mb-4 text-slate-300">7-DAY FORECAST</h3>
      <div className="space-y-3">
        {forecastDays.map((day, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-slate-700 last:border-b-0">
            <p className="w-1/4 text-sm text-slate-300 font-medium">
              {getDayName(day.date)}
            </p>
            <div className="w-1/4 flex items-center justify-center">
              <img 
                src={day.day.condition.icon} 
                alt={day.day.condition.text} 
                className="w-8 h-8 mr-2"
              />
              <p className="text-sm text-slate-300 hidden sm:block">{day.day.condition.text}</p>
            </div>
            <p className="w-1/4 text-right text-sm text-slate-300">
              {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecastCard;
