import React from 'react';
import { Link } from 'react-router-dom';

const events = [
    {
      id: 1,
      title: 'AWS Tech 2026',
      category: 'Tech',
      dateStart: '2026-01-20T18:00:00',
      location: 'Technopark, Trivandrum',
      rsvps: 34,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500'
    },
    {
      id: 2,
      title: 'Fuckup Night Stories',
      category: 'Career',
      dateStart: '2026-01-15T19:00:00',
      location: 'Kazhakkoottam',
      rsvps: 28,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500'
    },
    {
      id: 3,
      title: 'Backtesting Equity Investment',
      category: 'Career',
      dateStart: '2026-01-12T10:00:00',
      location: 'Online',
      rsvps: 15,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500'
    },
    // Add 10+ Trivandrum events
  ];
  
const EventList = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-orange-50 py-12 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-5xl font-bold bg-linear-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-6">
          Upcoming Events in Trivandrum
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Discover tech meetups, workshops, music festivals & career events. 
          All happening in Tvm & nearby areas.
        </p>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {events.map((event) => (
          <Link 
            key={event.id} 
            to={`/events/${event.id}`}
            className="group block"
          >
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 shadow-md">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-orange-600 transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    📅 {new Date(event.dateStart).toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className="flex items-center">
                    📍 {event.location}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-lg font-semibold text-gray-900">
                    {event.price ? `₹${event.price}` : 'FREE'}
                  </div>
                  <div className="flex items-center text-sm text-orange-600 font-medium">
                    👥 {event.rsvps} going
                  </div>
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
