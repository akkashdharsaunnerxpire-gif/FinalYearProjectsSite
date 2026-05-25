import { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { IndianRupee, Tag, ChevronLeft, ChevronRight, ArrowRight, Code, Sparkles } from 'lucide-react';

// ---------- Types & Data (unchanged) ----------
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
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    description: "Intelligent systems, computer vision, NLP and deep learning projects",
    icon: "Brain",
    created_at: "2025-01-10",
  },
  {
    id: "web-dev",
    name: "Web Development",
    description: "Modern full-stack web applications and websites",
    icon: "Code",
    created_at: "2025-01-10",
  },
  {
    id: "iot-embedded",
    name: "IoT & Embedded",
    description: "Hardware + software integrated smart systems",
    icon: "Cpu",
    created_at: "2025-02-15",
  },
  {
    id: "android",
    name: "Mobile Apps",
    description: "Android & cross-platform mobile applications",
    icon: "Smartphone",
    created_at: "2025-03-01",
  },
];

export const projects: Project[] = [
  {
    id: "p1",
    title: "AI Government Scheme Chatbot",
    short_description: "Smart chatbot to help users find government schemes based on eligibility",
    full_description: `...`,
    category_id: "ai-ml",
    tech_stack: ["Python", "NLP", "Flask", "React", "MongoDB", "Tailwind"],
    features: ["AI-based scheme recommendation", "Chat interface", "User eligibility filtering", "Multi-language support", "Fast response system"],
    price: 4000,
    discount: 15,
    download_links: { ppt: "#", report: "#", source_code: "#", paper: "#" },
    image_url: "https://images.unsplash.com/photo-1581091870627-3a5f4f4b1a06?w=800",
    created_at: "2025-03-20",
    updated_at: "2025-03-20",
  },
  {
    id: "p2",
    title: "Fake News Detection System",
    short_description: "Machine learning model to detect fake news articles with high accuracy",
    full_description: `...`,
    category_id: "ai-ml",
    tech_stack: ["Python", "Scikit-learn", "NLP", "Flask", "React"],
    features: ["Fake vs Real classification", "High accuracy prediction", "User input news checking", "Web interface", "Fast API response"],
    price: 3500,
    discount: 20,
    download_links: { ppt: "#", report: "#", source_code: "#", paper: "#" },
    image_url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
    created_at: "2025-03-18",
    updated_at: "2025-03-18",
  },
  {
    id: "p3",
    title: "AI Career Guidance System",
    short_description: "AI-based system to suggest career paths based on student skills and interests",
    full_description: `...`,
    category_id: "ai-ml",
    tech_stack: ["Python", "Machine Learning", "Flask", "React", "MySQL"],
    features: ["Career prediction system", "Student dashboard", "Skill analysis", "Personalized suggestions", "Course recommendations"],
    price: 3500,
    discount: 10,
    download_links: { ppt: "#", report: "#", source_code: "#", paper: "#" },
    image_url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
    created_at: "2025-03-22",
    updated_at: "2025-03-22",
  },
  {
    id: "p4",
    title: "Online College Seat Allocation & Booking Portal",
    short_description: "Centralized platform for students to check and reserve college seats",
    full_description: `...`,
    category_id: "web-dev",
    tech_stack: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "Tailwind", "Socket.io"],
    features: ["Real-time seat updates", "Secure payment integration", "Admin dashboard", "Student login", "Responsive design"],
    price: 1799,
    discount: 25,
    download_links: { ppt: "#", report: "#", source_code: "#" },
    image_url: null,
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

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category_id === selectedCategory);

  const getDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return null;
    return Math.round(price * (1 - discount / 100));
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            Our Projects
          </h1>
          <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto">
            Browse through our collection of high-quality final year projects
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Category Filter */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 md:px-6 py-1.5 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All Projects
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 md:px-6 py-1.5 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Display */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Tag className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </div>
        ) : (
          <>
            {/* 📱 Mobile Horizontal Scroll with Arrows */}
            <div className="relative sm:hidden">
              {showLeftArrow && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur rounded-full p-1.5 shadow-md hover:bg-white transition-all"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-700" />
                </button>
              )}
              {showRightArrow && (
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur rounded-full p-1.5 shadow-md hover:bg-white transition-all"
                >
                  <ChevronRight className="w-4 h-4 text-gray-700" />
                </button>
              )}

              <div
                ref={scrollContainerRef}
                className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none' }}
              >
                {filteredProjects.map((project) => {
                  const discountedPrice = getDiscountedPrice(project.price, project.discount);
                  return (
                    <Link
                      key={project.id}
                      to={`/project/${project.id}`}
                      className="min-w-[260px] max-w-[260px] snap-start bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Image Section */}
                      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                        {project.image_url ? (
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Tag className="w-10 h-10 text-blue-300" />
                          </div>
                        )}
                        {project.discount && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                            {project.discount}% OFF
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-2.5 flex flex-col flex-grow">
                        <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {project.short_description}
                        </p>

                        {/* Additional details: tech stack or features */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.tech_stack.slice(0, 2).map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.features.slice(0, 1).map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Price with discount */}
                        <div className="mt-auto flex justify-between items-center">
                          <div>
                            {project.discount ? (
                              <>
                                <span className="text-xs line-through text-gray-400 mr-1">
                                  ₹{project.price}
                                </span>
                                <span className="font-bold text-sm flex items-center">
                                  <IndianRupee className="w-3 h-3 mr-0.5" />
                                  {discountedPrice}
                                </span>
                              </>
                            ) : (
                              <span className="font-bold text-sm flex items-center">
                                <IndianRupee className="w-3 h-3 mr-0.5" />
                                {project.price}
                              </span>
                            )}
                          </div>
                          <button className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                            View
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
            </div>

            {/* 💻 Desktop: 2‑Column Grid with Horizontal Cards */}
            <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredProjects.map((project) => {
                const discountedPrice = getDiscountedPrice(project.price, project.discount);
                return (
                  <Link
                    key={project.id}
                    to={`/project/${project.id}`}
                    className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-row h-auto"
                  >
                    {/* Image Section (Left) */}
                    <div className="relative w-1/3 aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Tag className="w-8 h-8 text-blue-300" />
                        </div>
                      )}
                      {project.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                          {project.discount}% OFF
                        </div>
                      )}
                    </div>

                    {/* Content Section (Right) */}
                    <div className="flex-1 p-3 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-semibold mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {project.short_description}
                        </p>

                        {/* Additional details: tech stack and features preview */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.tech_stack.slice(0, 2).map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.features.slice(0, 1).map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div>
                          {project.discount ? (
                            <>
                              <span className="text-xs line-through text-gray-400 mr-1">
                                ₹{project.price}
                              </span>
                              <span className="font-bold text-base flex items-center">
                                <IndianRupee className="w-4 h-4 mr-0.5" />
                                {discountedPrice}
                              </span>
                            </>
                          ) : (
                            <span className="font-bold text-base flex items-center">
                              <IndianRupee className="w-4 h-4 mr-0.5" />
                              {project.price}
                            </span>
                          )}
                        </div>
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                          View <ArrowRight className="w-3 h-3" />
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