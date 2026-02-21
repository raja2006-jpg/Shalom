"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["services", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    <div id="nav" className={scrolled ? "scrolled" : ""}>
      <a id="logo" href="#">
        <Image src="/images/shalom.png" alt="Shalom Logo" width={200} height={50} priority />
      </a>

      <nav className="nav-links">
        <a href="#services" className={activeSection === "services" ? "active" : ""}>Services</a>
        <a href="/products">Products</a>
        <a href="#contact" className={activeSection === "contact" ? "active" : ""}>Contact</a>
      </nav>
    </div>
  );
}
