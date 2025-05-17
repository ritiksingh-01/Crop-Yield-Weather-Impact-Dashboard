import React from 'react';
import { 
  Cloud, 
  Droplets, 
  Thermometer, 
  MapPin, 
  Sun, 
  CloudRain, 
  Wind 
} from 'lucide-react';

const WeatherCard = ({
  temperature = 32,
  rainfall = 45,
  humidity = 78,
  location = "Lucknow, UP",
  condition = "Sunny",
  windSpeed = 8,
  feelsLike = 26,
  lastUpdated = "12:30 PM"
}) => {
  // Helper function to determine weather icon based on condition
  const getWeatherIcon = () => {
    switch(condition.toLowerCase()) {
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'sunny':
      default:
        return <Sun className="h-8 w-8 text-amber-500" />;
    }
  };
  
  // Determine temperature color based on value
  const getTempColor = () => {
    if (temperature >= 30) return 'text-red-600';
    if (temperature >= 20) return 'text-orange-500';
    if (temperature >= 10) return 'text-emerald-500';
    return 'text-blue-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full overflow-hidden">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center">
          <Cloud className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Weather Summary</h3>
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 text-gray-500 mr-1" />
          <span className="text-sm font-medium px-2 py-1 text-gray-700">
            {location}
          </span>
        </div>
      </div>
      
      {/* Main Content - More compact layout */}
      <div className="p-4">
        <div className="flex justify-center items-center mb-4">
          <div className="text-center mr-6">
            {getWeatherIcon()}
            <p className="text-sm mt-1">{condition}</p>
          </div>
          
          <div className="flex items-baseline">
            <h2 className={`text-5xl font-bold ${getTempColor()}`}>
              {temperature}
            </h2>
            <span className="text-xl font-medium text-gray-500 ml-1">
              °C
            </span>
          </div>
        </div>
        
        {/* Two rows of stats */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          {/* Feels Like and Wind in first row */}
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 text-orange-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Feels Like</p>
              <p className="font-medium">{feelsLike}°C</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Wind className="h-5 w-5 text-gray-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Wind</p>
              <p className="font-medium">{windSpeed} km/h</p>
            </div>
          </div>
          
          {/* Rainfall and Humidity in second row */}
          <div className="flex items-center">
            <CloudRain className="h-5 w-5 text-blue-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Rainfall</p>
              <p className="font-medium">{rainfall} mm</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Droplets className="h-5 w-5 text-cyan-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Humidity</p>
              <p className="font-medium">{humidity}%</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="p-2 text-center border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Last updated: {lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;