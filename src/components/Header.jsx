import React from 'react';
import { Bell, BellOff } from 'lucide-react';

const Header = ({ notificationsEnabled, onToggleNotifications }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
            <span className="text-4xl">⏰</span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Alarm & Reminder System
            </span>
          </h1>

          {/* Notification Toggle Button */}
          <button
            onClick={onToggleNotifications}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              notificationsEnabled
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {notificationsEnabled ? <Bell size={18} /> : <BellOff size={18} />}
            <span className="hidden sm:inline">
              Notifications: {notificationsEnabled ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;