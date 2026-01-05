import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, StarOff } from 'lucide-react';  // ← FIXED: Add icons
import EventCard from '../components/EventCard';  // ← FIXED: Path

// ← FIXED: Your events data (copy from EventList.jsx)
const allEvents = [  // Replace with Context/Firestore later
  {
    id: 1,
    title: 'AWS Tech 2026',
    category: 'Tech',
    dateStart: '2026-01-20T18:30:00',
    location: 'Technopark, Trivandrum',
    price: 0,
    rsvps: 34,
    image: 'https://images.unsplash.com/photo-1524178232363-5495a95d3f5b?w=500'
  },
  {
    id: 2,
    title: 'AI Agents Workshop',
    category: 'Tech',
    dateStart: '2026-01-25T14:00:00',
    location: 'Kazhakkoottam, Trivandrum',
    price: 999,
    rsvps: 12,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500'
  },
  // Add more from your EventList...
];

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tvmevents-bookmarks') || '[]');
    setBookmarks(saved);
    const events = allEvents.filter(e => saved.includes(e.id));  // ← FIXED: Now filters real data
    setBookmarkedEvents(events);
  }, []);

  if (bookmarks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center py-20">
        <StarOff className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Bookmarks Yet</h2>
        <p className="text-gray-500 mb-6">Save events you like from the Events page.</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-xl transition-all font-medium text-lg"
        >
          Browse Events
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 py-12">
      <div className="flex items-center mb-12">
        <Star className="w-10 h-10 text-yellow-400 mr-4 drop-shadow-lg" />
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-1">
            My Bookmarks
          </h1>
          <p className="text-xl text-gray-600 font-medium">({bookmarks.length} saved)</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {bookmarkedEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default BookmarksPage;
