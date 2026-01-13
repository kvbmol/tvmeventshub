import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Outlet,
  Link,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; 
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import EventsPage from "./features/events/pages/EventsPage";
import EventList from "./features/events/pages/EventList";

import EventCalendar from "./features/events/components/EventCalendar";
import CalendarPage from "./features/events/pages/CalendarPage";
import BookmarksPage from "./features/events/pages/BookmarksPage";
import Footer from "./layout/Footer";
import EventDetail from "./features/events/pages/EventDetail";
import Navbar from "./features/events/components/Navbar"; 
import { useBookmarksCount } from "./hooks/useBookmarks";

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/events?search=${searchTerm}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="relative h-90% w-full flex flex-col items-center justify-center border rounded-3xl bg-cover bg-center bg-no-repeat bg-purple-400"
        style={{ backgroundImage: `url('./src/assets/hero.jpg')` }}
      >
        <div className="absolute inset-0 bg-linear-gradient-to-b from-purple-900/30 to-purple-900/60 z-0"></div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 drop-shadow-xl leading-tight">
            Welcome to TvmEventsHub
          </h1>
          <p className="text-lg md:text-xl mb-10 drop-shadow-lg leading-relaxed">
            Discover amazing events happening in Thiruvananthapuram
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <EventList />
          </div>
        </div>
      </section>
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

        <Route path="/calendar" element={<CalendarPage />} />

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
      <AuthProvider>
        {" "}
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
