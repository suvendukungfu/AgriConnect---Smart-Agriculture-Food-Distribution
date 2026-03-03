import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import LoginPage from './features/auth/LoginPage';
import DashboardPage from './features/dashboard/DashboardPage';
import AdminDashboard from './features/admin/AdminDashboard';
import { BottomNav } from './components/layout/BottomNav';
import './App.css';

function App() {
  return (
    <div className="App bg-background text-foreground min-h-screen pb-[64px] md:pb-0">
      <Routes>
            {/* Public Auth Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Farmer Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="farmer">
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />

            {/* Admin Protected Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Root/Fallback Redirection */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;
