import React from 'react';
import { Plus, Play } from 'lucide-react';
import { RINGTONES, previewRingtone } from './ringtones';

const ReminderForm = ({ formData, setFormData, onSubmit }) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Plus className="text-blue-400" size={24} />
        Create Alarm / Reminder
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400"
            placeholder="Enter reminder title"
            required
          />
        </div>

        {/* Note Input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Note
          </label>
          <textarea
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400 resize-none"
            placeholder="Add additional notes"
            rows="3"
          />
        </div>

        {/* Date & Time Input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Date & Time *
          </label>
          <input
            type="datetime-local"
            value={formData.datetime}
            onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white"
            required
          />
        </div>

        {/* Ringtone Selector */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            🎵 Ringtone
          </label>
          <div className="grid grid-cols-1 gap-2">
            {RINGTONES.map(rt => (
              <div
                key={rt.id}
                className={`flex items-center justify-between px-3 py-2 rounded-lg border cursor-pointer transition-all ${(formData.ringtone || 'classic') === rt.id
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-slate-600 bg-slate-700 text-gray-300 hover:border-slate-500'
                  }`}
                onClick={() => setFormData({ ...formData, ringtone: rt.id })}
              >
                <span className="text-sm font-medium">{rt.label}</span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); previewRingtone(rt.id); }}
                  className="p-1.5 rounded-full bg-slate-600 hover:bg-blue-600 text-gray-300 hover:text-white transition-all"
                  title="Preview"
                >
                  <Play size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
        >
          Add Reminder
        </button>
      </form>
    </div>
  );
};

export default ReminderForm;