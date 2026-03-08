import React from 'react';
import { cn } from '../utils/cn';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar: React.FC<AvatarProps> = ({ src, fallback, size = 'md', className, ...props }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-14 h-14 text-xl',
  };

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full border border-border shadow-sm ring-primary/10 transition-all hover:ring-2',
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={fallback} className="aspect-square h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted font-bold text-muted-foreground uppercase">
          {fallback.substring(0, 2)}
        </div>
      )}
    </div>
  );
};
