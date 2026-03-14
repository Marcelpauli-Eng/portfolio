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

        <div className="relative w-full bg-black">
          {/* Hero Section */}
          <section className="hero-section relative w-full h-[80vh] md:h-screen flex flex-col justify-between px-6 md:px-12 pt-28 pb-10 overflow-hidden pointer-events-none">

            {/* Canvas strictly as background */}
            <div className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto flex items-end md:items-center justify-center translate-y-10 md:translate-y-0">
              {/* Desktop Canvas */}
              <div className="hidden md:block w-full h-full">
                <SplineViewer
                  style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                  url="https://prod.spline.design/TqvDZBittdclJ07m/scene.splinecode"
                ></SplineViewer>
              </div>

              {/* Mobile Canvas */}
              <div className="block md:hidden w-full h-full">
                <SplineViewer
                  style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                  url="https://prod.spline.design/UAlme9QYjwmAscj7/scene.splinecode"
                ></SplineViewer>
              </div>

              {/* Parche para tapar el logo de Spline */}
              <div className="absolute bottom-0 right-0 w-48 h-16 bg-black z-50 pointer-events-none"></div>
            </div>

            {/* Content Overflow */}
            <div className="relative z-10 flex flex-col md:flex-row justify-center md:justify-between items-center w-full h-full pointer-events-none gap-6 md:gap-0">
              {/* Bloque Izquierdo */}
              <div className="hero-text-container overflow-hidden text-center md:text-left">
                <h1 className="hero-text font-black text-6xl md:text-8xl text-white">
                  <span className="block text-2xl md:text-4xl font-normal mb-2">{t("hero.hello")}</span>
                  {t("hero.name")}
                </h1>
              </div>

              {/* Bloque Derecho */}
              <div className="hero-text-container overflow-hidden text-center md:text-right">
                <h2 className="hero-text font-black text-5xl md:text-6xl text-white">
                  <span className="block text-xl md:text-2xl font-normal mb-2">{t("hero.creative")}</span>
                  <span className="text-purple-600">{t("hero.designer")}</span><br />
                  {t("hero.developer")}
                </h2>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="w-full flex items-center justify-center md:justify-end py-16 md:py-32 px-6 md:px-20 pointer-events-auto bg-black border-t border-purple-900/30">
            <div className="w-full max-w-2xl text-center md:text-right flex flex-col items-center md:items-end">
              <h2 className="text-sm text-purple-400 tracking-widest mb-6 uppercase">
                {t("about.heading.1")} {t("about.heading.2")}
              </h2>
              <p className="text-3xl md:text-5xl font-medium leading-snug md:leading-tight text-white">
                {t("about.desc")}
              </p>
            </div>
          </section>
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
