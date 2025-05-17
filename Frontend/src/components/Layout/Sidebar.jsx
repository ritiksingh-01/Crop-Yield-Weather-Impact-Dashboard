import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Cloud, AlertTriangle, Home, Activity, Sprout } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const isActiveRoute = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-green-800">Crop Yield & Weather</h1>
        <p className="text-sm text-gray-600">Impact Prediction System</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        <Link to="/" className={`sidebar-link ${isActiveRoute('/')}`}>
          <Home size={18} className="mr-2" />
          <span>Overview</span>
        </Link>
        
        <Link to="/forecast" className={`sidebar-link ${isActiveRoute('/forecast')}`}>
          <BarChart3 size={18} className="mr-2" />
          <span>Forecast</span>
        </Link>
        
        <Link to="/analysis" className={`sidebar-link ${isActiveRoute('/analysis')}`}>
          <Activity size={18} className="mr-2" />
          <span>Analysis</span>
        </Link>
        
        <Link to="/cropPrediction" className={`sidebar-link ${isActiveRoute('/cropPrediction')}`}>
          <Sprout size={18} className="mr-2" /> {/* Changed icon here */}
          <span>Crop Prediction</span>
        </Link>
        
        <Link to="/warnings" className={`sidebar-link ${isActiveRoute('/warnings')}`}>
          <AlertTriangle size={18} className="mr-2" />
          <span>Warnings</span>
        </Link>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
            <span className="text-xs font-bold">UP</span>
          </div>
          <div>
            <p className="text-sm font-medium">Uttar Pradesh</p>
            <p className="text-xs text-gray-500">Agricultural Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
