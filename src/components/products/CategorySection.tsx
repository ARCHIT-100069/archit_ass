"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SubCategorySection from "./SubCategorySection";

interface ProductItem {
    name: string;
}

interface SubCategory {
    title: string;
    products: ProductItem[];
}

interface CategorySectionProps {
    number: number;
    title: string;
    subcategories: SubCategory[];
    defaultOpen?: boolean;
}

export default function CategorySection({
    number,
    title,
    subcategories,
    defaultOpen = false,
}: CategorySectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const isFlat = subcategories.length === 1 && subcategories[0].title === "Products";

    const totalProducts = subcategories.reduce(
        (sum, sub) => sum + sub.products.length,
        0
    );

    return (
        <section className="mb-6">
            {/* Category Header — clickable toggle */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full group cursor-pointer"
            >
                <div className={`relative flex items-center justify-between gap-4 py-5 px-6 md:px-8 bg-white border rounded-lg transition-all duration-300 hover:shadow-md hover:scale-[1.005] ${isOpen ? "border-neutral-300 shadow-sm" : "border-neutral-200 hover:border-neutral-300"}`}>
                    {/* Left accent */}
                    <div className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full transition-colors duration-300 ${isOpen ? "bg-neutral-900" : "bg-neutral-300 group-hover:bg-neutral-900"}`} />

                    <div className="text-left min-w-0 pl-1">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
                            Category
                        </span>
                        <h2 className="font-heading text-xl md:text-2xl font-semibold tracking-[-0.02em] text-neutral-900 truncate mt-0.5">
                            {title}
                        </h2>
                        <div className="w-8 h-px bg-neutral-200 mt-2 mb-1.5" />
                        <p className="text-xs text-neutral-900/50">
                            {totalProducts} product{totalProducts !== 1 ? "s" : ""} ·{" "}
                            {isFlat
                                ? "View all"
                                : `${subcategories.length} subcategories`}
                        </p>
                    </div>

                    {/* Chevron */}
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0 p-1.5"
                    >
                        <ChevronDown className="w-5 h-5 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
                    </motion.div>
                </div>
            </button>

            {/* Expandable content */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6 pb-2 px-2 md:px-4">
                            {subcategories.map((sub) => (
                                <SubCategorySection
                                    key={sub.title}
                                    title={sub.title}
                                    products={sub.products}
                                    isFlat={isFlat}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
