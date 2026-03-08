import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { TopNavigation } from './TopNavigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'farmer' | 'admin';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // If user is authenticated but not the right role (e.g., farmer trying to access admin)
    // Redirect them to their appropriate default view
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <TopNavigation />
      <main className="flex-1 w-full max-w-screen-2xl mx-auto p-4 md:p-6 lg:p-8 pt-6">
        {children}
      </main>
    </div>
  );
}
