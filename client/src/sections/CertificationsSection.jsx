import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import Container from '../components/layout/Container';
import SectionHeader from '../components/SectionHeader';
import Badge from '../components/ui/Badge';

const CertificationsSection = ({ sectionRef, certifications }) => (
  <section id="certifications" ref={sectionRef} className="section-pad">
    <Container>
      <SectionHeader
        eyebrow="Credentials"
        title="Certifications & Achievements"
        description="Continuous learning, community leadership, and competitive engineering wins."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {certifications.map((cert, index) => {
          const Icon = cert.icon;
          return (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-panel-hover p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/20">
                  <Icon className="h-6 w-6 text-violet-300" />
                </div>
                <Badge>{cert.date}</Badge>
              </div>
              <h3 className="font-display text-lg font-bold text-white">{cert.title}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-violet-300">
                <Award className="h-4 w-4" />
                {cert.issuer}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{cert.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {cert.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </Container>
  </section>
);

export default CertificationsSection;
