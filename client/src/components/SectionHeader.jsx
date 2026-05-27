import { motion } from 'framer-motion';

const SectionHeader = ({ eyebrow, title, description }) => (
  <div className="mb-14 max-w-3xl">
    {eyebrow && (
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400"
      >
        {eyebrow}
      </motion.p>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 }}
      className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl"
    >
      {title}
    </motion.h2>
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
    />
    {description && (
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="mt-5 text-base leading-relaxed text-slate-400 md:text-lg"
      >
        {description}
      </motion.p>
    )}
  </div>
);

export default SectionHeader;
