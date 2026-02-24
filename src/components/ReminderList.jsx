// import React from 'react';
// import { Calendar, Clock } from 'lucide-react';
// import ReminderCard from './ReminderCard';

// const ReminderList = ({
//   reminders = [],
//   editingId,
//   editData,
//   setEditData,
//   onToggle,
//   onStartEdit,
//   onSaveEdit,
//   onCancelEdit,
//   onDelete,
// }) => {
//   return (
//     <div className="glass rounded-2xl shadow-2xl border border-white/[0.06] p-6 glow-teal animate-slide-up">
//       <h2 className="text-lg font-bold mb-6 flex items-center justify-between">
//         <span className="flex items-center gap-2.5">
//           <span className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/15">
//             <Calendar className="text-emerald-400" size={18} />
//           </span>
//           <span className="bg-gradient-to-r from-emerald-200 via-cyan-200 to-sky-200 bg-clip-text text-transparent">
//             Reminders
//           </span>
//         </span>
//         <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.15em]">
//           {reminders.length === 0 ? 'No reminders yet' : `${reminders.length} total`}
//         </span>
//       </h2>

//       {reminders.length === 0 ? (
//         // Empty state
//         <div className="text-center py-16">
//           <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass mb-5">
//             <Clock size={36} className="text-slate-700 animate-float" />
//           </div>
//           <p className="text-slate-400 text-sm font-medium">No reminders yet</p>
//           <p className="text-slate-600 text-xs mt-1.5">
//             Create your first reminder to get started
//           </p>
//         </div>
//       ) : (
//         // Reminder list
//         <div className="space-y-3">
//           {reminders.map((reminder) => (
//             <ReminderCard
//               key={reminder._id || reminder.id}
//               reminder={reminder}
//               isEditing={editingId === (reminder._id || reminder.id)}
//               editData={editData}
//               setEditData={setEditData}
//               onToggle={() => onToggle?.(reminder._id || reminder.id)}
//               onEdit={() => onStartEdit?.(reminder)}
//               onSave={() => onSaveEdit?.(reminder._id || reminder.id)}
//               onCancel={onCancelEdit}
//               onDelete={() => onDelete?.(reminder._id || reminder.id)}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReminderList;
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import ReminderCard from './ReminderCard';

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
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-6 animate-slide-up">
      <h2 className="text-lg font-bold mb-6 flex items-center justify-between">
        <span className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-gradient-to-br from-emerald-100 to-cyan-100 border border-emerald-200">
            <Calendar className="text-emerald-600" size={18} />
          </span>
          <span className="text-gray-800">
            Reminders
          </span>
        </span>

        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em]">
          {reminders.length === 0 ? 'No reminders yet' : `${reminders.length} total`}
        </span>
      </h2>

      {reminders.length === 0 ? (
        // Empty state
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gray-100 mb-5">
            <Clock size={36} className="text-gray-500 animate-float" />
          </div>

          <p className="text-gray-600 text-sm font-medium">
            No reminders yet
          </p>

          <p className="text-gray-400 text-xs mt-1.5">
            Create your first reminder to get started
          </p>
        </div>
      ) : (
        // Reminder list
        <div className="space-y-3">
          {reminders.map((reminder) => (
            <ReminderCard
              key={reminder._id || reminder.id}
              reminder={reminder}
              isEditing={editingId === (reminder._id || reminder.id)}
              editData={editData}
              setEditData={setEditData}
              onToggle={() => onToggle?.(reminder._id || reminder.id)}
              onEdit={() => onStartEdit?.(reminder)}
              onSave={() => onSaveEdit?.(reminder._id || reminder.id)}
              onCancel={onCancelEdit}
              onDelete={() => onDelete?.(reminder._id || reminder.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReminderList;