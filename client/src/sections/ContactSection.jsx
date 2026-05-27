import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Loader2, Send } from 'lucide-react';
import { contactInfo } from '../content/portfolioUiContent';
import Container from '../components/layout/Container';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/ui/Button';

const ContactSection = ({
  sectionRef,
  formData,
  formStatus,
  onInputChange,
  onSubmit,
}) => (
  <section id="contact" ref={sectionRef} className="section-pad">
    <Container>
      <SectionHeader
        eyebrow="Let's Connect"
        title="Get In Touch"
        description="Have a role, project, or collaboration in mind? Send a message and I'll respond as soon as possible."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-6 md:p-8"
        >
          <h3 className="font-display text-2xl font-bold text-white">Contact Information</h3>
          <div className="mt-6 space-y-5">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600/20">
                    <Icon className="h-5 w-5 text-violet-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-300">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel={
                          item.href.startsWith('mailto:')
                            ? undefined
                            : 'noopener noreferrer'
                        }
                        className="text-white transition hover:text-violet-300"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white">{item.value}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="glass-panel p-6 md:p-8"
        >
          <h3 className="font-display text-2xl font-bold text-white">Send a Message</h3>
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="name" className="mb-1 block text-sm text-slate-300">
                Name
              </label>
              <input
                id="name"
                value={formData.name}
                onChange={onInputChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/30"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-slate-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={onInputChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/30"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm text-slate-300">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={onInputChange}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/30"
                placeholder="Tell me about your opportunity or project..."
              />
            </div>

            {formStatus.message && (
              <div
                className={`rounded-xl p-3 text-sm ${
                  formStatus.isError
                    ? 'border border-red-500/30 bg-red-500/10 text-red-200'
                    : formStatus.isSubmitted
                      ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                      : 'border border-violet-500/30 bg-violet-500/10 text-violet-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {formStatus.isError ? (
                    <AlertCircle className="h-4 w-4 shrink-0" />
                  ) : formStatus.isSubmitting ? (
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4 shrink-0" />
                  )}
                  {formStatus.message}
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={formStatus.isSubmitting}>
              {formStatus.isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Message
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </Container>
  </section>
);

export default ContactSection;
