import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCrop, useCropEvents } from '@agriconnect/hooks';
import { GrowthStageTracker } from '../components/GrowthStageTracker';
import { CropTimeline } from '../components/CropTimeline';
import { CropScanner } from '../components/CropScanner';
import { Button, Card, Badge, Skeleton } from '@agriconnect/ui';
import { ArrowLeft, Plus, Factory, Activity, Clock, Sprout, ScanLine } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export const CropDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = React.useState(false);

  const { data: crop, isLoading: isCropLoading, isError: isCropError } = useCrop(id || '');
  const { data: events, isLoading: isEventsLoading } = useCropEvents(id || '');

  if (isCropLoading) {
    return (
      <div className="space-y-6">
        <div className="flex gap-4 items-center">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-64" />
        </div>
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  if (isCropError || !crop) {
    return (
      <div className="text-center py-20 bg-destructive/5 rounded-3xl border border-destructive/20 text-destructive">
        <p className="font-bold text-lg">Crop details not found.</p>
        <Button variant="outline" onClick={() => navigate('/crops')} className="mt-4 border-destructive/20">Go Back to Crops</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/crops')}
            className="h-10 w-10 p-0 rounded-full bg-muted/50 hover:bg-muted mb-auto mt-1"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black tracking-tighter text-foreground">{crop.cropName}</h1>
              <Badge variant="secondary" className="font-bold bg-primary/10 text-primary uppercase tracking-wider">{crop.variety}</Badge>
            </div>
            <p className="text-muted-foreground font-medium flex items-center gap-2 mt-1">
              Plot ID: <span className="uppercase text-foreground font-bold">{crop.plotId}</span>
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button 
            onClick={() => setShowScanner(true)}
            className="w-full sm:w-auto font-bold bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 text-white h-11 px-5 rounded-xl border border-indigo-400 group relative overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <ScanLine className="w-5 h-5 mr-2" />
            Scan Crop
          </Button>

          <Button 
            onClick={() => navigate(`/crops/${crop.id}/events/create`)}
            className="w-full sm:w-auto font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 h-11 px-6 rounded-xl"
          >
            <Plus className="w-5 h-5 mr-1.5" />
            Log Activity
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Focus Area */}
        <div className="lg:col-span-2 space-y-6">
          <GrowthStageTracker currentStage={crop.status} />

          {/* AI Yield & Health Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <Card className="p-5 flex items-start gap-4 border-l-4 border-l-primary bg-primary/5 border-t border-r border-b border-border shadow-sm">
                <div className="p-3 bg-white rounded-xl shadow-sm text-primary">
                  <Factory className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">AI Yield Prediction</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-foreground">{crop.yieldPrediction || '--'}</span>
                    <span className="text-sm font-bold text-muted-foreground">tons/acre</span>
                  </div>
                  <p className="text-xs font-semibold text-primary mt-1">{(crop.confidenceScore || 0) * 100}% Confidence Score</p>
                </div>
             </Card>

             <Card className="p-5 flex items-start gap-4 border-border shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-green-500/10 blur-3xl -mr-10 -mt-10 rounded-full" />
                <div className="p-3 bg-green-500/10 rounded-xl shadow-sm text-green-600 relative z-10">
                  <Activity className="w-6 h-6" />
                </div>
                <div className="relative z-10">
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Crop Health</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-green-600">Excellent</span>
                  </div>
                  <p className="text-xs font-semibold text-muted-foreground mt-1">NDVI Score: 0.82 (Optimal)</p>
                </div>
             </Card>
          </div>

          {/* Timeline View */}
          <Card className="border-border shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border bg-muted/20 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Activity Timeline
                </h3>
              </div>
              <Button size="sm" variant="outline" className="font-bold rounded-lg" onClick={() => navigate(`/crops/${crop.id}/events`)}>
                View All
              </Button>
            </div>
            <div className="p-2 sm:p-5">
              {isEventsLoading ? (
                 <div className="space-y-4 p-4">
                  <Skeleton className="h-32 w-full rounded-2xl" />
                  <Skeleton className="h-32 w-full rounded-2xl" />
                 </div>
              ) : (
                <CropTimeline events={(events || []).slice(0, 3)} /> // Show only top 3 on dashboard
              )}
            </div>
          </Card>
        </div>

        {/* Right Sidebar - Info */}
        <div className="space-y-6">
          <Card className="p-5 border-border shadow-sm">
             <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Crop Details</h3>
             <div className="space-y-4">
               <div>
                 <p className="text-xs text-muted-foreground font-medium mb-1">Sowing Date</p>
                 <p className="font-bold text-sm text-foreground">{new Date(crop.sowingDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
               </div>
               <div>
                 <p className="text-xs text-muted-foreground font-medium mb-1">Expected Harvest</p>
                 <p className="font-bold text-sm text-foreground">{new Date(crop.expectedHarvestDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
               </div>
               {crop.seedSource && (
                 <div>
                   <p className="text-xs text-muted-foreground font-medium mb-1">Seed Source/Vendor</p>
                   <p className="font-bold text-sm text-foreground">{crop.seedSource}</p>
                 </div>
               )}
               <div className="pt-4 mt-4 border-t border-border">
                  <Button variant="outline" className="w-full font-bold">Edit Details</Button>
               </div>
             </div>
          </Card>

          {/* Quick Adisory Alerts Box */}
          <Card className="p-5 border-amber-200 bg-amber-50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-amber-400" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-amber-900 flex items-center gap-2 mb-3">
              <Sprout className="w-4 h-4" /> Recommended Action
            </h3>
            <p className="text-sm font-medium text-amber-800 leading-relaxed">
              Based on the weather forecast and crop stage, applying NPK fertilizer in the next 3 days will maximize yield potential.
            </p>
            <Button size="sm" className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold border-none shadow-sm">
              Log Fertilizer Activity
            </Button>
          </Card>
        </div>

      </div>

      <AnimatePresence>
        {showScanner && (
           <CropScanner 
             cropName={`${crop.cropName} (${crop.plotId.toUpperCase()})`} 
             onClose={() => setShowScanner(false)} 
           />
        )}
      </AnimatePresence>
    </div>
  );
};
