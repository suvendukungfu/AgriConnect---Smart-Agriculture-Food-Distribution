import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCrops } from '@agriconnect/hooks';
import { CropCard } from '../components/CropCard';
import { Button, Input, Skeleton } from '@agriconnect/ui';
import { Plus, Search, SlidersHorizontal, Leaf, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export const CropsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: crops, isLoading, isError } = useCrops();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCrops = crops?.filter(c => 
    c.cropName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.plotId.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-foreground flex items-center gap-3">
            <Leaf className="w-8 h-8 text-primary" />
            Crop Lifecycle
          </h1>
          <p className="text-muted-foreground font-medium mt-1">
            Manage your active crop cycles, track growth stages, and record events.
          </p>
        </div>
        <Button 
          size="lg" 
          onClick={() => navigate('/crops/create')}
          className="w-full sm:w-auto font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all text-sm h-12 px-6 rounded-xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Start New Cycle
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            type="search" 
            placeholder="Search crops, varieties, or plots..." 
            className="pl-11 h-12 rounded-xl text-base sm:text-sm border-border bg-card shadow-sm hover:border-primary/40 focus:border-primary transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="lg" className="h-12 w-full sm:w-auto px-4 rounded-xl font-bold bg-card border-border shadow-sm">
          <SlidersHorizontal className="w-5 h-5 sm:mr-2" />
          <span className="hidden sm:inline">Filters</span>
        </Button>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {isError && (
        <div className="p-8 text-center bg-destructive/10 rounded-2xl border border-destructive/20 text-destructive">
          <p className="font-bold">Failed to load crop cycles. Please try again later.</p>
        </div>
      )}

      {!isLoading && !isError && filteredCrops.length === 0 && (
        <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border shadow-sm">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">No crops found</h3>
          <p className="text-muted-foreground max-w-sm mx-auto mb-6">
            You don't have any crop cycles that match your search. Try adjusting the filters or start a new cycle.
          </p>
          <Button onClick={() => navigate('/crops/create')} className="font-bold rounded-xl" size="lg">
            Start New Crop Cycle
          </Button>
        </div>
      )}

      {!isLoading && !isError && filteredCrops.length > 0 && (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {filteredCrops.map((crop, index) => (
            <CropCard key={crop.id} crop={crop} index={index} />
          ))}
        </motion.div>
      )}
    </div>
  );
};
