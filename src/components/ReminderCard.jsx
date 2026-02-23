import React, { useState, useEffect } from 'react';
import { Clock, Edit2, Trash2, Check, X, Timer, Music } from 'lucide-react';
import { RINGTONES, RINGTONE_THEMES } from './ringtones';

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
    if (!enabled) return 'bg-slate-800/80 text-slate-400 border border-slate-600/40';
    if (status === 'completed') return 'bg-emerald-500/12 text-emerald-300 border border-emerald-400/30';
    if (status === 'scheduled') return 'bg-teal-500/12 text-teal-300 border border-teal-400/30';
    return 'bg-amber-500/12 text-amber-300 border border-amber-400/30';
  };

  // Get status text
  const getStatusText = (status, enabled) => {
    if (!enabled) return 'Disabled';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const ringtoneId = reminder.ringtone || 'classic';
  const ringtoneMeta = RINGTONES.find(r => r.id === ringtoneId);
  const theme = RINGTONE_THEMES[ringtoneId] || RINGTONE_THEMES.classic;

  return (
    <div
      className={`relative glass rounded-2xl p-4 transition-all duration-300 card-hover-lift ${reminder.enabled
        ? `${theme.cardIdle}`
        : 'opacity-50'
        }`}
      style={reminder.enabled ? { background: theme.bgTint } : {}}
    >
      {/* Left accent strip */}
      {reminder.enabled && (
        <div
          className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full transition-opacity"
          style={{ backgroundColor: theme.stripColor, opacity: 0.7 }}
        />
      )}

      {isEditing ? (
        // Edit Mode
        <div className="space-y-3 pl-2">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl text-white placeholder-slate-600 text-sm"
            placeholder="Title"
          />
          <textarea
            value={editData.note}
            onChange={(e) => setEditData({ ...editData, note: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl text-white placeholder-slate-600 resize-none text-sm"
            placeholder="Note"
            rows="2"
          />
          <input
            type="datetime-local"
            value={editData.datetime}
            onChange={(e) => setEditData({ ...editData, datetime: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl text-white text-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={onSave}
              className="flex-1 glass text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-400/30 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 text-sm"
            >
              <Check size={14} /> Save
            </button>
            <button
              onClick={onCancel}
              className="flex-1 glass text-slate-400 hover:text-slate-300 hover:bg-white/[0.03] py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 text-sm"
            >
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        // Display Mode
        <div className="pl-2">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-base font-bold text-white mb-1.5 tracking-tight">{reminder.title}</h3>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(reminder.status, reminder.enabled)}`}>
                  {getStatusText(reminder.status, reminder.enabled)}
                </span>
                {/* Ringtone badge */}
                {ringtoneMeta && (
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${theme.badge}`}>
                    <Music size={9} />
                    <span className="hidden sm:inline">{ringtoneMeta.label}</span>
                    <span className="sm:hidden">{ringtoneMeta.emoji}</span>
                  </span>
                )}
                {/* Live Countdown Badge */}
                {isCountdownActive && (
                  countdown ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-400/25 animate-neon-pulse"
                      style={{ color: '#fbbf24' }}
                    >
                      <Timer size={9} />
                      {countdown}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-300 border border-red-400/25">
                      <Timer size={9} />
                      Overdue
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {reminder.note && (
            <p className="text-slate-500 text-xs mb-2.5 leading-relaxed">{reminder.note}</p>
          )}

          <div className="flex items-center gap-2 text-[10px] text-slate-600 mb-3 font-medium">
            <Clock size={10} />
            <span className="font-display">{formatDateTime(reminder.datetime)}</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={onToggle}
              className={`px-3 py-1.5 rounded-lg font-semibold text-[10px] transition-all duration-300 glass tracking-wide ${reminder.enabled
                ? 'text-amber-400/80 border-amber-500/15 hover:bg-amber-500/10 hover:border-amber-400/30'
                : 'text-emerald-400/80 border-emerald-500/15 hover:bg-emerald-500/10 hover:border-emerald-400/30'
                }`}
            >
              {reminder.enabled ? 'Disable' : 'Enable'}
            </button>
            <button
              onClick={onEdit}
              className="px-3 py-1.5 glass text-teal-400/80 border-teal-500/15 hover:bg-teal-500/10 hover:border-teal-400/30 rounded-lg font-semibold text-[10px] transition-all duration-300 flex items-center gap-1 tracking-wide"
            >
              <Edit2 size={10} /> Edit
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1.5 glass text-red-400/80 border-red-500/15 hover:bg-red-500/10 hover:border-red-400/30 rounded-lg font-semibold text-[10px] transition-all duration-300 flex items-center gap-1 tracking-wide"
            >
              <Trash2 size={10} /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReminderCard;