import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import ReminderCard from './ReminderCard';

// ✅ Fake reminders (UI testing ke liye)
const fakeReminders = [
  {
    id: 1,
    title: 'Morning Alarm',
    description: 'Wake up at 6 AM',
    date: '2026-02-06',
    time: '06:00',
    completed: false,
  },
  
];

const ReminderList = ({
  reminders = [],
  editingId,
  editData,
  setEditData,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) => {
  // ✅ Agar real reminders empty ho → fake dikhao
  const displayReminders =
    reminders.length > 0 ? reminders : fakeReminders;

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Calendar className="text-green-400" size={24} />
          Reminders
        </span>
        <span className="text-sm font-normal text-gray-400">
          {displayReminders.length} total
        </span>
      </h2>

      {displayReminders.length === 0 ? (
        // Empty state
        <div className="text-center py-12">
          <Clock size={64} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg">No reminders found</p>
          <p className="text-gray-500 text-sm mt-2">
            Create your first reminder to get started!
          </p>
        </div>
      ) : (
        // Reminder list
        <div className="space-y-4">
          {displayReminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              isEditing={editingId === reminder.id}
              editData={editData}
              setEditData={setEditData}
              onToggle={() => onToggle?.(reminder.id)}
              onEdit={() => onStartEdit?.(reminder)}
              onSave={() => onSaveEdit?.(reminder.id)}
              onCancel={onCancelEdit}
              onDelete={() => onDelete?.(reminder.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReminderList;
