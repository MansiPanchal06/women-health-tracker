import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import PeriodTracker from './pages/dashboard/PeriodTracker';
import MoodTracker from './pages/dashboard/MoodTracker';
import WaterTracker from './pages/dashboard/WaterTracker';
import Blogs from './pages/dashboard/Blogs';
import BlogDetail from './pages/dashboard/BlogDetail';
import Profile from './pages/dashboard/Profile';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route path="/register"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />}
      />
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      }/>
      <Route path="/period" element={
        <ProtectedRoute><PeriodTracker /></ProtectedRoute>
      }/>
      <Route path="/mood" element={
        <ProtectedRoute><MoodTracker /></ProtectedRoute>
      }/>
      <Route path="/water" element={
        <ProtectedRoute><WaterTracker /></ProtectedRoute>
      }/>
      <Route path="/blogs" element={
        <ProtectedRoute><Blogs /></ProtectedRoute>
      }/>
      <Route path="/blogs/:id" element={
        <ProtectedRoute><BlogDetail /></ProtectedRoute>
      }/>
      <Route path="/profile" element={
        <ProtectedRoute><Profile /></ProtectedRoute>
      }/>
      <Route path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl text-pink-500">404 - Page Not Found 🌸</h1>
        </div>
      }/>
    </Routes>
  );
}

export default App;