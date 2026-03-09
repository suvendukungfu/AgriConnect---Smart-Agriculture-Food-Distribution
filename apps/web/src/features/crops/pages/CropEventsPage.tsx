import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCrop, useCropEvents } from '@agriconnect/hooks';
import { CropTimeline } from '../components/CropTimeline';
import { Button, Skeleton } from '@agriconnect/ui';
import { ArrowLeft, Plus, Clock } from 'lucide-react';

export const CropEventsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: crop, isLoading: isCropLoading } = useCrop(id || '');
  const { data: events, isLoading: isEventsLoading } = useCropEvents(id || '');

  if (isCropLoading || isEventsLoading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(`/crops/${id}`)}
            className="h-10 w-10 p-0 rounded-full bg-muted/50 hover:bg-muted mb-auto mt-1"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-foreground flex items-center gap-2">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              Activity Timeline
            </h1>
            <p className="text-muted-foreground font-medium mt-1">
              Complete history of {crop?.cropName} ({crop?.variety}) on Plot {crop?.plotId.toUpperCase()}
            </p>
          </div>
        </div>
        
        <Button 
          onClick={() => navigate(`/crops/${id}/events/create`)}
          className="w-full sm:w-auto font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 h-12 px-6 rounded-xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Log New Activity
        </Button>
      </div>

      {/* Timeline */}
      <div className="bg-card rounded-3xl border border-border shadow-sm p-4 sm:p-8">
        <CropTimeline events={events || []} />
      </div>
    </div>
  );
};
