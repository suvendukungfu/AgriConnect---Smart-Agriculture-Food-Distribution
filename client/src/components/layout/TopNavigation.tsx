import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Leaf, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from './ThemeToggle';

export function TopNavigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center space-x-2 mr-6">
            <span className="bg-primary text-primary-foreground p-1 rounded-md">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="hidden font-bold sm:inline-block font-heading tracking-tight text-lg">
              AgriConnect
            </span>
          </Link>
          
          {user?.role === 'admin' && (
            <Badge variant="destructive" className="hidden sm:flex items-center uppercase text-[10px] tracking-widest px-2 py-0.5">
              <ShieldAlert className="w-3 h-3 mr-1" /> Admin
            </Badge>
          )}
        </div>

        {/* User Actions */}
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <ThemeToggle />
          <nav className="flex items-center space-x-2">
            
            <div className="hidden sm:flex flex-col items-end mr-4">
              <span className="text-sm font-medium leading-none">{user?.name}</span>
              <span className="text-xs text-muted-foreground mt-1 capitalize">{user?.role} {user?.region && `• ${user.region}`}</span>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center text-sm font-semibold uppercase text-secondary">
              {user?.name.charAt(0)}
            </div>

            <button 
              onClick={handleLogout}
              className="ml-4 p-2 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Logout</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
