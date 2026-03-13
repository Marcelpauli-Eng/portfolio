"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".reveal-text", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            delay: 0.5,
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative z-10 w-full h-screen overflow-hidden bg-transparent">
            {/* Overlaid Texts */}
            <div className="relative z-10 w-full h-full flex justify-between items-center px-10 pointer-events-none">
                <div className="text-black">
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
                        <div className="overflow-hidden">
                            <div className="reveal-text">Hello! I'm</div>
                        </div>
                        <div className="overflow-hidden pb-2">
                            <span className="reveal-text text-brand inline-block">Marcel</span>
                        </div>
                    </h1>
                </div>
                <div className="text-right text-black max-w-sm">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                        <div className="overflow-hidden">
                            <div className="reveal-text">A Creative</div>
                        </div>
                        <div className="overflow-hidden">
                            <div className="reveal-text text-brand pb-1">Designer</div>
                        </div>
                        <div className="overflow-hidden">
                            <div className="reveal-text text-brand pb-1">Developer</div>
                        </div>
                    </h2>
                </div>
            </div>
        </div>
    );
}
