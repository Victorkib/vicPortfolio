import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  CheckCircle,
  Code2,
  ExternalLink,
  Eye,
  Github,
  Sparkles,
  Star,
  Terminal,
  Users,
  X,
  Zap,
} from 'lucide-react';
import ProjectMedia from './ProjectMedia';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { isVideoDemoUrl } from '../utils/resumeGenerator';

const ProjectViewer = ({ project, onClose }) => {
  const [view, setView] = useState('preview');
  const demoIsVideo = isVideoDemoUrl(project.links?.live);

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      className="fixed inset-3 z-50 flex flex-col overflow-hidden rounded-2xl border border-violet-500/30 bg-[#0a0f1a]/95 shadow-2xl backdrop-blur-xl md:inset-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-viewer-title"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex gap-2">
          {[
            { id: 'preview', icon: Eye, label: 'Preview' },
            { id: 'code', icon: Code2, label: 'Code' },
            { id: 'metrics', icon: Brain, label: 'Impact' },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setView(tab.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  view === tab.id
                    ? 'bg-violet-600 text-white'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
                aria-label={tab.label}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg bg-white/5 p-2 text-slate-300 transition hover:bg-red-500/20 hover:text-red-200"
          aria-label="Close project viewer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="custom-scrollbar flex-1 overflow-auto p-5 md:p-8">
        <AnimatePresence mode="wait">
          {view === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <div className="mb-6 overflow-hidden rounded-xl border border-white/10">
                <ProjectMedia
                  project={project}
                  variant="video"
                  controls
                  className="aspect-video w-full object-cover"
                />
              </div>
              <Badge className="mb-3">{project.type}</Badge>
              <h2 id="project-viewer-title" className="font-display text-3xl font-bold text-white">
                {project.title}
              </h2>
              <p className="mt-3 text-lg text-slate-300">{project.description}</p>

              <h3 className="mt-8 flex items-center gap-2 font-display text-xl font-semibold text-white">
                <Sparkles className="h-5 w-5 text-violet-400" /> Key features
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div key={feature} className="glass-panel flex gap-3 p-4">
                    <CheckCircle className="h-5 w-5 shrink-0 text-violet-400" />
                    <span className="text-sm text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>

              <h3 className="mt-8 font-display text-xl font-semibold text-white">Stack</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button as="a" href={project.links.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  {demoIsVideo ? 'Watch demo' : 'Live demo'}
                </Button>
                <Button
                  as="a"
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                >
                  <Github className="h-4 w-4" /> Source code
                </Button>
              </div>
            </motion.div>
          )}

          {view === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-white">
                <Terminal className="h-5 w-5 text-violet-400" /> Implementation snippet
              </h3>
              <pre className="mt-4 overflow-auto rounded-xl border border-white/10 bg-black/40 p-5">
                <code className="text-sm text-slate-300">{project.codeSnippet}</code>
              </pre>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {[
                  'Structured for maintainability and clear separation of concerns',
                  'Modern async patterns with robust error handling',
                  'Optimized for real-world usage and scalability',
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 text-violet-400" />
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {view === 'metrics' && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-white">
                <Zap className="h-5 w-5 text-violet-400" /> Project impact
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="glass-panel p-4">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize text-slate-400">{key}</span>
                      <span className="font-semibold text-white">{value}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="mt-8 flex items-center gap-2 font-display text-lg font-semibold text-white">
                <Users className="h-5 w-5 text-violet-400" /> Feedback highlights
              </h3>
              <div className="mt-4 space-y-3">
                {[
                  'Exceeded expectations on performance and usability.',
                  'Strong responsiveness and clean interaction design.',
                ].map((quote, i) => (
                  <div key={quote} className="glass-panel p-4">
                    <div className="mb-2 flex gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-3.5 w-3.5 ${
                            idx < (i === 0 ? 5 : 4)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm italic text-slate-300">&quot;{quote}&quot;</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProjectViewer;
