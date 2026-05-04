"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
    {
        id: "railway-sleeper-inspection",
        title: "Railway Sleeper Gauges",
        description:
            "Precision inspection gauges for dimensional measurement and track geometry of railway sleepers.",
    },
    {
        id: "civil-material-testing",
        title: "Civil Material Testing",
        description:
            "Comprehensive lab equipment for cement, concrete, soil, bitumen, and geotechnical testing.",
    },
    {
        id: "industrial-safety-ppe",
        title: "Industrial Safety Equipment",
        description:
            "Premium personal protective equipment — helmets, harnesses, respirators, and safety gear.",
    },
    {
        id: "surveying-field-monitoring",
        title: "Surveying & Monitoring",
        description:
            "Total stations, auto levels, laser distance meters, and precision field instruments.",
    },
];

export default function OrbitalCategories() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // Each card gets a base angle offset (evenly spaced around 360°)
    const cardCount = categories.length;
    const angleStep = 360 / cardCount;

    return (
        <section ref={sectionRef} className="relative md:h-[400vh]">
            
            {/* =========================================
                DESKTOP VIEW (Sticky Orbital Animation)
               ========================================= */}
            <div className="hidden md:flex sticky top-0 h-screen items-center justify-center overflow-hidden">
                {/* Section label */}
                <motion.div
                    className="absolute top-24 left-0 right-0 text-center z-10 px-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
                        What We Do
                    </span>
                    <h2 className="font-heading text-5xl lg:text-[56px] font-bold tracking-[-0.03em] leading-[1.1] mt-2 break-words">
                        Our Expertise
                    </h2>
                </motion.div>

                {/* Central logo with perfect centering inside circles */}
                <div className="relative z-10 w-44 h-44 md:w-56 md:h-56">
                    {/* Outer Rings */}
                    <div className="absolute inset-0 rounded-full border border-neutral-200/60" />
                    <div className="absolute inset-[-40px] rounded-full border border-neutral-100/40" />

                    {/* Centered Logo container */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] z-[5]"
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0.3, 1, 1, 0.3]) }}
                    >
                        <Image
                            src="/logo.jpg"
                            alt="Archit Associates"
                            fill
                            className="object-contain"
                            style={{ filter: "brightness(0) saturate(100%)" }}
                        />
                    </motion.div>
                </div>

                {/* Desktop orbiting cards */}
                {categories.map((cat, i) => (
                    <OrbitalCard
                        key={cat.id}
                        category={cat}
                        index={i}
                        total={cardCount}
                        angleOffset={i * angleStep}
                        scrollProgress={scrollYProgress}
                    />
                ))}
            </div>

            {/* =========================================
                MOBILE & TABLET VIEW (Responsive Grid)
               ========================================= */}
            <div className="md:hidden container mx-auto px-4 sm:px-6 py-16">
                {/* Mobile Section Label */}
                <div className="text-center mb-8 px-2 relative z-10">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
                        What We Do
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-[-0.03em] leading-[1.1] mt-2 break-words">
                        Our Expertise
                    </h2>
                </div>

                {/* Mobile Logo Circle */}
                <div className="relative mx-auto mb-10 w-28 h-28 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-neutral-200/60 z-0" />
                    <div className="absolute inset-[-20px] rounded-full border border-neutral-100/40 z-0 opacity-50" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] z-[5]">
                        <Image
                            src="/logo.jpg"
                            alt="Archit Associates"
                            fill
                            className="object-contain"
                            style={{ filter: "brightness(0) saturate(100%)" }}
                        />
                    </div>
                </div>

                {/* Responsive Grid replacing absolute positioning */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {categories.map((cat, i) => (
                        <MobileCard key={cat.id} category={cat} index={i} />
                    ))}
                </div>
            </div>

        </section>
    );
}

/* ─────────────── Desktop Orbital Card ─────────────── */

interface OrbitalCardProps {
    category: (typeof categories)[number];
    index: number;
    total: number;
    angleOffset: number;
    scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function OrbitalCard({
    category,
    index,
    total,
    angleOffset,
    scrollProgress,
}: OrbitalCardProps) {
    // Orbital radius
    const radiusX = 340;
    const radiusY = 220;

    // The scroll drives a full rotation. Each card starts at its offset angle.
    // scrollYProgress 0→1 maps to 0→360° of rotation
    const rotation = useTransform(
        scrollProgress,
        [0, 1],
        [angleOffset, angleOffset + 360]
    );

    // Calculate x, y position from angle
    const x = useTransform(rotation, (angle) => {
        const rad = (angle * Math.PI) / 180;
        return Math.cos(rad) * radiusX;
    });

    const y = useTransform(rotation, (angle) => {
        const rad = (angle * Math.PI) / 180;
        return Math.sin(rad) * radiusY;
    });

    // Cards at the "front" (bottom of orbit, angle near 270°) should be active
    // Use sin to determine depth: sin(angle) = 1 means bottom = front
    const depthFactor = useTransform(rotation, (angle) => {
        const rad = (angle * Math.PI) / 180;
        return Math.sin(rad); // -1 to 1; 1 = bottom/front
    });

    const scale = useTransform(depthFactor, [-1, 0, 1], [0.75, 0.9, 1.08]);
    const opacity = useTransform(depthFactor, [-1, -0.3, 0.3, 1], [0.2, 0.45, 0.7, 1]);
    const zIndex = useTransform(depthFactor, [-1, 1], [0, 40]);
    const cardRotateY = useTransform(depthFactor, [-1, 0, 1], [25, 8, 0]);
    const blur = useTransform(depthFactor, [-1, 0, 1], [4, 1, 0]);

    return (
        <motion.div
            className="absolute left-1/2 top-1/2 w-[280px]"
            style={{
                x: useTransform(x, (v) => v - 140), // center card (w/2 = 140)
                y: useTransform(y, (v) => v - 80),
                scale,
                opacity,
                zIndex: useTransform(zIndex, (v) => Math.round(v)),
                rotateY: cardRotateY,
                filter: useTransform(blur, (v) => `blur(${v}px)`),
            }}
        >
            <Link
                href={`/products/${category.id}`}
                className="block group"
            >
                <div
                    className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
                    style={{ perspective: "600px" }}
                >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400 block mb-2">
                        Category
                    </span>
                    <h3 className="font-heading text-xl font-bold tracking-[-0.02em] text-neutral-900 mb-2 leading-snug">
                        {category.title}
                    </h3>
                    <div className="w-8 h-px bg-neutral-200 mb-3" />
                    <p className="text-[14px] text-neutral-900/55 leading-[1.6] mb-4">
                        {category.description}
                    </p>
                    <span className="flex items-center text-[12px] font-medium uppercase tracking-wider text-neutral-400 group-hover:text-neutral-900 transition-colors">
                        Explore
                        <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}

/* ─────────────── Mobile Card ─────────────── */

function MobileCard({
    category,
    index,
}: {
    category: (typeof categories)[number];
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            viewport={{ once: true, margin: "-50px" }}
        >
            <Link
                href={`/products/${category.id}`}
                className="block group"
            >
                <div className="bg-white border border-neutral-200 rounded-xl p-5 hover:shadow-md transition-all duration-300">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400 block mb-1.5">
                        Category
                    </span>
                    <h3 className="font-heading text-lg font-bold tracking-[-0.015em] text-neutral-900 mb-1 leading-snug">
                        {category.title}
                    </h3>
                    <p className="text-[13px] text-neutral-900/55 leading-[1.6]">
                        {category.description}
                    </p>
                    <span className="flex items-center text-[11px] font-medium uppercase tracking-wider text-neutral-400 group-hover:text-neutral-900 transition-colors mt-3">
                        Explore
                        <ArrowRight className="ml-1.5 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}
