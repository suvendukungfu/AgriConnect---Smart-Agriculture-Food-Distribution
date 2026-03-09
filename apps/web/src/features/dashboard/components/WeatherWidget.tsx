import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@agriconnect/ui';
import { useWeather } from '@agriconnect/hooks';
import { Droplets, Wind, Thermometer, CloudRain } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  const { data, isLoading } = useWeather();

  if (isLoading || !data) {
    return (
      <Card className="p-6 h-full animate-pulse bg-muted/20">
        <div className="h-6 w-24 bg-muted rounded mb-6" />
        <div className="h-24 bg-muted rounded-xl mb-6" />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 flex-1 bg-muted rounded-xl" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 h-full border-border/50 bg-linear-to-br from-card to-blue-500/5 backdrop-blur-xl hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-bold text-lg">Weather Forecast</h3>
        <span className="text-4xl">{data.condition === 'Sunny' ? '☀️' : '🌥'}</span>
      </div>

      <div className="flex items-end gap-2 mb-6">
        <span className="text-5xl font-black tracking-tighter">{data.temp}°C</span>
        <span className="text-muted-foreground font-medium mb-1">{data.condition}</span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Droplets className="w-4 h-4 text-blue-400" />
          {data.humidity}%
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Wind className="w-4 h-4 text-teal-400" />
          {data.windSpeed} km/h
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <CloudRain className="w-4 h-4 text-indigo-400" />
          {data.rainfall} mm
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-auto">
        {data.forecast.map((day, idx) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-background/50 border border-border/40 text-center"
          >
            <span className="text-xs font-semibold text-muted-foreground mb-1">{day.date}</span>
            <span className="text-2xl mb-1">{day.condition}</span>
            <span className="text-sm font-bold">{day.temp}°C</span>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
