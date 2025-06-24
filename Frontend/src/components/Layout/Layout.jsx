import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { Search, Bell, Menu, X, Sun, Moon } from 'lucide-react';
import AuthPage from '../../pages/AuthPage';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const notificationRef = useRef(null);
  
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSearchExpanded, setMobileSearchExpanded] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/api/placeholder/40/40"
  });

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      setIsLoggedIn(true);
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const [notifications] = useState([
    { id: 1, text: "New message from Sarah", time: "2 min ago" },
    { id: 2, text: "Your report has been approved", time: "1 hour ago" },
    { id: 3, text: "Your report has been approved", time: "2 hour ago" }
  ]);

const handleLoginSuccess = (userData) => {
  // Extract username from email if no name is provided
  const userName = userData.name || userData.email.split('@')[0];

  // Store the user data
  const userToStore = {
    name: userName,
    email: userData.email,
    // Only set avatar if it exists and isn't a placeholder
    avatar: userData.avatar && !userData.avatar.includes('/api/placeholder/') 
      ? userData.avatar 
      : null
  };

  // Update app state
  setIsLoggedIn(true);
  setUser(userToStore);

  // Store in local storage
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('user', JSON.stringify(userToStore));

  // Navigate to home page
  navigate("/");
};
  
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate("/");
  };
  
  const toggleMobileSearch = () => {
    setMobileSearchExpanded(!mobileSearchExpanded);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsOpen && notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Close notifications when clicking outside or scrolling
    const handleScroll = () => {
      if (notificationsOpen) {
        setNotificationsOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [notificationsOpen]);

  if (!isLoggedIn) {
    return <AuthPage onAuth={handleLoginSuccess} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar component with open/close state */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <Sidebar user={user} logout={logout} />
      </div>
      
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 h-16 flex items-center justify-between">
            <div className="flex items-center flex-shrink-0">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? 
                  <X className="h-5 w-5" /> : 
                  <Menu className="h-5 w-5" />
                }
              </button>
              
              <div className="ml-2 md:ml-0">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Good Morning, {user.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hope you have a good day</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Search - Desktop */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 px-4 py-2 pl-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              {/* Search button - Mobile */}
              <button 
                onClick={toggleMobileSearch}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Search className="h-5 w-5" />
              </button>
              
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              
              {/* Notifications - Desktop */}
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                
                {notificationsOpen && (
                  <div className="fixed right-4 top-16 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Notifications
                        </h3>
                        {notifications.length > 0 && (
                          <button className="text-xs text-green-600 hover:text-green-700 dark:text-green-500">
                            Mark all as read
                          </button>
                        )}
                      </div>
                      
                      {notifications.length > 0 ? (
                        <div className="space-y-2">
                          {notifications.map(notification => (
                            <div key={notification.id} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                              <p className="text-sm text-gray-600 dark:text-gray-300">{notification.text}</p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No new notifications</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Mobile search - expandable */}
          {mobileSearchExpanded && (
            <div className="md:hidden px-4 pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  autoFocus
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          )}
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 z-10">
          <div className="container mx-auto px-4 py-6">
            <Outlet />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;