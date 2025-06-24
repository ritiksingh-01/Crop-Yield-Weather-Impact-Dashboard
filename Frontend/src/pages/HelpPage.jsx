import React, { useState, createContext, useContext } from 'react';
import { Mail, PlayCircle, Search, ChevronDown, ExternalLink, Clock, Users, Shield, Download, MessageCircle, Phone, AlertCircle} from 'lucide-react';

// Enhanced UI Components with Dark Mode
const Button = ({ children, variant = 'primary', size = 'md', className = '', disabled = false, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-offset-white dark:focus:ring-offset-gray-900';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-sm hover:shadow-md dark:bg-blue-600 dark:hover:bg-blue-700',
    outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-blue-500 hover:border-gray-400 dark:hover:border-gray-500',
    ghost: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '', hover = false }) => (
  <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm dark:shadow-gray-900/10 ${hover ? 'hover:shadow-md dark:hover:shadow-gray-900/20 transition-shadow duration-200' : ''} ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-gray-100 dark:border-gray-700 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }) => (
  <h2 className={`text-lg font-semibold text-gray-900 dark:text-gray-100 ${className}`}>{children}</h2>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-gray-600 dark:text-gray-400 text-sm mt-1 ${className}`}>{children}</p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Separator = ({ className = '' }) => (
  <hr className={`border-gray-200 dark:border-gray-700 ${className}`} />
);

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200',
    green: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Enhanced Tab Components with Dark Mode
const Tabs = ({ children, defaultValue, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={`space-y-6 ${className}`}>
      {React.Children.map(children, (child) => {
        if (child.type === TabsList) {
          return React.cloneElement(child, {
            activeTab,
            onTabChange: setActiveTab
          });
        }
        if (child.type === TabsContent && child.props.value === activeTab) {
          return child;
        }
        return null;
      })}
    </div>
  );
};

const TabsList = ({ children, activeTab, onTabChange, className = '' }) => (
  <div className={`flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit ${className}`}>
    {React.Children.map(children, (child) =>
      React.cloneElement(child, {
        isActive: child.props.value === activeTab,
        onClick: () => onTabChange(child.props.value)
      })
    )}
  </div>
);

const TabsTrigger = ({ children, isActive, onClick, value, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
      isActive
        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
    } ${className}`}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, className = '' }) => (
  <div className={className}>{children}</div>
);

// Enhanced Accordion Components with Dark Mode
const Accordion = ({ children, className = '' }) => (
  <div className={`space-y-2 ${className}`}>{children}</div>
);

const AccordionItem = ({ children, value, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${className}`}>
      {React.Children.map(children, (child) => {
        if (child.type === AccordionTrigger) {
          return React.cloneElement(child, { isOpen, onClick: () => setIsOpen(!isOpen) });
        }
        if (child.type === AccordionContent) {
          return isOpen ? child : null;
        }
        return child;
      })}
    </div>
  );
};

const AccordionTrigger = ({ children, isOpen, onClick, className = '' }) => (
  <button
    className={`flex justify-between items-center w-full p-4 text-left font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${className}`}
    onClick={onClick}
  >
    <span>{children}</span>
    <ChevronDown className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
  </button>
);

const AccordionContent = ({ children, className = '' }) => (
  <div className={`p-4 pt-0 text-gray-600 dark:text-gray-400 text-sm leading-relaxed ${className}`}>
    {children}
  </div>
);

// Enhanced TutorialCard Component with Dark Mode
const TutorialCard = ({ title, description, duration, level = 'Beginner', isNew = false }) => {
  return (
    <Card hover className="group cursor-pointer">
      <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 relative flex items-center justify-center overflow-hidden">
        <PlayCircle className="h-12 w-12 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200" />
        {isNew && (
          <Badge variant="green" className="absolute top-3 right-3">
            New
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="blue">{level}</Badge>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3 mr-1" />
              {duration}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// SearchBox Component with Dark Mode
const SearchBox = ({ placeholder = "Search FAQs...", className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
      />
    </div>
  );
};

// Stats Component with Dark Mode
const StatsCard = ({ icon: Icon, title, value, description, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${colors[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main HelpPage Component
const HelpPageContent = () => {
  const [activeTab, setActiveTab] = useState('faqs');

  const faqData = [
    {
      question: "How accurate are the crop yield predictions?",
      answer: "Our crop yield predictions are based on historical data, current weather patterns, and machine learning models. They typically have an accuracy of 85-90% for most regions and crops. Accuracy may vary based on unusual weather events or other unforeseen factors."
    },
    {
      question: "How often is weather data updated?",
      answer: "Weather data is updated hourly for current conditions and every 6 hours for forecasts. Historical weather data is compiled daily. You can check the last update timestamp at the bottom of each weather card."
    },
    {
      question: "Can I export data from the dashboard?",
      answer: "Yes, you can export data in CSV, Excel, or PDF formats. Look for the export button in the top-right corner of each chart or table. You can choose to export specific data points or entire datasets."
    },
    {
      question: "How do I interpret the weather impact charts?",
      answer: "Weather impact charts show the correlation between specific weather events and crop yields. Blue areas indicate positive impacts (increased yield), while red areas indicate negative impacts (decreased yield). The intensity of the color represents the strength of the correlation."
    },
    {
      question: "What regions are covered by the dashboard?",
      answer: "Our dashboard currently covers major agricultural regions in North America, Europe, and parts of Asia. We're continuously expanding our coverage to include more regions globally. You can check specific coverage details in the region selection dropdown."
    },
    {
      question: "How do I set up alerts and notifications?",
      answer: "Navigate to Settings > Notifications to configure alerts for weather warnings, yield predictions, and data updates. You can choose to receive notifications via email, SMS, or in-app notifications."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Help & Support Center</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions, watch tutorials, and get the support you need to make the most of your agricultural dashboard.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsCard
            icon={Users}
            title="Active Users"
            value="10,000+"
            description="Farmers using our platform"
            color="blue"
          />
          <StatsCard
            icon={Clock}
            title="Avg Response Time"
            value="< 2 hours"
            description="Support ticket response"
            color="green"
          />
          <StatsCard
            icon={Shield}
            title="Uptime"
            value="99.9%"
            description="Platform reliability"
            color="purple"
          />
        </div>

        <Tabs defaultValue="faqs" className="space-y-6">
          <TabsList className="mb-8">
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
            <TabsTrigger value="data">Data Guide</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>

          <TabsContent value="faqs">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle>Frequently Asked Questions</CardTitle>
                      <CardDescription>
                        Find quick answers to the most common questions about our platform.
                      </CardDescription>
                    </div>
                    <SearchBox className="sm:max-w-xs" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion>
                    {faqData.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Still have questions?</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Our support team is here to help you succeed.</p>
                    </div>
                    <Button>Contact Support</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tutorial">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>
                    Learn how to use our platform with step-by-step video guides.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <TutorialCard
                      title="Getting Started"
                      description="Complete introduction to the dashboard and its main features"
                      duration="5 min"
                      level="Beginner"
                      isNew={true}
                    />
                    <TutorialCard
                      title="Weather Data Analysis"
                      description="Understanding weather patterns and their impact on crops"
                      duration="8 min"
                      level="Intermediate"
                    />
                    <TutorialCard
                      title="Advanced Predictions"
                      description="Using AI models for accurate yield forecasting"
                      duration="12 min"
                      level="Advanced"
                    />
                    <TutorialCard
                      title="Custom Reports"
                      description="Creating and sharing personalized agricultural reports"
                      duration="7 min"
                      level="Intermediate"
                    />
                    <TutorialCard
                      title="Mobile App Guide"
                      description="Using the companion mobile app for field data collection"
                      duration="6 min"
                      level="Beginner"
                    />
                    <TutorialCard
                      title="API Integration"
                      description="Connecting external systems with our API"
                      duration="15 min"
                      level="Advanced"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="data">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Understanding Your Data</CardTitle>
                  <CardDescription>
                    Learn how we collect, process, and protect your agricultural data.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Data Sources</h3>
                      </div>
                      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
                          <span>National Weather Service and global meteorological organizations</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
                          <span>USDA and international agricultural departments</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
                          <span>Satellite imagery and remote sensing data</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
                          <span>Historical crop yield databases spanning 50+ years</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                          <AlertCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Prediction Models</h3>
                      </div>
                      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full mt-2"></div>
                          <span>Machine learning algorithms trained on historical data</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full mt-2"></div>
                          <span>Statistical regression models for trend analysis</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full mt-2"></div>
                          <span>Climate pattern recognition systems</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full mt-2"></div>
                          <span>Real-time weather data integration</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Data Privacy & Security</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Your data security is our top priority. We implement industry-leading practices to protect your information.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                            <span>End-to-end encryption</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                            <span>GDPR compliant</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                            <span>Regular security audits</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                            <span>User data control</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card hover>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Email Support</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Send us a detailed message and we'll get back to you within 24 hours.
                        </p>
                        <Button className="w-full">
                          Send Email
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card hover>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Live Chat</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Chat with our support team in real-time during business hours.
                        </p>
                        <Button variant="success" className="w-full">
                          Start Chat
                          <MessageCircle className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card hover>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Phone Support</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Call us directly for urgent issues or complex technical problems.
                        </p>
                        <Button variant="outline" className="w-full">
                          (555) 123-4567
                          <Phone className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card hover>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Schedule Call</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Book a one-on-one session with our agricultural experts.
                        </p>
                        <Button variant="outline" className="w-full">
                          Book Consultation
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Support Hours</h3>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <p className="font-medium text-gray-900 dark:text-gray-100">Regular Support</p>
                        <p className="text-gray-600 dark:text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                        <p className="text-gray-600 dark:text-gray-400">Saturday: 10:00 AM - 4:00 PM EST</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium text-gray-900 dark:text-gray-100">Emergency Support</p>
                        <p className="text-gray-600 dark:text-gray-400">24/7 for critical system issues</p>
                        <p className="text-gray-600 dark:text-gray-400">Call: (555) 911-HELP</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const HelpPage = () => {
  return (
      <HelpPageContent />
  );
};

export default HelpPage;