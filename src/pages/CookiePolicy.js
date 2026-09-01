// CookiePolicy.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PolicyPages.css';

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-hero">
        <div className="container">
          <div className="policy-hero-content">
            <h1 className="policy-title">Cookie Policy</h1>
            <p className="policy-subtitle">
              Last Updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="policy-content section">
        <div className="container">
          <div className="policy-section">
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your computer, smartphone, 
              or other device when you visit a website. They are widely used to make websites 
              work more efficiently, enhance user experience, and provide information to the 
              website owners.
            </p>
            <p>
              Cookies do not contain personal information that can identify you directly, 
              but they may store information about your preferences and browsing behavior.
            </p>
          </div>

          <div className="policy-section">
            <h2>2. How We Use Cookies</h2>
            <p>At Fast Multimedia, we use cookies for the following purposes:</p>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> These are necessary for the website to 
                function properly. They enable basic features like page navigation and 
                access to secure areas.
              </li>
              <li>
                <strong>Performance Cookies:</strong> These help us understand how visitors 
                interact with our website by collecting and reporting information anonymously.
              </li>
              <li>
                <strong>Functionality Cookies:</strong> These allow our website to remember 
                choices you make (such as your preferences) to provide enhanced features.
              </li>
              <li>
                <strong>Marketing Cookies:</strong> These are used to track visitors across 
                websites to display relevant advertisements.
              </li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>3. Types of Cookies We Use</h2>
            
            <h3>3.1 Necessary Cookies</h3>
            <p>These cookies are essential for our website to function:</p>
            <table className="cookie-table">
              <thead>
                <tr>
                  <th>Cookie Name</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>session_id</td>
                  <td>Maintains your session while browsing</td>
                  <td>Session</td>
                </tr>
                <tr>
                  <td>csrf_token</td>
                  <td>Security protection against cross-site request forgery</td>
                  <td>Session</td>
                </tr>
              </tbody>
            </table>

            <h3>3.2 Analytics Cookies</h3>
            <p>These help us understand how you use our website:</p>
            <table className="cookie-table">
              <thead>
                <tr>
                  <th>Cookie Name</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>_ga</td>
                  <td>Google Analytics - distinguishes unique users</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>_gid</td>
                  <td>Google Analytics - distinguishes users</td>
                  <td>24 hours</td>
                </tr>
                <tr>
                  <td>_gat</td>
                  <td>Google Analytics - limits request rate</td>
                  <td>1 minute</td>
                </tr>
              </tbody>
            </table>

            <h3>3.3 Functional Cookies</h3>
            <p>These remember your preferences:</p>
            <table className="cookie-table">
              <thead>
                <tr>
                  <th>Cookie Name</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>cookie_consent</td>
                  <td>Remembers your cookie preferences</td>
                  <td>1 year</td>
                </tr>
                <tr>
                  <td>preferred_language</td>
                  <td>Remembers your language preference</td>
                  <td>1 year</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="policy-section">
            <h2>4. Third-Party Cookies</h2>
            <p>
              We use third-party services that may set cookies on your device. These include:
            </p>
            <ul>
              <li>
                <strong>Google Analytics:</strong> Used to analyze website traffic and user 
                behavior. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Google Privacy Policy</a>
              </li>
              <li>
                <strong>Paystack:</strong> Used for payment processing. 
                <a href="https://paystack.com/privacy" target="_blank" rel="noopener noreferrer">
                Paystack Privacy Policy</a>
              </li>
              <li>
                <strong>Font Awesome:</strong> Used for icon delivery on our website.
              </li>
              <li>
                <strong>Google Fonts:</strong> Used for typography on our website.
              </li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>5. Managing Your Cookie Preferences</h2>
            <p>
              You can control and manage cookies in various ways. Here's how:
            </p>

            <h3>5.1 Browser Settings</h3>
            <p>Most browsers allow you to manage your cookie preferences:</p>
            <ul>
              <li>
                <strong>Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data
              </li>
              <li>
                <strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
              </li>
              <li>
                <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
              </li>
              <li>
                <strong>Microsoft Edge:</strong> Settings → Cookies and site permissions
              </li>
            </ul>

            <h3>5.2 Cookie Consent Tool</h3>
            <p>
              When you first visit our website, you will see a cookie consent banner 
              where you can choose your preferences.
            </p>

            <div className="cookie-options">
              <h4>Choose Your Cookie Settings:</h4>
              <div className="cookie-option">
                <label>
                  <input type="checkbox" defaultChecked disabled /> 
                  <strong>Necessary Cookies</strong> (Always Enabled)
                </label>
                <p>Required for the website to function properly.</p>
              </div>
              <div className="cookie-option">
                <label>
                  <input type="checkbox" defaultChecked /> 
                  <strong>Analytics Cookies</strong>
                </label>
                <p>Help us understand how visitors interact with our website.</p>
              </div>
              <div className="cookie-option">
                <label>
                  <input type="checkbox" defaultChecked /> 
                  <strong>Functional Cookies</strong>
                </label>
                <p>Remember your preferences for enhanced experience.</p>
              </div>
              <div className="cookie-option">
                <label>
                  <input type="checkbox" /> 
                  <strong>Marketing Cookies</strong>
                </label>
                <p>Used to deliver relevant advertisements.</p>
              </div>
              <button className="save-preferences-btn">Save Preferences</button>
            </div>
          </div>

          <div className="policy-section">
            <h2>6. Cookie Consent</h2>
            <p>
              When you first visit our website, we will ask for your consent to use 
              non-essential cookies. You can:
            </p>
            <ul>
              <li><strong>Accept All:</strong> Accept all types of cookies</li>
              <li>
                <strong>Customize:</strong> Choose which types of cookies you accept
              </li>
              <li>
                <strong>Reject All:</strong> Reject all non-essential cookies (essential 
                cookies will still be used)
              </li>
            </ul>
            <p>
              You can change your cookie preferences at any time by clicking the 
              "Cookie Settings" link in the footer of our website.
            </p>
          </div>

          <div className="policy-section">
            <h2>7. How Long Do Cookies Last?</h2>
            <p>
              Cookies can be classified based on how long they remain on your device:
            </p>
            <ul>
              <li>
                <strong>Session Cookies:</strong> These are temporary cookies that are 
                deleted when you close your browser.
              </li>
              <li>
                <strong>Persistent Cookies:</strong> These remain on your device for a 
                set period (specified in the cookie) or until you manually delete them.
              </li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>8. Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. Any changes will be 
              posted on this page with an updated "Last Updated" date.
            </p>
            <p>
              We encourage you to review this policy periodically to stay informed about 
              our use of cookies.
            </p>
          </div>

          <div className="policy-section">
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="contact-info">
              <p><strong>Fast Multimedia</strong></p>
              <p>Kpong, Tema Akosombo Road</p>
              <p>Email: <a href="mailto:fasttech227@gmail.com">fasttech227@gmail.com</a></p>
              <p>Phone: <a href="tel:+233505159131">+233 505-159-131</a> / <a href="tel:+233548890306">+233 548-890-306</a></p>
            </div>
          </div>

          <div className="policy-section">
            <h2>10. Useful Resources</h2>
            <ul>
              <li>
                <a href="https://www.aboutcookies.org/" target="_blank" rel="noopener noreferrer">
                  About Cookies
                </a>
              </li>
              <li>
                <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer">
                  All About Cookies
                </a>
              </li>
              <li>
                <a href="https://cookiepedia.co.uk/" target="_blank" rel="noopener noreferrer">
                  Cookiepedia
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;