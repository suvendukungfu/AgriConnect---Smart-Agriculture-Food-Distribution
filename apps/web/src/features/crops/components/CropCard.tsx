import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CropCycle } from '@agriconnect/types';
import { Card, Badge, Button, cn } from '@agriconnect/ui';
import { Sprout, Calendar, MapPin, ChevronRight, CheckCircle2, Factory, Sun, WheatOff, Wheat } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const STAGE_CONFIG = {
  seeded: { icon: Sprout, label: 'Seeded', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  germination: { icon: Sprout, label: 'Germination', color: 'text-green-500', bg: 'bg-green-500/10' },
  vegetative: { icon: Sun, label: 'Vegetative', color: 'text-lime-500', bg: 'bg-lime-500/10' },
  flowering: { icon: WheatOff, label: 'Flowering', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  grain_filling: { icon: Wheat, label: 'Grain Filling', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  harvested: { icon: CheckCircle2, label: 'Harvested', color: 'text-blue-500', bg: 'bg-blue-500/10' },
};

interface CropCardProps {
  crop: CropCycle;
  index?: number;
}

export const CropCard: React.FC<CropCardProps> = ({ crop, index = 0 }) => {
  const navigate = useNavigate();
  const stage = STAGE_CONFIG[crop.status];
  const StageIcon = stage.icon;

  const handleNavigate = () => {
    navigate(`/crops/${crop.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -4 }}
      onClick={handleNavigate}
    >
      <Card 
        className="flex flex-col h-full overflow-hidden border-border transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 cursor-pointer group"
      >
        <div className="p-5 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className={cn("p-2.5 rounded-xl transition-colors duration-300", stage.bg, "group-hover:bg-primary/10")}>
                <StageIcon className={cn("w-6 h-6", stage.color, "group-hover:text-primary")} />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight text-foreground flex items-center gap-2">
                  {crop.cropName}
                  <Badge variant="outline" className="text-[10px] font-bold py-0 h-5 px-1.5 uppercase tracking-wider">{crop.variety}</Badge>
                </h3>
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Plot: {crop.plotId.toUpperCase()}
                </p>
              </div>
            </div>
            
            <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors group-hover:translate-x-1" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Sowing Date
              </p>
              <p className="text-sm font-bold text-foreground">
                {format(new Date(crop.sowingDate), 'MMM d, yyyy')}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Est. Harvest
              </p>
              <p className="text-sm font-bold text-foreground">
                {format(new Date(crop.expectedHarvestDate), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-border bg-muted/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-50", stage.bg)} />
              <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", stage.color.replace('text', 'bg'))} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-foreground">
              {stage.label}
            </span>
          </div>

          {crop.yieldPrediction && (
            <Badge variant="secondary" className="font-bold gap-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <Factory className="w-3.5 h-3.5" />
              Est. {crop.yieldPrediction} t/ac
            </Badge>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
