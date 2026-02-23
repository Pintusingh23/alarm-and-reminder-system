// Ringtone definitions — all synthesized via Web Audio API (no files needed)
// Each ringtone also has a visual theme so the UI can feel
// sonically + visually consistent across the app.
export const RINGTONES = [
    { id: 'classic', label: '🔔 Classic Bell', emoji: '🔔' },
    { id: 'digital', label: '📱 Digital Beep', emoji: '📱' },
    { id: 'gentle', label: '🌙 Gentle Chime', emoji: '🎵' },
    { id: 'urgent', label: '🚨 Urgent Alert', emoji: '🚨' },
    { id: 'melody', label: '🎶 Dreamy Melody', emoji: '🎶' },
];

// Visual theme tokens for each ringtone — "Midnight Neon" palette.
// Each ringtone gets a unique neon color identity applied across
// cards, badges, modals, and glow effects.
export const RINGTONE_THEMES = {
    classic: {
        // Neon Gold — warm & timeless
        cardActive: 'glass-strong border-amber-400/60 text-amber-50 glow-amber',
        cardIdle: 'glass glass-hover text-amber-100/80 border border-amber-500/15 hover:border-amber-400/40',
        badge: 'bg-amber-500/12 text-amber-300 border border-amber-400/30',
        modalBorder: 'border-amber-400/70 shadow-[0_0_60px_rgba(251,191,36,0.35),0_0_120px_rgba(251,191,36,0.1)]',
        modalTitle: 'neon-text-gold',
        modalPill: 'bg-amber-500/12 text-amber-200 border border-amber-400/30',
        snoozeButton: 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20',
        stripColor: '#fbbf24',
        ringColor: '#fbbf24',
        bgTint: 'rgba(251, 191, 36, 0.03)',
    },
    digital: {
        // Neon Cyan — futuristic & electric
        cardActive: 'glass-strong border-cyan-400/60 text-cyan-50 glow-cyan',
        cardIdle: 'glass glass-hover text-cyan-100/80 border border-cyan-500/15 hover:border-cyan-400/40',
        badge: 'bg-cyan-500/12 text-cyan-300 border border-cyan-400/30',
        modalBorder: 'border-cyan-400/70 shadow-[0_0_60px_rgba(34,211,238,0.35),0_0_120px_rgba(34,211,238,0.1)]',
        modalTitle: 'neon-text-cyan',
        modalPill: 'bg-cyan-500/12 text-cyan-200 border border-cyan-400/30',
        snoozeButton: 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-cyan-500/20',
        stripColor: '#22d3ee',
        ringColor: '#22d3ee',
        bgTint: 'rgba(34, 211, 238, 0.03)',
    },
    gentle: {
        // Neon Violet — soft & dreamy
        cardActive: 'glass-strong border-purple-400/60 text-purple-50 glow-purple',
        cardIdle: 'glass glass-hover text-purple-100/80 border border-purple-500/15 hover:border-purple-400/40',
        badge: 'bg-purple-500/12 text-purple-300 border border-purple-400/30',
        modalBorder: 'border-purple-400/70 shadow-[0_0_60px_rgba(192,132,252,0.4),0_0_120px_rgba(192,132,252,0.12)]',
        modalTitle: 'neon-text-violet',
        modalPill: 'bg-purple-500/12 text-purple-200 border border-purple-400/30',
        snoozeButton: 'bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-400 hover:to-violet-400 text-slate-950 shadow-lg shadow-purple-500/20',
        stripColor: '#c084fc',
        ringColor: '#c084fc',
        bgTint: 'rgba(192, 132, 252, 0.03)',
    },
    urgent: {
        // Neon Rose — danger & urgency
        cardActive: 'glass-strong border-rose-400/60 text-rose-50 glow-rose',
        cardIdle: 'glass glass-hover text-rose-100/80 border border-rose-500/15 hover:border-rose-400/40',
        badge: 'bg-rose-500/12 text-rose-300 border border-rose-400/30',
        modalBorder: 'border-rose-400/70 shadow-[0_0_60px_rgba(244,63,94,0.4),0_0_120px_rgba(244,63,94,0.12)]',
        modalTitle: 'neon-text-rose',
        modalPill: 'bg-rose-500/12 text-rose-200 border border-rose-400/30',
        snoozeButton: 'bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-400 hover:to-red-400 text-slate-950 shadow-lg shadow-rose-500/20',
        stripColor: '#f43f5e',
        ringColor: '#f43f5e',
        bgTint: 'rgba(244, 63, 94, 0.03)',
    },
    melody: {
        // Neon Mint — soothing & melodic
        cardActive: 'glass-strong border-emerald-400/60 text-emerald-50 glow-emerald',
        cardIdle: 'glass glass-hover text-emerald-100/80 border border-emerald-500/15 hover:border-emerald-400/40',
        badge: 'bg-emerald-500/12 text-emerald-300 border border-emerald-400/30',
        modalBorder: 'border-emerald-400/70 shadow-[0_0_60px_rgba(52,211,153,0.35),0_0_120px_rgba(52,211,153,0.1)]',
        modalTitle: 'neon-text-mint',
        modalPill: 'bg-emerald-500/12 text-emerald-200 border border-emerald-400/30',
        snoozeButton: 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950 shadow-lg shadow-emerald-500/20',
        stripColor: '#34d399',
        ringColor: '#34d399',
        bgTint: 'rgba(52, 211, 153, 0.03)',
    },
};

// Shared AudioContext (created lazily)
let _ctx = null;
function getCtx() {
    if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
    return _ctx;
}

// Keep track of active oscillators so we can stop them
let _activeNodes = [];

export function stopRingtone() {
    _activeNodes.forEach(n => { try { n.stop(); } catch (_) { } });
    _activeNodes = [];
}

// Helpers
function tone(ctx, freq, startTime, duration, type = 'sine', gain = 0.4) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    g.gain.setValueAtTime(gain, startTime);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
    _activeNodes.push(osc);
}

// --- Individual ringtone players ---

function playClassic(ctx, t) {
    // 3 bell strikes
    [0, 0.5, 1.0].forEach(offset => {
        tone(ctx, 880, t + offset, 0.6, 'sine', 0.5);
        tone(ctx, 880 * 1.5, t + offset, 0.3, 'sine', 0.15);
    });
}

function playDigital(ctx, t) {
    // Classic 4-beep digital alarm
    const beepFreqs = [1200, 1400, 1200, 1400];
    beepFreqs.forEach((f, i) => tone(ctx, f, t + i * 0.25, 0.18, 'square', 0.3));
}

function playGentle(ctx, t) {
    // Ascending pentatonic chime
    const scale = [523, 659, 784, 1047, 1319];
    scale.forEach((f, i) => tone(ctx, f, t + i * 0.2, 0.5, 'sine', 0.35));
}

function playUrgent(ctx, t) {
    // Rapid alternating high-low siren
    for (let i = 0; i < 6; i++) {
        tone(ctx, i % 2 === 0 ? 1400 : 900, t + i * 0.15, 0.14, 'sawtooth', 0.4);
    }
}

function playMelody(ctx, t) {
    // Simple "Happy" melody pattern
    const notes = [523, 523, 587, 523, 698, 659];
    const durs = [0.2, 0.2, 0.3, 0.3, 0.3, 0.5];
    let time = t;
    notes.forEach((f, i) => {
        tone(ctx, f, time, durs[i], 'sine', 0.4);
        time += durs[i] + 0.05;
    });
}

const PLAYERS = {
    classic: playClassic,
    digital: playDigital,
    gentle: playGentle,
    urgent: playUrgent,
    melody: playMelody,
};

/**
 * Play the selected ringtone, looping every `interval` seconds until stopped.
 * @param {string} ringtoneId
 * @param {boolean} [loop=true]
 */
export function playRingtone(ringtoneId = 'classic', loop = true) {
    stopRingtone();
    const ctx = getCtx();
    const player = PLAYERS[ringtoneId] || PLAYERS.classic;

    // Approximate duration of each ringtone (seconds) before repeating
    const DURATIONS = { classic: 1.8, digital: 1.2, gentle: 1.4, urgent: 1.2, melody: 2.2 };
    const interval = (DURATIONS[ringtoneId] || 2) * 1000;

    player(ctx, ctx.currentTime);

    if (loop) {
        const timerId = setInterval(() => {
            const c = getCtx();
            PLAYERS[ringtoneId]?.(c, c.currentTime);
        }, interval);
        // Store timer id so stopRingtone can clear it
        _activeNodes.push({ stop: () => clearInterval(timerId) });
    }
}

/**
 * Preview a ringtone once (no loop).
 */
export function previewRingtone(ringtoneId = 'classic') {
    stopRingtone();
    const ctx = getCtx();
    const player = PLAYERS[ringtoneId] || PLAYERS.classic;
    player(ctx, ctx.currentTime);
}
