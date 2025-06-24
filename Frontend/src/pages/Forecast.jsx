import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Sprout, MapPin } from 'lucide-react';

// Sample data for the forecast page
const cropOptions = ['Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Maize'];
const regionOptions = ['Eastern UP', 'Western UP', 'Central UP', 'Bundelkhand', 'Rohilkhand'];
const timeOptions = ['2025', '2026', '2027', '2028', '2029'];

const cropYieldForecastData = [
  { district: 'Agra', current: 3.8, forecast: 4.1 },
  { district: 'Aligarh', current: 4.2, forecast: 4.5 },
  { district: 'Allahabad', current: 3.6, forecast: 3.9 },
  { district: 'Azamgarh', current: 4.7, forecast: 5.0 },
  { district: 'Bareilly', current: 3.2, forecast: 3.5 },
  { district: 'Gorakhpur', current: 4.5, forecast: 4.7 },
  { district: 'Jhansi', current: 2.8, forecast: 3.2 },
  { district: 'Kanpur', current: 3.9, forecast: 4.3 },
  { district: 'Lucknow', current: 4.1, forecast: 4.4 },
  { district: 'Meerut', current: 4.3, forecast: 4.6 }
];

const Forecast = () => {
  const [selectedCrop, setSelectedCrop] = useState('Rice');
  const [selectedRegion, setSelectedRegion] = useState('Eastern UP');
  const [selectedTime, setSelectedTime] = useState('2025');

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Crop Yield Forecast</h1>
        <p className="text-gray-600 dark:text-gray-300">Detailed forecasting for different crops and regions</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card dark:bg-gray-800 dark:border-gray-700">
          <div className="card-body">
            <div className="flex items-center mb-4">
              <Sprout className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
              <h3 className="font-medium text-gray-900 dark:text-white">Select Crop</h3>
            </div>
            <div className="space-y-2">
              {cropOptions.map(crop => (
                <button
                  key={crop}
                  className={`w-full py-2 px-4 rounded-md text-left transition ${
                    selectedCrop === crop 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                      : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                  }`}
                  onClick={() => setSelectedCrop(crop)}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="card dark:bg-gray-800 dark:border-gray-700">
          <div className="card-body">
            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="font-medium text-gray-900 dark:text-white">Select Region</h3>
            </div>
            <div className="space-y-2">
              {regionOptions.map(region => (
                <button
                  key={region}
                  className={`w-full py-2 px-4 rounded-md text-left transition ${
                    selectedRegion === region 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' 
                      : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                  }`}
                  onClick={() => setSelectedRegion(region)}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="card dark:bg-gray-800 dark:border-gray-700">
          <div className="card-body">
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
              <h3 className="font-medium text-gray-900 dark:text-white">Select Year</h3>
            </div>
            <div className="space-y-2">
              {timeOptions.map(time => (
                <button
                  key={time}
                  className={`w-full py-2 px-4 rounded-md text-left transition ${
                    selectedTime === time 
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400' 
                      : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="card dark:bg-gray-800 dark:border-gray-700">
        <div className="card-header">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {selectedCrop} Yield Forecast for {selectedRegion} ({selectedTime})
          </h3>
        </div>
        <div className="card-body">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cropYieldForecastData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                <XAxis 
                  dataKey="district" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb', strokeOpacity: 0.5 }}
                  tickLine={{ stroke: '#e5e7eb', strokeOpacity: 0.5 }}
                />
                <YAxis 
                  label={{ 
                    value: 'Yield (tonnes/hectare)', 
                    angle: -90, 
                    position: 'insideLeft',
                    fill: '#6b7280',
                    style: { textAnchor: 'middle' } 
                  }}
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb', strokeOpacity: 0.5 }}
                  tickLine={{ stroke: '#e5e7eb', strokeOpacity: 0.5 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} t/ha`, '']}
                  labelFormatter={(label) => `District: ${label}`}
                  contentStyle={{ 
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: '0.5rem', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(229, 231, 235, 1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: '20px',
                    color: '#6b7280'
                  }}
                />
                <Bar dataKey="current" name="Current Yield" fill="#9ca3af" />
                <Bar dataKey="forecast" name="Forecast Yield" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Forecast Summary</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Based on our predictive models, we anticipate a {selectedCrop.toLowerCase()} yield increase of approximately 8-12% in {selectedRegion} for the {selectedTime} growing season compared to current yields. This forecast takes into account projected weather patterns, soil conditions, and historical trends.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-600 p-3 rounded-md shadow-sm">
                <div className="text-xs text-gray-500 dark:text-gray-300">Avg. Current Yield</div>
                <div className="font-bold text-lg dark:text-white">3.9 t/ha</div>
              </div>
              <div className="bg-white dark:bg-gray-600 p-3 rounded-md shadow-sm">
                <div className="text-xs text-gray-500 dark:text-gray-300">Avg. Forecast Yield</div>
                <div className="font-bold text-lg text-green-600 dark:text-green-400">4.3 t/ha</div>
              </div>
              <div className="bg-white dark:bg-gray-600 p-3 rounded-md shadow-sm">
                <div className="text-xs text-gray-500 dark:text-gray-300">Confidence Level</div>
                <div className="font-bold text-lg dark:text-white">87%</div>
              </div>
              <div className="bg-white dark:bg-gray-600 p-3 rounded-md shadow-sm">
                <div className="text-xs text-gray-500 dark:text-gray-300">Forecast Trend</div>
                <div className="font-bold text-lg text-green-600 dark:text-green-400">+10.2%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;