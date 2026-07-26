import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X, Sparkles, Rocket, Zap, Award, Users, Laptop, Moon, Sun, Coffee, BookOpen, Code } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [promoMessage, setPromoMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [studentAnimation, setStudentAnimation] = useState('idle');
  const promoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const promoIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const studentIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Promo messages with laptop/student theme
  const promoMessages = [
    { icon: '💻', text: 'Student Special: Get 30% OFF on AI Projects!' },
    { icon: '🎓', text: 'Final Year Projects starting at just ₹1500!' },
    { icon: '🚀', text: 'Premium Web Dev Projects with Source Code!' },
    { icon: '🧠', text: 'ML Projects with Complete Documentation!' },
    { icon: '🌟', text: 'Limited Time: project Ready within 3days!' },
    { icon: '📚', text: 'Top Rated Projects by 500+ Students!' },
  ];

  // Show promo animation every 1 MINUTE (60 seconds)
  useEffect(() => {
    const showPromoWithMessage = () => {
      const randomMessage = promoMessages[Math.floor(Math.random() * promoMessages.length)];
      setPromoMessage(`${randomMessage.icon} ${randomMessage.text}`);
      setShowPromo(true);
      
      if (promoTimeoutRef.current) {
        clearTimeout(promoTimeoutRef.current);
      }
      
      // Hide promo after 5 seconds
      promoTimeoutRef.current = setTimeout(() => {
        setShowPromo(false);
      }, 10000);
    };

    // Show initial promo after 3 seconds
    const initialTimeout = setTimeout(() => {
      showPromoWithMessage();
    }, 3000);

    // Set interval for every 60 seconds (1 minute)
    promoIntervalRef.current = setInterval(() => {
      showPromoWithMessage();
    }, 100000); // 60 seconds = 1 minute

    return () => {
      clearTimeout(initialTimeout);
      if (promoIntervalRef.current) {
        clearInterval(promoIntervalRef.current);
      }
      if (promoTimeoutRef.current) {
        clearTimeout(promoTimeoutRef.current);
      }
    };
  }, []);

  // Student animation sequence
  useEffect(() => {
    const animateStudent = () => {
      setStudentAnimation('swinging');
      setTimeout(() => setStudentAnimation('idle'), 2000);
      setTimeout(() => setStudentAnimation('thinking'), 3000);
      setTimeout(() => setStudentAnimation('idle'), 4500);
      setTimeout(() => setStudentAnimation('coding'), 5000);
      setTimeout(() => setStudentAnimation('idle'), 6500);
    };

    studentIntervalRef.current = setInterval(animateStudent, 8000);
    animateStudent();

    return () => {
      if (studentIntervalRef.current) {
        clearInterval(studentIntervalRef.current);
      }
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Student sitting on navbar component
  const StudentSitting = () => {
    const getStudentEmoji = () => {
      switch(studentAnimation) {
        case 'swinging': return '🦸‍♂️';
        case 'thinking': return '🤔';
        case 'coding': return '👨‍💻';
        default: return '🧑‍🎓';
      }
    };

    const getLegAnimation = () => {
      switch(studentAnimation) {
        case 'swinging': return 'animate-leg-swing';
        case 'thinking': return 'animate-leg-think';
        case 'coding': return 'animate-leg-code';
        default: return 'animate-leg-idle';
      }
    };

    return (
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden xl:block z-40">
        <div className="relative">
          {/* Student body with floating animation */}
          <div className={`relative animate-float-student ${studentAnimation === 'coding' ? 'animate-code-typing' : ''}`}>
            {/* Student body */}
            <div className="relative bg-gradient-to-b from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-3 border border-white/20 shadow-2xl">
              {/* Student avatar with animation */}
              <div className="relative">
                <div className="text-5xl transform transition-all duration-500 hover:scale-110">
                  {getStudentEmoji()}
                </div>
                
                {/* Thought bubble */}
                {studentAnimation === 'thinking' && (
                  <div className="absolute -top-12 -right-8 animate-thought-bubble">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl px-3 py-1.5 shadow-xl border border-gray-200 dark:border-gray-700">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                        Great Projects!
                      </span>
                    </div>
                    <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white dark:bg-gray-800 transform rotate-45 border-r border-b border-gray-200 dark:border-gray-700"></div>
                  </div>
                )}

                {/* Coding animation */}
                {studentAnimation === 'coding' && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 animate-code-lines">
                    <div className="flex gap-1">
                      <div className="w-1 h-4 bg-green-400 rounded-full animate-code-line"></div>
                      <div className="w-1 h-6 bg-blue-400 rounded-full animate-code-line animation-delay-200"></div>
                      <div className="w-1 h-3 bg-purple-400 rounded-full animate-code-line animation-delay-400"></div>
                      <div className="w-1 h-5 bg-pink-400 rounded-full animate-code-line animation-delay-600"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Student info */}
              <div className="text-center mt-1">
                <div className="text-[10px] font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 px-2 py-0.5 rounded-full">
                  Student
                </div>
              </div>
            </div>

            {/* Dangling legs */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {/* Left leg */}
              <div className={`relative ${getLegAnimation()}`}>
                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-b-full"></div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-2.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              </div>
              {/* Right leg */}
              <div className={`relative ${getLegAnimation()} animation-delay-300`}>
                <div className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-b-full"></div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-2.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              </div>
            </div>

            {/* Floating particles around student */}
            <div className="absolute -top-4 -left-4 text-lg animate-float-particle">✨</div>
            <div className="absolute -bottom-2 -right-4 text-lg animate-float-particle animation-delay-1000">💻</div>
            <div className="absolute top-0 -right-6 text-lg animate-float-particle animation-delay-2000">📚</div>
          </div>

          {/* Laptop on the side */}
          <div className="absolute -bottom-4 -left-12 transform rotate-12 animate-float-laptop">
            <div className="relative">
              <div className="w-12 h-9 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg p-1 shadow-xl">
                <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded flex items-center justify-center">
                  <Code className="w-4 h-4 text-white/60 animate-pulse" />
                </div>
              </div>
              <div className="w-14 h-1 bg-gradient-to-r from-gray-600 to-gray-800 mx-auto rounded-b"></div>
              {/* Screen glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg blur-md"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Student laptop promo component
  const StudentLaptopPromo = () => {
    if (!showPromo) return null;

    return (
      <div className="absolute top-full left-0 right-0 mt-2 animate-promo-slide z-50">
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

            {/* Laptop with student animation */}
            <div className="relative flex items-center gap-4">
              {/* Animated laptop icon */}
              <div className="relative flex-shrink-0">
                <div className="relative w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center animate-float-laptop">
                  <Laptop className="w-10 h-10 text-white" />
                  <div className="absolute -top-1 -right-1">
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                      <div className="absolute top-0 left-0 w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  {/* Student emoji floating around */}
                  <div className="absolute -top-6 -right-6 text-2xl animate-bounce-slow">👨‍🎓</div>
                  <div className="absolute -bottom-4 -left-4 text-xl animate-bounce-slow animation-delay-1000">📚</div>
                </div>
              </div>

              {/* Promo message */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-yellow-300 bg-yellow-500/20 px-2 py-0.5 rounded-full animate-pulse-glow">
                    ⭐ SPECIAL OFFER
                  </span>
                  <span className="text-xs text-white/60 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    500+ Students Joined
                  </span>
                </div>
                <p className="text-white font-semibold text-sm md:text-base truncate">
                  {promoMessage}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-xs text-white/80">
                    <Award className="w-3 h-3 text-yellow-300" />
                    <span>Trusted by Students</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/80">
                    <Rocket className="w-3 h-3 text-yellow-300" />
                    <span>Limited Time</span>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowPromo(false)}
                className="relative flex-shrink-0 text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
                <div className="h-full bg-white rounded-full animate-progress-shrink"></div>
              </div>
            </div>

            {/* Floating icons around promo */}
            <div className="absolute -top-8 left-1/4 text-3xl animate-float-icon">⚡</div>
            <div className="absolute -bottom-6 right-1/3 text-2xl animate-float-icon animation-delay-1000">✨</div>
            <div className="absolute top-1/2 -right-4 text-2xl animate-float-icon animation-delay-2000">💡</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav className={`
      sticky top-0 z-50 transition-all duration-500
      ${isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-xl' 
        : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md'
      }
      border-b border-gray-200/20 dark:border-gray-700/20
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo with animation */}
          <Link to="/" className="flex items-center space-x-2 group relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-md group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x group-hover:scale-105 transition-transform">
              FYP Marketplace
            </span>
            
            {/* Animated badge */}
            <span className="absolute -top-1 -right-6 text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-1.5 py-0.5 rounded-full animate-pulse-glow">
              NEW
            </span>
          </Link>

          {/* Student sitting on navbar - Right side */}
          <StudentSitting />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 z-10">
            <NavLink to="/" icon="🏠">Home</NavLink>
            <NavLink to="/projects" icon="📁">Projects</NavLink>
            <NavLink href="#contact" icon="📞">Contact</NavLink>
            
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
            >
              {isDarkMode ? 
                <Sun className="w-5 h-5 text-yellow-500" /> : 
                <Moon className="w-5 h-5 text-gray-700" />
              }
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden z-10">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              {isDarkMode ? 
                <Sun className="w-5 h-5 text-yellow-500" /> : 
                <Moon className="w-5 h-5 text-gray-700" />
              }
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 relative"
            >
              {isMenuOpen ? 
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" /> : 
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              }
              {/* Notification dot */}
              {!isMenuOpen && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden overflow-hidden transition-all duration-500 ease-in-out
          ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="py-4 space-y-3 border-t border-gray-200/20 dark:border-gray-700/20">
            <MobileNavLink to="/" icon="🏠" onClick={() => setIsMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/projects" icon="📁" onClick={() => setIsMenuOpen(false)}>
              Projects
            </MobileNavLink>
            <MobileNavLink href="#contact" icon="📞" onClick={() => setIsMenuOpen(false)}>
              Contact
            </MobileNavLink>
            
            {/* Mobile student stats */}
            <div className="pt-3 mt-3 border-t border-gray-200/20 dark:border-gray-700/20">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  500+ students
                </span>
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  4.9★ Rating
                </span>
                <span className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-blue-500" />
                  150+ Projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Promo with Student Laptop Animation */}
      <StudentLaptopPromo />
    </nav>
  );
}

// Desktop Nav Link Component
const NavLink = ({ to, href, icon, children }: { to?: string; href?: string; icon: string; children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const commonClasses = `
    relative px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300
    transition-all duration-300 hover:scale-105
    flex items-center gap-2
    hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20
  `;

  const content = (
    <>
      <span className="text-lg transform transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
        {icon}
      </span>
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
      </span>
    </>
  );

  if (to) {
    return (
      <Link 
        to={to} 
        className={`${commonClasses} group`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </Link>
    );
  }

  return (
    <a 
      href={href} 
      className={`${commonClasses} group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </a>
  );
};

// Mobile Nav Link Component
const MobileNavLink = ({ to, href, icon, onClick, children }: { to?: string; href?: string; icon: string; onClick: () => void; children: React.ReactNode }) => {
  const commonClasses = `
    flex items-center gap-3 px-4 py-2 rounded-lg
    text-gray-700 dark:text-gray-300 font-medium
    hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20
    transition-all duration-300 hover:scale-105 hover:translate-x-2
  `;

  if (to) {
    return (
      <Link to={to} className={commonClasses} onClick={onClick}>
        <span className="text-xl">{icon}</span>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={commonClasses} onClick={onClick}>
      <span className="text-xl">{icon}</span>
      {children}
    </a>
  );
};