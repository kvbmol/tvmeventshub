import React from 'react';
import EventCalendar from '../components/EventCalendar';

const CalendarPage = () => {
  // Import your events data here, or fetch from Firebase/JSON server
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
    rsvps: 156,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500',
    organizer: 'Tvm Cultural Fest',
    price: 150,
    description: 'Live bands + street food'
  }
];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-pink-600 bg-clip-text text-transparent mb-4">
          Event Schedule
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          View all upcoming events in a calendar. Click events to see details.
        </p>
      </div>
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 shadow-xl">
        <EventCalendar events={events} />
      </div>
    </div>
  );
};

export default CalendarPage;
