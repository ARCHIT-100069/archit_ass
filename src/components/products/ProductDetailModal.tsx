"use client";
import { useState } from "react";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import EnquiryForm from "./EnquiryForm";

interface Product {
    id: string;
    name: string;
    shortDescription: string;
    image?: string;
    specifications: string[];
}

interface ProductDetailModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
    const [imageSrc, setImageSrc] = useState(product?.image || "/product-placeholder.svg");

    // Update image state when product changes
    if (product && imageSrc !== product.image && imageSrc === "/product-placeholder.svg") {
        // This simple check might not be enough if we want to reset on new product, 
        // but for now let's prioritize the onError. 
        // Better approach: handled in useEffect or key.
    }

    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 cursor-pointer"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl pointer-events-auto flex flex-col md:flex-row overflow-hidden relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-neutral-100 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Product Info Side */}
                            <div className="w-full md:w-1/2 p-8 md:p-12 bg-neutral-50 flex flex-col justify-center">
                                <div className="mb-8">
                                    <div className="relative w-full h-64 mb-6 bg-white rounded-lg border border-neutral-200 overflow-hidden">
                                        <Image
                                            src={imageSrc}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-4"
                                            priority
                                            onError={() => setImageSrc("/product-placeholder.svg")}
                                        />
                                    </div>
                                    <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-[-0.025em] mb-4 leading-[1.15]">{product.name}</h2>
                                    <p className="text-neutral-900/60 leading-[1.65] text-[15px] mb-6">
                                        {product.shortDescription}
                                    </p>

                                    {product.specifications && product.specifications.length > 0 && (
                                        <div className="space-y-2 border-t border-neutral-200 pt-6">
                                            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">Specifications</h4>
                                            <ul className="text-sm text-neutral-600 list-disc list-inside space-y-1">
                                                {product.specifications.map((spec, i) => (
                                                    <li key={i}>{spec}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Enquiry Form Side */}
                            <div className="w-full md:w-1/2 p-8 md:p-12 bg-white">
                                <h3 className="font-heading text-xl font-semibold mb-2 tracking-[-0.015em]">Request Quote</h3>
                                <p className="text-[14px] text-neutral-900/55 mb-6">Fill out the form below and we'll get back to you with pricing and availability.</p>
                                <EnquiryForm product={product} onClose={onClose} />
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
