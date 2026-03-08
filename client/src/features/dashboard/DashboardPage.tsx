import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { YieldCockpit } from './components/YieldCockpit';
import { AgrisCard } from '@/components/shared/AgrisCard';
import { Bell, MapPin, TrendingUp, AlertTriangle, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

// Create a client
const queryClient = new QueryClient();

export default function DashboardPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background dark p-4 md:p-6 lg:p-8 font-sans">
        
        <header className="mb-8 w-full max-w-[1400px] mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground font-heading tracking-tight">AgriConnect</h1>
            <p className="text-xs md:text-sm text-muted-foreground flex items-center mt-1">
              <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1 text-primary" /> Region: Punjab • Farmer Cockpit
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border border-background"></span>
            </button>
            <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shadow-soft">
              S
            </div>
          </div>
        </header>

        <main className="w-full max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="col-span-1 xl:col-span-3 space-y-6">
            <YieldCockpit />
          </div>

          <aside className="col-span-1 space-y-6 flex flex-col">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AgrisCard className="p-6 shadow-soft h-full" glass hoverLogic>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-semibold text-foreground font-heading">Market Trends</h3>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-border/50 pb-3">
                    <span className="text-sm font-medium text-muted-foreground">Wheat (Lok-1)</span>
                    <span className="text-sm font-bold text-foreground flex items-center gap-1">
                      ₹2,450 <span className="text-success text-xs font-semibold px-1.5 py-0.5 bg-success/10 rounded">↑ 2.4%</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border/50 pb-3">
                    <span className="text-sm font-medium text-muted-foreground">Paddy (Basmati)</span>
                    <span className="text-sm font-bold text-foreground flex items-center gap-1">
                      ₹3,800 <span className="text-warning text-xs font-semibold px-1.5 py-0.5 bg-warning/10 rounded">~ Stable</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Mustard Seed</span>
                    <span className="text-sm font-bold text-foreground flex items-center gap-1">
                      ₹5,100 <span className="text-destructive text-xs font-semibold px-1.5 py-0.5 bg-destructive/10 rounded">↓ 1.2%</span>
                    </span>
                  </div>
                </div>
              </AgrisCard>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AgrisCard className="p-6 shadow-soft h-full" glass hoverLogic>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-semibold text-foreground font-heading">Recommended Actions</h3>
                  <div className="p-2 bg-error/10 bg-destructive/10 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex flex-col gap-3 p-3.5 bg-card-foreground/5 rounded-xl border border-border/50 hover:bg-card-foreground/10 transition-colors">
                    <div className="flex items-start gap-2.5">
                       <span className="shrink-0 mt-1 w-2 h-2 rounded-full bg-destructive shadow-[0_0_8px_hsl(var(--destructive))]"></span>
                       <span className="text-sm font-medium text-foreground leading-snug">Fertilizer levels below 40ppm detected in Sector A.</span>
                    </div>
                    <button className="text-xs font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition shadow-sm self-start ml-4.5 focus:ring-2 focus:ring-ring focus:outline-none">
                      Order Subsidized NPK
                    </button>
                  </li>
                  <li className="flex flex-col gap-3 p-3.5 bg-card-foreground/5 rounded-xl border border-border/50 hover:bg-card-foreground/10 transition-colors">
                     <div className="flex items-start gap-2.5">
                       <span className="shrink-0 mt-1 w-2 h-2 rounded-full bg-warning shadow-[0_0_8px_hsl(var(--warning))]"></span>
                       <span className="text-sm font-medium text-foreground leading-snug">Schedule irrigation adjustment before anticipated heavy rain.</span>
                    </div>
                    <button className="text-xs font-semibold bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/80 transition shadow-sm self-start ml-4.5 flex items-center gap-1.5 focus:ring-2 focus:ring-ring focus:outline-none border border-border/50">
                      <Droplet className="w-3.5 h-3.5" /> Adjust Schedule
                    </button>
                  </li>
                </ul>
              </AgrisCard>
            </motion.div>
          </aside>
        </main>
      </div>
    </QueryClientProvider>
  );
}
