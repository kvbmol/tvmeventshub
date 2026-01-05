// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import EventList from "./features/events/pages/EventList";
import EventDetail from "./features/events/pages/EventDetail";
import CalendarPage from './features/events/pages/CalendarPage'; 
import MapPage from "./features/events/pages/MapPage";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-50 to-orange-50">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/map" element={<MapPage />} />
            <Route path="/schedule" element={<CalendarPage />} />
            <Route path="/" element={<EventList />} />
            <Route path="/events/:id" element={<EventDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
