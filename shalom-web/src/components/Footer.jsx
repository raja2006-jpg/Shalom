import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* BRAND */}
        <div className="footer-brand">
          <Image
            src="/images/shalom.logo.png"
            alt="Shalom System Solutions"
            className="footer-logo"
            width={200}
            height={100}
          />

          <h2>
            Your trusted partner for computer sales,
            <br />
            built on quality service
          </h2>

          <p className="footer-tagline">
            Complete Hardware & Software Solutions
            <br />
            Under High Quality & Services
          </p>

          <div className="footer-socials">
            <a
              href="https://www.instagram.com/shalom_system_solution?igsh=cnFveGdtYXZha3ox"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/images/insta.png" alt="Instagram" width={40} height={40} />
            </a>

            <a
              href="https://www.facebook.com/share/1BrxJdMQNn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="facebook"
                src="/images/facebookss.jpg"
                alt="Facebook"
                width={40}
                height={40}
              />
            </a>

            <a
              href="https://www.linkedin.com/in/lijo-daniel-d-71a917327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/images/linkedin.png" alt="LinkedIn" width={40} height={40} />
            </a>

            <a
              href="https://wa.me/message/N7HAWY2AXRH2O1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="whattsapp"
                src="/images/whattsapp.png"
                alt="WhatsApp"
                width={40}
                height={40}
              />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footer-services">
          <h3>Services</h3>
          <ul>
            <li>Hardware Solutions</li>
            <li>Software Installation</li>
            <li>Networking</li>
            <li>IT Support</li>
            <li>Consulting</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h3>Contact</h3>

          <p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Shalom+System+Solutions+Kannampalayam+Sulur"
              target="_blank"
              rel="noopener noreferrer"
            >📍Kannampalayam, Sulur,Coimbatore
            </a>
          </p>

          <p>
            📞 <a href="tel:+919629627339">+91 96296 27339</a>
          </p>

          <p>
            📩{" "}
            <a href="mailto:shalomsystemsolutions1@gmail.com">
              shalomsystemsolutions@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <span>© 2026 Shalom System Solutions</span>
      </div>
    </footer>
  );
}
