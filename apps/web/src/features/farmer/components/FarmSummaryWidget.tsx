import React from 'react';
import { Card } from '@agriconnect/ui';
import { Tractor, Sprout, ShoppingBag, TrendingUp } from 'lucide-react';

interface FarmSummaryProps {
  totalFarms: number;
  activeCrops: number;
  upcomingHarvests: number;
  expectedYield: number; // in tonnes
}

export const FarmSummaryWidget: React.FC<FarmSummaryProps> = ({ 
  totalFarms, 
  activeCrops, 
  upcomingHarvests, 
  expectedYield 
}) => {
  const stats = [
    { label: 'Total Farms', value: totalFarms, icon: Tractor, color: 'text-blue-500', bg: 'bg-blue-100' },
    { label: 'Active Crops', value: activeCrops, icon: Sprout, color: 'text-green-500', bg: 'bg-green-100' },
    { label: 'Harvests', value: upcomingHarvests, icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-100' },
    { label: 'Exp. Yield', value: `${expectedYield}t`, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-100' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 flex flex-col items-center justify-center text-center space-y-2 hover:shadow-md transition-shadow">
          <div className={`p-3 rounded-full ${stat.bg}`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div>
            <p className="text-2xl font-bold font-heading">{stat.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
