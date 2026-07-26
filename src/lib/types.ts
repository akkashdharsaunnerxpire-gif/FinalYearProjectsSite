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
  discount?: number;          // discount percentage (e.g., 20 for 20% off)
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
    short_description:
      "Smart chatbot to help users find government schemes based on eligibility",
    full_description: `This AI-powered chatbot helps users discover relevant government schemes instantly.
Users can ask queries in natural language and get accurate scheme suggestions.

Key highlights:
• NLP-based query understanding
• Personalized scheme recommendation
• Multi-language support (English + Tamil)
• Integration with government datasets
• Web-based chat interface using React & Flask`,
    category_id: "ai-ml",
    tech_stack: ["Python", "NLP", "Flask", "React", "MongoDB", "Tailwind"],
    features: [
      "AI-based scheme recommendation",
      "Chat interface (real-time)",
      "User eligibility filtering",
      "Multi-language support",
      "Fast response system",
    ],
    price: 4000,
    discount: 15,   // 15% off
    download_links: {
      ppt: "#",
      report: "#",
      source_code: "#",
      paper: "#",
    },
    image_url:
      "https://images.unsplash.com/photo-1581091870627-3a5f4f4b1a06?w=800",
    created_at: "2025-03-20",
    updated_at: "2025-03-20",
  },

  {
    id: "p2",
    title: "Fake News Detection System",
    short_description:
      "Machine learning model to detect fake news articles with high accuracy",
    full_description: `This project uses machine learning and NLP techniques to classify news as real or fake.

Key highlights:
• Dataset preprocessing & cleaning
• TF-IDF / Count Vectorizer
• Model training (Logistic Regression / Naive Bayes)
• Accuracy optimization & evaluation
• Flask API + React frontend`,
    category_id: "ai-ml",
    tech_stack: ["Python", "Scikit-learn", "NLP", "Flask", "React"],
    features: [
      "Fake vs Real classification",
      "High accuracy prediction",
      "User input news checking",
      "Web interface",
      "Fast API response",
    ],
    price: 3500,
    discount: 20,   // 20% off
    download_links: {
      ppt: "#",
      report: "#",
      source_code: "#",
      paper: "#",
    },
    image_url:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
    created_at: "2025-03-18",
    updated_at: "2025-03-18",
  },

  {
    id: "p3",
    title: "AI Career Guidance System",
    short_description:
      "AI-based system to suggest career paths based on student skills and interests",
    full_description: `An intelligent career guidance platform that recommends suitable career paths using AI.

Key highlights:
• Skill-based career prediction
• Questionnaire-based analysis
• ML model for recommendation
• Dashboard for students
• Course suggestions integration`,
    category_id: "ai-ml",
    tech_stack: ["Python", "Machine Learning", "Flask", "React", "MySQL"],
    features: [
      "Career prediction system",
      "Student dashboard",
      "Skill analysis",
      "Personalized suggestions",
      "Course recommendations",
    ],
    price: 3500,
    discount: 10,   // 10% off
    download_links: {
      ppt: "#",
      report: "#",
      source_code: "#",
      paper: "#",
    },
    image_url:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
    created_at: "2025-03-22",
    updated_at: "2025-03-22",
  },

  {
    id: "p4",
    title: "Online College Seat Allocation & Booking Portal",
    short_description:
      "Centralized platform for students to check and reserve college seats",
    full_description: `Full-stack MERN application with real-time seat availability,
payment gateway integration (Razorpay test mode), admin panel and student dashboard.

Features include:
• Live seat matrix
• Category-based reservation
• Email & SMS notifications
• Admin approval workflow`,
    category_id: "web-dev",
    tech_stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Razorpay",
      "Tailwind",
      "Socket.io",
    ],
    features: [
      "Real-time seat updates",
      "Secure payment integration",
      "Admin dashboard",
      "Student login",
      "Responsive design",
    ],
    price: 1799,
    discount: 25,   // 25% off
    download_links: {
      ppt: "#",
      report: "#",
      source_code: "#",
    },
    image_url: null,
    created_at: "2025-01-15",
    updated_at: "2025-02-05",
  },
];