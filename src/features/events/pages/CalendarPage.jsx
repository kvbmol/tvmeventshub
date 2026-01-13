import React from "react";
import { Link } from "react-router-dom";
import EventCalendar from "../components/EventCalendar.jsx";

const CalendarPage = () => {
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
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
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
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
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
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500",
      price: 0,
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
      price: 150,
    },
  ];

  return (
    <div className="p-8">
      <Link
        to="/events"
        className="mb-4 inline-block text-blue-600 hover:underline"
      >
        ← Back
      </Link>

      <EventCalendar events={events} />
    </div>
  );
};

export default CalendarPage;
