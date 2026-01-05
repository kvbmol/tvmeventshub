// src/layout/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Star } from 'lucide-react'; 
function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/map">🗺️ Map</Link>
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">📅</span>
          <span className="text-xl font-bold text-pink-600">TvmEvents</span>
        </Link>
{/* <Link to="/" className="nav-link">Events</Link> */}
<Link to="/schedule" className="nav-link">📅 Schedule</Link>
<Link to="/bookmarks" className="nav-link flex items-center">
  <Star className="w-5 h-5 mr-1" /> Bookmarks
</Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <button className="rounded-full bg-slate-100 px-3 py-1 hover:bg-slate-200">
            Log in
          </button>
          <button className="rounded-full bg-pink-500 px-4 py-1 text-white hover:bg-pink-600">
            Sign up
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
