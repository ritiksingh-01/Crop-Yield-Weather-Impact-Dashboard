import React from 'react';
import { BarChart2, Cloud, Thermometer, Droplets } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeatherImpactChart = ({
  data,
  year,
  region = "Midwest",
  averageRainfall = "45.2",
  averageTemperature = "24.6",
  rainfallTrend = 5.3, // positive for increase, negative for decrease
  temperatureTrend = 2.1 // positive for increase, negative for decrease
}) => {
  // Determine rainfall trend color
  const getRainfallTrendColor = () => {
    if (rainfallTrend > 0) return 'text-blue-600 dark:text-blue-400';
    if (rainfallTrend < 0) return 'text-amber-600 dark:text-amber-400';
    return 'text-gray-500 dark:text-gray-400';
  };

  // Determine temperature trend color
  const getTemperatureTrendColor = () => {
    if (temperatureTrend > 0) return 'text-rose-600 dark:text-rose-400';
    if (temperatureTrend < 0) return 'text-emerald-600 dark:text-emerald-400';
    return 'text-gray-500 dark:text-gray-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 h-full overflow-hidden">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <Cloud className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Weather Impact Analysis</h3>
        </div>
        <span className="text-sm font-medium px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
          {year}
        </span>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Region</p>
            <p className="font-medium text-gray-800 dark:text-gray-200">{region}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rainfall</p>
            <div className="flex items-center justify-center">
              <Droplets className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-1" />
              <p className="font-medium text-blue-600 dark:text-blue-400">{averageRainfall} mm</p>
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-rose-50 dark:bg-rose-900/30">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Temperature</p>
            <div className="flex items-center justify-center">
              <Thermometer className="h-4 w-4 text-rose-500 dark:text-rose-400 mr-1" />
              <p className="font-medium text-rose-600 dark:text-rose-400">{averageTemperature} °C</p>
            </div>
          </div>
        </div>
        
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.4} stroke="#e5e7eb" strokeOpacity={0.5} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb', strokeOpacity: 0.5 }}
                tickLine={{ stroke: '#e5e7eb', strokeOpacity: 0.5 }}
              />
              <YAxis 
                yAxisId="left" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb', strokeOpacity: 0.5 }}
                tickLine={{ stroke: '#e5e7eb', strokeOpacity: 0.5 }}
                width={40}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb', strokeOpacity: 0.5 }}
                tickLine={{ stroke: '#e5e7eb', strokeOpacity: 0.5 }}
                width={40}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '0.5rem', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(229, 231, 235, 1)',
                  color: '#111827'
                }} 
              />
              <Legend 
                iconType="circle" 
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px', color: '#6b7280' }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="rainfall"
                stroke="#3b82f6"
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 1 }}
                name="Rainfall (mm)"
                dot={{ r: 3, strokeWidth: 1, fill: '#3b82f6' }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="temperature"
                stroke="#ef4444"
                strokeWidth={2}
                name="Temperature (°C)"
                dot={{ r: 3, strokeWidth: 1, fill: '#ef4444' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rainfall Trend</p>
            <div className="flex items-center justify-center">
              {rainfallTrend > 0 ? (
                <BarChart2 className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-1" />
              ) : (
                <BarChart2 className="h-4 w-4 text-amber-500 dark:text-amber-400 mr-1" />
              )}
              <span className={`ml-1 font-medium ${getRainfallTrendColor()}`}>
                {Math.abs(rainfallTrend)}% {rainfallTrend >= 0 ? 'increase' : 'decrease'}
              </span>
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-rose-50 dark:bg-rose-900/30">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Temperature Trend</p>
            <div className="flex items-center justify-center">
              {temperatureTrend > 0 ? (
                <BarChart2 className="h-4 w-4 text-rose-500 dark:text-rose-400 mr-1" />
              ) : (
                <BarChart2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400 mr-1" />
              )}
              <span className={`ml-1 font-medium ${getTemperatureTrendColor()}`}>
                {Math.abs(temperatureTrend)}% {temperatureTrend >= 0 ? 'increase' : 'decrease'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-3 text-center bg-gray-50 dark:bg-gray-700 mt-6">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Weather data analyzed from {data?.length || 12} monthly records
        </p>
      </div>
    </div>
  );
};

export default WeatherImpactChart;