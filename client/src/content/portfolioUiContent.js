import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

export const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export const heroContent = {
  name: 'Victor Kibiwott',
  role: 'Full Stack Developer',
  headline: 'I build reliable MERN products that look premium and scale cleanly.',
  subheadline:
    'From API design to polished interfaces — focused on performance, maintainability, and real-world impact.',
  profileImage: '/qin.jpeg',
  availability: 'Open to full-time, contract, and remote opportunities',
  location: 'Nairobi, Kenya',
};

export const heroSocialLinks = [
  {
    id: 'github',
    icon: Github,
    url: 'https://github.com/Victorkib',
    label: 'GitHub',
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/victor-kibiwott-b85537240/',
    label: 'LinkedIn',
  },
];

export const footerSocialLinks = heroSocialLinks;

export const contactInfo = [
  {
    id: 'email',
    label: 'Email',
    value: 'victor3720kibiwott@gmail.com',
    href: 'mailto:victor3720kibiwott@gmail.com',
    icon: Mail,
  },
  {
    id: 'location',
    label: 'Location',
    value: 'Nairobi, Kenya',
    icon: MapPin,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'Victor Kibiwott',
    href: 'https://www.linkedin.com/in/victor-kibiwott-b85537240/',
    icon: Linkedin,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: '@Victorkib',
    href: 'https://github.com/Victorkib',
    icon: Github,
  },
];

export const skillDetailProfiles = {
  JavaScript: {
    summary:
      'Primary language for frontend architecture, API integration, and automation scripts.',
    highlights: [
      'Builds modular React and Node.js features with maintainable patterns',
      'Uses async workflows, error boundaries, and schema-safe payload handling',
      'Optimizes performance for interactive UI and high-frequency data operations',
    ],
    related: ['React', 'Node.js', 'Express'],
    image: '/showcases/javascript-api-workflow.png',
  },
  Java: {
    summary:
      'Used for object-oriented problem solving and backend service foundations.',
    highlights: [
      'Applies clean OOP design in academic and practical projects',
      'Builds reliable business logic with structured error handling',
      'Strong understanding of data structures and algorithm implementation',
    ],
    related: ['SQL Server (SSMS)', 'RESTful APIs'],
    image: '/showcases/java-oop-service-design.png',
  },
  'C#': {
    summary:
      'Used for backend logic and enterprise-style system integrations.',
    highlights: [
      'Builds typed service logic for structured data workflows',
      'Applies clean separation between data access and business logic',
      'Integrates with SQL-based systems for reporting and operations',
    ],
    related: ['SQL Server (SSMS)', 'Node.js'],
    image: '/showcases/csharp-service-logic.png',
  },
  React: {
    summary:
      'Primary UI framework for modern, responsive, production-grade web applications.',
    highlights: [
      'Ships reusable component architectures with clean state management',
      'Builds responsive interfaces with accessibility and UX polish in mind',
      'Integrates APIs and dynamic data models with strong loading/error handling',
    ],
    related: ['JavaScript', 'Next.js', 'Tailwind CSS'],
    image: '/showcases/react-component-architecture.png',
  },
  'Node.js': {
    summary:
      'Core runtime for scalable APIs, service orchestration, and automation backends.',
    highlights: [
      'Builds API layers with structured controllers and service modules',
      'Implements validation, logging, and secure auth flows (JWT/OAuth)',
      'Supports integration-heavy products with reliable async processing',
    ],
    related: ['Express', 'MongoDB', 'Supabase'],
    image: '/showcases/nodejs-service-layer.png',
  },
  Express: {
    summary:
      'Framework of choice for REST APIs and backend routing logic.',
    highlights: [
      'Designs endpoints with middleware-based validation and security',
      'Implements robust request lifecycle handling and fault tolerance',
      'Supports contact systems, portfolio APIs, and custom app backends',
    ],
    related: ['Node.js', 'JWT', 'RESTful APIs'],
    image: '/showcases/express-api-middleware.png',
  },
  'Next.js': {
    summary:
      'Used for SEO-aware apps and hybrid rendering strategies.',
    highlights: [
      'Builds server-friendly interfaces with performant routing patterns',
      'Optimizes metadata and loading behavior for discoverability',
      'Implements production workflows with SSR/ISR-aware design',
    ],
    related: ['React', 'Supabase'],
    image: '/showcases/nextjs-seo-routing.png',
  },
  'React Native': {
    summary:
      'Builds cross-platform mobile products with native-like UX.',
    highlights: [
      'Ships Android and iOS experiences from a unified codebase',
      'Integrates secure auth, APIs, and cloud-backed user data',
      'Focuses on smooth interactions and practical mobile workflows',
    ],
    related: ['Expo', 'Firebase'],
    image: '/showcases/react-native-mobile-flow.png',
  },
  Redux: {
    summary:
      'Used to manage complex client-side state in predictable patterns.',
    highlights: [
      'Structures global state for large UI surfaces and workflows',
      'Uses action/reducer patterns for traceable state transitions',
      'Improves maintainability for feature-rich frontend apps',
    ],
    related: ['React', 'JavaScript'],
    image: '/showcases/redux-state-flow.png',
  },
  MongoDB: {
    summary:
      'Document database used for flexible product data and rapid iteration.',
    highlights: [
      'Designs schema models for user, content, and transactional data',
      'Builds query flows optimized for dashboard and app performance',
      'Integrates with Node.js services using clean model abstractions',
    ],
    related: ['Node.js', 'Express'],
    image: '/showcases/mongodb-schema-queries.png',
  },
  MySQL: {
    summary:
      'Relational database used for structured reporting and core operations.',
    highlights: [
      'Designs normalized schemas for consistency and reliability',
      'Builds SQL queries for analytics and management workflows',
      'Supports long-running business systems with stable data models',
    ],
    related: ['SQL Server (SSMS)', 'Power BI'],
    image: '/showcases/mysql-reporting-schema.png',
  },
  Firebase: {
    summary:
      'Cloud backend used for auth, storage, and real-time app features.',
    highlights: [
      'Implements authentication and secure user data handling',
      'Uses cloud services for scalable app infrastructure',
      'Supports rapid prototyping and fast deployment cycles',
    ],
    related: ['React Native', 'Cloudinary'],
    image: '/showcases/firebase-auth-realtime.avif',
  },
  Supabase: {
    summary:
      'Postgres-first backend stack for auth, storage, and secure data access.',
    highlights: [
      'Implements RLS policies and role-based access for production apps',
      'Builds secure storage and signed URL workflows',
      'Designs SQL-backed APIs and schema models with clear ownership boundaries',
    ],
    related: ['Postgres', 'Node.js', 'React'],
    images: [
      '/showcases/supabase-rls-architecture.png',
      '/showcases/supabase-storage-signed-urls.png',
    ],
  },
  'SQL Server (SSMS)': {
    summary:
      'Used for enterprise-grade SQL workflows and operational reporting.',
    highlights: [
      'Builds and manages structured schemas for high-integrity data systems',
      'Writes optimized queries and procedures for reporting operations',
      'Supports analytics-ready datasets for BI workflows',
    ],
    related: ['MySQL', 'Power BI'],
    image: '/showcases/ssms-query-management.png',
  },
  Git: {
    summary:
      'Version control foundation for team collaboration and controlled releases.',
    highlights: [
      'Maintains clean branching and review-ready commit history',
      'Uses collaborative workflows for stable feature delivery',
      'Supports safe rollback and release management practices',
    ],
    related: ['GitHub', 'CI/CD'],
    image: '/showcases/git-branching-workflow.png',
  },
  Postman: {
    summary:
      'API testing and debugging platform for endpoint reliability.',
    highlights: [
      'Validates request/response contracts before UI integration',
      'Builds reusable collections for team and project consistency',
      'Speeds up issue isolation across backend services',
    ],
    related: ['Express', 'Node.js'],
    image: '/showcases/postman-api-test-suite.png',
  },
  n8n: {
    summary:
      'Workflow automation platform for low-friction integrations and orchestration.',
    highlights: [
      'Builds event-driven flows for alerts, lead processing, and sync tasks',
      'Automates repetitive operations with reliable fallback steps',
      'Integrates APIs, databases, and communication tools in one workflow',
    ],
    related: ['Supabase', 'Node.js', 'Postman'],
    images: [
      '/showcases/n8n-lead-flow.png',
      '/showcases/n8n-alert-escalation-flow.webp',
    ],
  },
  'Power BI': {
    summary:
      'Used for analytics dashboards and operational decision support.',
    highlights: [
      'Builds executive-ready dashboards from structured SQL data sources',
      'Transforms raw data into clear trend and KPI narratives',
      'Supports monitoring of business and project performance signals',
    ],
    related: ['MySQL', 'SQL Server (SSMS)'],
    image: '/showcases/powerbi-kpi-dashboard.png',
  },
};
