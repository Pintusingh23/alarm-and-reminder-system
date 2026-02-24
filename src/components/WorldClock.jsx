// import React, { useState, useEffect } from 'react';
// import { Globe, Clock, MapPin } from 'lucide-react';

// const CITIES = [
//     { name: 'New York', timezone: 'America/New_York', flag: '🇺🇸', continent: 'Americas', accent: 'indigo' },
//     { name: 'London', timezone: 'Europe/London', flag: '🇬🇧', continent: 'Europe', accent: 'cyan' },
//     { name: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵', continent: 'Asia', accent: 'pink' },
//     { name: 'Dubai', timezone: 'Asia/Dubai', flag: '🇦🇪', continent: 'Middle East', accent: 'amber' },
//     { name: 'Sydney', timezone: 'Australia/Sydney', flag: '🇦🇺', continent: 'Oceania', accent: 'emerald' },
//     { name: 'Mumbai', timezone: 'Asia/Kolkata', flag: '🇮🇳', continent: 'Asia', accent: 'purple' },
// ];

// const ACCENT_MAP = {
//     indigo: { ring: '#818cf8', glow: 'glow-blue', border: 'border-indigo-500/15 hover:border-indigo-400/35', text: 'text-indigo-300', grad: 'from-indigo-400 to-blue-400', tint: 'rgba(99, 102, 241, 0.03)' },
//     cyan: { ring: '#22d3ee', glow: 'glow-cyan', border: 'border-cyan-500/15 hover:border-cyan-400/35', text: 'text-cyan-300', grad: 'from-cyan-400 to-teal-400', tint: 'rgba(34, 211, 238, 0.03)' },
//     pink: { ring: '#f472b6', glow: 'glow-red', border: 'border-pink-500/15 hover:border-pink-400/35', text: 'text-pink-300', grad: 'from-pink-400 to-rose-400', tint: 'rgba(244, 114, 182, 0.03)' },
//     amber: { ring: '#fbbf24', glow: 'glow-amber', border: 'border-amber-500/15 hover:border-amber-400/35', text: 'text-amber-300', grad: 'from-amber-400 to-yellow-400', tint: 'rgba(251, 191, 36, 0.03)' },
//     emerald: { ring: '#34d399', glow: 'glow-emerald', border: 'border-emerald-500/15 hover:border-emerald-400/35', text: 'text-emerald-300', grad: 'from-emerald-400 to-green-400', tint: 'rgba(52, 211, 153, 0.03)' },
//     purple: { ring: '#c084fc', glow: 'glow-purple', border: 'border-purple-500/15 hover:border-purple-400/35', text: 'text-purple-300', grad: 'from-purple-400 to-violet-400', tint: 'rgba(192, 132, 252, 0.03)' },
// };

// function getTime(timezone) {
//     const now = new Date();
//     const timeStr = now.toLocaleTimeString('en-US', {
//         timeZone: timezone,
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: true,
//     });
//     const dateStr = now.toLocaleDateString('en-US', {
//         timeZone: timezone,
//         weekday: 'short',
//         month: 'short',
//         day: 'numeric',
//     });
//     return { timeStr, dateStr };
// }

// function AnalogClock({ timezone, accentColor }) {
//     const [angles, setAngles] = useState({ h: 0, m: 0, s: 0 });

//     useEffect(() => {
//         const update = () => {
//             const now = new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));
//             const h = now.getHours() % 12;
//             const m = now.getMinutes();
//             const s = now.getSeconds();
//             setAngles({
//                 h: (h / 12) * 360 + (m / 60) * 30,
//                 m: (m / 60) * 360 + (s / 60) * 6,
//                 s: (s / 60) * 360,
//             });
//         };
//         update();
//         const id = setInterval(update, 1000);
//         return () => clearInterval(id);
//     }, [timezone]);

//     return (
//         <svg viewBox="0 0 100 100" className="w-28 h-28 mx-auto" style={{ filter: `drop-shadow(0 0 6px ${accentColor}30)` }}>
//             {/* Face */}
//             <circle cx="50" cy="50" r="48" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
//             {/* Hour markers */}
//             {[...Array(12)].map((_, i) => {
//                 const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
//                 const isMain = i % 3 === 0;
//                 const r1 = isMain ? 38 : 40;
//                 const x1 = 50 + r1 * Math.cos(angle);
//                 const y1 = 50 + r1 * Math.sin(angle);
//                 const x2 = 50 + 44 * Math.cos(angle);
//                 const y2 = 50 + 44 * Math.sin(angle);
//                 return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={isMain ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.1)'} strokeWidth={isMain ? 1.5 : 0.8} strokeLinecap="round" />;
//             })}
//             {/* Hour hand */}
//             <line
//                 x1="50" y1="50"
//                 x2={50 + 24 * Math.sin((angles.h * Math.PI) / 180)}
//                 y2={50 - 24 * Math.cos((angles.h * Math.PI) / 180)}
//                 stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round"
//             />
//             {/* Minute hand */}
//             <line
//                 x1="50" y1="50"
//                 x2={50 + 33 * Math.sin((angles.m * Math.PI) / 180)}
//                 y2={50 - 33 * Math.cos((angles.m * Math.PI) / 180)}
//                 stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round"
//             />
//             {/* Second hand — neon colored with glow */}
//             <line
//                 x1="50" y1="50"
//                 x2={50 + 38 * Math.sin((angles.s * Math.PI) / 180)}
//                 y2={50 - 38 * Math.cos((angles.s * Math.PI) / 180)}
//                 stroke={accentColor} strokeWidth="0.8" strokeLinecap="round"
//                 style={{ filter: `drop-shadow(0 0 3px ${accentColor})` }}
//             />
//             {/* Center dot */}
//             <circle cx="50" cy="50" r="2" fill={accentColor} />
//             <circle cx="50" cy="50" r="0.8" fill="white" />
//         </svg>
//     );
// }

// function CityCard({ city }) {
//     const accent = ACCENT_MAP[city.accent];
//     const [time, setTime] = useState(() => getTime(city.timezone));

//     useEffect(() => {
//         setTime(getTime(city.timezone));
//         const id = setInterval(() => setTime(getTime(city.timezone)), 1000);
//         return () => clearInterval(id);
//     }, [city.timezone]);

//     return (
//         <div
//             className={`glass rounded-2xl p-5 flex flex-col items-center gap-3 transition-all duration-500 card-hover-lift ${accent.glow} ${accent.border}`}
//             style={{ background: accent.tint }}
//         >
//             <AnalogClock timezone={city.timezone} accentColor={accent.ring} />

//             <div className="text-center">
//                 <div className="text-2xl mb-0.5">{city.flag}</div>
//                 <h3 className="text-sm font-bold text-white tracking-tight">{city.name}</h3>
//                 <div className="flex items-center justify-center gap-1 mt-0.5">
//                     <MapPin size={8} className="text-slate-600" />
//                     <p className="text-[9px] text-slate-600 uppercase tracking-[0.15em] font-bold">{city.continent}</p>
//                 </div>

//                 <div className={`mt-3 font-display text-lg font-bold bg-gradient-to-r ${accent.grad} bg-clip-text text-transparent`}>
//                     {time.timeStr}
//                 </div>
//                 <div className="text-slate-500 text-[10px] mt-0.5 font-medium">{time.dateStr}</div>
//             </div>
//         </div>
//     );
// }

// const WorldClock = () => {
//     const [localTime, setLocalTime] = useState(new Date());

//     useEffect(() => {
//         const id = setInterval(() => setLocalTime(new Date()), 1000);
//         return () => clearInterval(id);
//     }, []);

//     return (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-slide-up">
//             {/* Section header */}
//             <div className="flex items-center gap-3 mb-8">
//                 <div className="p-2.5 glass rounded-xl glow-cyan border border-cyan-500/15">
//                     <Globe className="text-cyan-400" size={20} />
//                 </div>
//                 <div>
//                     <h2 className="text-xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">World Clock</h2>
//                     <p className="text-slate-600 text-[10px] font-bold tracking-[0.15em] uppercase">Live time across the globe</p>
//                 </div>
//                 <div className="ml-auto glass rounded-xl px-3.5 py-2 flex items-center gap-2">
//                     <Clock size={11} className="text-slate-600" />
//                     <span className="text-[10px] text-slate-600 font-bold">Local</span>
//                     <span className="font-display text-xs text-white font-bold">
//                         {localTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
//                     </span>
//                 </div>
//             </div>

//             {/* City Cards Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//                 {CITIES.map(city => (
//                     <CityCard key={city.name} city={city} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default WorldClock;

import React, { useState, useEffect } from 'react';
import { Globe, Clock, MapPin } from 'lucide-react';

const CITIES = [
    { name: 'New York', timezone: 'America/New_York', flag: '🇺🇸', continent: 'Americas', accent: 'indigo' },
    { name: 'London', timezone: 'Europe/London', flag: '🇬🇧', continent: 'Europe', accent: 'cyan' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵', continent: 'Asia', accent: 'pink' },
    { name: 'Dubai', timezone: 'Asia/Dubai', flag: '🇦🇪', continent: 'Middle East', accent: 'amber' },
    { name: 'Sydney', timezone: 'Australia/Sydney', flag: '🇦🇺', continent: 'Oceania', accent: 'emerald' },
    { name: 'Mumbai', timezone: 'Asia/Kolkata', flag: '🇮🇳', continent: 'Asia', accent: 'purple' },
];

const ACCENT_MAP = {
    indigo: { ring: '#6366f1', border: 'border-indigo-200 hover:border-indigo-300', text: 'text-indigo-600', grad: 'from-indigo-500 to-blue-500', tint: 'rgba(99, 102, 241, 0.05)' },
    cyan: { ring: '#06b6d4', border: 'border-cyan-200 hover:border-cyan-300', text: 'text-cyan-600', grad: 'from-cyan-500 to-teal-500', tint: 'rgba(6, 182, 212, 0.05)' },
    pink: { ring: '#ec4899', border: 'border-pink-200 hover:border-pink-300', text: 'text-pink-600', grad: 'from-pink-500 to-rose-500', tint: 'rgba(236, 72, 153, 0.05)' },
    amber: { ring: '#f59e0b', border: 'border-amber-200 hover:border-amber-300', text: 'text-amber-600', grad: 'from-amber-500 to-yellow-500', tint: 'rgba(245, 158, 11, 0.05)' },
    emerald: { ring: '#10b981', border: 'border-emerald-200 hover:border-emerald-300', text: 'text-emerald-600', grad: 'from-emerald-500 to-green-500', tint: 'rgba(16, 185, 129, 0.05)' },
    purple: { ring: '#a855f7', border: 'border-purple-200 hover:border-purple-300', text: 'text-purple-600', grad: 'from-purple-500 to-violet-500', tint: 'rgba(168, 85, 247, 0.05)' },
};

function getTime(timezone) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });
    const dateStr = now.toLocaleDateString('en-US', {
        timeZone: timezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
    return { timeStr, dateStr };
}

function AnalogClock({ timezone, accentColor }) {
    const [angles, setAngles] = useState({ h: 0, m: 0, s: 0 });

    useEffect(() => {
        const update = () => {
            const now = new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));
            const h = now.getHours() % 12;
            const m = now.getMinutes();
            const s = now.getSeconds();
            setAngles({
                h: (h / 12) * 360 + (m / 60) * 30,
                m: (m / 60) * 360 + (s / 60) * 6,
                s: (s / 60) * 360,
            });
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, [timezone]);

    return (
        <svg viewBox="0 0 100 100" className="w-28 h-28 mx-auto">
            <circle cx="50" cy="50" r="48" fill="white" stroke="#e5e7eb" strokeWidth="1" />

            {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
                const isMain = i % 3 === 0;
                const r1 = isMain ? 38 : 40;
                const x1 = 50 + r1 * Math.cos(angle);
                const y1 = 50 + r1 * Math.sin(angle);
                const x2 = 50 + 44 * Math.cos(angle);
                const y2 = 50 + 44 * Math.sin(angle);
                return (
                    <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#9ca3af"
                        strokeWidth={isMain ? 1.5 : 0.8}
                        strokeLinecap="round"
                    />
                );
            })}

            <line
                x1="50" y1="50"
                x2={50 + 24 * Math.sin((angles.h * Math.PI) / 180)}
                y2={50 - 24 * Math.cos((angles.h * Math.PI) / 180)}
                stroke="#374151"
                strokeWidth="2"
                strokeLinecap="round"
            />

            <line
                x1="50" y1="50"
                x2={50 + 33 * Math.sin((angles.m * Math.PI) / 180)}
                y2={50 - 33 * Math.cos((angles.m * Math.PI) / 180)}
                stroke="#6b7280"
                strokeWidth="1.2"
                strokeLinecap="round"
            />

            <line
                x1="50" y1="50"
                x2={50 + 38 * Math.sin((angles.s * Math.PI) / 180)}
                y2={50 - 38 * Math.cos((angles.s * Math.PI) / 180)}
                stroke={accentColor}
                strokeWidth="1"
                strokeLinecap="round"
            />

            <circle cx="50" cy="50" r="2" fill={accentColor} />
        </svg>
    );
}

function CityCard({ city }) {
    const accent = ACCENT_MAP[city.accent];
    const [time, setTime] = useState(() => getTime(city.timezone));

    useEffect(() => {
        const id = setInterval(() => setTime(getTime(city.timezone)), 1000);
        return () => clearInterval(id);
    }, [city.timezone]);

    return (
        <div
            className={`bg-white rounded-2xl p-5 flex flex-col items-center gap-3 transition-all duration-300 shadow-md border ${accent.border} hover:shadow-lg`}
            style={{ background: accent.tint }}
        >
            <AnalogClock timezone={city.timezone} accentColor={accent.ring} />

            <div className="text-center">
                <div className="text-2xl mb-0.5">{city.flag}</div>
                <h3 className="text-sm font-bold text-gray-800 tracking-tight">{city.name}</h3>

                <div className="flex items-center justify-center gap-1 mt-0.5">
                    <MapPin size={8} className="text-gray-400" />
                    <p className="text-[9px] text-gray-500 uppercase tracking-[0.15em] font-bold">
                        {city.continent}
                    </p>
                </div>

                <div className={`mt-3 font-bold text-lg bg-gradient-to-r ${accent.grad} bg-clip-text text-transparent`}>
                    {time.timeStr}
                </div>

                <div className="text-gray-500 text-[10px] mt-0.5 font-medium">
                    {time.dateStr}
                </div>
            </div>
        </div>
    );
}

const WorldClock = () => {
    const [localTime, setLocalTime] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setLocalTime(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-slide-up">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-white rounded-xl shadow-sm border border-cyan-200">
                    <Globe className="text-cyan-600" size={20} />
                </div>

                <div>
                    <h2 className="text-xl font-extrabold text-gray-800">
                        World Clock
                    </h2>
                    <p className="text-gray-500 text-[10px] font-bold tracking-[0.15em] uppercase">
                        Live time across the globe
                    </p>
                </div>

                <div className="ml-auto bg-white rounded-xl px-3.5 py-2 flex items-center gap-2 shadow-sm border border-gray-200">
                    <Clock size={11} className="text-gray-500" />
                    <span className="text-[10px] text-gray-500 font-bold">Local</span>
                    <span className="text-xs text-gray-800 font-bold">
                        {localTime.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true
                        })}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {CITIES.map(city => (
                    <CityCard key={city.name} city={city} />
                ))}
            </div>
        </div>
    );
};

export default WorldClock;