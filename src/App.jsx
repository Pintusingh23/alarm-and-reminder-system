import React, { useState } from 'react';
import Header from './components/Header';
import ReminderForm from './components/ReminderForm';
import ControlPanel from './components/ControlPanel';
import ReminderList from './components/ReminderList';
import AlarmModal from './components/AlarmModal';
import WorldClock from './components/WorldClock';
import Stopwatch from './components/Stopwatch';
import { useReminders } from './components/useReminders';
import { Bell, Globe, Timer } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('reminders');

  const {
    // State
    reminders,
    notificationsEnabled,
    searchQuery,
    sortBy,
    editingId,
    activeAlarm,
    formData,
    editData,

    // Setters 
    setSearchQuery,
    setSortBy,
    setFormData,
    setEditData,

    // Actions
    requestNotificationPermission,
    addReminder,
    deleteReminder,
    toggleReminder,
    startEdit,
    saveEdit,
    cancelEdit,
    clearAllReminders,
    markDone
  } = useReminders();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-gray-100">
      {/* Header */}
      <Header
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={requestNotificationPermission}
      />

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex gap-2 border-b border-slate-700 pb-0">
          <button
            onClick={() => setActiveTab('reminders')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-t-xl font-semibold text-sm transition-all duration-200 ${activeTab === 'reminders'
              ? 'bg-slate-800 border border-b-transparent border-slate-700 text-white -mb-px'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
          >
            <Bell size={16} />
            Reminders
          </button>
          <button
            onClick={() => setActiveTab('worldclock')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-t-xl font-semibold text-sm transition-all duration-200 ${activeTab === 'worldclock'
              ? 'bg-slate-800 border border-b-transparent border-slate-700 text-white -mb-px'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
          >
            <Globe size={16} />
            World Clock
          </button>
          <button
            onClick={() => setActiveTab('stopwatch')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-t-xl font-semibold text-sm transition-all duration-200 ${activeTab === 'stopwatch'
              ? 'bg-slate-800 border border-b-transparent border-slate-700 text-white -mb-px'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
          >
            <Timer size={16} />
            Stopwatch
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'reminders' ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Create & Controls */}
            <div className="lg:col-span-1 space-y-6">
              <ReminderForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={addReminder}
              />
              <ControlPanel
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onClearAll={clearAllReminders}
              />
            </div>

            {/* Right Panel - Reminders List */}
            <div className="lg:col-span-2">
              <ReminderList
                reminders={reminders}
                editingId={editingId}
                editData={editData}
                setEditData={setEditData}
                onToggle={toggleReminder}
                onStartEdit={startEdit}
                onSaveEdit={saveEdit}
                onCancelEdit={cancelEdit}
                onDelete={deleteReminder}
              />
            </div>
          </div>
        </main>
      ) : activeTab === 'worldclock' ? (
        <WorldClock />
      ) : (
        <Stopwatch />
      )}

      {/* Alarm Modal */}
      <AlarmModal
        alarm={activeAlarm}
        onMarkDone={markDone}
      />
    </div>
  );
}