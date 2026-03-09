import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Leaf, 
  LogOut, 
  X
} from 'lucide-react';
import { useAuthStore, authService } from '@agriconnect/services';
import { UserRole } from '@agriconnect/types';
import { cn, Button } from '@agriconnect/ui';
import { motion } from 'framer-motion';
import { NAVIGATION_CONFIG } from '../../config/navigation';

interface SidebarProps {
  isCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  mobile?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed = false, 
  onCollapse,
  mobile = false,
  onClose
}) => {
  const { user, clearSession } = useAuthStore();
  const location = useLocation();

  const role = (user?.role || 'farmer') as Exclude<UserRole, null>;
  const navigationItems = NAVIGATION_CONFIG[role] || [];

  const handleLogout = async () => {
    try {
      await authService.logout();
      clearSession();
    } catch (error) {
      clearSession();
    }
  };

  const SidebarContent = (
    <div className={cn(
      "flex h-full flex-col bg-background/60 border-r border-border backdrop-blur-xl transition-all duration-300 ease-in-out group/sidebar",
      isCollapsed ? "w-20" : "w-64",
      mobile && "w-72 border-none bg-background shadow-2xl"
    )}>
      {/* Brand Logo */}
      <div className={cn(
        "flex h-16 items-center px-6 border-b border-border/50",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        <motion.div 
          layout
          className="flex items-center gap-3 overflow-hidden"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 ring-4 ring-primary/10">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg font-black tracking-tighter text-foreground"
            >
              AgriConnect
            </motion.span>
          )}
        </motion.div>
        
        {mobile && (
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto overflow-x-hidden p-3 custom-scrollbar">
        {navigationItems.map((item: any) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={mobile ? onClose : undefined}
              className={cn(
                "group relative flex items-center rounded-xl px-3 py-2.5 transition-all duration-300 ease-out",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-bold" 
                  : "text-muted-foreground hover:bg-muted font-semibold hover:text-foreground",
                isCollapsed && "justify-center px-2"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110",
                isActive ? "text-white" : "text-muted-foreground group-hover:text-primary"
              )} />
              
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-3 truncate"
                >
                  {item.name}
                </motion.span>
              )}

              {/* Tooltip for collapsed mode */}
              {isCollapsed && !mobile && (
                <div className="invisible absolute left-full ml-6 rounded-md bg-foreground px-2 py-1 text-xs font-bold text-background opacity-0 transition-all group-hover:visible group-hover:ml-4 group-hover:opacity-100 z-50 whitespace-nowrap shadow-xl">
                  {item.name}
                  <div className="absolute top-1/2 -left-1 -mt-1 h-2 w-2 rotate-45 bg-foreground" />
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Profile / Bottom Section */}
      <div className="p-4 border-t border-border/50 bg-muted/20">
        <div className={cn(
          "flex items-center gap-3",
          isCollapsed ? "flex-col justify-center" : "flex-row"
        )}>
          {!isCollapsed && !mobile && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCollapse?.(true)}
              className="h-8 w-8 rounded-lg p-0 border-border/50 hover:bg-background"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          
          {isCollapsed && !mobile && (
             <Button
              variant="outline"
              size="sm"
              onClick={() => onCollapse?.(false)}
              className="h-8 w-8 rounded-lg p-0 border-border/50 hover:bg-background"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}

          {!isCollapsed && (
            <div className="flex-1 min-w-0">
               <button 
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-xs font-bold text-destructive hover:bg-destructive/10 transition-all opacity-70 hover:opacity-100"
                >
                  <LogOut className="h-3.5 w-3.5" /> 
                  <span className="truncate uppercase tracking-wider">Log Out</span>
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (mobile) {
    return SidebarContent;
  }

  return (
    <aside className={cn(
      "sticky top-0 h-screen hidden md:block z-40 transition-all duration-300 ease-in-out",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {SidebarContent}
    </aside>
  );
};
