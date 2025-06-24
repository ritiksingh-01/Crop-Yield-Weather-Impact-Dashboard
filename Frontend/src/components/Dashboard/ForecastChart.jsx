import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { LineChart, TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';

const ForecastChart = ({
  data,
  region,
  crop,
  timePeriod,
  predictedYield = "4.2",
  yieldUnit = "t/ha",
  confidence = "±0.5",
  trendPercent = 8.2, // positive for increase, negative for decrease
}) => {
  // Determine trend icon and color
  const renderTrendIndicator = () => {
    if (trendPercent > 0) {
      return <TrendingUp className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />;
    } else if (trendPercent < 0) {
      return <TrendingDown className="h-5 w-5 text-rose-500 dark:text-rose-400" />;
    }
    return <Minus className="h-5 w-5 text-gray-400 dark:text-gray-300" />;
  };
  
  // Determine trend color for text
  const getTrendColor = () => {
    if (trendPercent > 0) return 'text-emerald-600 dark:text-emerald-400';
    if (trendPercent < 0) return 'text-rose-600 dark:text-rose-400';
    return 'text-gray-500 dark:text-gray-300';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 h-full overflow-hidden">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <LineChart className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Crop Yield Forecast</h3>
        </div>
        <span className="text-sm font-medium px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full">
          {timePeriod}
        </span>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">Region</p>
            <p className="font-medium text-gray-800 dark:text-gray-100">{region}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">Crop</p>
            <p className="font-medium text-gray-800 dark:text-gray-100">{crop}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/30">
            <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">Predicted Yield</p>
            <div className="flex items-center justify-center">
              <p className="font-medium text-emerald-600 dark:text-emerald-400">{predictedYield} {yieldUnit}</p>
            </div>
          </div>
        </div>
        
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.4} stroke="#e5e7eb" strokeOpacity={0.5} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb', strokeOpacity: 0.5 }}
                tickLine={{ stroke: '#e5e7eb', strokeOpacity: 0.5 }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb', strokeOpacity: 0.5 }}
                tickLine={{ stroke: '#e5e7eb', strokeOpacity: 0.5 }}
                width={40}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '0.5rem', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(229, 231, 235, 1)'
                }} 
              />
              <Legend 
                iconType="circle" 
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px', color: '#6b7280' }}
              />
              <Area
                type="monotone"
                dataKey="confidenceLower"
                stackId="1"
                stroke="none"
                fill="#dcfce7"
                fillOpacity={0.3}
                name="Confidence Range"
              />
              <Area
                type="monotone"
                dataKey="confidenceUpper"
                stackId="1"
                stroke="none"
                fill="#dcfce7"
                fillOpacity={0.3}
                name="Confidence Range"
                hide={true}
              />
              <Area
                type="monotone"
                dataKey="historical"
                stroke="#6b7280"
                strokeWidth={2}
                fill="none"
                name="Historical"
                dot={{ r: 3, strokeWidth: 1 }}
              />
              <Area
                type="monotone"
                dataKey="prediction"
                stroke="#10b981"
                strokeWidth={2}
                fill="#dcfce7"
                fillOpacity={0.5}
                name="Prediction"
                dot={{ r: 3, strokeWidth: 1, fill: '#10b981' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">Confidence Level</p>
            <div className="flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-blue-500 dark:text-blue-400 mr-1" />
              <p className="font-medium text-gray-800 dark:text-gray-100">{confidence} {yieldUnit}</p>
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">Trend</p>
            <div className="flex items-center justify-center">
              {renderTrendIndicator()}
              <span className={`ml-1 font-medium ${getTrendColor()}`}>
                {Math.abs(trendPercent)}% {trendPercent >= 0 ? 'increase' : 'decrease'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`p-3 text-center bg-emerald-50 dark:bg-emerald-900/30`}>
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
          Forecast completed with high confidence
        </p>
      </div>
    </div>
  );
};

export default ForecastChart;