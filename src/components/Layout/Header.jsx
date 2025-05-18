import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../Auth/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'New weather alert for Lucknow' },
    { id: 2, text: 'Crop yield prediction updated' },
  ]);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-green-600 dark:text-green-400">
              CropYield
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex ml-8 space-x-4">
              <Link to="/" className="nav-link">Overview</Link>
              <Link to="/forecast" className="nav-link">Forecast</Link>
              <Link to="/analysis" className="nav-link">Analysis</Link>
              <Link to="/warnings" className="nav-link">Warnings</Link>
            </nav>
          </div>

          {/* Search, Theme, Notifications, Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <ThemeToggle />

            {/* Notifications */}
            <div className="relative group">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  2
                </span>
              </button>
              
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hidden group-hover:block">
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                    Notifications
                  </h3>
                  <div className="space-y-2">
                    {notifications.map(notification => (
                      <div key={notification.id} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-300">{notification.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* User Profile / Login */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <img
                    src={user.avatar || 'https://via.placeholder.com/32'}
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hidden group-hover:block">
                  <div className="p-2">
                    <div className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      {user.name}
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="mobile-nav-link">Overview</Link>
              <Link to="/forecast" className="mobile-nav-link">Forecast</Link>
              <Link to="/analysis" className="mobile-nav-link">Analysis</Link>
              <Link to="/warnings" className="mobile-nav-link">Warnings</Link>
            </nav>
            <div className="mt-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center justify-between">
                <ThemeToggle />
                {user ? (
                  <button
                    onClick={logout}
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    Sign out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg bg-green-600 text-white"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;