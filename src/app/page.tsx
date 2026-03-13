"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Experience from "../components/ui/Experience";
import MyWork from "../components/ui/MyWork";
import TechStack from "../components/ui/TechStack";
import Footer from "../components/ui/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  const SplineViewer = 'spline-viewer' as any;

  useGSAP(() => {
    // 3. Hero Text Reveal Animation on Scroll
    gsap.fromTo(
      ".hero-text",
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "body",
          start: "top top", // Trigger exactly when scrolling starts
          toggleActions: "play none none reverse",
        }
      }
    );

  }, { scope: mainRef });

  return (
    <>

      {/* 2. Page Content Overlaid (z-10 and up) */}
      <main ref={mainRef} className="relative w-full z-10 pointer-events-none">

        {/* Sticky Wrapper for Hero & About */}
        <div className="relative w-full bg-black">
          {/* Canvas sticky to viewport while inside wrapper */}
          <div className="sticky top-0 h-screen w-full z-0 overflow-hidden pointer-events-auto relative transform-gpu will-change-transform">
            <SplineViewer
              style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
              url="https://prod.spline.design/TqvDZBittdclJ07m/scene.splinecode"
            ></SplineViewer>

            {/* Parche para tapar el logo de Spline */}
            <div className="absolute bottom-0 right-0 w-48 h-16 bg-black z-50 pointer-events-none"></div>
          </div>

          {/* Scrolling content pushed up to overlap the sticky canvas */}
          <div className="relative z-10 flex flex-col w-full -mt-[100vh]">

            {/* Hero Section */}
            <section className="hero-section h-[150vh] w-full relative pointer-events-none transform-gpu will-change-transform">
              <div className="absolute inset-0 w-full h-screen z-10 flex flex-col md:flex-row justify-center md:justify-between items-center px-6 md:px-16 pt-24 pointer-events-none gap-10 md:gap-0">
                {/* Bloque Izquierdo */}
                <div className="hero-text-container overflow-hidden text-center md:text-left">
                  <h1 className="hero-text font-black text-6xl md:text-8xl text-white">
                    <span className="block text-2xl md:text-4xl font-normal mb-2">Hello! I'm</span>
                    MARCEL
                  </h1>
                </div>

                {/* Bloque Derecho */}
                <div className="hero-text-container overflow-hidden text-center md:text-right">
                  <h2 className="hero-text font-black text-5xl md:text-6xl text-white">
                    <span className="block text-xl md:text-2xl font-normal mb-2">A Creative</span>
                    <span className="text-purple-600">DESIGNER</span><br />
                    DEVELOPER
                  </h2>
                </div>
              </div>
            </section>

            {/* About Section - We add extra padding here to keep the canvas sticky longer */}
            <section className="min-h-[150vh] w-full flex items-center justify-end px-10 md:px-20 pointer-events-auto bg-gradient-to-b from-transparent via-black/80 to-black pb-32">
              <div className="w-full max-w-2xl text-right">
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
                  About <span className="text-brand">Me</span>
                </h2>
                <p className="text-xl md:text-2xl text-zinc-300 font-medium leading-relaxed">
                  I bridge the gap between design and engineering, creating interactive experiences that push the boundaries of the web. Focused on fluid animations, 3D worlds, and performance.
                </p>
              </div>
            </section>

          </div>
        </div>

        {/* My Career & Experience */}
        <Experience />

        {/* Horizontal Scroll My Work */}
        <MyWork />

        {/* 3D Interactive Tech Stack */}
        <TechStack />

      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
