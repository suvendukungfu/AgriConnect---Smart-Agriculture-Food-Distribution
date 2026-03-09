import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { FarmSummaryCard } from './components/FarmSummaryCard';
import { WeatherWidget } from './components/WeatherWidget';
import { CropHealthWidget } from './components/CropHealthWidget';
import { YieldPredictionWidget } from './components/YieldPredictionWidget';
import { MarketPriceWidget } from './components/MarketPriceWidget';
import { TaskReminderWidget } from './components/TaskReminderWidget';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in duration-700 pb-10">
        
        {/* Top Summary Row - Full Width */}
        <div className="w-full">
          <FarmSummaryCard />
        </div>

        {/* Dashboard Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full h-full">
          
          {/* Main Content Column (Left - 8 spans) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Split Row for AI Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-[350px]">
               <div className="h-full"><YieldPredictionWidget /></div>
               <div className="h-full"><CropHealthWidget /></div>
            </div>

            {/* Market Prices taking full bottom width of left col */}
            <div className="min-h-[300px]">
              <MarketPriceWidget />
            </div>

          </div>

          {/* Sidebar Column (Right - 4 spans) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="min-h-[250px]"><WeatherWidget /></div>
            <div className="min-h-[400px] flex-1"><TaskReminderWidget /></div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
