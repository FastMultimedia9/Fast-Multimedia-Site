// CookieConsent.js
import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    functional: true,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const parsed = JSON.parse(consent);
      setPreferences(parsed);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true
    };
    savePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    const allRejected = {
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false
    };
    savePreferences(allRejected);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const savePreferences = (pref) => {
    localStorage.setItem('cookie_consent', JSON.stringify(pref));
    setPreferences(pref);
    setShowBanner(false);
    
    // Update Google Analytics based on consent
    if (typeof gtag !== 'undefined') {
      if (pref.analytics) {
        gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
      } else {
        gtag('consent', 'update', {
          'analytics_storage': 'denied'
        });
      }
    }
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-banner">
      <div className="cookie-consent-content">
        <div className="cookie-text">
          <h3>
            <i className="fas fa-cookie-bite"></i> 
            We Value Your Privacy
          </h3>
          <p>
            We use cookies to enhance your experience, analyze site traffic, and 
            personalize content. By clicking "Accept All," you consent to our use 
            of cookies. You can customize your preferences below.
          </p>
          <p className="cookie-link">
            <Link to="/cookies">Learn more about our Cookie Policy</Link>
          </p>
        </div>

        <div className="cookie-preferences">
          <div className="cookie-preference-item">
            <label>
              <input 
                type="checkbox" 
                checked={preferences.necessary}
                disabled
              />
              <span>Necessary</span>
            </label>
            <span className="always-enabled">Always Enabled</span>
          </div>

          <div className="cookie-preference-item">
            <label>
              <input 
                type="checkbox" 
                checked={preferences.analytics}
                onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
              />
              <span>Analytics</span>
            </label>
          </div>

          <div className="cookie-preference-item">
            <label>
              <input 
                type="checkbox" 
                checked={preferences.functional}
                onChange={(e) => setPreferences({...preferences, functional: e.target.checked})}
              />
              <span>Functional</span>
            </label>
          </div>

          <div className="cookie-preference-item">
            <label>
              <input 
                type="checkbox" 
                checked={preferences.marketing}
                onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
              />
              <span>Marketing</span>
            </label>
          </div>
        </div>

        <div className="cookie-actions">
          <button onClick={handleRejectAll} className="cookie-btn reject-btn">
            Reject All
          </button>
          <button onClick={handleSavePreferences} className="cookie-btn save-btn">
            Save Preferences
          </button>
          <button onClick={handleAcceptAll} className="cookie-btn accept-btn">
            <i className="fas fa-check"></i> Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;