import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { YieldCockpit } from './components/YieldCockpit';
import { AgrisCard } from '@/components/shared/AgrisCard';

// Create a client
const queryClient = new QueryClient();

export default function DashboardPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background dark p-4 md:p-8 font-sans">
        
        <header className="mb-8 w-full max-w-2xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-heading">AgriConnect</h1>
            <p className="text-sm text-muted-foreground">Farmer Cockpit • Region: Punjab</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            S
          </div>
        </header>

        <main className="space-y-6">
          <YieldCockpit />

          <section className="w-full max-w-2xl mx-auto">
            <AgrisCard className="p-6 bg-slate-900/50">
              <h3 className="text-lg font-semibold text-foreground mb-2">Smart Action Items</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <span className="text-sm font-medium">📋 Fertilizer levels below 40ppm.</span>
                  <button className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition">
                    Order Subsidized
                  </button>
                </li>
              </ul>
            </AgrisCard>
          </section>
        </main>
      </div>
    </QueryClientProvider>
  );
}
