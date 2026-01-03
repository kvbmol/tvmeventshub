import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
// import EventFilters from '/features/events/EventFilters.jsx';
import EventFilters from '../components/EventFilters.jsx';
const events = [
  {
    id: 1,
    title: 'AWS Tech 2026',
    category: 'Tech',
    dateStart: '2026-01-20T18:30:00',
    location: 'Technopark, Trivandrum',
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
    rsvps: 156,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500',
    organizer: 'Tvm Cultural Fest',
    price: 150,
    description: 'Live bands + street food'
  }
];

const EventList = () => {
  const [filters, setFilters] = useState({
    category: '', dateFrom: '', location: '', priceMax: '5000'
  });
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    let result = events;
    if (filters.category) result = result.filter(e => e.category === filters.category);
    if (filters.location) result = result.filter(e => 
      e.location.toLowerCase().includes(filters.location.toLowerCase())
    );
    if (filters.priceMax && filters.priceMax !== '5000') {
      result = result.filter(e => (e.price || 0) <= parseInt(filters.priceMax));
    }
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      result = result.filter(e => new Date(e.dateStart) >= fromDate);
    }
    setFilteredEvents(result);
  }, [filters]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-orange-50/50 to-amber-50 py-12 px-4">
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-5xl font-bold bg-linear-to-r from-orange-500 via-pink-500 to-rose-500 bg-clip-text text-transparent mb-6">
          Upcoming Events in Trivandrum
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Discover tech meetups, workshops, music festivals & career events.
        </p>
      </div>

      <div className="max-w-7xl mx-auto mb-12">
        <EventFilters filters={filters} setFilters={setFilters} />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredEvents.map(event => (
          <Link key={event.id} to={`/events/${event.id}`} className="group block">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => e.target.src='https://picsum.photos/500/300?random=1'} // Fallback
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 shadow-md">
                  {event.category}
                </span>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-orange-600">
                  {event.title}
                </h3>
                <div className="space-y-2 mb-6 text-sm text-gray-600">
                  <div>📅 {new Date(event.dateStart).toLocaleDateString('en-IN', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}</div>
                  <div>📍 {event.location}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-gray-900">
                    {event.price ? `₹${event.price}` : 'FREE'}
                  </div>
                  <div className="text-sm text-orange-600 font-medium">👥 {event.rsvps} going</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventList;