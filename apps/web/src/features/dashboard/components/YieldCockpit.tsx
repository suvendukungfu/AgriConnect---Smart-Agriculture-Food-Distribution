import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { AgrisCard } from '@/components/shared/AgrisCard';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CloudRain, Sprout, WifiOff, TrendingUp, DollarSign, Activity, Percent } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { normalizeYieldData } from '@/lib/ai/yieldModel';
import { SkeletonChartLoader } from '@/components/charts/SkeletonChartLoader';

// Lazy load the chart for performance
const AIConfidenceChart = React.lazy(() => import('@/components/charts/AIConfidenceChart').then(m => ({ default: m.AIConfidenceChart })));

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

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section className="flex flex-col gap-6 w-full" aria-label="Yield Overview">
      
      {/* Offline / Sync Banner */}
      <AnimatePresence>
        {offline && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 bg-warning/10 text-warning px-4 py-3 rounded-xl text-sm font-medium border border-warning/20 shadow-sm"
          >
            <WifiOff className="w-4 h-4" /> Operating in Offline Mode. Syncing paused.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero KPI Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* KPI 1: Predicted Harvest Value */}
        <motion.div variants={itemVariants}>
          <AgrisCard className="p-5 flex flex-col justify-between h-full shadow-soft" glass hoverLogic>
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-muted-foreground flex items-center">
                Predicted Yield
              </span>
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">
                ${predictedValue?.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-success flex items-center mt-2 bg-success/10 w-fit px-2 py-0.5 rounded-md">
                <TrendingUp className="w-3.5 h-3.5 mr-1" /> +{changePercent}% vs last cycle
              </div>
            </div>
          </AgrisCard>
        </motion.div>

        {/* KPI 2: AI Confidence */}
        <motion.div variants={itemVariants}>
          <AgrisCard className="p-5 flex flex-col justify-between h-full shadow-soft" glass hoverLogic>
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-muted-foreground flex items-center">
                AI Confidence
              </span>
              <div className="p-2 bg-accent/10 rounded-lg">
                <Percent className="w-4 h-4 text-accent" />
              </div>
            </div>
            <div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-foreground">{confidence}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2 mt-3 overflow-hidden">
                <div className="bg-accent h-2 rounded-full" style={{ width: `${confidence}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">High accuracy threshold</p>
            </div>
          </AgrisCard>
        </motion.div>

        {/* KPI 3: Weather Risk */}
        <motion.div variants={itemVariants}>
          <AgrisCard className="p-5 flex flex-col justify-between h-full shadow-soft" glass hoverLogic>
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-muted-foreground flex items-center">
                Weather Risk
              </span>
              <div className="p-2 bg-warning/10 rounded-lg">
                <CloudRain className="w-4 h-4 text-warning" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="bg-warning/20 text-warning border-warning/50 text-sm py-1 font-semibold">
                  Elevated
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-3 flex items-start gap-1.5 leading-snug">
                <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                Heavy rain expected in 48 hours.
              </p>
            </div>
          </AgrisCard>
        </motion.div>

        {/* KPI 4: Soil Health */}
        <motion.div variants={itemVariants}>
          <AgrisCard className="p-5 flex flex-col justify-between h-full shadow-soft" glass hoverLogic>
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-muted-foreground flex items-center">
                Soil Health
              </span>
              <div className="p-2 bg-success/10 rounded-lg">
                <Sprout className="w-4 h-4 text-success" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">
                6.2 <span className="text-lg text-muted-foreground font-normal">pH</span>
              </div>
              <div className="flex items-center justify-between mt-3 text-sm">
                <span className="text-success font-medium bg-success/10 px-2 py-0.5 rounded-md">Optimal</span>
                <span className="text-muted-foreground text-xs">Updated 2h ago</span>
              </div>
            </div>
          </AgrisCard>
        </motion.div>
      </motion.div>

      {/* AI Chart Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 24 }}
      >
        <AgrisCard className="p-5 sm:p-6 overflow-hidden shadow-soft" glass hoverLogic>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-foreground font-heading">
                90-Day Yield Forecast & Confidence Matrix
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                AI-powered projection with risk overlays and dynamic confidence intervals.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
               <div className="flex items-center gap-1.5 border border-border/50 px-2 py-1 rounded-md bg-card-foreground/5">
                 <div className="w-2.5 h-2.5 rounded-full bg-primary" /> Yield
               </div>
               <div className="flex items-center gap-1.5 border border-border/50 px-2 py-1 rounded-md bg-card-foreground/5">
                 <div className="w-2.5 h-2.5 rounded-full bg-warning" /> Risk
               </div>
            </div>
          </div>
          
          <div className="h-[320px] w-full mt-2 relative">
            <Suspense fallback={<SkeletonChartLoader height={320} />}>
              <AIConfidenceChart data={chartData} height={320} />
            </Suspense>
          </div>
        </AgrisCard>
      </motion.div>
    </section>
  );
}

function CockpitSkeleton() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map((i) => (
          <AgrisCard key={i} className="p-5 h-36">
            <div className="flex justify-between mb-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
             <Skeleton className="h-8 w-24 mb-3" />
             <Skeleton className="h-4 w-full" />
          </AgrisCard>
        ))}
      </div>
      <AgrisCard className="p-6 w-full h-[450px]">
        <div className="mb-8">
          <Skeleton className="h-6 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <SkeletonChartLoader height={320} />
      </AgrisCard>
    </section>
  );
}
