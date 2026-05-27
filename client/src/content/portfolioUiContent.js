import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

export const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export const heroContent = {
  name: 'Victor Kibiwott',
  role: 'Full Stack Developer',
  headline: 'I build reliable MERN products that look premium and scale cleanly.',
  subheadline:
    'From API design to polished interfaces — focused on performance, maintainability, and real-world impact.',
  profileImage: '/qin.jpeg',
  availability: 'Open to full-time, contract, and remote opportunities',
  location: 'Nairobi, Kenya',
};

export const heroSocialLinks = [
  {
    id: 'github',
    icon: Github,
    url: 'https://github.com/Victorkib',
    label: 'GitHub',
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/victor-kibiwott-b85537240/',
    label: 'LinkedIn',
  },
];

export const footerSocialLinks = heroSocialLinks;

export const contactInfo = [
  {
    id: 'email',
    label: 'Email',
    value: 'victor3720kibiwott@gmail.com',
    href: 'mailto:victor3720kibiwott@gmail.com',
    icon: Mail,
  },
  {
    id: 'location',
    label: 'Location',
    value: 'Nairobi, Kenya',
    icon: MapPin,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'Victor Kibiwott',
    href: 'https://www.linkedin.com/in/victor-kibiwott-b85537240/',
    icon: Linkedin,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: '@Victorkib',
    href: 'https://github.com/Victorkib',
    icon: Github,
  },
];
