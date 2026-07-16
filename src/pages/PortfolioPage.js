import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PortfolioPage.css';

const PortfolioPage = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [activeView, setActiveView] = useState('grid');
  const navigate = useNavigate();

  // Complete projects data with all 55 projects including new ones
  const allProjects = [
    {
      id: 1,
      title: 'Golden Nest Hotel Website',
      category: 'web',
      description: 'Complete website design and development for luxury hotel brand with booking system integration',
      detailedDescription: 'A comprehensive website redesign for Golden Nest Hotel featuring a modern, luxurious design with integrated booking system, room gallery, and customer reviews. The project focused on creating a seamless user experience that reflects the hotel\'s premium brand identity.',
      tags: ['Web Design', 'Development', 'Booking System', 'Responsive', 'Luxury Brand'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: 'Golden Nest Hotel',
      year: '2025',
      duration: '8 weeks',
      role: 'Lead Designer & Developer',
      deliverables: ['Complete Website', 'Booking System', 'Admin Panel', 'Mobile App Design'],
      results: ['40% increase in online bookings', '25% higher user engagement', '5-star client satisfaction'],
      color: '#D4AF37',
      link: 'https://www.goldennesthotelgh.com',
      mockups: []
    },
    {
      id: 2,
      title: 'St. Martin De Porres Catholic Hospital, Agomanya',
      category: 'branding',
      description: 'Award-winning logo for the 80th Anniversary, blending timeless elegance with a forward-looking vision.',
      detailedDescription: 'In celebration of a landmark 80th anniversary, this logo was selected last year as the winning design from an open challenge, chosen for its ability to capture both legacy and forward momentum.\n\nThe bold, centered "80TH" serves as the focal point, framed by the foundational words "HERITAGE" and "FUTURE". This elegant structure creates a visual statement that is both monumental and meaningful.',
      tags: ['Logo Design', 'Brand Identity', 'Anniversary', 'Healthcare', 'Institutional Branding'],
      image: '80th.jpg',
      client: 'St. Martin De Porres Catholic Hospital',
      year: '2025',
      duration: '2 weeks',
      role: 'Lead Brand Identity Designer',
      deliverables: ['Anniversary Logo', 'Brand Guidelines', 'Stationery System', 'Merchandise Application'],
      results: ['Selected as winning design from open competition', 'Successfully launched for 80th anniversary', 'Adopted across all hospital communications'],
      color: '#2E5A9C',
      mockups: []
    },
    {
      id: 3,
      title: 'FinTech Mobile Banking App',
      category: 'uiux',
      description: 'UI/UX design for innovative mobile banking application with financial tracking features',
      detailedDescription: 'Designed a user-friendly mobile banking application that simplifies financial management. The project involved user research, wireframing, prototyping, and creating a design system for consistent user experience.',
      tags: ['UI Design', 'UX Research', 'Mobile App', 'FinTech', 'Prototyping'],
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: 'FinTech Innovations Inc.',
      year: '2023',
      duration: '12 weeks',
      role: 'UI/UX Designer',
      deliverables: ['Wireframes', 'High-fidelity Prototypes', 'Design System', 'User Testing Reports'],
      results: ['User retention increased by 45%', 'App Store rating: 4.8 stars', '1M+ downloads in first month'],
      color: '#2196F3',
      mockups: []
    },
    {
      id: 4,
      title: 'Organic Food Packaging Series',
      category: 'packaging',
      description: 'Sustainable packaging design for organic food product line across multiple categories',
      detailedDescription: 'Created a cohesive packaging system for Organic Foods\' product line that emphasizes natural ingredients and sustainability. The design uses eco-friendly materials and communicates product benefits clearly.',
      tags: ['Packaging Design', 'Print Production', 'Sustainability', 'Brand Consistency'],
      image: 'https://images.unsplash.com/photo-1580995170656-f0aa5c5c31dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: 'Organic Foods Ltd.',
      year: '2023',
      duration: '4 weeks',
      role: 'Packaging Designer',
      deliverables: ['Packaging Designs', 'Production Files', 'Material Specifications', 'Print Samples'],
      results: ['Sales increased by 35%', 'Packaging award winner', 'Featured on retail design blog'],
      color: '#8BC34A',
      mockups: []
    },
    {
      id: 5,
      title: 'Tech Startup Corporate Website',
      category: 'web',
      description: 'Modern corporate website design with investor relations and recruitment sections',
      detailedDescription: 'Designed and developed a corporate website for TechStart Inc. that showcases their products, company culture, and investment opportunities. The site includes dynamic content management and multilingual support.',
      tags: ['Corporate Website', 'CMS Integration', 'Multilingual', 'Investor Relations'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: 'TechStart Inc.',
      year: '2023',
      duration: '6 weeks',
      role: 'Web Designer & Developer',
      deliverables: ['Responsive Website', 'CMS Setup', 'Content Strategy', 'SEO Optimization'],
      results: ['Traffic increased by 200%', 'Improved SEO ranking', 'Positive investor feedback'],
      color: '#673AB7',
      mockups: []
    },
    {
      id: 6,
      title: 'Fitness App UI/UX Design',
      category: 'uiux',
      description: 'Mobile fitness app design with workout tracking and community features',
      detailedDescription: 'Created an engaging fitness app interface that motivates users through gamification and social features. The design focuses on intuitive workout tracking and progress visualization.',
      tags: ['Mobile Design', 'Fitness App', 'Gamification', 'User Engagement'],
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: 'FitTrack Solutions',
      year: '2023',
      duration: '10 weeks',
      role: 'UI/UX Designer',
      deliverables: ['App Design', 'User Flows', 'Interactive Prototype', 'Design System'],
      results: ['User engagement up 55%', '4.9 App Store rating', '100k active users'],
      color: '#FF5722',
      mockups: []
    },
    {
      id: 7,
      title: 'Ani\'s Serabs - Business Identity',
      category: 'branding',
      description: 'Clean, modern business card design for Ani\'s Serabs with essential contact details',
      detailedDescription: 'Designed today, this business card establishes a clear and professional identity for Ani\'s Serabs. The layout prioritizes clarity with a clean, two-line business name set in a modern, approachable typeface.',
      tags: ['Business Card', 'Print Design', 'Brand Identity', 'Typography', 'Stationery'],
      image: 'anis-serabs.jpg',
      client: 'Ani\'s Serabs',
      year: '2026',
      duration: '1 day',
      role: 'Graphic Designer',
      deliverables: ['Business Card Design', 'Print-Ready Files'],
      results: ['Professional identity established', 'Ready for immediate print and distribution', 'Client-approved final design'],
      color: '#1565C0',
      mockups: []
    },
    {
      id: 8,
      title: 'Julie\'s Birthday Celebration Design',
      category: 'event',
      description: 'Personalized birthday graphic designed for a special celebration',
      detailedDescription: 'Created a custom birthday design for Julie\'s celebration, blending celebratory elements with personalized flair. The design features a joyful, festive aesthetic that captures the spirit of the occasion.',
      tags: ['Personal Design', 'Event Graphics', 'Birthday', 'Celebration', 'Digital Art'],
      image: 'julie-birthday.jpg',
      client: 'Personal Client',
      year: '2025',
      duration: '1 day',
      role: 'Graphic Designer',
      deliverables: ['Custom Birthday Graphic', 'Digital Files', 'Social Media Version'],
      results: ['Delivered on time for the celebration', 'Client delighted with personalized touch', 'Graphic used across multiple platforms'],
      color: '#FF4081',
      mockups: []
    },
    {
      id: 9,
      title: 'YouTube T-Shirt Design',
      category: 'print',
      description: 'Bold, typography-focused t-shirt design featuring a modern stacked graphic',
      detailedDescription: 'A minimalist yet bold t-shirt design centered around a clean, stacked layout. This print-ready graphic emphasizes strong typography and negative space, creating a contemporary, eye-catching statement piece.',
      tags: ['T-Shirt Design', 'Apparel', 'Typography', 'Streetwear', 'Print Ready'],
      image: 'top-1.jpg',
      client: 'Apparel Client',
      year: '2025',
      duration: '1 day',
      role: 'Graphic Designer',
      deliverables: ['T-Shirt Graphic', 'Print-Ready File', 'Color Variations'],
      results: ['Design approved for print', 'Versatile for multiple apparel products', 'Clean, scalable artwork delivered'],
      color: '#FF0000',
      mockups: []
    },
    {
      id: 10,
      title: 'Mr. Wise Clothing - Brand Identity',
      category: 'branding',
      description: 'Sophisticated logo for Mr. Wise Clothing with tagline "Exclusively Different"',
      detailedDescription: 'Designed last year, this brand identity establishes Mr. Wise Clothing as a sophisticated and distinctive fashion label. The logo centers on clean, confident typography, conveying reliability and premium quality.',
      tags: ['Logo Design', 'Fashion Branding', 'Brand Identity', 'Typography', 'Luxury'],
      image: 'mr-wise.jpg',
      client: 'Mr. Wise Clothing',
      year: '2025',
      duration: '2 weeks',
      role: 'Brand Identity Designer',
      deliverables: ['Primary Logo', 'Brand Guidelines', 'Stationery Application', 'Mockups'],
      results: ['Successfully launched brand identity', 'Positions brand in premium fashion segment', 'Received positive client feedback'],
      color: '#111111',
      mockups: []
    },
    {
      id: 11,
      title: 'Abidan Royal Mango Ice-Cream Label',
      category: 'packaging',
      description: 'Product label design for Abidan Royal Mango Ice-Cream with clear ingredient listing',
      detailedDescription: 'A practical and informative packaging label created for Abidan Royal Enterprise\'s Mango Ice-Cream. The design prioritizes clarity and regulatory compliance, prominently displaying product information.',
      tags: ['Packaging Design', 'Food Label', 'Product Design', 'Print', 'Compliance'],
      image: 'mango-label.jpg',
      client: 'Abidan Royal Enterprise',
      year: '2024',
      duration: '3 days',
      role: 'Packaging & Label Designer',
      deliverables: ['Print-Ready Label Design', 'Compliance Layout', 'Digital Proof'],
      results: ['Label meets regulatory requirements', 'Clear and attractive product presentation', 'Supports brand credibility'],
      color: '#FFB74D',
      mockups: []
    },
    {
      id: 12,
      title: 'Methylated Spirit Label - St. Martin Hospital',
      category: 'packaging',
      description: 'Professional pharmaceutical label with clear safety warnings and usage instructions',
      detailedDescription: 'A functional and compliant label created for St. Martin De Porres Catholic Hospital\'s methylated spirit product. The design emphasizes critical safety information and proper handling guidelines.',
      tags: ['Pharmaceutical Label', 'Packaging', 'Safety Design', 'Hospital Branding', 'Regulatory'],
      image: 'methylated-spirit.jpg',
      client: 'St. Martin De Porres Catholic Hospital',
      year: '2024',
      duration: '3 days',
      role: 'Healthcare Packaging Designer',
      deliverables: ['Compliant Label Design', 'Safety-Focused Layout', 'Print-Ready Artwork'],
      results: ['Clear communication of safety protocols', 'Meets healthcare packaging standards', 'Strengthens institutional branding'],
      color: '#D32F2F',
      mockups: []
    },
    {
      id: 13,
      title: 'Mr. Wise Mobile Money Services Flyer',
      category: 'print',
      description: 'Informative flyer for Mr. Wise Mobile Money Services with service listings',
      detailedDescription: 'A comprehensive promotional flyer created to advertise Mr. Wise Mobile Money Services. The design organizes services into a scannable, bulleted list for easy readability.',
      tags: ['Flyer Design', 'Mobile Money', 'Promotional Print', 'Service Advertisement', 'Typography'],
      image: 'mr-wise-momo-flyer.jpg',
      client: 'Mr. Wise Mobile Money Services',
      year: '2026',
      duration: '2 days',
      role: 'Print & Marketing Designer',
      deliverables: ['Promotional Flyer', 'Print-Ready File', 'Digital Version'],
      results: ['Clear communication of service offerings', 'Effective for customer education', 'Strengthens local service visibility'],
      color: '#FF9900',
      mockups: []
    },
    {
      id: 14,
      title: 'Funeral Program - Celebration of Life',
      category: 'print',
      description: 'Comprehensive funeral program design with ceremonial arrangements and family listings',
      detailedDescription: 'A respectfully designed funeral program titled "Celebration of Life," created to guide attendees through memorial services. The layout organizes extensive information with clear typographic hierarchy.',
      tags: ['Funeral Program', 'Memorial Design', 'Event Print', 'Typography', 'Keepsake'],
      image: 'funeral-program.jpg',
      client: 'Family of Gladys',
      year: '2024',
      duration: '4 days',
      role: 'Memorial Print Designer',
      deliverables: ['Funeral Program Booklet', 'Print-Ready Files', 'Digital Proof'],
      results: ['Clear communication of funeral events', 'Dignified tribute to the deceased', 'Provided organized memorial materials'],
      color: '#5D4037',
      mockups: []
    },
    {
      id: 15,
      title: 'St. Martin Hospital Ultrasound Unit Flyer',
      category: 'print',
      description: 'Promotional flyer for ultrasound services at St. Martin Hospital',
      detailedDescription: 'Designed an informative promotional flyer for the Ultrasound Unit at St. Martin De Porres Catholic Hospital in Agomanya. The design clearly lists all available ultrasound services and contact information for easy patient access.',
      tags: ['Healthcare Flyer', 'Medical Services', 'Promotional Material', 'Hospital Marketing', 'Typography'],
      image: 'Artboard 1.jpg',
      client: 'St. Martin De Porres Catholic Hospital',
      year: '2025',
      duration: '3 days',
      role: 'Healthcare Marketing Designer',
      deliverables: ['Service Flyer', 'Digital Version', 'Print-Ready Files'],
      results: ['Clear service communication', 'Improved patient awareness', 'Professional hospital branding'],
      color: '#2E5A9C',
      mockups: []
    },
    {
      id: 16,
      title: 'St. Martin Hospital CT Scan Services',
      category: 'print',
      description: 'CT scan services information design for hospital patients',
      detailedDescription: 'Created a comprehensive CT scan services information sheet for St. Martin Hospital. The design organizes different CT scan procedures in a clear, easy-to-understand format with contact information for appointments.',
      tags: ['Medical Services', 'Healthcare Design', 'Information Sheet', 'Hospital Communication', 'Layout'],
      image: 'CT  SCAN.jpg',
      client: 'St. Martin De Porres Catholic Hospital',
      year: '2025',
      duration: '4 days',
      role: 'Healthcare Communication Designer',
      deliverables: ['Services Information Sheet', 'Digital Display Version', 'Print Materials'],
      results: ['Patient education improved', 'Service awareness increased', 'Professional medical presentation'],
      color: '#1976D2',
      mockups: []
    },
    {
      id: 17,
      title: 'Anchor Grfix Business Services Flyer',
      category: 'print',
      description: 'Comprehensive business services promotion for Anchor Grfix',
      detailedDescription: 'Designed a detailed promotional flyer for Anchor Grfix showcasing their wide range of services including photocopy, printing, graphic design, computer repairs, and more. The layout organizes services clearly with contact information.',
      tags: ['Business Flyer', 'Service Promotion', 'Print Design', 'Typography', 'Layout'],
      image: 'desmond.jpg',
      client: 'Anchor Grfix',
      year: '2026',
      duration: '3 days',
      role: 'Marketing & Print Designer',
      deliverables: ['Comprehensive Service Flyer', 'Digital Version', 'Print-Ready Files'],
      results: ['All services clearly presented', 'Contact information prominent', 'Professional business image'],
      color: '#FF6B35',
      mockups: []
    },
    {
      id: 18,
      title: 'Kitchen Business Logo Design',
      category: 'branding',
      description: 'Clean and appetizing logo design for kitchen/food business',
      detailedDescription: 'Created a simple yet effective logo for a kitchen business with a focus on food preparation. The design uses clean typography with a subtle icon element to create a memorable brand identity.',
      tags: ['Logo Design', 'Food Business', 'Brand Identity', 'Typography', 'Minimalist'],
      image: 'KITCHEN LOGO.png',
      client: 'Kitchen Business',
      year: '2025',
      duration: '2 days',
      role: 'Logo Designer',
      deliverables: ['Primary Logo', 'Brand Guidelines', 'File Formats'],
      results: ['Clean brand identity established', 'Appetizing design aesthetic', 'Versatile for various applications'],
      color: '#FF7043',
      mockups: []
    },
    {
      id: 19,
      title: 'Valentine\'s Day Event Program Outline',
      category: 'event',
      description: 'Detailed event program outline for Valentine\'s Day workplace celebration',
      detailedDescription: 'Designed a comprehensive event program outline for a Valentine\'s Day workplace celebration with theme "Balancing work-life & Love for a healthier workplace." The layout organizes the entire event schedule with timing and participant information.',
      tags: ['Event Program', 'Schedule Design', 'Workplace Events', 'Layout', 'Typography'],
      image: 'outline 2.jpg',
      client: 'Corporate Client',
      year: '2025',
      duration: '3 days',
      role: 'Event & Print Designer',
      deliverables: ['Event Program Outline', 'Schedule Design', 'Digital Version'],
      results: ['Organized event scheduling', 'Clear participant assignments', 'Professional event materials'],
      color: '#E91E63',
      mockups: []
    },
    {
      id: 20,
      title: 'Fast Multimedia Business Promotion',
      category: 'print',
      description: 'Business promotion design for Fast Multimedia services',
      detailedDescription: 'Created a bold promotional design for Fast Multimedia showcasing their graphic design services including poster design, banner design, birthday design, and more with clear contact information.',
      tags: ['Business Promotion', 'Service Advertisement', 'Graphic Design', 'Contact Information', 'Layout'],
      image: 'portfolio-details-1.jpg',
      client: 'Fast Multimedia',
      year: '2025',
      duration: '2 days',
      role: 'Marketing Designer',
      deliverables: ['Promotional Design', 'Digital Files', 'Print Version'],
      results: ['Services clearly highlighted', 'Contact information prominent', 'Eye-catching design'],
      color: '#0047AB',
      mockups: []
    },
    {
      id: 21,
      title: 'St. Martin Goes Traditional Event',
      category: 'event',
      description: 'Cultural event promotion for hospital traditional day celebration',
      detailedDescription: 'Designed promotional materials for St. Martin Hospital\'s "Goes Traditional" cultural event. The design features traditional elements with clear event details including date, time, and location.',
      tags: ['Cultural Event', 'Hospital Events', 'Event Promotion', 'Traditional Design', 'Layout'],
      image: 'ST MARTIN GOES TRADITIONAL 1.jpg',
      client: 'St. Martin De Porres Catholic Hospital',
      year: '2025',
      duration: '4 days',
      role: 'Event & Cultural Designer',
      deliverables: ['Event Poster', 'Digital Promotion', 'Print Materials'],
      results: ['Cultural celebration promoted', 'Community engagement', 'Hospital cultural initiative'],
      color: '#795548',
      mockups: []
    },
    {
      id: 22,
      title: 'Fast Multimedia Promotion Flyer',
      category: 'print',
      description: 'Promotional flyer for Fast Multimedia services with contact information',
      detailedDescription: 'Created a professional promotional flyer for Fast Multimedia to showcase their services and encourage potential clients to contact them. The design features a clean layout with clear call-to-action and contact details.',
      tags: ['Promotional Flyer', 'Marketing Material', 'Service Advertisement', 'Contact Design', 'Typography'],
      image: 'Contact Fast Multimedia for yours now.jpg',
      client: 'Fast Multimedia',
      year: '2025',
      duration: '2 days',
      role: 'Graphic Designer',
      deliverables: ['Promotional Flyer', 'Print-Ready Files', 'Digital Version'],
      results: ['Clear service presentation', 'Effective contact information display', 'Professional marketing material'],
      color: '#0047AB',
      mockups: []
    },
    {
      id: 23,
      title: 'St. Martin Hospital Farmers Day Celebration',
      category: 'event',
      description: 'Farmers Day celebration design for St. Martin De Porres Catholic Hospital',
      detailedDescription: 'Created a celebratory Farmers Day design for St. Martin De Porres Catholic Hospital to honor and appreciate farmers in the community. The design features agricultural elements and a heartfelt message.',
      tags: ['Event Design', 'Celebration', 'Hospital Event', 'Community Engagement', 'Agricultural'],
      image: 'get.jpg',
      client: 'St. Martin De Porres Catholic Hospital',
      year: '2025',
      duration: '3 days',
      role: 'Event & Healthcare Designer',
      deliverables: ['Event Graphic', 'Social Media Assets', 'Digital Banner'],
      results: ['Community engagement', 'Farmers appreciation', 'Hospital community relations'],
      color: '#228B22',
      mockups: []
    },
    {
      id: 24,
      title: 'Fast Multimedia Birthday Greeting Design',
      category: 'event',
      description: 'Elegant birthday greeting design with typographic focus',
      detailedDescription: 'Created a sophisticated birthday greeting design featuring elegant typography and celebratory elements. The design focuses on conveying heartfelt birthday wishes with a modern, clean aesthetic.',
      tags: ['Birthday Design', 'Greeting Card', 'Typography', 'Celebration', 'Digital Art'],
      image: 'Happy BirthdayOn your special day, I wish you a year filled with joy, laughter, and unforgettab (1).jpg',
      client: 'Fast Multimedia',
      year: '2025',
      duration: '1 day',
      role: 'Digital Designer',
      deliverables: ['Birthday Greeting', 'Digital Card', 'Social Media Version'],
      results: ['Elegant birthday presentation', 'Modern design aesthetic', 'Versatile usage'],
      color: '#FF6B6B',
      mockups: []
    },
    {
      id: 25,
      title: 'Fast Multimedia Birthday Celebration',
      category: 'event',
      description: 'Celebratory birthday design with grace, favour, and money theme',
      detailedDescription: 'Designed a birthday celebration graphic with thematic elements of grace, favour, and money. The design creates a joyful and prosperous birthday atmosphere with carefully chosen visual elements.',
      tags: ['Birthday Celebration', 'Event Design', 'Thematic Design', 'Digital Art', 'Celebration'],
      image: 'Happy BirthdayOn your special day, I wish you a year filled with joy, laughter, and unforgettab.jpg',
      client: 'Fast Multimedia',
      year: '2025',
      duration: '2 days',
      role: 'Digital Designer',
      deliverables: ['Celebration Graphic', 'Thematic Design', 'Social Media Assets'],
      results: ['Thematic birthday design', 'Positive birthday message', 'Professional celebration graphic'],
      color: '#FF9800',
      mockups: []
    },
    {
      id: 26,
      title: 'Fast Multimedia Corporate Identity',
      category: 'branding',
      description: 'Corporate branding and visual identity system for Fast Multimedia agency',
      detailedDescription: 'Developed the complete corporate identity for Fast Multimedia, including logo design, color palette, typography system, and brand guidelines. The design reflects the agency\'s focus on speed, creativity, and multimedia excellence.',
      tags: ['Corporate Branding', 'Logo Design', 'Visual Identity', 'Brand Guidelines', 'Typography'],
      image: 'fast-multimedia-identity.jpg',
      client: 'Fast Multimedia',
      year: '2025',
      duration: '3 weeks',
      role: 'Lead Brand Designer',
      deliverables: ['Logo System', 'Brand Guidelines', 'Stationery Suite', 'Brand Applications'],
      results: ['Established strong corporate identity', 'Unified brand across all touchpoints', 'Enhanced brand recognition'],
      color: '#0047AB',
      mockups: []
    },
    {
      id: 27,
      title: 'Fast Multimedia Birthday Greeting',
      category: 'event',
      description: 'Festive birthday celebration graphic with interactive elements',
      detailedDescription: 'Created an engaging birthday greeting card with interactive elements for Fast Multimedia\'s celebration. The design features vibrant colors and celebratory typography.',
      tags: ['Greeting Card', 'Event Design', 'Digital Art', 'Celebration', 'Interactive'],
      image: 'fast-multimedia-birthday.jpg',
      client: 'Fast Multimedia',
      year: '2025',
      duration: '2 days',
      role: 'Digital Designer',
      deliverables: ['Digital Greeting Card', 'Social Media Assets', 'Animated Version'],
      results: ['Enhanced company celebrations', 'Increased social media engagement', 'Positive employee feedback'],
      color: '#FF6B6B',
      mockups: []
    },
    {
      id: 28,
      title: 'Soco Wale Restaurant Menu',
      category: 'print',
      description: 'Modern restaurant menu design for Soco Wale food service',
      detailedDescription: 'Designed a comprehensive restaurant menu featuring traditional Ghanaian dishes and beverages. The layout emphasizes readability and appetizing food presentation.',
      tags: ['Menu Design', 'Restaurant', 'Food & Beverage', 'Print Design', 'Typography'],
      image: 'soco-wale-menu.jpg',
      client: 'Soco Wale Restaurant',
      year: '2024',
      duration: '1 week',
      role: 'Print & Menu Designer',
      deliverables: ['Menu Design', 'Print Files', 'Digital Menu', 'Price List'],
      results: ['Clear menu organization', 'Appetizing food presentation', 'Easy ordering process'],
      color: '#228B22',
      mockups: []
    },
    {
      id: 29,
      title: 'Fast Multimedia Event Poster',
      category: 'print',
      description: 'Dynamic event poster for Fast Multimedia promotional activities',
      detailedDescription: 'Created an eye-catching event poster featuring innovative typography and layout design. The poster effectively communicates event details while maintaining brand consistency.',
      tags: ['Event Poster', 'Typography', 'Promotional Material', 'Graphic Design', 'Layout'],
      image: 'fast-multimedia-event.jpg',
      client: 'Fast Multimedia',
      year: '2025',
      duration: '3 days',
      role: 'Graphic Designer',
      deliverables: ['Event Poster', 'Social Media Graphics', 'Digital Ads'],
      results: ['Effective event promotion', 'Consistent branding', 'High visibility'],
      color: '#9C27B0',
      mockups: []
    },
    {
      id: 30,
      title: 'HONE7PIT Events Flyer',
      category: 'event',
      description: 'Vibrant event flyer design for HONE7PIT entertainment company',
      detailedDescription: 'Designed an energetic and colorful flyer for HONE7PIT events, featuring bold typography and dynamic layout to attract target audience.',
      tags: ['Event Flyer', 'Entertainment', 'Promotional Design', 'Typography', 'Layout'],
      image: 'hone7pit-events.jpg',
      client: 'HONE7PIT Events',
      year: '2025',
      duration: '4 days',
      role: 'Event Designer',
      deliverables: ['Event Flyer', 'Social Media Kit', 'Digital Promotion Assets'],
      results: ['Successfully promoted events', 'Increased ticket sales', 'Enhanced brand visibility'],
      color: '#FF4081',
      mockups: []
    },
    {
      id: 31,
      title: 'Fun Trip After Work Experience',
      category: 'event',
      description: 'Travel package promotional design for post-work experience trip',
      detailedDescription: 'Created a comprehensive travel package design featuring itinerary, accommodation details, and activities. The design effectively communicates value proposition and trip highlights.',
      tags: ['Travel Design', 'Promotional Material', 'Event Planning', 'Layout Design', 'Typography'],
      image: 'fun-trip-package.jpg',
      client: 'Richmond P.A',
      year: '2022',
      duration: '1 week',
      role: 'Travel & Event Designer',
      deliverables: ['Travel Package Design', 'Itinerary Layout', 'Promotional Materials'],
      results: ['Clear communication of package details', 'Attractive presentation', 'Increased bookings'],
      color: '#00BCD4',
      mockups: []
    },
    {
      id: 32,
      title: 'VISG PUB New Year\'s Party',
      category: 'event',
      description: 'New Year\'s Eve party promotion design for VISG PUB',
      detailedDescription: 'Designed festive New Year\'s Eve party promotion featuring special offers, attractions, and event details. The design captures celebratory spirit while providing essential information.',
      tags: ['Event Promotion', 'Nightlife', 'Party Design', 'Promotional Print', 'Layout'],
      image: 'visg-pub-newyear.jpg',
      client: 'VISG PUB',
      year: '2023',
      duration: '5 days',
      role: 'Event & Promotion Designer',
      deliverables: ['Event Poster', 'Social Media Graphics', 'Promotional Flyers'],
      results: ['Successful event promotion', 'Increased attendance', 'Positive venue branding'],
      color: '#FFC107',
      mockups: []
    },
    {
      id: 33,
      title: 'Nancy J Closet Business Card',
      category: 'branding',
      description: 'Modern business card design for Nancy J Closet fashion brand',
      detailedDescription: 'Created a clean, professional business card design for Nancy J Closet, featuring essential contact information and brand identity elements.',
      tags: ['Business Card', 'Fashion Branding', 'Print Design', 'Brand Identity', 'Typography'],
      image: 'nancy-j-closet.jpg',
      client: 'Nancy J Closet',
      year: '2025',
      duration: '2 days',
      role: 'Brand & Print Designer',
      deliverables: ['Business Card Design', 'Contact Information Layout', 'Print-Ready Files'],
      results: ['Professional brand representation', 'Clear contact information', 'Modern design aesthetic'],
      color: '#E91E63',
      mockups: []
    },
    {
      id: 34,
      title: 'RhaySam\'s IT Solutions Flyer',
      category: 'print',
      description: 'Comprehensive IT services promotional flyer design',
      detailedDescription: 'Designed an informative flyer showcasing RhaySam\'s IT solutions and services. The layout organizes multiple service offerings in a clear, scannable format.',
      tags: ['Service Flyer', 'IT Solutions', 'Promotional Design', 'Layout', 'Typography'],
      image: 'rhaysam-it-solutions.jpg',
      client: 'RhaySam\'s IT Solutions',
      year: '2025',
      duration: '3 days',
      role: 'Marketing & Print Designer',
      deliverables: ['Service Flyer', 'Digital Version', 'Social Media Graphics'],
      results: ['Clear service communication', 'Professional presentation', 'Effective marketing tool'],
      color: '#3F51B5',
      mockups: []
    },
    {
      id: 35,
      title: 'KTU Hall Week Launch',
      category: 'event',
      description: 'University hall week launch event design for KTU',
      detailedDescription: 'Created promotional materials for KTU Hall Week celebration launch, including event schedule and program outline design.',
      tags: ['University Events', 'Promotional Design', 'Event Planning', 'Layout Design', 'Typography'],
      image: 'ktu-hall-week.jpg',
      client: 'Kumvana Hall KTU',
      year: '2023',
      duration: '1 week',
      role: 'Event & Graphic Designer',
      deliverables: ['Event Posters', 'Program Schedule', 'Social Media Assets'],
      results: ['Successful event promotion', 'Clear program communication', 'Enhanced student engagement'],
      color: '#FF5722',
      mockups: []
    },
    {
      id: 36,
      title: 'Kumvana Hall Week Program',
      category: 'event',
      description: 'Comprehensive hall week program design and schedule',
      detailedDescription: 'Designed detailed hall week program outline featuring various activities and events with clear scheduling and information hierarchy.',
      tags: ['Event Program', 'Schedule Design', 'Layout', 'Typography', 'University Events'],
      image: 'kumvana-program.jpg',
      client: 'Kumvana Hall KTU',
      year: '2023',
      duration: '4 days',
      role: 'Event & Layout Designer',
      deliverables: ['Program Schedule', 'Event Outline', 'Print Materials'],
      results: ['Organized event scheduling', 'Clear activity communication', 'Professional presentation'],
      color: '#4CAF50',
      mockups: []
    },
    {
      id: 37,
      title: 'Birthday Celebration Greeting',
      category: 'event',
      description: 'Personalized birthday greeting card design with joyful elements',
      detailedDescription: 'Created a heartfelt birthday greeting card featuring joyful elements, peace symbols, and celebratory typography for special occasions.',
      tags: ['Greeting Card', 'Personal Design', 'Celebration', 'Digital Art', 'Typography'],
      image: 'birthday-greeting-joy.jpg',
      client: 'Personal Client',
      year: '2025',
      duration: '1 day',
      role: 'Digital Designer',
      deliverables: ['Digital Greeting Card', 'Social Media Version', 'Printable Version'],
      results: ['Personalized celebration', 'Emotional connection', 'Memorable design'],
      color: '#FF9800',
      mockups: []
    },
    {
      id: 38,
      title: 'St. Martin Goes Traditional Event',
      category: 'event',
      description: 'Traditional event promotion design for St. Martin Hospital',
      detailedDescription: 'Designed promotional materials for St. Martin Hospital\'s "Goes Traditional" event, featuring cultural elements and event details.',
      tags: ['Hospital Events', 'Cultural Design', 'Event Promotion', 'Layout', 'Typography'],
      image: 'st-martin-traditional.jpg',
      client: 'St. Martin De Porres Catholic Hospital',
      year: '2025',
      duration: '3 days',
      role: 'Event & Healthcare Designer',
      deliverables: ['Event Poster', 'Promotional Materials', 'Digital Assets'],
      results: ['Cultural event promotion', 'Community engagement', 'Hospital branding'],
      color: '#795548',
      mockups: []
    },
    {
      id: 39,
      title: 'Minimalist Birthday Greeting',
      category: 'event',
      description: 'Clean, minimalist birthday greeting design with essential elements',
      detailedDescription: 'Created a minimalist birthday greeting focusing on essential elements, clean typography, and subtle design elements.',
      tags: ['Minimalist Design', 'Greeting Card', 'Typography', 'Digital Art', 'Celebration'],
      image: 'minimalist-birthday.jpg',
      client: 'Personal Client',
      year: '2025',
      duration: '1 day',
      role: 'Digital Designer',
      deliverables: ['Digital Greeting', 'Social Media Asset', 'Clean Design'],
      results: ['Modern aesthetic', 'Clean presentation', 'Versatile usage'],
      color: '#607D8B',
      mockups: []
    },
    {
      id: 40,
      title: 'Inspirational Birthday Greeting',
      category: 'event',
      description: 'Motivational birthday greeting with inspirational message',
      detailedDescription: 'Designed a birthday greeting featuring inspirational messages and motivational elements for special celebrations.',
      tags: ['Inspirational Design', 'Greeting Card', 'Typography', 'Digital Art', 'Celebration'],
      image: 'inspirational-birthday.jpg',
      client: 'Personal Client',
      year: '2025',
      duration: '2 days',
      role: 'Digital Designer',
      deliverables: ['Digital Greeting', 'Inspirational Design', 'Printable Version'],
      results: ['Motivational impact', 'Personalized message', 'Emotional design'],
      color: '#9C27B0',
      mockups: []
    },
    {
      id: 41,
      title: 'Sewahu Naming Ceremony Invitation',
      category: 'event',
      description: 'Traditional naming ceremony invitation design',
      detailedDescription: 'Created a traditional naming ceremony invitation featuring cultural elements, event details, and family information.',
      tags: ['Ceremony Invitation', 'Traditional Design', 'Event Planning', 'Layout', 'Typography'],
      image: 'sewahu-naming.jpg',
      client: 'The Sewahu Family',
      year: '2025',
      duration: '4 days',
      role: 'Event & Cultural Designer',
      deliverables: ['Ceremony Invitation', 'Event Details', 'Family Information'],
      results: ['Cultural representation', 'Clear event communication', 'Professional invitation'],
      color: '#8D6E63',
      mockups: []
    },
    {
      id: 42,
      title: 'St. Martin Hospital Monthly Outline',
      category: 'print',
      description: 'Monthly activity outline design for hospital events and campaigns',
      detailedDescription: 'Designed a comprehensive monthly outline for St. Martin Hospital featuring theme, events, and campaigns with clear information hierarchy.',
      tags: ['Hospital Communication', 'Monthly Planner', 'Layout Design', 'Typography', 'Healthcare'],
      image: 'st-martin-monthly.jpg',
      client: 'St. Martin De Porres Catholic Hospital',
      year: '2025',
      duration: '1 week',
      role: 'Healthcare Communication Designer',
      deliverables: ['Monthly Outline', 'Event Schedule', 'Campaign Materials'],
      results: ['Organized monthly planning', 'Clear communication', 'Staff engagement'],
      color: '#1976D2',
      mockups: []
    },
    {
      id: 43,
      title: 'Funeral Appreciation Card',
      category: 'print',
      description: 'Appreciation card design for funeral service with spiritual message',
      detailedDescription: 'Created a respectful appreciation card for funeral services featuring spiritual messages, family gratitude, and memorial information.',
      tags: ['Memorial Design', 'Appreciation Card', 'Spiritual Design', 'Typography', 'Layout'],
      image: 'funeral-appreciation.jpg',
      client: 'Family of Juliana',
      year: '2025',
      duration: '3 days',
      role: 'Memorial & Print Designer',
      deliverables: ['Appreciation Card', 'Memorial Design', 'Printable Files'],
      results: ['Respectful design', 'Emotional support', 'Clear communication'],
      color: '#455A64',
      mockups: []
    },
    {
      id: 44,
      title: 'Visual Tribute Memorial Design',
      category: 'print',
      description: 'Visual tribute design celebrating a life well-lived',
      detailedDescription: 'Created a visual tribute design featuring celebration of life elements, spiritual messages, and memorial information.',
      tags: ['Memorial Design', 'Visual Tribute', 'Celebration of Life', 'Layout', 'Typography'],
      image: 'visual-tribute.jpg',
      client: 'Family of Juliana',
      year: '2025',
      duration: '4 days',
      role: 'Memorial & Graphic Designer',
      deliverables: ['Visual Tribute', 'Memorial Design', 'Celebration Elements'],
      results: ['Beautiful memorial', 'Celebration of life', 'Emotional impact'],
      color: '#37474F',
      mockups: []
    },
    {
      id: 45,
      title: 'Fast Multimedia Institute School Flyer',
      category: 'print',
      description: 'Professional marketing flyer for online certificate courses',
      detailedDescription: 'Designed a promotional flyer for Fast Multimedia Institute featuring 3-month online courses in Basic ICT, Graphic Design, and Web Development. The design includes course pricing, installment options, start date (1st May 2026), and enrollment CTA.',
      tags: ['School Flyer', 'Print Design', 'Marketing', 'Course Promotion'],
      image: 'school-flyer.jpg',
      client: 'Fast Multimedia Institute',
      year: '2026',
      duration: '2 days',
      role: 'Print Designer',
      deliverables: ['Marketing Flyer', 'Course Layout', 'Print Files'],
      results: ['Professional marketing material', 'Clear course presentation', 'Enrollment driven'],
      color: '#007AFF',
      mockups: []
    },
    {
      id: 46,
      title: 'Institute Celebration - Anticipate Event',
      category: 'event',
      description: 'Celebration event flyer design for Institute with anticipation theme',
      detailedDescription: 'Designed an engaging celebration flyer for the Institute featuring the theme "Celebration Anticipate". The design creates excitement and anticipation for the upcoming event with vibrant colors and dynamic typography.',
      tags: ['Event Flyer', 'Celebration Design', 'Anticipate Theme', 'Promotional Print', 'Typography'],
      image: 'Artboard 1.jpg',
      client: 'Institute',
      year: '2026',
      duration: '2 days',
      role: 'Event & Print Designer',
      deliverables: ['Event Flyer', 'Digital Promotion', 'Print-Ready Files'],
      results: ['Successful event promotion', 'High attendance rate', 'Positive community response'],
      color: '#FF6F00',
      mockups: []
    },
    {
      id: 47,
      title: 'Clean-Up Exercise with Health Screening',
      category: 'event',
      description: 'Community clean-up exercise and health screening event flyer',
      detailedDescription: 'Created a community-focused flyer promoting a clean-up exercise combined with health screening services. The design emphasizes community health and environmental responsibility with clear event details and call-to-action.',
      tags: ['Community Event', 'Health Screening', 'Clean-Up Exercise', 'Public Service', 'Flyer Design'],
      image: 'Artboard 2.jpg',
      client: 'Community Health Initiative',
      year: '2026',
      duration: '2 days',
      role: 'Public Service Designer',
      deliverables: ['Event Flyer', 'Community Outreach Material', 'Digital Version'],
      results: ['Strong community participation', 'Increased health awareness', 'Successful clean-up event'],
      color: '#2E7D32',
      mockups: []
    },
    {
      id: 48,
      title: 'St. Martin Staff Business Expo',
      category: 'event',
      description: 'Staff business expo exhibition space booking flyer',
      detailedDescription: 'Designed a professional business expo flyer for St. Martin De Porres Catholic Hospital staff. The flyer promotes the 2nd edition of "Martin\'s Staff in Business Expo" with clear exhibition space booking information, registration dates, and contact details.',
      tags: ['Business Expo', 'Staff Event', 'Exhibition Design', 'Corporate Event', 'Flyer'],
      image: 'BOOK SPACE NOW 2.jpg',
      client: 'St. Martin De Porres Catholic Hospital',
      year: '2026',
      duration: '3 days',
      role: 'Corporate Event Designer',
      deliverables: ['Expo Flyer', 'Space Booking Information', 'Promotional Material'],
      results: ['High exhibition space bookings', 'Successful staff engagement', 'Professional event presentation'],
      color: '#C62828',
      mockups: []
    },
    // ===== NEW 7 PROJECTS =====
    {
      id: 49,
      title: 'Eco-Friendly Product Packaging',
      category: 'packaging',
      description: 'Sustainable packaging design for eco-conscious consumer products',
      detailedDescription: 'Created a complete sustainable packaging system for a range of eco-friendly products. The design uses recycled materials, minimal printing, and communicates the brand\'s commitment to environmental responsibility.',
      tags: ['Packaging Design', 'Sustainability', 'Eco-Friendly', 'Print Design', 'Brand Identity'],
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: 'EcoLife Products',
      year: '2025',
      duration: '3 weeks',
      role: 'Lead Packaging Designer',
      deliverables: ['Packaging System', 'Sustainable Materials Guide', 'Production Files', 'Brand Applications'],
      results: ['40% reduction in packaging waste', 'Award-winning design', 'Increased brand recognition'],
      color: '#2E7D32',
      mockups: []
    },
    {
      id: 50,
      title: 'Tech Conference Brand Identity',
      category: 'branding',
      description: 'Complete brand identity system for international tech innovation conference',
      detailedDescription: 'Developed a comprehensive brand identity for a major tech conference, including logo design, visual language, wayfinding system, and digital presence. The design conveys innovation, connection, and future-forward thinking.',
      tags: ['Brand Identity', 'Event Branding', 'Logo Design', 'Conference Design', 'Visual Language'],
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: 'TechForward Conference',
      year: '2025',
      duration: '4 weeks',
      role: 'Lead Brand Designer',
      deliverables: ['Logo System', 'Brand Guidelines', 'Wayfinding System', 'Digital Assets'],
      results: ['5,000+ attendees', 'Featured in design publications', 'Successful brand launch'],
      color: '#1565C0',
      mockups: []
    },
    {
      id: 51,
      title: 'Wellness Mobile App UI/UX',
      category: 'uiux',
      description: 'User-centered mobile app design for wellness and mental health services',
      detailedDescription: 'Designed a comprehensive mobile app focused on wellness and mental health. Features include mood tracking, guided meditations, therapy session booking, and community support. The design prioritizes calm, soothing aesthetics with intuitive navigation.',
      tags: ['UI/UX Design', 'Mobile App', 'Wellness', 'Mental Health', 'User Research'],
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: 'MindfulMe Wellness',
      year: '2025',
      duration: '10 weeks',
      role: 'Lead UI/UX Designer',
      deliverables: ['User Research', 'Wireframes', 'Interactive Prototypes', 'Design System'],
      results: ['4.9 App Store rating', '200k+ downloads', '95% user retention rate'],
      color: '#7B1FA2',
      mockups: []
    },
    {
      id: 52,
      title: 'Restaurant Brand & Menu Design',
      category: 'branding',
      description: 'Complete brand identity and menu design for upscale farm-to-table restaurant',
      detailedDescription: 'Created a full brand identity for a farm-to-table restaurant, including logo, color palette, typography, and menu design. The design reflects the restaurant\'s commitment to fresh, locally-sourced ingredients and rustic elegance.',
      tags: ['Brand Identity', 'Menu Design', 'Restaurant Branding', 'Typography', 'Print Design'],
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: 'The Harvest Table',
      year: '2025',
      duration: '5 weeks',
      role: 'Lead Brand & Menu Designer',
      deliverables: ['Logo & Identity', 'Menu Design', 'Brand Guidelines', 'Collateral Materials'],
      results: ['Increased customer engagement', 'Featured in culinary magazine', 'Successful brand launch'],
      color: '#BF360C',
      mockups: []
    },
    {
      id: 53,
      title: 'Fashion E-Commerce Website Redesign',
      category: 'web',
      description: 'Modern e-commerce website redesign for luxury fashion brand',
      detailedDescription: 'Led the complete redesign of a luxury fashion brand\'s e-commerce website. The project focused on creating an immersive shopping experience with stunning visuals, intuitive navigation, and seamless checkout process.',
      tags: ['Web Design', 'E-Commerce', 'Luxury Brand', 'Shopify Development', 'UX Design'],
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: 'Luxe Fashion House',
      year: '2024',
      duration: '8 weeks',
      role: 'Lead Web Designer',
      deliverables: ['Website Design', 'UX Research', 'Development Handoff', 'Mobile Optimization'],
      results: ['65% increase in conversions', '40% higher mobile sales', 'Brand perception improved'],
      color: '#880E4F',
      mockups: []
    },
    {
      id: 54,
      title: 'Creative Agency Portfolio Website',
      category: 'web',
      description: 'Dynamic portfolio website design for award-winning creative agency',
      detailedDescription: 'Designed a visually stunning portfolio website for a creative agency that showcases their work and attracts high-value clients. The design uses bold typography, immersive visuals, and interactive elements.',
      tags: ['Web Design', 'Agency Portfolio', 'Interactive Design', 'Typography', 'Visual Design'],
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: 'Creative Studio',
      year: '2024',
      duration: '6 weeks',
      role: 'Senior Web Designer',
      deliverables: ['Website Design', 'Interactive Prototypes', 'Style Guide', 'Design System'],
      results: ['300% increase in inquiries', 'Featured on design blogs', 'New high-value clients'],
      color: '#D32F2F',
      mockups: []
    },
    {
      id: 55,
      title: 'Craft Beer Label Collection',
      category: 'packaging',
      description: 'Bold, artistic label designs for craft beer brand\'s seasonal collection',
      detailedDescription: 'Created a collection of artistic label designs for a craft brewery\'s seasonal beer releases. Each label tells a unique story while maintaining brand consistency through color palette and illustration style.',
      tags: ['Label Design', 'Craft Beer', 'Illustration', 'Packaging', 'Brand Identity'],
      image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      client: 'Craft Brew Co.',
      year: '2024',
      duration: '4 weeks',
      role: 'Lead Packaging Designer',
      deliverables: ['Label Designs', 'Illustrations', 'Brand Applications', 'Production Files'],
      results: ['Featured in craft beer magazine', 'Increased sales by 45%', 'Award-winning design'],
      color: '#E65100',
      mockups: []
    }
  ];

  // Categories with updated counts (55 projects total)
  const categories = [
    { id: 'all', name: 'All Projects', icon: 'fas fa-th', count: allProjects.length },
    { id: 'web', name: 'Web Design', icon: 'fas fa-desktop', count: allProjects.filter(p => p.category === 'web').length },
    { id: 'uiux', name: 'UI/UX Design', icon: 'fas fa-mobile-alt', count: allProjects.filter(p => p.category === 'uiux').length },
    { id: 'branding', name: 'Brand Identity', icon: 'fas fa-palette', count: allProjects.filter(p => p.category === 'branding').length },
    { id: 'packaging', name: 'Packaging', icon: 'fas fa-box-open', count: allProjects.filter(p => p.category === 'packaging').length },
    { id: 'print', name: 'Print Design', icon: 'fas fa-print', count: allProjects.filter(p => p.category === 'print').length },
    { id: 'event', name: 'Event Design', icon: 'fas fa-calendar-alt', count: allProjects.filter(p => p.category === 'event').length }
  ];

  // Scroll animation effect
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
          element.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  // Filter projects based on selected category
  useEffect(() => {
    if (filter === 'all') {
      setProjects(allProjects);
    } else {
      setProjects(allProjects.filter(project => project.category === filter));
    }
  }, [filter]);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setShowProjectModal(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const handleStartProject = () => {
    navigate('/contact');
  };

  // Helper function to find category icon
  const getCategoryIcon = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.icon || 'fas fa-folder';
  };

  // Helper function to find category name
  const getCategoryName = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.name || 'Project';
  };

  return (
    <div className="portfolio-page">
      {/* Hero Section - Duck Design Color Scheme */}
      <section className="portfolio-hero section">
        <div className="container">
          <div className="hero-content animate-on-scroll">
            <div className="hero-badge">
              <span className="badge-text">Featured Work</span>
            </div>
            <h1 className="hero-title">
              Design Portfolio That <span className="highlight">Inspires</span> & 
              <span className="highlight"> Delivers</span> Results
            </h1>
            <p className="hero-subtitle">
              Discover our award-winning design projects that blend creativity with strategy 
              to deliver measurable business results for clients across industries.
            </p>
            
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={handleStartProject}>
                <i className="fas fa-paper-plane"></i> Start Your Project
              </button>
              <a href="#featured" className="btn btn-outline">
                <i className="fas fa-arrow-down"></i> View Featured Work
              </a>
            </div>
            
            
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section id="featured" className="featured-project section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">
              <i className="fas fa-crown"></i> Featured Case Study
            </h2>
            <p className="section-subtitle">
              An in-depth look at one of our most successful projects
            </p>
          </div>
          
          <div className="featured-content animate-on-scroll">
            <div className="featured-preview">
              <div className="preview-image">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                  alt="Golden Nest Hotel Website" 
                />
                <div className="preview-badge">
                  <i className="fas fa-award"></i>
                  <span>Featured Project</span>
                </div>
              </div>
            </div>
            
            <div className="featured-info">
              <div className="project-category-badge">
                <i className="fas fa-desktop"></i>
                <span>Web Design & Development</span>
              </div>
              
              <h3 className="featured-title">Golden Nest Hotel Website</h3>
              
              <p className="featured-description">
                Complete website redesign and development for a luxury hotel brand, 
                featuring integrated booking system, room gallery, and customer reviews.
              </p>
              
              <div className="project-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div className="highlight-content">
                    <div className="highlight-title">40% Increase</div>
                    <div className="highlight-subtitle">Online Bookings</div>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="highlight-content">
                    <div className="highlight-title">25% Higher</div>
                    <div className="highlight-subtitle">User Engagement</div>
                  </div>
                </div>
                
                <div className="highlight-item">
                  <div className="highlight-icon">
                    <i className="fas fa-star"></i>
                  </div>
                  <div className="highlight-content">
                    <div className="highlight-title">5-Star</div>
                    <div className="highlight-subtitle">Client Rating</div>
                  </div>
                </div>
              </div>
              
              <div className="featured-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => openProjectModal(allProjects[0])}
                >
                  <i className="fas fa-expand"></i> View Full Case Study
                </button>
                <a 
                  href="https://www.goldennesthotelgh.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <i className="fas fa-external-link-alt"></i> Visit Live Site
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Filter & Controls */}
      <section className="portfolio-controls section">
        <div className="container">
          <div className="controls-wrapper">
            <div className="section-header animate-on-scroll">
              <h2 className="section-title">Our Portfolio</h2>
              <p className="section-subtitle">
                Browse our diverse collection of design projects across various categories
              </p>
            </div>
            
            <div className="controls-row animate-on-scroll">
              <div className="view-controls">
                <button 
                  className={`view-btn ${activeView === 'grid' ? 'active' : ''}`}
                  onClick={() => setActiveView('grid')}
                >
                  <i className="fas fa-th"></i> Grid View
                </button>
                <button 
                  className={`view-btn ${activeView === 'masonry' ? 'active' : ''}`}
                  onClick={() => setActiveView('masonry')}
                >
                  <i className="fas fa-th-large"></i> Masonry View
                </button>
              </div>
              
              <div className="filter-controls">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-filter ${filter === category.id ? 'active' : ''}`}
                    onClick={() => setFilter(category.id)}
                  >
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="portfolio-grid-section section">
        <div className="container">
          <div className={`projects-container ${activeView === 'masonry' ? 'masonry-layout' : 'grid-layout'}`}>
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`project-item animate-on-scroll ${project.category}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openProjectModal(project)}
              >
                <div className="project-card">
                  <div className="project-media">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                    />
                    <div className="project-overlay">
                      <div className="overlay-content">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        <div className="project-meta">
                          <div className="meta-item">
                            <i className="fas fa-user"></i>
                            <span>{project.client}</span>
                          </div>
                          <div className="meta-item">
                            <i className="fas fa-calendar"></i>
                            <span>{project.year}</span>
                          </div>
                        </div>
                      </div>
                      <div className="project-action">
                        <button className="btn-view-project">
                          <i className="fas fa-expand"></i> View Case Study
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="project-info">
                    <div className="project-header">
                      <div className="category-badge">
                        <i className={getCategoryIcon(project.category)}></i>
                        <span>{getCategoryName(project.category)}</span>
                      </div>
                      <div className="project-year">{project.year}</div>
                    </div>
                    
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-excerpt">{project.description}</p>
                    
                    <div className="project-tags">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="project-tag">{tag}</span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="project-tag-more">+{project.tags.length - 3}</span>
                      )}
                    </div>
                    
                    <div className="project-results">
                      <div className="result-item">
                        <i className="fas fa-rocket"></i>
                        <span>Results Delivered</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {projects.length === 0 && (
            <div className="no-projects animate-on-scroll">
              <div className="no-projects-content">
                <i className="fas fa-search"></i>
                <h3>No projects found</h3>
                <p>Try selecting a different category to view related projects</p>
                <button 
                  className="btn btn-outline" 
                  onClick={() => setFilter('all')}
                >
                  <i className="fas fa-redo"></i> Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="portfolio-testimonials section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Client Success Stories</h2>
            <p className="section-subtitle">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>
          
          <div className="testimonials-slider animate-on-scroll">
            <div className="testimonial-track">
              <div className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="client-info">
                    <div className="client-avatar">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                        alt="Alex Johnson"
                      />
                    </div>
                    <div className="client-details">
                      <h4 className="client-name">Alex Johnson</h4>
                      <p className="client-role">CEO, Golden Nest Hotel</p>
                      <div className="client-rating">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="testimonial-text">
                    <i className="fas fa-quote-left"></i>
                    <p>
                      "Working with Fast Multimedia was transformative for our business. 
                      Their redesign of our hotel website not only looks stunning but has 
                      increased our online bookings by 40%. Their attention to detail and 
                      understanding of our luxury brand was exceptional."
                    </p>
                    <div className="project-link">
                      <i className="fas fa-link"></i>
                      <a href="https://www.goldennesthotelgh.com" target="_blank" rel="noopener noreferrer">
                        View Golden Nest Hotel Project
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="client-info">
                    <div className="client-avatar">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                        alt="Maria Garcia"
                      />
                    </div>
                    <div className="client-details">
                      <h4 className="client-name">Maria Garcia</h4>
                      <p className="client-role">Product Manager, FinTech Co</p>
                      <div className="client-rating">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fas fa-star"></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="testimonial-text">
                    <i className="fas fa-quote-left"></i>
                    <p>
                      "The mobile banking app design delivered by Fast Multimedia exceeded 
                      all our expectations. User retention increased by 45% and we received 
                      overwhelmingly positive feedback from our customers. Their UX research 
                      was thorough and their designs were both beautiful and functional."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="portfolio-cta section">
        <div className="container">
          <div className="cta-content animate-on-scroll">
            <div className="cta-text">
              <div className="cta-badge">
                <i className="fas fa-rocket"></i>
                <span>Ready to Start?</span>
              </div>
              <h2 className="cta-title">
                Let's Create Something <span className="highlight">Amazing</span> Together
              </h2>
              <p className="cta-description">
                Share your project vision with us and let's transform it into a stunning 
                reality that delivers real business results.
              </p>
            </div>
            <div className="cta-actions">
              <button className="btn btn-primary" onClick={handleStartProject}>
                <i className="fas fa-paper-plane"></i> Start Your Project
              </button>
              <a href="mailto:fasttech227@gmail.com" className="btn btn-outline">
                <i className="fas fa-envelope"></i> Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {showProjectModal && selectedProject && (
        <div className="project-modal">
          <div className="modal-overlay" onClick={closeProjectModal}></div>
          <div className="modal-content">
            <button className="modal-close" onClick={closeProjectModal}>
              <i className="fas fa-times"></i>
            </button>
            
            <div className="modal-header">
              <div className="modal-category">
                <i className={getCategoryIcon(selectedProject.category)}></i>
                <span>{getCategoryName(selectedProject.category)}</span>
              </div>
              <h2 className="modal-title">{selectedProject.title}</h2>
              <div className="modal-subtitle">{selectedProject.client} • {selectedProject.year}</div>
            </div>
            
            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              
              <div className="modal-info">
                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-label">
                      <i className="fas fa-user-tie"></i>
                      <span>Client</span>
                    </div>
                    <div className="info-value">{selectedProject.client}</div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-label">
                      <i className="fas fa-calendar-alt"></i>
                      <span>Year</span>
                    </div>
                    <div className="info-value">{selectedProject.year}</div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-label">
                      <i className="fas fa-clock"></i>
                      <span>Duration</span>
                    </div>
                    <div className="info-value">{selectedProject.duration}</div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-label">
                      <i className="fas fa-briefcase"></i>
                      <span>Role</span>
                    </div>
                    <div className="info-value">{selectedProject.role}</div>
                  </div>
                </div>
                
                <div className="project-description-full">
                  <h4>Project Overview</h4>
                  <p>{selectedProject.detailedDescription}</p>
                </div>
                
                <div className="project-deliverables">
                  <h4>Deliverables</h4>
                  <div className="deliverables-list">
                    {selectedProject.deliverables.map((item, index) => (
                      <div key={index} className="deliverable-item">
                        <i className="fas fa-check-circle"></i>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="project-results">
                  <h4>Results Achieved</h4>
                  <div className="results-list">
                    {selectedProject.results.map((result, index) => (
                      <div key={index} className="result-item">
                        <i className="fas fa-chart-line"></i>
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="project-tags-full">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleStartProject}>
                <i className="fas fa-paper-plane"></i> Start Similar Project
              </button>
              {selectedProject.link && (
                <a 
                  href={selectedProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <i className="fas fa-external-link-alt"></i> View Live Project
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;