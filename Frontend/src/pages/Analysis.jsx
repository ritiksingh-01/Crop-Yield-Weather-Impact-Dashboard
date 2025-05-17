import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the Analysis page
const rainfallImpactData = [
  { rainfall: 10, yield: 2.1 },
  { rainfall: 20, yield: 2.5 },
  { rainfall: 30, yield: 3.0 },
  { rainfall: 40, yield: 3.4 },
  { rainfall: 50, yield: 3.7 },
  { rainfall: 60, yield: 4.0 },
  { rainfall: 70, yield: 4.2 },
  { rainfall: 80, yield: 4.3 },
  { rainfall: 90, yield: 4.4 },
  { rainfall: 100, yield: 4.5 },
  { rainfall: 110, yield: 4.6 },
  { rainfall: 120, yield: 4.5 },
  { rainfall: 140, yield: 4.4 },
  { rainfall: 160, yield: 4.3 },
  { rainfall: 180, yield: 4.1 },
  { rainfall: 200, yield: 3.8 },
  { rainfall: 220, yield: 3.5 },
  { rainfall: 240, yield: 3.2 },
];

const temperatureImpactData = [
  { temperature: 15, yield: 3.0 },
  { temperature: 18, yield: 3.3 },
  { temperature: 21, yield: 3.6 },
  { temperature: 24, yield: 3.9 },
  { temperature: 27, yield: 4.2 },
  { temperature: 30, yield: 4.4 },
  { temperature: 33, yield: 4.1 },
  { temperature: 36, yield: 3.7 },
  { temperature: 39, yield: 3.3 },
  { temperature: 42, yield: 2.8 },
];

const cropDistributionData = [
  { name: 'Rice', value: 42 },
  { name: 'Wheat', value: 28 },
  { name: 'Sugarcane', value: 15 },
  { name: 'Maize', value: 10 },
  { name: 'Pulses', value: 5 },
];

const cropColors = ['#4ade80', '#60a5fa', '#f59e0b', '#a78bfa', '#f87171'];

const regionComparisonData = [
  { name: 'Eastern UP', rice: 4.5, wheat: 3.8, sugarcane: 70.5 },
  { name: 'Western UP', rice: 4.0, wheat: 4.2, sugarcane: 68.2 },
  { name: 'Central UP', rice: 4.2, wheat: 4.0, sugarcane: 69.8 },
  { name: 'Bundelkhand', rice: 3.5, wheat: 3.2, sugarcane: 60.5 },
  { name: 'Rohilkhand', rice: 4.1, wheat: 3.9, sugarcane: 65.3 },
];

const Analysis = () => {
  const [selectedMetric, setSelectedMetric] = useState('rainfall');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Weather Impact Analysis</h1>
        <p className="text-gray-600">Analyzing relationships between weather patterns and crop yields</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Weather Impact on Yield</h3>
              <div className="flex space-x-2">
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${
                    selectedMetric === 'rainfall' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => setSelectedMetric('rainfall')}
                >
                  Rainfall
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${
                    selectedMetric === 'temperature' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => setSelectedMetric('temperature')}
                >
                  Temperature
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {selectedMetric === 'rainfall' ? (
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid />
                    <XAxis 
                      type="number" 
                      dataKey="rainfall" 
                      name="Rainfall" 
                      label={{ value: 'Rainfall (mm)', position: 'insideBottomRight', offset: -10 }} 
                    />
                    <YAxis 
                      type="number" 
                      dataKey="yield" 
                      name="Yield" 
                      label={{ value: 'Yield (t/ha)', angle: -90, position: 'insideLeft', offset: 10 }} 
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }} 
                      formatter={(value) => [`${value} t/ha`, 'Yield']}
                      labelFormatter={(value) => `Rainfall: ${value} mm`}
                    />
                    <Scatter name="Rainfall vs Yield" data={rainfallImpactData} fill="#3b82f6" />
                  </ScatterChart>
                ) : (
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid />
                    <XAxis 
                      type="number" 
                      dataKey="temperature" 
                      name="Temperature" 
                      label={{ value: 'Temperature (°C)', position: 'insideBottomRight', offset: -10 }} 
                    />
                    <YAxis 
                      type="number" 
                      dataKey="yield" 
                      name="Yield" 
                      label={{ value: 'Yield (t/ha)', angle: -90, position: 'insideLeft', offset: 10 }} 
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }} 
                      formatter={(value) => [`${value} t/ha`, 'Yield']}
                      labelFormatter={(value) => `Temperature: ${value}°C`}
                    />
                    <Scatter name="Temperature vs Yield" data={temperatureImpactData} fill="#ef4444" />
                  </ScatterChart>
                )}
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Analysis Insights</h4>
              <p className="text-sm text-gray-700">
                {selectedMetric === 'rainfall' 
                  ? 'Rice yields increase with rainfall up to approximately 120mm per month, after which excessive rainfall becomes detrimental. The optimal rainfall range appears to be 90-130mm per month for maximum yield potential.'
                  : 'Temperature shows a clear optimal range for rice cultivation. Yields peak around 28-32°C and decline significantly as temperatures exceed 35°C, indicating potential heat stress on crops.'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium">Crop Distribution in UP</h3>
          </div>
          <div className="card-body">
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cropDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {cropDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={cropColors[index % cropColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Area']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Distribution Analysis</h4>
              <p className="text-sm text-gray-700">
                Rice and wheat dominate agricultural production in Uttar Pradesh, accounting for over 70% of the total cultivated area. This heavy reliance on cereal crops suggests potential opportunities for crop diversification to improve soil health and reduce vulnerability to specific crop diseases or pests.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium">Region-wise Crop Yield Comparison</h3>
        </div>
        <div className="card-body">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={regionComparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" label={{ value: 'Yield (t/ha)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Sugarcane Yield (t/ha)', angle: 90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="rice" name="Rice" fill="#4ade80" />
                <Bar yAxisId="left" dataKey="wheat" name="Wheat" fill="#60a5fa" />
                <Bar yAxisId="right" dataKey="sugarcane" name="Sugarcane" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Regional Analysis Summary</h4>
            <p className="text-sm text-gray-700 mb-4">
              Eastern UP consistently shows higher rice yields due to favorable rainfall patterns, while Western UP excels in wheat production. Sugarcane yields are highest in Central UP where irrigation infrastructure is more developed. Bundelkhand shows consistently lower yields across all crops, highlighting the need for targeted agricultural development in this region.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-md shadow-sm">
                <div className="text-xs text-gray-500">Best Region for Rice</div>
                <div className="font-bold">Eastern UP (4.5 t/ha)</div>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <div className="text-xs text-gray-500">Best Region for Wheat</div>
                <div className="font-bold">Western UP (4.2 t/ha)</div>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <div className="text-xs text-gray-500">Best Region for Sugarcane</div>
                <div className="font-bold">Central UP (69.8 t/ha)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
