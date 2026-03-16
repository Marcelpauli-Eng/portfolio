import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { GSAPProvider } from "@/components/providers/GSAPProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { Cursor } from "@/components/ui/Cursor";
import Navbar from "@/components/ui/Navbar";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark lenis lenis-smooth">
      <head>
        <script type="module" src="https://unpkg.com/@splinetool/viewer@1.12.69/build/spline-viewer.js"></script>
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased selection:bg-[#7c6aff] selection:text-white`}
      >
        <LanguageProvider>
          <SmoothScrollProvider>
            <GSAPProvider>
              {/* Contenedor Global de Resplandores (Optimizado sin blur) */}
              <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[var(--color-bg)] transform-gpu">
                {/* Capa de Ruido (Texture) - Ajustada para fondo claro */}
                <div className="absolute inset-0 opacity-[0.2] mix-blend-multiply pointer-events-none z-50">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilter">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                      />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                  </svg>
                </div>

                {/* Glow Superior Izquierdo (Rojo Suave) */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-100/50 via-red-50/10 to-transparent rounded-full transform-gpu will-change-transform"></div>

                {/* Glow Inferior Derecho (Rojo Suave) */}
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-200/30 via-red-100/5 to-transparent rounded-full transform-gpu will-change-transform"></div>
              </div>

              <Cursor />
              <Navbar />
              {children}
            </GSAPProvider>
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
