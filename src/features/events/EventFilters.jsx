import React, { useState, useId } from 'react';
import { ChevronDownIcon } from 'lucide-react';

const EventFilters = ({ filters, setFilters, categories = ['Tech', 'Music', 'Food', 'Sports'], prices = [0, 500, 1000, 2000] }) => {
  const dateId = useId();

  return (
    <form className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg mb-8 border border-white/50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select 
            value={filters.category} 
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">All</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input 
            type="date" 
            value={filters.dateFrom} 
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input 
            type="text" 
            placeholder="e.g., Kazhakkoottam" 
            value={filters.location} 
            onChange={(e) => setFilters({ ...filters, location: e.target.value.toLowerCase() })}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹)</label>
          <select 
            value={filters.priceMax} 
            onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500"
          >
            <option value={5000}>Any</option>
            {prices.map(p => <option key={p} value={p}>₹{p}</option>)}
          </select>
        </div>
      </div>
      <button 
        type="button"
        onClick={() => setFilters({})} 
        className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
      >
        Clear Filters
      </button>
    </form>
  );
};

export default EventFilters;
