import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import ReminderCard from './ReminderCard';

const ReminderList = ({ 
  reminders, 
  editingId, 
  editData, 
  setEditData,
  onToggle, 
  onStartEdit, 
  onSaveEdit, 
  onCancelEdit, 
  onDelete 
}) => {
  
  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Calendar className="text-green-400" size={24} />
          Reminders
        </span>
        <span className="text-sm font-normal text-gray-400">
          {reminders.length} total
        </span>
      </h2>

      {reminders.length === 0 ? (
        // Empty State
        <div className="text-center py-12">
          <Clock size={64} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg">No reminders found</p>
          <p className="text-gray-500 text-sm mt-2">
            Create your first reminder to get started!
          </p>
        </div>
      ) : (
        // Reminders List
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              isEditing={editingId === reminder.id}
              editData={editData}
              setEditData={setEditData}
              onToggle={() => onToggle(reminder.id)}
              onEdit={() => onStartEdit(reminder)}
              onSave={() => onSaveEdit(reminder.id)}
              onCancel={onCancelEdit}
              onDelete={() => onDelete(reminder.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReminderList;