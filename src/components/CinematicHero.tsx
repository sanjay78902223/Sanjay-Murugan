import React, { useRef, useState, useEffect } from 'react';
import { CubeCanvas } from './CubeCanvas';
import { clamp, mapRange, calculateCubeState } from '../utils/scrollMath';
import { ChevronDown, Cpu, Layers, ArrowUpRight } from 'lucide-react';

interface CinematicHeroProps {
  onExploreClick: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onExploreClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = clamp(currentScroll / totalScrollable, 0, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const p = scrollProgress;
  const cubeState = calculateCubeState(p);

  // Stage A (Hero): 0.0 - 0.22
  const heroOpacity = clamp(mapRange(p, 0.0, 0.18, 1, 0));
  const heroScale = mapRange(p, 0.0, 0.22, 1, 1.15);
  const heroTranslateY = mapRange(p, 0.0, 0.22, 0, -80);

  // Stage B (Kinetic Typography): 0.16 - 0.52
  const kineticOpacity = p < 0.16 ? 0 : p > 0.52 ? clamp(mapRange(p, 0.52, 0.60, 1, 0)) : 1;

  // Kinetic directional transforms tied to scroll (responsively constrained on mobile)
  const maxWordOffset = isMobile ? 60 : 350;

  // 1. Enter from Left
  const leftWordX = mapRange(p, 0.16, 0.38, -maxWordOffset, 0);
  const leftWordOpacity = clamp(mapRange(p, 0.16, 0.30, 0, 1));

  // 2. Enter from Right
  const rightWordX = mapRange(p, 0.18, 0.40, maxWordOffset, 0);
  const rightWordOpacity = clamp(mapRange(p, 0.18, 0.32, 0, 1));

  // 3. Rise from Below
  const bottomWordY = mapRange(p, 0.22, 0.44, isMobile ? 60 : 180, 0);
  const bottomWordOpacity = clamp(mapRange(p, 0.22, 0.36, 0, 1));

  // 4. Approach from Foreground (3D Scale & perspective push)
  const foregroundScale = mapRange(p, 0.26, 0.48, 0.6, isMobile ? 1.02 : 1.25);
  const foregroundZ = mapRange(p, 0.26, 0.48, isMobile ? -60 : -200, isMobile ? 15 : 50);
  const foregroundOpacity = clamp(mapRange(p, 0.26, 0.36, 0, 1));

  // Stage C (3D Cube details & Phase HUD): 0.45 - 0.94
  const cubeHudOpacity = p < 0.42 ? 0 : p > 0.90 ? clamp(mapRange(p, 0.90, 0.96, 1, 0)) : 1;

  const phases = [
    { title: 'Core Initialization', desc: 'Materializing faceted architecture' },
    { title: 'Multi-Axis Rotation', desc: 'Continuous pitch, yaw & orbital telemetry' },
    { title: 'Perspective Expansion', desc: 'Focal depth magnification & alignment' },
    { title: 'System Handover', desc: 'Deploying operational automation engine' },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-full h-[460vh] bg-[#05070d] overflow-x-clip"
      id="cinematic-stage"
    >
      {/* Sticky Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full max-w-full overflow-hidden flex flex-col justify-between items-center select-none">
        
        {/* Subtle Background Gradients & Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-full">
          {/* Radial Top Glow */}
          <div
            className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[500px] sm:w-[900px] h-[350px] sm:h-[600px] bg-gradient-to-b from-blue-600/15 via-cyan-500/10 to-transparent blur-3xl opacity-75"
            style={{
              transform: `translate(-50%, ${p * 60}px) scale(${1 + p * 0.4})`,
            }}
          />
          {/* Subtle Cyber Grid */}
          <div
            className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#00f0ff_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff_1px,transparent_1px)] bg-[size:4rem_4rem]"
            style={{
              transform: `translateY(${p * 80}px)`,
            }}
          />
        </div>

        {/* 3D WebGL Cube Canvas Layer */}
        <CubeCanvas progress={p} />

        {/* ================= STAGE A: FULL-SCREEN HERO ================= */}
        <div
          className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 pt-16 sm:pt-20 max-w-5xl mx-auto w-full transition-opacity duration-200"
          style={{
            opacity: heroOpacity,
            transform: `scale(${heroScale}) translateY(${heroTranslateY}px)`,
            display: heroOpacity <= 0.01 ? 'none' : 'flex',
          }}
        >
          {/* Friendly, Welcoming Subtitle Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm shadow-[0_0_20px_rgba(0,240,255,0.12)] max-w-[92vw]">
            <span className="text-cyan-400 text-sm shrink-0">✨</span>
            <span className="truncate">Friendly AI automation for institutes &amp; businesses</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-5 leading-[1.08] font-display">
            Automate Smarter.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Grow Faster.
            </span>
          </h1>

          {/* Value Proposition Description */}
          <p className="max-w-2xl text-sm sm:text-lg md:text-xl text-slate-300 mb-8 sm:mb-10 leading-relaxed font-light px-2">
            We build autonomous AI voice agents, WhatsApp enquiry workflows, and intelligent lead conversion systems tailored for coaching institutes and small businesses.
          </p>

          {/* Primary CTA and Interactive Scroll Hint */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-7 sm:px-8 py-3 sm:py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm sm:text-base hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Services</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <span className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
              <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
              <span>Scroll down to initiate sequence</span>
            </span>
          </div>
        </div>

        {/* ================= STAGE B: KINETIC TYPOGRAPHY ================= */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6 perspective-1000 transform-style-3d max-w-full overflow-hidden"
          style={{
            opacity: kineticOpacity,
            display: kineticOpacity <= 0.01 ? 'none' : 'flex',
          }}
        >
          {/* Top Label */}
          <div
            className="mb-4 sm:mb-6 text-xs sm:text-sm font-mono tracking-widest text-cyan-400/90 uppercase text-center"
            style={{
              transform: `translateY(${mapRange(p, 0.16, 0.40, -40, 0)}px)`,
              opacity: clamp(mapRange(p, 0.16, 0.30, 0, 1)),
            }}
          >
            <span>[ Engineered for Real-World Growth ]</span>
          </div>

          {/* Row 1: Word entering from LEFT */}
          <div
            className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white/95 uppercase font-display text-center mb-2 px-2 max-w-full"
            style={{
              transform: `translateX(${leftWordX}px) rotateZ(${mapRange(p, 0.16, 0.38, -4, 0)}deg)`,
              opacity: leftWordOpacity,
            }}
          >
            Autonomous <span className="text-cyan-400">AI Voice</span> Agents
          </div>

          {/* Row 2: Word entering from RIGHT */}
          <div
            className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-slate-200 uppercase font-display text-center mb-2 px-2 max-w-full"
            style={{
              transform: `translateX(${rightWordX}px) rotateZ(${mapRange(p, 0.18, 0.40, 4, 0)}deg)`,
              opacity: rightWordOpacity,
            }}
          >
            Instant <span className="text-blue-400">WhatsApp</span> Workflows
          </div>

          {/* Row 3: Element approaching from FOREGROUND with perspective & scale */}
          <div
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase font-display text-center mb-3 px-2 max-w-full"
            style={{
              transform: `translateZ(${foregroundZ}px) scale(${foregroundScale})`,
              opacity: foregroundOpacity,
            }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">
              Zero Dropped Leads
            </span>
          </div>

          {/* Row 4: Element rising from BELOW */}
          <div
            className="text-xs sm:text-lg md:text-2xl font-medium tracking-wide text-slate-300 font-sans max-w-2xl text-center mt-3 px-4"
            style={{
              transform: `translateY(${bottomWordY}px)`,
              opacity: bottomWordOpacity,
            }}
          >
            Converting student enquiries and client follow-ups 24 hours a day, 7 days a week.
          </div>
        </div>

        {/* ================= STAGE C: 3D CUBE TELEMETRY & PHASE OVERLAYS ================= */}
        <div
          className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 sm:p-8 max-w-full overflow-hidden"
          style={{
            opacity: cubeHudOpacity,
            display: cubeHudOpacity <= 0.01 ? 'none' : 'flex',
          }}
        >
          {/* Top Row: 3D Inspection Badge & Progress Counter */}
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin-slow" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] sm:text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold truncate">
                  Saan Code n Convert
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 truncate">
                  Phase: {cubeState.phaseLabel}
                </div>
              </div>
            </div>

            {/* Top Right: Scroll Progress Counter */}
            <div className="text-right shrink-0">
              <div className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider">
                Progress
              </div>
              <div className="text-xl sm:text-3xl font-mono font-bold text-cyan-400 tabular-nums">
                {(p * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Center Flank Callouts (Desktop only, so mobile cube has 100% centered focus without side gaps) */}
          <div className="w-full hidden md:flex items-center justify-between px-6">
            <div
              className="max-w-xs text-left"
              style={{
                opacity: clamp(mapRange(p, 0.50, 0.70, 0, 1)),
                transform: `translateX(${mapRange(p, 0.50, 0.70, -30, 0)}px)`,
              }}
            >
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                Multi-Axis Kinematics
              </div>
              <div className="text-sm text-slate-300 leading-snug">
                X: {(cubeState.rotX % (Math.PI * 2)).toFixed(2)} rad · Y: {(cubeState.rotY % (Math.PI * 2)).toFixed(2)} rad
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Dynamic continuous scroll scrubbing
              </div>
            </div>

            <div
              className="max-w-xs text-right"
              style={{
                opacity: clamp(mapRange(p, 0.65, 0.85, 0, 1)),
                transform: `translateX(${mapRange(p, 0.65, 0.85, 30, 0)}px)`,
              }}
            >
              <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1">
                Spatial Depth
              </div>
              <div className="text-sm text-slate-300 leading-snug">
                Scale: {cubeState.scale.toFixed(2)}x · Depth: {cubeState.positionZ.toFixed(1)}u
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Transitioning into service architecture
              </div>
            </div>
          </div>

          {/* Bottom Center: Stage Steps Bar (2x2 on mobile, 4 columns on desktop) */}
          <div className="max-w-xl mx-auto w-full px-2 sm:px-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 mb-2">
              {phases.map((phase, idx) => {
                const isActive = cubeState.activeStageIndex === idx + 1;
                const isPast = cubeState.activeStageIndex > idx + 1;
                return (
                  <div
                    key={idx}
                    className={`p-1.5 sm:p-2 rounded border transition-all duration-300 ${
                      isActive
                        ? 'border-cyan-400 bg-cyan-950/60 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                        : isPast
                        ? 'border-blue-900/60 bg-blue-950/20 text-slate-500'
                        : 'border-slate-800 bg-slate-900/40 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                      <span className={isActive ? 'text-cyan-300 font-bold' : ''}>0{idx + 1}</span>
                      {isActive && <span className="text-[9px] text-cyan-400 font-semibold">ACTIVE</span>}
                    </div>
                    <div className={`text-[11px] sm:text-xs font-medium truncate ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {phase.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Global Bottom Ticker / Transition Unlock Message */}
        <div className="relative z-30 w-full py-3 sm:py-4 px-4 sm:px-6 border-t border-slate-900 bg-slate-950/70 backdrop-blur-sm flex items-center justify-between text-[11px] sm:text-xs text-slate-400 font-mono max-w-full overflow-hidden">
          <div className="flex items-center gap-2 truncate max-w-[180px] sm:max-w-none">
            <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-slate-300 truncate">Saan Code n Convert Engine</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="hidden sm:inline text-slate-500">
              {p < 0.9 ? 'Scroll forward to advance · Backward to reverse' : 'Entering Core Services'}
            </span>
            <div className="w-16 sm:w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-75"
                style={{ width: `${p * 100}%` }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
