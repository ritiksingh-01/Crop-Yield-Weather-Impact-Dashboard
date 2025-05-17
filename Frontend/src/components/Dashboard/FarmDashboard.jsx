import React from 'react';
import { 
  Cloud, 
  Droplets, 
  Thermometer, 
  MapPin, 
  Sun, 
  CloudRain, 
  Wind,
  Sprout, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Map
} from 'lucide-react';

// Fixed WeatherCard component
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
    <div className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow h-full flex flex-col">
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
      
      {/* Main Content - Using flex-grow to take available space */}
      <div className="p-4 flex-grow flex flex-col justify-center">
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
      <div className="p-2 text-center border-t border-gray-100 mt-auto">
        <p className="text-xs text-gray-500">
          Last updated: {lastUpdated}
        </p>
      </div>
    </div>
  );
};

// Fixed CropYieldCard component
const CropYieldCard = ({
  cropType = "Rice",
  yieldValue = 4.8,
  unit = "t/ha",
  season = "Kharif",
  year = 2025,
  previousValue = 4.5,
  averageValue = 0,
  trend = 0.3,
}) => {
  // Determine trend icon and color
  const renderTrendIndicator = () => {
    if (trend > 0) {
      return <TrendingUp className="h-5 w-5 text-emerald-500" />;
    } else if (trend < 0) {
      return <TrendingDown className="h-5 w-5 text-rose-500" />;
    }
    return <Minus className="h-5 w-5 text-gray-400" />;
  };

  // Determine if current yield is good/bad compared to average
  const getYieldStatusColor = () => {
    if (!averageValue) return 'text-gray-900';
    return yieldValue >= averageValue ? 'text-emerald-600' : 'text-rose-600';
  };

  // Calculate percent change if previous value exists
  const percentChange = previousValue 
    ? ((yieldValue - previousValue) / previousValue * 100).toFixed(1)
    : null;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center">
          <Sprout className="h-5 w-5 text-emerald-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Crop Yield</h3>
        </div>
        <span className="text-sm font-medium px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
          {season} {year}
        </span>
      </div>
      
      <div className="p-6 flex-grow flex flex-col justify-center">
        <div className="flex items-center justify-center mb-4">
          <div className="relative inline-flex items-center justify-center p-3 rounded-full bg-emerald-50">
            <Sprout className="h-8 w-8 text-emerald-500" />
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-baseline">
            <h2 className={`text-5xl font-bold ${getYieldStatusColor()}`}>
              {yieldValue}
            </h2>
            <span className="text-2xl font-medium text-gray-500 ml-1">
              {unit}
            </span>
          </div>
          
          <p className="text-gray-700 font-medium mt-2 mb-4">
            {cropType}
          </p>
          
          {(previousValue || averageValue) && (
            <div className="grid grid-cols-2 gap-4 w-full mt-2">
              {previousValue && (
                <div className="text-center p-2 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500 mb-1">Previous</p>
                  <div className="flex items-center justify-center">
                    <p className="font-medium">{previousValue} {unit}</p>
                    {percentChange && (
                      <div className="flex items-center ml-2">
                        {renderTrendIndicator()}
                        <span className={trend > 0 ? 'text-emerald-600' : trend < 0 ? 'text-rose-600' : 'text-gray-500'}>
                          {Math.abs(percentChange)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {averageValue > 0 && (
                <div className="text-center p-2 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-500 mb-1">Average</p>
                  <p className="font-medium">{averageValue} {unit}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Visual yield status indicator at the bottom */}
      <div className="p-3 text-center bg-emerald-50 mt-auto">
        <p className="text-sm font-medium text-emerald-600">
          Infinity% above average
        </p>
      </div>
    </div>
  );
};

// Fixed MapVisualization component
const MapVisualization = ({
  selectedCrop = "Rice"
}) => {
  // Legend items
  const legendItems = [
    { color: '#ffffcc', label: 'Low' },
    { color: '#c2e699', label: 'Medium' },
    { color: '#78c679', label: 'Good' },
    { color: '#31a354', label: 'High' },
    { color: '#006837', label: 'Excellent' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center">
          <Map className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Uttar Pradesh Map</h3>
        </div>
        <span className="text-sm font-medium">{selectedCrop}</span>
      </div>
      
      {/* Map Container - Using flex-grow for equal height */}
      <div className="relative flex-grow" style={{ minHeight: "320px" }}>
        {/* Placeholder for map - Using img for demonstration */}
        <img 
          src="/api/placeholder/800/400" 
          alt="Uttar Pradesh Map"
          className="w-full h-full object-cover"
        />
        
        {/* Attribution positioned absolute */}
        <div className="absolute bottom-0 right-0 bg-white bg-opacity-70 px-1 text-xs z-10">
          © OpenStreetMap contributors
        </div>
      </div>
      
      {/* Legend */}
      <div className="p-2 border-t border-gray-100 flex items-center justify-between mt-auto">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-4 h-4 rounded-sm mr-1" style={{ backgroundColor: item.color }}></div>
            <span className="text-xs text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example dashboard layout combining all components
const FarmDashboard = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <WeatherCard />
      <CropYieldCard />
      <MapVisualization />
    </div>
  );
};

export default FarmDashboard;