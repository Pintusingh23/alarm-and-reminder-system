import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Hourglass } from 'lucide-react';
import { playRingtone, stopRingtone } from './ringtones';

const PRESETS = [
    { label: '1m', seconds: 60 },
    { label: '5m', seconds: 300 },
    { label: '10m', seconds: 600 },
    { label: '15m', seconds: 900 },
    { label: '30m', seconds: 1800 },
];

function formatCountdown(totalMs) {
    if (totalMs <= 0) return { hrs: '00', mins: '00', secs: '00', cs: '00' };
    const hrs = String(Math.floor(totalMs / 3600000)).padStart(2, '0');
    const mins = String(Math.floor((totalMs % 3600000) / 60000)).padStart(2, '0');
    const secs = String(Math.floor((totalMs % 60000) / 1000)).padStart(2, '0');
    const cs = String(Math.floor((totalMs % 1000) / 10)).padStart(2, '0');
    return { hrs, mins, secs, cs };
}

const CountdownTimer = () => {
    const [inputHrs, setInputHrs] = useState(0);
    const [inputMins, setInputMins] = useState(5);
    const [inputSecs, setInputSecs] = useState(0);
    const [status, setStatus] = useState('idle');
    const [remaining, setRemaining] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    const endTimeRef = useRef(null);
    const rafRef = useRef(null);
    const pausedRemainingRef = useRef(0);

    const tick = useCallback(() => {
        const now = performance.now();
        const left = Math.max(0, endTimeRef.current - now);
        setRemaining(left);
        if (left <= 0) {
            setStatus('finished');
            playRingtone('urgent', true);
            return;
        }
        rafRef.current = requestAnimationFrame(tick);
    }, []);

    useEffect(() => {
        return () => {
            cancelAnimationFrame(rafRef.current);
            stopRingtone();
        };
    }, []);

    const startTimer = (overrideSeconds) => {
        stopRingtone();
        const totalSec = overrideSeconds ?? (inputHrs * 3600 + inputMins * 60 + inputSecs);
        if (totalSec <= 0) return;
        const totalMs = totalSec * 1000;
        setTotalDuration(totalMs);
        setRemaining(totalMs);
        endTimeRef.current = performance.now() + totalMs;
        setStatus('running');
        rafRef.current = requestAnimationFrame(tick);
    };

    const pauseTimer = () => {
        cancelAnimationFrame(rafRef.current);
        pausedRemainingRef.current = remaining;
        setStatus('paused');
    };

    const resumeTimer = () => {
        endTimeRef.current = performance.now() + pausedRemainingRef.current;
        setStatus('running');
        rafRef.current = requestAnimationFrame(tick);
    };

    const resetTimer = () => {
        cancelAnimationFrame(rafRef.current);
        stopRingtone();
        setStatus('idle');
        setRemaining(0);
        setTotalDuration(0);
    };

    const handlePreset = (seconds) => {
        cancelAnimationFrame(rafRef.current);
        stopRingtone();
        setInputHrs(0);
        setInputMins(Math.floor(seconds / 60));
        setInputSecs(seconds % 60);
        startTimer(seconds);
    };

    const { hrs, mins, secs, cs } = formatCountdown(remaining);
    const progress = totalDuration > 0 ? remaining / totalDuration : 0;
    const circumference = 2 * Math.PI * 120;
    const isIdle = status === 'idle';
    const isFinished = status === 'finished';

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-slide-up">
            {/* Title */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3">
                    <div className="p-2.5 glass rounded-xl glow-amber border border-amber-500/15">
                        <Hourglass className="text-amber-400" size={20} />
                    </div>
                    <div className="text-left">
                        <h2 className="text-xl font-extrabold bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 bg-clip-text text-transparent">Timer</h2>
                        <p className="text-slate-600 text-[10px] font-bold tracking-[0.15em] uppercase">Set a duration and count down</p>
                    </div>
                </div>
            </div>

            {/* --- IDLE: Input Mode --- */}
            {isIdle && (
                <>
                    <div className="flex items-center justify-center gap-4 mb-8">
                        {[
                            { label: 'HRS', value: inputHrs, set: setInputHrs, max: 23 },
                            { label: 'MIN', value: inputMins, set: setInputMins, max: 59 },
                            { label: 'SEC', value: inputSecs, set: setInputSecs, max: 59 },
                        ].map(({ label, value, set, max }) => (
                            <div key={label} className="flex flex-col items-center gap-1">
                                <button
                                    onClick={() => set(v => Math.min(v + 1, max))}
                                    className="text-slate-600 hover:text-amber-400 transition-colors text-xs p-1"
                                >▲</button>
                                <input
                                    type="number"
                                    min={0}
                                    max={max}
                                    value={value}
                                    onChange={e => set(Math.min(Math.max(0, parseInt(e.target.value) || 0), max))}
                                    className="w-20 text-center text-3xl font-display font-extrabold glass rounded-xl text-white py-3 border-white/[0.06] focus:border-amber-500/25 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                />
                                <button
                                    onClick={() => set(v => Math.max(v - 1, 0))}
                                    className="text-slate-600 hover:text-amber-400 transition-colors text-xs p-1"
                                >▼</button>
                                <span className="text-[9px] text-slate-600 font-bold tracking-[0.2em]">{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Presets */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {PRESETS.map(p => (
                            <button
                                key={p.seconds}
                                onClick={() => handlePreset(p.seconds)}
                                className="px-5 py-2 glass rounded-xl text-[10px] font-bold text-slate-500 hover:text-amber-400 hover:border-amber-500/25 transition-all duration-300 tracking-[0.15em] card-hover-lift"
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>

                    {/* Start Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => startTimer()}
                            disabled={inputHrs === 0 && inputMins === 0 && inputSecs === 0}
                            className="flex items-center gap-2.5 px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-2xl text-sm shadow-2xl shadow-amber-500/15 transition-all duration-300 hover:scale-[1.03] disabled:opacity-15 disabled:cursor-not-allowed disabled:hover:scale-100 tracking-wide"
                        >
                            <Play size={20} />
                            Start Timer
                        </button>
                    </div>
                </>
            )}

            {/* --- RUNNING / PAUSED / FINISHED --- */}
            {!isIdle && (
                <>
                    <div className="flex justify-center mb-10">
                        <div className="relative">
                            <svg width="280" height="280" viewBox="0 0 280 280" className="rotate-[-90deg]"
                                style={{
                                    filter: isFinished
                                        ? 'drop-shadow(0 0 20px rgba(244, 63, 94, 0.4))'
                                        : status === 'running'
                                            ? 'drop-shadow(0 0 12px rgba(245, 158, 11, 0.3))'
                                            : 'none',
                                    transition: 'filter 0.5s'
                                }}>
                                <circle cx="140" cy="140" r="120" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                <circle
                                    cx="140" cy="140" r="120"
                                    fill="none"
                                    stroke={isFinished ? 'url(#finishedGradient)' : 'url(#timerGradient)'}
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference * (1 - progress)}
                                    style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                                />
                                <defs>
                                    <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#f59e0b" />
                                        <stop offset="50%" stopColor="#f97316" />
                                        <stop offset="100%" stopColor="#ef4444" />
                                    </linearGradient>
                                    <linearGradient id="finishedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#f43f5e" />
                                        <stop offset="100%" stopColor="#ef4444" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                {isFinished ? (
                                    <>
                                        <div className="text-5xl mb-2 animate-scale-bounce">🔔</div>
                                        <div className="text-2xl font-extrabold neon-text-rose tracking-tight animate-glow-pulse">Time's Up!</div>
                                    </>
                                ) : (
                                    <>
                                        <div className="font-display text-5xl font-extrabold text-white tracking-tight">
                                            {hrs}:{mins}:{secs}
                                        </div>
                                        <div className="font-display text-xl text-slate-600 mt-1 font-light">.{cs}</div>
                                        <div className={`mt-3 text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1 rounded-full glass ${status === 'running'
                                            ? 'neon-text-mint border-emerald-500/20'
                                            : 'neon-text-gold border-amber-500/20'
                                            }`}>
                                            {status === 'running' ? '● Running' : '❚❚ Paused'}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-center gap-5">
                        {!isFinished && (
                            <button
                                onClick={status === 'running' ? pauseTimer : resumeTimer}
                                className={`flex flex-col items-center gap-1.5 w-24 h-24 rounded-2xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-[1.05] ${status === 'running'
                                    ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/20'
                                    : 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-emerald-500/20'
                                    }`}
                            >
                                {status === 'running'
                                    ? <Pause size={26} className="mt-4" />
                                    : <Play size={26} className="mt-4" />
                                }
                                <span className="text-[9px] font-bold tracking-[0.2em]">{status === 'running' ? 'PAUSE' : 'RESUME'}</span>
                            </button>
                        )}
                        <button
                            onClick={resetTimer}
                            className="flex flex-col items-center gap-1.5 w-18 h-18 p-4 rounded-2xl glass transition-all duration-300 text-slate-500 hover:text-red-400 hover:glow-red hover:border-red-500/20"
                        >
                            <RotateCcw size={18} />
                            <span className="text-[9px] font-bold tracking-[0.2em]">RESET</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CountdownTimer;
