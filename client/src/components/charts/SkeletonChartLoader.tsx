import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonChartLoader = ({ height = 300 }: { height?: number }) => (
  <div style={{ height }} className="w-full flex flex-col justify-end pb-4 border-b border-l border-border/50 pl-4">
    <div className="w-full border-t border-border/30 border-dashed h-1/3" />
    <div className="w-full border-t border-border/30 border-dashed h-1/3" />
    <div className="w-full border-t border-border/30 h-[2px] mt-auto relative overflow-hidden">
      <Skeleton className="absolute bottom-0 left-0 w-full h-[60%] rounded-tr-full opacity-20" />
    </div>
  </div>
);
