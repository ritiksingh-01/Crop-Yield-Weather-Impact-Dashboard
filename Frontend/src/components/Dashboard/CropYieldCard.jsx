import React from 'react';
import { Sprout, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const CropYieldCard = ({
  cropType,
  yieldValue,
  unit,
  season,
  year,
  previousValue = null,
  averageValue = null,
  trend = 0, // positive number for increase, negative for decrease
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
    if (!averageValue) return 'text-gray-900 dark:text-gray-100';
    return yieldValue >= averageValue ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400';
  };

  // Calculate percent change if previous value exists
  const percentChange = previousValue 
    ? ((yieldValue - previousValue) / previousValue * 100).toFixed(1)
    : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 h-full overflow-hidden">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <Sprout className="h-5 w-5 text-emerald-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Crop Yield</h3>
        </div>
        <span className="text-sm font-medium px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
          {season} {year}
        </span>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-center mb-4">
          <div className={`relative inline-flex items-center justify-center p-3 rounded-full bg-emerald-50 dark:bg-emerald-900/30`}>
            <Sprout className="h-8 w-8 text-emerald-500 dark:text-emerald-400" />
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-baseline">
            <h2 className={`text-5xl font-bold ${getYieldStatusColor()}`}>
              {yieldValue}
            </h2>
            <span className="text-2xl font-medium text-gray-500 dark:text-gray-400 ml-1">
              {unit}
            </span>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 font-medium mt-2 mb-4">
            {cropType}
          </p>
          
          {(previousValue || averageValue) && (
            <div className="grid grid-cols-2 gap-4 w-full mt-2">
              {previousValue && (
                <div className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Previous</p>
                  <div className="flex items-center justify-center">
                    <p className="font-medium dark:text-gray-200">{previousValue} {unit}</p>
                    {percentChange && (
                      <div className="flex items-center ml-2">
                        {renderTrendIndicator()}
                        <span className={trend > 0 
                          ? 'text-emerald-600 dark:text-emerald-400' 
                          : trend < 0 
                            ? 'text-rose-600 dark:text-rose-400' 
                            : 'text-gray-500 dark:text-gray-400'
                        }>
                          {Math.abs(percentChange)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {averageValue && (
                <div className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Average</p>
                  <p className="font-medium dark:text-gray-200">{averageValue} {unit}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Visual yield status indicator */}
      <div className={`p-3 text-center ${
        yieldValue >= (averageValue || 0) 
          ? 'bg-emerald-50 dark:bg-emerald-900/30' 
          : 'bg-rose-50 dark:bg-rose-900/30'
      }`}>
        <p className={`text-sm font-medium ${
          yieldValue >= (averageValue || 0) 
            ? 'text-emerald-600 dark:text-emerald-400' 
            : 'text-rose-600 dark:text-rose-400'
        }`}>
          {yieldValue >= (averageValue || 0) 
            ? `${Math.abs(((yieldValue - averageValue) / averageValue * 100).toFixed(1))}% above average` 
            : `${Math.abs(((averageValue - yieldValue) / averageValue * 100).toFixed(1))}% below average`
          }
        </p>
      </div>
    </div>
  );
};

export default CropYieldCard;