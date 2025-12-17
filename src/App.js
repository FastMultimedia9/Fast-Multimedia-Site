import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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

// NEW PAGES - Add these imports
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

// Authentication check
const isAuthenticated = () => {
  return localStorage.getItem('admin_logged_in') === 'true';
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

// NEW: Route for testing (no authentication required)
const TestRoute = () => {
  return <TestSupabase />;
};

// NEW: Database viewer route (protected)
const DatabaseViewerRoute = () => {
  if (!isAuthenticated()) {
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
            
            {/* ===== ADMIN PAGES ===== */}
            <Route path="/admin/login" element={<LoginPage />} />
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