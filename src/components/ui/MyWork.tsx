"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function MyWork() {
    const { t } = useLanguage();

    const projects = [
        {
            num: "01",
            name: "NinjaBet Odds",
            category: "Web Development",
            tools: ["React", "Typescript", "Tailwind, Zustand"],
            desc: t("work.1.desc"),
        },
        {
            num: "02",
            name: "Fendi Clone",
            category: "3D Modeling",
            tools: ["Blender", "Substance Painter", "Three.js"],
            desc: t("work.2.desc"),
        },
        {
            num: "03",
            name: "3D Portfolio",
            category: "Creative Development",
            tools: ["Three.js", "React Three Fiber", "GSAP"],
            desc: t("work.3.desc"),
        },
    ];

    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const section = sectionRef.current;
        const track = trackRef.current;

        if (!section || !track) return;

        // The track moves left by (total width - 1 screen width)
        // To match user instructions, we move it by -100% * (items - 1) of viewport width
        gsap.to(track, {
            x: `-${100 * (projects.length - 1)}vw`,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 1,
                end: "+=3000", // Fades out the scroll length over 3000px
            },
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="work-section h-screen w-full bg-[var(--color-bg)] text-white relative overflow-hidden">
            {/* Título Absoluto (Stronger) */}
            <div className="absolute top-10 left-10 md:top-20 md:left-20 z-20 pointer-events-none">
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-red-600">
                    <span className="text-white-shadow">{t("work.title.1")}</span> <span className="text-red-700">{t("work.title.2")}</span>
                </h2>
            </div>

            {/* Slider Track */}
            <div ref={trackRef} className="flex h-full w-[300vw]">
                {projects.map((proj, idx) => (
                    <div key={idx} className="w-screen h-screen flex flex-col md:flex-row items-center justify-center px-10 md:px-20 relative">

                        <div className="hidden md:block absolute top-[10%] left-0 w-full h-full pointer-events-none overflow-hidden">
                            <div className="absolute top-1/2 left-10 md:left-20 -translate-y-1/2 w-32 h-32 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 z-0"></div>
                        </div>
                        {/* Left Column (Text) */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center z-10 pr-10 pl-6 md:pl-0 relative">
                            <h3 className="absolute left-0 lg:left-10 top-10 lg:top-20 text-[6rem] lg:text-[12rem] font-black tracking-tighter text-red-600 opacity-5 leading-none pointer-events-none">
                                {proj.num}
                            </h3>

                            <div className="relative mt-20 lg:mt-32">
                                <h4 className="text-5xl md:text-6xl font-bold tracking-tighter text-red-600 mb-2">
                                    {proj.name}
                                </h4>
                                <p className="text-xl md:text-2xl text-red-500/60 font-medium mb-6 uppercase tracking-wider">
                                    {proj.category}
                                </p>
                                <p className="text-lg md:text-xl text-red-600 font-normal mb-8 max-w-md">
                                    {proj.desc}
                                </p>

                                <div className="mb-4">
                                    <h5 className="text-sm font-semibold text-red-500/50 uppercase tracking-widest mb-2">{t("work.tools_features")}</h5>
                                    <p className="text-sm md:text-base text-red-600 font-medium">
                                        {proj.tools.join(", ")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Image/Mockup Placeholder) */}
                        <div className="w-full md:w-1/2 h-full flex justify-center items-center z-10 p-10">
                            <div className="w-2/3 h-2/3 max-h-[600px] bg-zinc-900 rounded-lg border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] flex items-center justify-center overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                                <span className="text-zinc-600 font-bold uppercase tracking-widest text-center px-4">{t("work.placeholder")}</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}
