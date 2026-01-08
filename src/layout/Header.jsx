// src/layout/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Star } from 'lucide-react'; 
import { useBookmarksCount } from '../hooks/useBookmarks';  // Your custom hook

const Header = () => {
  const bookmarkCount = useBookmarksCount();  // ← ONLY THIS LINE NEEDED

  return (
    <header className="sticky top-0 z-50 border-b border-purple-100 bg-white/95 backdrop-blur-xl shadow-sm">
  <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
    <Link to="/map" className="text-slate-700 hover:text-purple-600">🗺️ Map</Link>
    
    <Link to="/" className="flex items-center gap-2">
      <span className="text-2xl">📅</span>
      <span className="text-xl font-black bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
        TvmEvents
      </span>
    </Link>
    
    <Link to="/schedule" className="text-slate-700 hover:text-purple-600">📅 Schedule</Link>
    
    <Link to="/bookmarks" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur border border-purple-200/50 rounded-2xl hover:from-purple-500/30 hover:to-purple-600/30 transition-all text-slate-700 hover:text-purple-600">
      <Star className="w-5 h-5" />
      <span>Bookmarks ({bookmarkCount})</span>
    </Link>

    {/* Auth buttons - PURPLE */}
    <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
      <button className="rounded-full bg-purple-50/80 px-4 py-2 hover:bg-purple-100 border border-purple-200 text-purple-700 font-semibold hover:shadow-md transition-all">
        Log in
      </button>
      <button className="rounded-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-2 font-bold shadow-lg hover:shadow-xl transition-all">
        Sign up
      </button>
    </nav>
  </div>
</header>

  );
};

export default Header;
