import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateCrop } from '@agriconnect/hooks';
import { CropCycleSchema } from '@agriconnect/types';
import { Card, Button, Input, cn } from '@agriconnect/ui';
import { ArrowLeft, Leaf, MapPin, Calendar, CheckSquare } from 'lucide-react';

const FormSchema = CropCycleSchema.omit({ id: true, yieldPrediction: true, confidenceScore: true });
type FormValues = {
  cropName: string;
  variety: string;
  sowingDate: string;
  expectedHarvestDate: string;
  plotId: string;
  seedSource?: string;
  status: 'seeded' | 'germination' | 'vegetative' | 'flowering' | 'grain_filling' | 'harvested';
};

// Mock plot data for dropdown
const PLOTS = [
  { id: 'plot-a', name: 'North Field 1', area: 5.2 },
  { id: 'plot-b', name: 'North Field 2', area: 3.8 },
  { id: 'plot-c', name: 'River Acre', area: 12.0 },
];

export const CreateCropPage: React.FC = () => {
  const navigate = useNavigate();
  const createCrop = useCreateCrop();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: 'seeded',
      sowingDate: new Date().toISOString().split('T')[0],
    }
  });

  const selectedPlotId = watch('plotId');

  const onSubmit = (data: FormValues) => {
    createCrop.mutate(data, {
      onSuccess: () => {
        navigate('/crops');
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/crops')}
          className="h-10 w-10 p-0 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-foreground">Start New Crop Cycle</h1>
          <p className="text-muted-foreground font-medium mt-1">
            Register a new planting season to begin tracking and AI predictions.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card className="p-6 sm:p-8 mt-6 sm:mt-8 border border-border shadow-lg shadow-primary/5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Section: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 flex items-center gap-2">
              <Leaf className="w-4 h-4" /> 1. Crop Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Crop Type *</label>
                <Input 
                  {...register('cropName')}
                  placeholder="e.g. Wheat, Maize, Cotton"
                  className="h-12 rounded-xl text-base sm:text-sm"
                />
                {errors.cropName && <p className="text-destructive text-sm font-medium mt-1">{errors.cropName.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Variety/Hybrid *</label>
                <Input 
                  {...register('variety')}
                  placeholder="e.g. PBW-343, Pioneer 32B3"
                  className="h-12 rounded-xl text-base sm:text-sm"
                />
                {errors.variety && <p className="text-destructive text-sm font-medium mt-1">{errors.variety.message}</p>}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-sm font-bold text-foreground">Seed Source/Vendor (Optional)</label>
              <Input 
                {...register('seedSource')}
                placeholder="Where did you get the seeds?"
                className="h-12 rounded-xl text-base sm:text-sm"
              />
            </div>
          </div>

          {/* Section: Timeline */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 flex items-center gap-2 mt-8">
              <Calendar className="w-4 h-4" /> 2. Key Dates
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Sowing/Planting Date *</label>
                <Input 
                  type="date"
                  {...register('sowingDate')}
                  className="h-12 rounded-xl text-base sm:text-sm appearance-none"
                />
                {errors.sowingDate && <p className="text-destructive text-sm font-medium mt-1">{errors.sowingDate.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Expected Harvest Date *</label>
                <Input 
                  type="date"
                  {...register('expectedHarvestDate')}
                  className="h-12 rounded-xl text-base sm:text-sm appearance-none"
                />
                {errors.expectedHarvestDate && <p className="text-destructive text-sm font-medium mt-1">{errors.expectedHarvestDate.message}</p>}
              </div>
            </div>
          </div>

          {/* Section: Plot Allocation */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-2 flex items-center gap-2 mt-8">
              <MapPin className="w-4 h-4" /> 3. Plot Allocation
            </h3>
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Select Field Plot *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PLOTS.map(plot => (
                  <button
                    key={plot.id}
                    type="button"
                    onClick={() => setValue('plotId', plot.id, { shouldValidate: true })}
                    className={cn(
                      "flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all",
                      selectedPlotId === plot.id 
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                        : "border-border hover:border-primary/40 hover:bg-muted/50 text-muted-foreground"
                    )}
                  >
                    <span className={cn("font-bold", selectedPlotId === plot.id ? "text-primary" : "text-foreground")}>{plot.name}</span>
                    <span className="text-xs font-semibold mt-1">{plot.area} Acres</span>
                  </button>
                ))}
              </div>
              {errors.plotId && <p className="text-destructive text-sm font-medium mt-1">{errors.plotId.message}</p>}
            </div>
          </div>

          {/* Submission */}
          <div className="pt-8 border-t border-border mt-8 flex justify-end gap-3">
             <Button 
              type="button" 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/crops')}
              className="h-12 rounded-xl px-6 font-bold"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              size="lg" 
              disabled={createCrop.isPending}
              className="h-12 rounded-xl px-8 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30"
            >
              <CheckSquare className="w-5 h-5 mr-2" />
              {createCrop.isPending ? 'Starting...' : 'Start Crop Cycle'}
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
};
