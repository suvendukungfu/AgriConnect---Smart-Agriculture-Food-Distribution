import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { FarmSummaryWidget } from '../farmer/components/FarmSummaryWidget';
import { WeatherWidget } from '../farmer/components/WeatherWidget';
import { CropHealthWidget } from '../farmer/components/CropHealthWidget';
import { YieldChartWidget } from '../farmer/components/YieldChartWidget';
import { MarketPriceWidget } from '../farmer/components/MarketPriceWidget';
import { TaskReminderWidget } from '../farmer/components/TaskReminderWidget';
import { WeatherData, MarketPrice, Task } from '@agriconnect/types';

const MOCK_WEATHER: WeatherData = {
  temp: 32,
  humidity: 45,
  rainfall: 12,
  windSpeed: 15,
  condition: 'Sunny',
  forecast: [
    { date: '2024-03-10', temp: 33, condition: 'Sunny' },
    { date: '2024-03-11', temp: 31, condition: 'Partly Cloudy' },
    { date: '2024-03-12', temp: 29, condition: 'Showers' },
  ],
};

const MOCK_YIELD_DATA = [
  { date: 'Jan', predicted: 4.2, historical: 3.8 },
  { date: 'Feb', predicted: 4.5, historical: 4.0 },
  { date: 'Mar', predicted: 5.1, historical: 4.2 },
  { date: 'Apr', predicted: 5.8, historical: 4.5 },
  { date: 'May', predicted: 6.2, historical: 4.8 },
];

const MOCK_MARKET_PRICES: MarketPrice[] = [
  { 
    crop: 'Wheat', 
    currentPrice: 2150, 
    currency: '₹', 
    unit: 'Quintal', 
    trend: 'up',
    history: [{ date: '1', price: 2100 }, { date: '2', price: 2120 }, { date: '3', price: 2150 }]
  },
  { 
    crop: 'Rice', 
    currentPrice: 1950, 
    currency: '₹', 
    unit: 'Quintal', 
    trend: 'down',
    history: [{ date: '1', price: 2000 }, { date: '2', price: 1980 }, { date: '3', price: 1950 }]
  },
];

const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Irrigation Plot A', description: 'Scheduled water supply for 2 hours', dueDate: '2024-03-10', priority: 'high', status: 'pending', category: 'irrigation' },
  { id: '2', title: 'Fertilizer Application', description: 'Apply NPK 19:19:19 to Wheat crop', dueDate: '2024-03-12', priority: 'medium', status: 'pending', category: 'fertilizer' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-700">
        
        {/* Top Summary Row */}
        <FarmSummaryWidget 
          totalFarms={3} 
          activeCrops={5} 
          upcomingHarvests={2} 
          expectedYield={12.5} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-6">
            <YieldChartWidget data={MOCK_YIELD_DATA} confidence={94} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CropHealthWidget 
                cropName="Wheat (PBW-343)" 
                stage="Grain Filling" 
                progress={82} 
                pestRisk="low" 
                fertilizerDue="Mar 15, 2024" 
              />
              <CropHealthWidget 
                cropName="Mustard" 
                stage="Pod Maturity" 
                progress={95} 
                pestRisk="medium" 
                fertilizerDue="Completed" 
              />
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            <WeatherWidget data={MOCK_WEATHER} />
            <TaskReminderWidget tasks={MOCK_TASKS} />
            <MarketPriceWidget prices={MOCK_MARKET_PRICES} />
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
