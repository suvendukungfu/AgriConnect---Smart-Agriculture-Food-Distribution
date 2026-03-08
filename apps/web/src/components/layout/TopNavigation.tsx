import React, { useState } from 'react';
import { Search, Bell, LogOut, User, Settings, Menu } from 'lucide-react';
import { useAuthStore, authService } from '@agriconnect/services';
import { Avatar, Input, Button, cn } from '@agriconnect/ui';
import { NotificationDropdown } from './NotificationDropdown';
import { motion, AnimatePresence } from 'framer-motion';

interface TopNavigationProps {
  onMenuClick?: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ onMenuClick }) => {
  const { user, clearSession } = useAuthStore();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
      clearSession();
    } catch (error) {
      console.error('Logout failed', error);
      clearSession(); // Fallback
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/60 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-4 flex-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onMenuClick} 
          className="md:hidden p-2"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="relative max-w-md w-full hidden md:block group">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="search"
            placeholder="Search farms, crops, pricing..."
            className="h-10 w-full rounded-xl border border-border bg-muted/30 pl-10 pr-4 text-sm font-medium outline-none ring-primary/20 transition-all focus:border-primary/50 focus:bg-background focus:ring-4"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "relative rounded-xl p-2.5 transition-all hover:bg-muted",
              isNotifOpen && "bg-muted shadow-inner"
            )}
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsProfileOpen(false);
            }}
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive"></span>
            </span>
          </Button>
          <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotifOpen(false);
            }}
            className={cn(
              "flex items-center gap-3 p-1 rounded-full transition-all hover:bg-muted group",
              isProfileOpen && "bg-muted"
            )}
          >
            <Avatar 
              src={user?.avatarUrl} 
              fallback={user?.name || 'User'} 
              size="sm"
              className="border-2 border-transparent group-hover:border-primary/20"
            />
            <div className="hidden lg:flex flex-col items-start pr-2">
              <span className="text-xs font-bold text-foreground leading-none">{user?.name}</span>
              <span className="text-[10px] font-medium text-muted-foreground capitalize leading-none mt-1">{user?.role}</span>
            </div>
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-52 z-50 overflow-hidden shadow-2xl rounded-2xl border border-border bg-card/80 backdrop-blur-xl"
                >
                  <div className="p-4 border-b border-border bg-muted/20">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Account</p>
                    <p className="text-sm font-bold truncate text-foreground">{user?.email}</p>
                  </div>
                  <div className="p-1">
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                      <User className="h-4 w-4" /> Profile
                    </button>
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                      <Settings className="h-4 w-4" /> Settings
                    </button>
                  </div>
                  <div className="p-1 border-t border-border mt-1">
                    <button 
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-destructive hover:bg-destructive/10 transition-all"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
