import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { projects } from './ProjectsPage';
import {
  FileText,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Wrench,
  Sparkles,
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

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
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
      ease: "easeInOut" as const
    }
  }
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<(typeof projects)[number] | null>(null);
  const [setupIncluded, setSetupIncluded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Mouse Tracking for Animated Glow Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  useEffect(() => {
    if (!id) return;
    const found = projects.find((p) => p.id === id);
    setProject(found || null);
    setSetupIncluded(false);
    setIsImageLoaded(false);
  }, [id]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 200 - 100);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 200 - 100);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!project) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center transition-colors duration-300 bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-white"
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
          <Link to="/projects" className="text-blue-500 hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden transition-colors duration-500 bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white"
    >
      {/* Advanced Animated Background */}
      <div className="fixed inset-0 w-full h-full -z-10">
        {/* Layer 1: Main Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-opacity duration-500 opacity-10 dark:opacity-40"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-with-moving-particles-5043.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Layer 2: Animated Overlay Gradient */}
        <div className="absolute inset-0 transition-opacity duration-500 bg-slate-100/80 dark:bg-slate-950/80" />

        {/* Layer 3: Animated Grid Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
            animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Layer 4: Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: `${(i * 7) % 100}vw`,
                y: `${(i * 13) % 100}vh`,
                opacity: 0.1,
              }}
              animate={{
                x: [`${(i * 7) % 100}vw`, `${(i * 19) % 100}vw`, `${(i * 7) % 100}vw`],
                y: [`${(i * 13) % 100}vh`, `${(i * 23) % 100}vh`, `${(i * 13) % 100}vh`],
                rotate: [0, 360, 0],
                opacity: [0.05, 0.2, 0.05],
              }}
              transition={{ duration: 20 + i * 2, repeat: Infinity, ease: "linear" }}
            >
              {i % 3 === 0 ? (
                <CircuitBoard className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              ) : i % 3 === 1 ? (
                <Cpu className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              ) : (
                <Code className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Layer 5: Mouse-following Glow */}
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent 70%)',
            x: smoothX,
            y: smoothY,
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
            className="inline-flex items-center gap-2 font-medium transition-colors mb-8 group text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <motion.span whileHover={{ x: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <ArrowLeft className="w-5 h-5" />
            </motion.span>
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Project Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8 rounded-3xl overflow-hidden shadow-2xl border backdrop-blur-sm relative border-slate-200/80 bg-white/40 dark:border-white/10 dark:bg-transparent"
          whileHover={{ scale: 1.01 }}
        >
          {project.image_url ? (
            <>
              <motion.img
                src={project.image_url}
                alt={project.title}
                className="w-full h-auto max-h-[420px] object-cover"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2 }}
                onLoad={() => setIsImageLoaded(true)}
              />
              {!isImageLoaded && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </>
          ) : (
            <div className="h-80 flex items-center justify-center backdrop-blur-sm bg-slate-200/50 text-slate-600 dark:bg-gray-800/50 dark:text-gray-300">
              <span className="text-xl">No Image Available</span>
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
              className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white dark:drop-shadow-lg"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {project.title}
              <motion.span
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block ml-2"
              >
                ✨
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl mt-3 text-slate-600 dark:text-blue-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {project.short_description}
            </motion.p>
          </div>
          
          <motion.div 
            className={`px-5 py-3 rounded-2xl text-sm font-semibold inline-flex items-center gap-2 self-start backdrop-blur-md ${
              isAvailable 
                ? 'bg-green-100 text-green-700 border border-green-300 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30'
                : 'bg-red-100 text-red-700 border border-red-300 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/30'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {isAvailable ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {isAvailable ? 'Available Now' : 'Unavailable'}
          </motion.div>
        </motion.div>

        {/* Content Sections */}
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
            className="backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 border transition-all bg-white/80 border-slate-200/80 text-slate-800 dark:bg-white/10 dark:border-white/10 dark:text-white"
          >
            <motion.h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-slate-900 dark:text-white">
              <FileText className="w-6 h-6 text-blue-500" />
              Project Description
            </motion.h2>
            <p className="leading-relaxed whitespace-pre-line text-[17px] text-slate-700 dark:text-gray-200">
              {project.full_description || "No description available for this project."}
            </p>
          </motion.section>

          {/* Key Features Section */}
          <motion.section 
            variants={fadeInUp}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 border transition-all bg-white/80 border-slate-200/80 text-slate-800 dark:bg-white/10 dark:border-white/10 dark:text-white"
          >
            <motion.h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
              <Sparkles className="w-6 h-6 text-blue-500" />
              Key Features
            </motion.h2>
            <ul className="space-y-4">
              {(project.features || []).map((feature, i) => (
                <motion.li 
                  key={i} 
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-gray-200">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          {/* Tech Stack Section */}
          <motion.section 
            variants={fadeInUp}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 border transition-all bg-white/80 border-slate-200/80 dark:bg-white/10 dark:border-white/10"
          >
            <motion.h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
              <Zap className="w-6 h-6 text-blue-500" />
              Tech Stack
            </motion.h2>
            <div className="flex flex-wrap gap-3">
              {(project.tech_stack || []).map((tech, i) => (
                <motion.span 
                  key={i} 
                  className="px-4 py-2 rounded-2xl text-sm font-medium border backdrop-blur-sm cursor-default transition-all bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-500/20 dark:text-blue-200 dark:border-blue-500/30 dark:hover:bg-blue-500/30"
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.section>

          {/* Pricing Card */}
          <motion.div 
            variants={fadeInUp}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="backdrop-blur-md rounded-3xl p-8 md:p-10 border shadow-2xl relative overflow-hidden text-white bg-gradient-to-br from-blue-600 to-indigo-700 border-blue-400 dark:from-blue-900/90 dark:to-purple-900/90 dark:border-white/10"
          >
            <div className="relative z-10 flex flex-col gap-6">
              <div>
                <p className="text-blue-100 font-medium">Complete Project Package</p>
                {project.discount ? (
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="line-through text-blue-200/80">₹{project.price}</span>
                    <motion.span className="text-3xl md:text-4xl font-bold" animate={floatingAnimation.animate}>
                      ₹{discountedPrice}
                    </motion.span>
                    <motion.span className="bg-green-500 text-white px-3 py-1 rounded-xl text-sm font-semibold" animate={pulseGlow.animate}>
                      {project.discount}% OFF
                    </motion.span>
                  </div>
                ) : (
                  <span className="text-3xl md:text-4xl font-bold">₹{project.price}</span>
                )}
              </div>

              {/* Negotiation Link */}
              {isAvailable && (
                <div className="bg-amber-400/20 text-amber-100 border border-amber-300/30 rounded-xl p-3 text-sm flex items-center gap-2 flex-wrap backdrop-blur-sm">
                  <span>💬 Want a lower price? </span>
                  <a
                    href={negotiateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold hover:text-white transition-colors"
                  >
                    Chat with us on WhatsApp
                  </a>
                  <span>– we can discuss.</span>
                </div>
              )}

              {/* Setup Toggle */}
              {isAvailable && (
                <label className="flex items-center gap-3 cursor-pointer select-none bg-white/10 rounded-xl p-3 w-fit hover:bg-white/20 transition-colors border border-white/10">
                  <input
                    type="checkbox"
                    checked={setupIncluded}
                    onChange={(e) => setSetupIncluded(e.target.checked)}
                    className="w-5 h-5 accent-blue-500 rounded cursor-pointer"
                  />
                  <div className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-blue-200" />
                    <span className="font-medium">Setup & Installation Support</span>
                    <span className="text-amber-200 text-sm">(+₹{setupFee})</span>
                  </div>
                </label>
              )}

              {/* Total Price Display */}
              <AnimatePresence>
                {isAvailable && setupIncluded && (
                  <motion.div 
                    className="border-t border-white/20 pt-3 mt-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p className="text-blue-100 text-sm">Total amount (incl. setup)</p>
                    <p className="text-3xl md:text-4xl font-bold">₹{totalPrice}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buy Now Action */}
              {isAvailable ? (
                <motion.a
                  href="#payment"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-4 rounded-2xl font-semibold text-lg text-center mt-2 inline-block shadow-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Buy Now →
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

      {/* WhatsApp Floating Button */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 z-50 transition-colors"
        whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(74, 222, 128, 0.5)" }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-7 h-7" />
        <span className="font-medium pr-2 hidden sm:inline">Chat on WhatsApp</span>
      </motion.a>
    </motion.div>
  );
}