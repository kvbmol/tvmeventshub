import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, StarOff } from 'lucide-react'; 

const EventCard = ({ event }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tvmevents-bookmarks') || '[]');
    setIsBookmarked(saved.includes(event.id));
  }, [event.id]);

  const toggleBookmark = (e) => {
  e.stopPropagation();  // CRITICAL: Block Link click
  console.log('⭐ CLICKED! ID:', event.id);  // DEBUG
  let saved = JSON.parse(localStorage.getItem('tvmevents-bookmarks') || '[]');
  if (isBookmarked) {
    saved = saved.filter(id => id !== event.id);
  } else {
    saved.push(event.id);
  }
  localStorage.setItem('tvmevents-bookmarks', JSON.stringify(saved));
  console.log('⭐ SAVED:', saved);  // DEBUG
  setIsBookmarked(!isBookmarked);
};


  const formatLocation = (location) => location.split(',')[0];

  return (
    <div className="group">  {/* Wrapper */}
      <Link to={`/events/${event.id}`} className="block">
        <article className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100">
          {/* Image */}
          <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
            <img 
              src={event.image || 'https://images.unsplash.com/photo-1524178232363-5495a95d3f5b?w=500'} 
              alt={event.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Category */}
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

            {/* Footer - FIXED BUTTONS */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500">👥 {event.rsvps || 0} going</span>
              <div className="flex items-center gap-3">
                <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all shadow-md whitespace-nowrap">
                  View Details →
                </button>
                {/* ⭐ STAR BUTTON - PROPERLY CLOSED */}
                <button
                  onClick={toggleBookmark}
                  className="p-2.5 bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl hover:from-pink-100 hover:to-orange-100 active:scale-95 transition-all border border-pink-200/50 hover:border-pink-300 shadow-sm hover:shadow-md flex items-center justify-center group"
                  title={isBookmarked ? "Remove bookmark" : "Save for later"}
                >
                  {isBookmarked ? (
                    <StarOff className="w-5 h-5 text-pink-500 drop-shadow-sm group-hover:scale-110" />
                  ) : (
                    <Star className="w-5 h-5 text-pink-300 group-hover:text-pink-500 group-hover:scale-110 transition-all" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default EventCard;
