// src/features/events/pages/EventList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventFilters from "../components/EventFilters";
import EventCalendar from '../components/EventCalendar';
const events = [
  {
    id: 1,
    title: 'AWS Tech 2026',
    category: 'Tech',
    dateStart: '2026-01-20T18:30:00',
    location: 'Technopark, Trivandrum',
    lat: 8.9097, lng: 76.8631,
    rsvps: 34,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500',
    organizer: 'AWS User Group',
    price: 0,
    description: 'AWS cloud technologies workshop'
  },
  {
    id: 2,
    title: 'Fuckup Night Failure Stories',
    category: 'Career',
    dateStart: '2026-01-15T19:00:00',
    location: 'Kazhakkoottam Hall',
    lat: 8.5560, lng: 76.8817,
    rsvps: 28,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
    organizer: 'Startup Kerala',
    price: 300,
    description: 'Entrepreneurs share epic failures'
  },
  {
    id: 3,
    title: 'Backtesting Equity Investment Strategies',
    category: 'Career',
    dateStart: '2026-01-12T10:00:00',
    location: 'Online Webinar',
    rsvps: 15,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500',
    organizer: 'FinTech Kerala',
    price: 500,
    description: 'Python trading strategies workshop'
  },
  {
    id: 4,
    title: 'Optimizing AI Agents with AWS',
    category: 'Tech',
    dateStart: '2026-01-25T16:00:00',
    location: 'AWS Loft Trivandrum',
    rsvps: 22,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500',
    organizer: 'AI Kerala',
    price: 0,
    description: 'Build production AI agents'
  },
  {
    id: 6,
    title: 'Music & Food Festival Kazhakkoottam',
    category: 'Music',
    dateStart: '2026-01-18T17:00:00',
    location: 'Kazhakkoottam Open Ground',
    lat: 8.5241, lng: 76.9366, 
    rsvps: 156,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500',
    organizer: 'Tvm Cultural Fest',
    price: 150,
    description: 'Live bands + street food'
  }
];

const EventList = () => {
  const [filters, setFilters] = useState({
    category: '',
    dateFrom: '',
    location: '',
    priceMax: ''
  });
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [searchQuery, setSearchQuery] = useState('');
const handleSearchChange = (query) => setSearchQuery(query);

useEffect(() => {
  console.log('Filtering with:', { searchQuery, filters, filteredEvents: filteredEvents.length }); // Debug
  
  let result = events;
  
  // 1. Search filter
  if (searchQuery.trim()) {
    result = result.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // 2. Category filter
  if (filters.category) {
    result = result.filter(event => event.category === filters.category);
  }
  
  // 3. Location filter
  if (filters.location.trim()) {
    result = result.filter(event => 
      event.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  
  // 4. Date filter (if you have dateStart field)
  if (filters.dateFrom) {
    result = result.filter(event => new Date(event.dateStart) >= new Date(filters.dateFrom));
  }
  
  // 5. PRICE FILTER - CRITICAL FIX
  if (filters.priceMax && filters.priceMax !== '') {
  const maxPrice = parseInt(filters.priceMax);
  result = result.filter(event => {
    const eventPrice = parseInt(event.price || 0);
    const passesFilter = eventPrice > 0 && eventPrice <= maxPrice;  // Hide free events
    console.log(`${String(event.title).slice(0,25).padEnd(25)} | ₹${eventPrice.toString().padStart(3,'0')} | Max:₹${maxPrice} | Pass:${passesFilter}`);
    return passesFilter;
  });
}
  setFilteredEvents(result);
}, [searchQuery, filters.category, filters.location, filters.dateFrom, filters.priceMax]);

return (
  <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
    {/* Hero */}
    <section className="mb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-black bg-linear-to-r from-slate-900 via-slate-800 to-pink-600 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
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
          onSearchChange={handleSearchChange}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </section>

    {/* SINGLE CARDS SECTION - NO DUPLICATES */}
    <section className="mb-20">
      <div className="grid gap-8 sm:gap-8 md:gap-10 lg:gap-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full row-start-1 row-span-2 flex flex-col items-center justify-center text-center py-24 px-8 bg-linear-to-br from-slate-50/90 via-white/80 to-slate-50/50 rounded-3xl shadow-2xl border-2 border-dashed border-slate-300/60 backdrop-blur-xl">
            <div className="text-7xl mb-8 opacity-80 animate-bounce">🔍</div>
            <h2 className="text-4xl md:text-5xl font-black bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6 drop-shadow-lg">
              No Events Found
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
              Your filters returned no results. Try adjusting search, category, location, dates, or price range.
            </p>
            <button
              onClick={() => {
                setFilters({ category: '', dateFrom: '', location: '', priceMax: '' });
                setSearchQuery('');
                handleSearchChange('');
              }}
              className="px-12 py-6 bg-linear-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 text-white font-black text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-8 focus:ring-pink-500/40 transform-gpu"
            >
              ✨ Reset All Filters
            </button>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-slate-500">
              <div>🔤 Clear search</div>
              <div>📂 All categories</div>
              <div>📍 All locations</div>
              <div>📅 All dates</div>
              <div>💰 All prices</div>
            </div>
            <p className="mt-8 text-lg font-bold text-slate-700 bg-slate-100 px-6 py-3 rounded-2xl">
              {events.length} total events available
            </p>
          </div>
        ) : (
          filteredEvents.map(event => (
            <Link 
              key={event.id} 
              to={`/events/${event.id}`}
              className="group h-full block"
            >
              <article className="group relative h-full overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-3xl border border-white/50 hover:border-pink-200/50 hover:-translate-y-3 transition-all duration-700 hover:rotate-1 active:translate-y-0">
                {/* Image */}
                <div className="relative h-72 overflow-hidden bg-linear-to-br from-slate-100 to-slate-200">
                  <img 
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000 group-hover:rotate-3"
                    loading="lazy"
                    onError={e => e.target.src = `https://picsum.photos/520/400?random=${event.id}`}
                  />
                  <span className="absolute top-4 left-4 bg-linear-to-r from-white/95 to-slate-100/95 backdrop-blur-xl px-4 py-2 rounded-2xl text-xs font-bold text-slate-800 shadow-lg border border-slate-200/50">
                    {event.category}
                  </span>
                  <div className="absolute top-4 right-4 bg-linear-to-r from-pink-500/90 to-rose-500/90 backdrop-blur text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg">
                    LIVE
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <h3 className="mb-4 text-2xl font-black text-slate-900 leading-tight line-clamp-2 group-hover:text-pink-600 group-hover:underline transition-all">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-6 text-slate-600">
                    <div className="flex items-center gap-2 text-lg">
                      <span className="text-slate-500">📅</span>
                      {new Date(event.dateStart).toLocaleDateString('en-IN', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
                        hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata'
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-lg">
                      <span className="text-slate-500">📍</span>
                      {event.location}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 pb-4">
                    <div className="text-2xl font-black">
                      {event.price > 0 
                        ? <span className="text-emerald-600">₹{event.price.toLocaleString()}</span>
                        : <span className="text-emerald-600 text-3xl font-black tracking-wide">FREE</span>
                      }
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-pink-100/80 to-rose-100/80 backdrop-blur text-pink-700 font-bold rounded-2xl shadow-md">
                      <span className="text-2xl">👥</span>
                      <span>{event.rsvps.toLocaleString()}</span>
                      <span className="text-xs uppercase tracking-wide">going</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200">
                    <span className="inline-block px-6 py-3 bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm uppercase tracking-wide">
                      View Details →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>
    </section>
    {/* <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Calendar View</h2>
        <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 shadow-lg">
          <EventCalendar events={events} />
        </div>
      </section> */}
  </div>
)};
export default EventList
