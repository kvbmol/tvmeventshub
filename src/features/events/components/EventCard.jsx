import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const formatDateRange = (start) => {
    const date = new Date(start);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatLocation = (location) => location.split(',')[0];

  return (
    <Link to={`/events/${event.id}`} className="block">
      <article className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="h-48 bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img 
            src={event.image || 'https://images.unsplash.com/photo-1524178232363-5495a95d3f5b?w=500'} 
            alt={event.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-6">
          {/* Category Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 mb-4">
            🏷️ {event.category}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight hover:text-orange-600 transition-colors line-clamp-2">
            {event.title}
          </h3>

          {/* Details */}
          <div className="space-y-3 mb-6 text-sm text-gray-600">
            <div className="flex items-center">
              📅 <span className="ml-2 font-medium">{formatDateRange(event.dateStart)}</span>
            </div>
            <div className="flex items-center">
              📍 <span className="ml-2">{formatLocation(event.location)}</span>
            </div>
            {event.price && (
              <div className="flex items-center">
                💰 <span className="ml-2 font-semibold">₹{event.price}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500">👥 {event.rsvps || 0} going</span>
            <button className="px-6 py-2 bg-linear-to-r from-orange-500 to-pink-500 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all shadow-md">
              View Details →
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default EventCard;
