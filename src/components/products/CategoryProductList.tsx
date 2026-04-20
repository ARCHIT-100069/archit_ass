"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import ProductDetailModal from "./ProductDetailModal";
import ProductCard from "./ProductCard";

interface Product {
    id: string;
    name: string;
    shortDescription: string;
    image?: string;
    specifications: string[];
}

export default function CategoryProductList({ products }: { products: Product[] }) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <div key={product.id} onClick={() => setSelectedProduct(product)}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            <ProductDetailModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </>
    );
}
