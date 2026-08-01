import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ArrowUpRight,
  Sparkles,
  Heart,
  Shield,
  Award,
  Clock,
  ChevronUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '../Context/ThemeContext'; // 🟢 Theme Integration

export default function Footer() {
  const { theme } = useTheme(); // 🟢 Theme Context Access
  const isLight = theme === 'light';

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [, setHoveredLink] = useState<string | null>(null);
  const footerRef = useRef<HTMLElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse tracking for 3D parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Theme-aware Particle Canvas System
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      life: number;
      maxLife: number;
    }> = [];

    const createParticle = () => {
      const width = canvas.width;
      const height = canvas.height;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5 - 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        life: 0,
        maxLife: Math.random() * 200 + 100
      };
    };

    // Initialize particles (Fewer particles on mobile for speed optimization)
    const particleCount = window.innerWidth < 768 ? 40 : 90;
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dynamic Theme Based Colors
      const particleRgb = isLight ? '99, 102, 241' : '139, 92, 246'; // Indigo in Light, Purple in Dark

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life++;

        if (particle.life > particle.maxLife || 
            particle.y < 0 || 
            particle.x < 0 || 
            particle.x > canvas.width) {
          particles[index] = createParticle();
          particles[index].y = canvas.height;
        }

        const progress = particle.life / particle.maxLife;
        const opacity = particle.opacity * (1 - progress);

        // Draw glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `rgba(${particleRgb}, ${opacity})`);
        gradient.addColorStop(1, `rgba(${particleRgb}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
          particle.x - particle.size * 3,
          particle.y - particle.size * 3,
          particle.size * 6,
          particle.size * 6
        );

        // Draw particle core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleRgb}, ${opacity * 1.5})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 90) {
            const opacity = (1 - distance / 90) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${particleRgb}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isLight]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  }, [email]);

  // 3D transform style for parallax
  const getParallaxStyle = useCallback((depth: number = 1) => {
    return {
      transform: `translate(${mousePosition.x * depth}px, ${mousePosition.y * depth}px)`,
      transition: 'transform 0.1s ease-out'
    };
  }, [mousePosition]);

  const quickLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'All Projects', path: '/projects', icon: '📚' },
    { name: 'Categories', path: '#categories', icon: '📂' },
    { name: 'Contact Us', path: '#contact', icon: '💬' },
  ];

  const categories = [
    { name: 'AI Projects', path: '/projects?category=ai', icon: '🤖', color: 'from-blue-500 to-cyan-400' },
    { name: 'Web Development', path: '/projects?category=web', icon: '🌐', color: 'from-purple-500 to-pink-400' },
    { name: 'Machine Learning', path: '/projects?category=ml', icon: '🧠', color: 'from-green-500 to-emerald-400' },
    { name: 'Data Science', path: '/projects?category=data', icon: '📊', color: 'from-orange-500 to-red-400' },
  ];

  const trustBadges = [
    { Icon: Award, label: '500+ Students', desc: 'Trusted worldwide' },
    { Icon: Shield, label: 'Secure Payment', desc: '100% encrypted' },
    { Icon: Clock, label: '24/7 Support', desc: 'Always available' },
    { Icon: Heart, label: 'Satisfaction', desc: 'Guaranteed quality' },
  ];

  const stats = [
    { value: '500+', label: 'Projects' },
    { value: '1000+', label: 'Students' },
    { value: '50+', label: 'Categories' },
    { value: '99%', label: 'Satisfaction' },
  ];

  return (
    <footer 
      ref={footerRef}
      id="contact" 
      className="relative bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 overflow-hidden transition-colors duration-500 border-t border-slate-200 dark:border-slate-800"
    >
      {/* Dynamic Background Particle System */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Background Animated Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {/* Glow Effects */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-purple-500/10 dark:from-purple-500/10 via-transparent to-transparent animate-pulse-slow" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-blue-500/10 dark:from-blue-500/10 via-transparent to-transparent animate-pulse-slow animation-delay-1000" />

        {/* Parallax Orbs */}
        <div 
          className="absolute top-10 left-10 w-72 h-72 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl animate-float-slow"
          style={getParallaxStyle(20)}
        />
        <div 
          className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl animate-float-slow animation-delay-2000"
          style={getParallaxStyle(-15)}
        />
      </div>

      {/* Top Gradient Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" style={{ zIndex: 2 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative" style={{ zIndex: 3 }}>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 mb-14">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-center border border-slate-200/80 dark:border-slate-800/80 hover:border-purple-500/40 dark:hover:border-purple-500/40 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:to-pink-400 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-14">
          
          {/* Brand & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-sm group-hover:blur-md transition-all duration-300" />
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-xl text-white">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </div>
              <div>
                <span className="text-xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:to-pink-400 bg-clip-text text-transparent tracking-tight">
                  FYP Marketplace
                </span>
                <div className="flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
                  <Sparkles className="w-3 h-3" />
                  <span>Premium Projects</span>
                </div>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Your trusted partner for production-ready final year projects. Complete with verified source code, detailed documentation, and presentation decks.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {trustBadges.map((badge, index) => (
                <div 
                  key={index}
                  className="group bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl p-2.5 border border-slate-200/60 dark:border-slate-800/60 hover:border-purple-500/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <badge.Icon className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{badge.label}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">{badge.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-slate-900 dark:text-white font-bold text-base relative inline-block">
              Quick Links
              <span className="block h-0.5 w-8 bg-purple-500 rounded-full mt-1" />
            </h3>
            <ul className="space-y-1.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm py-1.5 px-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span className="text-base group-hover:scale-110 transition-transform">{link.icon}</span>
                    <span className="flex-1 font-medium">{link.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-slate-900 dark:text-white font-bold text-base relative inline-block">
              Categories
              <span className="block h-0.5 w-8 bg-pink-500 rounded-full mt-1" />
            </h3>
            <ul className="space-y-1.5">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={category.path}
                    className="group flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm py-1.5 px-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                  >
                    <span className="text-base group-hover:scale-110 transition-transform">{category.icon}</span>
                    <span className="flex-1 font-medium">{category.name}</span>
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-100 transition-all`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-slate-900 dark:text-white font-bold text-base relative inline-block">
              Stay Connected
              <span className="block h-0.5 w-8 bg-blue-500 rounded-full mt-1" />
            </h3>
            
            {/* Contact Details */}
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="truncate">akkashdharsaun02@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 8015874936</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <div className="p-2 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>India, Tamil Nadu</span>
              </li>
            </ul>

            {/* Newsletter Input */}
            <form onSubmit={handleSubmit} className="pt-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email updates"
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all pr-12"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white hover:scale-105 active:scale-95 transition-all shadow-md shadow-purple-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {isSubmitted && (
                <p className="text-emerald-600 dark:text-emerald-400 text-xs mt-1.5 font-semibold">
                  ✓ Subscribed successfully!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 relative">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <p className="flex items-center gap-1.5">
              © 2026 FYP Marketplace.
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              <span>in India</span>
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Refund Policy</a>
            </div>
          </div>

          {/* Back To Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="absolute -top-5 right-2 sm:right-0 p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 shadow-md hover:scale-110 active:scale-95 transition-all"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}