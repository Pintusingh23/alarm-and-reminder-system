import React from 'react';
import { Search, Trash2, SlidersHorizontal } from 'lucide-react';

const ControlPanel = ({ searchQuery, setSearchQuery, sortBy, setSortBy, onClearAll }) => {
  return (
    <div className="glass rounded-2xl p-6 glow-teal animate-slide-up">
      <h2 className="text-lg font-bold mb-5 flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/15">
          <SlidersHorizontal className="text-teal-400" size={18} />
        </div>
        <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Controls</span>
      </h2>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-[10px] font-bold mb-2 text-slate-500 uppercase tracking-[0.15em]">
            Search
          </label>
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-600"
              size={14}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-white placeholder-slate-600 text-sm"
              placeholder="Search reminders..."
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-[10px] font-bold mb-2 text-slate-500 uppercase tracking-[0.15em]">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl text-white text-sm"
          >
            <option value="soonest">Soonest First</option>
            <option value="latest">Latest First</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Clear All */}
        <button
          onClick={onClearAll}
          className="w-full glass glass-hover text-red-400/80 hover:text-red-300 font-semibold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border-red-500/15 hover:border-red-500/30 text-sm card-hover-lift"
        >
          <Trash2 size={14} />
          Clear All
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;