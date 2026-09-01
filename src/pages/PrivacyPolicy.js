import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PolicyPages.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-hero">
        <div className="container">
          <div className="policy-hero-content">
            <h1 className="policy-title">Privacy Policy</h1>
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
            <h2>1. Introduction</h2>
            <p>
              Fast Multimedia ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website fastmultimedia.com (the "Site") or use 
              our graphic design and tech support services. Please read this privacy policy 
              carefully.
            </p>
            <p>
              By accessing or using our Site or services, you signify that you have read, 
              understood, and agree to our collection, storage, use, and disclosure of your 
              personal information as described in this Privacy Policy.
            </p>
          </div>

          <div className="policy-section">
            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us, including:</p>
            <ul>
              <li>Name and contact information (email address, phone number)</li>
              <li>Company name and job title</li>
              <li>Project requirements and specifications</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Communication preferences</li>
            </ul>

            <h3>2.2 Project-Specific Information</h3>
            <p>For our design and tech support services, we may collect:</p>
            <ul>
              <li>Project briefs and creative requirements</li>
              <li>Brand assets and materials for design projects</li>
              <li>Device information for tech support services</li>
              <li>Software licenses and authentication details</li>
              <li>Billing and payment information</li>
            </ul>

            <h3>2.3 Automatically Collected Information</h3>
            <p>When you visit our Site, we may automatically collect certain information, including:</p>
            <ul>
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Pages you visit and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including:</p>
            <ul>
              <li>To provide and maintain our graphic design and tech support services</li>
              <li>To process your inquiries, projects, and support requests</li>
              <li>To communicate with you about your projects and service updates</li>
              <li>To send you marketing communications (with your consent)</li>
              <li>To improve our website, services, and customer experience</li>
              <li>To prevent fraudulent activities and ensure security</li>
              <li>To comply with legal and regulatory obligations</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>4. Legal Basis for Processing</h2>
            <p>
              We process your personal information based on the following legal grounds 
              in compliance with the Data Protection Act, 2012 (Act 843) of Ghana and 
              the General Data Protection Regulation (GDPR) where applicable:
            </p>
            <ul>
              <li>
                <strong>Consent:</strong> You have given us explicit permission to process 
                your data for specific purposes
              </li>
              <li>
                <strong>Contract:</strong> Processing is necessary for the performance of 
                a contract with you or to take steps at your request before entering into 
                a contract
              </li>
              <li>
                <strong>Legal Obligation:</strong> We must process data to comply with 
                applicable laws and regulations
              </li>
              <li>
                <strong>Legitimate Interests:</strong> We have a legitimate business 
                interest in processing your data (e.g., improving our services, marketing 
                our business) provided your rights and interests do not override these
              </li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>5. Data Sharing and Disclosure</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>
                <strong>Service Providers:</strong> Third-party vendors who help us operate 
                our business (e.g., hosting, payment processing, email delivery)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court order, or 
                to protect our rights and property
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition, 
                or sale of assets
              </li>
              <li>
                <strong>With Your Consent:</strong> For any other purpose disclosed with 
                your explicit consent
              </li>
            </ul>
            <p>
              <strong>We do not sell, rent, or trade your personal information</strong> to 
              third parties for marketing purposes.
            </p>
          </div>

          <div className="policy-section">
            <h2>6. Third-Party Services</h2>
            <p>We use the following third-party services that may process your data:</p>
            <ul>
              <li><strong>Google Analytics</strong> - For website analytics and performance tracking</li>
              <li><strong>Paystack</strong> - For secure payment processing</li>
              <li><strong>Google Fonts</strong> - For website typography</li>
              <li><strong>Font Awesome</strong> - For icon delivery</li>
            </ul>
            <p>
              These services have their own privacy policies and data processing agreements. 
              We encourage you to review their privacy policies:
            </p>
            <ul>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
              <li><a href="https://paystack.com/privacy" target="_blank" rel="noopener noreferrer">Paystack Privacy Policy</a></li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>7. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to 
              protect your personal information, including:
            </p>
            <ul>
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Staff training on data protection and privacy</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or electronic storage 
              is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div className="policy-section">
            <h2>8. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience 
              on our Site. For detailed information about our use of cookies, please see 
              our <Link to="/cookies" style={{color: '#6c63ff'}}>Cookie Policy</Link>.
            </p>
            <p>You can control cookie preferences through your browser settings.</p>
          </div>

          <div className="policy-section">
            <h2>9. Your Rights</h2>
            <p>Under applicable data protection laws, you have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
              <li><strong>Erasure:</strong> Request deletion of your information ("right to be forgotten")</li>
              <li><strong>Restriction:</strong> Request restriction of processing</li>
              <li><strong>Objection:</strong> Object to processing of your information</li>
              <li><strong>Portability:</strong> Request transfer of your data to another provider</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
            </ul>
            <p>
              To exercise these rights, please contact us at <a href="mailto:fasttech227@gmail.com">fasttech227@gmail.com</a>. 
              We will respond to your request within 30 days.
            </p>
          </div>

          <div className="policy-section">
            <h2>10. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill 
              the purposes outlined in this Privacy Policy, unless a longer retention period 
              is required or permitted by law.
            </p>
            <p>
              We will retain your information for:
            </p>
            <ul>
              <li><strong>Client Projects:</strong> For the duration of the project and up to 7 years for legal and tax purposes</li>
              <li><strong>Inquiries:</strong> Up to 2 years after the last contact</li>
              <li><strong>Newsletter Subscriptions:</strong> Until you unsubscribe</li>
              <li><strong>Analytics Data:</strong> Up to 14 months (Google Analytics retention period)</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>11. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 16. We do not 
              knowingly collect personal information from children under 16. If you become 
              aware that a child has provided us with personal information, please contact 
              us immediately, and we will take steps to delete such information.
            </p>
          </div>

          <div className="policy-section">
            <h2>12. International Data Transfers</h2>
            <p>
              We are based in Ghana and may transfer your data to countries outside Ghana 
              when using third-party services. We ensure appropriate safeguards are in 
              place for such transfers, including:
            </p>
            <ul>
              <li>Using service providers with adequate data protection measures</li>
              <li>Implementing Standard Contractual Clauses where required</li>
              <li>Ensuring compliance with applicable data protection laws</li>
            </ul>
          </div>

          <div className="policy-section">
            <h2>13. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any 
              changes by posting the new Privacy Policy on this page and updating the 
              "Last Updated" date at the top of this page.
            </p>
            <p>
              We encourage you to review this Privacy Policy periodically for any changes. 
              Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </div>

          <div className="policy-section">
            <h2>14. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy 
              or our data handling practices, please contact us:
            </p>
            <div className="contact-info">
              <p><strong>Fast Multimedia</strong></p>
              <p>📍 Kpong, Tema Akosombo Road</p>
              <p>📧 <a href="mailto:fasttech227@gmail.com">fasttech227@gmail.com</a></p>
              <p>📞 <a href="tel:+233505159131">+233 505-159-131</a> / <a href="tel:+233548890306">+233 548-890-306</a></p>
              <p>🌐 <a href="https://fastmultimedia.site">www.fastmultimedia.site</a></p>
            </div>
            <p>
              We aim to respond to all inquiries within 2 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;