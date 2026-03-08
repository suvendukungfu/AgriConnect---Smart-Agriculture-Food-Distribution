import React, { useMemo } from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, Line, 
  XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { YieldForecastPoint } from '@/lib/ai/yieldModel';
import { SkeletonChartLoader } from './SkeletonChartLoader';

interface AIConfidenceChartProps {
  data: YieldForecastPoint[];
  height?: number;
}

// Custom Tooltip strictly following AgrisUI tokens
const AgrisCustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as YieldForecastPoint;
    return (
      <div className="bg-popover text-popover-foreground border border-border/50 rounded-lg shadow-glass p-3 text-sm">
        <p className="font-semibold mb-2 text-muted-foreground">{label}</p>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary" /> Predicted:
            </span>
            <span className="font-bold">${data.predictedYield.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary/30 border border-primary/50" /> 95% CI:
            </span>
            <span className="text-muted-foreground">
              ${data.lowerBound.toLocaleString()} - ${data.upperBound.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 pt-1 mt-1 border-t border-border">
            <span className="flex items-center gap-1 text-xs">
              <span className="w-2 h-2 rounded-full bg-warning" /> Risk Score:
            </span>
            <span className="text-warning font-semibold text-xs">{data.riskScore}/100</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// React.memo prevents re-rendering on parent updates
export const AIConfidenceChart = React.memo(({ data, height = 300 }: AIConfidenceChartProps) => {

  // Memoize data to prevent useless Recharts calculations
  const chartData = useMemo(() => data, [data]);

  if (!chartData || chartData.length === 0) {
    return <SkeletonChartLoader height={height} />;
  }

  // Optimize animation boolean
  const shouldAnimate = chartData.length < 150;

  return (
    <div style={{ width: '100%', height }} className="animate-in fade-in duration-500" aria-label="AI Yield Forecast Chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          
          <defs>
            <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.0}/>
            </linearGradient>
            <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.0}/>
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
          
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} 
            dy={10} 
            minTickGap={30}
          />
          
          <YAxis 
            yAxisId="left"
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`}
            domain={['dataMin - 1000', 'dataMax + 1000']}
          />
          
          <YAxis yAxisId="right" orientation="right" hide domain={[0, 100]} />

          <Tooltip content={<AgrisCustomTooltip />} cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: '5 5' }} />

          {/* Confidence interval band mapped to upperBound, using gradient fill */}
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="upperBound" 
            stroke="none" 
            fillOpacity={1} 
            fill="url(#colorConfidence)" 
            isAnimationActive={shouldAnimate} 
          />
          
          {/* Optional bottom band area to constrain the gradient if needed (Simulated here with a second line) */}
          <Line 
            yAxisId="left"
            type="stepAfter" 
            dataKey="lowerBound" 
            stroke="hsl(var(--primary))" 
            strokeOpacity={0.3}
            strokeWidth={1} 
            strokeDasharray="3 3"
            dot={false}
            isAnimationActive={false}
          />

          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="predictedYield" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2.5} 
            dot={false}
            activeDot={{ r: 5, fill: "hsl(var(--primary))", stroke: "hsl(var(--background))", strokeWidth: 2 }}
            isAnimationActive={shouldAnimate}
          />

          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="riskScore" 
            stroke="hsl(var(--warning))" 
            strokeWidth={1.5} 
            strokeDasharray="5 5" 
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

AIConfidenceChart.displayName = "AIConfidenceChart";
