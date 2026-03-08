import React from 'react';
import { Card } from '@agriconnect/ui';
import { MarketPrice } from '@agriconnect/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface MarketPriceWidgetProps {
  prices: MarketPrice[];
}

export const MarketPriceWidget: React.FC<MarketPriceWidgetProps> = ({ prices }) => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold font-heading mb-6">Market Prices</h3>
      <div className="space-y-6">
        {prices.map((price) => (
          <div key={price.crop} className="flex flex-col gap-4">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-full">
                    <span className="text-lg">🌾</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{price.crop}</p>
                    <p className="text-xs text-muted-foreground">Market: Delhi Azadpur</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{price.currency}{price.currentPrice.toLocaleString()}/{price.unit}</p>
                  <p className={`text-[10px] flex items-center gap-1 justify-end font-bold uppercase ${price.trend === 'up' ? 'text-green-500' : price.trend === 'down' ? 'text-red-500' : 'text-slate-500'}`}>
                    {price.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                    {price.trend === 'down' && <TrendingDown className="w-3 h-3" />}
                    {price.trend === 'stable' && <Minus className="w-3 h-3" />}
                    {price.trend}
                  </p>
                </div>
             </div>
             
             <div className="h-[60px] w-full bg-slate-50/50 rounded-xl p-2 border border-slate-100">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={price.history}>
                    <Tooltip content={() => null} />
                    <Line type="monotone" dataKey="price" stroke={price.trend === 'up' ? '#10b981' : price.trend === 'down' ? '#ef4444' : '#64748b'} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
             </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
