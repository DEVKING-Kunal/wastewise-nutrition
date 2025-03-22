
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface TransitionLayoutProps {
  children: React.ReactNode;
}

const TransitionLayout: React.FC<TransitionLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === "fadeOut") {
      setTransitionStage("fadeIn");
      setDisplayLocation(location);
    }
  };

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] w-full ${
        transitionStage === "fadeIn" ? "animate-fade-in" : "animate-fade-out"
      }`}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};

export default TransitionLayout;
