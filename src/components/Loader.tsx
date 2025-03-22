
import React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
}

export const Loader = ({ className, size = 'md', fullScreen = false, text }: LoaderProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={cn(
      'flex flex-col items-center justify-center',
      fullScreen && 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50',
      className
    )}>
      <div className="relative">
        <div className={cn(
          'rounded-full border-t-4 border-primary animate-spin',
          sizeClasses[size]
        )} />
        <div className={cn(
          'absolute inset-0 rounded-full border-4 border-nutrinet-100 opacity-30',
          sizeClasses[size]
        )} />
        <div className={cn(
          'absolute inset-0 flex items-center justify-center'
        )}>
          <div className="w-2/5 h-2/5 rounded-full bg-nutrinet-200 animate-pulse-gentle" />
        </div>
      </div>
      {text && (
        <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default Loader;
