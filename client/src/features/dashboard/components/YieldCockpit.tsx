import React, { useState, useEffect, useMemo } from 'react';
import { AgrisCard } from '@/components/shared/AgrisCard';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CloudRain, Sprout, WifiOff, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { AIConfidenceChart } from '@/components/charts/AIConfidenceChart';
import { normalizeYieldData } from '@/lib/ai/yieldModel';

// Dummy API call to simulate React Query fetching
const generateDummyForecast = () => {
  const data = [];
  let baseYield = 14000;
  for (let i = 0; i < 90; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    // Simulate some noise and trend
    baseYield += (Math.random() - 0.4) * 100;
    
    data.push({
      date: date.toISOString(),
      predictedYield: baseYield,
      lowerBound: baseYield - (Math.random() * 500 + 500),
      upperBound: baseYield + (Math.random() * 500 + 500),
      riskScore: Math.max(0, Math.min(100, 30 + (Math.random() - 0.5) * 20 + (i > 60 ? 20 : 0)))
    });
  }
  return data;
};

const fetchYieldPrediction = async () => {
  return new Promise((resolve) => setTimeout(() => resolve({
    predictedValue: 14500,
    confidence: 92,
    changePercent: 12,
    risks: [{ type: 'weather', msg: 'Heavy rain in 48h' }],
    marketPrice: 240, // per quintal
    rawForecastData: generateDummyForecast()
  }), 1200));
};

export function YieldCockpit() {
  const [offline, setOffline] = useState(!navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['farmerYieldData'],
    queryFn: fetchYieldPrediction,
    staleTime: 1000 * 60 * 60, // 1 hour stale time
  });

  // @ts-ignore
  const { predictedValue, confidence, changePercent, marketPrice, rawForecastData } = data || {};

  const chartData = useMemo(() => normalizeYieldData(rawForecastData || []), [rawForecastData]);

  if (isLoading) return <CockpitSkeleton />;

  return (
    <section className="flex flex-col gap-4 w-full max-w-2xl mx-auto" aria-label="Yield Overview">
      
      {/* Offline / Sync Banner */}
      <AnimatePresence>
        {offline && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 bg-warning/10 text-warning px-4 py-2 rounded-lg text-sm font-medium"
          >
            <WifiOff className="w-4 h-4" /> Operating in Offline Mode. Syncing paused.
          </motion.div>
        )}
      </AnimatePresence>

      <AgrisCard className="p-6 relative overflow-visible" glass hoverLogic>
        {/* Top: Header & AI Confidence */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-muted-foreground font-semibold uppercase tracking-wider text-xs">
            Predicted Harvest Value
          </h2>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            AI Confidence: {confidence}%
          </Badge>
        </div>

        {/* Center: Profit Hero Metric */}
        <div className="flex flex-col mb-8">
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-extrabold tracking-tight text-foreground">
              ${predictedValue?.toLocaleString()}
            </span>
            <span className="text-success font-medium flex items-center text-sm">
              <TrendingUp className="w-4 h-4 mr-1" /> +{changePercent}%
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Expected realization by Nov 15</p>
        </div>

        {/* Bottom: Telemetry Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-border/50">
          
          <div className="flex flex-col gap-1">
            <span className="flex items-center text-xs font-semibold text-muted-foreground">
              <CloudRain className="w-3 h-3 justify-center mr-1 text-sky-500" />
              WEATHER RISK
            </span>
            <span className="text-sm font-medium text-warning flex items-center">
              Elevated <AlertCircle className="w-3 h-3 ml-1" />
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="flex items-center text-xs font-semibold text-muted-foreground">
              <Sprout className="w-3 h-3 mr-1 text-emerald-500" />
              SOIL HEALTH
            </span>
            <span className="text-sm font-medium text-foreground">
              pH 6.2 (Optimal)
            </span>
          </div>

          <div className="flex flex-col gap-1 col-span-2 md:col-span-1 border-t md:border-t-0 pt-3 md:pt-0">
            <span className="text-xs font-semibold text-muted-foreground">
              MANDI MARKET TREND
            </span>
            <span className="text-sm font-medium text-foreground">
              ${marketPrice}/qtl (Stable)
            </span>
          </div>

        </div>

        {/* AI Chart Section */}
        <div className="mt-8 pt-4 border-t border-border/50">
          <h3 className="text-xs font-semibold text-muted-foreground mb-4 font-heading tracking-wide">
            90-DAY YIELD TRAJECTORY & CONFIDENCE MATRIX
          </h3>
          <AIConfidenceChart data={chartData} height={240} />
        </div>
      </AgrisCard>
    </section>
  );
}

function CockpitSkeleton() {
  return (
    <AgrisCard className="p-6 w-full max-w-2xl mx-auto h-[280px]">
      <div className="flex justify-between mb-8">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <Skeleton className="h-14 w-64 mb-4" />
      <Skeleton className="h-4 w-40 mb-12" />
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </AgrisCard>
  );
}
