import React, { useState } from 'react';
import { AlertTriangle, CloudRain, Thermometer, Wind, Bug } from 'lucide-react';

// Sample data for the Warnings page
const warningData = [
  {
    id: 'W001',
    type: 'flood',
    district: 'Gorakhpur',
    severity: 'critical',
    message: 'Expected heavy rainfall exceeding 200mm in the next 72 hours. High probability of flooding in low-lying areas. Prepare for potential crop damage in rice fields.',
    timeframe: 'Expected in 72 hours',
    date: '2025-06-15',
    icon: CloudRain,
    actions: [
      'Move farm equipment to higher ground',
      'Strengthen field bunds and drainage systems',
      'Harvest mature crops if possible',
      'Secure grain storage facilities'
    ]
  },
  {
    id: 'W002',
    type: 'drought',
    district: 'Jhansi',
    severity: 'high',
    message: 'Prolonged dry spell expected to continue for 2 weeks. Soil moisture levels critically low. Irrigation resources may be strained.',
    timeframe: 'Ongoing, expected for 14 more days',
    date: '2025-05-20',
    icon: Thermometer,
    actions: [
      'Implement water conservation measures',
      'Prioritize irrigation for critical growth stages',
      'Consider mulching to reduce evaporation',
      'Monitor crop stress indicators daily'
    ]
  },
  {
    id: 'W003',
    type: 'pest',
    district: 'Aligarh',
    severity: 'medium',
    message: 'Locust swarm reported in neighboring regions. Current weather conditions favor rapid reproduction and movement toward Aligarh district.',
    timeframe: 'Potential risk in 4-5 days',
    date: '2025-06-10',
    icon: Bug,
    actions: [
      'Monitor fields for early detection',
      'Prepare pest control measures',
      'Coordinate with local agriculture department',
      'Consider preventive spraying in border areas'
    ]
  },
  {
    id: 'W004',
    type: 'heatwave',
    district: 'Kanpur',
    severity: 'medium',
    message: 'Heatwave conditions predicted with temperatures exceeding 42°C for 5-7 days. May cause heat stress in crops, particularly during flowering stages.',
    timeframe: 'Expected to begin in 3 days',
    date: '2025-05-25',
    icon: Thermometer,
    actions: [
      'Increase irrigation frequency',
      'Apply light irrigation during hottest part of day',
      'Use shade nets for sensitive crops',
      'Apply foliar sprays to reduce transpiration'
    ]
  },
  {
    id: 'W005',
    type: 'wind',
    district: 'Meerut',
    severity: 'low',
    message: 'Strong winds (40-50 km/h) expected during next week. May affect tall crops like maize and sugarcane.',
    timeframe: 'Starting in 5 days',
    date: '2025-06-05',
    icon: Wind,
    actions: [
      'Provide support structures for tall crops',
      'Delay fertilizer application',
      'Ensure irrigation systems are secured',
      'Monitor for lodging in grain crops'
    ]
  }
];

const Warnings = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedWarning, setSelectedWarning] = useState(warningData[0]);

  const filteredWarnings = activeFilter === 'all' 
    ? warningData 
    : warningData.filter(warning => 
        activeFilter === 'critical' 
          ? warning.severity === 'critical'
          : warning.type === activeFilter
      );

  const getSeverityClasses = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getWarningIcon = (IconComponent) => {
    return <IconComponent className="h-6 w-6" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Early Warning System</h1>
        <p className="text-gray-600">Agricultural alerts and mitigation recommendations</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-md text-sm ${
              activeFilter === 'all' 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All Warnings
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm ${
              activeFilter === 'critical' 
                ? 'bg-red-600 text-white' 
                : 'bg-red-50 text-red-800 hover:bg-red-100'
            }`}
            onClick={() => setActiveFilter('critical')}
          >
            <AlertTriangle className="h-4 w-4 inline mr-1" />
            Critical
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm ${
              activeFilter === 'flood' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
            }`}
            onClick={() => setActiveFilter('flood')}
          >
            <CloudRain className="h-4 w-4 inline mr-1" />
            Flood Risk
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm ${
              activeFilter === 'drought' 
                ? 'bg-orange-600 text-white' 
                : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
            }`}
            onClick={() => setActiveFilter('drought')}
          >
            <Thermometer className="h-4 w-4 inline mr-1" />
            Drought
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm ${
              activeFilter === 'pest' 
                ? 'bg-green-600 text-white' 
                : 'bg-green-50 text-green-800 hover:bg-green-100'
            }`}
            onClick={() => setActiveFilter('pest')}
          >
            <Bug className="h-4 w-4 inline mr-1" />
            Pest Alert
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm ${
              activeFilter === 'heatwave' 
                ? 'bg-amber-600 text-white' 
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
            onClick={() => setActiveFilter('heatwave')}
          >
            <Thermometer className="h-4 w-4 inline mr-1" />
            Heat Wave
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
            <div className="p-4 font-medium">
              Active Warnings ({filteredWarnings.length})
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {filteredWarnings.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No warnings match the selected filter
                </div>
              ) : (
                filteredWarnings.map(warning => (
                  <div 
                    key={warning.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                      selectedWarning.id === warning.id ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => setSelectedWarning(warning)}
                  >
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full mr-3 ${getSeverityClasses(warning.severity)}`}>
                        {getWarningIcon(warning.icon)}
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <h4 className="font-medium text-gray-900">{warning.district}</h4>
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getSeverityClasses(warning.severity)}`}>
                            {warning.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{warning.message}</p>
                        <div className="mt-2 text-xs text-gray-500">{warning.timeframe}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {selectedWarning && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className={`p-4 flex items-center justify-between ${getSeverityClasses(selectedWarning.severity)}`}>
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-white mr-3">
                    {getWarningIcon(selectedWarning.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">
                      {selectedWarning.type.charAt(0).toUpperCase() + selectedWarning.type.slice(1)} Warning: {selectedWarning.district}
                    </h3>
                    <p className="text-sm">
                      Issued on {selectedWarning.date} • {selectedWarning.timeframe}
                    </p>
                  </div>
                </div>
                <span className="text-sm px-3 py-1 rounded-full border">
                  {selectedWarning.severity.toUpperCase()}
                </span>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2">Warning Details</h4>
                  <p className="text-gray-700">{selectedWarning.message}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2">Recommended Actions</h4>
                  <ul className="space-y-2">
                    {selectedWarning.actions.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-sm font-medium mr-3">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-2">Affected Areas</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      This warning affects all agricultural areas in {selectedWarning.district} district. Particular attention should be paid to low-lying areas near rivers and areas with poor drainage systems. Neighboring districts may also be impacted as the situation develops.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center text-blue-600 hover:text-blue-800">
                    <span className="font-medium">Download detailed advisory (PDF)</span>
                  </div>
                  <div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
                      Subscribe to Updates
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Warnings;