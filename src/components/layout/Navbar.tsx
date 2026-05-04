"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Enquiry", href: "/enquiry" },
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <nav
            className="fixed top-0 left-0 w-full z-[70] bg-transparent border-b border-transparent"
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
                        src={isOpen ? "/logo.jpg" : "/logo-white.png"}
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
                    <span className={`font-heading font-bold text-lg md:text-xl tracking-[-0.02em] transition-colors duration-300 ${isOpen ? "text-black" : "text-white"}`}>
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
                                        ? "text-white"
                                        : "text-white/60 group-hover:text-white"
                                }`}
                            >
                                {link.name}
                            </span>

                            {/* Active underline */}
                            {isActive(link.href) && (
                                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white" />
                            )}

                            {/* Hover underline animation */}
                            {!isActive(link.href) && (
                                <span className="absolute -bottom-1 left-0 h-[2px] bg-white w-0 group-hover:w-full transition-all duration-300 ease-out" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`md:hidden relative z-[70] p-2 transition-colors duration-300 ${isOpen ? "text-black" : "text-white"}`}
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

