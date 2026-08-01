import { ArrowRight, Sparkles, Rocket, Zap, Code2, Brain, Cpu, X, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useTheme } from '../Context/ThemeContext'; // 🟢 Theme Hook Import

export default function Hero() {
  const { theme } = useTheme(); // 🟢 Get active theme state ('light' | 'dark')
  const isLight = theme === 'light';

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showPromo, setShowPromo] = useState(false);
  const [promoMessage, setPromoMessage] = useState({ icon: '', text: '', highlight: '' });

  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const promoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const promoMessages = useMemo(() => [
    { icon: '💻', highlight: 'OFFER', text: 'Student Discount: 30% OFF on AI & ML Projects!' },
    { icon: '🎓', highlight: 'AFFORDABLE', text: 'Final Year Projects starting at just ₹499!' },
    { icon: '🚀', highlight: 'READY CODE', text: 'Complete Source Code + PPT & Docs Included!' },
    { icon: '⚡', highlight: 'INSTANT', text: 'Get Instant Project Download & Setup Support!' },
    { icon: '🌟', highlight: 'TOP RATED', text: 'Trusted by 500+ Engineering & CS Students!' },
  ], []);

  useEffect(() => {
    const triggerPromo = () => {
      const randomMsg = promoMessages[Math.floor(Math.random() * promoMessages.length)];
      setPromoMessage(randomMsg);
      setShowPromo(true);

      if (promoTimeoutRef.current) clearTimeout(promoTimeoutRef.current);
      promoTimeoutRef.current = setTimeout(() => {
        setShowPromo(false);
      }, 4500);
    };

    const initialTimer = setTimeout(triggerPromo, 1500);
    const intervalTimer = setInterval(triggerPromo, isMobile ? 45000 : 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
      if (promoTimeoutRef.current) clearTimeout(promoTimeoutRef.current);
    };
  }, [promoMessages, isMobile]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCursorPos({ x, y });

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;
    setMousePosition({ x: normX, y: normY });
  }, []);

  // 🟢 Dynamic Canvas Particle Rendering Based on Theme
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const count = isMobile ? 35 : 85;
    const connectionRadius = isMobile ? 80 : 130;

    // Theme-based particle colors
    const colors = isLight
      ? ['#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4'] // Bright vibrant colors for Light mode
      : ['#60A5FA', '#A78BFA', '#F472B6', '#38BDF8']; // Soft glowing colors for Dark mode

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.4 : 0.8),
      vy: (Math.random() - 0.5) * (isMobile ? 0.4 : 0.8),
      size: Math.random() * (isMobile ? 2 : 3) + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = isLight ? p1.alpha * 0.6 : p1.alpha; // Slightly lower opacity in light mode
        ctx.fill();

        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionRadius) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = (1 - dist / connectionRadius) * (isLight ? 0.15 : 0.25);
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile, isLight]); // 🟢 Re-render canvas when theme changes

  const floatingIcons = useMemo(() => [
    { Icon: Code2, top: '20%', left: '10%', delay: '0s' },
    { Icon: Brain, top: '25%', right: '12%', delay: '1s' },
    { Icon: Cpu, top: '65%', left: '8%', delay: '2s' },
    { Icon: Rocket, top: '70%', right: '10%', delay: '1.5s' },
    { Icon: Zap, top: '45%', left: '4%', delay: '0.5s' },
    { Icon: Sparkles, top: '50%', right: '5%', delay: '2.5s' },
  ], []);

  const stats = useMemo(() => [
    { label: 'Completed Projects', value: '150+' },
    { label: 'Happy Students', value: '500+' },
    { label: 'Tech Stacks', value: '12+' },
    { label: 'Rating', value: '4.9 ★' },
  ], []);

  return (
    <section
      ref={heroRef}
      onPointerMove={handlePointerMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 selection:bg-purple-500 selection:text-white pt-20 pb-16"
    >
      {/* Dynamic Glow Based on Theme */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-70 dark:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${cursorPos.x}px ${cursorPos.y}px, ${
            isLight ? 'rgba(147, 51, 234, 0.08)' : 'rgba(139, 92, 246, 0.15)'
          }, ${
            isLight ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.08)'
          }, transparent 70%)`,
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500" />

      <div
        className="absolute top-1/4 -left-20 w-72 h-72 md:w-96 md:h-96 bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)` }}
      />
      <div
        className="absolute bottom-1/4 -right-20 w-72 h-72 md:w-96 md:h-96 bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[120px] pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: `translate(${-mousePosition.x * 25}px, ${-mousePosition.y * 25}px)` }}
      />

      {showPromo && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-lg transition-all duration-500 animate-in fade-in slide-in-from-top-4">
          <div className="relative backdrop-blur-xl bg-white/90 dark:bg-slate-900/80 border border-purple-500/30 rounded-2xl p-3.5 shadow-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xl shrink-0 shadow-lg shadow-purple-500/30">
              {promoMessage.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold tracking-wider bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-400/30 px-2 py-0.5 rounded-full uppercase">
                  {promoMessage.highlight}
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 font-medium truncate mt-0.5">
                {promoMessage.text}
              </p>
            </div>
            <button
              onClick={() => setShowPromo(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={16} />
            </button>

            <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-[shrink_4.5s_linear]" />
            </div>
          </div>
        </div>
      )}

      {!isMobile &&
        floatingIcons.map(({ Icon, top, left, right, delay }, idx) => (
          <div
            key={idx}
            className="absolute z-0 text-slate-400/40 dark:text-slate-700/40 hover:text-purple-500/40 dark:hover:text-purple-400/40 transition-colors duration-500 animate-pulse pointer-events-none"
            style={{
              top,
              left,
              right,
              animationDelay: delay,
              transform: `translate(${mousePosition.x * (10 + idx * 5)}px, ${mousePosition.y * (10 + idx * 5)}px)`,
            }}
          >
            <Icon size={38 + (idx % 3) * 8} />
          </div>
        ))}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 transition-all duration-300 shadow-inner mb-6 group cursor-pointer">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
          <span className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
            500+ Engineering & Tech Students Choice
          </span>
          <Sparkles className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400 group-hover:rotate-12 transition-transform" />
        </div>

        <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
            Final Year Projects
          </span>
          <br />
          <span className="text-slate-900 dark:text-white relative inline-block mt-1">
            Built For Excellence.
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-purple-500/40"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="4" fill="transparent" />
            </svg>
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 font-normal leading-relaxed mb-8">
          Get complete, verified <span className="text-slate-900 dark:text-slate-200 font-medium">AI, Machine Learning & Full-Stack</span> ready projects with clean source code, PPT presentation & step-by-step setup guides.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            to="/projects"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:to-pink-500 transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.3)] dark:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_45px_rgba(168,85,247,0.6)] hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            <span>Browse All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#categories"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 hover:bg-slate-200/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md flex items-center justify-center"
          >
            Explore Categories
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md hover:border-purple-500/40 hover:bg-white dark:hover:bg-slate-900/80 shadow-sm dark:shadow-none transition-all duration-300 text-center group"
            >
              <div className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white group-hover:scale-105 transition-transform bg-gradient-to-r from-slate-900 via-slate-700 to-purple-600 dark:from-white dark:via-slate-200 dark:to-purple-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>100% Tested Source Code</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            <span>Complete PPT & Synopsis</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-purple-500 dark:text-purple-400" />
            <span>Instant Access</span>
          </div>
        </div>
      </div>
    </section>
  );
}