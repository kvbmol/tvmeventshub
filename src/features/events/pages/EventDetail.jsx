import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState('interested');

  // All events data (same as EventList)
  const allEvents = [
    {
      id: 1,
      title: 'AWS Tech 2026',
      category: 'Tech',
      dateStart: '2026-01-20T18:30:00',
      location: 'Technopark Phase 3, Trivandrum',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200',
      description: `Discover AWS cloud innovations! ☁️

**Agenda:**
• Serverless with Lambda
• AI/ML on SageMaker  
• Kubernetes on EKS
• Cost optimization strategies

**Perfect for:** Developers, DevOps, Architects`,
      organizer: 'AWS User Group Trivandrum',
      rsvps: 34,
      price: 0
    },
    {
      id: 2,
      title: 'Fuckup Night: Failure Stories',
      category: 'Career',
      dateStart: '2026-01-15T19:00:00',
      location: 'Kazhakkoottam Community Hall',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200',
      description: `Celebrate epic failures! 💥

5 entrepreneurs share:
• $100K product launch disasters
• Cofounder betrayals  
• Worst investor pitches
• Bankruptcy survival stories

**Drinks + networking included**`,
      organizer: 'Startup Kerala',
      rsvps: 28,
      price: 300
    },
    {
      id: 3,
      title: 'Backtesting Equity Investment Strategies in Python',
      category: 'Career',
      dateStart: '2026-01-12T10:00:00',
      location: 'Online via Zoom',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200',
      description: `Build algorithmic trading systems! 📈

**Hands-on workshop:**
• Pandas + Backtrader setup
• Zerodha Kite API integration
• Strategy optimization  
• Risk management models

**Requirements:** Python basics`,
      organizer: 'FinTech Kerala',
      rsvps: 15,
      price: 500
    },
    {
      id: 4,
      title: 'Optimizing AI Agents with AWS',
      category: 'Tech',
      dateStart: '2026-01-25T16:00:00',
      location: 'AWS Loft Trivandrum',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
      description: `Production-ready AI agents! 🤖

**Learn to build:**
• LangChain + AWS Bedrock
• RAG pipelines  
• Multi-agent orchestration
• Monitoring & scaling

**Live demos + code templates**`,
      organizer: 'AI Kerala',
      rsvps: 22,
      price: 0
    },
    {
      id: 5,
      title: '.NET Conf 2025 Kerala Edition',
      category: 'Tech',
      dateStart: '2026-02-01T09:00:00',
      location: 'Kochi Convention Centre (Day trip from Trivandrum)',
      image: 'https://images.unsplash.com/photo-1517433456452-d31dfbd2ab5a?w=1200',
      description: `Kerala\'s premier .NET conference!

**Keynotes + Workshops:**
• .NET 10 preview
• Blazor performance  
• MAUI cross-platform
• Azure integration patterns

**500+ attendees expected**`,
      organizer: '.NET Kerala',
      rsvps: 67,
      price: 999
    },
    {
      id: 6,
      title: 'Music & Food Festival Kazhakkoottam',
      category: 'Music',
      dateStart: '2026-01-18T17:00:00',
      location: 'Kazhakkoottam Open Ground',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200',
      description: `Live music + Kerala street food! 🎸🍛

**3 Stages:**
• Local indie bands
• Classical fusion  
• Electronic DJ sets
• 50+ food stalls

**Family friendly**`,
      organizer: 'Tvm Cultural Fest',
      rsvps: 156,
      price: 150
    }
  ];

  useEffect(() => {
    const foundEvent = allEvents.find(e => e.id === parseInt(id));
    setEvent(foundEvent);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading event details...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Event not found</h1>
          <Link to="/" className="text-orange-600 hover:text-orange-700 font-medium">
            ← Back to Events
          </Link>
        </div>
      </div>
    );
  }

  // Paste your existing JSX below, replacing {event.xxx} references work automatically
  // ... rest of your return JSX stays identical
  return (
    // Your existing JSX - now uses dynamic {event.title}, {event.description}, etc.
    <div className="min-h-screen bg-gray-50">
      {/* All your existing JSX unchanged - just works with dynamic data */}
      {/* Back Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            ← Back to Events
          </Link>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-24 relative z-10">
        {/* Title & Meta */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 -mt-12 border border-gray-100">
          <div className="flex items-start justify-between mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-2xl text-sm font-medium bg-orange-100 text-orange-800">
              🏷️ {event.category}
            </div>
            <div className="text-sm text-gray-500">
              👥 {event.rsvps} going
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {event.title}
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mb-8 text-sm">
            <div className="space-y-3">
              <div className="flex items-center text-gray-900">
                📅 <span className="ml-3 font-semibold">{new Date(event.dateStart).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center text-gray-900">
                📍 <span className="ml-3">{event.location}</span>
              </div>
              {event.price && (
                <div className="flex items-center text-gray-900">
                  💰 <span className="ml-3 font-semibold">₹{event.price}</span>
                </div>
              )}
            </div>

            <div className="space-y-4 pt-4 md:pt-0 md:border-l md:pl-8">
              <button 
                onClick={() => setRsvpStatus('going')}
                className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all ${
                  rsvpStatus === 'going'
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-white border-2 border-green-500 text-green-600 hover:shadow-lg'
                }`}
              >
                I'll be there
              </button>
              <button 
                onClick={() => setRsvpStatus('interested')}
                className={`w-full py-4 px-6 rounded-2xl font-medium border transition-all ${
                  rsvpStatus === 'interested'
                    ? 'ring-2 ring-blue-500 text-blue-600'
                    : 'border-gray-200 text-gray-700 hover:border-gray-400'
                }`}
              >
                Interested
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About this event</h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </div>
            </div>
          </div>

          {/* Organizer Sidebar */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 sticky top-32">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hosted by</h3>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-linear-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">TD</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{event.organizer}</h4>
                  <p className="text-sm text-gray-600">25 events hosted</p>
                </div>
              </div>
              <button className="w-full bg-linear-to-r from-orange-500 to-pink-500 text-white py-3 px-6 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
