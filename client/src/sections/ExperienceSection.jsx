import { motion } from 'framer-motion';
import { Award, Briefcase, Calendar, CheckCircle } from 'lucide-react';
import Container from '../components/layout/Container';
import SectionHeader from '../components/SectionHeader';
import Badge from '../components/ui/Badge';

const ExperienceSection = ({ sectionRef, experiences }) => (
  <section id="experience" ref={sectionRef} className="section-pad bg-white/[0.02]">
    <Container>
      <SectionHeader
        eyebrow="Career"
        title="Professional Journey"
        description="Hands-on delivery across remote teams, internships, and freelance engagements."
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-violet-500/60 via-violet-500/20 to-transparent md:block" />

        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="relative mb-8 md:pl-14"
          >
            <div className="absolute left-0 top-6 hidden h-8 w-8 items-center justify-center rounded-full border border-violet-500/40 bg-violet-600/20 md:flex">
              <Briefcase className="h-4 w-4 text-violet-300" />
            </div>

            <article className="glass-panel p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {experience.position}
                  </h3>
                  <p className="mt-1 font-medium text-violet-300">{experience.company}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar className="h-4 w-4" />
                  {experience.period}
                  {experience.current && (
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-300">
                      Current
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-4 text-slate-300">{experience.description}</p>

              <h4 className="mt-5 flex items-center gap-2 text-sm font-semibold text-white">
                <Award className="h-4 w-4 text-violet-400" /> Key achievements
              </h4>
              <ul className="mt-3 space-y-2">
                {experience.achievements.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-300">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </article>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
);

export default ExperienceSection;
