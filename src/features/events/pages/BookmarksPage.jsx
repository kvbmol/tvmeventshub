import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookmarksPage = () => {
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);

  const [allEvents] = useState([
    {
      id: 1,
      title: "AWS Tech 2026",
      category: "Tech",
      dateStart: "2026-01-20T18:30:00",
      location: "Technopark, Trivandrum",
      rsvps: 34,
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
    },

    {
      id: 2,
      title: "Fuckup Night Failure Stories",
      category: "Career",
      dateStart: "2026-01-18T19:00:00",
      location: "Kazhakkoottam Hall",
      lat: 8.556,
      lng: 76.8817,
      rsvps: 28,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
      organizer: "Startup Kerala",
      price: 300,
      description: "Entrepreneurs share epic failures",
    },
    {
      id: 3,
      title: "Backtesting Equity Investment Strategies",
      category: "Career",
      dateStart: "2026-01-15T10:00:00",
      location: "Online Webinar",
      rsvps: 15,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500",
      organizer: "FinTech Kerala",
      price: 500,
      description: "Python trading strategies workshop",
    },
    {
      id: 4,
      title: "Optimizing AI Agents with AWS",
      category: "Tech",
      dateStart: "2026-01-25T16:00:00",
      location: "AWS Loft Trivandrum",
      rsvps: 22,
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500",
      organizer: "AI Kerala",
      price: 0,
      description: "Build production AI agents",
    },
    {
      id: 5,
      title: "Music & Food Festival Kazhakkoottam",
      category: "Music",
      dateStart: "2026-01-26T17:00:00",
      location: "Kazhakkoottam Open Ground",
      lat: 8.5241,
      lng: 76.9366,
      rsvps: 156,
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500",
      organizer: "Tvm Cultural Fest",
      price: 150,
      description: "Live bands + street food",
    },
  ]);
  useEffect(() => {
    const updateBookmarks = () => {
      const savedIds = JSON.parse(
        localStorage.getItem("tvmevents-bookmarks") || "[]"
      );
      const bookmarks = allEvents.filter((event) =>
        savedIds.includes(event.id)
      );
      setBookmarkedEvents(bookmarks);
    };

    updateBookmarks();
    const interval = setInterval(updateBookmarks, 1000);
    return () => clearInterval(interval);
  }, []);

  const removeBookmark = (eventId) => {
    const savedIds = JSON.parse(
      localStorage.getItem("tvmevents-bookmarks") || "[]"
    );
    const newBookmarks = savedIds.filter((id) => id !== eventId);
    localStorage.setItem("tvmevents-bookmarks", JSON.stringify(newBookmarks));
  };

  if (bookmarkedEvents.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-orange-50 py-24 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-6xl mb-8">⭐</div>
          <h1 className="text-4xl font-black text-slate-900 mb-6">
            No Bookmarks Yet
          </h1>
          <p className="text-xl text-slate-600 mb-12">
            Save events from the Events page to see them here.
          </p>
          <Link
            to="/events"
            className="inline-block px-8 py-4 bg-linear-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            Browse Events →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-orange-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-black bg-linear-to-r from-slate-900 to-pink-600 bg-clip-text text-transparent mb-12">
          My Bookmarks ({bookmarkedEvents.length})
        </h1>
        <div className="grid gap-8 md:gap-10 lg:gap-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {bookmarkedEvents.map((event) => (
            <div
              key={event.id}
              className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-3xl p-8 border border-white/50"
            >
              <button
                onClick={() => removeBookmark(event.id)}
                className="absolute top-4 right-4 p-3 bg-red-500/90 hover:bg-red-600 text-black rounded-2xl shadow-lg hover:shadow-xl transition-all text-lg font-bold z-10"
              >
                ✕
              </button>
              \
              <Link to={`/events/${event.id}`} className="block">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-2xl mb-6"
                />
                <h3 className="text-2xl font-black text-slate-900 mb-4">
                  {event.title}
                </h3>
                <p className="text-slate-600 mb-6">{event.location}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-emerald-600">
                    {event.price > 0 ? `₹${event.price}` : "FREE"}
                  </span>
                  <div className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-pink-100 to-rose-100 text-pink-700 font-bold rounded-xl">
                    <span>👥</span> {event.rsvps}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookmarksPage;
