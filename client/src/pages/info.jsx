import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import {
  Code2,
  ExternalLink,
  Github,
  Terminal,
  Rocket,
  Monitor,
  Layers,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Eye,
  Brain,
  Database,
  Globe,
  Cloud,
  Lock,
} from 'lucide-react';

const Portfolio = () => {
  const [view, setView] = useState('space'); // space, matrix, classic
  const [activeProject, setActiveProject] = useState(null);
  const [terminalCommands, setTerminalCommands] = useState([]);
  const [activeTech, setActiveTech] = useState(null);
  const projectsRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: 'Project Nova',
      type: 'Web Application',
      description: 'Full-stack e-commerce platform with AR product viewing',
      preview: '/api/placeholder/800/600',
      techStack: ['React', 'Node.js', 'Three.js', 'WebGL'],
      links: {
        live: 'https://projectnova.com',
        github: 'https://github.com/project-nova',
      },
      metrics: {
        performance: 98,
        users: '10k+',
        transactions: '50k+',
      },
      features: [
        'Real-time inventory tracking',
        'AR product visualization',
        'AI-powered recommendations',
      ],
      codeSnippet: `
        const handleARView = async (product) => {
          const scene = new THREE.Scene();
          const model = await loadProductModel(product.id);
          scene.add(model);
          startARSession(scene);
        };
      `,
    },
    {
      id: 2,
      title: 'DataSync Pro',
      type: 'Enterprise Solution',
      description: 'Real-time data synchronization platform',
      preview: '/api/placeholder/800/600',
      techStack: ['MongoDB', 'Express', 'WebSocket', 'Redis'],
      links: {
        live: 'https://datasync.pro',
        github: 'https://github.com/datasync-pro',
      },
      metrics: {
        performance: 95,
        dataPoints: '1M+',
        syncRate: '99.99%',
      },
      features: [
        'Multi-node architecture',
        'Zero-downtime deployment',
        'Automatic conflict resolution',
      ],
      codeSnippet: `
        class SyncNode extends EventEmitter {
          constructor(config) {
            super();
            this.connections = new Map();
            this.buffer = new CircularBuffer(1000);
            this.startHeartbeat();
          }
        }
      `,
    },
  ];

  const techStack = {
    frontend: ['React', 'Three.js', 'WebGL', 'GSAP'],
    backend: ['Node.js', 'MongoDB', 'Redis', 'WebSocket'],
    devops: ['Docker', 'AWS', 'CI/CD', 'Kubernetes'],
  };

  // Particle system simulation
  const ParticleField = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const particles = [];

      // Initialize particles
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: Math.random() * 2 + 1,
          size: Math.random() * 2 + 1,
        });
      }

      const animate = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          ctx.fillStyle = 'rgba(147, 51, 234, 0.5)';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          particle.y -= particle.speed;
          if (particle.y < 0) particle.y = canvas.height;
        });

        requestAnimationFrame(animate);
      };

      animate();
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        width={window.innerWidth}
        height={window.innerHeight}
      />
    );
  };

  // 3D Tech Stack Visualization
  const TechStackVisualizer = () => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setRotation({ x: y * 30, y: x * 30 });
    };

    return (
      <motion.div
        className="relative h-[600px] perspective-1000"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="absolute inset-0 grid grid-cols-3 gap-4"
          style={{
            rotateX: rotation.x,
            rotateY: rotation.y,
            transformStyle: 'preserve-3d',
          }}
        >
          {Object.entries(techStack).map(([category, technologies], index) => (
            <motion.div
              key={category}
              className="bg-purple-900/20 backdrop-blur-lg rounded-xl p-6"
              style={{
                transformStyle: 'preserve-3d',
                transform: `translateZ(${index * 50}px)`,
              }}
            >
              <h3 className="text-xl font-bold mb-4 capitalize">{category}</h3>
              <div className="space-y-2">
                {technologies.map((tech) => (
                  <motion.div
                    key={tech}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-500/20"
                    whileHover={{ scale: 1.05, translateZ: 20 }}
                  >
                    {tech === 'React' && <Code2 className="w-5 h-5" />}
                    {tech === 'Node.js' && <Terminal className="w-5 h-5" />}
                    {tech === 'MongoDB' && <Database className="w-5 h-5" />}
                    <span>{tech}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  };

  // Interactive Project Viewer
  const ProjectViewer = ({ project }) => {
    const [view, setView] = useState('preview');

    return (
      <motion.div
        layoutId={`project-${project.id}`}
        className="fixed inset-4 md:inset-10 bg-slate-900 rounded-2xl overflow-hidden z-50"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('preview')}
                className={`p-2 rounded-lg ${
                  view === 'preview' ? 'bg-purple-500' : 'bg-slate-800'
                }`}
              >
                <Eye className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('code')}
                className={`p-2 rounded-lg ${
                  view === 'code' ? 'bg-purple-500' : 'bg-slate-800'
                }`}
              >
                <Code2 className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('metrics')}
                className={`p-2 rounded-lg ${
                  view === 'metrics' ? 'bg-purple-500' : 'bg-slate-800'
                }`}
              >
                <Brain className="w-5 h-5" />
              </motion.button>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveProject(null)}
              className="p-2 rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              {view === 'preview' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6"
                >
                  <div className="aspect-video rounded-xl overflow-hidden mb-6">
                    <img
                      src={project.preview}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                  <p className="text-slate-300 mb-6">{project.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {project.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 bg-slate-800 rounded-lg p-4"
                      >
                        <Rocket className="w-5 h-5 text-purple-400" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {view === 'code' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6"
                >
                  <pre className="bg-slate-800 rounded-xl p-6 overflow-auto">
                    <code className="text-sm font-mono text-slate-300">
                      {project.codeSnippet}
                    </code>
                  </pre>
                </motion.div>
              )}

              {view === 'metrics' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6"
                >
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="capitalize">{key}</span>
                        <span>{value}</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          className="h-full bg-purple-500"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Background Effects */}
      <ParticleField />

      {/* Main Content */}
      <main className="relative container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen flex items-center justify-center text-center"
        >
          <div>
            <motion.h1
              className="text-7xl font-bold mb-6"
              animate={{
                backgroundSize: ['100% 100%', '200% 100%'],
                backgroundPosition: ['0% 0%', '100% 0%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #9333ea, #ec4899, #9333ea)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                backgroundSize: '200% 100%',
              }}
            >
              Victor Kibiwott
            </motion.h1>
            <p className="text-2xl text-slate-300 mb-8">
              Digital Craftsman & MERN Stack Developer
            </p>
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-purple-500 rounded-full font-semibold"
                onClick={() =>
                  projectsRef.current?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                View Projects
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Tech Stack Section */}
        <section className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Technology Expertise
          </h2>
          <TechStackVisualizer />
        </section>

        {/* Projects Grid */}
        <section ref={projectsRef} className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layoutId={`project-${project.id}`}
                onClick={() => setActiveProject(project)}
                className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-video">
                  <img
                    src={project.preview}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-slate-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Professional Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-slate-800 rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold mb-4">
                Agile Business Solutions
              </h3>
              <p className="text-slate-300 mb-4">
                Attachment Trainee • 4 months
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-purple-400" />
                  <span>
                    Collaborated with teams to deliver web solutions and
                    internal software tools
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-purple-400" />
                  <span>
                    Gained hands-on experience in full-stack development using
                    the MERN stack
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-purple-400" />
                  <span>
                    Participated in UI/UX design and conducted bug testing
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-slate-800 rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold mb-4">
                Kholex Gaming Enterprises
              </h3>
              <p className="text-slate-300 mb-4">Co-Manager • Until 2023</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-400" />
                  <span>Oversaw daily operations and strategic planning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-400" />
                  <span>
                    Enhanced customer experiences through technology-driven
                    solutions
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Education & Skills Section */}
        <section className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Education & Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-6">Education</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    Bachelor of Science in Computer Science
                  </h4>
                  <p className="text-slate-300">
                    Machakos University • Ongoing
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    High School Diploma
                  </h4>
                  <p className="text-slate-300">
                    Anestar Boys High School Lanet • 2021
                  </p>
                  <p className="text-purple-400">Final Grade: B</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-slate-800 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-purple-400" />
                    <span>MERN Stack</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-purple-400" />
                    <span>Full Stack Development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-purple-400" />
                    <span>Web Design</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-400" />
                    <span>Graphic Design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-purple-400" />
                    <span>MongoDB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-purple-400" />
                    <span>React Native</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl text-slate-300 mb-8">
              Currently seeking new opportunities to contribute to innovative
              projects and grow as a developer.
            </p>
            <div className="flex justify-center gap-6">
              <motion.a
                href="mailto:victo33720kibiwott@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-purple-500 rounded-full font-semibold"
              >
                Email Me
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/victor-kibiwott-b85537240"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-slate-700 rounded-full font-semibold"
              >
                LinkedIn Profile
              </motion.a>
            </div>
          </div>
        </section>
      </main>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && <ProjectViewer project={activeProject} />}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
