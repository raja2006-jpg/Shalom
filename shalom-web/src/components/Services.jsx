/* eslint-disable @next/next/no-img-element */
export default function Services() {
  return (
    <section className="services" id="services">
      <div className="services-container">
        <h2>Our Services</h2>

        <p className="services-intro">
          Shalom System Solutions delivers reliable, scalable, and secure IT services
          covering hardware, software, networking, security, and surveillance
          solutions for homes, offices, and enterprises.
        </p>

        <div className="services-list">

          {/* Service 1 */}
          <article className="service-box">
            <div className="service-image">
              <img
                src="/images/laptop sales.jpg"
                alt="Laptop and Desktop Sales"
              />
            </div>
            <div className="service-content">
              <span className="service-tag">Sales</span>
              <h3>Laptop & Desktop Sales</h3>
              <p>
                Brand-new and certified pre-owned laptops and desktops supplied with
                professional configuration, warranty assurance, and expert guidance
                tailored for personal, business, and enterprise use.
              </p>
            </div>
          </article>

          {/* Service 2 */}
          <article className="service-box reverse">
            <div className="service-image">
              <img
                src="/images/laptop repair.webp"
                alt="Laptop and Desktop Repair"
              />
            </div>
            <div className="service-content">
              <span className="service-tag">Repair</span>
              <h3>Laptop & Desktop Repair</h3>
              <p>
                End-to-end repair services including motherboard diagnostics, display
                replacement, keyboard repair, power issues, and performance restoration
                handled by certified technicians.
              </p>
            </div>
          </article>

          {/* Service 3 */}
          <article className="service-box">
            <div className="service-image">
              <img
                src="/images/OS.png"
                alt="Operating System Installation"
              />
            </div>
            <div className="service-content">
              <span className="service-tag">Software</span>
              <h3>OS & Genuine Software Installation</h3>
              <p>
                Secure installation of Windows operating systems with genuine lifetime
                activation, along with licensed Microsoft Office solutions for long-term
                reliability and compliance.
              </p>
            </div>
          </article>

          {/* Service 4 */}
          <article className="service-box reverse">
            <div className="service-image">
              <img
                src="/images/rams.jpg"
                alt="SSD and RAM Upgrade"
              />
            </div>
            <div className="service-content">
              <span className="service-tag">Performance</span>
              <h3>SSD, RAM & Performance Upgrade</h3>
              <p>
                Performance optimization through SSD upgrades, RAM expansion, startup
                tuning, and thermal servicing to ensure faster boot times and system
                stability.
              </p>
            </div>
          </article>

          {/* Service 5 */}
          <article className="service-box">
            <div className="service-image">
              <img
                src="/images/Networking.png"
                alt="Networking and Data Solutions"
              />
            </div>
            <div className="service-content">
              <span className="service-tag">Networking</span>
              <h3>Networking & Data Solutions</h3>
              <p>
                Professional Wi-Fi and network setup, router configuration, structured
                office networking, secure data backup, and advanced recovery solutions.
              </p>
            </div>
          </article>

          {/* Service 6 */}
          <article className="service-box reverse">
            <div className="service-image">
              <img
                src="/images/cctv.avif"
                alt="Security and CCTV Services"
              />
            </div>
            <div className="service-content">
              <span className="service-tag">Security</span>
              <h3>Security, CCTV & Peripheral Services</h3>
              <p>
                CCTV and wireless camera installation, antivirus protection, printer
                setup, and peripheral maintenance designed for secure home and office
                environments.
              </p>
            </div>
          </article>

          {/* Service 7 */}
          <article className="service-box">
            <div className="service-image">
              <img
                src="/images/troubleshooting.jpg"
                alt="IT Software Services"
              />
            </div>
            <div className="service-content">
              <span className="service-tag highlight">IT Services</span>
              <h3>IT Software Services & Support</h3>
              <p>
                Comprehensive IT software services including OS management, licensed
                software deployment, proactive system monitoring, updates,
                troubleshooting, and ongoing technical support for homes and offices.
              </p>
            </div>
          </article>
          {/* Service 8 */}
          <article className="service-box reverse">
            <div className="service-image">
              <img
                src="/images/antivirus.jpg"
                alt="Security and CCTV Services"
              />
            </div>
            <div className="service-content">
              <span className="service-tag">Anti Virus</span>
              <h3>Total System Protection</h3>
              <p>
                Advanced Protection For Your PC,laptops
                Maximum Benifits | Biggest Savings | Greatest Offers
                Only in Shalom System Solutions
              </p>
            </div>
          </article>
          

        </div>
      </div>
    </section>
  );
}
