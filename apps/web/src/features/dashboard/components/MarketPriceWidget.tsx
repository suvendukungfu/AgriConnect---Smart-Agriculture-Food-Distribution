import React from 'react';
import { Card, Badge, cn } from '@agriconnect/ui';
import { useMarketPrices } from '@agriconnect/hooks';
import { TrendingUp, TrendingDown, Minus, LineChart as ChartIcon } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

export const MarketPriceWidget: React.FC = () => {
  const { data, isLoading } = useMarketPrices();

  if (isLoading || !data) {
    return (
      <Card className="p-6 h-full flex flex-col justify-center animate-pulse bg-muted/20">
        <div className="h-6 w-32 bg-muted rounded mb-6" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 bg-muted rounded-xl" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 h-full border-border/50 bg-card/50 backdrop-blur-xl hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <ChartIcon className="w-5 h-5 text-emerald-500" />
          Market Prices
        </h3>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">7-Day Trend</span>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.crop} className="flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-background/50 hover:bg-muted/30 transition-colors">
            <div className="flex-1">
              <p className="font-bold text-sm mb-1">{item.crop}</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black">{item.currency}{item.currentPrice}</span>
                <span className="text-xs text-muted-foreground">/{item.unit}</span>
              </div>
            </div>

            {/* Micro Sparkline */}
            <div className="w-24 h-10 mx-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={item.history}>
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke={item.trend === 'up' ? '#10b981' : item.trend === 'down' ? '#ef4444' : '#64748b'} 
                    strokeWidth={2} 
                    dot={false}
                    isAnimationActive={true}
                  />
                  <Tooltip 
                    contentStyle={{ display: 'none' }} // Hide tooltip for microchart
                    cursor={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <Badge 
              variant="outline"
              className={cn("px-2 py-1 border-0 h-fit",
                item.trend === 'up' && "bg-emerald-500/10 text-emerald-600",
                item.trend === 'down' && "bg-red-500/10 text-red-600",
                item.trend === 'stable' && "bg-slate-500/10 text-slate-600",
              )}
            >
              {item.trend === 'up' && <TrendingUp className="w-4 h-4" />}
              {item.trend === 'down' && <TrendingDown className="w-4 h-4" />}
              {item.trend === 'stable' && <Minus className="w-4 h-4" />}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};
