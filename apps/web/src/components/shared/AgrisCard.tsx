import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface AgrisCardProps extends HTMLMotionProps<"div"> {
  glass?: boolean;
  hoverLogic?: boolean;
}

export const AgrisCard = React.forwardRef<HTMLDivElement, AgrisCardProps>(
  ({ className, glass = false, hoverLogic = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverLogic ? { y: -2, scale: 1.01 } : undefined}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "rounded-2xl border bg-card text-card-foreground shadow-soft overflow-hidden",
          glass && "bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-white/20 dark:border-slate-800/50",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
AgrisCard.displayName = "AgrisCard";
