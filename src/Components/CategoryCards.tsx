import { Brain, Code, Cpu, ArrowRight, Sparkles, Rocket, Zap, Globe, Database, Cloud, Shield, Layers, Terminal, Workflow, Play, Star, TrendingUp, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../lib/types';
import { useEffect, useRef, useState } from 'react';

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

// Mobile detection hook
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

// Optimized Intersection Observer for mobile
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

// Optimized tilt effect - disabled on mobile
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
        x: x * 12, 
        y: y * 12,
        scale: 1.02 + Math.abs(x) * 0.015 + Math.abs(y) * 0.015
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
  const isMobile = useIsMobile();
  const [, setHoveredCard] = useState<string | null>(null);
  const [mainRef, isMainVisible] = useIntersectionObserver();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-play carousel effect for cards - disabled on mobile
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
  }, [isAutoPlay, categories.length, isMobile]);

  // Reduced particles on mobile
  const particles = Array.from({ length: isMobile ? 10 : 30 }, (_, i) => ({
    id: i,
    size: isMobile ? Math.random() * 2 + 1 : Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: isMobile ? Math.random() * 15 + 10 : Math.random() * 20 + 10,
    delay: Math.random() * 10,
    color: ['from-blue-500', 'from-purple-500', 'from-pink-500', 'from-cyan-500', 'from-green-500'][Math.floor(Math.random() * 5)],
  }));

  // Category colors
  const categoryColors = [
    { from: 'from-blue-500', to: 'to-purple-500', glow: 'shadow-blue-500/20', gradient: 'from-blue-600 via-blue-500 to-purple-600' },
    { from: 'from-purple-500', to: 'to-pink-500', glow: 'shadow-purple-500/20', gradient: 'from-purple-600 via-purple-500 to-pink-600' },
    { from: 'from-pink-500', to: 'to-rose-500', glow: 'shadow-pink-500/20', gradient: 'from-pink-600 via-pink-500 to-rose-600' },
    { from: 'from-cyan-500', to: 'to-blue-500', glow: 'shadow-cyan-500/20', gradient: 'from-cyan-600 via-cyan-500 to-blue-600' },
    { from: 'from-green-500', to: 'to-emerald-500', glow: 'shadow-green-500/20', gradient: 'from-green-600 via-green-500 to-emerald-600' },
    { from: 'from-orange-500', to: 'to-red-500', glow: 'shadow-orange-500/20', gradient: 'from-orange-600 via-orange-500 to-red-600' },
  ];

  // Stats - reduced on mobile
  const stats = [
    { icon: Users, label: 'Active Students', value: isMobile ? '500+' : '500+', trend: '+12%' },
    { icon: Award, label: 'Projects', value: isMobile ? '150+' : '150+', trend: '+8%' },
    ...(isMobile ? [] : [
      { icon: Star, label: 'Rating', value: '4.9★', trend: '+5%' },
      { icon: TrendingUp, label: 'Growth', value: '200%', trend: '+15%' },
    ])
  ];

  return (
    <section 
      id="categories" 
      className={`relative py-12 md:py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50/30`}
    >
      {/* Optimized background effects for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Simplified gradient mesh for mobile */}
        <div className={`absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-purple-500/5 to-pink-500/5 ${isMobile ? '' : 'animate-gradient-xy'}`}></div>
        
        {/* Grid overlay - hidden on mobile */}
        {!isMobile && (
          <div className="absolute inset-0 bg-grid-gray-900/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] animate-grid-scroll"></div>
        )}
        
        {/* Floating particles - reduced on mobile */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full bg-gradient-to-r ${particle.color} to-transparent opacity-20 ${isMobile ? '' : 'animate-float-particle'}`}
            style={{
              width: particle.size * 2,
              height: particle.size * 2,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              ...(isMobile ? {} : {
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
              })
            }}
          />
        ))}

        {/* Animated gradient orbs - reduced on mobile */}
        {!isMobile && (
          <>
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float-slow"></div>
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-float-slow animation-delay-2000"></div>
          </>
        )}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>

        {/* Video-like gradient sweep - hidden on mobile */}
        {!isMobile && (
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent animate-gradient-sweep"></div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header with cinematic animation */}
        <div 
          ref={mainRef}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <div className={`transition-all duration-700 transform ${isMainVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Animated badge with glow */}
            <div className="inline-block mb-3 md:mb-4 relative">
              {!isMobile && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse-glow"></div>
              )}
              <div className="relative px-4 md:px-6 py-1.5 md:py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm">
                <span className="text-xs md:text-sm font-medium text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text flex items-center gap-1 md:gap-2">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-500" />
                  Explore Our Categories
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
                </span>
              </div>
            </div>

            {/* Main heading */}
            <h2 className="text-2xl md:text-4xl lg:text-7xl font-bold mb-2 md:mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Explore by Category
              </span>
              {!isMobile && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse-glow"></span>
              )}
            </h2>
            
            <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Choose from our curated collection of project categories
            </p>

            {/* Stats bar - responsive */}
            <div className="mt-4 md:mt-8 flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="flex items-center gap-1 md:gap-3 px-2 md:px-4 py-1 md:py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg md:rounded-xl border border-gray-200/20 hover:border-purple-500/30 transition-all duration-300">
                    <Icon className="w-3 h-3 md:w-5 md:h-5 text-purple-500" />
                    <div className="text-left">
                      <div className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">{stat.value}</div>
                      <div className="text-[8px] md:text-xs text-gray-500 hidden sm:block">{stat.label}</div>
                    </div>
                    {!isMobile && (
                      <span className="text-[8px] md:text-xs font-semibold text-green-500">{stat.trend}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Code;
            const color = categoryColors[index % categoryColors.length];
            const [tiltRef, tilt, isHovered] = useTiltEffect();
            const isActive = index === activeIndex;

            return (
              <Link
                key={category.id}
                to={`/projects?category=${category.id}`}
                className="group relative block"
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
                  className={`relative ${!isMobile ? 'perspective-1000' : ''}`}
                  style={!isMobile ? {
                    transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${tilt.scale})`,
                    transition: 'transform 0.1s ease-out',
                  } : {
                    transform: 'none',
                    transition: 'none',
                  }}
                >
                  {/* Card glow effect - disabled on mobile */}
                  {!isMobile && (
                    <div 
                      className={`absolute -inset-2 bg-gradient-to-r ${color.from} ${color.to} rounded-3xl blur-2xl transition-all duration-700 ${isHovered ? 'opacity-60 scale-105' : 'opacity-0 scale-100'}`}
                    ></div>
                  )}

                  {/* Main card */}
                  <div className={`
                    relative bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8
                    transition-all duration-300 md:duration-700
                    border border-gray-100 dark:border-gray-800
                    ${!isMobile && (isHovered ? 'shadow-2xl scale-[1.02] -translate-y-2' : 'hover:shadow-xl')}
                    overflow-hidden
                    ${!isMobile ? 'before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100' : ''}
                  `}>
                    {/* Gradient overlay - simplified */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-br ${color.from} ${color.to} 
                      transition-all duration-300 md:duration-700
                      ${isHovered ? 'opacity-10' : 'opacity-0'}
                    `}></div>

                    {/* Animated border shine - disabled on mobile */}
                    {!isMobile && (
                      <div className={`
                        absolute -inset-full bg-gradient-to-r from-transparent via-white/40 to-transparent 
                        -skew-x-12 transition-all duration-1000
                        ${isHovered ? 'translate-x-full' : 'translate-x-[-200%]'}
                      `}></div>
                    )}

                    {/* Card number - simplified */}
                    <div className={`absolute top-2 md:top-4 right-2 md:right-4 text-2xl md:text-4xl font-bold text-gray-200/30 dark:text-gray-700/30 ${isMobile ? 'text-sm' : ''}`}>
                      #{String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="relative mb-3 md:mb-6">
                        <div className={`
                          w-12 h-12 md:w-16 lg:w-20 md:h-16 lg:h-20 rounded-xl md:rounded-2xl flex items-center justify-center
                          bg-gradient-to-br ${color.from} ${color.to}
                          transition-all duration-300 md:duration-500
                          ${!isMobile && isHovered ? 'scale-110 rotate-6 shadow-2xl' : 'group-hover:scale-105'}
                          relative
                        `}>
                          {/* Icon pulse ring - simplified */}
                          {!isMobile && (
                            <div className={`
                              absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br ${color.from} ${color.to}
                              animate-ping-slow opacity-30
                              ${isHovered ? 'opacity-70' : 'opacity-0'}
                            `}></div>
                          )}
                          
                          <Icon className={`
                            w-6 h-6 md:w-8 lg:w-10 md:h-8 lg:h-10 text-white
                            transition-all duration-300 md:duration-500
                            ${!isMobile && isHovered ? 'scale-110' : ''}
                          `} />
                        </div>

                        {/* Floating particles - disabled on mobile */}
                        {!isMobile && (
                          <div className="absolute -top-3 -right-3 flex gap-1">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className={`
                                  w-1.5 h-1.5 rounded-full bg-gradient-to-r ${color.from} ${color.to}
                                  transition-all duration-500
                                  ${isHovered ? 'opacity-100 scale-150' : 'opacity-0 scale-0'}
                                `}
                                style={{ transitionDelay: `${i * 100}ms` }}
                              />
                            ))}
                          </div>
                        )}

                        {/* Play button overlay - simplified */}
                        {isActive && !isMobile && (
                          <div className="absolute -bottom-2 -right-2">
                            <div className="relative">
                              <div className="absolute inset-0 bg-purple-500 rounded-full blur-md animate-pulse"></div>
                              <div className="relative bg-purple-500 rounded-full p-1.5 shadow-lg">
                                <Play className="w-3 h-3 text-white fill-white" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Category name */}
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1 md:mb-3 relative inline-block">
                        {category.name}
                        {!isMobile && (
                          <span className={`
                            absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r ${color.from} ${color.to}
                            transition-all duration-700
                            ${isHovered ? 'w-full' : 'w-0'}
                          `}></span>
                        )}
                      </h3>

                      <p className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-6 leading-relaxed min-h-[30px] md:min-h-[60px] line-clamp-2 md:line-clamp-3">
                        {category.description}
                      </p>

                      {/* Project count and view button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-0.5 md:gap-1">
                            {!isMobile && (
                              <span className="relative flex h-1.5 md:h-2 w-1.5 md:w-2">
                                <span className={`
                                  animate-ping absolute inline-flex h-full w-full rounded-full 
                                  bg-gradient-to-r ${color.from} ${color.to} opacity-75
                                  ${isHovered ? '' : 'hidden'}
                                `}></span>
                                <span className={`relative inline-flex rounded-full h-full w-full bg-gradient-to-r ${color.from} ${color.to}`}></span>
                              </span>
                            )}
                            <span className={`transition-colors duration-300 ${isHovered ? 'text-gray-700 dark:text-gray-300' : ''}`}>
                              {isMobile ? '10+' : '10+ Projects'}
                            </span>
                          </span>
                        </div>

                        {/* View button */}
                        <div className={`
                          flex items-center gap-0.5 md:gap-2 font-semibold
                          bg-gradient-to-r ${color.from} ${color.to} bg-clip-text text-transparent
                          transition-all duration-300 md:duration-500
                          ${!isMobile && isHovered ? 'gap-2 md:gap-3' : 'gap-1 md:gap-2'}
                          group
                        `}>
                          <span className="text-[10px] md:text-xs lg:text-sm">View</span>
                          <ArrowRight className={`
                            w-3 h-3 md:w-4 md:h-4
                            transition-all duration-300 md:duration-500
                            ${!isMobile && isHovered ? 'translate-x-1 rotate-0' : ''}
                            group-hover:translate-x-1
                          `} />
                        </div>
                      </div>
                    </div>

                    {/* Corner decoration - disabled on mobile */}
                    {!isMobile && (
                      <div className={`
                        absolute top-0 right-0 w-16 md:w-24 h-16 md:h-24
                        transition-all duration-700
                        ${isHovered ? 'opacity-100' : 'opacity-0'}
                      `}>
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] md:border-t-[50px] border-r-[30px] md:border-r-[50px] border-t-transparent border-r-purple-500/20"></div>
                        <div className="absolute top-1 md:top-3 right-1 md:right-3 w-4 md:w-8 h-4 md:h-8 bg-gradient-to-r ${color.from} ${color.to} rounded-full animate-spin-slow opacity-20"></div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-8 md:mt-12 lg:mt-16 transition-all duration-700 ${isMainVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block relative">
            {!isMobile && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl animate-pulse"></div>
            )}
            <Link
              to="/projects"
              className="relative group inline-flex items-center gap-1.5 md:gap-3 px-4 md:px-8 lg:px-10 py-2.5 md:py-4 lg:py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl md:rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden text-sm md:text-base"
            >
              {/* Shine effect - disabled on mobile */}
              {!isMobile && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-1000"></span>
              )}
              <span>View All Projects</span>
              <Rocket className="w-3 h-3 md:w-4 lg:w-5 md:h-4 lg:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              {!isMobile && (
                <Sparkles className="w-3 h-3 md:w-4 lg:w-4 group-hover:rotate-180 transition-transform duration-500" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}