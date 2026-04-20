"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";

interface Product {
    id: string;
    name: string;
    shortDescription: string;
    image?: string;
    specifications: string[];
}

export default function ProductCard({ product }: { product: Product }) {
    const [imageSrc, setImageSrc] = useState(product.image || "/product-placeholder.svg");

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="group bg-neutral-50 p-6 md:p-8 hover:bg-white border border-transparent hover:border-neutral-200 transition-all duration-300 hover:shadow-sm flex flex-col justify-between h-full cursor-pointer"
        >
            <div className="relative w-full h-48 mb-4 bg-white rounded-lg overflow-hidden border border-neutral-100">
                <Image
                    src={imageSrc}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    onError={() => setImageSrc("/product-placeholder.svg")}
                />
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-black transition-colors tracking-[-0.015em]">
                    {product.name}
                </h3>
                <p className="text-[15px] text-neutral-900/60 mb-4 leading-[1.65] line-clamp-2">
                    {product.shortDescription}
                </p>

                {/* Specs Preview */}
                <div className="space-y-1 mb-6">
                    {product.specifications.slice(0, 2).map((spec, i) => (
                        <p key={i} className="text-xs text-neutral-400 font-mono border-l-2 border-neutral-200 pl-2">
                            {spec}
                        </p>
                    ))}
                </div>
            </div>

            <div className="flex justify-end border-t border-neutral-100 pt-4">
                <span className="flex items-center text-xs font-medium uppercase tracking-wider text-neutral-400 group-hover:text-black transition-colors">
                    View Details <Plus className="ml-2 w-4 h-4 text-neutral-300 group-hover:text-black transition-colors" />
                </span>
            </div>
        </motion.div>
    );
}
