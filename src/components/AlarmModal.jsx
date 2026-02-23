import React, { useEffect } from 'react';
import { Clock, AlarmClock, CheckCircle } from 'lucide-react';
import { stopRingtone, RINGTONES, RINGTONE_THEMES } from './ringtones';

const AlarmModal = ({ alarm, onMarkDone, onSnooze }) => {
  // Stop ringtone when modal closes
  useEffect(() => {
    return () => {
      if (!alarm) stopRingtone();
    };
  }, [alarm]);

  if (!alarm) return null;

  const handleDone = () => {
    stopRingtone();
    onMarkDone();
  };

  const ringtoneId = alarm.ringtone || 'classic';
  const ringtoneMeta = RINGTONES.find(r => r.id === ringtoneId);
  const ringtoneLabel = ringtoneMeta?.label || '🔔 Classic Bell';
  const ringtoneEmoji = ringtoneMeta?.emoji || '🔔';
  const theme = RINGTONE_THEMES[ringtoneId] || RINGTONE_THEMES.classic;

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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Frosted overlay with ringtone-colored radial glow */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 50%, ${theme.bgTint?.replace('0.03', '0.15') || 'rgba(99,102,241,0.15)'}, transparent), rgba(0,0,0,0.85)`
        }}
      />

      {/* Modal card */}
      <div className={`relative glass-strong rounded-2xl max-w-md w-full p-8 border-2 ${theme.modalBorder} animate-slide-up`}>
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mb-4 inline-flex items-center justify-center w-20 h-20 rounded-2xl glass border border-white/10">
            <span className="text-5xl animate-scale-bounce">{ringtoneEmoji}</span>
          </div>
          <h2 className={`text-3xl font-extrabold mb-2 ${theme.modalTitle}`}>
            Alarm Triggered!
          </h2>
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${theme.modalPill}`}>
            {ringtoneLabel}
          </span>
        </div>

        {/* Alarm Details */}
        <div className="glass rounded-xl p-4 mb-6 border border-white/[0.06]" style={{ background: theme.bgTint }}>
          <h3 className="text-lg font-bold text-white mb-1.5 tracking-tight">
            {alarm.title}
          </h3>
          {alarm.note && (
            <p className="text-slate-400 text-sm mb-2.5">{alarm.note}</p>
          )}
          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
            <Clock size={11} />
            <span className="font-display">{formatDateTime(alarm.datetime)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onSnooze}
            className={`flex-1 flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.03] text-sm tracking-wide ${theme.snoozeButton}`}
          >
            <AlarmClock size={16} />
            Snooze 5 min
          </button>
          <button
            onClick={handleDone}
            className="flex-1 glass border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400/40 font-bold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.03] flex items-center justify-center gap-2 text-sm tracking-wide"
          >
            <CheckCircle size={16} />
            Mark Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlarmModal;