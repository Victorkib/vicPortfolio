import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import Container from '../components/layout/Container';
import SectionHeader from '../components/SectionHeader';
import ProjectMedia from '../components/ProjectMedia';
import Badge from '../components/ui/Badge';
import { isVideoDemoUrl } from '../utils/resumeGenerator';

const ProjectsSection = ({ sectionRef, projects, onSelectProject }) => {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" ref={sectionRef} className="section-pad">
      <Container>
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured Projects"
          description="Real products across web, mobile, and platform engineering — built with maintainable architecture and polished UX."
        />

        {featured && (
          <motion.article
            layoutId={`project-${featured.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => onSelectProject(featured)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectProject(featured);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Open project ${featured.title}`}
            className="glass-panel-hover group mb-8 cursor-pointer overflow-hidden lg:flex"
          >
            <div className="relative aspect-video lg:aspect-auto lg:w-1/2">
              <ProjectMedia
                project={featured}
                className="h-full min-h-[240px] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/80 via-transparent to-transparent lg:bg-gradient-to-r" />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <Badge className="mb-3 w-fit">{featured.type}</Badge>
              <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 text-slate-300">{featured.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {featured.techStack.slice(0, 5).map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-300">
                View case study <ArrowRight className="h-4 w-4" />
              </p>
            </div>
          </motion.article>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((project, index) => (
            <motion.article
              key={project.id}
              layoutId={`project-${project.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              onClick={() => onSelectProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(project);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open project ${project.title}`}
              className="glass-panel-hover group cursor-pointer overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <ProjectMedia
                  project={project}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <Badge className="absolute bottom-3 left-3 border-violet-500/40 bg-violet-950/80">
                  {project.type}
                </Badge>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-white">{project.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-400">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-4 text-sm">
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-violet-300 hover:text-violet-200"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {isVideoDemoUrl(project.links.live) ? 'Watch demo' : 'Live'}
                    </a>
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-white"
                    >
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProjectsSection;
