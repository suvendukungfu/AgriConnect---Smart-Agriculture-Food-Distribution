import React from 'react';
import { CropEvent } from '@agriconnect/types';
import { motion } from 'framer-motion';
import { 
  Sprout, 
  Droplets, 
  FlaskConical, 
  Bug, 
  AlertTriangle, 
  Wheat,
  Calendar,
  IndianRupee,
  Layers
} from 'lucide-react';
import { Card, Badge, cn } from '@agriconnect/ui';
import { format } from 'date-fns';

interface CropTimelineProps {
  events: CropEvent[];
}

const EVENT_CONFIG = {
  sowing: {
    icon: Sprout,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-200',
    label: 'Sowing',
  },
  irrigation: {
    icon: Droplets,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-200',
    label: 'Irrigation',
  },
  fertilizer: {
    icon: FlaskConical,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-200',
    label: 'Fertilizer',
  },
  pesticide: {
    icon: Bug,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-200',
    label: 'Pesticide',
  },
  disease_report: {
    icon: AlertTriangle,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-200',
    label: 'Disease Report',
  },
  harvest: {
    icon: Wheat,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-200',
    label: 'Harvest',
  },
};

export const CropTimeline: React.FC<CropTimelineProps> = ({ events }) => {
  // Sort events by date descending (newest first)
  const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (!sortedEvents.length) {
    return (
      <Card className="p-8 text-center flex flex-col items-center justify-center min-h-[300px] border-dashed">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Calendar className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground">No Events Yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm mt-1">
          Start documenting your crop's journey by adding your first event.
        </p>
      </Card>
    );
  }

  return (
    <div className="relative pl-6 md:pl-8 py-4">
      {/* Vertical Line */}
      <div className="absolute left-[27px] md:left-[35px] top-6 bottom-6 w-0.5 bg-border rounded-full" />

      <div className="space-y-8">
        {sortedEvents.map((event, index) => {
          const config = EVENT_CONFIG[event.eventType];
          const Icon = config.icon;
          const isLast = index === sortedEvents.length - 1;

          return (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="relative flex gap-4 md:gap-6 group"
            >
              {/* Timeline Connector Dot */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background border-2 border-border group-hover:border-primary transition-colors shadow-sm">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", config.bgColor)}>
                  <Icon className={cn("h-4 w-4", config.color)} />
                </div>
              </div>

              {/* Event Content Card */}
              <Card className={cn(
                "flex-1 p-4 md:p-5 transition-all hover:shadow-md border",
                config.borderColor,
                "hover:border-primary/30"
              )}>
                <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-base text-foreground">{config.label}</h4>
                      {event.inputsUsed && (
                        <Badge variant="secondary" className="text-[10px] py-0">{event.inputsUsed}</Badge>
                      )}
                    </div>
                    <time className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {format(new Date(event.date), 'MMM dd, yyyy • h:mm a')}
                    </time>
                  </div>
                  
                  {/* Cost & Quantity Badges */}
                  {(event.cost || event.quantity) && (
                    <div className="flex items-center gap-2 shrink-0">
                      {event.quantity && (
                        <Badge variant="outline" className="flex items-center gap-1 bg-background text-xs">
                          <Layers className="h-3 w-3" />
                          {event.quantity} units
                        </Badge>
                      )}
                      {event.cost && (
                        <Badge variant="outline" className="flex items-center gap-1 bg-background text-xs text-green-600 border-green-200">
                          <IndianRupee className="h-3 w-3" />
                          {event.cost}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                {event.notes && (
                  <p className="text-sm text-foreground/80 leading-relaxed bg-muted/40 p-3 rounded-lg border border-border/50">
                    {event.notes}
                  </p>
                )}

                {/* Images Placeholder */}
                {event.images && event.images.length > 0 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                    {event.images.map((img, i) => (
                      <div key={i} className="h-20 w-32 shrink-0 rounded-lg bg-muted object-cover border border-border overflow-hidden">
                        <img src={img} alt={`Event attachment ${i + 1}`} className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
