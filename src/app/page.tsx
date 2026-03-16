"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Experience from "../components/ui/Experience";
import MyWork from "../components/ui/MyWork";
import TechStack from "../components/ui/TechStack";
import Footer from "../components/ui/Footer";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

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
        <div className="relative w-full bg-[var(--color-bg)]">
          {/* Desktop Canvas sticky to viewport */}
          <div className="hidden md:block sticky top-0 h-screen w-full z-0 overflow-hidden pointer-events-auto relative transform-gpu will-change-transform">
            <SplineViewer
              style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
              // url="https://prod.spline.design/TqvDZBittdclJ07m/scene.splinecode" // Antiguo Robot
              // url="https://prod.spline.design/0VT2QwmNWTlSXbzJ/scene.splinecode" // Ordenador
              // url="https://prod.spline.design/i1i3RyF5SIDRMj1w/scene.splinecode" // Anterior
              url="https://prod.spline.design/ClRmpVReraPy47Mn/scene.splinecode"
            ></SplineViewer>

            {/* Parche para tapar el logo de Spline */}
            <div className="absolute bottom-0 right-0 w-48 h-16 bg-white z-50 pointer-events-none"></div>
          </div>

          {/* Mobile Canvas sticky to viewport */}
          <div className="block md:hidden sticky top-0 h-[60vh] md:h-screen w-full z-0 overflow-hidden pointer-events-auto relative transform-gpu will-change-transform">
            <SplineViewer
              style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
              // url="https://prod.spline.design/UAlme9QYjwmAscj7/scene.splinecode" // Mobile Robot
              url="https://prod.spline.design/ClRmpVReraPy47Mn/scene.splinecode"
            ></SplineViewer>

            {/* Parche para tapar el logo de Spline */}
            <div className="absolute bottom-0 right-0 w-48 h-16 bg-[var(--color-bg)] z-50 pointer-events-none"></div>
          </div>

          {/* Scrolling content pushed up to overlap the sticky canvas */}
          <div className="relative z-10 flex flex-col w-full -mt-[100vh]">

            {/* Hero Section */}
            <section className="hero-section h-[70vh] md:h-[150vh] w-full relative pointer-events-none transform-gpu will-change-transform">
              <div className="absolute inset-0 w-full h-full md:h-screen z-10 flex flex-col md:flex-row justify-center md:justify-between items-center px-6 md:px-16 pt-16 md:pt-24 pointer-events-none gap-6 md:gap-0">
                {/* Bloque Izquierdo */}
                <div className="hero-text-container overflow-hidden text-center md:text-left">
                  <h1 className="hero-text font-black text-6xl md:text-8xl text-red-600">
                    <span className="block text-2xl md:text-4xl font-normal mb-2 text-red-500">{t("hero.hello")}</span>
                    <span className="text-white-shadow">{t("hero.name")}</span>
                  </h1>
                </div>

                {/* Bloque Derecho */}
                <div className="hero-text-container overflow-hidden text-center md:text-right">
                  <h2 className="hero-text font-black text-5xl md:text-6xl text-red-600">
                    <span className="block text-xl md:text-2xl font-normal mb-2 text-red-500">{t("hero.creative")}</span>
                    <span className="text-white-shadow">{t("hero.designer")}</span><br />
                    {t("hero.developer")}
                  </h2>
                </div>
              </div>
            </section>

            {/* About Section - We add extra padding here to keep the canvas sticky longer */}
            <section className="min-h-[150vh] w-full flex items-center justify-center md:justify-end py-16 md:py-32 px-6 md:px-20 pointer-events-auto bg-gradient-to-b from-transparent via-[var(--color-bg)]/80 to-[var(--color-bg)]">
              <div className="w-full max-w-2xl text-center md:text-right flex flex-col items-center md:items-end">
                <h2 className="text-sm text-red-500 tracking-widest mb-6 uppercase font-bold">
                  {t("about.heading.1")} {t("about.heading.2")}
                </h2>
                <p className="text-3xl md:text-5xl font-medium leading-snug md:leading-tight text-red-600">
                  {t("about.desc")}
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
