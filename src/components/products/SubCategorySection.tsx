"use client";

import { motion } from "framer-motion";
import { Package, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugifyProduct } from "@/data/productCatalog";

interface ProductItem {
    name: string;
    image?: string;
}

interface SubCategorySectionProps {
    title: string;
    products: ProductItem[];
    isFlat?: boolean; // If true, skip subcategory heading (for categories 4-7 with generic "Products" title)
    categoryId?: string; // When set, cards link to the product detail page
}

function ProductCardMini({ product, index, categoryId }: { product: ProductItem; index: number; categoryId?: string }) {
    const [imgSrc, setImgSrc] = useState(product.image ?? null);
    const router = useRouter();

    const handleQuotation = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/request-quote?product=${encodeURIComponent(product.name)}`);
    };

    // Card click opens the product detail page when we know the category,
    // otherwise falls back to the quote form.
    const handleCardClick = () => {
        if (categoryId) {
            router.push(`/products/${categoryId}/${slugifyProduct(product.name)}`);
        } else {
            router.push(`/request-quote?product=${encodeURIComponent(product.name)}`);
        }
    };

    return (
        <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            viewport={{ once: true }}
            className="group relative bg-neutral-50 border border-neutral-100 hover:border-neutral-300 hover:bg-white rounded-lg p-6 transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col"
            onClick={handleCardClick}
        >
            {/* Thumbnail — shown only when image is available */}
            {imgSrc && (
                <div
                    className="relative w-full h-36 mb-4 rounded-md overflow-hidden border border-neutral-100"
                    style={{ backgroundColor: '#f5f5f5' }}
                >
                    <Image
                        src={imgSrc}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        quality={85}
                        loading="lazy"
                        placeholder="empty"
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        onError={() => setImgSrc(null)}
                    />
                </div>
            )}

            <div className="flex items-start gap-3">
                <div className="mt-0.5 p-2 rounded-md bg-neutral-100 group-hover:bg-neutral-900 transition-colors duration-300">
                    <Package className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-[15px] font-medium text-neutral-700 group-hover:text-black transition-colors leading-snug">
                        {product.name}
                    </h4>
                </div>
            </div>
            <div className="flex justify-end mt-3 pt-3 border-t border-neutral-100 group-hover:border-neutral-200 transition-colors z-10 relative">
                <button 
                    onClick={handleQuotation}
                    className="flex items-center text-[11px] font-medium uppercase tracking-wider text-neutral-400 group-hover:text-neutral-800 transition-colors"
                >
                    Request Quotation
                    <ArrowRight className="ml-1.5 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
}

export default function SubCategorySection({ title, products, isFlat = false, categoryId }: SubCategorySectionProps) {
    return (
        <div className={isFlat ? "" : "mb-8"}>
            {/* Subcategory heading — hidden for flat categories */}
            {!isFlat && (
                <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1 max-w-8 bg-neutral-300" />
                    <h3 className="font-heading text-xl font-semibold tracking-[-0.015em] text-neutral-800">
                        {title}
                    </h3>
                    <div className="h-px flex-1 bg-neutral-200" />
                </div>
            )}

            {/* Product items grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product, index) => (
                    <ProductCardMini key={product.name} product={product} index={index} categoryId={categoryId} />
                ))}
            </div>
        </div>
    );
}
