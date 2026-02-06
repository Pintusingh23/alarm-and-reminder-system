import React from 'react';
import Header from './components/Header';
import ReminderForm from './components/ReminderForm';
import ControlPanel from './components/ControlPanel';
import ReminderList from './components/ReminderList';
import AlarmModal from './components/AlarmModal';
import { useReminders } from './components/useReminders';

export default function App() {
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Create & Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Create Reminder Form */}
            <ReminderForm 
              formData={formData}
              setFormData={setFormData}
              onSubmit={addReminder}
            />

            {/* Control Panel */}
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

      {/* Alarm Modal */}
      <AlarmModal 
        alarm={activeAlarm}
        onMarkDone={markDone}
      />
    </div>
  );
}