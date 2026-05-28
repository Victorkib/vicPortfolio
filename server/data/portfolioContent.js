export const projects = [
  {
    id: 1,
    title: 'Project CyberVox',
    type: 'Web Application',
    description: 'Full-stack e-commerce platform',
    preview: '/vocCyberImg.png?height=400&width=600',
    media: {
      coverImage: '/vocCyberImg.png?height=400&width=600',
      demoVideo:
        'https://res.cloudinary.com/victorkib/video/upload/v1756229166/vicPortfolio/vocCyberVid_v3er2j.mp4',
      gallery: ['/vocCyberImg.png?height=400&width=600'],
    },
    techStack: ['React', 'Node.js', 'MongoDb', 'Express'],
    links: {
      live: 'https://res.cloudinary.com/victorkib/video/upload/v1756229166/vicPortfolio/vocCyberVid_v3er2j.mp4',
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
    media: {
      coverImage: '/CMSPic.png?height=400&width=600',
      demoVideo:
        'https://res.cloudinary.com/victorkib/video/upload/v1763018642/vicPortfolio/C.M.S_demo_vdiejg.mp4',
      gallery: ['/CMSPic.png?height=400&width=600'],
    },
    techStack: ['MongoDB', 'Express', 'React', 'NodeJS'],
    links: {
      live: 'https://res.cloudinary.com/victorkib/video/upload/v1763018642/vicPortfolio/C.M.S_demo_vdiejg.mp4',
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
    media: {
      coverImage: '/MentaCarePic.jpg?height=400&width=600',
      demoVideo:
        'https://res.cloudinary.com/victorkib/video/upload/v1756229240/vicPortfolio/MentaCarePic_giwmbc.mp4',
      gallery: ['/MentaCarePic.jpg?height=400&width=600'],
    },
    techStack: ['React Native', 'Firebase', 'TensorFlow.js', 'GraphQL'],
    links: {
      live: 'https://res.cloudinary.com/victorkib/video/upload/v1756229240/vicPortfolio/MentaCarePic_giwmbc.mp4',
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
    media: {
      coverImage: '/MUEventsPic.png?height=400&width=600',
      demoVideo:
        'https://res.cloudinary.com/victorkib/video/upload/v1756229444/vicPortfolio/MUEvents_akykpa.mp4',
      gallery: ['/MUEventsPic.png?height=400&width=600'],
    },
    techStack: ['Node.js', 'MQTT', 'InfluxDB', 'Vue.js'],
    links: {
      live: 'https://res.cloudinary.com/victorkib/video/upload/v1756229444/vicPortfolio/MUEvents_akykpa.mp4',
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

export const experiences = [
  {
    id: 1,
    company: 'Globeconcs Convergence Solutions',
    position: 'ICT Developer',
    period: 'January 2026 - Present',
    current: true,
    description:
      'Contributing to MIS and web platforms for social protection and public-sector programs.',
    achievements: [
      'Built and maintained management information systems for social impact workflows',
      'Collaborated with senior engineers to deliver secure and scalable project implementations',
      'Troubleshot production issues and improved platform reliability',
      'Researched and introduced tools that improved system performance and delivery speed',
    ],
    technologies: ['React', 'Node.js', 'Express', 'MySQL', 'Supabase', 'Git'],
  },
  {
    id: 2,
    company: 'MentaCare (Remote)',
    position: 'Full Stack Developer',
    period: 'September 2023 - Present',
    current: true,
    description:
      'Developed and maintained full-stack solutions for healthcare-focused product workflows.',
    achievements: [
      'Developed and maintained web applications using JavaScript, React, and Node.js',
      'Applied OAuth and JWT practices to improve application security',
      'Contributed in agile ceremonies including planning, standups, and retrospectives',
      'Optimized user experience and performance across core application modules',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'OAuth'],
  },
  {
    id: 3,
    company: 'Agile Business Solutions',
    position: 'Attachment Trainee',
    period: 'May 2024 - September 2024',
    current: false,
    description:
      'Gained practical full-stack exposure through client projects and internal solutions.',
    achievements: [
      'Collaborated with teams to deliver web solutions and internal tools',
      'Built hands-on MERN stack delivery skills in production-like environments',
      'Participated in UI/UX design and bug validation workflows',
      'Contributed to the development of an internal CRM system',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Git', 'Postman'],
  },
  {
    id: 4,
    company: 'Freelance Developer',
    position: 'Independent Contractor',
    period: 'January 2023 - Present',
    current: true,
    description:
      'Delivering custom web and mobile products for clients across multiple industries.',
    achievements: [
      'Delivered over 15 successful projects for diverse client needs',
      'Implemented payment-ready e-commerce and service platforms',
      'Built React Native apps for Android and iOS use cases',
      'Improved discoverability through SEO and analytics integration',
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
    id: 5,
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
];

export const skills = {
  programming: [
    { name: 'JavaScript', level: 95 },
    { name: 'Java', level: 86 },
    { name: 'C#', level: 84 },
  ],
  frameworks: [
    { name: 'React', level: 95 },
    { name: 'Node.js', level: 90 },
    { name: 'Express', level: 90 },
    { name: 'Next.js', level: 85 },
    { name: 'React Native', level: 87 },
    { name: 'Redux', level: 84 },
  ],
  databases: [
    { name: 'MongoDB', level: 90 },
    { name: 'MySQL', level: 85 },
    { name: 'Firebase', level: 88 },
    { name: 'Supabase', level: 86 },
    { name: 'SQL Server (SSMS)', level: 84 },
  ],
  tools: [
    { name: 'Git', level: 95 },
    { name: 'Visual Studio Code', level: 90 },
    { name: 'Postman', level: 84 },
    { name: 'n8n', level: 89 },
    { name: 'Power BI', level: 85 },
  ],
};

export const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Machakos University',
    period: 'Graduated September 2025',
    description:
      'Completed a four-year program with strong grounding in software engineering, data structures, databases, AI, and cybersecurity. Final-year project focused on a MERN-based mental health assessment app. Graduated with Second Class Honors (Upper Division).',
  },
  {
    degree: 'High School Diploma',
    institution: 'Anestar Boys High School Lanet',
    period: '2017 - 2021',
    description:
      'I earned a solid overall grade of B in the Kenya Certificate of Secondary Education, with strong performance in Mathematics, Physics, and Computer Studies, while actively participating in the ICT club, science and technology fairs, and demonstrating leadership and teamwork through academic group projects and extracurricular activities',
  },
  {
    degree: 'Primary School Certificate',
    institution: 'Immaculate Parochial School',
    period: 'December 2016',
    description:
      'Achieved a cumulative score of 375 with standout results in Mathematics, English, and Science. Actively involved in the Computer Club and participated in various science and technology exhibitions. Showcased strong leadership, collaboration, and problem-solving abilities through group assignments and co-curricular activities. Consistently maintained a disciplined academic record, earning recognition for reliability and dedication.',
  },
];

export const certifications = [
  {
    id: 1,
    title: 'Advanced JavaScript & Web Development',
    issuer: 'Agile Business Solutions',
    date: 'August 2024',
    description:
      'Comprehensive certification in advanced JavaScript concepts, modern web development frameworks, and best practices in full-stack development.',
    skills: ['JavaScript', 'React', 'Node.js', 'Best Practices'],
    iconKey: 'trophy',
  },
  {
    id: 2,
    title: 'Google Developer Groups - Tech Leadership',
    issuer: 'GDG - Google Developer Groups',
    date: 'July 2024 - Completed',
    description:
      'Active member and contributor to Google Developer Groups, participating in tech talks, workshops, and community-driven initiatives to advance technology awareness and leadership.',
    skills: ['Community Leadership', 'Tech Mentorship', 'Web Technologies'],
    iconKey: 'users',
  },
  {
    id: 3,
    title: 'Hackfest 2024 - Winner',
    issuer: 'Machakos University Hackathon',
    date: 'November 2024',
    description:
      'Won Machakos University Hackfest 2024 by delivering innovative Mental Health solution and demonstrating exceptional problem-solving skills and rapid development capabilities in a competitive environment.',
    skills: [
      'Problem Solving',
      'Rapid Development',
      'Innovation',
      'Leadership',
    ],
    iconKey: 'sparkles',
  },
];

export const resumeData = {
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
      position: 'ICT DEVELOPER',
      company: 'GLOBECONCS CONVERGENCE SOLUTIONS',
      period: 'JANUARY 2026 – CURRENT',
      responsibilities: [
        'Contributed to MIS and web-based solutions for social protection and public sector programs.',
        'Collaborated with senior engineers to troubleshoot and deliver scalable, secure projects.',
        'Researched and integrated technologies that improved system performance and delivery.',
      ],
    },
    {
      position: 'FULL STACK DEVELOPER',
      company: 'MENTACARE (REMOTE)',
      period: 'SEPTEMBER 2023 – CURRENT',
      responsibilities: [
        'Developed and maintained full-stack applications with React and Node.js.',
        'Applied OAuth and JWT security standards in user-facing systems.',
        'Contributed in agile ceremonies and incremental feature delivery.',
      ],
    },
    {
      position: 'ATTACHMENT TRAINEE',
      company: 'AGILE BUSINESS SOLUTIONS',
      period: 'MAY 2024 – SEPTEMBER 2024',
      responsibilities: [
        'Collaborated with teams to deliver client web solutions and internal tools.',
        'Participated in UI/UX design and structured bug-testing workflows.',
        'Contributed to the development of an internal CRM platform.',
      ],
    },
  ],
  education: [
    {
      degree: 'COMPUTER SCIENCE',
      institution: 'MACHAKOS UNIVERSITY',
      period: 'SEPTEMBER 2025',
      description:
        'Completed BSc Computer Science with Second Class Honors (Upper Division).',
    },
    {
      degree: 'HIGH SCHOOL CERTIFICATE',
      institution: 'ANESTAR BOYS LANET',
      period: 'MARCH 2021',
      description:
        'Achieve a substantial grade of B in my Kenya Certificate of Secondary Education (KSCE)',
    },
    {
      degree: 'PRIMARY SCHOOL CERTIFICATE',
      institution: 'IMMACULATE PAROCHIAL SCHOOL',
      period: 'DECEMBER 2016',
      description:
        'Achieved a cumulative score of 375 with standout results in Mathematics, English, and Science.',
    },
  ],
  skills: [
    'Restful web services',
    'WordPress services',
    'Front End Development - React JS, Next JS, React Native, Redux, Tailwind CSS, HTML and CSS',
    'App Development - React Native, Expo, Redux',
    'Cloud Technologies - Firebase, Supabase, Cloudinary, Google Cloud Console',
    'Backend Development - Express JS, Node JS, C#',
    'Database Development with MySQL, Firebase, MongoDB, Supabase',
    'Payment Integration APIs – Stripe API, Paystack, Daraja API',
    'AI Development with Gemini API and OpenAI API integration',
    'n8n workflow automation',
    'Power BI system management',
    'SQL Server Management Studio (SSMS)',
  ],
  activities:
    "As a dedicated full MERN stack developer, I am passionate about leveraging technology to solve real-world problems and create impactful applications. My interests extend beyond coding—I'm actively involved in tech communities where I mentor aspiring developers and contribute to open-source projects. I am certified in advanced JavaScript and web development frameworks, continually building my skill set to stay at the forefront of industry trends.\n\nI enjoy volunteering with local organizations to promote digital literacy, helping bridge the technology gap. Additionally, I have led project teams on cross-functional initiatives, strengthening my leadership and collaboration skills. My work has been featured in tech blogs, and I'm fluent in both English and Swahili. These experiences shape my holistic approach to development, combining technical expertise with a dedication to community and growth.",
  certifications: [
    {
      title: 'Advanced JavaScript & Web Development',
      issuer: 'Agile Business Solutions',
      date: 'August 2024',
      description:
        'Comprehensive certification in advanced JavaScript concepts and full-stack development best practices.',
    },
    {
      title: 'Google Developer Groups - Tech Leadership',
      issuer: 'GDG - Google Developer Groups',
      date: 'July 2024 - Completed',
      description:
        'Contributed to tech talks, workshops, and community initiatives focused on developer growth.',
    },
    {
      title: 'Hackfest 2024 - Winner',
      issuer: 'Machakos University Hackathon',
      date: 'November 2024',
      description:
        'Built and presented an award-winning mental health solution under hackathon constraints.',
    },
  ],
};
