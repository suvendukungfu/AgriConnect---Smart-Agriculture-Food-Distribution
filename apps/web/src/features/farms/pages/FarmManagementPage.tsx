import React from 'react';
import { DashboardLayout } from '../../../layouts/DashboardLayout';
import { Card, Button } from '@agriconnect/ui';
import { Plus, MapPin, Ruler, Droplets, ArrowRight } from 'lucide-react';
import { Farm } from '@agriconnect/types';

const MOCK_FARMS: Farm[] = [
  { id: '1', name: 'Golden Acres', location: 'Ludhiana, Punjab', totalArea: 12.5, soilType: 'Loamy', ownerId: '1', plots: [] },
  { id: '2', name: 'Green Valley', location: 'Jalandhar, Punjab', totalArea: 8.2, soilType: 'Sandy Loam', ownerId: '1', plots: [] },
];

export const FarmManagementPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-heading text-foreground">My Farms</h1>
            <p className="text-sm text-muted-foreground mt-1 text-left">Manage your land holdings and plot allocations.</p>
          </div>
          <Button className="gap-2 rounded-xl h-11 px-6 shadow-lg shadow-primary/20">
            <Plus className="w-5 h-5" /> Add New Farm
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_FARMS.map((farm) => (
            <Card key={farm.id} className="group hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden text-left">
               <div className="h-32 bg-gradient-to-br from-green-500/10 to-primary/5 p-6 flex items-end">
                  <div className="p-3 bg-background rounded-xl shadow-sm">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground group-hover:text-primary transition-colors">{farm.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 font-medium">
                       <MapPin className="w-3 h-3" /> {farm.location}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest text-left">Area</p>
                      <p className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Ruler className="w-3 h-3 text-primary" /> {farm.totalArea} Acres
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest text-left">Soil Type</p>
                      <p className="text-sm font-bold text-foreground">
                        {farm.soilType}
                      </p>
                    </div>
                  </div>

                  <Button variant="ghost" className="w-full justify-between font-bold group/btn">
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
               </div>
            </Card>
          ))}
          
          <button className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-2xl hover:bg-muted/50 hover:border-primary/50 transition-all group min-h-[300px]">
             <div className="p-4 bg-muted rounded-full group-hover:bg-primary/10 transition-colors">
                <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
             </div>
             <p className="mt-4 font-bold text-muted-foreground group-hover:text-primary">Add another farm</p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};
