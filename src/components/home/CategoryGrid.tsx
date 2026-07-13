"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productCatalog } from "@/data/productCatalog";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function CategoryGrid() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const cards = Array.from(
            grid.querySelectorAll<HTMLElement>(".solution-card")
        );

        // Keep track of all pending stagger timeouts so we can cancel them on unmount
        const timeoutIds: ReturnType<typeof setTimeout>[] = [];

        // Reveal once and stay revealed — avoids cards getting stuck mid-fade
        // if the user scrolls back and forth across the section boundary.
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        cards.forEach((card, i) => {
                            const id = setTimeout(() => {
                                card.classList.add("solution-card--visible");
                            }, i * 130); // ~130ms stagger
                            timeoutIds.push(id);
                        });
                        observer.disconnect();
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(grid);

        return () => {
            observer.disconnect();
            timeoutIds.forEach(clearTimeout);
        };
    }, []);

    return (
        <>
            <style>{`
                /* Hidden initial state */
                .solution-card {
                    opacity: 0;
                    transform: translateY(40px);
                    transition:
                        opacity 560ms cubic-bezier(0.22, 1, 0.36, 1),
                        transform 560ms cubic-bezier(0.22, 1, 0.36, 1),
                        box-shadow 300ms ease,
                        border-color 300ms ease;
                    will-change: opacity, transform;
                }

                /* Revealed state */
                .solution-card--visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* Preserve hover lift after reveal */
                .group:hover .solution-card--visible {
                    transform: translateY(-4px);
                }
            `}</style>

            <section className="py-16 md:py-32 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col mb-16 md:mb-20 gap-4">
                        <h2 className="font-heading text-4xl md:text-5xl lg:text-[48px] font-bold tracking-[-0.025em] leading-[1.1]">
                            Our Solutions
                        </h2>
                        <p className="text-neutral-900/60 max-w-2xl text-[16px] leading-[1.65]">
                            Comprehensive range of industrial spares, laboratory equipment, and machinery designed for durability and performance.
                        </p>
                    </div>

                    <div
                        ref={gridRef}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10"
                    >
                        {productCatalog.map((category) => (
                            <Link
                                href={`/products/${category.id}`}
                                key={category.id}
                                className="group block"
                            >
                                <div className="solution-card relative h-full bg-white border border-neutral-200/80 rounded-[14px] p-6 pl-8 md:p-9 md:pl-10 cursor-pointer hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] hover:border-neutral-300">
                                    {/* Left accent line */}
                                    <div className="absolute left-0 top-6 bottom-6 md:top-8 md:bottom-8 w-[3px] rounded-full bg-neutral-200 group-hover:bg-neutral-900 transition-colors duration-300" />

                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-300">
                                            Category
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all duration-300" />
                                    </div>

                                    <h3 className="font-heading text-[22px] font-bold text-neutral-900 mb-3 leading-[1.25] tracking-[-0.02em]">
                                        {category.title}
                                    </h3>

                                    <div className="w-8 h-px bg-neutral-200 mb-4" />

                                    <p className="text-neutral-900/55 text-[15px] leading-[1.7]">
                                        {category.description}
                                    </p>

                                    {/* Category preview image — first product image of the category */}
                                    {(() => {
                                        const previewImg = category.subcategories?.[0]?.products?.[0]?.image;
                                        return previewImg ? (
                                            <CategoryPreviewImage src={previewImg} alt={category.title} />
                                        ) : null;
                                    })()}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

/* ── Category preview image with graceful error fallback ── */
function CategoryPreviewImage({ src, alt }: { src: string; alt: string }) {
    const [imgSrc, setImgSrc] = useState<string | null>(src);
    if (!imgSrc) return null;
    return (
        <div className="relative w-full h-36 mt-5 rounded-lg overflow-hidden border border-neutral-100" style={{ backgroundColor: "#f5f5f5" }}>
            <Image
                src={imgSrc}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={80}
                loading="lazy"
                placeholder="empty"
                className="object-contain p-3"
                onError={() => setImgSrc(null)}
            />
        </div>
    );
}
