"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">

            {/* Background Video — lowest layer */}
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster="/logo.jpg"
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Dark Gradient Overlay — middle layer */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/55 via-black/45 to-black/60" />

            {/* Centered Hero Content — top layer */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 md:px-8 w-full">

                {/* Logo — transparent white PNG, no CSS hacks */}
                <motion.div
                    className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 mb-4"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                >
                    <Image
                        src="/logo-white.png"
                        alt="Archit Associates Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </motion.div>

                {/* Heading */}
                <motion.h1
                    className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-[80px] font-bold tracking-[-0.03em] text-white mt-2 mb-5 text-center leading-[1.05] drop-shadow-lg"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
                >
                    Archit Associates
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed tracking-wide text-center drop-shadow-md"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.9, ease: "easeOut" }}
                >
                    Engineering Excellence. Premium Industrial Solutions.
                </motion.p>
            </div>

        </section>
    );
}
