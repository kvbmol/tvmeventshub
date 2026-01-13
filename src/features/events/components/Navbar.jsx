import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [bookmarksCount, setBookmarksCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      try {
        const saved = JSON.parse(
          localStorage.getItem("tvmevents-bookmarks") || "[]"
        );
        setBookmarksCount(saved.length);
      } catch {
        setBookmarksCount(0);
      }
    };

    updateCount();

    window.addEventListener("storage", updateCount);

    return () => window.removeEventListener("storage", updateCount);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim())
      navigate(`/events?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl font-bold bg-linear-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent"
          >
            TvmEventsHub
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/events"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-2xl font-semibold text-sm ml-2"
            >
              Events
            </Link>
            <Link
              to="/calendar"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-2xl font-semibold text-sm ml-2"
            >
              📅 Calendar
            </Link>
            {user ? (
              <>
                <Link
                  to="/bookmarks"
                  className="relative p-2 text-gray-700 hover:text-gray-900"
                >
                  ⭐ Bookmarks
                  {bookmarksCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {bookmarksCount}
                    </span>
                  )}
                </Link>
                <span className="text-sm text-gray-500 hidden lg:block">
                  Hi, {user.email?.split("@")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 font-medium px-4 py-2 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-xl font-semibold text-sm ml-2"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
