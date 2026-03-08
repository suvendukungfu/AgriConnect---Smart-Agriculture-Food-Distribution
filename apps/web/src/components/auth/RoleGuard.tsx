import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@agriconnect/services';
import { UserRole } from '@agriconnect/types';

interface RoleGuardProps {
  children: ReactNode;
  requiredRole: UserRole | UserRole[];
  redirectPath?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  requiredRole, 
  redirectPath = '/unauthorized' 
}) => {
  const { user, isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  
  if (!user || !roles.includes(user.role)) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
