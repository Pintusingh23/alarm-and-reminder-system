import React, { useState, useEffect } from 'react';
import { Clock, Edit2, Trash2, Check, X, Timer } from 'lucide-react';

// Compute human-readable time remaining
function getTimeRemaining(datetime) {
  const diff = new Date(datetime) - new Date();
  if (diff <= 0) return null; // overdue

  const days = Math.floor(diff / 86400000);
  const hrs = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  if (days > 0) return `in ${days}d ${hrs}h ${mins}m`;
  if (hrs > 0) return `in ${hrs}h ${mins}m`;
  if (mins > 0) return `in ${mins}m ${secs}s`;
  return `in ${secs}s`;
}

const ReminderCard = ({
  reminder,
  isEditing,
  editData,
  setEditData,
  onToggle,
  onEdit,
  onSave,
  onCancel,
  onDelete
}) => {
  // --- Live Countdown ---
  const isCountdownActive = reminder.enabled && reminder.status === 'scheduled';
  const [countdown, setCountdown] = useState(() =>
    isCountdownActive ? getTimeRemaining(reminder.datetime) : null
  );

  useEffect(() => {
    if (!isCountdownActive) {
      setCountdown(null);
      return;
    }
    const update = () => setCountdown(getTimeRemaining(reminder.datetime));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [isCountdownActive, reminder.datetime]);

  // Format datetime for display
  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusColor = (status, enabled) => {
    if (!enabled) return 'bg-gray-600 text-gray-200';
    if (status === 'completed') return 'bg-green-600 text-white';
    if (status === 'scheduled') return 'bg-blue-600 text-white';
    return 'bg-yellow-600 text-white';
  };

  // Get status text
  const getStatusText = (status, enabled) => {
    if (!enabled) return 'Disabled';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div
      className={`bg-slate-700 rounded-lg p-4 border transition-all ${reminder.enabled
          ? 'border-slate-600 hover:border-blue-500'
          : 'border-slate-700 opacity-60'
        }`}
    >
      {isEditing ? (
        // Edit Mode
        <div className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Title"
          />
          <textarea
            value={editData.note}
            onChange={(e) => setEditData({ ...editData, note: e.target.value })}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Note"
            rows="2"
          />
          <input
            type="datetime-local"
            value={editData.datetime}
            onChange={(e) => setEditData({ ...editData, datetime: e.target.value })}
            className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button
              onClick={onSave}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Check size={16} /> Save
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        // Display Mode
        <>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                {reminder.title}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(reminder.status, reminder.enabled)}`}>
                  {getStatusText(reminder.status, reminder.enabled)}
                </span>
                {/* Live Countdown Badge */}
                {isCountdownActive && (
                  countdown ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-amber-500/20 text-amber-400 animate-pulse">
                      <Timer size={12} />
                      {countdown}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-red-500/20 text-red-400">
                      <Timer size={12} />
                      Overdue
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {reminder.note && (
            <p className="text-gray-300 text-sm mb-3">{reminder.note}</p>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Clock size={14} />
            <span>{formatDateTime(reminder.datetime)}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={onToggle}
              className={`px-4 py-2 rounded font-semibold text-sm transition-all ${reminder.enabled
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
            >
              {reminder.enabled ? 'Disable' : 'Enable'}
            </button>
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-sm transition-all flex items-center gap-1"
            >
              <Edit2 size={14} /> Edit
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold text-sm transition-all flex items-center gap-1"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReminderCard;