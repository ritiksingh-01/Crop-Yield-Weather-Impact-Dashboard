import React, { useState } from "react";
import { 
  Sprout, DropletIcon, DollarSignIcon, TrendingUpIcon, LoaderIcon, AlertTriangleIcon 
} from "lucide-react";

const CropPredictionDashboard = () => {
  const [formData, setFormData] = useState({
    crop_name: '',
    crop_variety: '',
    region: '',
    area_sown: '',
    year: '',
    month: '',
    rainfall: '',
    irrigated_percent: '',
    fertilizer_used: '',
    yield: '',
    msp: '',
    market_demand: '',
    export_demand: '',
    input_cost: '',
    transport_cost: '',
    govt_scheme_active: '',
    cold_storage_available: '',
    mandi_open: '',
    modelChoice: 'xgboost',
  });
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [savedPredictions, setSavedPredictions] = useState([]);

  // Handle change for all inputs
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // For select and radio inputs, value is string. For numbers, convert.
    let val = value;
    if (type === "number") {
      val = value === "" ? "" : Number(value);
    }
    setFormData(prev => ({
      ...prev,
      [name]: val,
    }));
  };

  // Validate form data before prediction
  const validateForm = () => {
    // Basic validation: required fields non-empty
    if (!formData.crop_name) return "Please select a crop type.";
    if (!formData.region) return "Please select a region.";
    if (!formData.year || formData.year < 2020 || formData.year > 2025)
      return "Please enter a valid year between 2020 and 2025.";
    if (!formData.month) return "Please select a month.";
    if (!formData.modelChoice) return "Please select a prediction model.";
    // Additional validations can be added as needed
    return null;
  };

  // Simulate prediction generation
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setPredictionResult(null);

    // Simulate prediction delay
    setTimeout(() => {
      // Mock prediction logic
      // For demo: predicted_price = base + some factor + randomness
      const basePrices = {
        Wheat: 1850,
        Rice: 2000,
        Corn: 1700,
        Sugarcane: 1400,
        Cotton: 2200,
      };
      let basePrice = basePrices[formData.crop_name] || 1800;

      // Adjust by rainfall, demand, etc.
      const rainfallFactor = formData.rainfall ? formData.rainfall * 0.5 : 0;
      const demandFactor = formData.market_demand ? formData.market_demand * 50 : 0;
      const exportFactor = formData.export_demand ? formData.export_demand * 30 : 0;
      const modelBoost = formData.modelChoice === "xgboost" ? 1.05 : 1.0;
      const randomness = (Math.random() - 0.5) * 100;

      const predicted_price = Math.round(
        (basePrice + rainfallFactor + demandFactor + exportFactor + randomness) * modelBoost
      );

      setPredictionResult({
        predicted_price,
        model_r2_score: formData.modelChoice === "xgboost" ? 0.85 : 0.80,
        elapsed_time_sec: 0.7 + Math.random() * 0.5,
      });
      setLoading(false);
    }, 1500);
  };

  // Export saved predictions as CSV
  const exportCSV = () => {
    if (savedPredictions.length === 0) return;
    const header = "Crop,Price (₹),Date\n";
    const rows = savedPredictions
      .map(p => `${p.crop},${p.price},${p.date}`)
      .join("\n");
    const csvContent = header + rows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "saved_predictions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Sprout className="h-8 w-8 text-green-500 mr-3" />
            Crop Price Prediction
          </h1>
          <p className="text-gray-600 mt-2">
            Enter crop details to predict market prices based on environmental and economic factors
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button 
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className={`flex-1 py-4 px-6 text-center font-medium ${activeStep === 1 ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500'}`}
                >
                  Crop & Location
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className={`flex-1 py-4 px-6 text-center font-medium ${activeStep === 2 ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500'}`}
                >
                  Growing Conditions
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className={`flex-1 py-4 px-6 text-center font-medium ${activeStep === 3 ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500'}`}
                >
                  Market Factors
                </button>
              </div>

              <div className="p-6">
                {activeStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Crop & Location Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Crop Type
                        </label>
                        <select 
                          name="crop_name"
                          value={formData.crop_name}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select crop</option>
                          <option value="Wheat">Wheat</option>
                          <option value="Rice">Rice</option>
                          <option value="Corn">Corn</option>
                          <option value="Sugarcane">Sugarcane</option>
                          <option value="Cotton">Cotton</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Crop Variety
                        </label>
                        <input
                          type="text"
                          name="crop_variety"
                          value={formData.crop_variety}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="e.g., Basmati, Durum"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Region
                        </label>
                        <select
                          name="region"
                          value={formData.region}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select region</option>
                          <option value="Lucknow">Lucknow</option>
                          <option value="Kanpur">Kanpur</option>
                          <option value="Varanasi">Varanasi</option>
                          <option value="Agra">Agra</option>
                          <option value="Meerut">Meerut</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Area Sown (hectares)
                        </label>
                        <input
                          type="number"
                          name="area_sown"
                          value={formData.area_sown}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="e.g., 5.5"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year
                        </label>
                        <input
                          type="number"
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          min="2020"
                          max="2025"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="e.g., 2025"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Month
                        </label>
                        <select
                          name="month"
                          value={formData.month}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select month</option>
                          {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                            <option key={m} value={m}>
                              {new Date(2000, m-1).toLocaleString('default', { month: 'long' })}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setActiveStep(2)}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Growing Conditions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <DropletIcon className="h-4 w-4 text-blue-500 mr-1" />
                          Rainfall (mm)
                        </label>
                        <input
                          type="number"
                          name="rainfall"
                          value={formData.rainfall}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="e.g., 85.5"
                          min="0"
                          step="0.1"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Irrigated Area (%)
                        </label>
                        <input
                          type="number"
                          name="irrigated_percent"
                          value={formData.irrigated_percent}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="e.g., 75"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fertilizer Used (kg)
                        </label>
                        <input
                          type="number"
                          name="fertilizer_used"
                          value={formData.fertilizer_used}
                          onChange={handleChange}
                          min="0"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="e.g., 200"
                        />
                      </div>

                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expected Yield (kg/hectare)
                        </label>
                        <input
                          type="number"
                          name="yield"
                          value={formData.yield}
                          onChange={handleChange}
                          min="0"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="e.g., 3500"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveStep(1)}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveStep(3)}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Market Factors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          MSP (₹)
                        </label>
                        <input
                          type="number"
                          name="msp"
                          value={formData.msp}
                          onChange={handleChange}
                          min="0"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="e.g., 1975"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Market Demand
                        </label>
                        <select
                          name="market_demand"
                          value={formData.market_demand}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select demand level</option>
                          <option value="1">Low</option>
                          <option value="2">Medium</option>
                          <option value="3">High</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Export Demand
                        </label>
                        <select
                          name="export_demand"
                          value={formData.export_demand}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select export demand</option>
                          <option value="1">Low</option>
                          <option value="2">Medium</option>
                          <option value="3">High</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Input Cost (₹)
                        </label>
                        <input
                          type="number"
                          name="input_cost"
                          value={formData.input_cost}
                          onChange={handleChange}
                          min="0"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="e.g., 15000"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Transport Cost (₹)
                        </label>
                        <input
                          type="number"
                          name="transport_cost"
                          value={formData.transport_cost}
                          onChange={handleChange}
                          min="0"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="e.g., 2500"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Government Scheme Active?
                        </label>
                        <select
                          name="govt_scheme_active"
                          value={formData.govt_scheme_active}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cold Storage?
                          </label>
                          <select
                            name="cold_storage_available"
                            value={formData.cold_storage_available}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                        
                        <div className="form-group">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mandi Open?
                          </label>
                          <select
                            name="mandi_open"
                            value={formData.mandi_open}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Prediction Model</h3>
                      <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="modelChoice"
                            value="xgboost"
                            checked={formData.modelChoice === "xgboost"}
                            onChange={handleChange}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            required
                          />
                          <span className="ml-2 text-sm text-gray-700">XGBoost</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="modelChoice"
                            value="randomforest"
                            checked={formData.modelChoice === "randomforest"}
                            onChange={handleChange}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">Random Forest</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveStep(2)}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center"
                      >
                        {loading ? (
                          <>
                            <LoaderIcon className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                            Processing...
                          </>
                        ) : (
                          <>Generate Prediction</>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <DollarSignIcon className="h-5 w-5 text-green-500 mr-2" />
                  Price Prediction
                </h2>
                
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <LoaderIcon className="animate-spin h-10 w-10 text-green-500 mb-4" />
                    <p className="text-gray-600">Analyzing crop data...</p>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex">
                      <AlertTriangleIcon className="h-5 w-5 text-red-400" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                        <p className="text-sm text-red-700 mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                ) : predictionResult ? (
                  <div className="space-y-6">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-sm font-medium text-green-700 mb-1">Predicted Price</p>
                      <div className="flex items-center justify-center">
                        <span className="text-4xl font-bold text-green-800">₹{predictionResult.predicted_price}</span>
                        <span className="ml-1 text-sm text-green-600">/quintal</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Accuracy</p>
                        <p className="font-semibold text-gray-800">{(predictionResult.model_r2_score * 100).toFixed(1)}%</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Processing Time</p>
                        <p className="font-semibold text-gray-800">{predictionResult.elapsed_time_sec.toFixed(2)}s</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Current Market Price</span>
                        <span className="font-medium">₹1,845/quintal</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Price Difference</span>
                        <span className="font-medium flex items-center text-green-600">
                          <TrendingUpIcon className="h-4 w-4 mr-1" />
                          +8.4%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        type="button"
                        onClick={() => {
                          setSavedPredictions(prev => [
                            ...prev,
                            {
                              id: Date.now(),
                              crop: formData.crop_name,
                              price: predictionResult.predicted_price,
                              date: new Date().toLocaleDateString()
                            }
                          ]);
                        }}
                        className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                      >
                        Save
                      </button>
                      <button 
                        type="button"
                        onClick={exportCSV}
                        className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                      >
                        Export
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-gray-500 mb-2">Complete the form to generate a price prediction</p>
                    <p className="text-sm text-gray-400">Results will appear here</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-800">Saved Predictions</h2>
              </div>
              
              <div className="p-4">
                {savedPredictions.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {savedPredictions.map(prediction => (
                      <div key={prediction.id} className="py-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{prediction.crop}</p>
                          <p className="text-sm text-gray-500">{prediction.date}</p>
                        </div>
                        <p className="font-semibold">₹{prediction.price}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">No saved predictions</p>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-800">Key Influencing Factors</h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rainfall</span>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: formData.rainfall ? Math.min(formData.rainfall, 100) + '%' : '0%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Market Demand</span>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: formData.market_demand ? (formData.market_demand * 33.3) + '%' : '0%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">MSP</span>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: formData.msp ? Math.min(formData.msp / 30, 100) + '%' : '0%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Yield</span>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: formData.yield ? Math.min(formData.yield / 1000, 100) + '%' : '0%' }}></div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">Factors contributing to the current prediction</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CropPredictionDashboard;

