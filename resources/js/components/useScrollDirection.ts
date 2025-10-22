// hooks/useScrollDirection.ts

import { useState, useEffect } from 'react';

export const useScrollDirection = (threshold = 30) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the vertical scroll position is past the threshold
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return scrolled;
};