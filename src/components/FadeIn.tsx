
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  className = "",
  duration = 500
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        "transition-all duration-500 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

export const FadeInStagger: React.FC<{ 
  children: React.ReactNode; 
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
}> = ({ 
  children, 
  staggerDelay = 100,
  initialDelay = 0,
  className = ""
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return (
            <FadeIn
              key={index}
              delay={initialDelay + index * staggerDelay}
            >
              {child}
            </FadeIn>
          );
        }
        return child;
      })}
    </div>
  );
};
