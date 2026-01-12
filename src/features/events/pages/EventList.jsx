import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import EventFilters from "../components/EventFilters";

const EventList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // ✅ ALL STATE AT TOP LEVEL - SINGLE DEFINITION
  const [filters, setFilters] = useState({
    category: '', dateFrom: '', location: '', priceMax: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  
  // Your complete events array
  const events = [
    { id: 1, title: 'AWS Tech 2026', category: 'Tech', dateStart: '2026-01-20T18:30:00', location: 'Technopark, Trivandrum', lat: 8.9097, lng: 76.8631, rsvps: 34, image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500', organizer: 'AWS User Group', price: 0, description: 'AWS cloud technologies workshop' },
    { id: 2, title: 'Fuckup Night Failure Stories', category: 'Career', dateStart: '2026-01-15T19:00:00', location: 'Kazhakkoottam Hall', lat: 8.5560, lng: 76.8817, rsvps: 28, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', organizer: 'Startup Kerala', price: 300, description: 'Entrepreneurs share epic failures' },
    { id: 3, title: 'Backtesting Equity Investment Strategies', category: 'Career', dateStart: '2026-01-12T10:00:00', location: 'Online Webinar', rsvps: 15, image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500', organizer: 'FinTech Kerala', price: 500, description: 'Python trading strategies workshop' },
    { id: 4, title: 'Optimizing AI Agents with AWS', category: 'Tech', dateStart: '2026-01-25T16:00:00', location: 'AWS Loft Trivandrum', rsvps: 22, image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500', organizer: 'AI Kerala', price: 0, description: 'Build production AI agents' },
    { id: 6, title: 'Music & Food Festival Kazhakkoottam', category: 'Music', dateStart: '2026-01-18T17:00:00', location: 'Kazhakkoottam Open Ground', lat: 8.5241, lng: 76.9366, rsvps: 156, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500', organizer: 'Tvm Cultural Fest', price: 150, description: 'Live bands + street food' }
  ];

  // ✅ Load bookmarks ONCE
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tvmevents-bookmarks') || '[]');
    setBookmarks(saved);
    setFilteredEvents(events); // Initial load
  }, []);

  // ✅ LIVE FILTERING
  useEffect(() => {
    let result = events;
    if (searchQuery.trim()) {
      result = result.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filters.category) result = result.filter(event => event.category === filters.category);
    if (filters.location.trim()) result = result.filter(event => 
      event.location.toLowerCase().includes(filters.location.toLowerCase())
    );
    if (filters.dateFrom) result = result.filter(event => 
      new Date(event.dateStart) >= new Date(filters.dateFrom)
    );
    if (filters.priceMax && filters.priceMax !== '') {
      const maxPrice = parseInt(filters.priceMax);
      result = result.filter(event => (parseInt(event.price || 0) <= maxPrice));
    }
    setFilteredEvents(result);
  }, [searchQuery, filters, events]);

  // ✅ AUTH-PROTECTED BOOKMARK TOGGLE
  const toggleBookmark = (eventId) => {
    if (!user) {
      alert('Please sign in to bookmark events!');
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }
    
    const newBookmarks = bookmarks.includes(eventId)
      ? bookmarks.filter(id => id !== eventId)
      : [...bookmarks, eventId];
    
    setBookmarks(newBookmarks);
    localStorage.setItem('tvmevents-bookmarks', JSON.stringify(newBookmarks));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-pink-600 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
          Upcoming Events
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Discover tech meetups, workshops, music festivals & career events in Trivandrum
        </p>
      </section>

      {/* Filters */}
      <section className="mb-16">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/50 p-6 md:p-8 max-w-7xl mx-auto">
          <EventFilters 
            filters={filters} 
            setFilters={setFilters}
            filteredEvents={filteredEvents}
            onSearchChange={setSearchQuery}
          />
        </div>
      </section>

      {/* Events Grid */}
      <section className="mb-20">
        <div className="grid gap-8 sm:gap-8 md:gap-10 lg:gap-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map(event => (
            <Link key={event.id} to={`/events/${event.id}`} className="group h-full block">
              <article className="group relative h-full overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-white/50 hover:shadow-3xl hover:border-pink-200/50 hover:-translate-y-3 transition-all duration-700">
                
                {/* Image + Category Badge */}
                <div className="relative h-72 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img src={event.image} alt={event.title} className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-white/95 to-slate-100/95 backdrop-blur-xl px-4 py-2 rounded-2xl text-xs font-bold text-slate-800 shadow-lg border border-slate-200/50">
                    {event.category}
                  </span>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500/90 to-rose-500/90 backdrop-blur text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg">
                    LIVE
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="mb-4 text-2xl font-black text-slate-900 leading-tight line-clamp-2 group-hover:text-pink-600">{event.title}</h3>
                  
                  <div className="space-y-2 mb-6 text-slate-600">
                    <div className="flex items-center gap-2 text-lg">
                      <span>📅</span>
                      {new Date(event.dateStart).toLocaleDateString('en-IN', { 
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
                        hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' 
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-lg">
                      <span>📍</span>{event.location}
                    </div>
                  </div>

                  {/* COUNTDOWN */}
                  {(() => {
                    const now = new Date();
                    const eventTime = new Date(event.dateStart);
                    const diff = eventTime - now;
                    if (diff > 0) {
                      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                      return (
                        <div className="flex items-center gap-2 text-lg mt-2 mb-6">
                          <span>⏰</span>
                          <span className="bg-gradient-to-r from-orange-100 to-pink-100 px-3 py-1 rounded-xl text-orange-700 font-bold text-sm shadow-md">
                            {days}d {hours}h {minutes}m
                          </span>
                        </div>
                      );
                    }
                    return <div className="flex items-center gap-2 text-lg mt-2 mb-6"><span>⏰</span><span className="text-emerald-600 font-bold">Live Now!</span></div>;
                  })()}

                  <div className="flex items-center justify-between pt-2 pb-4">
                    <div className="text-2xl font-black">
                      {event.price > 0 ? <span className="text-emerald-600">₹{event.price.toLocaleString()}</span> : <span className="text-emerald-600 text-3xl font-black tracking-wide">FREE</span>}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* ✅ AUTH-PROTECTED BOOKMARK BUTTON */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault(); 
                          e.stopPropagation();
                          toggleBookmark(event.id);
                        }}
                        className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl w-12 h-12 flex items-center justify-center text-lg font-bold transition-all hover:scale-110"
                        title={!user ? 'Sign in to bookmark' : (bookmarks.includes(event.id) ? 'Remove bookmark' : 'Bookmark event')}
                      >
                        {bookmarks.includes(event.id) ? '★' : '☆'}
                      </button>

                      <button 
                        onClick={async (e) => {
                          e.preventDefault(); e.stopPropagation();
                          const url = `${window.location.origin}/events/${event.id}`;
                          await navigator.clipboard.writeText(url);
                          alert('Link copied! 📋');
                        }}
                        className="p-2 bg-gradient-to-r from-blue-500 to-yellow-500 hover:from-blue-600 hover:to-yellow-600 text-white rounded-xl shadow-lg w-12 h-12 flex items-center justify-center text-lg transition-all hover:scale-110"
                      >
                        🔗
                      </button>

                      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100/80 to-purple-100/80 text-purple-700 font-bold rounded-2xl shadow-md">
                        <span>👥</span><span>{event.rsvps.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <Link to={`/events/${event.id}`}>
                      <span className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm uppercase tracking-wide cursor-pointer">
                        View Details →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventList;
