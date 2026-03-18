"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Experience from "../components/ui/Experience";
import MyWork from "../components/ui/MyWork";
import TechStack from "../components/ui/TechStack";
import Footer from "../components/ui/Footer";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

function RotatingText() {
  const words = ["Bienvenido", "Este es mi portfolio"];
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    // 1. Animación de ENTRADA
    gsap.fromTo(textRef.current,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    // 2. Programar la SALIDA y el CAMBIO después de 20 segundos
    const timeout = setTimeout(() => {
      gsap.to(textRef.current, {
        y: -10,
        opacity: 0,
        duration: 1,
        ease: "power2.in",
        onComplete: () => {
          setIndex((prev) => (prev + 1) % words.length);
        }
      });
    }, 5000); // 5 segundos de espera

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      <div
        ref={textRef}
        className="text-sm md:text-base font-light text-red-600 tracking-[0.2em] select-none text-center px-4"
      >
        {words[index]}
      </div>
    </div>
  );
}

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
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          snap: {
            snapTo: 1, // Snap to the end of the hero section
            duration: 0.8,
            delay: 0.1,
            ease: "power2.inOut"
          },
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
          <div className="hidden md:block sticky top-0 h-[100dvh] w-full z-0 overflow-hidden pointer-events-auto relative transform-gpu will-change-transform">
            <SplineViewer
              style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
              // url="https://prod.spline.design/TqvDZBittdclJ07m/scene.splinecode" // Antiguo Robot
              // url="https://prod.spline.design/0VT2QwmNWTlSXbzJ/scene.splinecode" // Ordenador
              // url="https://prod.spline.design/i1i3RyF5SIDRMj1w/scene.splinecode" // Anterior
              url="https://prod.spline.design/ClRmpVReraPy47Mn/scene.splinecode"
            ></SplineViewer>

            <RotatingText />

            {/* Parche para tapar el logo de Spline */}
            <div className="absolute bottom-0 right-0 w-48 h-16 bg-white z-50 pointer-events-none"></div>
          </div>

          {/* Mobile Canvas fixed to viewport */}
          <div className="block md:hidden fixed inset-0 z-0 pointer-events-auto flex items-center justify-center overflow-hidden">
            <div className="w-[150vw] h-[150vw] flex items-center justify-center origin-center">
              <SplineViewer
                style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                // url="https://prod.spline.design/UAlme9QYjwmAscj7/scene.splinecode" // Mobile Robot
                url="https://prod.spline.design/ClRmpVReraPy47Mn/scene.splinecode"
              ></SplineViewer>
              <RotatingText />
            </div>
            {/* Parche FIJO blanco en la parte baja de la pantalla */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-white z-[99999] pointer-events-none md:hidden"></div>
          </div>

          {/* Scrolling content pushed up to overlap the sticky canvas */}
          <div className="relative z-10 flex flex-col w-full -mt-[100dvh] md:-mt-[100vh]">

            {/* Hero Section */}
            <section className="hero-section relative w-full min-h-[100dvh] md:h-[150vh] flex flex-col justify-start md:justify-between overflow-hidden pointer-events-none transform-gpu will-change-transform">
              <div className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-end pb-32 text-center md:items-start md:justify-center md:pb-0 md:text-left pointer-events-none px-6 md:px-16">
                <div className="hero-text-container overflow-hidden">
                  <p className="hero-text text-lg md:text-3xl text-red-500 font-light mb-2">{t("hero.hello")}</p>
                </div>
                <div className="hero-text-container overflow-hidden">
                  <h1 className="hero-text text-5xl md:text-8xl font-black text-red-600 tracking-tighter leading-none mb-6">
                    <span className="text-white-shadow uppercase">{t("hero.name")}</span>
                  </h1>
                </div>
                <div className="hero-text-container overflow-hidden">
                  <p className="hero-text text-sm md:text-2xl text-red-500 font-medium tracking-[0.2em] uppercase">
                    {t("hero.creative")} <span className="text-red-600 font-bold">{t("hero.designer")}</span> {t("hero.developer")}
                  </p>
                </div>
              </div>
            </section>

            {/* About Section - We add extra padding here to keep the canvas sticky longer */}
            <section className="min-h-[150vh] w-full flex items-center justify-center pointer-events-auto bg-gradient-to-b from-transparent via-[var(--color-bg)]/80 to-[var(--color-bg)]">
              <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-6 md:px-10 py-20 md:py-32">
                <h2 className="text-sm font-bold tracking-[0.2em] text-red-500 uppercase mb-8 md:mb-12">
                  {t("about.heading.1")} {t("about.heading.2")}
                </h2>
                <p className="text-2xl md:text-5xl md:leading-snug font-medium text-red-600 tracking-tight">
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
