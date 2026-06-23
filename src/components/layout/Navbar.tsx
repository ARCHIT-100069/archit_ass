"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        // Set initial state
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Request Quote", href: "/request-quote" },
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    // If on homepage and not scrolled, text is white to contrast with video.
    // Otherwise (scrolled or on other pages), text is black.
    const isDarkTheme = pathname === "/" && !scrolled && !isOpen;

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-[70] transition-all duration-300 ${
                    isOpen || !isDarkTheme
                        ? "bg-white/90 backdrop-blur-md border-neutral-200 border-b shadow-sm"
                        : "bg-transparent border-transparent"
                }`}
            >
                <div className="container mx-auto px-4 md:px-6 h-[76px] flex justify-between items-center w-full relative">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="relative flex items-center gap-2.5 z-[80] group cursor-pointer max-w-[75%]"
                       onClick={() => {
    if (isOpen) setIsOpen(false);
}}
                    >
                        <div className="relative flex items-center h-[34px] md:h-[40px]">
                            <Image
                                src="https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/customer-logos/ARCHIT_ASS_LOGO.jpg"
                                alt="Archit Associates Logo"
                                width={180}
                                height={40}
                                priority
                                className="h-full w-auto object-contain transition-all duration-300"
                                style={{ filter: !isOpen && isDarkTheme ? "none" : "invert(1)" }}
                            />
                        </div>
                        <span className={`font-heading font-bold text-[17px] md:text-xl tracking-[-0.02em] transition-colors duration-300 truncate ${!isOpen && isDarkTheme ? "text-white" : "text-black"}`}>
                            Archit Associates
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative group min-h-[48px] flex items-center"
                               onClick={() => {}}
                            >
                                <span
                                    className={`text-[15px] font-medium tracking-wide transition-colors duration-200 ${
                                        isActive(link.href)
                                            ? (isDarkTheme ? "text-white" : "text-black")
                                            : (isDarkTheme ? "text-white/70 group-hover:text-white" : "text-black/60 group-hover:text-black")
                                    }`}
                                >
                                    {link.name}
                                </span>

                                {/* Active underline */}
                                {isActive(link.href) && (
                                    <span className={`absolute bottom-2 left-0 w-full h-[2px] ${isDarkTheme ? "bg-white" : "bg-black"}`} />
                                )}

                                {/* Hover underline animation */}
                                {!isActive(link.href) && (
                                    <span className={`absolute bottom-2 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 ease-out ${isDarkTheme ? "bg-white" : "bg-black"}`} />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden relative z-[80] p-2 flex items-center justify-center min-h-[48px] min-w-[48px] transition-colors duration-300 ${!isOpen && isDarkTheme ? "text-white" : "text-black"}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay - rendered outside nav to avoid backdrop-filter issues */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-white z-[65] flex flex-col items-center justify-center space-y-4 px-4 w-full h-[100dvh]"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-2xl tracking-wide transition-colors w-full text-center py-4 min-h-[48px] flex items-center justify-center ${
                                    isActive(link.href)
                                        ? "font-semibold text-black"
                                        : "font-light text-gray-600 hover:text-black"
                                }`}
                                onClick={() => {
    setIsOpen(false);
}}
                            >
                                <span className={isActive(link.href) ? "border-b-2 border-black pb-1" : ""}>
                                    {link.name}
                                </span>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

