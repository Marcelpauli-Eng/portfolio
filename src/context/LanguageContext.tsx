"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "es";

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        "nav.about": "About",
        "nav.work": "Work",
        "nav.contact": "Contact",

        "hero.hello": "Hello! I'm",
        "hero.name": "MARCEL",
        "hero.creative": "A Creative",
        "hero.designer": "DESIGNER",
        "hero.developer": "DEVELOPER",

        "about.heading.1": "About",
        "about.heading.2": "Me",
        "about.desc": "I’m a Computer Engineering student and developer passionate about turning ideas into real businesses. When I’m not designing software architectures or writing code, you’ll find me outdoors, playing sports, or skiing. I love combining solid engineering with an entrepreneurial mindset to build digital products that are both beautiful and functional.",

        "exp.title.1": "My career &",
        "exp.title.2": "experience",

        "exp.1.role": "Microcomputer Systems and Networks (VET)",
        "exp.1.company": "Escola Ginebró",
        "exp.1.desc": "Solidified technical foundations in hardware configuration, operating systems administration and deployment, security, and management of local networks and enterprise infrastructures.",

        "exp.2.role": "Web and Mobile Application Development (Higher VET)",
        "exp.2.company": "Escola Ginebró",
        "exp.2.desc": "Specialized training in full-stack programming. Focused on developing interactive interfaces, database management, and creating modern digital products for web platforms and mobile devices.",

        "exp.3.role": "Bachelor's Degree in Computer Engineering",
        "exp.3.company": "Universitat de Girona",
        "exp.3.desc": "Currently in my third year. Expanding my knowledge in software architecture, advanced databases, network protocols, and the design of complex systems oriented towards high performance.",


        "work.title.1": "My",
        "work.title.2": "Work",

        "work.1.desc": "A comprehensive oddsmatcher with real-time data filtering, dynamic search, and optimized api ingestion for instantaneous updates.",
        "work.2.desc": "A high-performance interactive 3D store with seamless checkout, dynamic cart animations, and a customized premium user flow.",
        "work.3.desc": "Interactive 3D web experience for creative artists with custom shaders, immersive scrolling mechanics, and premium micro-interactions.",

        "work.tools_features": "Tools & features",
        "work.placeholder": "Image / Mockup Placeholder",

        "tech.title.1": "MY TECH",
        "tech.title.2": "STACK",
        "tech.interact.1": "Interact",
        "tech.interact.2": "with them",
        "tech.bump": "Hover to bump the physics objects.",

        "footer.contact": "CONTACT",
        "footer.email": "Email",
        "footer.location": "Location",
        "footer.location_value": "Barcelona, Spain",
        "footer.social": "Social",
        "footer.credits": "Designed and Developed by",
    },
    es: {
        "nav.about": "Sobre mí",
        "nav.work": "Proyectos",
        "nav.contact": "Contacto",

        "hero.hello": "¡Hola! Soy",
        "hero.name": "MARCEL",
        "hero.creative": "Un Creativo",
        "hero.designer": "DISEÑADOR",
        "hero.developer": "DESARROLLADOR",

        "about.heading.1": "Sobre",
        "about.heading.2": "Mí",
        "about.desc": "Soy un estudiante de Ingeniería Informática y desarrollador apasionado por convertir ideas en negocios reales. Cuando no estoy diseñando arquitecturas de software o escribiendo código, me encontrarás al aire libre, haciendo deporte o esquiando. Me encanta combinar una ingeniería sólida con una mentalidad emprendedora para construir productos digitales que sean tanto hermosos como funcionales.",

        "exp.title.1": "Mi carrera y",
        "exp.title.2": "experiencia",

        "exp.1.role": "Grado Medio en Sistemas Microinformáticos y Redes",
        "exp.1.company": "Escola Ginebró",
        "exp.1.desc": "Consolidación de bases técnicas en configuración de hardware, administración de sistemas operativos y despliegue, seguridad y gestión de redes locales e infraestructuras empresariales.",

        "exp.2.role": "Grado Superior en Desarrollo de Aplicaciones Web y Móviles",
        "exp.2.company": "Escola Ginebró",
        "exp.2.desc": "Formación especializada en programación full-stack. Desarrollo de interfaces interactivas, bases de datos y creación de productos digitales modernos para plataformas web y dispositivos móviles.",

        "exp.3.role": "Grado en Ingeniería Informática",
        "exp.3.company": "Universitat de Girona",
        "exp.3.desc": "Actualmente cursando el tercer año. Ampliando mis conocimientos en arquitectura de software, bases de datos, redes y diseño de sistemas complejos orientados al alto rendimiento.",


        "work.title.1": "Mis",
        "work.title.2": "Proyectos",

        "work.1.desc": "Un oddsmatcher integral con filtrado de datos en tiempo real, búsqueda dinámica e ingesta de API optimizada para actualizaciones instantáneas.",
        "work.2.desc": "Una tienda 3D interactiva de alto rendimiento con pago fluido, animaciones de carrito dinámicas y un flujo de usuario premium personalizado.",
        "work.3.desc": "Experiencia web 3D interactiva para artistas creativos con shaders a medida, mecánicas de scroll inmersivas y microinteracciones premium.",

        "work.tools_features": "Herramientas y características",
        "work.placeholder": "Placeholder de Imagen / Mockup",

        "tech.title.1": "MI TECH",
        "tech.title.2": "STACK",
        "tech.interact.1": "Interactúa",
        "tech.interact.2": "con ellas",
        "tech.bump": "Pasa el ratón para golpear los objetos físicos.",

        "footer.contact": "CONTACTO",
        "footer.email": "Correo",
        "footer.location": "Ubicación",
        "footer.location_value": "Barcelona, España",
        "footer.social": "Redes",
        "footer.credits": "Diseñado y Desarrollado por",
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");
    const [mounted, setMounted] = useState(false);

    // Persistir en localStorage
    useEffect(() => {
        setMounted(true);
        try {
            const savedLang = localStorage.getItem("portfolio_lang") as Language;
            // Also check user's browser default if no local storage is present
            if (savedLang && (savedLang === "en" || savedLang === "es")) {
                setLanguage(savedLang);
            } else {
                const browserLang = navigator.language.startsWith("es") ? "es" : "en";
                setLanguage(browserLang);
            }
        } catch (e) {
            console.error("Could not fetch language from local storage", e);
        }
    }, []);

    const toggleLanguage = () => {
        const newLang = language === "en" ? "es" : "en";
        setLanguage(newLang);
        try {
            localStorage.setItem("portfolio_lang", newLang);
        } catch (e) {
            console.error("Could not write language to local storage", e);
        }
    };

    const t = (key: string) => {
        if (!mounted) return translations["en"][key as keyof typeof translations["en"]] || key;
        return translations[language][key as keyof typeof translations["en"]] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within LanguageProvider");
    return context;
}
