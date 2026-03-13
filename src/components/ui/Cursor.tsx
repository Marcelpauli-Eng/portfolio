"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const isHovering = useRef(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Use quickTo for high performance trailing/lag effect
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

        // QuickSetters for opacity


        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        const addHoverEffect = () => {
            isHovering.current = true;
            gsap.to(cursor, {
                scale: 1.5,
                duration: 0.3,
                ease: "power2.out",
                backgroundColor: 'rgba(255, 240, 255, 0.4)' // Very soft whitish-pink on hover
            });
        };

        const removeHoverEffect = () => {
            isHovering.current = false;
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
                backgroundColor: 'rgba(255, 245, 255, 0.8)' // Whitish pearl base
            });
        };

        window.addEventListener("mousemove", onMouseMove);

        // Attach hover effects to all links and buttons
        const attachHoverEvents = () => {
            const interactables = document.querySelectorAll("a, button, input, [data-cursor='hover']");
            interactables.forEach((el) => {
                el.addEventListener("mouseenter", addHoverEffect);
                el.addEventListener("mouseleave", removeHoverEffect);
            });
        };

        attachHoverEvents();

        // Small delay to ensure initial setup is clean
        gsap.set(cursor, { opacity: 1, delay: 0.2 });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            const interactables = document.querySelectorAll("a, button, input, [data-cursor='hover']");
            interactables.forEach((el) => {
                el.removeEventListener("mouseenter", addHoverEffect);
                el.removeEventListener("mouseleave", removeHoverEffect);
            });
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="pointer-events-none fixed top-0 left-0 z-50 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 shadow-sm hidden md:block"
            style={{
                backgroundColor: "rgba(255, 245, 255, 0.8)",
                boxShadow: "0 0 10px rgba(255, 240, 255, 0.6), 0 0 20px rgba(217, 70, 239, 0.15)"
            }}
        />
    );
}
