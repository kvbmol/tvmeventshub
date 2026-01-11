// src/App.jsx - TVMEVENTS HUB WITH FULL NAVBAR
import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import EventsPage from './features/events/pages/EventsPage';
import EventList from './features/events/pages/EventList'; // Adjust path
import MapPage from './features/events/pages/MapPage'; // Adjust path
import CalendarPage from './features/events/pages/CalendarPage'; // Adjust path


function Navbar() {
  const navigate = useNavigate();
  
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-gray-900 hover:text-purple-600 transition duration-200"
            >
              TvmEvents Hub
            </button>
          </div>

          {/* Center Nav Items */}
          <div className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => navigate('/map')}
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              🗺️ Map
            </button>
            <button 
              onClick={() => navigate('/calendar')}
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              📅 Calendar
            </button>
            <button 
              onClick={() => navigate('/bookmarks')}
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              ⭐ Bookmarks
            </button>
          </div>

          {/* Right Side - Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => navigate('/login')}
              className="text-purple-600 hover:text-purple-800 font-medium text-sm"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 shadow-md transition duration-200"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-700 hover:text-purple-600 p-1">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
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
        <h2 className="text-5xl font-bold text-gray-900 mb-6">Find your people</h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Join events in Thiruvananthapuram
        </p>
        <button 
          onClick={() => navigate('/events')}
          className="bg-purple-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-purple-700 shadow-lg"
        >
          Find Events
        </button>
      </div>
    </div>
  );
}

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="/map" element={<MapPage />} />        {/* Your MapPage */}
        <Route path="/calendar" element={<CalendarPage />} />  {/* Your Calendar */}
        <Route path="/bookmarks" element={<EventList />} /> {/* Your EventList */}
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
