import React, { useState, useEffect } from 'react'; // Add useState
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { supabase } from './supabase'; // Import supabase
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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

// Other Pages
import TestSupabase from './pages/TestSupabase';
import AdminView from './pages/AdminView';
import BlogAdmin from './pages/BlogAdmin';
import DatabaseViewer from './pages/DatabaseViewer';

import './App.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Authentication check - supports both Supabase and localStorage
const isAuthenticated = async () => {
  // Check localStorage first (for backward compatibility)
  const localStorageAuth = localStorage.getItem('admin_logged_in') === 'true';
  const sessionTime = parseInt(localStorage.getItem('admin_session') || '0');
  const currentTime = Date.now();
  
  if (localStorageAuth && (currentTime - sessionTime) > 24 * 60 * 60 * 1000) {
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_username');
    localStorage.removeItem('admin_session');
    return false;
  }
  
  if (localStorageAuth) return true;
  
  // Check Supabase auth
  try {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();
      setAuth(isAuth);
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!auth) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

// Route for testing (no authentication required)
const TestRoute = () => {
  return <TestSupabase />;
};

// Database viewer route (protected)
const DatabaseViewerRoute = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();
      setAuth(isAuth);
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!auth) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <DatabaseViewer />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ScrollToTop />
        <main>
          <Routes>
            {/* ===== MAIN PAGES ===== */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:projectId" element={<PortfolioCaseStudy />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/download-guide" element={<DownloadGuide />} />
            
            {/* ===== BLOG PAGES ===== */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<ArticlePage />} />
            
            {/* ===== AUTH PAGES ===== */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* ===== ADMIN PAGES (PROTECTED) ===== */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/blog" 
              element={
                <ProtectedRoute>
                  <BlogAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/database" 
              element={
                <DatabaseViewerRoute />
              } 
            />
            
            {/* ===== RESOURCE PAGES ===== */}
            <Route path="/resources" element={<ResourcesPage />} />
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
            
            {/* ===== UTILITY & TESTING PAGES ===== */}
            <Route path="/test" element={<TestRoute />} />
            <Route path="/admin-view" element={<AdminView />} />
            
            {/* ===== 404 PAGE ===== */}
            <Route path="*" element={
              <div className="not-found-page">
                <div className="container">
                  <h1>404 - Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                  <a href="/" className="back-home-btn">Back to Home</a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;