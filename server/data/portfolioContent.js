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
    company: 'Serenity Remote',
    position: 'Full Stack Developer',
    period: 'September 2023 - Present',
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
    company: 'Agile Business Solutions',
    position: 'Attachment Trainee',
    period: 'May 2024 - Sept 2024',
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
  {
    id: 3,
    company: 'Freelance Developer',
    position: 'Independent Contractor',
    period: 'Jun 2023 - Present',
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
    id: 4,
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

export const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Machakos University',
    period: '2020 - Present',
    description:
      'I successfully completed a four-year Bachelor of Science in Computer Science program, gaining a solid foundation in software development, data structures and algorithms, databases, artificial intelligence, and cybersecurity. For my final year project, I developed a full-stack mobile application to support mental health assessments using the MERN stack. During my studies, I actively participated in university technology events, coding bootcamps, and collaborative software development projects. I am currently awaiting graduation and official degree conferment.',
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
    skills: ['Problem Solving', 'Rapid Development', 'Innovation', 'Leadership'],
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
      description: 'Currently pursuing a Bachelor of Science in Computer Science',
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
