import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, Cloud, AlertTriangle, Home, Activity, Sprout, Settings, HelpCircle, LogOut, ChevronRight, User, MessageSquare } from 'lucide-react';

// Helper function to get initials from name
export const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Helper function to get consistent avatar color based on name
export const getAvatarColor = (name) => {
  if (!name) return "bg-green-500";

  const colors = [
    "bg-blue-500",
    "bg-red-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500"
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex];
};

const NameAvatar = ({ name, className = "" }) => {
  const initials = getInitials(name);
  const bgColor = getAvatarColor(name);

  return (
    <div className={`flex items-center justify-center text-white ${bgColor} ${className}`}>
      {initials}
    </div>
  );
};

const Sidebar = ({ user, logout }) => {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const menuItems = [
    { name: 'Overview', icon: <Home className="h-5 w-5" />, path: '/' },
    { name: 'Forecast', icon: <BarChart3 className="h-5 w-5" />, path: '/forecast' },
    { name: 'Analysis', icon: <Activity className="h-5 w-5" />, path: '/analysis' },
    { name: 'Crop Prediction', icon: <Sprout className="h-5 w-5" />, path: '/cropPrediction' },
    { name: 'Warnings', icon: <AlertTriangle className="h-5 w-5" />, path: '/warnings' },
    { name: 'AI Chat', icon: <MessageSquare className="h-5 w-5" />, path: '/chat' },
    { name: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/setting' },
    { name: 'Help', icon: <HelpCircle className="h-5 w-5" />, path: '/helpPage' },
  ];

  const displayName = user?.name || (user?.email ? user.email.split('@')[0] : "User");

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="h-full flex flex-col">
        {/* Logo/Brand */}
        <div className="px-4 py-6 flex flex-col border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Crop Yield & Weather</h1>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Impact Prediction System</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === item.path
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
              {location.pathname === item.path && (
                <ChevronRight className="ml-auto h-5 w-5 text-green-600 dark:text-green-400" />
              )}
            </Link>
          ))}
        </nav>

        {/* Footer with User Profile */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                />
              ) : (
                <NameAvatar 
                  name={displayName} 
                  className="h-8 w-8 rounded-full text-sm font-medium"
                />
              )}
              <div className="ml-3 text-left">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{displayName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || "user@example.com"}</p>
              </div>
            </button>
            
            {profileOpen && (
              <div className="absolute bottom-full mb-2 left-0 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-2">
                  <Link 
                    to="/profile" 
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <Link 
                    to="/setting" 
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <Settings className="h-4 w-4 mr-2"/>
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;