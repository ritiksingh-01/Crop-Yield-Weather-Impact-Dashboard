import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Overview from './pages/Overview';
import Forecast from './pages/Forecast';
import Analysis from './pages/Analysis';
import Warnings from './pages/Warnings';
import CropPredictionDashboard from './pages/CropPredictionDashboard';
import SettingsPage from './pages/SettingPage';
import HelpPage from './pages/HelpPage';
import AuthPage from './pages/AuthPage';

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
          <Route path="/login" element={<AuthPage />} />
          <Route path="/helpPage" element={<HelpPage />} />
          <Route path="/setting" element={<SettingsPage/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;