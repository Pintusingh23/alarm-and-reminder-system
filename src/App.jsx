// import React, { useState } from 'react';
// import Header from './components/Header';
// import ReminderForm from './components/ReminderForm';
// import ControlPanel from './components/ControlPanel';
// import ReminderList from './components/ReminderList';
// import AlarmModal from './components/AlarmModal';
// import WorldClock from './components/WorldClock';
// import Stopwatch from './components/Stopwatch';
// import CountdownTimer from './components/CountdownTimer';
// import { useReminders } from './components/useReminders';
// import { Bell, Globe, Timer, Hourglass } from 'lucide-react';

// const TAB_ACCENTS = {
//   reminders: {
//     active: 'from-teal-500/25 to-cyan-500/25 border-teal-400/30 shadow-[0_0_20px_rgba(20,184,166,0.12)]',
//     icon: 'text-teal-400',
//     glow: 'bg-teal-500/20',
//   },
//   worldclock: {
//     active: 'from-cyan-500/25 to-teal-500/25 border-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.12)]',
//     icon: 'text-cyan-400',
//     glow: 'bg-cyan-500/20',
//   },
//   stopwatch: {
//     active: 'from-teal-500/25 to-emerald-500/25 border-teal-400/30 shadow-[0_0_20px_rgba(20,184,166,0.12)]',
//     icon: 'text-teal-400',
//     glow: 'bg-teal-500/20',
//   },
//   timer: {
//     active: 'from-amber-500/25 to-orange-500/25 border-amber-400/30 shadow-[0_0_20px_rgba(245,158,11,0.12)]',
//     icon: 'text-amber-400',
//     glow: 'bg-amber-500/20',
//   },
// };

// export default function App() {
//   const [activeTab, setActiveTab] = useState('reminders');

//   const {
//     reminders,
//     notificationsEnabled,
//     searchQuery,
//     sortBy,
//     editingId,
//     activeAlarm,
//     formData,
//     editData,

//     setSearchQuery,
//     setSortBy,
//     setFormData,
//     setEditData,

//     requestNotificationPermission,
//     addReminder,
//     deleteReminder,
//     toggleReminder,
//     startEdit,
//     saveEdit,
//     cancelEdit,
//     clearAllReminders,
//     markDone,
//     snoozeAlarm
//   } = useReminders();

//   const tabs = [
//     { id: 'reminders', label: 'Reminders', icon: Bell },
//     { id: 'worldclock', label: 'World Clock', icon: Globe },
//     { id: 'stopwatch', label: 'Stopwatch', icon: Timer },
//     { id: 'timer', label: 'Timer', icon: Hourglass },
//   ];

//   return (
//     <div className="min-h-screen text-slate-100 relative">
//       <Header
//         notificationsEnabled={notificationsEnabled}
//         onToggleNotifications={requestNotificationPermission}
//       />

//       {/* Tab Navigation */}
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
//         <div className="flex gap-1 p-1.5 glass rounded-2xl w-fit border border-white/[0.06] backdrop-blur-2xl">
//           {tabs.map(({ id, label, icon: Icon }) => {
//             const accent = TAB_ACCENTS[id];
//             const isActive = activeTab === id;
//             return (
//               <button
//                 key={id}
//                 onClick={() => setActiveTab(id)}
//                 className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${isActive
//                   ? `bg-gradient-to-r ${accent.active} text-white border`
//                   : 'text-slate-500 hover:text-slate-200 hover:bg-white/[0.04]'
//                   }`}
//               >
//                 <Icon size={15} className={isActive ? accent.icon : ''} />
//                 <span className="hidden sm:inline">{label}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Tab Content */}
//       <div className="animate-slide-up">
//         {activeTab === 'reminders' ? (
//           <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               <div className="lg:col-span-1 space-y-6">
//                 <ReminderForm
//                   formData={formData}
//                   setFormData={setFormData}
//                   onSubmit={addReminder}
//                 />
//                 <ControlPanel
//                   searchQuery={searchQuery}
//                   setSearchQuery={setSearchQuery}
//                   sortBy={sortBy}
//                   setSortBy={setSortBy}
//                   onClearAll={clearAllReminders}
//                 />
//               </div>
//               <div className="lg:col-span-2">
//                 <ReminderList
//                   reminders={reminders}
//                   editingId={editingId}
//                   editData={editData}
//                   setEditData={setEditData}
//                   onToggle={toggleReminder}
//                   onStartEdit={startEdit}
//                   onSaveEdit={saveEdit}
//                   onCancelEdit={cancelEdit}
//                   onDelete={deleteReminder}
//                 />
//               </div>
//             </div>
//           </main>
//         ) : activeTab === 'worldclock' ? (
//           <WorldClock />
//         ) : activeTab === 'stopwatch' ? (
//           <Stopwatch />
//         ) : (
//           <CountdownTimer />
//         )}
//       </div>

//       <AlarmModal
//         alarm={activeAlarm}
//         onMarkDone={markDone}
//         onSnooze={snoozeAlarm}
//       />
//     </div>
//   );
// }
import React, { useState } from 'react';
import Header from './components/Header';
import ReminderForm from './components/ReminderForm';
import ControlPanel from './components/ControlPanel';
import ReminderList from './components/ReminderList';
import AlarmModal from './components/AlarmModal';
import WorldClock from './components/WorldClock';
import Stopwatch from './components/Stopwatch';
import CountdownTimer from './components/CountdownTimer';
import { useReminders } from './components/useReminders';
import { Bell, Globe, Timer, Hourglass } from 'lucide-react';

const TAB_ACCENTS = {
  reminders: {
    active: 'bg-teal-100 border-teal-300 text-teal-700',
  },
  worldclock: {
    active: 'bg-cyan-100 border-cyan-300 text-cyan-700',
  },
  stopwatch: {
    active: 'bg-emerald-100 border-emerald-300 text-emerald-700',
  },
  timer: {
    active: 'bg-amber-100 border-amber-300 text-amber-700',
  },
};

export default function App() {
  const [activeTab, setActiveTab] = useState('reminders');

  const {
    reminders,
    notificationsEnabled,
    searchQuery,
    sortBy,
    editingId,
    activeAlarm,
    formData,
    editData,
    setSearchQuery,
    setSortBy,
    setFormData,
    setEditData,
    requestNotificationPermission,
    addReminder,
    deleteReminder,
    toggleReminder,
    startEdit,
    saveEdit,
    cancelEdit,
    clearAllReminders,
    markDone,
    snoozeAlarm
  } = useReminders();

  const tabs = [
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'worldclock', label: 'World Clock', icon: Globe },
    { id: 'stopwatch', label: 'Stopwatch', icon: Timer },
    { id: 'timer', label: 'Timer', icon: Hourglass },
  ];

  return (
    <div className="min-h-screen bg-[#fff4ee] text-gray-800">

      <Header
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={requestNotificationPermission}
      />

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex gap-2 p-2 bg-white rounded-2xl shadow-md border border-orange-100 w-fit">
          {tabs.map(({ id, label, icon: Icon }) => {
            const accent = TAB_ACCENTS[id];
            const isActive = activeTab === id;

            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 border ${
                  isActive
                    ? accent.active
                    : 'text-gray-500 border-transparent hover:bg-gray-100'
                }`}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-slide-up">
        {activeTab === 'reminders' ? (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
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
        ) : activeTab === 'stopwatch' ? (
          <Stopwatch />
        ) : (
          <CountdownTimer />
        )}
      </div>

      <AlarmModal
        alarm={activeAlarm}
        onMarkDone={markDone}
        onSnooze={snoozeAlarm}
      />
    </div>
  );
}