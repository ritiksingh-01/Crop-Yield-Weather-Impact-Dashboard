import React from 'react';
import { AlertTriangle, Clock, Bell, BellRing, ShieldAlert } from 'lucide-react';

const EarlyWarningSystem = ({ 
  warnings = [], 
  activeWarningsCount = 0,
  lastUpdated = "10 minutes ago" 
}) => {
  const getSeverityClasses = (severity) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 text-red-800 bg-red-50';
      case 'high':
        return 'border-orange-500 text-orange-800 bg-orange-50';
      case 'medium':
        return 'border-amber-500 text-amber-800 bg-amber-50';
      case 'low':
        return 'border-yellow-500 text-yellow-800 bg-yellow-50';
      default:
        return 'border-gray-500 text-gray-800 bg-gray-50';
    }
  };

  const getSeverityBadgeClasses = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getWarningIcon = (type, severity) => {
    switch (type) {
      case 'drought':
        return <AlertTriangle className={`h-8 w-8 ${severity === 'critical' ? 'text-red-500' : severity === 'high' ? 'text-orange-500' : severity === 'medium' ? 'text-amber-500' : 'text-yellow-500'}`} />;
      case 'pest':
        return <ShieldAlert className={`h-8 w-8 ${severity === 'critical' ? 'text-red-500' : severity === 'high' ? 'text-orange-500' : severity === 'medium' ? 'text-amber-500' : 'text-yellow-500'}`} />;
      case 'disease':
        return <AlertTriangle className={`h-8 w-8 ${severity === 'critical' ? 'text-red-500' : severity === 'high' ? 'text-orange-500' : severity === 'medium' ? 'text-amber-500' : 'text-yellow-500'}`} />;
      case 'flood':
        return <AlertTriangle className={`h-8 w-8 ${severity === 'critical' ? 'text-red-500' : severity === 'high' ? 'text-orange-500' : severity === 'medium' ? 'text-amber-500' : 'text-yellow-500'}`} />;
      default:
        return <AlertTriangle className={`h-8 w-8 ${severity === 'critical' ? 'text-red-500' : severity === 'high' ? 'text-orange-500' : severity === 'medium' ? 'text-amber-500' : 'text-yellow-500'}`} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center">
          <BellRing className="h-5 w-5 text-red-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Early Warning System</h3>
        </div>
        <span className="text-sm font-medium px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full flex items-center">
          <Clock className="h-3.5 w-3.5 mr-1" />
          Updated {lastUpdated}
        </span>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <p className="text-xs text-gray-500 mb-1">Active Warnings</p>
            <div className="flex items-center justify-center">
              <Bell className="h-4 w-4 text-red-500 mr-1" />
              <p className="font-medium text-gray-800">{activeWarningsCount}</p>
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <p className="text-xs text-gray-500 mb-1">Priority Level</p>
            <p className="font-medium text-gray-800">
              {warnings.length > 0 ? 
                warnings[0].severity.charAt(0).toUpperCase() + warnings[0].severity.slice(1) : 
                'Normal'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {warnings.length === 0 ? (
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-green-50 mb-4">
              <Bell className="h-8 w-8 text-green-500" />
            </div>
            <h4 className="text-lg font-medium text-gray-800 mb-1">All Clear</h4>
            <p className="text-gray-500">No active warnings at this time</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {warnings.map((warning) => (
              <div
                key={warning.id}
                className={`p-4 border-l-4 ${getSeverityClasses(warning.severity)}`}
              >
                <div className="flex">
                  <div className="mr-4 flex-shrink-0">
                    {getWarningIcon(warning.type, warning.severity)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-gray-900">
                        {warning.type.charAt(0).toUpperCase() + warning.type.slice(1)} Risk
                      </h4>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getSeverityBadgeClasses(warning.severity)}`}>
                        {warning.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{warning.message}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700">
                        <Clock className="h-3 w-3 mr-1" />
                        {warning.timeframe}
                      </span>
                      {warning.district && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700">
                          {warning.district}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-3 text-center border-t border-gray-200 bg-gray-50">
        <p className="text-sm font-medium text-gray-700">
          {warnings.length > 0 
            ? `${warnings.length} active warning${warnings.length > 1 ? 's' : ''} require attention` 
            : 'System monitoring active'}
        </p>
      </div>
    </div>
  );
};

export default EarlyWarningSystem;