import React from 'react';
import { motion } from 'framer-motion';
import { Card, Badge, cn } from '@agriconnect/ui';
import { useCropHealth } from '@agriconnect/hooks';
import { Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const CropHealthWidget: React.FC = () => {
  const { data, isLoading } = useCropHealth();

  if (isLoading || !data) {
    return (
      <Card className="p-6 h-full flex flex-col justify-center animate-pulse bg-muted/20">
        <div className="h-6 w-32 bg-muted rounded mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-muted rounded-xl" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 h-full border-border/50 bg-card/50 backdrop-blur-xl hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-500" />
          Crop Health Status
        </h3>
      </div>

      <div className="space-y-3">
        {data.map((crop, idx) => (
          <motion.div
            key={crop.cropName}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center justify-between p-3 rounded-2xl border border-border/40 bg-background/50 hover:bg-muted/30 transition-colors"
          >
            <div>
              <p className="font-bold text-sm">{crop.cropName}</p>
              {crop.issue && <p className="text-xs text-muted-foreground mt-0.5">{crop.issue}</p>}
            </div>
            
            <Badge 
              variant="outline"
              className={cn("px-2.5 py-0.5 border-0 font-bold flex items-center gap-1.5",
                crop.status === 'Healthy' && "bg-emerald-500/10 text-emerald-600",
                crop.status === 'Warning' && "bg-amber-500/10 text-amber-600",
                crop.status === 'Risk' && "bg-red-500/10 text-red-600",
              )}
            >
              {crop.status === 'Healthy' && <CheckCircle2 className="w-3.5 h-3.5" />}
              {crop.status === 'Warning' || crop.status === 'Risk' ? <AlertTriangle className="w-3.5 h-3.5" /> : null}
              {crop.status}
            </Badge>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
