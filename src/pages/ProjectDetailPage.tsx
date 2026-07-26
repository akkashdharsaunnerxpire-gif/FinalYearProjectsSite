import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from './ProjectsPage';
import {
  FileText,
  ArrowLeft,
  FileCode,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Wrench,
  Sparkles,
  Star,
  Zap,
  Cpu,
  CircuitBoard,
  Code,
} from 'lucide-react';
import PaymentSection from '../Components/PaymentSection';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const scaleOnHover = {
  hover: { scale: 1.03, transition: { duration: 0.2 } },
  tap: { scale: 0.97 }
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(59, 130, 246, 0.3)",
      "0 0 40px rgba(59, 130, 246, 0.6)",
      "0 0 20px rgba(59, 130, 246, 0.3)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<(typeof projects)[number] | null>(null);
  const [setupIncluded, setSetupIncluded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!id) return;
    const found = projects.find((p) => p.id === id);
    setProject(found || null);
    setSetupIncluded(false);
    setIsImageLoaded(false);
  }, [id]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!project) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.h2 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-3xl font-bold mb-4"
          >
            Project Not Found
          </motion.h2>
          <Link to="/projects" className="text-blue-600 hover:underline">← Back to Projects</Link>
        </div>
      </motion.div>
    );
  }

  const discountedPrice = project.discount
    ? Math.round(project.price * (1 - project.discount / 100))
    : project.price;

  const setupFee = 500;
  const totalPrice = discountedPrice + (setupIncluded ? setupFee : 0);
  const isAvailable = project.status === 'available';

  const baseMessage = `Hi, I want the "${project.title}" final year project.`;
  const setupMsg = setupIncluded
    ? ` Please include the setup & installation support (+₹${setupFee}).`
    : '';
  const whatsappMessage = encodeURIComponent(baseMessage + setupMsg);
  const whatsappNumber = '918015874936';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const negotiateMessage = encodeURIComponent(
    `Hi, I'm interested in the "${project.title}" project. Can we discuss a lower price?`
  );
  const negotiateLink = `https://wa.me/${whatsappNumber}?text=${negotiateMessage}`;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen relative overflow-hidden"
      >
        {/* Advanced Animated Background */}
        <div className="fixed inset-0 w-full h-full -z-10">
          {/* Layer 1: Main Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source 
              src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-with-moving-particles-5043.mp4" 
              type="video/mp4" 
            />
          </video>

          {/* Layer 2: Animated Gradient Overlay */}
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(30,58,138,0.6) 50%, rgba(0,0,0,0.8) 100%)",
                "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(88,28,135,0.6) 50%, rgba(0,0,0,0.8) 100%)",
                "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(30,58,138,0.6) 50%, rgba(0,0,0,0.8) 100%)",
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Layer 3: Animated Grid Lines */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
              animate={{
                backgroundPosition: ['0px 0px', '50px 50px'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Layer 4: Floating Geometric Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0.1,
                }}
                animate={{
                  x: [
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                  ],
                  y: [
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight,
                  ],
                  rotate: [0, 360, 0],
                  opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                  duration: 20 + Math.random() * 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {i % 3 === 0 ? (
                  <CircuitBoard className="w-8 h-8 text-blue-400" />
                ) : i % 3 === 1 ? (
                  <Cpu className="w-8 h-8 text-purple-400" />
                ) : (
                  <Code className="w-8 h-8 text-cyan-400" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Layer 5: Animated Particle System */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 4 + 1 + 'px',
                  height: Math.random() * 4 + 1 + 'px',
                  background: `radial-gradient(circle, rgba(59, 130, 246, ${0.1 + Math.random() * 0.3}), rgba(168, 85, 247, ${0.1 + Math.random() * 0.2}))`,
                }}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  x: [
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerWidth,
                  ],
                  y: [
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight,
                  ],
                  opacity: [0.1, 0.5, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 15 + Math.random() * 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Layer 6: Mouse-following Glow */}
          <motion.div
            className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%)',
              x: mousePosition.x * 100 - 200,
              y: mousePosition.y * 100 - 200,
            }}
            animate={{
              x: mousePosition.x * 100 - 200,
              y: mousePosition.y * 100 - 200,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 100,
            }}
          />

          {/* Layer 7: Scanning Line Effect */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"
            animate={{
              top: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 mb-8 font-medium transition-colors group"
            >
              <motion.span
                whileHover={{ x: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.span>
              <span>Back to Projects</span>
            </Link>
          </motion.div>

          {/* Project Image with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8 rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm relative"
            whileHover={{ scale: 1.02 }}
          >
            {project.image_url ? (
              <>
                <motion.img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-auto max-h-[420px] object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2 }}
                  onLoad={() => setIsImageLoaded(true)}
                />
                {!isImageLoaded && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    animate={{
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                {/* Image Overlay Glow */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    background: [
                      "linear-gradient(transparent 0%, rgba(59,130,246,0.1) 50%, transparent 100%)",
                      "linear-gradient(transparent 0%, rgba(168,85,247,0.1) 50%, transparent 100%)",
                      "linear-gradient(transparent 0%, rgba(59,130,246,0.1) 50%, transparent 100%)",
                    ]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </>
            ) : (
              <div className="bg-gray-800/50 h-80 flex items-center justify-center backdrop-blur-sm">
                <span className="text-gray-300 text-xl">No Image Available</span>
              </div>
            )}
          </motion.div>

          {/* Title Section */}
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10"
          >
            <div>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {project.title}
                <motion.span
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="inline-block ml-2"
                >
                  ✨
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 mt-3 drop-shadow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {project.short_description}
              </motion.p>
            </div>
            
            <motion.div 
              className={`px-5 py-3 rounded-2xl text-sm font-semibold inline-flex items-center gap-2 self-start backdrop-blur-md ${
                isAvailable ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}
              whileHover={{ scale: 1.05 }}
              animate={isAvailable ? {
                scale: [1, 1.05, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              } : {}}
            >
              {isAvailable ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              {isAvailable ? 'Available Now' : 'Unavailable'}
            </motion.div>
          </motion.div>

          {/* Content Sections with Stagger Animation */}
          <motion.div 
            className="space-y-10"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Description Section */}
            <motion.section 
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 border border-white/10"
            >
              <motion.h2 
                className="text-2xl font-bold mb-5 flex items-center gap-3 text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <FileText className="w-6 h-6 text-blue-400" />
                </motion.div>
                Project Description
              </motion.h2>
              <motion.p 
                className="text-gray-100 leading-relaxed whitespace-pre-line text-[17px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {project.full_description || "No description available for this project."}
              </motion.p>
            </motion.section>

            {/* Features Section */}
            <motion.section 
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 border border-white/10"
            >
              <motion.h2 
                className="text-2xl font-bold mb-6 flex items-center gap-3 text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Sparkles className="w-6 h-6 text-blue-400" />
                Key Features
              </motion.h2>
              <motion.ul className="space-y-4">
                {project.features.map((feature, i) => (
                  <motion.li 
                    key={i} 
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    </motion.div>
                    <span className="text-gray-100">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.section>

            {/* Tech Stack Section */}
            <motion.section 
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 border border-white/10"
            >
              <motion.h2 
                className="text-2xl font-bold mb-6 flex items-center gap-3 text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Zap className="w-6 h-6 text-blue-400" />
                Tech Stack
              </motion.h2>
              <div className="flex flex-wrap gap-3">
                {project.tech_stack.map((tech, i) => (
                  <motion.span 
                    key={i} 
                    className="px-4 py-2 bg-blue-500/20 text-blue-200 rounded-2xl text-sm font-medium border border-blue-500/30 backdrop-blur-sm cursor-default"
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.7 + i * 0.08, type: "spring", stiffness: 200 }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      backgroundColor: "rgba(59, 130, 246, 0.4)",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.section>

            {/* Pricing Section */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-blue-600/90 to-purple-700/90 backdrop-blur-md rounded-3xl p-8 md:p-10 text-white border border-white/10 shadow-2xl relative overflow-hidden"
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(59,130,246,0.2), rgba(168,85,247,0.2))",
                    "linear-gradient(45deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))",
                    "linear-gradient(45deg, rgba(236,72,153,0.2), rgba(59,130,246,0.2))",
                  ]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="relative z-10 flex flex-col gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-blue-200">Complete Project Package</p>
                  {project.discount ? (
                    <motion.div 
                      className="flex items-center gap-3 mt-2 flex-wrap"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="line-through text-blue-300">₹{project.price}</span>
                      <motion.span 
                        className="text-3xl md:text-4xl font-bold"
                        animate={floatingAnimation.animate}
                      >
                        ₹{discountedPrice}
                      </motion.span>
                      <motion.span 
                        className="bg-green-500/80 px-3 py-1 rounded-xl text-sm font-semibold backdrop-blur-sm"
                        animate={pulseGlow.animate}
                      >
                        {project.discount}% OFF
                      </motion.span>
                    </motion.div>
                  ) : (
                    <span className="text-3xl md:text-4xl font-bold">₹{project.price}</span>
                  )}
                </motion.div>

                {/* Negotiation Message */}
                {isAvailable && (
                  <motion.div 
                    className="bg-yellow-500/20 rounded-xl p-3 text-sm flex items-center gap-2 flex-wrap backdrop-blur-sm border border-yellow-500/20"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <motion.span
                      animate={{
                        rotate: [0, 10, -10, 10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      💬
                    </motion.span>
                    <span>
                      Want a lower price?{' '}
                      <a
                        href={negotiateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-semibold hover:text-yellow-200 transition-colors"
                      >
                        Chat with us on WhatsApp
                      </a>{' '}
                      – we can discuss.
                    </span>
                  </motion.div>
                )}

                {/* Setup Toggle */}
                {isAvailable && (
                  <motion.label 
                    className="flex items-center gap-3 cursor-pointer select-none bg-white/10 rounded-xl p-3 w-fit hover:bg-white/20 transition-colors border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <motion.input
                      type="checkbox"
                      checked={setupIncluded}
                      onChange={(e) => setSetupIncluded(e.target.checked)}
                      className="w-5 h-5 accent-blue-500 rounded"
                      whileTap={{ scale: 1.3 }}
                    />
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{
                          rotate: setupIncluded ? [0, 360] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Wrench className="w-5 h-5" />
                      </motion.div>
                      <span className="font-medium">Setup & Installation Support</span>
                      <span className="text-yellow-200 text-sm">(+₹{setupFee})</span>
                    </div>
                  </motion.label>
                )}

                {/* Total Price */}
                {isAvailable && setupIncluded && (
                  <motion.div 
                    className="border-t border-white/20 pt-3 mt-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-blue-200 text-sm">Total amount (incl. setup)</p>
                    <motion.p 
                      className="text-3xl md:text-4xl font-bold"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      ₹{totalPrice}
                    </motion.p>
                  </motion.div>
                )}

                {/* Buy Now Button */}
                {isAvailable ? (
                  <motion.a
                    href="#payment"
                    className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-semibold text-lg text-center mt-2 inline-block shadow-lg hover:shadow-xl relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                      animate={{
                        x: ["0%", "100%", "0%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span className="relative z-10 flex items-center gap-2 justify-center">
                      Buy Now
                      <motion.span
                        animate={{
                          x: [0, 5, 0],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.a>
                ) : (
                  <div className="bg-white/20 px-8 py-5 rounded-2xl text-center backdrop-blur-sm">
                    <p className="font-semibold">This project is currently unavailable</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Payment Section */}
          {isAvailable && (
            <motion.div 
              id="payment" 
              className="mt-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <PaymentSection price={totalPrice} />
            </motion.div>
          )}
        </div>

        {/* Enhanced Floating WhatsApp Button */}
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 z-50"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 1.5 
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 30px rgba(74, 222, 128, 0.5)"
          }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <MessageCircle className="w-7 h-7" />
          </motion.div>
          <motion.span 
            className="font-medium pr-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 }}
          >
            Chat on WhatsApp
          </motion.span>
        </motion.a>

        {/* Floating Decorative Elements */}
        <motion.div
          className="fixed top-20 left-10 text-yellow-400/20"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Star className="w-8 h-8" />
        </motion.div>
        <motion.div
          className="fixed bottom-40 right-10 text-purple-400/20"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Sparkles className="w-10 h-10" />
        </motion.div>
        <motion.div
          className="fixed top-1/3 right-5 text-cyan-400/20"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Cpu className="w-6 h-6" />
        </motion.div>
        <motion.div
          className="fixed bottom-1/3 left-5 text-blue-400/20"
          animate={{
            x: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Code className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}