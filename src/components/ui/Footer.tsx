import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-black text-white px-8 py-10 md:py-16 relative z-20">
            {/* Título Fino y Minimalista */}
            <h1 className="text-4xl md:text-5xl font-thin tracking-widest mb-12 uppercase">
                CONTACT
            </h1>

            {/* Estructura del Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Columna 1 (Email & Location) */}
                <div>
                    <div className="mb-10">
                        <p className="text-xs md:text-sm text-gray-400 mb-2 font-light uppercase tracking-widest">
                            Email
                        </p>
                        <a
                            href="mailto:connect@marcel.dev"
                            className="text-sm md:text-base font-light hover:text-purple-400 transition-colors duration-300 block"
                        >
                            connect@marcel.dev
                        </a>
                    </div>

                    <div>
                        <p className="text-xs md:text-sm text-gray-400 mb-2 font-light uppercase tracking-widest">
                            Location
                        </p>
                        <p className="text-sm md:text-base font-light">Barcelona, Spain</p>
                    </div>
                </div>

                {/* Columna 2 (Social Links) */}
                <div>
                    <p className="text-xs md:text-sm text-gray-400 mb-6 font-light uppercase tracking-widest">
                        Social
                    </p>
                    <ul className="flex flex-col w-full max-w-[200px]">
                        <li>
                            <Link
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex justify-between items-center w-full py-2 border-b border-gray-800 text-sm md:text-base font-light hover:text-purple-400 hover:border-purple-400 transition-all duration-300 group"
                            >
                                Github
                                <span className="transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300 text-xs">
                                    ↗
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex justify-between items-center w-full py-2 border-b border-gray-800 text-sm md:text-base font-light hover:text-purple-400 hover:border-purple-400 transition-all duration-300 group"
                            >
                                Linkedin
                                <span className="transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300 text-xs">
                                    ↗
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex justify-between items-center w-full py-2 border-b border-gray-800 text-sm md:text-base font-light hover:text-purple-400 hover:border-purple-400 transition-all duration-300 group"
                            >
                                Twitter
                                <span className="transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300 text-xs">
                                    ↗
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex justify-between items-center w-full py-2 border-b border-gray-800 text-sm md:text-base font-light hover:text-purple-400 hover:border-purple-400 transition-all duration-300 group"
                            >
                                Instagram
                                <span className="transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300 text-xs">
                                    ↗
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Columna 3 (Créditos & Copyright) */}
                <div className="flex flex-col md:items-end justify-between h-full min-h-[150px]">
                    <div className="text-left md:text-right">
                        <p className="text-xs md:text-sm font-light text-gray-400 leading-relaxed">
                            Designed and Developed by <br className="hidden md:block" />
                            <span className="text-purple-400 font-light">
                                Marcel Pauli Lara
                            </span>
                        </p>
                    </div>
                    <div className="mt-20 md:mt-auto text-left md:text-right">
                        <p className="text-xs md:text-sm font-light text-gray-500 uppercase tracking-widest">
                            © 2026
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
