import React from 'react';
import { Card } from '@agriconnect/ui';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

interface YieldDataPoint {
  date: string;
  predicted: number;
  historical: number;
}

interface YieldChartProps {
  data: YieldDataPoint[];
  confidence: number;
}

export const YieldChartWidget: React.FC<YieldChartProps> = ({ data, confidence }) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold font-heading">AI Yield Prediction</h3>
          <p className="text-xs text-muted-foreground mt-1 tracking-tight">AI-powered projection based on soil & weather matrix.</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary font-heading tracking-tight">{confidence}%</p>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest leading-none">Confidence Score</p>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B' }} dx={-10} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
            />
            <Legend verticalAlign="top" height={36} align="right" iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
            <Area type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPredicted)" name="Predicted Yield" />
            <Area type="monotone" dataKey="historical" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorHistorical)" name="Historical Avg" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
