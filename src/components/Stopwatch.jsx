import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

function formatTime(ms) {
    const totalMs = ms % 1000;
    const secs = Math.floor(ms / 1000) % 60;
    const mins = Math.floor(ms / 60000) % 60;
    const hrs = Math.floor(ms / 3600000);
    return {
        display: `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`,
        ms: String(Math.floor(totalMs / 10)).padStart(2, '0')
    };
}

const Stopwatch = () => {
    const [elapsed, setElapsed] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const startRef = useRef(null);
    const rafRef = useRef(null);
    const baseRef = useRef(0); // accumulated time before last start

    useEffect(() => {
        if (running) {
            startRef.current = performance.now();
            const tick = () => {
                setElapsed(baseRef.current + (performance.now() - startRef.current));
                rafRef.current = requestAnimationFrame(tick);
            };
            rafRef.current = requestAnimationFrame(tick);
        } else {
            cancelAnimationFrame(rafRef.current);
            baseRef.current = elapsed;
        }
        return () => cancelAnimationFrame(rafRef.current);
    }, [running]);

    const handleStartStop = () => setRunning(r => !r);

    const handleReset = () => {
        setRunning(false);
        cancelAnimationFrame(rafRef.current);
        setElapsed(0);
        baseRef.current = 0;
        setLaps([]);
    };

    const handleLap = () => {
        if (!running) return;
        setLaps(prev => [{ id: prev.length + 1, time: elapsed }, ...prev]);
    };

    const { display, ms } = formatTime(elapsed);

    // Find best and worst lap
    const lapTimes = laps.map(l => l.time);
    const bestLap = laps.length > 1 ? Math.min(...lapTimes) : null;
    const worstLap = laps.length > 1 ? Math.max(...lapTimes) : null;

    // Progress ring
    const seconds = Math.floor(elapsed / 1000) % 60;
    const progress = seconds / 60;
    const circumference = 2 * Math.PI * 120;

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Title */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white">Stopwatch</h2>
                <p className="text-slate-400 text-sm mt-1">Precision timing</p>
            </div>

            {/* Clock Ring */}
            <div className="flex justify-center mb-10">
                <div className="relative">
                    <svg width="280" height="280" viewBox="0 0 280 280" className="rotate-[-90deg]">
                        {/* Track */}
                        <circle cx="140" cy="140" r="120" fill="none" stroke="#1e293b" strokeWidth="12" />
                        {/* Progress arc */}
                        <circle
                            cx="140" cy="140" r="120"
                            fill="none"
                            stroke="url(#swGradient)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference * (1 - progress)}
                            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
                        />
                        <defs>
                            <linearGradient id="swGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#60a5fa" />
                                <stop offset="100%" stopColor="#a78bfa" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Time display in center */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="font-mono text-5xl font-bold text-white tracking-tight">
                            {display}
                        </div>
                        <div className="font-mono text-2xl text-slate-400 mt-1">
                            .{ms}
                        </div>
                        <div className={`mt-2 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${running ? 'bg-green-500/20 text-green-400' : elapsed > 0 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-700 text-slate-400'
                            }`}>
                            {running ? 'Running' : elapsed > 0 ? 'Paused' : 'Ready'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mb-10">
                {/* Lap */}
                <button
                    onClick={handleLap}
                    disabled={!running}
                    className="flex flex-col items-center gap-1 w-20 h-20 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:border-blue-500 hover:text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <Flag size={20} className="mt-4" />
                    <span className="text-xs font-semibold">Lap</span>
                </button>

                {/* Start / Pause */}
                <button
                    onClick={handleStartStop}
                    className={`flex flex-col items-center gap-1 w-24 h-24 rounded-full border-2 font-bold text-white shadow-lg transition-all ${running
                            ? 'bg-yellow-500 border-yellow-400 hover:bg-yellow-400'
                            : 'bg-blue-600 border-blue-500 hover:bg-blue-500'
                        }`}
                >
                    {running
                        ? <Pause size={28} className="mt-5" />
                        : <Play size={28} className="mt-5" />}
                    <span className="text-xs font-semibold">{running ? 'Pause' : 'Start'}</span>
                </button>

                {/* Reset */}
                <button
                    onClick={handleReset}
                    disabled={elapsed === 0}
                    className="flex flex-col items-center gap-1 w-20 h-20 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:border-red-500 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <RotateCcw size={20} className="mt-4" />
                    <span className="text-xs font-semibold">Reset</span>
                </button>
            </div>

            {/* Lap History */}
            {laps.length > 0 && (
                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-slate-700 flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-300">Laps</span>
                        <span className="text-xs text-slate-500">{laps.length} recorded</span>
                    </div>
                    <div className="divide-y divide-slate-700/50 max-h-56 overflow-y-auto">
                        {laps.map(lap => {
                            const { display: d, ms: m } = formatTime(lap.time);
                            const isBest = laps.length > 1 && lap.time === bestLap;
                            const isWorst = laps.length > 1 && lap.time === worstLap;
                            return (
                                <div key={lap.id} className="flex items-center justify-between px-5 py-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-slate-500 text-sm w-8">#{lap.id}</span>
                                        {isBest && <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Best</span>}
                                        {isWorst && <span className="text-xs font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">Slowest</span>}
                                    </div>
                                    <span className={`font-mono text-sm font-semibold ${isBest ? 'text-green-400' : isWorst ? 'text-red-400' : 'text-white'
                                        }`}>
                                        {d}.<span className="text-slate-400">{m}</span>
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stopwatch;
