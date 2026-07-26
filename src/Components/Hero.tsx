import { ArrowRight, Sparkles, Rocket, Zap, Code2, Brain, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showPromo, setShowPromo] = useState(false);
  const [promoMessage, setPromoMessage] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
 const promoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Promo messages
  const promoMessages = [
    { icon: '💻', text: 'Student Special: Get 30% OFF on AI Projects!' },
    { icon: '🎓', text: 'Final Year Projects starting at just ₹499!' },
    { icon: '🚀', text: 'Premium Web Dev Projects with Source Code!' },
    { icon: '🧠', text: 'ML Projects with Complete Documentation!' },
    { icon: '🌟', text: 'Limited Time: Buy 2 Get 1 Free!' },
    { icon: '📚', text: 'Top Rated Projects by 500+ Students!' },
  ];

  // Show promo animation every 1 MINUTE (60 seconds)
  useEffect(() => {
    const showPromoWithMessage = () => {
      const randomMessage = promoMessages[Math.floor(Math.random() * promoMessages.length)];
      setPromoMessage(`${randomMessage.icon} ${randomMessage.text}`);
      setShowPromo(true);
      
      // Clear existing timeout
      if (promoTimeoutRef.current) {
        clearTimeout(promoTimeoutRef.current);
      }
      
      // Hide promo after 5 seconds (still visible for 5 seconds)
      promoTimeoutRef.current = setTimeout(() => {
        setShowPromo(false);
      }, 5000);
    };

    // Show initial promo after 1 second
    const initialTimeout = setTimeout(() => {
      showPromoWithMessage();
    }, 1000);

    // Set interval for every 60 seconds (1 minute)
    const interval = setInterval(() => {
      showPromoWithMessage();
    }, 60000); // Changed from 8000 to 60000 (1 minute)

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      if (promoTimeoutRef.current) {
        clearTimeout(promoTimeoutRef.current);
      }
    };
  }, []);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle system for background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
    }> = [];

    const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4'];

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMoveCanvas = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMoveCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 0.02;
          particle.vy += (dy / distance) * force * 0.02;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections
        particles.forEach((particle2) => {
          const dx2 = particle.x - particle2.x;
          const dy2 = particle.y - particle2.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance2 < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.strokeStyle = '#8B5CF6';
            ctx.globalAlpha = 0.1 * (1 - distance2 / 100);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveCanvas);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Floating icons animation
  const floatingIcons = [
    { Icon: Code2, delay: '0s', x: -20, y: -10 },
    { Icon: Brain, delay: '0.5s', x: 20, y: 10 },
    { Icon: Cpu, delay: '1s', x: -15, y: 15 },
    { Icon: Rocket, delay: '1.5s', x: 25, y: -15 },
    { Icon: Zap, delay: '2s', x: -25, y: 5 },
    { Icon: Sparkles, delay: '2.5s', x: 15, y: -20 },
  ];

  // Promo popup component
  const PromoPopup = () => {
    if (!showPromo) return null;

    return (
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-promo-slide">
        <div className="relative max-w-2xl mx-auto px-4">
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-4 overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float animation-delay-2000"></div>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full animate-particle"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative flex items-center gap-4">
              {/* Animated icon */}
              <div className="relative flex-shrink-0">
                <div className="relative w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float-laptop">
                  <span className="text-3xl">🎯</span>
                  <div className="absolute -top-1 -right-1">
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                      <div className="absolute top-0 left-0 w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo message */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-yellow-300 bg-yellow-500/20 px-2 py-0.5 rounded-full animate-pulse-glow">
                    ⭐ SPECIAL OFFER
                  </span>
                  <span className="text-xs text-white/60 flex items-center gap-1">
                    <span className="hidden sm:inline">Limited Time</span>
                  </span>
                </div>
                <p className="text-white font-semibold text-sm md:text-base truncate">
                  {promoMessage}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-xs text-white/80">
                    <span>🔥 Hurry up!</span>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowPromo(false)}
                className="relative flex-shrink-0 text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
                <div className="h-full bg-white rounded-full animate-progress-shrink"></div>
              </div>
            </div>

            {/* Floating icons around promo */}
            <div className="absolute -top-6 left-1/4 text-2xl animate-float-icon">⚡</div>
            <div className="absolute -bottom-4 right-1/3 text-xl animate-float-icon animation-delay-1000">✨</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Promo Popup */}
      <PromoPopup />

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-xy"></div>

      {/* Glowing orbs with 3D transform */}
      <div
        className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"
        style={{
          transform: `translate(${-mousePosition.x * 20}px, ${-mousePosition.y * 20}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-4000"
        style={{
          transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <div
          key={index}
          className="absolute hidden lg:block text-white/10 animate-float-icon"
          style={{
            top: `${30 + index * 8}%`,
            left: `${10 + index * 15}%`,
            animationDelay: delay,
            transform: `translate(${x}px, ${y}px)`,
          }}
        >
          <Icon size={40 + index * 10} />
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Animated badge */}
          <div className="inline-block mb-8 animate-fade-in">
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm">
              <span className="text-sm font-medium text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                🚀 500+ Students Trust Us
              </span>
            </div>
          </div>

          {/* Main heading with gradient animation */}
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x">
              Final Year Projects
            </span>
            <br />
            <span className="text-white relative">
              Marketplace
              <span className="absolute -top-6 -right-6 text-yellow-400 animate-bounce">
                ✨
              </span>
            </span>
          </h1>

          {/* Description */}
          <div className="relative max-w-3xl mx-auto mb-8">
            <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed animate-fade-in-up animation-delay-200">
              Download ready-made AI, ML, and Web Development projects
              <br className="hidden sm:block" />
              Complete with documentation, source code, and presentations — at affordable prices!
            </p>
          </div>

          {/* CTA Buttons with 3D effect */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
            <Link
              to="/projects"
              className="group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center gap-2 z-10">
                Browse Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <a
              href="#categories"
              className="relative px-8 py-4 rounded-xl font-semibold text-white border-2 border-white/30 hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/5 backdrop-blur-sm group"
            >
              <span className="relative z-10">Explore Categories</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>

          {/* Stats with counter animation */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
            {[
              { label: 'Projects', value: '150+' },
              { label: 'Students', value: '500+' },
              { label: 'Categories', value: '12' },
              { label: 'Reviews', value: '4.9★' },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:bg-white/10"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
                <div className="relative z-10">
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-white/50 animate-fade-in animation-delay-800">
            <div className="flex items-center gap-2 group hover:text-white/80 transition-colors">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Trusted by 500+ Students</span>
            </div>
            <div className="flex items-center gap-2 group hover:text-white/80 transition-colors">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-200"></div>
              <span>Affordable Pricing</span>
            </div>
            <div className="flex items-center gap-2 group hover:text-white/80 transition-colors">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-400"></div>
              <span>Ready-to-Submit Projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}