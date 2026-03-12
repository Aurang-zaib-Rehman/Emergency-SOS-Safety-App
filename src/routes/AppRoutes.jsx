// routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Login     from '../pages/Login';
import Signup    from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Contacts  from '../pages/Contacts';
import MapPage   from '../pages/MapPage';

function AppLayout({ children }) {
  return <><Navbar />{children}</>;
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" replace />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"  element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
        <Route path="/contact"   element={<ProtectedRoute><AppLayout><Contacts /></AppLayout></ProtectedRoute>} />
        <Route path="/map"       element={<ProtectedRoute><AppLayout><MapPage /></AppLayout></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}