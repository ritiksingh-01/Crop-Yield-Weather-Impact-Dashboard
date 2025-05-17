import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Map } from 'lucide-react';

// Dummy GeoJSON data - to be replaced with actual data
const dummyGeoJson = {
  type: 'FeatureCollection',
  features: []
};

const MapVisualization = ({
  districtData = [],
  selectedCrop = "Rice Yield"
}) => {
  // Style function for GeoJSON
  const getDistrictStyle = (feature) => {
    const district = districtData.find(d => d.id === feature.properties.district_id);
    const yieldValue = district ? district.cropYield : 0;
    
    // Color based on yield value
    return {
      fillColor: getColorByYield(yieldValue),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  // Get color based on yield value
  const getColorByYield = (yield_) => {
    return yield_ > 4 ? '#006837' :
           yield_ > 3 ? '#31a354' :
           yield_ > 2 ? '#78c679' :
           yield_ > 1 ? '#c2e699' :
                        '#ffffcc';
  };

  // Legend items
  const legendItems = [
    { color: '#ffffcc', label: 'Low' },
    { color: '#c2e699', label: 'Medium' },
    { color: '#78c679', label: 'Good' },
    { color: '#31a354', label: 'High' },
    { color: '#006837', label: 'Excellent' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full overflow-hidden">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center">
          <Map className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Uttar Pradesh Map</h3>
        </div>
        <span className="text-sm font-medium">{selectedCrop}</span>
      </div>
      
      {/* Map Container */}
      <div className="relative" style={{ height: "220px" }}>
        <MapContainer
          center={[26.8467, 80.9462]} // Approximate center of Uttar Pradesh
          zoom={7}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {dummyGeoJson.features.length > 0 && (
            <GeoJSON
              data={dummyGeoJson}
              style={getDistrictStyle}
            />
          )}
        </MapContainer>
        
        {/* Attribution positioned absolute */}
        <div className="absolute bottom-0 right-0 bg-white bg-opacity-70 px-1 text-xs z-[1000]">
          © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors
        </div>
      </div>
      
      {/* Legend */}
      <div className="p-2 border-t border-gray-100 flex items-center justify-between">
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

export default MapVisualization;