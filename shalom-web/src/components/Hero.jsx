"use client";
import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    const laptop = document.querySelector(".laptop");
    const hero = document.querySelector(".hero");

    if (laptop) {
      new IntersectionObserver(
        entries => {
          entries.forEach(e => e.isIntersecting && laptop.classList.add("show"));
        },
        { threshold: 0.3 }
      ).observe(laptop);
    }

    hero?.classList.add("animate");
  }, []);

  return (
    <section className="hero">
      <div className="glow-circle glow-1"></div>
      <div className="glow-circle glow-2"></div>
      <div className="glow-circle glow-3"></div>

      <div className="hero-content">
        <h1>Shalom System Solutions</h1>
        <h2>Complete Hardware &<br /> Software Solutions</h2>
        <p>Under High Quality & Services</p>

        <div className="cta-wrapper">
          <button
            className="enquire-btn"
            onClick={() => (window.location.href = "/products")}
          >
            

            <span className="btn-text">Visit now</span>
            <span className="btn-arrow">➜</span>
          </button>
        </div>
      </div>

      <div className="laptop-wrapper">
        <div className="laptop">
          <div className="laptop-screen">
            <video autoPlay muted loop playsInline>
              <source src="/images/shalom.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="laptop-base"></div>
        </div>
      </div>
    </section>
  );
}
