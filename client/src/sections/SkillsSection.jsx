import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Filter,
  ImageOff,
  ChevronLeft,
  ChevronRight,
  Loader2,
  School,
  Sparkles,
  X,
} from 'lucide-react';
import Container from '../components/layout/Container';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const SkillsSection = ({
  sectionRef,
  skills,
  projects,
  education,
  skillProfiles,
  downloadFormat,
  setDownloadFormat,
  isGeneratingPDF,
  onResumeDownload,
}) => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const allSkills = useMemo(
    () =>
      Object.entries(skills).flatMap(([category, items]) =>
        items.map((item) => ({ ...item, category }))
      ),
    [skills]
  );

  const availableCategories = useMemo(
    () => ['all', ...Object.keys(skills)],
    [skills]
  );

  const filteredSkillsByCategory = useMemo(() => {
    if (activeCategoryFilter === 'all') return skills;
    return { [activeCategoryFilter]: skills[activeCategoryFilter] || [] };
  }, [skills, activeCategoryFilter]);

  const getLevelLabel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Proficient';
    return 'Working Knowledge';
  };

  const getSkillDetails = (skill) => {
    const custom = skillProfiles[skill.name] || {};
    const fallbackSummary = `${skill.name} is used in real project delivery across ${skill.category} workflows, with practical implementation focus.`;
    const fallbackHighlights = [
      `Hands-on implementation depth in ${skill.name} with production-oriented decisions.`,
      `Applied ${skill.name} in feature delivery, troubleshooting, and performance-focused work.`,
      `Continuously improving ${skill.name} practices through project execution and iteration.`,
    ];

    const images = Array.isArray(custom.images)
      ? custom.images.filter(Boolean)
      : custom.image
        ? [custom.image]
        : [];

    const relatedProjects = (projects || []).filter((project) =>
      (project.techStack || []).some(
        (tech) => tech.toLowerCase() === skill.name.toLowerCase()
      )
    );

    return {
      summary: custom.summary || fallbackSummary,
      highlights: custom.highlights || fallbackHighlights,
      related: custom.related || [],
      images,
      relatedProjects,
    };
  };

  return (
    <section id="skills" ref={sectionRef} className="section-pad bg-white/[0.02]">
      <Container>
      <SectionHeader
        eyebrow="Expertise"
        title="Skills & Education"
        description="Technical depth across the stack, backed by formal training and continuous upskilling."
      />

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="mr-1 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
          <Filter className="h-3.5 w-3.5" />
          Filter
        </div>
        {availableCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategoryFilter(category)}
            className={`rounded-full border px-3 py-1 text-xs capitalize transition ${
              activeCategoryFilter === category
                ? 'border-violet-400/60 bg-violet-500/20 text-violet-200'
                : 'border-white/10 bg-white/5 text-slate-300 hover:border-violet-400/40'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-6 sm:grid-cols-2">
            {Object.entries(filteredSkillsByCategory).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="glass-panel p-5"
              >
                <h3 className="font-display text-lg font-semibold capitalize text-white">
                  {category}
                </h3>
                <div className="mt-4 space-y-3">
                  {items.map((skill) => (
                    <button
                      key={skill.name}
                      type="button"
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-left transition hover:border-violet-400/40 hover:bg-white/10"
                      onClick={() => {
                        setActiveSkill({ ...skill, category });
                        setActiveImageIndex(0);
                      }}
                    >
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-200">{skill.name}</span>
                        <span className="text-violet-300">{skill.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
                        />
                      </div>
                      <p className="mt-2 text-xs text-violet-300/90">
                        Click for deep-dive
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.article
              key={`${edu.degree}-${index}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-5"
            >
              <h3 className="font-display text-lg font-semibold text-white">{edu.degree}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-violet-300">
                <School className="h-4 w-4" />
                {edu.institution}
              </p>
              <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="h-3.5 w-3.5" />
                {edu.period}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{edu.description}</p>
            </motion.article>
          ))}

          <div className="glass-panel p-5">
            <h3 className="font-display text-lg font-semibold text-white">Resume</h3>
            <p className="mt-2 text-sm text-slate-400">Download in your preferred format.</p>

            <div className="mt-4 flex gap-4 text-sm">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="downloadFormat"
                  value="pdf"
                  checked={downloadFormat === 'pdf'}
                  onChange={() => setDownloadFormat('pdf')}
                  className="text-violet-500"
                />
                PDF
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="downloadFormat"
                  value="docx"
                  checked={downloadFormat === 'docx'}
                  onChange={() => setDownloadFormat('docx')}
                  className="text-violet-500"
                />
                Word
              </label>
            </div>

            <Button
              type="button"
              variant="secondary"
              className="mt-4 w-full"
              disabled={isGeneratingPDF}
              onClick={onResumeDownload}
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  {downloadFormat === 'pdf' ? (
                    <FileText className="h-4 w-4" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  Download Resume
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#02040a]/70 backdrop-blur-sm"
            onClick={() => setActiveSkill(null)}
          >
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="custom-scrollbar glass-panel fixed bottom-0 right-0 top-0 h-full w-full max-w-2xl overflow-auto rounded-none border-l border-white/10 p-6 sm:rounded-l-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              {(() => {
                const details = getSkillDetails(activeSkill);
                return (
                  <>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {activeSkill.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {details.summary}
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-lg bg-white/5 p-2 text-slate-300 hover:bg-white/10"
                  onClick={() => setActiveSkill(null)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                <Badge className="border-violet-500/40 bg-violet-500/10 text-violet-200">
                  {activeSkill.category}
                </Badge>
                <Badge>{activeSkill.level}%</Badge>
                <Badge>{getLevelLabel(activeSkill.level)}</Badge>
              </div>

              <div className="mb-5 overflow-hidden rounded-xl border border-white/10 bg-slate-900/60">
                {details.images.length > 0 ? (
                  <div>
                    <img
                      src={details.images[activeImageIndex]}
                      alt={`${activeSkill.name} showcase ${activeImageIndex + 1}`}
                      className="h-44 w-full object-cover"
                    />
                    <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-3 py-2">
                      <p className="text-xs text-slate-400">
                        Visual {activeImageIndex + 1} of {details.images.length}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="rounded bg-white/10 p-1 text-slate-200 hover:bg-white/20 disabled:opacity-40"
                          onClick={() =>
                            setActiveImageIndex((prev) => Math.max(prev - 1, 0))
                          }
                          disabled={activeImageIndex === 0}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="rounded bg-white/10 p-1 text-slate-200 hover:bg-white/20 disabled:opacity-40"
                          onClick={() =>
                            setActiveImageIndex((prev) =>
                              Math.min(prev + 1, details.images.length - 1)
                            )
                          }
                          disabled={activeImageIndex === details.images.length - 1}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
                    <ImageOff className="h-6 w-6 text-violet-400" />
                    <p className="text-sm text-slate-300">
                      Visual showcase not added yet for {activeSkill.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Add `image` in `skillDetailProfiles['{activeSkill.name}']` to render one.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-white">How this skill is applied</h4>
                {details.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>

              {details.related.length > 0 && (
                <div className="mt-5">
                  <h4 className="mb-2 font-semibold text-white">Related stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {details.related.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h4 className="mb-2 font-semibold text-white">Related projects</h4>
                {details.relatedProjects.length > 0 ? (
                  <div className="space-y-2">
                    {details.relatedProjects.map((project) => (
                      <a
                        key={project.id}
                        href={project.links?.live || '#projects'}
                        target={project.links?.live ? '_blank' : undefined}
                        rel={project.links?.live ? 'noopener noreferrer' : undefined}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:border-violet-400/40 hover:bg-white/10"
                      >
                        <span>{project.title}</span>
                        <ExternalLink className="h-4 w-4 text-violet-300" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    No direct project mapping yet. Add this skill to a project tech stack to
                    auto-link it here.
                  </p>
                )}
              </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  </section>
  );
};

export default SkillsSection;
