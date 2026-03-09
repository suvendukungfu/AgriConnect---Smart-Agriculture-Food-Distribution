import React from 'react';
import { Card, Badge } from '@agriconnect/ui';
import { useYieldPrediction } from '@agriconnect/hooks';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { BrainCircuit } from 'lucide-react';

export const YieldPredictionWidget: React.FC = () => {
  const { data, isLoading } = useYieldPrediction();

  if (isLoading || !data) {
    return (
      <Card className="p-6 h-full flex flex-col justify-center animate-pulse bg-muted/20">
        <div className="h-6 w-32 bg-muted rounded mb-6" />
        <div className="h-8 w-24 bg-muted rounded mb-6" />
        <div className="flex-1 min-h-[150px] bg-muted/50 rounded-xl" />
      </Card>
    );
  }

  return (
    <Card className="p-6 h-full border-border/50 bg-card/50 backdrop-blur-xl hover:shadow-lg transition-all duration-300 flex flex-col relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10" />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-primary" />
            AI Yield Prediction
          </h3>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            Historical vs Predicted
          </p>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary uppercase tracking-widest text-[10px] items-center">
          Confidence {data.confidenceScore}%
        </Badge>
      </div>

      <div className="mb-4 relative z-10">
        <span className="text-4xl font-black text-foreground">{data.predictedYield}</span>
        <span className="text-lg font-bold text-muted-foreground ml-2">tons/ha</span>
      </div>

      <div className="flex-1 w-full min-h-[160px] relative z-10 -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.history} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))', fontWeight: 'bold' }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Area 
              type="monotone" 
              dataKey="yield" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorYield)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
