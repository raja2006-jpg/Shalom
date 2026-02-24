"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import { FaPhoneAlt, FaArrowUp } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { HiMail } from "react-icons/hi";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <footer className="pro-footer">
        <div className="pro-footer-container">

          {/* Main Content Grid */}
          <div className="pro-footer-grid">

            {/* 1. Company Information */}
            <div className="pro-footer-col pro-brand-col">
              <div className="pro-footer-logo-wrap">
                <Image
                  src="/images/shalom.logo.png"
                  alt="Shalom System Solutions"
                  className="pro-footer-logo"
                  width={200}
                  height={100}
                  unoptimized
                />
              </div>
              <p className="pro-footer-desc">
                Your trusted partner for computer sales, built on quality service. Complete Hardware &amp; Software Solutions under High Quality &amp; Services.
              </p>

              <div className="pro-social-links">
                <a href="https://www.instagram.com/shalom_system_solution?igsh=cnFveGdtYXZha3ox" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="pro-social-btn">
                  <Image src="/images/insta.png" alt="Insta" width={25} height={25} className="pro-social-img" />
                </a>
                <a href="https://www.facebook.com/share/1BrxJdMQNn/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="pro-social-btn">
                  <Image src="/images/facebookss.jpg" alt="FB" width={25} height={25} className="pro-social-img" />
                </a>
                <a href="https://www.linkedin.com/in/lijo-daniel-d-71a917327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="pro-social-btn">
                  <Image src="/images/linkedin.png" alt="LinkedIn" width={25} height={25} className="pro-social-img" />
                </a>
                <a href="https://wa.me/message/N7HAWY2AXRH2O1" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="pro-social-btn">
                  <Image src="/images/whattsapp.png" alt="WhatsApp" width={25} height={25} className="pro-social-img" />
                </a>
              </div>
            </div>

            {/* 2. Quick Links */}
            <div className="pro-footer-col">
              <h3 className="pro-footer-heading">Quick Links</h3>
              <ul className="pro-footer-nav">
                <li><a href="#">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            {/* 3. Products & Services */}
            <div className="pro-footer-col">
              <h3 className="pro-footer-heading">Services</h3>
              <ul className="pro-footer-nav pro-static-list">
                <li>Hardware Solutions</li>
                <li>Software Installation</li>
                <li>Networking</li>
                <li>IT Support</li>
                <li>Consulting</li>
              </ul>
            </div>

            {/* 4. Contact Details */}
            <div className="pro-footer-col pro-contact-col">
              <h3 className="pro-footer-heading">Contact Details</h3>


              <div className="pro-contact-item">
                <div className="pro-contact-icon-wrap">
                  <FaPhoneAlt className="pro-contact-icon phone-icon" />
                </div>
                <a href="tel:+919629627339" className="pro-contact-text">+91 96296 27339</a>
              </div>

              <div className="pro-contact-item">
                <div className="pro-contact-icon-wrap">
                  <HiMail className="pro-contact-icon" />
                </div>
                <a href="mailto:shalomsystemsolutions1@gmail.com" className="pro-contact-text">
                  shalomsystemsolutions1@gmail.com
                </a>
              </div>

              
              <div className="pro-contact-item">
                <div className="pro-contact-icon-wrap">
                  <MdLocationOn className="pro-contact-icon" />
                </div>
                <a href="https://www.google.com/maps/search/?api=1&query=Shalom+System+Solutions+Kannampalayam+Sulur" target="_blank" rel="noopener noreferrer" className="pro-contact-text">
                  Kannampalayam, Sulur ,Coimbatore
                </a>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="pro-footer-divider"></div>

          {/* Bottom Bar */}
          <div className="pro-footer-bottom">
            <span className="pro-copyright">© {new Date().getFullYear()} Shalom System Solutions. All rights reserved.</span>
           
          </div>

        </div>
      </footer>

      

      {/* ── SCOPED CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        /* Footer Base */
        .pro-footer {
          position: relative;
          background: rgb(248, 255, 239);
          backdrop-filter: blur(10px);
          color: #4c4c4c;
          font-family: var(--font-primary);
          padding: 80px 24px 32px;
          margin-top: 80px;
          border-top: 1px solid rgba(255, 255, 255, 0.3);
        }

        .pro-footer-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        /* Grid Layout */
        .pro-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 48px;
          margin-bottom: 60px;
        }

        /* Brand Column */
        .pro-brand-col {
          display: flex;
          flex-direction: column;
        }
        .pro-footer-logo-wrap {
          margin-bottom: 24px;
          margin-left: 80px;
          background: transparent;
          border-radius: 12px;
          padding: 0;
          display: inline-block;
          width: max-content;
        }
        .pro-footer-logo {
          max-width: 100%;
          height: auto;
          display: block;
        }
        .pro-footer-desc {
          color: #555;
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 28px;
          max-width: 380px;
        }

        /* Social Icons */
        .pro-social-links {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-left:70px;
        }
        .pro-social-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(143, 188, 54, 0.2);
          overflow: hidden;
        }
        .pro-social-btn:hover {
          background: #8fbc36; /* Brand accent */
          border-color: #8fbc36;
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(143, 188, 54, 0.3);
        }
        .pro-social-img {
          border-radius: 50%;
          object-fit: cover;
        }

        /* Headings */
        .pro-footer-heading {
          color: #2a2a2a;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 24px;
          position: relative;
          padding-bottom: 12px;
        }
        // .pro-footer-heading::after {
        //   content: '';
        //   position: absolute;
        //   left: 0;
        //   bottom: 0;
        //   width: 40px;
        //   height: 3px;
        //   background: #8fbc36;
        //   border-radius: 2px;
          
        // }

        /* Nav Links */
        .pro-footer-nav {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .pro-footer-nav li a {
          color: #555;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .pro-footer-nav li a::before {
          content: '→';
          font-size: 14px;
          color: #8fbc36;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }
        .pro-footer-nav li a:hover {
          color: #8fbc36;
          transform: translateX(4px);
        }
        .pro-footer-nav li a:hover::before {
          opacity: 1;
          transform: translateX(0);
        }

        /* Static Nav List (Services) */
        .pro-static-list li {
          color: #555;
          font-size: 15px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .pro-static-list li::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8fbc36;
          opacity: 0.7;
        }

        /* Contact Details */
        .pro-contact-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .pro-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          group: inherit;
        }
        .pro-contact-icon-wrap {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(143, 188, 54, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }
        .pro-contact-icon {
          color: #8fbc36;
          font-size: 18px;
        }
        .phone-icon {
          font-size: 15px;
        }
        .pro-contact-item:hover .pro-contact-icon-wrap {
          background: #8fbc36;
        }
        .pro-contact-item:hover .pro-contact-icon {
          color: #ffffff;
        }
        .pro-contact-text {
          color: #555;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          line-height: 1.5;
          margin-top: 6px;
          transition: color 0.2s;
        }
        .pro-contact-text:hover {
          color: #8fbc36;
        }

        /* Divider & Bottom Section */
        .pro-footer-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent);
          margin-bottom: 32px;
        }
        
        pro-footer-bottom. {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #666;
          font-size: 14px;
          margin-left:33%;
        }
        .pro-legal-links {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pro-legal-links a {
          color: #666;
          text-decoration: none;
          transition: color 0.2s;
        }
        .pro-legal-links a:hover {
          color: #8fbc36;
        }
        .pro-dot {
          color: #ccc;
        }

        /* Back To Top Button */
        .pro-back-to-top {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #8fbc36;
          color: #ffffff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 25px -5px rgba(143, 188, 54, 0.4);
          z-index: 1000;
        }
        .pro-back-to-top.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .pro-back-to-top:hover {
          background: #7ca82b;
          transform: translateY(-5px);
          box-shadow: 0 15px 30px -5px rgba(143, 188, 54, 0.5);
        }
          .pro-copyright{
          margin-left:0%;
          font-size:17px;
          }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .pro-footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
           
          }
             .pro-footer-logo-wrap{
             margin-left: 0;}
             .pro-social-links{
             margin-left:0;}
        }

        @media (max-width: 768px) {
          .pro-footer-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            .pro-footer-nav{
            display:none;}
            .pro-footer-heading{
            display:none;}
            .pro-social-links{
            justify-content: center;
            margin-left:0;
            margin-bottom:0;
           
          }
            
          .pro-brand-col {
            align-items: center;
            text-align: center;
          }
          .pro-footer-desc {
            margin-left: auto;
            margin-right: auto;
          }
          .pro-footer-heading::after {
            left: 50%;
            transform: translateX(-50%);
          }
          .pro-footer-col {
            text-align: center;
          }
          .pro-footer-nav li a {
            justify-content: center;
          }
          .pro-static-list li {
            justify-content: center;
          }
          .pro-contact-item {
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-top:0;
          }
          .pro-contact-icon-wrap {
            margin-bottom: -8px;
          }
          .pro-footer-bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .pro-footer {
            padding: 60px 20px 24px;
          }
          .pro-back-to-top {
            bottom: 20px;
            right: 20px;
            width: 44px;
            height: 44px;
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}

