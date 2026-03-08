import React from 'react';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Card } from '@agriconnect/ui';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart, 
  Pie 
} from 'recharts';

const PROFIT_DATA = [
  { crop: 'Wheat', profit: 125000, cost: 45000 },
  { crop: 'Mustard', profit: 85000, cost: 25000 },
  { crop: 'Rice', profit: 95000, cost: 55000 },
];

const COST_BREAKDOWN = [
  { name: 'Seeds', value: 15000, color: '#10b981' },
  { name: 'Fertilizer', value: 25000, color: '#6366f1' },
  { name: 'Labor', value: 35000, color: '#fbbf24' },
  { name: 'Fuel', value: 10000, color: '#ef4444' },
];

export const AnalyticsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground text-left">Farm Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1 text-left">Financial performance and production efficiency data.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8">
            <Card className="p-8 text-left">
              <h3 className="text-xl font-bold font-heading mb-6 text-left">Profit vs Cost Comparison</h3>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PROFIT_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="crop" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dx={-10} />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Bar dataKey="profit" fill="#10b981" radius={[6, 6, 0, 0]} name="Profit (₹)" barSize={40} />
                    <Bar dataKey="cost" fill="#94a3b8" radius={[6, 6, 0, 0]} name="Cost (₹)" barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Card className="p-8 h-full flex flex-col text-left">
              <h3 className="text-xl font-bold font-heading mb-6 text-left">Input Cost Breakdown</h3>
              <div className="h-[250px] w-full shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={COST_BREAKDOWN}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {COST_BREAKDOWN.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 space-y-3">
                 {COST_BREAKDOWN.map((item) => (
                   <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs font-bold text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">₹{item.value.toLocaleString()}</span>
                   </div>
                 ))}
              </div>
            </Card>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};
