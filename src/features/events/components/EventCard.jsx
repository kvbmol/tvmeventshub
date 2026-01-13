import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { Share } from "lucide-react";

const EventCard = ({ event }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("tvmevents-bookmarks") || "[]"
    );
    setIsBookmarked(saved.includes(event.id));
  }, [event.id]);

  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("⭐ Toggling:", event.id);
    const saved = JSON.parse(
      localStorage.getItem("tvmevents-bookmarks") || "[]"
    );
    const newSaved = isBookmarked
      ? saved.filter((id) => id !== event.id)
      : [...saved, event.id];
    localStorage.setItem("tvmevents-bookmarks", JSON.stringify(newSaved));
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const shareData = {
      title: event.title,
      text: `${event.title} - ${event.location} (${new Date(
        event.dateStart
      ).toLocaleDateString("en-IN")})`,
      url: `${window.location.origin}/events/${event.id}`,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        console.log("🔗 Link copied!");
      }
    } catch (err) {
      await navigator.clipboard.writeText(shareData.url);
      console.log("🔗 Fallback copy");
    }
  };

  return (
    <Link to={`/events/${event.id}`} className="group">
      <article className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden max-w-sm mx-auto">
        {/* Image */}
        <img
          src={event.image || "/api/placeholder/400/250"}
          alt={event.title}
          className="w-full h-48 object-cover"
        />

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <span className="px-3 py-1 bg-linear-to-r from-orange-100 to-pink-100 text-orange-700 text-xs font-medium rounded-full">
              {event.category}
            </span>
          </div>

          <h3 className="font-bold text-xl mb-2 leading-tight">
            {event.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <time>{new Date(event.dateStart).toLocaleDateString("en-IN")}</time>
            <span>•</span>
            <span>{event.location}</span>
          </div>
        </div>

        {/* Footer with STAR + SHARE + RSVP */}
        <div className="flex items-center justify-between py-4 border-t border-gray-100 mt-4 px-4">
          <span className="text-sm text-gray-500">
            👥 {event.rsvps || 0} going
          </span>
          <div className="flex items-center gap-3">
            {/* ⭐ STAR BUTTON */}
            <button
              onClick={toggleBookmark}
              className="p-2 rounded-full bg-white hover:bg-pink-50 shadow-sm hover:shadow-md transition-all hover:scale-105 flex items-center justify-center"
              style={{ width: "40px", height: "40px" }}
              title="Save event"
            >
              {isBookmarked ? (
                <StarIcon
                  className="w-5 h-5 text-pink-500"
                  aria-hidden="true"
                />
              ) : (
                <StarOutlineIcon
                  className="w-5 h-5 text-gray-400 hover:text-pink-500 transition-colors"
                  aria-hidden="true"
                />
              )}
            </button>

            {/* 🔗 SHARE BUTTON */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white hover:bg-blue-50 shadow-sm hover:shadow-md transition-all hover:scale-105 flex items-center justify-center"
              style={{ width: "20px", height: "20px" }}
              title="Share event"
            >
              <Share className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors" />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default EventCard;
