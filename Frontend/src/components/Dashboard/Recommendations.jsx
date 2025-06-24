import React from 'react';
import { Lightbulb, CheckCircle2, ArrowRight, ArrowUpRight } from 'lucide-react';

const Recommendations = ({
  recommendations = [
    {
      id: 1,
      text: "Consider delaying rice planting in Gorakhpur by 5-7 days due to expected heavy rainfall.",
      priority: "high",
      category: "planting"
    },
    {
      id: 2,
      text: "Increase irrigation frequency in Jhansi district to mitigate drought conditions.",
      priority: "high",
      category: "irrigation"
    },
    {
      id: 3,
      text: "Prepare pest control measures in Aligarh as preventive action.",
      priority: "medium",
      category: "pest"
    },
    {
      id: 4,
      text: "Eastern UP shows better yield potential for Kharif Rice compared to Western districts.",
      priority: "low",
      category: "planning"
    }
  ],
  lastUpdated = "12 hours ago"
}) => {
  // Get priority styling
  const getPriorityClasses = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200';
      case 'medium':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200';
      case 'low':
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const iconClasses = "h-4 w-4 text-gray-600 dark:text-gray-300";
    switch (category) {
      case 'planting':
        return <ArrowUpRight className={iconClasses} />;
      case 'irrigation':
        return <ArrowUpRight className={iconClasses} />;
      case 'pest':
        return <ArrowUpRight className={iconClasses} />;
      case 'planning':
        return <ArrowUpRight className={iconClasses} />;
      default:
        return <ArrowRight className={iconClasses} />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 h-full overflow-hidden">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <Lightbulb className="h-5 w-5 text-emerald-500 dark:text-emerald-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Recommendations</h3>
        </div>
        <span className="text-sm font-medium px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
          {recommendations.length} items
        </span>
      </div>
      
      <div className="p-6">
        <div className="mb-4 flex items-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 mr-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Actionable Insights</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Based on current conditions and forecasts</p>
          </div>
        </div>
        
        <ul className="space-y-4 mt-6">
          {recommendations.map((recommendation) => (
            <li 
              key={recommendation.id} 
              className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
            >
              <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full ${getPriorityClasses(recommendation.priority)} text-sm font-medium mr-3 flex-shrink-0`}>
                {recommendation.id}
              </span>
              <div className="flex-grow">
                <p className="text-gray-800 dark:text-gray-200">{recommendation.text}</p>
                <div className="flex items-center mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getPriorityClasses(recommendation.priority)}`}>
                    {recommendation.priority.toUpperCase()} PRIORITY
                  </span>
                  <span className="inline-flex items-center ml-2 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium">
                    {getCategoryIcon(recommendation.category)}
                    <span className="ml-1">{recommendation.category.charAt(0).toUpperCase() + recommendation.category.slice(1)}</span>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700 bg-emerald-50 dark:bg-emerald-900/30">
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <Lightbulb className="h-4 w-4 mr-1" />
          Updated with latest regional agricultural data
        </p>
      </div>
    </div>
  );
};

export default Recommendations;