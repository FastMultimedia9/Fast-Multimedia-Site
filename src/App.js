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

// School Pages
import SchoolPage from './pages/SchoolPage';
import Admissions from './pages/Admissions';
import ApplicationForm from './pages/ApplicationForm';

// Student Portal Pages
import StudentPortal from './pages/StudentPortal';
import StudentLogin from './pages/StudentLogin';

// Service Detail Page Component
import ServiceDetailPage from './components/ServiceDetailPage';

// Import Service Data from separate file
import serviceData from './data/serviceData';

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
    localStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to="/student/login" replace state={{ from: location }} />;
  }

  // If admin access is required but user is not admin
  if (adminOnly && authState.userRole !== 'admin') {
    console.log('🚫 Redirecting to blog - User not admin');
    return <Navigate to="/blog" replace />;
  }

  // If user is authenticated but trying to access login page
  if (!requireAuth && authState.isAuthenticated && location.pathname === '/student/login') {
    console.log('📍 User already logged in, redirecting to student portal');
    return <Navigate to="/student/portal" replace />;
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
          
          {/* ===== SCHOOL PAGES ===== */}
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
          <Route path="/school/contact" element={<SchoolPage />} />
          
          {/* ===== ADMISSIONS & APPLICATION FORM PAGES ===== */}
          <Route path="/school/admissions" element={<Admissions />} />
          <Route path="/school/application-form" element={<ApplicationForm />} />
          
          {/* ===== STUDENT PORTAL PAGES ===== */}
          <Route path="/student/login" element={<StudentLogin />} />
          <Route 
            path="/student/portal" 
            element={
              <ProtectedRoute>
                <StudentPortal />
              </ProtectedRoute>
            } 
          />
          
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
                    <li><a href="/school/admissions">View Admissions</a></li>
                    <li><a href="/student/login">Student Login</a></li>
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