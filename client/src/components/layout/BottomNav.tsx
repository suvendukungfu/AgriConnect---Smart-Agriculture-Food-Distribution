import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, UploadCloud, Store, Bell, User, WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

export function BottomNav() {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [syncQueueSize, setSyncQueueSize] = useState(0); // Mocking IndexedDB queue size
  
  // Real-time offline detection
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Listen for custom SW sync events (mocked)
    const handleSyncUpdate = (e: any) => setSyncQueueSize(e.detail || 0);
    window.addEventListener('agriconnect-sync', handleSyncUpdate);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('agriconnect-sync', handleSyncUpdate);
    };
  }, []);

  // Strict Role Guard: Only render for Farmers
  if (!isAuthenticated || user?.role !== 'farmer') return null;

  const tabs = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Upload', path: '/upload', icon: UploadCloud, badge: syncQueueSize > 0 ? syncQueueSize : null },
    { name: 'Market', path: '/marketplace', icon: Store },
    { name: 'Alerts', path: '/alerts', icon: Bell, alertVariant: true }, // AI Alert Example
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav 
      aria-label="Farmer Mobile Navigation"
      className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border pb-safe"
    >
      {/* Offline Indicator Layer */}
      {isOffline && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 bg-destructive text-destructive-foreground text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-50 whitespace-nowrap"
        >
          <WifiOff size={14} /> 
          {syncQueueSize > 0 ? `Offline Mode (${syncQueueSize} pending logs)` : 'Offline Mode'}
        </motion.div>
      )}
      
      <ul className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = location.pathname.startsWith(tab.path);
          return (
            <li key={tab.name} className="relative flex flex-1 h-full">
              <NavLink
                to={tab.path}
                className={`flex flex-col items-center justify-center w-full min-h-[48px] min-w-[48px] transition-colors rounded-xl mx-1
                  ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Navigate to ${tab.name}`}
              >
                <div className="relative pointer-events-none">
                  <tab.icon size={isActive ? 26 : 24} className="transition-all duration-200" aria-hidden="true" />
                  
                  {/* AI Alert Indicator */}
                  {tab.alertVariant && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive border-2 border-background"></span>
                    </span>
                  )}
                  
                  {/* Sync Queue Badge */}
                  {tab.badge && (
                    <span className="absolute -top-2 -right-3 flex items-center justify-center h-4 w-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full border-2 border-background shadow-sm">
                      {tab.badge}
                    </span>
                  )}
                </div>
                
                <span className="text-[10px] mt-1 font-medium tracking-wide select-none">
                  {tab.name}
                </span>

                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-indicator"
                    className="absolute -top-[1px] left-1/2 w-8 h-[3px] bg-primary rounded-b-full"
                    style={{ x: '-50%' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
