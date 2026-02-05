import React from 'react';
import { Search, Trash2 } from 'lucide-react';

const ControlPanel = ({ searchQuery, setSearchQuery, sortBy, setSortBy, onClearAll }) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Search className="text-purple-400" size={24} />
        Controls
      </h2>
      
      <div className="space-y-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Search
          </label>
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={18} 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-400"
              placeholder="Search reminders..."
            />
          </div>
        </div>

        {/* Sort Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
          >
            <option value="soonest">Soonest First</option>
            <option value="latest">Latest First</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Clear All Button */}
        <button
          onClick={onClearAll}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
        >
          <Trash2 size={18} />
          Clear All Reminders
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;