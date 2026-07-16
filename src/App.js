import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { authAPI } from './supabase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MetaCacheFix from './components/MetaCacheFix';
import BlogSkeleton from './components/BlogSkeleton';

// Main Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminPanel from './pages/AdminPanel';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// User Pages
import UserDashboard from './pages/UserDashboard';

// Resource Pages
import ResourcesPage from './pages/ResourcesPage';
import TrainingPage from './pages/resources/TrainingPage';
import TutorialsPage from './pages/resources/TutorialsPage';
import TemplatesPage from './pages/resources/TemplatesPage';
import ToolsPage from './pages/resources/ToolsPage';
import EbooksPage from './pages/resources/EbooksPage';
import AffiliatesPage from './pages/resources/AffiliatesPage';

// Legal Pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

// Portfolio Pages
import PortfolioCaseStudy from './pages/portfolio/PortfolioCaseStudy';

// Utility Pages
import DownloadGuide from './pages/DownloadGuide';

// Test & Debug Pages
import TestSupabase from './pages/TestSupabase';
import AdminView from './pages/AdminView';
import BlogAdmin from './pages/BlogAdmin';
import DatabaseViewer from './pages/DatabaseViewer';

// New Post Page
import NewPostPage from './pages/NewPostPage';

// School Page
import SchoolPage from './pages/SchoolPage';

// Service Detail Page Component
import ServiceDetailPage from './components/ServiceDetailPage';

// Icons for Services
import { FaPalette, FaMobileAlt, FaPrint, FaShareAlt, FaCode, FaFilm, FaTools, FaWindows, FaDownload, FaLaptop, FaNetworkWired, FaServer, FaShoppingCart, FaRocket } from 'react-icons/fa';

import './App.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Simple Protected Route without Auth Context
const ProtectedRoute = ({ children, adminOnly = false, requireAuth = true }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: 'user',
    loading: true
  });
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authAPI.getCurrentUserWithProfile();
        
        if (user) {
          const role = user.profile?.role || 'user';
          setAuthState({
            isAuthenticated: true,
            userRole: role,
            loading: false
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            userRole: 'user',
            loading: false
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthState({
          isAuthenticated: false,
          userRole: 'user',
          loading: false
        });
      }
    };
    
    checkAuth();
  }, [location]);

  if (authState.loading) {
    return (
      <div className="auth-loading">
        <div className="spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !authState.isAuthenticated) {
    console.log('🔒 Redirecting to login - User not authenticated');
    // Save the attempted location
    localStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If admin access is required but user is not admin
  if (adminOnly && authState.userRole !== 'admin') {
    console.log('🚫 Redirecting to blog - User not admin');
    return <Navigate to="/blog" replace />;
  }

  // If user is authenticated but trying to access login page
  if (!requireAuth && authState.isAuthenticated && location.pathname === '/login') {
    console.log('📍 User already logged in, redirecting to blog');
    return <Navigate to="/blog" replace />;
  }

  return children;
};

// Test Route Component (no protection)
const TestRoute = ({ children }) => {
  return children;
};

// Lazy load heavy components for better performance
const LazyBlogPage = lazy(() => import('./pages/BlogPage'));
const LazyArticlePage = lazy(() => import('./pages/ArticlePage'));
const LazyAdminPanel = lazy(() => import('./pages/AdminPanel'));
const LazyUserDashboard = lazy(() => import('./pages/UserDashboard'));
const LazyPortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const LazyResourcesPage = lazy(() => import('./pages/ResourcesPage'));

// Loading component for lazy routes
const RouteLoading = () => (
  <div className="route-loading">
    <BlogSkeleton />
  </div>
);

// --- Service Data Definition ---
const serviceData = {
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

// Main App Component
function AppContent() {
  return (
    <div className="App">
      <MetaCacheFix />
      <Navbar />
      <ScrollToTop />
      <main>
        <Routes>
          {/* ===== MAIN PAGES ===== */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={
            <Suspense fallback={<RouteLoading />}>
              <LazyPortfolioPage />
            </Suspense>
          } />
          <Route path="/portfolio/:projectId" element={<PortfolioCaseStudy />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/download-guide" element={<DownloadGuide />} />
          
          {/* ===== SCHOOL PAGE ===== */}
          <Route path="/school" element={<SchoolPage />} />
          <Route path="/school/overview" element={<SchoolPage />} />
          <Route path="/school/mission" element={<SchoolPage />} />
          <Route path="/school/history" element={<SchoolPage />} />
          <Route path="/school/accreditation" element={<SchoolPage />} />
          <Route path="/school/courses" element={<SchoolPage />} />
          <Route path="/school/curriculum" element={<SchoolPage />} />
          <Route path="/school/calendar" element={<SchoolPage />} />
          <Route path="/school/exams" element={<SchoolPage />} />
          <Route path="/school/apply" element={<SchoolPage />} />
          <Route path="/school/requirements" element={<SchoolPage />} />
          <Route path="/school/scholarships" element={<SchoolPage />} />
          <Route path="/school/tuition" element={<SchoolPage />} />
          <Route path="/school/facilities" element={<SchoolPage />} />
          <Route path="/school/student-life" element={<SchoolPage />} />
          <Route path="/school/events" element={<SchoolPage />} />
          <Route path="/school/gallery" element={<SchoolPage />} />
          
          {/* ===== BLOG PAGES (With Lazy Loading) ===== */}
          <Route path="/blog" element={
            <Suspense fallback={<BlogSkeleton />}>
              <LazyBlogPage />
            </Suspense>
          } />
          <Route path="/blog/:id" element={
            <Suspense fallback={
              <div className="article-loading">
                <div className="spinner"></div>
                <p>Loading article...</p>
              </div>
            }>
              <LazyArticlePage />
            </Suspense>
          } />
          
          {/* ===== AUTH PAGES (No Auth Required) ===== */}
          <Route 
            path="/login" 
            element={<LoginPage />}
          />
          <Route 
            path="/admin/login" 
            element={<LoginPage />}
          />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* ===== USER DASHBOARD (For Regular Users - Auth Required) ===== */}
          <Route 
            path="/user/dashboard" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<RouteLoading />}>
                  <LazyUserDashboard />
                </Suspense>
              </ProtectedRoute>
            } 
          />
          
          {/* ===== USER NEW POST PAGE (Auth Required) ===== */}
          <Route 
            path="/user/new-post" 
            element={
              <ProtectedRoute>
                <NewPostPage />
              </ProtectedRoute>
            } 
          />
          
          {/* ===== ADMIN PAGES (ADMIN ONLY) ===== */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <Suspense fallback={<RouteLoading />}>
                  <LazyAdminPanel />
                </Suspense>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute adminOnly={true}>
                <Suspense fallback={<RouteLoading />}>
                  <LazyAdminPanel />
                </Suspense>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/blog" 
            element={
              <ProtectedRoute adminOnly={true}>
                <BlogAdmin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/database" 
            element={
              <ProtectedRoute adminOnly={true}>
                <DatabaseViewer />
              </ProtectedRoute>
            } 
          />
          
          {/* ===== NEW POST PAGE (ADMIN ONLY) ===== */}
          <Route 
            path="/admin/posts/new" 
            element={
              <ProtectedRoute adminOnly={true}>
                <NewPostPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/posts/edit/:id" 
            element={
              <ProtectedRoute adminOnly={true}>
                <NewPostPage />
              </ProtectedRoute>
            } 
          />
          
          {/* ===== TEST & DEBUG PAGES (Public) ===== */}
          <Route 
            path="/test" 
            element={
              <TestRoute>
                <TestSupabase />
              </TestRoute>
            } 
          />
          <Route 
            path="/admin-view" 
            element={
              <TestRoute>
                <AdminView />
              </TestRoute>
            } 
          />
          
          {/* ===== RESOURCE PAGES ===== */}
          <Route path="/resources" element={
            <Suspense fallback={<RouteLoading />}>
              <LazyResourcesPage />
            </Suspense>
          } />
          <Route path="/resources/training" element={<TrainingPage />} />
          <Route path="/resources/tutorials" element={<TutorialsPage />} />
          <Route path="/resources/templates" element={<TemplatesPage />} />
          <Route path="/resources/tools" element={<ToolsPage />} />
          <Route path="/resources/ebooks" element={<EbooksPage />} />
          <Route path="/resources/affiliates" element={<AffiliatesPage />} />
          
          {/* ===== LEGAL PAGES ===== */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />

          {/* ===== SERVICE DETAIL PAGES (DYNAMIC ROUTES) ===== */}
          {Object.entries(serviceData).map(([path, service]) => (
            <Route
              key={path}
              path={`/services/${path}`}
              element={<ServiceDetailPage service={service} />}
            />
          ))}
          
          {/* ===== 404 PAGE ===== */}
          <Route path="*" element={
            <div className="not-found-page">
              <div className="container">
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <div className="suggestions">
                  <p>You might want to:</p>
                  <ul>
                    <li><a href="/">Go to Homepage</a></li>
                    <li><a href="/blog">Browse the Blog</a></li>
                    <li><a href="/school">Visit School Page</a></li>
                    <li><a href="/test">Test Database Connection</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/admin/login">Admin Login</a></li>
                    <li><a href="/admin/posts/new">Create New Post</a></li>
                  </ul>
                </div>
                <a href="/" className="back-home-btn">Back to Home</a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// Main App Wrapper
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;