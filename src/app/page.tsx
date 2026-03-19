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
  const words = [
    "Bienvenido a mi portfolio!",
    "Soy Marcel.",
    "Soy desarrollador web y diseñador."
  ];
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
        className="text-sm lg:text-base font-light text-red-600 tracking-[0.2em] select-none text-center px-4"
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
          <div className="hidden lg:block sticky top-0 h-[100dvh] w-full z-0 overflow-hidden pointer-events-auto relative transform-gpu will-change-transform">
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

          {/* Mobile Canvas sticky to viewport */}
          <div className="block lg:hidden sticky top-0 h-[100dvh] w-full z-0 overflow-hidden pointer-events-auto relative transform-gpu will-change-transform">
            <div className="absolute inset-0 z-0 pointer-events-auto flex items-center justify-center overflow-hidden">
              {/* 
                En móvil: Forzamos un ancho y alto de 150vw para que el canvas sea gigante. 
                pointer-events-auto permite interacción táctil completa.
              */}
              <div className="w-[150vw] h-[150vw] flex items-center justify-center origin-center">
                <SplineViewer
                  style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                  // url="https://prod.spline.design/UAlme9QYjwmAscj7/scene.splinecode" // Mobile Robot
                  url="https://prod.spline.design/ClRmpVReraPy47Mn/scene.splinecode"
                ></SplineViewer>
                <RotatingText />
              </div>
              {/* Parche dinámico en el fondo para tapar logo de Spline */}
              <div className="absolute bottom-0 w-full h-24 bg-white z-20 pointer-events-none"></div>
            </div>
          </div>

          {/* Scrolling content pushed up to overlap the sticky canvas */}
          <div className="relative z-10 flex flex-col w-full -mt-[100dvh] lg:-mt-[100vh]">

            {/* Hero Section */}
            <section className="hero-section relative w-full h-[100dvh] lg:h-[150vh] flex flex-col justify-start lg:justify-between overflow-hidden pointer-events-none transform-gpu will-change-transform">
              {/* 
                En móvil: Solo se muestra la esfera.
                En escritorio: absolute posicionado normalmente.
              */}
              <div className="hidden lg:absolute lg:inset-0 w-full lg:h-[100dvh] z-10 lg:flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-between px-6 lg:px-16 mt-[85vh] lg:mt-0 pt-0 lg:pt-24 pointer-events-none gap-10 lg:gap-0">
                {/* Bloque Izquierdo */}
                <div className="hero-text-container overflow-hidden text-center lg:text-left">
                  <h1 className="hero-text font-bold text-4xl lg:text-8xl text-red-600">
                    <span className="block text-xl lg:text-4xl font-normal mb-1 lg:mb-2 text-red-500">{t("hero.hello")}</span>
                    <span className="text-white-shadow">{t("hero.name")}</span>
                  </h1>
                </div>

                {/* Bloque Derecho */}
                <div className="hero-text-container overflow-hidden text-center lg:text-right">
                  <h2 className="hero-text font-bold text-3xl lg:text-6xl text-red-600">
                    <span className="block text-lg lg:text-2xl font-normal mb-1 lg:mb-2 text-red-500">{t("hero.creative")}</span>
                    <span className="text-white-shadow">{t("hero.designer")}</span><br />
                    {t("hero.developer")}
                  </h2>
                </div>
              </div>
            </section>

            {/* About Section - Bento Grid */}
            <section className="min-h-screen w-full flex flex-col items-center justify-center pointer-events-auto bg-gradient-to-b from-transparent via-[var(--color-bg)]/80 to-[var(--color-bg)] py-20 md:py-32 relative z-20">

              <div className="text-center mb-12">
                <h2 className="text-sm font-bold tracking-[0.2em] text-red-500 uppercase">
                  {t("about.heading.1")} {t("about.heading.2")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mx-auto px-6">

                {/* Card 1: Bio Principal */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col justify-center bg-zinc-50/80 md:bg-white/60 backdrop-blur-md border border-zinc-200/50 rounded-[2rem] p-6 lg:p-10 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <h2 className="text-3xl lg:text-5xl font-black text-zinc-900 tracking-tight">
                    {t("about.card1.title")}
                  </h2>
                  <p className="text-zinc-600 text-lg lg:text-xl font-light leading-relaxed mt-4">
                    {t("about.card1.desc")}
                  </p>
                </div>

                {/* Card 2: Tech Stack */}
                <div className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 lg:p-10 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h3 className="tracking-widest uppercase text-xs font-bold text-red-500 text-center w-full z-10">
                    {t("about.card2.title")}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2 mt-6 z-10 w-full">
                    {["React", "Next.js", "Spline 3D", "TailwindCSS", "SQL", "Python", "C"].map((tech) => (
                      <span key={tech} className="bg-zinc-800/80 text-zinc-200 text-xs font-medium px-3 py-1.5 rounded-full border border-zinc-700/50 backdrop-blur-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card 3: Vida Off-Screen */}
                <div className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col justify-center bg-zinc-50/80 md:bg-white/60 backdrop-blur-md border border-zinc-200/50 rounded-[2rem] p-6 lg:p-10 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <h3 className="tracking-widest uppercase text-xs font-bold text-red-500 mb-4">
                    {t("about.card3.title")}
                  </h3>
                  <p className="text-zinc-600 text-base lg:text-lg font-light leading-relaxed">
                    {t("about.card3.desc")}
                  </p>
                </div>

                {/* Card 4: Filosofía / Proyectos */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col lg:flex-row items-start lg:items-center justify-between bg-zinc-50/80 md:bg-white/60 backdrop-blur-md border border-zinc-200/50 rounded-[2rem] p-6 lg:p-10 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="max-w-xl mb-6 md:mb-0">
                    <h3 className="tracking-widest uppercase text-xs font-bold text-red-500 mb-4">
                      {t("about.card4.title")}
                    </h3>
                    <p className="text-zinc-900 text-xl font-medium tracking-tight leading-snug">
                      {t("about.card4.desc")}
                    </p>
                  </div>
                  <a href="#work" className="shrink-0 inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors w-full md:w-auto text-sm tracking-wide">
                    {t("about.card4.btn")}
                  </a>
                </div>

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
