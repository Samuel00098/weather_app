import React from 'react';
import { Hour } from '@/lib/types';

interface HourlyForecastCardProps {
  hourlyData: Hour[];
}

const HourlyForecastCard: React.FC<HourlyForecastCardProps> = ({ hourlyData }) => {
  if (!hourlyData || hourlyData.length === 0) {
    return <p className="text-slate-400">No hourly forecast data available.</p>;
  }

  // Filter for relevant hours (e.g., every 3 hours for the next 18 hours from current time)
  const now = new Date();
  const relevantHours = hourlyData.filter(hour => {
    const hourDate = new Date(hour.time_epoch * 1000);
    return hourDate >= now && (hourDate.getHours() % 3 === 0 || hourDate.getHours() === now.getHours()); 
  }).slice(0, 6); // Take up to 6 entries

  const formatHour = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg text-slate-100 mt-8 w-full">
      <h3 className="text-lg font-semibold mb-6 text-slate-300">TODAY'S FORECAST</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
        {relevantHours.map((hour, index) => (
          <div key={index} className="flex flex-col items-center space-y-1">
            <p className="text-xs text-slate-400">{formatHour(hour.time)}</p>
            <img 
              src={hour.condition.icon} 
              alt={hour.condition.text} 
              className="w-10 h-10 my-1"
            />
            <p className="text-lg font-semibold">{Math.round(hour.temp_c)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecastCard;
