import React, { Suspense, useState, useEffect } from 'react';

interface Props {
  fallback: React.ReactNode;
  minDuration?: number; // milliseconds
  children: React.ReactNode;
}

const SuspenseWithDelay: React.FC<Props> = ({ fallback, minDuration = 800, children }) => {
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(false), minDuration);
    return () => clearTimeout(timer);
  }, [minDuration]);

  return <Suspense fallback={fallback}>{showFallback ? fallback : children}</Suspense>;
};

export default SuspenseWithDelay;
