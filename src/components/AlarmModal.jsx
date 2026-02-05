import React from 'react';
import { Clock } from 'lucide-react';

const AlarmModal = ({ alarm, onMarkDone }) => {
  if (!alarm) return null;

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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl border-2 border-red-500 max-w-md w-full p-8 animate-pulse">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔔</div>
          <h2 className="text-3xl font-bold text-red-400 mb-2">
            Alarm Triggered!
          </h2>
        </div>
        
        {/* Alarm Details */}
        <div className="bg-slate-700 rounded-lg p-4 mb-6">
          <h3 className="text-xl font-bold text-white mb-2">
            {alarm.title}
          </h3>
          {alarm.note && (
            <p className="text-gray-300 mb-3">{alarm.note}</p>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock size={14} />
            <span>{formatDateTime(alarm.datetime)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">

          <button
            onClick={onMarkDone}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            ✓ Mark Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlarmModal;