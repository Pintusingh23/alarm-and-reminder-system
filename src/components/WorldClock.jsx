import React, { useState, useEffect } from 'react';
import { Globe, Clock } from 'lucide-react';

const CITIES = [
    { name: 'New York', timezone: 'America/New_York', flag: '🇺🇸', continent: 'America' },
    { name: 'London', timezone: 'Europe/London', flag: '🇬🇧', continent: 'Europe' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵', continent: 'Asia' },
];

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
        weekday: 'long',
        month: 'short',
        day: 'numeric',
    });
    return { timeStr, dateStr };
}

function AnalogClock({ timezone }) {
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
        <svg viewBox="0 0 100 100" className="w-36 h-36 mx-auto">
            {/* Face */}
            <circle cx="50" cy="50" r="48" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            {/* Hour markers */}
            {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
                const x1 = 50 + 38 * Math.cos(angle);
                const y1 = 50 + 38 * Math.sin(angle);
                const x2 = 50 + 44 * Math.cos(angle);
                const y2 = 50 + 44 * Math.sin(angle);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="2" strokeLinecap="round" />;
            })}
            {/* Hour hand */}
            <line
                x1="50" y1="50"
                x2={50 + 26 * Math.sin((angles.h * Math.PI) / 180)}
                y2={50 - 26 * Math.cos((angles.h * Math.PI) / 180)}
                stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round"
            />
            {/* Minute hand */}
            <line
                x1="50" y1="50"
                x2={50 + 35 * Math.sin((angles.m * Math.PI) / 180)}
                y2={50 - 35 * Math.cos((angles.m * Math.PI) / 180)}
                stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"
            />
            {/* Second hand */}
            <line
                x1="50" y1="50"
                x2={50 + 38 * Math.sin((angles.s * Math.PI) / 180)}
                y2={50 - 38 * Math.cos((angles.s * Math.PI) / 180)}
                stroke="#f472b6" strokeWidth="1" strokeLinecap="round"
            />
            {/* Center dot */}
            <circle cx="50" cy="50" r="3" fill="#f472b6" />
        </svg>
    );
}

function CityCard({ city }) {
    const [time, setTime] = useState(() => getTime(city.timezone));

    useEffect(() => {
        setTime(getTime(city.timezone));
        const id = setInterval(() => setTime(getTime(city.timezone)), 1000);
        return () => clearInterval(id);
    }, [city.timezone]);

    return (
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 flex flex-col items-center gap-4 hover:border-blue-500/50 transition-all duration-300 shadow-lg">
            {/* Analog Clock */}
            <AnalogClock timezone={city.timezone} />

            {/* City Info */}
            <div className="text-center">
                <div className="text-4xl mb-1">{city.flag}</div>
                <h3 className="text-xl font-bold text-white">{city.name}</h3>
                <p className="text-xs text-slate-400 uppercase tracking-widest mt-0.5">{city.continent}</p>

                {/* Digital Time */}
                <div className="mt-3 font-mono text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {time.timeStr}
                </div>
                <div className="text-slate-400 text-sm mt-1">{time.dateStr}</div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Section header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-500/20 rounded-xl">
                    <Globe className="text-blue-400" size={28} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">World Clock</h2>
                    <p className="text-slate-400 text-sm">Live time across the globe</p>
                </div>
                <div className="ml-auto flex items-center gap-2 text-slate-400 text-sm bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
                    <Clock size={14} />
                    <span>Your time: </span>
                    <span className="font-mono text-white font-semibold">
                        {localTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                    </span>
                </div>
            </div>

            {/* City Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {CITIES.map(city => (
                    <CityCard key={city.name} city={city} />
                ))}
            </div>
        </div>
    );
};

export default WorldClock;
