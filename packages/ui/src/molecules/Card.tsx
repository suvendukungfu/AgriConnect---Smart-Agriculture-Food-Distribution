import React from 'react';
import { cn } from '../atoms/Button';

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  glass?: boolean;
}

export const Card = ({ className, children, glass }: CardProps) => {
  return (
    <div className={cn(
      'rounded-xl border border-border bg-card text-card-foreground shadow-sm',
      glass && 'bg-background/80 backdrop-blur-md',
      className
    )}>
      {children}
    </div>
  );
};
