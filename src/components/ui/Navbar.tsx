"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
    const { t, language, toggleLanguage } = useLanguage();

    return (
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-10 py-5 z-[999] bg-transparent text-white font-medium text-sm">

            {/* 1. Bloque Izquierdo (Logo/Dominio) */}
            <div className="z-10">
                <Link href="/" className="font-semibold tracking-wide lowercase hover:text-gray-300 transition-colors">
                    marcel.dev
                </Link>
            </div>

            {/* 2. Bloque Central (Contacto Directo) - Oculto en móviles */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                <a
                    href="mailto:hello@marcel.dev"
                    className="lowercase hover:text-gray-300 transition-colors"
                >
                    hello@marcel.dev
                </a>
            </div>

            {/* 3. Bloque Derecho (Enlaces de Navegación + i18n Toggler) */}
            <div className="z-10 bg-black/20 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none px-4 py-2 md:p-0 rounded-full border border-white/5 md:border-transparent">
                <ul className="flex items-center gap-4 md:gap-8">
                    <li className="cursor-pointer hover:text-gray-400 transition-colors tracking-widest text-[10px] md:text-sm uppercase hidden sm:block">
                        <Link href="#about">{t("nav.about")}</Link>
                    </li>
                    <li className="cursor-pointer hover:text-gray-400 transition-colors tracking-widest text-[10px] md:text-sm uppercase hidden sm:block">
                        <Link href="#work">{t("nav.work")}</Link>
                    </li>
                    <li className="cursor-pointer hover:text-gray-400 transition-colors tracking-widest text-[10px] md:text-sm uppercase hidden sm:block">
                        <Link href="#contact">{t("nav.contact")}</Link>
                    </li>

                    {/* Botón i18n Toggle */}
                    <li className="flex items-center">
                        <button
                            onClick={toggleLanguage}
                            className="text-[10px] md:text-xs font-semibold py-1 px-3 border border-zinc-700/50 hover:border-purple-500 rounded-full transition-colors text-zinc-300 hover:text-white"
                        >
                            {language === "en" ? "ES" : "EN"}
                        </button>
                    </li>
                </ul>
            </div>

        </nav>
    );
}
