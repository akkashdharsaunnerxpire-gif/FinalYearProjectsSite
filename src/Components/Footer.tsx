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

export default function Footer() {
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

  // Particle system
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

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.push(createParticle());
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
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
        gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity})`);
        gradient.addColorStop(1, `rgba(139, 92, 246, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
          particle.x - particle.size * 3,
          particle.y - particle.size * 3,
          particle.size * 6,
          particle.size * 6
        );

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${opacity * 2})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
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
  }, []);

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
    { Icon: Award, label: '500+ Students', desc: 'Trusted by students worldwide' },
    { Icon: Shield, label: 'Secure Payment', desc: '100% encrypted transactions' },
    { Icon: Clock, label: '24/7 Support', desc: 'Always here to help you' },
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
      className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-gray-300 overflow-hidden"
    >
      {/* Canvas for particle system */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {/* Primary glow */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-purple-500/5 via-transparent to-transparent animate-pulse-slow" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-blue-500/5 via-transparent to-transparent animate-pulse-slow animation-delay-1000" />

        {/* Animated grid */}
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
        
        {/* Floating orbs */}
        <div 
          className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float-slow"
          style={getParallaxStyle(20)}
        />
        <div 
          className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-slow animation-delay-2000"
          style={getParallaxStyle(-15)}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse-slow"
        />
      </div>

      {/* Animated gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-gradient-x" style={{ zIndex: 2 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative" style={{ zIndex: 3 }}>
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Brand Section - 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-md group-hover:blur-xl transition-all duration-500 animate-pulse-slow" />
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl transform group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  FYP Marketplace
                </span>
                <div className="flex items-center gap-1 text-xs text-purple-400">
                  <Sparkles className="w-3 h-3" />
                  <span>Premium Projects</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              Your one-stop destination for high-quality final year projects. 
              Complete documentation and source code included.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              {trustBadges.map((badge, index) => (
                <div 
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2">
                    <badge.Icon className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs text-white font-medium">{badge.label}</div>
                      <div className="text-[10px] text-gray-500">{badge.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links - 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white font-semibold text-lg relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 text-sm p-2 rounded-lg hover:bg-white/5"
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span className="text-lg transform group-hover:scale-110 transition-transform">
                      {link.icon}
                    </span>
                    <span className="flex-1">{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories - 3 columns */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-semibold text-lg relative inline-block">
              Categories
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
            </h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={category.path}
                    className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 text-sm p-2 rounded-lg hover:bg-white/5"
                  >
                    <span className="text-lg transform group-hover:scale-110 transition-transform">
                      {category.icon}
                    </span>
                    <span className="flex-1">{category.name}</span>
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-100 transition-all group-hover:scale-150`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter - 3 columns */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-semibold text-lg relative inline-block">
              Stay Connected
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
            </h3>
            
            {/* Contact Info */}
            <ul className="space-y-2">
              <li className="flex items-start gap-3 group p-2 rounded-lg hover:bg-white/5 transition-all duration-300">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <Mail className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500">Email</div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    akkashdharsaun02@gmail.com
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 group p-2 rounded-lg hover:bg-white/5 transition-all duration-300">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <Phone className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500">Phone</div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    +91 8015874936
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 group p-2 rounded-lg hover:bg-white/5 transition-all duration-300">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <MapPin className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500">Location</div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    India, Tamil Nadu
                  </span>
                </div>
              </li>
            </ul>

            {/* Newsletter */}
            <form onSubmit={handleSubmit} className="mt-2">
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 pr-14 group-hover:border-white/20"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {isSubmitted && (
                <p className="text-green-400 text-xs mt-2 animate-slide-up">
                  ✓ Subscribed successfully!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative pt-8">
          {/* Animated separator */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm flex items-center gap-2">
              © 2024 FYP Marketplace.
              <span className="hidden sm:inline">All rights reserved.</span>
              <span className="flex items-center gap-1 text-gray-600">
                Made with <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse" /> in India
              </span>
            </p>
            
            <div className="flex flex-wrap gap-4 md:gap-6">
              {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="group relative text-gray-500 hover:text-purple-400 transition-all duration-300 text-sm"
                >
                  <span>{item}</span>
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-purple-400 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Scroll to top button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute -top-6 right-0 group p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
          >
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Animated floating particles at bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <div className="flex justify-around opacity-10">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-purple-500 rounded-full animate-float"
                style={{
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${3 + i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}