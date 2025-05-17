// Weather Summary Data
export const weatherSummaryData = {
  temperature: 32,
  rainfall: 45,
  humidity: 78,
  location: 'Lucknow, UP'
};

// Crop Yield Data
export const cropYieldData = {
  cropType: 'Rice',
  yieldValue: 4.8,
  unit: 't/ha',
  season: 'Kharif',
  year: 2025
};

// District Map Data
export const districtData = [
  { id: 'D01', name: 'Agra', cropYield: 3.8, rainfall: 35 },
  { id: 'D02', name: 'Aligarh', cropYield: 4.2, rainfall: 40 },
  { id: 'D03', name: 'Allahabad', cropYield: 3.6, rainfall: 55 },
  { id: 'D04', name: 'Azamgarh', cropYield: 4.7, rainfall: 65 },
  { id: 'D05', name: 'Bareilly', cropYield: 3.2, rainfall: 30 },
  { id: 'D06', name: 'Gorakhpur', cropYield: 4.5, rainfall: 60 },
  { id: 'D07', name: 'Jhansi', cropYield: 2.8, rainfall: 25 },
  { id: 'D08', name: 'Kanpur', cropYield: 3.9, rainfall: 45 },
  { id: 'D09', name: 'Lucknow', cropYield: 4.1, rainfall: 50 },
  { id: 'D10', name: 'Meerut', cropYield: 4.3, rainfall: 55 }
];

// Forecast Data
export const forecastData = [
  { name: 'Jan', prediction: 3.5, historical: 3.2, confidenceLower: 3.2, confidenceUpper: 3.8 },
  { name: 'Feb', prediction: 3.8, historical: 3.5, confidenceLower: 3.5, confidenceUpper: 4.1 },
  { name: 'Mar', prediction: 4.2, historical: 3.9, confidenceLower: 3.9, confidenceUpper: 4.5 },
  { name: 'Apr', prediction: 4.5, historical: 4.1, confidenceLower: 4.2, confidenceUpper: 4.8 },
  { name: 'May', prediction: 4.7, historical: 4.3, confidenceLower: 4.4, confidenceUpper: 5.0 },
  { name: 'Jun', prediction: 4.3, historical: 4.0, confidenceLower: 4.0, confidenceUpper: 4.6 }
];

// Weather Impact Data
export const weatherImpactData = [
  { month: 'Jan', rainfall: 20, temperature: 16 },
  { month: 'Feb', rainfall: 25, temperature: 18 },
  { month: 'Mar', rainfall: 30, temperature: 22 },
  { month: 'Apr', rainfall: 35, temperature: 26 },
  { month: 'May', rainfall: 45, temperature: 32 },
  { month: 'Jun', rainfall: 150, temperature: 34 },
  { month: 'Jul', rainfall: 200, temperature: 33 },
  { month: 'Aug', rainfall: 180, temperature: 32 },
  { month: 'Sep', rainfall: 100, temperature: 30 },
  { month: 'Oct', rainfall: 50, temperature: 28 },
  { month: 'Nov', rainfall: 30, temperature: 24 },
  { month: 'Dec', rainfall: 20, temperature: 18 }
];

// Early Warnings
export const warningsData = [
  {
    id: 'W001',
    type: 'flood',
    district: 'Gorakhpur',
    severity: 'critical',
    message: 'Expected heavy rainfall in 3 days. Prepare for potential flooding.',
    timeframe: 'Expected in 72 hours'
  },
  {
    id: 'W002',
    type: 'drought',
    district: 'Jhansi',
    severity: 'high',
    message: 'Prolonged dry spell expected to continue for 2 weeks.',
    timeframe: 'Ongoing, expected for 14 more days'
  },
  {
    id: 'W003',
    type: 'pest',
    district: 'Aligarh',
    severity: 'medium',
    message: 'Locust swarm reported in neighboring regions, monitor closely.',
    timeframe: 'Potential risk in 4-5 days'
  }
];