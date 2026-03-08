import { useState, useEffect, useCallback } from 'react';
import { Atom, AlertTriangle, Clock, Zap, Shield, ChevronRight, RotateCcw, FlaskConical } from 'lucide-react';
import Planet3D from './components/Planet3D';
import { computeAstronomy } from './lib/astronomy';
import { generateAlignment } from './lib/fortune';
import { getRandomMineral } from './data/minerals';
import type { AstronomyData, AlignmentResult, DataPoint } from './types';

// ─── Status dot ───────────────────────────────────────────────────────────────
function StatusDot({ status }: { status: DataPoint['status'] }) {
  const colors = {
    nominal: 'bg-emerald-400',
    elevated: 'bg-amber-400',
    critical: 'bg-red-400 animate-pulse',
  };
  return <span className={`inline-block w-2 h-2 rounded-full mr-2 ${colors[status]}`} />;
}

// ─── Alignment score ring ─────────────────────────────────────────────────────
function ScoreRing({ score }: { score: number }) {
  const r = 42;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  const color = score >= 80 ? '#34d399' : score >= 65 ? '#a78bfa' : '#f59e0b';

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="110" height="110" className="rotate-[-90deg]">
        <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
        <circle
          cx="55"
          cy="55"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ marginTop: '-82px' }}>
        <span className="text-2xl font-bold text-white">{score}</span>
        <span className="text-xs text-purple-300">/ 100</span>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [astro, setAstro] = useState<AstronomyData | null>(null);
  const [result, setResult] = useState<AlignmentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [computing, setComputing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setAstro(computeAstronomy());
    } catch (e) {
      setError('Astronomical sensor array offline. Please refresh.');
      console.error(e);
    }
  }, []);

  const handleGetAlignment = useCallback(async () => {
    if (!astro) return;
    setLoading(true);
    setComputing(true);
    setResult(null);

    // Artificial "calculating" delay for drama
    await new Promise((r) => setTimeout(r, 2800));

    const mineral = getRandomMineral();
    const alignment = generateAlignment(mineral, astro);
    setResult(alignment);
    setLoading(false);
    setTimeout(() => setComputing(false), 400);
  }, [astro]);

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#050510] text-slate-100 overflow-x-hidden">
      {/* Starfield bg overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 20%, rgba(124,58,237,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(6,182,212,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Atom className="w-5 h-5 text-purple-400" />
            <span className="text-xs tracking-[0.3em] text-purple-400 uppercase font-mono">
              Scientific Alignment Engine v2.4.1
            </span>
            <Atom className="w-5 h-5 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 shimmer-text">
            COSMIC MINERAL
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Real-time astronomical ephemeris data correlated with verified crystallographic
            properties to generate your personal planetary-mineral alignment report.
          </p>
        </header>

        {/* Planet */}
        <div className="animate-float">
          <Planet3D active={computing} />
        </div>

        {/* Live Astronomical Readings */}
        {astro && !result && (
          <div className="cosmic-card rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">
                Live Sensor Feed
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm font-mono">
              <div className="space-y-1">
                <div className="text-purple-300 text-xs uppercase tracking-wider">Mercury</div>
                <div className={`text-base font-bold ${astro.mercury.retrograde ? 'text-red-400' : 'text-emerald-400'}`}>
                  {astro.mercury.retrograde ? '⚠ RETROGRADE' : '✓ DIRECT'}
                </div>
                <div className="text-slate-400 text-xs">
                  {astro.mercury.velocity > 0 ? '+' : ''}{astro.mercury.velocity.toFixed(3)}°/day
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-purple-300 text-xs uppercase tracking-wider">Moon Phase</div>
                <div className="text-base font-bold text-cyan-300">
                  {astro.moon.phaseEmoji} {astro.moon.phaseName}
                </div>
                <div className="text-slate-400 text-xs">{astro.moon.illumination}% illuminated</div>
              </div>
              <div className="space-y-1">
                <div className="text-purple-300 text-xs uppercase tracking-wider">Venus</div>
                <div className="text-base font-bold text-amber-300">
                  mag {astro.venus.magnitude}
                </div>
                <div className="text-slate-400 text-xs">{astro.venus.distance} AU</div>
              </div>
              <div className="space-y-1">
                <div className="text-purple-300 text-xs uppercase tracking-wider">Mars</div>
                <div className="text-base font-bold text-red-300">
                  mag {astro.mars.magnitude}
                </div>
                <div className="text-slate-400 text-xs">{astro.mars.distance} AU</div>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="cosmic-card rounded-xl p-4 mb-6 border-red-500/30 bg-red-950/20">
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* CTA Button */}
        {!result && (
          <button
            onClick={handleGetAlignment}
            disabled={loading || !astro}
            className="w-full py-5 px-8 rounded-2xl text-white font-bold text-lg tracking-wide transition-all duration-300 mb-6 relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            style={{
              background: loading
                ? 'linear-gradient(135deg, #4c1d95, #1e3a5f)'
                : 'linear-gradient(135deg, #7c3aed, #0e7490)',
              boxShadow: loading
                ? '0 0 40px rgba(124,58,237,0.3)'
                : '0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(124,58,237,0.2)',
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <FlaskConical className="w-5 h-5 animate-spin" />
                <span className="font-mono tracking-widest text-sm">
                  COMPUTING CRYSTALLOGRAPHIC ALIGNMENT...
                </span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                GET MY SCIENTIFIC ALIGNMENT
                <ChevronRight className="w-5 h-5" />
              </span>
            )}

            {/* Scanning animation */}
            {loading && (
              <div
                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
                style={{
                  animation: 'scan-line 1.5s linear infinite',
                }}
              />
            )}
          </button>
        )}

        {/* Result Card */}
        {result && (
          <div className="space-y-4 mb-6">
            {/* Report header */}
            <div className="cosmic-card rounded-xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-1">
                    Alignment Report
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {result.mineral.emoji} {result.mineral.name}
                  </h2>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">
                    {result.mineral.formula} · Mohs {result.mineral.mohs}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-purple-400 mb-1">Alignment Score</div>
                  <div
                    className="text-4xl font-black"
                    style={{
                      color:
                        result.alignment_score >= 80
                          ? '#34d399'
                          : result.alignment_score >= 65
                          ? '#a78bfa'
                          : '#f59e0b',
                    }}
                  >
                    {result.alignment_score}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">/ 100</div>
                </div>
              </div>

              {/* Primary influence badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-4"
                style={{
                  background: 'rgba(124,58,237,0.2)',
                  border: '1px solid rgba(124,58,237,0.4)',
                  color: '#c4b5fd',
                }}>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse inline-block" />
                Primary Influence: {result.primary_influence}
              </div>

              {/* Fortune text */}
              <div className="space-y-3">
                {result.fortune_text.split('\n\n').map((para, i) => (
                  <p key={i} className="text-slate-300 text-sm leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Data readout */}
            <div className="cosmic-card rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                  Sensor Telemetry
                </span>
              </div>
              <div className="space-y-2">
                {result.data_points.map((dp, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center">
                      <StatusDot status={dp.status} />
                      {dp.label}
                    </span>
                    <span className="font-mono text-cyan-300 text-xs">{dp.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between text-sm pt-1 border-t border-white/5">
                  <span className="text-slate-400">Mineral Resonance Frequency</span>
                  <span className="font-mono text-cyan-300 text-xs">{result.mineral_resonance_hz} Hz</span>
                </div>
              </div>
            </div>

            {/* Protocol */}
            <div className="cosmic-card rounded-xl p-5"
              style={{ borderColor: 'rgba(52,211,153,0.3)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">
                  Recommended Protocol
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{result.protocol}</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-slate-500 font-mono">
                <Clock className="w-3 h-3" />
                Optimal window: {result.optimal_window_hours}h from now
              </div>
            </div>

            {/* Warning */}
            <div className="cosmic-card rounded-xl p-5"
              style={{ borderColor: 'rgba(251,191,36,0.3)', background: 'rgba(120,53,15,0.15)' }}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono text-amber-400 tracking-widest uppercase">
                  Caution Advisory
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{result.warning}</p>
            </div>

            {/* Scientific disclaimer */}
            <div className="text-center text-xs text-slate-600 font-mono px-4 leading-relaxed">
              Astronomical data computed via real-time ephemeris calculations. Mineral properties
              sourced from verified crystallographic databases. Interpretive correlations are
              speculative and provided for entertainment purposes only.
            </div>

            {/* New alignment button */}
            <button
              onClick={handleReset}
              className="w-full py-3 px-6 rounded-xl text-purple-300 font-mono text-sm tracking-wider border border-purple-800 hover:border-purple-600 hover:text-purple-200 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              RECALIBRATE ALIGNMENT
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-xs text-slate-700 font-mono pb-4">
          COSMIC MINERAL ENGINE · EPHEMERIS BUILD 2025.3 · ALL INTERPRETATIONS SPECULATIVE
        </footer>
      </div>
    </div>
  );
}
