import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems } from '../../content/portfolioUiContent';
import Button from '../ui/Button';
import Container from './Container';

const Navbar = ({ activeSection, isMenuOpen, setIsMenuOpen }) => (
  <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070b14]/80 backdrop-blur-xl">
    <Container className="flex h-16 items-center justify-between md:h-[4.5rem]">
      <a href="#home" className="font-display text-lg font-bold tracking-tight md:text-xl">
        <span className="gradient-text">Victor Kibiwott</span>
      </a>

      <nav className="hidden items-center gap-8 md:flex">
        {navItems.map((item) => {
          const isActive = activeSection === item.href.substring(1);
          return (
            <a
              key={item.name}
              href={item.href}
              className={`relative nav-link ${isActive ? 'nav-link-active' : ''}`}
            >
              {item.name}
              {isActive && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-violet-400" />
              )}
            </a>
          );
        })}
      </nav>

      <div className="hidden md:block">
        <Button as="a" href="#contact" variant="primary">
          Hire Me
        </Button>
      </div>

      <button
        type="button"
        className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-200 md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </Container>

    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-white/10 bg-[#070b14] md:hidden"
        >
          <Container className="flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  activeSection === item.href.substring(1)
                    ? 'bg-violet-600/20 text-violet-300'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {item.name}
              </a>
            ))}
            <Button
              as="a"
              href="#contact"
              variant="primary"
              className="mt-2 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Hire Me
            </Button>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  </header>
);

export default Navbar;
