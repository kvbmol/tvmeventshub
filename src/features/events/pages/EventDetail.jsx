import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const events = [
  {
    id: 1,
    title: "AWS Tech 2026",
    category: "Tech",
    dateStart: "2026-01-20T18:30:00",
    location: "Technopark, Trivandrum",
    lat: 8.558,
    lng: 76.881,
    rsvps: 34,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
    price: 0,
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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
    price: 300,
  },
  {
    id: 3,
    title: "Backtesting Equity Investment Strategies",
    category: "Career",
    dateStart: "2026-01-15T10:00:00",
    location: "Online Webinar",
    rsvps: 15,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500",
    price: 500,
  },
  {
    id: 4,
    title: "Optimizing AI Agents with AWS",
    category: "Tech",
    dateStart: "2026-01-25T16:00:00",
    location: "AWS Loft Trivandrum",
    lat: 8.558,
    lng: 76.881,
    rsvps: 22,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500",
    price: 0,
  },
  {
    id: 5,
    title: "Music & Food Festival Kazhakkoottam",
    category: "Music",
    dateStart: "2026-01-18T17:00:00",
    location: "Kazhakkoottam Open Ground",
    lat: 8.5241,
    lng: 76.9366,
    rsvps: 156,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500",
    price: 150,
  },
];

const EventDetail = () => {
  const { eventid } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);

  const event = events.find((e) => e.id == eventid);

  const handleRegister = () => {
    if (!user) {
      alert("Please sign in to register for this event!");
      navigate("/login", { state: { from: `/events/${eventid}` } });
      return;
    }

    setIsRegistered(true);
    alert("✅ Registered successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link
        to="/events"
        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-8"
      >
        ← Back to Events
      </Link>

      <h1 className="text-4xl font-black mb-6">{event?.title}</h1>
      <img
        src={event?.image}
        alt={event?.title}
        className="w-full h-96 object-cover rounded-3xl mb-8 shadow-2xl"
      />

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📅</span>
              <div>{new Date(event?.dateStart).toLocaleString()}</div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <div className="font-semibold">{event?.location}</div>
              </div>

              {event?.lat && event?.lng && (
                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps?q=${event.lat},${event.lng}`,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm ml-8"
                >
                  🗺️ Open in Google Maps
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">👥</span>
              <div>{event?.rsvps} attending</div>
            </div>
          </div>
          <div className="text-3xl font-black">
            {event?.price > 0 ? (
              `₹${event.price}`
            ) : (
              <span className="text-emerald-600 text-4xl font-black tracking-wide">
                FREE
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={isRegistered}
          className={`px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm ml-8 ${
            isRegistered
              ? "bg-green-500 text-white shadow-green-500/50"
              : "bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-purple-500/50"
          }`}
        >
          {isRegistered ? "✅ Registered!" : "Register for Event"}
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
