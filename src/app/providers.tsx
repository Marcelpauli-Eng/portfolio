"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register custom GSAP plugins here if needed
if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP);
}

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    // Global Setup / Lenis smooth scrolling could go here in the future.

    return (
        <>
            {children}
        </>
    );
}
