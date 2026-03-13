"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface TextRevealProps {
    text: string;
    tag?: "h1" | "h2" | "h3" | "p";
    delay?: number;
    className?: string;
    duration?: number;
}

export function TextReveal({
    text,
    tag: Tag = "p",
    delay = 0,
    className = "",
    duration = 1,
}: TextRevealProps) {
    const containerRef = useRef<HTMLElement>(null);

    // Split text by standard newline \n
    const lines = text.split("\n");

    useGSAP(
        () => {
            if (!containerRef.current) return;

            const lineElements = gsap.utils.toArray<HTMLElement>(".reveal-line");

            gsap.fromTo(
                lineElements,
                {
                    yPercent: 120,
                    rotateZ: 4,
                    opacity: 0,
                },
                {
                    yPercent: 0,
                    rotateZ: 0,
                    opacity: 1,
                    duration: duration,
                    ease: "power4.out",
                    stagger: 0.12,
                    delay: delay,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        // toggleActions: "play none none reverse", // Optional: reverse on scroll up
                    },
                }
            );
        },
        { scope: containerRef }
    );

    return (
        // @ts-expect-error - Dynamic tag ref mismatch
        <Tag ref={containerRef} className={className}>
            {lines.map((line, index) => (
                <span
                    key={index}
                    className="block overflow-hidden pb-1" // pb-1 helps with descending letters like g, p, y
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <span className="reveal-line block origin-top-left will-change-transform">
                        {line}
                    </span>
                </span>
            ))}
        </Tag>
    );
}
