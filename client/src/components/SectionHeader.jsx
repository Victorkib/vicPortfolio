import { motion } from 'framer-motion';

const SectionHeader = ({ title, description }) => (
  <div className="text-center mb-16">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-4xl font-bold mb-4"
    >
      {title}
    </motion.h2>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-20 h-1.5 bg-purple-600 mx-auto mb-6 rounded-full"
    />
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="max-w-2xl mx-auto text-slate-300 text-lg"
    >
      {description}
    </motion.p>
  </div>
);

export default SectionHeader;
