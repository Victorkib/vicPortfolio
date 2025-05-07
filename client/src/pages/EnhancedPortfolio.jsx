'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  ExternalLink,
  Github,
  Terminal,
  Eye,
  Brain,
  X,
  Briefcase,
  Calendar,
  Award,
  Star,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  Download,
  Mail,
  Linkedin,
  Twitter,
  Instagram,
  MapPin,
  Sparkles,
  Building,
  School,
  AlertCircle,
  Loader2,
  Axis3DIcon,
  FileText,
} from 'lucide-react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [activeTech, setActiveTech] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);
  const homeRef = useRef(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('pdf');

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
      const response = await axios.post(
        'http://localhost:5000/api/contact',
        formData
      );
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

  const projects = [
    {
      id: 1,
      title: 'Project CyberVox',
      type: 'Web Application',
      description: 'Full-stack e-commerce platform',
      preview: '/vocCyberImg.png?height=400&width=600',
      techStack: ['React', 'Node.js', 'MongoDb', 'Express'],
      links: {
        live: '/vocCyberVid.mp4',
        github: 'https://github.com/Victorkib/CyberCafeVoxxx.git',
      },
      metrics: {
        performance: 98,
        users: '10k+',
        transactions: '50k+',
      },
      features: [
        'Real-time inventory tracking',
        'AR product visualization',
        'AI-powered recommendations',
      ],
      codeSnippet: `
        const handleARView = async (product) => {
          const scene = new THREE.Scene();
          const model = await loadProductModel(product.id);
          scene.add(model);
          startARSession(scene);
        };
      `,
    },
    {
      id: 2,
      title: 'Career Recomendation system',
      type: 'Enterprise Solution',
      description: 'Real-time Career Recommendation platform',
      preview: '/CMSPic.png?height=400&width=600',
      techStack: ['MongoDB', 'Express', 'React', 'NodeJS'],
      links: {
        live: '/C.M.S.mp4',
        github: 'https://github.com/Victorkib/career-management-system.git',
      },
      metrics: {
        performance: 95,
        dataPoints: '1M+',
        syncRate: '99.99%',
      },
      features: [
        'Multi-node architecture',
        'Zero-downtime deployment',
        'Automatic Career recommendations',
      ],
      codeSnippet: `
          const { data, isLoading, error } = useQuery({
            queryKey: ['recommendations'],
            queryFn: () => fetchRecommendationsForUser(),
            enabled: true, 
            onSuccess: (data) => {
              console.log('Fetched recommendations:', data);
              if (!recommendations) {
                setRecommendations(data);
              }
            },
            onError: (err) => {
              console.error('Error fetching recommendations:', err);
            },
          });
      `,
    },
    {
      id: 3,
      title: 'Menta Care',
      type: 'Mobile Application',
      description: 'Comprehensive health monitoring and analytics platform',
      preview: '/MentaCarePic.jpg?height=400&width=600',
      techStack: ['React Native', 'Firebase', 'TensorFlow.js', 'GraphQL'],
      links: {
        live: '/MentaCarePic.mp4',
        github: 'https://github.com/Victorkib/mentalHealth.git',
      },
      metrics: {
        performance: 92,
        users: '25k+',
        dataPoints: '5M+/day',
      },
      features: [
        'Real-time health monitoring',
        'AI-powered health insights',
        'Secure medical data storage',
        'Integration with wearable devices',
      ],
      codeSnippet: `
        const analyzeHealthData = async (userData) => {
          const model = await tf.loadLayersModel('healthai/model.json');
          const tensor = tf.tensor2d([userData.metrics]);
          const prediction = model.predict(tensor);
          return {
            risk: prediction[0].dataSync()[0],
            recommendations: generateRecommendations(prediction)
          };
        };
      `,
    },
    {
      id: 4,
      title: 'Events Hub',
      type: 'Web Platform',
      description: 'Urban Events management and monitoring system',
      preview: '/MUEventsPic.png?height=400&width=600',
      techStack: ['Node.js', 'MQTT', 'InfluxDB', 'Vue.js'],
      links: {
        live: '/MUEvents.mp4',
        github: 'https://github.com/Victorkib/EventMngtSystem.git',
      },
      metrics: {
        performance: 97,
        devices: '10k+',
        uptime: '99.995%',
      },
      features: [
        'Real-time traffic management',
        'Environmental monitoring',
        'Predictive maintenance',
        'Energy optimization',
      ],
      codeSnippet: `
        class SensorNetwork {
          constructor(cityZone) {
            this.zone = cityZone;
            this.sensors = new Map();
            this.client = mqtt.connect('mqtt://city-hub.io');
            this.setupSubscriptions();
            this.initializeAnalytics();
          }
          
          async processAnomalyDetection(data) {
            const baseline = await this.getBaselineMetrics(data.sensorId);
            return detectAnomalies(data, baseline);
          }
        }
      `,
    },
  ];

  const techStack = {
    frontend: [
      'React',
      'Next.js',
      'Three.js',
      'Tailwind CSS',
      'GSAP',
      'Framer Motion',
    ],
    backend: ['Node.js', 'Express', 'MongoDB', 'Redis', 'GraphQL', 'WebSocket'],
    mobile: ['React Native', 'Expo', 'Flutter', 'Firebase'],
    devops: ['Docker', 'AWS', 'CI/CD', 'Kubernetes', 'GitHub Actions'],
  };

  const experiences = [
    {
      id: 1,
      company: 'Serenity Remote',
      position: 'Full Stack Developer',
      period: 'Jan 2023 - Present',
      current: true,
      description:
        'Leading development of web applications and services for international clients.',
      achievements: [
        'Architected and developed scalable web applications using the MERN stack',
        'Implemented responsive designs and optimized performance across devices',
        'Collaborated with cross-functional teams to deliver high-quality solutions',
        'Mentored junior developers and conducted code reviews',
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS', 'Docker'],
    },
    {
      id: 2,
      company: 'Freelance Developer',
      position: 'Independent Contractor',
      period: 'Jun 2022 - Present',
      current: true,
      description:
        'Providing custom web and mobile development solutions for diverse clients.',
      achievements: [
        'Delivered over 15 successful projects for clients across various industries',
        'Developed custom e-commerce solutions with payment integration',
        'Created mobile applications with React Native for iOS and Android platforms',
        'Implemented SEO optimization and analytics tracking for client websites',
      ],
      technologies: [
        'React',
        'Next.js',
        'React Native',
        'MongoDB',
        'Firebase',
        'Tailwind CSS',
      ],
    },
    {
      id: 3,
      company: 'Kholex Gaming Enterprises',
      position: 'Co-Manager & Technical Lead',
      period: 'Jan 2021 - Dec 2022',
      current: false,
      description:
        'Oversaw daily operations and implemented technical solutions for gaming center.',
      achievements: [
        'Managed a team of 5 staff members and daily operations',
        'Developed a custom booking and inventory management system',
        'Implemented technical solutions to enhance customer experience',
        'Increased revenue by 30% through strategic planning and marketing initiatives',
      ],
      technologies: [
        'JavaScript',
        'PHP',
        'MySQL',
        'HTML/CSS',
        'Network Administration',
      ],
    },
    {
      id: 4,
      company: 'Agile Business Solutions',
      position: 'Attachment Trainee',
      period: 'May 2020 - Aug 2020',
      current: false,
      description:
        'Gained hands-on experience in full-stack development and software solutions.',
      achievements: [
        'Collaborated with teams to deliver web solutions and internal tools',
        'Gained hands-on experience in full-stack development using the MERN stack',
        'Participated in UI/UX design and conducted bug testing',
        'Contributed to the development of an internal CRM system',
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Git'],
    },
  ];

  const skills = {
    programming: [
      { name: 'JavaScript', level: 95 },
      { name: 'Java', level: 80 },
      { name: 'C#', level: 70 },
    ],
    frameworks: [
      { name: 'React', level: 95 },
      { name: 'Node.js', level: 90 },
      { name: 'Express', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'React Native', level: 80 },
      { name: 'Vue.js', level: 75 },
    ],
    databases: [
      { name: 'MongoDB', level: 90 },
      { name: 'MySQL', level: 85 },
      { name: 'Firebase', level: 80 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'Redis', level: 75 },
    ],
    tools: [
      { name: 'Git', level: 95 },
      { name: 'Visual Studio Code', level: 90 },
      { name: 'MongoDB Compass', level: 85 },
      { name: 'Postman', level: 80 },
    ],
  };

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Machakos University',
      period: '2020 - Present',
      description:
        'Focusing on software engineering, data structures, and web technologies.',
    },
    {
      degree: 'High School Diploma',
      institution: 'Anestar Boys High School Lanet',
      period: '2017 - 2021',
      description:
        'Graduated with a B grade, with focus on mathematics and sciences.',
    },
  ];

  // Resume data for PDF generation
  const resumeData = {
    personalInfo: {
      name: 'VICTOR KIBIWOTT',
      address: '81-20103',
      phone: '0792454039',
      email: 'victor3720kibiwott@gmail.com',
      linkedin: 'https://www.linkedin.com/in/victor-kibiwott-b85537240/',
      summary:
        'Tech professional with hands-on experience in both front-end and back-end development. Adept at designing user interfaces, building server-side applications, and ensuring database integrity. Committed to delivering quality software solutions through collaborative teamwork and continuous learning of new technologies.',
    },
    experiences: [
      {
        position: 'FULL STACK DEVELOPER',
        company: 'SERENITY AI (REMOTE)',
        period: 'SEPTEMBER 2024 – CURRENT',
        responsibilities: [
          'Developed and maintained full-stack web applications using JavaScript, React, and Node.js, enhancing user experience and functionality.',
          'Applied best practices in security, including OAuth and JWT, to safeguard user data and protect against cyber threats.',
          'Participated in agile development processes, contributing to sprint planning, daily stand-ups, and retrospectives to enhance project outcomes.',
        ],
      },
      {
        position: 'FULL STACK DEVELOPER INTERN',
        company: 'AGILE BUSINESS SOLUTIONS',
        period: 'MARCH 2024 – AUGUST 2024',
        responsibilities: [
          'Designed and implemented RESTful APIs, enabling effective communication between front-end and back-end systems.',
          'Engaged in code reviews to maintain high standards of code quality, fostering a culture of excellence and mutual accountability.',
          'Optimised application performance through code refactoring and leveraging caching mechanisms, significantly reducing load times.',
        ],
      },
    ],
    education: [
      {
        degree: 'COMPUTER SCIENCE',
        institution: 'MACHAKOS UNIVERSITY',
        period: 'SEPTEMBER 2025',
        description:
          'Currently pursuing a Bachelor of Science in Computer Science',
      },
      {
        degree: 'HIGH SCHOOL CERTIFICATE',
        institution: 'ANESTAR BOYS LANET',
        period: 'MARCH 2021',
        description:
          'Achieve a substantial grade of B in my Kenya Certificate of Secondary Education (KSCE)',
      },
    ],
    skills: [
      'Restful web services',
      'Front End Development - React JS, Next JS, React Native, Redux, Tailwind CSS, HTML and CSS',
      'App Development – React Native, Expo, Redux',
      'Cloud Technologies - Firebase',
      'Backend Development - Express JS, Node JS, C#',
      'Database Development with MySQL, Firebase, MongoDB',
      'Payment Integration APIs – Stripe API, Paystack, Daraja API',
      'AI Development with Gemini-api and Openai-api',
    ],
    activities:
      "As a dedicated full MERN stack developer, I am passionate about leveraging technology to solve real-world problems and create impactful applications. My interests extend beyond coding—I'm actively involved in tech communities where I mentor aspiring developers and contribute to open-source projects. I am certified in advanced JavaScript and web development frameworks, continually building my skill set to stay at the forefront of industry trends.\n\nI enjoy volunteering with local organizations to promote digital literacy, helping bridge the technology gap. Additionally, I have led project teams on cross-functional initiatives, strengthening my leadership and collaboration skills. My work has been featured in tech blogs, and I'm fluent in both English and Swahili. These experiences shape my holistic approach to development, combining technical expertise with a dedication to community and growth.",
  };

  // Function to generate and download PDF resume
  const generatePDFResume = () => {
    setIsGeneratingPDF(true);

    try {
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
          .experience-item, .education-item {
            margin-bottom: 15px;
          }
          .job-title, .degree {
            font-weight: bold;
            font-size: 14px;
            margin: 0 0 5px 0;
          }
          .company-period, .institution-period {
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
  const handleResumeDownload = () => {
    if (downloadFormat === 'pdf') {
      generatePDFResume();
    } else {
      generateDOCXResume();
    }
  };

  // Particle system simulation
  const ParticleField = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const particles = [];

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      // Initialize particles
      for (let i = 0; i < 100; i++) {
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

        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }, []);

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
                    <img
                      src={project.preview || '/placeholder.svg'}
                      alt={project.title}
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
            {[
              { name: 'Home', href: '#home' },
              { name: 'Projects', href: '#projects' },
              { name: 'Experience', href: '#experience' },
              { name: 'Skills', href: '#skills' },
              { name: 'Contact', href: '#contact' },
            ].map((item) => (
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
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Experience', href: '#experience' },
                  { name: 'Skills', href: '#skills' },
                  { name: 'Contact', href: '#contact' },
                ].map((item) => (
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
                {[
                  {
                    icon: <Github className="w-5 h-5" />,
                    url: 'https://github.com/Victorkib',
                  },
                  {
                    icon: <Linkedin className="w-5 h-5" />,
                    url: 'www.linkedin.com/in/victor-kibiwott-b85537240',
                  },
                  { icon: <Twitter className="w-5 h-5" />, url: '#' },
                  { icon: <Instagram className="w-5 h-5" />, url: '#' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-slate-800 hover:bg-purple-600 transition-colors rounded-full flex items-center justify-center text-white"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" ref={projectsRef} className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-4"
              >
                Featured Projects
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-1.5 bg-purple-600 mx-auto mb-6 rounded-full"
              ></motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-2xl mx-auto text-slate-300 text-lg"
              >
                Explore my latest work and technical projects that showcase my
                skills and expertise
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layoutId={`project-${project.id}`}
                  onClick={() => setActiveProject(project)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer group border border-slate-700 hover:border-purple-500/50 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.preview || '/placeholder.svg'}
                      alt={project.title}
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
                      <button className="text-white bg-purple-600 hover:bg-purple-700 transition-colors rounded-full w-8 h-8 flex items-center justify-center">
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
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-4"
              >
                Professional Journey
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-1.5 bg-purple-600 mx-auto mb-6 rounded-full"
              ></motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-2xl mx-auto text-slate-300 text-lg"
              >
                My career path and professional experiences that have shaped my
                skills and expertise
              </motion.p>
            </div>

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

        {/* Skills & Education Section */}
        <section id="skills" ref={skillsRef} className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-4"
              >
                Skills & Education
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-1.5 bg-purple-600 mx-auto mb-6 rounded-full"
              ></motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-2xl mx-auto text-slate-300 text-lg"
              >
                My technical expertise and educational background
              </motion.p>
            </div>

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
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold mb-4"
              >
                Get In Touch
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-1.5 bg-purple-600 mx-auto mb-6 rounded-full"
              ></motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-2xl mx-auto text-slate-300 text-lg"
              >
                I'm currently seeking new opportunities to contribute to
                innovative projects and grow as a developer
              </motion.p>
            </div>

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
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">
                          Email
                        </h4>
                        <a
                          href="mailto:victo33720kibiwott@gmail.com"
                          className="text-slate-300 hover:text-purple-400 transition-colors"
                        >
                          victor3720kibiwott@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">
                          Location
                        </h4>
                        <p className="text-slate-300">Nairobi, Kenya</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Linkedin className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">
                          LinkedIn
                        </h4>
                        <a
                          href="www.linkedin.com/in/victor-kibiwott-b85537240"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-purple-400 transition-colors"
                        >
                          Victor Kibiwott
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Github className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">
                          GitHub
                        </h4>
                        <a
                          href="https://github.com/Victorkib"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-purple-400 transition-colors"
                        >
                          @victorkibiwott
                        </a>
                      </div>
                    </div>
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
              {[
                {
                  icon: <Github className="w-5 h-5" />,
                  url: 'https://github.com/victorkibiwott',
                },
                {
                  icon: <Linkedin className="w-5 h-5" />,
                  url: 'https://www.linkedin.com/in/victor-kibiwott-b85537240',
                },
                { icon: <Twitter className="w-5 h-5" />, url: '#' },
                { icon: <Instagram className="w-5 h-5" />, url: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-purple-600 transition-colors rounded-full flex items-center justify-center text-white"
                >
                  {social.icon}
                </a>
              ))}
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
