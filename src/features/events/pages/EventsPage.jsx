// src/features/events/pages/EventsPage.jsx

import { Outlet } from 'react-router-dom';
import { useState } from 'react';  // useState from 'react'
const events = [
  { id: 1, title: "React Trivandrum Meetup", /* ... */ },
  { id: 2, title: "JavaScript Fullstack Workshop", /* ... */ }
];

export default function EventsPage() {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const registerForEvent = (eventId) => {
    if (registeredEvents.includes(eventId)) {
      alert('Already registered for this event!');
      return;
    }
    setRegisteredEvents([...registeredEvents, eventId]);
    alert(`✅ Registered for "${events.find(e => e.id === eventId)?.title || 'Event'}!"`);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Events in Trivandrum</h1>
            <span className="text-sm text-gray-500">
              {registeredEvents.length} Events registered
            </span>
          </div>
        </div>
      </header>

      {/* ✅ SENDS data TO EventList */}
      <Outlet context={{ registerForEvent, registeredEvents }} />
    </>
  );
}
