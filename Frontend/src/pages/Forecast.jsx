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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Crop Yield Forecast</h1>
        <p className="text-gray-600">Detailed forecasting for different crops and regions</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center mb-4">
              <Sprout className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="font-medium">Select Crop</h3>
            </div>
            <div className="space-y-2">
              {cropOptions.map(crop => (
                <button
                  key={crop}
                  className={`w-full py-2 px-4 rounded-md text-left transition ${
                    selectedCrop === crop 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCrop(crop)}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-medium">Select Region</h3>
            </div>
            <div className="space-y-2">
              {regionOptions.map(region => (
                <button
                  key={region}
                  className={`w-full py-2 px-4 rounded-md text-left transition ${
                    selectedRegion === region 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedRegion(region)}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-purple-600 mr-2" />
              <h3 className="font-medium">Select Year</h3>
            </div>
            <div className="space-y-2">
              {timeOptions.map(time => (
                <button
                  key={time}
                  className={`w-full py-2 px-4 rounded-md text-left transition ${
                    selectedTime === time 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-white hover:bg-gray-50'
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
      
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium">
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="district" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  label={{ 
                    value: 'Yield (tonnes/hectare)', 
                    angle: -90, 
                    position: 'insideLeft', 
                    style: { textAnchor: 'middle' } 
                  }} 
                />
                <Tooltip 
                  formatter={(value) => [`${value} t/ha`, '']}
                  labelFormatter={(label) => `District: ${label}`}
                />
                <Legend />
                <Bar dataKey="current" name="Current Yield" fill="#9ca3af" />
                <Bar dataKey="forecast" name="Forecast Yield" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Forecast Summary</h4>
            <p className="text-sm text-gray-700 mb-4">
              Based on our predictive models, we anticipate a {selectedCrop.toLowerCase()} yield increase of approximately 8-12% in {selectedRegion} for the {selectedTime} growing season compared to current yields. This forecast takes into account projected weather patterns, soil conditions, and historical trends.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded-md shadow-sm">
                <div className="text-xs text-gray-500">Avg. Current Yield</div>
                <div className="font-bold text-lg">3.9 t/ha</div>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <div className="text-xs text-gray-500">Avg. Forecast Yield</div>
                <div className="font-bold text-lg text-green-600">4.3 t/ha</div>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <div className="text-xs text-gray-500">Confidence Level</div>
                <div className="font-bold text-lg">87%</div>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <div className="text-xs text-gray-500">Forecast Trend</div>
                <div className="font-bold text-lg text-green-600">+10.2%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;