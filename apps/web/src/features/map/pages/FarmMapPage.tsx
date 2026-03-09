import React, { useState } from 'react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout';
import { Card, Button, Badge } from '@agriconnect/ui';
import { Map as MapIcon, Layers, Satellite, RefreshCw, Layers3, Flame, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';
import { FarmMap } from '../components/FarmMap';

export const FarmMapPage: React.FC = () => {
  const [showNDVI, setShowNDVI] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mockNdviData, setMockNdviData] = useState<number[][] | undefined>();

  // Mock static polygon for Central Valley, California
  const MOCK_POLYGON = [[
    [-121.905, 37.305],
    [-121.895, 37.305],
    [-121.895, 37.295],
    [-121.905, 37.295],
    [-121.905, 37.305]
  ]];

  const handleNDVIToggle = () => {
    if (!showNDVI) {
      setIsProcessing(true);
      // Simulate calling the Python Satellite Service
      setTimeout(() => {
        // Generate mock 10x10 matrix
        const heatmap = Array(10).fill(0).map(() => 
          Array(10).fill(0).map(() => Math.random() * 0.8 + 0.2)
        );
        setMockNdviData(heatmap);
        setIsProcessing(false);
        setShowNDVI(true);
      }, 1500);
    } else {
      setShowNDVI(false);
    }
  };

  return (
      <div className="space-y-6 animate-in fade-in duration-700 h-[calc(100vh-8rem)] flex flex-col">
        
        {/* Header Section */}
        <div className="flex justify-between items-center shrink-0">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <MapIcon className="w-8 h-8 text-primary" />
              Geospatial Analysis
            </h1>
            <p className="text-muted-foreground mt-1 font-medium">Real-time Sentinel-2 satellite imagery and NDVI spectral analysis.</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="font-bold gap-2 bg-background">
               <Layers3 className="w-4 h-4" /> Switch Plot
             </Button>
             <Button className="font-bold shadow-lg shadow-primary/20">
               <RefreshCw className="w-4 h-4 mr-2" /> Refresh Tiles
             </Button>
          </div>
        </div>

        {/* Main Map Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
          
          {/* Side Controls */}
          <Card className="lg:col-span-1 p-5 flex flex-col gap-6 overflow-y-auto bg-card/80 backdrop-blur-xl border-border/50">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" /> Map Layers
              </h3>
              
              <div className="space-y-3">
                <div 
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${showNDVI ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/50'}`}
                  onClick={handleNDVIToggle}
                >
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-lg ${showNDVI ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                       <Satellite className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="font-bold text-sm">NDVI Heatmap</p>
                       <p className="text-xs text-muted-foreground">Vegetation Index</p>
                     </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${showNDVI ? 'border-primary' : 'border-muted-foreground'}`}>
                    {showNDVI && <div className="w-2.5 h-2.5 bg-primary rounded-full animate-in zoom-in" />}
                  </div>
                </div>

                <div className="p-4 rounded-xl border-2 border-border/50 opacity-60 flex items-center justify-between cursor-not-allowed">
                  <div className="flex items-center gap-3">
                     <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                       <Droplets className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="font-bold text-sm">NDWI Moisture</p>
                       <p className="text-xs text-muted-foreground">Water Stress (Locked)</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {isProcessing && (
               <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-sm font-bold text-primary flex items-center justify-center gap-2 animate-pulse">
                 <RefreshCw className="w-4 h-4 animate-spin" /> Processing Raster Data...
               </div>
            )}

            {showNDVI && !isProcessing && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-xl bg-linear-to-b from-card to-muted border border-border/50 space-y-4">
                <h4 className="font-bold text-sm flex items-center gap-2">
                   <Flame className="w-4 h-4 text-orange-500" /> Plot Analysis
                </h4>
                
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Avg NDVI</p>
                    <p className="text-3xl font-black text-foreground">0.74</p>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-600 border-0 pointer-events-none mb-1">+0.04 WOW</Badge>
                </div>

                <div className="space-y-2 pt-2">
                   <div className="flex justify-between text-xs font-medium">
                     <span className="text-red-500">Stressed</span>
                     <span className="text-yellow-500">Moderate</span>
                     <span className="text-emerald-500">Optimal</span>
                   </div>
                   <div className="h-2 w-full rounded-full bg-linear-to-r from-red-500 via-yellow-500 to-emerald-500 opacity-80" />
                </div>
              </motion.div>
            )}
          </Card>

          {/* Map Viewport */}
          <div className="lg:col-span-3 bg-muted rounded-2xl overflow-hidden border border-border/50 shadow-inner relative">
            <FarmMap 
              farmCoordinates={MOCK_POLYGON} 
              showNDVI={showNDVI}
              ndviData={mockNdviData}
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="font-bold text-lg shadow-black drop-shadow-md">Rendering GeoTIFF Tiles...</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
  );
};
