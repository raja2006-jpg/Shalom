"use client";

import Image from 'next/image';
import { FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import { MdLocationOn, MdDirections } from "react-icons/md";
import { FaLaptop } from "react-icons/fa";

export default function Location() {
  return (
    <section className="pro-location-section" id="location">
      <div className="pro-location-container">

        {/* Section Header */}
        <div className="pro-section-header">
          <h2 className="reviews-title">Find Us Here</h2>
          <p className="pro-subtitle">Visit our office for complete hardware & software solutions, or get in touch below.</p>
        </div>

        {/* Main Grid Layout */}
        <div className="pro-location-grid">

          {/* LEFT PANEL : Company Info Card */}
          <div className="pro-info-card">
            <div className="pro-brand-header">
              <div className="pro-logo-wrapper">
                <Image
                  src="/images/shalom.png"
                  alt="Shalom System Solutions"
                  className="pro-company-logo"
                  width={140}
                  height={80}
                  unoptimized
                />
              </div>
              <div>
                <h3 className="pro-company-name">Shalom System Solutions</h3>
                <span className="pro-badge">Computer Sales &amp; Service</span>
              </div>
            </div>

            <div className="pro-divider"></div>

            <div className="pro-contact-list">

              {/* Address */}
              <div className="pro-contact-item">
                <div className="pro-icon-box">
                  <MdLocationOn className="pro-icon" />
                </div>
                <div className="pro-contact-details">
                  <h4>Our Location</h4>
                  <p>
                    3rd Jeeva Nagar, Kannampalayam,<br />
                    Jeevanagar 3rd Street,<br />
                    Sulur, Coimbatore – 641402,<br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="pro-contact-item">
                <div className="pro-icon-box">
                  <FaPhoneAlt className="pro-icon" style={{ fontSize: '14px' }} />
                </div>
                <div className="pro-contact-details">
                  <h4>Phone Number</h4>
                  <a href="tel:+919629627339" className="pro-contact-link">+91 96296 27339</a>
                </div>
              </div>

              {/* Email (Added as per prompt requirement) */}
              <div className="pro-contact-item">
                <div className="pro-icon-box">
                  <FaEnvelope className="pro-icon" style={{ fontSize: '14px' }} />
                </div>
                <div className="pro-contact-details">
                  <h4>Email Address</h4>
                  <a href="mailto:shalomsystemsolutions1@gmail.com" className="pro-contact-link">shalomsystemsolutions1@gmail.com</a>
                </div>
              </div>

              {/* Working Hours (Added as per prompt requirement) */}
              

            </div>

            {/* Action Buttons */}
            <div className="pro-action-group">
              <a
                href="https://wa.me/919629627339"
                target="_blank"
                rel="noopener noreferrer"
                className="pro-btn pro-btn-outline"
              >
                Message Us
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Shalom+System+Solutions+Kannampalayam+Sulur"
                target="_blank"
                rel="noopener noreferrer"
                className="pro-btn pro-btn-primary"
              >
                <MdDirections style={{ fontSize: '18px' }} /> Get Directions
              </a>
            </div>
          </div>

          {/* RIGHT PANEL : Map & Gallery */}
          <div className="pro-visual-panel">

            {/* Map Container */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Shalom+System+Solutions+Kannampalayam+Sulur"
              target="_blank"
              rel="noopener noreferrer"
              className="pro-map-container"
            >
              <Image
                src="/images/map.png"
                alt="Shalom System Solutions Location Map"
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
              <div className="pro-map-overlay">
                <div className="pro-map-btn">
                  <MdLocationOn /> View on Google Maps
                </div>
              </div>
            </a>

            {/* Micro Gallery (Preserved from original) */}
            <div className="pro-micro-gallery">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="pro-gallery-thumb"
                  onClick={() => num === 1 ? (window.location.href = "/products") : null}
                  style={{ cursor: num === 1 ? 'pointer' : 'default' }}
                >
                  <Image
                    src={`/images/company ${num}.webp`}
                    alt={`Work Image ${num}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  {num === 1 && (
                    <div className="pro-gallery-hover">View Products</div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* ── HIGH-END LOCATION CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .pro-location-section {
          padding: 100px 24px;
          background-color: #ffffff76;
          font-family: var(--font-primary);
          position: relative;
          color: #0f172a;
          overflow: hidden;
        }

        /* Subtle Background Accents */
        .pro-location-section::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(143, 188, 54, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
        }

        .pro-location-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .pro-section-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .pro-title {
          font-size: 40px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }
        .pro-subtitle {
          font-size: 18px;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Layout Grid */
        .pro-location-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          align-items: stretch;
        }

        /* Left Info Card */
        .pro-info-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.05), 0 1px 3px rgba(0,0,0,0.02);
          border: 1px solid rgba(226, 232, 240, 0.8);
          display: flex;
          flex-direction: column;
        }

        .pro-brand-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
        }
        .pro-logo-wrapper {
          background: #f8fafc00;
          padding: 12px;
          border-radius: 16px;
          
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pro-company-name {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
          line-height: 1.2;
        }
        .pro-badge {
          display: inline-block;
          background: rgba(143, 188, 54, 0.1);
          color: #6a8c27;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .pro-divider {
          height: 1px;
          background: #f1f5f9;
          margin-bottom: 32px;
        }

        /* Contact Details List */
        .pro-contact-list {
          display: flex;
          flex-direction: column;
          gap: 28px;
          margin-bottom: 40px;
          flex-grow: 1;
        }
        .pro-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .pro-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #f8fafc;
          color: #8fbc36;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
          transition: all 0.3s ease;
          border: 1px solid #f1f5f9;
        }
        .pro-contact-item:hover .pro-icon-box {
          background: #8fbc36;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px -4px rgba(143, 188, 54, 0.25);
        }
        .pro-contact-details h4 {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #64748b;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .pro-contact-details p,
        .pro-contact-details a {
          font-size: 15px;
          color: #334155;
          line-height: 1.6;
          font-weight: 500;
          margin: 0;
          text-decoration: none;
        }
        .pro-contact-link {
          transition: color 0.2s;
        }
        .pro-contact-link:hover {
          color: #8fbc36 !important;
        }
        .pro-text-sm { font-size: 13px; }
        .pro-text-muted { color: #94a3b8; }

        /* Action Buttons */
        .pro-action-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .pro-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 20px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .pro-btn-primary {
          background: #8CBA48;
          color: #ffffff;
          
        }
        .pro-btn-primary:hover {
          background: #73af18ff;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(15, 42, 36, 0);
        }
        .pro-btn-outline {
          background: transparent;
          color:#8CBA48;
          border: 2px solid #e2e8f0;
        }
        .pro-btn-outline:hover {
          border-color: #73af18ff;
          background: #f8fafc;
        }

        /* Right Panel: Map & Visuals */
        .pro-visual-panel {
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: 100%;
        }

        /* Map Container */
        .pro-map-container {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: #cbd5e1;
          flex-grow: 1;
          min-height: 400px;
          box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.08);
          display: block;
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .pro-map-container::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05);
          pointer-events: none;
        }
        .pro-map-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          backdrop-filter: blur(2px);
        }
        .pro-map-container:hover {
          transform: scale(0.985);
        }
        .pro-map-container:hover .pro-map-overlay {
          opacity: 1;
        }
        .pro-map-btn {
          background: #ffffff;
          color: #0f172a;
          padding: 12px 24px;
          border-radius: 100px;
          font-weight: 600;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          transform: translateY(20px);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        .pro-map-container:hover .pro-map-btn {
          transform: translateY(0);
        }

        /* Micro Gallery */
        .pro-micro-gallery {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          height: 120px;
        }
        .pro-gallery-thumb {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          background: #cbd5e1;
          border: 1px solid rgba(0,0,0,0.04);
        }
        .pro-gallery-thumb img {
          transition: transform 0.5s ease;
        }
        .pro-gallery-thumb:hover img {
          transform: scale(1.1);
        }
        .pro-gallery-hover {
          position: absolute;
          inset: 0;
          background: rgba(143, 188, 54, 0.85);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          opacity: 0;
          transition: opacity 0.3s ease;
          text-align: center;
          padding: 8px;
        }
        .pro-gallery-thumb:hover .pro-gallery-hover {
          opacity: 1;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .pro-location-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
          .pro-info-card { padding: 32px; }
        }

        @media (max-width: 860px) {
          .pro-location-section { padding: 80px 20px; }
          .pro-location-grid { grid-template-columns: 1fr; }
          
          .pro-action-group {
            grid-template-columns: 1fr;
          }
          
          .pro-map-container {
            min-height: 350px;
          }
          
          .pro-micro-gallery {
            height: 100px;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .pro-location-section { padding: 60px 16px; }
          .pro-title { font-size: 32px; }
          .pro-subtitle { font-size: 16px; }
          .pro-info-card { padding: 24px; border-radius: 20px; }
          
          .pro-brand-header { flex-direction: column; text-align: center; gap: 12px;}
          
          .pro-contact-item { flex-direction: column; align-items: center; text-align: center; gap: 12px;}
          .pro-map-container { min-height: 280px; border-radius: 20px;}
          .pro-micro-gallery { grid-template-columns: repeat(2, 1fr); height: 200px; }
        }
      `}</style>
    </section>
  );
}

