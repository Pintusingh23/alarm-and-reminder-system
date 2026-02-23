import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Hourglass } from 'lucide-react';
import { playRingtone, stopRingtone } from './ringtones';

const PRESETS = [
  { label: '1 min', seconds: 60 },
  { label: '5 min', seconds: 300 },
  { label: '10 min', seconds: 600 },
  { label: '15 min', seconds: 900 },
  { label: '30 min', seconds: 1800 },
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
  // Input state (seconds-based for easy preset injection)
  const [inputHrs, setInputHrs] = useState(0);
  const [inputMins, setInputMins] = useState(5);
  const [inputSecs, setInputSecs] = useState(0);

  // Timer state
  const [status, setStatus] = useState('idle'); // idle | running | paused | finished
  const [remaining, setRemaining] = useState(0); // ms remaining
  const [totalDuration, setTotalDuration] = useState(0); // ms total for progress ring

  const endTimeRef = useRef(null);
  const rafRef = useRef(null);
  const pausedRemainingRef = useRef(0);

  // --- Tick loop ---
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      stopRingtone();
    };
  }, []);

  // --- Actions ---
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

  // --- Derived values ---
  const { hrs, mins, secs, cs } = formatCountdown(remaining);
  const progress = totalDuration > 0 ? remaining / totalDuration : 0;
  const circumference = 2 * Math.PI * 120;
  const isIdle = status === 'idle';
  const isFinished = status === 'finished';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <Hourglass className="text-amber-400" size={28} />
          Countdown Timer
        </h2>
        <p className="text-slate-400 text-sm mt-1">Set a duration and count down</p>
      </div>

      {/* --- IDLE: Input Mode --- */}
      {isIdle && (
        <>
          {/* Time Inputs */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {[
              { label: 'HRS', value: inputHrs, set: setInputHrs, max: 23 },
              { label: 'MIN', value: inputMins, set: setInputMins, max: 59 },
              { label: 'SEC', value: inputSecs, set: setInputSecs, max: 59 },
            ].map(({ label, value, set, max }, idx) => (
              <div key={label} className="flex flex-col items-center">
                <button
                  onClick={() => set(v => Math.min(v + 1, max))}
                  className="text-slate-400 hover:text-white transition-colors mb-1"
                >
                  ▲
                </button>
                <input
                  type="number"
                  min={0}
                  max={max}
                  value={value}
                  onChange={e => set(Math.min(Math.max(0, parseInt(e.target.value) || 0), max))}
                  className="w-20 text-center text-4xl font-mono font-bold bg-slate-800 border border-slate-600 rounded-xl text-white py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                  onClick={() => set(v => Math.max(v - 1, 0))}
                  className="text-slate-400 hover:text-white transition-colors mt-1"
                >
                  ▼
                </button>
                <span className="text-xs text-slate-500 font-semibold tracking-widest mt-1">{label}</span>
                {idx < 2 && (
                  <span className="absolute text-3xl text-slate-600 font-bold" style={{ marginLeft: '7.5rem' }}>:</span>
                )}
              </div>
            ))}
          </div>

          {/* Presets */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {PRESETS.map(p => (
              <button
                key={p.seconds}
                onClick={() => handlePreset(p.seconds)}
                className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-xl text-sm font-semibold text-slate-300 hover:border-amber-500 hover:text-amber-400 transition-all"
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
              className="flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold rounded-2xl text-lg shadow-lg transition-all transform hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Play size={22} />
              Start Timer
            </button>
          </div>
        </>
      )}

      {/* --- RUNNING / PAUSED / FINISHED: Countdown Mode --- */}
      {!isIdle && (
        <>
          {/* Countdown Ring */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <svg width="280" height="280" viewBox="0 0 280 280" className="rotate-[-90deg]">
                {/* Track */}
                <circle cx="140" cy="140" r="120" fill="none" stroke="#1e293b" strokeWidth="12" />
                {/* Progress arc */}
                <circle
                  cx="140" cy="140" r="120"
                  fill="none"
                  stroke={isFinished ? 'url(#finishedGradient)' : 'url(#timerGradient)'}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                />
                <defs>
                  <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="finishedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Time display in center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {isFinished ? (
                  <>
                    <div className="text-5xl mb-2 animate-bounce">🔔</div>
                    <div className="text-2xl font-bold text-red-400 animate-pulse">Time's Up!</div>
                  </>
                ) : (
                  <>
                    <div className="font-mono text-5xl font-bold text-white tracking-tight">
                      {hrs}:{mins}:{secs}
                    </div>
                    <div className="font-mono text-2xl text-slate-400 mt-1">.{cs}</div>
                    <div className={`mt-2 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${
                      status === 'running'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {status === 'running' ? 'Running' : 'Paused'}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            {!isFinished && (
              <button
                onClick={status === 'running' ? pauseTimer : resumeTimer}
                className={`flex flex-col items-center gap-1 w-24 h-24 rounded-full border-2 font-bold text-white shadow-lg transition-all ${
                  status === 'running'
                    ? 'bg-yellow-500 border-yellow-400 hover:bg-yellow-400'
                    : 'bg-green-600 border-green-500 hover:bg-green-500'
                }`}
              >
                {status === 'running'
                  ? <Pause size={28} className="mt-5" />
                  : <Play size={28} className="mt-5" />
                }
                <span className="text-xs font-semibold">{status === 'running' ? 'Pause' : 'Resume'}</span>
              </button>
            )}
            <button
              onClick={resetTimer}
              className="flex flex-col items-center gap-1 w-20 h-20 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:border-red-500 hover:text-red-400 transition-all"
            >
              <RotateCcw size={20} className="mt-4" />
              <span className="text-xs font-semibold">Reset</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
