"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
    const { t } = useLanguage();

    const experiences = [
        {
            role: t("exp.1.role"),
            company: t("exp.1.company"),
            year: "2018",
            desc: t("exp.1.desc"),
        },
        {
            role: t("exp.2.role"),
            company: t("exp.2.company"),
            year: "2020",
            desc: t("exp.2.desc"),
        },
        {
            role: t("exp.3.role"),
            company: t("exp.3.company"),
            year: "NOW",
            desc: t("exp.3.desc"),
        },
    ];

    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. Line & Glowing Dot Animation (Shooting Star Effect)
        const lineTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".timeline-container",
                start: "top center",
                end: "bottom center",
                scrub: 1,
            },
        });

        // Animate the line drawing down
        lineTl.fromTo(
            ".glowing-line",
            { scaleY: 0 },
            { scaleY: 1, transformOrigin: "top center", ease: "none" },
            0
        );

        // Animate the dot moving down with the line
        lineTl.fromTo(
            ".glowing-dot",
            { top: "0%" },
            { top: "100%", ease: "none" },
            0
        );

        // 2. Rows Appearance Animation
        const rows = gsap.utils.toArray<HTMLElement>(".experience-row");
        rows.forEach((row) => {
            gsap.fromTo(
                row,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: row,
                        start: "top center+=100",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-black pointer-events-auto py-32 px-6 overflow-hidden text-white">
            <div className="max-w-6xl mx-auto relative flex flex-col items-center">

                {/* Title */}
                <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-16 md:mb-32 z-10 text-center">
                    {t("exp.title.1")} <span className="text-purple-600">{t("exp.title.2")}</span>
                </h3>

                {/* Timeline Structure */}
                <div className="timeline-container relative w-full flex flex-col gap-16 md:gap-24 pl-4 md:pl-0">

                    {/* Background Track Line */}
                    <div className="absolute top-0 bottom-0 left-0 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-zinc-800 z-0 rounded-full"></div>

                    {/* Glowing Animated Line */}
                    <div className="glowing-line absolute top-0 bottom-0 left-0 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-purple-500 to-purple-400 z-10 origin-top"></div>

                    {/* Glowing Animated Dot (Meteor) */}
                    <div className="glowing-dot absolute left-0 md:left-1/2 -translate-x-1/2 -top-2 w-4 h-4 rounded-full bg-purple-300 shadow-[0_0_20px_6px_rgba(168,85,247,0.8)] z-20"></div>

                    {/* Content Rows */}
                    {experiences.map((exp, idx) => (
                        <div key={idx} className="experience-row relative z-30 flex flex-col gap-2 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 md:items-center w-full pl-6 md:pl-0">

                            {/* Left Column: Role & Company */}
                            <div className="flex flex-col md:block md:text-right pt-2 md:pt-0">
                                <h4 className="text-xl md:text-3xl font-bold text-white group flex flex-col md:items-end">
                                    {exp.role.split(" / ")[0] || exp.role}
                                </h4>
                                <p className="text-sm md:text-xl font-medium text-purple-400 mt-1">
                                    {exp.company}
                                </p>
                            </div>

                            {/* Center Column / Mobile Year */}
                            <div className="flex flex-col md:items-center md:justify-center w-full md:w-24">
                                <div className="hidden md:block bg-black border-2 border-purple-500 text-white font-bold py-2 px-4 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)] relative z-10 w-full text-center">
                                    {exp.year}
                                </div>
                                <div className="md:hidden text-3xl md:text-5xl font-light text-gray-400 mt-2 mb-2">
                                    {exp.year}
                                </div>
                            </div>

                            {/* Right Column: Description */}
                            <div className="text-left">
                                <p className="text-sm md:text-lg text-gray-300 md:text-zinc-400 leading-relaxed font-light">
                                    {exp.desc}
                                </p>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}
