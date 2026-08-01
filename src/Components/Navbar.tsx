import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';
import { Menu, X, Music, VolumeX } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isLightOn, toggleTheme } = useTheme(); 
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bgMusicEnabled, setBgMusicEnabled] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false); // 📱 Small Screen Check
  const [pullAmount, setPullAmount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const musicTimerRef = useRef<number | null>(null);

  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const hasTriggeredRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  const REST_LENGTH = 95;
  const BEAD_COUNT = 10;
  const PULL_THRESHOLD = 30;

  // 📱 Detect Screen Size (Strictly Width Based)
  useEffect(() => {
    const checkScreenSize = () => {
      // 768px-க்கு குறைவாக இருந்தால் Small Screen / Mobile எனக் கருதுவோம்
      const small = window.innerWidth < 768;
      setIsSmallScreen(small);
      if (small) {
        stopBackgroundMusic(); // Small screen-ல் BGM ஆட்டோமேட்டிக்காக நிறுத்தப்படும்
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
  };

  // 🎹 Synth Piano Note Generator
  const playSynthNote = (freq: number, duration: number = 0.3) => {
    const ctx = audioCtxRef.current;
    if (!ctx || !isPlayingRef.current) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  };

  // 🎵 Coldplay - "A Sky Full of Stars" Melody Sequence
  const startSkyFullOfStarsBGM = () => {
    // Small Screens / Mobile-ல் BGM ஸ்டார்ட் ஆகாது!
    if (window.innerWidth < 768) return;

    initAudio();
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    setBgMusicEnabled(true);

    const B4 = 493.88, Csharp5 = 554.37, Dsharp5 = 622.25, Fsharp5 = 739.99, Gsharp5 = 830.61;

    const melody = [
      { note: Dsharp5, time: 0, duration: 0.35 },
      { note: Fsharp5, time: 300, duration: 0.35 },
      { note: Gsharp5, time: 600, duration: 0.4 },
      { note: Dsharp5, time: 1000, duration: 0.35 },
      { note: Fsharp5, time: 1300, duration: 0.35 },
      { note: Gsharp5, time: 1600, duration: 0.4 },
      
      { note: Csharp5, time: 2000, duration: 0.35 },
      { note: Dsharp5, time: 2300, duration: 0.35 },
      { note: Fsharp5, time: 2600, duration: 0.4 },
      { note: B4, time: 3000, duration: 0.35 },
      { note: Csharp5, time: 3300, duration: 0.35 },
      { note: Dsharp5, time: 3600, duration: 0.5 }
    ];

    const totalLoopTime = 4200;

    const runSequence = () => {
      if (!isPlayingRef.current) return;

      melody.forEach((item) => {
        window.setTimeout(() => {
          if (isPlayingRef.current) {
            playSynthNote(item.note, item.duration);
          }
        }, item.time);
      });

      musicTimerRef.current = window.setTimeout(() => {
        if (isPlayingRef.current) {
          runSequence();
        }
      }, totalLoopTime);
    };

    runSequence();
  };

  const stopBackgroundMusic = () => {
    isPlayingRef.current = false;
    if (musicTimerRef.current !== null) {
      clearTimeout(musicTimerRef.current);
    }
    setBgMusicEnabled(false);
  };

  useEffect(() => {
    if (isSmallScreen) return; // Small screen என்றால் interaction event-களை சேர்க்க வேண்டாம்

    const handleUserInteraction = () => {
      startSkyFullOfStarsBGM();
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('scroll', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    startSkyFullOfStarsBGM();

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, [isSmallScreen]);

  const toggleBackgroundMusic = () => {
    if (bgMusicEnabled) {
      stopBackgroundMusic();
    } else {
      startSkyFullOfStarsBGM();
    }
  };

  const playSound = (type: 'click' | 'release') => {
    if (!soundEnabled) return;
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + (type === 'click' ? 0.04 : 0.06));
  };

  const springRelease = (current: number) => {
    const pull = current * 0.65;
    if (pull < 0.5) {
      setPullAmount(0);
      setIsDragging(false);
    } else {
      setPullAmount(pull);
      animationFrameRef.current = requestAnimationFrame(() => springRelease(pull));
    }
  };

  const handleToggle = () => {
    toggleTheme();
    playSound('click');
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    startYRef.current = e.clientY;
    hasTriggeredRef.current = false;
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    initAudio();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaY = e.clientY - startYRef.current;
    if (deltaY > 0) {
      const cappedPull = Math.min(deltaY, 50);
      setPullAmount(cappedPull);

      if (cappedPull >= PULL_THRESHOLD && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        handleToggle();
      }
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (pullAmount < 10 && !hasTriggeredRef.current) {
      handleToggle();
    }

    playSound('release');
    springRelease(pullAmount);
  };

  const totalLength = REST_LENGTH + pullAmount;
  const beadSpacing = totalLength / BEAD_COUNT;
  const beads = Array.from({ length: BEAD_COUNT - 1 }, (_, i) => i + 1);

  return (
    <nav
      className={`w-full transition-colors duration-500 border-b relative z-50 px-4 sm:px-8 h-16 flex items-center justify-between overflow-visible ${
        isLightOn
          ? 'bg-white/90 border-slate-200 text-slate-900 shadow-sm backdrop-blur-md'
          : 'bg-[#0f172a]/90 border-slate-800 text-white shadow-md backdrop-blur-md'
      }`}
    >
      <style>{`
        @keyframes chainDance {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(4deg); }
          40% { transform: rotate(-3deg); }
          60% { transform: rotate(2deg); }
          80% { transform: rotate(-1deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-chain-dance {
          animation: chainDance 3s ease-in-out infinite;
          transform-origin: 20px 0px;
        }
      `}</style>

      {/* Brand Logo & Mobile Menu Icon */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Navigation"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <span className="font-extrabold text-lg sm:text-xl tracking-tight text-amber-500">
          Project<span className={isLightOn ? 'text-slate-900' : 'text-white'}>Site</span>
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-8 font-medium text-sm">
        <a href="/" className="hover:text-amber-500 transition-colors">Home</a>
        <a href="#categories" className="hover:text-amber-500 transition-colors">Categories</a>
        <a href="/projects" className="hover:text-amber-500 transition-colors">Projects</a>
        <a href="#payment" className="hover:text-amber-500 transition-colors">Payment</a>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 sm:gap-4 relative h-full">
        {/* 💻 Laptop/Desktop Only BGM Button (`!isSmallScreen`) */}
        {!isSmallScreen && (
          <button
            onClick={toggleBackgroundMusic}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition font-medium ${
              bgMusicEnabled
                ? 'bg-amber-500/20 border-amber-500 text-amber-500 animate-pulse'
                : isLightOn
                ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Toggle Sky Full of Stars BGM"
          >
            {bgMusicEnabled ? <Music className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{bgMusicEnabled ? '✨ Coldplay BGM' : '🎵 Music Off'}</span>
          </button>
        )}

        {/* UI Sound Button */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border transition font-medium ${
            isLightOn
              ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {soundEnabled ? '🔊 Sound' : '🔇 Mute'}
        </button>

        {/* Chain Container */}
        <div className="relative h-full flex items-center justify-center w-8 sm:w-10">
          <div className="absolute top-0 flex flex-col items-center z-10">
            <div className="w-7 sm:w-8 h-1 bg-slate-500 rounded-b-sm" />
            <div className="w-6 sm:w-7 h-3.5 bg-slate-700 rounded-b-lg relative flex justify-center items-center shadow-inner">
              <div
                className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full -bottom-1 absolute transition-all duration-300 ${
                  isLightOn
                    ? 'bg-amber-400 shadow-[0_0_12px_4px_rgba(251,191,36,0.9)]'
                    : 'bg-slate-600'
                }`}
              />
            </div>
          </div>

          <div
            className="absolute top-4 cursor-grab active:cursor-grabbing touch-none z-20"
            style={{ width: '40px', height: '160px' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            title="Drag down to toggle theme"
          >
            <svg className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffe87c" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#aa7c11" />
                </linearGradient>
              </defs>
              <g className={!isDragging ? 'animate-chain-dance' : ''}>
                <line x1="20" y1="0" x2="20" y2={totalLength} stroke="#94a3b8" strokeWidth="1.5" />
                {beads.map((i) => (
                  <circle
                    key={i}
                    cx="20"
                    cy={i * beadSpacing}
                    r="2.8"
                    fill="url(#goldGradient)"
                  />
                ))}
                <circle
                  cx="20"
                  cy={totalLength + 7}
                  r="8"
                  fill="none"
                  stroke="url(#goldGradient)"
                  strokeWidth="2.5"
                />
                <circle cx="20" cy={totalLength + 7} r="2.5" fill="url(#goldGradient)" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-16 left-0 w-full border-b shadow-xl py-4 px-6 flex flex-col gap-4 font-medium text-sm transition-all ${
          isLightOn
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-[#0f172a] border-slate-800 text-slate-100'
        }`}>
          <a href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500 py-1">Home</a>
          <a href="#categories" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500 py-1">Categories</a>
          <a href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500 py-1">Projects</a>
          <a href="#payment" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500 py-1">Payment</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;