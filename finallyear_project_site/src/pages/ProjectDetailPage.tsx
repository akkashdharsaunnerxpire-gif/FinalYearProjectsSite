import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from './ProjectsPage';
import {
  FileText,
  ArrowLeft,
  FileCode,
  IndianRupee,
  CheckCircle,
  AlertCircle,
  MessageCircle,   // ← WhatsApp Icon
} from 'lucide-react';
import PaymentSection from '../Components/PaymentSection';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<(typeof projects)[number] | null>(null);

  useEffect(() => {
    if (!id) return;
    const found = projects.find((p) => p.id === id);
    setProject(found || null);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
          <Link to="/projects" className="text-blue-600 hover:underline">← Back to Projects</Link>
        </div>
      </div>
    );
  }

  const discountedPrice = project.discount
    ? Math.round(project.price * (1 - project.discount / 100))
    : project.price;

  const isAvailable = project.status === 'available';

  // WhatsApp Message
  const whatsappMessage = encodeURIComponent(
    `Hi, I want the "${project.title}" final year project. Please send me more details.`
  )
  const whatsappNumber = "918015874936"; // ← CHANGE THIS TO YOUR NUMBER

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back Button */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </Link>

        {/* Project Image */}
        <div className="mb-8 rounded-3xl overflow-hidden shadow-xl">
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-auto max-h-[420px] object-cover"
            />
          ) : (
            <div className="bg-gray-200 h-80 flex items-center justify-center">
              <span className="text-gray-400 text-xl">No Image Available</span>
            </div>
          )}
        </div>

        {/* Title + Status */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 mt-3">
              {project.short_description}
            </p>
          </div>
          <div className={`px-5 py-3 rounded-2xl text-sm font-semibold inline-flex items-center gap-2 self-start ${
            isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isAvailable ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {isAvailable ? 'Available Now' : 'Unavailable'}
          </div>
        </div>

        <div className="space-y-10">
          {/* Project Description */}
          <section className="bg-white rounded-3xl shadow p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              Project Description
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[17px]">
              {project.full_description || "No description available for this project."}
            </p>
          </section>

          {/* Key Features */}
          <section className="bg-white rounded-3xl shadow p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              Key Features
            </h2>
            <ul className="space-y-4">
              {project.features.map((feature, i) => (
                <li key={i} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tech Stack */}
          <section className="bg-white rounded-3xl shadow p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FileCode className="w-6 h-6 text-blue-600" />
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.tech_stack.map((tech, i) => (
                <span 
                  key={i} 
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-2xl text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Pricing & Buy Button */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 md:p-10 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-blue-100">Complete Project Package</p>
                {project.discount ? (
                  <div className="flex items-center gap-3 mt-2">
                    <span className="line-through text-blue-200">₹{project.price}</span>
                    <span className="text-4xl font-bold">₹{discountedPrice}</span>
                    <span className="bg-green-500 px-3 py-1 rounded-xl text-sm font-semibold">
                      {project.discount}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold">₹{project.price}</span>
                )}
              </div>

              {isAvailable ? (
                <a
                  href="#payment"
                  className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-50 transition"
                >
                  Buy Now
                </a>
              ) : (
                <div className="bg-white/20 px-8 py-5 rounded-2xl text-center">
                  <p className="font-semibold">This project is currently unavailable</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment Section */}
        {isAvailable && (
          <div id="payment" className="mt-16">
            <PaymentSection price={discountedPrice} />
          </div>
        )}
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 transition-all hover:scale-110 z-50"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="font-medium pr-2">Chat on WhatsApp</span>
      </a>
    </div>
  );
}