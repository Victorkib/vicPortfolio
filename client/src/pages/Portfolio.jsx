import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Monitor,
  Palette,
  Brain,
  Terminal,
  Rocket,
  Heart,
} from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax effect for mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Skills with progress values
  const skills = [
    { name: 'MERN Stack', icon: <Code2 className="w-6 h-6" />, level: 90 },
    {
      name: 'Full Stack Development',
      icon: <Terminal className="w-6 h-6" />,
      level: 85,
    },
    { name: 'Web Design', icon: <Monitor className="w-6 h-6" />, level: 88 },
    {
      name: 'Graphic Design',
      icon: <Palette className="w-6 h-6" />,
      level: 82,
    },
    { name: 'React Native', icon: <Brain className="w-6 h-6" />, level: 80 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 1000],
              y: [0, Math.random() * 1000],
              scale: [1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative container mx-auto px-4 py-16"
      >
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            className="relative w-40 h-40 mb-8 rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500"
            whileHover={{ scale: 1.1 }}
            style={{
              transform: `translate(
                ${(mousePosition.x - 0.5) * 20}px,
                ${(mousePosition.y - 0.5) * 20}px
              )`,
            }}
          >
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-800">VK</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
            whileHover={{ scale: 1.05 }}
          >
            Victor Kibiwott
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            MERN Stack Developer | UI/UX Designer | Creative Problem Solver
          </motion.p>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <a
              href="mailto:victo33720kibiwott@gmail.com"
              className="px-6 py-3 bg-purple-500 rounded-full hover:bg-purple-600 transition-all duration-300"
            >
              Contact Me
            </a>
            <a
              href="http://www.linkedin.com/in/victor-kibiwott-b85537240"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-purple-500 rounded-full hover:bg-purple-500 transition-all duration-300"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="p-6 rounded-lg bg-white/5 backdrop-blur-lg"
              whileHover={{ scale: 1.05, rotate: 2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex items-center mb-4">
                {skill.icon}
                <h3 className="ml-3 text-xl font-semibold">{skill.name}</h3>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Professional Journey
          </h2>
          <div className="space-y-8">
            <motion.div
              className="p-6 rounded-lg bg-white/5 backdrop-blur-lg"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold mb-2">Attachment Trainee</h3>
              <p className="text-gray-400">Agile Business Solutions</p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <Rocket className="w-4 h-4 mr-2 text-purple-400" />
                  <span>Collaborated on web solutions and internal tools</span>
                </li>
                <li className="flex items-center">
                  <Code2 className="w-4 h-4 mr-2 text-purple-400" />
                  <span>Full-stack development with MERN stack</span>
                </li>
                <li className="flex items-center">
                  <Brain className="w-4 h-4 mr-2 text-purple-400" />
                  <span>UI/UX design and bug testing</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="p-6 rounded-lg bg-white/5 backdrop-blur-lg"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold mb-2">Co-Manager</h3>
              <p className="text-gray-400">Kholex Gaming Enterprises</p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <Brain className="w-4 h-4 mr-2 text-purple-400" />
                  <span>Strategic planning and operations management</span>
                </li>
                <li className="flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-purple-400" />
                  <span>
                    Enhanced customer experiences through tech solutions
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Volunteer Work */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Giving Back to Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="p-6 rounded-lg bg-white/5 backdrop-blur-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">
                Baringo Charity Ambassadors
              </h3>
              <p className="text-gray-400">Secretary</p>
            </motion.div>
            <motion.div
              className="p-6 rounded-lg bg-white/5 backdrop-blur-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">
                Eldama Ravine Orphanage
              </h3>
              <p className="text-gray-400">Volunteer</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Portfolio;
