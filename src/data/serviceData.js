// src/data/serviceData.js
import { 
  FaPalette, FaMobileAlt, FaPrint, FaShareAlt, FaCode, FaFilm, 
  FaTools, FaWindows, FaDownload, FaLaptop, FaNetworkWired, 
  FaServer, FaShoppingCart, FaRocket 
} from 'react-icons/fa';

export const serviceData = {
  // Design Services
  'graphic-design': {
    title: 'Graphic Design',
    icon: FaPalette,
    longDescription: 'Get all your graphic design needs met—from ad creative to website illustrations—with a tech-enabled solution that empowers your team to get the design they need, when they need it.',
    offeringsDescription: 'Graphic designs for day-to-day marketing needs. Within this plan you get a dedicated designer for:',
    features: ['Banner Ads', 'Social media creatives', 'Blog Graphics', 'Clothing & Merchandise Design', 'Packaging & Label', 'Any other graphics needed'],
    price: '₵1,199'
  },
  'brand-identity': {
    title: 'Brand Identity Design',
    icon: FaPalette,
    longDescription: 'Complete brand identity packages including logo design, color palette, typography, and brand guidelines.',
    offeringsDescription: 'Comprehensive brand identity solutions to establish and elevate your brand presence.',
    features: ['Logo Design', 'Brand Guidelines', 'Business Cards', 'Stationery Design'],
    price: '₵1,499'
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    icon: FaMobileAlt,
    longDescription: 'User-centered design for websites and applications focusing on usability and engagement.',
    offeringsDescription: 'Create intuitive and engaging user experiences that delight your customers.',
    features: ['Wireframing', 'Prototyping', 'User Testing', 'Responsive Design'],
    price: '₵1,299'
  },
  'print-packaging': {
    title: 'Print & Packaging',
    icon: FaPrint,
    longDescription: 'Professional print materials and packaging designs that stand out on shelves.',
    offeringsDescription: 'From business cards to product packaging, we create designs that make an impact.',
    features: ['Brochures & Flyers', 'Product Packaging', 'Business Cards', 'Posters & Banners'],
    price: '₵1,099'
  },
  'motion-graphics': {
    title: 'Motion Graphics',
    icon: FaFilm,
    longDescription: 'Animated videos and graphics for social media, presentations, and marketing.',
    offeringsDescription: 'Bring your brand to life with engaging motion graphics and animations.',
    features: ['Animated Logos', 'Explainer Videos', 'Social Media Ads', 'Presentation Graphics'],
    price: '₵1,299'
  },
  'website-design': {
    title: 'Website Design',
    icon: FaCode,
    longDescription: 'Modern, responsive websites that convert visitors into customers.',
    offeringsDescription: 'Beautiful, functional websites designed to drive results for your business.',
    features: ['Website Design', 'E-commerce Solutions', 'CMS Integration', 'SEO Optimization'],
    price: '₵1,999'
  },
  'landing-page': {
    title: 'Landing Page Design',
    icon: FaCode,
    longDescription: 'High-converting landing pages designed to capture leads and drive sales.',
    offeringsDescription: 'Landing pages optimized for conversion with clear calls-to-action.',
    features: ['Landing Page Design', 'Lead Capture Forms', 'A/B Testing Ready', 'Mobile-Optimized'],
    price: '₵899'
  },
  'powerpoint-design': {
    title: 'PowerPoint Design',
    icon: FaShareAlt,
    longDescription: 'Professional presentation designs that captivate your audience.',
    offeringsDescription: 'Presentation designs that communicate your message with clarity and style.',
    features: ['Professional Slides', 'Custom Templates', 'Data Visualization', 'Branded Presentations'],
    price: '₵699'
  },
  'saas-design': {
    title: 'SaaS Product Design',
    icon: FaLaptop,
    longDescription: 'Design solutions tailored for software-as-a-service products.',
    offeringsDescription: 'User-centered design for SaaS products that drive adoption and retention.',
    features: ['SaaS Dashboard Design', 'User Flows', 'Onboarding Experiences', 'Design Systems'],
    price: '₵1,499'
  },
  'amazon-design': {
    title: 'Amazon Design',
    icon: FaShoppingCart,
    longDescription: 'Optimized product listings and branding for Amazon sellers.',
    offeringsDescription: 'Stand out on Amazon with professional product images and listing designs.',
    features: ['Product Photography', 'Enhanced Brand Content', 'A+ Content Design', 'Storefront Design'],
    price: '₵899'
  },
  'startup-design': {
    title: 'Startup Design',
    icon: FaRocket,
    longDescription: 'Design solutions for startups looking to make a strong first impression.',
    offeringsDescription: 'Design services tailored to the fast-paced needs of growing startups.',
    features: ['Startup Branding', 'Investor Pitch Decks', 'Product Design', 'Launch Campaigns'],
    price: '₵1,199'
  },
  'software-design': {
    title: 'Software Design',
    icon: FaServer,
    longDescription: 'User-friendly software interfaces that enhance productivity.',
    offeringsDescription: 'Software interfaces designed for usability and efficiency.',
    features: ['Software UI/UX', 'Dashboard Design', 'Admin Panels', 'Internal Tools'],
    price: '₵1,299'
  },
  // Tech Services
  'computer-repair': {
    title: 'Computer Repair',
    icon: FaTools,
    longDescription: 'Professional repair services for all computer makes and models.',
    offeringsDescription: 'Expert repair services to get your devices back to peak performance.',
    features: ['Hardware Diagnosis', 'Component Replacement', 'System Cleaning', 'Performance Tuning'],
    price: '₵50/hour'
  },
  'windows-installation': {
    title: 'Windows Installation',
    icon: FaWindows,
    longDescription: 'Complete Windows OS installation, configuration, and optimization.',
    offeringsDescription: 'Professional Windows installation and setup for optimal performance.',
    features: ['Windows 10/11 Installation', 'Driver Updates', 'System Optimization', 'Data Migration'],
    price: '₵150'
  },
  'software-support': {
    title: 'Software Support',
    icon: FaDownload,
    longDescription: 'Installation and configuration of all types of software applications.',
    offeringsDescription: 'Expert software support to keep your applications running smoothly.',
    features: ['Office Suite Setup', 'Creative Software', 'Antivirus Installation', 'Troubleshooting'],
    price: '₵100'
  },
  'computer-setup': {
    title: 'Computer Setup',
    icon: FaLaptop,
    longDescription: 'Complete setup and configuration of new computer systems.',
    offeringsDescription: 'Get your new computer configured and ready for work.',
    features: ['Initial Setup', 'Software Installation', 'Data Transfer', 'System Optimization'],
    price: '₵200'
  },
  'networking': {
    title: 'Networking Solutions',
    icon: FaNetworkWired,
    longDescription: 'Setup and management of wired and wireless networks.',
    offeringsDescription: 'Reliable networking solutions for your home or business.',
    features: ['Wi-Fi Setup', 'Network Security', 'Router Configuration', 'Troubleshooting'],
    price: '₵250'
  },
  'system-management': {
    title: 'System Management',
    icon: FaServer,
    longDescription: 'Ongoing maintenance and management of computer systems.',
    offeringsDescription: 'Proactive system management to prevent issues before they occur.',
    features: ['System Monitoring', 'Regular Updates', 'Backup Solutions', 'Security Management'],
    price: '₵300/month'
  }
};

export default serviceData;