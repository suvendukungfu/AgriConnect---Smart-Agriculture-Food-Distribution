import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@agriconnect/ui';

interface Stage {
  name: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
  description?: string;
}

interface CropTimelineProps {
  stages: Stage[];
}

export const CropTimeline: React.FC<CropTimelineProps> = ({ stages }) => {
  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent text-left">
      {stages.map((stage, index) => (
        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          {/* Dot */}
          <div className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full border border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10",
            stage.status === 'completed' ? 'bg-primary text-primary-foreground' : stage.status === 'current' ? 'bg-yellow-400 text-yellow-900 border-yellow-200' : 'bg-slate-100 text-slate-400'
          )}>
            {stage.status === 'completed' ? <Check className="w-5 h-5" /> : stage.status === 'current' ? <Clock className="w-5 h-5 animate-spin-slow" /> : <AlertCircle className="w-5 h-5" />}
          </div>

          {/* Content Card */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-card border border-border shadow-sm group-hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between space-x-2 mb-1">
              <h4 className="font-bold text-foreground text-sm">{stage.name}</h4>
              <time className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stage.date}</time>
            </div>
            {stage.description && <p className="text-xs text-muted-foreground leading-relaxed">{stage.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
