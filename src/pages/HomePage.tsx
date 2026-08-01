import Hero from '../Components/Hero';
import CategoryCards from '../Components/CategoryCards';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Award, Users, TrendingUp, Star, ChevronDown, ArrowUp } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext'; // Theme integration

export default function HomePage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Advanced Theme-Aware Interactive Canvas Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 40 : 75; // Mobile Performance Optimization

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      pulseSpeed: number;
      pulseOffset: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2.5 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
        
        // Dynamic Palette based on Theme
        const lightColors = ['#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4', '#6366F1'];
        const darkColors = ['#60A5FA', '#A78BFA', '#F472B6', '#22D3EE', '#818CF8'];
        const colors = isLight ? lightColors : darkColors;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(time: number) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size += Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.015;
        this.size = Math.max(0.8, Math.min(3.5, this.size));

        if (this.x < 0 || this.x > canvas!.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.speedY *= -1;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const pulse = Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity * pulse;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let glowIntensity = 0;

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      glowIntensity += (scrollProgress - glowIntensity) * 0.05;

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const opacity = (1 - dist / 120) * (isLight ? 0.12 : 0.18);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isLight ? '#8B5CF6' : '#A78BFA';
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Update & Draw Particles
      particles.forEach((p) => {
        p.update(time);
        p.draw(ctx, time);
      });

      // Scroll-triggered dynamic glow center
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.4
      );
      gradient.addColorStop(0, `rgba(139, 92, 246, ${0.06 * glowIntensity})`);
      gradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.04 * glowIntensity})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [scrollProgress, isLight]);

  // Scroll Progress Tracking & Throttling
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      setScrollProgress(progress);
      setIsVisible(scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Interactive Floating Progress Widgets
  const FloatingProgressCards = () => {
    const stats = [
      { icon: Users, label: 'Students', value: '500+', color: 'from-blue-500 to-indigo-600' },
      { icon: Award, label: 'Projects', value: '150+', color: 'from-purple-500 to-pink-600' },
      { icon: Star, label: 'Rating', value: '4.9★', color: 'from-amber-400 to-orange-500' },
      { icon: TrendingUp, label: 'Growth', value: '200%', color: 'from-emerald-400 to-teal-600' },
    ];

    const activeIndex = Math.min(Math.floor(scrollProgress * stats.length), stats.length - 1);

    return (
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
        <div className="flex flex-col gap-3.5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isActive = index === activeIndex;
            const isPassed = index < activeIndex;

            return (
              <div
                key={index}
                className={`
                  relative group transition-all duration-500 transform
                  ${isActive ? 'scale-110 translate-x-0' : 'scale-90 hover:scale-100 hover:translate-x-1'}
                  ${isPassed ? 'opacity-60' : 'opacity-100'}
                `}
              >
                <div
                  className={`
                    relative p-3 rounded-2xl backdrop-blur-md border transition-all duration-500 shadow-lg
                    ${
                      isActive
                        ? `bg-gradient-to-br ${stat.color} border-white/40 shadow-purple-500/30 ring-2 ring-purple-400/50`
                        : 'bg-white/70 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-1 min-w-[50px]">
                    <Icon
                      className={`
                        w-5 h-5 transition-all duration-500
                        ${isActive ? 'text-white scale-110 animate-bounce' : 'text-slate-500 dark:text-slate-400 group-hover:text-purple-500'}
                      `}
                    />
                    <span
                      className={`
                        text-xs font-black tracking-wide transition-all duration-300
                        ${isActive ? 'text-white' : 'text-slate-800 dark:text-slate-200'}
                      `}
                    >
                      {stat.value}
                    </span>
                    <span
                      className={`
                        text-[9px] font-semibold uppercase tracking-wider transition-all duration-300
                        ${isActive ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}
                      `}
                    >
                      {stat.label}
                    </span>
                  </div>

                  {/* Active Indicator Pulse Ring */}
                  {isActive && (
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-md -z-10 animate-pulse" />
                  )}
                </div>

                {/* Vertical Progress Line */}
                {index < stats.length - 1 && (
                  <div
                    className={`
                      w-0.5 h-3 mx-auto transition-all duration-500 rounded-full
                      ${isPassed ? 'bg-purple-500 shadow-sm' : 'bg-slate-300 dark:bg-slate-800'}
                    `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Top Neon Glow Scroll Progress Line
  const ProgressBar = () => (
    <div className="fixed left-0 top-0 z-50 w-full h-1 bg-slate-200/40 dark:bg-slate-800/40 backdrop-blur-xs">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(168,85,247,0.8)]"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );

  // Dynamic Scroll Indicator Badge
  const ScrollIndicator = () => (
    <div
      className={`
        fixed bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-700 transform
        ${isVisible ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}
      `}
    >
      <div className="relative flex flex-col items-center group cursor-pointer" onClick={() => window.scrollBy({ top: 400, behavior: 'smooth' })}>
        <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl group-hover:scale-105 transition-all duration-300">
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-spin-slow" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wide">
            Scroll to Explore
          </span>
          <ChevronDown className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-bounce" />
        </div>

        {/* Outer Pulsing Waves */}
        <div className="absolute -inset-2 rounded-full border border-purple-500/20 animate-ping -z-10" />
      </div>
    </div>
  );

  // Floating Micro Emojis Background Animation
  const FloatingElements = () => {
    const elements = ['✨', '🚀', '💻', '⚡', '🎯', '🌟', '🔥', '💡'];

    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {elements.map((el, i) => (
          <div
            key={i}
            className="absolute text-xl sm:text-2xl select-none animate-float hover:scale-125 transition-transform"
            style={{
              left: `${(i * 12 + 7) % 92}%`,
              top: `${(i * 15 + 10) % 85}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${12 + (i % 5) * 2}s`,
              opacity: isLight ? 0.25 : 0.15,
            }}
          >
            {el}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-hidden">
      
      {/* Dynamic Background Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Floating Animated Emojis */}
      <FloatingElements />

      {/* Top Progress Neon Line */}
      <ProgressBar />

      {/* Scroll Milestone Cards */}
      <FloatingProgressCards />

      {/* Main Page Content */}
      <main className="relative z-10">
        <Hero />
        <CategoryCards />
      </main>

      {/* Bottom Scroll Prompt */}
      <ScrollIndicator />

      {/* Back to Top Floating Action Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`
          fixed bottom-8 right-6 sm:right-8 z-40 p-3.5 rounded-2xl 
          bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white 
          shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 
          transition-all duration-500 hover:scale-110 active:scale-95 flex items-center justify-center
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        `}
      >
        <ArrowUp className="w-5 h-5 animate-pulse" />
      </button>

      {/* Glow Overlay At Bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-purple-500/10 via-purple-500/5 to-transparent pointer-events-none z-0" />
    </div>
  );
}