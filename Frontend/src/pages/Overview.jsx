import React from 'react';
import WeatherCard from '../components/Dashboard/WeatherCard';
import CropYieldCard from '../components/Dashboard/CropYieldCard';
import MapVisualization from '../components/Dashboard/MapVisualization';
import ForecastChart from '../components/Dashboard/ForecastChart';
import WeatherImpactChart from '../components/Dashboard/WeatherImpactChart';
import EarlyWarningSystem from '../components/Dashboard/EarlyWarningSystem';
import { 
  weatherSummaryData, 
  cropYieldData, 
  districtData, 
  forecastData, 
  weatherImpactData, 
  warningsData 
} from '../data/sampleData';
import Recommendations from '../components/Dashboard/Recommendations';

const Overview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Crop Yield & Weather Dashboard</h1>
        <p className="text-gray-600">Overview of agricultural metrics and forecasts for Uttar Pradesh</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <WeatherCard {...weatherSummaryData} />
        </div>
        
        <div className="md:col-span-3">
          <CropYieldCard {...cropYieldData} />
        </div>
        
        <div className="md:col-span-6">
          <MapVisualization 
            districtData={districtData} 
            selectedCrop="Rice" 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6">
          <ForecastChart 
            data={forecastData}
            region="Eastern Uttar Pradesh"
            crop="Rice"
            timePeriod="Jan-Jun 2025"
          />
        </div>
        
        <div className="md:col-span-6">
          <WeatherImpactChart 
            data={weatherImpactData}
            year={2025}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6">
          <EarlyWarningSystem warnings={warningsData} />
        </div>
        
        <div className="md:col-span-6">
          <Recommendations/>
        </div>
      </div>
    </div>
  );
};

export default Overview;