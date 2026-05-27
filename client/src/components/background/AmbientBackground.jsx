import { useReducedMotion } from 'framer-motion';

const AmbientBackground = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(236,72,153,0.12),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      {!prefersReducedMotion && (
        <>
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl animate-pulse" />
          <div className="absolute -right-16 bottom-24 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-3xl animate-pulse [animation-delay:1.5s]" />
        </>
      )}
    </div>
  );
};

export default AmbientBackground;
