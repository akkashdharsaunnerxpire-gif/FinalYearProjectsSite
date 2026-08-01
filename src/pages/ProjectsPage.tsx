import { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Aichatbot from "../assets/project_image/chatbot.png";
import AIcarrerguidance from "../assets/project_image/Ai-carrer-guidance.png";
import FakeNewsdetection from "../assets/project_image/fake news detection.png";
import seatAllocation from "../assets/project_image/Seat-Allocation.png";
import civicIssueReporting from "../assets/project_image/civic issue.png";
import { 
  Tag, ChevronLeft, ChevronRight, ArrowRight, Sparkles, 
  Star, TrendingUp, Award, Users, Search, Grid, List, Heart, 
  Volume2, VolumeX, Maximize, Filter, X, CheckCircle, AlertCircle, Play, Pause 
} from 'lucide-react';

// ---------- Types & Data ----------
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  short_description: string;
  full_description: string;
  category_id: string;
  tech_stack: string[];
  features: string[];
  price: number;
  discount?: number;
  status: 'available' | 'unavailable';
  download_links: {
    ppt?: string;
    report?: string;
    source_code?: string;
    paper?: string;
  };
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export const categories: Category[] = [
  { id: "ai-ml", name: "AI & Machine Learning", description: "Intelligent systems...", icon: "Brain", created_at: "2025-01-10" },
  { id: "web-dev", name: "Web Development", description: "Modern full-stack...", icon: "Code", created_at: "2025-01-10" },
  { id: "iot-embedded", name: "IoT & Embedded", description: "Hardware + software...", icon: "Cpu", created_at: "2025-02-15" },
  { id: "android", name: "Mobile Apps", description: "Android & cross-platform...", icon: "Smartphone", created_at: "2025-03-01" },
];

export const projects: Project[] = [
  {
    id: "p1",
    title: "AI Government Scheme Chatbot",
    short_description: "Smart chatbot to help users find government schemes based on eligibility",
    full_description: `This AI-powered chatbot is designed to help citizens easily discover and apply for various government schemes and welfare programs.`,
    category_id: "ai-ml",
    tech_stack: ["Python", "NLP", "Flask", "React", "MongoDB"],
    features: ["AI-based recommendation", "Chat interface", "Multi-language"],
    price: 4000,
    discount: 20,
    status: "available",
    download_links: { ppt: "#", report: "#", source_code: "#", paper: "#" },
    image_url: Aichatbot,
    created_at: "2025-03-20",
    updated_at: "2025-03-20",
  },
  {
    id: "p2",
    title: "Fake News Detection System",
    short_description: "ML model to detect fake news articles with high accuracy",
    full_description: `An advanced Machine Learning system that detects fake news articles with high accuracy.`,
    category_id: "ai-ml",
    tech_stack: ["Python", "Scikit-learn", "NLP", "Flask"],
    features: ["Fake vs Real", "High accuracy", "Web interface"],
    price: 9000,
    discount: 80,
    status: "available",
    download_links: { ppt: "#", report: "#", source_code: "#", paper: "#" },
    image_url: FakeNewsdetection,
    created_at: "2025-03-18",
    updated_at: "2025-03-18",
  },
  {
    id: "p3",
    title: "AI Career Guidance System",
    short_description: "AI system to suggest career paths based on student skills",
    full_description: `This intelligent AI Career Guidance System helps students choose the right career path.`,
    category_id: "ai-ml",
    tech_stack: ["Python", "ML", "Flask", "React", "MySQL"],
    features: ["Career prediction", "Student dashboard", "Skill analysis"],
    price: 6000,
    discount: 40,
    status: "unavailable",
    download_links: { ppt: "#", report: "#", source_code: "#", paper: "#" },
    image_url: AIcarrerguidance,
    created_at: "2025-03-15",
    updated_at: "2025-03-22",
  },
  {
    id: "p4",
    title: "College Seat Allocation Portal",
    short_description: "Platform for students to check and reserve college seats",
    full_description: `A complete web-based platform for centralized college seat allocation and booking.`,
    category_id: "web-dev",
    tech_stack: ["React", "Node.js", "Express", "MongoDB", "Razorpay"],
    features: ["Real-time seats", "Payment integration", "Admin dashboard"],
    price: 1799,
    discount: 25,
    status: "available",
    download_links: { ppt: "#", report: "#", source_code: "#" },
    image_url: seatAllocation,
    created_at: "2025-01-15",
    updated_at: "2025-02-05",
  },
  {
    id: "p5",
    title: "Civic Issue Reporting web Application",
    short_description: "people can report civic issues like potholes, garbage, etc. to local authorities",
    full_description: `A web application that allows citizens to report civic issues like potholes, garbage, and streetlight problems directly to local authorities. and admin can manage the issues and assign them to the concerned departments and take thier proof of work and close the issue.`,
    category_id: "web-dev",
    tech_stack: ["React", "Node.js", "Express", "MongoDB", "cloudinary","Redis","AndroidApp", "Push Notifications","Twilio SMS Integration Real-time Chat Support"],
    features: ["Real-time seats", "Payment integration", "Admin dashboard"],
    price:6667,
    discount: 25,
    status: "available",
    download_links: { ppt: "#", report: "#", source_code: "#" },
    image_url: civicIssueReporting,
    created_at: "2026-03-15",
    updated_at: "2026-04-05",
  },
];

// ---------- Component ----------
export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-low' | 'price-high'>('popular');
  const [likedProjects, setLikedProjects] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'available' | 'discounted'>('all');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const videoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Video background simulation
  useEffect(() => {
    if (isVideoPlaying) {
      videoIntervalRef.current = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            setIsVideoPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 50);
    } else {
      if (videoIntervalRef.current) {
        clearInterval(videoIntervalRef.current);
      }
    }
    return () => {
      if (videoIntervalRef.current) {
        clearInterval(videoIntervalRef.current);
      }
    };
  }, [isVideoPlaying]);

  // Filter and sort projects
  let filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category_id === selectedCategory);

  if (searchQuery) {
    filteredProjects = filteredProjects.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech_stack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  if (activeFilter === 'available') {
    filteredProjects = filteredProjects.filter(p => p.status === 'available');
  } else if (activeFilter === 'discounted') {
    filteredProjects = filteredProjects.filter(p => p.discount && p.discount > 0);
  }

  filteredProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'popular': return (b.discount || 0) - (a.discount || 0);
      case 'newest': return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      default: return 0;
    }
  });

  useEffect(() => {
    if (selectedCategory === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', selectedCategory);
    }
    setSearchParams(searchParams, { replace: true });
  }, [selectedCategory, searchParams, setSearchParams]);

  // Intersection Observer with animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-card-enter');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.project-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [filteredProjects]);

  const getDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return Math.round(price * (1 - discount / 100));
  };

  const toggleLike = (projectId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setLikedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
    if (!isVideoPlaying) {
      setVideoProgress(0);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const scrollLeft = () => scrollContainerRef.current?.scrollBy({ left: -260, behavior: 'smooth' });
  const scrollRight = () => scrollContainerRef.current?.scrollBy({ left: 260, behavior: 'smooth' });

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (el) {
      setShowLeftArrow(el.scrollLeft > 0);
      setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [filteredProjects]);

  const StatusBadge = ({ status }: { status: 'available' | 'unavailable' }) => (
    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
      status === 'available' 
        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
        : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
    }`}>
      {status === 'available' ? (
        <span className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> Available
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> Unavailable
        </span>
      )}
    </div>
  );

  const stats = [
    { icon: Users, label: 'Projects', value: projects.length, color: 'from-blue-500 to-blue-600' },
    { icon: Award, label: 'Categories', value: categories.length, color: 'from-purple-500 to-purple-600' },
    { icon: Star, label: 'Rating', value: '4.9★', color: 'from-yellow-500 to-yellow-600' },
    { icon: TrendingUp, label: 'Students', value: '500+', color: 'from-green-500 to-green-600' },
  ];

  return (
    <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Video-Style Hero Section with Animated Background */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 dark:from-blue-900 dark:via-slate-900 dark:to-purple-950 py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 bg-purple-500/30 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute -bottom-40 -left-40 w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 bg-blue-500/30 rounded-full blur-3xl animate-float-slow animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[450px] lg:w-[600px] h-[300px] md:h-[450px] lg:h-[600px] bg-pink-500/20 rounded-full blur-3xl animate-float-slow animation-delay-4000"></div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent animate-scan"></div>
          
          <div className="absolute inset-0 opacity-20 hidden md:block">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-0.5 bg-white/40 rounded-full animate-grain"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.5 + Math.random() * 1}s`,
                }}
              />
            ))}
          </div>

          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 md:w-1.5 h-1 md:h-1.5 bg-white/20 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}

          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-300"
              style={{ width: `${videoProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-3 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
          <button 
            onClick={toggleVideo}
            className="p-1.5 rounded-full hover:bg-white/20 transition-all hover:scale-110"
          >
            {isVideoPlaying ? (
              <Pause className="w-3 h-3 md:w-4 md:h-4 text-white" />
            ) : (
              <Play className="w-3 h-3 md:w-4 md:h-4 text-white" />
            )}
          </button>
          <button 
            onClick={toggleMute}
            className="p-1.5 rounded-full hover:bg-white/20 transition-all hover:scale-110"
          >
            {isMuted ? (
              <VolumeX className="w-3 h-3 md:w-4 md:h-4 text-white" />
            ) : (
              <Volume2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
            )}
          </button>
          <span className="text-white/60 text-[8px] md:text-[10px] font-mono">
            {Math.floor(videoProgress / 100 * 60)}:{(Math.floor(videoProgress / 100 * 60) % 60).toString().padStart(2, '0')}
          </span>
          <button className="p-1.5 rounded-full hover:bg-white/20 transition-all hover:scale-110 hidden md:block">
            <Maximize className="w-3 h-3 md:w-4 md:h-4 text-white" />
          </button>
          <span className="text-white/40 text-[8px] md:text-[10px] font-mono hidden md:block">HD</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block mb-3 md:mb-4 animate-fade-in">
            <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300">
              <span className="text-xs md:text-sm font-medium text-white flex items-center gap-1 md:gap-2">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 animate-spin-slow" />
                Explore Our Collection
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 animate-spin-slow" />
              </span>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3 animate-fade-in-up">
            Our Projects
            <span className="block text-base md:text-xl lg:text-2xl text-blue-200 dark:text-blue-300 mt-1">Final Year Project Marketplace</span>
          </h1>
          
          <p className="text-sm md:text-base lg:text-lg text-blue-100 dark:text-slate-300 max-w-2xl mx-auto px-4 animate-fade-in-up animation-delay-200">
            Browse high-quality final year projects with complete documentation
          </p>

          <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-2 md:gap-4 animate-fade-in-up animation-delay-400">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="group relative">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-xl blur opacity-0 group-hover:opacity-50 transition-all duration-500`}></div>
                  <div className="relative flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2.5 bg-white/10 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl border border-white/10 dark:border-white/5 hover:border-white/30 transition-all duration-300 hover:scale-105">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-blue-300 group-hover:text-white transition-colors" />
                    <div className="text-left">
                      <div className="text-sm md:text-base font-bold text-white">{stat.value}</div>
                      <div className="text-[9px] md:text-[11px] text-blue-200 dark:text-slate-300">{stat.label}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        {/* Filter & Search */}
        <div className="mb-6 md:mb-8 space-y-3 md:space-y-4">
          <div className="relative max-w-full md:max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 dark:text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Search projects, technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-sm md:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <div className="flex gap-1.5 md:gap-2 min-w-max md:flex-wrap md:justify-center">
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                    selectedCategory === 'all' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-2 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  All Projects
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                      selectedCategory === cat.id 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30' 
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-2 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden px-3 py-1.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-lg text-sm flex items-center gap-2 text-slate-700 dark:text-slate-200"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              <div className="hidden md:flex items-center gap-2 md:gap-3">
                <div className="flex gap-1 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-medium transition-all ${
                      activeFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFilter('available')}
                    className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-medium transition-all ${
                      activeFilter === 'available' ? 'bg-green-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Available
                  </button>
                  <button
                    onClick={() => setActiveFilter('discounted')}
                    className={`px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-[10px] md:text-xs font-medium transition-all ${
                      activeFilter === 'discounted' ? 'bg-orange-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    🔥 Discount
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-lg focus:border-blue-500 transition-all text-slate-800 dark:text-slate-200"
                >
                  <option value="popular">🔥 Popular</option>
                  <option value="newest">📅 Newest</option>
                  <option value="price-low">💰 Price: Low</option>
                  <option value="price-high">💰 Price: High</option>
                </select>

                <div className="flex gap-1 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 md:p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                      viewMode === 'grid' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Grid className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 md:p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                      viewMode === 'list' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <List className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile Filter Dropdown */}
              {showMobileFilters && (
                <div className="w-full md:hidden bg-white dark:bg-slate-900 rounded-xl p-4 shadow-xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Filters</h4>
                    <button onClick={() => setShowMobileFilters(false)} className="text-slate-500 dark:text-slate-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setActiveFilter('all'); setShowMobileFilters(false); }}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => { setActiveFilter('available'); setShowMobileFilters(false); }}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        activeFilter === 'available' ? 'bg-green-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Available
                    </button>
                    <button
                      onClick={() => { setActiveFilter('discounted'); setShowMobileFilters(false); }}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        activeFilter === 'discounted' ? 'bg-orange-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      🔥 Discount
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="flex-1 px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                    >
                      <option value="popular">🔥 Popular</option>
                      <option value="newest">📅 Newest</option>
                      <option value="price-low">💰 Price: Low</option>
                      <option value="price-high">💰 Price: High</option>
                    </select>

                    <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all ${
                          viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${
                          viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 md:py-20">
            <div className="inline-block p-4 md:p-6 bg-white dark:bg-slate-900 rounded-full shadow-xl mb-4 border border-slate-100 dark:border-slate-800 animate-float-slow">
              <Tag className="w-8 h-8 md:w-12 md:h-12 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg">No projects found.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setActiveFilter('all'); }}
              className="mt-4 text-blue-600 dark:text-blue-400 hover:underline font-medium hover:scale-105 transition-all inline-flex items-center gap-2 text-sm md:text-base"
            >
              View all projects <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {/* Mobile Horizontal Scroll View */}
            <div className="relative sm:hidden">
              {showLeftArrow && (
                <button onClick={scrollLeft} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-2 rounded-full shadow-lg text-slate-700 dark:text-white">
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              {showRightArrow && (
                <button onClick={scrollRight} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-2 rounded-full shadow-lg text-slate-700 dark:text-white">
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <div ref={scrollContainerRef} className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                {filteredProjects.map((project) => {
                  const discountedPrice = getDiscountedPrice(project.price, project.discount);
                  return (
                    <Link key={project.id} to={`/project/${project.id}`}
                      className="project-card min-w-[220px] max-w-[240px] bg-white dark:bg-slate-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col snap-start opacity-0 hover:scale-[1.02] border border-slate-200/80 dark:border-slate-800"
                    >
                      <div className="relative h-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
                        {project.image_url && (
                          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        )}
                        <StatusBadge status={project.status} />
                        {project.discount && (
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-0.5 rounded-full text-[8px] font-bold shadow-lg animate-pulse-glow">
                            🔥 {project.discount}%
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                      </div>

                      <div className="p-3 flex flex-col flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-xs line-clamp-1 flex-1 text-slate-900 dark:text-white">{project.title}</h3>
                          <button 
                            onClick={(e) => toggleLike(project.id, e)}
                            className="ml-1 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors hover:scale-125"
                          >
                            <Heart className={`w-3.5 h-3.5 ${likedProjects.includes(project.id) ? 'fill-red-500 text-red-500' : ''}`} />
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">{project.short_description}</p>

                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.tech_stack.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[9px]">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <div>
                            {project.discount ? (
                              <div className="flex items-center gap-1">
                                <span className="text-[10px] line-through text-slate-400 dark:text-slate-500">₹{project.price}</span>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">₹{discountedPrice}</span>
                              </div>
                            ) : (
                              <span className="text-sm font-bold text-slate-900 dark:text-white">₹{project.price}</span>
                            )}
                          </div>
                          <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
                            View <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop & Tablet Main Display Grid/List */}
            <div className={`hidden sm:grid ${
              viewMode === 'grid' 
                ? 'grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'grid-cols-1 gap-4'
            }`}>
              {filteredProjects.map((project) => {
                const discountedPrice = getDiscountedPrice(project.price, project.discount);
                return (
                  <Link key={project.id} to={`/project/${project.id}`}
                    className={`project-card bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex opacity-0 hover:-translate-y-1 border border-slate-200/80 dark:border-slate-800 group ${
                      viewMode === 'grid' ? 'flex-col' : 'flex-row items-center p-4'
                    }`}
                  >
                    <div className={`relative overflow-hidden ${
                      viewMode === 'grid' ? 'h-48 w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900' : 'h-32 w-48 flex-shrink-0 rounded-xl'
                    }`}>
                      {project.image_url ? (
                        <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400">
                          <Tag className="w-8 h-8" />
                        </div>
                      )}
                      <StatusBadge status={project.status} />
                      {project.discount && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse-glow">
                          🔥 {project.discount}% OFF
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{project.title}</h3>
                        <button 
                          onClick={(e) => toggleLike(project.id, e)}
                          className="ml-2 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors hover:scale-110"
                        >
                          <Heart className={`w-5 h-5 ${likedProjects.includes(project.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{project.short_description}</p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech_stack.map((tech, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div>
                          {project.discount ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xs line-through text-slate-400 dark:text-slate-500">₹{project.price}</span>
                              <span className="text-xl font-bold text-slate-900 dark:text-white">₹{discountedPrice}</span>
                            </div>
                          ) : (
                            <span className="text-xl font-bold text-slate-900 dark:text-white">₹{project.price}</span>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          Details <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}