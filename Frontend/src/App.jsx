import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Overview from './pages/Overview';
import Forecast from './pages/Forecast';
import Analysis from './pages/Analysis';
import Warnings from './pages/Warnings';
import CropPredictionDashboard from './pages/CropPredictionDashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/cropPrediction" element={<CropPredictionDashboard />} />
          <Route path="/warnings" element={<Warnings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;