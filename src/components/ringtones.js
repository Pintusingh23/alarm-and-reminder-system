// Ringtone definitions — all synthesized via Web Audio API (no files needed)
export const RINGTONES = [
    { id: 'classic', label: '🔔 Classic Bell', emoji: '🔔' },
    { id: 'digital', label: '📱 Digital Beep', emoji: '📱' },
    { id: 'gentle', label: '🎵 Gentle Chime', emoji: '🎵' },
    { id: 'urgent', label: '🚨 Urgent Alert', emoji: '🚨' },
    { id: 'melody', label: '🎶 Melody', emoji: '🎶' },
];

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
