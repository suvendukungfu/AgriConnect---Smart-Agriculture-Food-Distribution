import React from 'react';
import { Card, cn } from '@agriconnect/ui';
import { motion } from 'framer-motion';
import { Check, Leaf, Sprout, Sun, Wheat, WheatOff } from 'lucide-react';

const STAGES = [
  { id: 'seeded', label: 'Seeded', icon: Sprout },
  { id: 'germination', label: 'Germination', icon: Leaf },
  { id: 'vegetative', label: 'Vegetative', icon: Sun },
  { id: 'flowering', label: 'Flowering', icon: WheatOff },
  { id: 'grain_filling', label: 'Grain Filling', icon: Wheat },
  { id: 'harvested', label: 'Harvested', icon: Check },
] as const;

export type GrowthStage = typeof STAGES[number]['id'];

interface GrowthStageTrackerProps {
  currentStage: GrowthStage;
  className?: string;
}

export const GrowthStageTracker: React.FC<GrowthStageTrackerProps> = ({ currentStage, className }) => {
  const currentIndex = STAGES.findIndex((s) => s.id === currentStage);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  
  // Calculate progress percentage for the bar
  const progressPercentage = safeIndex === 0 ? 0 : (safeIndex / (STAGES.length - 1)) * 100;

  return (
    <Card className={cn("p-6 overflow-hidden", className)}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground">Growth Progress</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Current Stage: <span className="font-bold text-primary capitalize">{STAGES[safeIndex].label}</span>
          </p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-black text-primary">{Math.round(progressPercentage)}%</span>
        </div>
      </div>

      <div className="relative mt-8">
        {/* Background Track */}
        <div className="absolute top-5 left-4 right-4 h-2 bg-muted rounded-full"></div>
        
        {/* Progress Fill */}
        <motion.div 
          className="absolute top-5 left-4 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)]"
          initial={{ width: 0 }}
          animate={{ width: `calc(${progressPercentage}% - 2rem)` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Stage Nodes */}
        <div className="relative flex justify-between">
          {STAGES.map((stage, index) => {
            const isCompleted = index < safeIndex;
            const isCurrent = index === safeIndex;
            const isFuture = index > safeIndex;
            const Icon = stage.icon;

            return (
              <div key={stage.id} className="flex flex-col items-center group relative w-12 sm:w-16">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-4 z-10 transition-colors duration-300 shadow-sm",
                    isCompleted ? "bg-primary border-primary/20 text-white" : "",
                    isCurrent ? "bg-background border-primary text-primary shadow-[0_0_15px_rgba(34,197,94,0.3)] ring-4 ring-primary/10" : "",
                    isFuture ? "bg-background border-muted text-muted-foreground group-hover:border-muted-foreground/30" : ""
                  )}
                >
                  <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", isCompleted && "animate-in zoom-in")} />
                </motion.div>
                
                <span className={cn(
                  "mt-3 text-[10px] sm:text-xs font-bold text-center tracking-tight transition-colors absolute top-full leading-tight w-20 left-1/2 -translate-x-1/2",
                  isCurrent ? "text-primary scale-110" : "text-muted-foreground",
                  isCompleted ? "text-foreground" : ""
                )}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
