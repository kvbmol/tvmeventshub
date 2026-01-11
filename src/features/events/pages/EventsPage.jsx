import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';


const EVENTS = [
  {
    id: 1,
    title: "React Trivandrum Meetup",
    date: "Sat, Jan 17 • 6:00 PM",
    attendees: 25,
    location: "Kerala Startup Mission",
    description: "Learn React hooks, state management, and network with local developers.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    title: "JavaScript Fullstack Workshop",
    date: "Sun, Jan 25 • 10:00 AM", 
    attendees: 18,
    location: "Technopark Phase 3",
    description: "MERN stack from scratch - perfect for career transition developers.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"
  }
];

export default function EventsPage() {
  const { user } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const registerForEvent = (eventId) => {
    if (!user) {
      alert('Please sign in to register');
      return;
    }
    
    // Check if already registered
    if (registeredEvents.includes(eventId)) {
      alert('Already registered for this event!');
      return;
    }

    // Register user
    setRegisteredEvents([...registeredEvents, eventId]);
    alert(`✅ Registered for "${EVENTS.find(e => e.id === eventId).title}"!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* MEETUP-STYLE HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Events in Trivandrum</h1>
            <div className="flex items-center space-x-4">
              {user ? (
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {registeredEvents.length} Events registered
                </span>
              ) : (
                <span className="text-sm text-gray-500">Sign in to register</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* EVENTS GRID */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {EVENTS.map(event => (
            <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
              <div className="p-8">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>{event.attendees} going</span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full mx-2"></span>
                  <span>{event.location}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">{event.date}</span>
                  <button 
                    onClick={() => registerForEvent(event.id)}
                    disabled={registeredEvents.includes(event.id)}
                    className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
                      registeredEvents.includes(event.id)
                        ? 'bg-green-100 text-green-800 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl hover:-translate-y-1'
                    }`}
                  >
                    {registeredEvents.includes(event.id) ? '✅ Registered' : 'Register'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
