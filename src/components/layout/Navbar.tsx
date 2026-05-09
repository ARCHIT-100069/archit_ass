"use client";

import Link from "next/link";
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
        <nav
            className={`fixed top-0 left-0 w-full z-[70] border-b transition-all duration-300 ${
                isDarkTheme 
                    ? "bg-transparent border-transparent" 
                    : "bg-white/90 backdrop-blur-md border-neutral-200 shadow-sm"
            }`}
            style={{ height: "76px" }}
        >
            <div className="container mx-auto px-4 md:px-6 h-full flex justify-between items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="relative flex items-center gap-2.5 z-[70] group cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/";
                    }}
                >
                    <img
                        src={isDarkTheme ? "/logo-white.png" : "/logo.jpg"}
                        alt="Archit Associates Logo"
                        className="h-[34px] w-[34px] md:h-[38px] md:w-[38px] object-contain transition-colors duration-300"
                        style={{
                            background: 'transparent',
                            border: 'none',
                            boxShadow: 'none',
                            padding: 0,
                            margin: 0,
                            borderRadius: 0,
                            outline: 'none',
                        }}
                    />
                    <span className={`font-heading font-bold text-lg md:text-xl tracking-[-0.02em] transition-colors duration-300 ${isDarkTheme ? "text-white" : "text-black"}`}>
                        Archit Associates
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative group"
                            onClick={(e) => {
                                if (link.href === "/") {
                                    e.preventDefault();
                                    window.location.href = "/";
                                }
                            }}
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
                                <span className={`absolute -bottom-1 left-0 w-full h-[2px] ${isDarkTheme ? "bg-white" : "bg-black"}`} />
                            )}

                            {/* Hover underline animation */}
                            {!isActive(link.href) && (
                                <span className={`absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 ease-out ${isDarkTheme ? "bg-white" : "bg-black"}`} />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`md:hidden relative z-[70] p-2 transition-colors duration-300 ${isDarkTheme ? "text-white" : "text-black"}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center space-y-8"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-2xl tracking-wide transition-colors ${
                                        isActive(link.href)
                                            ? "font-semibold text-black border-b-2 border-black pb-1"
                                            : "font-light text-gray-600 hover:text-black"
                                    }`}
                                    onClick={(e) => {
                                        setIsOpen(false);
                                        if (link.href === "/") {
                                            e.preventDefault();
                                            window.location.href = "/";
                                        }
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}

