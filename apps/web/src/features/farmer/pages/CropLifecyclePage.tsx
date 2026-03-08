import React from 'react';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { CropTimeline } from '../components/CropTimeline';
import { Card, Button } from '@agriconnect/ui';
import { Plus, History } from 'lucide-react';

const MOCK_STAGES: any[] = [
  { name: 'Sowing / Seedling', date: 'Oct 25, 2023', status: 'completed', description: 'Planted Wheat (PBW-343) in Plot A. Soil moisture: 18%.' },
  { name: 'Germination', date: 'Nov 05, 2023', status: 'completed', description: '92% emergence detected. First irrigation applied.' },
  { name: 'Vegetative Growth', date: 'Dec 12, 2023', status: 'completed', description: 'Broad leave herbicide application completed.' },
  { name: 'Flowering & Heading', date: 'Jan 20, 2024', status: 'current', description: 'Peak moisture requirement period. Active monitoring for pests.' },
  { name: 'Grain Filling', date: 'Mar 15, 2024', status: 'upcoming', description: 'Projected date based on current heat accumulation.' },
  { name: 'Harvest', date: 'Apr 10, 2024', status: 'upcoming', description: 'Estimated based on historical yield curves.' },
];

export const CropLifecyclePage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <h1 className="text-3xl font-bold font-heading text-foreground">Crop Lifecycle</h1>
            <p className="text-sm text-muted-foreground mt-1">Real-time tracking of growth stages and events.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="gap-2 rounded-xl">
               <History className="w-5 h-5" /> View Log
            </Button>
            <Button className="gap-2 rounded-xl shadow-lg ring-primary/20">
               <Plus className="w-5 h-5" /> Log Event
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
             <Card className="p-8">
                <CropTimeline stages={MOCK_STAGES} />
             </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
             <Card className="p-6 bg-primary/5 border-primary/20 text-left">
                <h3 className="text-lg font-bold font-heading mb-4">Active Information</h3>
                <div className="space-y-4">
                   <div className="p-4 bg-background rounded-xl border border-border">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-left">Growth Progress</p>
                      <p className="text-2xl font-bold text-primary mt-1">74%</p>
                      <div className="w-full h-1.5 bg-muted rounded-full mt-2">
                        <div className="h-full bg-primary rounded-full" style={{ width: '74%' }}></div>
                      </div>
                   </div>
                   <div className="p-4 bg-background rounded-xl border border-border">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-left">Days Since Sowing</p>
                      <p className="text-2xl font-bold text-foreground mt-1">112 Days</p>
                   </div>
                </div>
             </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
