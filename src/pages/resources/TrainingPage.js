import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TrainingPage.css';

const TrainingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const trainingPrograms = [
    {
      id: 1,
      title: 'Graphic Design Masterclass',
      level: 'Beginner to Advanced',
      duration: '8 Weeks',
      price: '₵899',
      originalPrice: '₵1,299',
      description: 'Complete graphic design course covering Adobe Creative Suite, design principles, and real-world projects.',
      features: [
        'Adobe Photoshop & Illustrator',
        'Brand Identity Design',
        'Print & Digital Design',
        'Portfolio Development',
        'Certificate of Completion',
        '1-on-1 Mentorship'
      ],
      popular: true
    },
    {
      id: 2,
      title: 'UI/UX Design Bootcamp',
      level: 'Intermediate',
      duration: '6 Weeks',
      price: '₵749',
      originalPrice: '₵999',
      description: 'Intensive UI/UX design course focusing on user-centered design and prototyping.',
      features: [
        'Figma & Adobe XD',
        'User Research Methods',
        'Wireframing & Prototyping',
        'Design Systems',
        'Portfolio Review',
        'Job Preparation'
      ],
      popular: false
    },
    {
      id: 3,
      title: 'Web Development Fundamentals',
      level: 'Beginner',
      duration: '10 Weeks',
      price: '₵1,099',
      originalPrice: '₵1,499',
      description: 'Complete web development course covering HTML, CSS, JavaScript, and React.',
      features: [
        'HTML5 & CSS3',
        'JavaScript ES6+',
        'React.js Fundamentals',
        'Responsive Design',
        'Git & GitHub',
        'Deployment'
      ],
      popular: false
    },
    {
      id: 4,
      title: 'Digital Marketing Certification',
      level: 'All Levels',
      duration: '4 Weeks',
      price: '₵599',
      originalPrice: '₵799',
      description: 'Comprehensive digital marketing training for businesses and professionals.',
      features: [
        'Social Media Marketing',
        'SEO & Content Marketing',
        'Google Analytics',
        'Email Marketing',
        'Advertising Campaigns',
        'Strategy Development'
      ],
      popular: true
    },
    {
      id: 5,
      title: 'Video Editing & Motion Graphics',
      level: 'Beginner to Intermediate',
      duration: '6 Weeks',
      price: '₵799',
      originalPrice: '₵1,099',
      description: 'Professional video editing and motion graphics using Adobe Premiere Pro and After Effects.',
      features: [
        'Premiere Pro Basics',
        'After Effects Animation',
        'Color Grading',
        'Audio Editing',
        'Motion Graphics',
        'Video Portfolio'
      ],
      popular: false
    },
    {
      id: 6,
      title: 'Business & Entrepreneurship',
      level: 'All Levels',
      duration: '5 Weeks',
      price: '₵499',
      originalPrice: '₵699',
      description: 'Essential business skills for entrepreneurs and freelancers.',
      features: [
        'Business Planning',
        'Client Acquisition',
        'Pricing Strategies',
        'Contract Writing',
        'Financial Management',
        'Growth Strategies'
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Kwame Mensah',
      role: 'Freelance Designer',
      testimonial: 'The Graphic Design Masterclass transformed my career. I went from beginner to professional in 8 weeks!',
      avatar: '👨‍💼'
    },
    {
      id: 2,
      name: 'Ama Boateng',
      role: 'Marketing Manager',
      testimonial: 'The Digital Marketing Certification provided practical skills I use daily. Highly recommended!',
      avatar: '👩‍💼'
    },
    {
      id: 3,
      name: 'David Osei',
      role: 'Web Developer',
      testimonial: 'Excellent instructors and hands-on projects. Landed my first web development job after completing.',
      avatar: '👨‍💻'
    }
  ];

  return (
    <div className="training-page">
      {/* Hero Section */}
      <section className="training-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>Professional Training</span>
            </div>
            <h1 className="hero-title">Transform Your Skills with Expert-Led Training</h1>
            <p className="hero-subtitle">
              Hands-on training programs designed to take you from beginner to professional. 
              Learn in-demand skills from industry experts.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <h3>500+</h3>
                <p>Students Trained</p>
              </div>
              <div className="stat">
                <h3>98%</h3>
                <p>Satisfaction Rate</p>
              </div>
              <div className="stat">
                <h3>12+</h3>
                <p>Expert Instructors</p>
              </div>
              <div className="stat">
                <h3>24/7</h3>
                <p>Learning Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="programs-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Training Programs</h2>
            <p className="section-subtitle">
              Choose from our carefully designed programs to advance your career
            </p>
          </div>

          <div className="programs-grid">
            {trainingPrograms.map((program) => (
              <div 
                key={program.id} 
                className={`program-card ${program.popular ? 'popular' : ''}`}
              >
                {program.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}
                
                <div className="program-header">
                  <span className="program-level">{program.level}</span>
                  <h3 className="program-title">{program.title}</h3>
                  <p className="program-description">{program.description}</p>
                </div>

                <div className="program-details">
                  <div className="duration">
                    <i className="fas fa-clock"></i>
                    <span>{program.duration}</span>
                  </div>
                  <div className="price">
                    <span className="current-price">{program.price}</span>
                    <span className="original-price">{program.originalPrice}</span>
                  </div>
                </div>

                <ul className="program-features">
                  {program.features.map((feature, idx) => (
                    <li key={idx}>
                      <i className="fas fa-check"></i>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="program-actions">
                  <Link to="/contact" className="btn btn-primary">
                    Enroll Now
                  </Link>
                  <Link to="/contact" className="btn btn-outline">
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Training */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Our Training</h2>
            <p className="section-subtitle">
              We provide more than just courses - we build careers
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h3>Expert Instructors</h3>
              <p>Learn from industry professionals with years of real-world experience.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-laptop-code"></i>
              </div>
              <h3>Hands-on Projects</h3>
              <p>Build real projects that you can add to your portfolio and showcase.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <h3>Certification</h3>
              <p>Receive recognized certificates to boost your career prospects.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Community Support</h3>
              <p>Join a community of learners and get support throughout your journey.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3>Career Guidance</h3>
              <p>Get career advice, portfolio reviews, and job search assistance.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3>Flexible Schedule</h3>
              <p>Learn at your own pace with flexible class schedules.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Student Success Stories</h2>
            <p className="section-subtitle">
              Hear from our graduates who transformed their careers
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <p className="testimonial-text">"{testimonial.testimonial}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.avatar}
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Get answers to common questions about our training programs
            </p>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h3>Do I need prior experience to join?</h3>
              <p>No! Our programs are designed for all skill levels, from complete beginners to experienced professionals.</p>
            </div>

            <div className="faq-item">
              <h3>What equipment do I need?</h3>
              <p>You'll need a computer with internet access. Specific software requirements will be provided before each course.</p>
            </div>

            <div className="faq-item">
              <h3>Are certificates provided?</h3>
              <p>Yes, all graduates receive a certificate of completion that's recognized by industry employers.</p>
            </div>

            <div className="faq-item">
              <h3>Can I get a refund?</h3>
              <p>We offer a 7-day money-back guarantee if you're not satisfied with the course content.</p>
            </div>

            <div className="faq-item">
              <h3>Do you offer payment plans?</h3>
              <p>Yes, we offer flexible payment plans for most programs. Contact us for details.</p>
            </div>

            <div className="faq-item">
              <h3>How long do I have access to materials?</h3>
              <p>You get lifetime access to course materials, including future updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="training-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Learning Journey?</h2>
            <p>
              Join hundreds of successful professionals who transformed their careers 
              with our expert-led training programs.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                <i className="fas fa-calendar-check"></i> Book Consultation
              </Link>
              <Link to="/contact" className="btn btn-outline">
                <i className="fas fa-question-circle"></i> Ask Questions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainingPage;