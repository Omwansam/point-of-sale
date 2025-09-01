import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Menu from './pages/Menu';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import Employees from './pages/Employees';
import Kitchen from './pages/Kitchen';
import Layout from './components/Layout';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={
                <ProtectedRoute allowedRoles={['admin', 'cashier', 'waiter']}>
                  <Orders />
                </ProtectedRoute>
              } />
              <Route path="menu" element={
                <ProtectedRoute allowedRoles={['admin', 'cashier', 'waiter']}>
                  <Menu />
                </ProtectedRoute>
              } />
              <Route path="inventory" element={
                <ProtectedRoute allowedRoles={['admin', 'inventory']}>
                  <Inventory />
                </ProtectedRoute>
              } />
              <Route path="analytics" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="employees" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Employees />
                </ProtectedRoute>
              } />
              <Route path="kitchen" element={
                <ProtectedRoute allowedRoles={['admin', 'kitchen']}>
                  <Kitchen />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
      </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
