import React, { useId, useState } from "react";

const EventFilters = ({ 
  filters = { category: '', dateFrom: '', location: '', priceMax: '' }, 
  setFilters,
  filteredEvents = [], 
  onSearchChange,
}) => {  // ← FIXED: Removed setSearchQuery from props
  const [searchQuery, setSearchQuery] = useState('');  // ← Only declaration here
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dateId = useId();



  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const categories = ['Tech', 'Career', 'Music', 'Food', 'Sports'];
  const prices = ['0', '500', '1000', '2000', '5000'];

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-6 lg:gap-4 items-start">
        {/* Search Bar */}
        {/* Search Bar - Enhanced */}
<div className="lg:col-span-3 relative group">
  <input
    type="text"
    placeholder="Search events (AWS, Tech, Meetups...)"
    value={searchQuery}
    onChange={(e) => {
      const query = e.target.value;
      setSearchQuery(query);
      onSearchChange(query);
      setShowSuggestions(query.length > 2 && filteredEvents.length > 0);
    }}
    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
    onFocus={() => setShowSuggestions(searchQuery.length > 2 && filteredEvents.length > 0)}
    className="w-full px-3.5 py-2.5 text-sm font-normal border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/75 focus:border-blue-500 transition-all duration-200 ease-out shadow-sm hover:shadow-md hover:border-slate-300 group-hover:shadow-md placeholder:text-slate-400"
  />
  {/* Smooth slide-down suggestions */}
  {showSuggestions && filteredEvents.length > 0 && (
    <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-xl mt-2 max-h-64 overflow-hidden z-20 animate-slideDown">
      {filteredEvents.slice(0, 5).map(event => (
        <div 
          key={event.id} 
          className="p-3 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 cursor-pointer border-b border-slate-100 last:border-b-0 transition-all duration-150 hover:scale-[1.02] hover:shadow-sm"
          onMouseDown={() => {
            setSearchQuery(event.title);
            onSearchChange(event.title);
            setFilters({ category: '', dateFrom: '', location: '', priceMax: '' });
            setShowSuggestions(false);
          }}
        >
          <div className="font-semibold text-slate-900 text-sm leading-tight">{event.title}</div>
          <div className="text-xs text-slate-500 mt-0.5 truncate">{event.location} • {event.date}</div>
        </div>
      ))}
    </div>
  )}
  {/* Compact clear button */}
  {searchQuery && (
    <button
      type="button"
      onClick={() => {
        setSearchQuery('');
        onSearchChange('');
      }}
      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100/80 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-150 scale-95 hover:scale-100 group-hover:scale-100"
    >
      ✕
    </button>
  )}
</div>


        {/* Location */}
        <div>
          <input
            type="text"
            placeholder="Location"
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Price Range */}
        <div>
          <select value={filters.priceMax} onChange={(e) => updateFilter('priceMax', e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Prices</option>  {/* NEW */}
            <option value="500">₹500</option>
            <option value="1000">₹1000</option>
            <option value="2000">₹2000</option>
            <option value="5000">₹5000</option>
          </select>

        </div>

        {/* Buttons */}
        <div className="flex gap-2">
         <button
  onClick={() => {
    setFilters({ category: '', dateFrom: '', location: '', priceMax: '' });
    if (setSearchQuery) setSearchQuery('');  // Clear search input
    onSearchChange('');
  }}
  className="px-4 py-2 bg-linear-to-r from-pink-500 to-rose-500 /* existing */"
>
  Clear All
</button>


        </div>
      </div>
    </>
  );
};

export default EventFilters;
