import { useState } from "react";
import { Check, ChevronDown, Moon, Sun, Bell, BellOff, User, Settings, Eye, Shield, Globe, Palette, Volume2 } from "lucide-react";

// Enhanced Button component with dark mode support
const Button = ({ children, variant = "default", size = "default", onClick, className = "", disabled = false, theme = "light" }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: theme === 'dark' 
      ? "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md" 
      : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md",
    outline: theme === 'dark'
      ? "border-2 border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:border-gray-500 active:bg-gray-600"
      : "border-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100",
    ghost: theme === 'dark'
      ? "text-gray-300 hover:bg-gray-700 hover:text-white active:bg-gray-600"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200",
    destructive: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "p-2.5"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

// Enhanced Card components with dark mode
const Card = ({ children, className = "", theme = "light" }) => (
  <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "", theme = "light" }) => (
  <div className={`px-6 py-5 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} border-b ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, icon: Icon, theme = "light" }) => (
  <div className="flex items-center gap-3">
    {Icon && <Icon className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />}
    <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{children}</h2>
  </div>
);

const CardDescription = ({ children, theme = "light" }) => (
  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-1.5 leading-relaxed`}>{children}</p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 py-5 ${className}`}>{children}</div>
);

// Enhanced Separator with dark mode
const Separator = ({ theme = "light" }) => <div className={`h-px ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} my-4`} />;

// Enhanced Switch with dark mode support
const Switch = ({ checked, onCheckedChange, disabled = false, theme = "light" }) => {
  const handleChange = (e) => {
    if (disabled) return;
    onCheckedChange?.(e.target.checked);
  };

  return (
    <label className={`relative inline-flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <div className={`w-11 h-6 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'} rounded-full peer transition-all duration-200 peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2 peer-checked:bg-blue-600 peer-disabled:opacity-50 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-200 peer-checked:after:translate-x-5 after:shadow-sm`}></div>
    </label>
  );
};

// Fixed Dropdown components with dark mode support
const DropdownMenu = ({ children, value, onValueChange, options, placeholder = "Select...", theme = "light" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onValueChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        className="w-40 justify-between"
        onClick={() => setIsOpen(!isOpen)}
        theme={theme}
      >
        {value || placeholder}
        <ChevronDown className={`ml-2 h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute z-50 mt-2 w-56 origin-top right-0 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 border py-1 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-600' 
              : 'bg-white border-gray-200'
          }`}>
            {options.map((option) => (
              <div
                key={option}
                className={`px-3 py-2 text-sm cursor-pointer transition-colors duration-150 mx-1 rounded-md flex items-center justify-between ${
                  theme === 'dark'
                    ? 'text-gray-200 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
                {value === option && <Check className="ml-2 h-4 w-4 text-blue-600" />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Setting Item component with dark mode support
const SettingItem = ({ icon: Icon, title, description, children, className = "", theme = "light" }) => (
  <div className={`flex items-start justify-between gap-4 ${className}`}>
    <div className="flex items-start gap-3 flex-1 min-w-0">
      {Icon && <Icon className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-0.5 flex-shrink-0`} />}
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-0.5 leading-relaxed`}>{description}</p>
      </div>
    </div>
    <div className="flex-shrink-0">
      {children}
    </div>
  </div>
);

export default function SettingsPage() {
  // Theme state with visual feedback
  const [theme, setTheme] = useState('light');
  
  // Notification states
  const [notifications, setNotifications] = useState(true);
  const [yieldPredictions, setYieldPredictions] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Preference states
  const [defaultCrop, setDefaultCrop] = useState("Corn");
  const [defaultRegion, setDefaultRegion] = useState("Midwest");
  const [language, setLanguage] = useState("English");

  // Data arrays
  const crops = ["Corn", "Wheat", "Soybeans", "Rice", "Cotton", "Barley", "Oats"];
  const regions = ["Midwest", "Northeast", "South", "West", "Northwest", "Southeast", "Southwest"];
  const languages = ["English", "Spanish", "French", "German", "Portuguese"];

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    console.log(`Theme changed to: ${newTheme}`);
  };

  const handleSaveSettings = () => {
    const settings = {
      theme,
      notifications,
      yieldPredictions,
      systemUpdates,
      soundEnabled,
      defaultCrop,
      defaultRegion,
      language
    };
    console.log('Saving settings:', settings);
    alert("Settings saved successfully!");
  };

  const handleNotificationToggle = (value) => {
    setNotifications(value);
    console.log(`Weather alerts: ${value ? 'enabled' : 'disabled'}`);
  };

  const handleYieldPredictionToggle = (value) => {
    setYieldPredictions(value);
    console.log(`Yield predictions: ${value ? 'enabled' : 'disabled'}`);
  };

  const handleSystemUpdatesToggle = (value) => {
    setSystemUpdates(value);
    console.log(`System updates: ${value ? 'enabled' : 'disabled'}`);
  };

  const handleSoundToggle = (value) => {
    setSoundEnabled(value);
    console.log(`Sound notifications: ${value ? 'enabled' : 'disabled'}`);
  };

  const handleCropChange = (crop) => {
    setDefaultCrop(crop);
    console.log(`Default crop changed to: ${crop}`);
  };

  const handleRegionChange = (region) => {
    setDefaultRegion(region);
    console.log(`Default region changed to: ${region}`);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    console.log(`Language changed to: ${lang}`);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="h-8 w-8 text-blue-600" />
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
          </div>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your account settings and preferences to customize your experience.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Appearance Settings */}
          <Card theme={theme}>
            <CardHeader theme={theme}>
              <CardTitle icon={Palette} theme={theme}>
                Appearance
              </CardTitle>
              <CardDescription theme={theme}>
                Customize how the dashboard looks and feels to match your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SettingItem
                icon={theme === "dark" ? Moon : Sun}
                title="Theme"
                description="Switch between dark and light mode for better viewing comfort."
                theme={theme}
              >
                <Button variant="outline" size="icon" onClick={toggleTheme} theme={theme}>
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </SettingItem>

              <Separator theme={theme} />

              <SettingItem
                title="Default Crop"
                description="Set your primary crop for analysis and dashboard defaults."
                theme={theme}
              >
                <DropdownMenu
                  value={defaultCrop}
                  onValueChange={handleCropChange}
                  options={crops}
                  theme={theme}
                />
              </SettingItem>

              <Separator theme={theme} />

              <SettingItem
                icon={Globe}
                title="Default Region"
                description="Set your geographic region for localized weather and market data."
                theme={theme}
              >
                <DropdownMenu
                  value={defaultRegion}
                  onValueChange={handleRegionChange}
                  options={regions}
                  theme={theme}
                />
              </SettingItem>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card theme={theme}>
            <CardHeader theme={theme}>
              <CardTitle icon={Bell} theme={theme}>
                Notifications
              </CardTitle>
              <CardDescription theme={theme}>
                Configure how you receive alerts, warnings, and updates from the system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SettingItem
                title="Weather Alerts"
                description="Receive real-time notifications for severe weather events and warnings."
                theme={theme}
              >
                <div className="flex items-center space-x-3">
                  {notifications ? (
                    <Bell className="h-4 w-4 text-blue-600" />
                  ) : (
                    <BellOff className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                  )}
                  <Switch checked={notifications} onCheckedChange={handleNotificationToggle} theme={theme} />
                </div>
              </SettingItem>

              <Separator theme={theme} />

              <SettingItem
                title="Yield Predictions"
                description="Get notified about significant changes in yield predictions and forecasts."
                theme={theme}
              >
                <Switch checked={yieldPredictions} onCheckedChange={handleYieldPredictionToggle} theme={theme} />
              </SettingItem>

              <Separator theme={theme} />

              <SettingItem
                title="System Updates"
                description="Receive notifications about new features, updates, and system maintenance."
                theme={theme}
              >
                <Switch checked={systemUpdates} onCheckedChange={handleSystemUpdatesToggle} theme={theme} />
              </SettingItem>

              <Separator theme={theme} />

              <SettingItem
                icon={Volume2}
                title="Sound Notifications"
                description="Enable sound alerts for important notifications and updates."
                theme={theme}
              >
                <Switch checked={soundEnabled} onCheckedChange={handleSoundToggle} theme={theme} />
              </SettingItem>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card className="lg:col-span-2" theme={theme}>
            <CardHeader theme={theme}>
              <CardTitle icon={User} theme={theme}>
                Account
              </CardTitle>
              <CardDescription theme={theme}>
                Manage your account information, security settings, and personal preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                    <User className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>John Farmer</h3>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>john.farmer@example.com</p>
                    <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Member since January 2024</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" theme={theme}>
                      <User className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="sm" theme={theme}>
                      <Shield className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" size="sm" theme={theme}>
                      <Eye className="h-4 w-4 mr-2" />
                      Privacy Settings
                    </Button>
                  </div>
                </div>
              </div>

              <Separator theme={theme} />

              <div className="space-y-4">
                <SettingItem
                  icon={Globe}
                  title="Language"
                  description="Choose your preferred language for the interface."
                  theme={theme}
                >
                  <DropdownMenu
                    value={language}
                    onValueChange={handleLanguageChange}
                    options={languages}
                    theme={theme}
                  />
                </SettingItem>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSaveSettings} className="px-8" theme={theme}>
            Save All Settings
          </Button>
        </div>

        {/* Current Settings Display for Testing */}
        <div className={`mt-6 p-4 rounded-lg border-2 border-dashed ${theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white'}`}>
          <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Current Settings (for testing):</h3>
          <div className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            <p>Theme: <strong>{theme}</strong></p>
            <p>Weather Alerts: <strong>{notifications ? 'Enabled' : 'Disabled'}</strong></p>
            <p>Yield Predictions: <strong>{yieldPredictions ? 'Enabled' : 'Disabled'}</strong></p>
            <p>System Updates: <strong>{systemUpdates ? 'Enabled' : 'Disabled'}</strong></p>
            <p>Sound Notifications: <strong>{soundEnabled ? 'Enabled' : 'Disabled'}</strong></p>
            <p>Default Crop: <strong>{defaultCrop}</strong></p>
            <p>Default Region: <strong>{defaultRegion}</strong></p>
            <p>Language: <strong>{language}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}