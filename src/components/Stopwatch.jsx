import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag, Timer } from 'lucide-react';

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
    const baseRef = useRef(0);

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

    const lapTimes = laps.map(l => l.time);
    const bestLap = laps.length > 1 ? Math.min(...lapTimes) : null;
    const worstLap = laps.length > 1 ? Math.max(...lapTimes) : null;

    const seconds = Math.floor(elapsed / 1000) % 60;
    const progress = seconds / 60;
    const circumference = 2 * Math.PI * 120;

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-slide-up">
            {/* Title */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3">
                    <div className="p-2.5 glass rounded-xl glow-teal border border-teal-500/15">
                        <Timer className="text-teal-400" size={20} />
                    </div>
                    <div className="text-left">
                        <h2 className="text-xl font-extrabold bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">Stopwatch</h2>
                        <p className="text-slate-600 text-[10px] font-bold tracking-[0.15em] uppercase">Precision timing</p>
                    </div>
                </div>
            </div>

            {/* Clock Ring */}
            <div className="flex justify-center mb-10">
                <div className="relative">
                    <svg width="280" height="280" viewBox="0 0 280 280" className="rotate-[-90deg]"
                        style={{ filter: running ? 'drop-shadow(0 0 12px rgba(20, 184, 166, 0.3))' : 'none', transition: 'filter 0.5s' }}>
                        <circle cx="140" cy="140" r="120" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                        <circle
                            cx="140" cy="140" r="120"
                            fill="none"
                            stroke="url(#swGradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference * (1 - progress)}
                            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
                        />
                        <defs>
                            <linearGradient id="swGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#14b8a6" />
                                <stop offset="50%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#34d399" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="font-display text-5xl font-extrabold text-white tracking-tight">
                            {display}
                        </div>
                        <div className="font-display text-xl text-slate-600 mt-1 font-light">
                            .{ms}
                        </div>
                        <div className={`mt-3 text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1 rounded-full glass ${running
                            ? 'neon-text-mint border-emerald-500/20'
                            : elapsed > 0
                                ? 'neon-text-gold border-amber-500/20'
                                : 'text-slate-600'
                            }`}>
                            {running ? '● Running' : elapsed > 0 ? '❚❚ Paused' : 'Ready'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-5 mb-10">
                <button
                    onClick={handleLap}
                    disabled={!running}
                    className="flex flex-col items-center gap-1.5 w-18 h-18 p-4 rounded-2xl glass transition-all duration-300 disabled:opacity-15 disabled:cursor-not-allowed text-slate-500 hover:text-teal-400 hover:glow-teal hover:border-teal-500/20"
                >
                    <Flag size={18} />
                    <span className="text-[9px] font-bold tracking-[0.2em]">LAP</span>
                </button>

                <button
                    onClick={handleStartStop}
                    className={`flex flex-col items-center gap-1.5 w-24 h-24 rounded-2xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-[1.05] ${running
                        ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/20'
                        : 'bg-gradient-to-br from-teal-500 to-cyan-600 shadow-teal-500/20'
                        }`}
                >
                    {running
                        ? <Pause size={26} className="mt-4" />
                        : <Play size={26} className="mt-4" />}
                    <span className="text-[9px] font-bold tracking-[0.2em]">{running ? 'PAUSE' : 'START'}</span>
                </button>

                <button
                    onClick={handleReset}
                    disabled={elapsed === 0}
                    className="flex flex-col items-center gap-1.5 w-18 h-18 p-4 rounded-2xl glass transition-all duration-300 disabled:opacity-15 disabled:cursor-not-allowed text-slate-500 hover:text-red-400 hover:glow-red hover:border-red-500/20"
                >
                    <RotateCcw size={18} />
                    <span className="text-[9px] font-bold tracking-[0.2em]">RESET</span>
                </button>
            </div>

            {/* Lap History */}
            {laps.length > 0 && (
                <div className="glass rounded-2xl overflow-hidden glow-teal">
                    <div className="px-5 py-3 border-b border-white/[0.04] flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Laps</span>
                        <span className="text-[9px] text-slate-700 font-bold tracking-wider">{laps.length} recorded</span>
                    </div>
                    <div className="divide-y divide-white/[0.03] max-h-56 overflow-y-auto">
                        {laps.map(lap => {
                            const { display: d, ms: m } = formatTime(lap.time);
                            const isBest = laps.length > 1 && lap.time === bestLap;
                            const isWorst = laps.length > 1 && lap.time === worstLap;
                            return (
                                <div key={lap.id} className="flex items-center justify-between px-5 py-2.5 transition-colors hover:bg-white/[0.02]">
                                    <div className="flex items-center gap-3">
                                        <span className="text-slate-700 text-[10px] font-display font-bold w-6">#{lap.id}</span>
                                        {isBest && <span className="text-[9px] font-bold neon-text-mint bg-emerald-400/8 px-2 py-0.5 rounded-full border border-emerald-400/15">Best</span>}
                                        {isWorst && <span className="text-[9px] font-bold neon-text-rose bg-red-400/8 px-2 py-0.5 rounded-full border border-red-400/15">Slowest</span>}
                                    </div>
                                    <span className={`font-display text-sm font-bold ${isBest ? 'neon-text-mint' : isWorst ? 'neon-text-rose' : 'text-white'}`}>
                                        {d}.<span className="text-slate-600">{m}</span>
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
