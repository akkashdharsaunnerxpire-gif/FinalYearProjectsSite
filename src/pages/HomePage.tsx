import Hero from '../Components/Hero';
import CategoryCards from '../Components/CategoryCards';
import { useEffect, useRef, useState } from 'react';
import { Sparkles, Rocket, Zap, Award, Users, TrendingUp, Star, ChevronDown, ArrowUp } from 'lucide-react';

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  // Advanced particle system for background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Star particles
    const particles: any[] = [];
    const connections: any[] = [];

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
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
        const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4', '#F59E0B'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(time: number) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size += Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.02;
        this.size = Math.max(0.5, Math.min(4, this.size));

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const pulse = Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity * pulse;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    // Connection lines
    class Connection {
      p1: Particle;
      p2: Particle;
      maxDist: number;

      constructor(p1: Particle, p2: Particle) {
        this.p1 = p1;
        this.p2 = p2;
        this.maxDist = 150;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const dx = this.p1.x - this.p2.x;
        const dy = this.p1.y - this.p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.maxDist) {
          const opacity = (1 - dist / this.maxDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(this.p1.x, this.p1.y);
          ctx.lineTo(this.p2.x, this.p2.y);
          ctx.strokeStyle = '#8B5CF6';
          ctx.globalAlpha = opacity;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    // Create connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        connections.push(new Connection(particles[i], particles[j]));
      }
    }

    // Scroll-based glow effect
    let glowIntensity = 0;

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update glow intensity based on scroll
      glowIntensity += (scrollProgress - glowIntensity) * 0.02;

      // Draw connections
      connections.forEach(conn => conn.draw(ctx));

      // Draw particles
      particles.forEach(p => {
        p.update(time);
        p.draw(ctx, time);
      });

      // Draw central glow based on scroll
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.5
      );
      gradient.addColorStop(0, `rgba(139, 92, 246, ${0.05 * glowIntensity})`);
      gradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.03 * glowIntensity})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollProgress]);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      setScrollProgress(progress);
      setIsVisible(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating scroll indicator cards
  const FloatingProgressCards = () => {
    const stats = [
      { icon: Users, label: 'Students', value: '500+', color: 'from-blue-500 to-blue-600' },
      { icon: Award, label: 'Projects', value: '150+', color: 'from-purple-500 to-purple-600' },
      { icon: Star, label: 'Rating', value: '4.9★', color: 'from-yellow-500 to-yellow-600' },
      { icon: TrendingUp, label: 'Growth', value: '200%', color: 'from-green-500 to-green-600' },
    ];

    // Calculate which card is active based on scroll
    const activeIndex = Math.min(Math.floor(scrollProgress * stats.length), stats.length - 1);

    return (
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
        <div className="flex flex-col gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isActive = index === activeIndex;
            const isPassed = index < activeIndex;

            return (
              <div
                key={index}
                className={`
                  relative group transition-all duration-700
                  ${isActive ? 'scale-110' : 'scale-90'}
                  ${isPassed ? 'opacity-40' : 'opacity-100'}
                `}
              >
                <div className={`
                  relative p-3 rounded-xl backdrop-blur-sm border transition-all duration-500
                  ${isActive 
                    ? `bg-gradient-to-br ${stat.color} border-white/30 shadow-2xl shadow-purple-500/20` 
                    : 'bg-white/10 dark:bg-gray-900/40 border-white/10 hover:border-purple-500/30'
                  }
                `}>
                  <div className="flex flex-col items-center gap-1">
                    <Icon className={`
                      w-5 h-5 transition-all duration-500
                      ${isActive ? 'text-white scale-110' : 'text-gray-400 group-hover:text-purple-400'}
                    `} />
                    <span className={`
                      text-[10px] font-bold transition-all duration-500
                      ${isActive ? 'text-white' : 'text-gray-500'}
                    `}>
                      {stat.value}
                    </span>
                    <span className={`
                      text-[8px] font-medium transition-all duration-500
                      ${isActive ? 'text-white/80' : 'text-gray-400'}
                    `}>
                      {stat.label}
                    </span>
                  </div>

                  {/* Active glow */}
                  {isActive && (
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl animate-pulse"></div>
                  )}
                </div>

                {/* Connecting line */}
                {index < stats.length - 1 && (
                  <div className={`
                    w-0.5 h-2 mx-auto transition-all duration-700
                    ${isPassed ? 'bg-purple-500/50' : 'bg-gray-600/30'}
                  `}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Scroll progress bar with advanced animation
  const ProgressBar = () => {
    return (
      <div className="fixed left-0 top-0 z-50 w-1 h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent">
        <div 
          className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300"
          style={{ 
            height: `${scrollProgress * 100}%`,
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
          }}
        >
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50 animate-pulse"></div>
        </div>
      </div>
    );
  };

  // Animated scroll indicator
  const ScrollIndicator = () => {
    return (
      <div className={`
        fixed bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-700
        ${isVisible ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}
      `}>
        <div className="relative flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 dark:bg-gray-900/50 backdrop-blur-xl border border-white/10 shadow-2xl">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm font-medium text-white/80">Scroll to Explore</span>
            <ChevronDown className="w-4 h-4 text-purple-400 animate-bounce" />
          </div>
          
          {/* Animated rings */}
          <div className="absolute -inset-4 rounded-full border border-purple-500/20 animate-ping"></div>
          <div className="absolute -inset-8 rounded-full border border-purple-500/10 animate-ping animation-delay-500"></div>
        </div>
      </div>
    );
  };

  // Floating particles in background
  const FloatingElements = () => {
    const elements = ['✨', '🚀', '💻', '⚡', '🎯', '🌟', '🔥', '💡'];
    
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {elements.map((el, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              opacity: 0.1 + Math.random() * 0.1,
            }}
          >
            {el}
          </div>
        ))}
      </div>
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Floating elements */}
      <FloatingElements />

      {/* Progress Bar */}
      <ProgressBar />

      {/* Floating Stats Cards */}
      <FloatingProgressCards />

      {/* Main content */}
      <div className="relative z-10">
        <Hero />
        <CategoryCards />
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`
          fixed bottom-8 right-8 z-40 p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl
          transition-all duration-500 hover:scale-110 hover:shadow-purple-500/30
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        `}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Bottom gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-500/5 to-transparent pointer-events-none z-0"></div>
    </div>
  );
}