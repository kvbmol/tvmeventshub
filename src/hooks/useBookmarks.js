// // src/hooks/useBookmarks.js
// import { useState, useEffect } from 'react';

// export const useBookmarksCount = () => {
//   const [count, setCount] = useState(0);
  
//   useEffect(() => {
//     const updateCount = () => {
//       const saved = JSON.parse(localStorage.getItem('tvmevents-bookmarks') || '[]');
//       setCount(saved.length);
//     };
    
//     updateCount();
//     const interval = setInterval(updateCount, 1000);
//     return () => clearInterval(interval);
//   }, []);
  
//   return count;
// };


// src/hooks/useBookmarks.js - FIXED VERSION
import { useState, useEffect } from 'react';

export const useBookmarksCount = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Single check on mount only
    const saved = JSON.parse(localStorage.getItem('tvmevents-bookmarks') || '[]');
    setCount(saved.length);
  }, []); // Empty deps - runs ONCE
  
  return count;
};
