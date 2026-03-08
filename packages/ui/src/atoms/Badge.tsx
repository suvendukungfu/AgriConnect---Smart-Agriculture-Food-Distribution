import React from 'react';
import { cn } from '../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ 
  className, 
  variant = 'default', 
  size = 'md',
  ...props 
}) => {
  const variants = {
    default: 'bg-primary text-primary-foreground border-transparent',
    secondary: 'bg-muted text-foreground border-transparent',
    outline: 'bg-transparent text-foreground border-border',
    destructive: 'bg-destructive/10 text-destructive border-destructive/20',
    success: 'bg-green-500/10 text-green-600 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  };

  const sizes = {
    sm: 'px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-widest leading-none',
    md: 'px-2 py-1 text-xs font-semibold',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border transition-all duration-300',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
