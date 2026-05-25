import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../lib/types';
import {
  FileText,
  ArrowLeft,
  FileCode,
  IndianRupee,
  CheckCircle,
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h2>
          <Link to="/projects" className="text-blue-600 hover:text-blue-700 font-medium">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // Calculate discounted price if discount exists
  const discountedPrice = project.discount
    ? Math.round(project.price * (1 - project.discount / 100))
    : project.price;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {project.short_description}
          </p>
        </div>

        <div className="space-y-8">
          {/* Overview */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              Overview
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {project.full_description}
            </p>
          </section>

          {/* Key Features (reduced to 3 most important) */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              Key Features
            </h2>
            <ul className="space-y-3">
              {project.features.slice(0, 3).map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tech Stack (condensed) */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FileCode className="w-6 h-6 text-blue-600" />
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.slice(0, 5).map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Purchase Card with Discount */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-blue-100 text-sm">Complete Project Package</p>
                {project.discount ? (
                  <div className="flex items-center gap-2">
                    <span className="text-blue-200 line-through text-sm flex items-center">
                      <IndianRupee className="w-3 h-3" />{project.price}
                    </span>
                    <span className="text-3xl font-bold flex items-center gap-1">
                      <IndianRupee className="w-6 h-6" />
                      {discountedPrice}
                    </span>
                    <span className="text-xs bg-green-500 px-2 py-0.5 rounded-full">
                      -{project.discount}%
                    </span>
                  </div>
                ) : (
                  <p className="text-3xl font-bold flex items-center gap-1">
                    <IndianRupee className="w-6 h-6" />
                    {project.price}
                  </p>
                )}
              </div>
              <a
                href="#payment"
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all hover:shadow-xl"
              >
                Purchase Now
              </a>
            </div>
          </div>
        </div>

        <div id="payment" className="mt-12">
          <PaymentSection price={discountedPrice} />
        </div>
      </div>
    </div>
  );
}