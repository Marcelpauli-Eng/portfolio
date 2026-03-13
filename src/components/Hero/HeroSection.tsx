"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HeroCanvas } from "./HeroCanvas";
import { TextReveal } from "../ui/TextReveal";

export function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    useGSAP(
        () => {
            if (!containerRef.current || !isMounted) return;

            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            // Grab elements that aren't using the generic TextReveal component
            // (because TextReveal handles its own animation based on scrollTrigger)
            // Actually, since this is the hero, we might want to coordinate the timeline.
            // But let's keep it simple: TextReveal will trigger immediately if start is "top 85%" and it's visible.

            // Animate borders or lines if needed
            tl.from(".hero-line", {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1.5,
                delay: 0.2,
            })
                .from(
                    ".hero-cta",
                    {
                        y: 30,
                        opacity: 0,
                        duration: 1,
                        stagger: 0.1,
                    },
                    "-=1"
                )
                .from(
                    ".hero-fade",
                    {
                        opacity: 0,
                        duration: 1.5,
                    },
                    "-=0.8"
                );
        },
        { scope: containerRef, dependencies: [isMounted] }
    );

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 py-24 sm:px-12 lg:px-24"
        >
            {/* 3D Canvas Background */}
            <HeroCanvas />

            {/* Content overlays the canvas */}
            <div className="z-10 flex w-full max-w-7xl flex-col items-start gap-8">

                <div className="flex flex-col gap-2">
                    <TextReveal
                        text="Creative Developer"
                        tag="h2"
                        className="text-lg font-medium uppercase tracking-widest text-[#7c6aff] sm:text-xl"
                        delay={0.1}
                    />
                    <TextReveal
                        text={"Building digital\nexperiences that\ninspire."}
                        tag="h1"
                        className="text-5xl font-bold leading-[1.1] tracking-tighter text-zinc-50 sm:text-7xl md:text-8xl lg:text-9xl"
                        delay={0.3}
                    />
                </div>

                <div className="hero-line mt-8 h-[1px] w-full max-w-md bg-zinc-800" />

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <button
                        data-cursor="hover"
                        className="hero-cta group relative flex h-14 w-fit items-center justify-center overflow-hidden rounded-full bg-[#7c6aff] px-8 text-lg font-medium text-white transition-all hover:bg-[#6b5ae0]"
                    >
                        <span className="relative z-10">See my work</span>
                        {/* Button sweep effect */}
                        <div className="absolute inset-0 z-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full" />
                    </button>

                    <a
                        href="#contact"
                        data-cursor="hover"
                        className="hero-cta text-zinc-400 transition-colors hover:text-white"
                    >
                        Let&apos;s talk <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>

                <div className="hero-fade absolute bottom-8 left-6 sm:left-12 lg:left-24">
                    <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
                        Scroll to explore
                    </p>
                </div>

            </div>
        </section>
    );
}
