// import React from 'react';
// import { Plus, Play, Volume2 } from 'lucide-react';
// import { RINGTONES, RINGTONE_THEMES, previewRingtone } from './ringtones';

// const ReminderForm = ({ formData, setFormData, onSubmit }) => {
//   const selectedRt = formData.ringtone || 'classic';

//   return (
//     <div className="glass rounded-2xl p-6 glow-teal animate-slide-up">
//       <h2 className="text-lg font-bold mb-5 flex items-center gap-2.5">
//         <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/15">
//           <Plus className="text-teal-400" size={18} />
//         </div>
//         <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Create Alarm</span>
//       </h2>

//       <form onSubmit={onSubmit} className="space-y-5">
//         {/* Title */}
//         <div>
//           <label className="block text-[10px] font-bold mb-2 text-slate-500 uppercase tracking-[0.15em]">
//             Title *
//           </label>
//           <input
//             type="text"
//             value={formData.title}
//             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             className="w-full px-4 py-2.5 rounded-xl text-white placeholder-slate-600 text-sm"
//             placeholder="Enter reminder title"
//             required
//           />
//         </div>

//         {/* Note */}
//         <div>
//           <label className="block text-[10px] font-bold mb-2 text-slate-500 uppercase tracking-[0.15em]">
//             Note
//           </label>
//           <textarea
//             value={formData.note}
//             onChange={(e) => setFormData({ ...formData, note: e.target.value })}
//             className="w-full px-4 py-2.5 rounded-xl text-white placeholder-slate-600 resize-none text-sm"
//             placeholder="Add additional notes"
//             rows="2"
//           />
//         </div>

//         {/* Date & Time */}
//         <div>
//           <label className="block text-[10px] font-bold mb-2 text-slate-500 uppercase tracking-[0.15em]">
//             Date & Time *
//           </label>
//           <input
//             type="datetime-local"
//             value={formData.datetime}
//             onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
//             className="w-full px-4 py-2.5 rounded-xl text-white text-sm"
//             required
//           />
//         </div>

//         {/* Ringtone Selector */}
//         <div>
//           <label className="block text-[10px] font-bold mb-2.5 text-slate-500 uppercase tracking-[0.15em]">
//             🎵 Ringtone
//           </label>
//           <div className="grid grid-cols-1 gap-2">
//             {RINGTONES.map(rt => {
//               const theme = RINGTONE_THEMES[rt.id];
//               const isSelected = selectedRt === rt.id;
//               return (
//                 <div
//                   key={rt.id}
//                   className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-300 card-hover-lift ${isSelected ? theme.cardActive : theme.cardIdle
//                     }`}
//                   style={isSelected ? { '--strip-color': theme.stripColor } : {}}
//                   onClick={() => setFormData({ ...formData, ringtone: rt.id })}
//                 >
//                   {/* Color accent strip on left when selected */}
//                   {isSelected && (
//                     <div
//                       className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full"
//                       style={{ backgroundColor: theme.stripColor }}
//                     />
//                   )}
//                   <div className="flex items-center gap-2.5">
//                     <span className="text-lg">{rt.emoji}</span>
//                     <span className="text-sm font-medium">{rt.label}</span>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={(e) => { e.stopPropagation(); previewRingtone(rt.id); }}
//                     className="p-1.5 rounded-full glass glass-hover transition-all hover:scale-110"
//                     style={{ color: isSelected ? theme.stripColor : undefined }}
//                     title="Preview"
//                   >
//                     {isSelected ? <Volume2 size={13} /> : <Play size={12} />}
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-bold py-3 rounded-xl transition-all duration-500 transform hover:scale-[1.02] shadow-lg shadow-teal-500/15 border border-teal-400/20 text-sm tracking-wide"
//         >
//           ✦ Add Reminder
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ReminderForm;
import React from 'react';
import { Plus, Play, Volume2 } from 'lucide-react';
import { RINGTONES, RINGTONE_THEMES, previewRingtone } from './ringtones';

const ReminderForm = ({ formData, setFormData, onSubmit }) => {
  const selectedRt = formData.ringtone || 'classic';

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100 animate-slide-up">
      <h2 className="text-lg font-bold mb-5 flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100 border border-teal-200">
          <Plus className="text-teal-600" size={18} />
        </div>
        <span className="text-gray-800">Create Alarm</span>
      </h2>

      <form onSubmit={onSubmit} className="space-y-5">
        
        {/* Title */}
        <div>
          <label className="block text-[10px] font-bold mb-2 text-gray-600 uppercase tracking-[0.15em]">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-black text-gray-800 placeholder-gray-400 text-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all"
            placeholder="Enter reminder title"
            required
          />
        </div>

        {/* Note */}
        <div>
          <label className="block text-[10px] font-bold mb-2 text-gray-600 uppercase tracking-[0.15em]">
            Note
          </label>
          <textarea
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-black text-gray-800 placeholder-gray-400 resize-none text-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all"
            placeholder="Add additional notes"
            rows="2"
          />
        </div>

        {/* Date & Time */}
        <div>
          <label className="block text-[10px] font-bold mb-2 text-gray-600 uppercase tracking-[0.15em]">
            Date & Time *
          </label>
          <input
            type="datetime-local"
            value={formData.datetime}
            onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-black text-gray-800 text-sm focus:ring-2 focus:ring-teal-400 focus:outline-none transition-all"
            required
          />
        </div>

        {/* Ringtone Selector */}
        <div>
          <label className="block text-[10px] font-bold mb-2.5 text-gray-600 uppercase tracking-[0.15em]">
            🎵 Ringtone
          </label>

          <div className="grid grid-cols-1 gap-2">
            {RINGTONES.map(rt => {
              const theme = RINGTONE_THEMES[rt.id];
              const isSelected = selectedRt === rt.id;

              return (
                <div
                  key={rt.id}
                  className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'bg-teal-50 border border-teal-400 shadow-sm'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                  style={isSelected ? { '--strip-color': theme.stripColor } : {}}
                  onClick={() => setFormData({ ...formData, ringtone: rt.id })}
                >
                  {isSelected && (
                    <div
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full"
                      style={{ backgroundColor: theme.stripColor }}
                    />
                  )}

                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{rt.emoji}</span>
                    <span className="text-sm font-medium text-gray-800">
                      {rt.label}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); previewRingtone(rt.id); }}
                    className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all hover:scale-110"
                    style={{ color: isSelected ? theme.stripColor : '#6b7280' }}
                    title="Preview"
                  >
                    {isSelected ? <Volume2 size={13} /> : <Play size={12} />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md border border-teal-300 text-sm tracking-wide"
        >
          ✦ Add Reminder
        </button>

      </form>
    </div>
  );
};

export default ReminderForm;