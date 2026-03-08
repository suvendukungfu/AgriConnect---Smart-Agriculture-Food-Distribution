import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { RoleGuard } from '../components/auth/RoleGuard';
import DashboardLayout from '../components/layout/DashboardLayout';

// Features (Standard lazy loading would be better, but keeping it direct for reliability now)
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

      {/* Protected Layout Wrapper */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Farmer Specific */}
        <Route element={<RoleGuard requiredRole={['farmer']} />}>
          <Route path="/farms" element={<FarmManagementPage />} />
          <Route path="/crops" element={<CropLifecyclePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/advisory" element={<AdvisoryPage />} />
          <Route path="/marketplace" element={<div className="p-10 text-center font-bold">Marketplace - Coming Soon</div>} />
          <Route path="/finance" element={<div className="p-10 text-center font-bold">Finance - Coming Soon</div>} />
        </Route>

        {/* Buyer Specific */}
        <Route element={<RoleGuard requiredRole={['buyer']} />}>
          <Route path="/orders" element={<div className="p-10 text-center font-bold">Orders - Coming Soon</div>} />
        </Route>

        {/* Agronomist Specific */}
        <Route element={<RoleGuard requiredRole={['agro']} />}>
          <Route path="/farmers" element={<div className="p-10 text-center font-bold">Farmers Management - Coming Soon</div>} />
          <Route path="/advisory-queue" element={<div className="p-10 text-center font-bold">Advisory Queue - Coming Soon</div>} />
          <Route path="/risk-map" element={<div className="p-10 text-center font-bold">Risk Management Map - Coming Soon</div>} />
        </Route>

        {/* Admin Specific */}
        <Route element={<RoleGuard requiredRole={['admin', 'super_admin']} />}>
          <Route path="/admin" element={<div className="p-10 text-center font-bold">Admin Dashboard Overview</div>} />
          <Route path="/admin/users" element={<div>Users Management</div>} />
          <Route path="/admin/system-health" element={<div>System Health</div>} />
        </Route>

        <Route path="/settings" element={<div className="p-10 text-center font-bold">User Settings</div>} />
      </Route>

      {/* Default Redirection */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  );
};
