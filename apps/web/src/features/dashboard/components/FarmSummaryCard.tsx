import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@agriconnect/ui';
import { useFarmSummary } from '@agriconnect/hooks';
import { Sprout, Tractor, Package, Calendar } from 'lucide-react';

export const FarmSummaryCard: React.FC = () => {
  const { data, isLoading } = useFarmSummary();

  if (isLoading || !data) {
    return (
      <Card className="p-6 h-full flex flex-col justify-center animate-pulse bg-muted/20">
        <div className="h-6 w-32 bg-muted rounded mb-6" />
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-muted rounded-xl" />
          ))}
        </div>
      </Card>
    );
  }

  const items = [
    { label: 'Active Crops', value: data.activeCrops, icon: Sprout, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Farms', value: data.totalFarms, icon: Tractor, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Expected Yield', value: `${data.expectedProductionTons}t`, icon: Package, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Next Harvest', value: `${data.upcomingHarvests} days`, icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <Card className="p-6 h-full border-border/50 bg-card/50 backdrop-blur-xl hover:shadow-lg transition-all duration-300">
      <h3 className="font-bold text-lg mb-6">Farm Summary</h3>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-2xl border border-border/40 bg-background/50 hover:bg-muted/30 transition-colors"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg}`}>
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
              <p className="text-xl font-black">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
