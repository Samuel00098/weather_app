import { WeatherData } from '@/lib/types';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard = ({ data }: WeatherCardProps) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg text-slate-100 w-full">
      {/* Top section: City, Chance of Rain, Big Temp, Weather Icon */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-4xl font-bold">{data.location.name}</h2>
          <p className="text-slate-400">Chance of rain: {data.current.humidity}%</p> {/* Using humidity as a proxy for chance of rain if not directly available */}
        </div>
        <img 
          src={data.current.condition.icon} 
          alt={data.current.condition.text} 
          className="w-24 h-24 -mt-4 -mr-4" // Adjusted for visual positioning
        />
      </div>
      <p className="text-7xl font-bold mb-8">{Math.round(data.current.temp_c)}°</p>

      {/* Air Conditions Section */}
      <div className="bg-slate-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-slate-300">AIR CONDITIONS</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <p className="text-slate-400">Real Feel</p>
            <p className="text-xl font-semibold">{Math.round(data.current.feelslike_c)}°</p>
          </div>
          <div>
            <p className="text-slate-400">Wind</p>
            <p className="text-xl font-semibold">{data.current.wind_kph} km/h</p>
          </div>
          <div>
            <p className="text-slate-400">Chance of rain</p> {/* Repeated for layout, using humidity */}
            <p className="text-xl font-semibold">{data.current.humidity}%</p>
          </div>
          <div>
            <p className="text-slate-400">UV Index</p>
            <p className="text-xl font-semibold">{data.current.uv}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
