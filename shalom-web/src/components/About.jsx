import Image from 'next/image';
import { MdLocationOn } from "react-icons/md";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="light-beam"></div>

        <h2>About Us</h2>

        <p className="about-intro">
          <strong>Shalom System Solutions</strong> is a trusted system service
          provider based in <strong>Coimbatore</strong>, delivering reliable
          computer sales, repairs, and genuine software solutions for individuals
          and businesses.
        </p>

        {/* TEAM CARDS */}
        <div className="team-row">

          {/* David */}
          <article className="about-card">
            <div className="about-text">
              <h3>David Willam S</h3>
              <span className="role">Technical Specialist</span>
              <p>
                Specialist in diagnostics, OS installation, lifetime activation,
                antivirus deployment, and system performance optimization.
              </p>
              <span className="location"><MdLocationOn className="icon" /> Coimbatore</span>
            </div>
            <div className="about-image">
              <Image src="/images/david.jpeg" alt="David" width={300} height={300} />
            </div>
          </article>

          {/* Lijo */}
          <article className="about-card center">
            <div className="about-text">
              <h3>Lijo Daniel D</h3>
              <span className="role">
                Founder · Shalom System Solutions
              </span>
              <p>
                Leads business operations, customer engagement, and ensures
                quality-driven IT services with transparent pricing and genuine
                products.
              </p>
              <span className="location"><MdLocationOn className="icon" /> Coimbatore</span>
            </div>
            <div className="about-image">
              <Image src="/images/lijo.jpeg" alt="Lijo" width={300} height={300} />
            </div>
          </article>

          {/* Paul */}
          <article className="about-card">
            <div className="about-text">
              <h3>Paul R</h3>
              <span className="role">Technical Specialist</span>
              <p>Performance tuning & lifetime activation expert.</p>
              <span className="location"><MdLocationOn className="icon" /> Coimbatore</span>
            </div>
            <div className="about-image">
              <Image src="/images/paul.jpeg" alt="Paul" width={300} height={300} />
            </div>
          </article>

        </div>

        <p className="about-summary">
          We specialize in laptops, desktops, operating systems, genuine licenses,
          antivirus solutions, and long-term performance optimization.
          From <strong> new & used laptop sales</strong> to{" "}
          <strong>Windows and MS Office lifetime licenses</strong>, from{" "}
          <strong>hardware upgrades</strong> to{" "}
          <strong>data recovery and network setup</strong>, we ensure every
          customer gets professional service with honest guidance.
        </p>
      </div>

<div className="marquee">
  <div className="marquee-track">
    <span className="badge-genuine">✔ Genuine Software</span>
    <span className="badge-life">✔ Lifetime Activation</span>
    <span className="badge-fast">✔ Fast Service</span>
    <span className="badge-trust">✔ Trusted Support</span>

    <span className="badge-genuine">✔ Genuine Software</span>
    <span className="badge-life">✔ Lifetime Activation</span>
    <span className="badge-fast">✔ Fast Service</span>
    <span className="badge-trust">✔ Trusted Support</span>
  </div>
  </div>


    </section>
  );
}
