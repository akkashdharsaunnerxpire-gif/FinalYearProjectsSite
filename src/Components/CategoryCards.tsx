import { Brain, Code, Cpu, ArrowRight, Sparkles, Rocket, Zap, Globe, Database, Cloud, Shield, Layers, Terminal, Workflow, Play, Star, TrendingUp, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../lib/types';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useTheme } from '../Context/ThemeContext'; // 🟢 Theme Integration

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Code,
  Cpu,
  Sparkles,
  Rocket,
  Zap,
  Globe,
  Database,
  Cloud,
  Shield,
  Layers,
  Terminal,
  Workflow,
};

// Responsive Hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Intersection Observer Hook
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible] as const;
};

// 3D Mouse Tilt Effect Hook
const useTiltEffect = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [tilt, setTilt] = useState({ x: 0, y: 0, scale: 1 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({
        x: x * 10,
        y: -y * 10,
        scale: 1.02,
      });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setTilt({ x: 0, y: 0, scale: 1 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  return [ref, tilt, isHovered] as const;
};

export default function CategoryCards() {
  const { theme } = useTheme(); // 🟢 Context Theme State
  const isLight = theme === 'light';

  const isMobile = useIsMobile();
  const [, setHoveredCard] = useState<string | null>(null);
  const [mainRef, isMainVisible] = useIntersectionObserver();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto Carousel Highlight
  useEffect(() => {
    if (isMobile || !isAutoPlay) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [isAutoPlay, isMobile]);

  // Background Particle Effect Data
  const particles = useMemo(() => {
    return Array.from({ length: isMobile ? 8 : 24 }, (_, i) => ({
      id: i,
      size: isMobile ? Math.random() * 2 + 1 : Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: isMobile ? Math.random() * 10 + 10 : Math.random() * 18 + 10,
      delay: Math.random() * 5,
      color: ['from-blue-500', 'from-purple-500', 'from-pink-500', 'from-cyan-500', 'from-emerald-500'][Math.floor(Math.random() * 5)],
    }));
  }, [isMobile]);

  // Category Color Palette
  const categoryColors = [
    { from: 'from-blue-500', to: 'to-purple-500', border: 'hover:border-blue-500/50', badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    { from: 'from-purple-500', to: 'to-pink-500', border: 'hover:border-purple-500/50', badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
    { from: 'from-pink-500', to: 'to-rose-500', border: 'hover:border-pink-500/50', badge: 'bg-pink-500/10 text-pink-600 dark:text-pink-400' },
    { from: 'from-cyan-500', to: 'to-blue-500', border: 'hover:border-cyan-500/50', badge: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
    { from: 'from-emerald-500', to: 'to-teal-500', border: 'hover:border-emerald-500/50', badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    { from: 'from-amber-500', to: 'to-orange-500', border: 'hover:border-amber-500/50', badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  ];

  // Stats Data
  const stats = [
    { icon: Users, label: 'Active Students', value: '500+', trend: '+12%' },
    { icon: Award, label: 'Projects Done', value: '150+', trend: '+8%' },
    ...(isMobile ? [] : [
      { icon: Star, label: 'Satisfaction', value: '4.9★', trend: '+5%' },
      { icon: TrendingUp, label: 'Growth', value: '200%', trend: '+15%' },
    ])
  ];

  return (
    <section 
      id="categories" 
      className="relative py-16 md:py-24 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500"
    >
      {/* Dynamic Theme Glow Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b ${isLight ? 'from-purple-100/60 via-blue-50/30' : 'from-purple-900/15 via-slate-950'} to-transparent blur-3xl`} />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full bg-gradient-to-r ${particle.color} to-transparent ${isLight ? 'opacity-30' : 'opacity-20'} animate-pulse`}
            style={{
              width: particle.size * 2,
              height: particle.size * 2,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div 
          ref={mainRef}
          className={`text-center mb-10 md:mb-16 transition-all duration-700 transform ${isMainVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          {/* Sparkle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-spin-slow" />
            <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:to-pink-400 bg-clip-text text-transparent">
              Explore Our Specializations
            </span>
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Browse By{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover production-ready final year projects equipped with code, PPT, and full documentation across all tech domains.
          </p>

          {/* Micro Stats Bar */}
          <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx} 
                  className="flex items-center gap-2.5 px-3.5 py-2 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-purple-500/40 transition-all duration-300"
                >
                  <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Code;
            const color = categoryColors[index % categoryColors.length];
            const [tiltRef, tilt, isHovered] = useTiltEffect();
            const isActive = index === activeIndex;

            return (
              <Link
                key={category.id}
                to={`/projects?category=${category.id}`}
                className="group relative block focus:outline-none"
                onMouseEnter={() => {
                  if (!isMobile) {
                    setHoveredCard(category.id);
                    setIsAutoPlay(false);
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobile) {
                    setHoveredCard(null);
                    setIsAutoPlay(true);
                  }
                }}
              >
                <div
                  ref={tiltRef}
                  className="h-full transition-transform duration-200 ease-out"
                  style={{
                    transform: !isMobile
                      ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${tilt.scale})`
                      : 'none',
                  }}
                >
                  {/* Card Container */}
                  <div className={`
                    relative h-full flex flex-col justify-between
                    bg-white dark:bg-slate-900/80 backdrop-blur-xl
                    rounded-2xl p-6 sm:p-7
                    border border-slate-200/80 dark:border-slate-800/80
                    shadow-sm hover:shadow-xl dark:shadow-slate-950/50
                    transition-all duration-300 ${color.border}
                    overflow-hidden
                  `}>
                    
                    {/* Hover Top Glow Line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color.from} ${color.to} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    {/* Background Index Number */}
                    <div className="absolute top-3 right-4 text-3xl font-extrabold text-slate-100 dark:text-slate-800/60 select-none pointer-events-none transition-colors group-hover:text-slate-200 dark:group-hover:text-slate-800">
                      #{String(index + 1).padStart(2, '0')}
                    </div>

                    <div>
                      {/* Icon Section */}
                      <div className="flex items-center justify-between mb-5">
                        <div className={`
                          w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center
                          bg-gradient-to-br ${color.from} ${color.to} text-white
                          shadow-md shadow-purple-500/10
                          group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300
                        `}>
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>

                        {/* Active Indicator Play Icon */}
                        {isActive && !isMobile && (
                          <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 animate-pulse">
                            <Play className="w-2.5 h-2.5 fill-current" /> Featured
                          </span>
                        )}
                      </div>

                      {/* Category Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {category.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3 min-h-[50px]">
                        {category.description}
                      </p>
                    </div>

                    {/* Bottom Action Section */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/60">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          10+ Ready Projects
                        </span>
                      </div>

                      {/* View Link Arrow Button */}
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform duration-300">
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className={`text-center mt-12 md:mt-16 transition-all duration-700 ${isMainVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:to-pink-500 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>View All Available Projects</span>
            <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}