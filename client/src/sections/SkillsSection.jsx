import { motion } from 'framer-motion';
import { Calendar, Download, FileText, Loader2, School } from 'lucide-react';
import Container from '../components/layout/Container';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/ui/Button';

const SkillsSection = ({
  sectionRef,
  skills,
  education,
  downloadFormat,
  setDownloadFormat,
  isGeneratingPDF,
  onResumeDownload,
}) => (
  <section id="skills" ref={sectionRef} className="section-pad bg-white/[0.02]">
    <Container>
      <SectionHeader
        eyebrow="Expertise"
        title="Skills & Education"
        description="Technical depth across the stack, backed by formal training and continuous upskilling."
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-6 sm:grid-cols-2">
            {Object.entries(skills).map(([category, items], index) => (
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
                <div className="mt-4 space-y-4">
                  {items.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-slate-300">{skill.name}</span>
                        <span className="font-medium text-violet-300">{skill.level}%</span>
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
                    </div>
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
    </Container>
  </section>
);

export default SkillsSection;
