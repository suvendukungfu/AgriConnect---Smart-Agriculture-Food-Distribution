import React from 'react';
import { Card } from '@agriconnect/ui';
import { CloudRain, Sun, Wind, Droplets, Thermometer } from 'lucide-react';
import { WeatherData } from '@agriconnect/types';

interface WeatherWidgetProps {
  data: WeatherData;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ data }) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white border-none shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold font-heading">Punjab, India</h3>
          <p className="text-sm opacity-80">Today's Forecast</p>
        </div>
        <div className="text-right">
          <Sun className="w-10 h-10 text-yellow-300 animate-pulse" />
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Thermometer className="w-8 h-8 opacity-80" />
          <span className="text-4xl font-bold tracking-tighter">{data.temp}°C</span>
        </div>
        <div className="text-sm space-y-1">
          <p className="flex items-center gap-2 opacity-90"><CloudRain className="w-4 h-4" /> {data.rainfall}mm Rain</p>
          <p className="flex items-center gap-2 opacity-90"><Droplets className="w-4 h-4" /> {data.humidity}% Humidity</p>
          <p className="flex items-center gap-2 opacity-90"><Wind className="w-4 h-4" /> {data.windSpeed}km/h Wind</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-white/20 pt-4">
        {data.forecast.map((day) => (
          <div key={day.date} className="text-center">
            <p className="text-xs opacity-80 mb-1">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <Sun className="w-5 h-5 mx-auto mb-1 text-yellow-200" />
            <p className="text-sm font-bold">{day.temp}°C</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
