import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CropEventSchema, CropEvent } from '@agriconnect/types';
import { Card, Button, Input, cn } from '@agriconnect/ui';
import { Calendar as CalendarIcon, UploadCloud, Sprout, Droplets, FlaskConical, Bug, AlertTriangle, Wheat, IndianRupee, ImagePlus, X } from 'lucide-react';
import { format } from 'date-fns';

const EVENT_TYPES = [
  { id: 'sowing', label: 'Sowing', icon: Sprout, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'irrigation', label: 'Irrigation', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'fertilizer', label: 'Fertilizer', icon: FlaskConical, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 'pesticide', label: 'Pesticide', icon: Bug, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 'disease_report', label: 'Disease Report', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'harvest', label: 'Harvest', icon: Wheat, color: 'text-yellow-600', bg: 'bg-yellow-50' },
] as const;

// We omit generated ids and dates that we might auto-fill, but let user pick date.
const FormSchema = CropEventSchema.omit({ id: true, cropCycleId: true, images: true });
type FormValues = {
  eventType: 'sowing' | 'irrigation' | 'fertilizer' | 'pesticide' | 'disease_report' | 'harvest';
  date: string;
  notes?: string;
  quantity?: number;
  cost?: number;
  inputsUsed?: string;
};

interface CropEventFormProps {
  onSubmit: (data: FormValues, filePreviews: string[]) => void;
  isLoading?: boolean;
}

export const CropEventForm: React.FC<CropEventFormProps> = ({ onSubmit, isLoading }) => {
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      eventType: 'irrigation',
    }
  });

  const selectedType = watch('eventType');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Simulate image uploading by generating local object URLs
    const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
    setFilePreviews(prev => [...prev, ...newPreviews].slice(0, 4)); // Max 4 images
  };

  const removeImage = (index: number) => {
    setFilePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const submitForm = (data: FormValues) => {
    onSubmit(data, filePreviews);
  };

  return (
    <Card className="p-4 md:p-6 border-border shadow-sm">
      <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
        
        {/* Event Type Grid - Mobile optimized large targets */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-foreground">Select Activity Type *</label>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {EVENT_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              
              return (
                <button
                  type="button"
                  key={type.id}
                  onClick={() => setValue('eventType', type.id as FormValues['eventType'], { shouldValidate: true })}
                  className={cn(
                    "relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 aspect-4/3 sm:aspect-auto sm:h-24",
                    isSelected 
                      ? `border-primary bg-primary/5 shadow-md ring-2 ring-primary/20`
                      : "border-border hover:border-primary/40 hover:bg-muted/50"
                  )}
                >
                  <Icon className={cn("h-6 w-6 sm:h-8 sm:w-8 mb-2 transition-transform", isSelected ? "scale-110 text-primary" : "text-muted-foreground")} />
                  <span className={cn(
                    "text-xs sm:text-sm font-bold truncate w-full px-1 text-center",
                    isSelected ? "text-primary" : "text-foreground"
                  )}>{type.label}</span>
                </button>
              );
            })}
          </div>
          {errors.eventType && <p className="text-destructive text-sm font-medium mt-1">{errors.eventType.message}</p>}
        </div>

        {/* Date & Core Info */}
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              Date of Activity *
            </label>
            <Input 
              type="date" 
              {...register('date')}
              className="h-12 w-full text-base sm:text-sm appearance-none rounded-xl"
            />
            {errors.date && <p className="text-destructive text-sm font-medium">{errors.date.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Materials / Inputs Used</label>
            <Input 
              {...register('inputsUsed')}
              placeholder="e.g. Urea, Neem Oil, PBW-343 Seeds"
              className="h-12 rounded-xl text-base sm:text-sm"
            />
          </div>
        </div>

        {/* Quantity & Cost */}
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Quantity (kg, L, etc.)</label>
            <Input 
              type="number" 
              step="any"
              {...register('quantity', { valueAsNumber: true })}
              className="h-12 rounded-xl text-base sm:text-sm"
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-muted-foreground" />
              Total Cost
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-muted-foreground font-semibold">₹</span>
              </div>
              <Input 
                type="number" 
                step="any"
                {...register('cost', { valueAsNumber: true })}
                className="h-12 rounded-xl text-base sm:text-sm pl-8"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">Activity Notes & Observations</label>
          <textarea 
            {...register('notes')}
            className="flex min-h-[100px] w-full rounded-xl border border-border bg-background px-3 py-2 text-base sm:text-sm font-medium ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 custom-scrollbar resize-y"
            placeholder="Document weather conditions, crop stress, or specific techniques used..."
          />
        </div>

        {/* Photo Upload */}
        <div className="space-y-3 pt-2">
          <label className="text-sm font-bold text-foreground flex items-center gap-2">
            <ImagePlus className="w-4 h-4 text-muted-foreground" />
            Attach Photos <span className="text-muted-foreground font-normal ml-1">(Optional, Max 4)</span>
          </label>
          
          <div className="flex flex-wrap gap-3">
            {filePreviews.map((url, i) => (
              <div key={i} className="relative h-24 w-24 rounded-xl border-2 border-border overflow-hidden group">
                <img src={url} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-destructive text-white rounded-full backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X className="w-3 h-3 font-bold" />
                </button>
              </div>
            ))}

            {filePreviews.length < 4 && (
              <label className="flex flex-col items-center justify-center h-24 w-24 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/50 cursor-pointer transition-colors group">
                <UploadCloud className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-wide">Upload</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-6 border-t border-border">
          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-14 rounded-xl text-base font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? 'Saving Activity...' : 'Log Field Activity'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
