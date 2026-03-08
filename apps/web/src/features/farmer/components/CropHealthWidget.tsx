import React from 'react';
import { Card } from '@agriconnect/ui';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface CropHealthProps {
  cropName: string;
  stage: string;
  progress: number;
  pestRisk: 'low' | 'medium' | 'high';
  fertilizerDue: string;
}

export const CropHealthWidget: React.FC<CropHealthProps> = ({ 
  cropName, 
  stage, 
  progress, 
  pestRisk, 
  fertilizerDue 
}) => {
  const riskColor = {
    low: 'text-green-500',
    medium: 'text-orange-500',
    high: 'text-red-500',
  }[pestRisk];

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold font-heading">{cropName} Health</h3>
        <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${pestRisk === 'low' ? 'bg-green-100 text-green-700' : pestRisk === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
          Pest Risk: {pestRisk}
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Current Stage: <span className="text-foreground font-bold">{stage}</span></span>
            <span className="font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-3 p-3 bg-card-foreground/5 rounded-lg border border-border/50">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-xs font-bold text-foreground">Fertilizer Schedule</p>
              <p className="text-[10px] text-muted-foreground">Next application: {fertilizerDue}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <div>
              <p className="text-xs font-bold text-foreground">Pest Alert</p>
              <p className="text-[10px] text-muted-foreground">Blight detected in nearby farms. Monitor Plot A.</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
