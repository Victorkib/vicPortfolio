import { useEffect } from 'react';

/**
 * SEO Component - Dynamically updates document head with SEO meta tags
 * @param {Object} props - SEO configuration object
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Comma-separated keywords
 * @param {string} props.author - Author name
 * @param {string} props.image - Open Graph image URL
 * @param {string} props.url - Canonical URL
 * @param {string} props.type - Open Graph type (website, article, etc.)
 */
const SEO = ({
  title = 'Victor Kibiwott - Full Stack Developer Portfolio',
  description = 'Portfolio of Victor Kibiwott, a skilled Full Stack Developer specializing in MERN stack, React, Node.js, and modern web technologies. Explore projects, experience, and certifications.',
  keywords = 'Victor Kibiwott, Full Stack Developer, MERN Stack, React Developer, Node.js, Web Development, Portfolio, JavaScript, MongoDB, Express',
  author = 'Victor Kibiwott',
  image = '/qin.jpeg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
}) => {
  useEffect(() => {
    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update title
    document.title = title;

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Victor Kibiwott Portfolio', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:creator', '@victorkibiwott');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Language
    document.documentElement.setAttribute('lang', 'en');

    // Structured Data (JSON-LD) for better SEO
    let structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredData);
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Victor Kibiwott',
      jobTitle: 'Full Stack Developer',
      description: description,
      url: url,
      image: image,
      sameAs: [
        'https://github.com/Victorkib',
        'https://www.linkedin.com/in/victor-kibiwott-b85537240',
      ],
      knowsAbout: [
        'MERN Stack',
        'React',
        'Node.js',
        'MongoDB',
        'Express',
        'JavaScript',
        'Web Development',
        'Full Stack Development',
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Machakos University',
      },
    };

    structuredData.textContent = JSON.stringify(jsonLd);

    // Cleanup function (optional, but good practice)
    return () => {
      // Note: We don't remove meta tags on unmount as they should persist
      // until the next page loads
    };
  }, [title, description, keywords, author, image, url, type]);

  return null; // This component doesn't render anything
};

export default SEO;

