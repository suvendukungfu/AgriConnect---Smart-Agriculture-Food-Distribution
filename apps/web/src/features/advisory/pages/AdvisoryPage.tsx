import React from 'react';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Card, Button } from '@agriconnect/ui';
import { AlertCircle, Zap, Droplets, Thermometer, ArrowRight } from 'lucide-react';

const ADVISORIES = [
  { 
    id: '1', 
    type: 'risk', 
    title: 'Pest Alert (Bollworm)', 
    description: 'Bollworm activity detected in 35% of monitored plots in Ludhiana district. Preventive spray recommended for cotton crops.',
    date: 'Today, 09:30 AM',
    priority: 'high',
    icon: AlertCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200'
  },
  { 
    id: '2', 
    type: 'recommendation', 
    title: 'Fertilizer Optimization', 
    description: 'Current soil nitrogen levels are low for vegetative stage. Apply 25kg/Acre of Urea before next irrigation.',
    date: 'Yesterday, 04:15 PM',
    priority: 'medium',
    icon: Zap,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200'
  },
  { 
    id: '3', 
    type: 'weather', 
    title: 'Heavy Rainfall Warning', 
    description: '60-80mm rainfall expected over next 48 hours. Ensure proper drainage in Plot B to avoid root rot.',
    date: 'Mar 07, 2024',
    priority: 'medium',
    icon: Droplets,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
];

export const AdvisoryPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex justify-between items-center text-left">
          <div className="text-left">
            <h1 className="text-3xl font-bold font-heading text-foreground">Agronomic Advisory</h1>
            <p className="text-sm text-muted-foreground mt-1 text-left">Smart recommendations based on satellite and soil data.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {ADVISORIES.map((adv) => (
                <Card key={adv.id} className={`p-6 border-l-4 ${adv.border} ${adv.bg} hover:shadow-md transition-shadow group flex items-start gap-4 text-left`}>
                  <div className={`p-3 rounded-2xl bg-background shadow-sm ${adv.color}`}>
                    <adv.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="text-left">
                        <h4 className="font-bold text-foreground text-lg">{adv.title}</h4>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1 text-left">{adv.date}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${adv.priority === 'high' ? 'bg-red-200 text-red-900' : 'bg-yellow-200 text-yellow-900'}`}>
                        {adv.priority} Priority
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed text-left">{adv.description}</p>
                    <div className="mt-4 flex gap-3 text-left">
                       <Button size="sm" className="rounded-xl h-9 text-xs font-bold">Implement Action</Button>
                       <Button size="sm" variant="ghost" className="rounded-xl h-9 text-xs font-bold gap-2">
                          Learn More <ArrowRight className="w-3 h-3" />
                       </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
             <Card className="p-6 text-left">
                <h3 className="text-lg font-bold font-heading mb-4 text-left">Agronomist Support</h3>
                <div className="p-4 bg-muted/50 rounded-2xl border border-border text-left">
                   <p className="text-sm font-bold text-foreground text-left">Direct Consultation</p>
                   <p className="text-xs text-muted-foreground mt-1 text-left">Chat with Dr. Singh for specific crop issues.</p>
                   <Button className="w-full mt-4 rounded-xl font-bold" variant="secondary">Start AI Chat</Button>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-green-50 rounded-lg">
                        <Thermometer className="w-4 h-4 text-green-600" />
                     </div>
                     <span className="text-xs font-bold text-muted-foreground text-left text-left">Optimum Temp for Wheat: 22-26°C</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-blue-50 rounded-lg">
                        <Droplets className="w-4 h-4 text-blue-600" />
                     </div>
                     <span className="text-xs font-bold text-muted-foreground text-left text-left">Soil Moisture Level: 68% (Healthy)</span>
                  </div>
                </div>
             </Card>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};
