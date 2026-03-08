import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Tractor, 
  Sprout, 
  BarChart3, 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  X,
  Leaf
} from 'lucide-react';
import { cn } from '@agriconnect/ui';
import { useAuthStore } from '@agriconnect/services';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, clearSession } = useAuthStore();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Farms', href: '/farms', icon: Tractor },
    { name: 'Crop Cycle', href: '/crops', icon: Sprout },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Advisory', href: '/advisory', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 bottom-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-heading tracking-tight text-foreground">AgriConnect</span>
            </Link>
          </div>

          <nav className="flex-1 px-4 space-y-1 mt-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all group",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "group-hover:text-primary")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border mt-auto">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {user?.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-bold truncate text-foreground">{user?.name}</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">{user?.role}</p>
              </div>
              <button 
                onClick={() => {
                  clearSession();
                  window.location.href = '/login';
                }} 
                className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border bg-background/80 backdrop-blur-xl px-4 lg:px-8">
          <button 
            className="p-2 mr-4 rounded-lg bg-muted lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold font-heading truncate md:text-xl text-foreground">
              {navigation.find(n => n.href === location.pathname)?.name || 'AgriConnect'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
            </button>
            <div className="h-8 w-[1px] bg-border mx-2"></div>
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <User className="w-5 h-5 text-muted-foreground" />
              <span className="hidden md:block text-sm font-bold text-foreground">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
