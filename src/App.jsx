import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EventList from './features/events/pages/EventList.jsx'
import EventDetail from './features/events/pages/EventDetail.jsx';
import EventFilters from './features/events/components/EventFilters.jsx';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-orange-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              TvmEvents
            </h1>
            <div className="flex space-x-3">
              <button className="px-6 py-3 bg-white shadow-md rounded-full hover:shadow-lg border text-sm font-medium transition-all">
                Log in
              </button>
              <button className="px-6 py-3 bg-black text-white shadow-md rounded-full hover:shadow-lg text-sm font-medium transition-all">
                Sign up
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <Routes>
{/* <Route path='/' element={<EventFilters />} /> */}

            <Route path="/" element={<EventList />} />
           <Route path="/events/:id" element={<EventDetail />} />
          
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
