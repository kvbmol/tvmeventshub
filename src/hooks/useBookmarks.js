// src/hooks/useBookmarks.js
import { useState, useEffect } from 'react';

export const useBookmarksCount = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const updateCount = () => {
      const saved = JSON.parse(localStorage.getItem('tvmevents-bookmarks') || '[]');
      setCount(saved.length);
    };
    
    updateCount();
    const interval = setInterval(updateCount, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return count;
};
