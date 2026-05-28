import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Award, Loader2, Sparkles, Trophy, Users } from 'lucide-react';
import SEO from '../components/SEO';
import AmbientBackground from '../components/background/AmbientBackground';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import ProjectViewer from '../components/ProjectViewer';
import HeroSection from '../sections/HeroSection';
import ProjectsSection from '../sections/ProjectsSection';
import ExperienceSection from '../sections/ExperienceSection';
import CertificationsSection from '../sections/CertificationsSection';
import SkillsSection from '../sections/SkillsSection';
import ContactSection from '../sections/ContactSection';
import { submitContactForm } from '../services/contactService';
import {
  defaultPortfolioContent,
  fetchPortfolioContent,
} from '../services/portfolioService';
import {
  generateDOCXResume,
  generatePDFResume,
} from '../utils/resumeGenerator';
import { skillDetailProfiles } from '../content/portfolioUiContent';

const certificationIconByKey = {
  trophy: Trophy,
  users: Users,
  sparkles: Sparkles,
};

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('pdf');
  const [portfolioContent, setPortfolioContent] = useState(
    defaultPortfolioContent,
  );
  const [isSyncingContent, setIsSyncingContent] = useState(true);

  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const certificationsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: '',
  });

  useEffect(() => {
    const sectionRefs = [
      { ref: homeRef, id: 'home' },
      { ref: projectsRef, id: 'projects' },
      { ref: experienceRef, id: 'experience' },
      { ref: certificationsRef, id: 'certifications' },
      { ref: skillsRef, id: 'skills' },
      { ref: contactRef, id: 'contact' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('id'));
          }
        });
      },
      { threshold: 0.28, rootMargin: '-18% 0px -18% 0px' },
    );

    sectionRefs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      sectionRefs.forEach(({ ref }) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const syncContent = async () => {
      const content = await fetchPortfolioContent();
      if (isMounted) {
        setPortfolioContent(content);
        setIsSyncingContent(false);
      }
    };

    syncContent();
    return () => {
      isMounted = false;
    };
  }, []);

  const {
    projects,
    experiences,
    skills,
    education,
    certifications,
    resumeData,
  } = portfolioContent;

  const certificationsWithIcons = (certifications || []).map(
    (certification) => ({
      ...certification,
      icon: certificationIconByKey[certification.iconKey] || Award,
    }),
  );

  const currentRoles = experiences.filter((e) => e.current).length;
  const stats = [
    { label: 'Projects', value: 30 },
    { label: 'Roles', value: String(experiences.length) },
    { label: 'Current', value: String(currentRoles) },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      return 'Please enter a valid email';
    if (!formData.message.trim()) return 'Message is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        message: validationError,
      });
      return;
    }

    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      isError: false,
      message: 'Sending your message...',
    });

    try {
      const response = await submitContactForm(formData);
      if (response.status) {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: true,
          isError: false,
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        message:
          'Failed to send message. Please try again later or contact me directly.',
      });
    }
  };

  const handleResumeDownload = async () => {
    if (downloadFormat === 'pdf') {
      await generatePDFResume(resumeData, setIsGeneratingPDF);
    } else {
      generateDOCXResume(resumeData);
    }
  };

  return (
    <div className="page-shell">
      <SEO
        title="Victor Kibiwott - Full Stack Developer Portfolio | MERN Stack Expert"
        description="Portfolio of Victor Kibiwott, a skilled Full Stack Developer specializing in MERN stack, React, Node.js, MongoDB, and Express."
        keywords="Victor Kibiwott, Full Stack Developer, MERN Stack, React Developer, Node.js, MongoDB, Express, Web Development, Portfolio"
        url={
          typeof window !== 'undefined'
            ? window.location.href
            : 'https://victorkibiwott.com'
        }
        image="/qin.jpeg"
      />

      <AmbientBackground />
      <Navbar
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {isSyncingContent && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0f1a]/90 px-4 py-2 text-xs text-slate-300 shadow-lg backdrop-blur">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-violet-400" />
          Syncing latest content...
        </div>
      )}

      <main className="relative">
        <HeroSection sectionRef={homeRef} stats={stats} />
        <ProjectsSection
          sectionRef={projectsRef}
          projects={projects}
          onSelectProject={setActiveProject}
        />
        <ExperienceSection
          sectionRef={experienceRef}
          experiences={experiences}
        />
        <CertificationsSection
          sectionRef={certificationsRef}
          certifications={certificationsWithIcons}
        />
        <SkillsSection
          sectionRef={skillsRef}
          skills={skills}
          projects={projects}
          education={education}
          skillProfiles={skillDetailProfiles}
          downloadFormat={downloadFormat}
          setDownloadFormat={setDownloadFormat}
          isGeneratingPDF={isGeneratingPDF}
          onResumeDownload={handleResumeDownload}
        />
        <ContactSection
          sectionRef={contactRef}
          formData={formData}
          formStatus={formStatus}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </main>

      <Footer />

      <AnimatePresence>
        {activeProject && (
          <ProjectViewer
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
