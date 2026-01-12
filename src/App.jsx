// src/App.jsx - FIXED VERSION
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Outlet, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';  // ← ADD THIS
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import EventsPage from './features/events/pages/EventsPage';
import EventList from './features/events/pages/EventList'; 
import MapPage from './features/events/pages/MapPage'; 
import CalendarPage from './features/events/pages/CalendarPage'; 
import BookmarksPage from './features/events/pages/BookmarksPage';
import Footer from "./layout/Footer";
import EventDetail from './features/events/pages/EventDetail';
import { useBookmarksCount } from './hooks/useBookmarks';  

// ✅ FIXED: Navbar OUTSIDE App - PROPER COMPONENT
function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();  // ✅ Now works with AuthProvider
  const bookmarksCount = useBookmarksCount();
  
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <button onClick={() => navigate('/')} className="text-2xl font-bold text-gray-900 hover:text-purple-300">
              TvmEvents Hub
            </button>
          </div>

          {/* Center Nav Items */}
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => navigate('/map')} className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
              🗺️ Map
            </button>
            <button onClick={() => navigate('/calendar')} className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
              📅 Calendar
            </button>
            <button onClick={() => navigate('/bookmarks')} className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
              ⭐ Bookmarks ({bookmarksCount})
            </button>
            
            {/* ✅ FIXED AUTH BUTTONS */}
            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  <span className="text-sm text-slate-500">Hi, {user.email?.split('@')[0]}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500/90 hover:bg-red-600 text-white font-bold rounded-xl text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl text-sm">
                    Sign In
                  </Link>
                  <Link to="/signup" className="px-4 py-2 bg-white text-slate-800 font-bold rounded-xl text-sm border">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Join events in Thiruvananthapuram
        </h2>
        <button 
          onClick={() => navigate('/events')}
          className="bg-purple-600 px-12 py-4 rounded-full text-xl font-semibold hover:bg-purple-700 shadow-lg"
        >
          Discover Events
        </button>
      </div>
    </div>
  );
}

function Layout() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer /> 
    </>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<EventsPage />}>
          <Route index element={<EventList />} />
          <Route path=":eventid" element={<EventDetail />} />
        </Route>
        <Route path="map" element={<MapPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>  {/* 🚀 CRITICAL: WRAPS EVERYTHING */}
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
