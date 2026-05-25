import { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Aichatbot from "../assets/project_image/chatbot.png";
import AIcarrerguidance from "../assets/project_image/Ai-carrer-guidance.png";
import FakeNewsdetection from "../assets/project_image/fake news detection.png";
import seatAllocation from "../assets/project_image/Seat-Allocation.png";
import {Tag, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

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
  status: 'available' | 'unavailable';   // ← NEW
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
    full_description: `This AI-powered chatbot is designed to help citizens easily discover and apply for various government schemes and welfare programs. Users can interact naturally through chat in English or Tamil. The system analyzes user details like age, income, location, and category to recommend the most suitable schemes. It includes eligibility checker, application guidance, document requirements, and multi-language support. Built using advanced NLP and integrated with real government data for accurate and fast responses.`,
    category_id: "ai-ml",
    tech_stack: ["Python", "NLP", "Flask", "React", "MongoDB", "Tailwind"],
    features: ["AI-based scheme recommendation", "Chat interface", "User eligibility filtering", "Multi-language support", "Fast response system"],
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
    short_description: "Machine learning model to detect fake news articles with high accuracy",
    full_description: `An advanced Machine Learning system that detects fake news articles with high accuracy. The model is trained on large datasets containing both real and fake news from various sources. Users can input news text or URL, and the system instantly classifies it as Real or Fake with a confidence percentage. It also highlights suspicious words and provides detailed analysis. This project helps combat misinformation and is useful for media houses, fact-checkers, and general public.`,
    category_id: "ai-ml",
    tech_stack: ["Python", "Scikit-learn", "NLP", "Flask", "React"],
    features: ["Fake vs Real classification", "High accuracy prediction", "User input news checking", "Web interface", "Fast API response"],
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
    short_description: "AI-based system to suggest career paths based on student skills and interests",
    full_description: `This intelligent AI Career Guidance System helps students and fresh graduates choose the right career path. It analyzes academic performance, skills, interests, personality traits, and market trends to provide personalized career recommendations. The system suggests suitable courses, colleges, job roles, and skill development roadmaps. It includes a beautiful student dashboard, progress tracking, and counselor admin panel. Perfect for final year students looking for career clarity.`,
    category_id: "ai-ml",
    tech_stack: ["Python", "Machine Learning", "Flask", "React", "MySQL"],
    features: ["Career prediction system", "Student dashboard", "Skill analysis", "Personalized suggestions", "Course recommendations"],
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
    title: "Online College Seat Allocation & Booking Portal",
    short_description: "Centralized platform for students to check and reserve college seats",
    full_description: `A complete web-based platform for centralized college seat allocation and booking. Students can browse available courses, check real-time seat availability, apply for admissions, and make secure payments through Razorpay. The system features student login, admin dashboard for seat management, notification system, and responsive design. It eliminates manual processes and provides a smooth digital experience for both students and college administration.`,
    category_id: "web-dev",
    tech_stack: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "Tailwind"],
    features: ["Real-time seat updates", "Secure payment integration", "Admin dashboard", "Student login", "Responsive design"],
    price: 1799,
    discount: 25,
    status: "available",
    download_links: { ppt: "#", report: "#", source_code: "#" },
    image_url: seatAllocation,
    created_at: "2025-01-15",
    updated_at: "2025-02-05",
  },
];

// ---------- Component ----------
export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    if (selectedCategory === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', selectedCategory);
    }
    setSearchParams(searchParams, { replace: true });
  }, [selectedCategory, searchParams, setSearchParams]);

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category_id === selectedCategory);

  const getDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return Math.round(price * (1 - discount / 100));
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

  // Status Badge Component
  const StatusBadge = ({ status }: { status: 'available' | 'unavailable' }) => (
    <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm ${
      status === 'available' 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    }`}>
      {status === 'available' ? '✓ Available' : '✕ Unavailable'}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Our Projects</h1>
          <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto">
            Browse through our collection of high-quality final year projects
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Category Filter */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-3">
            <button onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'all' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border'
              }`}>
              All Projects
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </div>
        ) : (
          <>
            {/* Mobile Horizontal Scroll */}
            <div className="relative sm:hidden">
              {showLeftArrow && (
                <button onClick={scrollLeft} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur p-2 rounded-full shadow-md">
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              {showRightArrow && (
                <button onClick={scrollRight} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur p-2 rounded-full shadow-md">
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <div ref={scrollContainerRef} className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
                {filteredProjects.map((project) => {
                  const discountedPrice = getDiscountedPrice(project.price, project.discount);
                  return (
                    <Link key={project.id} to={`/project/${project.id}`}
                      className="min-w-[260px] bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col snap-start">
                      <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-purple-50">
                        {project.image_url && <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />}
                        <StatusBadge status={project.status} />
                        {project.discount && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                            {project.discount}% OFF
                          </div>
                        )}
                      </div>

                      <div className="p-3 flex flex-col flex-1">
                        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{project.title}</h3>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{project.short_description}</p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.tech_stack.slice(0, 2).map((tech, i) => (
                            <span key={i} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{tech}</span>
                          ))}
                        </div>

                        <div className="mt-auto flex justify-between items-center">
                          <div>
                            {project.discount ? (
                              <>
                                <span className="text-xs line-through text-gray-400">₹{project.price}</span>
                                <span className="font-bold text-lg ml-1">₹{discountedPrice}</span>
                              </>
                            ) : (
                              <span className="font-bold text-lg">₹{project.price}</span>
                            )}
                          </div>
                          <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 transition">View</button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => {
                const discountedPrice = getDiscountedPrice(project.price, project.discount);
                return (
                  <Link key={project.id} to={`/project/${project.id}`}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden flex">
                    <div className="relative w-[300px] h-[210px] flex-shrink-0 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
                      {project.image_url && (
                        <img src={project.image_url} alt={project.title} className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300" />
                      )}
                      <StatusBadge status={project.status} />
                      {project.discount && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold">
                          {project.discount}% OFF
                        </div>
                      )}
                    </div>

                    <div className="flex-1 p-5 flex flex-col">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.short_description}</p>

                      <div className="flex flex-wrap gap-2 mb-auto">
                        {project.tech_stack.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">{tech}</span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div>
                          {project.discount ? (
                            <div>
                              <span className="text-sm line-through text-gray-400">₹{project.price}</span>
                              <span className="font-bold text-xl ml-2">₹{discountedPrice}</span>
                            </div>
                          ) : (
                            <span className="font-bold text-xl">₹{project.price}</span>
                          )}
                        </div>
                        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                          View Details <ArrowRight className="w-4 h-4" />
                        </button>
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