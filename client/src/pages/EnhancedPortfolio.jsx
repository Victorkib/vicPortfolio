'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Code2, ExternalLink, Github, Terminal, Eye, Brain, X, Briefcase, Calendar, Award, Star, Zap, Users, CheckCircle, ArrowRight, Download, Sparkles, Building, School, AlertCircle, Loader2, FileText, Trophy } from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import ProjectMedia from '../components/ProjectMedia';
import {
  navItems,
  heroSocialLinks,
  footerSocialLinks,
  contactInfo,
} from '../content/portfolioUiContent';
import { submitContactForm } from '../services/contactService';
import {
  defaultPortfolioContent,
  fetchPortfolioContent,
} from '../services/portfolioService';

const certificationIconByKey = {
  trophy: Trophy,
  users: Users,
  sparkles: Sparkles,
};

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);
  const homeRef = useRef(null);
  const certificationsRef = useRef(null); // Added certificationsRef
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('pdf');
  const prefersReducedMotion = useReducedMotion();
  const [portfolioContent, setPortfolioContent] = useState(
    defaultPortfolioContent
  );
  const [isPortfolioLoading, setIsPortfolioLoading] = useState(true);
  const [portfolioLoadError, setPortfolioLoadError] = useState('');

  // Form state
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

  // Form handlers
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
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

    // Validate form
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
      // Call our API route instead of directly calling Mailjet
      const response = await submitContactForm(formData);
      if (response.status) {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: true,
          isError: false,
          message: "Message sent successfully! I'll get back to you soon.",
        });
        // Reset form after successful submission
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

  // Intersection Observer for sections
  useEffect(() => {
    const sectionRefs = [
      { ref: homeRef, id: 'home' },
      { ref: projectsRef, id: 'projects' },
      { ref: experienceRef, id: 'experience' },
      { ref: certificationsRef, id: 'certifications' }, // Added certificationsRef to sectionRefs
      { ref: skillsRef, id: 'skills' },
      { ref: contactRef, id: 'contact' },
    ];

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          setActiveSection(id);
        }
      });
    }, observerOptions);

    sectionRefs.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadPortfolioContent = async () => {
      try {
        const dynamicContent = await fetchPortfolioContent();
        if (isMounted) {
          setPortfolioContent(dynamicContent);
          setPortfolioLoadError('');
        }
      } catch (error) {
        console.error('Failed to load portfolio content from API.', error);
        if (isMounted) {
          setPortfolioLoadError(
            'Unable to load portfolio content right now. Please try again in a moment.'
          );
        }
      } finally {
        if (isMounted) {
          setIsPortfolioLoading(false);
        }
      }
    };

    loadPortfolioContent();

    return () => {
      isMounted = false;
    };
  }, []);

  const { projects, experiences, skills, education, certifications, resumeData } =
    portfolioContent;

  const certificationsWithIcons = certifications.map((certification) => ({
    ...certification,
    icon: certificationIconByKey[certification.iconKey] || Award,
  }));

  if (isPortfolioLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">
        <div className="flex items-center gap-3 text-slate-200">
          <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
          <span>Loading portfolio...</span>
        </div>
      </div>
    );
  }

  if (portfolioLoadError) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-slate-800 border border-red-500/30 rounded-xl p-6 text-center">
          <h1 className="text-2xl font-semibold mb-3">Portfolio Unavailable</h1>
          <p className="text-slate-300 mb-6">{portfolioLoadError}</p>
          <a
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            Reload
          </a>
        </div>
      </div>
    );
  }

  // Function to generate and download PDF resume
  const generatePDFResume = async () => {
    setIsGeneratingPDF(true);

    try {
      const [{ jsPDF }] = await Promise.all([
        import('jspdf'),
        import('jspdf-autotable'),
      ]);

      // Create a new PDF document
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Set document properties
      doc.setProperties({
        title: 'Victor Kibiwott - Resume',
        subject: 'Resume',
        author: 'Victor Kibiwott',
        keywords: 'resume, developer, full stack',
        creator: 'Victor Kibiwott Portfolio',
      });

      // Define colors
      const primaryColor = [147, 51, 234]; // Purple
      const secondaryColor = [30, 41, 59]; // Slate-800
      const textColor = [15, 23, 42]; // Slate-900
      const lightTextColor = [100, 116, 139]; // Slate-500

      // Define margins and dimensions
      const margin = 15;
      const pageWidth = doc.internal.pageSize.getWidth();
      const contentWidth = pageWidth - 2 * margin;

      // Add header with name and title
      doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.rect(0, 0, pageWidth, 40, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text(resumeData.personalInfo.name, margin, 20);

      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text('Full Stack Developer', margin, 30);

      // Add contact information
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2], 0.1);
      doc.rect(0, 40, pageWidth, 25, 'F');

      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(10);

      const contactY = 50;
      const contactSpacing = 30;

      doc.text(`Phone: ${resumeData.personalInfo.phone}`, margin, contactY);
      doc.text(
        `Email: ${resumeData.personalInfo.email}`,
        margin + contactSpacing * 1.5,
        contactY
      );
      doc.text(
        `LinkedIn: ${resumeData.personalInfo.linkedin}`,
        margin + contactSpacing * 4,
        contactY
      );
      doc.text(`Location: Nairobi, Kenya`, margin, contactY + 8);

      // Add professional summary
      let yPos = 75;

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('PROFESSIONAL SUMMARY', margin, yPos);

      yPos += 8;
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(0.5);
      doc.line(margin, yPos, pageWidth - margin, yPos);

      yPos += 8;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);

      const summaryLines = doc.splitTextToSize(
        resumeData.personalInfo.summary,
        contentWidth
      );
      doc.text(summaryLines, margin, yPos);

      yPos += summaryLines.length * 6 + 5;

      // Add work experience
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('PROFESSIONAL EXPERIENCE', margin, yPos);

      yPos += 8;
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.line(margin, yPos, pageWidth - margin, yPos);

      resumeData.experiences.forEach((exp) => {
        yPos += 10;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.text(exp.position, margin, yPos);

        doc.setFontSize(11);
        doc.setFont('helvetica', 'italic');
        doc.text(`${exp.company} | ${exp.period}`, margin, yPos + 6);

        yPos += 12;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        exp.responsibilities.forEach((resp) => {
          const bulletLines = doc.splitTextToSize(
            `• ${resp}`,
            contentWidth - 5
          );
          doc.text(bulletLines, margin + 5, yPos);
          yPos += bulletLines.length * 5 + 2;
        });

        yPos += 3;
      });

      // Add education
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('EDUCATION', margin, yPos);

      yPos += 8;
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.line(margin, yPos, pageWidth - margin, yPos);

      resumeData.education.forEach((edu) => {
        yPos += 10;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.text(edu.degree, margin, yPos);

        doc.setFontSize(11);
        doc.setFont('helvetica', 'italic');
        doc.text(`${edu.institution} | ${edu.period}`, margin, yPos + 6);

        yPos += 12;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(edu.description, margin, yPos);

        yPos += 8;
      });

      // Add certifications (New section)
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('CERTIFICATIONS', margin, yPos);

      yPos += 8;
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.line(margin, yPos, pageWidth - margin, yPos);

      resumeData.certifications.forEach((cert) => {
        yPos += 10;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.text(cert.title, margin, yPos);

        doc.setFontSize(11);
        doc.setFont('helvetica', 'italic');
        doc.text(`${cert.issuer} | ${cert.date}`, margin, yPos + 6);

        yPos += 12;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const certLines = doc.splitTextToSize(cert.description, contentWidth);
        doc.text(certLines, margin, yPos);
        yPos += certLines.length * 5 + 5;
      });

      // Check if we need a new page for skills
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      // Add skills
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('TECHNICAL SKILLS', margin, yPos);

      yPos += 8;
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.line(margin, yPos, pageWidth - margin, yPos);

      yPos += 10;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);

      resumeData.skills.forEach((skill) => {
        const skillLines = doc.splitTextToSize(`• ${skill}`, contentWidth - 5);
        doc.text(skillLines, margin + 5, yPos);
        yPos += skillLines.length * 5 + 2;
      });

      // Check if we need a new page for activities
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      // Add activities
      yPos += 5;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('ACTIVITIES & INTERESTS', margin, yPos);

      yPos += 8;
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.line(margin, yPos, pageWidth - margin, yPos);

      yPos += 10;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);

      const activitiesLines = doc.splitTextToSize(
        resumeData.activities,
        contentWidth
      );
      doc.text(activitiesLines, margin, yPos);

      // Add footer with page numbers
      const totalPages = doc.internal.getNumberOfPages();

      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(
          lightTextColor[0],
          lightTextColor[1],
          lightTextColor[2]
        );
        doc.text(
          `Victor Kibiwott | Resume | Page ${i} of ${totalPages}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
      }

      // Save the PDF
      doc.save('Victor_Kibiwott_Resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating your resume. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Function to generate and download DOCX resume
  const generateDOCXResume = () => {
    // Create a simple HTML version of the resume that will look good when opened in Word
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Victor Kibiwott - Resume</title>
        <style>
          body {
            font-family: 'Calibri', 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            color: #1e293b;
          }
          .header {
            background-color: #1e293b;
            color: white;
            padding: 20px;
            text-align: left;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .header h2 {
            margin: 5px 0 0 0;
            font-size: 18px;
            font-weight: normal;
          }
          .contact-info {
            background-color: #f8f9fa;
            padding: 10px 20px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .contact-info p {
            margin: 5px 0;
            font-size: 12px;
          }
          .section {
            margin: 20px;
          }
          .section-title {
            color: #7e22ce;
            font-size: 16px;
            font-weight: bold;
            border-bottom: 1px solid #7e22ce;
            padding-bottom: 5px;
            margin-bottom: 15px;
          }
          .experience-item, .education-item, .certification-item { /* Added certification-item */
            margin-bottom: 15px;
          }
          .job-title, .degree, .certification-title { /* Added certification-title */
            font-weight: bold;
            font-size: 14px;
            margin: 0 0 5px 0;
          }
          .company-period, .institution-period, .issuer-date { /* Added issuer-date */
            font-style: italic;
            font-size: 13px;
            margin: 0 0 8px 0;
          }
          ul {
            margin-top: 5px;
            padding-left: 25px;
          }
          li {
            margin-bottom: 5px;
            font-size: 12px;
          }
          .skills-list li, .activities {
            font-size: 12px;
            line-height: 1.4;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${resumeData.personalInfo.name}</h1>
          <h2>Full Stack Developer</h2>
        </div>
        
        <div class="contact-info">
          <p>Phone: ${resumeData.personalInfo.phone}</p>
          <p>Email: ${resumeData.personalInfo.email}</p>
          <p>LinkedIn: ${resumeData.personalInfo.linkedin}</p>
          <p>Location: Nairobi, Kenya</p>
        </div>
        
        <div class="section">
          <div class="section-title">PROFESSIONAL SUMMARY</div>
          <p>${resumeData.personalInfo.summary}</p>
        </div>
        
        <div class="section">
          <div class="section-title">PROFESSIONAL EXPERIENCE</div>
          
          ${resumeData.experiences
            .map(
              (exp) => `
            <div class="experience-item">
              <p class="job-title">${exp.position}</p>
              <p class="company-period">${exp.company} | ${exp.period}</p>
              <ul>
                ${exp.responsibilities
                  .map((resp) => `<li>${resp}</li>`)
                  .join('')}
              </ul>
            </div>
          `
            )
            .join('')}
        </div>
        
        <div class="section">
          <div class="section-title">EDUCATION</div>
          
          ${resumeData.education
            .map(
              (edu) => `
            <div class="education-item">
              <p class="degree">${edu.degree}</p>
              <p class="institution-period">${edu.institution} | ${edu.period}</p>
              <p>${edu.description}</p>
            </div>
          `
            )
            .join('')}
        </div>

        {/* Added Certifications to DOCX */}
        <div class="section">
          <div class="section-title">CERTIFICATIONS</div>
          ${resumeData.certifications
            .map(
              (cert) => `
            <div class="certification-item">
              <p class="certification-title">${cert.title}</p>
              <p class="issuer-date">${cert.issuer} | ${cert.date}</p>
              <p>${cert.description}</p>
            </div>
          `
            )
            .join('')}
        </div>
        
        <div class="section">
          <div class="section-title">TECHNICAL SKILLS</div>
          <ul class="skills-list">
            ${resumeData.skills.map((skill) => `<li>${skill}</li>`).join('')}
          </ul>
        </div>
        
        <div class="section">
          <div class="section-title">ACTIVITIES & INTERESTS</div>
          <p class="activities">${resumeData.activities}</p>
        </div>
      </body>
      </html>
    `;

    // Create a Blob with the HTML content
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Victor_Kibiwott_Resume.doc';
    document.body.appendChild(link);
    link.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };

  // Function to handle resume download based on selected format
  const handleResumeDownload = async () => {
    if (downloadFormat === 'pdf') {
      await generatePDFResume();
    } else {
      generateDOCXResume();
    }
  };

  // Particle system simulation
  const ParticleField = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      if (prefersReducedMotion) return undefined;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const particles = [];
      let animationFrameId;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      // Initialize particles
      const particleCount = Math.min(
        90,
        Math.max(35, Math.floor((canvas.width * canvas.height) / 25000))
      );
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          size: Math.random() * 2 + 1,
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
          // Draw particle
          ctx.fillStyle = 'rgba(147, 51, 234, 0.5)';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          // Connect particles that are close to each other
          for (let j = index + 1; j < particles.length; j++) {
            const dx = particles[j].x - particle.x;
            const dy = particles[j].y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(147, 51, 234, ${
                0.2 * (1 - distance / 150)
              })`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }

          // Update position
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width)
            particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height)
            particle.speedY *= -1;
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        window.removeEventListener('resize', resizeCanvas);
      };
    }, [prefersReducedMotion]);

    if (prefersReducedMotion) return null;

    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
      />
    );
  };

  // Interactive Project Viewer
  const ProjectViewer = ({ project }) => {
    const [view, setView] = useState('preview');

    return (
      <motion.div
        layoutId={`project-${project.id}`}
        className="fixed inset-4 md:inset-10 bg-slate-900/95 backdrop-blur-xl rounded-2xl overflow-hidden z-50 border border-purple-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/50">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('preview')}
                className={`p-2 rounded-lg ${
                  view === 'preview'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                } transition-all duration-200`}
              >
                <Eye className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('code')}
                className={`p-2 rounded-lg ${
                  view === 'code'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                } transition-all duration-200`}
              >
                <Code2 className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('metrics')}
                className={`p-2 rounded-lg ${
                  view === 'metrics'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                } transition-all duration-200`}
              >
                <Brain className="w-5 h-5" />
              </motion.button>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveProject(null)}
              className="p-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              {view === 'preview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 md:p-8"
                >
                  <div className="aspect-video rounded-xl overflow-hidden mb-6 border border-slate-700 shadow-lg">
                    <ProjectMedia
                      project={project}
                      variant="video"
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm font-medium">
                      {project.type}
                    </span>
                    <h2 className="text-3xl font-bold text-white">
                      {project.title}
                    </h2>
                  </div>
                  <p className="text-slate-300 mb-8 text-lg">
                    {project.description}
                  </p>

                  <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {project.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300"
                      >
                        <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        <span className="text-slate-200">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-purple-400" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg text-white"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 transition-colors rounded-lg text-white"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </motion.div>
              )}

              {view === 'code' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 md:p-8"
                >
                  <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-purple-400" />
                    Code Implementation
                  </h3>
                  <pre className="bg-slate-800 rounded-xl p-6 overflow-auto border border-slate-700 shadow-inner">
                    <code className="text-sm font-mono text-slate-300">
                      {project.codeSnippet}
                    </code>
                  </pre>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-purple-400" />
                      Technical Highlights
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">
                          Implemented efficient data structures for optimal
                          performance
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">
                          Used modern JavaScript features and patterns for
                          maintainable code
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">
                          Implemented comprehensive error handling and logging
                        </span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {view === 'metrics' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 md:p-8"
                >
                  <h3 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    Performance Metrics
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="capitalize text-slate-400">
                            {key}
                          </span>
                          <span className="font-semibold text-white">
                            {value}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            className="h-full bg-purple-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-400" />
                    User Feedback
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-500 fill-yellow-500"
                            />
                          ))}
                        </div>
                        <span className="text-slate-400 text-sm">
                          Client Review
                        </span>
                      </div>
                      <p className="text-slate-300 italic">
                        &quot;The application exceeded our expectations.
                        Performance is excellent and the user interface is
                        intuitive.&quot;
                      </p>
                    </div>

                    <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < 4
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-slate-400 text-sm">
                          User Satisfaction
                        </span>
                      </div>
                      <p className="text-slate-300 italic">
                        &quot;Great functionality and responsive design. Would
                        recommend some additional features for power
                        users.&quot;
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  };

  // Navbar component
  const Navbar = () => {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Victor Kibiwott
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.href.substring(1)
                    ? 'text-purple-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <div className="space-y-1">
                <div className="w-5 h-0.5 bg-slate-300"></div>
                <div className="w-5 h-0.5 bg-slate-300"></div>
                <div className="w-5 h-0.5 bg-slate-300"></div>
              </div>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-b border-slate-800"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`py-2 px-4 rounded-lg ${
                      activeSection === item.href.substring(1)
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      <SEO
        title="Victor Kibiwott - Full Stack Developer Portfolio | MERN Stack Expert"
        description="Portfolio of Victor Kibiwott, a skilled Full Stack Developer specializing in MERN stack, React, Node.js, MongoDB, and Express. Explore featured projects, professional experience, certifications from Agile Business Solutions, GDG, and Machakos University Hackfest, technical skills, and contact information."
        keywords="Victor Kibiwott, Full Stack Developer, MERN Stack, React Developer, Node.js, MongoDB, Express, Web Development, Portfolio, JavaScript, React Native, Agile Business Solutions, GDG, Google Developer Groups, Machakos University, Hackfest Winner, Software Engineer, Frontend Developer, Backend Developer"
        url={typeof window !== 'undefined' ? window.location.href : 'https://victorkibiwott.com'}
        image="/qin.jpeg"
      />
      {/* Background Effects */}
      <ParticleField />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative pt-20">
        {/* Hero Section */}
        <section
          id="home"
          ref={homeRef}
          className="min-h-screen flex items-center justify-center px-4 py-16"
        >
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h1
                  className="text-5xl md:text-7xl font-bold mb-6"
                  animate={{
                    backgroundSize: ['100% 100%', '200% 100%'],
                    backgroundPosition: ['0% 0%', '100% 0%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                  }}
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, #9333ea, #ec4899, #9333ea)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    backgroundSize: '200% 100%',
                  }}
                >
                  Victor Kibiwott
                </motion.h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-8">
                  Digital Craftsman & MERN Stack Developer
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-purple-600 hover:bg-purple-700 transition-colors rounded-full font-semibold"
                  >
                    View Projects
                  </motion.a>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-slate-700 hover:bg-slate-600 transition-colors rounded-full font-semibold"
                  >
                    Contact Me
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-16 flex justify-center gap-6"
              >
                {heroSocialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-slate-800 hover:bg-purple-600 transition-colors rounded-full flex items-center justify-center text-white"
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" ref={projectsRef} className="py-20 px-4">
          <div className="container mx-auto">
            <SectionHeader
              title="Featured Projects"
              description="Explore my latest work and technical projects that showcase my skills and expertise"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layoutId={`project-${project.id}`}
                  onClick={() => setActiveProject(project)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setActiveProject(project);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open project details for ${project.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer group border border-slate-700 hover:border-purple-500/50 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <ProjectMedia
                      project={project}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                    <div className="absolute bottom-4 left-4 bg-purple-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      {project.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300">
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4">
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Demo</span>
                        </a>
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      </div>
                      <button
                        type="button"
                        className="text-white bg-purple-600 hover:bg-purple-700 transition-colors rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          ref={experienceRef}
          className="py-20 px-4 bg-slate-800/30"
        >
          <div className="container mx-auto py-20 px-4 bg-slate-800/30 ">
            <SectionHeader
              title="Professional Journey"
              description="My career path and professional experiences that have shaped my skills and expertise"
            />

            <div className="max-w-4xl mx-auto">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-12 relative"
                >
                  {/* Timeline connector */}
                  {index < experiences.length - 1 && (
                    <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-slate-700"></div>
                  )}

                  <div className="flex gap-6">
                    <div className="relative">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          experience.current ? 'bg-purple-600' : 'bg-slate-700'
                        }`}
                      >
                        <Briefcase className="w-8 h-8 text-white" />
                      </div>
                      {experience.current && (
                        <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-purple-500/30 transition-all duration-300">
                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {experience.position}
                            </h3>
                            <div className="flex items-center gap-2 text-purple-400 font-medium">
                              <Building className="w-4 h-4" />
                              <span>{experience.company}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300">
                            <Calendar className="w-4 h-4" />
                            <span>{experience.period}</span>
                            {experience.current && (
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            )}
                          </div>
                        </div>

                        <p className="text-slate-300 mb-4">
                          {experience.description}
                        </p>

                        <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                          <Award className="w-4 h-4 text-purple-400" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2 mb-4">
                          {experience.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                              <span className="text-slate-300 text-sm">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-slate-700/50 rounded-md text-xs text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="certifications"
          ref={certificationsRef}
          className="py-20 px-4"
        >
          <div className="container mx-auto">
            <SectionHeader
              title="Certifications & Achievements"
              description="Professional certifications and recognitions that demonstrate my commitment to continuous learning and excellence"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {certificationsWithIcons.map((cert, index) => {
                const IconComponent = cert.icon;
                return (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group"
                    whileHover={{ y: -5 }}
                  >
                    {/* Icon Container */}
                    <div className="mb-6 flex items-center justify-between">
                      <div className="w-14 h-14 bg-purple-600/20 rounded-lg flex items-center justify-center group-hover:bg-purple-600/30 transition-all duration-300">
                        <IconComponent className="w-7 h-7 text-purple-400" />
                      </div>
                      <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300">
                        {cert.date}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-2">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-2 text-purple-400 text-sm mb-3 font-medium">
                      <Award className="w-4 h-4" />
                      <span>{cert.issuer}</span>
                    </div>

                    <p className="text-slate-300 text-sm mb-4">
                      {cert.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-slate-700/50 rounded-md text-xs text-slate-300 border border-slate-600/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Skills & Education Section */}
        <section id="skills" ref={skillsRef} className="py-20 px-4 bg-slate-800/30">
          <div className="container mx-auto">
            <SectionHeader
              title="Skills & Education"
              description="My technical expertise and educational background"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Technical Skills
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(skills).map(([category, items], index) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-slate-800 rounded-xl p-6 border border-slate-700"
                    >
                      <h4 className="text-lg font-semibold mb-4 text-white capitalize">
                        {category}
                      </h4>
                      <div className="space-y-4">
                        {items.map((skill) => (
                          <div key={skill.name}>
                            <div className="flex justify-between mb-1">
                              <span className="text-slate-300">
                                {skill.name}
                              </span>
                              <span className="text-purple-400">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="h-full bg-purple-600"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Education
                </h3>

                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-slate-800 rounded-xl p-6 border border-slate-700"
                    >
                      <h4 className="text-lg font-semibold text-white">
                        {edu.degree}
                      </h4>
                      <div className="flex items-center gap-2 text-purple-400 mt-1 mb-2">
                        <School className="w-4 h-4" />
                        <span>{edu.institution}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{edu.period}</span>
                      </div>
                      <p className="text-slate-300 text-sm">
                        {edu.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">
                        Download Format:
                      </span>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="downloadFormat"
                            value="pdf"
                            checked={downloadFormat === 'pdf'}
                            onChange={() => setDownloadFormat('pdf')}
                            className="form-radio text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-slate-300 text-sm">PDF</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="downloadFormat"
                            value="docx"
                            checked={downloadFormat === 'docx'}
                            onChange={() => setDownloadFormat('docx')}
                            className="form-radio text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-slate-300 text-sm">Word</span>
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={handleResumeDownload}
                      disabled={isGeneratingPDF}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 transition-colors rounded-xl border border-slate-700 text-white disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isGeneratingPDF ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Generating Resume...</span>
                        </>
                      ) : (
                        <>
                          {downloadFormat === 'pdf' ? (
                            <FileText className="w-5 h-5" />
                          ) : (
                            <Download className="w-5 h-5" />
                          )}
                          <span>Download Resume</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={contactRef}
          className="py-20 px-4 bg-slate-800/30"
        >
          <div className="container mx-auto">
            <SectionHeader
              title="Get In Touch"
              description="I'm currently seeking new opportunities to contribute to innovative projects and grow as a developer"
            />

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-800 rounded-xl p-6 border border-slate-700"
                >
                  <h3 className="text-2xl font-bold mb-6 text-white">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    {contactInfo.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={item.id} className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-purple-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-white mb-1">
                              {item.label}
                            </h4>
                            {item.href ? (
                              <a
                                href={item.href}
                                target={
                                  item.href.startsWith('mailto:') ? undefined : '_blank'
                                }
                                rel={
                                  item.href.startsWith('mailto:')
                                    ? undefined
                                    : 'noopener noreferrer'
                                }
                                className="text-slate-300 hover:text-purple-400 transition-colors"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-slate-300">{item.value}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-slate-800 rounded-xl p-6 border border-slate-700"
                >
                  <h3 className="text-2xl font-bold mb-6 text-white">
                    Send a Message
                  </h3>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-300 mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-300 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                        placeholder="Your email"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-300 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white resize-none"
                        placeholder="Your message"
                      ></textarea>
                    </div>

                    {formStatus.message && (
                      <div
                        className={`p-3 rounded-lg ${
                          formStatus.isError
                            ? 'bg-red-500/20 text-red-300'
                            : formStatus.isSubmitted
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-purple-500/20 text-purple-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {formStatus.isError ? (
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          ) : formStatus.isSubmitting ? (
                            <Loader2 className="w-5 h-5 flex-shrink-0 animate-spin" />
                          ) : (
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                          )}
                          <span>{formStatus.message}</span>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus.isSubmitting}
                      className={`w-full py-3 rounded-lg text-white font-medium flex items-center justify-center ${
                        formStatus.isSubmitting
                          ? 'bg-purple-700'
                          : 'bg-purple-600 hover:bg-purple-700 transition-colors'
                      }`}
                    >
                      {formStatus.isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-slate-400">
                © {new Date().getFullYear()} Victor Kibiwott. All rights
                reserved.
              </p>
            </div>

            <div className="flex gap-4">
              {footerSocialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-slate-800 hover:bg-purple-600 transition-colors rounded-full flex items-center justify-center text-white"
                >
                  <IconComponent className="w-5 h-5" />
                </a>
                );
              })}
            </div>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && <ProjectViewer project={activeProject} />}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
