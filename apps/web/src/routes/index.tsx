import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { RoleGuard } from '../components/auth/RoleGuard';
import DashboardPage from '../features/dashboard/DashboardPage';
import { FarmManagementPage } from '../features/farms/pages/FarmManagementPage';
import { CropLifecyclePage } from '../features/farmer/pages/CropLifecyclePage';
import { AnalyticsPage } from '../features/analytics/pages/AnalyticsPage';
import { AdvisoryPage } from '../features/advisory/pages/AdvisoryPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<div>Signup Page</div>} />
      <Route path="/forgot-password" element={<div>Forgot Password</div>} />
      <Route path="/unauthorized" element={<div className="p-20 text-center text-foreground font-bold">Unauthorized Access</div>} />

      {/* Protected Routes (Authenticated only) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

       <Route
        path="/farms"
        element={
          <ProtectedRoute>
            <FarmManagementPage />
          </ProtectedRoute>
        }
      />

       <Route
        path="/crops"
        element={
          <ProtectedRoute>
            <CropLifecyclePage />
          </ProtectedRoute>
        }
      />

       <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        }
      />

       <Route
        path="/advisory"
        element={
          <ProtectedRoute>
            <AdvisoryPage />
          </ProtectedRoute>
        }
      />

      {/* Admin Protected Routes */}
      <Route
        path="/admin"
        element={
          <RoleGuard requiredRole={['admin', 'super_admin']}>
            <div className="p-20 text-center text-foreground font-bold font-heading">Admin Dashboard Overview - Work in Progress</div>
          </RoleGuard>
        }
      />

      {/* Default Redirection */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  );
};
