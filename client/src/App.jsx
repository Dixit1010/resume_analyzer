import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ResumeUpload from './pages/ResumeUpload';
import ATSScore from './pages/ATSScore';
import JDMatch from './pages/JDMatch';
import RewriteSuggestions from './pages/RewriteSuggestions';
import History from './pages/History';
import Settings from './pages/Settings';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return null;
  }
  
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <PrivateRoute>
            <ResumeUpload />
          </PrivateRoute>
        }
      />
      <Route
        path="/ats-score/:resumeId"
        element={
          <PrivateRoute>
            <ATSScore />
          </PrivateRoute>
        }
      />
      <Route
        path="/jd-match/:resumeId"
        element={
          <PrivateRoute>
            <JDMatch />
          </PrivateRoute>
        }
      />
      <Route
        path="/rewrite/:resumeId"
        element={
          <PrivateRoute>
            <RewriteSuggestions />
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;

