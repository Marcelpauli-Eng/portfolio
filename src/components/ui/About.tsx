"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Timeline for the text appearance
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                toggleActions: "play reverse play reverse",
            }
        });

        tl.from(".about-reveal", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="about-section" className="relative z-10 h-screen w-full bg-transparent">
            <div className="w-1/2 ml-auto h-full flex flex-col justify-center px-10 md:px-20">
                <div className="max-w-xl text-black">
                    <h2 className="about-reveal text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
                        About <span className="text-brand">Me</span>
                    </h2>
                    <p className="about-reveal text-xl md:text-2xl font-medium leading-relaxed">
                        I bridge the gap between design and engineering, creating interactive
                        experiences that push the boundaries of the web.

                        <br /><br />
                        Focused on WebGL, smooth animations, and delivering state-of-the-art
                        performance.
                    </p>
                </div>
            </div>
        </section>
    );
}
