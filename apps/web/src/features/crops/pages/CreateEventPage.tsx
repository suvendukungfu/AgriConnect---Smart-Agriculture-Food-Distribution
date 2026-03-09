import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCrop, useCreateCropEvent } from '@agriconnect/hooks';
import { CropEventForm } from '../components/CropEventForm';
import { Button, Skeleton } from '@agriconnect/ui';
import { ArrowLeft, Edit3, Sprout } from 'lucide-react';

export const CreateEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: crop, isLoading } = useCrop(id || '');
  const createEvent = useCreateCropEvent(id || '');

  const handleSubmit = (data: any, files: string[]) => {
    // Simulated upload delay can be added here
    createEvent.mutate(
      { ...data, images: files },
      {
        onSuccess: () => {
          navigate(`/crops/${id}`);
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-[600px] w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(`/crops/${id}`)}
          className="h-10 w-10 p-0 rounded-xl bg-background"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-foreground flex items-center gap-2">
            <Edit3 className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            Log Custom Activity
          </h1>
          <p className="text-muted-foreground font-medium mt-1 flex items-center gap-2">
            <Sprout className="w-4 h-4 text-green-500" />
            For {crop?.cropName} on Plot {crop?.plotId.toUpperCase()}
          </p>
        </div>
      </div>

      <CropEventForm 
        onSubmit={handleSubmit}
        isLoading={createEvent.isPending}
      />
    </div>
  );
};
