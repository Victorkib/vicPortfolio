import { footerSocialLinks } from '../../content/portfolioUiContent';
import Container from './Container';

const Footer = () => (
  <footer className="border-t border-white/10 bg-[#05080f] py-10">
    <Container className="flex flex-col items-center justify-between gap-6 md:flex-row">
      <div className="text-center md:text-left">
        <p className="font-display text-lg font-semibold text-white">Victor Kibiwott</p>
        <p className="mt-1 text-sm text-slate-400">Full Stack Developer · MERN · Nairobi, Kenya</p>
        <p className="mt-3 text-xs text-slate-500">
          © {new Date().getFullYear()} Victor Kibiwott. All rights reserved.
        </p>
      </div>

      <div className="flex gap-3">
        {footerSocialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-violet-400/50 hover:bg-violet-600/20 hover:text-white"
            >
              <Icon className="h-5 w-5" />
            </a>
          );
        })}
      </div>
    </Container>
  </footer>
);

export default Footer;
