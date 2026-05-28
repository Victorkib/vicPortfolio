import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { heroContent, heroSocialLinks } from '../content/portfolioUiContent';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const HeroSection = ({ sectionRef, stats }) => (
  <section
    id="home"
    ref={sectionRef}
    className="section-pad flex min-h-screen items-center pt-28"
  >
    <Container>
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-5 border-violet-500/30 bg-violet-500/10 text-violet-200">
            <Sparkles className="mr-1.5 inline h-3.5 w-3.5" />
            {heroContent.availability}
          </Badge>

          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-slate-400">
            {heroContent.role}
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{' '}
            <span className="gradient-text">{heroContent.name}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            {heroContent.headline}
          </p>
          <p className="mt-3 max-w-xl text-sm text-slate-400">
            {heroContent.subheadline}
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
            <MapPin className="h-4 w-4 text-violet-400" />
            {heroContent.location}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button as="a" href="#projects">
              View Projects <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href="#contact" variant="secondary">
              Contact Me
            </Button>
          </div>

          <div className="mt-10 flex gap-3">
            {heroSocialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-violet-400/40 hover:bg-violet-600/20"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 blur-2xl" />
          <div className="glass-panel relative overflow-hidden p-3">
            <img
              src={heroContent.profileImage}
              alt={heroContent.name}
              width={480}
              height={480}
              className="aspect-square w-full rounded-2xl object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-panel p-4 text-center">
                <p className="font-display text-2xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Container>
  </section>
);

export default HeroSection;
