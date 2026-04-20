"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { productCatalog } from "@/data/productCatalog";

export default function CategoryGrid() {
    return (
        <section className="py-24 md:py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-[48px] font-bold tracking-[-0.025em] leading-[1.1]">Our Solutions</h2>
                    <p className="text-neutral-900/55 max-w-md md:text-right text-[15px] leading-[1.7]">
                        Comprehensive range of industrial spares and machinery equipment designed for durability and performance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8 lg:gap-10">
                    {productCatalog.map((category, index) => (
                        <Link href={`/products/${category.id}`} key={category.id} className="group block">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.07 }}
                                viewport={{ once: true }}
                                className="relative h-full bg-white border border-neutral-200/80 rounded-[14px] p-8 md:p-9 pl-9 md:pl-10 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] hover:border-neutral-300"
                            >
                                {/* Left accent line */}
                                <div className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full bg-neutral-200 group-hover:bg-neutral-900 transition-colors duration-300" />

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
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
