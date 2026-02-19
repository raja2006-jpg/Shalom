"use client";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Location from "@/components/Location";
import Footer from "@/components/Footer";


export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Services />
      <Reviews />
      <Contact />
      <Location />
      <Footer />
    </>
  );
}
