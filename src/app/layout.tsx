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
        <script type="module" src="https://unpkg.com/@splinetool/viewer@1.12.68/build/spline-viewer.js"></script>
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased selection:bg-[#7c6aff] selection:text-white`}
      >
        <LanguageProvider>
          <SmoothScrollProvider>
            <GSAPProvider>
              {/* Contenedor Global de Resplandores (Optimizado sin blur) */}
              <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-black transform-gpu">
                {/* Glow Superior Izquierdo */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-purple-900/5 to-transparent rounded-full transform-gpu will-change-transform"></div>

                {/* Glow Inferior Derecho */}
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-800/30 via-purple-800/5 to-transparent rounded-full transform-gpu will-change-transform"></div>
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
