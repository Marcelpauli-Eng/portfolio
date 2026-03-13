import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-6 text-white font-medium text-sm z-50 bg-transparent">

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

            {/* 3. Bloque Derecho (Enlaces de Navegación) */}
            <div className="z-10">
                <ul className="flex items-center gap-8">
                    <li className="cursor-pointer hover:text-gray-400 transition-colors tracking-widest text-xs md:text-sm uppercase">
                        <Link href="#about">About</Link>
                    </li>
                    <li className="cursor-pointer hover:text-gray-400 transition-colors tracking-widest text-xs md:text-sm uppercase">
                        <Link href="#work">Work</Link>
                    </li>
                    <li className="cursor-pointer hover:text-gray-400 transition-colors tracking-widest text-xs md:text-sm uppercase">
                        <Link href="#contact">Contact</Link>
                    </li>
                </ul>
            </div>

        </nav>
    );
}
