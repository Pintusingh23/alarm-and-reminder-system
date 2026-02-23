import React from 'react';
import { Bell, BellOff, Zap } from 'lucide-react';

const Header = ({ notificationsEnabled, onToggleNotifications }) => {
  return (
    <header className="sticky top-0 z-40 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">
          {/* Branding */}
          <h1 className="text-xl sm:text-2xl font-extrabold flex items-center gap-3 tracking-tight">
            <div className="relative">
              <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/20">
                <Zap className="text-teal-400" size={20} />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-teal-400 animate-glow-pulse" />
            </div>
            <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              Alarm & Reminder
            </span>
          </h1>

          {/* Notification Toggle */}
          <button
            onClick={onToggleNotifications}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs tracking-wide transition-all duration-300 glass ${notificationsEnabled
              ? 'text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/10 hover:border-emerald-400/40'
              : 'text-red-400 border-red-500/25 hover:bg-red-500/10 hover:border-red-400/40'
              }`}
          >
            <div className="relative">
              {notificationsEnabled ? <Bell size={15} /> : <BellOff size={15} />}
              <div className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ${notificationsEnabled ? 'bg-emerald-400' : 'bg-red-400'
                } animate-glow-pulse`} />
            </div>
            <span className="hidden sm:inline uppercase">
              {notificationsEnabled ? 'Notifications On' : 'Notifications Off'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;